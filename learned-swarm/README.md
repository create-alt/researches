## 学習型群知能と、学習器・古典的探索の役割分担（learned-swarm/）

### 調査履歴
- 2026-10-24: aco-neural・metabbo の推奨テーマ（「ヒートマップ型 NCO と探索器の分担」「なぜ PSO の学習制御は伸びないのか」）を出発点にした。arXiv API と WebSearch で "heatmap MCTS TSP"、"particle swarm reinforcement learning"、"differential evolution reinforcement learning operator"、"MetaBBO" を検索し、2024〜2026 の評価研究（Beyond the Heatmap、SoftDist、When does learning pay off?）から入った。
- そこから 2 つの系譜を原典まで遡った。①連続 BBO の学習型制御：DE-DDQN（2019）→ RL-DAS → RLDE-AFL。②ヒートマップ＋MCTS：Att-GCN+MCTS（2021）→ DIMES → DIFUSCO / UTSP → SoftDist → GT-Prior。どちらも「学習器なし・ランダム・単純な事前分布」との比較がどう変わってきたかに注目して全文を読んだ。
- PSO 専用の DRL 制御（RLPSO、QLPSO）も探したが、arXiv で全文を読めたのは評価設計の弱い RLPSO だけだった。GLEET は既存デッキにある。そのため PSO の系譜は参照のみとし、DE 系で代表させた。

### 系譜
```
[連続 BBO：学習器が古典 EA の「何を」制御するか]
DE-DDQN (Sharma+ 2019, 演算子選択)
  ├─ LDE (Sun+ 2021, F/CR 制御) ⚠️ ── GLEET (Ma+ 2024, PSO/DE の探索・活用) ↪既存
  ├─ RL-DAS (Guo+ 2024, 熟練 DE を丸ごと選ぶ)
  │    └─ RLDE-AFL (Guo+ 2025, 特徴も学習・14+3 演算子＋係数)
  └─ [評価] When does learning pay off? (Mencaroni+ 2026, 同予算の静的調整と比較)
                         MetaBox-v2 (Ma+ 2025) ↪既存

[組合せ最適化：学習ヒートマップ × 古典探索（MCTS / k-opt / ACO）]
Att-GCN+MCTS (Fu+ 2021, 教師あり＋MCTS)
  ├─ DIMES (Qiu+ 2022, RL＋メタ学習)
  │    └─ DIFUSCO (Sun & Yang 2023, 拡散・教師あり)
  └─ UTSP (Min+ 2023, 教師なし代理損失)
       ↓ 再評価
  SoftDist / Position (Xia+ 2024) ⇄ Comment (Min 2024)
       └─ Beyond the Heatmap (Pan+ 2025/ICLR 2026, MCTS 調整＋GT-Prior)
            └─ HeatACO (Lin+ 2026, ヒートマップを MMAS で復号) ↪既存
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Deep Reinforcement Learning Based Parameter Control in Differential Evolution](https://arxiv.org/abs/1905.08006) | 2019 | GECCO 2019 | 原典 | DE の変異戦略を、99 次元の状態を見る Double DQN がオフライン学習で選ぶ（DE-DDQN）。固定戦略・ランダムには有意に勝つが、既存 AOS とは有意差なし | ✅ p.2 |
| 2 | [Generalize a Small Pre-trained Model to Arbitrarily Large TSP Instances](https://arxiv.org/abs/2012.10658) | 2021 | AAAI 2021 | 原典 | 小規模で教師あり学習した Att-GCRN のヒートマップを合成し、k-opt の MCTS で改善する「ヒートマップ＋MCTS」の起点。TSP10000 で LKH3 比 4.39% | ✅ p.3 |
| 3 | [DIMES: A Differentiable Meta Solver for Combinatorial Optimization Problems](https://arxiv.org/abs/2210.04123) | 2022 | NeurIPS 2022 | 発展 | 連続パラメータ化したヒートマップを REINFORCE＋メタ学習で訓練。ラベル不要で TSP10000 を直接学習。近傍順位ヒートマップとの差は小さい（Table 2d） | ✅ p.4 |
| 4 | [DIFUSCO: Graph-based Diffusion Solvers for Combinatorial Optimization](https://arxiv.org/abs/2302.08224) | 2023 | NeurIPS 2023 | 発展 | 離散拡散 GNN でヒートマップを生成。MCTS 併用で TSP500/1000/10000 の gap 0.46/1.17/2.58%。貪欲 10.85% が 2-opt だけで 1.49% になる | ✅ p.5 |
| 5 | [Unsupervised Learning for Solving the Travelling Salesman Problem](https://arxiv.org/abs/2303.10538) | 2023 | NeurIPS 2023 | 発展 | 代理損失と T→H 変換による教師なしヒートマップ（UTSP）。上位 10 辺で最適辺の 99.76% を覆い、探索空間を縮める | ✅ p.6 |
| 6 | [Deep Reinforcement Learning for Dynamic Algorithm Selection: A Proof-of-Principle Study on Differential Evolution](https://arxiv.org/abs/2403.02131) | 2024 | IEEE TSMC: Systems | 発展 | 3 つの強い DE を区間ごとに PPO 方策で切り替える（RL-DAS）。ランダム切替でも単体に勝ち、RL の上乗せは小さい | ✅ p.7 |
| 7 | [Position: Rethinking Post-Hoc Search-Based Neural Approaches for Solving Large-Scale Traveling Salesman Problems](https://arxiv.org/abs/2406.03503) | 2024 | ICML 2024 | 最新 | 距離 softmax の SoftDist が多くの学習ヒートマップに勝ち、同条件では MCTS が LKH-3 に大きく劣ると主張 | ✅ p.8 |
| 8 | [Reinforcement Learning-based Self-adaptive Differential Evolution through Automated Landscape Feature Learning](https://arxiv.org/abs/2503.18061) | 2025 | GECCO 2025 | 最新 | NeurELA で状態特徴を学習し、14 変異・3 交叉とその係数を個体ごとに PPO で制御（RLDE-AFL）。手設計特徴との差は小さい | ✅ p.9 |
| 9 | [Beyond the Heatmap: A Rigorous Evaluation of Component Impact in MCTS-Based TSP Solvers](https://arxiv.org/abs/2411.09238) | 2025 | ICLR 2026 | 最新 | MCTS を手法ごとに調整すると、k 近傍統計の GT-Prior が学習ヒートマップと同等以上で、分布・規模の変化にも頑健 | ✅ p.10 |
| 10 | [When does learning pay off? A study on DRL-based dynamic algorithm configuration for carbon-aware scheduling](https://arxiv.org/abs/2604.01886) | 2026 | arXiv プレプリント | 最新 | 同じ予算の静的調整と比べると、DRL-DAC は既知型で差がなく、未知の大規模型でだけ最大 3.2% 勝つ | ✅ p.11 |
| 11 | [Comment on paper: Position: Rethinking Post-Hoc Search-Based Neural Approaches …](https://arxiv.org/abs/2406.09441) | 2024 | arXiv | 最新 | UTSP 著者による反論（全文 4 頁を確認）。同じ時間計測なら UTSP が SoftDist に勝つ（TSP1000 で 1.65 vs 1.73%）とし、時間計測とハイパーパラメータ調整の不公平を指摘 | — 参照のみ（短い反論のため #7 のスライドで扱った） |
| 12 | [Reinforcement learning based parameters adaption method for particle swarm optimization](https://arxiv.org/abs/2206.00835) | 2022 | arXiv（Swarm Evol. Comput. 投稿） | 発展 | PSO の w・c1・c2 を 5 部分群ごとに DDPG で制御する RLAM／RLPSO（本文を確認）。CEC2013 で評価しているが訓練と試験の分割がはっきりせず、MetaBox-v2 でも振るわないため、スライド化しなかった | — 参照のみ |
| 13 | [Learning Adaptive Differential Evolution Algorithm From Optimization Experiences by Policy Gradient](https://doi.org/10.1109/TEVC.2021.3060811) | 2021 | IEEE TEVC 25(4) | 発展 | LSTM が個体ごとに F・CR を出す LDE（RL-DAS・RLDE-AFL・Mencaroni+ の記述に基づく）。arXiv 版・公開版は見つからなかった | ⚠️ 本文未確認 |
| 14 | [Dynamic Algorithm Configuration: Foundation of a New Meta-Algorithmic Framework](https://doi.org/10.3233/FAIA200122) | 2020 | ECAI 2020 | 原典 | パラメータ制御を MDP（DAC）として定式化した枠組み（Mencaroni+ の記述に基づく）。公開版に到達できず | ⚠️ 本文未確認 |
| 15 | [ConfigX: Modular Configuration for Evolutionary Algorithms via Multitask Reinforcement Learning](https://arxiv.org/abs/2412.07507) | 2024 | arXiv | 発展 | モジュール化した EA 群に対し、Transformer 方策をマルチタスク RL で事前学習する汎用構成エージェント。要旨のみ確認 | — 参照のみ |
| 16 | [Learning to Orchestrate Evolutionary Search: Progression-Aware DRL for Dynamic DE-CMA-ES Coordination …](https://arxiv.org/abs/2610.11546) | 2026 | arXiv | 最新 | DDPG で DE と CMA-ES への資源配分・集団サイズ・再起動を制御（構造モデル更新）。要旨のみ確認 | — 参照のみ |
| 17 | [Deep Reinforcement Learning for Dynamic Algorithm Configuration: A Case Study on Optimizing OneMax with the (1+(λ,λ))-GA](https://arxiv.org/abs/2512.03805) | 2025 | arXiv | 最新 | DDQN／PPO による集団サイズ制御の失敗要因（探索不足、計画地平）を分析し、報酬シフトで改善。要旨のみ確認。学習が効かない条件の理論寄りの例 | — 参照のみ |
| 18 | [On Size and Hardness Generalization in Unsupervised Learning for the Travelling Salesman Problem](https://arxiv.org/abs/2403.20212) | 2024 | arXiv | 発展 | UTSP の訓練規模・埋め込み次元・分布の難しさが汎化に与える影響。要旨のみ確認 | — 参照のみ |
| 19 | [Connected by Construction: Learning Tractable Near-Tour Marginals for Traveling Salesman Problems](https://arxiv.org/abs/2607.12127) | 2026 | arXiv | 最新 | 根付き 1-tree の Gibbs 分布で「復号前に何を学んだか」を構造的に表す C2TSP。要旨のみ確認 | — 参照のみ |
| 20 | [Compute Time Scaling with Recursive Models for Combinatorial Optimization](https://arxiv.org/abs/2609.34585) | 2026 | arXiv | 最新 | 小さな再帰モデルの深さ・幅をスケールさせ、拡散型ヒートマップ解法より速く高品質と主張。要旨のみ確認 | — 参照のみ |
| 21 | [Transport, Don't Generate: Deterministic Geometric Flows for Combinatorial Optimization](https://arxiv.org/abs/2602.10794) | 2026 | arXiv | 最新 | N×N ヒートマップをやめ、点を円周へ輸送して角度順で巡回路を得る CycFlow。要旨のみ確認 | — 参照のみ |
| 22 | [Edge-wise Topological Divergence Gaps: Guiding Search in Combinatorial Optimization](https://arxiv.org/abs/2512.15800) | 2025 | arXiv | 最新 | 位相的特徴で探索を誘導する手法。題目のみ確認 | — 参照のみ |
| 23 | QLPSO（A reinforcement learning-based communication topology in particle swarm optimization） | 2020 | Neural Computing and Applications | 発展 | Q 学習で PSO の通信トポロジを選ぶ。MetaBox のベースライン（検索情報に基づく） | — 参照のみ（影響は限定的） |
| 24 | [Auto-configuring Exploration-Exploitation Tradeoff in Evolutionary Computation via Deep Reinforcement Learning](https://arxiv.org/abs/2404.08239)（GLEET） | 2024 | GECCO 2024 | 発展 | PSO/DE の探索・活用を Transformer 方策で制御。RLDE-AFL のベースライン | ↪ 既存：deep-learning-fusion p.6 |
| 25 | [MetaBox-v2: A Unified Benchmark Platform for Meta-Black-Box Optimization](https://arxiv.org/abs/2505.17745) | 2025 | NeurIPS 2025 | 最新 | 分布外では従来の DE・SHADE が頑健で、PSO 系の学習型（RLPSO など）が振るわないと報告 | ↪ 既存：metabbo p.8 |
| 26 | [HeatACO: A Heatmap-Guided Max–Min Ant System for Large-Scale Travelling Salesman Problems](https://arxiv.org/abs/2601.19041) | 2026 | arXiv | 最新 | ヒートマップを MMAS で復号。強い局所探索があると学習ヒートマップの寄与が消える | ↪ 既存：swarm-intelligence/aco-neural p.10 |
| 27 | [DeepACO: Neural-enhanced Ant Systems for Combinatorial Optimization](https://arxiv.org/abs/2309.14032) | 2023 | NeurIPS 2023 | 発展 | GNN で ACO の η を学習する。ヒートマップ＋古典探索の ACO 版 | ↪ 既存：deep-learning-fusion p.4 |
