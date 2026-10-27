// 複数の画面で使う部品
import { h } from "../core/dom.js";
import { link } from "../core/router.js";

/** パンくず: [["ラベル", "#/..."], ..., ["現在地"]] */
export function breadcrumbs(items) {
  return h(
    "nav",
    { class: "crumbs", "aria-label": "現在地" },
    items.map(([label, href], i) => [
      i > 0 ? h("span", { class: "crumbs-sep", "aria-hidden": "true" }, "›") : null,
      href ? h("a", { href }, label) : h("span", { "aria-current": "page" }, label),
    ]),
  );
}

const LINEAGE_CLASS = { 原典: "origin", 発展: "growth", 最新: "latest" };

export function lineageBadge(lineage) {
  return h("span", { class: ["badge", `badge-${LINEAGE_CLASS[lineage] ?? "other"}`] }, lineage ?? "—");
}

export function statTiles(stats) {
  return h(
    "dl",
    { class: "stats" },
    stats.map(([label, value]) => h("div", { class: "stat" }, h("dt", {}, label), h("dd", {}, String(value)))),
  );
}

/** スライド本文（改行区切り、「・」で始まる行は箇条書き）を段落とリストに変換する */
export function sectionText(text = "") {
  const out = [];
  let list = null;
  for (const raw of String(text).split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("・")) {
      list ??= h("ul");
      list.append(h("li", {}, line.slice(1).trim()));
      if (!out.includes(list)) out.push(list);
    } else {
      list = null;
      out.push(h("p", {}, line));
    }
  }
  return out;
}

export function externalLink(href, label, cls = "") {
  return h("a", { href, target: "_blank", rel: "noopener", class: cls }, label);
}

/** 論文一覧の1行（検索結果・テーマの論文表で使う） */
export function paperRow(paper, { showTheme = false, catalog = null } = {}) {
  const href = link("field", paper.field, paper.theme, String(paper.number));
  const theme = showTheme && catalog ? catalog.field(paper.field)?.theme(paper.theme) : null;
  return h(
    "li",
    { class: "paper-row" },
    h(
      "a",
      { href, class: "paper-row-link" },
      h("span", { class: "paper-row-year" }, String(paper.year ?? "")),
      h(
        "span",
        { class: "paper-row-main" },
        h("span", { class: "paper-row-title" }, paper.short ?? paper.title),
        h("span", { class: "paper-row-sub" }, paper.title !== paper.short ? paper.title : ""),
        theme ? h("span", { class: "paper-row-theme" }, `${theme.fieldModel.name} › ${theme.name}`) : null,
      ),
      h("span", { class: "paper-row-venue" }, paper.venue ?? ""),
      lineageBadge(paper.lineage),
    ),
  );
}

/** 落合陽一フォーマットの 6 項目 */
export const OCHIAI_SECTIONS = [
  "どんなもの？",
  "先行研究と比べてどこがすごい？",
  "技術や手法のキモはどこ？",
  "どうやって有効だと検証した？",
  "議論はある？",
  "次に読むべき論文は？",
];

/** 1 論文 = 1 スライドを HTML で再現する */
export class PaperSlide {
  /**
   * @param {object} paper  theme.json の papers[i]
   * @param {import("../models/catalog.js").ThemeDetail} theme
   */
  constructor(paper, theme) {
    this.paper = paper;
    this.theme = theme;
  }

  get tagLine() {
    const f = this.theme.model.fieldModel;
    return `${f.name} › ${this.theme.name} ｜ 系譜：${this.paper.lineage}`;
  }

  card(i) {
    return h(
      "section",
      { class: "slide-card" },
      h("h3", {}, h("span", { class: "num", "aria-hidden": "true" }, String(i + 1)), OCHIAI_SECTIONS[i]),
      h("div", { class: "slide-card-body" }, sectionText(this.paper.sections[i])),
    );
  }

  figure() {
    const fig = this.paper.figure;
    if (!fig) return h("figure", { class: "slide-figure empty" }, h("figcaption", {}, "代表図なし"));
    return h(
      "figure",
      { class: "slide-figure" },
      h("a", { href: fig.src, target: "_blank", rel: "noopener", title: "原寸で開く" }, h("img", { src: fig.src, alt: fig.caption, loading: "lazy" })),
      h("figcaption", {}, fig.caption),
    );
  }

  bibliography() {
    const p = this.paper;
    const rows = [
      ["発表", p.venue],
      ["リンク", p.link ? externalLink(p.link, p.link) : "—"],
      ["系譜", p.parent ? `${p.lineage}（← ${p.parent}）` : p.lineage],
      ["調査日", p.date],
      ["確認範囲", p.scope],
    ];
    return h(
      "section",
      { class: "slide-bib" },
      h("h3", {}, "書誌情報"),
      h("dl", {}, rows.map(([k, v]) => [h("dt", {}, k), h("dd", {}, v ?? "—")])),
    );
  }

  render() {
    const p = this.paper;
    return h(
      "article",
      { class: "slide", "aria-label": p.title },
      h(
        "header",
        { class: "slide-head" },
        h("p", { class: "slide-tag" }, this.tagLine),
        h("h2", { class: "slide-title" }, p.title),
        h("p", { class: "slide-authors" }, p.authors),
      ),
      h(
        "div",
        { class: "slide-body" },
        h("div", { class: "slide-cards" }, OCHIAI_SECTIONS.map((_, i) => this.card(i))),
        h("aside", { class: "slide-side" }, this.figure(), this.bibliography()),
      ),
      p.notes ? h("details", { class: "slide-notes" }, h("summary", {}, "発表者ノート"), sectionText(p.notes)) : null,
    );
  }
}
