## GECCO（gecco/）

### 調査履歴
- 2026-10-27: WebSearch の検索スニペットを主な情報源にした（GECCO 2023〜2027 公式ページ、ACM Best Paper Awards 一覧、大学・企業のニュース、gpbib の SIGEVOlution 予定稿）。締切は ccf-deadlines の gecco.yml と照合し、投稿数・採択数は Tanabe の集計（GitHub raw）を使った。2026 年の Best Paper 受賞 8 本のうち 7 本と、Humies 金賞の論文を arXiv で全文読んだ。過去年からは QD と神経進化の受賞 3 本を加え、計 11 本をスライドにした。
- 到達できなかった情報源：gecco-20xx.sigevo.org、sigevo.hosting.acm.org、acm.org、human-competitive.org、naco.liacs.nl、Cognizant のブログ、web.archive.org、ACM DL。これらは検索スニペットでのみ確認した。

### 締切の要点
- GECCO 2027 は Kraków（ポーランド）で 2027-07-12〜16、対面のみ（公式）。Call for Papers は 2026-10 時点で未公開。
- 推定：アブストラクト 2027-01-18（月）、論文 2027-01-25（月）、いずれも 23:59 AoE。2023〜2026 の締切は毎年 3〜9 日ずつ早まり（論文 2/10 → 2/1 → 1/29 → 1/26）、アブストラクトは常に論文の 1 週間前。幅は 1 月中旬〜2 月上旬。
- 採否通知は 3 月中旬〜下旬（2027-03-19 前後）、カメラレディは 4 月上旬（推定）。

### 受賞・話題の論文一覧
| # | 年 | 賞 | 論文 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026 | Best Paper（RWA） | [Evolution With Purpose: Hierarchy-Informed Optimization of Whole-Brain Models](https://arxiv.org/abs/2602.11398) | 皮質の階層順にパラメータを解放する GA カリキュラム HICO。全脳モデルの被験者間の汎化と行動予測を両立。 | ✅ p.2 |
| 2 | 2026 | Best Paper（EML） | [Distributional Value Estimation Without Target Networks for Robust Quality-Diversity](https://arxiv.org/abs/2604.20381) | ターゲットネット無しの分布型 critic と DNS で、高 UTD の QD-RL を安定化。 | ✅ p.4 |
| 3 | 2026 | Best Paper（L4EC） | [A Learning-Based Cooperative Coevolution Framework for Heterogeneous Large-Scale Global Optimization](https://arxiv.org/abs/2604.01241) | 部分問題ごとの最適化器を PPO で選ぶ協調共進化 LH-CC。3000 次元で既存手法に全勝。 | ✅ p.6 |
| 4 | 2026 | Best Paper（GP） | [Introns and Templates Matter: Rethinking Linkage in GP-GOMEA](https://arxiv.org/abs/2602.02311) | イントロンを考慮した相互情報量と、テンプレート木の距離によるリンケージ。 | ✅ p.8 |
| 5 | 2026 | Best Paper（NE） | [Evolving Multi-Channel Confidence-Aware Activation Functions for Missing Data with Channel Propagation](https://arxiv.org/abs/2602.13864) | 値・欠損・信頼度の 3 入力の活性化関数を GP で進化。欠損のある表データの分類を改善。 | ✅ p.10 |
| 6 | 2026 | Best Paper（BBSR–ENUM） | [Exploration of Pareto-preserving Search Space Transformations in Multi-objective Test Functions](https://arxiv.org/abs/2604.08173) | 目的空間を保つ探索空間の変換で、多目的 EA の軸バイアスを明らかに。 | ✅ p.12 |
| 7 | 2026 | Best Paper（GA–THEORY） | [Parent Selection Mechanisms in Elitist Crossover-Based Algorithms](https://arxiv.org/abs/2604.04083) | 最遠ペアを親に選ぶ (μ+1) GA が Jump_k を O(k·4^k·n log n) で解くことの証明。 | ✅ p.14 |
| 8 | 2026 | Best Paper（EMO） | Multi-objective Local Optima Networks based on Decomposition（Ochoa, Renau, Liefooghe, Fieldsend） | 分解に基づく多目的の局所最適ネットワーク（検索情報による）。 | ⚠️ 本文未確認 |
| 9 | 2026 | Humies Gold（二次情報） | [AutoNumerics-Zero: Automated Discovery of State-of-the-Art Mathematical Functions](https://arxiv.org/abs/2312.08472) | 記号回帰で超越関数の近似を発見。2^x を 10 演算で 14 桁（ICML 2026 論文）。 | ✅ p.16 |
| 10 | 2026 | Humies Silver / Bronze（二次情報） | Chao Qian ほか（Nature Communications）／ Berghegger ほか（CGP による視覚制御）／ Obidiegwu ほか（GE による Grover 回路） | 題名は未確認（検索情報による）。 | ⚠️ 本文未確認 |
| 11 | 2026 | Best Paper 候補（BBSR） | [Assessing Reproducibility in Evolutionary Computation](https://arxiv.org/abs/2602.07059) | 10 年分の GECCO 論文の再現性調査と、LLM による監査パイプライン RECAP。 | — 参照のみ |
| 12 | 2025 | Best Paper（CS＋NE） | [Extract-QD Framework](https://arxiv.org/abs/2502.06585) | 不確実 QD の統一的な枠組みと Extract-MAP-Elites。 | ✅ p.18 |
| 13 | 2025 | Best Paper（BBSR＋ENUM） | [When Does Neuroevolution Outcompete Reinforcement Learning in Transfer Learning Tasks?](https://arxiv.org/abs/2505.22696) | 段階的な課題での技能の転移を、神経進化と PPO で比較するベンチマーク。 | ✅ p.20 |
| 14 | 2025 | Best Paper（GP） | Transformer Semantic Genetic Programming for Symbolic Regression | Transformer を意味的な探索演算子にする GP（TSGP）。 | ↪ 既存：genetic-algorithm/genetic-programming |
| 15 | 2025 | Best Paper（ECOM / EMO / GA＋SI ほか） | Walsh Coefficient Influence（Przewozniczek ほか）、Phase-Specific Configuration of Interactive EMO（Lárraga & Miettinen）、Empirical Linkage Learning（Schmidbauer & Sudholt）、Congestion-Aware MAPF（Asadi ほか）、RL-DAC の報酬設計（Nguyen ほか）、DRL for Instance-Specific AC（Paderborn） | 概要は検索情報による。 | ⚠️ 本文未確認 |
| 16 | 2025 | SIGEVO Impact Award | General Program Synthesis Benchmark Suite（Helmuth & Spector, GECCO 2015） | プログラム合成 GP の標準ベンチマーク。 | — 参照のみ |
| 17 | 2024 | Best Paper（CS＋L4EC） | [Quality with Just Enough Diversity in Evolutionary Policy Search](https://arxiv.org/abs/2405.04308) | ガウス過程で有望な行動を選び、ES で磨く JEDi。 | ✅ p.22 |
| 18 | 2024 | Best Paper（SI） | Markov Chain-based Optimization Time Analysis of Bivalent ACO for Sorting and LeadingOnes | 2 値 ACO の最適化時間の解析。 | ↪ 既存：swarm-intelligence/aco-neural |
| 19 | 2024 | Best Paper（ECOM） | 電気自動車 Dial-A-Ride の大近傍探索（Bresich, Raidl, Limmer） | 充電ステーションをその場で挿入する（大学ニュースによる）。 | ⚠️ 本文未確認 |
| 20 | 2023 | Best Paper（EML） | Covariance Matrix Adaptation MAP-Annealing | CMA-ME の閾値を徐々に上げる CMA-MAE。 | ↪ 既存：open-endedness/quality-diversity |
| 21 | 2023 | Best Paper（CS / EMO / ENUM / ECOM / GA / GP / NE＋SBSE / RWA / ACO-SI） | DCG-MAP-Elites（Faldor ほか）、Pareto Local Optimal Solutions Networks（Liefooghe ほか）、BBOB のアフィン結合（Vermetten ほか）ほか | 概要は検索情報による。 | — 参照のみ |

### 不明な点
- GECCO 2026 の ECOM、CS–SI、GECH の Best Paper 受賞論文（公式の受賞ページに到達できず）。
- GECCO 2026 の EMO 受賞論文（Ochoa ほか）の本文。arXiv・著者公開版が見つからない。
- Humies 2026 の公式の受賞一覧と、銀・銅の論文題名（根拠は gpbib の予定稿の検索スニペットのみ）。
- SIGEVO Impact Award 2026（GECCO 2016 の論文が対象）と、ACM TELO Best Paper（2024〜2026）の受賞者。
- GECCO 2024・2025 の一部トラック（EML・EMO・GP・RWA・THEORY など）の受賞論文。
- GECCO 2027 の正式な締切と、リバッタルの有無。2026 の採択数は 149 と 150 の 2 つの値がある。
