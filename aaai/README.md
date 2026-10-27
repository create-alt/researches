## AAAI（aaai/）

### 調査履歴
- 2026-10-27: WebSearch のスニペット（aaai.org の AAAI-23〜27 各ページ、受賞ページ、AIhub、RIKEN AIP、papercopilot ほか）と ccf-deadlines の aaai.yml で AAAI-23〜27 の締切・会期・投稿数を照合し、AAAI-28 の締切を推定した。受賞は AAAI-26 の Outstanding Paper（本会議 5 本＋AI for Social Impact 2 本）と 2023〜2025 の主要賞を確認し、本文を arXiv・ojs.aaai.org・著者サイトで全文読んで 12 本をスライド化した。aaai.org・aihub.org・aip.riken.jp は WebFetch で到達できず、受賞一覧の 2023〜2025 分は検索スニペットと GitHub の二次リストに依拠。運営の動向は AAAI-26 AI Review Pilot の報告論文（arXiv 2604.13940）で確認した。

### 締切の要点
- AAAI-27（2027-02-16〜23、モントリオール）の本会議は締切済み（アブストラクト 2026-07-21、論文 2026-07-28、AoE）。残りは最終採否通知 2026-11-30、カメラレディ 12-14（公式）。Journal Track は 2026-10-30 締切（公式）、不採択論文は AAMAS 2027 AAAI Track（12-11 締切）へ回せる。
- 次に本会議へ投稿できるのは AAAI-28（未発表）。直近 5 回の締切が 8 月中旬から 7 月下旬へ前倒しされていることから、アブストラクト 2027-07-20 前後・論文 2027-07-27 前後（いずれも推定、幅は 7 月中旬〜8 月中旬）、採否通知は 11 月下旬と推定。

### 受賞・話題の論文一覧
| # | 年 | 賞 | 論文 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026 | Outstanding Paper | [Model Change for Description Logic Concepts](https://arxiv.org/abs/2603.05562) | 記述論理の概念をモデル単位で最小変更する eviction・reception・revision を定式化し、EL⊥・ALC で互換性を定理で整理。 | ✅ p.2 |
| 2 | 2026 | Outstanding Paper | [Causal Structure Learning for Dynamical Systems with Theoretical Score Analysis](https://arxiv.org/abs/2512.14361) | GP と MDL スコアで連続時間力学系の因果グラフを推定（CaDyT）。不規則サンプリングに対応。 | ✅ p.4 |
| 3 | 2026 | Outstanding Paper | [ReconVLA: Reconstructive Vision-Language-Action Model as Effective Robot Perceiver](https://arxiv.org/abs/2508.10333) | 注視領域を拡散で再構成する補助損失で VLA の注意を対象に集める。CALVIN で既存 VLA を上回る。 | ✅ p.6 |
| 4 | 2026 | Outstanding Paper | [LLM2CLIP: Powerful Language Model Unlocks Richer Cross-Modality Representation](https://arxiv.org/abs/2411.04997) | 埋め込み化した LLM を CLIP の文章側に据える安価な後学習で、長文・多言語検索を大幅改善。 | ✅ p.8 |
| 5 | 2026 | Outstanding Paper | [High-Pass Matters: Theoretical Insights and Sheaflet-Based Design for Hypergraph Neural Networks](https://ojs.aaai.org/index.php/AAAI/article/view/39469) | ハイパーグラフ NN で高域成分が効くことを理論で示し、層理論＋フレームレットの HyperSheaflets を提案。 | ✅ p.10 |
| 6 | 2026 | Outstanding Paper（AISI） | [PlantTraitNet: An Uncertainty-Aware Multimodal Framework for Global-Scale Plant Trait Inference from Citizen Science Data](https://arxiv.org/abs/2511.06943) | 市民科学写真から植物 4 形質を推定し全球地図化。既存地図を 3 形質で上回る。 | ✅ p.12 |
| 7 | 2026 | Outstanding Paper（AISI） | [Generalizable Slum Detection from Satellite Imagery with Mixture-of-Experts](https://arxiv.org/abs/2511.10300) | 地域別専門家の MoE と専門家間一致度による疑似ラベル選別で、未学習都市のスラム検出を改善。 | ✅ p.14 |
| 8 | 2026 | Classic Paper（AAAI-11） | Learning Structured Embeddings of Knowledge Bases（Bordes, Weston, Collobert, Bengio） | 知識グラフ埋め込みの源流（検索情報に基づく）。もう 1 本は題名未確認。 | ⚠️ 本文未確認 |
| 9 | 2025 | Outstanding Paper | [Every Bit Helps: Achieving the Optimal Distortion with a Few Queries](https://ojs.aaai.org/index.php/AAAI/article/view/33507) | λ 回の効用問い合わせで distortion O(n^(1/λ)) を達成し最適界を確定。 | ✅ p.16 |
| 10 | 2025 | Outstanding Paper | [Efficient Rectification of Neuro-Symbolic Reasoning Inconsistencies by Abductive Reflection](https://arxiv.org/abs/2412.08457) | 反省ベクトルで誤り位置を示し記号推論で直す ABL-Refl。数独 97.4%。 | ✅ p.18 |
| 11 | 2025 | Outstanding Paper | [Revelations: A Decidable Class of POMDPs with Omega-Regular Objectives](https://arxiv.org/abs/2412.12063) | 啓示条件の下で POMDP の概確実戦略の存在が EXPTIME 完全に決定可能。 | ✅ p.20 |
| 12 | 2025 | Outstanding Paper（社会貢献系トラック） | DivShift: Exploring Domain-Specific Distribution Shifts in Large-Scale, Volunteer-Collected Biodiversity Datasets | 市民科学の生物多様性データの分布シフトを分析（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 13 | 2024 | Outstanding Paper | [Proportional Aggregation of Preferences for Sequential Decision Making](https://arxiv.org/abs/2306.14858) | 逐次の投票で少数派も比例的に代表される公理と、それを満たす Phragmén・MES・PAV。 | ✅ p.22 |
| 14 | 2024 | Outstanding Paper | [Reliable Conflictive Multi-view Learning](https://arxiv.org/abs/2402.16897) | 矛盾するマルチビューデータで決定と信頼度を同時に出す（検索情報に基づく）。 | — 参照のみ |
| 15 | 2024 | Outstanding Paper | [GxVAEs: Two Joint VAEs Generate Hit Molecules from Gene Expression Profiles](https://ojs.aaai.org/index.php/AAAI/article/view/29248) | 遺伝子発現から候補分子を生成する結合 VAE（検索情報に基づく）。 | — 参照のみ |
| 16 | 2024 | Best Paper（AISI） | [DISCount: Counting in Large Image Collections with Detector-Based Importance Sampling](https://arxiv.org/abs/2306.03151) | 検出器を提案分布とする重要度サンプリングで画像集合の物体数を推定（検索情報に基づく）。 | — 参照のみ |
| 17 | 2023 | Outstanding Paper | [Misspecification in Inverse Reinforcement Learning](https://arxiv.org/abs/2212.03201) | IRL の行動モデルの誤指定への頑健性を完全に特徴づけ。割引率・遷移の誤りにほぼ全モデルが非頑健。 | ✅ p.24 |
| 18 | 2023 | Outstanding Student Paper | [Decorate the Newcomers: Visual Domain Prompt for Continual Test Time Adaptation](https://arxiv.org/abs/2212.04145) | 視覚プロンプトによる継続的テスト時適応（検索情報に基づく）。 | — 参照のみ |
| 19 | 2023 | Distinguished Paper | [DropMessage: Unifying Random Dropping for Graph Neural Networks](https://arxiv.org/abs/2204.10037) | GNN のランダムドロップをメッセージ単位に統一（検索情報に基づく）。同賞は他に 6 本。 | — 参照のみ |

### 不明な点
- AAAI-26 の最終採択数・採択率の公式値（4,167 本・17.6% は二次情報）と、分母が初回投稿約 2.9 万本か査読対象約 2.3 万本か。
- AAAI-27 の投稿数・採択数、AAAI-28 の開催地・日程・締切（未発表）。
- AAAI-26 AI Alignment 特別トラックの受賞の有無と題名、2026 Classic Paper Award のもう 1 本。
- AAAI-24 の投稿数・採択数、AAAI-23 の採否通知日。
- 2023〜2025 の受賞一覧は公式ページ本体に到達できず、検索スニペットと GitHub の二次リストに依拠した。
