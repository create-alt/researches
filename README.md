# ハイパーネットワーク — 先行研究調査

別のニューラルネットワークの重みを生成するネットワーク（ハイパーネットワーク）について、重み生成の基礎、メタ学習・継続学習とアダプタ生成、重み空間の学習と拡散によるパラメータ生成の観点から系譜をまとめる。遺伝的アルゴリズム分野の間接符号化（HyperNEAT）とつながる。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/`）は main ブランチから引き継いでいる。

## テーマ一覧

| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- | --- |
| 第1回 | [ハイパーネットワークの基礎と重み生成](#weight-generation) | 動的フィルタ・HyperNetworks・SMASH から、初期化、fast weights と線形 Transformer、GHN-2、Functa、注意機構＝ハイパーネットの見方、近似率の理論まで | [pptx](weight-generation/weight-generation.pptx) / [pdf](weight-generation/weight-generation.pdf) | 11 本 | 33 本 | 2026-10-27 |
| 第1回 | [メタ学習・継続学習とアダプタ生成](#task-adaptation) | 継続学習のハイパーネット・HyperTransformer・HyperZero から、HyperTuning、Text-to-LoRA、Drag-and-Drop LLMs、文書から LoRA を作る研究、ICL との比較まで | [pptx](task-adaptation/task-adaptation.pptx) / [pdf](task-adaptation/task-adaptation.pdf) | 10 本 | 31 本 | 2026-10-27 |
| 第1回 | [重み空間の学習と拡散によるパラメータ生成](#weight-space-learning) | 重みからの精度予測・G.pt・DWSNets・GMN から、p-diff・SANE・RPG、生成重みの記憶問題、置換等変な生成まで | [pptx](weight-space-learning/weight-space-learning.pptx) / [pdf](weight-space-learning/weight-space-learning.pdf) | 10 本 | 35 本 | 2026-10-27 |

合計：スライド化 31 本、引用論文一覧 99 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-27 | 第1回調査（分野新設）。「ハイパーネットワークの基礎と重み生成」、「メタ学習・継続学習とアダプタ生成」、「重み空間の学習と拡散によるパラメータ生成」の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典（Schmidhuber 1992 の fast weights など）は本文未確認として一覧に記載。既存デッキ（他分野を含む）でスライド化済みの論文は再掲せず参照。 |

## 追加調査を推奨するテーマ

これまでの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。

1. **重みの直接生成と in-context learning の関係（等価性・理論と、知識の衝突・合成）**  
   アダプタ生成テーマでは、重みを直接生成する方式がどの研究でも ICL や RAG に一貫して及ばなかった。注意機構をハイパーネットとみなす見方（基礎テーマ）と合わせ、文脈を重みに内在化するときに何が失われるか、知識の衝突・蓄積をどう扱うかを理論と実験の両面から追う。

2. **生成された重みの記憶・新規性の評価法**  
   重み空間テーマの最大の論点は、生成重みが学習データの複製・補間にすぎないという指摘（Zeng+ 2025）だった。置換等変な生成（PEFM）などの対策と、新規性を測る評価法をまとめて調べる。

3. **アーキテクチャ横断のパラメータ予測と、LLM・LoRA の重み空間学習**  
   GHN 系の初期化予測と、LoRA・LLM の重みを入力とするモデル監査・来歴推定・マージが接続しつつある。学習安定性と生成重みのスケール制御を含めて追う。

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は既存デッキ（他分野の場合は `<field>/<theme>`）でスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。

---

<a id="weight-generation"></a>

## ハイパーネットワークの基礎と重み生成（weight-generation/）

資料：[weight-generation.pptx](weight-generation/weight-generation.pptx) ／ [weight-generation.pdf](weight-generation/weight-generation.pdf) ／ 生成元 [spec.json](weight-generation/spec.json) ／ [テーマ README](weight-generation/README.md)


### 調査履歴
- 2026-10-27: arXiv API で タイトル "hypernetwork(s)" を新着順に100件取得し、2025〜2026年の動向（LoRA 生成・個人化・科学計算への応用が大半で、基礎研究は「汎用ハイパーネット」「Transformer 型」「表現力の理論」に集中）を把握した。続いて "graph hypernetwork"、"hypernetwork AND implicit neural"、"fast weight(s)"、"hypernetwork AND (attention OR transformer)"、"hypernetwork AND (initialization OR theory)" を検索し、(a) fast weights → 線形 Transformer → Attention as a Hypernetwork、(b) HyperNetworks → SMASH → GHN → GHN-2 → UHN、(c) HyperNetworks → 初期化（Hyperfan → MIP）、(d) 動的フィルタ（DFN）、(e) INR の重み生成（Functa → Trans-INR → 基盤モデル型）、(f) 理論（Galanti & Wolf → アフィン潜在パラメータ化の近似率）の系譜を遡った。
- 本文は arXiv 版で全文を読んだ（付録は必要箇所のみ）。Schmidhuber (1992) は Neural Computation 掲載で、IDSIA の著者ページ・TUM リポジトリとも到達不可、OpenAlex でも closed のため本文未確認。HyperNEAT・CPPN は genetic-algorithm/neat で並行調査中のため参照のみ。メタ学習・継続学習・LoRA 生成は同分野 task-adaptation、重み空間の学習・拡散によるパラメータ生成は同分野 weight-space-learning に譲った。既存デッキ（全分野）との重複はなし。

### 系譜
```
[fast weights / 注意の系譜]
Fast Weights (Schmidhuber 1992) ※本文未確認 ─ Ba+ (2016, fast weights を RNN に)
   └→ FWP = 線形 Transformer (Schlag+ 2021, 外積和の速い重み＋デルタ則)
          └→ Attention as a Hypernetwork (Schug+ 2024/ICLR 2025, ヘッド方向の潜在コード＝線形ハイパーネット, HYLA)

[ハイパーネットの命名と条件付き重み生成]
HyperNEAT/CPPN (2009, 進化) ※genetic-algorithm/neat
Dynamic Filter Networks (2016, 入力条件付きフィルタ) ─→ CondConv (2019), Dynamic Convolution (2020)
HyperNetworks (Ha+ 2016, 静的/動的, HyperLSTM)
   ├→ [学習の安定化] Hyperfan 初期化 (Chang+ 2020) → MIP (Ortiz+ 2023, 入力スケール比例の除去) → GHN-2 のパラメータ正規化
   ├→ [構造→重み] SMASH (2017) → GHN (2019) → GHN-2 (2021, 未知構造の全重みを予測)
   │                                          → GHN-3 (2023, Transformer 化) → LoGAH (2024, 774M の Transformer)
   │                                          → UHN (2026, 記述子→スカラー重み, 構造に依存しない生成器)
   └→ [理論] Modularity of HN (Galanti & Wolf 2020), Infinite-width HN (Littwin+ 2020)
                → アフィン潜在パラメータ化の鋭い近似率 (Zhang 2026)

[INR の重み生成]
SIREN (2020, ハイパーネットによる INR 生成を含む) / CAVIA
   └→ Functa (2022, 変調ベクトル＝線形ハイパーネットで INR をデータ化)
   └→ Trans-INR (2022, Transformer 型ハイパーネット)
          └→ 基盤モデル型ハイパーネット (Gu & Yeung-Levy 2025) → CryoHype (2026), Hyper-Transforming LDM (2025)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Dynamic Filter Networks](https://arxiv.org/abs/1605.09673) | 2016 | NIPS 2016 | 原典 | 入力からフィルタを生成する動的畳み込み・動的局所フィルタ。Moving MNIST で Conv-LSTM の約1/12のパラメータで上回る | ✅ p.2 |
| 2 | [HyperNetworks](https://arxiv.org/abs/1609.09106) | 2016 | ICLR 2017 | 原典 | ハイパーネットの命名・体系化。静的版（CNN）と動的版（HyperLSTM） | ✅ p.3 |
| 3 | [SMASH: One-Shot Model Architecture Search through HyperNetworks](https://arxiv.org/abs/1708.05344) | 2017 | ICLR 2018 | 発展 | 構造の符号から重みを生成し、1回の学習で多数の構造を順位付けする NAS | ✅ p.4 |
| 4 | [Principled Weight Initialization for Hypernetworks](https://arxiv.org/abs/2312.08399) | 2020 | ICLR 2020 | 発展 | 古典的初期化が主ネットの重みスケールを壊すことを示し hyperfan 初期化を導出 | ✅ p.5 |
| 5 | [Linear Transformers Are Secretly Fast Weight Programmers](https://arxiv.org/abs/2102.11174) | 2021 | ICML 2021 | 発展 | 線形注意＝fast weight programmer の等価性、容量限界とデルタ則更新 | ✅ p.6 |
| 6 | [Parameter Prediction for Unseen Deep Architectures](https://arxiv.org/abs/2110.13100) | 2021 | NeurIPS 2021 | 発展 | GHN-2 と DeepNets-1M。未知構造の全重みを1回の順伝播で予測 | ✅ p.7 |
| 7 | [From data to functa: Your data point is a function and you can treat it like one](https://arxiv.org/abs/2201.12204) | 2022 | ICML 2022 | 発展 | INR の変調（線形ハイパーネット出力）をデータとして生成・分類に使う | ✅ p.8 |
| 8 | [Attention as a Hypernetwork](https://arxiv.org/abs/2406.05816) | 2024 | ICLR 2025 (Oral) | 最新 | マルチヘッド注意を線形ハイパーネットとして再定式化し、組成的汎化との関係を示す。HYLA を提案 | ✅ p.9 |
| 9 | [Foundation Models Secretly Understand Neural Network Weights: Enhancing Hypernetwork Architectures with Foundation Models](https://arxiv.org/abs/2503.00838) | 2025 | ICLR 2025 | 最新 | Transformer 型ハイパーネットのエンコーダを基盤モデルにすると INR 生成が改善 | ✅ p.10 |
| 10 | [Universal Hypernetworks for Arbitrary Models](https://arxiv.org/abs/2604.02215) | 2026 | arXiv プレプリント | 最新 | 記述子から各スカラー重みを予測する構造非依存の生成器。多モデル・多タスク・再帰生成 | ✅ p.11 |
| 11 | [Sharp Approximation Rates for Neural Networks with Affine Latent Parameterizations](https://arxiv.org/abs/2608.31157) | 2026 | arXiv プレプリント | 最新 | アフィン生成器での最悪近似誤差 [P·min{M,P}]^(−α/d) を上下界一致で証明 | ✅ p.12 |
| 12 | [Learning to Control Fast-Weight Memories: An Alternative to Dynamic Recurrent Networks](https://doi.org/10.1162/neco.1992.4.1.131) | 1992 | Neural Computation 4(1) | 原典 | 遅いネットが外積命令で速いネットの重みを書き換える fast weights の原典（Schlag+ 2021・Ha+ 2016 の記述に基づく） | ⚠️ 本文未確認 |
| 13 | [Using Fast Weights to Attend to the Recent Past](https://arxiv.org/abs/1610.06258) | 2016 | NIPS 2016 | 発展 | Hebb 型の速い重みを RNN に加え短期記憶に使う。要旨のみ確認 | — 参照のみ（FWP スライドで系譜を代表） |
| 14 | [A Hypercube-Based Encoding for Evolving Large-Scale Neural Networks (HyperNEAT)](https://doi.org/10.1162/artl.2009.15.2.15202) | 2009 | Artificial Life 15(2) | 原典 | CPPN が大規模ネットの重みパターンを生成する進化的手法 | — 参照のみ（genetic-algorithm/neat で並行調査） |
| 15 | [Graph HyperNetworks for Neural Architecture Search](https://arxiv.org/abs/1810.05749) | 2018 | ICLR 2019 | 発展 | 計算グラフに GNN を適用して重みを生成し NAS に使う GHN-1。要旨確認（手法は GHN-2 論文の記述で確認） | — 参照のみ（GHN-2 スライドで扱う） |
| 16 | [Can We Scale Transformers to Predict Parameters of Diverse ImageNet Models?](https://arxiv.org/abs/2303.04143) | 2023 | ICML 2023 | 発展 | GHN-3：Transformer 化した GHN で ImageNet モデルの初期値を予測。要旨確認 | — 参照のみ（初期化用途で本テーマの主線から外れる） |
| 17 | [LoGAH: Predicting 774-Million-Parameter Transformers using Graph HyperNetworks with 1/100 Parameters](https://arxiv.org/abs/2405.16287) | 2024 | arXiv プレプリント | 発展 | 低ランクデコーダで大規模 Transformer の初期値を GHN で予測。要旨確認 | — 参照のみ |
| 18 | [Magnitude Invariant Parametrizations Improve Hypernetwork Learning](https://arxiv.org/abs/2304.07645) | 2023 | arXiv プレプリント | 発展 | 入力の大きさに出力重みが比例する問題を指摘し、定ノルム入力符号化＋残差形式（MIP）で解消。本文読了 | — 参照のみ（数値表がなく Hyperfan スライドで言及） |
| 19 | [On the Modularity of Hypernetworks](https://arxiv.org/abs/2002.10006) | 2020 | NeurIPS 2020 | 発展 | 埋め込み法と比べハイパーネットが少ないパラメータでモジュール性を実現できることを理論的に示す。要旨確認 | — 参照のみ（理論は 2026 の近似率論文で代表） |
| 20 | [On Infinite-Width Hypernetworks](https://arxiv.org/abs/2003.12193) | 2020 | NeurIPS 2020 | 発展 | 無限幅極限のハイパーネットの学習ダイナミクスと hyperkernel。要旨確認 | — 参照のみ |
| 21 | [CondConv: Conditionally Parameterized Convolutions for Efficient Inference](https://arxiv.org/abs/1904.04971) | 2019 | NeurIPS 2019 | 発展 | 例ごとに複数カーネルを混合する条件付き畳み込み。要旨確認 | — 参照のみ |
| 22 | [Dynamic Convolution: Attention over Convolution Kernels](https://arxiv.org/abs/1912.03458) | 2019 | CVPR 2020 | 発展 | 入力依存の注意で並列カーネルを集約する動的畳み込み。要旨確認 | — 参照のみ |
| 23 | [FiLM: Visual Reasoning with a General Conditioning Layer](https://arxiv.org/abs/1709.07871) | 2017 | AAAI 2018 | 発展 | 条件情報から特徴ごとのアフィン変調を生成。Functa の変調の源流。要旨確認 | — 参照のみ |
| 24 | [Implicit Neural Representations with Periodic Activation Functions (SIREN)](https://arxiv.org/abs/2006.09661) | 2020 | NeurIPS 2020 | 発展 | 正弦活性の INR。ハイパーネットで SIREN を生成する実験を含む。要旨確認 | — 参照のみ |
| 25 | [Transformers as Meta-Learners for Implicit Neural Representations (Trans-INR)](https://arxiv.org/abs/2208.02801) | 2022 | ECCV 2022 | 発展 | Transformer で INR の重みを直接生成。基盤モデル型ハイパーネットの土台。要旨確認 | — 参照のみ |
| 26 | [CryoHype: Reconstructing a thousand cryo-EM structures with transformer-based hypernetworks](https://arxiv.org/abs/2512.06332) | 2025 | CVPR 2026 | 最新 | Transformer 型ハイパーネットで INR を動的に調整し多種の分子構造を同時再構成。要旨確認 | — 参照のみ（応用寄り） |
| 27 | [Hyper-Transforming Latent Diffusion Models](https://arxiv.org/abs/2504.16580) | 2025 | arXiv プレプリント | 最新 | LDM のデコーダを Transformer 型ハイパーネットに置換して INR を生成。要旨確認 | — 参照のみ |
| 28 | [Fast weight programming and linear transformers: from machine learning to neurobiology](https://arxiv.org/abs/2508.08435) | 2025 | TMLR 2025 | 最新 | FWP・線形 Transformer・状態空間モデルと神経科学の関係の総説。要旨確認 | — 参照のみ（総説） |
| 29 | [A Brief Review of Hypernetworks in Deep Learning](https://arxiv.org/abs/2306.06955) | 2023 | Artificial Intelligence Review 2024 | — | ハイパーネットの総説。要旨確認 | — 参照のみ（総説） |
| 30 | [On-the-fly Weight Generation: A Hypernetwork Proof of Concept on ARC-1D](https://arxiv.org/abs/2610.00820) | 2026 | NeurIPS 2026 WS | 最新 | 少数例から小さな専門モデルの重みを生成する概念実証。要旨確認 | — 参照のみ（task-adaptation の範囲） |
| 31 | [NNiT: Width-Agnostic Neural Network Generation with Structurally Aligned Weight Spaces](https://arxiv.org/abs/2603.00180) | 2026 | arXiv プレプリント | 最新 | GHN で整列した重み空間をパッチ化し拡散 Transformer で幅非依存に生成。要旨確認 | — 参照のみ（weight-space-learning の範囲） |
| 32 | [Hypernetworks That Evolve Themselves](https://arxiv.org/abs/2512.16406) | 2025 | arXiv プレプリント | 最新 | 自己参照型 GHN が自らを変異・評価して進化。要旨確認 | — 参照のみ（神経進化寄り） |
| 33 | [An open dataset of neural networks for hypernetwork research](https://arxiv.org/abs/2507.15869) | 2025 | Electronics | 最新 | ハイパーネット研究用に 10^4 個の LeNet-5 を公開。要旨確認 | — 参照のみ |

---

<a id="task-adaptation"></a>

## メタ学習・継続学習とアダプタ生成（task-adaptation/）

資料：[task-adaptation.pptx](task-adaptation/task-adaptation.pptx) ／ [task-adaptation.pdf](task-adaptation/task-adaptation.pdf) ／ 生成元 [spec.json](task-adaptation/spec.json) ／ [テーマ README](task-adaptation/README.md)


### 調査履歴
- 2026-10-27: arXiv API で hypernetwork × LoRA / adapter / continual learning / in-context learning を新しい順に検索し、2026 年の動向（Doc-to-LoRA・SHINE とその後続、知識衝突の Override Gap、ICL との比較の Model of Models、継続学習での知識の相互作用、Parametric Skills など）をつかんだ。
- 系譜は3本を原典まで遡った。(1) 継続学習：von Oswald+ 2020（タスク埋め込み→重み）→ HyperZero（RL の文脈→方策）。(2) few-shot：HyperTransformer（サポート集合→CNN 重み、HyperMAML は参照のみ）。(3) LLM のアダプタ生成：HyperTuning（少数例→PEFT）→ Text-to-LoRA（説明文→LoRA）・DnD（プロンプト→LoRA）→ Doc-to-LoRA・SHINE（文書→LoRA）→ Override Gap（矛盾知識で失敗）。
- 軸は「未学習タスクに重みを直接生成して適応する」ことの限界と ICL との比較。各論文の ICL（または文脈あり）ベースラインとの数値差を s4・s5 に入れた：HyperTuning は ICL 相当に僅差で負け、T2L は弱い 3-shot ICL には勝つがタスク別 LoRA に届かず、SHINE は MQA で ICL に 14 点差、Override Gap は指示付き RAG に負け、Model of Models は言語モデルで ICL の利得の 11〜14% しか回収できない。
- 本文はすべて arXiv 版（PDF、2023 年以降は HTML の図も）で読んだ。採録先は arXiv コメントと Web 検索（PMLR・NeurIPS・ICML の virtual ページ）で確認した。
- 既存デッキとの重複はなし。同分野の別担当と重なりうる HyperNetworks（Ha+ 2016、weight-generation の範囲）、RPG・p-diff（weight-space-learning の範囲）はスライド化せず参照のみとした。

### 系譜
```
HyperNetworks (Ha+ 2016, 参照のみ; 同分野 weight-generation)
 ├─[継続学習] HNET-CL (von Oswald+ 2020, ICLR) ── タスク埋め込み→全重み、重みを正則化で記憶
 │      ├─► Posterior Meta-Replay (2021)・Continual HyperTransformer (2023)（参照のみ）
 │      └─[RL] HyperZero (Rezaei-Shoshtari+ 2023, AAAI) ── MDP 文脈→方策・価値の重み
 │             └─► Hypernetworks in Meta-RL (Beck+ 2022)（参照のみ）
 ├─[few-shot] HyperTransformer (Zhmoginov+ 2022, ICML) ── サポート集合→CNN 重み
 │      └─ HyperMAML (2022)（参照のみ）
 └─[LLM アダプタ生成]
        HyperTuning (Phang+ 2023, ICML) ── 少数例→prefix/LoRA（ICL 相当に僅差で劣る）
          ├─► HINT (2023)・HyperLoRA (2024)・Generative Adapter (2025)（参照のみ）
          ├─► Text-to-LoRA (Charakorn+ 2025, ICML) ── 説明文→LoRA
          │      └─► Doc-to-LoRA (Charakorn+ 2026, ICML) ── 文書→LoRA（文脈蒸留をメタ学習）
          │             └─► Override Gap (Cheng+ 2026) ── 矛盾知識の上書きに失敗＝振幅の問題
          ├─► Drag-and-Drop LLMs (Liang+ 2025, NeurIPS) ── プロンプト群→LoRA（← RPG/p-diff）
          ├─► SHINE (Liu+ 2026, ICML) ── LLM 自身で符号化、全層 LoRA
          │      └─► Knowledge Interaction in HN-based CL (Zheng+ 2026)（参照のみ）
          └─► Model of Models (Howell 2026) ── 放出 vs ICL vs 勾配適応の境界（resolution-K）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Continual learning with hypernetworks](https://arxiv.org/abs/1906.00695) | 2020 | ICLR | 原典 | タスク埋め込みから標的ネットの全重みを生成し、過去タスクの生成重みを正則化で固定して忘却を防ぐ。 | ✅ p.2 |
| 2 | [HyperTransformer: Model Generation for Supervised and Semi-Supervised Few-Shot Learning](https://arxiv.org/abs/2201.04182) | 2022 | ICML | 原典 | サポート集合から Transformer が小型 CNN の重みを1回で生成。小さい CNN で MAML++・RFS を上回る。 | ✅ p.3 |
| 3 | [Hypernetworks for Zero-shot Transfer in Reinforcement Learning](https://arxiv.org/abs/2211.15457) | 2023 | AAAI | 発展 | MDP の報酬・ダイナミクスのパラメータから方策と価値関数の重みを生成し、未学習タスクにゼロショット転移。 | ✅ p.4 |
| 4 | [HyperTuning: Toward Adapting Large Language Models without Back-propagation](https://arxiv.org/abs/2211.12485) | 2023 | ICML | 原典 | 少数例から凍結 T5 の prefix/LoRA を生成。ICL 相当（T5-MTF-Few-shot）に僅差で劣るが推論時に例が不要。 | ✅ p.5 |
| 5 | [Text-to-LoRA: Instant Transformer Adaption](https://arxiv.org/abs/2506.06105) | 2025 | ICML | 発展 | タスク説明文だけから LoRA を生成。未学習ベンチマークで多タスク LoRA を上回るがタスク別 LoRA には届かない。 | ✅ p.6 |
| 6 | [Drag-and-Drop LLMs: Zero-Shot Prompt-to-Weights](https://arxiv.org/abs/2506.16406) | 2025 | NeurIPS | 発展 | ラベルなしプロンプト群から LoRA 一式を生成。比較対象が他データセットの LoRA 平均で弱い点に注意。 | ✅ p.7 |
| 7 | [Doc-to-LoRA: Learning to Instantly Internalize Contexts](https://arxiv.org/abs/2602.15902) | 2026 | ICML | 最新 | 文脈蒸留をメタ学習し、文書を1秒未満で LoRA に内在化。窓の4倍超の長さにも外挿。 | ✅ p.8 |
| 8 | [SHINE: A Scalable In-Context Hypernetwork for Mapping Context to LoRA in a Single Pass](https://arxiv.org/abs/2602.06358) | 2026 | ICML | 最新 | LLM 自身でメモリ状態を作り M2P Transformer で全層 LoRA を生成。1ターン QA で ICL に迫る。 | ✅ p.9 |
| 9 | [The Override Gap: A Magnitude Account of Knowledge Conflict Failure in Hypernetwork-Based Instant LLM Adaptation](https://arxiv.org/abs/2604.23750) | 2026 | arXiv | 最新 | 生成 LoRA は事前知識と矛盾する文書を上書きできない。原因は振幅で、上位層の増幅（学習不要）で改善。 | ✅ p.10 |
| 10 | [Model of Models: When Does Emitting a Specialist Beat Attending, Adapting, or Tuning?](https://arxiv.org/abs/2608.21386) | 2026 | arXiv | 最新 | 重み放出・ICL・勾配適応・ゼロショットを6タスクで比較。低次元タスク族では放出が勝ち、言語モデルでは ICL に大差で負ける。 | ✅ p.11 |
| 11 | [HyperNetworks](https://arxiv.org/abs/1609.09106) | 2016 | ICLR 2017 | 原典 | ハイパーネットワークの原典。同分野 weight-generation で扱うため本テーマでは参照のみ。 | — 参照のみ |
| 12 | [HyperMAML: Few-Shot Adaptation of Deep Models with Hypernetworks](https://arxiv.org/abs/2205.15745) | 2022 | arXiv | 発展 | MAML の内側ループの勾配更新をハイパーネットに置き換える。HyperTransformer と同系統のため冒頭のみ確認し参照のみ。 | — 参照のみ |
| 13 | [Knowledge Interaction in Hypernetwork-based Continual Learning: Conflict and Composition](https://arxiv.org/abs/2610.15677) | 2026 | arXiv | 最新 | SHINE 上で基盤・アダプタ・文脈の3つの知識源の衝突と多段推論を分析。文脈が優先され、合成は失敗しやすい。要旨・序論のみ確認。 | — 参照のみ |
| 14 | [On-the-fly Weight Generation: A Hypernetwork Proof of Concept on ARC-1D](https://arxiv.org/abs/2610.00820) | 2026 | NeurIPS 2026 WS | 最新 | ARC-1D で少数例から小さな専門モデルの重みを生成し、部分的な合成汎化を示す。要旨のみ確認。 | — 参照のみ |
| 15 | [Scaling Laws for Hypernetwork-Based Knowledge Injection in Large Language Models](https://arxiv.org/abs/2607.19604) | 2026 | arXiv | 最新 | 大量の事実を固定 LoRA へ注入するハイパーネットのスケーリング則（MegaWikiQA）。要旨のみ確認。 | — 参照のみ |
| 16 | [Infinite-Parameter LLMs: Generating and Adapting Weights from Live Data](https://arxiv.org/abs/2609.18842) | 2026 | arXiv | 最新 | ライブデータから低ランク変調を生成し、生成器の潜在状態をベイズ更新する。要旨のみ確認。 | — 参照のみ |
| 17 | [Parametric Skills](https://arxiv.org/abs/2606.30015) | 2026 | arXiv | 最新 | テキストのスキルをハイパーネットで LoRA に変換し、SWE エージェントで文脈なしに使う。要旨のみ確認。 | — 参照のみ |
| 18 | [Investigating the Effectiveness of HyperTuning via Gisting](https://arxiv.org/abs/2402.16817) | 2024 | arXiv | 発展 | HyperTuning の後続（Gisting による改良）。検索で存在のみ確認。 | — 参照のみ |
| 19 | [HyperLoRA: Efficient Cross-Task Generalization via Constrained Low-Rank Adapters Generation](https://openreview.net/forum?id=xa4GYUSvhW) | 2024 | EMNLP Findings | 発展 | 少数例から LoRA を生成（T2L・D2L が引用）。未調査。 | — 参照のみ |
| 20 | [Generative Adapter: Contextualizing Language Models in Parameters with a Single Forward Pass](https://openreview.net/forum?id=bc3sUsS6ck) | 2025 | ICLR | 発展 | 文脈から一部の層のアダプタを生成（SHINE・D2L の比較対象）。未調査。 | — 参照のみ |
| 21 | HINT: Hypernetwork Instruction Tuning for Efficient Zero- & Few-Shot Generalisation（[arXiv](https://arxiv.org/abs/2212.10315)） | 2023 | ACL | 発展 | 指示文からアダプタと prefix を生成。未調査。 | — 参照のみ |
| 22 | [Hypernetworks in Meta-Reinforcement Learning](https://proceedings.mlr.press/v205/beck23a.html) | 2022 | CoRL | 発展 | メタ RL でハイパーネット方策が潜在条件付けと競合することを示す（Model of Models が再現）。未調査。 | — 参照のみ |
| 23 | [Continual HyperTransformer: A Meta-Learner for Continual Few-Shot Learning](https://arxiv.org/abs/2301.04584) | 2023 | TMLR | 発展 | HyperTransformer を継続 few-shot に拡張。未調査。 | — 参照のみ |
| 24 | [Posterior Meta-Replay for Continual Learning](https://arxiv.org/abs/2103.01133) | 2021 | NeurIPS | 発展 | HNET-CL をタスクごとの事後分布の生成へ拡張。未調査。 | — 参照のみ |
| 25 | Meta-Learning with Latent Embedding Optimization（LEO, [arXiv](https://arxiv.org/abs/1807.05960)） | 2019 | ICLR | 原典 | 潜在空間で重みを生成し SGD で補正する few-shot 法（HyperTransformer の比較対象）。未調査。 | — 参照のみ |
| 26 | Efficient Off-Policy Meta-RL via Probabilistic Context Variables（PEARL, [arXiv](https://arxiv.org/abs/1903.08254)） | 2019 | ICML | 発展 | 文脈潜在変数によるメタ RL（HyperZero・Model of Models の比較対象）。未調査。 | — 参照のみ |
| 27 | Towards Modular LLMs by Building and Reusing a Library of LoRAs（Arrow Routing, [arXiv](https://arxiv.org/abs/2405.11157)） | 2024 | ICML | 発展 | LoRA ライブラリのゼロショット経路選択（T2L の比較対象）。未調査。 | — 参照のみ |
| 28 | Cartridges（[arXiv](https://arxiv.org/abs/2506.06266)） | 2025 | arXiv | 発展 | 自己学習で長文脈を prefix 形式の小さな表現に圧縮（D2L が引用）。未調査。 | — 参照のみ |
| 29 | Self-Adapting Language Models（SEAL, [arXiv](https://arxiv.org/abs/2506.10943)） | 2025 | arXiv | 発展 | 自己生成データでの test-time training（SHINE の比較対象）。未調査。 | — 参照のみ |
| 30 | Locating and Editing Factual Associations in GPT（ROME, [arXiv](https://arxiv.org/abs/2202.05262)） | 2022 | NeurIPS | 原典 | 中間層 MLP の事実を直接編集（Override Gap が関連づけ）。未調査。 | — 参照のみ |
| 31 | RPG（Recurrent Parameter Generation, Wang+ 2025）・p-diff（Neural Network Diffusion, [arXiv](https://arxiv.org/abs/2402.13144)） | 2024–2025 | arXiv | 発展 | 重みの生成モデル（DnD の比較対象）。同分野 weight-space-learning の範囲のため参照のみ。 | — 参照のみ |

---

<a id="weight-space-learning"></a>

## 重み空間の学習と拡散によるパラメータ生成（weight-space-learning/）

資料：[weight-space-learning.pptx](weight-space-learning/weight-space-learning.pptx) ／ [weight-space-learning.pdf](weight-space-learning/weight-space-learning.pdf) ／ 生成元 [spec.json](weight-space-learning/spec.json) ／ [テーマ README](weight-space-learning/README.md)


### 調査履歴
- 2026-10-27: arXiv API（"weight space" learning / metanetworks / "parameter generation" diffusion / "model zoo" / "neural functional" equivariant / "weight generation"、提出日の降順）と WebSearch で 2025〜2026 年の動向をまず調べた。サーベイ（Han+ 2026, arXiv:2603.10090）付属の Awesome-Weight-Space-Learning リストで網羅性を確認した。
- 最新の論点は (a) Zeng+ 2025（CVPR 2026）による「生成重みは記憶・補間にすぎない」という批判と、それに応える等変生成（PEFM 2026、DeepWeightFlow、NNiT）、(b) グラフメタネットの Transformer/LLM への拡張（GMT 2026、CrossGMN、Transferable GMN）の 2 つ。
- そこから 3 つの系譜を原典まで遡った。①model zoo からの性質予測（Unterthiner+ 2020 → Hyper-Representations → SANE）、②対称性等変メタネット（DWSNets / NFN 2023 → GMN 2024 → GMT 2026）、③チェックポイント生成（G.pt 2022 → p-diff 2024 → RPG 2025 → 記憶検証 → PEFM）。
- 10 本は全文を arXiv から取得して読了した。採録先は arXiv のコメント、論文 PDF のヘッダ、検索で確認した（RPG＝NeurIPS 2025、Zeng+＝CVPR 2026）。テキストやプロンプトから LoRA を生成する研究（Text-to-LoRA、Drag-and-Drop LLMs）は同分野の task-adaptation が担当するため、参照のみとした。

### 系譜
```
[性質予測・表現学習]
Unterthiner+ 2020 (精度予測, Small CNN Zoo) ─┬→ Hyper-Representations (Schürholt+ 2021/22) → SANE (2024) → Model Hubs (Falk+ 2025)
                                             │
[対称性等変メタネット]                        ↓（「Deep Sets 系の不変性を」）
Hecht-Nielsen 1990 (置換対称性) → DWSNets / NFN (2023) → GMN / Neural Graphs (2024) ─┬→ ScaleGMN / Monomial-NFN (2024)
                                                                                      ├→ GMT: LM 全体の対称性群 (2026)
                                                                                      └→ PEFM: GMN を速度場に (2026)
[チェックポイント生成]                                                                         ↑
G.pt (2022, 条件付き拡散 Transformer) → HyperDiffusion (2023) → p-diff (2024) → D2NWG / RPG (2025) ┐
                                                                                        ↓              │
                                                     Zeng+ 2025「生成重みは記憶・補間」(CVPR 2026) ─────┘
                                                                                        ↓
                                                     DeepWeightFlow / NNiT / PEFM (2026): 等変・整列で新規性を示す
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Predicting Neural Network Accuracy from Weights](https://arxiv.org/abs/2002.11448) | 2020 | arXiv | 原典 | 12 万 CNN の Small CNN Zoo で、重みの層統計だけから精度を R²>0.98 で予測した。 | ✅ p.2 |
| 2 | [Learning to Learn with Generative Models of Neural Network Checkpoints](https://arxiv.org/abs/2209.12892) | 2022 | arXiv | 原典 | 2300 万チェックポイントで学習した条件付き拡散 Transformer G.pt。1 回の更新で目標損失を達成する。 | ✅ p.3 |
| 3 | [Equivariant Architectures for Learning in Deep Weight Spaces](https://arxiv.org/abs/2301.12780) | 2023 | ICML | 原典 | MLP 重みの置換対称性に等変な層を完全に特徴付けた DWSNets。 | ✅ p.4 |
| 4 | [Graph Metanetworks for Processing Diverse Neural Architectures](https://arxiv.org/abs/2312.04501) | 2024 | ICLR | 発展 | ネットワークをパラメータグラフにして GNN で処理する GMN。任意アーキに対応する。 | ✅ p.5 |
| 5 | [Neural Network Diffusion](https://arxiv.org/abs/2402.13144) | 2024 | arXiv | 発展 | 自己符号化器＋潜在拡散でパラメータを生成する p-diff。元モデル以上の精度と新規性を主張した。 | ✅ p.6 |
| 6 | [Towards Scalable and Versatile Weight Space Learning](https://arxiv.org/abs/2406.09997) | 2024 | ICML | 発展 | 重みのトークン列を窓ごとに符号化する SANE。識別と生成を両立し、ResNet-18 zoo に適用した。 | ✅ p.7 |
| 7 | [Recurrent Diffusion for Large-Scale Parameter Generation（旧題 Recurrent Diffusion for Large-Scale Parameter Generation）](https://arxiv.org/abs/2501.11587) | 2025 | NeurIPS | 最新 | トークン化＋再帰プロトタイプ＋拡散の RPG。約 2 億パラメータの全重みを単一 GPU で生成する。 | ✅ p.8 |
| 8 | [Generative Modeling of Weights: Generalization or Memorization?](https://arxiv.org/abs/2506.07998) | 2025 | CVPR 2026 | 最新 | G.pt・p-diff など 4 手法の生成重みが、訓練重みの複製か補間にすぎないことを示した。 | ✅ p.9 |
| 9 | [Permutation-Equivariant Flow Matching for Alignment-Free Neural Weight Generation](https://arxiv.org/abs/2609.32833) | 2026 | arXiv | 最新 | GMN を速度場にした等変フローマッチング。整列なしで記憶でない生成を示した。 | ✅ p.10 |
| 10 | [Graph Metanetworks for Transformer Based Language Models](https://arxiv.org/abs/2610.18471) | 2026 | arXiv | 最新 | decoder-only LM 全体の対称性群とそれに一致するグラフ構成 GMT。コーパス比率予測や微調整検出に使う。 | ✅ p.11 |
| 11 | [Permutation Equivariant Neural Functionals (NFN)](https://arxiv.org/abs/2302.14040) | 2023 | NeurIPS | 原典 | DWSNets と同時期の置換等変メタネット。CNN にも対応する。DWSNets を代表として採用したため参照のみ。 | — 参照のみ |
| 12 | [Neural Functional Transformers](https://arxiv.org/abs/2305.13546) | 2023 | NeurIPS | 発展 | NFN に注意機構を入れたもの。GMN の比較対象。 | — 参照のみ |
| 13 | [Hyper-Representations: Self-Supervised Representation Learning on Neural Network Weights for Model Characteristic Prediction](https://arxiv.org/abs/2110.15288) | 2021 | NeurIPS | 原典 | model zoo の重みを Transformer 自己符号化器＋対照学習で表現する。SANE の前身。本文は SANE・Zeng+ 経由でのみ確認した。 | — 参照のみ |
| 14 | [Hyper-Representations as Generative Models: Sampling Unseen Neural Network Weights](https://arxiv.org/abs/2209.14733) | 2022 | NeurIPS | 発展 | Hyper-Rep の潜在に KDE を当ててモデルを生成する。Zeng+ 2025 の検証対象。 | — 参照のみ |
| 15 | [Model Zoos: A Dataset of Diverse Populations of Neural Network Models](https://arxiv.org/abs/2209.14764) | 2022 | NeurIPS D&B | 発展 | SANE などが使う model zoo データセット。 | — 参照のみ |
| 16 | [HyperDiffusion: Generating Implicit Neural Fields with Weight-Space Diffusion](https://arxiv.org/abs/2303.17015) | 2023 | ICCV | 発展 | 3D 形状を表す MLP の重みを拡散生成する。Zeng+ 2025 で、乱数の重みすら記憶すると示された。 | — 参照のみ |
| 17 | [Diffusion-Based Neural Network Weights Generation (D2NWG)](https://arxiv.org/abs/2402.18153) | 2024 | ICLR 2025 | 発展 | データセット条件付きの潜在拡散による重み生成。p-diff の拡張。 | — 参照のみ |
| 18 | [Scale Equivariant Graph Metanetworks](https://arxiv.org/abs/2406.10685) | 2024 | NeurIPS | 発展 | GMN にスケール・符号対称性を追加したもの。 | — 参照のみ |
| 19 | [Monomial Matrix Group Equivariant Neural Functional Networks](https://arxiv.org/abs/2409.11697) | 2024 | NeurIPS | 発展 | 置換とスケーリングを含む単項行列群に等変な NFN。 | — 参照のみ |
| 20 | [Universal Neural Functionals](https://arxiv.org/abs/2402.05232) | 2024 | NeurIPS | 発展 | 任意の重みテンソル空間に対し、等変層を自動構成する。 | — 参照のみ |
| 21 | [Graph Neural Networks for Learning Equivariant Representations of Neural Networks（Neural Graphs）](https://arxiv.org/abs/2403.12143) | 2024 | ICLR | 発展 | GMN と同時期のグラフ化アプローチ。 | — 参照のみ |
| 22 | [Equivariant Neural Functional Networks for Transformers (NFN-T)](https://arxiv.org/abs/2410.04209) | 2024 | ICLR 2025 | 発展 | 注意層の GL 対称性に等変な層。単一アーキに固定される。GMT の比較対象。 | — 参照のみ |
| 23 | [Learning on LoRAs: GL-Equivariant Processing of Low-Rank Weight Spaces for Large Finetuned Models](https://arxiv.org/abs/2410.04207) | 2024 | arXiv | 発展 | LoRA の GL 対称性に等変なメタネット。 | — 参照のみ |
| 24 | [ORAL: Prompting Your Large-Scale LoRAs via Conditional Recurrent Diffusion](https://arxiv.org/abs/2503.24354) | 2025 | arXiv | 最新 | RPG を LoRA 生成に条件付きで拡張したもの。 | — 参照のみ |
| 25 | [Learning Model Representations Using Publicly Available Model Hubs](https://arxiv.org/abs/2510.02096) | 2025 | arXiv | 最新 | 自作の zoo の代わりに Hugging Face の任意のモデルで重み表現を学習する。 | — 参照のみ |
| 26 | [DeepWeightFlow: Re-Basined Flow Matching for Generating Neural Network Weights](https://arxiv.org/abs/2601.05052) | 2026 | arXiv | 最新 | Git Re-Basin で整列した重みのフローマッチング生成。PEFM の比較対象。 | — 参照のみ |
| 27 | [NNiT: Width-Agnostic Neural Network Generation with Structurally Aligned Weight Spaces](https://arxiv.org/abs/2603.00180) | 2026 | arXiv | 最新 | 幅に依存しない拡散 Transformer による重み生成。 | — 参照のみ |
| 28 | [A Survey of Weight Space Learning: Understanding, Representation, and Generation](https://arxiv.org/abs/2603.10090) | 2026 | arXiv | 最新 | 重み空間学習のサーベイ（理解・表現・生成）。網羅性の確認に使った。 | — 参照のみ |
| 29 | [Quasi-Equivariant Metanetworks](https://arxiv.org/abs/2604.23720) | 2026 | ICLR 2026 | 最新 | 関数の同一性に基づき、厳密な等変性を緩めたメタネット。 | — 参照のみ |
| 30 | [Finite Probes Suffice: Identifiability and Universality for Weight-Space Learning](https://arxiv.org/abs/2609.33901) | 2026 | arXiv | 最新 | プローブ（入力に対する応答）による表現の識別可能性と普遍性の理論。 | — 参照のみ |
| 31 | [Interfaces and Modules: A Scalable Representation for Weight-Space Learning across Architectures](https://arxiv.org/abs/2610.21995) | 2026 | arXiv | 最新 | PyTorch モデルから型付きハイパーグラフを自動導出し、異種アーキを横断して学習する。 | — 参照のみ |
| 32 | [CrossGMN: Graph Metanetworks for Cross-Architecture Weight-Space Transformations](https://arxiv.org/abs/2610.01649) | 2026 | arXiv | 最新 | 異なるアーキ間で重みを変換する GMN。 | — 参照のみ |
| 33 | [Geometric Flow Models over Neural Network Weights](https://arxiv.org/abs/2504.03710) | 2025 | MSc Thesis | 発展 | 対称性を考慮したフロー生成（修士論文）。PEFM の関連研究。 | — 参照のみ |
| 34 | [Drag-and-Drop LLMs: Zero-Shot Prompt-to-Weights](https://arxiv.org/abs/2506.16406) | 2025 | arXiv | 最新 | プロンプトから LoRA を直接生成する LLM パラメータ生成。 | ↪ 既存：task-adaptation p.7 |
| 35 | [Text-to-LoRA: Instant Transformer Adaption](https://arxiv.org/abs/2506.06105) | 2025 | arXiv | 最新 | タスク記述から LoRA を生成するハイパーネットワーク。 | ↪ 既存：task-adaptation p.6 |
