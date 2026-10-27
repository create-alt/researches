import { h, trustedHTML } from "../core/dom.js";
import { link } from "../core/router.js";
import { View } from "./view.js";
import { breadcrumbs, externalLink, paperRow } from "./components.js";
import { NotFoundView } from "./not-found-view.js";

/** テーマ: 表紙（概要と論文一覧）と、README（調査履歴・系譜・引用論文一覧） */
export class ThemeView extends View {
  get field() { return this.catalog.field(this.params.field); }
  get themeSummary() { return this.field?.theme(this.params.theme) ?? null; }
  get title() { return this.themeSummary?.name ?? ""; }

  async render() {
    const summary = this.themeSummary;
    if (!summary) return new NotFoundView(this.app, { params: {}, query: this.query, path: this.path }).render();
    const theme = await this.catalog.loadTheme(this.params.field, this.params.theme);
    const f = this.field;
    return h(
      "div",
      { class: "page theme" },
      breadcrumbs([["トップ", "#/"], [f.name, link("field", f.slug)], [theme.name]]),
      h("p", { class: "eyebrow" }, `${f.name} ・ 第${summary.round}回 ・ ${theme.date}`),
      h("h1", {}, theme.name),
      h("div", { class: "lead" }, theme.summary.split("\n").map((l) => h("p", {}, l))),
      h(
        "p",
        { class: "actions" },
        h("a", { href: link("field", f.slug, theme.slug, "1"), class: "button" }, "スライドを順に見る"),
        " ",
        externalLink(theme.links.pdf, "PDF", "button ghost"),
        " ",
        externalLink(theme.links.pptx, "PPTX", "button ghost"),
        " ",
        externalLink(theme.links.readme, "README（GitHub）", "button ghost"),
      ),
      h(
        "section",
        {},
        h("h2", {}, `スライド化した論文（${theme.papers.length} 本）`),
        h("ol", { class: "paper-list" }, theme.papers.map((p) => paperRow(p))),
      ),
      h("section", { class: "readme" }, h("h2", {}, "調査履歴・系譜・引用論文一覧"), trustedHTML("div", theme.readmeHtml, { class: "markdown theme-readme" })),
    );
  }
}
