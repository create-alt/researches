## ICONS（icons/）

### 調査履歴
- 2026-10-27: 公式サイト（iconsneuromorphic.cc、旧 icons.ornl.gov）、EasyChair、ACM DL、IEEE Xplore には到達できなかった。そのため WebSearch のスニペット（EasyChair の CFP、ACM の Best Paper 一覧、Schedule-2025、研究室ニュースなど）、Crossref API（2023〜2026 の論文集と採録論文の一覧）、arXiv API（comments に「ICONS 2023〜2026」を含む論文の検索）を情報源にした。ccf-deadlines には ICONS の YAML がない。
- ICONS 2023〜2026 の締切・会期・開催地・出版社と、2021〜2026 の受賞を調べた。ICONS 2026 の採録 40 本は Crossref で全件を把握し、うち arXiv 版が見つかった 16 本から選んだ。スライド化したのは 2026 年の 6 本と 2023〜2025 年の 4 本の計 10 本で、すべて arXiv の全文を読んだ。

### 締切の要点
- ICONS 2027 は 2026-10-27 時点で未発表。論文締切は **2027-04-01 前後（推定）**。2021〜2025 は 4 月 30 日前後（2024 は 5/3 AoE まで延長）だったが、2026 は 4 月 1 日（集約サイトでは 4/8 に延長）に前倒しされたので、直近に合わせた。幅は 4/1〜4/30。
- 採否通知は 6 月上旬（2026 は 6/5）、カメラレディは 6 月下旬（2026 は 6/24）、会期は 7 月末〜8 月上旬の 3 日間（いずれも推定）。論文は最大 8 ページ（参考文献込み）で、投稿は EasyChair。
- 直近の ICONS 2026 は 2026-08-04〜06 に Chicago（Naperville）で開催。ACM 論文集で、112 投稿・40 採録（約 36%）。

### 受賞・話題の論文一覧
| # | 年 | 賞 | 論文 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026 | Best Paper Award | [FlowEqProp: Training Flow Matching Generative Models with Gradient Equilibrium Propagation](https://arxiv.org/abs/2604.08150) | 平衡伝播を速度場の学習に拡張し、フローマッチング生成モデルを逆伝播なしで学習した | ✅ p.2 |
| 2 | 2026 | Best Paper Finalist（上位 3 候補, 話題） | [Neuromorphic Silicon Neuron Controller for Adaptive Deep Brain Stimulation in Parkinson's Disease](https://arxiv.org/abs/2607.05453) | CMOS の LIF ニューロンを aDBS の制御器にし、開ループ比 25% の電力で β 振動を抑えた | ✅ p.4 |
| 3 | 2026 | 採録（話題） | [Phase State Space Models: Parallel, Surrogate-Free Training of Spiking Networks](https://arxiv.org/abs/2608.07754) | R&F ニューロンを SSM として定式化し、代理勾配なしで並列学習する | ✅ p.6 |
| 4 | 2026 | 採録（話題） | [Convolutional Sparse Coding via the Locally Competitive Algorithm on Loihi 2](https://arxiv.org/abs/2606.08584) | 畳み込み LCA を Loihi 2 に実装。GPU より遅いが、エネルギーは約 4〜140 倍有利 | ✅ p.8 |
| 5 | 2026 | 採録（話題） | [A Spiking Neural Architecture for Coordinating Arm and Locomotor Control](https://arxiv.org/abs/2606.11034) | 腕の制御と二足歩行を単一の SNN で統合し、基底核モデルで切り替える | ✅ p.10 |
| 6 | 2026 | 採録（話題） | [Co-Evolved Spiking Neural Network Ensembles via Marginal Contribution Fitness](https://arxiv.org/abs/2606.13985) | 限界貢献を適応度とする共進化で SNN アンサンブルを進化させた | ✅ p.12 |
| 7 | 2026 | 採録（参照） | [Sigma-Delta Neural Network Conversion on Loihi 2](https://arxiv.org/abs/2505.06417) | 量子化 ANN を Loihi 2 の Σ-Δ ニューロンに変換し、Jetson と比較した | ↪ 既存：snn/fair-benchmark |
| 8 | 2025 | Best Paper Award | [A Comparison of Custom and Standard Neuron Model Random Walks on the Ornstein-Uhlenbeck Equation for Simplified Turbulence](https://doi.org/10.1109/ICONS69015.2025.00012) | ニューロモルフィックなランダムウォークで OU 方程式（簡略乱流）を解く（検索情報に基づく） | ⚠️ 本文未確認 |
| 9 | 2025 | Best Paper Nominee | Neuromorphic Closed-Loop Control with Spiking Motor Neuron and Muscle Spindle Models | 運動ニューロンと筋紡錘のスパイキングモデルによる閉ループ制御（題名から） | ⚠️ 本文未確認 |
| 10 | 2025 | 採録（話題） | [EEvAct: Early Event-Based Action Recognition with High-Rate Two-Stream Spiking Neural Networks](https://arxiv.org/abs/2507.07734) | 2 ms ビンの二流路 SNN で THU EACT-50 94.9%。早期認識の評価法も示した | ✅ p.14 |
| 11 | 2024 | 採録（話題） | [Scalable Event-by-event Processing of Neuromorphic Sensory Signals With Deep State-Space Models](https://arxiv.org/abs/2404.18508) | イベント単位の S5 で百万イベント級の列を学習し、SSC 88.4% | ✅ p.16 |
| 12 | 2024 | 採録（話題） | [Spiking Neural Networks as a Controller for Emergent Swarm Agents](https://arxiv.org/abs/2410.16175) | 2 値センサの群ロボットに進化させた SNN を載せ、ミリングを創発させた | ✅ p.18 |
| 13 | 2024 | 採録（参照） | [Exploring Extreme Quantization in Spiking Language Models](https://arxiv.org/abs/2405.02543) | スパイキング言語モデルを 1〜1.58 ビットまで量子化する | ↪ 既存：snn/selective-spiking |
| 14 | 2023 | 採録（話題） | [Beyond Weights: Deep learning in Spiking Neural Networks with pure synaptic-delay training](https://arxiv.org/abs/2306.06237) | 重みを固定し、シナプス遅延だけの学習で重み学習に迫る精度を出した | ✅ p.20 |
| 15 | 2022 | Best Paper Award | Interactive continual learning for robots: a neuromorphic approach | Intel によるロボットの対話的な継続学習（検索情報に基づく） | — 参照のみ |
| 16 | 2021 | Best Paper Award | Accurate and Accelerated Neuromorphic Network Design Leveraging A Bayesian Hyperparameter Pareto Optimization Approach | ベイズ多目的最適化で SNN の設計を高速化（検索情報に基づく） | — 参照のみ |

### 不明な点
- ICONS 2026 Best Paper の出典は ACM の Best Paper 一覧の検索スニペットだけで、公式サイトでは確認できていない。他部門（Best Student Paper など）の有無、Finalist の残り 2 本も不明。
- 2025 年 Best Paper の本文と全著者（非公開）、2024・2023 年の Best Paper、2022 年 Best Student Paper の正確な題名。
- 2026 年の締切延長（4/8）と 2025 年の締切（4/30）は集約サイトの値。2023〜2025 の投稿数・採択数、2023・2025 の採否通知日。
- 査読方式（ダブルブラインドか）、リバッタルの有無、CORE・CCF の格付け、ICONS 2027 の開催地と日程。
