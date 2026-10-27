# 免疫アルゴリズム — 先行研究調査

生体の免疫系に着想を得た人工免疫システム（AIS）について、クローン選択と免疫最適化アルゴリズム（超突然変異・エージングの理論を含む）、負の選択・危険理論による自己・非自己識別と異常検知、免疫ネットワーク理論とロボット制御・深層学習・LLM 防御との融合の観点から系譜をまとめる。遺伝的アルゴリズム・群知能分野の進化計算理論とつながる。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/`）は main ブランチから引き継いでいる。

## テーマ一覧

| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- | --- |
| 第1回 | [クローン選択と免疫最適化アルゴリズム](#clonal-selection) | 日本の免疫アルゴリズム（森ら 1993）と CLONALG から、Opt-IA の超突然変異・エージングのランタイム解析、Fast 化された超突然変異、多目的 EA へのエージングの移植、多党多目的の免疫アルゴリズムまで | [pptx](clonal-selection/clonal-selection.pptx) / [pdf](clonal-selection/clonal-selection.pdf) | 8 本 | 36 本 | 2026-10-27 |
| 第1回 | [自己・非自己識別と異常検知](#negative-selection) | 負の選択アルゴリズム（Forrest ら 1994）と ARTIS/LISYS から、危険理論と樹状細胞アルゴリズム、一クラス分類としての評価、群ロボの故障検知、基盤モデルでの負の選択の再解釈まで | [pptx](negative-selection/negative-selection.pptx) / [pdf](negative-selection/negative-selection.pdf) | 10 本 | 30 本 | 2026-10-27 |
| 第1回 | [免疫ネットワーク理論と機械学習・AI との融合](#immune-network-ml) | 免疫ネットワークによるロボットの行動調停（石黒ら 1997）と aiNet の検証から、免疫レパートリー分類（DeepRC）、敵対的頑健性（RAILS）、LLM の脱獄・エージェント攻撃への「AI の免疫系」、免疫ネットワークによる継続学習まで | [pptx](immune-network-ml/immune-network-ml.pptx) / [pdf](immune-network-ml/immune-network-ml.pdf) | 10 本 | 37 本 | 2026-10-27 |

合計：スライド化 28 本、引用論文一覧 103 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-27 | 第1回調査（分野新設）。「クローン選択と免疫最適化アルゴリズム」、「自己・非自己識別と異常検知」、「免疫ネットワーク理論と機械学習・AI との融合」の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv、J-STAGE、PMC、著者・所属機関の公開版など正規のオープンアクセス版で全文を確認した論文のみスライド化。CLONALG（2002）は第三者の講義ページ上の掲載版しか到達できなかったため、Jerne（1974）、Farmer ら（1986）、aiNet、AIRS などとともに本文未確認として一覧に記載。既存デッキ（他分野を含む）でスライド化済みの論文は再掲せず参照。 |

## 追加調査を推奨するテーマ

これまでの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。

1. **LLM エージェント防御の「自己免疫」と記憶汚染の評価**  
   TIM・IMAG・AgentAntibody はいずれも検知結果を記憶や重みに書き戻すため、偽陽性の固定化（自己免疫）や攻撃者による記憶汚染が本質的なリスクになるが、評価はほとんどない。ANIS が提唱する指標を手がかりに評価法を調べる。

2. **AIS と深層学習の公平な比較（一クラス異常検知と BBOB ベンチマーク）**  
   異常検知では比較条件（次元削減の有無、教師ラベルの使用、ベースライン値の流用）が研究ごとに揃わず、最適化でも CLONALG・opt-aiNet・Opt-IA を COCO/BBOB で体系的に比べた研究は見つからなかった。ADBench・OpenOOD 上の評価と、メタファー批判の観点からの等価性判定を合わせて調べる。

3. **多目的 EA における免疫演算子の理論**  
   超突然変異とエージングは今では NSGA-II・SMS-EMOA・MOEA/D の理論の中で評価されている。MOEA/D と連続超突然変異の解析、NSGA-II へのエージングの導入、heavy-tailed 変異との統一的な理解を追う。

4. **免疫ネットワークと連想記憶（Hopfield・注意）の理論的対応**  
   免疫網を多重 Hopfield 網として統計力学的に解析する研究と、注意＝現代 Hopfield で免疫レパートリーを読んだ DeepRC がある。Farmer ら（1986）の「免疫網と学習系の同型性」を現代の言葉で再整理する。

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は既存デッキ（他分野の場合は `<field>/<theme>`）でスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。

---

<a id="clonal-selection"></a>

## クローン選択と免疫最適化アルゴリズム（clonal-selection/）

資料：[clonal-selection.pptx](clonal-selection/clonal-selection.pptx) ／ [clonal-selection.pdf](clonal-selection/clonal-selection.pdf) ／ 生成元 [spec.json](clonal-selection/spec.json) ／ [テーマ README](clonal-selection/README.md)


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

---

<a id="negative-selection"></a>

## 自己・非自己識別と異常検知（negative-selection/）

資料：[negative-selection.pptx](negative-selection/negative-selection.pptx) ／ [negative-selection.pdf](negative-selection/negative-selection.pdf) ／ 生成元 [spec.json](negative-selection/spec.json) ／ [テーマ README](negative-selection/README.md)


### 調査履歴
- 2026-10-27: arXiv API と Web 検索で「negative selection」「artificial immune system × anomaly/intrusion/malware/fault」「dendritic cell algorithm」「danger theory」「immune-inspired」を 2024〜2026 から検索。最新の Immuno-VLM（ICML 2026）、ESIA（2026）、AAPD（RSOS 2025）、Li+ 2025（Scientific Reports、PMC の全文 HTML）を起点にした。
- 系譜は2本たどった。(A) 負の選択：Forrest+ 1994 → LISYS（Hofmeyr & Forrest 2000）→ ML 視点の再評価（Glickman+ 2005）→ 実数値 NSA のレビュー（Gupta & Dasgupta 2021）→ 2025〜2026 の基盤モデル上の負の選択。(B) 危険理論：Aickelin & Cayzer 2002 → DCA（Greensmith+ 2005）。Forrest 研究室の論文は UNM の著者公開 PDF、Aickelin 研究室の論文は arXiv の著者投稿版で全文を読んだ（Forrest+ 1994 は Type3 フォントで文字が抽出できず、ページ画像で読んだ）。
- 依頼範囲の V-detector（Ji & Dasgupta 2004）、Stibor らの批判（GECCO 2005 ほか）、Kim & Bentley 2001、Textor 2012、Stibor+ 2009（DCA の幾何学的解析）は、公開 PDF のあるホスト（gpbib.cs.ucl.ac.uk、cs.york.ac.uk、TUM、tuprints、johannes-textor.name 等）がいずれもプロキシで遮断され、本文未確認。V-detector と Stibor の結論は、Gupta & Dasgupta 2021 と Li+ 2025 の本文中の記述・実験（V-detector が NSL-KDD で検出率0.14%）で間接的に押さえた。
- IoT×AIS×深層学習（HAIS-IDS 2025、DeepDCA 2020）は出版社サイト（pan.pl、MDPI）が遮断され本文未確認。LLM の脱獄検知 IMAG（2025）は同分野 immune-network-ml の担当範囲（AI の免疫系）と重なるため参照のみとした。
- 軸「深層学習の異常検知に対して AIS がまだ有効な条件」についての整理：(1) 自己の表現が低次元・安定であること（Forrest 1994 の指数コスト式、Gupta 2021 の t-SNE 2次元での好成績、Li 2025 の高次元での崩壊）。(2) 自己を「多数派の仲間」として分散・オンラインに定義できること（LISYS、AAPD）。(3) 検出器を乱数でなく意味のある空間（LLM が生成した概念、基盤モデルの埋め込み）で作れること（Immuno-VLM、ESIA）。逆に Glickman 2005 と Li 2025 は、効いているのが免疫らしさではなく汎化や教師ラベル・KNN であることを示している。

### 系譜
```
[A] 負の選択（自己を学び、補集合を検出器で覆う）
  Forrest+ 1994 Negative Selection（r 連続一致、ファイル改ざん検知）
     ├→ Forrest+ 1996 Sense of Self（系列の正の検出、参照のみ）
     └→ Hofmeyr & Forrest 2000 ARTIS/LISYS（分散 NSA＋共刺激・記憶、侵入検知）
           └→ Glickman+ 2005（LISYS ≒ 1-NN、機構のアブレーション）
     ├→ 実数値 NSA：González & Dasgupta 2003 → V-detector (Ji & Dasgupta 2004/2009)（本文未確認）
     │     └→ 批判：Kim & Bentley 2001 / Stibor+ 2005（一クラス SVM に劣る、高次元で破綻）（本文未確認）
     │           └→ Gupta & Dasgupta 2021（レビュー＋一クラス手法20種との比較）
     │                 └→ Li+ 2025 Sci Rep（異常サンプルを検出器中心に＋KNN。従来 NSA は NSL-KDD で検出率1%未満）
     └→ 基盤モデル上の負の選択（2026）
           ├→ Immuno-VLM（LLM＝計算論的胸腺、意味的抗体で CLIP の OOD 検出）
           └→ ESIA（衛星異常監視、LLM プロンプトを負の選択でふるう）

[B] 危険理論（非自己ではなく危険に反応）
  Matzinger 1994（本文未確認）→ Aickelin & Cayzer 2002 → Aickelin+ 2003（IDS への提案）
     └→ Greensmith+ 2005 DCA → dDCA 2008 → Gu+ 2013（形式化・ノイズ）／ Stibor+ 2009（線形識別器と同等との批判、本文未確認）

[C] 免疫ネットワーク型の異常・故障検知
  Farmer, Packard & Perelson 1986（未調査）→ O'Keeffe 2025 AAPD（群ロボの劣化検知・診断）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Self-Nonself Discrimination in a Computer](https://doi.org/10.1109/RISP.1994.296580)（[著者公開 PDF](https://www.cs.unm.edu/~forrest/publications/virus.pdf)） | 1994 | IEEE S&P | 原典 | 胸腺の負の選択を模した NSA の原典。自己と r 連続一致しない乱数列を検出器にし、ファイル改ざん・ウイルス感染を確率的に検知 | ✅ p.2 |
| 2 | [Architecture for an Artificial Immune System](https://doi.org/10.1162/106365600568257)（[著者公開 PDF](https://www.cs.unm.edu/~forrest/publications/hofmeyr_forrest.pdf)） | 2000 | Evolutionary Computation | 発展 | 分散 NSA に共刺激・記憶・寿命・表現多様性を加えた ARTIS と侵入検知 LISYS。実侵入7/7件、誤検知1.76件/日 | ✅ p.3 |
| 3 | [The Danger Theory and Its Application to Artificial Immune Systems](https://arxiv.org/abs/0801.3549) | 2002 | ICARIS | 原典 | 危険理論を AIS に紹介した概念論文。非自己でなく危険信号に反応する設計を提案 | ✅ p.4 |
| 4 | [Introducing Dendritic Cells as a Novel Immune-Inspired Algorithm for Anomaly Detection](https://arxiv.org/abs/1004.3196) | 2005 | ICARIS | 発展 | 樹状細胞アルゴリズム DCA の原典。PAMP・危険・安全信号を融合して抗原の文脈を判定 | ✅ p.5 |
| 5 | [A Machine Learning Evaluation of an Artificial Immune System](https://doi.org/10.1162/1063656054088512)（[著者公開 PDF](https://www.cs.unm.edu/~forrest/publications/lisys-ecj-05.pdf)） | 2005 | Evolutionary Computation | 発展 | LISYS を 1-NN の変種とみなし、免疫機構を足し引きして寄与を測定。効いたのは汎化と時間的集積 | ✅ p.6 |
| 6 | [Negative Selection Algorithm Research and Applications in the last decade: A Review](https://arxiv.org/abs/2105.06109) | 2021 | arXiv プレプリント | 発展 | NSA 30年を4期に整理し、V-detector 等を一クラス手法20種（AE・VAE・GAN 含む）と比較 | ✅ p.7 |
| 7 | [Detecting and Diagnosing Faults in Autonomous Robot Swarms with an Artificial Antibody Population Model](https://arxiv.org/abs/2412.19942) | 2025 | Royal Society Open Science | 最新 | 抗体集団動態で群ロボの徐々の劣化を検知・診断。完全故障は Ψ_T=1・Ψ_F=0、群の成果を理想の70〜97%に維持 | ✅ p.8 |
| 8 | [Generating detectors from anomaly samples via negative selection for network intrusion detection](https://doi.org/10.1038/s41598-025-20516-6)（[PMC 全文](https://pmc.ncbi.nlm.nih.gov/articles/PMC12534389/)） | 2025 | Scientific Reports | 最新 | 従来 NSA が高次元で検出器を作れない原因を分析し、異常サンプル中心の検出器＋KNN を提案。NSL-KDD 検出率73.45% | ✅ p.9 |
| 9 | [Immuno-VLM: Immunizing Large Vision-Language Models via Generative Semantic Antibodies for Open-World Trustworthiness](https://arxiv.org/abs/2605.30745) | 2026 | ICML | 最新 | LLM が生成した意味的抗体で CLIP の OOD 検出を学習する負の選択。ImageNet-O AUROC 83.4 | ✅ p.10 |
| 10 | [Earth Surface Immune System for Rapid Monitoring of Unknown Anomalies](https://arxiv.org/abs/2609.20662) | 2026 | arXiv プレプリント | 最新 | 衛星画像の未知異常を自然免疫段（位置特定）と獲得免疫段（負の選択で選んだプロンプトで認識）で監視 | ✅ p.11 |
| 11 | [Real-valued negative selection algorithm with variable-sized detectors](https://doi.org/10.1007/978-3-540-24854-5_30) | 2004 | GECCO（LNCS 3102） | 発展 | V-detector の原典。検出器ごとに半径を変え、少数の検出器で非自己を覆う（検索情報に基づく）。公開 PDF のホストに到達できず | ⚠️ 本文未確認 |
| 12 | V-detector: An efficient negative selection algorithm with "probably adequate" detector coverage（Ji & Dasgupta） | 2009 | Information Sciences | 発展 | V-detector の雑誌版。被覆率の統計的推定で検出器生成を止める（検索情報に基づく） | ⚠️ 本文未確認 |
| 13 | [Is negative selection appropriate for anomaly detection?](https://doi.org/10.1145/1068009.1068061) | 2005 | GECCO | 発展（批判） | 実数値 NSA と自己検出器分類は高精度に正例・負例の両方を要し、一クラス SVM は一クラスだけで足りると指摘（検索情報に基づく） | ⚠️ 本文未確認 |
| 14 | A comparative study of real-valued negative selection to statistical anomaly detection techniques（Stibor, Timmis, Eckert） | 2005 | ICARIS（LNCS 3627） | 発展（批判） | V-detector は KDD データで統計的異常検知に検出率で及ばないと報告（検索情報に基づく） | ⚠️ 本文未確認 |
| 15 | An evaluation of negative selection in an artificial immune system for network intrusion detection（Kim & Bentley） | 2001 | GECCO | 発展（批判） | ネットワーク侵入検知で負の選択の検出器生成がスケールしないことを示した（他論文の引用に基づく） | ⚠️ 本文未確認 |
| 16 | A comparative study of negative selection based anomaly detection in sequence data（Textor） | 2012 | ICARIS | 発展（再評価） | r-chunk / r 連続検出器の NSA が実データ14種でカーネル・オートマトン・n-gram 法と同等以上（検索情報に基づく） | ⚠️ 本文未確認 |
| 17 | Geometrical insights into the dendritic cell algorithm（Stibor, Oates, Kendall, Garibaldi） | 2009 | GECCO | 発展（批判） | DCA の信号処理が線形識別に相当することを幾何学的に示した（Gu+ 2013 の記述に基づく） | ⚠️ 本文未確認 |
| 18 | HAIS-IDS: A hybrid artificial immune system model for intrusion detection in IoT | 2025 | Bull. Polish Academy of Sciences | 最新 | VAE を使うクローン選択層と DC 型の適応層の2層 AIS で IoT 侵入検知（検索情報に基づく） | ⚠️ 本文未確認 |
| 19 | [DeepDCA（Self-Normalizing NN × DCA、IoT ボット検知）](https://www.mdpi.com/2076-3417/10/6/1909) | 2020 | Applied Sciences | 発展 | SNN と DCA を組み合わせ IoT-Bot で精度98.73%超（検索情報に基づく）。MDPI に到達できず | ⚠️ 本文未確認 |
| 20 | Tolerance, danger, and the extended family（Matzinger） | 1994 | Annual Review of Immunology | 原典（免疫学） | 危険理論の提唱（Aickelin & Cayzer 2002 の記述に基づく） | ⚠️ 本文未確認 |
| 21 | [A Sense of Self for Unix Processes](https://www.cs.unm.edu/~forrest/publications/ieee-sp-96-unix.pdf) | 1996 | IEEE S&P | 発展 | システムコール列の短い相関で「自己」を定義するホスト型侵入検知。負の選択でなく正の検出のため参照のみ | — 参照のみ |
| 22 | [The Evolution of System-call Monitoring](https://www.cs.unm.edu/~forrest/publications/acsac08.pdf) | 2008 | ACSAC | 発展 | システムコール監視研究の回顧。冒頭のみ確認したため参照のみ | — 参照のみ |
| 23 | [Danger Theory: The Link between AIS and IDS?](https://arxiv.org/abs/0803.1997) | 2003 | ICARIS | 発展 | 危険理論に基づく次世代 IDS の研究計画。2002 年版と内容が重なるため参照のみ | — 参照のみ |
| 24 | [The Deterministic Dendritic Cell Algorithm](https://arxiv.org/abs/1006.1512) | 2008 | ICARIS | 発展 | 確率要素を除いた dDCA。ポートスキャンで検証。DCA 原典と重なるため参照のみ | — 参照のみ |
| 25 | [Theoretical formulation and analysis of the deterministic dendritic cell algorithm](https://arxiv.org/abs/1305.7476) | 2013 | arXiv（BioSystems 投稿版） | 発展 | dDCA の集合論的定義と計算量 O(n²) の解析。理論寄りで軸から外れるため参照のみ | — 参照のみ |
| 26 | [Quiet in Class: Classification, Noise and the Dendritic Cell Algorithm](https://arxiv.org/abs/1307.1391) | 2013 | ICARIS | 発展（批判） | DCA の分類段を ML に置き換え、動的フィルタの利点を検証。冒頭のみ確認のため参照のみ | — 参照のみ |
| 27 | [Quantum Genetic Optimization for Negative Selection Algorithms in Anomaly Detection](https://arxiv.org/abs/2605.22527) | 2026 | arXiv プレプリント | 最新 | EvoSeedRNSA の GA を量子遺伝的アルゴリズムに置換。単一データでの小規模評価のため参照のみ | — 参照のみ |
| 28 | [From static to adaptive: immune memory-based jailbreak detection for large language models](https://arxiv.org/abs/2512.03356) | 2025 | arXiv プレプリント | 最新 | 免疫記憶型の LLM 脱獄検知 IMAG。immune-network-ml（AI の免疫系）の範囲のため参照のみ | — 参照のみ |
| 29 | [AEGIS: Adversarial Entropy-Guided Immune System](https://arxiv.org/abs/2604.02149) | 2026 | arXiv プレプリント | 最新 | 名称は免疫系だが中身は状態空間モデルによる暗号化通信の異常検知。免疫機構が薄いため参照のみ | — 参照のみ |
| 30 | [Designing an Artificial Immune System inspired Intrusion Detection System](https://arxiv.org/abs/2208.07801) | 2022 | arXiv プレプリント | 発展 | 自己・非自己と危険理論を組み合わせた AIS-IDS の設計論。実験がなく参照のみ | — 参照のみ |

---

<a id="immune-network-ml"></a>

## 免疫ネットワーク理論と機械学習・AI との融合（immune-network-ml/）

資料：[immune-network-ml.pptx](immune-network-ml/immune-network-ml.pptx) ／ [immune-network-ml.pdf](immune-network-ml/immune-network-ml.pdf) ／ 生成元 [spec.json](immune-network-ml/spec.json) ／ [テーマ README](immune-network-ml/README.md)


### 調査履歴
- 2026-10-27: arXiv API と Web 検索で「immune network / artificial immune / immune-inspired × learning・LLM・agent・adversarial」を 2024〜2026 年から検索し、LLM ジェイルブレイク防御（TIM, IMAG）、エージェント防御（ANIS, AgentAntibody, GRAD）、深層 AIN による継続学習（Deep AIN）を最新動向として把握した。
- そこから系譜を遡り、Jerne (1974) → Farmer, Packard & Perelson (1986) の抗体濃度方程式 → 石黒・渡邊らの免疫ネットワーク型行動調停（J-STAGE で全文取得）→ Whitbrook・Aickelin らのイディオタイプ網ロボット制御、および aiNet・AIRS（免疫分類器）→ aiNet の批判的検証（Stibor+）の流れを追った。
- DNN との接点として RAILS（適応免疫型の敵対的防御）、計算免疫学との境界として DeepRC（現代 Hopfield＝注意による免疫レパートリー分類）を追加した。
- Jerne 1974・Farmer+ 1986・aiNet 原典（書籍章）・AIRS（Kent リポジトリ／ミシシッピ州立大の修論は到達不可）・渡邊+ 1998（JRM, 名古屋市大の著者ページは到達不可）は正規の公開版に到達できず本文未確認。OpenAlex は当日の無料枠切れ、Semantic Scholar は 429 で利用できなかった。

### 系譜
```
[免疫ネットワーク理論]
Jerne 1974（イディオタイプ網・本文未確認）
  └→ Farmer, Packard & Perelson 1986（抗体濃度の微分方程式・分類子システムとの対応・本文未確認）
        ├→ [ロボット行動調停] 石黒+ 1997 (Immunoid) → 渡邊+ 1998 → Whitbrook+ 2007（RL との比較）→ Whitbrook+ 2010（GA＋イディオタイプ網・実機移植）
        ├→ [データ解析] aiNet (de Castro & Von Zuben 2001) → Stibor+ 2007（圧縮品質の批判的検証）
        │                AIRS (Watkins+ 2002/2004, 免疫分類器)
        │                     └→ Deep AIN (Sithungu 2026, 構造化親和性によるクラス逐次学習)
        └→ [連想記憶との同型] Agliari+ 2011–13（免疫網＝多重 Hopfield）… DeepRC (Widrich+ 2020, 注意＝現代 Hopfield で免疫レパートリー分類)

[適応免疫 → 深層学習・LLM の防御]
CLONALG 2002（既存：clonal-selection） → RAILS 2022（DNN の敵対的防御）
  → TIM 2025（テスト時に検知→LoRA で獲得免疫） → IMAG 2025（免疫記憶バンク＋能動免疫）
  → ANIS 2026（エージェント免疫の概念設計） / AgentAntibody 2026（エピトープ・抗体ライブラリの自己進化） / GRAD 2026
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Towards a network theory of the immune system（Jerne） | 1974 | Ann. Immunol. (Inst. Pasteur) 125C:373–389 | 原典 | 抗体が抗原だけでなく他の抗体の idiotope も認識し、刺激・抑制のネットワークとして免疫系が自己調節するという仮説（検索情報・引用文献に基づく）。 | ⚠️ 本文未確認 |
| 2 | [The immune system, adaptation, and machine learning](https://doi.org/10.1016/0167-2789(86)90240-X) | 1986 | Physica D 22 | 原典 | Jerne の網を抗体濃度の微分方程式で定式化し、Holland の分類子システムとの類似を示した（抄録・引用文献に基づく）。以後のロボット AIS の大半がこの式を使う。 | ⚠️ 本文未確認 |
| 3 | [免疫情報処理機構に基づく分散型コンセンサス決定ネットワークの構築](https://doi.org/10.9746/sicetr1965.33.524) | 1997 | 計測自動制御学会論文集 | 原典 | 要素行動を抗体、状況を抗原とし paratope/idiotope の刺激・抑制で行動調停。生存時間 337→867。 | ✅ p.2 |
| 4 | [Emergent construction of a behavior arbitration mechanism based on the immune system](https://doi.org/10.1163/156855398X00163) | 1997 | Advanced Robotics | 発展 | 石黒・渡邊らによる免疫網型行動調停の英文誌版（検索情報）。 | — 参照のみ（本文未取得、J-STAGE 版で代替） |
| 5 | [Emergent construction of behavior arbitration mechanism based on the immune system](https://doi.org/10.1109/ICEC.1998.699855) / Autonomous Mobile Robot Behavior Control Using Immune Network (JRM 10(4)) | 1998 | ICEC 1998 / JRM | 発展 | 強化学習信号で idiotope を獲得し免疫網を自動構築、実機ゴミ集めロボットへ適用（検索情報、Whitbrook+ 2007 の記述）。著者ページ・出版社は到達不可。 | ⚠️ 本文未確認 |
| 6 | [Experimental Results On Compression Quality of aiNet](https://www.cs.ucdavis.edu/~vemuri/papers/papers/stibor_vemuri_foci.pdf)（採録版 doi:10.1109/FOCI.2007.371518） | 2007 | IEEE FOCI 2007 | 発展 | aiNet の出力が入力分布を保つかを Parzen 密度＋KL で検証し、密な領域で品質が悪いことを示した。採録版は Stibor & Timmis 名義。 | ✅ p.3 |
| 7 | [aiNet: An Artificial Immune Network for Data Analysis](https://doi.org/10.4018/978-1-930708-25-9.ch012) | 2001 | Data Mining: A Heuristic Approach（書籍章） | 原典 | クローン選択と抗体間抑制で冗長性を除いた代表点を作り、MST でクラスタリングする免疫網（Stibor+ 2007 の記述と検索情報）。 | ⚠️ 本文未確認 |
| 8 | [A resource limited artificial immune classifier](https://doi.org/10.1109/CEC.2002.1007049) / [AIRS: a revised version (GPEM 2004)](https://doi.org/10.1023/B:GENP.0000030197.83685.94) | 2002/2004 | CEC 2002 / GPEM | 原典 | 資源制限・クローン選択・記憶細胞を使う教師あり免疫分類器 AIRS（検索情報）。Kent リポジトリと修論は到達不可。 | ⚠️ 本文未確認 |
| 9 | [Idiotypic Immune Networks in Mobile Robot Control](https://arxiv.org/abs/0803.2981) | 2007 | IEEE TSMC-B | 発展 | RL のみ／簡略網／完全イディオタイプ網を比較し、完全網がスタック脱出を 8.53→4.78 反復に短縮。全文読了したが arXiv 版に図表がないため 2010 年版を代表としてスライド化。 | — 参照のみ（p.4 の s2 で引用） |
| 10 | [An Idiotypic Immune Network as a Short Term Learning Architecture for Mobile Robots](https://arxiv.org/abs/0910.3115) | 2008 | ICARIS 2008 | 発展 | GA で事前進化した行動をイディオタイプ網で選ぶ LTL-STL 構成の初出。 | — 参照のみ（後継の 2010 年版で代表） |
| 11 | [Two-Timescale Learning Using Idiotypic Behaviour Mediation For A Navigating Mobile Robot](https://arxiv.org/abs/1006.2945) | 2010 | Applied Soft Computing | 発展 | LTL-STL 構成の詳細版。 | — 参照のみ |
| 12 | [Real-world Transfer of Evolved Artificial Immune System Behaviours between Small and Large Scale Robotic Platforms](https://arxiv.org/abs/1305.7432) | 2010 | Evolutionary Intelligence | 発展 | epuck で進化させた行動をイディオタイプ網で Pioneer 実機へ移植。失敗率 0% 対 RL のみ 4〜17%。 | ✅ p.4 |
| 13 | [A Recommender System based on Idiotypic Artificial Immune Networks](https://arxiv.org/abs/0803.2970) | 2005 | J. Math. Modelling and Algorithms | 発展 | イディオタイプ網の抑制で推薦の多様性を確保（抄録）。 | — 参照のみ（推薦応用で本テーマの主線外） |
| 14 | [Immuno-inspired robotic applications: a review](https://arxiv.org/abs/1202.4261) | 2012 | arXiv | 発展 | 免疫着想ロボティクスのレビュー。石黒らの調停は限定的成果と評価（検索情報）。 | — 参照のみ |
| 15 | [Multitasking associative networks](https://arxiv.org/abs/1111.5191) / [Immune networks: multitasking capabilities near saturation](https://arxiv.org/abs/1305.5936) | 2012/2013 | PRL / J. Phys. A | 発展 | 免疫網（B・T 細胞）を多重処理する Hopfield 型連想記憶として統計力学で解析（抄録）。 | — 参照のみ（理論物理寄り） |
| 16 | [Modern Hopfield Networks and Attention for Immune Repertoire Classification](https://arxiv.org/abs/2007.13505) | 2020 | NeurIPS 2020 | 発展 | 注意＝現代 Hopfield で免疫レパートリーを多インスタンス分類（DeepRC）。CMV で AUC 0.831。 | ✅ p.5 |
| 17 | [Hopfield Networks is All You Need](https://arxiv.org/abs/2008.02217) | 2020 | ICLR 2021 | 発展 | Transformer 注意＝連続状態 Hopfield の更新則、指数的記憶容量（DeepRC の理論的基盤）。 | — 参照のみ |
| 18 | [ImmuNetNAS](https://arxiv.org/abs/2002.12704) | 2020 | arXiv | 発展 | 免疫網アルゴリズムで CNN アーキテクチャ探索（抄録）。 | — 参照のみ（NAS は最適化寄り） |
| 19 | [RAILS: A Robust Adversarial Immune-inspired Learning System](https://arxiv.org/abs/2107.02840) | 2022 | IEEE Access | 発展 | 適応免疫の群集・親和性成熟を DNN の敵対的防御に写す。CIFAR-10 PGD で 52.0%（DkNN 41.7%）。 | ✅ p.6 |
| 20 | [Immuno-mimetic Deep Neural Networks (Immuno-Net)](https://arxiv.org/abs/2107.02842) | 2021 | arXiv | 発展 | RAILS を含む免疫模倣 DNN の枠組み（抄録）。 | — 参照のみ（RAILS と重複） |
| 21 | [CLONALG](https://doi.org/10.1109/TEVC.2002.1011539) | 2002 | IEEE TEVC | 原典 | クローン選択アルゴリズム。RAILS・Deep AIN の更新則の源流。 | ↪ 既存：clonal-selection p.3 |
| 22 | Self-Nonself Discrimination in a Computer (Forrest+) | 1994 | IEEE S&P | 原典 | 負の選択。ANIS・AgentAntibody が先行 AIS として引用。 | — 参照のみ（negative-selection 担当の範囲） |
| 23 | [Test-Time Immunization (TIM)](https://arxiv.org/abs/2505.22271) | 2025 | arXiv | 最新 | 推論中に検知したジェイルブレイクで LoRA を逐次微調整し「獲得免疫」。ASR-50 は全設定 0%。 | ✅ p.7 |
| 24 | [From static to adaptive: immune memory-based jailbreak detection (IMAG)](https://arxiv.org/abs/2512.03356) | 2025 | arXiv | 最新 | 隠れ状態の記憶バンク照合＋2 エージェントの能動免疫＋記憶更新。平均検知精度 94%。 | ✅ p.8 |
| 25 | [Immune: Improving Safety Against Jailbreaks in Multi-modal LLMs via Inference-Time Alignment](https://arxiv.org/abs/2411.18688) | 2024 | CVPR 2025 | 最新 | 安全報酬モデルで復号を誘導する推論時整合（抄録）。免疫は名称のみ。 | — 参照のみ（免疫機構の写像なし） |
| 26 | [Rapid Response: Mitigating LLM Jailbreaks with a Few Examples](https://arxiv.org/abs/2411.07494) | 2024 | arXiv | 最新 | 少数の攻撃例から防御を素早く拡張（TIM の関連研究として引用）。 | — 参照のみ |
| 27 | [Antibody: Strengthening Defense Against Harmful Fine-Tuning](https://arxiv.org/abs/2603.00498) | 2026 | ICLR 2026 | 最新 | 有害サンプルの勾配寄与を抑える微調整防御（抄録）。免疫は名称のみ。 | — 参照のみ |
| 28 | [Immunization against harmful fine-tuning attacks](https://arxiv.org/abs/2402.16382) | 2024 | EMNLP 2024 | 最新 | 有害微調整への「免疫化」条件の定式化（抄録）。 | — 参照のみ |
| 29 | [VaccineRAG](https://arxiv.org/abs/2509.04502) | 2025 | arXiv | 最新 | 有害 RAG サンプルへの MLLM の耐性向上（抄録）。 | — 参照のみ |
| 30 | [Cowpox: Towards the Immunity of VLM-based Multi-Agent Systems](https://arxiv.org/abs/2508.09230) | 2025 | arXiv | 最新 | 感染拡大を抑える「治療サンプル」を配布するマルチエージェント防御（抄録）。 | — 参照のみ（疫学モデル寄り） |
| 31 | [Agent-Native Immune System (ANIS)](https://arxiv.org/abs/2606.28270) | 2026 | arXiv | 最新 | エージェント向け 6 層免疫アーキテクチャの概念論文。実験なし。 | ✅ p.9 |
| 32 | [AgentAntibody](https://arxiv.org/abs/2608.04053) | 2026 | arXiv | 最新 | エピトープ抽象化と抗体ライブラリの成熟・誘導で利用者の暗黙境界を学習。マクロ SU-HM 81.1%。 | ✅ p.10 |
| 33 | [GRAD: Graph-Structured Antibody Defense for LLM Agents](https://arxiv.org/abs/2610.22828) | 2026 | arXiv | 最新 | 実行グラフで分散した攻撃証拠を集約し、凍結エンコーダ上に検知エキスパート（抗体）を追加する継続適応（抄録）。 | — 参照のみ（時間の都合で本文精読せず） |
| 34 | [Structured Affinity for Unsupervised Visual Class-Incremental Memory in Deep Artificial Immune Networks](https://arxiv.org/abs/2608.20104) | 2026 | arXiv | 最新 | ZNCC 親和性の B 細胞フィルタを積層した Deep AIN でリプレイなしのクラス逐次学習。 | ✅ p.11 |
| 35 | [Immuno-VLM](https://arxiv.org/abs/2605.30745) | 2026 | ICML 2026 | 最新 | LLM で「意味的抗体（近傍外れ値の記述）」を生成し負の選択的に開集合認識（抄録）。 | — 参照のみ（negative-selection 寄り） |
| 36 | [AbGPT](https://arxiv.org/abs/2409.06090) / [S2ALM](https://arxiv.org/abs/2411.15215) | 2024 | arXiv | 最新 | 抗体配列言語モデルによる生成・表現学習（抄録）。計算免疫学側の境界。 | — 参照のみ（AIS との接続なし） |
| 37 | [AEGIS: Adversarial Entropy-Guided Immune System](https://arxiv.org/abs/2604.02149) | 2026 | arXiv | 最新 | 状態空間モデルによるゼロデイ通信回避検知を免疫系と称する（抄録）。 | — 参照のみ（侵入検知で negative-selection 寄り） |
