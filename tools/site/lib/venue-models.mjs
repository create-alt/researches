// 学会（会議）のモデル。学会ブランチ（conferences）のファイル構成をここで一か所に定義する。
//
// 学会ブランチの構成:
//   conferences.json                学会欄のメタデータ（名前・概要・学会の並び順・調査履歴）
//   <venue>/venue.json              締切・特徴・傾向・対応分野・受賞論文の一覧
//   <venue>/spec.json               受賞・注目論文のデッキの元データ（tools/ochiai/build.js と同じ書式＋award/detail/points）
//   <venue>/README.md               調査履歴・受賞論文一覧・不明な点
//   <venue>/figures/*.png           代表図
//   <venue>/<venue>.pptx, .pdf      デッキ（論文ごとに 落合スライド＋詳細スライド の 2 枚）

/** 締切などの日付。"2027-01-22" / "2027-01" / "2027-05-上旬" のような書き方を受け付ける */
export class Deadline {
  constructor(json) {
    Object.assign(this, json);
  }

  /** 並べ替えと「今日より後か」の判定に使う日付（日が分からなければ月の中ほど） */
  get sortKey() {
    const m = /^(\d{4})-(\d{2})(?:-(\d{2}))?/.exec(this.date ?? "");
    if (!m) return null;
    const day = m[3] ?? ({ 上旬: "05", 中旬: "15", 下旬: "25" }[(this.date.match(/[上中下]旬/) ?? [])[0]] ?? "15");
    return `${m[1]}-${m[2]}-${day}`;
  }

  isAfter(today) {
    const k = this.sortKey;
    return k !== null && k >= today;
  }
}

export class VenuePaper {
  /**
   * @param {Venue} venue
   * @param {object} spec  spec.json の papers[i]
   * @param {number} index 0 始まり。デッキでは論文ごとに 2 枚（落合スライド p.2k、詳細 p.2k+1）
   */
  constructor(venue, spec, index) {
    this.venue = venue;
    this.spec = spec;
    this.index = index;
  }
  get number() { return this.index + 1; }
  /** 落合スライドのページ（表紙が p.1） */
  get page() { return 2 * this.number; }
  get figureFile() { return this.spec.figure?.file ?? null; }

  toSummary() {
    const s = this.spec;
    return {
      venue: this.venue.slug,
      number: this.number,
      title: s.title,
      short: s.short ?? s.title,
      authors: s.authors,
      year: s.year,
      published: s.venue,
      kind: s.lineage,
      award: s.award ?? "",
      link: s.link,
      gist: s.s1,
    };
  }

  toDetail(figureBase) {
    const s = this.spec;
    return {
      ...this.toSummary(),
      page: this.page,
      date: s.date ?? this.venue.spec.date,
      scope: s.scope ?? "全文（問題提起・手法・実験・結果・考察）",
      sections: [s.s1, s.s2, s.s3, s.s4, s.s5, s.s6],
      detail: s.detail ?? "",
      points: s.points ?? "",
      figure: s.figure ? { src: `${figureBase}/${s.figure.file.replace(/^figures\//, "")}`, caption: s.figure.caption ?? "" } : null,
      notes: s.notes ?? "",
    };
  }
}

export class Venue {
  /**
   * @param {VenueCollection} collection
   * @param {object} meta venue.json
   * @param {object} spec spec.json（無ければ papers 空）
   * @param {string} readme README.md
   */
  constructor(collection, meta, spec, readme) {
    this.collection = collection;
    this.meta = meta;
    this.spec = spec;
    this.readme = readme;
    this.papers = (spec.papers ?? []).map((p, i) => new VenuePaper(this, p, i));
  }
  get slug() { return this.meta.slug; }
  get name() { return this.meta.name; }
  get dir() { return this.slug; }
  get deckPath() { return `${this.dir}/${this.slug}.pptx`; }
  get pdfPath() { return `${this.dir}/${this.slug}.pdf`; }
  get deadlines() { return (this.meta.upcoming?.deadlines ?? []).map((d) => new Deadline(d)); }

  /** today（YYYY-MM-DD）以降で最も早い締切。採否通知などは除き「締切」と付く項目だけを見る */
  nextDeadline(today) {
    return this.deadlines.filter((d) => /締切|deadline/i.test(d.label) && d.isAfter(today)).sort((a, b) => a.sortKey.localeCompare(b.sortKey))[0] ?? null;
  }

  /** 既存デッキの論文のうち、発表先（venue 欄）がこの学会のもの */
  matchesPublished(text) {
    const names = this.meta.aliases?.length ? this.meta.aliases : [this.name];
    return names.some((a) => new RegExp(`(^|[^A-Za-z])${a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^A-Za-z]|$)`).test(text ?? ""));
  }

  toSummary(today) {
    const m = this.meta;
    const next = this.nextDeadline(today);
    return {
      slug: m.slug,
      name: m.name,
      fullName: m.fullName,
      organizer: m.organizer,
      area: m.area,
      summary: m.summary,
      upcoming: { edition: m.upcoming?.edition ?? null, location: m.upcoming?.location ?? null, dates: m.upcoming?.dates ?? null, status: m.upcoming?.status ?? null },
      nextDeadline: next ? { label: next.label, date: next.date, time: next.time ?? null, status: next.status, sortKey: next.sortKey, edition: m.upcoming?.edition ?? null } : null,
      fields: m.fields ?? [],
      paperCount: this.papers.length,
      awardCount: (m.awards ?? []).length,
    };
  }
}

export class VenueCollection {
  /**
   * @param {object} meta conferences.json
   * @param {string} branch
   */
  constructor(meta, branch) {
    this.meta = meta;
    this.branch = branch;
    this.venues = [];
  }
  get name() { return this.meta.name; }
  get papers() { return this.venues.flatMap((v) => v.papers); }
}
