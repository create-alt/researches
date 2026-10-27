import { h } from "../core/dom.js";
import { Router } from "../core/router.js";
import { View } from "./view.js";
import { breadcrumbs, paperRow } from "./components.js";

const LINEAGES = ["原典", "発展", "最新"];
const PAGE = 100;

/** 全論文の検索（タイトル・著者・発表先・「どんなもの？」を対象に AND 検索） */
export class SearchView extends View {
  get title() { return "論文検索"; }

  get state() {
    return { q: this.query.get("q") ?? "", field: this.query.get("field") ?? "", lineage: this.query.get("lineage") ?? "" };
  }

  form() {
    const s = this.state;
    const submit = (e) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const q = new URLSearchParams();
      for (const [k, v] of data) if (v) q.set(k, String(v).trim());
      Router.go("/search", q);
    };
    const select = (name, label, options, value) =>
      h(
        "label",
        { class: "field-label" },
        label,
        h(
          "select",
          { name, onchange: (e) => e.target.form.requestSubmit() },
          h("option", { value: "" }, "すべて"),
          options.map(([v, text]) => h("option", { value: v, selected: v === value }, text)),
        ),
      );
    return h(
      "form",
      { class: "search-form", role: "search", onsubmit: submit },
      h("label", { class: "field-label grow" }, "キーワード", h("input", { type: "search", name: "q", value: s.q, placeholder: "例: Dreamer, 好奇心, Loihi", autofocus: true })),
      select("field", "分野", this.catalog.fields.map((f) => [f.slug, f.name]), s.field),
      select("lineage", "系譜", LINEAGES.map((l) => [l, l]), s.lineage),
      h("button", { type: "submit", class: "button" }, "検索"),
    );
  }

  async render() {
    const results = this.catalog.search(this.state);
    const shown = results.slice(0, PAGE);
    return h(
      "div",
      { class: "page search" },
      breadcrumbs([["トップ", "#/"], ["論文検索"]]),
      h("h1", {}, "論文検索"),
      this.form(),
      h("p", { class: "muted", "aria-live": "polite" }, `${results.length} 本${results.length > PAGE ? `（先頭 ${PAGE} 本を表示）` : ""}`),
      h("ol", { class: "paper-list" }, shown.map((p) => paperRow(p, { showTheme: true, catalog: this.catalog }))),
    );
  }
}
