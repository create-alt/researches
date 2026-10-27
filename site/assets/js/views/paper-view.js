import { h } from "../core/dom.js";
import { link, Router } from "../core/router.js";
import { View } from "./view.js";
import { breadcrumbs, externalLink, PaperSlide } from "./components.js";
import { NotFoundView } from "./not-found-view.js";

/** 論文 1 本のスライド。←/→ キーで前後の論文に移動できる */
export class PaperView extends View {
  get number() { return Number(this.params.number); }
  get title() { return this.paper?.short ?? this.paper?.title ?? ""; }

  async render() {
    this.theme = await this.catalog.loadTheme(this.params.field, this.params.theme);
    this.paper = this.theme?.paper(this.number) ?? null;
    if (!this.paper) return new NotFoundView(this.app, { params: {}, query: this.query, path: this.path }).render();

    const t = this.theme;
    const f = t.model.fieldModel;
    const n = this.number;
    const total = t.papers.length;
    return h(
      "div",
      { class: "page paper" },
      breadcrumbs([["トップ", "#/"], [f.name, link("field", f.slug)], [t.name, link("field", f.slug, t.theme)], [`${n} / ${total}`]]),
      this.pager(n, total),
      new PaperSlide(this.paper, t).render(),
      h(
        "p",
        { class: "actions" },
        this.paper.link ? externalLink(this.paper.link, "論文を開く", "button") : null,
        " ",
        externalLink(t.links.pdf, `デッキの PDF（p.${this.paper.page}）`, "button ghost"),
      ),
      this.pager(n, total),
    );
  }

  pager(n, total) {
    const t = this.theme;
    const to = (i) => link("field", t.field, t.theme, String(i));
    return h(
      "nav",
      { class: "pager", "aria-label": "前後の論文" },
      n > 1 ? h("a", { href: to(n - 1), rel: "prev" }, "← 前の論文") : h("span"),
      h("a", { href: link("field", t.field, t.theme) }, "論文一覧"),
      n < total ? h("a", { href: to(n + 1), rel: "next" }, "次の論文 →") : h("span"),
    );
  }

  mounted() {
    this.onKey = (e) => {
      if (e.target.closest?.("input, textarea, select") || e.altKey || e.ctrlKey || e.metaKey) return;
      const total = this.theme?.papers.length ?? 0;
      const next = e.key === "ArrowRight" ? this.number + 1 : e.key === "ArrowLeft" ? this.number - 1 : 0;
      if (next >= 1 && next <= total) Router.go(`/field/${this.params.field}/${this.params.theme}/${next}`);
    };
    window.addEventListener("keydown", this.onKey);
  }

  unmount() {
    window.removeEventListener("keydown", this.onKey);
  }
}
