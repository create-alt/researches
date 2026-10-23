# researches — 先行研究調査アーカイブ

先行研究調査の結果をまとめるためのリポジトリです。
指定した分野の近年の研究動向を **落合陽一フォーマット（1論文1スライド）** でまとめ、分野・テーマごとにスライドを作成します。

この README（main ブランチ）は、全分野ブランチの概要をまとめる入口です。

## 分野ブランチ一覧

| 分野 | ブランチ | テーマ（第1回／第2回） | スライド化 / 一覧掲載 | 最終更新 |
| --- | --- | --- | --- | --- |
| 世界モデル | [`world-model`](https://github.com/create-alt/researches/tree/world-model) | 内発的報酬、階層化／JEPA 系潜在世界モデル、潜在空間での計画、動画・基盤世界モデルのデータ収集 | 50 / 170 本 | 2026-10-23 |
| 群知能 | [`swarm-intelligence`](https://github.com/create-alt/researches/tree/swarm-intelligence) | 全体像、DL・NN との融合、GA との融合／Meta-BBO・LLM による自動設計、CBO と平均場理論、ACO と Neural ACO | 61 / 198 本 | 2026-10-23 |
| SNN | [`snn`](https://github.com/create-alt/researches/tree/snn) | 学習手法、Spiking Transformer・大規模化、ニューロモルフィック HW と応用／並列学習とスパイキング SSM、エネルギー評価、スパイク符号化と量子化 | 66 / 206 本 | 2026-10-23 |

> 分野ブランチを作成・更新したら、この表にも追記します。

## 候補分野（隣接分野の最新研究メモ）

既存の3分野から見て関連が深い隣接分野について、2025〜2026 年の最新研究を調べたメモ（ブランチ化する前の下調べ）。各ファイルに分野の概要・古典・最新研究6本の要約・テーマ案がある。

| 分野 | 既存分野とのつながり | メモ |
| --- | --- | --- |
| 能動的推論・自由エネルギー原理 | 世界モデル（好奇心＝認識的価値、階層的生成モデル）、SNN（脳の計算理論） | [active-inference.md](candidates/active-inference.md) |
| オープンエンド学習・人工生命・Quality-Diversity | 群知能・GA（多様性維持、LLM 駆動の進化）、内発的報酬（新奇性） | [open-endedness.md](candidates/open-endedness.md) |
| ニューラルセルオートマトン・自己組織化 | 群知能（局所則からの創発）、SNN（局所・並列計算）、世界モデル（CA は最小の世界） | [neural-cellular-automata.md](candidates/neural-cellular-automata.md) |
| イベントベース視覚とニューロモルフィック・ロボティクス | SNN・ニューロモルフィック HW の身体的応用、イベントからの世界モデル学習 | [neuromorphic-robotics.md](candidates/neuromorphic-robotics.md) |

## リポジトリ構成

```
main
├── README.md                          # 本ファイル（全分野の概要）
├── template/
│   ├── ochiai_format_template.pptx    # 落合陽一フォーマットのテンプレート（1枚）
│   └── ochiai_format_template.pdf     # 上記の PDF 版
├── tools/ochiai/                      # スライド生成スクリプト（pptxgenjs）
└── candidates/                        # 候補分野（隣接分野）の最新研究メモ

<分野ブランチ>（例：world-model, swarm-intelligence）
├── README.md                          # 調査履歴・引用論文一覧（概要＋リンク）
└── <テーマ>/                           # 例：intrinsic-reward, pso
    ├── <テーマ>.pptx                   # 1論文1スライドでまとめたデッキ
    └── <テーマ>.pdf                    # 上記の PDF 版
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
