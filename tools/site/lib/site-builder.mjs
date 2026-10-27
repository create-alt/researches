// Field モデルから GitHub Pages 用の静的サイト（_site/）を書き出す
//
// 出力:
//   index.html, assets/**                     site/ の静的ファイルをそのままコピー
//   data/catalog.json                          全分野・全テーマの要約と、全論文の検索用一覧
//   data/fields/<field>/<theme>/theme.json     テーマの詳細（表紙の概要・論文全文・README の HTML）
//   data/fields/<field>/<theme>/figures/*      代表図
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

  /** @param {import("./models.mjs").Field[]} fields */
  build(fields) {
    fs.rmSync(this.outDir, { recursive: true, force: true });
    fs.mkdirSync(this.outDir, { recursive: true });
    this.copyStatic();
    for (const field of fields) for (const theme of field.themes) this.writeTheme(theme);
    this.writeCatalog(fields);
    // GitHub Pages の Jekyll 処理を止める（_ で始まるファイルもそのまま配信する）
    fs.writeFileSync(path.join(this.outDir, ".nojekyll"), "");
    const papers = fields.reduce((n, f) => n + f.papers.length, 0);
    this.log(`wrote ${this.outDir}: ${fields.length} fields, ${papers} papers`);
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

  writeCatalog(fields) {
    const catalog = {
      generatedAt: new Date().toISOString(),
      site: { title: this.config.title, subtitle: this.config.subtitle, repo: this.config.repo },
      fields: fields.map((f) => ({
        ...f.toSummary(),
        links: { tree: `https://github.com/${this.config.repo}/tree/${f.branch}`, readme: `https://github.com/${this.config.repo}/blob/${f.branch}/README.md` },
      })),
      papers: fields.flatMap((f) => f.papers.map((p) => p.toSummary())),
    };
    fs.mkdirSync(path.join(this.outDir, "data"), { recursive: true });
    fs.writeFileSync(path.join(this.outDir, "data", "catalog.json"), JSON.stringify(catalog));
  }
}
