# 隣接分野調査: イベントベース視覚とニューロモルフィック・ロボティクス

調査日: 2026-10-23 ／ 対象期間: 2025〜2026年を中心に
本文の確認方法: 最新研究 6 本は arXiv の HTML 版本文（導入・手法・実験・考察・限界）を読んで要約した。数値の出典として表・図の番号を添える。arXiv ID とタイトルの一致は arXiv API（export.arxiv.org）で確認済み。

---

## 1. 分野の概要と、ユーザーの3分野とのつながり

イベントカメラ（DVS）は、画素ごとに輝度変化が閾値を超えた瞬間だけ (x, y, t, 極性) のイベントを非同期に出力する。遅延はマイクロ〜サブミリ秒、ダイナミックレンジは 120 dB 超で、動きのブレがない。イベントの疎なスパイク列は SNN と相性がよく、ニューロモルフィックチップ（Loihi、SpiNNaker、DYNAP-SE など）と組み合わせると、mW 級の電力で「感覚→判断→運動」の閉ループを回せる可能性がある。この分野は、それをドローン・脚ロボット・マニピュレータに実装し、学習（模倣学習・強化学習）で制御則を得ることを目指す。

- **SNN／ニューロモルフィックHW**とのつながり: ユーザーが調べている「SNN の学習・大規模化・HW」の、身体を持つ応用先そのもの。チップ上の局所学習（e-prop、平衡伝播）の実戦の場でもある。
- **世界モデル**とのつながり: イベントは「変化」だけを符号化するので、予測・表現学習の入力として性質が独特。イベントから制御に効く潜在表現を学ぶ研究（FLEET、Approximate IL）や、ニューロモルフィックチップ上で世界モデルを使った「夢見」による学習（Neuromorphic dreaming）が出てきた。
- **群知能**とのつながり: 超軽量・低電力の機体（昆虫サイズのドローン、羽ばたき機）は群れで運用する前提になる。イベントカメラによる機体間通信（MoCom など）も現れている。

## 2. 系譜の起点となる古典

| 文献 | 年 | 一言 |
|---|---|---|
| P. Lichtsteiner, C. Posch, T. Delbruck, "A 128×128 120 dB 15 µs Latency Asynchronous Temporal Contrast Vision Sensor", IEEE J. Solid-State Circuits | 2008 | 現在の DVS 型イベントカメラの原型。対数輝度の変化を画素ごとに非同期で出力する方式を確立した。 |
| G. Gallego ほか, "Event-based Vision: A Survey", IEEE TPAMI（arXiv:1904.08405） | 2020 | イベントカメラの原理・表現・アルゴリズム・応用（SLAM、オプティカルフロー、制御）をまとめた標準サーベイ。この分野の共通言語。 |
| F. Paredes-Vallés ほか, "Fully neuromorphic vision and control for autonomous drone flight", Science Robotics（arXiv:2303.08778） | 2024 | イベントカメラ→SNN（Loihi）→制御でドローンを実飛行させた里程標。本文献の後続研究（3.2〜3.6）が引用する。Loihi 上の視覚処理は 274〜1600 Hz、推論電力は 7 mW（Stroobants ほか 2025 の関連研究節での引用による）。 |

## 3. 最新研究（2025〜2026年）

### 3.1 Approximate IL — イベント描画なしでイベントカメラ飛行方策を学習する

- **原題**: Approximate Imitation Learning for Event-based Quadrotor Flight in Cluttered Environments
- **著者**: Nico Messikommer, Jiaxu Xing, Leonard Bauersfeld, Marco Cannici, Elie Aljalbout, Davide Scaramuzza（チューリッヒ大学）
- **発表先**: CoRL 2026（arXiv の journal_ref による）
- **リンク**: https://arxiv.org/abs/2603.07578
- **要約**: イベントカメラで学習するロボットのボトルネックは、オンライン学習中に高頻度のイベントを描画（シミュレート）する計算コストにある。本研究は表現学習と方策探索を分けた。まずオフラインで一度だけ描画したイベントデータセット（教師の行動付き）と実世界の M3ED（深度を補助タスクに使う）でイベントエンコーダを学習する。次に、状態だけを見てイベント学生の特徴・行動を模倣する「近似学生」を作り、オンライン DAgger ではイベントをまったく描画せずに共有行動デコーダを微調整する。結果: 森林シミュレーションの成功率は 1.0 で、BC の 0.8、オンライン描画付き DAgger より 0.7 高い（表1）。方策学習時間は 52.44 時間から 1.86 時間に、28 倍短縮した（図6）。独自のベクトル化イベント生成は ESIM よりピーク GPU メモリを 4 分の 1 以下にした。実機では単眼イベントカメラとオンボード計算で最高 9.8 m/s で飛行した（外部状態情報を使用）。

### 3.2 All Eyes, no IMU — イベントカメラだけで姿勢と角速度を推定して飛ぶ

- **原題**: All Eyes, no IMU: Learning Flight Attitude from Vision Alone
- **著者**: Jesse J. Hagenaars, Stein Stroobants, Sander M. Bohté, Guido C. H. E. de Croon（TU Delft / CWI）
- **発表先**: arXiv プレプリント（2025-07）。TU Delft の発表と検索結果では npj Robotics 4, 21（2026、特集「Neuromorphic Computing for Parsimonious Autonomous Robots」）に掲載とされるが、一次ページは本環境から未確認。
- **リンク**: https://arxiv.org/abs/2507.11302
- **要約**: 重力センサを持たない飛翔昆虫に倣い、下向きのイベントカメラだけで姿勢と角速度を推定し、IMU を飛行制御ループから外した。著者らは一般的な環境での初の「視覚のみ」の飛行制御としている。イベントを 5 ms ごとにフレーム化し、小型の ConvGRU で推定して 200 Hz でフライトコントローラに渡す。結果: 約10分の実機ホバリングで、誤差のほとんどは姿勢 ±3°、角速度 ±18°/s 以内（図2）。未見データの RMSE は姿勢 1.51°、角速度 10.65°/s（表1）。記憶なしの FF 版は 2.17° / 18.65°/s に悪化し、隠れ層を LIF にしたハイブリッド SNN 版は 2.17° / 15.03°/s だった。視野を中央の 160×120 に絞って地平線のような手がかりを奪うと、絶対精度は落ちるが環境間の相対的な汎化は良くなった。これは内部に運動モデルを獲得したことを示唆する（図5）。

### 3.3 Spiking RL on DYNAP-SE — 遅いアナログシリコンニューロンで高速なエアホッケーを学習

- **原題**: Training slow silicon neurons to control extremely fast robots with spiking reinforcement learning
- **著者**: Irene Ambrosini, Ingo Blakowski ほか（計8名、Giacomo Indiveri・Chiara Bartolozzi らを含む）
- **発表先**: arXiv プレプリント（2026-01）
- **リンク**: https://arxiv.org/abs/2601.21548
- **要約**: 混合信号（アナログ/デジタル）ニューロモルフィックチップ DYNAP-SE を制御ループに入れた hardware-in-the-loop で、MuJoCo のエアホッケー（6次元連続状態、50 Hz 制御、パック速度 1.0〜1.5 m/s）を強化学習した。構成は、入力 60 個の FPGA スパイク生成器（ガウス集団符号）、1020 個のシリコン AdEx-LIF ニューロンからなる固定ランダム結合のリザバー、e-prop 型の局所則＋報酬で更新する 2 出力の読み出し。結果: 2000 エピソードを 10 シードで学習し、パックの位置と速度を両方ランダムにした条件で成功率 98% 超（1300 エピソード以降）、速度だけランダムな条件で 96% 超（III-A 節）。速度範囲を広げると [0.7, 1.5] m/s で 93%、[0.5, 2.0] m/s で 86% と緩やかに劣化した。シミュレーション上の先行 RL より 10 分の1のニューロン数（1020 対 10,000）で上回った（IV 節）。前段の Blakowski ほか「Neuromorphic dreaming」（NCE 2025, arXiv:2405.15616）は、同じチップ上で世界モデルを使った「覚醒＋夢見」学習を Atari Pong で示し、サンプル効率 50% 超の改善を報告している（本論文 表I）。本研究ではまだ覚醒相のみで、夢見の導入は今後の課題として挙げられている。

### 3.4 Neuromorphic MAV Navigation — イベントカメラ＋SNN＋Loihi による目的地誘導飛行

- **原題**: Towards bio-inspired visual navigation: a neuromorphic navigation paradigm for MAVs
- **著者**: Junjie Jiang, Ankang Zhou, Zheng Fang
- **発表先**: arXiv プレプリント（2026-10）
- **リンク**: https://arxiv.org/abs/2610.21978
- **要約**: イベントカメラ（Prophesee EVK4）→スパイキング U-Net による深度推定と SEW-ResNet による幾何特徴→集団符号→スパイキング航法ネット（Intel Kapoho Bay＝Loihi 上）→ウェイポイント、という一貫したニューロモルフィック航法の構成を提案した。学習は、5 次多項式軌道に対する微分可能な滑らかさ・衝突・目標損失による guidance learning と、深度の補助教師で行う。結果: シミュレーション 6 環境×8 目標の 48 試行で、成功は最高速 0.5 / 1.0 / 2.0 m/s でそれぞれ 45 / 46 / 48 回（同構成の ANN は 45 / 47 / 47 回、表1）で、ANN と同等。深度の補助教師を外すと衝突が増えた（図9）。実機では屋内 10 試行中 7 回、屋外 10 試行中 9 回成功した。電力はスパイキング知覚モジュールが ANN の 19.57%、Loihi 上の航法モジュールが Orin NX 上の ANN の 12.37%（表2 とアブストラクト）。限界も明記されている。チップの容量不足で知覚部は Jetson 上のシミュレート SNN に置き、無線でホスト経由のやりとりが残る。姿勢推定も通常カメラに頼っている。

### 3.5 SNN Flapping-Wing Control — 26 g の羽ばたきロボットを 5 ドルのマイコン上の SNN で飛ばす

- **原題**: Spiking Neural Network Control of a Flapping-Wing Robot on Resource-Constrained Hardware
- **著者**: Rim El Filali, Chenrui Feng, Chao Gao, Weibin Gu
- **発表先**: arXiv プレプリント（2026-05、v3）
- **リンク**: https://arxiv.org/abs/2605.19430
- **要約**: 尾翼がなく、2 つの翼アクチュエータしか持たない劣駆動の蝶型羽ばたき機（26 g）を対象に、状態推定用と制御用の 2 つの SNN を ESP32-S3 上で動かし、羽ばたきのリズムは CPG に任せた階層制御を作った。教師は Madgwick フィルタ＋PID で、実飛行約10分と合成約150分のデータから行動クローンで学習する。SNN を ESP32 用 C コードに変換するツール Espikify も公開した。SNN が CPG に補正オフセットだけを出す設計（CPG-aware）にすると、PWM を直接模倣する方式より学習範囲外の羽ばたき周波数で頑健になった（図3）。結果: 5 回の自由飛行で、推定 RMSE はピッチ 5.6〜7.0°・ヨー 6.4°、追従 RMSE はピッチ 6.3°・ヨー 8.9°（表1）。イベント駆動実装の SNN は ANN 基準に比べ推論遅延を 36%（1059→680 µs）、推論による電力を 18%（0.033→0.027 W）減らした（図5）。専用ニューロモルフィックHW なしでもスパイク計算の利点を引き出せることを示した。

### 3.6 FLEET — イベント列を直接トークン化する強化学習用の特徴抽出器

- **原題**: FLEET: Token-Based Feature Extraction for Event Camera-based Reinforcement Learning
- **著者**: Tristan Gottwald, Maximilian Schier, Melanie Schaller, Bodo Rosenhahn
- **発表先**: arXiv プレプリント（2026-08、v2）
- **リンク**: https://arxiv.org/abs/2608.16523
- **要約**: イベントを CNN 用の格子テンソルに集約すると、時間情報がぼけ、計算量がセンサ解像度に比例する。VAE などで再構成事前学習すると、制御に要らない見た目の情報まで符号化し、分布シフトにも弱い。そこで、イベント列にランダムフーリエ特徴を付け、Perceiver 型のクロスアテンションで固定数の潜在トークンに圧縮し、補助損失なしで PPO の報酬だけで端から端まで学習する FLEET を提案した。結果（表1、IQM）: Event-CarEnv Racing で 46.96。最良の CNN 系 DMRCNN（12.94）の約 3.6 倍で、同解像度の RGB 版 NatureCNN（23.89）も上回った。再構成で事前学習する eVAE は 1.13 で学習に失敗した。倒立二重振子では 6390 で、他のイベント系手法（1200 未満）を大きく上回ったが、RGB（8981）には届かなかった。解像度を 96×64 から 384×256 に上げても性能はほぼ一定（表2）。制御周期 Δt を 0.025 s に縮めると CNN 系は劣化したが、FLEET は 41.92 を維持した（表3）。潜在トークンが近景・遠景・カーブ形状に役割分担する様子も可視化した（図6）。世界モデルの観点では、「再構成ではなく課題に合わせた表現」をイベント入力で裏づけた結果といえる。

## 4. その他の注目研究（アブストラクトと一覧のみ確認）

- **Neuromorphic Attitude Estimation and Control**（Stroobants, de Wagter, de Croon, IEEE RA-L 2025, arXiv:2411.13945）: IMU 入力から姿勢推定と制御までを 1 つの SNN で行い、Crazyflie を 500 Hz で飛ばした。姿勢追従誤差は 3.0°（通常の制御スタックは 2.7°）。本文も確認済み。
- **On-Device Self-Supervised Learning of Low-Latency Monocular Depth from Only Events**（Hagenaars ほか, CVPR 2025, arXiv:2412.06359）: コントラスト最大化による自己教師ありで、小型ドローン上でイベント深度をオンライン学習し、障害物回避を改善した。
- **ES-Parkour**（Zhang ほか, arXiv:2503.09985, 2025）: イベントカメラ＋SNN の四足パルクール。ANN 教師から SNN へ蒸留し、理論推定エネルギーは ANN の 11.7%（本文 表III）。ただしシミュレーションのみで、実機検証はしていないと本文に明記されている。
- **The More the Merrier**（Eames ほか, NCE 予備採録, arXiv:2602.13747, 2026）と **CLANE**（Hajizada ほか, arXiv:2605.28387, 2026）: Loihi 2 上で複数ネットワークをスパイキング状態機械で協調させたロボット制御パイプラインと、イベントカメラによる行動認識のオンチップ継続学習（GPU 基準比でエネルギー 100 倍超削減）。
- **Neuromorphic RL for Quadruped Locomotion**（Han & Sengupta, arXiv:2605.09595, 2026）: 平衡伝播（EP）で PPO を行う四足歩行。BPTT 比で GPU メモリ効率が 4.3 倍。**DELL**（Vaillant ほか, arXiv:2609.32405, 2026）: 密なイベント視覚（オプティカルフロー）の SNN をブロック局所学習し、オンチップ学習に向けて BPTT 比でピークメモリを 39.6% 減らした。
- **MoCom**（Zhang ほか, arXiv:2510.14770, 2025）: イベント視覚と SNN を使い、機体の動きで MAV 同士が通信する。群ロボットへの接点。

## 5. この分野を本リポジトリの新しい調査分野にする場合のテーマ案

1. **「イベントベース世界モデルと表現学習」**
   FLEET（課題に合わせたトークン表現）、Approximate IL（表現学習と方策探索の分離）、Neuromorphic dreaming（チップ上の世界モデルと夢見）を起点にする。問いは、Dreamer 型の潜在世界モデルや JEPA 型の予測表現をイベント入力でどう作るか、イベントの「変化のみ」という性質が予測誤差ベースの内発的報酬（好奇心）とどう噛み合うか。ユーザーの「世界モデル（内発的報酬・階層化）」に最も近い。
2. **「完全ニューロモルフィック閉ループ: センサ→SNN→アクチュエータ」**
   Paredes-Vallés 2024、Stroobants 2025、All Eyes no IMU、羽ばたき SNN、Loihi 上の MAV 航法を並べ、どこまでオンチップ化できたか（知覚・推定・制御・航法）、何が残っているか（チップ容量、イベント VIO、無線経由）を整理する。ユーザーの「SNN の学習・大規模化・ニューロモルフィックHW」の応用編になる。
3. **「チップ上の局所学習による身体の適応」**
   e-prop（DYNAP-SE エアホッケー）、平衡伝播 PPO（四足）、DELL（ブロック局所学習）、CLANE（Loihi 2 継続学習）を軸に、BPTT を使わない学習則で実ロボットがその場で適応できるかを調べる。SNN 学習則の調査と直結し、群ロボットの分散学習へも展開できる。

---

### 付記（確認状況）
- arXiv API で ID とタイトルの一致を確認した: 2603.07578, 2507.11302, 2601.21548, 2610.21978, 2605.19430, 2608.16523, 1904.08405, 2303.08778, 2411.13945, 2412.06359, 2503.09985, 2602.13747, 2605.28387, 2405.15616。2605.09595, 2609.32405, 2510.14770 も arXiv API の検索・アブストラクト取得で確認した。
- 採録先: 3.1（CoRL 2026）と 1904.08405（TPAMI）は arXiv の journal_ref による。3.2（npj Robotics 2026）は二次情報のみ。Stroobants（RA-L 2025）と Blakowski（NCE 2025）は、引用元の論文（2605.19430 と 2601.21548）の参考文献欄による。
- 3.3 と 3.5 はチップ／マイコンを実際に動かしているが、3.3 のロボットとパックは MuJoCo 上のシミュレーションである（チップは実機を制御ループに入れている）。
