## 学習される群知能：NCA から物理モジュール・ロボット群へ（learned-collective/）

### 調査履歴
- 2026-10-24: candidates/neural-cellular-automata.md の NPA（2026）と Smart Cellular Bricks（2025）を起点に、arXiv API と Web 検索で「neural cellular automata × robot / swarm / modular」「GNN × decentralized swarm」「learned self-assembly / morphogenesis」の 2024〜2026 年の論文を探した。そこから3本の系譜を原典まで遡った。①格子 NCA の物理化（Growing NCA → ソフトロボット再生 → 物理タイル → 物理ブロック）。②動く近傍の局所則（GNN 群制御 → GNCA → 同変 GNN・NPA・DiffeoMorph）。③強化学習・社会学習で局所則を得る群（自己組立する肢、Kilobot 実機での分散学習）。
- 比較の視点として、手設計の局所則（Reynolds の Boids、Tanner の群れ則、Kilobot の行動表、Slavkov らの Turing パターン）を学習則がどこまで置き換えたか・何を取り戻したか（対称性・頑健性）を各スライドの s2/s5 に書いた。
- Growing NCA と Self-classifying MNIST は同分野の nca-world-models で、Spiking NCA と組込み NCA は nca-hardware でスライド化済みのため、本デッキでは参照のみとした（コーディネータの重複通知に従い、Growing NCA のスライドは物理 NCA（Walker+ 2022）に差し替えた）。
- Kilobot 自己組立（Rubenstein+ 2014）と Morphogenesis in robot swarms（Slavkov+ 2018）は、OpenAlex/Semantic Scholar で OA 版（ブリストル大学・CWI のリポジトリ）を確認したが本環境から到達できず、本文未確認とした。

### 系譜
```
[格子 NCA の物理化]
Growing NCA (2020, 既存:nca-world-models) ─┬→ Regenerating Soft Robots (Horibe+ 2021) → Severe Damage Recovery (2022)
Self-classifying MNIST (2020, 既存) ───────┴→ Physical NCA (Walker+ 2022) → Smart Cellular Bricks (Moreno+ 2025/26)

[動く近傍の局所則（手設計の群れ則 → 学習則）]
Reynolds Boids (1987) / Tanner 群れ則 (2003)  ※手設計
   ├→ GNN 群制御 (Tolstaya+ 2019, 模倣学習) → Equivariant TDAGNN (Transue & Wang 2025)
   └→ GNCA (Grattarola+ 2021, Boids を学び直す) → NPA (Kim+ 2026, 粒子 NCA) → DiffeoMorph (Pahng+ 2025/26, SE(3) 同変)
Growing NCA ───────────────────────────────────→ NPA

[RL・社会学習で局所則を得る群]
Kilobot (Rubenstein+ 2014) / Slavkov+ 2018  ※手設計 ─→ Morphobots (Ben Zion+ 2023, 実機 64 台の分散学習)
Self-Assembling Agents (Pathak+ 2019, RL + 動的 GNN) → Shared Modular Policies (2020) / Local self-attention VSR (Pigozzi+ 2022)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Learning Decentralized Controllers for Robot Swarms with Graph Neural Networks](https://arxiv.org/abs/1903.10527) | 2019 | CoRL | 原典 | 集中型の群れ制御を集約型 GNN で模倣し、局所通信だけの分散則を学習。手設計の局所則より群れを保つ。 | ✅ p.2 |
| 2 | [Learning to Control Self-Assembling Morphologies: A Study of Generalization via Modularity](https://arxiv.org/abs/1902.05546) | 2019 | NeurIPS | 原典 | 磁石で連結する肢が共有方策（動的グラフ NN）で自ら組み上がり、肢数・地形の変化にゼロショット汎化。 | ✅ p.3 |
| 3 | [Regenerating Soft Robots through Neural Cellular Automata](https://arxiv.org/abs/2102.02579) | 2021 | EuroGP | 発展 | GA で進化させた NCA がボクセルロボットを成長させ、損傷後に体を再生して歩行能力を一部回復。 | ✅ p.4 |
| 4 | [Learning Graph Cellular Automata](https://arxiv.org/abs/2110.14237) | 2021 | NeurIPS | 発展 | GNN で任意グラフ上の CA 遷移則を学習。Boids の群れを観測から学び直し、点群を目標形へ収束させた。 | ✅ p.5 |
| 5 | [Physical Neural Cellular Automata for 2D Shape Classification](https://arxiv.org/abs/2203.07548) | 2022 | IROS | 発展 | Arduino タイル20枚が同じ NCA を実行し、隣接通信だけで0〜9の形に合意。学習していない縮小形にも汎化。 | ✅ p.6 |
| 6 | [Morphological computation and decentralized learning in a swarm of sterically interacting robots](https://arxiv.org/abs/2111.06953) | 2023 | Science Robotics | 発展 | 外骨格付き Kilobot 64 台が、方策と報酬を近傍とだけ交換する社会学習で走光性を獲得（ランダム配置の約8倍）。 | ✅ p.7 |
| 7 | [Learning Decentralized Swarms Using Rotation Equivariant Graph Neural Networks](https://arxiv.org/abs/2502.17612) | 2025 | arXiv | 最新 | 群れ制御 GNN に O(2) 同変性を入れ、データ70%減・重み75%減で同等性能、汎化誤差の上界も半減。 | ✅ p.8 |
| 8 | [Smart Cellular Bricks for Decentralized Shape Classification and Damage Recovery](https://arxiv.org/abs/2509.18659) | 2025 | Nature Communications 2026 | 最新 | 約200個の立方体 PCB が 3D-NCA で形のクラスに合意（実機100%、シミュ98.97%）。損傷方向検出90%超。 | ✅ p.9 |
| 9 | [DiffeoMorph: Learning to Morph 3D Shapes Using Differentiable Agent-Based Simulations](https://arxiv.org/abs/2512.17129) | 2025 | arXiv | 最新 | SE(3) 同変 GNN を共有するエージェント群の形態形成則を、Zernike スペクトル損失で微分学習。GNCA・NPA より回転に頑健。 | ✅ p.10 |
| 10 | [Neural Particle Automata: Learning Self-Organizing Particle Dynamics](https://arxiv.org/abs/2601.16096) | 2026 | SIGGRAPH 2026（研究室告知） | 最新 | NCA を SPH 知覚の粒子系に一般化。形態形成・粒子テクスチャ・点群 MNIST 分類 98.42%、未学習の損傷から再生。 | ✅ p.11 |
| 11 | [Growing Neural Cellular Automata](https://distill.pub/2020/growing-ca/) | 2020 | Distill | 原典 | 共有の局所則 NN で種から形を成長・再生させる NCA の原典。サンプルプールと損傷付き学習。 | ↪ 既存：nca-world-models p.3 |
| 12 | [Self-classifying MNIST Digits](https://distill.pub/2020/selforg/mnist/) | 2020 | Distill | 原典 | 局所通信だけでセル群が数字のクラスに合意する分散分類の起点。物理タイル・ブロックの直接の祖先。 | ↪ 既存：nca-world-models p.4 |
| 13 | [Collective control of modular soft robots via embodied Spiking Neural Cellular Automata](https://arxiv.org/abs/2204.02099) | 2022 | Cells2Societies@ICLR WS | 発展 | ボクセルロボットの各モジュールをスパイキング NCA で制御。 | ↪ 既存：nca-hardware p.4 |
| 14 | [A Rotation-Invariant Embedded Platform for (Neural) Cellular Automata](https://arxiv.org/abs/2510.07440) | 2025 | ALIFE | 最新 | 回転不変の組込み NCA モジュール基板。 | ↪ 既存：nca-hardware p.9 |
| 15 | [Deep Reinforcement Learning for Swarm Systems](https://arxiv.org/abs/1807.06613) | 2019 | JMLR | 原典 | 近傍観測の平均埋め込みによる群ロボットの DRL 方策。 | ↪ 既存：swarm-intelligence/deep-learning-fusion p.3 |
| 16 | Programmable self-assembly in a thousand-robot swarm（Rubenstein, Cornejo, Nagpal, [doi:10.1126/science.1254295](https://doi.org/10.1126/science.1254295)） | 2014 | Science | 原典 | 1024 台の Kilobot が手設計の分散アルゴリズム（勾配・エッジフォロー・局所座標）で指定形状に自己組立（検索情報に基づく）。手設計則の代表。 | ⚠️ 本文未確認 |
| 17 | Morphogenesis in robot swarms（Slavkov, Carrillo-Zapata ほか, [doi:10.1126/scirobotics.aau9178](https://doi.org/10.1126/scirobotics.aau9178)） | 2018 | Science Robotics | 原典 | 約300台の Kilobot が反応拡散（Turing パターン）型の手設計則で、自己位置推定なしに有機的な形を作り損傷にも頑健（検索情報に基づく）。OA 版は大学リポジトリにあるが到達不可。 | ⚠️ 本文未確認 |
| 18 | Flocks, Herds and Schools: A Distributed Behavioral Model（Reynolds, [doi:10.1145/37401.37406](https://doi.org/10.1145/37401.37406)） | 1987 | SIGGRAPH | 原典 | 整列・結合・分離の3つの手設計局所則による Boids。GNCA が学び直した対象（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 19 | [Severe Damage Recovery in Evolving Soft Robots through Differentiable Programming](https://arxiv.org/abs/2206.06674) | 2022 | GPEM | 発展 | Horibe+ 2021 の続報。進化で形態を探し、再生は勾配学習で行い機能の80%超を回復（アブストラクトのみ確認、内容が p.4 と重複するためスライド化せず）。 | — 参照のみ |
| 20 | [Evolving Modular Soft Robots without Explicit Inter-Module Communication using Local Self-Attention](https://arxiv.org/abs/2204.06481) | 2022 | GECCO | 発展 | 各ボクセルが共有の局所自己注意コントローラを持ち、モジュール間通信なしで進化。通信ありの MLP より速い移動、未知形態へ微調整で転移（本文読了。数値が図のみでスライド数の都合で除外）。 | — 参照のみ |
| 21 | [One Policy to Control Them All: Shared Modular Policies for Agent-Agnostic Control](https://arxiv.org/abs/2007.04976) | 2020 | ICML | 発展 | 関節ごとの同一モジュール方策＋メッセージパッシングで多様な形態を1方策で制御（アブストラクトのみ。Pathak+ 2019 の続編のため除外）。 | — 参照のみ |
| 22 | [Engineered Self-Organization for Resilient Robot Self-Assembly with Minimal Surprise](https://arxiv.org/abs/1902.05485) | 2019 | arXiv | 発展 | 予測誤差最小化（minimal surprise）を適応度に群ロボットの自己組立行動を進化（アブストラクトのみ確認）。 | — 参照のみ |
| 23 | [LPAC: Learnable Perception-Action-Communication Loops with Applications to Coverage Control](https://arxiv.org/abs/2401.04855) | 2025 | IEEE T-RO | 最新 | CNN 知覚＋GNN 通信＋MLP 行動を模倣学習し、被覆制御で手設計の分散・集中アルゴリズムを上回る（アブストラクトのみ確認）。 | — 参照のみ |
| 24 | [E(n)-equivariant Graph Neural Cellular Automata](https://arxiv.org/abs/2301.10497) | 2024 | TMLR | 発展 | GNCA を等長変換に同変・厳密に局所にした改良（アブストラクトのみ確認）。 | — 参照のみ |
| 25 | [Growing 3D Artefacts and Functional Machines with Neural Cellular Automata](https://arxiv.org/abs/2103.08737) | 2021 | ALIFE | 発展 | 3D NCA で Minecraft の建物や動く機械を成長・再生（アブストラクトのみ確認。ロボット群の観点では間接的なため除外）。 | — 参照のみ |
| 26 | [A Unified Substrate for Body-Brain Co-evolution](https://arxiv.org/abs/2203.12066) | 2022 | GECCO | 発展 | 1つの NCA でモジュラーロボットの体と制御の両方を成長させ、CMA-ES/CMA-ME で進化（アブストラクトのみ確認）。 | — 参照のみ |
| 27 | [Learning Developmental Scaffoldings to Guide Self-Organisation](https://arxiv.org/abs/2605.14998) | 2026 | ALIFE | 最新 | 自己組織化の情報を初期条件（母性前パターン）に置く足場を学習（アブストラクトのみ確認）。DiffeoMorph のオーガナイザと同じ論点。 | — 参照のみ |
| 28 | [Swarm of One: Bottom-up Emergence of Stable Robot Bodies from Identical Cells](https://arxiv.org/abs/2306.12629) | 2023 | IROS | 発展 | 物理的に連結した同一セルの自己組織化で形が決まるロボット Loopy。規則は手設計（アブストラクトのみ確認）。 | — 参照のみ |
| 29 | [Towards self-organized control: Using neural cellular automata to robustly control a cart-pole agent](https://arxiv.org/abs/2106.15240) | 2021 | arXiv | 発展 | NCA を Q 学習で訓練し倒立振子を制御（アブストラクトのみ確認。群ではないため除外）。 | — 参照のみ |
| 30 | [Collective Intelligence for Deep Learning: A Survey of Recent Developments](https://arxiv.org/abs/2111.14377) | 2021 | arXiv | — | 集団知能と深層学習のサーベイ（入口として参照）。 | — 参照のみ |
| 31 | [Neural cellular automata: applications to biology and beyond classical AI](https://arxiv.org/abs/2509.11131) | 2025 | arXiv | — | NCA の生物学・ロボット制御への応用サーベイ（入口として参照）。 | — 参照のみ |
