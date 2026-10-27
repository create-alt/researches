// 分野・テーマ・論文のモデル。分野ブランチのファイル構成をここで一か所に定義する。
//
// 分野ブランチの構成:
//   field.json                      分野のメタデータ（名前・概要・テーマ順・調査履歴・推奨テーマ）
//   <theme>/spec.json               スライドの元データ（tools/ochiai/build.js と同じ書式）
//   <theme>/README.md               調査履歴・系譜・引用論文一覧
//   <theme>/figures/*.png           代表図
//   <theme>/<theme>.pptx, .pdf      デッキ

export class Paper {
  /**
   * @param {Theme} theme
   * @param {object} spec  spec.json の papers[i]
   * @param {number} index 0 始まり（デッキでは p.index+2）
   */
  constructor(theme, spec, index) {
    this.theme = theme;
    this.spec = spec;
    this.index = index;
  }
  get number() { return this.index + 1; }
  get page() { return this.index + 2; }
  get id() { return `${this.theme.field.slug}/${this.theme.slug}/${this.number}`; }
  get figureFile() { return this.spec.figure?.file ?? null; }

  /** カタログ（検索用の軽い一覧）に載せる要約 */
  toSummary() {
    const s = this.spec;
    return {
      id: this.id,
      field: this.theme.field.slug,
      theme: this.theme.slug,
      number: this.number,
      title: s.title,
      short: s.short ?? s.title,
      authors: s.authors,
      year: s.year,
      venue: s.venue,
      lineage: s.lineage,
      link: s.link,
      gist: s.s1,
    };
  }

  /** テーマ詳細データに載せる全文 */
  toDetail(figureBase) {
    const s = this.spec;
    return {
      ...this.toSummary(),
      parent: s.parent ?? null,
      page: this.page,
      date: s.date ?? this.theme.spec.date,
      scope: s.scope ?? "全文（問題提起・手法・実験・結果・考察）",
      sections: [s.s1, s.s2, s.s3, s.s4, s.s5, s.s6],
      figure: s.figure ? { src: `${figureBase}/${s.figure.file.replace(/^figures\//, "")}`, caption: s.figure.caption ?? "" } : null,
      notes: s.notes ?? "",
    };
  }
}

export class Theme {
  /**
   * @param {Field} field
   * @param {object} meta field.json の themes[i]
   * @param {object} spec spec.json
   * @param {string} readme README.md の本文
   */
  constructor(field, meta, spec, readme) {
    this.field = field;
    this.meta = meta;
    this.spec = spec;
    this.readme = readme;
    this.papers = spec.papers.map((p, i) => new Paper(this, p, i));
  }
  get slug() { return this.meta.slug; }
  get name() { return this.meta.name; }
  get dir() { return this.slug; }
  get figureDir() { return `${this.dir}/figures`; }
  get deckPath() { return `${this.dir}/${this.slug}.pptx`; }
  get pdfPath() { return `${this.dir}/${this.slug}.pdf`; }
  /** README の引用論文一覧の行数 */
  get citedCount() { return (this.readme.match(/^\| \d+ \|/gm) ?? []).length; }

  toSummary() {
    return {
      slug: this.slug,
      name: this.name,
      scope: this.meta.scope,
      round: this.meta.round,
      date: this.meta.date,
      paperCount: this.papers.length,
      citedCount: this.citedCount,
    };
  }
}

export class Field {
  /**
   * @param {object} meta field.json
   * @param {string} branch
   */
  constructor(meta, branch) {
    this.meta = meta;
    this.branch = branch;
    this.themes = [];
  }
  get slug() { return this.meta.slug; }
  get name() { return this.meta.name; }
  get order() { return this.meta.order ?? 999; }
  get papers() { return this.themes.flatMap((t) => t.papers); }

  toSummary() {
    const { slug, name, overview, history = [], next = [], done = [] } = this.meta;
    return {
      slug,
      name,
      order: this.order,
      branch: this.branch,
      overview,
      history,
      next,
      done,
      paperCount: this.papers.length,
      citedCount: this.themes.reduce((n, t) => n + t.citedCount, 0),
      themes: this.themes.map((t) => t.toSummary()),
    };
  }
}
