#!/usr/bin/env node
// 分野ブランチの README.md を field.json と各テーマの README.md / spec.json から再生成する
//
//   node tools/site/readme.mjs            カレントディレクトリ（分野ブランチの作業ツリー）の README.md を書き換える
//   node tools/site/readme.mjs <dir>      指定したディレクトリを対象にする
//   node tools/site/readme.mjs --check    書き換えずに差分の有無だけを返す（差分があれば終了コード 1）
import fs from "node:fs";
import path from "node:path";
import { DirectorySource } from "./lib/sources.mjs";
import { FieldRepository } from "./lib/repository.mjs";
import { FieldReadmeWriter } from "./lib/readme-writer.mjs";

const args = process.argv.slice(2);
const check = args.includes("--check");
const dir = path.resolve(args.find((a) => !a.startsWith("--")) ?? ".");

const src = new DirectorySource(dir);
const field = new FieldRepository([src]).loadField(src);
const text = new FieldReadmeWriter(field).render();
const target = path.join(dir, "README.md");
const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";

if (check) {
  console.log(current === text ? "README.md is up to date" : "README.md is out of date");
  process.exit(current === text ? 0 : 1);
}
fs.writeFileSync(target, text);
console.log(`wrote ${target}: ${field.themes.length} themes, ${field.papers.length} papers`);
