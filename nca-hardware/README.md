## 離散・非同期 NCA のハードウェア化（nca-hardware/）

### 調査履歴
- 2026-10-24: 候補メモ（candidates/neural-cellular-automata.md）のテーマ案 3 を起点に、最新の DiffLogic CA（2025）・Self-Organising Digital Circuits（2026）・組込み CA プラットフォーム（ALIFE 2025）から入った。arXiv API で「cellular automata × FPGA/hardware/microcontroller/logic gate/LUT/spiking/quantized/photonic」、「differentiable logic gate」を検索し、WebSearch で FPGA 実装・量子化 NCA・非同期 NCA を補った。
- 系譜は 2 本を遡った。(1) 論理回路系: DiffLogic（2022）→ Convolutional DiffLogic（2024）→ DiffLogic CA（2025）→ Self-Organising Digital Circuits（2026）。(2) 物理・組込み系: μNCA（2021、量子化）、Spiking NCA（2022）、Photonic NCA（2024）、eNCApsulate（2025）、Woiwode+ の組込みプラットフォーム（2025）。
- 採録先は Crossref で確認した（DiffLogic CA = ALIFE 2025、SODC = ALIFE 2026、Woiwode = ALIFE 2025、Photonic NCA = Light Sci. Appl. 2024、eNCApsulate = IJCARS 2025、Physical NCA = IROS 2022）。
- 非同期 NCA の原典 Niklasson+「Asynchronicity in Neural Cellular Automata」（ALIFE 2021）は OpenAlex で closed、MIT Press Direct にも到達できず本文未確認。Physical NCA（Walker+ 2022）と Smart Cellular Bricks（2025）は同分野の learned-collective 担当がダウンロード済みだったため、重複を避けて本デッキではスライド化しなかった。Growing NCA（2020）も nca-world-models 側で扱う見込みのため参照のみとした。

### 系譜
```
[量子化・小型化]   Texture NCA (2021, 未確認) ─→ μNCA (2021) ─────────────→ eNCApsulate (2025, ESP32 マイコン)
                                                                   Med-NCA (2023) ─┘
[論理回路]         DiffLogic (2022) ─→ Convolutional DiffLogic (2024, FPGA) ─┐
                                                                            ├→ DiffLogic CA (2025) ─→ Self-Organising Digital Circuits (2026)
[非同期]           Growing NCA (2020) ─→ Asynchronicity in NCA (2021, 未確認) ┘
[物理・組込み]     Self-classifying MNIST (2020) ─→ Physical NCA (2022) ─→ Rotation-Invariant Embedded Platform (2025)
                                               └→ Photonic NCA (2024, 光回路)
[SNN]              NCA + 分散制御 (Medvet+ 2020) ─→ Spiking NCA (2022, VSR 制御)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [μNCA: Texture Generation with Ultra-Compact Neural Cellular Automata](https://arxiv.org/abs/2111.13545) | 2021 | arXiv | 原典 | 68〜588 パラメータの NCA でテクスチャを生成。1 バイト量子化でも劣化せず、シェーダで動く。 | ✅ p.2 |
| 2 | [Deep Differentiable Logic Gate Networks](https://arxiv.org/abs/2210.08277) | 2022 | NeurIPS | 原典 | 16 種の 2 入力ゲートを確率論理で緩和し、ゲート網を勾配学習。MNIST 98.47% を CPU 7µs/枚。 | ✅ p.3 |
| 3 | [Collective control of modular soft robots via embodied Spiking Neural Cellular Automata](https://arxiv.org/abs/2204.02099) | 2022 | ICLR 2022 Workshop (Cells2Societies) | 原典 | VSR の各ボクセルを LIF+ホメオスタシスの SNN セルにした NCA。未知地形への適応性が MLP より高い。 | ✅ p.4 |
| 4 | [Deep Learning with Photonic Neural Cellular Automata](https://arxiv.org/abs/2309.13186) | 2024 | Light: Science & Applications | 発展 | 光の干渉と PPLN の非線形で NCA の局所則を実装。光学パラメータ 3 個で 2 クラス分類 98.0%。 | ✅ p.5 |
| 5 | [Convolutional Differentiable Logic Gate Networks](https://arxiv.org/abs/2411.04732) | 2024 | NeurIPS (Oral) | 発展 | 論理ゲート木の畳み込み・OR プーリング・残差初期化。CIFAR-10 86.29%、FPGA で 24ns/枚。 | ✅ p.6 |
| 6 | [eNCApsulate: Neural Cellular Automata for Precision Diagnosis on Capsule Endoscopes](https://arxiv.org/abs/2504.21562) | 2025 | IJCARS | 最新 | ESP32-S3 上の NCA でカプセル内視鏡の出血セグメンテーションと深度推定。47KB、早期打ち切りで 1 枚 1 秒未満。 | ✅ p.7 |
| 7 | [Differentiable Logic Cellular Automata: From Game of Life to Pattern Generation](https://arxiv.org/abs/2506.04912) | 2025 | ALIFE | 最新 | NCA の知覚・更新を DLGN にし、推論時は完全な論理回路。GoL を完全学習、非同期更新・損傷に頑健。 | ✅ p.8 |
| 8 | [A Rotation-Invariant Embedded Platform for (Neural) Cellular Automata](https://arxiv.org/abs/2510.07440) | 2025 | ALIFE | 最新 | 電池駆動・向き自由に連結できる RP2350 セルと回転不変 NCA。形状の自己分類と蛍同期を実演。 | ✅ p.9 |
| 9 | [Self-Organising Digital Circuits](https://arxiv.org/abs/2608.02606) | 2026 | ALIFE | 最新 | 配線マスク付き Transformer の局所方策が LUT 回路を組立・修復。ソフトエラーから 99.99% 超回復。 | ✅ p.10 |
| 10 | [Asynchronicity in Neural Cellular Automata](https://doi.org/10.1162/isal_a_00461) | 2021 | ALIFE | 原典 | Niklasson・Mordvintsev・Randazzo による非同期更新 NCA の原典。DiffLogic CA・Woiwode+ が非同期学習の根拠として引用（検索・引用情報に基づく）。 | ⚠️ 本文未確認 |
| 11 | [Self-Organising Textures](https://doi.org/10.23915/distill.00027.003) | 2021 | Distill | 原典 | Texture NCA。5,856 パラメータで 8 ビット量子化に耐えると μNCA が引用（検索・引用情報に基づく）。 | ⚠️ 本文未確認 |
| 12 | [Growing Neural Cellular Automata](https://doi.org/10.23915/distill.00023) | 2020 | Distill | 原典 | NCA 全体の原典。確率的（非同期）セル更新とサンプルプールを導入。 | — 参照のみ（nca-world-models 側で扱う見込み） |
| 13 | [Physical Neural Cellular Automata for 2D Shape Classification](https://arxiv.org/abs/2203.07548) | 2022 | IROS | 原典 | Arduino Mega のタイル 20 枚で NCA を実機化。更新を半分落とす学習と非同期シミュレーションで、数字 0〜9 の形を全セルが合意。本文読了。 | — 参照のみ（learned-collective と重複回避） |
| 14 | [Smart Cellular Bricks for Decentralized Shape Classification and Damage Recovery](https://arxiv.org/abs/2509.18659) | 2025 | arXiv | 最新 | 約 200 個の立方体モジュールで 3D-NCA の形状分類・損傷回復。 | — 参照のみ（learned-collective 担当） |
| 15 | [Med-NCA: Robust and Lightweight Segmentation with Neural Cellular Automata](https://arxiv.org/abs/2302.03473) | 2023 | IPMI | 発展 | Raspberry Pi で動く医用セグメンテーション NCA。eNCApsulate の前身。 | — 参照のみ（医用応用寄り） |
| 16 | [Unsupervised Training of Neural Cellular Automata on Edge Devices](https://arxiv.org/abs/2407.18114) | 2024 | arXiv | 発展 | Med-NCA（26,432 パラメータ）を Android 端末 5 機種上で学習・微調整。分散重み付き損失で Dice +0.7〜2.8%。本文読了。 | — 参照のみ（医用応用寄り） |
| 17 | [Resource Utilization of Differentiable Logic Gate Networks Deployed on FPGAs](https://arxiv.org/abs/2605.04109) | 2026 | arXiv | 最新 | DLGN 390 モデルを Alveo U200 に合成。最終層を細くすると LUT 約 28% 減。本文読了。NCA を扱わないため。 | — 参照のみ |
| 18 | [Recurrent Deep Differentiable Logic Gate Networks](https://arxiv.org/abs/2508.06097) | 2025 | arXiv | 発展 | DLGN の再帰化（系列処理）。arXiv 一覧で確認のみ。 | — 参照のみ |
| 19 | [FINN: A Framework for Fast, Scalable Binarized Neural Network Inference](https://doi.org/10.1145/3020078.3021744) | 2017 | FPGA | 原典 | FPGA 上の BNN 推論。DiffLogic 系の比較基準。 | — 参照のみ |
| 20 | [Photonic elementary cellular automata for simulation of complex phenomena](https://arxiv.org/abs/2211.01811) | 2023 | Light: Science & Applications | 発展 | Photonic NCA の前段となる光学 ECA。 | — 参照のみ |
| 21 | [Reservoir Computing Hardware with Cellular Automata](https://arxiv.org/abs/1806.04932) | 2018 | arXiv | 原典 | CA を FPGA 上のリザバーとして使う研究。学習済み局所則ではないため。 | — 参照のみ |
| 22 | [A Path to Universal Neural Cellular Automata](https://arxiv.org/abs/2505.13058) | 2025 | GECCO Companion | 発展 | NCA の状態内で行列演算を模倣。SODC 著者 Béna の前作。 | — 参照のみ |
| 23 | Efficient Monocular Depth Estimation on Embedded Systems with Neural Cellular Automata（[DOI](https://doi.org/10.1007/s42979-026-05327-4)） | 2026 | SN Computer Science | 最新 | 組込み向け NCA 深度推定（Crossref の書誌のみ確認）。 | — 参照のみ（本文未取得） |
| 24 | Binary Image Classification on 2D Partitioned Linear Hybrid Cellular Automata on FPGA（[DOI](https://doi.org/10.1109/ijcnn69854.2026.11729336)） | 2026 | IJCNN | 最新 | FPGA 上の CA による 2 値画像分類（Crossref の書誌のみ確認）。 | — 参照のみ（本文未取得） |
| 25 | [Universality Frontier for Asynchronous Cellular Automata](https://arxiv.org/abs/2502.05989) | 2025 | MFCS | 発展 | 非同期 CA の計算普遍性の理論。arXiv 一覧で確認のみ。 | — 参照のみ |
| 26 | [CAX: Cellular Automata Accelerated in JAX](https://arxiv.org/abs/2410.02651) | 2024 | arXiv | 発展 | GPU/TPU 向け CA・NCA 実装ライブラリ。 | — 参照のみ |
| 27 | [Neural cellular automata: applications to biology and beyond classical AI](https://arxiv.org/abs/2509.11131) | 2025 | arXiv | — | NCA のサーベイ。 | — 参照のみ |
| 28 | [Applications of Neural Cellular Automata: State of the Art, Challenges and Opportunities](https://arxiv.org/abs/2609.24595) | 2026 | arXiv | — | NCA 応用のサーベイ（DiffLogic CA・SODC を引用）。 | — 参照のみ |
