import { h } from "../core/dom.js";
import { link } from "../core/router.js";
import { View } from "./view.js";
import { breadcrumbs, externalLink, statTiles, statusBadge } from "./components.js";
import { NotFoundView } from "./not-found-view.js";

/** 締切の表の 1 行（学会一覧とトップで使う） */
export function deadlineRow(v) {
  const d = v.nextDeadline;
  return h(
    "tr",
    {},
    h("th", { scope: "row" }, h("a", { href: link("venue", v.slug) }, v.name)),
    h("td", {}, v.upcoming.edition ?? "—"),
    h("td", {}, d ? d.label : "—"),
    h("td", { class: "nowrap" }, d ? `${d.date ?? "不明"}${d.time ? ` ${d.time}` : ""}` : "未定"),
    h("td", {}, statusBadge(d?.status ?? v.upcoming.status)),
    h("td", { class: "muted" }, [v.upcoming.dates, v.upcoming.location].filter(Boolean).join(" ／ ") || "—"),
  );
}

export function deadlineTable(venues) {
  return h(
    "div",
    { class: "table-wrap" },
    h(
      "table",
      { class: "table deadlines" },
      h("thead", {}, h("tr", {}, ["学会", "次回", "次の締切", "日付", "確度", "会期・開催地"].map((t) => h("th", { scope: "col" }, t)))),
      h("tbody", {}, venues.map((v) => deadlineRow(v))),
    ),
  );
}

/** 学会欄のトップ: 締切の近い順の表と、学会ごとのカード */
export class VenuesView extends View {
  get title() { return "学会"; }

  venueCard(v) {
    const fields = v.fields.filter((f) => f.fit === "高").map((f) => this.catalog.field(f.slug)?.name ?? f.slug);
    return h(
      "li",
      { class: "field-card" },
      h(
        "a",
        { href: link("venue", v.slug), class: "field-card-link" },
        h("h3", {}, v.name, h("span", { class: "muted venue-full" }, ` ${v.fullName ?? ""}`)),
        h("p", { class: "field-card-meta" }, `${v.organizer} ・ ${v.area}`),
        h("p", { class: "field-card-overview" }, v.summary),
        h("p", { class: "field-card-meta" }, `受賞・注目論文のスライド ${v.paperCount} 本 ・ 一覧 ${v.awardCount} 件`),
        fields.length ? h("ul", { class: "chips" }, fields.map((n) => h("li", {}, n))) : null,
      ),
    );
  }

  async render() {
    const idx = this.catalog.venues;
    if (!idx) return new NotFoundView(this.app, { params: {}, query: this.query, path: this.path }).render();
    return h(
      "div",
      { class: "page venues" },
      breadcrumbs([["トップ", "#/"], [idx.name]]),
      h("h1", {}, idx.name),
      h("p", { class: "lead" }, idx.overview),
      statTiles([
        ["学会", idx.list.length],
        ["受賞・注目論文のスライド", idx.papers.length],
        ["受賞・話題の一覧", idx.list.reduce((n, v) => n + v.awardCount, 0)],
      ]),
      h("p", { class: "actions" }, externalLink(idx.links.readme, "GitHub で README を見る", "button ghost")),
      h(
        "section",
        {},
        h("h2", {}, "次の締切（近い順）"),
        h("p", { class: "muted" }, `${idx.today} 時点で締切が来ていない回のうち、最も早い投稿締切。「推定」は過去の回の締切から見積もった日付で、根拠は各学会のページにあります。`),
        deadlineTable(idx.byNextDeadline),
      ),
      h("section", {}, h("h2", {}, "学会"), h("ul", { class: "field-grid" }, idx.list.map((v) => this.venueCard(v)))),
      idx.history?.length
        ? h(
            "section",
            {},
            h("h2", {}, "調査履歴"),
            h("table", { class: "table" }, h("tbody", {}, idx.history.map((r) => h("tr", {}, h("th", {}, r.date), h("td", {}, r.text))))),
          )
        : null,
    );
  }
}
