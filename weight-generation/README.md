## ハイパーネットワークの基礎と重み生成（weight-generation/）

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
