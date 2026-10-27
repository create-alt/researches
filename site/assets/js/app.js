// エントリポイント。ルートと View クラスの対応をここで登録する。
// 新しい画面を足すときは views/ に View のサブクラスを作り、routes() に 1 行追加する。
import { h, clear } from "./core/dom.js";
import { Router } from "./core/router.js";
import { Catalog } from "./models/catalog.js";
import { HomeView } from "./views/home-view.js";
import { FieldView } from "./views/field-view.js";
import { ThemeView } from "./views/theme-view.js";
import { PaperView } from "./views/paper-view.js";
import { SearchView } from "./views/search-view.js";
import { VenuesView } from "./views/venues-view.js";
import { VenueView } from "./views/venue-view.js";
import { VenuePaperView } from "./views/venue-paper-view.js";
import { NotFoundView } from "./views/not-found-view.js";

/** 表示テーマ（ライト／ダーク）の切り替え。設定は端末ごとに localStorage へ保存する */
class ColorScheme {
  static KEY = "research-survey:theme";
  static get saved() {
    try {
      return localStorage.getItem(ColorScheme.KEY);
    } catch {
      return null;
    }
  }
  static apply(mode) {
    if (mode === "light" || mode === "dark") document.documentElement.dataset.theme = mode;
    else delete document.documentElement.dataset.theme;
  }
  /** 半分塗りの円（ライト／ダーク切り替え）のアイコン */
  static icon() {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "18");
    svg.setAttribute("height", "18");
    svg.setAttribute("aria-hidden", "true");
    const circle = document.createElementNS(ns, "circle");
    Object.entries({ cx: 12, cy: 12, r: 8.5, fill: "none", stroke: "currentColor", "stroke-width": 2 }).forEach(([k, v]) => circle.setAttribute(k, v));
    const half = document.createElementNS(ns, "path");
    half.setAttribute("d", "M12 3.5a8.5 8.5 0 0 1 0 17z");
    half.setAttribute("fill", "currentColor");
    svg.append(circle, half);
    return svg;
  }
  static toggle() {
    const dark = document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches;
    const next = dark ? "light" : "dark";
    ColorScheme.apply(next);
    try {
      localStorage.setItem(ColorScheme.KEY, next);
    } catch {
      /* 保存できない環境では今回の表示だけ切り替える */
    }
  }
}

/** ヘッダー・フッターと本文領域 */
class Layout {
  constructor(root, catalog) {
    this.root = root;
    this.catalog = catalog;
    this.main = h("main", { id: "main", tabindex: "-1" });
  }

  header() {
    const search = (e) => {
      e.preventDefault();
      const q = new FormData(e.currentTarget).get("q")?.toString().trim() ?? "";
      Router.go("/search", new URLSearchParams(q ? { q } : {}));
    };
    return h(
      "header",
      { class: "site-header" },
      h(
        "div",
        { class: "site-header-inner" },
        h("a", { href: "#/", class: "brand" }, this.catalog.site.title),
        h(
          "nav",
          { class: "site-nav", "aria-label": "分野" },
          h(
            "details",
            { class: "menu" },
            h("summary", {}, "分野"),
            h("ul", {}, this.catalog.fields.map((f) => h("li", {}, h("a", { href: `#/field/${f.slug}` }, f.name)))),
          ),
          this.catalog.venues ? h("a", { href: "#/venues" }, "学会") : null,
          h("a", { href: "#/search" }, "論文検索"),
        ),
        h(
          "form",
          { class: "header-search", role: "search", onsubmit: search },
          h("input", { type: "search", name: "q", placeholder: "論文を検索", "aria-label": "論文を検索" }),
        ),
        h("button", { type: "button", class: "icon-button", "aria-label": "表示テーマ（ライト／ダーク）を切り替え", title: "表示テーマを切り替え", onclick: () => ColorScheme.toggle() }, ColorScheme.icon()),
      ),
    );
  }

  footer() {
    const d = new Date(this.catalog.generatedAt);
    const repo = this.catalog.site.repo;
    return h(
      "footer",
      { class: "site-footer" },
      h(
        "p",
        {},
        "データは各分野ブランチの field.json / spec.json / README.md と、学会ブランチの venue.json から生成しています。",
        " ",
        h("a", { href: `https://github.com/${repo}`, target: "_blank", rel: "noopener" }, repo),
        ` ・ 生成 ${d.toLocaleDateString("ja-JP")}`,
      ),
    );
  }

  mount() {
    clear(this.root).append(this.header(), this.main, this.footer());
  }

  /** 開いている分野メニューを閉じる */
  closeMenus() {
    this.root.querySelectorAll("details.menu[open]").forEach((d) => d.removeAttribute("open"));
  }
}

export class App {
  constructor(root) {
    this.root = root;
    this.router = new Router();
    this.current = null;
  }

  routes() {
    this.router
      .add("/", HomeView)
      .add("/search", SearchView)
      .add("/field/:field", FieldView)
      .add("/field/:field/:theme", ThemeView)
      .add("/field/:field/:theme/:number", PaperView)
      .add("/venues", VenuesView)
      .add("/venue/:venue", VenueView)
      .add("/venue/:venue/:number", VenuePaperView)
      .otherwise(NotFoundView);
  }

  async start() {
    ColorScheme.apply(ColorScheme.saved);
    try {
      this.catalog = await Catalog.load();
    } catch (err) {
      clear(this.root).append(h("main", { class: "page" }, h("h1", {}, "データを読み込めませんでした"), h("p", {}, String(err))));
      return;
    }
    this.layout = new Layout(this.root, this.catalog);
    this.layout.mount();
    this.routes();
    this.router.onChange((match) => this.show(match));
    this.router.start();
  }

  async show({ handler, params, query, path }) {
    this.current?.unmount();
    this.layout.closeMenus();
    const view = new handler(this, { params, query, path });
    this.current = view;
    const main = this.layout.main;
    main.setAttribute("aria-busy", "true");
    let node;
    try {
      node = await view.render();
    } catch (err) {
      node = h("div", { class: "page" }, h("h1", {}, "表示できませんでした"), h("p", {}, String(err)));
    }
    if (this.current !== view) return; // 読み込み中に別の画面へ移った
    clear(main).append(node);
    main.removeAttribute("aria-busy");
    document.title = [view.title, this.catalog.site.title].filter(Boolean).join(" ｜ ");
    window.scrollTo(0, 0);
    view.mounted();
  }
}

new App(document.getElementById("app")).start();
