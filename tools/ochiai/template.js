// main ブランチ用テンプレート（各欄に「何を書くか」を記載した1枚）を生成する
// 使い方: node template.js [出力パス]
const path = require("path");
const { COLORS, FONT, G, newDeck, addPaperSlide } = require("./ochiai");

const out = process.argv[2] || path.join(__dirname, "../../template/ochiai_format_template.pptx");
const pres = newDeck("落合陽一フォーマット テンプレート");

const slide = addPaperSlide(pres, {
  tag: "分野名 › テーマ名 ｜ 系譜：原典 / 発展 / 最新動向",
  title: "論文タイトル（原題をそのまま記載）",
  authors: "著者1, 著者2, …（筆頭著者の所属）｜ 会議・ジャーナル名 発表年",
  s1: "この論文が何をしたかを2〜3文で要約する。対象とする問題・提案手法の名前・最大の成果を一言で言い切る。",
  s2: "既存手法の限界（論文の問題提起）と、それに対する本研究の差分・新規性。比較対象となる代表的な先行研究名を挙げる。",
  s3: "新規性や性能を生んでいる中核アイデア。アーキテクチャ・目的関数・アルゴリズムの要点を、必要なら数式1つで示す。",
  s4: "実験設定（データセット・環境・ベースライン・評価指標）と主要な定量結果。数値は論文の表・図から引用し番号を添える。",
  s5: "著者が認める限界・考察と、調査者の所感（前提の妥当性・再現性・応用可能性）。両者を区別して書く。",
  s6: "原典・比較対象・後続研究など系譜上つながる論文。ブランチの README 一覧と対応させ、未調査のものはその旨を付記する。",
  info: {
    venue: "会議・ジャーナル名, 発表年",
    link: "arXiv / DOI / プロジェクトページ",
    lineage: "原典・発展・最新 のいずれか（親論文）",
    date: "YYYY-MM-DD",
    scope: "全文（問題提起・実験・結果・考察まで）",
  },
  footer: "Research Survey ｜ 分野名 › テーマ名",
  notes: [
    "【テンプレートの使い方】",
    "・1論文につき1枚。分野ごとにブランチを切り、テーマごとに1つの pptx（+PDF）にまとめる。",
    "・最新動向の論文から着手し、系譜を持つ場合は原典まで遡って同じ形式で1枚ずつ作成する。",
    "・アブストラクトだけでなく、問題提起・手法・実験・結果・考察まで読んだうえで記入する。",
    "・本文にアクセスできない論文はスライドにしない（影響が大きいものは README に「未確認」と明記して概要のみ記載）。",
    "・右上の代表図には論文中の図を1点引用し、キャプションに図番号を記載する。",
  ].join("\n"),
});

// テンプレートにだけ置く代表図の枠（本番スライドでは論文の図に置き換わる）
slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: G.sideX, y: G.bodyY, w: G.sideW, h: G.figH, rectRadius: 0.08,
  fill: { color: COLORS.white }, line: { color: COLORS.line, width: 1.25, dashType: "dash" },
  objectName: "figure-frame",
});
slide.addText(
  [
    { text: "代表図", options: { bold: true, fontSize: 14, color: COLORS.teal, breakLine: true } },
    { text: "手法の全体像または主要結果を示す論文中の図を1点引用し、下部に「出典：Fig. 1」のように図番号を記載する。", options: { fontSize: 11, color: COLORS.muted } },
  ],
  {
    x: G.sideX + 0.25, y: G.bodyY + 0.25, w: G.sideW - 0.5, h: G.figH - 0.5, fontFace: FONT,
    align: "center", valign: "middle", margin: 0, lineSpacingMultiple: 1.15, isTextBox: true, objectName: "figure-guide",
  }
);

pres.writeFile({ fileName: out }).then((f) => console.log(`wrote ${f}`));
