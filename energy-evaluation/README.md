## エネルギー評価の方法論（理論推定と実機計測の差）（energy-evaluation/）

### 調査履歴
- 2026-10-23: arXiv API と WebSearch（"spiking energy estimation", "memory access / data movement", "fair comparison ANN", "Loihi 2 vs Jetson measured" など）で 2024〜2026 年の動向を把握した。起点にしたのは Yan+（TCAD 2026, v6）、Höfflin & Wassner（2025）、Gamage+（2026）と、2026 年のプレプリント群（Sparsity Tax、Sparsity Ceiling、表現力で正規化した比較、モダリティ別ベンチマーク）。
- そこから3本の系譜を原典側へ遡った。(a) 解析モデル：Horowitz の演算単価 → Davidson & Furber 2021（メモリ込みの損益分岐）→ Lemaire 2022 → Yan 2026（容量を揃えた QNN 双子）。(b) HWシミュレータ：SpinalFlow → SATA → Bhattacharjee 2024。(c) 公平な比較と実測：Ottati 2023（公表チップの横断比較）、Shen 2024（量子化ANN）、Xu 2025（同一プロセッサ）、Gamage 2026（Loihi 2 実機）。
- OA 版を探した結果：Davidson & Furber は Frontiers、Shen は CVF Open Access で全文を読めた。Horowitz 2014、Dampfhoffer+ 2023（HAL は到達不可、S2 では CLOSED）、SpinalFlow、Deng+ 2020 は OA 版に到達できず、本文未確認とした。OpenAlex はレート制限のため使えず、Crossref と Semantic Scholar でメタデータを確認した。
- 既存テーマとの重複：NeuroBench・floorline・SNABSuite・KWS on Loihi（neuromorphic-hardware）と Spikformer（spiking-transformer）は再掲せず、既存デッキへの参照とした。

### 系譜
```
[演算単価の原典] Horowitz ISSCC 2014 (⚠️: 45nm で MAC≈4.6pJ / AC≈0.9pJ、SRAM/DRAM アクセス単価)
   │  ← 多くの SNN 論文が「MAC/AC 回数×単価」で省エネを主張する根拠
   ▼
[解析モデル：メモリ込み]
Davidson & Furber 2021（N_spk<1.72 の損益分岐）
  ├→ Lemaire+ 2022（メモリ・アドレス計算込み、HW非依存。SNN 6〜8倍有利と推定）
  │     └→ Höfflin & Wassner 2025（HW非依存と HW考慮で結論が反転）
  ├→ Dampfhoffer+ 2023 (⚠️: Eyeriss 型でデータ再利用込み。0.15〜1.38 スパイク/シナプス)
  ├→ Ottati+ 2023（公表チップの実測を横断比較。静的画像は ANN がパレート優位）
  └→ Yan+ 2026（容量を揃えた QNN-SNN 双子、NoC・再利用込みの閉形式損益分岐）
        ↑ 比較相手を量子化 ANN に：Shen+ 2024（Bit Budget：T時刻 SNN ≈ Tビット QANN）
[HWシミュレータ]
SpinalFlow 2020 (⚠️) → SATA 2022（スパース性考慮のエネルギー推定基盤）
                      → Bhattacharjee+ 2024（推定 10〜83倍 → 実効 1.3〜6.8倍）
[同一HW・実チップでの計測]
Xu+ 2025（SENECA 上でスパース化 ANN と SNN を同条件比較、ゲートレベル電力）
  → Gamage+ 2026（Loihi 2 実機 vs Jetson/M2、動的・静的・EDP を分離）
  （既存：KWS on Loihi 2018 → SNABSuite 2022 → NeuroBench 2025 → floorline 2025）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Comparison of Artificial and Spiking Neural Networks on Digital Hardware](https://doi.org/10.3389/fnins.2021.651141) | 2021 | Frontiers in Neuroscience | 原典 | 同一デジタル回路上で ANN と レート符号化 SNN の費用を分解し、メモリアクセスを含めると平均 1.72 スパイク/活性値未満でないと SNN は勝てないと示した（Frontiers OA 版で全文確認） | ✅ p.2 |
| 2 | [SATA: Sparsity-Aware Training Accelerator for Spiking Neural Networks](https://arxiv.org/abs/2204.05422) | 2022 | IEEE TCAD | 発展 | BPTT 学習 SNN 用のスパース性考慮加速器とエネルギー推定枠組み。Eyeriss 型 ANN 比で SNN 学習は 1.27 倍、メモリ（GLB/DRAM）が支配的 | ✅ p.3 |
| 3 | [An Analytical Estimation of Spiking Neural Networks Energy Efficiency](https://arxiv.org/abs/2210.13107) | 2022 | ICONIP | 発展 | シナプス演算・メモリ・アドレス計算を数える HW非依存の指標。3データセットで SNN 6〜8 倍省エネと推定 | ✅ p.4 |
| 4 | [To Spike or Not To Spike: A Digital Hardware Perspective on Deep Learning Acceleration](https://arxiv.org/abs/2306.15749) | 2023 | IEEE JETCAS | 発展 | ANN/SNN 加速器を簡易モデルと公表チップの実測で比較。ImageNet では SNPU'23（1.95mJ）が同じ 28nm の ANN（0.46mJ）にパレート支配される | ✅ p.5 |
| 5 | [Are SNNs Truly Energy-efficient? — A Hardware Perspective](https://arxiv.org/abs/2309.03388) | 2024 | ICASSP | 発展 | FLOPs×T×スパース率による推定省エネを SATA/SpikeSim で再評価し、推定 10〜83 倍が実効 1.3〜6.8 倍に縮むことを示した | ✅ p.6 |
| 6 | [Are Conventional SNNs Really Efficient? A Perspective from Network Quantization](https://arxiv.org/abs/2311.10802) | 2024 | CVPR | 発展 | T 時刻 SNN と T ビット QANN の等価性を示し、SynOps に代わる Bit Budget / S-ACE を提案（CVF Open Access 版で全文確認） | ✅ p.7 |
| 7 | [Event-based Optical Flow on Neuromorphic Processor: ANN vs. SNN Comparison based on Activation Sparsification](https://arxiv.org/abs/2407.20421) | 2025 | Neural Networks | 発展 | SENECA 上でスパース化した ANN と SNN を同条件で比較（SNN はエネルギー 75.2%）。差の要因は画素単位の密度 | ✅ p.8 |
| 8 | [Hardware-aware vs. Hardware-agnostic Energy Estimation for SNN in Space Applications](https://arxiv.org/abs/2508.19654) | 2025 | IAA-SPAICE | 最新 | 同じ SNN/CNN に HW非依存と HW考慮の推定を適用。前者は一律 50〜60% 省エネ、後者はメモリ単価比と HW 種別で結論が反転 | ✅ p.9 |
| 9 | [Reconsidering the Energy Efficiency of Spiking Neural Networks Inference from Analytical Perspectives](https://arxiv.org/abs/2409.08290) | 2026 | IEEE TCAD | 最新 | 容量を揃えた QNN-SNN 双子とデータ移動込みの第一原理モデル。典型条件で T=5 ならスパイク率 5.7% 未満が必要 | ✅ p.10 |
| 10 | [Real-Time Frame- and Event-based Object Detection with Spiking Neural Networks on Edge Neuromorphic Hardware: Design, Deployment and Benchmark](https://arxiv.org/abs/2605.00146) | 2026 | Neurocomputing | 最新 | Loihi 2 実機の SNN 検出と Jetson/M2 の ANN を実測比較。動的エネルギーは Loihi 2 が最小だが EDP は Orin Nano が最良、静的電力が支配的 | ✅ p.11 |
| 11 | [1.1 Computing's energy problem (and what we can do about it)](https://doi.org/10.1109/ISSCC.2014.6757323) | 2014 | ISSCC | 原典 | 45nm の演算・メモリアクセスのエネルギー単価表（SNN 論文の E_MAC=4.6pJ、E_AC=0.9pJ の出典）。引用元論文の記述と検索情報に基づく。IEEE は到達不可、S2 では CLOSED | ⚠️ 本文未確認 |
| 12 | [Are SNNs Really More Energy-Efficient Than ANNs? an In-Depth Hardware-Aware Study](https://doi.org/10.1109/TETCI.2022.3214509) | 2023 | IEEE TETCI | 発展 | Eyeriss を事例に、データ再利用・スパース性・メモリを含めた ANN 効率の上限と比較し、SNN が勝つには 0.15〜1.38 スパイク/シナプス程度の高いスパース性が必要と示した（検索情報と引用元に基づく。HAL 版は到達不可） | ⚠️ 本文未確認 |
| 13 | [SpinalFlow: An Architecture and Dataflow Tailored for Spiking Neural Networks](https://doi.org/10.1109/ISCA45697.2020.00038) | 2020 | ISCA | 原典 | 系統配列上の SNN 専用データフロー。レート符号化 SNN は Row-Stationary の Eyeriss より最大約 60 倍、16 時刻の SNN は ANN より最大約 16 倍エネルギーを要すると指摘（それぞれ SATA と Bhattacharjee の記述に基づく） | ⚠️ 本文未確認 |
| 14 | [Rethinking the performance comparison between SNNS and ANNS](https://doi.org/10.1016/j.neunet.2019.09.005) | 2020 | Neural Networks | 原典 | 画像入力では SNN は精度・演算量とも不利、イベントカメラ入力では有利と演算数ベースで比較（Xu+ 2025 の記述に基づく。非 OA） | ⚠️ 本文未確認 |
| 15 | [Synaptic Activity and Hardware Footprint of Spiking Neural Networks in Digital Neuromorphic Systems](https://doi.org/10.1145/3520133) | 2022 | ACM TECS | 発展 | FPGA 上で ANN/SNN 加速器を設計し、演算数指標と実際の消費の不一致を示した（Lemaire+ 2022 の記述に基づく） | ⚠️ 本文未確認 |
| 16 | [SpikeSim: An end-to-end Compute-in-Memory Hardware Evaluation Tool for Benchmarking Spiking Neural Networks](https://arxiv.org/abs/2210.12899) | 2023 | IEEE TCAD | 発展 | RRAM クロスバ上の SNN の精度・エネルギー・遅延・面積を評価するツール。#5 で用途と結果を代表させたため参照のみ | — 参照のみ |
| 17 | [STEP: A Unified Spiking Transformer Evaluation Platform for Fair and Reproducible Benchmarking](https://arxiv.org/abs/2505.11151) | 2025 | NeurIPS | 最新 | Spiking Transformer の統一ベンチマーク。エネルギー節（Sec. 5.5）では、ビット直列の量子化 Transformer（16.5mJ）がメモリ込みで Spiking Transformer（17.2mJ）を下回ると示す。主題が Transformer 評価全般のため参照のみ（エネルギー節のみ精読） | — 参照のみ |
| 18 | [Energy efficiency analysis of Spiking Neural Networks for space applications](https://arxiv.org/abs/2505.11418) | 2025 | Astrodynamics | 最新 | EuroSAT 分類で SNN 各手法を比較し、HW非依存の EMAC 指標を提案（#8 が比較対象とした手法）。アブストラクトと #8 の記述のみ確認のため参照のみ | — 参照のみ |
| 19 | [Towards an Expressivity-Normalized Energy-Demand Comparison of ANNs and SNNs](https://arxiv.org/abs/2608.29869) | 2026 | arXiv プレプリント | 最新 | 線形領域数の上界で表現力を揃えた ANN/SNN のエネルギー比 η を定義し、幅・スパース性・深さの臨界値を導出。4頁の理論的試論で実証が乏しいため参照のみ（全文確認） | — 参照のみ |
| 20 | [The Sparsity Tax: Weight Sparsity Trade-offs in Event-Driven SIMD and SIMT Neuromorphic Cores](https://arxiv.org/abs/2607.22790) | 2026 | IEEE MCSoC | 最新 | 重みスパース化が SIMD 型神経形態コアに課す制御・メタデータ・メモリの「税」を GF22 ゲートレベルで定量化。重み側スパース性の扱いが主題のため参照のみ（本文の大半を確認） | — 参照のみ |
| 21 | [The Sparsity Ceiling: Where Spiking Networks Can and Cannot Trade Activity for Energy](https://arxiv.org/abs/2607.26648) | 2026 | arXiv プレプリント | 最新 | 発火率を下げられる限界は課題依存（順伝播知覚は 5%、再帰 LM は約 50% が下限）と主張。単著 5 頁でアブストラクト中心の確認のため参照のみ | — 参照のみ |
| 22 | [Benchmarking spiking neural networks across sensing modalities on edge devices](https://arxiv.org/abs/2609.00026) | 2026 | arXiv プレプリント | 最新 | 5 モダリティ・7 物理エッジ機器・4 神経形態シミュレータで 4,662 評価。SNN の省エネは 1.27〜29.58 倍とモダリティ依存で、遅延・メモリは悪化。エネルギー計測法の記述が補足資料頼みのため参照のみ（本文確認） | — 参照のみ |
| 23 | [Energy Aware Development of Neuromorphic Implantables: From Metrics to Action](https://arxiv.org/abs/2506.09599) | 2025 | arXiv プレプリント | 最新 | SNN ベンチマーク文献のエネルギー指標 13 種を、入手性・忠実度・行動可能性・傾向分析の 4 観点で分類。アブストラクトのみ確認のため参照のみ | — 参照のみ |
| 24 | [Benchmarking Keyword Spotting Efficiency on Neuromorphic Hardware](https://arxiv.org/abs/1812.01739) | 2018 | arXiv プレプリント | 原典 | Loihi と CPU/GPU の動的エネルギー/推論の実測比較 | ↪ 既存：neuromorphic-hardware p.3 |
| 25 | [Benchmarking Neuromorphic Hardware and Its Energy Expenditure](https://doi.org/10.3389/fnins.2022.873935) | 2022 | Frontiers in Neuroscience | 発展 | SNABSuite と単価分解型のエネルギーモデル | ↪ 既存：neuromorphic-hardware p.5 |
| 26 | [NeuroBench: A Framework for Benchmarking Neuromorphic Computing Algorithms and Systems](https://arxiv.org/abs/2304.04640) | 2025 | Nature Communications | 最新 | synop・effective MAC 等の algorithm track 指標と system track 実測の標準 | ↪ 既存：neuromorphic-hardware p.10 |
| 27 | [Modeling and Optimizing Performance Bottlenecks for Neuromorphic Accelerators](https://arxiv.org/abs/2511.21549) | 2025 | arXiv プレプリント | 最新 | 総 synop などの代理指標は実機性能を説明できないと示した floorline モデル | ↪ 既存：neuromorphic-hardware p.11 |
| 28 | [Spikformer: When Spiking Neural Network Meets Transformer](https://arxiv.org/abs/2209.15425) | 2022 | ICLR 2023 | 発展 | Horowitz 単価による SOP ベースのエネルギー推定を用いる代表例（#6・#17 の比較対象） | ↪ 既存：spiking-transformer p.3 |
| 29 | [Conversion of Continuous-Valued Deep Networks to Efficient Event-Driven Networks for Image Classification](https://doi.org/10.3389/fnins.2017.00682) | 2017 | Frontiers in Neuroscience | 原典 | ANN→SNN 変換。#1 が想定するレート符号化 SNN の出所 | ↪ 既存：training p.3 |
