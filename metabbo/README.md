## MetaBBO と LLM によるアルゴリズム自動設計（metabbo/）

### 調査履歴
- 2026-10-23（第2回調査）: arXiv API で "meta-black-box"（2022〜2026 年の約 25 本）、"automated algorithm design" AND "large language"、AlphaEvolve、LLaMEA の後継を新しい順に検索し、2025〜2026 年の動向（HADA, READY, MetaBox-v2, LLaMEA-SAGE, BehaveSim, CVaR-RMD, AdaEva など）を把握した。そこから 3 つの系譜を原典まで遡った。①自動構成：irace-evo → irace → ParamILS。②学習型最適化器：HADA/MetaBox-v2 → LES → Chen+ 2017（L2O）。③LLM による生成：AlphaEvolve/ReEvo → FunSearch。
- 評価・汎化・新規性の検証方法として、MetaBox-v2（分布外評価・Anti-NFL 指標）、BehaveSim（挙動に基づく類似度）、Zhang+ 2024（PPSN）の大規模比較を読んだ。
- 既存テーマで扱った GLEET・EoH・LLaMEA・ELM・METAFOR・DeepACO・Fister 2026 はスライド化せず、↪ で参照した。
- 本文の取得: FunSearch は PMC の公開版（HTML）で読んだが、図版サーバ（cdn.ncbi）と nature.com には到達できず、Table 1 の数値から図を描き直した。irace の原典（Operations Research Perspectives 2016、gold OA）は OpenAlex・Semantic Scholar で公開版を探した。しかし ScienceDirect・EconStor・ULB・Manchester のいずれにも到達できず、本文未確認とした。ParamILS は JAIR の arXiv 版（1401.3492）で読んだ。

### 系譜
```
① 自動アルゴリズム構成（パラメータ・部品の選択）
   F-Race (Birattari+ 2002) ─┐
   ParamILS (Hutter+ 2009) ──┼→ irace (López-Ibáñez+ 2016, 本文未確認) / SMAC
                             │      └→ METAFOR (2025, 既存: ga-hybrid)
                             └────────→ irace-evo (2025, パラメータ×LLM コード進化)

② 学習型最適化器（L2O → MetaBBO）
   L2L by GD (Andrychowicz+ 2016) → L2O w/o GD (Chen+ 2017, RNN が BBO 則を学習)
        └→ LES (Lange+ 2023, 注意機構の ES を MetaBBO で発見)
        └→ DE-DDQN (2019) / GLEET (2024, 既存: deep-learning-fusion) … MetaBBO-RL
              └→ MetaBox (2023) → MetaBox-v2 (2025, 23 手法・18 問題群・分布外評価)
                    └→ READY / LiBOG / Task-free MetaBBO (2025-26)

③ LLM によるアルゴリズム生成
   ELM (2022, 既存) → FunSearch (2024, Nature) → EoH (2024, 既存) → ReEvo (2024, 反省付き)
                          └→ AlphaEvolve (2025, コード全体・最先端 LLM)
                          └→ LLaMEA (2024, 既存) → LLaMEA-HPO / BLADE / LLaMEA-SAGE

④ 合流と検証（2026）
   ②＋③ → HADA (2026, LLM エージェントが MetaBBO 自体を再帰的に設計)
   評価・新規性: Zhang+ 2024 (EPS の比較) → BehaveSim (ICLR 2026, 挙動類似度)
                 ↔ Fister+ 2026 (等価性判定, 既存: foundations)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [ParamILS: An Automatic Algorithm Configuration Framework](https://arxiv.org/abs/1401.3492) | 2009 | JAIR 36 | 原典 | 設定空間上の反復局所探索と adaptive capping による自動構成。CPLEX の既定設定を最大で一桁以上高速化 | ✅ p.2 |
| 2 | [Learning to Learn without Gradient Descent by Gradient Descent](https://arxiv.org/abs/1611.03824) | 2017 | ICML 2017 | 原典 | RNN をブラックボックス最適化器として GP 関数上で学習。BO パッケージ並みの性能で、提案計算は大幅に高速 | ✅ p.3 |
| 3 | [Discovering Evolution Strategies via Meta-Black-Box Optimization](https://arxiv.org/abs/2211.11260) | 2022 | ICLR 2023 | 発展 | 自己注意で表した ES 更新則を CMA-ES でメタ進化（LES）。"MetaBBO" の初出 | ✅ p.4 |
| 4 | [Mathematical discoveries from program search with large language models](https://doi.org/10.1038/s41586-023-06924-6)（[PMC 公開版](https://pmc.ncbi.nlm.nih.gov/articles/PMC10794145/)） | 2024 | Nature 625 | 原典 | LLM＋評価器＋島モデルでプログラムを進化（FunSearch）。cap set の下界とビンパッキングを更新 | ✅ p.5 |
| 5 | [ReEvo: Large Language Models as Hyper-Heuristics with Reflective Evolution](https://arxiv.org/abs/2402.01145) | 2024 | NeurIPS 2024 | 発展 | 短期・長期の反省を進化に組み込み、ACO のヒューリスティック値などを 100 回程度の評価で設計 | ✅ p.6 |
| 6 | [AlphaEvolve: A coding agent for scientific and algorithmic discovery](https://arxiv.org/abs/2506.13131) | 2025 | arXiv（ホワイトペーパー） | 最新 | 最先端 LLM でコード全体を差分進化。4×4 複素行列積を 48 乗算に、Google のスケジューラで資源の 0.7% を回収 | ✅ p.7 |
| 7 | [MetaBox-v2: A Unified Benchmark Platform for Meta-Black-Box Optimization](https://arxiv.org/abs/2505.17745) | 2025 | NeurIPS 2025 | 最新 | RL・SL・NE・ICL の 23 手法と 18 問題群を統一。分布外では従来の DE・SHADE が頑健と報告 | ✅ p.8 |
| 8 | [irace-evo: Automatic Algorithm Configuration Extended With LLM-Based Code Evolution](https://arxiv.org/abs/2511.14794) | 2025 | arXiv | 最新 | irace の構成を (パラメータ, コード版) の組に拡張し、LLM で 1 関数を進化。CMSA（VSBPP）を改良 | ✅ p.9 |
| 9 | [Rethinking Code Similarity for Automated Algorithm Design with LLMs](https://arxiv.org/abs/2603.02787) | 2026 | ICLR 2026 | 最新 | 中間解の系列を DTW で比べる BehaveSim。生成アルゴリズムの新規性の評価と多様性の管理に使う | ✅ p.10 |
| 10 | [Hyper Algorithm Design Agent: Evolving Learnable Optimizer from Zero](https://arxiv.org/abs/2609.35328) | 2026 | arXiv | 最新 | 2 つの LLM エージェントが MetaBBO のコードと自身のプロンプトを再帰的に改良（HADA）。BBOB で GLEET を上回る | ✅ p.11 |
| 11 | [The irace package: Iterated racing for automatic algorithm configuration](https://doi.org/10.1016/j.orp.2016.09.002) | 2016 | Operations Research Perspectives 3 | 原典 | F-Race を反復し、エリート設定から次の候補をサンプルする自動構成ツール（irace-evo 論文の記述と検索情報に基づく）。gold OA だが ScienceDirect 等に到達できず | ⚠️ 本文未確認 |
| 12 | [Learning to learn by gradient descent by gradient descent](https://arxiv.org/abs/1606.04474) | 2016 | NeurIPS 2016 | 原典 | 勾配法の更新則を LSTM で学習する L2O の起点。勾配を使う最適化器なので、BBO 版の Chen+ 2017 を代表にした | — 参照のみ |
| 13 | [MetaBox: A Benchmark Platform for Meta-Black-Box Optimization with Reinforcement Learning](https://arxiv.org/abs/2310.08252) | 2023 | NeurIPS 2023 | 発展 | MetaBBO-RL の初のベンチマーク（8 手法・3 問題群）。後継の v2 をスライド化した | — 参照のみ |
| 14 | [Toward Automated Algorithm Design: A Survey and Practical Guide to Meta-Black-Box-Optimization](https://arxiv.org/abs/2411.00625) | 2024 | arXiv（サーベイ） | 発展 | MetaBBO を RL・SL・NE・ICL の 4 系統に分類したサーベイ。分類の出典として MetaBox-v2 経由で参照 | — 参照のみ |
| 15 | [Discovering Attention-Based Genetic Algorithms via Meta-Black-Box Optimization](https://arxiv.org/abs/2304.03995) | 2023 | GECCO 2023 | 発展 | LES と同じ枠組みで GA の選択・変異を学習（LGA）。題目と要旨のみ確認 | — 参照のみ |
| 16 | [Evolution Transformer: In-Context Evolutionary Optimization](https://arxiv.org/abs/2403.02985) | 2024 | arXiv | 発展 | 進化の軌跡を Transformer で文脈内学習する最適化器。題目のみ確認 | — 参照のみ |
| 17 | [Understanding the Importance of Evolutionary Search in Automated Heuristic Design with Large Language Models](https://arxiv.org/abs/2407.10873) | 2024 | PPSN 2024 | 発展 | 4 手法・4 問題・9 LLM の比較。LLM 単体は非効率で、単純な (1+1)-EPS が強いベースラインになり、結果は LLM の選択に依存する。結論部を確認 | — 参照のみ |
| 18 | [Fitness Landscape of Large Language Model-Assisted Automated Algorithm Search](https://arxiv.org/abs/2504.19636) | 2025 | arXiv | 最新 | LLM によるアルゴリズム探索の景観が多峰で起伏が大きいことをグラフで分析。要旨のみ確認 | — 参照のみ |
| 19 | [Behaviour Space Analysis of LLM-driven Meta-heuristic Discovery](https://arxiv.org/abs/2507.03605) | 2025 | arXiv | 最新 | LLaMEA が生成した手法の探索挙動を分析（ga-hybrid でも参照のみ）。要旨のみ確認 | — 参照のみ |
| 20 | [BLADE: Benchmark suite for LLM-driven Automated Design and Evolution of iterative optimisation heuristics](https://arxiv.org/abs/2504.20183) | 2025 | arXiv | 最新 | LLaMEA 系の評価基盤。題目のみ確認 | — 参照のみ |
| 21 | [READY: Reward Discovery for Meta-Black-Box Optimization](https://arxiv.org/abs/2601.21847) | 2026 | arXiv | 最新 | MetaBBO の RL 報酬を EoH 型の LLM 進化で自動発見し、複数手法を並列に改善。要旨のみ確認 | — 参照のみ |
| 22 | [LiBOG: Lifelong Learning for Black-Box Optimizer Generation](https://arxiv.org/abs/2505.13025) / [Task-free Adaptive Meta Black-box Optimization](https://arxiv.org/abs/2601.21475) | 2025-26 | arXiv / ICLR 2026（HADA の引用による） | 最新 | 問題分布の変化に追従する MetaBBO。題目のみ確認 | — 参照のみ |
| 23 | [From Heuristic Selection to Automated Algorithm Design: LLMs Benefit from Strong Priors](https://arxiv.org/abs/2603.02792) | 2026 | arXiv | 最新 | ベンチマーク上の既存アルゴリズムを事前知識として与えると LLM 設計が改善（pbo・bbob）。要旨のみ確認 | — 参照のみ |
| 24 | [CVaR-RMD: CVaR Selection Pressure for Robust Metaheuristic Discovery](https://arxiv.org/abs/2610.25697) | 2026 | EMNLP 2026 Findings | 最新 | 平均でなく CVaR で選抜し、生成ヒューリスティクスの汎化と失敗率を改善。要旨のみ確認 | — 参照のみ |
| 25 | [Darwin Godel Machine: Open-Ended Evolution of Self-Improving Agents](https://arxiv.org/abs/2505.22954) | 2025 | arXiv | 最新 | 自己改良するコーディングエージェント。HADA の親選択の出典。題目のみ確認 | — 参照のみ |
| 26 | [Auto-configuring Exploration-Exploitation Tradeoff in Evolutionary Computation via Deep Reinforcement Learning](https://arxiv.org/abs/2404.08239)（GLEET） | 2024 | GECCO 2024 | 発展 | PSO の c1 を Transformer 方策で粒子ごとに制御。MetaBox-v2 と HADA で比較対象 | ↪ 既存：deep-learning-fusion p.6 |
| 27 | [DeepACO: Neural-enhanced Ant Systems for Combinatorial Optimization](https://arxiv.org/abs/2309.14032) | 2023 | NeurIPS 2023 | 発展 | ACO の η を GNN で学習。ReEvo の比較対象 | ↪ 既存：deep-learning-fusion p.4 |
| 28 | [Evolution through Large Models](https://arxiv.org/abs/2206.08896)（ELM） | 2022 | arXiv | 原典 | コード LLM を GP の変異演算子にした起点 | ↪ 既存：ga-hybrid p.5 |
| 29 | [Evolution of Heuristics](https://arxiv.org/abs/2401.02051)（EoH） | 2024 | ICML 2024 | 発展 | 考えとコードを共進化させる LLM 設計。ReEvo・BehaveSim の比較対象 | ↪ 既存：ga-hybrid p.6 |
| 30 | [LLaMEA: A Large Language Model Evolutionary Algorithm for Automatically Generating Metaheuristics](https://arxiv.org/abs/2405.20132) | 2024 | IEEE TEVC 2025 | 発展 | メタヒューリスティクス全体を LLM で生成。HADA の比較対象 | ↪ 既存：ga-hybrid p.7 |
| 31 | [METAFOR](https://arxiv.org/abs/2502.11225) | 2025 | arXiv | 最新 | PSO/DE/CMA-ES の融合を irace で自動設計 | ↪ 既存：ga-hybrid p.8 |
| 32 | [Framework for identifying the equivalence between Nature-Inspired Metaheuristics](https://arxiv.org/abs/2603.28255) | 2026 | arXiv | 最新 | 挙動に基づく等価性判定。BehaveSim と相補的 | ↪ 既存：foundations p.11 |
