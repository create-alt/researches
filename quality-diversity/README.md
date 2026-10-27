## Quality-Diversity の基礎と DL・群知能との融合（quality-diversity/）

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
