#!/usr/bin/env node
// 分野ブランチの README.md を field.json と各テーマの README.md / spec.json から再生成する
// （学会ブランチでは conferences.json と各学会の venue.json / README.md から再生成する）
//
//   node tools/site/readme.mjs            カレントディレクトリ（分野ブランチの作業ツリー）の README.md を書き換える
//   node tools/site/readme.mjs <dir>      指定したディレクトリを対象にする
//   node tools/site/readme.mjs --check    書き換えずに差分の有無だけを返す（差分があれば終了コード 1）
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { DirectorySource } from "./lib/sources.mjs";
import { FieldRepository } from "./lib/repository.mjs";
import { FieldReadmeWriter } from "./lib/readme-writer.mjs";
import { VENUES_META, VenueRepository } from "./lib/venue-repository.mjs";
import { VenueReadmeWriter } from "./lib/venue-readme-writer.mjs";

const args = process.argv.slice(2);
const check = args.includes("--check");
const dir = path.resolve(args.find((a) => !a.startsWith("--")) ?? ".");

const src = new DirectorySource(dir);
const isVenues = src.exists(VENUES_META);
const model = isVenues ? new VenueRepository([src]).loadFrom(src) : new FieldRepository([src]).loadField(src);
const config = JSON.parse(fs.readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "site.config.json"), "utf8"));
const text = isVenues ? new VenueReadmeWriter(model, { repo: config.repo }).render() : new FieldReadmeWriter(model).render();
const target = path.join(dir, "README.md");
const current = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";

if (check) {
  console.log(current === text ? "README.md is up to date" : "README.md is out of date");
  process.exit(current === text ? 0 : 1);
}
fs.writeFileSync(target, text);
console.log(`wrote ${target}: ${isVenues ? `${model.venues.length} venues` : `${model.themes.length} themes`}, ${model.papers.length} papers`);
