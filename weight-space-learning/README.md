## 重み空間の学習と拡散によるパラメータ生成（weight-space-learning/）

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
