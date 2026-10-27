## クローン選択と免疫最適化アルゴリズム（clonal-selection/）

### 調査履歴
- 2026-10-27: arXiv API（"clonal selection" / "immune algorithm" / hypermutation / ageing / Opt-IA）、WebSearch、Crossref で 2024〜2026 の動向から入った（OpenAlex は当日の無料枠切れ、Semantic Scholar は 429 で使えず）。最新動向は (a) Corus・Oliveto・Yazdani の超突然変異ランタイム解析の系譜（Fast HMP → Fast CHM, AAAI 2025）、(b) エージングの多目的 EA への移植（Li・Zheng・Doerr, IJCAI 2025）、(c) 交叉と超突然変異の比較理論（Dang+ 2024）、(d) NNIA 系の多目的免疫アルゴリズムの応用（MPIA, TETCI 2025）、(e) 新メタファー型 AIS（SAIS, GECCO 2024）の5系統。
- そこから原典へ遡り、日本の「免疫アルゴリズム」（森・築山・福田 1993, 電気学会論文誌C）を J-STAGE の公開 PDF で、CLONALG（2002, IEEE TEVC）は第三者（UNM の講義ページ）が置いた掲載版しか到達できず、著者・所属機関の公開版ではないためスライド化せず本文未確認とした。opt-aiNet、B-Cell Algorithm、Opt-IA 原論文、Jansen & Zarges の解析、NNIA は OA 版に到達できず（Kent・Aberystwyth・TU Dortmund・UNICAMP のリポジトリは接続不可）本文未確認とした。opt-aiNet は第三者サイト（neuro.bstu.by）にドラフトがあるが、著者・所属機関の公開ではないため使っていない（そもそも接続もできなかった）。
- 2024〜2026 年の「CLONALG × LLM」や BBOB/COCO 上の体系的なベンチマーク比較は見つからなかった。2024年以降のクローン選択関連の文献は、Crossref で見る限りほぼ応用論文（特徴選択、ハイブリッド深層学習など）だった。

### 系譜
```
Burnet クローン選択説 (1959, 書籍)
  ├→ 免疫アルゴリズム IA（森+ 1993：抗体濃度による多様性維持＋記憶細胞）
  └→ CLONALG（de Castro & Von Zuben 2002：選択・比例クローン・反比例超突然変異・受容体編集）
        ├→ opt-aiNet（2002, 多峰最適化）※本文未確認
        ├→ B-Cell Algorithm（Kelsey & Timmis 2003：連続体細胞超突然変異 CHM）※本文未確認
        │     ├→ CHM のランタイム解析（Jansen & Zarges 2011 ほか）※本文未確認
        │     ├→ 交叉 vs 超突然変異（Dang+ 2024：多目的 royal road で CHM も指数時間）
        │     └→ Fast CHM（Corus+ 2025：単目的と MOEA/D で山登りを SBM 並みに）
        ├→ Opt-IA（Cutello+ 2004/2007：HMP＋エージング）※本文未確認
        │     └→ Opt-IA runtime（Corus+ 2017/2020）→ Fast HMP（Corus+ 2021）→ Fast CHM（2025）
        │                        └→ エージングの MOEA 移植：SMS-EMOA aging（Li+ 2025）
        └→ NNIA（Gong+ 2008, 多目的免疫）※本文未確認 → BPNNIA/BPAIMA（Chen+ 2024）→ MPIA（Chen+ 2025）
メタファー批判の流れ：On clonal selection（McEwan & Hart 2011）※本文未確認 → SAIS（2024）は「SOS＋記憶集団」の典型例
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [多様性をもつ免疫的アルゴリズムの提案と負荷割当て問題への応用](https://doi.org/10.1541/ieejeiss1987.113.10_872) | 1993 | 電気学会論文誌C 113(10) | 原典 | 抗体間親和度（情報エントロピー）と濃度で増殖を抑制し多様性を保つ免疫アルゴリズム IA。負荷割当て問題で GA より多様な解を保持し、記憶細胞で探索ステップを短縮。 | ✅ p.2 |
| 2 | [Learning and Optimization Using the Clonal Selection Principle](https://doi.org/10.1109/TEVC.2002.1011539) | 2002 | IEEE TEVC 6(3) | 原典 | CLONALG。比例クローンと親和度反比例の超突然変異、受容体編集で多峰・TSP を解き、fitness sharing GA と比較（検索情報・引用に基づく）。著者・所属機関の公開版に到達できず（第三者の講義ページの掲載版のみ）。 | ⚠️ 本文未確認 |
| 3 | [When Hypermutations and Ageing Enable Artificial Immune Systems to Outperform Evolutionary Algorithms](https://arxiv.org/abs/1804.01314) | 2020 | Theor. Comput. Sci. 832 | 発展 | Opt-IA の HMP とエージングの厳密解析。Cliff・Jump・HiddenPath で EA に指数的に勝ち、HyperTrap で負ける。 | ✅ p.3 |
| 4 | [Fast Immune System-Inspired Hypermutation Operators for Combinatorial Optimization](https://arxiv.org/abs/2009.00990) | 2021 | IEEE TEVC 25(5) | 発展 | 評価を確率的に間引く FCM_γ／べき乗則 HMP_β で山登りを線形倍高速化。Partition・Vertex Cover まで証明。 | ✅ p.4 |
| 5 | [Crossover Can Guarantee Exponential Speed-Ups in Evolutionary Multi-Objective Optimisation](https://arxiv.org/abs/2301.13687) | 2024 | Artificial Intelligence 330 | 最新 | 多目的 royal road で交叉ありの GSEMO/NSGA-II は多項式、交叉なしや CHM では指数時間。 | ✅ p.5 |
| 6 | [SAIS: A Novel Bio-Inspired Artificial Immune System Based on Symbiotic Paradigm](https://arxiv.org/abs/2402.07244) | 2024 | GECCO 2024 Companion | 最新 | SOS の3更新式を部分集団で並列適用する AIS。SOS に及ばず、メタファー型手法の典型例。 | ✅ p.6 |
| 7 | [Fast Contiguous Somatic Hypermutations for Single-Objective Optimisation and Multi-Objective Optimisation Via Decomposition](https://doi.org/10.1609/aaai.v39i25.34897) | 2025 | AAAI 2025 | 最新 | B-Cell の CHM を確率的評価で高速化。単目的と MOEA/D で最大線形倍の改善（AAAI の OA 版で確認）。 | ✅ p.7 |
| 8 | [Scalable Speed-ups for the SMS-EMOA from a Simple Aging Strategy](https://arxiv.org/abs/2505.01647) | 2025 | IJCAI 2025 | 最新 | エージングで新個体を τ 世代保護する非エリート SMS-EMOA。目的数によらず Θ(k)^{k−1} 倍の高速化。 | ✅ p.8 |
| 9 | [A Novel Immune Algorithm for Multiparty Multiobjective Optimization](https://arxiv.org/abs/2603.27541) | 2025 | IEEE TETCI 9(2) | 最新 | NNIA 系の多党多目的免疫アルゴリズム MPIA。UAV 経路計画 12 ケースで sumHV 最良。 | ✅ p.9 |
| 10 | The Clonal Selection Theory of Acquired Immunity（Burnet, Cambridge Univ. Press） | 1959 | 書籍 | 原典（生物学） | クローン選択説の原典。CLONALG・Opt-IA 等すべての着想元（検索情報・引用に基づく）。 | ⚠️ 本文未確認 |
| 11 | [An Artificial Immune Network for Multimodal Function Optimization (opt-aiNet)](https://doi.org/10.1109/CEC.2002.1007011) | 2002 | IEEE CEC 2002 | 発展 | CLONALG に免疫ネットワーク型の抑制を加え、解の数を自動調整する多峰最適化（検索情報に基づく）。OA 版に到達できず。 | ⚠️ 本文未確認 |
| 12 | [Immune Inspired Somatic Contiguous Hypermutation for Function Optimisation (B-Cell Algorithm)](https://doi.org/10.1007/3-540-45105-6_26) | 2003 | GECCO 2003 (LNCS 2723) | 発展 | 連続体細胞超突然変異 CHM を導入した B-Cell Algorithm。12関数でハイブリッド GA より少ない評価回数と報告（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 13 | [Exploring the Capability of Immune Algorithms: A Characterization of Hypermutation Operators](https://doi.org/10.1007/978-3-540-30220-9_22) | 2004 | ICARIS 2004 | 発展 | Opt-IA 系の超突然変異（静的・反比例・hypermacromutation）を比較（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 14 | An Immune Algorithm for Protein Structure Prediction on Lattice Models（Cutello, Nicosia, Pavone, Timmis） | 2007 | IEEE TEVC 11(1) | 発展 | エージング付き Opt-IA の代表的応用（Corus+ の参考文献から確認）。 | ⚠️ 本文未確認 |
| 15 | [Analyzing Different Variants of Immune Inspired Somatic Contiguous Hypermutations](https://doi.org/10.1016/j.tcs.2010.09.027) | 2011 | Theor. Comput. Sci. 412(6) | 発展 | CHM 変種の最初期の厳密解析（Jansen & Zarges）。CLOB で O(n² log n)、SBM は指数時間（Fast HMP 論文中の記述に基づく）。 | ⚠️ 本文未確認 |
| 16 | Theoretical Foundations of Artificial Immune Systems（Zarges 博士論文, TU Dortmund） | 2011 | 博士論文 | 発展 | 超突然変異とエージングのランタイム解析をまとめた論文（検索情報に基づく）。リポジトリに接続できず。 | ⚠️ 本文未確認 |
| 17 | [Multiobjective Immune Algorithm with Nondominated Neighbor-Based Selection (NNIA)](https://doi.org/10.1162/evco.2008.16.2.225) | 2008 | Evolutionary Computation 16(2) | 発展 | 孤立した非優越解を混雑距離に比例してクローンする多目的免疫アルゴリズム（MPIA の参考文献・検索情報に基づく）。 | ⚠️ 本文未確認 |
| 18 | [Runtime Analysis of Immune-Inspired Hypermutation Operators in Evolutionary Multi-Objective Optimization](https://doi.org/10.1016/j.swevo.2021.100934) | 2021 | Swarm Evol. Comput. 65 | 発展 | GSEMO/MOEA/D に超突然変異を入れた初のランタイム解析（Huang & Zhou。Dang+ 2024・Fast CHM の記述に基づく）。 | ⚠️ 本文未確認 |
| 19 | On Clonal Selection（McEwan & Hart） | 2011 | Theor. Comput. Sci. | 批判 | 「クローン選択＝無性的な自然選択」という計算論的解釈はアルゴリズム的にも生物学的にも不十分と論じる（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 20 | [On the Runtime Analysis of the Opt-IA Artificial Immune System](https://doi.org/10.1145/3071178.3079194) | 2017 | GECCO 2017 | 発展 | #3 の会議版。 | — 参照のみ（拡張版 #3 をスライド化） |
| 21 | [Fast Artificial Immune Systems](https://arxiv.org/abs/1806.00299) | 2018 | PPSN 2018 | 発展 | #4 の会議版。 | — 参照のみ（拡張版 #4 をスライド化） |
| 22 | [Artificial Immune Systems Can Find Arbitrarily Good Approximations for the NP-Hard Number Partitioning Problem](https://arxiv.org/abs/1806.00300) | 2019 | Artificial Intelligence 274 | 発展 | HMP＋エージングで Partition の (1+ε) 近似を多項式時間で得る（EA は 4/3 近似で停滞しうる）。 | — 参照のみ（要旨のみ確認。結果は #4 Table I に含まれる） |
| 23 | [On Inversely Proportional Hypermutations with Mutation Potential](https://arxiv.org/abs/1903.11674) | 2019 | GECCO 2019 | 発展 | 反比例 HMP で山登りを速める (1+1) Opt-IA。TwoMax・Cliff を解析。 | — 参照のみ（要旨のみ確認。#4 で位置づけを把握） |
| 24 | [Evolutionary Biparty Multiobjective UAV Path Planning: Problems and Empirical Comparisons](https://arxiv.org/abs/2603.21544) | 2024 | IEEE TETCI 8(3) | 発展 | BPNNIA・BPHEIA・BPAIMA を提案した MPIA の前段論文。 | — 参照のみ（MPIA を優先） |
| 25 | Stochastic Population Update Can Provably Be Helpful in Multi-Objective Evolutionary Algorithms（Bian, Zhou, Li, Qian） | 2023 | IJCAI 2023 | 発展 | SMS-EMOA の非エリート選択の先行例。#8 の比較対象。 | — 参照のみ |
| 26 | [Bio-Inspired Palette Evolution in Indirectly Encoded Substrates](https://arxiv.org/abs/2609.17067) | 2026 | PPSN XIX | 周辺 | 活性化関数パレットの進化戦略の一つとして「クローン選択」型の保護を比較。テーマからやや外れる。 | — 参照のみ |
| 27 | [A Generation Method of Immunological Memory in Clonal Selection Algorithm by using Restricted Boltzmann Machines](https://arxiv.org/abs/1804.02816) | 2015 | IEEE SMC 2015 | 周辺 | CSA の記憶細胞を RBM で生成する応用研究。 | — 参照のみ |
| 28 | [Comparison Study for Clonal Selection Algorithm and Genetic Algorithm](https://arxiv.org/abs/1209.2717) | 2012 | IJCSIT 4(4) | 周辺 | CLONALG と GA の小規模比較。関数によって優劣が入れ替わる。 | — 参照のみ（小規模・低引用） |
| 29 | Symbiotic Organisms Search: A New Metaheuristic Optimization Algorithm（Cheng & Prayogo） | 2014 | Computers & Structures 139 | 周辺 | SAIS の更新式の出典。 | — 参照のみ |
| 30 | [Greedy Is a Strong Default: Agents as Iterative Optimizers](https://arxiv.org/abs/2603.27415) | 2026 | arXiv | 周辺 | LLM を提案器にすると古典メタヒューリスティクスの機構の効果が小さいと報告。「クローン選択×LLM」の探索で見つかった最も近い論文。 | — 参照のみ |
| 31 | Metaheuristics—the Metaphor Exposed（Sörensen） | 2015 | ITOR 22(1) | 批判 | メタファー型手法の乱立への批判。 | — 参照のみ（既存：swarm-intelligence/foundations で本文未確認） |
| 32 | [The Paradox of Success in Evolutionary and Bioinspired Optimization: Revisiting Critical Issues, Key Studies, and Methodological Pathways](https://arxiv.org/abs/2501.07515) | 2025 | サーベイ | 批判 | メタファー手法の乱立と評価の問題点を整理。 | ↪ 既存：swarm-intelligence/foundations p.9 |
| 33 | [Beyond metaphors: rethinking metaphors in metaheuristics algorithm design](https://doi.org/10.1038/s44387-026-00089-z) | 2026 | npj Artif. Intell. | 批判 | メタファー頼みの設計から自動設計へ移るべきと論じる。 | ↪ 既存：swarm-intelligence/foundations p.10 |
| 34 | [Mathematical Runtime Analysis for the Non-Dominated Sorting Genetic Algorithm II (NSGA-II)](https://arxiv.org/abs/2112.08581) | 2022 | AAAI 2022（Artificial Intelligence 2023） | 関連 | NSGA-II の初のランタイム解析。#5・#8 の前提。 | ↪ 既存：swarm-intelligence/particle-theory p.4 |
| 35 | Fast Genetic Algorithms（Doerr, Le, Makhmara, Nguyen） | 2017 | GECCO 2017 | 関連 | heavy-tailed 変異。#4・#7 の「べき乗則」評価と同族。 | — 参照のみ（GA 一般のため本テーマ外） |
| 36 | A Review of Clonal Selection Algorithm and Its Applications（Ulutaş & Kulturel-Konak） | 2011 | Artificial Intelligence Review | サーベイ | CSA の変種と応用の総説（検索情報に基づく）。 | — 参照のみ（本文未確認） |
