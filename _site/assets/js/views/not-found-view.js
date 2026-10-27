import { h } from "../core/dom.js";
import { View } from "./view.js";

export class NotFoundView extends View {
  get title() { return "見つかりません"; }

  async render() {
    return h(
      "div",
      { class: "page" },
      h("h1", {}, "ページが見つかりません"),
      h("p", {}, "分野・テーマ・論文の指定が正しくない可能性があります。"),
      h("p", {}, h("a", { href: "#/" }, "トップへ戻る")),
    );
  }
}
