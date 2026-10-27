import { h } from "../core/dom.js";
import { link, Router } from "../core/router.js";
import { View } from "./view.js";
import { AwardPaperSlide, breadcrumbs, externalLink } from "./components.js";
import { NotFoundView } from "./not-found-view.js";

/** 学会の受賞・注目論文 1 本（落合スライド＋詳細＋評価ポイント）。←/→ キーで前後の論文に移動できる */
export class VenuePaperView extends View {
  get number() { return Number(this.params.number); }
  get title() { return this.paper?.short ?? this.paper?.title ?? ""; }

  async render() {
    this.venue = await this.catalog.loadVenue(this.params.venue);
    this.paper = this.venue?.paper(this.number) ?? null;
    if (!this.paper) return new NotFoundView(this.app, { params: {}, query: this.query, path: this.path }).render();

    const v = this.venue;
    const n = this.number;
    const total = v.papers.length;
    return h(
      "div",
      { class: "page paper" },
      breadcrumbs([["トップ", "#/"], [this.catalog.venues.name, link("venues")], [v.name, link("venue", v.slug)], [`${n} / ${total}`]]),
      this.pager(n, total),
      new AwardPaperSlide(this.paper, v).render(),
      h(
        "p",
        { class: "actions" },
        this.paper.link ? externalLink(this.paper.link, "論文を開く", "button") : null,
        " ",
        externalLink(v.links.pdf, `デッキの PDF（p.${this.paper.page}〜${this.paper.page + 1}）`, "button ghost"),
      ),
      this.pager(n, total),
    );
  }

  pager(n, total) {
    const slug = this.venue.slug;
    const to = (i) => link("venue", slug, String(i));
    return h(
      "nav",
      { class: "pager", "aria-label": "前後の論文" },
      n > 1 ? h("a", { href: to(n - 1), rel: "prev" }, "← 前の論文") : h("span"),
      h("a", { href: link("venue", slug) }, "学会のページ"),
      n < total ? h("a", { href: to(n + 1), rel: "next" }, "次の論文 →") : h("span"),
    );
  }

  mounted() {
    this.onKey = (e) => {
      if (e.target.closest?.("input, textarea, select") || e.altKey || e.ctrlKey || e.metaKey) return;
      const total = this.venue?.papers.length ?? 0;
      const next = e.key === "ArrowRight" ? this.number + 1 : e.key === "ArrowLeft" ? this.number - 1 : 0;
      if (next >= 1 && next <= total) Router.go(`/venue/${this.params.venue}/${next}`);
    };
    window.addEventListener("keydown", this.onKey);
  }

  unmount() {
    window.removeEventListener("keydown", this.onKey);
  }
}
