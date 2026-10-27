// Field モデルから GitHub Pages 用の静的サイト（_site/）を書き出す
//
// 出力:
//   index.html, assets/**                     site/ の静的ファイルをそのままコピー
//   data/catalog.json                          全分野・全テーマの要約と、全論文の検索用一覧
//   data/fields/<field>/<theme>/theme.json     テーマの詳細（表紙の概要・論文全文・README の HTML）
//   data/fields/<field>/<theme>/figures/*      代表図
//   data/venues/<venue>/venue.json             学会の詳細（締切・特徴・受賞論文・スライド・README の HTML）
//   data/venues/<venue>/figures/*              受賞論文の代表図
import fs from "node:fs";
import path from "node:path";
import { MarkdownRenderer } from "./markdown.mjs";

export class SiteBuilder {
  /**
   * @param {object} opts
   * @param {string} opts.sourceDir  静的ファイル（site/）
   * @param {string} opts.outDir     出力先（_site/）
   * @param {object} opts.config     site.config.json
   * @param {Map<string, import("./sources.mjs").Source>} opts.sources  ブランチ名 → 読み出し元
   */
  constructor({ sourceDir, outDir, config, sources, log = console.log }) {
    this.sourceDir = sourceDir;
    this.outDir = outDir;
    this.config = config;
    this.sources = sources;
    this.log = log;
    this.markdown = new MarkdownRenderer();
  }

  /**
   * @param {import("./models.mjs").Field[]} fields
   * @param {import("./venue-models.mjs").VenueCollection | null} venues 学会欄（学会ブランチが無ければ null）
   */
  build(fields, venues = null) {
    fs.rmSync(this.outDir, { recursive: true, force: true });
    fs.mkdirSync(this.outDir, { recursive: true });
    this.copyStatic();
    for (const field of fields) for (const theme of field.themes) this.writeTheme(theme);
    if (venues) for (const venue of venues.venues) this.writeVenue(venue, fields);
    this.writeCatalog(fields, venues);
    // GitHub Pages の Jekyll 処理を止める（_ で始まるファイルもそのまま配信する）
    fs.writeFileSync(path.join(this.outDir, ".nojekyll"), "");
    const papers = fields.reduce((n, f) => n + f.papers.length, 0);
    this.log(`wrote ${this.outDir}: ${fields.length} fields, ${papers} papers` + (venues ? `, ${venues.venues.length} venues` : ""));
  }

  copyStatic() {
    fs.cpSync(this.sourceDir, this.outDir, { recursive: true });
  }

  themeDataDir(theme) {
    return `data/fields/${theme.field.slug}/${theme.slug}`;
  }

  /** GitHub 上のファイルへのリンク（リポジトリ公開後に有効） */
  githubBlob(theme, relPath) {
    return `https://github.com/${this.config.repo}/blob/${theme.field.branch}/${relPath}`;
  }

  /** @param {import("./models.mjs").Theme} theme */
  writeTheme(theme) {
    const rel = this.themeDataDir(theme);
    const dir = path.join(this.outDir, rel);
    fs.mkdirSync(path.join(dir, "figures"), { recursive: true });

    const src = this.sources.get(theme.field.branch);
    for (const paper of theme.papers) {
      const file = paper.figureFile;
      if (!file) continue;
      const name = path.basename(file);
      fs.writeFileSync(path.join(dir, "figures", name), src.readBuffer(`${theme.dir}/${file}`));
    }

    const detail = {
      field: theme.field.slug,
      theme: theme.slug,
      name: theme.name,
      summary: theme.spec.summary ?? "",
      date: theme.spec.date ?? theme.meta.date,
      links: {
        pdf: this.githubBlob(theme, theme.pdfPath),
        pptx: this.githubBlob(theme, theme.deckPath),
        readme: this.githubBlob(theme, `${theme.dir}/README.md`),
        tree: `https://github.com/${this.config.repo}/tree/${theme.field.branch}/${theme.dir}`,
      },
      readmeHtml: this.linkSlidePages(this.markdown.renderThemeReadme(theme.readme), theme),
      papers: theme.papers.map((p) => p.toDetail(`${rel}/figures`)),
    };
    fs.writeFileSync(path.join(dir, "theme.json"), JSON.stringify(detail));
  }

  /** README の「✅ p.N」（デッキの N ページ目 = N-1 本目の論文）をサイト内の論文ページへのリンクにする */
  linkSlidePages(html, theme) {
    return html.replace(/✅ p\.(\d+)/g, (m, page) => {
      const n = Number(page) - 1;
      return n >= 1 && n <= theme.papers.length ? `<a href="#/field/${theme.field.slug}/${theme.slug}/${n}">${m}</a>` : m;
    });
  }

  /** 締切の判定に使う「今日」（ビルドした日、UTC） */
  get today() {
    this._today ??= new Date().toISOString().slice(0, 10);
    return this._today;
  }

  githubVenueBlob(venue, relPath) {
    return `https://github.com/${this.config.repo}/blob/${venue.collection.branch}/${relPath}`;
  }

  /**
   * @param {import("./venue-models.mjs").Venue} venue
   * @param {import("./models.mjs").Field[]} fields 既存デッキのうちこの学会で発表された論文を探すため
   */
  writeVenue(venue, fields) {
    const rel = `data/venues/${venue.slug}`;
    const dir = path.join(this.outDir, rel);
    fs.mkdirSync(path.join(dir, "figures"), { recursive: true });
    const src = this.sources.get(venue.collection.branch);
    for (const paper of venue.papers) {
      const file = paper.figureFile;
      if (!file) continue;
      fs.writeFileSync(path.join(dir, "figures", path.basename(file)), src.readBuffer(`${venue.dir}/${file}`));
    }
    const archive = fields.flatMap((f) => f.papers).filter((p) => venue.matchesPublished(p.spec.venue)).map((p) => p.toSummary());
    const detail = {
      ...venue.meta,
      summaryText: venue.spec.summary ?? "",
      deckDate: venue.spec.date ?? venue.meta.date,
      links: {
        pdf: this.githubVenueBlob(venue, venue.pdfPath),
        pptx: this.githubVenueBlob(venue, venue.deckPath),
        readme: this.githubVenueBlob(venue, `${venue.dir}/README.md`),
        tree: `https://github.com/${this.config.repo}/tree/${venue.collection.branch}/${venue.dir}`,
      },
      readmeHtml: this.linkVenueSlidePages(this.markdown.renderThemeReadme(venue.readme), venue),
      papers: venue.papers.map((p) => p.toDetail(`${rel}/figures`)),
      archive,
    };
    fs.writeFileSync(path.join(dir, "venue.json"), JSON.stringify(detail));
  }

  /** 学会 README の「✅ p.N」（N = 2k が k 本目の論文の落合スライド）をサイト内の論文ページへのリンクにする */
  linkVenueSlidePages(html, venue) {
    return html.replace(/✅ p\.(\d+)/g, (m, page) => {
      const n = Math.floor(Number(page) / 2);
      return n >= 1 && n <= venue.papers.length ? `<a href="#/venue/${venue.slug}/${n}">${m}</a>` : m;
    });
  }

  writeCatalog(fields, venues = null) {
    const catalog = {
      generatedAt: new Date().toISOString(),
      site: { title: this.config.title, subtitle: this.config.subtitle, repo: this.config.repo },
      fields: fields.map((f) => ({
        ...f.toSummary(),
        links: { tree: `https://github.com/${this.config.repo}/tree/${f.branch}`, readme: `https://github.com/${this.config.repo}/blob/${f.branch}/README.md` },
      })),
      papers: fields.flatMap((f) => f.papers.map((p) => p.toSummary())),
      venues: venues
        ? {
            name: venues.meta.name,
            overview: venues.meta.overview,
            history: venues.meta.history ?? [],
            today: this.today,
            links: { tree: `https://github.com/${this.config.repo}/tree/${venues.branch}`, readme: `https://github.com/${this.config.repo}/blob/${venues.branch}/README.md` },
            list: venues.venues.map((v) => v.toSummary(this.today)),
            papers: venues.papers.map((p) => p.toSummary()),
          }
        : null,
    };
    fs.mkdirSync(path.join(this.outDir, "data"), { recursive: true });
    fs.writeFileSync(path.join(this.outDir, "data", "catalog.json"), JSON.stringify(catalog));
  }
}
