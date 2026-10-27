#!/usr/bin/env node
// GitHub Pages 用の静的サイトを生成する
//
//   node tools/site/build.mjs                 remote（既定 origin）の全ブランチから field.json を持つものを集めて _site/ に出力
//   node tools/site/build.mjs --out dir       出力先を変更
//   node tools/site/build.mjs --remote name   読み出す remote を変更
//   node tools/site/build.mjs --local         remote ではなくローカルブランチから読む（push 前の確認用）
//
// 事前に `git fetch origin '+refs/heads/*:refs/remotes/origin/*'` で全ブランチを取得しておくこと。
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GitRefSource } from "./lib/sources.mjs";
import { FieldRepository } from "./lib/repository.mjs";
import { SiteBuilder } from "./lib/site-builder.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const config = JSON.parse(fs.readFileSync(path.join(here, "site.config.json"), "utf8"));

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] : fallback;
};
const repoDir = path.resolve(here, "../..");
const remote = opt("--remote", config.remote);
const outDir = path.resolve(here, opt("--out", config.outDir));
if (process.env.GITHUB_REPOSITORY) config.repo = process.env.GITHUB_REPOSITORY;

const sources = args.includes("--local") ? GitRefSource.fromLocal(repoDir) : GitRefSource.fromRemote(repoDir, remote);
const fields = new FieldRepository(sources).loadFields({ log: (m) => console.log(m) });
new SiteBuilder({
  sourceDir: path.resolve(here, config.sourceDir),
  outDir,
  config,
  sources: new Map(sources.map((s) => [s.name, s])),
}).build(fields);
