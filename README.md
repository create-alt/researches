# 群知能 — 先行研究調査

PSO・ACO などの群知能アルゴリズムについて、原著から理論・批判研究、ディープラーニングや GA との融合までの系譜をまとめる。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/`）は main ブランチから引き継いでいる。

## テーマ一覧

| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- | --- |
| 第1回 | [全体像（原著論文まわり）](#foundations) | 群知能の代表アルゴリズムの原著、理論解析、メタファー手法の乱立への批判研究 | [pptx](foundations/foundations.pptx) / [pdf](foundations/foundations.pdf) | 11 本 | 43 本 | 2026-10-23 |
| 第1回 | [DeepLearning・NN との融合](#deep-learning-fusion) | 群知能による NN・LLM の最適化、NN/DRL による群知能の強化、LLM を演算子とする群知能 | [pptx](deep-learning-fusion/deep-learning-fusion.pptx) / [pdf](deep-learning-fusion/deep-learning-fusion.pdf) | 10 本 | 24 本 | 2026-10-23 |
| 第1回 | [GA との融合](#ga-hybrid) | PSO と GA/DE のハイブリッド、モジュール化・自動構成、LLM による進化的アルゴリズム設計 | [pptx](ga-hybrid/ga-hybrid.pptx) / [pdf](ga-hybrid/ga-hybrid.pdf) | 10 本 | 30 本 | 2026-10-23 |
| 第2回 | [Meta-BBO と LLM による最適化アルゴリズムの自動設計](#metabbo) | ParamILS・L2O・LES から FunSearch・AlphaEvolve・MetaBox-v2・HADA まで、最適化器の設計の学習・自動化 | [pptx](metabbo/metabbo.pptx) / [pdf](metabbo/metabbo.pdf) | 10 本 | 32 本 | 2026-10-23 |
| 第2回 | [Consensus-Based Optimization（CBO）と群れの平均場理論](#cbo-mean-field) | CBO の原典から大域収束の証明、サンプリング・制約付きへの拡張、有限粒子・一様時間の解析、ES との接続まで | [pptx](cbo-mean-field/cbo-mean-field.pptx) / [pdf](cbo-mean-field/cbo-mean-field.pdf) | 10 本 | 35 本 | 2026-10-23 |
| 第2回 | [ACO の系譜と Neural ACO による大規模組合せ最適化](#aco-neural) | AntNet・MMAS のランタイム解析から、Attention Model・POMO・ML-ACO・ReEvo・HeatACO・TIDE まで | [pptx](aco-neural/aco-neural.pptx) / [pdf](aco-neural/aco-neural.pdf) | 10 本 | 34 本 | 2026-10-23 |
| 第3回 | [自動設計されたアルゴリズムの評価基盤（汎化・頑健性・新規性）](#algo-evaluation) | performance profile・ベイズ検定・COCO/IOHanalyzer から、構造バイアス、分布外評価（MA-BBOB）、LLM 生成ヒューリスティクスの汎化と BLADE まで | [pptx](algo-evaluation/algo-evaluation.pptx) / [pdf](algo-evaluation/algo-evaluation.pdf) | 11 本 | 47 本 | 2026-10-24 |
| 第3回 | [学習型群知能と、学習器・古典的探索の役割分担](#learned-swarm) | DE-DDQN・RL-DAS などの学習型制御と、DIMES・DIFUSCO・UTSP などヒートマップ型 NCO と探索器の分担、学習が効かない条件まで | [pptx](learned-swarm/learned-swarm.pptx) / [pdf](learned-swarm/learned-swarm.pdf) | 10 本 | 27 本 | 2026-10-24 |
| 第3回 | [粒子系最適化の理論の拡張](#particle-theory) | IGO・異方性 CBO・多目的／鞍点／二層 CBO・FedCBO と、NSGA-II・EDA のランタイム解析、ES/CBO の統一まで | [pptx](particle-theory/particle-theory.pptx) / [pdf](particle-theory/particle-theory.pdf) | 12 本 | 42 本 | 2026-10-24 |

合計：スライド化 94 本、引用論文一覧 314 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-23 | 第1回調査。「全体像（原著論文まわり）」、「DeepLearning・NN との融合」、「GA との融合」 の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版（OpenReview・学会予稿集・OA 誌・著者公開版など）で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典は ⚠️ 本文未確認として一覧に記載。 |
| 2026-10-23 | 第2回調査。第1回の推奨テーマ 「Meta-BBO と LLM による最適化アルゴリズムの自動設計」、「Consensus-Based Optimization（CBO）と群れの平均場理論」、「ACO の系譜と Neural ACO による大規模組合せ最適化」 を追加調査。既存デッキ（他分野を含む）でスライド化済みの論文は再掲せず、一覧で `↪ 既存：<theme> p.N` として参照。同じ回の別テーマで同じ論文を別の観点からスライド化した例が一部ある。 |
| 2026-10-24 | 第3回調査。第2回の推奨テーマ 「自動設計されたアルゴリズムの評価基盤（汎化・頑健性・新規性）」、「学習型群知能と、学習器・古典的探索の役割分担」、「粒子系最適化の理論の拡張」 を追加調査。既存デッキ（他分野を含む）でスライド化済みの論文は再掲せず、一覧で `↪ 既存：<theme> p.N` として参照。同じ回の別テーマで同じ論文を別の観点からスライド化した例が一部ある。 |

## 追加調査を推奨するテーマ

これまでの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。

1. **学習型・自動設計最適化の公平な評価プロトコル**  
   評価基盤テーマと学習型群知能テーマが同じ結論に達した。同予算の静的チューニング・ランダム基線・距離ベースの単純法と比べると学習の上乗せは小さく、統計的比較の作法（ベイズ・IRT・anytime 指標）も揃っていない。比較手順そのものを1テーマとして整理する。

2. **LLM による評価問題の自動生成と、手法との共進化**  
   EoTF のように評価用の問題を LLM で生成する研究が出始め、LLM 生成ヒューリスティクスの分布外汎化の弱さ（Beyond the Hype）も報告された。問題生成と手法生成の共進化、組合せ最適化での分布外ベンチマークを追う。

3. **共分散適応・回転不変な粒子系最適化と、連続空間のランタイム解析**  
   IGO・異方性 CBO・CMA-ES の理論が接続し始め、ドリフト理論を ES・CBO に適用する連続空間のランタイム解析も進んでいる。PSO・ACO 固有の状態表現を学習型制御にどう与えるか（群知能版 MetaBBO の弱さの原因）も合わせて調べる。

<details><summary>第1回の推奨テーマ（第2回で調査済み）</summary>

- Meta-Black-Box Optimization と LLM による最適化アルゴリズムの自動設計 → [Meta-BBO と LLM による最適化アルゴリズムの自動設計](#metabbo)
- Consensus-Based Optimization（CBO）と群れの平均場理論 → [Consensus-Based Optimization（CBO）と群れの平均場理論](#cbo-mean-field)
- ACO の系譜と Neural ACO による大規模組合せ最適化 → [ACO の系譜と Neural ACO による大規模組合せ最適化](#aco-neural)

</details>

<details><summary>第2回の推奨テーマ（第3回で調査済み）</summary>

- 自動設計されたアルゴリズムの評価基盤（汎化・頑健性・新規性） → [自動設計されたアルゴリズムの評価基盤（汎化・頑健性・新規性）](#algo-evaluation)
- 学習型群知能と、ヒートマップ型 NCO における「学習器と探索器の分担」 → [学習型群知能と、学習器・古典的探索の役割分担](#learned-swarm)
- 粒子系最適化の理論の拡張（ES/CMA-ES との統一、多目的・二層・ゲーム、ランタイム解析） → [粒子系最適化の理論の拡張](#particle-theory)

</details>

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は既存デッキ（他分野の場合は `<field>/<theme>`）でスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。

---

<a id="foundations"></a>

## 全体像（原著論文まわり）（foundations/）

資料：[foundations.pptx](foundations/foundations.pptx) ／ [foundations.pdf](foundations/foundations.pdf) ／ 生成元 [spec.json](foundations/spec.json) ／ [テーマ README](foundations/README.md)


### 調査履歴
- 2026-10-23: 最新動向として「metaphor-based metaheuristics」批判と 2024〜2026 年のサーベイを起点にした（arXiv API・Web 検索）。Molina+ 2025（Paradox of Success）、Vermetten+ 2024（GECCO、294 手法の BBOB 評価）、Fister+ 2026（等価性判定）、Camacho-Villalón+ 2026（npj AI の Comment）で現在地を確認し、そこから中心バイアス批判（Kudela 2023）を経て、批判の的になった Yang の Firefly / Cuckoo / Bat の原著（arXiv に著者投稿版あり）へ遡った。
- 理論の系譜は「PSO convergence / consensus-based optimization」で検索し、Huang+ 2022（平均場による大域収束）→ Borghi+ 2026（停滞仮定の解析と平均場を離散時間で接続）を追った。集団運動の原典として、arXiv に著者版がある Vicsek+ 1995 を読んだ。
- ネットワーク拡張後、Boids・PSO 1995・ACO・ABC・GWO・SPSO 2011・Sörensen 2015・Aranha+ 2022・Camacho-Villalón+ 2023 の OA 版を OpenAlex（oa_url）と Semantic Scholar（openAccessPdf）で探した。OA 版の所在は大学リポジトリ（Griffith、Aston、ULB/IRIDIA、HAL など）と Wiley に限られ、いずれもこの環境からは到達できなかったため、「本文未確認」のまま残した。npj AI の Comment（Camacho-Villalón+ 2026）だけは nature.com の OA 版を全文で読めたので、スライドにした。
- スライドにした 11 本のうち 10 本は arXiv 版（2023 年以降のものは HTML 版の図を含む）、1 本は nature.com の OA 版で、いずれも全文を読んだ。

### 系譜
```
【集団運動・群知能の原点】                         【アルゴリズムの原典】
Reynolds 1987 Boids ⚠ ─┐                         Dorigo 1991/92 Ant System ⚠ → Dorigo+ 1996 TSMC-B ⚠
Vicsek+ 1995 ✅ ───────┼─(局所整列＋ノイズ)        └→ ACS (Dorigo & Gambardella 1997) ⚠ → MMAS / ACO_R ⚠
Beni & Wang 1989 "swarm intelligence" ⚠            Kennedy & Eberhart 1995 PSO ⚠
Bonabeau+ 1999 (書籍) ⚠ ─────────────────────────→ ├→ 慣性重み Shi & Eberhart 1998 ⚠
                                                   ├→ 収縮係数・安定性 Clerc & Kennedy 2002 ⚠
                                                   └→ 標準化 SPSO 2006/2007/2011 (Clerc; Zambrano-Bigiarini+ 2013) ⚠
                                                   Karaboga 2005 ABC ⚠ → Karaboga & Basturk 2007 ⚠

【メタファー手法の量産期（2009〜）】 Yang の 3 手法はいずれも PSO / ES / SA の言い換えと後に批判された
  Firefly (Yang 2009) ✅ ─┐  ※この 3 本の GA・PSO 基準値は同じ数値の使い回し
  Cuckoo (Yang & Deb 2009) ✅ ┼→ GWO (Mirjalili+ 2014) ⚠ → WOA (2016) ⚠ → … 500 超の「新」手法
  Bat (Yang 2010) ✅ ───────┘

【批判の系譜】
  Weyland 2010 HS≒ES ⚠ → Sörensen 2015「metaphor exposed」⚠ → Lones 2020 用語の翻訳 (参照)
   → Camacho-Villalón+ 2019 IWD / 2020 GWO・FA・BA / 2022 CS≡(μ+λ)-ES / 2023 ITOR 6 手法 ⚠
   → Aranha+ 2022 公開書簡 (Swarm Intelligence) ⚠
   → 中心バイアス: Kudela 2022 NMI ⚠ → Kudela 2023 ✅（90 手法中 47）
   → 大規模ベンチマーク: Vermetten+ 2024 GECCO ✅（294 手法 × BBOB）
   → 総括サーベイ: Molina+ 2025 SWEVO ✅ ／ 挙動の等価性判定: Fister+ 2026 ✅（批判の相対化）
   → 自動設計・LLM へ: Camacho-Villalón+ 2026 npj AI ✅ ← LLaMEA (van Stein & Bäck 2024, 参照)

【理論の系譜（PSO の収束解析）】
  Clerc & Kennedy 2002 停滞仮定・固有値 ⚠ ─────────────────────────────┐
  CBO: Pinnau+ 2017 → Carrillo+ 2018 (参照) → Fornasier+ 2021/24 (参照)   │
  Grassi & Pareschi 2020 PSO の SDE 化・平均場 (参照) → Huang+ 2022 ✅ ───┴→ Borghi+ 2026 ✅
                                                                            (離散時間で両者を接続)
                                                    → Hoffmann+ 2026 CBO→PSO (参照)
✅=スライド化 ⚠=本文未確認（検索情報に基づく）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Novel type of phase transition in a system of self-driven particles](https://arxiv.org/abs/cond-mat/0611743) | 1995 | Phys. Rev. Lett. | 原典 | 近傍の平均方向へ揃えてノイズを加えるだけの Vicsek モデル。無秩序運動から集団運動への運動学的相転移を示した（β≈0.45）。 | ✅ p.2 |
| 2 | [Firefly Algorithms for Multimodal Optimization](https://arxiv.org/abs/1003.1466) | 2009 | SAGA 2009 (LNCS 5792) | 原典 | 明るさと距離で減衰する誘引で動く Firefly Algorithm。γ→0 で PSO 型に帰着する。 | ✅ p.3 |
| 3 | [Cuckoo Search via Lévy Flights](https://arxiv.org/abs/1003.1594) | 2009 | NaBIC 2009 | 原典 | 托卵と Lévy 飛行による Cuckoo Search。パラメータは n と p_a の 2 つ。GA・PSO の数値は FA 論文と同一。 | ✅ p.4 |
| 4 | [A New Metaheuristic Bat-Inspired Algorithm](https://arxiv.org/abs/1004.4170) | 2010 | NICSO 2010 (SCI 284) | 原典 | 周波数・音量・パルス率で探索を制御する Bat Algorithm。著者自身が PSO・HS に退化すると述べている。 | ✅ p.5 |
| 5 | [On the Global Convergence of Particle Swarm Optimization Methods](https://arxiv.org/abs/2201.12460) | 2022 | Appl. Math. Optim. 88 (2023) | 発展 | SDE 化した PSO の平均場解析で大域最小への収束を証明し、記憶なし版では多項式計算量を示した。MNIST の CNN で約 97%。 | ✅ p.6 |
| 6 | [The Evolutionary Computation Methods No One Should Use](https://arxiv.org/abs/2301.01984) | 2023 | arXiv プレプリント | 発展 | シフト試験で中心バイアスを検出し、90 手法中 47 手法で確認した（GWO 8.89e5 など）。 | ✅ p.7 |
| 7 | [Large-scale Benchmarking of Metaphor-based Optimization Heuristics](https://arxiv.org/abs/2402.09800) | 2024 | GECCO 2024 | 最新 | 294 実装を BBOB で一斉評価した。ランダム探索に劣る実装が多い一方、補完性をもつ手法もある。 | ✅ p.8 |
| 8 | [The Paradox of Success in Evolutionary and Bioinspired Optimization: Revisiting Critical Issues, Key Studies, and Methodological Pathways](https://arxiv.org/abs/2501.07515) | 2025 | Swarm Evol. Comput. 98 (2025) | 最新 | 新規性欠如・低品質実験・不適切ベンチマークを総括し、等価性検出・公正比較・自動設計への道筋をまとめたサーベイ。 | ✅ p.9 |
| 9 | [Beyond metaphors: rethinking metaphors in metaheuristics algorithm design](https://doi.org/10.1038/s44387-026-00089-z) | 2026 | npj Artif. Intell. (Comment) | 最新 | Dorigo らによる論考。メタファーに基づく手作業の設計を退け、自動設計・ML・LLM へ移るべきと主張する（nature.com の OA 版を全文で読んだ）。 | ✅ p.10 |
| 10 | [Framework for identifying the equivalence between Nature-Inspired Metaheuristics](https://arxiv.org/abs/2603.28255) | 2026 | arXiv プレプリント | 最新 | 挙動特徴ベクトルのコサイン類似度で等価性を判定する。accPSO≡accFA と判定した一方、一般には「A is B」を示すのは難しいとした。 | ✅ p.11 |
| 11 | [Long-time Stability and Convergence of Particle Swarm Optimization](https://arxiv.org/abs/2607.24696) | 2026 | arXiv プレプリント | 最新 | 停滞仮定による Schur 安定性解析と平均場解析を離散時間 PSO で統合し、O(N^−1/2) の誤差評価を与えた。 | ✅ p.12 |
| 12 | [Flocks, herds and schools: A distributed behavioral model](https://doi.org/10.1145/37401.37406) | 1987 | SIGGRAPH '87 (Computer Graphics 21(4)) | 原典 | Boids。分離・整列・結合の 3 つの局所規則で群れを生成する（検索情報に基づく）。OA 版なし（OpenAlex: closed）。 | ⚠️ 本文未確認 |
| 13 | Swarm intelligence in cellular robotic systems（Beni & Wang） | 1989 | NATO ASI（Robots and Biological Systems） | 原典 | 「swarm intelligence」という語の初出とされる（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 14 | Optimization, Learning and Natural Algorithms（Dorigo 博士論文）／ Ant System 技術報告 91-016 | 1991–92 | Politecnico di Milano | 原典 | ACO の起点となる Ant System の提案（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 15 | [Ant system: optimization by a colony of cooperating agents](https://doi.org/10.1109/3477.484436) | 1996 | IEEE TSMC-B 26(1) | 原典 | Ant System の journal 版。フェロモン付き確率的構築で TSP を解く（検索情報に基づく）。OA 版なし。 | ⚠️ 本文未確認 |
| 16 | [Ant colony system: a cooperative learning approach to the traveling salesman problem](https://doi.org/10.1109/4235.585892) | 1997 | IEEE TEC 1(1) | 発展 | ACS。局所／大域フェロモン更新と疑似乱数比例則（検索情報に基づく）。S2 が示す OA 版（code.ulb.ac.be）は到達不可。 | ⚠️ 本文未確認 |
| 17 | [Particle swarm optimization](https://doi.org/10.1109/ICNN.1995.488968) | 1995 | ICNN'95 | 原典 | PSO の原著。個体最良と全体最良への確率的加速（検索情報に基づく）。OA 版なし。 | ⚠️ 本文未確認 |
| 18 | [A modified particle swarm optimizer](https://doi.org/10.1109/ICEC.1998.699146) | 1998 | IEEE ICEC 1998 | 発展 | 慣性重み w を導入した、現在の標準形の起点（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 19 | [The particle swarm – explosion, stability, and convergence in a multidimensional complex space](https://doi.org/10.1109/4235.985692) | 2002 | IEEE TEC 6(1) | 発展 | 収縮係数と停滞仮定下の安定性解析。Borghi+ 2026 が出発点とする古典理論（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 20 | [Standard Particle Swarm Optimisation 2011 at CEC-2013: A baseline for future PSO improvements](https://doi.org/10.1109/CEC.2013.6557848) | 2013 | IEEE CEC 2013 | 発展 | SPSO 2011（適応的ランダムトポロジ・回転不変性）を CEC-2013 の 28 関数で評価したベースライン（検索情報に基づく）。Clerc の SPSO 記述は [HAL hal-00764996](https://hal.science/hal-00764996)（到達不可）。 | ⚠️ 本文未確認 |
| 21 | Bonabeau, Dorigo, Theraulaz: Swarm Intelligence: From Natural to Artificial Systems | 1999 | Oxford Univ. Press（書籍） | 原典 | 群知能を体系化した教科書（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 22 | Karaboga: An idea based on honey bee swarm for numerical optimization (TR06) | 2005 | Erciyes Univ. 技術報告 | 原典 | ABC（Artificial Bee Colony）の初出（検索情報に基づく）。著者所属の公開 PDF（abc.erciyes.edu.tr）は到達不可。 | ⚠️ 本文未確認 |
| 23 | [A powerful and efficient algorithm for numerical function optimization: artificial bee colony (ABC) algorithm](https://doi.org/10.1007/s10898-007-9149-x) | 2007 | J. Global Optim. 39 | 発展 | ABC の journal 版（検索情報に基づく）。Kudela 2023 の試験では中心バイアスなし（1.29）。 | ⚠️ 本文未確認 |
| 24 | [Grey Wolf Optimizer](https://doi.org/10.1016/j.advengsoft.2013.12.007) | 2014 | Adv. Eng. Softw. 69 | 原典（メタファー期） | α・β・δ 狼の重心へ移動する GWO（検索情報に基づく）。Kudela 2023 では中心バイアス 8.89e5。OA 版（Griffith リポジトリ）は到達不可。 | ⚠️ 本文未確認 |
| 25 | The Whale Optimization Algorithm（Mirjalili & Lewis） | 2016 | Adv. Eng. Softw. 95 | 発展（メタファー期） | 中心バイアス（1.87e3）と PSO/ES との類似が批判されている（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 26 | A rigorous analysis of the harmony search algorithm（Weyland） | 2010 | IJAMC 1(2) | 批判 | Harmony Search は ES の特殊例だと示した初期の批判（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 27 | [Metaheuristics—the metaphor exposed](https://doi.org/10.1111/itor.12001) | 2015 | ITOR 22(1) | 批判（原典） | メタファー手法の乱立を告発した宣言的論文（検索情報に基づく）。OA 版（Wiley）は到達不可。 | ⚠️ 本文未確認 |
| 28 | The intelligent water drops algorithm: why it cannot be considered a novel algorithm（Camacho-Villalón+） | 2019 | Swarm Intelligence 13(3) | 批判 | IWD は ACO の特殊例だとする解析（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 29 | Grey wolf, firefly and bat algorithms: three widespread algorithms that do not contain any novelty（Camacho-Villalón+） | 2020 | ANTS 2020 (LNCS 12421) | 批判 | GWO・FA・BA を PSO 変種として書き直した解析（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 30 | An analysis of why cuckoo search does not bring any novel ideas to optimization（Camacho-Villalón+） | 2022 | Comput. Oper. Res. | 批判 | CS≡(μ+λ)-ES（＋DE 成分）とする解析（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 31 | [Exposing the grey wolf, moth-flame, whale, firefly, bat, and antlion algorithms](https://doi.org/10.1111/itor.13176) | 2023 | ITOR 30(6) | 批判 | 6 手法をコンポーネント単位で分解し、PSO/ES の言い換えだと示した（検索情報に基づく）。OA 版（Wiley・ULB）は到達不可。 | ⚠️ 本文未確認 |
| 32 | [Metaphor-based metaheuristics, a call for action: the elephant in the room](https://doi.org/10.1007/s11721-021-00202-9) | 2022 | Swarm Intelligence 16 | 批判 | 90 名超が署名した編集方針への公開書簡（検索情報に基づく）。OA 版（Springer・Aston）は到達不可。 | ⚠️ 本文未確認 |
| 33 | [A critical problem in benchmarking and analysis of evolutionary computation methods](https://doi.org/10.1038/s42256-022-00579-0) | 2022 | Nature Mach. Intell. 4 | 批判 | 7 手法の中心バイアスを示し、うち 1 手法しか古典手法に勝てなかった（検索情報に基づく）。OA なし。 | ⚠️ 本文未確認 |
| 34 | [Mitigating Metaphors: A Comprehensible Guide to Recent Nature-Inspired Algorithms](https://arxiv.org/abs/1902.08001) | 2019 | SN Comput. Sci. 1 (2020) | 批判 | 被引用数の多い近年の手法を標準的な最適化用語に翻訳したガイド。冒頭のみ読んだ。Molina+ 2025 と重なるため参照にとどめた。 | — 参照のみ |
| 35 | [From particle swarm optimization to consensus based optimization: stochastic modeling and mean-field limit](https://arxiv.org/abs/2012.05613) | 2020 | arXiv プレプリント | 発展 | PSO を SDE 化して平均場（VFP 方程式）を導き、小慣性極限で CBO に繋げた。Abstract のみ確認し、Huang+ 2022 を代表として扱った。 | — 参照のみ |
| 36 | [A consensus-based model for global optimization and its mean-field limit](https://arxiv.org/abs/1604.05648) | 2016 | arXiv プレプリント | 発展 | CBO の提案（Pinnau+）。PSO 平均場理論の土台。メタデータのみ確認。 | — 参照のみ |
| 37 | [An analytical framework for consensus-based global optimization method](https://arxiv.org/abs/1602.00220) | 2016 | M3AS 28(6) (2018) | 発展 | CBO の分散ベース収束解析（Carrillo+）。Huang+ 2022 の解析手法の源。メタデータのみ確認。 | — 参照のみ |
| 38 | [Consensus-Based Optimization Methods Converge Globally](https://arxiv.org/abs/2103.15130) | 2021 | SIAM J. Optim. 34(3) (2024) | 発展 | CBO の大域収束（Fornasier+）。メタデータのみ確認。次テーマ候補。 | — 参照のみ |
| 39 | [From Consensus-Based Optimization to Particle Swarm Optimization: Convergence Guarantees under Drift-Diffusion Coupling](https://arxiv.org/abs/2609.17002) | 2026 | NeurIPS 2026 Workshop (DynaFront) 投稿 | 最新 | CBO から PSO への収束保証の移植。Borghi+ 2026 と同系統の最新作で、時間の都合でスライドから外した。 | — 参照のみ |
| 40 | [LLaMEA: A Large Language Model Evolutionary Algorithm for Automatically Generating Metaheuristics](https://arxiv.org/abs/2405.20132) | 2024 | IEEE TEVC | 最新 | LLM でメタヒューリスティクスを生成・進化させる。Molina+ と Camacho-Villalón+ が代替路線として引用。群知能の原著テーマからは外れるため参照のみ。 | — 参照のみ |
| 41 | [Salp Swarm Optimization: a Critical Review](https://arxiv.org/abs/2106.01900) | 2021 | Expert Syst. Appl. 189 (2022) | 批判 | SSA の更新則・物理的動機・実装の不一致と中心バイアスを指摘した。批判例の一つとして参照。 | — 参照のみ |
| 42 | [Weak convergence of particle swarm optimization](https://arxiv.org/abs/1811.04924) | 2018 | arXiv プレプリント | 発展 | PSO の弱収束に関する初期の確率論的解析。Huang+ 2022 の先行研究として参照。 | — 参照のみ |
| 43 | [Comparing Optimization Algorithms Through the Lens of Search Behavior Analysis](https://arxiv.org/abs/2507.01668) | 2025 | arXiv プレプリント | 最新 | 探索挙動に基づくアルゴリズム比較（Cenikj+）。Fister+ 2026 と問題意識が近い。タイトルのみ確認。 | — 参照のみ |

---

<a id="deep-learning-fusion"></a>

## DeepLearning・NN との融合（deep-learning-fusion/）

資料：[deep-learning-fusion.pptx](deep-learning-fusion/deep-learning-fusion.pptx) ／ [deep-learning-fusion.pdf](deep-learning-fusion/deep-learning-fusion.pdf) ／ 生成元 [spec.json](deep-learning-fusion/spec.json) ／ [テーマ README](deep-learning-fusion/README.md)


### 調査履歴
- 2026-10-23: arXiv API（"particle swarm" AND "large language model"、swarm AND "neural architecture search"、"ant colony" AND neural、"meta-black-box"、swarm AND MARL 等）と WebSearch で 2024〜2026 年の動向を把握した。そこから融合の方向別に3系譜（①群知能でNN/LLMを最適化、②NN/DRLで群知能を学習・強化、③LLMを群知能の演算子に）と、深層MARLによる群制御の起点を遡った。
- ①は Heterogeneous Swarms → Model Swarms → IPPSO（PSO による CNN 構造探索）、②は DyNACO → GFACS → DeepACO と GLEET（MetaBBO 系）、③は SwarmAgentic → LMPSO（→ OPRO/LMEA）の順に遡った。
- 採録先は arXiv コメントと Crossref で確認した（LMPSO＝IEEE CEC 2025、SwarmAgentic＝EMNLP 2025）。ネットワーク拡張後に psoCNN（Elsevier、bronze OA）と Socha & Blum 2007（Springer）の公開版を Semantic Scholar・Crossref・doi.org で探したが、いずれも出版社サイトにしかなく本文を取得できなかった。OpenAlex は当日のレート上限で使えなかった。

### 系譜
```
① 群知能で NN / LLM を最適化（重み・構造・役割）
   [Kennedy & Eberhart 1995 PSO（別テーマ）]
     └→ IPPSO (Wang+ 2018, PSOでCNN構造探索) ─┬→ psoCNN (2019) / DeepSwarm (ACO-NAS, 2019)
                                                 └→ Model Swarms (Feng+ 2024, LLM重み空間でPSO)
                                                       └→ Heterogeneous Swarms (Feng+ 2025, 役割DAG+重みをPSO)

② NN / 深層RL で群知能を学習・強化（learning to optimize）
   ACO 側:  DeepACO (Ye+ 2023, GNNでη学習) → GFACS (Kim+ 2024, GFlowNetで多峰事前分布)
                 └──────────────→ NeuFACO (2025) → DyNACO (Tran+ 2026, フェロモンを観測する動的誘導)
   PSO 側:  L2L w/o GD (Chen+ 2017) → DRL-PSO/RLEPSO → GLEET (Ma+ 2024, Transformerで粒子ごとにEET制御)
            （MetaBox 2023 / LES 2022 など MetaBBO 潮流）

③ LLM を群知能の演算子に
   OPRO / LMEA (2024) → LMPSO (Shinohara+ 2025, 速度=プロンプト)
                          └→ SwarmAgentic (Zhang+ 2025, 言語PSOでエージェント系を生成) → AgentPSO (2026)
   Model Swarms ─────────────┘（LLM×PSO の重み版）

④ 深層MARL による群制御
   Hüttenrauch+ 2019（平均埋め込みDRL）→ GNN群制御 / LLM駆動の群シミュレーション (Jimenez-Romero+ 2025)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Evolving Deep Convolutional Neural Networks by Variable-length Particle Swarm Optimization for Image Classification](https://arxiv.org/abs/1803.06492) | 2018 | IEEE CEC 2018 | 原典 | IP アドレス風の符号化と Disabled 層で、可変長 CNN 構造を PSO で探索（IPPSO）。MDRBI で既存12手法より低い誤差 | ✅ p.2 |
| 2 | [Deep Reinforcement Learning for Swarm Systems](https://arxiv.org/abs/1807.06613) | 2019 | JMLR 2019 | 原典 | 近傍観測の平均埋め込みを状態とする深層RLで、群の分散方策を学習。個体数が変わっても転用できる | ✅ p.3 |
| 3 | [DeepACO: Neural-enhanced Ant Systems for Combinatorial Optimization](https://arxiv.org/abs/2309.14032) | 2023 | NeurIPS 2023 | 原典 | ACO のヒューリスティック η を GNN＋REINFORCE で学習。8種の組合せ最適化で ACO を一貫して改善 | ✅ p.4 |
| 4 | [Ant Colony Sampling with GFlowNets for Combinatorial Optimization](https://arxiv.org/abs/2403.07041) | 2024 | AISTATS 2025 | 発展 | DeepACO の η を GFlowNet（off-policy, energy reshaping）で学習して多峰の事前分布にし、ACO 探索との相乗を狙う（GFACS） | ✅ p.5 |
| 5 | [Auto-configuring Exploration-Exploitation Tradeoff in Evolutionary Computation via Deep Reinforcement Learning](https://arxiv.org/abs/2404.08239) | 2024 | GECCO 2024 | 発展 | Transformer 方策が PSO の粒子ごとの c1 を動的制御。問題クラスで学習し未知問題へ汎化（GLEET） | ✅ p.6 |
| 6 | [Model Swarms: Collaborative Search to Adapt LLM Experts via Swarm Intelligence](https://arxiv.org/abs/2410.11163) | 2024 | ICML 2025 | 発展 | LoRA 専門家を粒子として重み空間を PSO 探索し、200事例程度で LLM を適応。12の合成手法を上回る | ✅ p.7 |
| 7 | [Heterogeneous Swarms: Jointly Optimizing Model Roles and Weights for Multi-LLM Systems](https://arxiv.org/abs/2502.04510) | 2025 | NeurIPS 2025 | 最新 | マルチLLM系の DAG（役割）と重みを、PSO で交互に最適化。JFK-score で個別の貢献を評価 | ✅ p.8 |
| 8 | [Large Language Models as Particle Swarm Optimizers](https://arxiv.org/abs/2504.09247) | 2025 | IEEE CEC 2025 | 最新 | 速度をプロンプトで表し、LLM が次の解を生成する LMPSO。TSP、ヒューリスティック改良、記号回帰で評価 | ✅ p.9 |
| 9 | [SwarmAgentic: Towards Fully Automated Agentic System Generation via Swarm Intelligence](https://arxiv.org/abs/2506.15672) | 2025 | EMNLP 2025 | 最新 | エージェント系を言語の粒子として、LLM が失敗を考慮した速度・位置更新を行い、ゼロから自動生成 | ✅ p.10 |
| 10 | [Beyond Static Priors: Dynamic Neural Guidance for Large-Scale Ant Colony Optimization](https://arxiv.org/abs/2606.04039) | 2026 | KDD 2026 | 最新 | フェロモンと現行解を観測する semi-MDP 方策で ACO を動的に誘導（DyNACO）。TSP 10万ノードまで拡張 | ✅ p.11 |
| 11 | [Particle swarm optimization of deep neural networks architectures for image classification](https://doi.org/10.1016/j.swevo.2019.05.010) | 2019 | Swarm and Evolutionary Computation | 発展 | psoCNN。PSO で CNN 構造を探索する代表的研究（被引用数約350）。S2 上は bronze OA だが Elsevier にしかなく、本文を取得できない（検索情報に基づく） | ⚠️ 本文未確認 |
| 12 | [An ant colony optimization algorithm for continuous optimization: application to feed-forward neural network training](https://doi.org/10.1007/s00521-007-0084-z) | 2007 | Neural Computing and Applications | 原典 | ACO_R（連続 ACO）を順伝播 NN の重み学習に適用した古典研究（検索情報に基づく）。Springer で到達不可 | ⚠️ 本文未確認 |
| 13 | Particle Swarm Optimization (Kennedy & Eberhart) | 1995 | IEEE ICNN 1995 | 原典 | PSO の原典。NN の重み学習を応用例に含む。群知能の原典は別テーマ「全体像」の担当なので、ここでは扱わない | — 参照のみ |
| 14 | [DeepSwarm: Optimising Convolutional Neural Networks using Swarm Intelligence](https://arxiv.org/abs/1905.07350) | 2019 | arXiv プレプリント | 発展 | ACO による NAS（フェロモン更新＋progressive NAS＋重み再利用）。①の代表は IPPSO としたため、概要・導入のみ確認 | — 参照のみ |
| 15 | [Learning to Learn without Gradient Descent by Gradient Descent](https://arxiv.org/abs/1611.03824) | 2017 | ICML 2017 | 原典 | RNN でブラックボックス最適化器を学習する L2O の起点。GLEET 系の背景としてメタデータのみ確認 | — 参照のみ |
| 16 | [Discovering Evolution Strategies via Meta-Black-Box Optimization](https://arxiv.org/abs/2211.11260) | 2022 | ICLR 2023 | 発展 | 注意機構でパラメータ化した ES をメタ学習（LES）。MetaBBO の代表例。群知能ではなく ES なのでスライド化しない | — 参照のみ |
| 17 | [MetaBox: A Benchmark Platform for Meta-Black-Box Optimization with Reinforcement Learning](https://arxiv.org/abs/2310.08252) | 2023 | NeurIPS 2023 | 発展 | RL で PSO/DE 等を制御する MetaBBO 手法のベンチマーク。GLEET の評価基盤の文脈 | — 参照のみ |
| 18 | [ReEvo: Large Language Models as Hyper-Heuristics with Reflective Evolution](https://arxiv.org/abs/2402.01145) | 2024 | NeurIPS 2024 | 発展 | DeepACO 著者による、LLM で ACO 等のヒューリスティックを進化させる研究。GA 型の LLM 最適化なので参照のみ | — 参照のみ |
| 19 | [NeuFACO: Neural Focused Ant Colony Optimization for Traveling Salesman Problem](https://arxiv.org/abs/2509.16938) | 2025 | arXiv プレプリント（RIVF'25 投稿） | 発展 | DyNACO と同じ著者による前段研究（PPO＋GNN で FACO を誘導）。DyNACO が上位互換なので参照のみ | — 参照のみ |
| 20 | [Large Language Model Enhanced Particle Swarm Optimization for Hyperparameter Tuning for Deep Learning Models](https://arxiv.org/abs/2504.14126) | 2025 | IEEE OJ-CS 2025（検索情報） | 最新 | 性能の悪い粒子の位置を LLM が置き換える PSO で DL のハイパラを調整。LMPSO と同系統なので検索結果のみ確認 | — 参照のみ |
| 21 | [Multi-Agent Systems Powered by Large Language Models: Applications in Swarm Intelligence](https://arxiv.org/abs/2503.03800) | 2025 | arXiv プレプリント | 最新 | NetLogo の蟻の採餌・鳥の群れで、エージェントの規則を GPT-4o のプロンプトに置き換える。アブストラクトのみ確認 | — 参照のみ |
| 22 | [AgentPSO: Evolving Agent Reasoning Skill via Multi-agent Particle Swarm Optimization](https://arxiv.org/abs/2605.08704) | 2026 | ICML 2026 AI4Math Workshop | 最新 | 自然言語のスキルを粒子状態、意味的な更新方向を速度として推論スキルを進化させる。ワークショップ論文なのでアブストラクトと導入のみ確認 | — 参照のみ |
| 23 | [Transformer-Guided Swarm Intelligence for Frugal Neural Architecture Search](https://arxiv.org/abs/2607.11826) | 2026 | arXiv プレプリント | 最新 | RL で学習した Transformer 制御器（大域探索）と ABC（局所探索）を組み合わせた省資源 NAS。題目・要旨のみ確認 | — 参照のみ |
| 24 | [G-ICSO-NAS: Shifting Gears between Gradient and Swarm for Robust Neural Architecture Search](https://arxiv.org/abs/2604.00703) | 2026 | IJCNN 2026 | 最新 | DARTS 系の勾配 NAS と競合群最適化（CSO）を段階的に切り替えるハイブリッド NAS。要旨のみ確認 | — 参照のみ |

---

<a id="ga-hybrid"></a>

## GA との融合（ga-hybrid/）

資料：[ga-hybrid.pptx](ga-hybrid/ga-hybrid.pptx) ／ [ga-hybrid.pdf](ga-hybrid/ga-hybrid.pdf) ／ 生成元 [spec.json](ga-hybrid/spec.json) ／ [テーマ README](ga-hybrid/README.md)


### 調査履歴
- 2026-10-23: arXiv API と Web 検索で「PSO × GA hybrid」「LLM × particle swarm」「LLaMEA」「memetic × swarm」「multi-objective PSO × genetic」を直近（2024〜2026）から検索。最新の LMPSO、Cen & Tan（群知能とプロンプトの共進化）、Urbańczyk+（逐次・並列・交互ハイブリッドの比較）、METAFOR を起点にした。
- 系譜は2本たどった。(A) 手作りハイブリッド → モジュール化・自動構成：参考文献から Breeding Swarms（GECCO 2005）、PGPHEA、Swarming GA（PLOS ONE）、PSODE、METAFOR へ。(B) LLM を変異・交叉演算子にする流れ：ELM → EoH → LLaMEA → LMPSO / Cen & Tan。
- 途中でネットワークが広がったため、本文未確認だった古典を OA 版で探し直した。Breeding Swarms は GECCO 2005 予稿の公開版、Swarming GA は PLOS ONE の OA 版で全文を読んだ。Juang 2004、Løvbjerg+ 2001、Angeline 1998、Moscato 1989、Poli+ 2005、FunSearch は正規の公開版に到達できなかった（Nature と PMC は認証・reCAPTCHA で止まった）。
- 多目的最適化での融合（MOPSO の変異演算子、MOEA/D × PSO など）は arXiv に全文がある適当な論文が見つからず、スライド化しなかった（下表で本文未確認として記載）。

### 系譜
```
[A] 手作りハイブリッド → 設計空間の自動探索
  Angeline 1998 / Løvbjerg+ 2001 / Juang 2004 HGAPSO（本文未確認）
     └→ Breeding Swarms (2005, GA 演算子 + VPAC 交叉)  ── PGPHEA (Shi+ 2003, 並列) / HPSOM (2005, 変異)
          └→ Swarming GA (2022, GA の中に PSO を入れ子)
               └→ Consecutive PSO-GA (2025, 逐次・並列・交互を比較)
     └→ DEPSO (2003) → PSODE (2020, モジュール化、800 通り) → METAFOR (2025, PSO/DE/CMA-ES を irace で自動設計)

[B] LLM を変異・交叉演算子・設計者にする
  ELM (2022, LLM = GP の変異) → LMX (2023, LLM = 交叉) / FunSearch (2023-24)
     └→ EoH (2024, 考え + コードを LLM で交叉・変異) → ReEvo (2024)
     └→ LLaMEA (2024, メタヒューリスティック全体を生成。DE/PSO ハイブリッドが多く出現) ← PSODE などのモジュール型枠組み
          └→ LMPSO (2025, PSO の速度 = プロンプト)
          └→ Cen & Tan (2025, 群知能の演算子とプロンプトを共進化)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Breeding Swarms: A GA/PSO Hybrid](https://doi.org/10.1145/1068009.1068035)（[公開 PDF](https://gpbib.pmacs.upenn.edu/gecco2005/docs/p161.pdf)） | 2005 | GECCO 2005 | 原典 | PSO に GA の選択・交叉・変異と速度を使う VPAC 交叉を組み込み、5関数で GA・PSO の双方をおおむね上回った | ✅ p.2 |
| 2 | [A Modular Hybridization of Particle Swarm Optimization and Differential Evolution](https://arxiv.org/abs/2006.11886) | 2020 | GECCO 2020 Companion | 発展 | PSO と DE をモジュール化して 800 通りのハイブリッドを BBOB で評価した。最良の DE には届かなかった | ✅ p.3 |
| 3 | [Swarming genetic algorithm: A nested fully coupled hybrid of GA and PSO](https://doi.org/10.1371/journal.pone.0275094) | 2022 | PLOS ONE | 発展 | GA ループに PSO を入れ子にした SGA。CEC2017 で平均順位 1.28 | ✅ p.4 |
| 4 | [Evolution through Large Models](https://arxiv.org/abs/2206.08896) | 2022 | arXiv | 原典 | コード LLM を GP の変異演算子にした ELM。MAP-Elites で Sodarace プログラムを大量生成 | ✅ p.5 |
| 5 | [Evolution of Heuristics: Towards Efficient Automatic Algorithm Design Using Large Language Model](https://arxiv.org/abs/2401.02051) | 2024 | ICML 2024 | 発展 | 考えとコードを LLM で交叉・変異させるヒューリスティック自動設計。FunSearch より大幅に少ない問い合わせ数 | ✅ p.6 |
| 6 | [LLaMEA: A Large Language Model Evolutionary Algorithm for Automatically Generating Metaheuristics](https://arxiv.org/abs/2405.20132) | 2024 | IEEE TEVC 2025 | 発展 | (1+,1)-ES で LLM にメタヒューリスティック全体を生成させ、BBOB 5D で CMA-ES 超えを得た | ✅ p.7 |
| 7 | [METAFOR: A Hybrid Metaheuristics Software Framework for Single-Objective Continuous Optimization Problems](https://arxiv.org/abs/2502.11225) | 2025 | arXiv | 最新 | PSO/DE/CMA-ES/局所探索の融合を irace で自動設計した。CMA-ES を含むハイブリッドが頑健 | ✅ p.8 |
| 8 | [Large Language Models as Particle Swarm Optimizers](https://arxiv.org/abs/2504.09247) | 2025 | IEEE CEC 2025 | 最新 | 粒子の速度をプロンプトとして表し、LLM が次の位置を生成する LMPSO | ✅ p.9 |
| 9 | [Sequential, Parallel and Consecutive Hybrid Evolutionary-Swarm Optimization Metaheuristics](https://arxiv.org/abs/2508.00229) | 2025 | ICCS 2025 Workshops | 最新 | PSO-GA の逐次・並列・交互（速度と個人最良を継承）を 10〜1000 次元で比較した | ✅ p.10 |
| 10 | [Beyond Algorithm Evolution: An LLM-Driven Framework for the Co-Evolution of Swarm Intelligence Optimization Algorithms and Prompts](https://arxiv.org/abs/2512.09209) | 2025 | arXiv | 最新 | FWA の演算子とプロンプトテンプレートを1つの LLM で共進化させ、EoH/ReEvo/FunSearch を上回った | ✅ p.11 |
| 11 | [A hybrid of genetic algorithm and particle swarm optimization for recurrent network design (Juang)](https://doi.org/10.1109/TSMCB.2003.818557) | 2004 | IEEE TSMC-B 34(2) | 原典 | HGAPSO。GA の上位個体を PSO で強化し、交叉・変異と組み合わせて RNN/ファジィネットを設計（検索情報による） | ⚠️ 本文未確認 |
| 12 | Hybrid particle swarm optimiser with breeding and subpopulations (Løvbjerg, Rasmussen, Krink) | 2001 | GECCO 2001 | 原典 | PSO に算術交叉（breeding）と部分集団を導入した初期のハイブリッド。改善は小さかったと後続研究が報告している。学生課題ページの複製しか見つからず、正規の公開版は確認できなかった | ⚠️ 本文未確認 |
| 13 | [Using selection to improve particle swarm optimization (Angeline)](https://doi.org/10.1109/ICEC.1998.699327) | 1998 | IEEE ICEC 1998 | 原典 | PSO に EA 型のトーナメント選択を導入した最初期の融合（検索情報による） | ⚠️ 本文未確認 |
| 14 | On Evolution, Search, Optimization, Genetic Algorithms and Martial Arts: Towards Memetic Algorithms (Moscato) | 1989 | Caltech C3P Report 826 | 原典 | ミーム的アルゴリズム（GA + 個体の局所学習）の命名と提案 | ⚠️ 本文未確認 |
| 15 | [Extending particle swarm optimisation via genetic programming (Poli, Langdon, Holland)](https://doi.org/10.1007/978-3-540-31989-4_26) | 2005 | EuroGP 2005 | 原典 | GP で PSO の力の式（更新則）を進化させた。LLM による更新則設計の前史 | ⚠️ 本文未確認 |
| 16 | [Mathematical discoveries from program search with large language models (FunSearch)](https://doi.org/10.1038/s41586-023-06924-6) | 2024 | Nature 625 | 原典 | LLM と島モデル進化でプログラムを探索し、cap set やビンパッキングで新しい解を発見した | ⚠️ 本文未確認 |
| 17 | Particle swarm optimization with crossover: a review and empirical analysis (Engelbrecht) | 2016 | Artificial Intelligence Review | 発展 | 交叉を使う PSO の総説と実験比較（検索情報による） | ⚠️ 本文未確認 |
| 18 | Handling multiple objectives with particle swarm optimization (Coello Coello+, MOPSO) | 2004 | IEEE TEVC 8(3) | 原典 | 外部アーカイブと変異演算子を持つ多目的 PSO。多目的での GA 演算子融合の代表（検索情報による） | ⚠️ 本文未確認 |
| 19 | Hybrid evolutionary algorithms based on PSO and GA / PSO-GA based hybrid evolutionary algorithm (Shi+) | 2003 | CEC 2003 / ICMLC 2003 | 原典 | 逐次型 PGSHEA と並列型 PGPHEA の原典。#3 と #9 で比較対象として再実装されている | ⚠️ 本文未確認 |
| 20 | A hybrid Particle Swarm Optimization applied to loss power minimization (Esmin+, HPSOM) | 2005 | IEEE Trans. Power Systems | 発展 | PSO に GA の変異を加えた HPSOM。#3 で比較対象になっている | ⚠️ 本文未確認 |
| 21 | [Particle Swarm Optimization: A survey of historical and recent developments with hybridization perspectives](https://arxiv.org/abs/1804.05319) | 2018 | MAKE 2019 | 発展 | GA/DE/SA/ACO/CS/ABC との融合を表で整理した総説。融合の分類（逐次・並列・演算子組込み）の出典として参照した。総説なのでスライド化は見送った | — 参照のみ |
| 22 | [Language Model Crossover: Variation through Few-Shot Prompting](https://arxiv.org/abs/2302.12170) | 2023 | ACM TELO（arXiv） | 発展 | LLM の few-shot 生成を交叉演算子として使う LMX。ELM と EoH の間をつなぐ。取得したが精読していない | — 参照のみ |
| 23 | [ReEvo: Large Language Models as Hyper-Heuristics with Reflective Evolution](https://arxiv.org/abs/2402.01145) | 2024 | NeurIPS 2024 | 発展 | 短期・長期の反省を入れた LLM 進化によるヒューリスティック設計。#10 の比較対象。精読していない | — 参照のみ |
| 24 | [LLM4CMO: Large Language Model-aided Algorithm Design for Constrained Multiobjective Optimization](https://arxiv.org/abs/2508.11871) | 2025 | arXiv | 最新 | 制約付き多目的 EA の混合演算子などを LLM で設計する。群知能を含まないためスライド化しなかった | — 参照のみ |
| 25 | [Behaviour Space Analysis of LLM-driven Meta-heuristic Discovery](https://arxiv.org/abs/2507.03605) | 2025 | arXiv | 最新 | LLaMEA が生成したアルゴリズムの探索挙動を可視化・分析した。要旨のみ確認 | — 参照のみ |
| 26 | [LLaMEA-SAGE: Guiding Automated Algorithm Design with Structural Feedback from Explainable AI](https://arxiv.org/abs/2601.21511) | 2026 | arXiv | 最新 | 生成コードの AST 特徴量と XAI で LLaMEA の変異指示を誘導する。要旨のみ確認 | — 参照のみ |
| 27 | [Robustness and Invariance of Hybrid Metaheuristics under Objective Function Transformations](https://arxiv.org/abs/2509.05445) | 2025 | arXiv | 最新 | 19 手法に共通のハイブリッド化演算子を加え、変換への頑健性を比べた。DE 系は頑健で PSO 系は劣化する。要旨のみ確認 | — 参照のみ |
| 28 | [Hybrid metaheuristics for architectural design optimization under small evaluation and wall-clock budgets](https://arxiv.org/abs/2610.26202) | 2026 | arXiv | 最新 | 少ない評価回数で使う CMA-ES+DE と PSO+DE 注入のハイブリッド。要旨のみ確認 | — 参照のみ |
| 29 | [Breeding Swarms: A New Approach to Recurrent Neural Network Training](https://gpbib.pmacs.upenn.edu/gecco2005/docs/p185.pdf) | 2005 | GECCO 2005 | 発展 | Breeding Swarms を RNN の学習に応用した姉妹論文。冒頭のみ確認 | — 参照のみ |
| 30 | [SwarmAgentic](https://arxiv.org/abs/2506.15672) / [AgentPSO](https://arxiv.org/abs/2605.08704) | 2025-26 | EMNLP 2025 / arXiv | 最新 | PSO で LLM エージェントシステムを最適化する逆向きの融合。テーマ外のため要旨のみ確認 | — 参照のみ |

---

<a id="metabbo"></a>

## MetaBBO と LLM によるアルゴリズム自動設計（metabbo/）

資料：[metabbo.pptx](metabbo/metabbo.pptx) ／ [metabbo.pdf](metabbo/metabbo.pdf) ／ 生成元 [spec.json](metabbo/spec.json) ／ [テーマ README](metabbo/README.md)


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

---

<a id="cbo-mean-field"></a>

## Consensus-Based Optimization（CBO）と群れの平均場理論（cbo-mean-field/）

資料：[cbo-mean-field.pptx](cbo-mean-field/cbo-mean-field.pptx) ／ [cbo-mean-field.pdf](cbo-mean-field/cbo-mean-field.pdf) ／ 生成元 [spec.json](cbo-mean-field/spec.json) ／ [テーマ README](cbo-mean-field/README.md)


### 調査履歴
- 2026-10-23: foundations 調査の推奨テーマ1を受けて、arXiv API で "consensus-based optimization" を新しい順に約100件洗い出し、2025〜2026 年の最新動向（一様時間 propagation of chaos、有限 N の安定性、CBO→ES/MPPI の統一、ロボット応用）を把握した。そこから Fornasier+ 2021（W2 距離による大域収束）→ Carrillo+ 2018（分散ベース解析）→ Pinnau+ 2017（原典）へ遡り、PSO との接続（Grassi & Pareschi 2021）、サンプリング（CBS 2022）、制約付き（Carrillo+ 2024）の拡張枝を追った。
- 原典 2 本（M3AS）を含め、スライドにした 10 本はすべて arXiv 版で全文を読んだ（2023 年以降の一部は HTML 版の図を利用）。理論論文は定理の主張と証明の方針まで読み、補題の細部の証明は概略のみ確認した。
- foundations 既存の Huang+ 2022（PSO の大域収束）、Borghi+ 2026（PSO の長時間安定性）、Vicsek 1995 は再掲せず、↪ で参照した。多目的・鞍点・二層・一様時間の別解など、関連論文はアブストラクトと序論で確認して一覧に載せた。

### 系譜
```
【原典】 Pinnau+ 2017 CBO ✅（Gibbs 重み平均への合意＋距離比例の雑音、平均場 PDE）
            │
            ├→ Carrillo+ 2018 ✅（平均場の適切性・分散ベースの合意と Laplace 原理）
            │      ├→ Carrillo+ 2019（成分ごと雑音・ミニバッチ, 高次元 ML）
            │      └→ Huang & Qiu 2021（平均場極限の定性的証明）
            │
            ├→ 【PSO との接続】 Grassi & Pareschi 2021 ✅（SD-PSO、慣性 m→0 で CBO）
            │      → Cipriani+ 2021（零慣性極限の厳密化）→ Huang+ 2022 PSO 大域収束 ↪foundations
            │      → Borghi+ 2026 PSO 長時間安定性 ↪foundations ／ Hoffmann+ 2026（係数結合下の保証）
            │
            ├→ 【転換点】 Fornasier+ 2021 ✅（W2 距離＝Lyapunov、初期条件の緩和、離散 CBO の確率的収束）
            │      ├→ Riedl+ 2023（CBO≒勾配降下の確率的緩和）
            │      ├→ Gerber+ 2023（CBO/CBS の定量的平均場極限）
            │      ├→ 【一様時間】 Huang & Kouhkouh 2024（再スケール版）／Bayraktar+ 2025（有界領域・弱）
            │      │          → Gerber+ 2025 ✅（原型 CBO で UiT PoC）→ Ha+ 2026（2階 CBO 版）
            │      ├→ 【有限 N・離散】 Göttlich+ 2025 ✅（合意多様体への指数安定）／Bonandin+ 2025（強収束）
            │      │          ／Bianchi+ 2025（固定小雑音での長時間）
            │      └→ 【雑音・離散化の再設計】 Fornasier+ 2026 ✅（δ-CBO→CF→CH=MPPI=(1,N)-ES）
            │                 → Sun+ 2026 ✅（ロボット軌道最適化）／Haug 2026（変種の平均場極限）
            │
            ├→ 【サンプリング】 Carrillo+ 2022 CBS ✅ → Gerber+ 2023 ／ Bungert+ 2022 polarized
            ├→ 【制約付き】 Borghi+ 2021（ペナルティ）→ Beddrich+ 2024（反射境界）→ Carrillo+ 2024 ✅（勾配強制項）
            ├→ 【多目的】 Borghi+ 2022 ／ 【鞍点】 Huang+ 2022 CBO-SP
            └→ 【機械学習】 Carrillo+ 2019 ／ Roith+ 2025（敵対的攻撃, NES との接続）／ De Deyn+ 2025（2層 NN の平均場）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [A consensus-based model for global optimization and its mean-field limit](https://arxiv.org/abs/1604.05648) | 2017 | M3AS | 原典 | CBO の提案。Gibbs 重み平均への合意と距離比例の雑音で探索し、平均場 PDE へ移行できる。d=20 Rastrigin で α が N より効く。 | ✅ p.2 |
| 2 | [An analytical framework for a consensus-based global optimization method](https://arxiv.org/abs/1602.00220) | 2018 | M3AS | 発展 | 平均場 Fokker–Planck の適切性、分散の指数減衰による合意、Laplace 原理で合意点が最小点近くにあることを証明。 | ✅ p.3 |
| 3 | [From particle swarm optimization to consensus based optimization: stochastic modeling and mean-field limit](https://arxiv.org/abs/2012.05613) | 2021 | M3AS | 発展 | PSO を記憶つき SDE（SD-PSO）にし、平均場 VFP 方程式と慣性 m→0 での CBO を形式的に導出。 | ✅ p.4 |
| 4 | [Consensus-based optimization methods converge globally](https://arxiv.org/abs/2103.15130) | 2021 | SIAM J. Optim. 2024 | 発展 | W2 距離を Lyapunov 関数とし、緩い初期条件で平均場の大域収束と離散 CBO の確率的収束を証明。 | ✅ p.5 |
| 5 | [Consensus Based Sampling](https://arxiv.org/abs/2106.02519) | 2022 | Stud. Appl. Math. | 発展 | 重み付き平均・共分散で事後分布サンプリングと MAP 推定を切り替える CBS。線形逆問題で収束率を明示。 | ✅ p.6 |
| 6 | [An interacting particle consensus method for constrained global optimization](https://arxiv.org/abs/2405.00891) | 2024 | arXiv | 発展 | 等式制約へ向かう勾配強制項つき CBO。平均場の指数収束と線形陰的離散化。ペナルティ CBO・CB2O を大きく上回る。 | ✅ p.7 |
| 7 | [Uniform-in-time propagation of chaos for Consensus-Based Optimization](https://arxiv.org/abs/2505.08669) | 2025 | arXiv | 最新 | 原型 CBO で一様時間の propagation of chaos（O(1/J)）と有限粒子の概収束を証明。 | ✅ p.8 |
| 8 | [Exponential stability of finite-N consensus-based optimization](https://arxiv.org/abs/2510.19565) | 2025 | arXiv | 最新 | 有限 N・有限 α の異方性 CBO が合意多様体へ指数安定（平均二乗の率 2λ−σ²）であることを示す。 | ✅ p.9 |
| 9 | [From Consensus-Based Optimization to Evolution Strategies: Proof of Global Convergence](https://arxiv.org/abs/2602.11677) | 2026 | arXiv | 最新 | δ-CBO・Consensus Freezing・Consensus Hopping（MPPI, ES）を接続し、不変測度と無限時間の指数収束を証明。 | ✅ p.10 |
| 10 | [Consensus-based Optimization (CBO): Towards Global Optimality in Robotics](https://arxiv.org/abs/2602.06868) | 2026 | arXiv | 最新 | ロボット軌道最適化に CBO を導入し、MPPI・CMA-ES より低コストの解を得る。 | ✅ p.11 |
| 11 | [On the Global Convergence of Particle Swarm Optimization Methods](https://arxiv.org/abs/2201.12460) | 2022 | Appl. Math. Optim. 2023 | 発展 | CBO の解析法を慣性・記憶つき PSO の平均場に移植した大域収束の証明。 | ↪ 既存：foundations p.6 |
| 12 | [Long-time Stability and Convergence of Particle Swarm Optimization](https://arxiv.org/abs/2607.24696) | 2026 | arXiv | 最新 | PSO の停滞仮定の解析と平均場理論を離散時間でつなぐ。 | ↪ 既存：foundations p.12 |
| 13 | [Novel type of phase transition in a system of self-driven particles](https://arxiv.org/abs/cond-mat/0611743) | 1995 | PRL | 原典 | 群れの集団運動モデル（Vicsek）。CBO が着想した合意・整列モデルの源流。 | ↪ 既存：foundations p.2 |
| 14 | [A consensus-based global optimization method for high dimensional machine learning problems](https://arxiv.org/abs/1909.09249) | 2019 | arXiv | 発展 | 成分ごとの雑音で次元依存を除き、ミニバッチで計算量を削減。高次元 ML 向け CBO（アブストラクトで確認） | — 参照のみ |
| 15 | [On the mean-field limit for the consensus-based optimization](https://arxiv.org/abs/2105.12919) | 2021 | arXiv | 発展 | 経験測度のタイトネスによる平均場極限の定性的証明。PSO にも拡張（アブストラクトで確認） | — 参照のみ |
| 16 | [Zero-Inertia Limit: from Particle Swarm Optimization to Consensus Based Optimization](https://arxiv.org/abs/2104.06939) | 2021 | arXiv | 発展 | Grassi & Pareschi の零慣性極限を収束率つきで厳密化（アブストラクトで確認） | — 参照のみ |
| 17 | [Constrained consensus-based optimization](https://arxiv.org/abs/2111.10571) | 2021 | arXiv | 発展 | 厳密ペナルティと反復的な係数更新による制約付き CBO（アブストラクトで確認） | — 参照のみ |
| 18 | [A consensus-based algorithm for multi-objective optimization and its mean-field description](https://arxiv.org/abs/2203.16384) | 2022 | arXiv | 発展 | スカラー化した部分問題を粒子群が同時に解く多目的 CBO（アブストラクトで確認）。多目的枝の代表 | — 参照のみ |
| 19 | [Consensus-Based Optimization for Saddle Point Problems](https://arxiv.org/abs/2212.12334) | 2022 | SIAM J. Control Optim. 2024 | 発展 | min/max の2群で非凸・非凹の大域ナッシュ均衡を求める CBO-SP（アブストラクトと序論で確認）。制約付きを優先しスライド化せず | — 参照のみ |
| 20 | [Gradient is All You Need? How Consensus-Based Optimization can be Interpreted as a Stochastic Relaxation of Gradient Descent](https://arxiv.org/abs/2306.09778) | 2023 | SIAM J. Math. Data Sci. 2026 | 発展 | 微分なしの CBO が SGD 的に振る舞うことを示し、勾配法の確率的緩和を説明（アブストラクトで確認） | — 参照のみ |
| 21 | [Mean-field limits for Consensus-Based Optimization and Sampling](https://arxiv.org/abs/2312.07373) | 2023 | arXiv | 発展 | 小確率事象を除く Sznitman 論法の一般化で CBO・CBS の定量的平均場極限（アブストラクトと Gerber+ 2025 の整理で確認） | — 参照のみ |
| 22 | [CBX: Python and Julia packages for consensus-based interacting particle methods](https://arxiv.org/abs/2403.14470) | 2024 | JOSS | 発展 | CBO 系手法の実装ライブラリ（CBXPy / ConsensusBasedX.jl）（アブストラクトで確認） | — 参照のみ |
| 23 | [Constrained Consensus-Based Optimization and Numerical Heuristics for the Few Particle Regime](https://arxiv.org/abs/2410.10361) | 2024 | arXiv | 発展 | 反射境界条件による制約付き CBO の収束率つき証明と少粒子向け工夫（アブストラクトで確認） | — 参照のみ |
| 24 | [Uniform-in-time mean-field limit estimate for the Consensus-Based Optimization](https://arxiv.org/abs/2411.03986) | 2024 | arXiv | 最新 | 合意点を κ で再スケールした CBO で一様時間の平均場極限（アブストラクトで確認） | — 参照のみ |
| 25 | [Uniform-in-time weak propagation of chaos for consensus-based optimization](https://arxiv.org/abs/2502.00582) | 2025 | arXiv | 最新 | 有界領域の CBO で弱誤差 O(1/N) が一様時間で成立（アブストラクトで確認） | — 参照のみ |
| 26 | [Consensus-based optimization for closed-box adversarial attacks and a connection to evolution strategies](https://arxiv.org/abs/2506.24048) | 2025 | arXiv | 最新 | Consensus Hopping と NES の関係を示し、敵対的攻撃で CBO が NES を上回る場合を報告（アブストラクトで確認） | — 参照のみ |
| 27 | [Consensus-Based Optimization Beyond Finite-Time Analysis](https://arxiv.org/abs/2509.12907) | 2025 | arXiv | 最新 | 小さい固定雑音の CBO の長時間挙動を平均場・有限粒子の両方で評価（アブストラクトで確認） | — 参照のみ |
| 28 | [A modified Consensus-Based Optimization model: consensus formation and uniform-in-time propagation of chaos](https://arxiv.org/abs/2511.19116) | 2025 | arXiv | 最新 | 正則化した Gibbs 重みで合意形成と一様時間 PoC を統一的に示す（アブストラクトで確認） | — 参照のみ |
| 29 | [Mean-Field Model for Two-Layer Neural Networks Trained with Consensus-Based Optimization](https://arxiv.org/abs/2511.21466) | 2025 | arXiv | 最新 | 2層 NN を CBO で学習し、Adam との比較・併用と Wasserstein-over-Wasserstein の平均場モデル（アブストラクトで確認） | — 参照のみ |
| 30 | [Strong Global Convergence of the Consensus-Based Optimization Algorithm](https://arxiv.org/abs/2512.10654) | 2025 | arXiv | 最新 | 離散時間 CBO の大域最小点への強い平均二乗収束を Δt・N の明示的な率で証明（本文確認済み。図・実験がなく、Fornasier+ 2021 の改良に当たるため参照のみ） | — 参照のみ |
| 31 | [Uniform-in-time propagation of chaos for Second-Order Consensus-Based Optimization](https://arxiv.org/abs/2605.20697) | 2026 | arXiv | 最新 | 速度に合意力と雑音が働く2階 CBO の一様時間 PoC（アブストラクトで確認） | — 参照のみ |
| 32 | [From Consensus-Based Optimization to Particle Swarm Optimization: Convergence Guarantees under Drift-Diffusion Coupling](https://arxiv.org/abs/2609.17002) | 2026 | arXiv（NeurIPS 2026 WS 投稿） | 最新 | PSO の係数結合の下でも CBO の収束保証が成り立つパラメータ域を構成（アブストラクトで確認） | — 参照のみ |
| 33 | [Quantitative Mean-Field Limits for Recent Variants of Consensus-Based Optimization](https://arxiv.org/abs/2610.02901) | 2026 | arXiv（修士論文） | 最新 | δ-CBO・CF・CH の定量的平均場極限（アブストラクトで確認） | — 参照のみ |
| 34 | [Convergence of a first-order consensus-based global optimization algorithm](https://arxiv.org/abs/1910.08239) | 2019 | arXiv | 発展 | 全粒子が共通の雑音をもつ簡略版 CBO の有限 N 解析（Göttlich+ 2025 の引用から把握。未読） | — 参照のみ |
| 35 | [Polarized consensus-based dynamics for optimization and sampling](https://arxiv.org/abs/2211.05238) | 2022 | Math. Program. 2025 | 発展 | 局所的な合意点で複数の最小点・多峰分布を扱う変種（タイトルと掲載情報のみ。未読） | — 参照のみ |

---

<a id="aco-neural"></a>

## ACO の系譜と Neural ACO による大規模組合せ最適化（aco-neural/）

資料：[aco-neural.pptx](aco-neural/aco-neural.pptx) ／ [aco-neural.pdf](aco-neural/aco-neural.pdf) ／ 生成元 [spec.json](aco-neural/spec.json) ／ [テーマ README](aco-neural/README.md)


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

---

<a id="algo-evaluation"></a>

## 自動設計アルゴリズムの評価基盤（algo-evaluation/）

資料：[algo-evaluation.pptx](algo-evaluation/algo-evaluation.pptx) ／ [algo-evaluation.pdf](algo-evaluation/algo-evaluation.pdf) ／ 生成元 [spec.json](algo-evaluation/spec.json) ／ [テーマ README](algo-evaluation/README.md)


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

---

<a id="learned-swarm"></a>

## 学習型群知能と、学習器・古典的探索の役割分担（learned-swarm/）

資料：[learned-swarm.pptx](learned-swarm/learned-swarm.pptx) ／ [learned-swarm.pdf](learned-swarm/learned-swarm.pdf) ／ 生成元 [spec.json](learned-swarm/spec.json) ／ [テーマ README](learned-swarm/README.md)


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

---

<a id="particle-theory"></a>

## 粒子系最適化の理論の拡張（ES/CMA-ES 統一・多目的/二層/ゲーム・ランタイム解析）（particle-theory/）

資料：[particle-theory.pptx](particle-theory/particle-theory.pptx) ／ [particle-theory.pdf](particle-theory/particle-theory.pdf) ／ 生成元 [spec.json](particle-theory/spec.json) ／ [テーマ README](particle-theory/README.md)


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
