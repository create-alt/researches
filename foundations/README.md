## 全体像（原著論文まわり）（foundations/）

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
