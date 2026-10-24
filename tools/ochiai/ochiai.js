// 落合陽一フォーマット（1論文1スライド）の共通レイアウトとデッキ生成。
// template.js からテンプレートを、各分野ブランチでは build.js からテーマごとのデッキを生成する。
const pptxgen = require("pptxgenjs");

// 配色とフォントはここだけで管理する
const COLORS = {
  ink: "1E2433", // 本文・タイトル
  muted: "5B6478", // 補足テキスト
  card: "F2F4F8", // カード背景
  line: "C9CFDB", // 枠線
  accent: "D9480F", // 番号バッジ
  teal: "1F6F78", // 分野タグ・見出し
  white: "FFFFFF",
};
const FONT = "Meiryo";

// 6項目（番号順：左→右、上→下）
const SECTIONS = [
  { key: "s1", q: "どんなもの？" },
  { key: "s2", q: "先行研究と比べてどこがすごい？" },
  { key: "s3", q: "技術や手法のキモはどこ？" },
  { key: "s4", q: "どうやって有効だと検証した？" },
  { key: "s5", q: "議論はある？" },
  { key: "s6", q: "次に読むべき論文は？" },
];

// 13.333" x 7.5"（LAYOUT_WIDE）上の配置
const G = {
  mx: 0.5,
  bodyY: 1.65,
  cardW: 4.15,
  cardH: 1.65,
  gap: 0.15,
  sideX: 9.15,
  sideW: 3.683,
  figH: 3.0,
};
G.infoY = G.bodyY + G.figH + G.gap;
G.infoH = G.bodyY + 3 * G.cardH + 2 * G.gap - G.infoY;
// 各カード本文の領域（カード左上からの相対位置）
const BODY = { dx: 0.18, dy: 0.52, w: G.cardW - 0.36, h: G.cardH - 0.6 };
const INFO = { x: G.sideX + 0.15, y: G.infoY + 0.48, w: G.sideW - 0.3, h: G.infoH - 0.56 };

function cardPos(i) {
  const col = i % 2;
  const row = Math.floor(i / 2);
  return { x: G.mx + col * (G.cardW + G.gap), y: G.bodyY + row * (G.cardH + G.gap) };
}

// ---- 文字量に応じたフォントサイズの自動調整 ----
// 行送りを pt で固定するため、PowerPoint と LibreOffice で行数がほぼ一致する
const LEAD = 1.35;
const lineSpacingFor = (size) => Math.round(size * LEAD * 2) / 2;

// latin: 半角文字1字の幅（全角=1.0 に対する比）。太字の英文タイトルは広めに見積もる
function textUnits(s, latin = 0.6) {
  let u = 0;
  for (const ch of s) u += ch.charCodeAt(0) < 0x2000 ? latin : 1.0;
  return u;
}

function linesNeeded(paragraphs, w, size, latin) {
  const perLine = Math.max(1, Math.floor(((w * 72) / size) * 0.96));
  return paragraphs.reduce((n, p) => n + Math.max(1, Math.ceil(textUnits(p, latin) / perLine)), 0);
}

// sizes の大きい順に試し、収まる最大サイズを返す（収まらなければ最小サイズ）
function fitSize(paragraphs, w, h, sizes, latin) {
  for (const size of sizes) {
    const cap = Math.floor((h * 72) / lineSpacingFor(size));
    if (linesNeeded(paragraphs, w, size, latin) <= cap) return { size, overflow: false };
  }
  return { size: sizes[sizes.length - 1], overflow: true };
}

const TITLE_H = 0.62;
// 本文カードの下端に最終行が接しないよう、文字量の見積もりに使う高さを少し減らす
const FIT_PAD = 0.08;
const BODY_SIZES = [12, 11.5, 11, 10.5, 10, 9.5, 9];

// 改行区切りの文字列を段落ごとのランに変換
function paragraphRuns(text, size) {
  const paras = String(text || "").split("\n");
  return paras.map((p, i) => ({
    text: p,
    options: { fontSize: size, lineSpacing: lineSpacingFor(size), breakLine: i < paras.length - 1 },
  }));
}

function defineLayouts(pres) {
  const ph = (name, x, y, w, h, opts) => ({
    placeholder: {
      options: { name, type: "body", x, y, w, h, fontFace: FONT, color: COLORS.ink, valign: "top", margin: 0, ...opts },
      text: "",
    },
  });
  const slideNumber = { x: 12.233, y: 7.05, w: 0.6, h: 0.3, fontFace: FONT, fontSize: 10, color: COLORS.muted, align: "right" };

  // 論文スライド
  const objects = [];
  SECTIONS.forEach((s, i) => {
    const { x, y } = cardPos(i);
    objects.push({
      rect: { x, y, w: G.cardW, h: G.cardH, fill: { color: COLORS.card }, rectRadius: 0.08 },
    });
    objects.push({
      text: {
        text: String(i + 1),
        options: {
          shape: pres.shapes.OVAL, x: x + 0.15, y: y + 0.12, w: 0.34, h: 0.34,
          fill: { color: COLORS.accent }, color: COLORS.white, fontFace: FONT,
          fontSize: 13, bold: true, align: "center", valign: "middle", margin: 0,
        },
      },
    });
    objects.push({
      text: {
        text: s.q,
        options: {
          x: x + 0.6, y: y + 0.1, w: G.cardW - 0.75, h: 0.38, fontFace: FONT,
          fontSize: 13, bold: true, color: COLORS.teal, valign: "middle", margin: 0,
        },
      },
    });
  });
  objects.push({
    rect: { x: G.sideX, y: G.infoY, w: G.sideW, h: G.infoH, fill: { color: COLORS.card }, rectRadius: 0.08 },
  });
  objects.push({
    text: {
      text: "書誌情報",
      options: {
        x: G.sideX + 0.15, y: G.infoY + 0.1, w: G.sideW - 0.3, h: 0.35, fontFace: FONT,
        fontSize: 13, bold: true, color: COLORS.teal, valign: "middle", margin: 0,
      },
    },
  });
  SECTIONS.forEach((s, i) => {
    const { x, y } = cardPos(i);
    objects.push(ph(s.key, x + BODY.dx, y + BODY.dy, BODY.w, BODY.h, { fontSize: 12 }));
  });
  objects.push(ph("tag", G.mx, 0.3, 12.333, 0.28, { fontSize: 11, bold: true, color: COLORS.teal, valign: "middle" }));
  objects.push(ph("title", G.mx, 0.58, 12.333, TITLE_H, { fontSize: 24, bold: true, valign: "middle" }));
  objects.push(ph("meta", G.mx, 1.22, 12.333, 0.3, { fontSize: 12, color: COLORS.muted, valign: "middle" }));
  objects.push(ph("info", INFO.x, INFO.y, INFO.w, INFO.h, { fontSize: 10.5 }));
  objects.push(ph("footer", G.mx, 7.05, 10, 0.3, { fontSize: 10, color: COLORS.muted, valign: "middle" }));
  pres.defineSlideMaster({ title: "OCHIAI_PAPER", background: { color: COLORS.white }, objects, slideNumber });

  // テーマ表紙（調査論文の一覧）
  pres.defineSlideMaster({
    title: "OCHIAI_COVER",
    background: { color: COLORS.white },
    objects: [
      ph("tag", G.mx, 0.45, 12.333, 0.3, { fontSize: 12, bold: true, color: COLORS.teal, valign: "middle" }),
      ph("title", G.mx, 0.8, 12.333, 0.75, { fontSize: 36, bold: true, valign: "middle" }),
      ph("summary", G.mx, 1.65, 12.333, 0.9, { fontSize: 13, color: COLORS.muted }),
      ph("footer", G.mx, 7.05, 10, 0.3, { fontSize: 10, color: COLORS.muted, valign: "middle" }),
    ],
    slideNumber,
  });
}

function newDeck(title) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = { headFontFace: FONT, bodyFontFace: FONT };
  pres.title = title;
  defineLayouts(pres);
  return pres;
}

// 書誌情報カードの行（ラベル太字）
function infoRuns(info) {
  const rows = [
    ["発表", info.venue],
    ["リンク", info.link],
    ["系譜", info.lineage],
    ["調査日", info.date],
    ["確認範囲", info.scope],
  ];
  const paras = rows.map(([label, value]) => `${label}：${value || "—"}`);
  const { size } = fitSize(paras, INFO.w, INFO.h, [10.5, 10, 9.5, 9]);
  const ls = lineSpacingFor(size);
  const runs = [];
  rows.forEach(([label, value], i) => {
    runs.push({ text: `${label}：`, options: { bold: true, fontSize: size, lineSpacing: ls } });
    const v = { text: value || "—", options: { fontSize: size, lineSpacing: ls, breakLine: i < rows.length - 1 } };
    if (label === "リンク" && /^https?:\/\//.test(value || "")) v.options.hyperlink = { url: value };
    runs.push(v);
  });
  return runs;
}

// 1論文 = 1スライド
// paper: { title, authors, tag, footer, s1..s6, info: {venue, link, lineage, date, scope}, figure?: {path, caption}, notes? }
// 戻り値の overflow には、最小サイズでも収まらない欄のキーが入る
function addPaperSlide(pres, paper) {
  const slide = pres.addSlide({ masterName: "OCHIAI_PAPER" });
  const overflow = [];
  slide.addText(paper.tag, { placeholder: "tag" });
  // 長い原題は 16pt まで縮小して 2 行に折り返す（省略はしない）。
  // プレースホルダー側の書式が優先されるため、サイズはランに指定する
  const titleFit = fitSize([paper.title], 12.333, TITLE_H, [24, 22, 20, 18, 17, 16], 0.62);
  if (titleFit.overflow) overflow.push("title");
  slide.addText([{ text: paper.title, options: { bold: true, fontSize: titleFit.size, lineSpacing: lineSpacingFor(titleFit.size) } }], { placeholder: "title" });
  const metaFit = fitSize([paper.authors], 12.333, 0.3, [12, 11, 10], 0.64);
  if (metaFit.overflow) overflow.push("authors");
  slide.addText([{ text: paper.authors, options: { fontSize: metaFit.size } }], { placeholder: "meta" });
  SECTIONS.forEach((s) => {
    const text = String(paper[s.key] || "");
    const { size, overflow: of } = fitSize(text.split("\n"), BODY.w, BODY.h - FIT_PAD, BODY_SIZES);
    if (of) overflow.push(s.key);
    slide.addText(paragraphRuns(text, size), { placeholder: s.key });
  });
  slide.addText(infoRuns(paper.info), { placeholder: "info" });
  slide.addText(paper.footer, { placeholder: "footer" });

  const fig = { x: G.sideX, y: G.bodyY, w: G.sideW, h: G.figH };
  if (paper.figure && paper.figure.path) {
    const imgH = fig.h - 0.4;
    const img = { path: paper.figure.path, x: fig.x, y: fig.y, w: fig.w, h: imgH };
    // 縦横比を保って枠内に収める（sizing: contain は LibreOffice で崩れるため自前で計算）
    if (paper.figure.width && paper.figure.height) {
      const r = Math.min(fig.w / paper.figure.width, imgH / paper.figure.height);
      img.w = paper.figure.width * r;
      img.h = paper.figure.height * r;
      img.x = fig.x + (fig.w - img.w) / 2;
      img.y = fig.y + (imgH - img.h) / 2;
    }
    slide.addImage(img);
    slide.addText(paper.figure.caption || "", {
      x: fig.x, y: fig.y + fig.h - 0.35, w: fig.w, h: 0.35, fontFace: FONT, fontSize: 9.5,
      color: COLORS.muted, margin: 0, valign: "top", isTextBox: true,
    });
  }
  if (paper.notes) slide.addNotes(paper.notes);
  return { slide, overflow };
}

// テーマ表紙：概要と調査論文の一覧表
// cover: { tag, title, summary, footer, rows: [[#, 年, タイトル, 発表, 系譜], ...] }
function addCoverSlide(pres, cover) {
  const slide = pres.addSlide({ masterName: "OCHIAI_COVER" });
  slide.addText(cover.tag, { placeholder: "tag" });
  // 長いテーマ名は 1 行に収まるまで縮小する（プレースホルダー側の書式が優先されるため、サイズはランに指定する）
  const coverFit = fitSize([cover.title], 12.333, 0.75, [36, 32, 28, 26, 24], 0.62);
  slide.addText([{ text: cover.title, options: { bold: true, fontSize: coverFit.size } }], { placeholder: "title" });
  const sumFit = fitSize(cover.summary.split("\n"), 12.333, 0.9, [13, 12, 11]);
  slide.addText(paragraphRuns(cover.summary, sumFit.size).map((r) => ({ ...r, options: { ...r.options, color: COLORS.muted } })), { placeholder: "summary" });
  slide.addText(cover.footer, { placeholder: "footer" });

  const n = cover.rows.length;
  const tableTop = 2.7;
  const rowH = Math.min(0.4, (6.9 - tableTop) / (n + 1));
  const size = rowH >= 0.36 ? 11 : rowH >= 0.3 ? 10 : 9;
  const head = ["#", "年", "論文", "発表", "系譜"].map((t) => ({
    text: t, options: { bold: true, color: COLORS.white, fill: { color: COLORS.teal } },
  }));
  const body = cover.rows.map((r, i) =>
    r.map((t) => ({ text: String(t), options: { fill: { color: i % 2 ? COLORS.white : COLORS.card } } }))
  );
  slide.addTable([head, ...body], {
    x: G.mx, y: tableTop, w: 12.333, colW: [0.45, 0.75, 7.6, 2.0, 1.533],
    rowH, fontFace: FONT, fontSize: size, color: COLORS.ink, valign: "middle",
    border: { type: "solid", pt: 0.5, color: COLORS.line }, margin: [0.03, 0.08, 0.03, 0.08],
  });
  return slide;
}

module.exports = { COLORS, FONT, G, SECTIONS, newDeck, addPaperSlide, addCoverSlide, fitSize };
