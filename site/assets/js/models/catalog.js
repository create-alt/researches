// サイトのデータモデル。data/catalog.json（全体の要約）と data/fields/<f>/<t>/theme.json（テーマ詳細）を読む。

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

export class Catalog {
  constructor(json) {
    this.site = json.site;
    this.generatedAt = json.generatedAt;
    this.fields = json.fields.map((f) => new FieldSummary(f, this)).sort((a, b) => a.order - b.order);
    this.papers = json.papers.map((p) => new PaperSummary(p, this));
    this.themeCache = new Map();
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
