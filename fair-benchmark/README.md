## SNN と量子化 ANN の公平なベンチマーク（fair-benchmark/）

### 調査履歴
- 2026-10-24: arXiv API と WebSearch で 2025〜2026 年の動向から調べ始めた（キーワード：spiking vs quantized ANN fair comparison、delta / sigma-delta network、activation sparsity、event-driven ANN vs SNN、temporal benchmark、sparsity ceiling）。起点にしたのは、Spiking/Event SpeechMamba（IJCNN 2026）、SDNN 変換 on Loihi 2（ICONS 2026）、SDANN（2025）、NSA（IJCAI 2025）、Sparsity Ceiling（2026）。
- そこから 3 本の系譜を原典側へ遡った。(a) 活性スパース ANN：Sigma-Delta（O'Connor & Welling 2017）と Delta Networks（Neil+ 2017）→ EGRU → イベント駆動 SpeechMamba／Loihi 2 SDNN。(b) 低ビット ANN との等価性：B-SNN（Lu & Sengupta 2020）→ SDANN（既存デッキの Bit Budget・Yan+ 2026 と接続）。(c) データと学習条件の公平性：SNN vs RNN（He+ 2020）、N-MNIST 検証（Iyer+ 2021）→ NSA → Sparsity Ceiling。
- 既存テーマとの重複を避けた。Davidson & Furber、SATA、Lemaire、Ottati、Bhattacharjee、Bit Budget、SENECA、Höfflin、Yan+ TCAD 2026、Gamage+ 2026（以上 energy-evaluation）、NeuroBench・floorline・SNABSuite・Darwin3（neuromorphic-hardware）、PMSN（parallel-training）はスライド化せず参照のみとした。energy-evaluation で「参照のみ」だった Sparsity Ceiling は、今回全文を読んだうえでスライド化した。
- 本文が取れなかったもの：Datta+ ICLR 2024（OpenReview の PDF がエラーページになり、api2.openreview.net にも到達できなかった）。Semantic Scholar はレート制限で使えず、Crossref と PMLR のページで採録先を確かめた。

### 系譜
```
[活性スパース ANN（delta / sigma-delta / event）]
Sigma-Delta (O'Connor+ 2017, CNN 変換)      Delta Networks (Neil+ 2017, RNN)
   │                                          │
   ├→ Shrestha+ 2024 Loihi 2 SDNN (参照)       ├→ EdgeDRNN 2020 / DeltaKWS 2024 (未調査)
   │     └→ SDNN 変換 on Loihi 2 (Brehove+ 2026)：演算 18 倍減 → 実エネルギー 1.2 倍
   │                                          └→ EGRU (Subramoney+ 2023)：実数イベントの GRU
   │                                                └→ Spiking/Event SpeechMamba (Ahmed+ 2026)
   │                                                     スパイク版の方が HW 上の削減が小さい（膜電位のメモリコスト）
[低ビット ANN ≒ SNN]
B-SNN (Lu & Sengupta 2020：T 時刻 SNN ≒ log2T bit 活性)
   ├→ (既存) Bit Budget 2024 → QNN-SNN twin (Yan+ 2026)
   └→ SDANN (Chen+ 2025)：INT8 QANN をビット直列スパイクで神経形態 HW に写す
[データ・学習条件の公平性と理論]
SNN vs RNN (He+ 2020：学習・損失・構造を揃えた比較)
   ├→ N-MNIST 検証 (Iyer+ 2021：時間を潰しても ANN で 99.23%)
   │     └→ NSA (Chen+ 2025：STP で時間依存を検査するベンチマーク)
   └→ Sparsity Ceiling (Wang 2026：同一構造で発火率の下限と情報理論的な下界)
         ↔ 表現力で正規化した比較 (Kranzlmüller+ 2026, 参照)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Sigma Delta Quantized Networks](https://arxiv.org/abs/1611.02024) | 2017 | ICLR | 原典 | 活性の差分を量子化して送る Σ-Δ ネット。学習済み ANN を変換でき、動画 VGG19 で約 4〜11 倍の演算削減 | ✅ p.2 |
| 2 | [Delta Networks for Optimized Recurrent Network Computation](https://arxiv.org/abs/1612.05571) | 2017 | ICML | 原典 | 閾値を超えた活性変化だけを送る delta RNN。TIDIGITS で最大 11.9 倍、WSJ で 5.7 倍の演算削減 | ✅ p.3 |
| 3 | [Exploring the Connection Between Binary and Spiking Neural Networks](https://arxiv.org/abs/2002.10064) | 2020 | Frontiers in Neuroscience | 原典 | 二値重み SNN を BNN 用インメモリ HW で実行。CIFAR-100 で XNOR-Net 47.16% に対し 62.07% | ✅ p.4 |
| 4 | [Comparing SNNs and RNNs on Neuromorphic Vision Datasets: Similarities and Differences](https://arxiv.org/abs/2005.02183) | 2020 | Neural Networks | 原典 | 学習則・損失・構造を揃えて SNN と RNN/LSTM を比較。損失を揃えると LSTM が追いつく | ✅ p.5 |
| 5 | [Is Neuromorphic MNIST Neuromorphic? Analyzing the Discriminative Power of Neuromorphic Datasets in the Time Domain](https://arxiv.org/abs/1807.01013) | 2021 | Frontiers in Neuroscience | 発展 | 時間を潰したフレームと CNN で N-MNIST 99.23%。N-MNIST は時間処理を測れないと指摘 | ✅ p.6 |
| 6 | [Efficient recurrent architectures through activity sparsity and sparse back-propagation through time](https://arxiv.org/abs/2206.06178) | 2023 | ICLR | 発展 | 閾値でイベントを出す EGRU。約 80% の活性スパース性で GRU 以上の性能 | ✅ p.7 |
| 7 | [Bridging Quantized Artificial Neural Networks and Neuromorphic Hardware](https://arxiv.org/abs/2505.12221) | 2025 | arXiv プレプリント | 最新 | INT8 QANN をビット直列スパイク（STEM）で Darwin3 上に精度劣化なしで実装 | ✅ p.8 |
| 8 | [Neuromorphic Sequential Arena: A Benchmark for Neuromorphic Temporal Processing](https://arxiv.org/abs/2505.22035) | 2025 | IJCAI | 最新 | 7 タスクの時系列 SNN ベンチマーク。STP でタスクの時間依存性を検査する。ANN ベースラインはない | ✅ p.9 |
| 9 | [Spiking and Event-driven Neuromorphic Mamba Models for Efficient Speech Recognition](https://arxiv.org/abs/2606.01135) | 2026 | IJCNN | 最新 | 同一の Mamba ASR をスパイク版とイベント駆動 ANN 版で比較。スパイク版は膜電位のメモリコストで HW 上の削減が小さい | ✅ p.10 |
| 10 | [Sigma-Delta Neural Network Conversion on Loihi 2](https://arxiv.org/abs/2505.06417) | 2026 | ICONS | 最新 | 量子化 ANN を Loihi 2 の SDNN に変換して Jetson と比較。PilotNet で 16 倍超、YOLO-KP で約 1.2 倍の省エネ | ✅ p.11 |
| 11 | [The Sparsity Ceiling: Where Spiking Networks Can and Cannot Trade Activity for Energy](https://arxiv.org/abs/2607.26648) | 2026 | arXiv プレプリント | 最新 | 同一構造の比較で、知覚は 5%、再帰 LM は約 50% が発火率の下限と示し、情報理論的な下界を与えた | ✅ p.12 |
| 12 | [Efficient Video and Audio processing with Loihi 2](https://arxiv.org/abs/2310.03251) | 2024 | ICASSP | 発展 | Loihi 2 上の SDNN（PilotNet）・音声強調・RF-STFT を Jetson/CPU と実測比較（PilotNet 0.09mJ 対 13.72mJ）。#10 が同条件で再測定したため参照のみ（全文確認） | — 参照のみ |
| 13 | [Activity Sparsity Complements Weight Sparsity for Efficient RNN Inference](https://arxiv.org/abs/2311.07625) | 2023 | NeurIPS MLNCP WS | 発展 | EGRU の活性スパース性と重み枝刈りが乗算的に効き、PTB で演算 20 倍減。#6 の延長のため参照のみ（アブストラクトと本文の一部を確認） | — 参照のみ |
| 14 | [Towards an Expressivity-Normalized Energy-Demand Comparison of ANNs and SNNs](https://arxiv.org/abs/2608.29869) | 2026 | arXiv プレプリント | 最新 | 線形領域数の上界で表現力を揃えたエネルギー比 η を定義し、幅・スパース性・深さの臨界値を導出。4 頁の試論で実証が乏しいため参照のみ（今回全文確認。energy-evaluation でも参照のみ） | — 参照のみ |
| 15 | [When Spike Sparsity Does Not Translate to Deployed Cost: VS-WNO on Jetson Orin Nano](https://arxiv.org/abs/2604.17040) | 2026 | arXiv プレプリント | 最新 | 同構造の密 WNO と比べ、スパイク版は Jetson で遅く高エネルギー（228 対 181 mJ）。GPU 上の事例報告のため参照のみ（本文の主要部を確認） | — 参照のみ |
| 16 | [Low-Latency Activation-Regularized Sparse Neural Operators with Distillation Assistance Towards Real-Time Neuromorphic Virtual Sensing](https://arxiv.org/abs/2608.23987) | 2026 | arXiv プレプリント | 最新 | 単一ステップの疎 ReLU（SAR）が VSN/LIF より遅延・誤差・エネルギーの複合指標で 5 倍以上良いと報告。応用寄りのため参照のみ（アブストラクトと手法節を確認） | — 参照のみ |
| 17 | [Time to Spike? Understanding the Representational Power of Spiking Neural Networks in Discrete Time](https://arxiv.org/abs/2505.18023) | 2025 | ICML | 最新 | 離散時間 LIF-SNN が多面体上の区分定数関数を実現することを示し、時刻数と深さの効果を ANN と対比。PDF は取得したがアブストラクトのみ確認 | — 参照のみ |
| 18 | [Can we get the best of both Binary Neural Networks and Spiking Neural Networks for Efficient Computer Vision?](https://iclr.cc/virtual/2024/poster/17942) | 2024 | ICLR | 発展 | 単一時刻の疎な二値活性ネット（Hoyer 正則化）で BNN・SNN を精度対 FLOPs で上回ると主張（検索情報に基づく。OpenReview PDF に到達できず） | ⚠️ 本文未確認 |
| 19 | [Kirin: Improving ANN efficiency with SNN Hybridization](https://arxiv.org/abs/2602.08817) | 2026 | arXiv プレプリント | 最新 | 低ビット部分だけをスパイク化する整数・スパイク混成で LLM を変換（W4A4&8 で最大 84.66% 省エネ）。アブストラクトのみ確認のため参照のみ | — 参照のみ |
| 20 | [All in one timestep: Enhancing Sparsity and Energy efficiency in Multi-level Spiking Neural Networks](https://arxiv.org/abs/2510.24637) | 2025 | arXiv プレプリント | 最新 | 多値スパイクで 1 時刻推論。二値 SNN の T=4 は ANN 比 35% 減にとどまり、T とともに差が縮むと報告。アブストラクトのみ確認のため参照のみ | — 参照のみ |
| 21 | [Bio-Inspired Auditory Processing: Coupling Parallel Resonate-and-Fire Dynamics with Ternary Recurrent Networks for Speech Recognition](https://arxiv.org/abs/2610.29720) | 2026 | arXiv プレプリント | 最新 | 三値重み GRU と RF ニューロンのスパイク音声認識で LibriSpeech WER 6.44%。アブストラクトのみ確認のため参照のみ | — 参照のみ |
| 22 | [EdgeDRNN: Recurrent Neural Network Accelerator for Edge Inference](https://arxiv.org/abs/2012.13600) | 2020 | IEEE JETCAS | 発展 | delta GRU の FPGA 加速器（#2 の実チップ化）。未読のため参照のみ | — 参照のみ |
| 23 | [DeltaKWS: A 65nm 36nJ/Decision Bio-inspired Temporal-Sparsity-Aware Digital Keyword Spotting IC](https://arxiv.org/abs/2405.03905) | 2024 | IEEE TCASAI | 発展 | delta RNN の KWS チップ。時間スパース性 87% でエネルギー 3.4 倍減（アブストラクトと検索情報に基づく） | — 参照のみ |
| 24 | [Are Conventional SNNs Really Efficient? A Perspective from Network Quantization](https://arxiv.org/abs/2311.10802) | 2024 | CVPR | 発展 | T 時刻 SNN と T ビット QANN の等価性と Bit Budget | ↪ 既存：snn/energy-evaluation p.7 |
| 25 | [Reconsidering the Energy Efficiency of Spiking Neural Networks Inference from Analytical Perspectives](https://arxiv.org/abs/2409.08290) | 2026 | IEEE TCAD | 最新 | 容量を揃えた QNN-SNN 双子とデータ移動込みの損益分岐 | ↪ 既存：snn/energy-evaluation p.10 |
| 26 | [Event-based Optical Flow on Neuromorphic Processor: ANN vs. SNN Comparison based on Activation Sparsification](https://arxiv.org/abs/2407.20421) | 2025 | Neural Networks | 発展 | SENECA 上でスパース化 ANN と SNN を同条件比較（#9 の前身） | ↪ 既存：snn/energy-evaluation p.8 |
| 27 | [Real-Time Frame- and Event-based Object Detection with Spiking Neural Networks on Edge Neuromorphic Hardware](https://arxiv.org/abs/2605.00146) | 2026 | Neurocomputing | 最新 | Loihi 2 実機と Jetson の実測比較（静的電力が支配） | ↪ 既存：snn/energy-evaluation p.11 |
| 28 | [Comparison of Artificial and Spiking Neural Networks on Digital Hardware](https://doi.org/10.3389/fnins.2021.651141) | 2021 | Frontiers in Neuroscience | 原典 | メモリ込みで 1.72 スパイク/活性値未満が必要という損益分岐 | ↪ 既存：snn/energy-evaluation p.2 |
| 29 | [STEP: A Unified Spiking Transformer Evaluation Platform for Fair and Reproducible Benchmarking](https://arxiv.org/abs/2505.11151) | 2025 | NeurIPS | 最新 | ビット直列の量子化 Transformer がメモリ込みで Spiking Transformer を下回ると指摘 | — 参照のみ（energy-evaluation でも参照のみ） |
| 30 | [NeuroBench: A Framework for Benchmarking Neuromorphic Computing Algorithms and Systems](https://arxiv.org/abs/2304.04640) | 2025 | Nature Communications | 最新 | algorithm track / system track のベンチマーク標準 | ↪ 既存：snn/neuromorphic-hardware p.10 |
| 31 | [Darwin3: A large-scale neuromorphic chip with a Novel ISA and On-Chip Learning](https://arxiv.org/abs/2312.17582) | 2024 | National Science Review | 発展 | #7 の実装先チップ | ↪ 既存：snn/neuromorphic-hardware p.6 |
| 32 | [PMSN: A Parallel Multi-compartment Spiking Neuron for Multi-scale Temporal Processing](https://arxiv.org/abs/2408.14917) | 2024 | arXiv | 発展 | #8 で平均順位 1 位のニューロン | ↪ 既存：snn/parallel-training p.6 |
| 33 | [Rethinking the performance comparison between SNNS and ANNS](https://doi.org/10.1016/j.neunet.2019.09.005) | 2020 | Neural Networks | 原典 | 画像入力とイベント入力で SNN/ANN の優劣が逆転すると演算数ベースで比較 | ⚠️ 本文未確認（energy-evaluation と同じ） |
