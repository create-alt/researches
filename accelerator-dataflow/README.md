## SNN 専用加速器のデータフローと時間符号の時刻分解能（accelerator-dataflow/）

### 調査履歴
- 2026-10-24（第3回調査）: arXiv API（`spiking` × accelerator / dataflow / systolic / membrane potential / time-to-first-spike × hardware、新しい順・関連順）と Web 検索で 2025〜2026 年の動向を確認した。見つかったのは、時刻並列（LoAS の後続 APEX、STISA）、膜電位の置き場所（FlexSpIM、SRAM-CIM の線形減衰 LIF）、NoC 通信の冗長（UniSpike、M-HySMap）、遅延（ELSA の弾性推論）、時刻分解能（DSTD）、SSM の逐次推論向け加速器（HEMERA）。
- そこから 3 つの系譜を原典まで遡った。①時刻方向のデータ再利用：SpinalFlow（ISCA 2020）→ PTB（HPCA 2022）→ Stellar（HPCA 2024）／SpikeX（TCAD 2025）→ LoAS（MICRO 2024）→ ELSA・GustavSNN（2026）。②時間の粒度・符号：時間圧縮 TC-SNN（2019/2020）→ Lew+ の TTFS 対数計算プロセッサ（DAC 2022）→ DSTD（2026）。③膜電位と通信：IMPULSE/SpiDR → FlexSpIM、マルチキャスト → UniSpike・束ね AER。
- 本文は arXiv で読んだ。SpinalFlow は著者公開 PDF（Utah 大）で通読した。PTB と Stellar は IEEE にしかなく、OpenAlex（当日の無料枠を使い切っていた）と Semantic Scholar（429）で OA 版を探せず、本文未確認とした。LoAS・SpikeX・ELSA に書かれた内容を二次情報として系譜に載せた。
- 既存テーマとの重複：Darwin3・Speck・SpiNNaker2・Loihi 2 系（neuromorphic-hardware / parallel-training）、SATA・Bhattacharjee+（energy-evaluation）、TTFS 系（spike-coding）は再掲しなかった。Loihi 2 上の SSM・線形 RNN（2502.01330、2608.30439）は「Loihi 2 系は既存」の指示に従い参照のみとし、SSM の逐次推論は SNN 外の HEMERA で代表させた。

### 系譜
```
[時刻方向のデータ再利用・並列化]
 Eyeriss (ANN) ─→ SpinalFlow (2020：時刻順スパイク・出力定常、膜電位は発火後に破棄、TTFS 専用)
                     │                         └→ Lew+ 2022 (TTFS 対数計算プロセッサ, SpinalFlow ベース)
                     ├→ SATO (DAC 2022, 未読)
                     ├→ PTB (HPCA 2022：時間窓単位の部分並列, 本文未確認) ─→ SpikeX (TCAD 2025：窓をまたぐ重み共有＋HW 損失)
                     │                                                    └→ Bishop (2025：トークン×時刻の束, 未読)
                     ├→ Stellar (HPCA 2024：FS ニューロンで全時刻並列, 本文未確認)
                     └→ LoAS (MICRO 2024：時刻を最内ループで完全並列, dual-sparse)
                              ├→ APEX (2026：LoAS＋PASC-IF, 未読)
                              └→ [逆方向] ELSA (ISCA 2026：時刻逐次のまま spine/トークン単位のパイプラインで最初の応答 O(L))
                                          GustavSNN (HPCA 2026, 本文未確認)

[時間の粒度・時間符号の時刻分解能]
 時間圧縮 TC-SNN (Xu+ 2019/2020：γ 時刻を 1 時刻に、多値スパイク) ── Lew+ 2022 (T/τ が「時刻分解能＝ビット幅」)
 Mostafa 2017 (既存：spike-coding) ─→ Stanojevic+ 2024 (既存：spike-coding) ─→ DSTD / Syn-SNN (2026：M≈10〜20 の時刻点で十分、層ごとの時間窓)

[膜電位の保持と通信]
 IMPULSE → SpiDR (2024) → FlexSpIM (2026：膜電位定常／重み定常を層ごとに切替)
 TrueNorth AER → マルチキャスト (HamDP 等) → UniSpike (DAC 2026：宛先アドレスの共有) ／ ELSA の束ね AER

[SSM を「学習は並列・推論は逐次」で載せる]
 S5 / S4D on Loihi 2 (既存：parallel-training) ─→ HEMERA (ICCAD 2026：Mamba-2 SSD を逐次再帰で実行する専用エンジン, SNN 外)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Boosting Throughput and Efficiency of Hardware Spiking Neural Accelerators using Time Compression Supporting Multiple Spike Codes](https://arxiv.org/abs/1909.04757) | 2020 | Frontiers in Neuroscience | 原典 | γ 時刻を 1 時刻に畳み、多値（重み付き）スパイクで情報を保ったまま FPGA で最大 16 倍の時間圧縮を行う。 | ✅ p.2 |
| 2 | [SpinalFlow: An Architecture and Dataflow Tailored for Spiking Neural Networks](https://doi.org/10.1109/ISCA45697.2020.00038) | 2020 | ISCA | 原典 | 時刻順に並べたスパイクリストと出力定常データフローで、時間符号 SNN の膜電位保存をなくす。著者公開 PDF で通読。 | ✅ p.3 |
| 3 | [A Time-to-first-spike Coding and Conversion Aware Training for Energy-Efficient Deep Spiking Neural Network Processor Design](https://arxiv.org/abs/2208.04494) | 2022 | DAC | 発展 | SpinalFlow ベースの 28nm TTFS プロセッサ。変換を意識した学習 CAT と、底 2 のカーネルによる対数計算。 | ✅ p.4 |
| 4 | [LoAS: Fully Temporal-Parallel Dataflow for Dual-Sparse Spiking Neural Networks](https://arxiv.org/abs/2407.14073) | 2024 | MICRO | 発展 | 時刻ループを最内に置いて全時刻を並列化する FTP データフローと、dual-sparse 向けの圧縮・inner-join。 | ✅ p.5 |
| 5 | [SpikeX: Exploring Accelerator Architecture and Network-Hardware Co-Optimization for Sparse Spiking Neural Networks](https://arxiv.org/abs/2505.12292) | 2025 | IEEE TCAD | 発展 | PTB を発展させたシストリック SNN 加速器。時間窓をまたぐ重み共有、HW 損失つき学習、時間窓長の探索。 | ✅ p.6 |
| 6 | [FlexSpIM: An Event-Based Digital Compute-In-Memory Accelerator with Flexible Operand Resolution and Layer-Wise Hybrid Stationarity](https://arxiv.org/abs/2609.08446) | 2026 | arXiv | 最新 | 重みと膜電位を同じ SRAM に任意精度で置くデジタル CIM。層ごとに WS/OS を切り替えて系全体のデータ移動を削減。 | ✅ p.7 |
| 7 | [UniSpike: Accelerating Spiking Neural Networks on Neuromorphic Systems via Eliminating Address Redundancy](https://arxiv.org/abs/2605.23796) | 2026 | DAC | 最新 | 同じ宛先へのスパイクを 1 パケットに束ね、NoC のアドレス冗長（最大 49%）を除く。 | ✅ p.8 |
| 8 | [ELSA: An ELastic SNN Inference Architecture for Efficient Neuromorphic Computing](https://arxiv.org/abs/2605.20802) | 2026 | ISCA | 最新 | spine/トークン単位のパイプライン、束ね AER、ミニバッチ Gustavson 積で弾性推論（早期応答）を引き出す。 | ✅ p.9 |
| 9 | [Scalable Training of Continuous-Time Spiking Neural Networks with Differentiable Spike-Time Discretization](https://arxiv.org/abs/2607.14672) | 2026 | arXiv | 最新 | 連続時間 TTFS-SNN を M 個の固定時刻点で微分可能に近似して学習。層ごとの時間窓でパイプライン推論が可能。 | ✅ p.10 |
| 10 | [HEMERA: A Heterogeneous Memory-Centric Accelerator with Recursive Dataflow for Edge-Constrained State-Space-Duality Models Inference](https://arxiv.org/abs/2607.22022) | 2026 | ICCAD | 最新 | Mamba-2 SSD を逐次再帰に組み替え、デジタル CIM と再帰専用エンジンで実行（SNN 外の SSM 加速器）。 | ✅ p.11 |
| 11 | [Parallel Time Batching: Systolic-Array Acceleration of Sparse Spiking Neural Computation](https://doi.org/10.1109/HPCA53966.2022.00031) | 2022 | HPCA | 発展 | 複数時刻を時間窓にまとめてシストリックアレイの列に並列配置し、窓内で重みを再利用する（NSF PAR の要旨と LoAS・SpikeX の記述に基づく）。SNN ベースライン比 EDP 248 倍と報告。 | ⚠️ 本文未確認 |
| 12 | [Stellar: Energy-Efficient and Low-Latency SNN Algorithm and Hardware Co-Design with Spatiotemporal Computation](https://doi.org/10.1109/HPCA57654.2024.00023) | 2024 | HPCA | 発展 | Few-Spikes ニューロンで蓄積と発火を分け、全時刻を並列処理する時空間 row-stationary のシストリック加速器（LoAS の記述に基づく）。 | ⚠️ 本文未確認 |
| 13 | [GustavSNN: Unleashing the Power of Gustavson's Algorithm on SNN Acceleration with Column-Parallel Tick-Batch Dataflow](https://doi.org/10.1109/HPCA68181.2026.11408587) | 2026 | HPCA | 最新 | Gustavson 積と列並列の tick-batch で、膜電位を使い捨てにする LBL 型加速器（ELSA の記述に基づく）。 | ⚠️ 本文未確認 |
| 14 | [SATO: Spiking Neural Network Acceleration via Temporal-Oriented Dataflow and Architecture](https://doi.org/10.1145/3489517.3530592) | 2022 | DAC | 発展 | 時間符号 SNN 向けに時刻を並列処理するデータフロー（LoAS の記述に基づく）。 | ⚠️ 本文未確認 |
| 15 | [T2FSNN: Deep Spiking Neural Networks with Time-to-first-spike Coding](https://doi.org/10.1109/DAC18072.2020.9218689) | 2020 | DAC | 原典 | カーネルベースの TTFS 変換。Lew+ 2022 の基準手法。 | — 参照のみ（Lew+ 経由で確認） |
| 16 | [Prosperity: Accelerating Spiking Neural Networks via Product Sparsity](https://arxiv.org/abs/2503.03379) | 2025 | HPCA | 発展 | スパイク行列の行の組合せの重なりで内積結果を再利用する「積スパース性」。時刻次元ではなく空間の冗長が主題のため、要旨のみ確認。 | — 参照のみ |
| 17 | [Phi: Leveraging Pattern-based Hierarchical Sparsity for High-Efficiency Spiking Neural Networks](https://arxiv.org/abs/2505.10909) | 2025 | ISCA | 発展 | パターンに基づく階層的スパース性を使う SNN 加速器。ELSA の比較対象として題目のみ確認。 | — 参照のみ |
| 18 | [APEX: A Dual-Sparsity Accelerator for Precise and Efficient SNN Inference](https://arxiv.org/abs/2608.19046) | 2026 | arXiv | 最新 | LoAS に精密変換ニューロン PASC-IF を組み込む。LoAS の直系の後続。要旨のみ確認。 | — 参照のみ |
| 19 | [Bishop: Sparsified Bundling Spiking Transformers on Heterogeneous Cores with Error-Constrained Pruning](https://arxiv.org/abs/2505.12281) | 2025 | arXiv | 発展 | トークン×時刻の束 TTB を密・疎コアに振り分けるスパイキング Transformer 加速器（SpikeX と同じグループ）。要旨のみ。 | — 参照のみ |
| 20 | [FireFly v2: Advancing Hardware Support for High-Performance Spiking Neural Network with a Spatiotemporal FPGA Accelerator](https://arxiv.org/abs/2309.16158) | 2023 | arXiv | 発展 | 4 次元並列の時空間データフローで膜電位の保存をなくす FPGA 加速器。要旨のみ。 | — 参照のみ |
| 21 | [FireFly-S: Exploiting Dual-Side Sparsity for Spiking Neural Networks Acceleration with Reconfigurable Spatial Architecture](https://arxiv.org/abs/2408.15578) | 2024 | IEEE TCAS-I | 発展 | ビットマップで重み・スパイク双方のスパース性を使う FPGA 加速器。要旨のみ。 | — 参照のみ |
| 22 | [STISA: A 0.16 GOPS/W/PE Single-Shot Inference FPGA-based SNN Accelerator with Algorithm and Hardware Co-Design](https://arxiv.org/abs/2610.19973) | 2026 | IEEE TCAS-I | 最新 | 時刻分割圧縮と時刻優先の出力定常マッピングで単一 timestep 推論を行う（前身 STI-SNN, arXiv 2506.08842）。要旨のみ。 | — 参照のみ |
| 23 | [NEURAL: An Elastic Neuromorphic Architecture with Hybrid Data-Event Execution and On-the-fly Attention Dataflow](https://arxiv.org/abs/2509.15036) | 2026 | ASP-DAC | 最新 | 平均プーリングを窓→TTFS 変換 W2TTFS に置き換え、単一 timestep で動かす FPGA 構成。要旨のみ。 | — 参照のみ |
| 24 | [ExSpike: A General Full-Event Neuromorphic Architecture for Exploiting Irregular Sparsity with Event Compression](https://arxiv.org/abs/2606.20414) | 2026 | FPL | 最新 | 全層の入力をスパイクに保つ完全イベント駆動の FPGA 構成と、隣接位置のイベント圧縮。要旨のみ。 | — 参照のみ |
| 25 | [Mega: A 22 nm Convolutional Spiking Neural Network Accelerator Achieving 0.375 pJ/SOP for Efficient Edge Vision](https://arxiv.org/abs/2606.30039) | 2026 | arXiv | 最新 | スパイク・状態・重みを統一メモリに置く 22nm FDSOI 試作チップ。要旨のみ。 | — 参照のみ |
| 26 | [The Sparsity Tax: Weight Sparsity Trade-offs in Event-Driven SIMD and SIMT Neuromorphic Cores](https://arxiv.org/abs/2607.22790) | 2026 | MCSoC | 最新 | 重みスパース性が SIMD コアに課す制御・メタデータのコスト。面積は SRAM が支配的と報告。要旨のみ。 | — 参照のみ |
| 27 | [Beyond Edge Cuts: Activity-Weighted Multicast Hypergraph Mapping for Spiking Neural Networks on Mesh NoCs](https://arxiv.org/abs/2608.26223) | 2026 | arXiv | 最新 | 活動で重み付けしたマルチキャスト超グラフで、NoC のリンク混雑を考えて配置する（M-HySMap）。要旨のみ。 | — 参照のみ |
| 28 | [SRAM-Based Compute-in-Memory Accelerator for Linear-decay Spiking Neural Networks](https://arxiv.org/abs/2603.12739) | 2026 | arXiv | 最新 | 指数減衰を線形減衰に置き換え、膜電位更新を SRAM 内で並列化（更新が O(N) の瓶頸になる問題）。要旨と導入のみ確認。 | — 参照のみ |
| 29 | [An Event-Based Digital Compute-In-Memory Accelerator with Flexible Operand Resolution and Layer-Wise Weight/Output Stationarity](https://arxiv.org/abs/2410.23082) | 2024 | arXiv（ISCAS 2025 投稿） | 発展 | FlexSpIM の会議版。スライドは完全版（#6）で作成。 | — 参照のみ |
| 30 | [SpiDR: A Reconfigurable Digital Compute-in-Memory Spiking Neural Network Accelerator for Event-based Perception](https://arxiv.org/abs/2411.02854) | 2024 | arXiv | 発展 | 4/7・6/11・8/15bit の固定モードを持つデジタル CIM SNN 加速器（FlexSpIM の比較対象）。要旨のみ。 | — 参照のみ |
| 31 | [Systolic Array Acceleration of Spiking Neural Networks with Application-Independent Split-Time Temporal Coding](https://doi.org/10.1145/3665314.3672292) | 2024 | ISLPED | 発展 | PTB と同系統の時間分割符号によるシストリック加速（Crossref で題目のみ確認）。 | ⚠️ 本文未確認 |
| 32 | [Latency Coding for Efficient and Low-Latency Deep Spiking Neural Networks](https://arxiv.org/abs/2603.23206) | 2026 | arXiv | 最新 | TTFS を拡張した潜時符号を BPTT で学習する。HW 評価はなく、要旨のみ。 | — 参照のみ |
| 33 | [Accelerating Linear Recurrent Neural Networks for the Edge with Unstructured Sparsity](https://arxiv.org/abs/2502.01330) | 2025 | arXiv | 最新 | 疎な線形 RNN を Loihi 2 に載せる。Loihi 2 系は既存テーマの扱いのため参照のみ。 | — 参照のみ |
| 34 | [Event-Driven Language Models with Sparse Neural Activity for Neuromorphic Hardware](https://arxiv.org/abs/2608.30439) | 2026 | MCSoC | 最新 | 量子化線形注意 LM の活性を閾値で疎にし、Loihi 2 の多チップでの効果を見積もる。Loihi 2 系のため参照のみ。 | — 参照のみ |
| 35 | HamDP / HamMP / HamK / FlitZip（NoC マルチキャスト・パケット圧縮。UniSpike の参考文献 [11, 15, 26, 33]） | — | — | 発展 | UniSpike の比較対象（UniSpike 本文経由）。 | — 参照のみ |
| 36 | [Supervised learning based on temporal coding in spiking neural networks](https://arxiv.org/abs/1606.08165) | 2018 | IEEE TNNLS | 原典 | TTFS の直接学習。DSTD の系譜の出発点。 | ↪ 既存：snn/spike-coding p.2 |
| 37 | [High-performance deep spiking neural networks with 0.3 spikes per neuron](https://arxiv.org/abs/2306.08744) | 2024 | Nature Commun. | 発展 | TTFS≡ReLU の等価写像。 | ↪ 既存：snn/spike-coding p.6 |
| 38 | [SATA: Sparsity-Aware Training Accelerator for Spiking Neural Networks](https://arxiv.org/abs/2204.05422) | 2022 | IEEE TCAD | 発展 | LoAS と同グループのシストリック学習加速器。 | ↪ 既存：snn/energy-evaluation p.3 |
| 39 | [Are SNNs Truly Energy-efficient? — A Hardware Perspective](https://arxiv.org/abs/2309.03388) | 2024 | ICASSP | 発展 | シストリックアレイ上での SNN のエネルギー評価。 | ↪ 既存：snn/energy-evaluation p.6 |
| 40 | [Darwin3: A large-scale neuromorphic chip with a Novel ISA and On-Chip Learning](https://arxiv.org/abs/2312.17582) | 2024 | National Science Review | 発展 | ELSA が比較した TBT 型の多コアチップ。 | ↪ 既存：snn/neuromorphic-hardware p.6 |
| 41 | [Modeling and Optimizing Performance Bottlenecks for Neuromorphic Accelerators (Floorline)](https://arxiv.org/abs/2511.21549) | 2025 | arXiv | 発展 | ニューロモルフィック HW の性能上限モデル。 | ↪ 既存：snn/neuromorphic-hardware p.11 |
| 42 | [Simplified State Space Layers for Sequence Modeling (S5)](https://arxiv.org/abs/2208.04933) | 2023 | ICLR | 原典 | 並列スキャンで学習する SSM。 | ↪ 既存：snn/parallel-training p.3 |
| 43 | [A Diagonal Structured State Space Model on Loihi 2 for Efficient Streaming Sequence Processing](https://arxiv.org/abs/2409.15022) | 2024 | NeurIPS 2024 WS | 発展 | S4D を Loihi 2 上で逐次推論する。 | ↪ 既存：snn/parallel-training p.7 |
