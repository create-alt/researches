## IJCNN（ijcnn/）

### 調査履歴
- 2026-10-27: WebSearch のスニペット（ijcnn.org/2027、attend.ieee.org/wcci-2026、2025.ijcnn.org/program/awards、2023.ijcnn.org の受賞ページ、大学・企業のニュース）と ccf-deadlines の YAML で IJCNN 2022〜2027 の締切・会期と 2022〜2025 の受賞を調べた。2025 年の投稿・採択数は委員長による査読報告（arXiv 2603.19244）で確認。2026 年の注目論文は arXiv API で comment に「IJCNN 2026」を含む約 140 本から選び、全文を arXiv HTML で読んだ。
- 公式サイト（ijcnn.org、2025.ijcnn.org、attend.ieee.org）、IEEE Xplore、DFKI・TECNALIA・Hamburg 大の機関リポジトリには到達できなかった。このため 2024 年 Best Paper、2023 年 Best Paper、2025 年 Best Paper、2026 年の口頭発表論文 VISTA は本文を確認できていない。

### 締切の要点
- 次回は **IJCNN 2027**（2027-06-14〜18, Cape Town, South Africa）。公式日程（検索スニペットで確認）：特別セッション・ワークショップ提案 **2026-11-15**、論文締切 **2027-01-31**、採否通知 2027-03-15、カメラレディ 2027-04-12。
- 締切のタイムゾーンは公式に記載がない（2024〜2026 は AoE）。ワークショップ募集ページの一部に「2027-01-15」とあり食い違うため、公式の Important Dates を要確認。本論文は IEEE 2 段組 6 ページ以内（2026 年までは 8 ページ）。
- 2026 年（WCCI 2026, Maastricht）は 2026-01-31 締切で延長なし。2023・2024 は締切が延長された。

### 受賞・話題の論文一覧
| # | 年 | 賞 | 論文 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026 | Oral（話題） | [MIRROR: Novelty-Constrained Memory-Guided MCTS Red-Teaming for Agentic RAG](https://arxiv.org/abs/2606.26793) | 記憶誘導 MCTS と新規性ゲートで、エージェント型 RAG の 4 攻撃面を統一的にレッドチーミング。既知攻撃の再生による成功率の水増しを定量化した。 | ✅ p.2 |
| 2 | 2026 | 採録（話題：群知能×NAS） | [G-ICSO-NAS: Shifting Gears between Gradient and Swarm for Robust Neural Architecture Search](https://arxiv.org/abs/2604.00703) | 競争型粒子群と DARTS を 3 段階で切り替える NAS。CIFAR-10 誤差 2.54% を 0.15 GPU 日で達成。 | ✅ p.4 |
| 3 | 2026 | 採録（話題：物理ニューロモルフィック） | [Intrinsic Neuro-Synaptic Spiking Dynamics and Resonance in Memristive Networks](https://arxiv.org/abs/2604.18015) | メモリスタ網がスパイクを自発的に生み、固有時間尺度で共鳴する。物理リザバーの最適駆動周波数は共鳴の直前。 | ✅ p.6 |
| 4 | 2026 | 採録（話題：脳型記憶による説明） | [Engram Memory Network: Brain-Inspired Prototype Explanations](https://arxiv.org/abs/2610.27770) | Hopfield 型の連想記憶でプロトタイプを想起し、分類・再構成・説明を同時に行う。下位クラス一致は既存最良の約 2 倍。 | ✅ p.8 |
| 5 | 2026 | 採録（Position Paper・話題） | [Position Paper: Neurotransmitters as a Missing Dimension in Artificial Neural Networks](https://arxiv.org/abs/2609.20083) | 神経伝達物質による神経修飾を、学習の第 3 の軸として ANN に組み込むべきと主張する。 | ✅ p.10 |
| 6 | 2026 | 採録（話題：古典 NN の再定式化） | [Self-Organizing Maps with Optimized Latent Positions](https://arxiv.org/abs/2604.13622) | SOM を連続潜在位置つきの目的関数で再定式化し、O(NM) で 25 万ノードまで拡張した。 | ✅ p.12 |
| 7 | 2026 | 採録（話題：査読割当の自動化） | [Beyond Paper-to-Paper: Structured Profiling and Rubric Scoring for Paper-Reviewer Matching](https://arxiv.org/abs/2604.05866) | LLM で構造化した専門性プロファイルとルーブリック採点の LLM 委員会による、学習不要の査読者推薦。 | ✅ p.14 |
| 8 | 2026 | 査読報告（話題） | [The IJCNN 2025 Review Process](https://arxiv.org/abs/2603.19244) | IJCNN 2025 の査読割当・スコア指数・査読者バイアス補正と統計（投稿 5,526・採択 2,152）を委員長が公開した。 | ✅ p.16 |
| 9 | 2026 | Oral（話題） | [VISTA: Velocity-Informed Sequential Transition Analysis](https://www.dfki.de/web/forschung/projekte-publikationen/publikation/17186) | 臨床特徴の変化速度を使って認知症の進行（MMSE）を予測する（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 10 | 2026 | 採録（話題：SNN） | [Spiking and Event-driven Neuromorphic Mamba Models for Efficient Speech Recognition](https://arxiv.org/abs/2606.01135) | スパイキング／イベント駆動の Mamba による省電力音声認識。 | ↪ 既存：snn/fair-benchmark |
| 11 | 2025 | Best Paper | Every Hop Etched in Memory: Tokenized Graph Mamba Meets Directed Graph Learning | 有向グラフ学習の論文（China UnionPay）。題名と著者のみ確認（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 12 | 2025 | Best Student Paper | [Can LLMs Revolutionize the Design of Explainable and Efficient TinyML Models?](https://arxiv.org/abs/2504.09685) | 小型 LLM による NAS と ViT 蒸留で、320KB SRAM のマイコン上で CIFAR-100 74.5% を達成。 | ✅ p.18 |
| 13 | 2025 | Best Industry Paper | [Improving Vector-Quantized Image Modeling with Latent Consistency-Matching Diffusion](https://arxiv.org/abs/2410.14758) | 埋め込みと連続拡散の同時学習で起きる崩壊を一貫性マッチング損失で防いだ。ImageNet 256 で FID 6.81。 | ✅ p.20 |
| 14 | 2025 | 受賞（部門不明） | A Neural Network Approach to Image-Based Navigation and Localization | 画像に基づくナビゲーションと自己位置推定。題名のみ確認（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 15 | 2024 | Best Paper | [Balancing Performance, Efficiency and Robustness in Open-World Machine Learning via Evolutionary Multi-objective Model Compression](https://doi.org/10.1109/IJCNN60899.2024.10651338) | 量子化を性能・メモリ・分布外頑健性の多目的問題として進化計算で解く（要旨に基づく）。 | ⚠️ 本文未確認 |
| 16 | 2024 | Runner-Up Best Student Paper | [Domain Adaption as Auxiliary Task for Sim-to-Real Transfer in Vision-based Neuro-Robotic Control](https://wtmbib.informatik.uni-hamburg.de/Basilic/publis/903/) | ドメイン適応と逆運動学を 1 つのモデルで学び、NICO の把持で成功率 80.30%（要旨に基づく）。 | ⚠️ 本文未確認 |
| 17 | 2023 | Best Paper | [Leaky-Integrate-and-Fire Neuron-Like Long-Short-Term-Memory Units as Model System in Computational Biology](https://cris.fau.de/publications/332588469) | ピープホール LSTM が特定のパラメータで LIF ニューロンのように振る舞う（要旨に基づく）。 | ⚠️ 本文未確認 |
| 18 | 2022 | Best Student Paper | Neural Network Compatible Off-Policy Natural Actor-Critic Algorithm | IISc によるオフポリシー自然アクター・クリティック。 | — 参照のみ |

### 不明な点
- IJCNN 2026（WCCI 2026）の受賞論文：会期は終わっているが、検索では受賞の発表を見つけられなかった（例年は授賞式で発表し、公式サイトの Awards ページに掲載される）。
- IJCNN 2026 の投稿数・採択率：検索要約に「4,178 本・約 40%」とあるが、出典の WCCI 2026 プログラムを開けず確認できていない。
- IJCNN 2025 受賞ページの部門の対応：抜粋が文字化けしており、Best Student と Best Industry の割り当ては調査者の読み取り。CASIA の Tianyi Luo・Jiaojiao Wang の受賞論文名も不明。
- IJCNN 2024・2023 の投稿数と採択数（公式値）、2024 年 Best Student Paper（首位）、2023 年 Best Poster の正式な題名。
- IJCNN 2027 の締切のタイムゾーンと、「2027-01-15」とする記述との食い違い。
