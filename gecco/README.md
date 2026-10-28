## GECCO（gecco/）

### 調査履歴
- 2026-10-27: WebSearch の検索スニペットを主な情報源にした（GECCO 2023〜2027 公式ページ、ACM Best Paper Awards 一覧、大学・企業のニュース、gpbib の SIGEVOlution 予定稿）。締切は ccf-deadlines の gecco.yml と照合し、投稿数・採択数は Tanabe の集計（GitHub raw）を使った。2026 年の Best Paper 受賞 8 本のうち 7 本と、Humies 金賞の論文を arXiv で全文読んだ。過去年からは QD と神経進化の受賞 3 本を加え、計 11 本をスライドにした。
- 到達できなかった情報源：gecco-20xx.sigevo.org、sigevo.hosting.acm.org、acm.org、human-competitive.org、naco.liacs.nl、Cognizant のブログ、web.archive.org、ACM DL。これらは検索スニペットでのみ確認した。
- 2026-10-28: 公式サイト gecco-2026.sigevo.org で、Best Paper の候補一覧（24 本）、Accepted Papers（採択 149 本）、Accepted Posters（158 本）、Call for Papers（リバッタルなし、Best Paper の規則、ACM の完全 OA 化、生成 AI の方針）、Important Dates、Tracks を確認・修正した。2026 年の公式受賞ページは未掲載で、/Best-Paper-Awards と /Humies Awards には 2025 年の受賞一覧が残っていた（これで 2025 年の全受賞と Humies 2025 を確定）。GP bibliography のミラー（gpbib.pmacs.upenn.edu）で Humies 2023〜2026 の金・銀・銅の題名を確認した。Humies 2026 銀賞（PMC の全文）、2025 年の ECOM・L4EC の受賞、Humies 2025 金賞、2024 年 GP の受賞の 5 本を全文読み、スライドを 16 本に増やした。2027 年の告知は 2026 年のサイトには無く、Dropbox のプログラム冊子・ACM DL・human-competitive.org・HAL には届かなかった。

### 締切の要点
- GECCO 2027 は Kraków（ポーランド）で 2027-07-12〜16、対面のみ（公式）。Call for Papers は 2026-10-28 時点で未公開（到達できる 2026 年の公式サイトにも 2027 年の締切の告知は無い）。
- 推定：アブストラクト 2027-01-18（月）、論文 2027-01-25（月）、いずれも 23:59 AoE。2023〜2026 の締切は毎年 3〜9 日ずつ早まり（論文 2/10 → 2/1 → 1/29 → 1/26）、アブストラクトは常に論文の 1 週間前。幅は 1 月中旬〜2 月上旬。
- 採否通知は 3 月中旬〜下旬（2027-03-19 前後）、カメラレディは 4 月上旬（推定）。2026 まで著者応答（リバッタル）の段階は無い（公式 CfP）。

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
| 8 | 2026 | Best Paper（EMO） | Multi-objective Local Optima Networks based on Decomposition（Ochoa, Renau, Liefooghe, Fieldsend） | 分解に基づく多目的の局所最適ネットワーク（題名・著者は公式の候補一覧で確認）。 | ⚠️ 本文未確認 |
| 9 | 2026 | Humies Gold | [AutoNumerics-Zero: Automated Discovery of State-of-the-Art Mathematical Functions](https://arxiv.org/abs/2312.08472) | 記号回帰で超越関数の近似を発見。2^x を 10 演算で 14 桁（ICML 2026 論文）。 | ✅ p.16 |
| 10 | 2026 | Humies Silver | [Complex marine ecological response during the Eocene-Oligocene revealed by global foraminiferal record](https://doi.org/10.1038/s41467-026-70541-w) | 進化アルゴリズム CONOP.EA で有孔虫 1269 種の化石記録を並べ、約 29 kyr 刻みの多様性の歴史を復元（Nature Communications）。 | ✅ p.18 |
| 11 | 2026 | Humies Bronze（同点 2 件） | [Analyzing Interpretable Visual Control Policy Search and Synthesis](https://doi.org/10.1145/3799432)（Berghegger ほか, TELO）／ [Evolving Hardware-Efficient Grover Circuits with Grammatical Evolution](https://doi.org/10.1145/3795095.3805176)（Obidiegwu ほか, GECCO 2026） | CGP による解釈可能な視覚制御方策と、文法進化による Grover 回路（書誌情報による）。 | ⚠️ 本文未確認 |
| 12 | 2026 | Best Paper 候補（ECOM・CS–SI） | 鉱石フロー配合の異種 ACO（Tang ほか）／ SLL による PX マスク（Przewozniczek ほか）／ VRP-RPD の BRKGA（Sodhi & Prasad）／ [Picbreeder の VLM による再現](https://arxiv.org/abs/2605.23908)（Earle ほか）／ PSO の自動設定（Zou & Bentley） | 公式の候補一覧で確認。どれが受賞したかは未確認。 | — 参照のみ |
| 13 | 2026 | Best Paper 候補（BBSR） | [Assessing Reproducibility in Evolutionary Computation](https://arxiv.org/abs/2602.07059) | 10 年分の GECCO 論文の再現性調査と、LLM による監査パイプライン RECAP。 | — 参照のみ |
| 14 | 2025 | Best Paper（CS＋NE） | [Extract-QD Framework](https://arxiv.org/abs/2502.06585) | 不確実 QD の統一的な枠組みと Extract-MAP-Elites。 | ✅ p.20 |
| 15 | 2025 | Best Paper（BBSR＋ENUM） | [When Does Neuroevolution Outcompete Reinforcement Learning in Transfer Learning Tasks?](https://arxiv.org/abs/2505.22696) | 段階的な課題での技能の転移を、神経進化と PPO で比べるベンチマーク。 | ✅ p.22 |
| 16 | 2025 | Best Paper（ECOM） | [On Revealing the Hidden Problem Structure in Real-World and Theoretical Problems Using Walsh Coefficient Influence](https://arxiv.org/abs/2504.13949) | Walsh 係数で重み付けした依存グラフ wdVIG で、ノイズ由来の依存を無視してマスクを作る。 | ✅ p.24 |
| 17 | 2025 | Best Paper（L4EC） | [On the Importance of Reward Design in RL-based Dynamic Algorithm Configuration](https://arxiv.org/abs/2502.20265) | 報酬シフトで DDQN の探索不足を解消し、(1+(λ,λ))-GA の理論方策を上回った。 | ✅ p.26 |
| 18 | 2025 | Humies Gold | [Unlocking the Potential of Global Human Expertise](https://proceedings.neurips.cc/paper_files/paper/2024/hash/d7ae378b9dfa7ff7bed35105fab03838-Abstract-Conference.html) | 169 の専門家モデルを蒸留して進化させる RHEA。COVID-19 対策で人間・AI 単独を上回る（NeurIPS 2024）。 | ✅ p.28 |
| 19 | 2025 | Best Paper（GP） | Transformer Semantic Genetic Programming for Symbolic Regression | Transformer を意味的な探索演算子にする GP（TSGP）。 | ↪ 既存：genetic-algorithm/genetic-programming |
| 20 | 2025 | Humies Silver | LLaMEA: A Large Language Model Evolutionary Algorithm for Automatically Generating Metaheuristics | LLM がメタヒューリスティクスのコードを生成・改良する。 | ↪ 既存：swarm-intelligence/ga-hybrid |
| 21 | 2025 | Best Paper（EML / EMO / GA＋SI / GECH＋THEORY / L4EC / RWA） | Evolution of Inherently Interpretable Visual Control Policies（De La Torre ほか）、Exploring Phase-Specific Configuration of Interactive EMO（Lárraga & Miettinen）、Empirical Linkage Learning Provably Builds Truthful Models（Schmidbauer & Sudholt）、Congestion-Aware Multi-Agent Path Planning（Asadi ほか）、Why Dominance Is Not Enough（Dang, Opris, Sudholt）、Deep RL for Instance-Specific Algorithm Configuration（Schede ほか）、Tomographic Reconstruction with Real-time a priori Acquisition（Khan ほか） | 題名・著者は公式ページで確認。本文は arXiv 版が見つからず未読。 | ⚠️ 本文未確認 |
| 22 | 2025 | Humies Bronze（同点 2 件）／ SIGEVO Impact Award | 共結晶の生成的設計（Gubina ほか）、人工内耳の多目的最適化（Hernández-Gil ほか）／ General Program Synthesis Benchmark Suite（Helmuth & Spector） | Impact Award は GECCO 2015 の論文が対象。 | — 参照のみ |
| 23 | 2024 | Best Paper（CS＋L4EC） | [Quality with Just Enough Diversity in Evolutionary Policy Search](https://arxiv.org/abs/2405.04308) | ガウス過程で有望な行動を選び、ES で磨く JEDi。 | ✅ p.30 |
| 24 | 2024 | Best Paper（GP） | [Learning Traffic Signal Control via Genetic Programming](https://arxiv.org/abs/2403.17328) | 信号フェーズの緊急度関数を GP で進化させる GPLight。受賞は GP bibliography の注記による。 | ✅ p.32 |
| 25 | 2024 | Best Paper（SI） | Markov Chain-based Optimization Time Analysis of Bivalent ACO for Sorting and LeadingOnes | 2 値 ACO の最適化時間の解析。 | ↪ 既存：swarm-intelligence/aco-neural |
| 26 | 2024 | Best Paper（ECOM） | 電気自動車 Dial-A-Ride の大近傍探索（Bresich, Raidl, Limmer） | 充電ステーションをその場で挿入する（大学ニュースによる）。 | ⚠️ 本文未確認 |
| 27 | 2024 | Humies（金・銀・銅 2 件） | 説明可能な医用画像分割（Cortacero ほか）、硬貨デザイン（Machado ほか）、マクロ配置（Qian ほか）、構造の生成設計（Howard ほか） | Goodman の SIGEVOlution 記事による。 | — 参照のみ |
| 28 | 2023 | Best Paper（EML） | Covariance Matrix Adaptation MAP-Annealing | CMA-ME の閾値を徐々に上げる CMA-MAE。 | ↪ 既存：open-endedness/quality-diversity |
| 29 | 2023 | Best Paper（CS / EMO / ENUM / ECOM / GA / GP / NE＋SBSE / RWA / ACO-SI）／ Humies | DCG-MAP-Elites（Faldor ほか）、Pareto Local Optimal Solutions Networks（Liefooghe ほか）、BBOB のアフィン結合（Vermetten ほか）ほか ／ Humies 金 CryptOpt | 概要は検索情報による。 | — 参照のみ |

### 不明な点
- GECCO 2026 の ECOM と CS–SI の Best Paper 受賞論文（公式の候補は確認したが、2026 年の公式受賞ページが未掲載）。GECH は候補が無く対象外。他の 8 本の受賞も、公式の候補一覧で候補と確認したうえで、ACM の一覧の検索スニペット・所属機関のニュース・GP bibliography の注記に基づく。
- GECCO 2026 の EMO 受賞論文（Ochoa ほか）と Humies 2026 銅賞 2 本の本文。
- GECCO 2026 の投稿数 425 は Tanabe の集計のみ（採択 149 は公式で確定し、第 1 段階の 150 を修正）。
- SIGEVO Impact Award 2026 と ACM TELO Best Paper（2024〜2026）の受賞者。
- GECCO 2024 の EML・EMO・ENUM・GA＋THEORY・GECH＋NE・RWA の受賞論文。2024 年 GP の受賞（GPLight）の公式な確認。
- GECCO 2027 の正式な締切と、リバッタルを設けるかどうか。
