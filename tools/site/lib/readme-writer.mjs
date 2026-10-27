// 分野ブランチの README.md を field.json とテーマごとの README.md から組み立てる
export class FieldReadmeWriter {
  /** @param {import("./models.mjs").Field} field */
  constructor(field) {
    this.field = field;
  }

  render() {
    const f = this.field;
    const m = f.meta;
    const L = [
      `# ${m.name} — 先行研究調査`,
      "",
      m.overview,
      "",
      "落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/`）は main ブランチから引き継いでいる。",
      "",
      "## テーマ一覧",
      "",
      "| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |",
      "| --- | --- | --- | --- | --- | --- | --- |",
      ...f.themes.map((t) => {
        const s = t.slug;
        return `| 第${t.meta.round}回 | [${t.name}](#${s}) | ${t.meta.scope} | [pptx](${s}/${s}.pptx) / [pdf](${s}/${s}.pdf) | ${t.papers.length} 本 | ${t.citedCount} 本 | ${t.meta.date} |`;
      }),
      "",
      `合計：スライド化 ${f.papers.length} 本、引用論文一覧 ${f.themes.reduce((n, t) => n + t.citedCount, 0)} 本（テーマ間の重複を含む）。`,
      "",
      "## 調査履歴",
      "",
      "| 日付 | 内容 |",
      "| --- | --- |",
      ...(m.history ?? []).map((h) => `| ${h.date} | ${h.text} |`),
      "",
      "## 追加調査を推奨するテーマ",
      "",
      "これまでの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。",
      "",
    ];
    (m.next ?? []).forEach((n, i) => L.push(`${i + 1}. **${n.title}**  `, `   ${n.body}`, ""));
    const names = new Map(f.themes.map((t) => [t.slug, t.name]));
    for (const d of m.done ?? []) {
      L.push(`<details><summary>${d.label}</summary>`, "");
      for (const it of d.items) L.push(`- ${it.title} → [${names.get(it.theme) ?? it.theme}](#${it.theme})`);
      L.push("", "</details>", "");
    }
    L.push(
      "## 凡例",
      "",
      "- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は既存デッキ（他分野の場合は `<field>/<theme>`）でスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。",
      "- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。",
      "",
      "---",
      "",
    );
    const sections = f.themes.map((t) => {
      const lines = t.readme.trim().split("\n");
      const head = lines[0].replace(/^#+\s*/, "");
      const s = t.slug;
      return [
        `<a id="${s}"></a>`,
        "",
        `## ${head}`,
        "",
        `資料：[${s}.pptx](${s}/${s}.pptx) ／ [${s}.pdf](${s}/${s}.pdf) ／ 生成元 [spec.json](${s}/spec.json) ／ [テーマ README](${s}/README.md)`,
        "",
        ...lines.slice(1),
      ].join("\n");
    });
    L.push(sections.join("\n\n---\n\n"), "");
    return L.join("\n");
  }
}
