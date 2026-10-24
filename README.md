# オープンエンド学習・人工生命 — 先行研究調査

固定した目的に収束せず、新しく興味深い解・環境・生命様の構造を生み続けるシステム（オープンエンド性）について、Quality-Diversity、LLM 駆動の進化と自己改善、基盤モデル×人工生命の観点から系譜をまとめる。群知能（GA との融合・自動設計）と世界モデル（内発的報酬）にまたがる分野。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/ochiai/`）は main ブランチから引き継いでいる。

## テーマ一覧

| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- | --- |
| 第1回 | [Quality-Diversity の基礎と DL・群知能との融合](#quality-diversity) | 新奇性探索・MAP-Elites から、CVT-ME・AURORA・CMA-MAE・DCRL-ME、Dominated Novelty Search、潜在空間 QD まで | [pptx](quality-diversity/quality-diversity.pptx) / [pdf](quality-diversity/quality-diversity.pdf) | 10 本 | 31 本 | 2026-10-24 |
| 第1回 | [LLM 駆動の進化的探索と自己改善エージェント](#llm-driven-evolution) | LMX・OMNI から、Promptbreeder・OMNI-EPIC・Darwin Gödel Machine・ShinkaEvolve・HGM・AI Scientist、ハーネス比較まで | [pptx](llm-driven-evolution/llm-driven-evolution.pptx) / [pdf](llm-driven-evolution/llm-driven-evolution.pdf) | 10 本 | 40 本 | 2026-10-24 |
| 第1回 | [基盤モデル × 人工生命とオープンエンド性の評価](#foundation-model-alife) | Lenia・Flow-Lenia・Swarm Chemistry から、ASAL・ASAL++・Digital Red Queen、オープンエンド性の定義とベンチマークまで | [pptx](foundation-model-alife/foundation-model-alife.pptx) / [pdf](foundation-model-alife/foundation-model-alife.pdf) | 10 本 | 31 本 | 2026-10-24 |

合計：スライド化 30 本、引用論文一覧 102 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-24 | 第1回調査（分野新設）。main の候補分野メモ（candidates/）を出発点に、「Quality-Diversity の基礎と DL・群知能との融合」、「LLM 駆動の進化的探索と自己改善エージェント」、「基盤モデル × 人工生命とオープンエンド性の評価」 の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版（OpenReview・学会予稿集・OA 誌・著者公開版など）で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典は ⚠️ 本文未確認として一覧に記載。 既存デッキ（他分野を含む）でスライド化済みの論文は再掲せず、一覧で `↪ 既存：<theme> p.N` として参照。同じ回の別テーマで同じ論文を別の観点からスライド化した例が一部ある。 |

## 追加調査を推奨するテーマ

これまでの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。

1. **LLM 駆動の進化・発見系の評価方法論と単純な基準法**  
   アーカイブや非貪欲な親選択は各論文の中ではほぼ一貫して効くが、多くは1〜数回の実行で、予算を揃えた比較ではどの固定構成も一貫して勝たなかった（Gupta+ 2026）。群知能分野の評価基盤テーマとも合わせ、評価の作法を1テーマにする。

2. **オープンエンド性の指標の比較と頑健性**  
   FM 埋め込みによる新奇性、進化活性度、情報理論的指標が並立し、Open-Endedness Bench のような評価も出始めた。指標同士の整合性と、基盤モデルの偏りへの頑健性を調べる。

3. **記述子・多様性を学習する QD と、QD・多目的最適化・GA の選択機構の統一理論**  
   AURORA から基盤モデル埋め込みを使う QD、DNS（QD＝局所競争 GA）や QD を多目的最適化として見る研究まで、多様性の定義と選択機構を統一的に整理する。

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は既存デッキ（他分野の場合は `<field>/<theme>`）でスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。

---

<a id="quality-diversity"></a>

## Quality-Diversity の基礎と DL・群知能との融合（quality-diversity/）

資料：[quality-diversity.pptx](quality-diversity/quality-diversity.pptx) ／ [quality-diversity.pdf](quality-diversity/quality-diversity.pdf) ／ 生成元 [spec.json](quality-diversity/spec.json)


### 調査履歴
- 2026-10-24: `candidates/open-endedness.md` の DNS（GECCO 2025）と BFM-QD（NeurIPS 2026）を起点に、arXiv API で `abs:"quality-diversity"` `abs:"MAP-Elites"` `ti:"quality-diversity" AND cat:cs.NE` を新しい順に検索した。2025〜2026 年の主要論文として DNS、LQD（学習した競争関数）、DMS（ICLR 2026 Oral）、BFM-QD、Soft QD、AutoQD、QD-as-MOO を拾った。
- 系譜は3本たどった。(A) 局所競争の設計：新奇性探索 → NSLC → MAP-Elites → CVT-MAP-Elites → DNS → LQD。(B) 記述子の学習：CVT-MAP-Elites → AURORA → DNS の教師なし設定・AutoQD・BFM-QD。(C) 変異演算子の高度化（ES・深層 RL との融合）：CMA-ME → CMA-MAE → DMS、PGA-ME → DCG-ME → DCRL-ME → BFM-QD。
- 新奇性探索の原典（Evolutionary Computation 2011）は、Semantic Scholar が OA 版（GREEN）として示す Swarthmore 大学サイト掲載の著者版 PDF で全文を読んだ。UCF の機関リポジトリ（STARS）は Cloudflare の確認画面で取得できなかった。OpenAlex は途中でレート制限（日次上限）に達したため、採録先は arXiv コメント・論文本文・Web 検索（DBLP 表示）で確認した。
- NSLC（GECCO 2011）と PGA-MAP-Elites（GECCO 2021）は arXiv 版がなく、正規の公開版にも届かなかったため「本文未確認」とした。

### 系譜
```
[A] 局所競争（どの解とどの解を競わせるか）
  Novelty Search (2011, 目的を捨て新奇性だけ) ── NSLC (2011, 新奇性 + 近傍内の性能競争)〔本文未確認〕
     └→ MAP-Elites (2015, 格子の各セルで1エリート = 照明アルゴリズム)
          └→ CVT-MAP-Elites (2018, ボロノイ分割でニッチ数を次元非依存に)
               └→ Dominated Novelty Search (2025, QD = 競争関数つき GA。上位解の k 近傍距離)
                    └→ LQD (2025, 競争関数を Transformer で表しメタ進化で発見)
     （GA の多様性維持：fitness sharing / NSGA-II の混雑度 / lexicase → DNS で同じ枠組みに整理。QD-as-MOO 2026 は多目的最適化として再定式化）

[B] 記述子の学習（何を「違い」とみなすか）
  CVT-MAP-Elites (高次元記述子。ただし実現可能な記述子のサンプルが必要)
     └→ AURORA (2019, AE/PCA でアーカイブから記述子を学習)
          └→ Grillotti & Cully 2022 / VQ-Elites 2025 / AutoQD 2026（参照のみ）
          └→ DNS の教師なし設定（境界のない学習済み記述子に対応）
          └→ BFM-QD (2026, 事前学習済み行動基盤モデルの潜在空間で探索)

[C] 変異演算子の高度化（ES・深層 RL・基盤モデルとの融合）
  CMA-ME (2020, CMA-ES のエミッタ) → CMA-MAE (2023, 閾値のアニーリング) → DMS (2026, 割引値を NN で近似)
  PGA-MAP-Elites (2021, TD3 の PG 変異)〔本文未確認〕 → DCG-ME (2023) → DCRL-MAP-Elites (2024, 記述子条件付き actor-critic)
     └→ BFM-QD (2026, critic 不要の Backward Inference 変異)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Abandoning Objectives: Evolution Through the Search for Novelty Alone](https://doi.org/10.1162/EVCO_a_00025)（[著者版 PDF](https://www.cs.swarthmore.edu/~meeden/DevelopmentalRobotics/lehman_ecj11.pdf)） | 2011 | Evolutionary Computation 19(2) | 原典 | 目的関数を捨て行動の新奇性だけを報酬にする新奇性探索。難しい迷路で 39/40 回解いた（目的指向は 3/40） | ✅ p.2 |
| 2 | [Illuminating search spaces by mapping elites](https://arxiv.org/abs/1504.04909) | 2015 | arXiv | 原典 | 特徴空間の格子の各セルにエリートを保持する MAP-Elites。「照明アルゴリズム」を提唱 | ✅ p.3 |
| 3 | [Using Centroidal Voronoi Tessellations to Scale Up the Multi-dimensional Archive of Phenotypic Elites Algorithm](https://arxiv.org/abs/1610.05729) | 2018 | IEEE TEVC | 発展 | CVT でニッチ数を次元に依存させず、1000次元の記述子まで MAP-Elites を拡張 | ✅ p.4 |
| 4 | [Autonomous skill discovery with Quality-Diversity and Unsupervised Descriptors](https://arxiv.org/abs/1905.11874) | 2019 | GECCO 2019 | 発展 | AURORA。アーカイブの感覚データで AE/PCA を学習し、潜在空間を記述子にする | ✅ p.5 |
| 5 | [Covariance Matrix Adaptation MAP-Annealing](https://arxiv.org/abs/2205.10752) | 2023 | GECCO 2023 | 発展 | CMA-ME の改善基準をセルごとの閾値として学習率 α で上げ、CMA-ES と CMA-ME を連続的につなぐ | ✅ p.6 |
| 6 | [Synergizing Quality-Diversity with Descriptor-Conditioned Reinforcement Learning](https://arxiv.org/abs/2401.08632) | 2024 | ACM TELO | 発展 | DCRL-MAP-Elites。記述子条件付き TD3 の critic で PG 変異、actor を方策として注入 | ✅ p.7 |
| 7 | [Dominated Novelty Search: Rethinking Local Competition in Quality-Diversity](https://arxiv.org/abs/2502.00593) | 2025 | GECCO 2025 | 最新 | QD を競争関数つき GA と再定式化し、上位解への k 近傍距離を競争適応度とする DNS を提案 | ✅ p.8 |
| 8 | [Discovering Quality-Diversity Algorithms via Meta-Black-Box Optimization](https://arxiv.org/abs/2502.02190) | 2025 | arXiv | 最新 | 競争関数を Transformer で表し、BBOB 上のメタ進化で学習（LQD）。ロボット制御に汎化 | ✅ p.9 |
| 9 | [Discount Model Search for Quality Diversity Optimization in High-Dimensional Measure Spaces](https://arxiv.org/abs/2601.01082) | 2026 | ICLR 2026（Oral） | 最新 | CMA-MAE の割引値ヒストグラムを NN で置き換え、画像を測度とする高次元 QD を実現 | ✅ p.10 |
| 10 | [Behavioral Foundation Models for Quality Diversity](https://arxiv.org/abs/2609.35615) | 2026 | NeurIPS 2026 | 最新 | 行動基盤モデル（FB 表現など）の潜在空間で QD。疎報酬課題で重み空間の QD を大差で上回る | ✅ p.11 |
| 11 | Evolving a diversity of virtual creatures through novelty search and local competition（Lehman & Stanley, [DOI](https://doi.org/10.1145/2001576.2001606)） | 2011 | GECCO 2011 | 原典 | NSLC。新奇性と「近傍内での相対性能」の2目的で進化させ、局所競争の概念を導入した（MAP-Elites・DNS 本文中の記述に基づく） | ⚠️ 本文未確認 |
| 12 | Policy Gradient Assisted MAP-Elites（Nilsson & Cully, [DOI](https://doi.org/10.1145/3449639.3459304)） | 2021 | GECCO 2021 | 発展 | PGA-ME。半数の子を TD3 critic による PG 変異で生成し、高次元の NN 方策に QD を拡張した（DCRL-ME 本文の記述に基づく） | ⚠️ 本文未確認 |
| 13 | [Covariance Matrix Adaptation for the Rapid Illumination of Behavior Space](https://arxiv.org/abs/1912.02400) | 2020 | GECCO 2020 | 発展 | CMA-ME。CMA-ES のエミッタと MAP-Elites のアーカイブを結合。後継の CMA-MAE で代表させた | — 参照のみ |
| 14 | [MAP-Elites with Descriptor-Conditioned Gradients and Archive Distillation into a Single Policy](https://arxiv.org/abs/2303.03832) | 2023 | GECCO 2023 | 発展 | DCG-ME。拡張版の DCRL-ME（#6）で代表させた | — 参照のみ |
| 15 | [Unsupervised Behaviour Discovery with Quality-Diversity Optimisation](https://arxiv.org/abs/2106.05648) | 2022 | IEEE TEVC | 発展 | AURORA の拡張版（3つのロボット課題）。原典の #4 で代表させた | — 参照のみ |
| 16 | [Quality and Diversity Optimization: A Unifying Modular Framework](https://arxiv.org/abs/1708.09251) | 2018 | IEEE TEVC | 発展 | QD をコンテナとセレクタの組で整理した枠組み（AURORA 本文で参照）。未読 | — 参照のみ |
| 17 | [Soft Quality-Diversity Optimization](https://arxiv.org/abs/2512.00810) | 2025 | ICLR 2026 | 最新 | 離散化を使わない QD の定式化 Soft QD と微分可能アルゴリズム SQUAD（アブストラクトのみ確認） | — 参照のみ |
| 18 | [AutoQD: Automatic Discovery of Diverse Behaviors with Quality-Diversity Optimization](https://arxiv.org/abs/2506.05634) | 2025 | ICLR 2026 | 最新 | 方策の占有測度を MMD 埋め込みして記述子を自動生成し CMA-MAE に渡す（アブストラクトのみ確認） | — 参照のみ |
| 19 | [Quality-Diversity Optimization as Multi-Objective Optimization](https://arxiv.org/abs/2602.00478) | 2026 | arXiv | 最新 | QD を多数目的の MOO として定式化し、集合スカラー化で解く（アブストラクトのみ確認） | — 参照のみ |
| 20 | [Vector Quantized-Elites](https://arxiv.org/abs/2504.08057) | 2025 | IEEE TEVC | 最新 | VQ-VAE で構造化された記述子格子を教師なしで構成（アブストラクトのみ確認） | — 参照のみ |
| 21 | [Scaling Policy Gradient Quality-Diversity with Massive Parallelization via Behavioral Variations](https://arxiv.org/abs/2501.18723) | 2025 | arXiv | 最新 | ASCII-ME。中央集権的な actor-critic なしで大規模並列化できる QD-RL（アブストラクトのみ確認） | — 参照のみ |
| 22 | [Distributional Value Estimation Without Target Networks for Robust Quality-Diversity](https://arxiv.org/abs/2604.20381) | 2026 | GECCO 2026 | 最新 | QDHUAC。DNS に高 UTD の分布型 critic を組み合わせ、必要なサンプルを1桁削減（アブストラクトのみ確認） | — 参照のみ |
| 23 | [Discrete Gene Crossover Accelerates Solution Discovery in Quality-Diversity Algorithms](https://arxiv.org/abs/2602.13730) | 2026 | arXiv | 最新 | 遺伝子単位の離散交叉で QD のビルディングブロック伝播を促す（GA との接点。アブストラクトのみ確認） | — 参照のみ |
| 24 | [Objectives Are All You Need: Solving Deceptive Problems Without Explicit Diversity Maintenance](https://arxiv.org/abs/2311.02283) | 2023 | NeurIPS 2023 ALOE WS | 発展 | lexicase 選択で明示的な多様性維持なしに欺瞞的問題を解く（DNS の著者による先行研究。タイトルのみ確認） | — 参照のみ |
| 25 | [Neuroevolution is a Competitive Alternative to Reinforcement Learning for Skill Discovery](https://arxiv.org/abs/2210.03516) | 2022 | ICLR 2023 | 発展 | QD とスキル発見 RL の比較（DCRL-ME 本文で参照。未読） | — 参照のみ |
| 26 | [QDax: A Library for Quality-Diversity and Population-based Algorithms with Hardware Acceleration](https://arxiv.org/abs/2308.03665) | 2023 | arXiv | — | DNS・DCRL-ME・LQD の実装基盤となった JAX ライブラリ | — 参照のみ |
| 27 | Density Descent Search（Lee+ 2024） | 2024 | — | 発展 | KDE で測度空間の密度を下る多様性最適化。DMS 本文の記述に基づく。原典未確認 | — 参照のみ |
| 28 | DDE-Elites（Gaier+ 2020） | 2020 | — | 発展 | アーカイブ上で VAE を学習し潜在空間で変異する。BFM-QD の比較対象（BFM-QD 本文の記述に基づく） | — 参照のみ |
| 29 | [Evolution through Large Models](https://arxiv.org/abs/2206.08896) | 2022 | arXiv | 発展 | LLM を変異演算子にした MAP-Elites | ↪ 既存：swarm-intelligence/ga-hybrid p.5 |
| 30 | [Discovering Evolution Strategies via Meta-Black-Box Optimization](https://arxiv.org/abs/2211.11260) | 2023 | ICLR 2023 | 発展 | LES。自己注意で ES をメタ学習する。LQD の直接の前身 | ↪ 既存：swarm-intelligence/metabbo p.4 |
| 31 | [Curiosity-driven Exploration by Self-supervised Prediction](https://arxiv.org/abs/1705.05363) | 2017 | ICML 2017 | 発展 | ICM。新奇性探索と同じ問題意識の内発的報酬（RL 側） | ↪ 既存：world-model/intrinsic-reward p.3 |

---

<a id="llm-driven-evolution"></a>

## LLM 駆動の進化的探索と自己改善エージェント（llm-driven-evolution/）

資料：[llm-driven-evolution.pptx](llm-driven-evolution/llm-driven-evolution.pptx) ／ [llm-driven-evolution.pdf](llm-driven-evolution/llm-driven-evolution.pdf) ／ 生成元 [spec.json](llm-driven-evolution/spec.json)


### 調査履歴
- 2026-10-24: `candidates/open-endedness.md`（DGM・ShinkaEvolve・AI Scientist Nature 版の要約）を出発点に、arXiv API で「Darwin Gödel Machine」「self-improving × open-ended」「LLM-driven evolution」「evolutionary coding agent」「hyperagents」「OMNI-EPIC」「ShinkaEvolve / OpenEvolve」を新しい順に検索した。2026 年の後続（Hyperagents、HGM-Dual、MetaShare、AdaEvolve、LEVI、ExpEvolve）と、ハーネスの部品を統計的に比較した Gupta+ 2026 を最新の起点にした。
- 系譜は3本たどった。(A) LLM を変異・交叉演算子にする流れ：ELM（既存）→ LMX → Promptbreeder（自己参照）→ ShinkaEvolve。(B) 面白さ・課題生成の流れ：OMNI → OMNI-EPIC。(C) 自己改善エージェント：Gödel Machine（2003, 理論）→ STOP / ADAS / Gödel Agent / SICA → DGM → HGM / Hyperagents。AI Scientist は (A)(B) の部品（アイデアのアーカイブ、新規性フィルタ、木探索）を研究工程全体に使った応用として扱った。
- 本テーマの焦点である「QD 由来の部品（アーカイブ＝踏み石、新奇性・面白さ、親選択）が性能に与える効果」は、各論文のアブレーションを下の比較表に集約した。
- 群知能分野ですでにスライド化された ELM・EoH・LLaMEA（ga-hybrid）、FunSearch・AlphaEvolve・ReEvo（metabbo / aco-neural）、SwarmAgentic（deep-learning-fusion）は再掲せず ↪ で参照した。新奇性探索・MAP-Elites・POET などの QD の古典は同分野の quality-diversity テーマ、ASAL・ASAL++・Digital Red Queen は foundation-model-alife テーマでスライド化済みのため再掲せず、↪ で参照した。
- 採録先は、Promptbreeder（PMLR v235）、OMNI・OMNI-EPIC・DGM（本文・ICLR 公式ページ）、ShinkaEvolve（ICLR 2026 ポスターページ）、LMX（ACM TELO 4(4)）を確認した。HGM の ICLR 2026（Oral）は共著者の公開投稿による情報で、公式リストは未確認。Hyperagents は二次情報に ICLR 2026 とあるが一次情報で確認できず arXiv プレプリントとした。

### 系譜
```
[A] LLM = 変異・交叉演算子
  ELM (2022, 既存:ga-hybrid) ── FunSearch (2023, 既存:metabbo)
     └→ LMX (2023, 親を並べた few-shot = 交叉, EDA との対応)
          └→ Promptbreeder (2023, 変異プロンプトも進化 = 自己参照)
          └→ QDAIF (2023, LLM で質と多様性を評価)
     └→ AlphaEvolve (2025, 既存:metabbo) ─→ OpenEvolve (OSS)
          └→ ShinkaEvolve (2025, DGM 式親選択 + 新奇性棄却 + LLM バンディット)
          └→ AdaEvolve / LEVI / ExpEvolve (2026)
          └→ No Universal Harness (2026, 部品を分解して 310 万ロールアウトで比較 → 万能のハーネスはない)
             Simple Baselines (Gideoni+ 2026) / What Do Evolutionary Coding Agents Evolve? (2026)

[B] 面白さのモデルと課題の自動生成
  POET (2019) / 学習進捗カリキュラム (Kanitscheider+ 2021)
     └→ OMNI (2023, 基盤モデル = 面白さのモデル)
          └→ OMNI-EPIC (2024, 課題 + 環境 + 報酬をコードで生成, 課題アーカイブ)

[C] 自己改善エージェント
  Gödel Machine (Schmidhuber 2003, 証明に基づく自己改変)
     └→ STOP (2023) / ADAS (2024, 固定メタエージェント) / Gödel Agent (2024) / SICA (2025, 山登り)
          └→ Darwin Gödel Machine (2025, 証明→評価, アーカイブ + 非貪欲な親選択)   ← [B] OMNI-EPIC
               ├→ HGM (2025, 親選択を子孫クレードの成績 CMP に)
               │    └→ HGM-Dual (2026)
               └→ Hyperagents / DGM-H (2026, メタエージェントも編集対象)
                    └→ MetaShare (2026)

[A]+[B] の応用：AI Scientist v1 (2024) → v2 (2025, 木探索) → Nature 版 (2026, 統合 + 自動査読器の検証)
```

### QD 由来の部品のアブレーション比較（本テーマの横断まとめ）
| 部品 | 論文（スライド） | 比較の条件 | 結果 | 注意点 |
| --- | --- | --- | --- | --- |
| アーカイブ（踏み石） | OMNI-EPIC (p.5) | 課題アーカイブあり vs なし | 埋めたセル数・ANNECS-OMNI とも有意に上（p<0.05, Fig. 4） | 3回（学習なし）/5回（RL あり） |
| アーカイブ（踏み石） | DGM (p.6) | 全子孫を保持 vs 常に最新版を改変 | SWE-bench 50.0 vs 23.0、Polyglot 38.0 vs 14.0（Table 1） | 各条件1実行 |
| アーカイブ（踏み石） | Hyperagents (p.9) | DGM-H vs アーカイブなし | 査読 0.710 vs 0.0、報酬設計 0.372 vs 0.116（中央値, Fig. 2） | 5実行、Wilcoxon p<0.05 |
| アーカイブ（踏み石） | No Universal Harness (p.11) | Top-K アーカイブ拡大、ε 全履歴探索、MAP-Elites＋島 | Top-K 拡大単独は有意差なし。最良の K=1・ε=20% も Holm 補正後 p=0.678。OpenEvolve 完全版は最下位（P̂maj=0.033） | 5回 vs 基準 100/30 回、数学3問 |
| 親選択（非貪欲） | DGM (p.6) | 性能×子の少なさで確率抽出 vs 常に最良（Greedy） | 50.0/38.0 vs 39.7/30.0（App. A.3） | 各1実行 |
| 親選択（非貪欲） | ShinkaEvolve (p.7) | 重み付き vs 山登り vs Best-of-N | 重み付き＞山登り＞Best-of-N（円詰め, Fig. 9） | 1課題・1本の曲線 |
| 親選択（信号の種類） | HGM (p.8) | クレード成績 CMP vs 自身の性能（DGM/SICA） | CMP との相関 0.778 vs 0.285/0.444、最良 56.7 vs 53.3/50.0（Table 1–2） | 各1実行 |
| 親選択（木探索） | No Universal Harness (p.11) | UCT/PUCT の追加 | 一部の組で改善するが、深さ・複数親を足すと逆転（Fig. 1b, 4） | 組ごとに効果の向きが変わる |
| 新奇性・面白さ | OMNI (p.3) | LP＋MoI vs LP のみ vs 一様 | Crafter 習得 82 vs 55 vs 4 課題（Fig. 3） | 退屈課題は人工的に作成 |
| 新奇性・面白さ | OMNI-EPIC (p.5) | MoI あり vs LP のみ（面白さ指示と事後判定を除去） | 多様性・ANNECS-OMNI とも有意に上（Fig. 4） | 同上 |
| 新奇性・面白さ | ShinkaEvolve (p.7) | 埋め込み棄却（＋LLM 判定）vs 棄却なし | 棄却あり＞なし。LLM 判定の上乗せは小さい（Fig. 9） | 1課題 |
| 自己参照（改善手順の改善） | Promptbreeder (p.4) | 超変異・Lamarck 変異・初期化の多様化を個別に除去 | ほぼ全データで除去により低下。初期化の多様化の寄与が最大（Fig. 4） | 集団10、200評価 |
| 自己参照（改善手順の改善） | DGM (p.6) / Hyperagents (p.9) | メタエージェント固定（ADAS 相当）vs 自己改善 | DGM 39.0/28.0 vs 50.0/38.0。DGM-H は査読 0.0 vs 0.710、転移後 imp@50 0.630 vs DGM 0.0 | DGM は1実行、DGM-H は5実行 |

まとめ：個々の論文の中では「アーカイブを残す」「最良だけを親にしない」「似た候補を捨てる」はほぼ一貫して効いている。特に自己改善エージェント（DGM, DGM-H）ではアーカイブ除去の打撃が大きい。一方で、それらの多くは1〜数回の実行による比較で、予算をそろえて多数回試行した Gupta+ 2026 では、固定の部品の組み合わせはどれも問題・モデルを越えて一貫して勝たなかった（数学3問・公開モデルという限定つき）。部品の効果は「探索空間と評価器の性質に依存する」と読むのが妥当で、部品の選択自体を探索中に適応させる方向（AdaEvolve、適応的ハーネス配分、Hyperagents の外側ループの自己改変）が次の焦点になっている。

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Language Model Crossover: Variation through Few-Shot Prompting](https://arxiv.org/abs/2302.12170) | 2023 | ACM TELO 2024 | 原典 | 親を並べた few-shot プロンプトの続きを子とする交叉演算子 LMX。5領域で専用演算子なしに進化を回し、EDA との対応を示した | ✅ p.2 |
| 2 | [OMNI: Open-endedness via Models of human Notions of Interestingness](https://arxiv.org/abs/2306.01711) | 2023 | ICLR 2024 | 原典 | 基盤モデルを面白さのモデルとし、学習進捗と組み合わせた自動カリキュラム。Crafter で習得課題 82（LP 単独 55） | ✅ p.3 |
| 3 | [Promptbreeder: Self-Referential Self-Improvement Via Prompt Evolution](https://arxiv.org/abs/2309.16797) | 2023 | ICML 2024 | 発展 | タスクプロンプトと変異プロンプトを同時に進化させる自己参照的プロンプト進化。GSM8K 83.9%（ゼロショット） | ✅ p.4 |
| 4 | [OMNI-EPIC: Open-endedness via Models of human Notions of Interestingness with Environments Programmed in Code](https://arxiv.org/abs/2405.15568) | 2024 | ICLR 2025 | 発展 | 課題・環境・報酬を LLM がコードで生成し、課題アーカイブを広げ続ける。アーカイブ・面白さの除去で多様性が低下 | ✅ p.5 |
| 5 | [Darwin Godel Machine: Open-Ended Evolution of Self-Improving Agents](https://arxiv.org/abs/2505.22954) | 2025 | ICLR 2026 | 発展 | 自己改変するコーディングエージェントの全子孫をアーカイブし非貪欲に親を選ぶ。SWE-bench 20→50%、アーカイブなし 23%、貪欲 39.7% | ✅ p.6 |
| 6 | [ShinkaEvolve: Towards Open-Ended And Sample-Efficient Program Evolution](https://arxiv.org/abs/2509.19349) | 2025 | ICLR 2026 | 最新 | DGM 式親選択・新奇性棄却・LLM バンディットを加えた OSS のプログラム進化。円詰めで150評価未満で AlphaEvolve 超え | ✅ p.7 |
| 7 | [Huxley-Gödel Machine: Human-Level Coding Agent Development by an Approximation of the Optimal Self-Improving Machine](https://arxiv.org/abs/2510.21614) | 2025 | ICLR 2026（共著者情報） | 最新 | 子孫クレードの成績 CMP で展開先を選ぶ自己改善木探索。DGM・SICA を上回り CPU 時間 1/2.38 | ✅ p.8 |
| 8 | [Hyperagents](https://arxiv.org/abs/2603.19461) | 2026 | arXiv | 最新 | タスクエージェントとメタエージェントを1つの編集可能プログラムにした DGM-H。コーディング以外でも自己改善し、改善能力が領域を越えて転移 | ✅ p.9 |
| 9 | [Towards End-to-End Automation of AI Research](https://arxiv.org/abs/2606.15497) | 2026 | Nature 651 (2026) | 最新 | The AI Scientist の統合版。自動査読器は人間間一致と同等（BA 0.66〜0.69）、生成論文1本がワークショップ査読で 6.33 | ✅ p.10 |
| 10 | [Automated Discovery Has No Universally Superior Harness](https://arxiv.org/abs/2607.18235) | 2026 | arXiv | 最新 | OpenEvolve / TTT-Discover 型ハーネスを部品に分解し 30構成×12組で比較。固定ハーネスはどれも一貫して勝たず、部分実行の成績による適応配分が有効 | ✅ p.11 |
| 11 | [Evolution through Large Models (ELM)](https://arxiv.org/abs/2206.08896) | 2022 | arXiv | 原典 | LLM を GP の変異演算子にし MAP-Elites と組み合わせた。LMX の直接の前身 | ↪ 既存：swarm-intelligence/ga-hybrid p.5 |
| 12 | [Evolution of Heuristics (EoH)](https://arxiv.org/abs/2401.02051) | 2024 | ICML 2024 | 発展 | 考えとコードを LLM で交叉・変異してヒューリスティクスを進化 | ↪ 既存：swarm-intelligence/ga-hybrid p.6 |
| 13 | [LLaMEA](https://arxiv.org/abs/2405.20132) | 2024 | IEEE TEVC 2025 | 発展 | LLM でメタヒューリスティクス全体を生成・進化 | ↪ 既存：swarm-intelligence/ga-hybrid p.7 |
| 14 | [FunSearch: Mathematical discoveries from program search with large language models](https://doi.org/10.1038/s41586-023-06924-6) | 2023 | Nature 625 (2024) | 原典 | LLM と評価器の島モデル進化で cap set などの新構成を発見 | ↪ 既存：swarm-intelligence/metabbo p.5 |
| 15 | [ReEvo](https://arxiv.org/abs/2402.01145) | 2024 | NeurIPS 2024 | 発展 | 反省（reflection）付きの LLM ヒューリスティクス進化 | ↪ 既存：swarm-intelligence/metabbo p.6 |
| 16 | [AlphaEvolve](https://arxiv.org/abs/2506.13131) | 2025 | arXiv | 発展 | Gemini を変異演算子にした進化的コーディングエージェント。ShinkaEvolve・OpenEvolve の比較対象 | ↪ 既存：swarm-intelligence/metabbo p.7 |
| 17 | [SwarmAgentic](https://arxiv.org/abs/2506.15672) | 2025 | EMNLP 2025 | 発展 | PSO 型の母集団更新で LLM エージェント系を自動生成 | ↪ 既存：swarm-intelligence/deep-learning-fusion p.10 |
| 18 | [Goedel Machines: Self-Referential Universal Problem Solvers Making Provably Optimal Self-Improvements](https://arxiv.org/abs/cs/0309048) | 2003 | arXiv（理論） | 原典 | 期待効用の改善を証明できたときだけ自己を書き換える理論的な自己改善機械。DGM・HGM の出発点。実験を伴わない理論論文のためスライド化しなかった | — 参照のみ |
| 19 | [Self-Taught Optimizer (STOP)](https://arxiv.org/abs/2310.02304) | 2023 | COLM 2024 | 発展 | LLM を呼ぶ「改善器」プログラムが自分自身を改善する。DGM の前身の一つ（アブストラクトのみ確認） | — 参照のみ |
| 20 | [Automated Design of Agentic Systems (ADAS)](https://arxiv.org/abs/2408.08435) | 2024 | ICLR 2025 | 発展 | 固定のメタエージェントがコードでエージェントを設計しアーカイブに蓄積。DGM・DGM-H の「自己改善なし」対照に相当（アブストラクトのみ確認） | — 参照のみ |
| 21 | [Gödel Agent](https://arxiv.org/abs/2410.04444) | 2024 | ACL 2025 | 発展 | 自分の論理を実行時に書き換える自己参照エージェント。アーカイブを持たない（アブストラクトのみ確認） | — 参照のみ |
| 22 | [A Self-Improving Coding Agent (SICA)](https://arxiv.org/abs/2504.15228) | 2025 | arXiv | 発展 | 自己編集で SWE-bench 部分集合 17→53%。最良版を登る山登り型で、DGM の Greedy 対照・HGM の比較対象（アブストラクトのみ確認） | — 参照のみ |
| 23 | [Quality-Diversity through AI Feedback (QDAIF)](https://arxiv.org/abs/2310.13032) | 2023 | ICLR 2024 | 発展 | LLM で変異と質・多様性の評価の両方を行う QD。創作文で有効（アブストラクトのみ確認。quality-diversity テーマとの境界のため未スライド化） | — 参照のみ |
| 24 | [The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery](https://arxiv.org/abs/2408.06292) | 2024 | arXiv | 発展 | テンプレート型の自動研究系 v1。内容は Nature 版（#9）に統合されたため単独ではスライド化しなかった | — 参照のみ |
| 25 | [The AI Scientist-v2: Workshop-Level Automated Scientific Discovery via Agentic Tree Search](https://arxiv.org/abs/2504.08066) | 2025 | arXiv | 発展 | テンプレート不要・エージェント的木探索の v2。Nature 版（#9）に統合 | — 参照のみ |
| 26 | [Large Language Models as Optimizers (OPRO)](https://arxiv.org/abs/2309.03409) | 2023 | ICLR 2024 | 発展 | 過去の解と点数をプロンプトに並べて LLM に次の解を出させる最適化。Promptbreeder の比較対象 | — 参照のみ |
| 27 | [Multi-task curriculum learning in a complex, visual, hard-exploration domain: Minecraft](https://arxiv.org/abs/2106.14876) | 2021 | arXiv | 原典 | 双方向の学習進捗によるカリキュラム。OMNI の LP 部分の基礎 | — 参照のみ |
| 28 | [Learning to Discover at Test Time (TTT-Discover)](https://arxiv.org/abs/2601.16175) | 2026 | arXiv | 最新 | テスト時に RL で LLM を学習させながら PUCT 型探索で発見する。#10 が探索部分を分解 | — 参照のみ |
| 29 | [Simple Baselines are Competitive with Code Evolution](https://arxiv.org/abs/2602.16805) | 2026 | arXiv | 最新 | 単純な2つの基準法が複雑なコード進化パイプラインと同等以上。探索アルゴリズムより探索空間の設計が効くと報告（アブストラクトのみ確認） | — 参照のみ |
| 30 | [AdaEvolve: Adaptive LLM Driven Zeroth-Order Optimization](https://arxiv.org/abs/2602.20133) | 2026 | arXiv | 最新 | 改善量の信号で島内の探索強度・島間の予算・停滞時のメタ指導を適応させる（アブストラクトのみ確認） | — 参照のみ |
| 31 | [LEVI: Stronger Search Architectures Can Substitute for Larger LLMs in Evolutionary Search](https://arxiv.org/abs/2605.09764) | 2026 | arXiv | 最新 | 多様性を保つ解データベースと変異モデルの振り分けで、小さい LLM でも ShinkaEvolve 等に 3.3〜6.7 倍少ない予算で並ぶ（アブストラクトのみ確認） | — 参照のみ |
| 32 | [What Do Evolutionary Coding Agents Evolve?](https://arxiv.org/abs/2605.20086) | 2026 | arXiv | 最新 | 進化の軌跡データ EvoTrace を作り、得点向上の多くが少数の編集型に由来し、追加行の約30%が削除済み行の再導入だと示した（アブストラクトのみ確認） | — 参照のみ |
| 33 | [ExpEvolve: Structuring and Reusing Experience for Open-Ended Discovery](https://arxiv.org/abs/2610.29303) | 2026 | arXiv | 最新 | プログラムから得点差を説明するアイデア因子を抽出して探索を導く（アブストラクトのみ確認） | — 参照のみ |
| 34 | [HGM-Dual: Lineage-Aware Guided Agent Harness Optimization for Long-Horizon Planning](https://arxiv.org/abs/2610.30042) | 2026 | arXiv | 最新 | 課題能力と自己改変能力が一致しない計画課題向けに、系譜情報を文脈にした診断誘導型のハーネス進化（アブストラクトのみ確認） | — 参照のみ |
| 35 | [MetaShare: Failure-Aware Collective Self-Improvement for Open-Ended Agents](https://arxiv.org/abs/2610.21887) | 2026 | NeurIPS 2026 WS | 最新 | 失敗した改変も符号付きの性能差とともに記録し、系譜をまたいで共有する（アブストラクトのみ確認） | — 参照のみ |
| 36 | [Paired Open-Ended Trailblazer (POET)](https://arxiv.org/abs/1901.01753) | 2019 | arXiv | 原典 | 環境とエージェントの共進化。OMNI-EPIC の比較対象。QD の古典として quality-diversity テーマ側で扱う | — 参照のみ |
| 37 | [Illuminating search spaces by mapping elites (MAP-Elites)](https://arxiv.org/abs/1504.04909) | 2015 | arXiv | 原典 | 行動記述子のグリッドでエリートを保持する QD の基本形。LMX・AI Scientist・OpenEvolve が利用。quality-diversity テーマ側で扱う | — 参照のみ |
| 38 | [Automating the Search for Artificial Life with Foundation Models (ASAL)](https://arxiv.org/abs/2412.17799) | 2024 | Artificial Life 31(3) 2025 | 発展 | 基盤モデルの埋め込み空間で ALife シミュレーションの新奇性・多様性を測って探索する。OMNI と同じく基盤モデルを人間的な判定器に使う流れ | ↪ 既存：foundation-model-alife p.6 |
| 39 | [Guiding Evolution of Artificial Life Using Vision-Language Models (ASAL++)](https://arxiv.org/abs/2509.22447) | 2025 | ALIFE 2025 | 発展 | 第2の基盤モデルが進化の目標を次々に提案する ASAL のオープンエンド版。OMNI-EPIC の課題生成と対応する | ↪ 既存：foundation-model-alife p.7 |
| 40 | [Digital Red Queen: Adversarial Program Evolution in Core War with LLMs](https://arxiv.org/abs/2601.03335) | 2026 | GECCO 2026 | 最新 | LLM を変異演算子とした MAP-Elites で Core War のプログラムを自己対戦的に進化させる。MAP-Elites を単一セルにすると性能が落ちるというアーカイブのアブレーションを含む | ↪ 既存：foundation-model-alife p.8 |

---

<a id="foundation-model-alife"></a>

## 基盤モデル × 人工生命とオープンエンド性の評価（foundation-model-alife/）

資料：[foundation-model-alife.pptx](foundation-model-alife/foundation-model-alife.pptx) ／ [foundation-model-alife.pdf](foundation-model-alife/foundation-model-alife.pdf) ／ 生成元 [spec.json](foundation-model-alife/spec.json)


### 調査履歴
- 2026-10-24: `candidates/open-endedness.md` の ASAL・Digital Red Queen を起点に、arXiv API（"open-endedness" / "open-ended evolution" / "artificial life" / Lenia / Particle Life / Swarm Chemistry）と WebSearch で 2025〜2026 年の論文を収集した。系譜は 3 本を原典まで遡った。①基盤（substrate）の系譜：Lenia → Flow-Lenia、Boids → Swarm Chemistry、NCA → Petri Dish NCA、Core War。②定義の系譜：Hughes+ 2024 の「観察者にとって新奇かつ学習可能」。③評価・探索の系譜：ASAL（FM 埋め込みでの新奇性）→ ASAL++ / E&E / PBT-NCA / DRQ → Picbreeder-VLM・Open-Endedness Bench。
- スライド化した 10 本はすべて arXiv の本文（HTML または PDF）を通読した。Swarm Chemistry 原典（2009）は OpenAlex で closed と判定され、Petri Dish NCA 原典は Sakana AI のページ（pub.sakana.ai）が 403 だったため、どちらも本文未確認。

### 系譜
```
[基盤]  Game of Life ─ SmoothLife ─ Lenia (2019) ─→ Flow-Lenia (2022/2025) ─→ E&E (2025, VLM 目標)
        Boids (1987) ─→ Swarm Chemistry (2009) ─→ Sayama レビュー (2025)
        NCA (2020) ─→ Petri Dish NCA (2025) ─→ PBT-NCA (2026)
        Core War (1984) ─────────────────────────→ Digital Red Queen (2026)
[定義]  Soros & Stanley (2014) / Sigaud+ (2023) ─→ Hughes+ 2024「観察者にとって novel かつ learnable」
[評価]  手設計指標（進化活性度 Bedau, 複雑性） ─→ ASAL (2024/25: FM 埋め込みでの新奇性・照明)
           ├→ ASAL++ (2025: 目標を FM が提案)   ├→ PBT-NCA (2026: 新奇性＋DINOv2 多様性)
           ├→ DRQ (2026: 自己対戦＋MAP-Elites、表現型/遺伝子型の収斂)
           └→ Picbreeder-VLM (2026: 人間 vs VLM、FM 指標の敵対的水増し)
        エージェント研究の過程評価 ─→ Open-Endedness Bench (2026)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Lenia — Biology of Artificial Life](https://arxiv.org/abs/1812.05433) | 2019 | Complex Systems 28(3) | 原典 | GoL を連続化した CA。対話型進化で 400 種超・18 科の生命体を発見・分類した。 | ✅ p.2 |
| 2 | [Open-Endedness is Essential for Artificial Superhuman Intelligence](https://arxiv.org/abs/2406.04268) | 2024 | ICML 2024（Position, oral） | 原典 | 観察者から見て「新奇かつ学習可能」という開放端性の形式的定義。FM＋開放端アルゴリズムを ASI への道と主張した。 | ✅ p.3 |
| 3 | [Flow-Lenia: Emergent evolutionary dynamics in mass conservative continuous cellular automata](https://arxiv.org/abs/2506.08569) | 2025 | Artificial Life 31(2) | 発展 | 質量保存とパラメータ局在化で、局在パターンと多種の内在的進化を実現した。進化活性度で評価。初出は [arXiv:2212.07906](https://arxiv.org/abs/2212.07906)。 | ✅ p.4 |
| 4 | [Swarm Systems as a Platform for Open-Ended Evolutionary Dynamics](https://arxiv.org/abs/2409.01469) | 2025 | Phil. Trans. R. Soc. A 383 | 発展 | Swarm Chemistry とその派生をレビューし、異種スウォームを開放端進化の基盤として位置づけた。 | ✅ p.5 |
| 5 | [Automating the Search for Artificial Life with Foundation Models](https://arxiv.org/abs/2412.17799) | 2025 | Artificial Life 31(3) | 発展 | CLIP / DINOv2 の埋め込みで ALife を目標一致・開放端・照明の3方式で探索する ASAL。 | ✅ p.6 |
| 6 | [Guiding Evolution of Artificial Life Using Vision-Language Models](https://arxiv.org/abs/2509.22447) | 2025 | ALIFE 2025 | 最新 | ASAL++。第2の FM（Gemma-3）が次の目標プロンプトを提案し続ける。 | ✅ p.7 |
| 7 | [Digital Red Queen: Adversarial Program Evolution in Core War with LLMs](https://arxiv.org/abs/2601.03335) | 2026 | GECCO 2026（researchr の書誌による） | 最新 | Core War で過去の全チャンピオンに勝つ warrior を LLM＋MAP-Elites で進化。汎用性の上昇と表現型の収斂。 | ✅ p.8 |
| 8 | [In Search of the Ingredients of Open-Endedness: Replicating Picbreeder with Large Vision-Language Models](https://arxiv.org/abs/2605.23908) | 2026 | GECCO 2026 | 最新 | Picbreeder を VLM で再現し、人間との差を意味的再現率・被覆半径・系統樹バランスで測った。 | ✅ p.9 |
| 9 | [Evolving Many Worlds: Towards Open-Ended Discovery in Petri Dish NCA via Population-Based Training](https://arxiv.org/abs/2604.11248) | 2026 | arXiv プレプリント | 最新 | PD-NCA の世界の集団を、新奇性＋DINOv2 視覚多様性で PBT により進化させる。 | ✅ p.10 |
| 10 | [Open-Endedness Bench: Measuring Epistemic Process from Agent Records](https://arxiv.org/abs/2610.02588) | 2026 | arXiv プレプリント | 最新 | 研究エージェントの実行ログから、主張と行為を結ぶグラフで認識的プロセスを採点する。 | ✅ p.11 |
| 11 | [Swarm Chemistry](https://doi.org/10.1162/artl.2009.15.1.15107) (Sayama) | 2009 | Artificial Life 15(1) | 原典 | Boids 型の異種粒子群をレシピで定義し、対話型進化で自己組織パターンを探索した人工化学（検索情報と #4 のレビューに基づく）。OpenAlex で closed、OA 版なし。 | ⚠️ 本文未確認 |
| 12 | [Petri Dish Neural Cellular Automata](https://pub.sakana.ai/pdnca/) (Zhang, Risi, Darlow) | 2025 | Sakana AI（Late-breaking abstract とされる） | 原典 | 複数の NCA がシミュレーション中も勾配で学習しながら領土を奪い合う基盤（検索情報と #9 の記述に基づく）。arXiv 版がなく、PDF は 403。 | ⚠️ 本文未確認 |
| 13 | Picbreeder: A Case Study in Collaborative Evolutionary Exploration of Design Space (Secretan+) | 2011 | Evolutionary Computation 19(3) | 原典 | 人間が CPPN 画像を協調的に対話型進化させた開放端探索の代表例（#8 の記述に基づく）。OA 版の有無は未確認。 | ⚠️ 本文未確認 |
| 14 | [Expedition & Expansion: Leveraging Semantic Representations for Goal-Directed Exploration in Continuous Cellular Automata](https://arxiv.org/abs/2509.03863) | 2025 | arXiv プレプリント | 最新 | Flow-Lenia で、CLIP 空間の新奇性探索と VLM（o4-mini）が生成する言語目標への遠征を交互に行う。NS は約3,000反復で頭打ちになるが、E&E は CLIP / DINO の両空間で多様性を伸ばした。遠征由来の解は全体の 42.2±13.7%（無作為なら 4.64%）の子孫を残した。全文を読んだが、ASAL++ と論点が重なるためスライド化は見送った。 | — 参照のみ |
| 15 | [Toward Artificial Open-Ended Evolution within Lenia using Quality-Diversity](https://arxiv.org/abs/2406.04235) | 2024 | ALIFE 2024 | 発展 | Leniabreeder。MAP-Elites / AURORA で Lenia の自己組織パターンを探索する（アブストラクトのみ確認。QD テーマと重なるためスライド化せず）。 | — 参照のみ |
| 16 | [Exploring Flow-Lenia Universes with a Curiosity-driven AI Scientist](https://arxiv.org/abs/2505.15998) | 2025 | ALIFE 2025 | 最新 | IMGEP で Flow-Lenia の生態系レベルのダイナミクスを探索する（アブストラクトのみ確認）。 | — 参照のみ |
| 17 | [Directing Open-Ended Evolution in Artificial Life via Multi-Scale Path Divergence](https://arxiv.org/abs/2606.17091) | 2026 | arXiv プレプリント | 最新 | 繰り込み群に着想を得た明示式の指標 MSPD を、開放端進化の適合度と分析指標に使う（Flow-Lenia, Particle Life++）。ブラックボックスの FM 指標への対案（アブストラクトのみ確認）。 | — 参照のみ |
| 18 | [An Information-Theoretic Definition for Open-Ended Learning](https://arxiv.org/abs/2606.08369) | 2026 | arXiv プレプリント | 最新 | 「bit-equivalent」の線形成長で開放端環境を定義し、古典的バンディットは開放端でないことを示す（アブストラクトのみ確認）。 | — 参照のみ |
| 19 | [TerraLingua: Emergence and Analysis of Open-endedness in LLM Ecologies](https://arxiv.org/abs/2603.16910) | 2026 | arXiv プレプリント | 最新 | 資源制約と寿命のある LLM エージェント生態系で、規範や文化的系統の出現を「AI 人類学者」が分析する（アブストラクトのみ確認）。 | — 参照のみ |
| 20 | [A speciation simulation that partly passes open-endedness tests](https://arxiv.org/abs/2603.01701) | 2026 | arXiv プレプリント | 最新 | 進化活性度統計（Bedau 型）で ToLSim の開放端性を検定。累積活性度は非有界だが、新規活性度は持続的にゼロだった（アブストラクトのみ確認）。 | — 参照のみ |
| 21 | [OpenLife: Toward Open-World Artificial Life with Autonomous LLM Agents](https://arxiv.org/abs/2606.31046) | 2026 | ALIFE 2026 | 最新 | 記憶と代謝（予算）を持つ LLM エージェントを実世界で長期間動かす（`candidates/open-endedness.md` の記載のみ）。 | — 参照のみ |
| 22 | [Microcosmos: Reimagining Artificial Life for the GPU Era](https://arxiv.org/abs/2607.02954) | 2026 | ALIFE 2026 | 最新 | 流体中の弾性フィラメント生物を扱う、微分可能な GPU ALife エンジン（アブストラクトのみ確認）。 | — 参照のみ |
| 23 | [Semantic Lenia: Emergence of Homeostatic Solitons within the Semantic Space of Large Language Models](https://arxiv.org/abs/2608.11657) | 2026 | arXiv プレプリント | 最新 | LLM の推論を Lenia 型の閉ループ力学系とみなし、意味空間のソリトンを観察する（アブストラクトのみ確認）。 | — 参照のみ |
| 24 | [The Artificial Experimentalist: Discovery and Control of Self-Organizing Phenomena with Autotelic Reinforcement Learning](https://arxiv.org/abs/2608.26116) | 2026 | ALIFE 2026 | 最新 | CARL。自己目的的 RL で Lenia のソリトンを発見し、操作する（アブストラクトのみ確認）。 | — 参照のみ |
| 25 | [Can AI Detect Life? Lessons from Artificial Life](https://arxiv.org/abs/2604.11915) | 2026 | ALIFE 2026 | 最新 | 生命検出の ML が分布外の人工生命サンプルに簡単に騙されることを示す。FM による「生命らしさ」評価への警鐘（アブストラクトのみ確認）。 | — 参照のみ |
| 26 | [Meta-Diversity Search in Complex Systems, A Recipe for Artificial Open-Endedness ?](https://arxiv.org/abs/2312.00455) | 2023 | arXiv プレプリント | 発展 | Lenia を人工化学とし、表現を階層的に学ぶ発見アシスタント Holmes でメタ多様性探索を行う（アブストラクトのみ確認）。 | — 参照のみ |
| 27 | [Lenia and Expanded Universe](https://arxiv.org/abs/2005.03742) | 2020 | ALIFE 2020 | 発展 | Lenia の多カーネル・多チャネル拡張（書誌情報のみ確認）。 | — 参照のみ |
| 28 | [Seeking Open-Ended Evolution in Swarm Chemistry II: Analyzing Long-Term Dynamics via Automated Object Harvesting](https://arxiv.org/abs/1804.03304) | 2018 | ALIFE 2018 | 発展 | 進化版 Swarm Chemistry の長期動態を、自動「収穫」したパターンで解析する（#4 の記述と書誌情報のみ確認）。 | — 参照のみ |
| 29 | [OMNI: Open-endedness via Models of human Notions of Interestingness](https://arxiv.org/abs/2306.01711) / [OMNI-EPIC](https://arxiv.org/abs/2405.15568) | 2023/2024 | arXiv プレプリント | 発展 | FM を「人間的な面白さ」のモデルとして課題選択・生成に使う（書誌情報のみ確認。LLM 駆動進化テーマと重なる）。 | — 参照のみ |
| 30 | [Novel type of phase transition in a system of self-driven particles (Vicsek+)](https://arxiv.org/abs/cond-mat/0611743) | 1995 | Phys. Rev. Lett. | 原典 | 自己駆動粒子の整列モデル。Boids / Swarm Chemistry の物理的な対応物。 | ↪ 既存：swarm-intelligence/foundations p.2 |
| 31 | [AlphaEvolve: A coding agent for scientific and algorithmic discovery](https://arxiv.org/abs/2506.13131) | 2025 | arXiv プレプリント | 発展 | LLM を変異演算子とする進化的コーディング。DRQ が「静的最適化」の代表として対比する。 | ↪ 既存：swarm-intelligence/metabbo p.7 |
