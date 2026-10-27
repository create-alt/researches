// 分野データの読み出し元。Git のブランチ（ビルド時）と作業ツリー（README 生成時）を同じ API で扱う。
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

/** 読み出し元の共通インターフェース */
export class Source {
  /** @returns {string} 表示用の名前（ブランチ名など） */
  get name() { throw new Error("not implemented"); }
  exists(_relPath) { throw new Error("not implemented"); }
  readText(relPath) { return this.readBuffer(relPath).toString("utf8"); }
  readJSON(relPath) { return JSON.parse(this.readText(relPath)); }
  readBuffer(_relPath) { throw new Error("not implemented"); }
  /** ディレクトリ直下のファイル名一覧 */
  listFiles(_relDir) { throw new Error("not implemented"); }
}

/** Git の ref（例: origin/world-model）のツリーを読む */
export class GitRefSource extends Source {
  constructor(repoDir, ref, branch) {
    super();
    this.repoDir = repoDir;
    this.ref = ref;
    this.branch = branch;
  }
  get name() { return this.branch; }
  #git(args, encoding = "utf8") {
    return execFileSync("git", ["-C", this.repoDir, ...args], { encoding, maxBuffer: 1 << 28, stdio: ["ignore", "pipe", "ignore"] });
  }
  exists(relPath) {
    try {
      this.#git(["cat-file", "-e", `${this.ref}:${relPath}`]);
      return true;
    } catch {
      return false;
    }
  }
  readBuffer(relPath) {
    return this.#git(["show", `${this.ref}:${relPath}`], "buffer");
  }
  listFiles(relDir) {
    const out = this.#git(["ls-tree", "--name-only", `${this.ref}:${relDir}`]);
    return out.split("\n").filter(Boolean);
  }

  /** remote の全ブランチを GitRefSource として列挙する */
  static fromRemote(repoDir, remote) {
    return GitRefSource.#list(repoDir, `refs/remotes/${remote}`).map((ref) => new GitRefSource(repoDir, ref, ref.slice(remote.length + 1)));
  }

  /** ローカルの全ブランチを列挙する（push 前の確認用） */
  static fromLocal(repoDir) {
    return GitRefSource.#list(repoDir, "refs/heads").map((ref) => new GitRefSource(repoDir, ref, ref));
  }

  static #list(repoDir, prefix) {
    const out = execFileSync("git", ["-C", repoDir, "for-each-ref", "--format=%(refname:short)", prefix], { encoding: "utf8" });
    return out.split("\n").filter((r) => r && !r.endsWith("/HEAD"));
  }
}

/** ファイルシステム上のディレクトリ（分野ブランチの作業ツリー）を読む */
export class DirectorySource extends Source {
  constructor(dir, branch = path.basename(dir)) {
    super();
    this.dir = dir;
    this.branch = branch;
  }
  get name() { return this.branch; }
  exists(relPath) { return fs.existsSync(path.join(this.dir, relPath)); }
  readBuffer(relPath) { return fs.readFileSync(path.join(this.dir, relPath)); }
  listFiles(relDir) {
    return fs.readdirSync(path.join(this.dir, relDir), { withFileTypes: true }).filter((d) => d.isFile()).map((d) => d.name);
  }
}
