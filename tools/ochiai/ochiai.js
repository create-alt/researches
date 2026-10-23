// 落合陽一フォーマット（1論文1スライド）の共通レイアウトとデッキ生成。
// template.js からテンプレートを、各分野ブランチではテーマごとのスペックから本番デッキを生成する。
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
  bodyY: 1.8,
  cardW: 4.15,
  cardH: 1.55,
  gap: 0.2,
  sideX: 9.2,
  sideW: 3.633,
  figH: 2.9,
};
G.infoY = G.bodyY + G.figH + G.gap;
G.infoH = G.bodyY + 3 * G.cardH + 2 * G.gap - G.infoY;

function cardPos(i) {
  const col = i % 2;
  const row = Math.floor(i / 2);
  return { x: G.mx + col * (G.cardW + G.gap), y: G.bodyY + row * (G.cardH + G.gap) };
}

function defineLayouts(pres) {
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
  // 右カラム：書誌情報カードの見出し
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

  const ph = (name, x, y, w, h, opts) => ({
    placeholder: {
      options: { name, type: "body", x, y, w, h, fontFace: FONT, color: COLORS.ink, valign: "top", margin: 0, ...opts },
      text: "",
    },
  });
  SECTIONS.forEach((s, i) => {
    const { x, y } = cardPos(i);
    objects.push(ph(s.key, x + 0.18, y + 0.55, G.cardW - 0.36, G.cardH - 0.65, { fontSize: 12, lineSpacingMultiple: 1.1 }));
  });
  objects.push(ph("tag", G.mx, 0.3, 12.333, 0.3, { fontSize: 11, bold: true, color: COLORS.teal, valign: "middle" }));
  objects.push(ph("title", G.mx, 0.62, 12.333, 0.62, { fontSize: 24, bold: true, valign: "middle", fit: "shrink" }));
  objects.push(ph("meta", G.mx, 1.26, 12.333, 0.34, { fontSize: 12, color: COLORS.muted, valign: "middle" }));
  objects.push(ph("info", G.sideX + 0.15, G.infoY + 0.5, G.sideW - 0.3, G.infoH - 0.6, { fontSize: 10.5, lineSpacingMultiple: 1.15 }));
  objects.push(ph("footer", G.mx, 7.02, 10, 0.3, { fontSize: 10, color: COLORS.muted, valign: "middle" }));

  pres.defineSlideMaster({
    title: "OCHIAI_PAPER",
    background: { color: COLORS.white },
    objects,
    slideNumber: { x: 12.233, y: 7.02, w: 0.6, h: 0.3, fontFace: FONT, fontSize: 10, color: COLORS.muted, align: "right" },
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
  const runs = [];
  rows.forEach(([label, value], i) => {
    runs.push({ text: `${label}：`, options: { bold: true } });
    const v = { text: value || "—", options: { breakLine: i < rows.length - 1 } };
    if (label === "リンク" && /^https?:\/\//.test(value || "")) v.options.hyperlink = { url: value };
    runs.push(v);
  });
  return runs;
}

// 1論文 = 1スライド
// paper: { title, authors, tag, footer, s1..s6, info: {venue, link, lineage, date, scope}, figure?: {path, caption}, notes? }
function addPaperSlide(pres, paper) {
  const slide = pres.addSlide({ masterName: "OCHIAI_PAPER" });
  slide.addText(paper.tag, { placeholder: "tag" });
  slide.addText(paper.title, { placeholder: "title" });
  slide.addText(paper.authors, { placeholder: "meta" });
  SECTIONS.forEach((s) => slide.addText(paper[s.key], { placeholder: s.key }));
  slide.addText(infoRuns(paper.info), { placeholder: "info" });
  slide.addText(paper.footer, { placeholder: "footer" });

  const fig = { x: G.sideX, y: G.bodyY, w: G.sideW, h: G.figH };
  if (paper.figure && paper.figure.path) {
    slide.addImage({ path: paper.figure.path, x: fig.x, y: fig.y, w: fig.w, h: fig.h - 0.35, sizing: { type: "contain", w: fig.w, h: fig.h - 0.35 } });
    slide.addText(paper.figure.caption || "", {
      x: fig.x, y: fig.y + fig.h - 0.3, w: fig.w, h: 0.3, fontSize: 10, color: COLORS.muted, margin: 0, isTextBox: true,
    });
  }
  if (paper.notes) slide.addNotes(paper.notes);
  return slide;
}

module.exports = { COLORS, FONT, G, SECTIONS, newDeck, addPaperSlide };
