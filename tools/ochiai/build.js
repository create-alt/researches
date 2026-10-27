// テーマごとのスペック（JSON）から 表紙 + 1論文1スライド のデッキを生成する
// 使い方: node build.js <spec.json> <出力.pptx>
//
// spec.json:
// {
//   "field": "世界モデル", "theme": "内発的報酬", "date": "YYYY-MM-DD",
//   "summary": "テーマの概要（表紙に表示、改行可）",
//   "papers": [{
//     "title": "原題", "short": "表紙の一覧に載せる短い名前（省略時は title）",
//     "authors": "著者（所属）｜ 発表先 年", "year": 2023, "venue": "NeurIPS 2023",
//     "link": "https://arxiv.org/abs/...", "lineage": "原典 | 発展 | 最新", "parent": "系譜上の親（任意）",
//     "s1": "…", "s2": "…", "s3": "…", "s4": "…", "s5": "…", "s6": "…",   // 改行で段落を分ける
//     "figure": { "file": "figures/xxx.png", "caption": "出典：Fig. 1 …" },  // PNG。spec.json からの相対パス
//     "notes": "発表者ノート（任意）",
//     // 学会の受賞・注目論文デッキでは次の 3 つを加える。論文スライドの後に「詳細・評価ポイント」のスライドが入る
//     "award": "ICML 2026 Outstanding Paper Award", "detail": "詳細（改行可）", "points": "・評価ポイント1\n・評価ポイント2"
//   }]
// }
const fs = require("fs");
const path = require("path");
const { newDeck, addPaperSlide, addDetailSlide, addCoverSlide } = require("./ochiai");

function pngSize(file) {
  const b = fs.readFileSync(file);
  if (b.toString("ascii", 1, 4) !== "PNG") throw new Error(`PNG ではありません: ${file}`);
  return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
}

const [specPath, out] = process.argv.slice(2);
if (!specPath || !out) {
  console.error("usage: node build.js <spec.json> <out.pptx>");
  process.exit(1);
}
const spec = JSON.parse(fs.readFileSync(specPath, "utf8"));
const base = path.dirname(path.resolve(specPath));
const footer = `Research Survey ｜ ${spec.field} › ${spec.theme}`;
const pres = newDeck(`${spec.field} › ${spec.theme}`);
// 受賞論文デッキ（論文に award がある）では、系譜の代わりに受賞・話題の区分を出す
const awardDeck = spec.papers.some((p) => p.award);

addCoverSlide(pres, {
  tag: `${spec.field} ｜ 先行研究調査（${spec.date}）`,
  title: spec.theme,
  summary: spec.summary,
  footer,
  rows: spec.papers.map((p, i) => [i + 1, p.year, p.short || p.title, p.venue, p.lineage]),
  kindLabel: awardDeck ? "区分" : "系譜",
});

let problems = 0;
let page = 2;
spec.papers.forEach((p, i) => {
  let figure;
  if (p.figure && p.figure.file) {
    const file = path.resolve(base, p.figure.file);
    figure = { path: file, caption: p.figure.caption, ...pngSize(file) };
  }
  const tag = awardDeck ? `${spec.field} › ${spec.theme} ｜ ${p.award || p.lineage}` : `${spec.field} › ${spec.theme} ｜ 系譜：${p.lineage}`;
  const { overflow } = addPaperSlide(pres, {
    tag,
    title: p.title,
    authors: p.authors,
    s1: p.s1, s2: p.s2, s3: p.s3, s4: p.s4, s5: p.s5, s6: p.s6,
    info: {
      venue: p.venue,
      link: p.link,
      lineage: awardDeck ? p.award || p.lineage : p.parent ? `${p.lineage}（← ${p.parent}）` : p.lineage,
      lineageLabel: awardDeck ? "受賞" : "系譜",
      date: p.date || spec.date,
      scope: p.scope || "全文（問題提起・手法・実験・結果・考察）",
    },
    figure,
    footer,
    notes: p.notes,
  });
  if (overflow.length) {
    problems++;
    console.warn(`[overflow] slide ${page} (${p.short || p.title}): ${overflow.join(", ")} を短くしてください`);
  }
  page++;
  if (p.detail || p.points) {
    const d = addDetailSlide(pres, {
      tag: `${tag} ｜ 詳細・評価ポイント`, title: p.title, authors: p.authors, footer,
      award: p.award || p.lineage, detail: p.detail, points: p.points,
    });
    if (d.overflow.length) {
      problems++;
      console.warn(`[overflow] slide ${page} (${p.short || p.title} 詳細): ${d.overflow.join(", ")} を短くしてください`);
    }
    page++;
  }
});

pres.writeFile({ fileName: out }).then((f) => {
  console.log(`wrote ${f}`);
  if (problems) process.exitCode = 2;
});
