# 群知能 — 先行研究調査

PSO・ACO などの群知能アルゴリズムについて、原著から理論・批判研究、ディープラーニングや GA との融合までの系譜をまとめる。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/ochiai/`）は main ブランチから引き継いでいる。

## テーマ一覧

| テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- |
| [全体像（原著論文まわり）](#foundations) | 群知能の代表アルゴリズムの原著、理論解析、メタファー手法の乱立への批判研究 | [pptx](foundations/foundations.pptx) / [pdf](foundations/foundations.pdf) | 11 本 | 43 本 | 2026-10-23 |
| [DeepLearning・NN との融合](#deep-learning-fusion) | 群知能による NN・LLM の最適化、NN/DRL による群知能の強化、LLM を演算子とする群知能 | [pptx](deep-learning-fusion/deep-learning-fusion.pptx) / [pdf](deep-learning-fusion/deep-learning-fusion.pdf) | 10 本 | 24 本 | 2026-10-23 |
| [GA との融合](#ga-hybrid) | PSO と GA/DE のハイブリッド、モジュール化・自動構成、LLM による進化的アルゴリズム設計 | [pptx](ga-hybrid/ga-hybrid.pptx) / [pdf](ga-hybrid/ga-hybrid.pdf) | 10 本 | 30 本 | 2026-10-23 |

合計：スライド化 31 本、引用論文一覧 97 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-23 | 初回調査。「全体像（原著論文まわり）」、「DeepLearning・NN との融合」、「GA との融合」 の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版（OpenReview・学会予稿集・OA 誌など）で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典は ⚠️ 本文未確認として一覧に記載。 |

## 追加調査を推奨するテーマ

全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾にはテーマ単位の候補もある。

1. **Meta-Black-Box Optimization と LLM による最適化アルゴリズムの自動設計**  
   3テーマすべてが、手作りの新手法ではなく「設計の自動化」に行き着いた。DRL で PSO を制御する GLEET、LLM が手法を書く LLaMEA/EoH、irace で融合方式を探す METAFOR がその例で、批判研究（Molina+ 2025, Camacho-Villalón+ 2026）もこれを出口に挙げている。MetaBox、汎化と報酬設計、生成された手法の新規性の検証（Fister+ 2026 の等価性判定）までを1テーマで追うのがよい。

2. **Consensus-Based Optimization（CBO）と群れの平均場理論**  
   PSO の大域収束の証明（Huang+ 2022, Borghi+ 2026）は CBO の数理を移植したものだった。CBO 側には平均場極限、制約付き・多目的への拡張、有限粒子での安定性など、2024〜2026 年の成果が多い。「理論的に保証された群知能」として独立して調べる価値がある。

3. **ACO の系譜と Neural ACO による大規模組合せ最適化**  
   ACO の原典（Ant System, ACS, MMAS）は今回すべて本文未確認で、ACO 側が手薄になっている。一方、DeepACO → GFACS → DyNACO と神経誘導 ACO は10万ノード規模に達した。古典 ACO の理論（ランタイム解析）と Neural CO の中での ACO の役割を合わせて調べると、PSO 側と対になる。多目的最適化での群知能×進化計算（MOPSO 系）も、今回は全文を読める論文がなく残った課題である。

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
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
