# 群知能 — 先行研究調査

PSO・ACO などの群知能アルゴリズムについて、原著から理論・批判研究、ディープラーニングや GA との融合までの系譜をまとめる。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/ochiai/`）は main ブランチから引き継いでいる。

## テーマ一覧

| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- | --- |
| 第1回 | [全体像（原著論文まわり）](#foundations) | 群知能の代表アルゴリズムの原著、理論解析、メタファー手法の乱立への批判研究 | [pptx](foundations/foundations.pptx) / [pdf](foundations/foundations.pdf) | 11 本 | 43 本 | 2026-10-23 |
| 第1回 | [DeepLearning・NN との融合](#deep-learning-fusion) | 群知能による NN・LLM の最適化、NN/DRL による群知能の強化、LLM を演算子とする群知能 | [pptx](deep-learning-fusion/deep-learning-fusion.pptx) / [pdf](deep-learning-fusion/deep-learning-fusion.pdf) | 10 本 | 24 本 | 2026-10-23 |
| 第1回 | [GA との融合](#ga-hybrid) | PSO と GA/DE のハイブリッド、モジュール化・自動構成、LLM による進化的アルゴリズム設計 | [pptx](ga-hybrid/ga-hybrid.pptx) / [pdf](ga-hybrid/ga-hybrid.pdf) | 10 本 | 30 本 | 2026-10-23 |
| 第2回 | [Meta-BBO と LLM による最適化アルゴリズムの自動設計](#metabbo) | ParamILS・L2O・LES から FunSearch・AlphaEvolve・MetaBox-v2・HADA まで、最適化器の設計の学習・自動化 | [pptx](metabbo/metabbo.pptx) / [pdf](metabbo/metabbo.pdf) | 10 本 | 32 本 | 2026-10-23 |
| 第2回 | [Consensus-Based Optimization（CBO）と群れの平均場理論](#cbo-mean-field) | CBO の原典から大域収束の証明、サンプリング・制約付きへの拡張、有限粒子・一様時間の解析、ES との接続まで | [pptx](cbo-mean-field/cbo-mean-field.pptx) / [pdf](cbo-mean-field/cbo-mean-field.pdf) | 10 本 | 35 本 | 2026-10-23 |
| 第2回 | [ACO の系譜と Neural ACO による大規模組合せ最適化](#aco-neural) | AntNet・MMAS のランタイム解析から、Attention Model・POMO・ML-ACO・ReEvo・HeatACO・TIDE まで | [pptx](aco-neural/aco-neural.pptx) / [pdf](aco-neural/aco-neural.pdf) | 10 本 | 34 本 | 2026-10-23 |

合計：スライド化 61 本、引用論文一覧 198 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-23 | 第1回調査。「全体像（原著論文まわり）」、「DeepLearning・NN との融合」、「GA との融合」 の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版（OpenReview・学会予稿集・OA 誌など）で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典は ⚠️ 本文未確認として一覧に記載。 |
| 2026-10-23 | 第2回調査。第1回の推奨テーマ 「Meta-BBO と LLM による最適化アルゴリズムの自動設計」、「Consensus-Based Optimization（CBO）と群れの平均場理論」、「ACO の系譜と Neural ACO による大規模組合せ最適化」 を追加調査。既存デッキでスライド化済みの論文は再掲せず、一覧で `↪ 既存：<theme> p.N` として参照。同じ回の別テーマで同じ論文を別の観点からスライド化した例が一部ある。 |

## 追加調査を推奨するテーマ

第2回までの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。

1. **自動設計されたアルゴリズムの評価基盤（汎化・頑健性・新規性）**  
   Meta-BBO と Neural ACO の両テーマで、評価の弱さ（最下位手法を基準にした改善率、わずかな既知最良の更新、本文と表の食い違い、問題分布の外での劣化）が繰り返し見つかった。BehaveSim のような挙動ベースの新規性判定、分布外ベンチマーク、統計的比較の作法をまとめて調べる。

2. **学習型群知能と、ヒートマップ型 NCO における「学習器と探索器の分担」**  
   MetaBox-v2 では学習型 PSO が下位に留まり、HeatACO では学習ヒートマップの付加価値が距離ベースの SoftDist と同程度だった。PSO・ACO の制御則やヒューリスティック値を学ぶとき、どこまでを学習に任せ、どこを古典的探索に残すべきかを横断的に整理する。

3. **粒子系最適化の理論の拡張（ES/CMA-ES との統一、多目的・二層・ゲーム、ランタイム解析）**  
   CBO→ES の接続（Fornasier+ 2026）、異方性・共分散適応 CBO、鞍点・二層問題への拡張、ACO/EDA のランタイム解析の最前線を、「群知能の理論」として1テーマにまとめる。

<details><summary>第1回の推奨テーマ（第2回で調査済み）</summary>

- Meta-Black-Box Optimization と LLM による最適化アルゴリズムの自動設計 → [Meta-BBO と LLM による最適化アルゴリズムの自動設計](#metabbo)
- Consensus-Based Optimization（CBO）と群れの平均場理論 → [Consensus-Based Optimization（CBO）と群れの平均場理論](#cbo-mean-field)
- ACO の系譜と Neural ACO による大規模組合せ最適化 → [ACO の系譜と Neural ACO による大規模組合せ最適化](#aco-neural)

</details>

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は同じ分野の既存デッキでスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。

---

<a id="foundations"></a>

## 全体像（原著論文まわり）（foundations/）

資料：[foundations.pptx](foundations/foundations.pptx) ／ [foundations.pdf](foundations/foundations.pdf) ／ 生成元 [spec.json](foundations/spec.json)


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

資料：[deep-learning-fusion.pptx](deep-learning-fusion/deep-learning-fusion.pptx) ／ [deep-learning-fusion.pdf](deep-learning-fusion/deep-learning-fusion.pdf) ／ 生成元 [spec.json](deep-learning-fusion/spec.json)


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

資料：[ga-hybrid.pptx](ga-hybrid/ga-hybrid.pptx) ／ [ga-hybrid.pdf](ga-hybrid/ga-hybrid.pdf) ／ 生成元 [spec.json](ga-hybrid/spec.json)


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

資料：[metabbo.pptx](metabbo/metabbo.pptx) ／ [metabbo.pdf](metabbo/metabbo.pdf) ／ 生成元 [spec.json](metabbo/spec.json)


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

資料：[cbo-mean-field.pptx](cbo-mean-field/cbo-mean-field.pptx) ／ [cbo-mean-field.pdf](cbo-mean-field/cbo-mean-field.pdf) ／ 生成元 [spec.json](cbo-mean-field/spec.json)


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

資料：[aco-neural.pptx](aco-neural/aco-neural.pptx) ／ [aco-neural.pdf](aco-neural/aco-neural.pdf) ／ 生成元 [spec.json](aco-neural/spec.json)


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
