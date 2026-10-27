## 入力依存（選択的）スパイキングニューロンと多値スパイク×低ビット LLM（selective-spiking/）

### 調査履歴
- 2026-10-24: parallel-training デッキの推奨テーマ（DSN の動的減衰＝Mamba 型の選択的再帰）を起点に、arXiv API と WebSearch で「spiking AND mamba」「selective / input-dependent spiking neuron」「spiking LLM AND ternary / BitNet / quantization」を検索した。最新側では NeuronSpark（2026）・TV-MCN（2026）を「ニューロン自体に選択性を持たせる」系、SpikingMamba（2025）・SDLLM（2026）・QuantaSpike（2026）を「多値・3値スパイクで低ビット LLM に寄せる」系と整理した。そこから SpikeLM（ICML 2024）と 1/1.58 ビット spiking LM（Bal+ 2024）に遡り、SNN 外の原典として Mamba（S6）と BitNet b1.58 を本文まで読んだ。既存デッキ（SpikingSSMs, SpikeLLM, SpikingBrain, PMSN, DSN, I-LIF, Spora, TTFS-LLM など）は再掲していない。

### 系譜
```
[選択性の系譜]
S4 (2021, 既存) ──→ Mamba / S6 (2023, 原典: 入力依存の Δ・B・C)
                      ├─→ SpikingMamba (2025: Mamba2 を蒸留、選択性は実数の SSM に残す)
                      ├─→ NeuronSpark (2026: 減衰・ゲイン・閾値をトークン依存にした SelectivePLIF)
                      └─→ TV-MCN (2026: 入力依存の内部時間 Δ_t と B_t・C_t を持つ多区画ニューロン)
PLIF / PMSN / DSN (既存: 学習可能だが入力によらない時定数) ─┘

[多値スパイク × 低ビットの系譜]
BitNet (2023) ─→ BitNet b1.58 (2024, 原典: 3値重み)
                   └─→ Extreme Quantization in Spiking LMs (2024: 3値重み × 二値スパイク)
Ternary Spike (2024) ─→ SpikeLM (2024: 弾性双方向スパイク {−α,0,α})
I-LIF (2024, 既存) ───→ SpikingMamba (2025: 符号付き整数スパイク SI-LIF)
SpikeLLM (2024, 既存) → SDLLM (2026: 整数→±1 スパイク列の2段階符号化, W4)
SpikeQuant (2025) ────→ QuantaSpike (2026: 3値×2のべき乗応答、外れ値の選択的入場, 4ステップ)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Mamba: Linear-Time Sequence Modeling with Selective State Spaces](https://arxiv.org/abs/2312.00752) | 2023 | COLM 2024 | 原典 | SSM の Δ・B・C を入力依存にした選択的 SSM（S6）と Mamba。LTI モデルは内容を選べないと示した。 | ✅ p.2 |
| 2 | [The Era of 1-bit LLMs: All Large Language Models are in 1.58 Bits](https://arxiv.org/abs/2402.17764) | 2024 | arXiv プレプリント | 原典 | 重み3値・活性化8ビットの BitNet b1.58。3B で FP16 LLaMA と同等。 | ✅ p.3 |
| 3 | [Exploring Extreme Quantization in Spiking Language Models](https://arxiv.org/abs/2405.02543) | 2024 | ICONS 2024 | 発展 | 1/1.58 ビット重み × 二値スパイクの BERT 型 spiking LM を蒸留で学習。GLUE で全精度版に近い。 | ✅ p.4 |
| 4 | [SpikeLM: Towards General Spike-Driven Language Modeling via Elastic Bi-Spiking Mechanisms](https://arxiv.org/abs/2406.03287) | 2024 | ICML 2024 | 発展 | 方向・振幅・頻度を持つ {−α,0,α} スパイクで完全スパイク駆動の LM。GLUE 76.5、要約・翻訳も。 | ✅ p.5 |
| 5 | [SpikingMamba: Towards Energy-Efficient Large Language Models via Knowledge Distillation from Mamba](https://arxiv.org/abs/2510.04595) | 2025 | TMLR 2026 | 発展 | Mamba2 を教師に、射影の手前に符号付き整数スパイク SI-LIF を入れた 1.3B。4.76倍省エネ、-4.78pt。 | ✅ p.6 |
| 6 | [NeuronSpark: Selective Spiking State Space Models with Adaptive Computation for Language Modeling](https://arxiv.org/abs/2603.16148) | 2026 | arXiv プレプリント | 最新 | 減衰・ゲイン・閾値がトークン依存の SelectivePLIF。1.1B を初期値から事前学習し8課題平均40.0。 | ✅ p.7 |
| 7 | [Spike-driven Large Language Model](https://arxiv.org/abs/2604.16475) | 2026 | arXiv プレプリント | 最新 | 学習済み LLM を後処理で3値スパイクの疎な加算に置き換える SDLLM（γ-SQP、双方向符号化、膜電位クリップ）。 | ✅ p.8 |
| 8 | [QuantaSpike: Short-Window Spike-Driven Quantization for Large Language Models](https://arxiv.org/abs/2609.34259) | 2026 | arXiv プレプリント | 最新 | 3値×2のべき乗応答の LTIF ニューロンで、LLM の活性化を4ステップのスパイクに。Llama-2-7B で -0.68pt。 | ✅ p.9 |
| 9 | [A Time-Variant Spiking Neuron from a Unified State-Dynamics Perspective](https://arxiv.org/abs/2610.23981) | 2026 | arXiv プレプリント | 最新 | 入力依存の内部時間 Δ_t・B_t・C_t を持つ多区画ニューロン TV-MCN。選択的記憶課題で既存ニューロンに大差。 | ✅ p.10 |
| 10 | [Efficiently Modeling Long Sequences with Structured State Spaces (S4)](https://arxiv.org/abs/2111.00396) | 2021 | ICLR 2022 | 原典 | Mamba の前身となる LTI の構造化 SSM。 | ↪ 既存：snn/parallel-training p.2 |
| 11 | [SpikeGPT: Generative Pre-trained Language Model with Spiking Neural Networks](https://arxiv.org/abs/2302.13939) | 2023 | TMLR | 発展 | RWKV 型の生成スパイキング LM。NeuronSpark・SpikingMamba の比較対象。 | ↪ 既存：snn/spiking-transformer p.4 |
| 12 | [SpikeLLM: Scaling up Spiking Neural Network to Large Language Models via Saliency-based Spiking](https://arxiv.org/abs/2407.04752) | 2024 | ICLR 2025 | 発展 | 多ステップ整数スパイクで 7〜70B を扱う。SDLLM・QuantaSpike の比較対象。 | ↪ 既存：snn/spiking-transformer p.7 |
| 13 | [SpikingSSMs: Learning Long Sequences with Sparse and Parallel Spiking State Space Models](https://arxiv.org/abs/2408.14909) | 2024 | AAAI 2025 | 発展 | 代理ネットワーク SDN で LIF を並列化した spiking SSM。NeuronSpark が対比。 | ↪ 既存：snn/spiking-transformer p.8 |
| 14 | [SpikingBrain Technical Report](https://arxiv.org/abs/2509.05276) | 2025 | arXiv プレプリント | 最新 | 整数スパイク×線形注意の大規模スパイキング LM。 | ↪ 既存：snn/spiking-transformer p.10 |
| 15 | [Compute-Optimal Scaling Laws for Spiking Language Models](https://arxiv.org/abs/2610.15146) | 2026 | arXiv プレプリント | 最新 | スパイキング LM のスケーリング則。 | ↪ 既存：snn/spiking-transformer p.12 |
| 16 | [P-SpikeSSM](https://arxiv.org/abs/2406.02923) | 2024 | ICLR 2025 | 発展 | 確率的スパイキング SSM（Bal & Sengupta）。 | ↪ 既存：snn/parallel-training p.5 |
| 17 | [PMSN: A Parallel Multi-compartment Spiking Neuron](https://arxiv.org/abs/2408.14917) | 2024 | arXiv | 発展 | 多区画ニューロン。TV-MCN の主な比較対象（入力によらない規則）。 | ↪ 既存：snn/parallel-training p.6 |
| 18 | [Parallel Training in Spiking Neural Networks (DSN)](https://arxiv.org/abs/2602.01133) | 2026 | arXiv | 最新 | 動的減衰を持つ並列学習可能なニューロン。本テーマの起点。 | ↪ 既存：snn/parallel-training p.10 |
| 19 | [Integer-valued training and spike-driven inference (SpikeYOLO / I-LIF)](https://arxiv.org/abs/2407.20708) | 2024 | ECCV 2024 | 発展 | 整数で学習しスパイクで推論する I-LIF。SI-LIF の前身。 | ↪ 既存：snn/spike-coding p.7 |
| 20 | [Neuromorphic Principles for Efficient LLMs on Intel Loihi 2 (MatMul-free LLM on Loihi 2)](https://arxiv.org/abs/2503.18002) | 2025 | arXiv | 発展 | 3値重みの MatMul-free LLM を Loihi 2 に実装。 | ↪ 既存：snn/neuromorphic-hardware p.9 |
| 21 | [Ternary Spike: Learning Ternary Spikes for Spiking Neural Networks](https://arxiv.org/abs/2312.06372) | 2023 | AAAI 2024 | 発展 | 3値スパイクと層ごとの学習可能な振幅。画像分類が対象で、言語は扱わないため参照のみ（アブストのみ確認）。 | — 参照のみ |
| 22 | [BitNet: Scaling 1-bit Transformers for Large Language Models](https://arxiv.org/abs/2310.11453) | 2023 | arXiv | 原典 | 重み ±1 の BitLinear。b1.58 の前身。b1.58 で代表させたため参照のみ。 | — 参照のみ |
| 23 | [Transformers are SSMs (Mamba-2 / SSD)](https://arxiv.org/abs/2405.21060) | 2024 | ICML 2024 | 発展 | Mamba2。SpikingMamba の教師。SNN との接点は SpikingMamba で扱ったため参照のみ。 | — 参照のみ |
| 24 | [Bi-Mamba: Towards Accurate 1-Bit State Space Models](https://arxiv.org/abs/2411.11843) | 2024 | arXiv | 発展 | 1ビット重みの Mamba。SpikingMamba の比較対象（SNN ではない）。 | — 参照のみ |
| 25 | [QuaRot: Outlier-Free 4-Bit Inference in Rotated LLMs](https://arxiv.org/abs/2404.00456) | 2024 | NeurIPS 2024 | 発展 | 回転による外れ値除去で W4A4。SDLLM の土台（SNN 外の量子化手法）。 | — 参照のみ |
| 26 | [Energy-Efficient and Dequantization-Free Q-LLMs: A Spiking Neural Network Approach to Salient Value Mitigation (SpikeQuant)](https://arxiv.org/abs/2510.19498) | 2025 | WWW 2026 | 発展 | 顕著値だけを多ビット化して二値スパイクに再符号化。QuantaSpike の主比較対象。QuantaSpike・SDLLM と内容が重なるため参照のみ。 | — 参照のみ |
| 27 | [Kirin: Improving ANN efficiency with SNN Hybridization](https://arxiv.org/abs/2602.08817) | 2026 | arXiv | 最新 | 整数とスパイクの混合表現。QuantaSpike の比較対象。アブストのみ確認。 | — 参照のみ |
| 28 | [Adaptive Spiking Neurons for Vision and Language Modeling (ASN)](https://arxiv.org/abs/2604.12365) | 2026 | arXiv | 最新 | 学習可能なシフトで適応発火する整数学習ニューロン。パラメータは学習で決まり入力依存ではないため参照のみ。 | — 参照のみ |
| 29 | [LongSpike: Fractional Order Spiking State Space Models for Efficient Long Sequence Learning](https://arxiv.org/abs/2606.12895) | 2026 | arXiv | 最新 | 分数階 SSM による長期記憶のスパイキング SSM。時不変で選択性を持たないため参照のみ。 | — 参照のみ |
| 30 | [Spiking and Event-driven Neuromorphic Mamba Models for Efficient Speech Recognition](https://arxiv.org/abs/2606.01135) | 2026 | IJCNN 2026 | 最新 | SpeechMamba をスパイク化・イベント駆動化して活性化疎性70%超。音声認識が対象のため参照のみ（アブストのみ）。 | — 参照のみ |
| 31 | [SPikE-SSM: A Sparse, Precise, and Efficient Spiking State Space Model](https://arxiv.org/abs/2410.17268) | 2024 | arXiv | 発展 | LTI のスパイキング SSM。SpikingMamba の表で比較対象。未精読。 | — 参照のみ |
| 32 | [Bio-Inspired Mamba: Temporal Locality and Bioplausible Learning in Selective State Space Models](https://arxiv.org/abs/2409.11263) | 2024 | arXiv | 発展 | Mamba を RTRL＋STDP 様の局所則で学習。スパイクを使うニューロン設計ではないため参照のみ（アブストのみ）。 | — 参照のみ |
| 33 | [SpikMamba](https://arxiv.org/abs/2410.16746) / [Mamba-Spike](https://arxiv.org/abs/2408.11823) / [SpikeMba](https://arxiv.org/abs/2404.01174) | 2024 | ACM MM Asia ほか | 発展 | 視覚・行動認識で SNN と Mamba を積み重ねた系。言語・選択的ニューロンではないため参照のみ（タイトル・アブストのみ）。 | — 参照のみ |
| 34 | [Ternary SNNs Enhanced by Complemented Neurons and Membrane Potential Aggregation](https://arxiv.org/abs/2601.15598) | 2026 | arXiv | 最新 | 3値スパイクニューロンの改良（画像）。参照のみ（アブストのみ）。 | — 参照のみ |
| 35 | [LLM-Guided Evolutionary Discovery of Native Neural Architectures for Spiking Sequence Modeling (OpenArchEvo)](https://arxiv.org/abs/2609.40258) | 2026 | arXiv | 最新 | LLM でスパイキング系列モデルの構造を進化探索。参照のみ（アブストのみ）。 | — 参照のみ |
| 36 | [Incorporating Learnable Membrane Time Constant (PLIF)](https://arxiv.org/abs/2007.05785) | 2021 | ICCV 2021 | 原典 | 学習可能だが入力によらない時定数の PLIF。SelectivePLIF の特殊ケース。未精読。 | — 参照のみ |
