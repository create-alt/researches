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
//     "notes": "発表者ノート（任意）"
//   }]
// }
const fs = require("fs");
const path = require("path");
const { newDeck, addPaperSlide, addCoverSlide } = require("./ochiai");

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

addCoverSlide(pres, {
  tag: `${spec.field} ｜ 先行研究調査（${spec.date}）`,
  title: spec.theme,
  summary: spec.summary,
  footer,
  rows: spec.papers.map((p, i) => [i + 1, p.year, p.short || p.title, p.venue, p.lineage]),
});

let problems = 0;
spec.papers.forEach((p, i) => {
  let figure;
  if (p.figure && p.figure.file) {
    const file = path.resolve(base, p.figure.file);
    figure = { path: file, caption: p.figure.caption, ...pngSize(file) };
  }
  const { overflow } = addPaperSlide(pres, {
    tag: `${spec.field} › ${spec.theme} ｜ 系譜：${p.lineage}`,
    title: p.title,
    authors: p.authors,
    s1: p.s1, s2: p.s2, s3: p.s3, s4: p.s4, s5: p.s5, s6: p.s6,
    info: {
      venue: p.venue,
      link: p.link,
      lineage: p.parent ? `${p.lineage}（← ${p.parent}）` : p.lineage,
      date: p.date || spec.date,
      scope: p.scope || "全文（問題提起・手法・実験・結果・考察）",
    },
    figure,
    footer,
    notes: p.notes,
  });
  if (overflow.length) {
    problems++;
    console.warn(`[overflow] slide ${i + 2} (${p.short || p.title}): ${overflow.join(", ")} を短くしてください`);
  }
});

pres.writeFile({ fileName: out }).then((f) => {
  console.log(`wrote ${f}`);
  if (problems) process.exitCode = 2;
});
