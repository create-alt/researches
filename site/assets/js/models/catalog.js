// サイトのデータモデル。data/catalog.json（全体の要約）と data/fields/<f>/<t>/theme.json（テーマ詳細）、
// data/venues/<v>/venue.json（学会の詳細）を読む。

export class PaperSummary {
  constructor(json, catalog) {
    Object.assign(this, json);
    this.catalog = catalog;
  }
  get fieldModel() { return this.catalog.field(this.field); }
  get themeModel() { return this.fieldModel?.theme(this.theme); }

  /** 検索対象の文字列（小文字化済み） */
  get haystack() {
    this._haystack ??= [this.title, this.short, this.authors, this.venue, this.gist, this.year]
      .filter(Boolean)
      .join(" \n ")
      .toLowerCase();
    return this._haystack;
  }
}

export class ThemeSummary {
  constructor(json, field) {
    Object.assign(this, json);
    this.fieldModel = field;
  }
  get dataDir() { return `data/fields/${this.fieldModel.slug}/${this.slug}`; }
  get papers() { return this.fieldModel.catalog.papers.filter((p) => p.field === this.fieldModel.slug && p.theme === this.slug); }
}

export class FieldSummary {
  constructor(json, catalog) {
    Object.assign(this, json);
    this.catalog = catalog;
    this.themes = json.themes.map((t) => new ThemeSummary(t, this));
  }
  theme(slug) { return this.themes.find((t) => t.slug === slug) ?? null; }
  /** 調査回ごとにテーマをまとめる */
  get rounds() {
    const map = new Map();
    for (const t of this.themes) {
      if (!map.has(t.round)) map.set(t.round, []);
      map.get(t.round).push(t);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]);
  }
}

/** テーマ詳細（論文全文・README の HTML） */
export class ThemeDetail {
  /**
   * @param {object} json theme.json（summary は表紙の概要文）
   * @param {ThemeSummary} model カタログ側のテーマ
   */
  constructor(json, model) {
    Object.assign(this, json);
    this.model = model;
  }
  paper(number) { return this.papers.find((p) => p.number === number) ?? null; }
}

/** 学会欄の一覧にある学会 1 つ（締切の要約つき） */
export class VenueSummary {
  constructor(json, index) {
    Object.assign(this, json);
    this.index = index;
  }
  get dataDir() { return `data/venues/${this.slug}`; }
}

/** 学会欄（conferences ブランチ）全体 */
export class VenueIndex {
  constructor(json) {
    Object.assign(this, json);
    this.list = json.list.map((v) => new VenueSummary(v, this));
  }
  venue(slug) { return this.list.find((v) => v.slug === slug) ?? null; }

  /** 次の締切が近い順（締切が分からない学会は最後） */
  get byNextDeadline() {
    return [...this.list].sort((a, b) => (a.nextDeadline?.sortKey ?? "9999").localeCompare(b.nextDeadline?.sortKey ?? "9999"));
  }

  /** 分野 slug → その分野がよく当てはまる学会 */
  venuesForField(fieldSlug) {
    return this.list.filter((v) => v.fields.some((f) => f.slug === fieldSlug));
  }
}

/** 学会の詳細（締切・特徴・受賞論文・README の HTML） */
export class VenueDetail {
  constructor(json, model) {
    Object.assign(this, json);
    this.model = model;
  }
  paper(number) { return this.papers.find((p) => p.number === number) ?? null; }
}

export class Catalog {
  constructor(json) {
    this.site = json.site;
    this.generatedAt = json.generatedAt;
    this.fields = json.fields.map((f) => new FieldSummary(f, this)).sort((a, b) => a.order - b.order);
    this.papers = json.papers.map((p) => new PaperSummary(p, this));
    this.venues = json.venues ? new VenueIndex(json.venues) : null;
    this.themeCache = new Map();
    this.venueCache = new Map();
  }

  static async load(url = "data/catalog.json") {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${url}: ${res.status}`);
    return new Catalog(await res.json());
  }

  field(slug) { return this.fields.find((f) => f.slug === slug) ?? null; }

  get themes() { return this.fields.flatMap((f) => f.themes); }

  get stats() {
    return {
      fields: this.fields.length,
      themes: this.themes.length,
      papers: this.papers.length,
      cited: this.fields.reduce((n, f) => n + f.citedCount, 0),
    };
  }

  /** テーマ詳細を読み込む（キャッシュする） */
  async loadTheme(fieldSlug, themeSlug) {
    const summary = this.field(fieldSlug)?.theme(themeSlug);
    if (!summary) return null;
    const key = `${fieldSlug}/${themeSlug}`;
    if (!this.themeCache.has(key)) {
      this.themeCache.set(
        key,
        fetch(`${summary.dataDir}/theme.json`)
          .then((r) => {
            if (!r.ok) throw new Error(`${key}: ${r.status}`);
            return r.json();
          })
          .then((json) => new ThemeDetail(json, summary)),
      );
    }
    return this.themeCache.get(key);
  }

  /** 学会の詳細を読み込む（キャッシュする） */
  async loadVenue(slug) {
    const summary = this.venues?.venue(slug);
    if (!summary) return null;
    if (!this.venueCache.has(slug)) {
      this.venueCache.set(
        slug,
        fetch(`${summary.dataDir}/venue.json`)
          .then((r) => {
            if (!r.ok) throw new Error(`${slug}: ${r.status}`);
            return r.json();
          })
          .then((json) => new VenueDetail(json, summary)),
      );
    }
    return this.venueCache.get(slug);
  }

  /**
   * 全論文の検索。空白区切りの語をすべて含む論文を返す（AND 検索）。
   * @param {{ q?: string, field?: string, lineage?: string }} query
   */
  search({ q = "", field = "", lineage = "" } = {}) {
    const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    return this.papers.filter(
      (p) =>
        (!field || p.field === field) &&
        (!lineage || p.lineage === lineage) &&
        terms.every((t) => p.haystack.includes(t)),
    );
  }

  /** 新しく調査したテーマから順に */
  recentThemes(limit = 6) {
    return [...this.themes].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? "") || b.round - a.round).slice(0, limit);
  }
}
