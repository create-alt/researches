## 自動設計アルゴリズムの評価基盤（algo-evaluation/）

### 調査履歴
- 2026-10-24: LLM が生成・自動設計した最適化アルゴリズムを「どう評価するか」に絞って調べた。arXiv API で「automated algorithm design / automated heuristic design × benchmark / generalization」「BBOB × overfitting / bias」「IOHprofiler」「structural bias」「performance profiles」などを検索し、Web 検索で補った。手法そのもの（LLaMEA・EoH・ReEvo など）は既存デッキと open-endedness/llm-driven-evolution に任せ、評価方法の論文だけを選んだ。
- 最新の論点は 3 つあった。①生成手法が学習分布の外へ汎化するか（Sim+ 2025 の bin packing、BLADE）、②生成手法を性能以外の振る舞いで分析する（Behaviour Space Analysis）、③評価に使う問題自体を LLM で作る（EoTF ほか 2026 年の 3 本）。そこから 4 つの系譜を原典までさかのぼった。性能の集約は Dolan & Moré 2002 → COCO → IOHanalyzer、統計的比較は Benavoli+ 2017 → Mattos+ 2021（IRT）、偏りの検出は Kononova+ 2015（構造的バイアス）、分布外評価は MA-BBOB。
- スライドにした 11 本はすべて arXiv 版の全文を読んだ（2023 年以降のものは HTML 版の図を使った）。採録先は Crossref で確かめた（EoTF は IEEE TEVC 2026、Behaviour Space Analysis は CCIS 2026、MA-BBOB は ACM TELO 2025）。Mattos+ 2021 は採録先が見つからず、arXiv プレプリントとして扱った。
- 既存デッキと重ならないようにした。Kudela 2023・Vermetten+ 2024・Fister+ 2026 は foundations、BehaveSim・MetaBox-v2・HADA・FunSearch は metabbo、LLaMEA・EoH は ga-hybrid にあるので、本デッキでは参照だけにした。

### 系譜
```
【性能の集約・ベンチマーク基盤】
Dolan & Moré 2002 performance profile ✅ ─→ Moré & Wild 2009 data profile ⚠
   └→ COCO / BBOB (Hansen+ 2016→2021) ✅ ── anytime 評価・ERT・runtime ECDF
         ├→ IOHprofiler 2018 (参照) → IOHanalyzer 2022 ✅ → EAF (López-Ibáñez+ 2024, 参照)
         └→ BBOB の偏り：中心バイアス Kudela 2023 (↪foundations)／294手法評価 Vermetten+ 2024 (↪foundations)
               └→ 分布外評価：MA-BBOB (Vermetten+ 2023→2025) ✅ → SBOX-COST (未調査)

【統計的比較】
Demšar 2006 NHST ⚠・Derrac+ 2011 ノンパラ検定 ⚠
   └→ Benavoli+ 2017 Bayesian 検定＋rope ✅ → Calvo+ 2019 Bayesian BBO 解析 ⚠
         └→ Mattos+ 2021 IRT によるスイート評価 ✅

【偏りの検出（中心バイアス以外も）】
Kononova+ 2015 構造的バイアス（f0 プローブ）✅ → Deep-BIAS 2023 (参照) → Kudela+ 2026 多目的 SB (参照)

【LLM 生成アルゴリズムの評価（2025〜2026）】
LLaMEA 2024 (↪ga-hybrid)・EoH 2024 (↪ga-hybrid)・FunSearch 2024 (↪metabbo)
   ├→ 汎化の検証：Beyond the Hype (Sim+ 2025) ✅ ─┐
   ├→ ベンチマーク基盤：BLADE (van Stein+ 2025) ✅ ←┘（MA-BBOB を学習20/検証50で採用）
   │      └→ Code Evolution Graphs 2025 (参照) → Behaviour Space Analysis 2025 ✅
   │             ↔ BehaveSim 2026 (↪metabbo)・等価性判定 Fister+ 2026 (↪foundations)
   ├→ 組合せ最適化のベンチマーク：HeuriGym 2025・FrontierCO 2025・FrontierOR 2026 (参照)
   └→ 評価問題の自動生成：EoTF (Achtelik+ 2026) ✅・EoB 2026・LLM-EBG 2026・Skvorc+ 2026 (参照)
✅=スライド化 ⚠=本文未確認 (参照)=要旨のみ確認
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Benchmarking Optimization Software with Performance Profiles](https://arxiv.org/abs/cs/0102001) | 2002 | Math. Program. 91 | 原典 | 性能比の累積分布 ρ_s(τ) で、勝率と頑健性をまとめて見せる。COPS で LOQO が全τで上位になった。 | ✅ p.2 |
| 2 | [Structural bias in population-based algorithms](https://arxiv.org/abs/1408.5350) | 2015 | Information Sciences 298 | 原典 | 一様乱数関数 f0 で地形の影響を消し、GA・PSO の構造的バイアスを検出した。集団サイズでバイアスが増幅される。 | ✅ p.3 |
| 3 | [Time for a Change: a Tutorial for Comparing Multiple Classifiers Through Bayesian Analysis](https://arxiv.org/abs/1606.04316) | 2017 | JMLR 18 | 原典 | NHST の代わりに、rope 付きの Bayesian t / signed-rank 検定と階層モデルを使うことを提案した。 | ✅ p.4 |
| 4 | [COCO: A Platform for Comparing Continuous Optimizers in a Black-Box Setting](https://arxiv.org/abs/1603.08785) | 2021 | Optim. Methods Softw. 36 | 原典 | BBOB・インスタンス・目標精度・runtime ECDF による、予算に依存しない比較基盤。 | ✅ p.5 |
| 5 | [On the Assessment of Benchmark Suites for Algorithm Comparison](https://arxiv.org/abs/2104.07381) | 2021 | arXiv プレプリント | 発展 | ベイズ IRT で関数の難易度と識別力を推定した。BBOB は難しすぎ、PBO は易しすぎるという結果。 | ✅ p.6 |
| 6 | [IOHanalyzer: Detailed Performance Analyses for Iterative Optimization Heuristics](https://arxiv.org/abs/2007.03953) | 2022 | ACM TELO 2(1) | 発展 | 固定目標・固定予算の両方の視点で対話的に解析する。KS 検定、Glicko-2、Shapley 値を備えた IOHprofiler の解析部。 | ✅ p.7 |
| 7 | [MA-BBOB: A Problem Generator for Black-Box Optimization Using Affine Combinations and Shifts](https://arxiv.org/abs/2312.11083) | 2025 | ACM TELO 5 | 発展 | BBOB 関数をアフィン結合し、最適解を一様に置く生成器。BBOB で学習した選択器は MA-BBOB に汎化しなかった。 | ✅ p.8 |
| 8 | [Beyond the Hype: Benchmarking LLM-Evolved Heuristics for Bin Packing](https://arxiv.org/abs/2501.11411) | 2025 | EvoApplications 2025 | 最新 | FunSearch と EoH の生成手法を 6064 インスタンスで評価した。分布外に汎化せず、Best-Fit が総合 1 位。 | ✅ p.9 |
| 9 | [BLADE: Benchmark suite for LLM-driven Automated Design and Evolution of iterative optimisation heuristics](https://arxiv.org/abs/2504.20183) | 2025 | GECCO 2025 Companion | 最新 | LLM による AAD のベンチマーク基盤。学習/検証の分割、全ログの記録、CEG、IOHanalyzer 連携を備える。 | ✅ p.10 |
| 10 | [Behaviour Space Analysis of LLM-driven Meta-heuristic Discovery](https://arxiv.org/abs/2507.03605) | 2025 | CCIS 2026 | 最新 | 行動指標・CEG・STN で、LLaMEA が生成した手法の振る舞いを分析した。(1+1) 精鋭＋2種プロンプトの構成が最良。 | ✅ p.11 |
| 11 | [Automatic Design of Optimization Test Problems with Large Language Models](https://arxiv.org/abs/2602.02724) | 2026 | IEEE TEVC | 最新 | 目標 ELA に合うテスト関数を LLM で進化させる EoTF。手法の順位を保ち、3 次元以上では NN 生成に勝つ。 | ✅ p.12 |
| 12 | [Statistical Comparisons of Classifiers over Multiple Data Sets (Demšar)](https://jmlr.org/papers/v7/demsar06a.html) | 2006 | JMLR 7 | 原典 | Friedman＋Nemenyi など、NHST による多重比較の定番手順（検索情報に基づく）。jmlr.org にこの環境から到達できなかった。 | ⚠️ 本文未確認 |
| 13 | [A practical tutorial on the use of nonparametric statistical tests … evolutionary and swarm intelligence algorithms (Derrac+)](https://doi.org/10.1016/j.swevo.2011.02.002) | 2011 | Swarm Evol. Comput. 1(1) | 原典 | 群知能・進化計算でノンパラメトリック検定を使う手順の定番チュートリアル（検索情報に基づく）。OA 版はなし。 | ⚠️ 本文未確認 |
| 14 | [Benchmarking Derivative-Free Optimization Algorithms (Moré & Wild)](https://doi.org/10.1137/080724083) | 2009 | SIAM J. Optim. | 発展 | performance profile を拡張した data profile（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 15 | [Bayesian performance analysis for black-box optimization benchmarking (Calvo+)](https://doi.org/10.1145/3319619.3326888) | 2019 | GECCO 2019 Companion | 発展 | Bayesian 順位モデルを BBO の比較に持ち込んだ（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 16 | [Anytime Performance Assessment in Blackbox Optimization Benchmarking (Hansen+)](https://doi.org/10.1109/tevc.2022.3210897) | 2022 | IEEE TEVC 26(6) | 発展 | COCO の anytime 評価の理論。AOCC の根拠として LLaMEA 系の論文が引用している（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 17 | [IOHprofiler: A Benchmarking and Profiling Tool for Iterative Optimization Heuristics](https://arxiv.org/abs/1810.05281) | 2018 | arXiv | 発展 | IOHanalyzer の前身となる全体構想。p.7 で代表させた。 | — 参照のみ |
| 18 | [Benchmarking in Optimization: Best Practice and Open Issues](https://arxiv.org/abs/2007.03488) | 2020 | arXiv | 発展 | ベンチマークの目的・問題選択・解析の作法をまとめたサーベイ（要旨のみ確認）。 | — 参照のみ |
| 19 | [Using the Empirical Attainment Function for Analyzing Single-objective Black-box Optimization Algorithms](https://arxiv.org/abs/2404.02031) | 2024 | IEEE TEVC | 発展 | target ECDF は EAF の近似で、AOCC と等価な指標があることを示した（要旨のみ確認）。BLADE が採用。 | — 参照のみ |
| 20 | [MA-BBOB: Many-Affine Combinations of BBOB Functions for Evaluating AutoML Approaches …](https://arxiv.org/abs/2306.10627) | 2023 | AutoML 2023 | 発展 | MA-BBOB の会議版。p.8 の TELO 版に統合した。 | — 参照のみ |
| 21 | [BBOB Instance Analysis: Landscape Properties and Algorithm Performance across Problem Instances](https://arxiv.org/abs/2211.16318) | 2022 | arXiv | 発展 | BBOB のインスタンス間で ELA 特徴と性能がずれることを示した（要旨のみ確認）。 | — 参照のみ |
| 22 | [Deep-BIAS: Detecting Structural Bias using Explainable AI](https://arxiv.org/abs/2304.01869) | 2023 | arXiv | 発展 | 構造的バイアスの種類を深層学習で判別する（要旨のみ確認）。 | — 参照のみ |
| 23 | [Structural bias in multi-objective optimisation](https://arxiv.org/abs/2602.06742) | 2026 | arXiv | 最新 | SB を多目的に拡張し、情報のない多目的テスト問題を提案した（要旨のみ確認、手法提案段階）。 | — 参照のみ |
| 24 | [Code Evolution Graphs: Understanding Large Language Model Driven Design of Algorithms](https://arxiv.org/abs/2503.16668) | 2025 | GECCO 2025 | 発展 | LLM 生成コードの静的特徴の系譜を可視化した。p.10–11 の論文で内容を取り込んだため単独ではスライド化していない。 | — 参照のみ |
| 25 | [Can Large Language Models Reinvent Foundational Algorithms?](https://arxiv.org/abs/2604.05716) | 2026 | arXiv | 最新 | アンラーニング後の再発明率から、LLM の新規性が暗記に依存していることを示した（要旨のみ確認）。最適化に限らないため対象外。 | — 参照のみ |
| 26 | [HeuriGym: An Agentic Benchmark for LLM-Crafted Heuristics in Combinatorial Optimization](https://arxiv.org/abs/2506.07972) | 2025 | ICLR 2026 | 最新 | 9 問題と Quality-Yield Index による、組合せ最適化ヒューリスティクスのベンチマーク（要旨のみ確認）。 | — 参照のみ |
| 27 | [FrontierCO: Real-World and Large-Scale Evaluation of Machine Learning Solvers for Combinatorial Optimization](https://arxiv.org/abs/2505.16952) | 2025 | ICLR 2026 | 最新 | 実問題・大規模インスタンスで ML/LLM ソルバと古典ソルバの差を測った（要旨のみ確認）。 | — 参照のみ |
| 28 | [FrontierOR: Benchmarking LLMs' Capacity for Efficient Algorithm Design in Large-Scale Optimization](https://arxiv.org/abs/2605.25246) | 2026 | arXiv | 最新 | OR 論文由来の 180 課題。one-shot の最良モデルが Gurobi に勝ったのは 31%（要旨のみ確認）。 | — 参照のみ |
| 29 | [A Closer Look at Agentic BBO: Benchmarking LLM Agents for Black-Box Optimization](https://arxiv.org/abs/2610.12183) | 2026 | arXiv | 最新 | 5 領域で LLM エージェントの BBO を統一プロトコルで比較した（要旨のみ確認）。生成アルゴリズムではなくエージェントの評価。 | — 参照のみ |
| 30 | [Evolution of Benchmark: Black-Box Optimization Benchmark Design through Large Language Model](https://arxiv.org/abs/2601.21877) | 2026 | arXiv | 最新 | 地形の多様性と手法の識別力の 2 目的で、LLM がベンチマークを設計する（要旨のみ確認）。 | — 参照のみ |
| 31 | [An Evolutionary Framework for Automatic Optimization Benchmark Generation via Large Language Models](https://arxiv.org/abs/2601.12723) | 2026 | arXiv | 最新 | GA と DE の性能差を最大化する問題を LLM で生成した（要旨のみ確認）。 | — 参照のみ |
| 32 | [LLM Driven Design of Continuous Optimization Problems with Controllable High-level Properties](https://arxiv.org/abs/2601.18846) | 2026 | EvoApplications 2026 | 最新 | LLaMEA で高次の地形特性を指定して問題を生成した（要旨のみ確認）。 | — 参照のみ |
| 33 | [Evaluating Real-World Generalizability of Algorithm Selection Models](https://arxiv.org/abs/2606.02016) | 2026 | arXiv | 最新 | BBOB/CEC で学習した選択器を実問題（ロボット・UAV）へ移すと汎化しない（要旨のみ確認）。 | — 参照のみ |
| 34 | [Re-evaluating LLM-based Heuristic Search: A Case Study on the 3D Packing Problem](https://arxiv.org/abs/2509.02297) | 2025 | arXiv | 最新 | LLM が scoring 関数ばかり改良するという事前学習の偏りを指摘した（要旨のみ確認）。 | — 参照のみ |
| 35 | [AdaEva: Accelerating LLM-Driven Algorithm Design with Adaptive Partial Evaluation](https://arxiv.org/abs/2610.03896) | 2026 | arXiv | 最新 | racing・successive halving で評価コストを下げ、held-out での汎化も改善した（要旨のみ確認）。 | — 参照のみ |
| 36 | [MOSAIC: Adversarial Co-evolution of Specialist Heuristics and Problem Instances for LLM-based Automated Heuristic Design](https://arxiv.org/abs/2608.07544) | 2026 | arXiv | 最新 | ヒューリスティクスとインスタンスを敵対的に共進化させる（タイトルのみ確認）。 | — 参照のみ |
| 37 | [Multi-Task Evolution for Zero-Shot Cross-Problem Generalization using LLMs (MECo)](https://arxiv.org/abs/2610.03316) | 2026 | arXiv | 最新 | 問題間の汎化（ID/OOD）を評価軸にした AHD 手法（要旨のみ確認）。 | — 参照のみ |
| 38 | [From Heuristic Selection to Automated Algorithm Design: LLMs Benefit from Strong Priors](https://arxiv.org/abs/2603.02792) | 2026 | arXiv | 最新 | ベンチマークの既存アルゴリズムを事前知識として与えると LLM の設計が良くなる（要旨のみ確認）。 | — 参照のみ |
| 39 | [The Evolutionary Computation Methods No One Should Use](https://arxiv.org/abs/2301.01984) | 2023 | arXiv | 発展 | 中心バイアスの検出。 | ↪ 既存：swarm-intelligence/foundations p.7 |
| 40 | [Large-scale Benchmarking of Metaphor-based Optimization Heuristics](https://arxiv.org/abs/2402.09800) | 2024 | GECCO 2024 | 発展 | 294 手法の BBOB 評価。AOCC を使う。 | ↪ 既存：swarm-intelligence/foundations p.8 |
| 41 | [Framework for identifying the equivalence between Nature-Inspired Metaheuristics](https://arxiv.org/abs/2603.28255) | 2026 | arXiv | 最新 | 挙動の特徴ベクトルによる等価性の判定。 | ↪ 既存：swarm-intelligence/foundations p.11 |
| 42 | [Rethinking Code Similarity for Automated Algorithm Design with LLMs (BehaveSim)](https://arxiv.org/abs/2603.02787) | 2026 | ICLR 2026 | 最新 | 行動に基づく生成コードの類似度。 | ↪ 既存：swarm-intelligence/metabbo p.10 |
| 43 | [MetaBox-v2: A Unified Benchmark Platform for Meta-Black-Box Optimization](https://arxiv.org/abs/2505.17745) | 2025 | arXiv | 最新 | MetaBBO のベンチマーク基盤。 | ↪ 既存：swarm-intelligence/metabbo p.8 |
| 44 | [LLaMEA: A Large Language Model Evolutionary Algorithm for Automatically Generating Metaheuristics](https://arxiv.org/abs/2405.20132) | 2024 | IEEE TEVC | 発展 | BLADE・BSA の土台となる生成フレームワーク。 | ↪ 既存：swarm-intelligence/ga-hybrid p.7 |
| 45 | [Evolution of Heuristics (EoH)](https://arxiv.org/abs/2401.02051) | 2024 | ICML 2024 | 発展 | Sim+ 2025 の評価対象であり、EoTF の土台。 | ↪ 既存：swarm-intelligence/ga-hybrid p.6 |
| 46 | [Mathematical discoveries from program search with large language models (FunSearch)](https://doi.org/10.1038/s41586-023-06924-6) | 2024 | Nature | 発展 | Sim+ 2025 の評価対象。 | ↪ 既存：swarm-intelligence/metabbo p.5 |
| 47 | [CVaR-RMD: CVaR Selection Pressure for Robust Metaheuristic Discovery](https://arxiv.org/abs/2610.25697) | 2026 | Findings of EMNLP 2026 | 最新 | 頑健性（下側リスク）を選択圧に入れた生成手法（要旨のみ確認）。metabbo で参照済み。 | — 参照のみ |
