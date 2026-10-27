// 学会ブランチの README.md を conferences.json と各学会の venue.json / README.md から組み立てる
export class VenueReadmeWriter {
  /**
   * @param {import("./venue-models.mjs").VenueCollection} collection
   * @param {{ repo: string }} opts 分野ブランチへのリンクに使う GitHub リポジトリ（owner/name）
   */
  constructor(collection, { repo }) {
    this.collection = collection;
    this.repo = repo;
  }

  static status(s) {
    return s ? `（${s}）` : "";
  }

  deadlineCell(d) {
    if (!d) return "—";
    return `${d.label} ${d.date ?? "不明"}${d.time ? ` ${d.time}` : ""}${VenueReadmeWriter.status(d.status)}`;
  }

  /** 学会ごとの節：見出し・資料リンク・特徴・傾向・対応分野のあとに、調査担当が書いた README 断片を続ける */
  venueSection(v) {
    const m = v.meta;
    const s = v.slug;
    const lines = v.readme.trim().split("\n");
    const head = lines[0]?.startsWith("#") ? lines[0].replace(/^#+\s*/, "") : `${m.name}（${s}/）`;
    const body = lines[0]?.startsWith("#") ? lines.slice(1) : lines;
    const list = (title, items) => (items?.length ? [`### ${title}`, "", ...items.map((t) => `- ${t}`), ""] : []);
    const up = m.upcoming ?? {};
    return [
      `<a id="${s}"></a>`,
      "",
      `## ${head}`,
      "",
      `${m.fullName}（${m.organizer}）`,
      "",
      `資料：[${s}.pptx](${s}/${s}.pptx) ／ [${s}.pdf](${s}/${s}.pdf) ／ 生成元 [spec.json](${s}/spec.json)・[venue.json](${s}/venue.json) ／ [学会 README](${s}/README.md)`,
      "",
      m.summary ?? "",
      "",
      `### 次回：${up.edition ?? "不明"}${VenueReadmeWriter.status(up.status)}`,
      "",
      `- 会期・開催地：${up.dates ?? "不明"} ／ ${up.location ?? "不明"}`,
      ...(up.deadlines ?? []).map((d) => `- ${this.deadlineCell(d)}${d.basis ? ` — 根拠：${d.basis}` : ""}`),
      ...(up.notes ? [`- 補足：${up.notes}`] : []),
      "",
      ...list("形式", m.format),
      ...list("特徴", m.features),
      ...list("傾向", m.trends),
      ...list(
        "よく当てはまる分野",
        (m.fields ?? []).map((f) => `[${f.slug}](https://github.com/${this.repo}/tree/${f.slug})（適合：${f.fit}）— ${f.reason}`),
      ),
      ...body,
    ].join("\n");
  }

  render() {
    const c = this.collection;
    const m = c.meta;
    const L = [
      `# ${m.name}`,
      "",
      m.overview,
      "",
      "受賞・注目論文は落合陽一フォーマット（1論文1スライド）に、詳細と評価ポイントのスライドを 1 枚ずつ加えたデッキにまとめている。",
      "",
      "## 学会一覧",
      "",
      "| 学会 | 主催 / 領域 | 次回 | 締切（公式／推定） | 資料 | スライド化 | 受賞・話題の一覧 |",
      "| --- | --- | --- | --- | --- | --- | --- |",
      ...c.venues.map((v) => {
        const s = v.slug;
        const up = v.meta.upcoming ?? {};
        const dl = (up.deadlines ?? []).filter((d) => /締切|deadline/i.test(d.label)).map((d) => this.deadlineCell(d)).join("<br>") || "—";
        return `| [${v.name}](#${s}) | ${v.meta.organizer} / ${v.meta.area} | ${up.edition ?? "—"} | ${dl} | [pptx](${s}/${s}.pptx) / [pdf](${s}/${s}.pdf) | ${v.papers.length} 本 | ${(v.meta.awards ?? []).length} 件 |`;
      }),
      "",
      `合計：スライド化 ${c.papers.length} 本（${c.venues.length} 学会）。`,
      "",
      "## 調査履歴",
      "",
      "| 日付 | 内容 |",
      "| --- | --- |",
      ...(m.history ?? []).map((h) => `| ${h.date} | ${h.text} |`),
      "",
      "## 凡例",
      "",
      "- 締切の「公式」は学会が発表した日付、「推定」は過去の回の締切から見積もった日付（根拠を併記）、「不明」は推定もできなかったもの。",
      "- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1。論文ごとに落合スライドと詳細スライドの 2 枚）、`⚠️ 本文未確認` は本文にアクセスできなかった論文（概要は検索情報に基づく）、`— 参照のみ` はスライド化しなかった論文、`↪ 既存：<field>/<theme>` は分野ブランチのデッキでスライド化済み。",
      "- 評価ポイントの「（選考理由）」は学会が公表した受賞理由の要約、「（調査者の見立て）」は公表されていないため調査者が評価した点。",
      "",
      "---",
      "",
      c.venues.map((v) => this.venueSection(v)).join("\n\n---\n\n"),
      "",
    ];
    return L.join("\n");
  }
}
