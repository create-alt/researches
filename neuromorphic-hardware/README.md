## ニューロモルフィックハードウェアと応用（neuromorphic-hardware/）

### 調査履歴
- 2026-10-23: arXiv API（Loihi / SpiNNaker2 / NeuroBench / Speck / event camera × neuromorphic hardware）で 2024〜2026 年の最新動向を把握し、Loihi 2 上の LLM・転倒検知、SpiNNaker2 チップ論文、floorline 性能モデルを起点に選定。そこから (a) チップの系譜（TrueNorth → Loihi → Loihi 2、SpiNNaker → SpiNNaker2、Darwin3、Speck）、(b) エネルギー評価法の系譜（Blouw+ 2018 の動的エネルギー/推論 → SNABSuite → NeuroBench → floorline）、(c) イベントカメラ応用（Speck 上の視線追跡、IMX636+Loihi 2）の3本を原典側へ遡った。
- 途中でネットワークが拡張されたため、OpenAlex で OA 版を探索。Speck（Nature Communications）と SNABSuite（Frontiers）は OA 全文を読めたのでスライド化した。TrueNorth・Loihi・SpiNNaker・Tianjic・Loihi サーベイは OA 版に到達できず（出版社サイト・著者サイトとも遮断）、本文未確認のままとした。
- 学習アルゴリズム・Spiking Transformer は別テーマのため、ハードウェア・システム評価・応用に関係する範囲だけを扱った。

### 系譜
```
[チップ]
TrueNorth (Merolla+ 2014, ⚠️) ── Eedn on TrueNorth (Esser+ 2016) ─────────────┐
Loihi (Davies+ 2018, ⚠️) ─┬─ KWS on Loihi (Blouw+ 2018)                       │
                          └─ Loihi 2 信号処理 (Orchard+ 2021) ─┬─ MatMul-free LLM on Loihi 2 (Abreu+ 2025)
                                                               └─ IMX636+Loihi 2 転倒検知 (Khacef+ 2026)
SpiNNaker (Furber+ 2014, ⚠️) ───────────────── SpiNNaker2 chip (Scholze+ 2026)
Tianjic (Pei+ 2019, ⚠️) / Darwin 系 ─────────── Darwin3 (Ma+ 2024) → DarwinWafer (2025)
Speck (Yao+ 2024: センサ統合・完全非同期) ───── Retina (Bonazzi+ 2024: Speck 上の視線追跡)

[評価法]
KWS on Loihi (Blouw+ 2018: 動的エネルギー/推論)
  → SNABSuite (Ostrau+ 2022: 単価分解エネルギーモデル・横断ベンチマーク)
  → NeuroBench (Yik+ 2025: algorithm/system の2トラック標準)
  → Floorline (Yik+ 2025: synop 等の代理指標の限界とボトルネックモデル)
  → 応用での NeuroBench 準拠評価（Khacef+ 2026）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Convolutional Networks for Fast, Energy-Efficient Neuromorphic Computing](https://arxiv.org/abs/1603.08270) | 2016 | PNAS | 原典 | TrueNorth 上で2値ニューロン・3値重み制約下の CNN（Eedn）を学習し、8課題で SOTA 近傍精度を >6000 FPS/W で実行 | ✅ p.2 |
| 2 | [Benchmarking Keyword Spotting Efficiency on Neuromorphic Hardware](https://arxiv.org/abs/1812.01739) | 2018 | arXiv プレプリント | 原典 | Loihi と CPU/GPU/Jetson/Movidius を同一 KWS 網で比較し、動的エネルギー/推論で Loihi が最小 | ✅ p.3 |
| 3 | [Efficient Neuromorphic Signal Processing with Loihi 2](https://arxiv.org/abs/2111.03746) | 2021 | IEEE SiPS | 発展 | Loihi 2 のプログラマブルニューロンで Resonate-and-Fire を実装し STFT・光学フロー等を効率化（エミュレーション評価） | ✅ p.4 |
| 4 | [Benchmarking Neuromorphic Hardware and Its Energy Expenditure](https://doi.org/10.3389/fnins.2022.873935) | 2022 | Frontiers in Neuroscience | 発展 | 横断ベンチマーク SNABSuite と単価分解型エネルギーモデル。SpiNNaker/BrainScaleS/Spikey/GPU を比較（Frontiers OA 版で全文確認） | ✅ p.5 |
| 5 | [Darwin3: A large-scale neuromorphic chip with a Novel ISA and On-Chip Learning](https://arxiv.org/abs/2312.17582) | 2024 | National Science Review | 発展 | 専用 ISA と結合圧縮で 235 万ニューロン/チップ、可プログラムなオンチップ学習 | ✅ p.6 |
| 6 | [Spike-based dynamic computing with asynchronous sensing-computing neuromorphic chip](https://doi.org/10.1038/s41467-024-47811-6) | 2024 | Nature Communications | 発展 | DVS 統合・完全非同期 SoC「Speck」（待機 0.42 mW）と注意型動的 SNN（Nature Communications OA 版で全文確認） | ✅ p.7 |
| 7 | [Retina: Low-Power Eye Tracking with Event Camera and Spiking Hardware](https://arxiv.org/abs/2312.00425) | 2024 | CVPR Workshops | 発展 | 眼鏡装着 DVS の瞳孔追跡 SNN を Speck に実装、end-to-end 2.89〜4.8 mW | ✅ p.8 |
| 8 | [Neuromorphic Principles for Efficient Large Language Models on Intel Loihi 2](https://arxiv.org/abs/2503.18002) | 2025 | ICLR 2025 Workshop (SCOPE) | 最新 | 370M MatMul-free LLM を Loihi 2（24 チップ）で実行、エッジ GPU 比スループット最大3倍・エネルギー約半分（予備結果） | ✅ p.9 |
| 9 | [NeuroBench: A Framework for Benchmarking Neuromorphic Computing Algorithms and Systems](https://arxiv.org/abs/2304.04640) | 2025 | Nature Communications | 最新 | algorithm/system の2トラックからなるコミュニティ標準ベンチマーク（Xylo・Loihi 2 のベースライン） | ✅ p.10 |
| 10 | [Modeling and Optimizing Performance Bottlenecks for Neuromorphic Accelerators](https://arxiv.org/abs/2511.21549) | 2025 | arXiv プレプリント | 最新 | AKD1000/Speck/Loihi 2 の実測から floorline 性能モデルを提案、最適化で最大 3.86 倍高速 | ✅ p.11 |
| 11 | [Privacy-preserving fall detection at the edge using Sony IMX636 event-based vision sensor and Intel Loihi 2 neuromorphic processor](https://arxiv.org/abs/2511.22554) | 2026 | IEEE NICE | 最新 | HD イベントセンサと Loihi 2 を FPGA 直結した転倒検知、単一チップ約 90 mW・F1 83.6% | ✅ p.12 |
| 12 | [The SpiNNaker2 chip: a many-core platform for flexible and scalable brain-inspired computing](https://arxiv.org/abs/2607.24396) | 2026 | IEEE OJCAS | 最新 | 152 PE・DVFS・DNN アクセラレータを持つ SpiNNaker2 の設計と実測（2.77 TOPS/W、SNN >15 万ニューロン） | ✅ p.13 |
| 13 | [A million spiking-neuron integrated circuit with a scalable communication network and interface](https://doi.org/10.1126/science.1254642) | 2014 | Science | 原典 | IBM TrueNorth。4096 コア・100 万ニューロン・2.56 億シナプス、ビデオ処理で約 63〜70 mW（検索情報に基づく。Science は非 OA、著者サイトは到達不可） | ⚠️ 本文未確認 |
| 14 | [Loihi: A Neuromorphic Manycore Processor with On-Chip Learning](https://doi.org/10.1109/MM.2018.112130359) | 2018 | IEEE Micro | 原典 | Intel 初代 Loihi（14 nm、128 コア、プログラマブルな学習則）（検索情報・引用元論文の記述に基づく。IEEE は到達不可） | ⚠️ 本文未確認 |
| 15 | [The SpiNNaker Project](https://doi.org/10.1109/JPROC.2014.2304638) | 2014 | Proceedings of the IEEE | 原典 | ARM 多コアとマルチキャストルータによる大規模 SNN シミュレーション基盤（IEEE 上は無料公開だが到達不可、Manchester リポジトリも遮断） | ⚠️ 本文未確認 |
| 16 | [Towards artificial general intelligence with hybrid Tianjic chip architecture](https://doi.org/10.1038/s41586-019-1424-8) | 2019 | Nature | 原典 | ANN と SNN を同一チップで混在実行する Tianjic、無人自転車デモ（検索情報に基づく。非 OA） | ⚠️ 本文未確認 |
| 17 | [Advancing Neuromorphic Computing With Loihi: A Survey of Results and Outlook](https://doi.org/10.1109/JPROC.2021.3067593) | 2021 | Proceedings of the IEEE | 発展 | Loihi 上の成果の総括（OA だが IEEE サイトに到達不可） | ⚠️ 本文未確認 |
| 18 | [Benchmarks for progress in neuromorphic computing](https://doi.org/10.1038/s42256-019-0097-1) | 2019 | Nature Machine Intelligence | 発展 | ニューロモルフィック分野のベンチマーク整備を訴えた論説（非 OA） | ⚠️ 本文未確認 |
| 19 | [Neural inference at the frontier of energy, space, and time](https://doi.org/10.1126/science.adh1174) | 2023 | Science | 発展 | TrueNorth の後継的位置づけの IBM NorthPole（非 SNN の近メモリ推論チップ）（非 OA） | ⚠️ 本文未確認 |
| 20 | [SpiNNaker2: A Large-Scale Neuromorphic System for Event-Based and Asynchronous Machine Learning](https://arxiv.org/abs/2401.04491) | 2024 | NeurIPS 2023 Workshop (MLNCP) | 発展 | SpiNNaker2 システムの概説。チップの包括報告（#12）に内容が包含されるため参照のみ | — 参照のみ |
| 21 | [Efficient Video and Audio processing with Loihi 2](https://arxiv.org/abs/2310.03251) | 2023 | arXiv プレプリント | 発展 | sigma-delta・RF・graded spike で映像/音声処理の EDP を大幅改善。Orchard+ 2021 と #8 で系譜を代表させたため参照のみ | — 参照のみ |
| 22 | [Scalable MatMul-free Language Modeling](https://arxiv.org/abs/2406.02528) | 2024 | arXiv プレプリント | 発展 | 行列積なし LLM の元論文（Loihi 2 実装の言及あり）。アルゴリズム寄りのため参照のみ | — 参照のみ |
| 23 | [Neurobench: DCASE 2020 Acoustic Scene Classification benchmark on XyloAudio 2](https://arxiv.org/abs/2410.23776) | 2024 | arXiv プレプリント | 発展 | NeuroBench system track の Xylo ベースライン詳細。#9 に要約されるため参照のみ | — 参照のみ |
| 24 | [A compact neuromorphic system for ultra-energy-efficient, on-device robot localization](https://arxiv.org/abs/2408.16754) | 2025 | Science Robotics | 発展 | Speck 上の視覚的場所認識による自己位置推定。Speck 応用は #7 で代表させたため参照のみ | — 参照のみ |
| 25 | [Efficient Deployment of Spiking Neural Networks on SpiNNaker2 for DVS Gesture Recognition Using Neuromorphic Intermediate Representation](https://arxiv.org/abs/2504.06748) | 2025 | NICE 2025 | 発展 | NIR 経由で SNN を SpiNNaker2 に展開。#12 の DVS Gesture 実験の元になった作業のため参照のみ | — 参照のみ |
| 26 | [Event-based backpropagation on the neuromorphic platform SpiNNaker2](https://arxiv.org/abs/2412.15021) | 2024 | NeurIPS 2024 Workshop (MLNCP) | 発展 | SpiNNaker2 上の EventProp によるオンチップ学習。学習アルゴリズム寄りのため参照のみ | — 参照のみ |
| 27 | [A Compute and Communication Runtime Model for Loihi 2](https://arxiv.org/abs/2601.10035) | 2026 | arXiv プレプリント | 最新 | Loihi 2 の max-affine（多次元 roofline）実行時間モデル。#10 と主題が重なるため参照のみ | — 参照のみ |
| 28 | [DarwinWafer: A Wafer-Scale Neuromorphic Chip](https://arxiv.org/abs/2509.16213) | 2025 | arXiv プレプリント | 最新 | Darwin3 チップレット 64 個をウェハ上に集積（1.5 億ニューロン、4.9 pJ/SOP）。アブストラクトのみ確認のため参照のみ | — 参照のみ |
| 29 | [The BrainScaleS-2 accelerated neuromorphic system with hybrid plasticity](https://arxiv.org/abs/2201.11063) | 2022 | arXiv プレプリント | 発展 | アナログ加速型 BrainScaleS-2 の概説。デジタル系を中心にしたため参照のみ | — 参照のみ |
| 30 | [Real-Time Frame- and Event-based Object Detection with Spiking Neural Networks on Edge Neuromorphic Hardware: Design, Deployment and Benchmark](https://arxiv.org/abs/2605.00146) | 2026 | arXiv プレプリント | 最新 | Loihi 2 上の SNN 物体検出を Jetson 等と比較。アブストラクトのみ確認のため参照のみ | — 参照のみ |
| 31 | [Efficient Onboard Spacecraft Pose Estimation with Event Cameras and Neuromorphic Hardware](https://arxiv.org/abs/2604.04117) | 2026 | CVPR 2026 Workshop (AI4SPACE) | 最新 | イベントカメラ＋BrainChip Akida による宇宙機姿勢推定。アブストラクトのみ確認のため参照のみ | — 参照のみ |
