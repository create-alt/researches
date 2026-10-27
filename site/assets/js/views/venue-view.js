import { h, trustedHTML } from "../core/dom.js";
import { link } from "../core/router.js";
import { View } from "./view.js";
import { breadcrumbs, externalLink, lineageBadge, paperRow, statusBadge } from "./components.js";
import { NotFoundView } from "./not-found-view.js";

const show = (v) => (v === null || v === undefined || v === "" ? "—" : String(v));

/** 学会 1 つ: 締切・過去の回・特徴・傾向・対応分野・受賞論文・このアーカイブ内の採録論文 */
export class VenueView extends View {
  get summary() { return this.catalog.venues?.venue(this.params.venue) ?? null; }
  get title() { return this.summary?.name ?? ""; }

  section(title, ...children) {
    return h("section", {}, h("h2", {}, title), ...children);
  }

  list(items) {
    return items?.length ? h("ul", { class: "plain-list" }, items.map((t) => h("li", {}, t))) : h("p", { class: "muted" }, "—");
  }

  table(head, rows, cls = "") {
    return h(
      "div",
      { class: "table-wrap" },
      h("table", { class: ["table", cls] }, h("thead", {}, h("tr", {}, head.map((t) => h("th", { scope: "col" }, t)))), h("tbody", {}, rows)),
    );
  }

  upcoming(v) {
    const up = v.upcoming ?? {};
    const rows = (up.deadlines ?? []).map((d) =>
      h(
        "tr",
        {},
        h("th", { scope: "row" }, d.label),
        h("td", { class: "nowrap" }, `${d.date ?? "不明"}${d.time ? ` ${d.time}` : ""}`),
        h("td", {}, statusBadge(d.status)),
        h("td", {}, d.basis ?? "—", d.source ? [" ", externalLink(d.source, "出典")] : null),
      ),
    );
    return this.section(
      `次回：${up.edition ?? "不明"}`,
      h("p", {}, statusBadge(up.status), " ", [up.dates, up.location].filter(Boolean).join(" ／ ")),
      rows.length ? this.table(["項目", "日付", "確度", "根拠・出典"], rows) : h("p", { class: "muted" }, "締切の情報はありません。"),
      up.notes ? h("p", { class: "muted" }, up.notes) : null,
    );
  }

  history(v) {
    if (!v.history?.length) return null;
    const rows = v.history.map((r) =>
      h(
        "tr",
        {},
        h("th", { scope: "row" }, r.source ? externalLink(r.source, r.edition) : r.edition),
        [r.dates, r.location, r.abstract, r.paper, r.notification, r.submissions, r.accepted, r.acceptanceRate].map((x) => h("td", { class: "nowrap" }, show(x))),
      ),
    );
    return this.section("過去の回", this.table(["回", "会期", "開催地", "アブスト締切", "論文締切", "採否通知", "投稿数", "採択数", "採択率"], rows, "compact"));
  }

  fields(v) {
    if (!v.fields?.length) return null;
    return this.section(
      "よく当てはまる分野",
      h(
        "ul",
        { class: "plain-list fit-list" },
        v.fields.map((f) => {
          const field = this.catalog.field(f.slug);
          return h(
            "li",
            {},
            h("span", { class: ["badge", f.fit === "高" ? "badge-latest" : "badge-growth"] }, `適合：${f.fit}`),
            " ",
            field ? h("a", { href: link("field", f.slug) }, field.name) : f.slug,
            h("span", { class: "muted" }, ` — ${f.reason}`),
          );
        }),
      ),
    );
  }

  awards(v) {
    if (!v.awards?.length) return null;
    const rows = [...v.awards]
      .sort((a, b) => (b.year ?? 0) - (a.year ?? 0))
      .map((a) =>
        h(
          "tr",
          {},
          h("td", { class: "nowrap" }, show(a.year)),
          h("td", {}, lineageBadge(a.kind === "topic" ? "話題" : "受賞"), " ", a.award ?? ""),
          h(
            "td",
            {},
            a.slide ? h("a", { href: link("venue", v.slug, String(a.slide)) }, a.title) : a.link ? externalLink(a.link, a.title) : a.title,
            a.authors ? h("div", { class: "muted small" }, a.authors) : null,
            a.summary ? h("div", { class: "small" }, a.summary) : null,
            a.basis ? h("div", { class: "muted small" }, `話題の根拠：${a.basis}`) : null,
          ),
          h("td", { class: "nowrap" }, a.slide ? h("a", { href: link("venue", v.slug, String(a.slide)) }, "スライド") : show(a.status)),
        ),
      );
    return this.section(`受賞・話題の論文（${v.awards.length} 件）`, this.table(["年", "賞", "論文", "スライド"], rows, "awards"));
  }

  async render() {
    const s = this.summary;
    if (!s) return new NotFoundView(this.app, { params: {}, query: this.query, path: this.path }).render();
    const v = await this.catalog.loadVenue(s.slug);
    const idx = this.catalog.venues;
    return h(
      "div",
      { class: "page venue" },
      breadcrumbs([["トップ", "#/"], [idx.name, link("venues")], [v.name]]),
      h("p", { class: "eyebrow" }, `${v.organizer} ・ ${v.area} ・ 調査日 ${v.date ?? v.deckDate}`),
      h("h1", {}, v.name, h("span", { class: "muted venue-full" }, ` ${v.fullName ?? ""}`)),
      h("p", { class: "lead" }, v.summary),
      h(
        "p",
        { class: "actions" },
        v.papers.length ? h("a", { href: link("venue", v.slug, "1"), class: "button" }, "受賞・注目論文のスライドを順に見る") : null,
        v.website ? externalLink(v.website, "公式サイト", "button ghost") : null,
        externalLink(v.links.pdf, "PDF", "button ghost"),
        externalLink(v.links.pptx, "PPTX", "button ghost"),
        externalLink(v.links.readme, "README（GitHub）", "button ghost"),
      ),
      this.upcoming(v),
      this.history(v),
      this.section("形式", this.list(v.format)),
      this.section("特徴", this.list(v.features)),
      this.section("傾向", this.list(v.trends)),
      this.fields(v),
      this.awards(v),
      v.papers.length
        ? this.section(
            `スライド化した受賞・注目論文（${v.papers.length} 本）`,
            v.summaryText ? h("div", { class: "muted" }, v.summaryText.split("\n").map((l) => h("p", {}, l))) : null,
            h(
              "ol",
              { class: "paper-list" },
              v.papers.map((p) =>
                h(
                  "li",
                  { class: "paper-row" },
                  h(
                    "a",
                    { href: link("venue", v.slug, String(p.number)), class: "paper-row-link" },
                    h("span", { class: "paper-row-year" }, show(p.year)),
                    h("span", { class: "paper-row-main" }, h("span", { class: "paper-row-title" }, p.short), h("span", { class: "paper-row-sub" }, p.award)),
                    h("span", { class: "paper-row-venue" }, p.published ?? ""),
                    lineageBadge(p.kind),
                  ),
                ),
              ),
            ),
          )
        : null,
      v.archive?.length
        ? this.section(
            `このアーカイブでスライド化した ${v.name} の論文（${v.archive.length} 本）`,
            h("p", { class: "muted" }, `分野ブランチのデッキのうち、発表先が ${v.name} の論文です。`),
            h(
              "details",
              { class: "archive", open: v.archive.length <= 8 },
              h("summary", {}, `${v.archive.length} 本を表示`),
              h("ol", { class: "paper-list" }, v.archive.map((p) => paperRow(p, { showTheme: true, catalog: this.catalog }))),
            ),
          )
        : null,
      v.unknowns?.length ? this.section("調べても分からなかったこと", this.list(v.unknowns)) : null,
      v.sources?.length ? this.section("主な出典", h("ul", { class: "plain-list" }, v.sources.map((x) => h("li", {}, externalLink(x.url, x.label))))) : null,
      v.readmeHtml ? h("section", { class: "readme" }, h("h2", {}, "調査メモ（README）"), trustedHTML("div", v.readmeHtml, { class: "markdown" })) : null,
    );
  }
}
