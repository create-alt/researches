## 粒子系最適化の理論の拡張（ES/CMA-ES 統一・多目的/二層/ゲーム・ランタイム解析）（particle-theory/）

### 調査履歴
- 2026-10-24: cbo-mean-field 調査の推奨テーマ 1〜3 を受け、arXiv API で「consensus-based ×（anisotropic / covariance / CMA-ES / evolution strategies）」「consensus-based ×（multi-objective / saddle / bilevel / federated / game）」「runtime analysis ×（NSGA-II / NSGA-III / SMS-EMOA / MOEA）」「runtime ×（EDA / cGA / UMDA）」「CMA-ES / IGO の収束」を新しい順に洗い出した。
- 2026 年の最新（離散時間 IGO の収束 Kimura & Akimoto、ES/OVI/CBO の統一 Ackermann & Peluchetti、構造を活かす異方性 CBO Bonandin+、動的個体数 MOEA Opris、多値 cGA Krejca & Witt）から入り、ES/CMA-ES 側は IGO（Ollivier+ 2017）、CBO 側は異方性 CBO（Fornasier+ 2022）、離散ランタイム側は NSGA-II の初解析（Zheng & Doerr 2022）を原典・転換点として遡った。CBO の応用枝は多目的（AM-CBO）・鞍点（CBO-SP）・連合学習（FedCBO）・二層（CB²O）を 1 本ずつ選んだ。
- スライド化した 12 本はすべて arXiv 版で本文を読んだ（理論論文は定理の主張と証明方針まで。付録の細かな証明は概略）。図は arXiv HTML 版の画像、なければ PDF ページを切り抜いた（Krejca & Witt と Opris は図がないため Algorithm 1 を使用）。発表先は arXiv のコメント欄・Crossref・検索で確認した。
- 既存デッキ（cbo-mean-field の CBO 原典・Fornasier+ 2021/2026・CBS・Constrained CBO・Gerber+ 2025・Göttlich+ 2025、foundations の Huang+ 2022・Borghi+ 2026、aco-neural の Kötzing+ 2011・Kergaßner+ 2024・Manthey+ 2025）は再掲せず ↪ で参照した。

### 系譜
```
【ES/CMA-ES と情報幾何】
  NES (Wierstra+ 2008) / CMA-ES = 自然勾配 (Akimoto+ 2010)
        └→ IGO (Ollivier+ 2017) ✅ 原典（分位点重み＋Fisher 自然勾配で CMA-ES・xNES・PBIL・cGA・CEM を統一）
              ├→ IGO-flow の収束 (Glasmachers 2012, Akimoto+ 2012) → ODE 法 (Akimoto+ 2022)
              ├→ Beyond IGO-Flow (Kimura & Akimoto 2026) ✅ 最新（離散時間・フル共分散・分位重みでの収束）
              ├→ Bridging ES/OVI/CBO (Ackermann & Peluchetti 2026) ✅ 最新（ES・OVI・CH・CBO・DiffEvo を一つの更新式に）
              └→ 【EDA ランタイム】 cGA/UMDA の解析 (Sudholt & Witt 2016, Krejca & Witt 2018 サーベイ)
                       → 多値 EDA (Ben Jedidia+ 2024, Adak & Witt 2024/2025) → r-cGA on G-OneMax (Krejca & Witt 2026) ✅ 最新

【CBO の平均場理論の拡張】
  CBO (Pinnau+ 2017) ↪既存 → CBO 大域収束 (Fornasier+ 2021) ↪既存 → CBO→ES (Fornasier+ 2026) ↪既存
        ├→ Anisotropic CBO (Fornasier+ 2022) ✅ 発展（次元非依存の率 2λ−σ²）
        │       └→ Structure-exploiting aniso CBO (Bonandin+ 2026) ✅ 最新（内在次元 d のみに依存）
        ├→ 【多目的】 M-CBO (Borghi+ 2022) → AM-CBO (Borghi+ 2023) ✅ 発展 → Wozniak 2025（ロボット経路計画）
        ├→ 【ゲーム】 CBO-SP (Huang+ 2024) ✅ 発展 → 多人数ゲーム (Chenchene+ 2023) → Huang & Warnett 2025/2026（平均場極限）
        │                                    → UiT propagation of chaos for minimax (Bayraktar+ 2026)
        ├→ 【機械学習】 FedCBO (Carrillo+ 2024) ✅ 発展 → 頑健連合学習 (García Trillos+ 2024)
        └→ 【二層】 CB²O (García Trillos+ 2024) ✅ 発展 → SCB²O (Chao+ 2026)（滑らか分位で有限粒子保証）
                    ／ multiscale multi-level CBO (Herty+ 2024)

【多目的 EA のランタイム解析】
  SEMO/GSEMO (Laumanns+ 2002, Giel 2003)
        └→ NSGA-II runtime (Zheng & Doerr 2022) ✅ 原典（保存補題＋待ち時間）
              ├→ NSGA-III (Wietheger & Doerr 2023 → Opris 2025 タイト界) ／ SMS-EMOA (Zheng & Doerr 2024) ／ SPEA2 (→ SPEA2+, Dang+ 2026)
              └→ NSGA-II-DYN (Opris 2026) ✅ 最新（動的個体数で Ω(√n/log n) 倍の高速化）
  【共進化・ゲーム】 Lehre 2022（maximin の共進化 EA ランタイム）→ Benford & Lehre 2024
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Information-Geometric Optimization Algorithms: A Unifying Picture via Invariance Principles](https://arxiv.org/abs/1106.3708) | 2017 | JMLR | 原典 | 分位点重みの Fisher 自然勾配流 IGO を定義し、CMA-ES（rank-μ）・xNES・PBIL・cGA・CEM を再導出。臨界学習率と RBM による多峰保持も示す。 | ✅ p.2 |
| 2 | [Convergence of Anisotropic Consensus-Based Optimization in Mean-Field Law](https://arxiv.org/abs/2111.08136) | 2022 | EvoApplications | 発展 | 異方性 CBO が次元非依存の率 (2λ−σ²) で平均場則の大域収束をすることを証明。MNIST を 100 粒子で約 97%。 | ✅ p.3 |
| 3 | [Mathematical Runtime Analysis for the Non-Dominated Sorting Genetic Algorithm II (NSGA-II)](https://arxiv.org/abs/2112.08581) | 2022 | AAAI 2022 / AIJ 2023 | 原典 | NSGA-II 初のランタイム解析。N≥4(n+1) で OneMinMax O(n log n)、LOTZ O(n²) 世代。N=n+1 では指数時間。 | ✅ p.4 |
| 4 | [An Adaptive Consensus Based Method for Multi-objective Optimization with Uniform Pareto Front Approximation](https://arxiv.org/abs/2208.01362) | 2023 | Appl. Math. Optim. | 発展 | Chebyshev 重みを持つ粒子の CBO と、重み空間の斥力ポテンシャル勾配流で一様なパレートフロントを得る AM-CBO。 | ✅ p.5 |
| 5 | [Consensus-Based Optimization for Saddle Point Problems](https://arxiv.org/abs/2212.12334) | 2024 | SIAM J. Control Optim. | 発展 | min/max の 2 群が互いの平均で合意点を計算する CBO-SP。非凸非凹で鞍点への合意を平均場で証明。 | ✅ p.6 |
| 6 | [FedCBO: Reaching Group Consensus in Clustered Federated Learning through Consensus-based Optimization](https://arxiv.org/abs/2305.02894) | 2024 | JMLR | 発展 | 所属未知のクラスタ型連合学習を CBO 型粒子系で解く。回転 MNIST で 96.51%（IFCA 94.44%）。 | ✅ p.7 |
| 7 | [CB²O: Consensus-Based Bi-Level Optimization](https://arxiv.org/abs/2411.13394) | 2024 | arXiv | 発展 | 下位目的の分位選抜＋上位目的の Gibbs 重みで合意点を作る二層 CBO。平均場解の存在と W₂ 指数収束。 | ✅ p.8 |
| 8 | [Runtime Analysis of a Compact Genetic Algorithm on a Truly Multi-valued OneMax Function](https://arxiv.org/abs/2605.29477) | 2026 | PPSN 2026 | 最新 | r 値 cGA の G-OneMax ランタイムを O(nr log³n log³r) に改善（従来 O(nr³ log²n log r)）。 | ✅ p.9 |
| 9 | [Beyond IGO-Flow: Toward Convergence Analysis of IGO in Continuous Spaces](https://arxiv.org/abs/2606.17523) | 2026 | PPSN 2026 | 最新 | 離散時間・フル共分散・分位重みの Gaussian IGO で、共分散→0 と条件数仮定下の平均の収束を証明。 | ✅ p.10 |
| 10 | [Bridging Spherical Black-Box Optimizers](https://arxiv.org/abs/2606.25761) | 2026 | ICML 2026 | 最新 | ES・OVI・CH・CBO・pCBO・cCBO・DiffEvo を一つのマスター更新式で統一し、CH≡OVI を示して ES-OVI・AdaPol を提案。 | ✅ p.11 |
| 11 | [Exploiting Structure with Anisotropic Consensus-Based Optimization](https://arxiv.org/abs/2607.10205) | 2026 | arXiv | 最新 | 加法分離な目的で異方性 CBO の計算量が内在次元 d のみに指数依存することを、離散・有限粒子で証明。 | ✅ p.12 |
| 12 | [Provable Speedups From Dynamic Population Sizes in Evolutionary Algorithms for Multiobjective Optimization](https://arxiv.org/abs/2607.23800) | 2026 | arXiv | 最新 | 動的個体数 NSGA-II-DYN と GSEMO が CLIMB を O(n log n)、固定個体数 NSGA-II は Ω(n^1.5) 評価。 | ✅ p.13 |
| 13 | [A consensus-based model for global optimization and its mean-field limit](https://arxiv.org/abs/1604.05648) | 2017 | M3AS | 原典 | CBO の原典。 | ↪ 既存：swarm-intelligence/cbo-mean-field p.2 |
| 14 | [Consensus-based optimization methods converge globally](https://arxiv.org/abs/2103.15130) | 2021 | SIAM J. Optim. | 発展 | 等方性 CBO の大域収束（率 2λ−dσ²）。異方性版・CB²O・FedCBO の証明の雛形。 | ↪ 既存：swarm-intelligence/cbo-mean-field p.5 |
| 15 | [Consensus Based Sampling](https://arxiv.org/abs/2106.02519) | 2022 | Stud. Appl. Math. | 発展 | 重み付き共分散を使う CBS。共分散適応 CBO の手がかり。 | ↪ 既存：swarm-intelligence/cbo-mean-field p.6 |
| 16 | [From Consensus-Based Optimization to Evolution Strategies: Proof of Global Convergence](https://arxiv.org/abs/2602.11677) | 2026 | arXiv | 最新 | δ-CBO→CF→CH(=MPPI=(1,N)-ES) の大域収束。本テーマの ES 統一の出発点。 | ↪ 既存：swarm-intelligence/cbo-mean-field p.10 |
| 17 | [On the Global Convergence of Particle Swarm Optimization Methods](https://arxiv.org/abs/2201.12460) | 2022 | Appl. Math. Optim. | 発展 | PSO の平均場大域収束。 | ↪ 既存：swarm-intelligence/foundations p.6 |
| 18 | [Simple Max-Min Ant Systems and the Optimization of Linear Pseudo-Boolean Functions](https://arxiv.org/abs/1007.4707) | 2011 | FOGA 2011 | 発展 | ACO のランタイム解析（離散側の先行例）。 | ↪ 既存：swarm-intelligence/aco-neural p.3 |
| 19 | [Consensus-based optimization for closed-box adversarial attacks and a connection to evolution strategies](https://arxiv.org/abs/2506.24048) | 2025 | arXiv | 最新 | CBO と NES の接続（CH）を敵対的攻撃で示す（アブストラクトと Bridging の整理で確認）。 | — 参照のみ |
| 20 | [Uniform-in-time propagation of chaos for consensus-based minimax algorithm](https://arxiv.org/abs/2602.14403) | 2026 | arXiv | 最新 | CBO-SP 型 minimax で O(1/N₁+1/N₂) の一様時間 PoC（アブストラクトと序論で確認）。CBO-SP を優先しスライド化せず | — 参照のみ |
| 21 | [Well-posedness and mean-field limit estimate of a consensus-based algorithm for min-max problems](https://arxiv.org/abs/2602.12886) | 2026 | arXiv | 最新 | min-max CBO の適切性と平均場極限（タイトルと検索結果で確認）。 | — 参照のみ |
| 22 | [Well-posedness and mean-field limit estimate of a consensus-based algorithm for multiplayer games](https://arxiv.org/abs/2505.13632) | 2025 | arXiv | 発展 | 多人数ゲーム CBO の平均場極限（タイトルと検索結果で確認）。 | — 参照のみ |
| 23 | [A consensus-based algorithm for non-convex multiplayer games](https://arxiv.org/abs/2311.08270) | 2023 | arXiv | 発展 | ナッシュ均衡探索の CBO（タイトルで確認）。 | — 参照のみ |
| 24 | [A consensus-based algorithm for multi-objective optimization and its mean-field description](https://arxiv.org/abs/2203.16384) | 2022 | CDC 2022 | 発展 | M-CBO の原論文（6 ページの会議版、本文を流し読み）。理論は AM-CBO で拡張されるためスライド化せず | — 参照のみ |
| 25 | [Consensus-Based Optimization for Multi-Objective Problems: A Multi-Swarm Approach](https://arxiv.org/abs/2211.15737) | 2022 | arXiv | 発展 | 多群 CBO による多目的最適化（タイトルで確認）。 | — 参照のみ |
| 26 | [Unification of Consensus-Based Multi-Objective Optimization and Multi-Robot Path Planning](https://arxiv.org/abs/2504.09577) | 2025 | arXiv | 最新 | 多目的 CBO とロボット経路計画の統一（タイトルで確認）。 | — 参照のみ |
| 27 | [Defending Against Diverse Attacks in Federated Learning Through Consensus-Based Bi-Level Optimization](https://arxiv.org/abs/2412.02535) | 2024 | arXiv | 発展 | CB²O の頑健連合学習への応用（タイトルと CB²O 本文の言及で確認）。 | — 参照のみ |
| 28 | [Convergence of Consensus-Based Particle Methods for Nonconvex Bi-Level Optimization](https://arxiv.org/abs/2605.19667) | 2026 | arXiv | 最新 | 滑らかな分位選抜の SCB²O で有限粒子の高確率保証（序論まで確認）。CB²O を優先しスライド化せず | — 参照のみ |
| 29 | [A multiscale Consensus-Based algorithm for multi-level optimization](https://arxiv.org/abs/2407.09257) | 2024 | arXiv | 発展 | 多段階最適化の多重スケール CBO（タイトルで確認）。 | — 参照のみ |
| 30 | [From Mean-Field Limits to Semiclassical Concentration: Global Convergence of the Canonical Evolutionary Strategy](https://arxiv.org/abs/2605.30371) | 2026 | arXiv | 最新 | 複製-変異方程式の半古典極限で ES の大域収束を論じ、CBO の分散崩壊と対比（アブストラクトで確認）。 | — 参照のみ |
| 31 | [Strong Global Convergence of the Consensus-Based Optimization Algorithm](https://arxiv.org/abs/2512.10654) | 2025 | arXiv | 最新 | 離散時間 CBO の強収束と Δt・N の率（Bonandin+ 2026 の本文中の記述で確認）。 | — 参照のみ |
| 32 | [Towards a Rigorous Understanding of the Population Dynamics of the NSGA-III: Tight Runtime Bounds](https://arxiv.org/abs/2511.07125) | 2025 | AAAI 2026 | 最新 | NSGA-III の 2-OMM でのタイトな下界 Ω(n² log n/μ)（アブストラクトで確認）。 | — 参照のみ |
| 33 | [SPEA2+: Improved Density Estimation in SPEA2 with Provable Runtime Guarantees](https://arxiv.org/abs/2606.12382) | 2026 | PPSN 2026 | 最新 | SPEA2 が OneTrapZeroTrap で失敗することを示し改良版 SPEA2+ を提案（アブストラクトで確認）。 | — 参照のみ |
| 34 | [A Mathematical Runtime Analysis of the Non-dominated Sorting Genetic Algorithm III (NSGA-III)](https://arxiv.org/abs/2211.08202) | 2023 | IJCAI 2023 | 発展 | NSGA-III の初ランタイム解析（タイトルで確認）。 | — 参照のみ |
| 35 | [Runtime Analysis of the SMS-EMOA for Many-Objective Optimization](https://arxiv.org/abs/2312.10290) | 2024 | AAAI 2024 | 発展 | SMS-EMOA の多目的ランタイム解析（タイトルで確認）。 | — 参照のみ |
| 36 | [Runtime Analysis of Competitive co-Evolutionary Algorithms for Maximin Optimisation of a Bilinear Function](https://arxiv.org/abs/2206.15238) | 2022 | GECCO 2022 / Algorithmica | 発展 | 共進化 EA（PDCoEA）の maximin 問題での多項式時間保証。ゲームの離散側（アブストラクトと序論で確認）。 | — 参照のみ |
| 37 | [Runtime Analysis of the Compact Genetic Algorithm on the LeadingOnes Benchmark](https://arxiv.org/abs/2501.16250) | 2025 | arXiv | 最新 | cGA の LeadingOnes 解析（タイトルで確認）。 | — 参照のみ |
| 38 | [Theory of Estimation-of-Distribution Algorithms](https://arxiv.org/abs/1806.05392) | 2018 | 書籍章 | 発展 | EDA ランタイム理論のサーベイ（タイトル・目次で確認）。 | — 参照のみ |
| 39 | [Update Strength in EDAs and ACO: How to Avoid Genetic Drift](https://arxiv.org/abs/1607.04063) | 2016 | GECCO 2016 | 発展 | cGA の更新強度と遺伝的浮動の古典的解析（タイトルで確認）。 | — 参照のみ |
| 40 | [Natural Gradient Interpretation of Rank-One Update in CMA-ES](https://arxiv.org/abs/2406.16506) | 2024 | PPSN 2024 | 発展 | CMA-ES の rank-one 更新（IGO の外にあった部分）を自然勾配で解釈（タイトルで確認）。 | — 参照のみ |
| 41 | [Global linear convergence of Evolution Strategies with recombination on scaling-invariant functions](https://arxiv.org/abs/2107.08847) | 2021 | J. Glob. Optim. | 発展 | 組換え付き ES の大域線形収束（タイトルで確認）。 | — 参照のみ |
| 42 | [Drift Theory in Continuous Search Spaces: Expected Hitting Time of the (1+1)-ES with 1/5 Success Rule](https://arxiv.org/abs/1802.03209) | 2018 | GECCO 2018 | 発展 | 連続空間でのドリフト解析によるランタイム（タイトルで確認）。連続と離散のランタイム理論の橋。 | — 参照のみ |
