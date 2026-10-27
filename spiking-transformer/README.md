## Spiking Transformer・大規模化（spiking-transformer/）

### 調査履歴
- 2026-10-23: arXiv API で「spiking × transformer / language model / LLM / SSM」を新しい順に検索し、2025〜2026 年の動向（SpikingBrain 1.0/2.0、スパイキング LM のスケーリング則、SDLLM、NeuronSpark など）を把握した。そこから 2 つの系譜を原典まで遡った。(1) 視覚: Spike-driven Transformer v3 → v2 → v1 → Spikformer → 深い残差 SNN の SEW-ResNet。(2) 言語: SpikingBrain → SpikeLLM / E-SpikeFormer（整数学習・スパイク推論）→ SpikeGPT（RWKV）、さらに SpikingSSMs（SSM）。学習則一般とハードウェアは別テーマ担当なので、アーキテクチャとスケーリングに絞った。スライド化した 11 本はすべて arXiv 版の全文を読んだ。途中でネットワークが広がったが、重要論文はいずれも arXiv で本文を読めたため、「本文未確認」の論文はない。

### 系譜
```
[視覚・アーキテクチャ系]
SEW-ResNet (2021, 深い残差SNN)
  └─> Spikformer (2022, スパイク自己注意 SSA)
        └─> Spike-driven Transformer (2023, マスク+加算のみ / 膜電位ショートカット)
              └─> Meta-SpikeFormer = SDT V2 (2024, Conv+ViT メタ構造, ImageNet 80%)
                    └─> E-SpikeFormer = SDT V3 (2024/TPAMI2025, 整数学習→スパイク推論 SFA, 173M・86.2%)
                                                     │（整数学習・スパイク推論の考え方）
[言語・系列モデル系]                                  ▼
SEW 型残差 ─> SpikeGPT (2023, Spiking RWKV)    SpikingBrain (2025, 線形/ハイブリッド注意+MoE+適応閾値スパイク, 7B/76B)
               ├─> SpikingSSMs (2024, LIF×S4D)        └─> SpikingBrain2.0 (2026, MoBA+SSE の DSSA, 5B, INT8-Spiking/FP8)
               ├─> SpikeLLM (2024, GIF/OBSpiking で 7〜70B LLM をスパイク化) ─┘
               └─> Compute-Optimal Scaling Laws for Spiking LMs (2026, IsoFLOP: N_opt∝C^0.56)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Deep Residual Learning in Spiking Neural Networks](https://arxiv.org/abs/2102.04159) | 2021 | NeurIPS 2021 | 原典 | スパイク同士を要素ごとの関数で結ぶ SEW 残差により、直接学習で 152 層の SNN を実現し、深くするほど精度が上がることを示した。 | ✅ p.2 |
| 2 | [Spikformer: When Spiking Neural Network Meets Transformer](https://arxiv.org/abs/2209.15425) | 2022 | ICLR 2023 | 原典 | softmax のないスパイク自己注意（SSA）による初の直接学習 Spiking Transformer。ImageNet 74.81%。 | ✅ p.3 |
| 3 | [SpikeGPT: Generative Pre-trained Language Model with Spiking Neural Networks](https://arxiv.org/abs/2302.13939) | 2023 | TMLR 2024 | 原典 | RWKV を基にした初のスパイキング生成言語モデル（46M/216M）。線形計算量で言語生成を行う。 | ✅ p.4 |
| 4 | [Spike-driven Transformer](https://arxiv.org/abs/2307.01694) | 2023 | NeurIPS 2023 | 発展 | マスクと加算だけで動く SDSA と膜電位ショートカットで、全層をスパイク駆動にした。ImageNet 77.1%。 | ✅ p.5 |
| 5 | [Spike-driven Transformer V2: Meta Spiking Neural Network Architecture Inspiring the Design of Next-generation Neuromorphic Chips](https://arxiv.org/abs/2404.03663) | 2024 | ICLR 2024 | 発展 | Conv 型と Transformer 型のブロックを組み合わせたメタ骨格 Meta-SpikeFormer。ImageNet 80%、検出・セグメンテーションにも対応。 | ✅ p.6 |
| 6 | [SpikeLLM: Scaling up Spiking Neural Network to Large Language Models via Saliency-based Spiking](https://arxiv.org/abs/2407.04752) | 2024 | ICLR 2025 | 発展 | GIF ニューロンと OBSpiking で 7〜70B の LLaMA をスパイク化し、同等演算量の量子化 LLM を上回った。 | ✅ p.7 |
| 7 | [SpikingSSMs: Learning Long Sequences with Sparse and Parallel Spiking State Space Models](https://arxiv.org/abs/2408.14909) | 2024 | AAAI 2025 | 発展 | S4D に LIF を組み込み、代理ネットワーク SDN で並列に学習できるようにした。LRA 84.3%、WikiText-103 PPL 33.9。 | ✅ p.8 |
| 8 | [Scaling Spike-driven Transformer with Efficient Spike Firing Approximation Training](https://arxiv.org/abs/2411.16061) | 2024 | IEEE TPAMI 2025 | 最新 | 整数で学習しスパイクで推論する SFA と、E-SpikeFormer・MIM 事前学習で 173M・ImageNet 86.2% まで拡大した（SDT V3）。 | ✅ p.9 |
| 9 | [SpikingBrain: Spiking Brain-inspired Large Models](https://arxiv.org/abs/2509.05276) | 2025 | arXiv プレプリント | 最新 | Qwen2.5 を線形・ハイブリッド注意と MoE に変換した 7B/76B のスパイキング LLM。適応閾値スパイク符号化と MetaX GPU での学習。 | ✅ p.10 |
| 10 | [SpikingBrain2.0: Brain-Inspired Foundation Models for Efficient Long-Context and Cross-Platform Inference](https://arxiv.org/abs/2604.22575) | 2026 | arXiv プレプリント | 最新 | MoBA と SSE を組み合わせた DSSA による 5B のハイブリッドスパイキング LLM/VLM。7k A100 時間未満で変換し、INT8-Spiking と FP8 の 2 経路で符号化。 | ✅ p.11 |
| 11 | [Compute-Optimal Scaling Laws for Spiking Language Models](https://arxiv.org/abs/2610.15146) | 2026 | NeurIPS 2026 WS (AXIOM) | 最新 | スパイキング LM の IsoFLOP スケーリング則で N_opt∝C^0.56 を得た。スパイク化による損失コストは計算量とともに縮む。 | ✅ p.12 |
| 12 | [Advancing Spiking Neural Networks towards Deep Residual Learning (MS-ResNet)](https://arxiv.org/abs/2112.08954) | 2021 | arXiv（TNNLS 版あり） | 発展 | 膜電位ショートカット（MS）残差の原典。SDT 系が採用した。SEW-ResNet と同時期の別解のため、参照のみとした。 | — 参照のみ |
| 13 | [Spikformer V2: Join the High Accuracy Club on ImageNet with an SNN Ticket](https://arxiv.org/abs/2401.02020) | 2024 | arXiv | 発展 | Spikformer を自己教師事前学習で拡大した（172.7M・82.4%）。E-SpikeFormer の比較対象。視覚系の枝が重なるため参照のみ。 | — 参照のみ |
| 14 | [QKFormer: Hierarchical Spiking Transformer using Q-K Attention](https://arxiv.org/abs/2403.16552) | 2024 | NeurIPS 2024 | 発展 | Q-K 注意による階層型 Spiking Transformer。視覚 SOTA 競争の一系統で、本テーマの大規模化の主筋ではないため参照のみ。 | — 参照のみ |
| 15 | [Spikingformer: A Key Foundation Model for Spiking Neural Networks](https://arxiv.org/abs/2304.11954) | 2023 | AAAI 2026 | 発展 | Spikformer の残差を見直して乗算を排除した改良版。SDT と同じ問題意識のため参照のみ。 | — 参照のみ |
| 16 | [SpikeBERT: A Language Spikformer Learned from BERT with Knowledge Distillation](https://arxiv.org/abs/2308.15122) | 2023 | arXiv | 発展 | Spikformer を BERT からの蒸留で言語分類に適用した。生成・大規模化の主筋から外れるため参照のみ。 | — 参照のみ |
| 17 | [SpikingBERT: Distilling BERT to Train Spiking Language Models Using Implicit Differentiation](https://arxiv.org/abs/2308.10873) | 2023 | AAAI 2024 | 発展 | 暗黙微分と蒸留で学習するスパイキング BERT。参照のみ。 | — 参照のみ |
| 18 | [SpikeLM: Towards General Spike-Driven Language Modeling via Elastic Bi-Spiking Mechanisms](https://arxiv.org/abs/2406.03287) | 2024 | arXiv | 発展 | 双方向・振幅可変スパイクで言語モデルを完全にスパイク化した。SpikeLLM の前身のため、そちらを優先した。 | — 参照のみ |
| 19 | [Sorbet: A Neuromorphic Hardware-Compatible Transformer-Based Spiking Language Model](https://arxiv.org/abs/2409.15298) | 2024 | ICML 2025 | 発展 | softmax と LayerNorm をハードウェア向けに置き換えたスパイキング言語モデル。ハードウェア寄りのため参照のみ。 | — 参照のみ |
| 20 | [P-SpikeSSM: Harnessing Probabilistic Spiking State Space Models for Long-Range Dependency Tasks](https://arxiv.org/abs/2406.02923) | 2024 | ICLR 2025 | 発展 | 確率的スパイクによる SSM。SpikingSSMs の並行研究のため参照のみ。 | — 参照のみ |
| 21 | [FAS: Fast ANN-SNN Conversion for Spiking Large Language Models](https://arxiv.org/abs/2502.04405) | 2025 | arXiv | 発展 | LLM の ANN-SNN 変換を高速化した。変換手法は学習則テーマに近いため参照のみ。 | — 参照のみ |
| 22 | [LAS: Loss-less ANN-SNN Conversion for Fully Spike-Driven Large Language Models](https://arxiv.org/abs/2505.09659) | 2025 | arXiv | 発展 | 損失のない LLM の ANN-SNN 変換。同上の理由で参照のみ。 | — 参照のみ |
| 23 | [NeuronSpark: Selective Spiking State Space Models with Adaptive Computation for Language Modeling](https://arxiv.org/abs/2603.16148) | 2026 | arXiv | 最新 | 入力依存のスパイク膜ダイナミクスにより、1.1B のスパイキング SSM LM をゼロから事前学習した（抄録のみ確認）。単著プレプリントのため参照のみ。 | — 参照のみ |
| 24 | [Spike-driven Large Language Model (SDLLM)](https://arxiv.org/abs/2604.16475) | 2026 | arXiv | 最新 | γ-SQP 2 段スパイク符号化と双方向符号化で、密行列積を疎加算に置き換えた LLM（抄録のみ確認）。11 本の上限を超えるため参照のみ。 | — 参照のみ |
| 25 | [Winner-Take-All Spiking Transformer for Language Modeling](https://arxiv.org/abs/2604.11321) | 2026 | arXiv | 最新 | WTA 機構による softmax なしのスパイク自己注意で、エンコーダ型・デコーダ型の LM を作った（抄録のみ確認）。参照のみ。 | — 参照のみ |
| 26 | [BiSpikCLM: A Spiking Language Model integrating Softmax-Free Spiking Attention and Spike-Aware Alignment Distillation](https://arxiv.org/abs/2605.13859) | 2026 | arXiv | 最新 | 完全 2 値・MatMul なしの因果 LM（〜1.3B）。蒸留により、少ないトークンで ANN に近い性能を得た（抄録のみ確認）。参照のみ。 | — 参照のみ |
| 27 | [SpikeMLLM: Spike-based Multimodal Large Language Models via Modality-Specific Temporal Scales and Temporal Compression](https://arxiv.org/abs/2604.18610) | 2026 | arXiv | 最新 | Qwen2VL-72B などの MLLM をスパイク表現化し、RTL アクセラレータも試作した（抄録のみ確認）。参照のみ。 | — 参照のみ |
| 28 | [Rethinking the Tradeoff Between Temporal Encoding and Nonlinear Computation in Spiking Language Models (Spora)](https://arxiv.org/abs/2610.10933) | 2026 | arXiv | 最新 | 2 値時間重み符号化で、T ステップに最大 T ビットを載せるスパイキング LM。GLUE で SpikeLM を上回った（抄録のみ確認）。参照のみ。 | — 参照のみ |
| 29 | [URCHIN: A Horizontal Spiking Language Model for Data-Constrained Pretraining](https://arxiv.org/abs/2609.13899) | 2026 | BabyLM WS (EMNLP 2026) | 最新 | Dale 則に従う側方結合 LIF・128 ニューロンの極小スパイキング SSM LM（抄録のみ確認）。大規模化とは逆の方向のため参照のみ。 | — 参照のみ |
| 30 | [Large Language Models with At Most One Spike per Neuron](https://arxiv.org/abs/2609.05151) | 2026 | arXiv | 最新 | 1 ニューロンあたり最大 1 スパイクの時間符号化 LLM（題目のみ確認）。参照のみ。 | — 参照のみ |
| 31 | [SpikeOPD: Stable On-Policy Distillation for Autoregressive Spiking Language Models](https://arxiv.org/abs/2608.26720) | 2026 | arXiv | 最新 | スパイキング LM のオンポリシー蒸留（題目のみ確認）。学習法寄りのため参照のみ。 | — 参照のみ |
| 32 | [Spike-based dynamic computing with asynchronous sensing-computing neuromorphic chip (Speck)](https://doi.org/10.1038/s41467-024-47811-6) | 2024 | Nature Communications | 発展 | SFA や SpikingBrain が想定する非同期スパイク駆動チップ。ハードウェアテーマの担当範囲のため参照のみ。 | — 参照のみ |
| 33 | [MoBA: Mixture of Block Attention for Long-Context LLMs](https://arxiv.org/abs/2502.13189) | 2025 | arXiv | 関連 | SpikingBrain2.0 の疎ソフトマックス注意。非スパイクの要素技術のため参照のみ。 | — 参照のみ |
| 34 | [Scaling Linear Attention with Sparse State Expansion](https://arxiv.org/abs/2507.16577) | 2025 | arXiv | 関連 | SpikingBrain2.0 の疎線形注意 SSE。参照のみ。 | — 参照のみ |
| 35 | [Gated Linear Attention Transformers with Hardware-Efficient Training](https://arxiv.org/abs/2312.06635) | 2023 | ICML 2024 | 関連 | SpikingBrain-7B の線形注意 GLA。参照のみ。 | — 参照のみ |
| 36 | [MetaFormer Baselines for Vision (CAFormer)](https://arxiv.org/abs/2210.13452) | 2022 | TPAMI | 関連 | Meta-SpikeFormer が手本にした ANN のメタ構造。参照のみ。 | — 参照のみ |
| 37 | [Training Compute-Optimal Large Language Models (Chinchilla)](https://arxiv.org/abs/2203.15556) | 2022 | NeurIPS 2022 | 関連 | スパイキング LM スケーリング則が用いた IsoFLOP 法の原典。参照のみ。 | — 参照のみ |
