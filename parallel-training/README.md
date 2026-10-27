## 時間方向の並列学習とスパイキング状態空間モデル（parallel-training/）

### 調査履歴
- 2026-10-23（第2回調査）: arXiv API で「spiking × parallel / reset / state space / SSM / linear recurrent / associative scan / fixed point」を新しい順に検索し、2025〜2026 年の動向をつかんだ。見つかったのは DSN（Parallel Training in SNNs）、Bullet Trains（ICML 2026）、FPT（ICML 2025）、SiLIF、LongSpike、Phase SSM、PHC など。そこから2つの系譜を原典まで遡った。① SSM 側：S4 → S5（並列スキャン）→ S4D on Loihi 2（逐次推論のハードウェア実装）。② SNN 側：PSN（リセットを除いた並列化）→ P-SpikeSSM / PMSN（スパイキング SSM、TDR）→ FPT（固定点反復）→ DSN（動的減衰）／Bullet Trains（厳密なハードリセットの結合スキャン）。
- 既存テーマで扱った SpikingSSMs（spiking-transformer）と FidLIF（training）は再掲していない。スライド化した 10 本は、いずれも arXiv 版の本文（手法・実験・結果・考察）を読んだ。採録先は arXiv のコメント欄、PDF のヘッダ、Web 検索で確認した（S4D on Loihi 2 は NeurIPS 2024 Workshop MLNCP、PMSN は IEEE TNNLS 2026）。
- 並列スキャンの原典である Blelloch (1990) と、ML への適用の原典である Martin & Cundy (2018) は S5 の中で関係が整理されているため、参照のみとした。

### 系譜
```
[SSM 側]   HiPPO/LSSL (2020-21) ─→ S4 (2021, 畳み込みで並列学習・再帰で推論)
                                      ├─→ S4D (2022) ─────────→ S4D on Loihi 2 (2024, チップ上で逐次推論)
                                      └─→ S5 (2022, 対角 MIMO + 並列スキャン) ←─ Martin & Cundy (2018) ←─ Blelloch (1990)
                                             ├─→ LRU (2023) / Mamba (2023, 入力依存の減衰)
                                             └─→ Bullet Trains (2026, アフィン写像の結合スキャン)
[SNN 側]   LIF + SG-BPTT（逐次）
              └─→ PSN (2023, リセットを除いて H=WX) ─┬─→ PSU / SPSN (2023-24)
                                                    ├─→ FPT (2025, 固定点反復で LIF を近似) ─→ FidLIF (2026, Newton+スキャン; 既存: training)
                                                    └─→ DSN (2026, 動的減衰 = Mamba 型の選択的線形再帰)
[スパイキング SSM]  S4 + スパイク
              ├─→ BinaryS4D (2023) / SpikingSSMs (2024; 既存: spiking-transformer) / SPikE-SSM (2024)
              ├─→ P-SpikeSSM (2024, ベルヌーイ発火で並列化)
              ├─→ PMSN (2024, 多区画 SSM + TDR リセット)
              └─→ SiLIF (2025, SSM のパラメータ化を逐次学習の AdLIF/RF へ; 並列化しない対照例)
                     → LongSpike (2026) / Phase SSM (2026) / PHC (2026)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Efficiently Modeling Long Sequences with Structured State Spaces](https://arxiv.org/abs/2111.00396) | 2021 | ICLR 2022 | 原典 | HiPPO 行列を正規＋低ランクに分解した S4。畳み込みで並列に学習し、再帰で推論する。LRA 平均 86.09%、Path-X を初めて解いた。 | ✅ p.2 |
| 2 | [Simplified State Space Layers for Sequence Modeling](https://arxiv.org/abs/2208.04933) | 2022 | ICLR 2023 | 発展 | 対角 MIMO SSM を並列スキャンで計算する S5。LRA 87.46%、Path-X 98.58%。 | ✅ p.3 |
| 3 | [Parallel Spiking Neurons with High Efficiency and Ability to Learn Long-term Dependencies](https://arxiv.org/abs/2304.12760) | 2023 | NeurIPS 2023 | 原典 | リセットを除いて膜電位を H=WX で一括計算する PSN。masked 版・sliding 版も提案。Seq. CIFAR10 88.45%。 | ✅ p.4 |
| 4 | [P-SpikeSSM: Harnessing Probabilistic Spiking State Space Models for Long-Range Dependency Tasks](https://arxiv.org/abs/2406.02923) | 2024 | ICLR 2025 | 発展 | SSM 出力を発火確率としてベルヌーイ発火させ、並列に学習するスパイキング SSM。LRA でスパイキングモデルの SOTA（Path-X の報告なし）。 | ✅ p.5 |
| 5 | [PMSN: A Parallel Multi-compartment Spiking Neuron for Multiscale Temporal Processing](https://arxiv.org/abs/2408.14917) | 2024 | IEEE TNNLS 2026 | 発展 | 多区画ニューロン。隠れ区画を SSM 畳み込みで、出力区画を時間分離リセット（TDR）で並列化した。SHD 95.10%。FPGA 実装あり。 | ✅ p.6 |
| 6 | [A Diagonal Structured State Space Model on Loihi 2 for Efficient Streaming Sequence Processing](https://arxiv.org/abs/2409.15022) | 2024 | NeurIPS 2024 Workshop (MLNCP) | 発展 | S4D を Loihi 2 に初めて実装した。1トークンずつの処理で Jetson 比エネルギー 1/1000、遅延 1/75。バッチ処理では GPU が有利。 | ✅ p.7 |
| 7 | [Efficient Parallel Training Methods for Spiking Neural Networks with Constant Time Complexity](https://arxiv.org/abs/2506.12087) | 2025 | ICML 2025 | 最新 | リセット付き LIF を固定点反復（K≈3）で並列に計算する FPT。順伝播はシグモイドで緩めた近似。T=128 で BPTT の約13倍速い。 | ✅ p.8 |
| 8 | [SiLIF: Structured State Space Model Dynamics and Parametrization for Spiking Neural Networks](https://arxiv.org/abs/2506.06374) | 2025 | arXiv プレプリント | 最新 | S4 流の Δt 学習・対数再パラメータ化・S4D 初期化を AdLIF/RF に移植した。学習は逐次 BPTT のまま。SSC 82.03%、GSC 95.88%。 | ✅ p.9 |
| 9 | [Parallel Training in Spiking Neural Networks](https://arxiv.org/abs/2602.01133) | 2026 | arXiv プレプリント | 最新 | リセットの機能を分析し、入力依存の動的減衰でリセットを置き換えた DSN。並列学習と逐次推論を両立する。WikiText-103 PPL 28.50、30k への外挿も可能。 | ✅ p.10 |
| 10 | [Bullet Trains: Parallelizing Training of Temporally Precise Spiking Neural Networks](https://arxiv.org/abs/2603.13283) | 2026 | ICML 2026 | 最新 | 連続時間のイベント駆動 SNN で、厳密なハードリセットを保ったまま結合スキャンでスパイクを並列に処理し、最大44倍速い。発火時刻は Newton 法で求める。 | ✅ p.11 |
| 11 | [SpikingSSMs: Learning Long Sequences with Sparse and Parallel Spiking State Space Models](https://arxiv.org/abs/2408.14909) | 2024 | AAAI 2025 | 発展 | S4D に LIF を組み込み、代理ネットワーク SDN で並列に学習する。 | ↪ 既存：spiking-transformer p.8 |
| 12 | [FidLIF: Parallel Training of High-Fidelity Spiking Neurons with Exact BPTT](https://arxiv.org/abs/2610.16924) | 2026 | arXiv | 最新 | Newton 法と結合スキャンでハードリセット LIF を並列に学習し、BPTT と等価な勾配を得る。 | ↪ 既存：training p.13 |
| 13 | [Event-based backpropagation can compute exact gradients for spiking neural networks](https://arxiv.org/abs/2009.08378) | 2021 | Scientific Reports | 原典 | EventProp。Bullet Trains の厳密勾配の前提。 | ↪ 既存：training p.8 |
| 14 | [Efficient Neuromorphic Signal Processing with Loihi 2](https://arxiv.org/abs/2111.03746) | 2021 | SiPS 2021 | 発展 | Loihi 2 のプログラマブル・ニューロンによる信号処理。S4D on Loihi 2 の基盤。 | ↪ 既存：neuromorphic-hardware p.4 |
| 15 | [Neuromorphic Principles for Efficient Large Language Models on Intel Loihi 2](https://arxiv.org/abs/2503.18002) | 2025 | arXiv | 最新 | 線形再帰の MatMul-free LLM を Loihi 2 で動かした例。 | ↪ 既存：neuromorphic-hardware p.9 |
| 16 | [SpikingBrain: Spiking Brain-inspired Large Models](https://arxiv.org/abs/2509.05276) | 2025 | arXiv | 最新 | 線形注意とスパイク符号化による大規模スパイキング LM。DSN と同じグループ。 | ↪ 既存：spiking-transformer p.10 |
| 17 | [Parallelizing Linear Recurrent Neural Nets Over Sequence Length](https://arxiv.org/abs/1709.04057) | 2017 | ICLR 2018 | 原典 | 線形 RNN を並列スキャンで系列長方向に並列化した、ML での原典（抄録と S5 の関連研究節で確認）。 | — 参照のみ |
| 18 | [Prefix Sums and Their Applications](https://www.cs.cmu.edu/~guyb/papers/Ble93.pdf) | 1990 | CMU Tech. Report CMU-CS-90-190 | 原典 | 並列スキャン（prefix sum）アルゴリズムの古典。S5 と Bullet Trains が引用している（計算機科学の文献のため参照のみ）。 | — 参照のみ |
| 19 | [Combining Recurrent, Convolutional, and Continuous-time Models with Linear State-Space Layers (LSSL)](https://arxiv.org/abs/2110.13985) | 2021 | NeurIPS 2021 | 原典 | S4 の前身。O(N²L) の計算が問題だった（S4 本文の記述に基づく）。 | — 参照のみ |
| 20 | [On the Parameterization and Initialization of Diagonal State Space Models (S4D)](https://arxiv.org/abs/2206.11893) | 2022 | NeurIPS 2022 | 発展 | 対角 SSM。S4D on Loihi 2、P-SpikeSSM、SiLIF の基盤。 | — 参照のみ |
| 21 | [Resurrecting Recurrent Neural Networks for Long Sequences (LRU)](https://arxiv.org/abs/2303.06349) | 2023 | ICML 2023 | 発展 | 線形・対角化した RNN で深層 SSM の性能を再現し、SSM と線形 RNN の対応を示した（抄録のみ確認）。 | — 参照のみ |
| 22 | [Mamba: Linear-Time Sequence Modeling with Selective State Spaces](https://arxiv.org/abs/2312.00752) | 2023 | COLM 2024 | 発展 | 入力依存の選択的 SSM。DSN の動的減衰は同じ構造をとる（参照のみ）。 | — 参照のみ |
| 23 | [Accelerating SNN Training with Stochastic Parallelizable Spiking Neurons (SPSN)](https://arxiv.org/abs/2306.12666) | 2023 | IJCNN 2023 | 発展 | 線形積分と発火を分離し、確率的発火で並列化した。PSN と同時期の研究（抄録のみ確認）。 | — 参照のみ |
| 24 | [Parallel Spiking Unit for Efficient Training of Spiking Neural Networks (PSU)](https://arxiv.org/abs/2402.00449) | 2024 | IJCNN 2024 | 発展 | 積分と発火を分離し、リセットを確率的に扱う。FPT は K=2 の特殊ケースとして説明している（抄録と FPT・DSN の記述で確認）。 | — 参照のみ |
| 25 | [PRF: Parallel Resonate and Fire Neuron for Long Sequence Learning in Spiking Neural Networks](https://arxiv.org/abs/2410.03530) | 2024 | arXiv | 発展 | 分離リセットで O(L log L) の並列学習を行う、共鳴発火型ニューロン（抄録のみ確認）。PMSN・DSN と役割が重なるため参照のみ。 | — 参照のみ |
| 26 | [SPikE-SSM: A Sparse, Precise, and Efficient Spiking State Space Model for Long Sequences Learning](https://arxiv.org/abs/2410.17268) | 2024 | arXiv | 発展 | 並列の max-min 境界圧縮（PMBC）でリセット付きのスパイクを反復的に求めるスパイキング SSM（抄録と DSN・Bullet Trains の記述で確認）。 | — 参照のみ |
| 27 | [Learning Long Sequences in Spiking Neural Networks (BinaryS4D)](https://arxiv.org/abs/2401.00955) | 2023 | arXiv | 発展 | S4 の出力を LIF でスパイク化した初期のスパイキング SSM（P-SpikeSSM の比較対象。抄録のみ確認）。 | — 参照のみ |
| 28 | [Multiplication-Free Parallelizable Spiking Neurons with Efficient Spatio-Temporal Dynamics](https://arxiv.org/abs/2501.14490) | 2025 | NeurIPS 2025 | 発展 | 乗算なしのチャネル単位 PSN（PSN 系の改良。抄録のみ確認）。 | — 参照のみ |
| 29 | [Accelerating Linear Recurrent Neural Networks for the Edge with Unstructured Sparsity](https://arxiv.org/abs/2502.01330) | 2025 | ICML 2025 | 最新 | 疎な線形 RNN を Loihi 2 で動かし、同じ精度で計算量を半分にした（抄録のみ確認）。ハードウェアとの整合の続編候補。 | — 参照のみ |
| 30 | [Scaling Up Resonate-and-Fire Networks for Fast Deep Learning (S5-RF)](https://arxiv.org/abs/2504.00719) | 2025 | arXiv | 発展 | S5 の構造と HiPPO 初期化を使う RF ニューロン。SiLIF と PMSN の比較対象（抄録のみ確認）。 | — 参照のみ |
| 31 | [Revisiting Reset Mechanisms in Spiking Neural Networks for Sequential Modeling](https://arxiv.org/abs/2504.17751) | 2025 | arXiv | 最新 | 系列モデリングにおけるリセットの役割の再検討（arXiv 検索で題名のみ確認）。 | — 参照のみ |
| 32 | [Modern Neuromorphic AI: From Intra-Token to Inter-Token Processing](https://arxiv.org/abs/2601.00245) | 2026 | arXiv | 最新 | SNN・SSM・Transformer の関係を「トークン内／トークン間処理」で整理した総説（抄録のみ確認）。 | — 参照のみ |
| 33 | [Parallelized Hierarchical Connectome: A Spatiotemporal Recurrent Framework for Spiking State-Space Models](https://arxiv.org/abs/2604.01295) | 2026 | arXiv（Neural Networks 投稿中） | 最新 | 対角 SSM に層内の空間再帰と生物学的な事前知識を加えた PHCSSM（抄録のみ確認。単著のため参照のみ）。 | — 参照のみ |
| 34 | [LongSpike: Fractional Order Spiking State Space Models for Efficient Long Sequence Learning](https://arxiv.org/abs/2606.12895) | 2026 | arXiv | 最新 | 分数階 SSM をスパイク化し、LRA・WikiText-103 で評価（抄録のみ確認）。 | — 参照のみ |
| 35 | [Phase State Space Models: Parallel, Surrogate-Free Training of Spiking Networks](https://arxiv.org/abs/2608.07754) | 2026 | arXiv | 最新 | 共鳴発火ネットワークを位相 SSM として並列に学習する（抄録のみ確認。単著で定量評価が限られるため参照のみ）。 | — 参照のみ |
