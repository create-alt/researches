# researches — 先行研究調査アーカイブ

先行研究調査の結果をまとめるためのリポジトリです。
指定した分野の近年の研究動向を **落合陽一フォーマット（1論文1スライド）** でまとめ、分野・テーマごとにスライドを作成します。

この README（main ブランチ）は、全分野ブランチの概要をまとめる入口です。

## 分野ブランチ一覧

| 分野 | ブランチ | テーマ（回ごとに ／ で区切り） | スライド化 / 一覧掲載 | 調査回 | 最終更新 |
| --- | --- | --- | --- | --- | --- |
| 世界モデル | [`world-model`](https://github.com/create-alt/researches/tree/world-model) | 内発的報酬、階層化／JEPA 系潜在世界モデル、潜在空間での計画、動画・基盤世界モデルのデータ収集／評価・診断指標、確率的潜在世界モデル、潜在行動と世界モデル内の方策学習 | 81 / 286 本 | 第1〜3回 | 2026-10-24 |
| 群知能 | [`swarm-intelligence`](https://github.com/create-alt/researches/tree/swarm-intelligence) | 全体像、DL・NN との融合、GA との融合／Meta-BBO・LLM による自動設計、CBO と平均場理論、ACO と Neural ACO／自動設計アルゴリズムの評価基盤、学習型群知能、粒子系最適化の理論 | 94 / 314 本 | 第1〜3回 | 2026-10-24 |
| SNN | [`snn`](https://github.com/create-alt/researches/tree/snn) | 学習手法、Spiking Transformer・大規模化、ニューロモルフィック HW と応用／並列学習とスパイキング SSM、エネルギー評価、スパイク符号化と量子化／量子化 ANN との公平なベンチマーク、加速器のデータフロー、選択的スパイキング×低ビット LLM | 96 / 318 本 | 第1〜3回 | 2026-10-24 |
| 能動的推論・自由エネルギー原理 | [`active-inference`](https://github.com/create-alt/researches/tree/active-inference) | 深層能動的推論と世界モデル、階層的・多時間スケール生成モデル、認識的価値と LLM・発達ロボティクス | 31 / 79 本 | 第1回 | 2026-10-24 |
| オープンエンド学習・人工生命 | [`open-endedness`](https://github.com/create-alt/researches/tree/open-endedness) | Quality-Diversity、LLM 駆動の進化と自己改善エージェント、基盤モデル×人工生命とオープンエンド性の評価 | 30 / 102 本 | 第1回 | 2026-10-24 |
| ニューラルセルオートマトン・自己組織化 | [`neural-cellular-automata`](https://github.com/create-alt/researches/tree/neural-cellular-automata) | 局所則の世界モデル・推論器としての NCA、学習される群知能、離散・非同期 NCA のハードウェア化 | 29 / 91 本 | 第1回 | 2026-10-24 |
| イベントベース視覚とニューロモルフィック・ロボティクス | [`neuromorphic-robotics`](https://github.com/create-alt/researches/tree/neuromorphic-robotics) | イベントベース世界モデルと表現学習、完全ニューロモルフィック閉ループ、チップ上の局所学習による身体の適応 | 32 / 110 本 | 第1回 | 2026-10-24 |
| 言語と行動の接地・汎化 | [`language-action`](https://github.com/create-alt/researches/tree/language-action) | 組成的汎化と言語・行動の共発達、言語から報酬・目標を生成する行動獲得、基盤モデル・言語条件付き世界モデルによるゼロショット行動生成 | 31 / 96 本 | 第1回 | 2026-10-25 |
| 遺伝的アルゴリズム | [`genetic-algorithm`](https://github.com/create-alt/researches/tree/genetic-algorithm) | NEAT とトポロジー進化・間接符号化、CMA-ES とその発展、遺伝的アルゴリズムの応用、遺伝的プログラミングとシンボリック回帰、進化戦略・ニューロエボリューションの大規模化 | 52 / 166 本 | 第1回 | 2026-10-27 |
| 免疫アルゴリズム | [`immune-algorithm`](https://github.com/create-alt/researches/tree/immune-algorithm) | クローン選択と免疫最適化アルゴリズム、自己・非自己識別と異常検知、免疫ネットワーク理論と機械学習・AI との融合 | 28 / 103 本 | 第1回 | 2026-10-27 |
| グラフニューラルネットワーク | [`gnn`](https://github.com/create-alt/researches/tree/gnn) | メッセージパッシング GNN の基礎と表現力、Graph Transformer・グラフ基盤モデルと LLM、GNN による物理シミュレーション・世界モデル | 32 / 98 本 | 第1回 | 2026-10-27 |
| ハイパーネットワーク | [`hypernetworks`](https://github.com/create-alt/researches/tree/hypernetworks) | ハイパーネットワークの基礎と重み生成、メタ学習・継続学習とアダプタ生成、重み空間の学習と拡散によるパラメータ生成 | 31 / 99 本 | 第1回 | 2026-10-27 |

合計：スライド化 567 本（12 分野・55 テーマ）。

> 分野ブランチを作成・更新したら、この表にも追記します。各ブランチの README に、調査履歴・系譜・引用論文一覧・次の推奨テーマがあります。

## 候補分野メモ（candidates/）

分野ブランチを作る前に、隣接分野の最新研究を下調べしたメモ。2026-10-24 に4分野すべてをブランチ化した（上表の下4行）。

| 分野 | メモ | ブランチ |
| --- | --- | --- |
| 能動的推論・自由エネルギー原理 | [active-inference.md](candidates/active-inference.md) | [`active-inference`](https://github.com/create-alt/researches/tree/active-inference) |
| オープンエンド学習・人工生命 | [open-endedness.md](candidates/open-endedness.md) | [`open-endedness`](https://github.com/create-alt/researches/tree/open-endedness) |
| ニューラルセルオートマトン・自己組織化 | [neural-cellular-automata.md](candidates/neural-cellular-automata.md) | [`neural-cellular-automata`](https://github.com/create-alt/researches/tree/neural-cellular-automata) |
| イベントベース視覚とニューロモルフィック・ロボティクス | [neuromorphic-robotics.md](candidates/neuromorphic-robotics.md) | [`neuromorphic-robotics`](https://github.com/create-alt/researches/tree/neuromorphic-robotics) |

## リポジトリ構成

```
main
├── README.md                          # 本ファイル（全分野の概要）
├── template/
│   ├── ochiai_format_template.pptx    # 落合陽一フォーマットのテンプレート（1枚）
│   └── ochiai_format_template.pdf     # 上記の PDF 版
├── tools/ochiai/                      # スライド生成スクリプト（pptxgenjs）
├── tools/site/                        # Web サイト生成・ブランチ README 生成（Node）
├── site/                              # Web サイトの画面（HTML / CSS / ES モジュール）
├── .github/workflows/                 # GitHub Pages への公開
└── candidates/                        # 候補分野（隣接分野）の最新研究メモ

<分野ブランチ>（例：world-model, swarm-intelligence）
├── README.md                          # 調査履歴・引用論文一覧（field.json と各テーマの README から生成）
├── field.json                         # 分野のメタデータ（テーマ順・調査履歴・推奨テーマ）
└── <テーマ>/                           # 例：intrinsic-reward, pso
    ├── <テーマ>.pptx                   # 1論文1スライドでまとめたデッキ
    ├── <テーマ>.pdf                    # 上記の PDF 版
    ├── spec.json                      # デッキの元データ（Web サイトもここから生成）
    ├── README.md                      # テーマの調査履歴・系譜・引用論文一覧
    └── figures/                       # 代表図
```

- ブランチ名・ディレクトリ名は英小文字とハイフン（例：`world-model`、`intrinsic-reward`）。
- 分野ブランチの README.md には次をまとめます。
  - **調査履歴**：いつ・どのテーマを・どこまで調べたか
  - **引用論文一覧**：調査の過程で扱ったすべての論文について、概要・元リンク・スライド化の有無

## 落合陽一フォーマット

各スライドは次の6項目と書誌情報・代表図で構成します（記載内容の詳細は [テンプレート](template/ochiai_format_template.pdf) を参照）。

| # | 項目 | 書く内容 |
| --- | --- | --- |
| 1 | どんなもの？ | 何をした論文かを2〜3文で要約。問題・手法名・最大の成果 |
| 2 | 先行研究と比べてどこがすごい？ | 既存手法の限界（問題提起）と本研究の差分・新規性 |
| 3 | 技術や手法のキモはどこ？ | 新規性・性能を生む中核アイデア（構造・目的関数・アルゴリズム） |
| 4 | どうやって有効だと検証した？ | データセット・ベースライン・評価指標と主要な定量結果 |
| 5 | 議論はある？ | 著者が認める限界と調査者の所感（区別して記載） |
| 6 | 次に読むべき論文は？ | 原典・比較対象・後続研究など系譜上つながる論文 |

右カラムには論文中の代表図（図番号付き）と書誌情報（発表・リンク・系譜上の位置・調査日・確認範囲）を置きます。

## 調査の進め方

1. **最新動向から着手**：テーマについてまず直近の論文を調べる。
2. **系譜を遡る**：得られた論文が特定の系譜を持つ場合は、原典とその流れを追い、各論文を1枚ずつまとめる。
3. **全文を読む**：アブストラクトだけでなく、問題提起・手法・実験・結果・考察まで確認してからまとめる。
4. **README に記録**：調査の過程で扱った論文はすべて、分野ブランチの README.md に概要と元リンクを記載する。
5. **アクセスできない論文の扱い**：本文を確認できない論文はスライドにしない。影響が大きいと考えられるものは、README に「本文未確認」と明記したうえで概要を記載する。
   - 本文の取得元は arXiv と正規のオープンアクセス版（OpenReview、学会予稿集、OA 誌、PMC、著者・所属機関の公開 PDF など）。出版社サイト（IEEE、ACM、Springer、Elsevier）は対象外。

## スライドの生成

`tools/ochiai/` の pptxgenjs スクリプトで、全スライドを同じレイアウトから生成します。

```bash
cd tools/ochiai
npm install
node template.js                                  # template/ochiai_format_template.pptx を再生成
node build.js <theme>/spec.json <theme>/<theme>.pptx  # テーマのデッキ（表紙＋1論文1スライド）を生成
./to_pdf.sh <theme>/<theme>.pptx                   # PDF 化（LibreOffice。Meiryo が無い環境では fonts.conf で日本語フォントに置換）
```

- `spec.json` の書式は `build.js` 冒頭のコメントを参照。各欄の文字量に応じて 12pt〜9pt の範囲で文字サイズを自動調整し、収まらない欄は警告します。
- デッキの1枚目は表紙（テーマ概要と調査論文の一覧）、2枚目以降が1論文1スライドです。

## Web サイト（GitHub Pages）

スライドにまとめた内容を、分野 → テーマ → 論文の順にブラウザで読めるサイトを `tools/site/` で生成します。全論文の検索もできます。pptx・pdf・README はこれまでどおり各分野ブランチに残し、サイトはそれらから毎回作り直します。

- 公開手順：リポジトリを public にしたあと、Settings → Pages → Source を「GitHub Actions」にして、Actions の「Deploy research site」を実行する。公開先は `https://create-alt.github.io/researches/`。
- 更新：main または分野ブランチへの push で自動的に作り直される（`.github/workflows/`）。
- 分野・テーマの追加手順とコードの構成は [tools/site/README.md](tools/site/README.md) を参照。

```bash
npm ci --prefix tools/site
git fetch origin '+refs/heads/*:refs/remotes/origin/*'
node tools/site/build.mjs                 # _site/ に出力
python3 -m http.server -d _site 8000      # → http://localhost:8000/
```
