## イベントベース世界モデルと表現学習（event-world-models/）

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
