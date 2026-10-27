## チップ上の局所学習による身体の適応（on-chip-learning/）

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
