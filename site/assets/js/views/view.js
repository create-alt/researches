// 画面の基底クラス。ルートごとに View のサブクラスを作り、App が render() の結果を差し替える。
export class View {
  /**
   * @param {import("../app.js").App} app
   * @param {{ params: Record<string,string>, query: URLSearchParams, path: string }} route
   */
  constructor(app, route) {
    this.app = app;
    this.catalog = app.catalog;
    this.params = route.params;
    this.query = route.query;
    this.path = route.path;
  }

  /** ブラウザのタブに出す題名（サイト名の前に付く） */
  get title() { return ""; }

  /** @returns {Promise<Node>} */
  async render() {
    throw new Error("not implemented");
  }

  /** 画面が DOM に入った後の処理（キーボード操作の登録など） */
  mounted() {}

  /** 別の画面に切り替わる前の後始末 */
  unmount() {}
}
