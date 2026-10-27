// テーマ README（Markdown）を HTML に変換する
import { Marked } from "marked";

export class MarkdownRenderer {
  constructor() {
    this.marked = new Marked({ gfm: true });
    // 外部リンクは別タブで開く
    this.marked.use({
      renderer: {
        link(href, title, text) {
          const t = title ? ` title="${title}"` : "";
          const external = /^https?:\/\//.test(href ?? "");
          return `<a href="${href}"${t}${external ? ' target="_blank" rel="noopener"' : ""}>${text}</a>`;
        },
      },
    });
  }

  /** README 冒頭の「## テーマ名」見出しはページ側で表示するので除く */
  renderThemeReadme(markdown) {
    const body = markdown.replace(/^\s*#{1,3} .*\n/, "");
    return this.marked.parse(body);
  }
}
