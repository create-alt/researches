## 完全ニューロモルフィック閉ループ：センサ → SNN → アクチュエータ（closed-loop/）

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
