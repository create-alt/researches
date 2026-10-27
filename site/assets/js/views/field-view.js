import { h } from "../core/dom.js";
import { link } from "../core/router.js";
import { View } from "./view.js";
import { breadcrumbs, externalLink, statTiles } from "./components.js";
import { NotFoundView } from "./not-found-view.js";

/** 分野: 概要・テーマ（調査回ごと）・推奨テーマ・調査履歴 */
export class FieldView extends View {
  get field() { return this.catalog.field(this.params.field); }
  get title() { return this.field?.name ?? ""; }

  themeCard(theme) {
    return h(
      "li",
      { class: "theme-card" },
      h(
        "a",
        { href: link("field", this.field.slug, theme.slug), class: "theme-card-link" },
        h("h4", {}, theme.name),
        h("p", {}, theme.scope),
        h("p", { class: "muted" }, `スライド ${theme.paperCount} 本 ・ 引用 ${theme.citedCount} 本 ・ ${theme.date}`),
      ),
    );
  }

  /** この分野がよく当てはまる学会（学会欄の venue.json の fields から） */
  venues(f) {
    const list = this.catalog.venues?.venuesForField(f.slug) ?? [];
    if (!list.length) return null;
    return h(
      "p",
      { class: "venue-links" },
      h("span", { class: "muted" }, "よく当てはまる学会："),
      list.map((v) => {
        const fit = v.fields.find((x) => x.slug === f.slug)?.fit;
        return [" ", h("a", { href: link("venue", v.slug), class: "chip-link", title: `適合：${fit}` }, v.name)];
      }),
    );
  }

  async render() {
    const f = this.field;
    if (!f) return new NotFoundView(this.app, { params: {}, query: this.query, path: this.path }).render();
    return h(
      "div",
      { class: "page field" },
      breadcrumbs([["トップ", "#/"], [f.name]]),
      h("h1", {}, f.name),
      h("p", { class: "lead" }, f.overview),
      statTiles([
        ["テーマ", f.themes.length],
        ["スライド化した論文", f.paperCount],
        ["引用論文一覧", f.citedCount],
      ]),
      h("p", { class: "actions" }, externalLink(f.links.readme, "GitHub で README を見る", "button"), " ", externalLink(f.links.tree, `ブランチ ${f.branch}`, "button ghost")),
      this.venues(f),
      f.rounds.map(([round, themes]) =>
        h("section", {}, h("h2", {}, `第${round}回の調査`), h("ul", { class: "theme-grid" }, themes.map((t) => this.themeCard(t)))),
      ),
      f.next?.length
        ? h(
            "section",
            {},
            h("h2", {}, "次に調査を勧めるテーマ"),
            h("ol", { class: "next-list" }, f.next.map((n) => h("li", {}, h("strong", {}, n.title), h("p", {}, n.body)))),
          )
        : null,
      f.history?.length
        ? h(
            "section",
            {},
            h("h2", {}, "調査履歴"),
            h("table", { class: "table" }, h("tbody", {}, f.history.map((r) => h("tr", {}, h("th", {}, r.date), h("td", {}, r.text))))),
          )
        : null,
    );
  }
}
