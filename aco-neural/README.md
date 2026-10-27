## ACO の系譜と Neural ACO による大規模組合せ最適化（aco-neural/）

### 調査履歴
- 2026-10-23: arXiv API（`ti:"ant colony"` と runtime/convergence/Markov、`abs:"ant colony"` と neural/LLM/TSP、`abs:pheromone AND abs:neural`、2025〜2026年の `abs:"ant colony"` 新着一覧）と WebSearch で、2025〜2026年の動向をつかんだ。そこから3系統を遡った。①理論：Manthey+ 2025 → Kergaßner+ 2024 → Kötzing+ 2011 →（Neumann & Witt、Gutjahr、MMAS）。②NCO の中の ACO：HeatACO 2026 →（Xia+ 2024 の批判）→ ML-ACO 2020 →（DeepACO）、構築型 NCO の起点として AM → POMO。③LLM によるη設計：TIDE 2026 → ReEvo 2024。
- 既存テーマ `deep-learning-fusion` でスライド化済みの DeepACO・GFACS・DyNACO と、`ga-hybrid` の EoH は再掲せず、↪ 既存 として参照した。
- ACO の原典（Ant System、ACS、MMAS、ACO_R、Dorigo & Blum 2005 など）の公開版を、OpenAlex（oa_url/locations）と Semantic Scholar（openAccessPdf）で探した。所在は ULB の dipot/code.ulb.ac.be、IRIDIA、IDSIA、aco-metaheuristic.org、Dagstuhl DROPS、UPCommons などだった。UPCommons 以外は到達できず、UPCommons の Dorigo & Blum 2005 は認証が必要で取得できなかった。そのため ⚠️ 本文未確認のまま残した。代わりに、IRIDIA の Di Caro & Dorigo が JAIR で公開した AntNet（arXiv に全文あり）を、ACO の原理を確かめる原典としてスライド化した。
- 採録先は arXiv のコメント欄と Crossref で確認した（Kötzing+ = FOGA 2011、ML-ACO = Computers & OR 2022、Manthey+ = Swarm Intelligence（ANTS 2026, LNCS））。HeatACO と TIDE は採録先を確認できず、arXiv プレプリントとした。

### 系譜
```
[ACO 本体]  Ant System (Dorigo+ 1991/1996) ⚠ ─┬→ ACS (Dorigo & Gambardella 1997) ⚠
                                              ├→ MMAS (Stützle & Hoos 2000) ⚠ ─────────────┐
                                              ├→ AntNet (Di Caro & Dorigo 1998) ✅ p.2      │
                                              └→ ACO_R（連続, Socha & Dorigo 2008) ⚠        │
[理論]      Gutjahr 2000 GBAS 収束 ⚠ / Stützle & Dorigo 2002 ⚠                              │
              ├→ Neumann & Witt 2009 (1-ANT ランタイム) ⚠                                   │
              ├→ Kötzing+ 2011 (MMAS × 線形関数) ✅ p.3  ←──────────────────────────────────┤
              │     └→ Kergaßner+ 2024 (BACO, マルコフ連鎖で厳密式) ✅ p.7                  │
              └→ Manthey+ 2025 (時間依存 ρ/τmin の実行時間) ✅ p.9                          │
[NCO]       Pointer Net (2015) → Attention Model (Kool+ 2019) ✅ p.4 → POMO (Kwon+ 2020) ✅ p.5
[学習×ACO]  ML-ACO (Sun+ 2020, 教師ありでη/τ初期値) ✅ p.6  ←── MMAS ───────────────────────┘
              → DeepACO (2023) ↪ → GFACS (2024) ↪ → NeuFACO (2025) → DyNACO (2026) ↪
              → HeatACO (Lin+ 2026, NCO ヒートマップを MMAS で復号) ✅ p.10  ← Xia+ 2024（MCTS 復号への批判）
[LLM×ACO]   DeepACO ↪ → ReEvo (Ye+ 2024, LLM でη関数を進化) ✅ p.8 ─┬→ TIDE (Chen+ 2026, 構造と定数を分離) ✅ p.11
            EoH (2024) ↪ ──────────────────────────────────────────┘    （MCTS-AHD, HSEvo, MuEvo, RouteRepair …）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [AntNet: Distributed Stigmergetic Control for Communications Networks](https://arxiv.org/abs/1105.5449) | 1998 | JAIR 9 | 原典 | IRIDIA による ACO のルーティング版。前向き蟻・後ろ向き蟻で確率的ルーティング表を強化し、6手法より低遅延。RL との対応も論じる | ✅ p.2 |
| 2 | [Simple Max-Min Ant Systems and the Optimization of Linear Pseudo-Boolean Functions](https://arxiv.org/abs/1007.4707) | 2011 | FOGA 2011 | 発展 | 簡略 MMAS の線形関数での期待最適化時間。全線形関数 O(n³log n/ρ)、OneMax O(n log n + n/ρ) | ✅ p.3 |
| 3 | [Attention, Learn to Solve Routing Problems!](https://arxiv.org/abs/1803.08475) | 2019 | ICLR 2019 | 原典 | Transformer 型の構築方策を REINFORCE（貪欲ロールアウト基線）で学習。構築型 NCO の標準形 | ✅ p.4 |
| 4 | [POMO: Policy Optimization with Multiple Optima for Reinforcement Learning](https://arxiv.org/abs/2010.16011) | 2020 | NeurIPS 2020 | 発展 | 多始点の並列ロールアウトと共有基線で AM を学習。TSP100 gap 0.14% | ✅ p.5 |
| 5 | [Boosting Ant Colony Optimization via Solution Prediction and Machine Learning](https://arxiv.org/abs/2008.04213) | 2020 | Computers & OR 2022 | 発展 | 最適解から辺の所属確率を学習し、ACO のη・τ初期値に使う（ML-ACO）。DeepACO の前段 | ✅ p.6 |
| 6 | [Markov Chain-based Optimization Time Analysis of Bivalent Ant Colony Optimization for Sorting and LeadingOnes](https://arxiv.org/abs/2405.03353) | 2024 | GECCO 2024 | 最新 | 2値フェロモンの BACO をマルコフ連鎖で厳密解析。Sorting Θ(n³)、LeadingOnes Θ(n²) | ✅ p.7 |
| 7 | [ReEvo: Large Language Models as Hyper-Heuristics with Reflective Evolution](https://arxiv.org/abs/2402.01145) | 2024 | NeurIPS 2024 | 発展 | LLM と反省付き進化で ACO のη関数などを生成。手設計ηと DeepACO を上回る | ✅ p.8 |
| 8 | [Convergence and Running Time of Time-dependent Ant Colony Algorithms](https://arxiv.org/abs/2501.10810) | 2025 | Swarm Intelligence (ANTS 2026, LNCS) | 最新 | 時間依存の蒸発率・下限を持つ ACO の実行時間。tdev は超多項式、tdlb は多項式 | ✅ p.9 |
| 9 | [HeatACO: A Heatmap-Guided Max–Min Ant System for Large-Scale Travelling Salesman Problems](https://arxiv.org/abs/2601.19041) | 2026 | arXiv プレプリント | 最新 | NCO のヒートマップを、次数を考慮した証拠バイアス付き MMAS で復号。MCTS 復号より高品質・高速 | ✅ p.10 |
| 10 | [TIDE: Tuning-Integrated Dynamic Evolution for LLM-Based Automated Heuristic Design](https://arxiv.org/abs/2601.21239) | 2026 | arXiv プレプリント | 最新 | LLM-AHD で構造（コード）と定数（差分進化）を分離し、TSED 島モデルと UCB で探索。ACO 枠組みの TSP/OP/MKP で最良 | ✅ p.11 |
| 11 | [DeepACO: Neural-enhanced Ant Systems for Combinatorial Optimization](https://arxiv.org/abs/2309.14032) | 2023 | NeurIPS 2023 | 発展 | GNN＋RL で ACO のηを学習する Neural ACO の起点 | ↪ 既存：deep-learning-fusion p.4 |
| 12 | [Ant Colony Sampling with GFlowNets for Combinatorial Optimization](https://arxiv.org/abs/2403.07041) | 2024 | AISTATS 2025 | 発展 | DeepACO のηを GFlowNet で多峰化（GFACS） | ↪ 既存：deep-learning-fusion p.5 |
| 13 | [Beyond Static Priors: Dynamic Neural Guidance for Large-Scale Ant Colony Optimization](https://arxiv.org/abs/2606.04039) | 2026 | KDD 2026 | 最新 | フェロモンを観測する動的誘導で TSP 10万ノードへ（DyNACO） | ↪ 既存：deep-learning-fusion p.11 |
| 14 | [Evolution of Heuristics: Towards Efficient Automatic Algorithm Design Using Large Language Model](https://arxiv.org/abs/2401.02051) | 2024 | ICML 2024 | 発展 | LLM でヒューリスティクスと「思考」を共進化させる EoH。ReEvo・TIDE の比較対象 | ↪ 既存：ga-hybrid p.6 |
| 15 | Ant System 技術報告 91-016／Dorigo 博士論文（Optimization, Learning and Natural Algorithms） | 1991–92 | Politecnico di Milano | 原典 | ACO の起点となる Ant System の提案（検索情報に基づく）。公開版が見つからない | ⚠️ 本文未確認 |
| 16 | [Ant system: optimization by a colony of cooperating agents](https://doi.org/10.1109/3477.484436) | 1996 | IEEE TSMC-B 26(1) | 原典 | Ant System の論文誌版。フェロモンと発見的情報による確率的構築で TSP を解く（検索情報に基づく）。OpenAlex・S2 とも公開版なし | ⚠️ 本文未確認 |
| 17 | [Ant colony system: a cooperative learning approach to the traveling salesman problem](https://doi.org/10.1109/4235.585892) | 1997 | IEEE TEC 1(1) | 発展 | ACS。疑似乱数比例則と局所フェロモン更新（検索情報、HeatACO の解説に基づく）。S2 が示す公開版（code.ulb.ac.be）は到達不可 | ⚠️ 本文未確認 |
| 18 | [MAX–MIN Ant System](https://doi.org/10.1016/S0167-739X(00)00043-1) | 2000 | Future Generation Computer Systems 16(8) | 発展 | 最良解のみ堆積、τ を [τmin, τmax] に制限、停滞時に再初期化（ML-ACO・HeatACO の解説に基づく）。ULB の公開版は到達不可 | ⚠️ 本文未確認 |
| 19 | [Ant colony optimization for continuous domains](https://doi.org/10.1016/j.ejor.2006.06.046) | 2008 | EJOR 185(3) | 発展 | 連続最適化版の ACO_R（検索情報に基づく）。S2 が示す公開版（code.ulb.ac.be）は到達不可 | ⚠️ 本文未確認 |
| 20 | [Ant colony optimization theory: A survey](https://doi.org/10.1016/j.tcs.2005.05.020) | 2005 | Theoretical Computer Science 344 | 理論 | ACO 理論（収束、モデルベース探索との関係）の総説（検索情報に基づく）。UPCommons の版は認証が必要、ULB と Elsevier は到達不可 | ⚠️ 本文未確認 |
| 21 | [A graph-based Ant System and its convergence](https://doi.org/10.1016/S0167-739X(00)00044-3) | 2000 | FGCS 16(8) | 理論 | GBAS の収束を初めて証明（Manthey+ 2025 の解説に基づく）。公開版は到達不可 | ⚠️ 本文未確認 |
| 22 | [A short convergence proof for a class of ant colony optimization algorithms](https://doi.org/10.1109/TEVC.2002.802444) | 2002 | IEEE TEC 6(4) | 理論 | τmin > 0 を持つ ACO の収束証明（検索情報に基づく）。ULB の公開版は到達不可 | ⚠️ 本文未確認 |
| 23 | [Runtime Analysis of a Simple Ant Colony Optimization Algorithm](https://doi.org/10.1007/s00453-007-9134-2) | 2009 | Algorithmica 54 | 理論 | 1-ANT の初のランタイム解析（Kötzing+・Kergaßner+ の解説に基づく）。Dagstuhl・Springer の OA 版は到達不可 | ⚠️ 本文未確認 |
| 24 | [Ant colony optimization](https://doi.org/10.1109/MCI.2006.329691) | 2006 | IEEE Computational Intelligence Magazine 1(4) | 総説 | Dorigo・Birattari・Stützle による ACO の入門総説（検索情報に基づく）。公開版なし | ⚠️ 本文未確認 |
| 25 | [Position: Rethinking Post-Hoc Search-Based Neural Approaches for Solving Large-Scale Traveling Salesman Problems](https://arxiv.org/abs/2406.03503) | 2024 | ICML 2024 | 発展 | ヒートマップ＋MCTS の有効性を疑問視し、距離だけの SoftDist を提案。HeatACO の問題意識の源。HeatACO の Table VII で中身を確認できたため、要旨と序論の確認にとどめた | — 参照のみ |
| 26 | [Comment on paper: Position: Rethinking Post-Hoc Search-Based Neural Approaches …](https://arxiv.org/abs/2406.09441) | 2024 | arXiv | 発展 | 上記の時間計測が公平でないとする反論。論争の存在を示すため要旨のみ参照 | — 参照のみ |
| 27 | [NeuFACO: Neural Focused Ant Colony Optimization for Traveling Salesman Problem](https://arxiv.org/abs/2509.16938) | 2025 | arXiv（RIVF'25 投稿） | 発展 | DyNACO の前段（PPO＋GNN で FACO を誘導）。既存テーマでも参照のみ。要旨のみ確認 | — 参照のみ |
| 28 | [Tensorized Ant Colony Optimization for GPU Acceleration](https://arxiv.org/abs/2404.04895) | 2024 | GECCO 2024 | 発展 | ACO をテンソル化して GPU で高速化。大規模化の別ルート（実装寄り）として要旨のみ確認 | — 参照のみ |
| 29 | [Comparative Analysis of Four Prominent Ant Colony Optimization Variants](https://arxiv.org/abs/2405.15397) | 2024 | arXiv | 発展 | AS・Rank-based AS・MMAS・ACS の比較。原典の代替を探す過程で確認したが、原典の内容は含まないため除外 | — 参照のみ |
| 30 | [MCTS for Comprehensive Exploration in LLM-Based Automatic Heuristic Design](https://arxiv.org/abs/2501.08603) | 2025 | ICML 2025 | 発展 | MCTS で LLM-AHD を探索（MCTS-AHD）。TIDE の主な比較対象。検索結果と TIDE の記述で確認 | — 参照のみ |
| 31 | [MuEvo: LLM-Driven Evolution of Multi-Heuristic Ensemble](https://arxiv.org/abs/2608.03636) | 2026 | arXiv | 最新 | 複数部品のヒューリスティクスをまとめて進化させる LLM-AHD。要旨のみ確認 | — 参照のみ |
| 32 | [RouteRepair: Instance-Level Failure Diagnosis and Targeted Repair in LLM-Based Automated Heuristic Design for Routing Optimization](https://arxiv.org/abs/2609.11452) | 2026 | arXiv | 最新 | 事例単位の失敗診断で LLM-AHD を修復する。要旨のみ確認 | — 参照のみ |
| 33 | [A full process algebraic representation of Ant Colony Optimization](https://arxiv.org/abs/2601.14436) | 2026 | Information Sciences | 理論 | 並列 ACO（AS・MMAS・ACS）をプロセス代数 PA²CO で形式化。要旨のみ確認 | — 参照のみ |
| 34 | [RoCo: Role-Based LLMs Collaboration for Automatic Heuristic Design](https://arxiv.org/abs/2512.03762) | 2025 | arXiv | 最新 | 役割分担した複数 LLM で ACO のη等を設計。検索結果のみ | — 参照のみ |
