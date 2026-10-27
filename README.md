# イベントベース視覚とニューロモルフィック・ロボティクス — 先行研究調査

イベントカメラと SNN・ニューロモルフィックチップでロボットの知覚・制御を行う研究について、イベントからの表現・世界モデル学習、完全ニューロモルフィック閉ループ、チップ上の局所学習の観点から系譜をまとめる。SNN 分野の応用編にあたる。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/`）は main ブランチから引き継いでいる。

## テーマ一覧

| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- | --- |
| 第1回 | [イベントベース世界モデルと表現学習](#event-world-models) | コントラスト最大化・EST・イベントビジョンのサーベイから、eVAE、Neuromorphic dreaming、Approximate IL、FLEET、ECHO まで | [pptx](event-world-models/event-world-models.pptx) / [pdf](event-world-models/event-world-models.pdf) | 10 本 | 29 本 | 2026-10-24 |
| 第1回 | [完全ニューロモルフィック閉ループ：センサ → SNN → アクチュエータ](#closed-loop) | Loihi 上の着陸・視覚制御から、完全ニューロモルフィック飛行、Speck 上の LENS、視覚のみの姿勢推定、羽ばたき機の SNN 制御まで | [pptx](closed-loop/closed-loop.pptx) / [pdf](closed-loop/closed-loop.pdf) | 10 本 | 48 本 | 2026-10-24 |
| 第1回 | [チップ上の局所学習による身体の適応](#on-chip-learning) | BrainScaleS-2 の R-STDP・DECOLLE から、SpiNNaker 2 上の e-prop、ReckOn、Loihi の継続学習、DYNAP-SE 上の強化学習、平衡伝播 PPO まで | [pptx](on-chip-learning/on-chip-learning.pptx) / [pdf](on-chip-learning/on-chip-learning.pdf) | 12 本 | 33 本 | 2026-10-24 |

合計：スライド化 32 本、引用論文一覧 110 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-24 | 第1回調査（分野新設）。main の候補分野メモ（candidates/）を出発点に、「イベントベース世界モデルと表現学習」、「完全ニューロモルフィック閉ループ：センサ → SNN → アクチュエータ」、「チップ上の局所学習による身体の適応」 の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版（OpenReview・学会予稿集・OA 誌・著者公開版など）で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典は ⚠️ 本文未確認として一覧に記載。 既存デッキ（他分野を含む）でスライド化済みの論文は再掲せず、一覧で `↪ 既存：<theme> p.N` として参照。同じ回の別テーマで同じ論文を別の観点からスライド化した例が一部ある。 |

## 追加調査を推奨するテーマ

これまでの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。

1. **イベントの模擬（シミュレータ）と sim-to-real、行動条件付きのイベント予測**  
   学習のボトルネックはイベントの描画コストで、イベント入力で行動条件付きに未来を予測する Dreamer/JEPA 型の世界モデルはまだ見当たらない。シミュレータと予測モデルの両面から追う。

2. **センサとチップの直結と I/O、ニューロモルフィックな状態推定**  
   知覚・推定・制御・航法をすべてチップ上で閉じた実機例はなく、共通の壁はスパイクの出し入れ（USB やホスト経由）だった。AER・FPGA ブリッジ・センサ一体型チップと、イベント VIO などの状態推定を合わせて調べる。

3. **完全オンチップの強化学習ループと、学習則のメタ学習**  
   チップ上で学習が完結するのは認識の最終層程度で、重み更新はホスト側に残ることが多い。環境・価値推定・探索までオンチップにした強化学習と、可塑性そのもののメタ学習を追う。

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は既存デッキ（他分野の場合は `<field>/<theme>`）でスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。

---

<a id="event-world-models"></a>

## イベントベース世界モデルと表現学習（event-world-models/）

資料：[event-world-models.pptx](event-world-models/event-world-models.pptx) ／ [event-world-models.pdf](event-world-models/event-world-models.pdf) ／ 生成元 [spec.json](event-world-models/spec.json) ／ [テーマ README](event-world-models/README.md)


### 調査履歴
- 2026-10-24: 第3回調査（新分野）。`candidates/neuromorphic-robotics.md` のテーマ案1を起点に、要約済みの FLEET・Approximate IL・Neuromorphic dreaming を改めて本文から読み直した。arXiv API と WebSearch で "event camera" ×（"world model"／"reinforcement learning"／"imitation learning"／"self-supervised"／"pretraining"／"forecasting"／"JEPA"）、"neuromorphic" × "world model" を新着順に検索した。2026年の最新（ECHO、GEP、FLEET、Approximate IL）から現在地を把握した。
- そこから3つの系譜を原典まで遡った。(a) 自己教師の系譜：コントラスト最大化 → 機上オンライン学習。(b) 表現の系譜：voxel grid／EST → 事前学習 → 自己回帰事前学習。(c) 制御用表現・世界モデルの系譜：eVAE → Approximate IL／FLEET → ECHO、およびチップ上の夢見学習。
- イベント入力の Dreamer 型・JEPA 型の世界モデルは、検索した範囲（arXiv API・WebSearch）では見つからなかった。最も近いのは、未来イベント潜在を予測する ECHO と、次の時間片を予測する GEP。
- 原典 DVS（Lichtsteiner+ 2008）は OpenAlex・Semantic Scholar で UZH 機関リポジトリ（ZORA）のグリーン OA 版を特定したが、この環境から ZORA に接続できず、本文未確認のまま。
- 同分野の closed-loop（Paredes-Vallés 2024、All Eyes no IMU など）と on-chip-learning（DYNAP-SE の Spiking RL など）の担当論文、他分野の既存デッキ（snn/neuromorphic-hardware の Retina・Speck など）はスライド化していない。

### 系譜
```
[センサと共通語彙]
DVS (Lichtsteiner+ 2008) ※本文未確認 ──→ Event-based Vision: A Survey (Gallego+ 2020)

[自己教師：予測（ワープ）誤差で運動を学ぶ]
CMax (Gallego+ 2018, コントラスト最大化)
   ├→ Zhu+ 2019 (voxel grid 入力＋動き補償損失で教師なしフロー/深度/自己運動)
   │     └→ Hagenaars+ 2021 (SNN の自己教師フロー) ※未調査
   └→ On-Device SSL Depth (Hagenaars+ 2025, ドローン機上で飛行中に深度を自己教師学習)

[イベント表現と事前学習]
Voxel grid (Zhu+ 2019) ─→ EST (Gehrig+ 2019, 微分可能な表現の統一と学習)
   └→ MEM (2022/2024, マスク再構成) / ECDP・ECDDP (対照) / TESPEC (2025, 長期系列の再構成)
          └→ GEP (Cao+ 2026, VFM 整合＋自己回帰で次の時間片を予測)

[制御のための表現・世界モデル]
eVAE (Vemprala+ 2021, 再構成で事前学習→PPO)
   ├→ Bhattacharya+ 2024 (深度を前段タスクに BC 事前学習→実データ微調整)
   │     └→ Approximate IL (Messikommer+ 2026, 表現学習と方策探索の分離・描画不要の微調整)
   ├→ FLEET (Gottwald+ 2026, 報酬のみで学ぶ系列トークン表現；再構成目的を批判)
   └→ ECHO (Wang+ 2026, DINOv3 特徴の変化を説明する潜在世界モデル事前学習＋未来イベント予測)

[チップ上の世界モデル]
Capone & Paolucci 2022 (SNN の夢見と計画) ─→ Neuromorphic dreaming (Blakowski+ 2025, DYNAP-SE)
   └→ Spiking RL on DYNAP-SE (Ambrosini+ 2026, 覚醒相のみ・夢見は今後) ※on-chip-learning 担当
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [A Unifying Contrast Maximization Framework for Event Cameras, with Applications to Motion, Depth, and Optical Flow Estimation](https://arxiv.org/abs/1804.01306) | 2018 | CVPR 2018 | 原典 | ワープ後イベント像のコントラスト最大化で、フロー・深度・回転を外観情報なしに推定する統一枠組み。自己教師学習の損失の源流。 | ✅ p.2 |
| 2 | [End-to-End Learning of Representations for Asynchronous Event-Based Data](https://arxiv.org/abs/1904.08245) | 2019 | ICCV 2019 | 原典 | イベント→格子表現を微分可能な演算列として統一し、カーネルを課題とともに学ぶ EST。N-Caltech101 0.817、フロー AEE 12% 改善。 | ✅ p.3 |
| 3 | [Event-based Vision: A Survey](https://arxiv.org/abs/1904.08405) | 2020 | IEEE TPAMI | 原典 | 原理・表現・手法・応用・ニューロモルフィック制御を網羅した標準サーベイ。 | ✅ p.4 |
| 4 | [Representation Learning for Event-based Visuomotor Policies](https://arxiv.org/abs/2103.00806) | 2021 | NeurIPS 2021 | 発展 | 生イベント列の event VAE で潜在を事前学習し、その上で PPO のドローン回避方策を学ぶ。 | ✅ p.5 |
| 5 | [Neuromorphic dreaming: A pathway to efficient learning in artificial agents](https://arxiv.org/abs/2405.15616) | 2025 | Neuromorphic Comput. Eng.（arXiv 2024） | 最新 | DYNAP-SE 上の方策 SNN と世界モデル SNN で覚醒・夢見を交互に学習。Pong で必要な実プレイが半分未満に。 | ✅ p.6 |
| 6 | [On-Device Self-Supervised Learning of Low-Latency Monocular Depth from Only Events](https://arxiv.org/abs/2412.06359) | 2025 | CVPR 2025 | 最新 | CMax 損失を CUDA で約100倍高速化し、ドローン機上で飛行中に深度をオンライン学習。介入間距離 約30%改善。 | ✅ p.7 |
| 7 | [Approximate Imitation Learning for Event-based Quadrotor Flight in Cluttered Environments](https://arxiv.org/abs/2603.07578) | 2026 | CoRL 2026 | 最新 | オフラインで課題特化表現を学び、状態入力の近似学生で描画なしに DAgger 微調整。学習時間 28 倍短縮、実機 9.8 m/s。 | ✅ p.8 |
| 8 | [Generative Event Pretraining with Foundation Model Alignment](https://arxiv.org/abs/2603.23032) | 2026 | CVPR 2026 Findings | 最新 | 凍結 DINOv2 への整合＋イベント・画像トークン列の自己回帰予測による事前学習。10 指標で従来法超え。 | ✅ p.9 |
| 9 | [FLEET: Token-Based Feature Extraction for Event Camera-based Reinforcement Learning](https://arxiv.org/abs/2608.16523) | 2026 | arXiv | 最新 | RFF＋Perceiver 型クロスアテンションでイベント列を潜在トークン化し、報酬のみで学ぶ RL 特徴抽出器。 | ✅ p.10 |
| 10 | [ECHO: Event-Augmented Context with Hindsight and Outlook for Wrist-Only Manipulation](https://arxiv.org/abs/2609.34893) | 2026 | arXiv | 最新 | 手首イベントで過去（軌跡メモリ）・現在・未来（foresight 予測）を方策に与える潜在世界行動モデル。RLBench 69.3%。 | ✅ p.11 |
| 11 | [A 128×128 120 dB 15 µs Latency Asynchronous Temporal Contrast Vision Sensor](https://doi.org/10.1109/JSSC.2007.914337) | 2008 | IEEE JSSC | 原典 | 現在の DVS 型イベントカメラの原型（検索情報とサーベイの記述に基づく）。グリーン OA 版（ZORA: https://www.zora.uzh.ch/id/eprint/17629/ ）はあるが、この環境から到達できず。 | ⚠️ 本文未確認 |
| 12 | [Unsupervised Event-based Learning of Optical Flow, Depth, and Egomotion](https://arxiv.org/abs/1812.08156) | 2019 | CVPR 2019 | 発展 | 時間を保つ voxel grid 入力と動き補償（ぼけ）損失による教師なし学習。EST・サーベイ・Hagenaars 2025 の中で参照。アブストラクトのみ確認。 | — 参照のみ（CMax→機上学習の中間。スライド数の都合） |
| 13 | [Masked Event Modeling: Self-Supervised Pretraining for Event Cameras](https://arxiv.org/abs/2212.10368) | 2022 | WACV 2024 | 発展 | MAE 型のマスク再構成によるイベント事前学習。GEP の比較対象。アブストラクトのみ確認。 | — 参照のみ（GEP で代表） |
| 14 | [TESPEC: Temporally-Enhanced Self-Supervised Pretraining for Event Cameras](https://arxiv.org/abs/2508.00913) | 2025 | ICCV 2025 | 発展 | 長いイベント系列から擬似グレー動画を再構成させる、再帰モデル向け事前学習。アブストラクトのみ確認。 | — 参照のみ（GEP で代表） |
| 15 | [E-Motion: Future Motion Simulation via Event Sequence Diffusion](https://arxiv.org/abs/2410.08649) | 2024 | NeurIPS 2024 | 発展 | 動画拡散モデルをイベント系列に適応させ、未来の動きを生成する。生成型の「イベント世界モデル」に近いが、行動条件はない。アブストラクトのみ確認。 | — 参照のみ（制御と非接続） |
| 16 | [Monocular Event-Based Vision for Obstacle Avoidance with a Quadrotor](https://arxiv.org/abs/2411.03303) | 2024 | CoRL 2024 | 発展 | 深度予測を前段タスクに模擬イベントで方策を事前学習し、実データで微調整。Approximate IL の直接の先行研究。アブストラクトのみ確認。 | — 参照のみ（Approximate IL で代表） |
| 17 | ECDP / ECDDP（イベントと RGB の対照事前学習、GEP の比較対象） | 2023–2024 | — | 発展 | イベントと RGB の対照学習による事前学習。GEP の Table 1〜3 の数値のみ確認（本文・採録先は未確認）。 | — 参照のみ |
| 18 | [OctoSense: Self-Supervised Learning for Multimodal Robot Perception](https://arxiv.org/abs/2606.27317) | 2026 | arXiv | 最新 | イベントを含む多モーダルのロボットデータで late-fusion MAE を学ぶ。アブストラクトのみ確認。 | — 参照のみ（制御・予測の評価なし） |
| 19 | [REALM: An RGB- and Event-Aligned Latent Manifold for Cross-Modal Perception](https://arxiv.org/abs/2605.00271) | 2026 | ECCV 2026 | 最新 | イベントを凍結 RGB 基盤モデルの潜在へ LoRA で写像する。アブストラクトのみ確認。 | — 参照のみ（知覚のみ） |
| 20 | [Bend the Clock: Predicting Ahead to Beat Latency in Event-Based Object Detection](https://arxiv.org/abs/2609.26919) | 2026 | arXiv | 最新 | 推論遅延の分だけ先の物体状態を予測する検出器 ChronoFuse。「予測で遅延を補う」観点。アブストラクトのみ確認。 | — 参照のみ（検出課題） |
| 21 | [Residual Kalman Dynamics for Event-Based UAV Forecasting](https://arxiv.org/abs/2609.00839) | 2026 | ECCV 2026 WS | 最新 | イベントによる UAV 軌道予測。検索で確認したタイトルのみ。 | — 参照のみ |
| 22 | [Towards biologically plausible Dreaming and Planning in recurrent spiking networks](https://arxiv.org/abs/2205.10044) | 2022 | arXiv | 原典 | SNN の世界モデルによる夢見・計画の提案。Neuromorphic dreaming の手法の出典。検索で確認したタイトルのみ。 | — 参照のみ（シミュレーションの SNN） |
| 23 | [Training slow silicon neurons to control extremely fast robots with spiking reinforcement learning](https://arxiv.org/abs/2601.21548) | 2026 | arXiv | 最新 | DYNAP-SE を制御ループに入れたエアホッケーの Spiking RL。夢見は今後の課題とする。 | — 参照のみ（同分野 on-chip-learning 担当） |
| 24 | [Fully neuromorphic vision and control for autonomous drone flight](https://arxiv.org/abs/2303.08778) | 2024 | Science Robotics | 発展 | イベント→SNN（Loihi）→制御の完全ニューロモルフィック飛行。 | — 参照のみ（同分野 closed-loop 担当） |
| 25 | [CERiL: Continuous Event-based Reinforcement Learning](https://arxiv.org/abs/2302.07667) | 2023 | arXiv | 発展 | 標準 RL 環境を模擬イベント出力に改変して評価。FLEET の関連研究。検索で確認したタイトルのみ。 | — 参照のみ |
| 26 | [A solution to the learning dilemma for recurrent networks of spiking neurons](https://doi.org/10.1038/s41467-020-17236-y) | 2020 | Nat. Commun. | 原典 | Neuromorphic dreaming の局所学習則の出典。 | ↪ 既存：snn/training p.7 |
| 27 | [Learning Latent Dynamics for Planning from Pixels](https://arxiv.org/abs/1811.04551) | 2019 | ICML 2019 | 原典 | 画素からの潜在ダイナミクス世界モデル。イベント入力の世界モデルの比較軸として参照。 | ↪ 既存：world-model/latent-planning p.3 |
| 28 | [V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://arxiv.org/abs/2506.09985) | 2025 | arXiv | 最新 | 表現空間で予測する JEPA 型世界モデル。GEP・ECHO の「潜在予測」の比較軸。 | ↪ 既存：world-model/jepa p.6 |
| 29 | [What Makes Video World Model Latents Action-Relevant: Prediction over Reconstruction](https://arxiv.org/abs/2606.07687) | 2026 | arXiv | 最新 | 再構成ではなく予測が行動情報を持つ表現を生むという比較。FLEET の再構成批判と同じ論点。 | ↪ 既存：world-model/jepa p.11 |

---

<a id="closed-loop"></a>

## 完全ニューロモルフィック閉ループ：センサ → SNN → アクチュエータ（closed-loop/）

資料：[closed-loop.pptx](closed-loop/closed-loop.pptx) ／ [closed-loop.pdf](closed-loop/closed-loop.pdf) ／ 生成元 [spec.json](closed-loop/spec.json) ／ [テーマ README](closed-loop/README.md)


### 調査履歴
- 2026-10-24: 候補メモ（candidates/neuromorphic-robotics.md）の Paredes-Vallés+ 2024・Stroobants+ 2025・All Eyes, no IMU・羽ばたき SNN・Loihi 上の MAV 航法を起点にした。arXiv API で「neuromorphic/spiking × drone/quadrotor/robot/manipulator」「Loihi/Speck/DYNAP/SpiNNaker × control」を 2024〜2026 の新しい順に検索し、最新動向を把握した。
- 系譜は2本たどった。(a) TU Delft MAVLab の系譜（Loihi 着陸制御 2021 → 完全ニューロモルフィック飛行 2024 → SNN 姿勢ループ 2025 → IMU なし飛行 2026、羽ばたき機 2026 はその派生）。(b) Intel/fortiss の「センサ直結・オンチップ知覚」の系譜（Vitale+ 2021 → Loihi 2 多部品パイプライン 2026）。これに東北大学（瀋陽）の Loihi 非同期回避 2025 → MAV 航法 2026 と、単一チップ知覚の LENS（Speck）を加えた。
- 各論文で「チップに載った部分（知覚・推定・制御・航法）」と「チップ外に残った部分（I/O・ホスト・無線・IMU/VIO）」を読み分けた（下の整理表）。原典側の SNN PID（Stagsted+ 2020, RSS）と、PPO で学習したスパイキング・クアッドロータ制御（van Breukelen Castillo+ 2025, IMAV）は、出版社サイトや TU Delft リポジトリに届かず本文未確認。
- 同じ分野の event-world-models（イベント表現・世界モデル）と on-chip-learning（チップ上の局所学習）とは担当を分けた。Hagenaars+ CVPR 2025（オンデバイス深度学習）とイベントビジョン・サーベイは event-world-models のスライドを参照（↪ 既存）とし、DYNAP-SE エアホッケー、平衡伝播による四足、CLANE、All On-Board Q-learning は参照のみ。SNN 分野の既存デッキ（Speck・IMX636+Loihi 2 転倒検知・SEW-ResNet）は再掲していない。

### 系譜
```
[TU Delft MAVLab：飛行ロボットの SNN 化]
Evolved landing SNN (Hagenaars+ 2020, 参照)
  → Loihi 着陸制御 (Dupeyroux+ 2021)          … 制御のみオンチップ（35ニューロン）
     ├→ Loihi 姿勢推定 (Stroobants+ 2022, 参照) / Loihi 高度 PID (Stroobants+ 2021, 参照)
     └→ 完全ニューロモルフィック飛行 (Paredes-Vallés+ 2024)  … 視覚＋制御を1つの SNN に（姿勢は IMU・PX4）
          ├→ SNN 姿勢推定・制御 (Stroobants+ 2025)  … IMU→モータ指令を SNN で（MCU 上）
          │     ├→ All Eyes, no IMU (Hagenaars+ 2026)  … IMU を外して視覚のみで姿勢（ANN、GPU 上）
          │     └→ SNN 羽ばたき機制御 (El Filali+ 2026) … 26 g 機・ESP32 上のイベント駆動 SNN
          └→ SNN×PPO 高速クアッドロータ (van Breukelen Castillo+ 2025, ⚠️)

[Intel / fortiss：センサ直結とオンチップ部品統合]
SNN PID on Loihi (Stagsted+ 2020, ⚠️)
  → Loihi 上の視覚＋制御 (Vitale+ 2021)        … DVS を AER 直結、Hough 変換 SNN・可塑性で適応
     ├→ Neuromorphic force-control (Amaya+ 2024, 参照) … KUKA 挿入を Loihi で
     └→ The More the Merrier (Eames+ 2026)    … Loihi 2 上で 6 部品を NSM で統合（実機とは未接続）
  （単一チップ知覚）Speck (Yao+ 2024, 既存) → LENS on Speck (Hines+ 2025)

[東北大学（瀋陽）：Loihi の非同期処理から航法へ]
完全ニューロモルフィック飛行 (2024)
  → Loihi 非同期回避 (Jiang+ 2025)            … イベントを1個ずつ Loihi に注入、地上ロボットで回避
  → ニューロモルフィック MAV 航法 (Jiang+ 2026) … 航法 SNN は Loihi、知覚は Jetson、無線経由
```

### 整理：どこまでオンチップ化できたか／何が残るか
| 論文 | センサ | 知覚・推定 | 制御・航法 | 実行HW | チップ外に残る主な部分 |
| --- | --- | --- | --- | --- | --- |
| Dupeyroux+ 2021 | CMOS（発散を CPU で推定） | CPU | 推力 SNN（Loihi） | Kapoho Bay | 視覚処理・水平位置（モーキャプ）・符号化 |
| Vitale+ 2021 | DVS（AER 直結） | Hough SNN（Loihi） | PD は CPU／適応 SNN は別実験 | Kapoho Bay | 知覚と制御の同時オンチップは未実現、1自由度リグ |
| Paredes-Vallés+ 2024 | DAVIS240C（USB→ホスト） | フロー SNN（Loihi） | 線形デコーダ（ホスト） | Kapoho Bay | I/O 帯域、姿勢は IMU、低レベル制御は PX4 |
| Jiang+ 2025 | DAVIS346 | 回避 SNN（Loihi） | 復号・指令はホスト | Kapoho Bay | イベント間引き・アドレス変換はホスト |
| Stroobants+ 2025 | IMU | SNN（MCU） | SNN（MCU） | Teensy 4.0 | ニューロモルフィックHW 未使用、位置はモーキャプ |
| LENS 2025 | DVS（チップ内蔵） | VPR SNN（Speck） | 制御には未接続 | Speck | シーケンス照合（Jetson）、コア当たり 64 KB |
| All Eyes 2026 | イベントカメラ | ConvGRU ANN（GPU） | 通常のカスケード制御 | Orin NX | SNN 化・チップ化は未実施 |
| Eames+ 2026 | DVS（縮小 80×80） | DNF・分類 SNN（Loihi 2） | NSM・サーボ SNN（Loihi 2） | Loihi 2（クラウド） | 実機は模擬 LAVA＋Loihi 1、I/O で解像度制限 |
| El Filali+ 2026 | IMU | SNN（MCU） | SNN＋CPG（MCU） | ESP32-S3 | ニューロモルフィックHW 未使用 |
| Jiang+ 2026 | EVK4 | 深度・特徴 SNN（Jetson 上で模擬） | 航法 SNN（Loihi） | Jetson＋ホスト＋Kapoho Bay | 無線経由、姿勢は T265、知覚電力は推定値 |

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Neuromorphic control for optic-flow-based landings of MAVs using the Loihi processor](https://arxiv.org/abs/2011.00534) | 2021 | ICRA 2021 | 原典 | 進化させた35ニューロンの SNN を Loihi に載せ、オプティカルフロー発散から推力を出してクアッドロータを着陸。飛行ロボットに Loihi を搭載した初の例 | ✅ p.2 |
| 2 | [Event-driven Vision and Control for UAVs on a Neuromorphic Chip](https://arxiv.org/abs/2108.03694) | 2021 | ICRA 2021 | 原典 | DVS を AER で Loihi に直結し、Hough 変換 SNN で 20 kHz の水平線推定。可塑性で外乱に適応する SNN PD も示した | ✅ p.3 |
| 3 | [Fully neuromorphic vision and control for autonomous drone flight](https://arxiv.org/abs/2303.08778) | 2024 | Science Robotics | 発展 | 生イベント→自己運動→制御を1つの SNN にして Loihi 上で自由飛行。200 Hz・27 µJ/推論 | ✅ p.4 |
| 4 | [Fully Asynchronous Neuromorphic Perception for Mobile Robot Dodging with Loihi Chips](https://arxiv.org/abs/2410.10601) | 2025 | IEEE T-ASE | 発展 | イベントを1個ずつ Loihi に注入する非同期処理で地上ロボットの回避。EF-SNN 比98.4%の省エネ | ✅ p.5 |
| 5 | [Neuromorphic Attitude Estimation and Control](https://arxiv.org/abs/2411.13945) | 2025 | IEEE RA-L | 発展 | IMU→モータ指令を推定・制御を合成した SNN で行い、Crazyflie を 500 Hz で飛行。追従誤差 3.0° | ✅ p.6 |
| 6 | [A compact neuromorphic system for ultra-energy-efficient, on-device robot localization](https://arxiv.org/abs/2408.16754) | 2025 | Science Robotics | 最新 | DVS 内蔵の Speck 上で VPR を行い六脚ロボットに搭載。2.7 mW、Jetson 比8.9%のエネルギー | ✅ p.7 |
| 7 | [All Eyes, no IMU: Learning Flight Attitude from Vision Alone](https://arxiv.org/abs/2507.11302) | 2026 | npj Robotics | 最新 | 下向きイベントカメラだけで姿勢・角速度を推定し、IMU なしで飛行制御。RMSE 1.51°・10.65°/s | ✅ p.8 |
| 8 | [The More the Merrier: Running Multiple Neuromorphic Components On-Chip for Robotic Control](https://arxiv.org/abs/2602.13747) | 2026 | Neuromorphic Computing and Engineering | 最新 | DNF・分類・視覚サーボ・神経状態機械の6部品を Loihi 2 上で同時実行。プラグ挿入の実機では部品単位の検証 | ✅ p.9 |
| 9 | [Spiking Neural Network Control of a Flapping-Wing Robot on Resource-Constrained Hardware](https://arxiv.org/abs/2605.19430) | 2026 | arXiv プレプリント | 最新 | 26 g の羽ばたき機を ESP32 上の推定・制御 SNN＋CPG で自由飛行。遅延36%・推論電力18%減 | ✅ p.10 |
| 10 | [Towards bio-inspired visual navigation: a neuromorphic navigation paradigm for MAVs](https://arxiv.org/abs/2610.21978) | 2026 | arXiv プレプリント | 最新 | イベント→スパイキング深度・特徴→Loihi 上の航法 SNN で目標指向の MAV 航法。実機は屋内7/10・屋外9/10 | ✅ p.11 |
| 11 | [Towards neuromorphic control: A spiking neural network based PID controller for UAV](https://doi.org/10.15607/RSS.2020.XVI.074) | 2020 | RSS 2020 | 原典 | Loihi 上の SNN PID で1自由度 UAV のロールを制御した最初期のニューロモルフィック制御（Dupeyroux+ 2021・Vitale+ 2021 の記述に基づく） | ⚠️ 本文未確認 |
| 12 | [Spiking neural networks for high-speed continuous quadcopter control using proximal policy optimization](https://www.imavs.org/papers/2025/17.pdf) | 2025 | IMAV 2025 | 最新 | 完全スパイキングの actor-critic を PPO で学習し、ゲート通過の高速クアッドロータ制御をシミュレーションと実飛行で ANN と比較（検索結果と El Filali+ 2026 の引用に基づく） | ⚠️ 本文未確認 |
| 13 | [A 128×128 120 dB 15 µs Latency Asynchronous Temporal Contrast Vision Sensor](https://doi.org/10.1109/JSSC.2007.914337) | 2008 | IEEE JSSC | 原典 | DVS 型イベントカメラの原型（候補メモと LENS の引用に基づく） | ⚠️ 本文未確認 |
| 14 | [Neuromorphic computing for attitude estimation onboard quadrotors](https://arxiv.org/abs/2304.08802) | 2022 | Neuromorphic Computing and Engineering | 発展 | 150ニューロンの SNN で IMU からピッチ・ロールを推定し、機上の Loihi で飛行中に動作（アブストラクトのみ。後継の Stroobants+ 2025 をスライド化） | — 参照のみ |
| 15 | [Design and implementation of a parsimonious neuromorphic PID for onboard altitude control for MAVs using neuromorphic processors](https://arxiv.org/abs/2109.10199) | 2021 | 会議論文 | 発展 | 93ニューロンの SNN PID で Loihi 搭載クアッドロータの高度制御（アブストラクトのみ） | — 参照のみ |
| 16 | [Evolved Neuromorphic Control for High Speed Divergence-based Landings of MAVs](https://arxiv.org/abs/2003.03118) | 2020 | IEEE RA-L | 原典 | Dupeyroux+ 2021 の前段。発散に基づく着陸 SNN を進化で獲得（タイトル・書誌のみ確認） | — 参照のみ |
| 17 | [Self-Supervised Learning of Event-Based Optical Flow with Spiking Neural Networks](https://arxiv.org/abs/2106.01862) | 2021 | NeurIPS 2021 | 発展 | Paredes-Vallés+ 2024 の視覚部が用いたコントラスト最大化（CMax、既存：event-world-models p.2）による SNN フロー学習（書誌のみ。表現学習は event-world-models の範囲） | — 参照のみ |
| 18 | [Towards Low-Latency High-Bandwidth Control of Quadrotors using Event Cameras](https://arxiv.org/abs/1911.04553) | 2020 | ICRA 2020 | 原典 | Vitale+ 2021 が比較した、CPU 上のイベント Hough による拘束リグの高速制御（書誌のみ） | — 参照のみ |
| 19 | [Neuromorphic force-control in an industrial task: validating energy and latency benefits](https://arxiv.org/abs/2403.08928) | 2024 | IROS 2024 | 発展 | RL で学習した力覚 SNN を Loihi に載せ KUKA の挿入を実行。Eames+ 2026 の挿入部の原型（アブストラクトのみ） | — 参照のみ |
| 20 | [Autonomous Reinforcement Learning Robot Control with Intel's Loihi 2 Neuromorphic Hardware](https://arxiv.org/abs/2512.03911) | 2025 | arXiv（NICE 2026 投稿） | 最新 | ANN 方策を Sigma-Delta SNN に変換し Loihi 2 で Astrobee を閉ループ制御。ただし相手は Isaac Lab のシミュレーション（アブストラクトのみ） | — 参照のみ |
| 21 | [Embodied Neuromorphic Control Applied on a 7-DOF Robotic Manipulator](https://arxiv.org/abs/2504.12702) | 2025 | arXiv プレプリント | 最新 | SNN による 7 自由度アームの逆動力学学習。トルク予測誤差を60%以上削減（アブストラクトのみ、チップ実装の有無は未確認） | — 参照のみ |
| 22 | [A Neuromorphic Approach to Obstacle Avoidance in Robot Manipulation](https://arxiv.org/abs/2404.05858) | 2024 | IJRR | 発展 | 疑似イベント＋畳み込み SNN で Kinova アームの反応的回避。チップは未使用（アブストラクトのみ） | — 参照のみ |
| 23 | [A Spiking Neural Architecture for Coordinating Arm and Locomotor Control](https://arxiv.org/abs/2606.11034) | 2026 | arXiv プレプリント | 最新 | NEF/SPA と基底核モデルで人型の腕・二足歩行を統合したスパイキング制御。シミュレーションのみ（アブストラクトのみ） | — 参照のみ |
| 24 | [Dynamic neural manifolds for flexible closed-loop control on neuromorphic hardware](https://arxiv.org/abs/2607.07373) | 2026 | arXiv プレプリント | 最新 | SpiNNaker 2 上の動的多様体ネットで迷路ロボット（シミュレーション）を閉ループ制御（アブストラクトのみ） | — 参照のみ |
| 25 | [Adaptive Surrogate Gradients for Sequential Reinforcement Learning in Spiking Neural Networks](https://arxiv.org/abs/2510.24461) | 2025 | arXiv プレプリント | 最新 | 代理勾配の傾き設計と特権方策による誘導で SNN 方策を RL 学習し、実ドローンの位置制御に適用（アブストラクトのみ） | — 参照のみ |
| 26 | [S2Act: Simple Spiking Actor](https://arxiv.org/abs/2603.15725) | 2026 | arXiv プレプリント | 最新 | ReLU 近似の発火率 LIF で学習した方策を Loihi に載せ、TurtleBot の多エージェント課題で実機動作（アブストラクトのみ） | — 参照のみ |
| 27 | [ES-Parkour: Advanced Robot Parkour with Bio-inspired Event Camera and Spiking Neural Network](https://arxiv.org/abs/2503.09985) | 2025 | arXiv プレプリント | 最新 | イベントカメラ＋SNN の四足パルクール。シミュレーションのみで実機・チップ検証なし（候補メモの確認に基づく） | — 参照のみ |
| 28 | [Detection of Fast-Moving Objects with Neuromorphic Hardware](https://arxiv.org/abs/2403.10677) | 2024 | arXiv プレプリント | 発展 | 3種のニューロモルフィックHW でイベント物体検出をベンチマークし、卓球ロボットで実時間動作（アブストラクトのみ） | — 参照のみ |
| 29 | [Heterogeneous computing platform for real-time robotics](https://arxiv.org/abs/2601.09755) | 2026 | arXiv プレプリント | 最新 | Loihi 2＋イベントカメラの知覚と GPU の言語・計画を組み合わせ、人型ロボットが楽器を演奏（アブストラクトのみ） | — 参照のみ |
| 30 | [From Vision to Decision: Neuromorphic Control for Autonomous Navigation and Tracking](https://arxiv.org/abs/2602.05683) | 2026 | arXiv プレプリント | 最新 | 意見ダイナミクス型の神経集団で画素から運動指令へ。クアッドロータ実機で検証、チップ・SNN 学習は対象外（アブストラクトのみ） | — 参照のみ |
| 31 | [CarSNN: An Efficient Spiking Neural Network for Event-Based Autonomous Cars on the Loihi Neuromorphic Research Processor](https://arxiv.org/abs/2107.00401) | 2021 | IJCNN 2021 | 発展 | イベントのフレームを Loihi 上の SNN で車両認識。Jiang+ 2025 が比較したフレーム型の例（書誌のみ） | — 参照のみ |
| 32 | [Reinforcement co-Learning of Deep and Spiking Neural Networks for Energy-Efficient Mapless Navigation with Neuromorphic Hardware](https://arxiv.org/abs/2003.01157) | 2020 | arXiv プレプリント | 原典 | Loihi 上のスパイキング方策で TurtleBot の地図なし航法、Jetson TX2 比75倍の省エネ（Dupeyroux+ 2021 の記述に基づく） | — 参照のみ |
| 33 | [Real-Time Neuromorphic Navigation: Integrating Event-Based Vision and Physics-Driven Planning on a Parrot Bebop2 Quadrotor](https://arxiv.org/abs/2407.00931) | 2024 | arXiv プレプリント | 発展 | イベント視覚と物理ベース計画を組み合わせた Bebop2 の航法（書誌のみ） | — 参照のみ |
| 34 | [Spiking Neural Network Actor-Critic Proximal Policy Optimization Control for Autonomous UAV Navigation Through Constrained Openings in Civil Infrastructure and Buildings](https://arxiv.org/abs/2609.23643) | 2026 | arXiv プレプリント | 最新 | SNN の actor-critic PPO で窓通過の UAV 航法。シミュレーションのみ（アブストラクトのみ） | — 参照のみ |
| 35 | [VPRTempo: A Fast Temporally Encoded Spiking Neural Network for Visual Place Recognition](https://arxiv.org/abs/2309.10225) | 2024 | ICRA 2024 | 発展 | LENS の学習則の元になった TTFS 符号の VPR 用 SNN（書誌のみ） | — 参照のみ |
| 36 | [Removing the Compute Bottleneck for Event-based Visual Place Recognition with Spiking Neural Networks](https://arxiv.org/abs/2610.16022) | 2026 | arXiv プレプリント | 最新 | イベント VPR の SNN 計算ボトルネック解消（タイトルのみ確認） | — 参照のみ |
| 37 | [Monocular Event-Based Vision for Obstacle Avoidance with a Quadrotor](https://arxiv.org/abs/2411.03303) | 2024 | CoRL 2024 | 発展 | Jiang+ 2026 が深度教師データの収集法を借りた、イベントカメラによるクアッドロータ障害物回避（書誌のみ） | — 参照のみ |
| 38 | [Accommodating unobservability to control flight attitude with optic flow](https://doi.org/10.1038/s41586-022-05182-2) | 2022 | Nature | 原典 | オプティカルフロー＋運動モデルで姿勢が可観測になることを示し、All Eyes, no IMU の理論的根拠になった（引用からの概要） | — 参照のみ |
| 39 | [Event-based Vision: A Survey](https://arxiv.org/abs/1904.08405) | 2020 | IEEE TPAMI | 原典 | イベントカメラの標準サーベイ | ↪ 既存：event-world-models p.4 |
| 40 | [On-Device Self-Supervised Learning of Low-Latency Monocular Depth from Only Events](https://arxiv.org/abs/2412.06359) | 2025 | CVPR 2025 | 最新 | 小型ドローン上でイベント深度をオンライン学習し回避を改善。本テーマの閉ループ観点では深度推定のオンボード学習が該当 | ↪ 既存：event-world-models p.7 |
| 41 | [Training slow silicon neurons to control extremely fast robots with spiking reinforcement learning](https://arxiv.org/abs/2601.21548) | 2026 | arXiv プレプリント | 最新 | DYNAP-SE を制御ループに入れたエアホッケーの e-prop 型 RL（on-chip-learning 担当のため参照のみ） | — 参照のみ |
| 42 | [Neuromorphic Reinforcement Learning for Quadruped Locomotion Control on Uneven Terrain](https://arxiv.org/abs/2605.09595) | 2026 | arXiv プレプリント | 最新 | 平衡伝播で PPO を行う四足歩行（on-chip-learning 担当のため参照のみ） | — 参照のみ |
| 43 | [All On-Board: Fully On-Chip Neuromorphic Q-Learning with Embedded CartPole Simulation](https://arxiv.org/abs/2609.32317) | 2026 | arXiv プレプリント | 最新 | 環境シミュレーションまで Loihi 2 上に載せた完全オンチップ Q 学習（on-chip-learning 担当のため参照のみ） | — 参照のみ |
| 44 | [CLANE: Continual Learning of Actions on Neuromorphic Hardware from Event Cameras](https://arxiv.org/abs/2605.28387) | 2026 | arXiv プレプリント | 最新 | Loihi 2 上でイベントカメラの行動認識を継続学習（on-chip-learning 担当のため参照のみ） | — 参照のみ |
| 45 | [Spike-based dynamic computing with asynchronous sensing-computing neuromorphic chip (Speck)](https://doi.org/10.1038/s41467-024-47811-6) | 2024 | Nature Communications | 発展 | DVS とSNN プロセッサを統合した Speck。LENS の実行基盤 | ↪ 既存：snn/neuromorphic-hardware p.7 |
| 46 | [Privacy-preserving fall detection at the edge using Sony IMX636 event-based vision sensor and Intel Loihi 2 neuromorphic processor](https://arxiv.org/abs/2511.22554) | 2026 | IEEE NICE 2026 | 最新 | HD イベントセンサを FPGA 経由で Loihi 2 に直結。本テーマの「I/O の壁」への別解 | ↪ 既存：snn/neuromorphic-hardware p.12 |
| 47 | [Deep Residual Learning in Spiking Neural Networks (SEW-ResNet)](https://arxiv.org/abs/2102.04159) | 2021 | NeurIPS 2021 | 原典 | Jiang+ 2026 の特徴抽出に使われたスパイキング ResNet | ↪ 既存：snn/spiking-transformer p.2 |
| 48 | [Real-Time Frame- and Event-based Object Detection with Spiking Neural Networks on Edge Neuromorphic Hardware](https://arxiv.org/abs/2605.00146) | 2026 | arXiv プレプリント | 最新 | Loihi 2 と Jetson の実測比較。チップ上推論の電力評価の参考 | ↪ 既存：snn/energy-evaluation p.11 |

---

<a id="on-chip-learning"></a>

## チップ上の局所学習による身体の適応（on-chip-learning/）

資料：[on-chip-learning.pptx](on-chip-learning/on-chip-learning.pptx) ／ [on-chip-learning.pdf](on-chip-learning/on-chip-learning.pdf) ／ 生成元 [spec.json](on-chip-learning/spec.json) ／ [テーマ README](on-chip-learning/README.md)


### 調査履歴
- 2026-10-24: `candidates/neuromorphic-robotics.md` のテーマ案 3 を起点に、DYNAP-SE のスパイキング RL（Ambrosini+ 2026）、平衡伝播 PPO の四足歩行（Han & Sengupta 2026）、DELL（2026）、CLANE（2026）から入った。arXiv API と WebSearch で "on-chip learning"、"three-factor"、"e-prop SpiNNaker"、"Loihi continual learning"、"equilibrium propagation reinforcement" などを検索し、系譜を 3 本たどった。
  - 三因子則による RL・適応制御：BrainScaleS-2 の R-STDP（2019）と ROLLS の適応モータ制御（2019）→ SMA（2023）→ DYNAP-SE RL・EP-PPO（2026）。
  - BPTT を近似する局所勾配則：DECOLLE（2020）と e-prop（既存デッキ）→ Loihi への SG 三因子則の写像（2020）、SpiNNaker 2 の e-prop、ReckOn（2022）→ DELL（2026）。
  - Loihi 2 学習エンジン上の継続学習：Stewart+（2020）→ CLP-SNN（2025）→ CLANE（2026）。
- E-prop on SpiNNaker 2 は arXiv 版がないため、Frontiers の OA 版 PDF で全文を読んだ。Loihi 原論文（Davies+ 2018, IEEE Micro）は OpenAlex で OA 版がないことを確認し、本文未確認とした。
- 同分野の event-world-models（Neuromorphic dreaming、On-Device SSL Depth）、closed-loop（The More the Merrier）、他分野 snn/training（e-prop）と snn/neuromorphic-hardware（SpiNNaker2 chip）でスライド化済みの論文は再掲せず参照にした。

### 系譜
```
[三因子則で RL・適応制御]
 R-STDP on BrainScaleS-2 (Wunderlich+ 2019) ─┐
 ROLLS 適応モータ制御 (Glatz+ 2019) ──────────┼→ SMA: メタ学習した三因子則で四足適応 (2023)
                                              │        └→ EP-PPO 四足歩行 (Han & Sengupta 2026)
                                              └→ DYNAP-SE エアホッケー RL (Ambrosini+ 2026)
                                                    ↑ Neuromorphic dreaming (↪ event-world-models)

[BPTT を近似する局所勾配則]
 e-prop (Bellec+ 2020, ↪ snn/training) ─┬→ E-prop on SpiNNaker 2 (Rostami+ 2022)
                                        ├→ ReckOn チップ (Frenkel & Indiveri 2022)
                                        └→ (読出しの e-prop 型 RL) Ambrosini+ 2026
 DECOLLE: 層ごと局所損失 (Kaiser+ 2020) ─┬→ Loihi few-shot SG 三因子則 (Stewart+ 2020)
                                        └→ DELL: 密予測のブロック局所学習 (Vaillant+ 2026)

[Loihi 学習エンジン上の継続学習]
 Loihi (Davies+ 2018, ⚠️本文未確認) → Stewart+ 2020 → CLP-SNN on Loihi 2 (2025) → CLANE (2026)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Demonstrating Advantages of Neuromorphic Computation: A Pilot Study](https://arxiv.org/abs/1811.03618) | 2019 | Frontiers in Neuroscience | 原典 | BrainScaleS-2 試作チップ上で R-STDP による Pong 追従学習を環境ごとチップ内で実行。CPU の NEST 比で 1 桁以上速く 3 桁省エネで、学習が固定パターンノイズを補償する。 | ✅ p.2 |
| 2 | [Adaptive motor control and learning in a spiking neural network realised on a mixed-signal neuromorphic processor](https://arxiv.org/abs/1810.10801) | 2019 | ICRA | 原典 | 混合信号チップ ROLLS 上のスパイキング PI 制御器が車輪速度を合わせ、収束時にオンチップ可塑性で前向き指令を学習する。 | ✅ p.3 |
| 3 | [Synaptic Plasticity Dynamics for Deep Continuous Local Learning (DECOLLE)](https://arxiv.org/abs/1811.10766) | 2020 | Frontiers in Neuroscience | 原典 | 層ごとの固定ランダム読出しと局所損失による三因子則。メモリ O(N) で DvsGesture 誤差 4.46%。 | ✅ p.4 |
| 4 | [On-chip Few-shot Learning with Surrogate Gradient Descent on a Neuromorphic Processor](https://arxiv.org/abs/1910.04972) | 2020 | AICAS | 発展 | 代理勾配の三因子則を Loihi の学習エンジンに写像し、出力層を少数ショットでその場学習する。 | ✅ p.5 |
| 5 | [E-prop on SpiNNaker 2: Exploring online learning in spiking RNNs on neuromorphic hardware](https://doi.org/10.3389/fnins.2022.1018006) | 2022 | Frontiers in Neuroscience | 発展 | SpiNNaker 2 試作機の 12 コアで e-prop を実時間・バッチ 1 で実行し、GSC で 91.12%。e-prop と BPTT のメモリを公正に比較した（OA 版で読了）。 | ✅ p.6 |
| 6 | [ReckOn: A 28nm Sub-mm² Task-Agnostic Spiking Recurrent Neural Network Processor Enabling On-Chip Learning over Second-Long Timescales](https://arxiv.org/abs/2208.09759) | 2022 | ISSCC | 発展 | 簡略化 e-prop を載せた 0.45 mm² のチップ。秒オーダの時間依存を 150 µW 未満でオンチップ学習する。 | ✅ p.7 |
| 7 | [Synaptic motor adaptation: A three-factor learning rule for adaptive robotic control in spiking neural networks](https://arxiv.org/abs/2306.01906) | 2023 | arXiv | 発展 | メタ最適化した三因子則で四足の重みをその場更新する SMA。RMA と同等の適応性能（シミュレーション）。 | ✅ p.8 |
| 8 | [Online Continual Learning on Intel Loihi 2 via a Co-designed Spiking Neural Network](https://arxiv.org/abs/2511.01553) | 2025 | arXiv | 最新 | CLP を自己正規化三因子則とニューロン新生として SNN 化した CLP-SNN。Loihi 2 で 1 ステップ 0.33 ms・0.05 mJ。 | ✅ p.9 |
| 9 | [Training slow silicon neurons to control extremely fast robots with spiking reinforcement learning](https://arxiv.org/abs/2601.21548) | 2026 | arXiv | 最新 | DYNAP-SE のリザバーと報酬付き e-prop 型読出しによる hardware-in-the-loop RL で、エアホッケー打撃に 96〜98% 成功。 | ✅ p.10 |
| 10 | [Neuromorphic Reinforcement Learning for Quadruped Locomotion Control on Uneven Terrain](https://arxiv.org/abs/2605.09595) | 2026 | arXiv | 最新 | 平衡伝播で PPO の方策・価値を学習する EP-PPO。A1 四足の不整地歩行で BP と同等の性能、GPU メモリは BPTT 比 4.3 倍効率。 | ✅ p.11 |
| 11 | [CLANE: Continual Learning of Actions on Neuromorphic Hardware from Event Cameras](https://arxiv.org/abs/2605.28387) | 2026 | arXiv | 最新 | スパイキング CNN と CLP-SNN を 1 枚の Loihi 2 に載せ、イベントカメラの行動をクラス増分学習。GPU 版比 16 倍速・100 倍超省エネ。 | ✅ p.12 |
| 12 | [Toward On-Chip Training of Spiking Neural Networks for Dense Event-Based Vision](https://arxiv.org/abs/2609.32405) | 2026 | arXiv | 最新 | DELL：学習可能な局所ヘッドによるブロック局所学習を密予測に拡張。DSEC で BPTT 比ピークメモリ 39.6% 減、EPE も改善。 | ✅ p.13 |
| 13 | [A solution to the learning dilemma for recurrent networks of spiking neurons (e-prop)](https://doi.org/10.1038/s41467-020-17236-y) | 2020 | Nature Communications | 原典 | 適格度痕跡×学習信号で BPTT を近似するオンライン学習則。#5・#6・#9 の基礎。 | ↪ 既存：snn/training p.7 |
| 14 | [Neuromorphic dreaming: A pathway to efficient learning in artificial agents](https://arxiv.org/abs/2405.15616) | 2025 | Neuromorphic Computing and Engineering | 発展 | DYNAP-SE 上の覚醒＋夢見 RL（Pong）。#9 の直接の前身。 | ↪ 既存：event-world-models p.6 |
| 15 | [On-Device Self-Supervised Learning of Low-Latency Monocular Depth from Only Events](https://arxiv.org/abs/2412.06359) | 2025 | CVPR | 最新 | 小型ドローン上でイベント深度をオンライン自己教師あり学習。チップ外だがその場適応の例。 | ↪ 既存：event-world-models p.7 |
| 16 | [The More the Merrier: Running Multiple Neuromorphic Components On-Chip for Robotic Control](https://arxiv.org/abs/2602.13747) | 2026 | NCE（予備採録） | 最新 | Loihi 2 上で複数ネットワークを協調させるロボット制御パイプライン。#11 の次に読む論文。 | ↪ 既存：closed-loop p.9 |
| 17 | [SpiNNaker2 chip (Scholze+ 2026)](https://arxiv.org/abs/2607.24396) | 2026 | arXiv | 最新 | SpiNNaker 2 の量産チップの全体像。#5 の実装先。 | ↪ 既存：snn/neuromorphic-hardware p.13 |
| 18 | [Loihi: A Neuromorphic Manycore Processor with On-Chip Learning](https://doi.org/10.1109/MM.2018.112130359) | 2018 | IEEE Micro | 原典 | 和積形式のプログラマブル学習則エンジンを持つ Intel のチップ（検索と #4・#8 の記述による）。OpenAlex で OA 版なし。 | ⚠️ 本文未確認 |
| 19 | [Neuromodulated Spike-Timing-Dependent Plasticity, and Theory of Three-Factor Learning Rules](https://doi.org/10.3389/fncir.2015.00085) | 2016 | Frontiers in Neural Circuits | 原典 | 三因子則（適格度痕跡×神経修飾）の理論総説。OA 版があるが本調査では未読で、総説のためスライド化しなかった。 | — 参照のみ |
| 20 | [Equilibrium Propagation: Bridging the Gap between Energy-Based Models and Backpropagation](https://arxiv.org/abs/1602.05179) | 2017 | Frontiers in Computational Neuroscience | 原典 | 自由平衡とナッジ平衡の差から局所に勾配を得る学習則。#10 の基礎（未読）。 | — 参照のみ |
| 21 | [Adaptive Robotic Arm Control with a Spiking Recurrent Neural Network on a Digital Accelerator](https://arxiv.org/abs/2405.12849) | 2024 | arXiv（ICECS'24 投稿） | 発展 | ReckOn を Zynq MPSoC に移植し、ロボット腕の積載の有無をオンライン学習で判定（分類課題）。本文を流し読みし、制御則の適応ではないためスライド化しなかった。 | — 参照のみ |
| 22 | [All On-Board: Fully On-Chip Neuromorphic Q-Learning with Embedded CartPole Simulation](https://arxiv.org/abs/2609.32317) | 2026 | arXiv | 最新 | Loihi 2 上で離散化した表形式 Q 学習と CartPole 環境を両方チップ内で実行。成功率は CPU 62% に対し 36% だが、同数の成功エージェントを半分の時間で学習し、動的電力は 2 桁小さい。結果と限界の節を読み、表形式 RL のためスライド化しなかった。 | — 参照のみ |
| 23 | [Continual Learning for Autonomous Robots: A Prototype-based Approach](https://arxiv.org/abs/2404.00418) | 2024 | arXiv（IROS 投稿） | 発展 | CLP の原案。メタ可塑性と新規性検出による少数ショットのオンライン継続学習（アブストラクトのみ確認）。 | — 参照のみ |
| 24 | [Embodied Neuromorphic Vision with Event-Driven Random Backpropagation](https://arxiv.org/abs/1904.04805) | 2019 | arXiv | 発展 | eRBP を DVS 付きロボット頭部と把持に統合し、アフォーダンスを 100 ms 以内に分類（アブストラクトのみ確認）。 | — 参照のみ |
| 25 | [Low-Power Low-Latency Keyword Spotting and Adaptive Control with a SpiNNaker 2 Prototype and Comparison with Loihi](https://arxiv.org/abs/2009.08921) | 2021 | Neuromorphic Computing and Engineering | 発展 | SpiNNaker 2 試作機と Loihi で適応ロボット制御（NEF）を比較。入力次元が大きいと SpiNNaker 2 が有利（アブストラクトと検索情報のみ）。 | — 参照のみ |
| 26 | [Three-Factor Learning in Spiking Neural Networks: An Overview of Methods and Trends from a Machine Learning Perspective](https://arxiv.org/abs/2504.05341) | 2025 | arXiv | 最新 | 機械学習の観点からの三因子則サーベイ（アブストラクトのみ確認）。 | — 参照のみ |
| 27 | [Learning over time using a neuromorphic adaptive control algorithm for robotic arms](https://arxiv.org/abs/2210.01243) | 2022 | arXiv | 発展 | ロボット腕のニューロモルフィック適応制御（題目のみ確認）。 | — 参照のみ |
| 28 | [Nengo and low-power AI hardware for robust, embedded neurorobotics](https://arxiv.org/abs/2007.10227) | 2020 | Frontiers in Neurorobotics | 発展 | Nengo による適応腕制御などを低電力 HW に載せる事例（題目のみ確認）。 | — 参照のみ |
| 29 | [Hardware-Aware Fine-Tuning of Spiking Q-Networks on the SpiNNaker2 Neuromorphic Platform](https://arxiv.org/abs/2507.23562) | 2025 | ICONS | 最新 | SpiNNaker2 向けスパイキング Q 網の HW 考慮微調整（題目のみ確認、オンチップ学習かは未確認）。 | — 参照のみ |
| 30 | [Bellman Memory Units: A neuromorphic framework for synaptic reinforcement learning with an evolving network topology](https://arxiv.org/abs/2511.16066) | 2025 | arXiv | 最新 | シナプス RL とトポロジー進化の枠組み（題目のみ確認）。 | — 参照のみ |
| 31 | [Autonomous Reinforcement Learning Robot Control with Intel's Loihi 2 Neuromorphic Hardware](https://arxiv.org/abs/2512.03911) | 2025 | arXiv | 最新 | RL で学習した ANN を SDNN に変換し Loihi 2 で Astrobee を制御。推論のみで、オンチップ学習ではない（検索情報）。 | — 参照のみ |
| 32 | [Towards biologically plausible model-based reinforcement learning in recurrent spiking networks by dreaming new experiences](https://doi.org/10.1038/s41598-024-65631-y) | 2024 | Scientific Reports | 発展 | 覚醒・夢見の 2 相によるスパイキング RL（#9 の引用による。本文未読）。 | — 参照のみ |
| 33 | [RMA: Rapid Motor Adaptation for Legged Robots](https://arxiv.org/abs/2107.04034) | 2021 | RSS | 発展 | 環境埋め込みを推定して入力に足す motor adaptation（RMA）。#7 の比較対象（未読）。 | — 参照のみ |
