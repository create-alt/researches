// ハッシュベースのルーター（GitHub Pages ではサーバー側の書き換えができないため）
//
//   router.add("/field/:field/:theme", ThemeView)
//   location.hash = "#/field/snn/training?x=1"  →  params = { field: "snn", theme: "training" }, query = URLSearchParams

export class Route {
  constructor(pattern, handler) {
    this.pattern = pattern;
    this.handler = handler;
    this.keys = [];
    const re = pattern
      .split("/")
      .map((seg) => {
        if (seg.startsWith(":")) {
          this.keys.push(seg.slice(1));
          return "([^/]+)";
        }
        return seg.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      })
      .join("/");
    this.regex = new RegExp(`^${re}/?$`);
  }

  match(path) {
    const m = this.regex.exec(path);
    if (!m) return null;
    return Object.fromEntries(this.keys.map((k, i) => [k, decodeURIComponent(m[i + 1])]));
  }
}

export class Router {
  constructor() {
    this.routes = [];
    this.fallback = null;
    this.listeners = [];
  }

  add(pattern, handler) {
    this.routes.push(new Route(pattern, handler));
    return this;
  }

  otherwise(handler) {
    this.fallback = handler;
    return this;
  }

  onChange(fn) {
    this.listeners.push(fn);
  }

  /** 現在のハッシュを { path, query } に分解 */
  static current() {
    const raw = location.hash.replace(/^#/, "") || "/";
    const [path, qs = ""] = raw.split("?");
    return { path: path || "/", query: new URLSearchParams(qs) };
  }

  static go(path, query) {
    const qs = query && [...query].length ? `?${query}` : "";
    location.hash = `#${path}${qs}`;
  }

  resolve() {
    const { path, query } = Router.current();
    for (const route of this.routes) {
      const params = route.match(path);
      if (params) return { handler: route.handler, params, query, path };
    }
    return { handler: this.fallback, params: {}, query, path };
  }

  start() {
    const fire = () => {
      const match = this.resolve();
      for (const fn of this.listeners) fn(match);
    };
    window.addEventListener("hashchange", fire);
    fire();
  }
}

/** 画面内リンク用のハッシュ URL を作る */
export function link(...segments) {
  return `#/${segments.map((s) => encodeURIComponent(s)).join("/")}`;
}
