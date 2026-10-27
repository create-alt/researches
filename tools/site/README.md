# 調査サイト（GitHub Pages）

各分野ブランチにある調査結果（`field.json` / `spec.json` / テーマの `README.md` / 代表図）を集めて、スライドの内容をブラウザで読める静的サイトを生成する。pptx・pdf・README はこれまでどおり各ブランチに残し、サイトはそれらから毎回作り直す。

## 仕組み

```
分野ブランチ（world-model, snn, …）              main
  field.json            ─┐                       tools/site/        ビルダー（Node）
  <theme>/spec.json      ├─ git から直接読む ──→    build.mjs  ──→  _site/  ──→  GitHub Pages
  <theme>/README.md      │                        site/              画面（HTML / CSS / ES モジュール）
  <theme>/figures/*.png ─┘
```

- ビルダーは remote（`origin`）の全ブランチを走査し、ルートに `field.json` があるブランチを分野として取り込む。分野の表示順は `field.json` の `order`。
- ルートに `conferences.json` があるブランチ（`conferences`）は「学会」欄として取り込む（締切・特徴・受賞論文。`#/venues`, `#/venue/<学会>/<n>`）。
- 画面はハッシュルーティングの 1 ページアプリ（`#/field/<分野>/<テーマ>/<n>`）。サーバー側の設定は不要。
- データは `_site/data/catalog.json`（全分野の要約と全論文の検索用一覧）と、テーマごとの `_site/data/fields/<分野>/<テーマ>/theme.json`（論文全文と README の HTML）に分けて、テーマを開いたときに読み込む。

## コードの構成

| ファイル | クラス | 役割 |
| --- | --- | --- |
| `lib/sources.mjs` | `Source`, `GitRefSource`, `DirectorySource` | 読み出し元。Git の ref と作業ツリーを同じ API で扱う |
| `lib/models.mjs` | `Field`, `Theme`, `Paper` | 分野ブランチのファイル構成と、サイト用データへの変換 |
| `lib/repository.mjs` | `FieldRepository` | 読み出し元から `Field` を組み立てる |
| `lib/markdown.mjs` | `MarkdownRenderer` | テーマ README を HTML に変換 |
| `lib/site-builder.mjs` | `SiteBuilder` | `_site/` への書き出し |
| `lib/readme-writer.mjs` | `FieldReadmeWriter` | 分野ブランチの `README.md` を生成 |
| `lib/venue-models.mjs` | `VenueCollection`, `Venue`, `VenuePaper`, `Deadline` | 学会ブランチのファイル構成と、サイト用データへの変換（次の締切の判定を含む） |
| `lib/venue-repository.mjs` | `VenueRepository` | 読み出し元から学会欄を組み立てる |
| `lib/venue-readme-writer.mjs` | `VenueReadmeWriter` | 学会ブランチの `README.md` を生成 |
| `site/assets/js/models/catalog.js` | `Catalog`, `FieldSummary`, `ThemeSummary`, `ThemeDetail`, `PaperSummary`, `VenueIndex`, `VenueSummary`, `VenueDetail` | 画面側のデータモデルと検索 |
| `site/assets/js/core/router.js` | `Router`, `Route` | ハッシュルーティング |
| `site/assets/js/views/*.js` | `View` と各画面（`HomeView`, `FieldView`, `ThemeView`, `PaperView`, `SearchView`, `VenuesView`, `VenueView`, `VenuePaperView`） | 画面ごとの描画。部品は `components.js`（`PaperSlide` と、詳細・評価ポイントを加えた `AwardPaperSlide` など） |
| `site/assets/js/app.js` | `App`, `Layout`, `ColorScheme` | ルートと画面クラスの対応、共通レイアウト |

画面を足すときは `View` のサブクラスを `site/assets/js/views/` に作り、`App.routes()` に 1 行追加する。

## 使い方

```bash
npm ci --prefix tools/site

# 全ブランチを取得してからビルド（GitHub Actions と同じ）
git fetch origin '+refs/heads/*:refs/remotes/origin/*'
node tools/site/build.mjs

# push 前のローカルブランチで確認する場合
node tools/site/build.mjs --local

# 確認用サーバー
python3 -m http.server -d _site 8000   # → http://localhost:8000/
```

## 分野・テーマを追加する

### テーマを追加する（既存の分野ブランチ）

1. `<theme>/spec.json` と `<theme>/figures/` を作り、`tools/ochiai/build.js` で pptx を、`tools/ochiai/to_pdf.sh` で pdf を作る。
2. `<theme>/README.md` に調査履歴・系譜・引用論文一覧を書く（先頭行は `## テーマ名（<theme>/）`）。
3. `field.json` の `themes` にテーマを足す（`slug` / `name` / `scope` / `round` / `date`）。必要なら `history` と `next` も更新する。
4. ブランチの README を作り直す: `node tools/site/readme.mjs`（分野ブランチの作業ツリーで実行）。
5. push すると、`request-pages-build.yml` が main のサイト生成を起動する。

### 分野を追加する

1. main から新しいブランチを作る（`.github/workflows/request-pages-build.yml` もそのまま引き継がれる）。
2. ルートに `field.json` を置く。

```json
{
  "slug": "new-field",
  "name": "分野名",
  "order": 9,
  "overview": "分野の概要",
  "themes": [{ "slug": "theme-a", "name": "テーマ名", "scope": "範囲", "round": 1, "date": "YYYY-MM-DD" }],
  "history": [{ "date": "YYYY-MM-DD", "round": 1, "text": "調査の内容" }],
  "next": [{ "title": "次に調べるテーマ", "body": "理由" }],
  "done": []
}
```

3. テーマを上の手順で追加して push する。サイトのコードの変更は不要。

## 学会を追加する（conferences ブランチ）

1. `conferences.json` の `venues` に学会の slug を足す（並び順もこの配列の順）。
2. `<slug>/venue.json`（締切・形式・特徴・傾向・対応分野・受賞論文の一覧。書式は `lib/venue-models.mjs` 冒頭と既存の学会を参照）、`<slug>/spec.json`（受賞・注目論文。分野と同じ書式に `award` / `detail` / `points` を加える）、`<slug>/README.md`、`<slug>/figures/` を置く。
3. `node tools/ochiai/build.js <slug>/spec.json <slug>/<slug>.pptx` でデッキ（論文ごとに落合スライド＋詳細スライド）を作り PDF に変換、`node tools/site/readme.mjs .` でブランチの README を作り直して push する。
4. 締切の「次の締切」はサイトのビルド日を基準に判定する（毎日のビルドで自動的に次の回へ進む）。`venue.json` の `upcoming` は回が終わったら次の回に書き換える。

## 公開の手順（リポジトリを public にした後）

1. Settings → Pages → Build and deployment → Source を「GitHub Actions」にする。
2. Actions タブで「Deploy research site」を手動実行する（以後は main・分野ブランチへの push と毎日の定期実行で更新される）。
3. 公開 URL は `https://<owner>.github.io/<repo>/`（このリポジトリなら `https://create-alt.github.io/researches/`）。

サイト上の PDF・PPTX・README へのリンクは GitHub のファイルページを指すため、リポジトリが public になってから有効になる。
