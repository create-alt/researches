## スパイク符号化と量子化の境界（spike-coding/）

### 調査履歴
- 2026-10-23（第2回調査）: arXiv API（`spiking` × time-to-first-spike/TTFS、graded/multi-level/integer spike、quantized、coding/encoding のタイトル検索、新しい順）と Web 検索で 2025〜2026 年の動向をつかんだ。TTFS-LLM（1.5B）、2 進時間重み符号の Spora、I-LIF/SFA の注意での等価性の破れ（PT-SSA）、TTFS の多面体幾何、QNN との公平なエネルギー比較（QNN-SNN 双子）が見つかった。
- そこから 3 つの系譜を原典まで遡った。①時間符号（Mostafa 2017 → Stanojevic+ 2024 → TTFS-LLM / 多面体幾何）、②位取り符号（位相/バースト：Park+ 2019 → FS ニューロン：Stöckl & Maass 2021 → Spora）、③レート符号＝量子化（Rueckauer+ 2017〔既存：training〕→ Fast-SNN → I-LIF → PT-SSA、および QNN-SNN 双子のエネルギー比較）。
- 本文は arXiv で読んだ（DAC・Nature MI・TPAMI・Nature Commun.・ECCV・TCAD 採録版に対応する arXiv 版）。位相符号の原典 Kim+ 2018、TTFS 変換の原典 Rueckauer & Liu 2018、Thorpe+ 2001 は出版社サイトにしかなく、本文未確認。OpenAlex は当日の無料枠を使い切っており（429）、Semantic Scholar も 429 で、OA 版の探索は Crossref と arXiv 検索に限られた。
- 既存テーマとの重複：QCFS・Rueckauer+ 2017（training）、E-SpikeFormer/SFA・SpikeLLM・SpikingBrain（spiking-transformer）は再掲せず、s6 と系譜図で参照した。spiking-transformer で題目のみ参照していた「LLM with At Most One Spike per Neuron」と Spora は、本テーマで全文を読みスライド化した。

### 系譜
```
[時間符号 TTFS]  Thorpe+ 2001 (未確認) ─ Maass 1997 (未確認)
                    ↓
                 Mostafa 2017（z=e^t で区分線形） ──────────────→ TTFS 多面体幾何 (Singh+ 2026：ReLU より細かい分割)
                    ↓ (Rueckauer & Liu 2018 変換, 未確認 / Göltz+ 2021)
                 Stanojevic+ 2024（TTFS≡ReLU、0.3 spikes/neuron）
                    ↓
                 TTFS-LLM (Zhao+ 2026：R-TTFS で BERT / GPT-2 1.5B)

[位取り符号]      位相符号 Kim+ 2018 (未確認) → バースト/位相 Park+ 2019 → FS ニューロン (Stöckl & Maass 2021：K ステップ＝K ビット)
                                                                       ↓
                                                         Spora (Liu+ 2026：2 進時間重み UBS/BBS＋シフト注意)

[レート符号＝量子化] Rueckauer+ 2017 (既存：training) → QCFS 2022 (既存：training)
                    ↓
                 Fast-SNN (Hu+ 2023：T=2^b−1 で一様量子化と等価) ─→ QNN-SNN 双子のエネルギー比較 (Yan+ 2024/2026)
                    ↓
                 SpikeYOLO / I-LIF (Luo+ 2024：整数で学習しスパイクで推論)
                    ↓ → E-SpikeFormer / SFA (2024, 既存：spiking-transformer) → SpikingBrain (既存)
                 PT-SSA (Xue+ 2026：注意では整数⇔スパイクの等価性が崩れる TIM を解消)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Supervised learning based on temporal coding in spiking neural networks](https://arxiv.org/abs/1606.08165) | 2017 | IEEE TNNLS 2018 | 原典 | 発火時刻を z=e^t に変換すると入出力が区分線形になり、1 スパイク/ニューロンの SNN を逆伝播で直接学習できる。MNIST 誤り 2.45%。 | ✅ p.2 |
| 2 | [Fast and Efficient Information Transmission with Burst Spikes in Deep Spiking Neural Networks](https://arxiv.org/abs/1809.03142) | 2019 | DAC | 原典 | 閾値を下げて連発させるバースト符号と、入力＝位相・隠れ＝バーストのハイブリッド符号。CIFAR-10 VGG-16 で DNN と同じ 91.41% を、より少ないステップとスパイクで達成。 | ✅ p.3 |
| 3 | [Optimized spiking neurons can classify images with high accuracy through temporal coding with two spikes](https://arxiv.org/abs/2002.00860) | 2021 | Nature Machine Intelligence | 発展 | 時刻ごとの重み d(t) をもつ FS ニューロン。ReLU では K ステップの 2 進符号になる。EfficientNet-B7 を ImageNet 83.57%・約 2 スパイク/ニューロンで変換。 | ✅ p.4 |
| 4 | [Fast-SNN: Fast Spiking Neural Network by Converting Quantized ANN](https://arxiv.org/abs/2305.19868) | 2023 | IEEE TPAMI | 発展 | IF の発火率と b ビット一様量子化が T=2^b−1 で等価。QAT 済み ANN を変換し、ImageNet VGG-16 を T=3 で 71.31%。符号付き IF で順序誤差を除く。 | ✅ p.5 |
| 5 | [High-performance deep spiking neural networks with 0.3 spikes per neuron](https://arxiv.org/abs/2306.08744) | 2024 | Nature Communications | 発展 | 閾値交差時の傾き B=1 の恒等写像で、TTFS-SNN の学習軌道が ReLU と一致。CIFAR100 72.24%、L1 正則化で 0.20〜0.27 スパイク/ニューロン。 | ✅ p.6 |
| 6 | [Integer-Valued Training and Spike-Driven Inference Spiking Neural Network for High-performance and Energy-efficient Object Detection (SpikeYOLO)](https://arxiv.org/abs/2407.20708) | 2024 | ECCV | 発展 | 整数 0..D で学習し、推論では D 個の仮想ステップのスパイクに展開する I-LIF。COCO mAP@50 66.2%。D を増やす方が T を増やすより効く。 | ✅ p.7 |
| 7 | [Reconsidering the Energy Efficiency of Spiking Neural Networks Inference from Analytical Perspectives](https://arxiv.org/abs/2409.08290) | 2024 | IEEE TCAD 2026 | 発展 | T ステップ SNN と ⌈log2(T+1)⌉ ビット QNN を「双子」として、データ移動込みでエネルギーを比較。SNN が有利なのは T≤5・スパイク率 5.7% 未満程度。 | ✅ p.8 |
| 8 | [Large Language Models with At Most One Spike per Neuron](https://arxiv.org/abs/2609.05151) | 2026 | arXiv | 最新 | 参照時刻つき R-TTFS で LayerNorm・注意まで TTFS 化した LLM。GPT-2 XL（1.5B）まで拡大。GLUE はベースラインに迫るが、言語モデリングの ppl は大きく劣化。 | ✅ p.9 |
| 9 | [Polyhedral Geometry of Time-to-First-Spike Neural Networks](https://arxiv.org/abs/2609.11227) | 2026 | arXiv | 最新 | 正の重みの TTFS ネットの因果領域を多面体幾何で解析。maxout 型で指数個のアフィン片をもち、ReLU より細かい分割を作れる（上下界と実験）。 | ✅ p.10 |
| 10 | [Parallel Time-Aligned Spiking Self-Attention for Consistent Integer-Valued Training and Spike-Driven Inference](https://arxiv.org/abs/2610.03291) | 2026 | arXiv | 最新 | I-LIF/SFA を自己注意に使うと、時刻をまたぐ積で整数推論とスパイク推論が食い違う（TIM、ImageNet で −27.78pt）。時刻をそろえた並列注意で差を 0.06pt に。 | ✅ p.11 |
| 11 | [Rethinking the Tradeoff Between Temporal Encoding and Nonlinear Computation in Spiking Language Models (Spora)](https://arxiv.org/abs/2610.10933) | 2026 | arXiv | 最新 | 2 進時間重みの UBS/BBS 符号とシフト近似 softmax。4 ステップで GLUE 76.6。同じ状態数の静的 4bit QAT より CoLA で +6.43 MCC。 | ✅ p.12 |
| 12 | [Deep neural networks with weighted spikes (Kim+)](https://doi.org/10.1016/j.neucom.2018.05.087) | 2018 | Neurocomputing | 原典 | 位相符号（重み付きスパイク）による ANN→SNN 変換の原典。閾値を 2^−(1+t mod k) で振動させ、k ステップで k ビットを送る（Park+ 2019 の記述に基づく）。 | ⚠️ 本文未確認 |
| 13 | [Conversion of analog to spiking neural networks using sparse temporal coding (Rueckauer & Liu)](https://doi.org/10.1109/ISCAS.2018.8351295) | 2018 | ISCAS | 原典 | ReLU ネットを TTFS SNN に変換する最初期の手法（Stanojevic+・TTFS-LLM・FS 論文の記述に基づく）。IEEE のため本文にアクセスできない。 | ⚠️ 本文未確認 |
| 14 | [Spike-based strategies for rapid processing (Thorpe+)](https://doi.org/10.1016/S0893-6080(01)00083-1) | 2001 | Neural Networks | 原典 | 最初のスパイク時刻・順位で情報を表す（rank-order coding）生物学的な根拠と戦略。TTFS 系の引用元。出版社サイトのみ。 | ⚠️ 本文未確認 |
| 15 | [Networks of spiking neurons: The third generation of neural network models (Maass)](https://doi.org/10.1016/S0893-6080(97)00011-7) | 1997 | Neural Networks | 原典 | スパイク時刻で計算する SNN の計算能力の古典。多面体幾何論文が普遍性の出発点として引用。 | ⚠️ 本文未確認 |
| 16 | [Fast and energy-efficient neuromorphic deep learning with first-spike times (Göltz+)](https://arxiv.org/abs/1912.11443) | 2021 | Nature Machine Intelligence | 発展 | BrainScaleS-2 上の TTFS 学習（絶対時刻方式）。Mostafa と Stanojevic の間をつなぐが、紙幅の都合で参照のみ。 | — 参照のみ |
| 17 | [An Exact Mapping From ReLU Networks to Spiking Neural Networks (Stanojevic+)](https://arxiv.org/abs/2212.12522) | 2023 | Neural Networks | 発展 | ReLU→TTFS の厳密写像（α1 モデル）。2024 論文の前提。題目と 2024 論文中の記述のみ確認。 | — 参照のみ |
| 18 | [Conversion of Continuous-Valued Deep Networks to Efficient Event-Driven Networks for Image Classification (Rueckauer+)](https://doi.org/10.3389/fnins.2017.00682) | 2017 | Front. Neurosci. | 原典 | レート符号変換の基準。Fast-SNN・FS 論文の比較対象。 | ↪ 既存：training p.3 |
| 19 | [Optimal ANN-SNN Conversion for High-accuracy and Ultra-low-latency Spiking Neural Networks (QCFS)](https://arxiv.org/abs/2303.04347) | 2022 | ICLR | 発展 | 量子化 clip-floor-shift 活性による変換。Fast-SNN と並ぶ「レート符号＝量子化」の代表。 | ↪ 既存：training p.9 |
| 20 | [Scaling Spike-driven Transformer with Efficient Spike Firing Approximation Training (E-SpikeFormer / SFA)](https://arxiv.org/abs/2411.16061) | 2024 | IEEE TPAMI 2025 | 発展 | I-LIF を正規化した SFA。PT-SSA が注意での等価性の破れを指摘した対象。 | ↪ 既存：spiking-transformer p.9 |
| 21 | [SpikeLLM: Scaling up Spiking Neural Network to Large Language Models via Saliency-based Spiking](https://arxiv.org/abs/2407.04752) | 2024 | ICLR 2025 | 発展 | GIF ニューロン（多値スパイク）で LLM をスパイク化。TTFS-LLM・Spora の比較文脈。 | ↪ 既存：spiking-transformer p.7 |
| 22 | [SpikingBrain: Spiking Brain-inspired Large Models](https://arxiv.org/abs/2509.05276) | 2025 | arXiv | 最新 | 整数→スパイク符号化で 7B/76B を構成。I-LIF/SFA 系譜の大規模版。 | ↪ 既存：spiking-transformer p.10 |
| 23 | [Modeling and Optimizing Performance Bottlenecks for Neuromorphic Accelerators (Floorline)](https://arxiv.org/abs/2511.21549) | 2025 | arXiv | 関連 | ニューロモルフィック計算の性能上限モデル。Yan+ のエネルギー比較と相補的。 | ↪ 既存：neuromorphic-hardware p.11 |
| 24 | [SpikeLM: Towards General Spike-Driven Language Modeling via Elastic Bi-Spiking Mechanisms](https://arxiv.org/abs/2406.03287) | 2024 | ICML 2024 | 発展 | 双方向・振幅可変（3 値）スパイクの言語モデル。Spora・TTFS-LLM の主な比較対象。 | — 参照のみ（spiking-transformer でも参照のみ） |
| 25 | [Sorbet: A Neuromorphic Hardware-Compatible Transformer-Based Spiking Language Model](https://arxiv.org/abs/2409.15298) | 2024 | ICML 2025 | 発展 | シフト型 softmax・PowerNorm を使う 16 ステップのスパイキング言語モデル。Spora の比較対象。 | — 参照のみ |
| 26 | TTFSFormer: A TTFS-based Lossless Conversion of Spiking Transformer (Zhao, Huang, Ding, Yu) | 2025 | ICML | 発展 | TTFS による Transformer の無損失変換（TTFS-LLM の関連研究の記述に基づく）。本文未取得。 | — 参照のみ |
| 27 | SpikedAttention: Training-free and fully spike-driven transformer-to-SNN conversion with winner-oriented spike shift for softmax operation (Hwang+) | 2024 | NeurIPS | 発展 | 時間符号による Transformer 変換（TTFS-LLM の引用に基づく）。本文未取得。 | — 参照のみ |
| 28 | [Ternary Spike: Learning Ternary Spikes for Spiking Neural Networks](https://arxiv.org/abs/2312.06372) | 2023 | AAAI 2024 | 発展 | {−1,0,1} の 3 値スパイク。多値スパイクの一系統として検索で確認（未読）。 | — 参照のみ |
| 29 | [ShiftLIF: Efficient Multi-Level Spiking Neurons with Power-of-Two Quantization](https://arxiv.org/abs/2605.01866) | 2026 | arXiv | 最新 | 膜電位を 2 のべき乗の多値スパイクに写す LIF。抄録のみ確認（Spora と同じ方向）。 | — 参照のみ |
| 30 | [Burst Spiking Neural Networks (BuSNN)](https://arxiv.org/abs/2607.11914) | 2026 | arXiv（TPAMI 投稿） | 最新 | バースト発火による段階的スパイクで頑健性を高める。抄録のみ確認。 | — 参照のみ |
| 31 | [Latency and accuracy tradeoffs in Spiking Neural Networks (Falcon)](https://arxiv.org/abs/2609.35260) | 2026 | arXiv | 最新 | 層間のタイムステップ単位パイプラインにより、SNN が bit-serial QNN より速く終わりうる。待つほど遅く不正確になる層もあると証明。導入部と問題設定のみ精読し、音声 KWS・アナログ CIM に特化しているため参照のみ。 | — 参照のみ |
| 32 | [Revisiting Reset Mechanisms in Spiking Neural Networks for Sequential Modeling](https://arxiv.org/abs/2504.17751) | 2025 | arXiv | 最新 | 画像では SNN は量子化活性 ANN と同じで、系列では 2 値活性 RNN と見るべきと主張。抄録のみ確認。 | — 参照のみ |
| 33 | [NEXUS: Bit-Exact ANN-to-SNN Equivalence via Neuromorphic Gate Circuits](https://arxiv.org/abs/2601.21279) | 2026 | arXiv | 最新 | IF ニューロンの論理ゲートで IEEE-754 演算を組み、ビット単位で ANN と等価にすると主張。単著・自己申告の数値が多く、抄録のみ確認。 | — 参照のみ |
| 34 | [Closing the Theory-Practice Gap in Spiking Transformers via Effective Dimension](https://arxiv.org/abs/2604.15769) | 2026 | arXiv | 最新 | レート歪み理論によるスパイク数の下界 Ω(L²nd/ε²) と有効次元による説明。6 頁の短報で、抄録のみ確認。 | — 参照のみ |
| 35 | [Energy-Efficient and Dequantization-Free Q-LLMs: A Spiking Neural Network Approach to Salient Value Mitigation (SpikeQuant)](https://arxiv.org/abs/2510.19498) | 2025 | arXiv | 最新 | 量子化 LLM の外れ値活性だけをスパイク列に再符号化し、混合精度を時間方向で実現。抄録のみ確認。 | — 参照のみ |
| 36 | [Rate Coding or Direct Coding: Which One is Better for Accurate, Robust, and Energy-efficient Spiking Neural Networks?](https://arxiv.org/abs/2202.03133) | 2022 | ICASSP | 発展 | 入力のレート符号と直接（実数）符号の比較。題目と抄録のみ確認。 | — 参照のみ |
| 37 | [Integer Binary-Range Alignment Neuron for Spiking Neural Networks](https://arxiv.org/abs/2506.05679) | 2025 | arXiv | 最新 | 整数値ニューロンの範囲合わせ。I-LIF 系の派生として題目のみ確認。 | — 参照のみ |
