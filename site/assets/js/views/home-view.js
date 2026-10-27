import { h } from "../core/dom.js";
import { link } from "../core/router.js";
import { View } from "./view.js";
import { statTiles } from "./components.js";

/** トップ: 分野一覧と全体の統計 */
export class HomeView extends View {
  get title() { return ""; }

  fieldCard(field) {
    return h(
      "li",
      { class: "field-card" },
      h(
        "a",
        { href: link("field", field.slug), class: "field-card-link" },
        h("h3", {}, field.name),
        h("p", { class: "field-card-overview" }, field.overview),
        h(
          "p",
          { class: "field-card-meta" },
          `${field.themes.length} テーマ ・ スライド ${field.paperCount} 本 ・ 引用 ${field.citedCount} 本`,
        ),
        h("ul", { class: "chips" }, field.themes.map((t) => h("li", {}, t.name))),
      ),
    );
  }

  recentList() {
    return h(
      "ol",
      { class: "recent" },
      this.catalog.recentThemes(8).map((t) =>
        h(
          "li",
          {},
          h("a", { href: link("field", t.fieldModel.slug, t.slug) }, t.name),
          h("span", { class: "muted" }, ` ${t.fieldModel.name} ・ ${t.date} ・ ${t.paperCount} 本`),
        ),
      ),
    );
  }

  async render() {
    const s = this.catalog.stats;
    const site = this.catalog.site;
    return h(
      "div",
      { class: "page home" },
      h(
        "section",
        { class: "hero" },
        h("h1", {}, site.title),
        h("p", { class: "lead" }, site.subtitle),
        h(
          "p",
          { class: "muted" },
          "各論文を「どんなもの？」から「次に読むべき論文は？」までの 6 項目で 1 ページにまとめています。分野ごとに、最新動向から系譜を原典まで遡って調査しました。",
        ),
        statTiles([
          ["分野", s.fields],
          ["テーマ", s.themes],
          ["スライド化した論文", s.papers],
          ["引用論文一覧", s.cited],
        ]),
      ),
      h("section", {}, h("h2", {}, "分野"), h("ul", { class: "field-grid" }, this.catalog.fields.map((f) => this.fieldCard(f)))),
      h("section", {}, h("h2", {}, "最近調査したテーマ"), this.recentList()),
    );
  }
}
