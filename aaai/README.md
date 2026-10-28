## AAAI（aaai/）

### 調査履歴
- 2026-10-27: WebSearch のスニペット（aaai.org の AAAI-23〜27 各ページ、受賞ページ、AIhub、RIKEN AIP、papercopilot ほか）と ccf-deadlines の aaai.yml で AAAI-23〜27 の締切・会期・投稿数を照合し、AAAI-28 の締切を推定した。受賞は AAAI-26 の Outstanding Paper（本会議 5 本＋AI for Social Impact 2 本）と 2023〜2025 の主要賞を確認し、本文を arXiv・ojs.aaai.org・著者サイトで全文読んで 12 本をスライド化した。aaai.org・aihub.org・aip.riken.jp は WebFetch で到達できず、受賞一覧の 2023〜2025 分は検索スニペットと GitHub の二次リストに依拠。運営の動向は AAAI-26 AI Review Pilot の報告論文（arXiv 2604.13940）で確認した。
- 2026-10-28: 公式サイト（aaai.org の受賞ページ・Classic Paper ページ・AAAI-23〜27 の会議ページと CFP、ojs.aaai.org の論文集）に直接アクセスして確認・修正した。AAAI-26 の受賞一覧を確定（AI Alignment Track の Best Paper を追加、AISI の 2 本の賞名を「Best Paper Award – AI for Social Impact Track」に修正、Demo・Poster 賞を追加）、2026 Classic Paper のもう 1 本（Tellex ほか、G3）を特定、2023〜2025 の受賞を公式ページと照合（AAAI-23 Distinguished Paper は 12 本、Classic Paper 2023〜2025 を追加）。AAAI-26 と AAAI-27 の日程を公式日程表で修正（AAAI-27 の著者フィードバックは 10-24〜31 に変更）。投稿数は論文集序文で確認し、採択数は ojs の論文集を集計して二次情報と比較した。本文を ojs.aaai.org で全文読んだ 4 本（AI Alignment Track の受賞、Classic Paper 2 本、DivShift）を追加し 16 本をスライド化。aihub.org・helsing.ai は引き続き到達不可。

### 締切の要点
- AAAI-27（2027-02-16〜23、モントリオール）の本会議は締切済み（アブストラクト 2026-07-21、論文 2026-07-28、AoE）。現在は著者フィードバック期間（2026-10-24〜31、公式日程表で 10-19〜25 から変更）で、最終採否通知 2026-11-30、カメラレディ 12-14（公式）。Journal Track は 2026-10-30 締切（公式）、不採択論文は AAMAS 2027 AAAI Track（12-11 締切）へ回せる。
- 次に本会議へ投稿できるのは AAAI-28。2026-10-28 時点で aaai.org に AAAI-28 のページはなく（公式未発表を確認）、直近 5 回の締切が 8 月中旬から 7 月下旬へ前倒しされていることから、アブストラクト 2027-07-20 前後・論文 2027-07-27 前後（いずれも推定、幅は 7 月中旬〜8 月中旬）、採否通知は 11 月下旬と推定。

### 受賞・話題の論文一覧
| # | 年 | 賞 | 論文 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026 | Outstanding Paper Award | [Model Change for Description Logic Concepts](https://arxiv.org/abs/2603.05562) | 記述論理の概念をモデル単位で最小変更する eviction・reception・revision を定式化し、EL⊥・ALC での互換性を定理で整理。 | ✅ p.2 |
| 2 | 2026 | Outstanding Paper Award | [Causal Structure Learning for Dynamical Systems with Theoretical Score Analysis](https://arxiv.org/abs/2512.14361) | GP と MDL スコアで連続時間力学系の因果グラフを推定する CaDyT。不規則サンプリングに対応し偽陽性が少ない。 | ✅ p.4 |
| 3 | 2026 | Outstanding Paper Award | [ReconVLA: Reconstructive Vision-Language-Action Model as Effective Robot Perceiver](https://arxiv.org/abs/2508.10333) | 注視領域を拡散で再構成する補助損失で VLA の視覚注意を対象に集める。CALVIN で既存 VLA を上回る。 | ✅ p.6 |
| 4 | 2026 | Outstanding Paper Award | [LLM2CLIP: Powerful Language Model Unlocks Richer Cross-Modality Representation](https://arxiv.org/abs/2411.04997) | キャプション対照学習で埋め込み化した LLM を CLIP の文章側に据え、低コストの後学習で長文・多言語検索を大幅改善。 | ✅ p.8 |
| 5 | 2026 | Outstanding Paper Award | [High-Pass Matters: Theoretical Insights and Sheaflet-Based Design for Hypergraph Neural Networks](https://ojs.aaai.org/index.php/AAAI/article/view/39469) | ハイパーグラフ NN で高域成分が汎化に効くことを示し、層理論とフレームレットの HyperSheaflets を提案。 | ✅ p.10 |
| 6 | 2026 | Best Paper Award（AI for Social Impact Track） | [PlantTraitNet: An Uncertainty-Aware Multimodal Framework for Global-Scale Plant Trait Inference from Citizen Science Data](https://arxiv.org/abs/2511.06943) | 市民科学の植物写真から 4 形質を推定し全球地図化。既存の全球形質地図を 4 形質中 3 形質で上回る。 | ✅ p.12 |
| 7 | 2026 | Best Paper Award（AI for Social Impact Track） | [Generalizable Slum Detection from Satellite Imagery with Mixture-of-Experts](https://arxiv.org/abs/2511.10300) | 地域別専門家の MoE と専門家間一致度による疑似ラベル選別で、未学習のアフリカ都市でのスラム検出を改善。 | ✅ p.14 |
| 8 | 2026 | Best Paper Award（AI Alignment Track） | [On the Alignment of Large Language Models with Global Human Opinion](https://ojs.aaai.org/index.php/AAAI/article/view/41102) | 世界価値観調査で 8 つの LLM の意見分布と 66 か国・8 言語・3 時代の人々との一致を測り、少数国への偏りと言語による誘導の効果を示した。 | ✅ p.16 |
| 9 | 2026 | AAAI Classic Paper Award 2026（AAAI-11 の論文） | [Learning Structured Embeddings of Knowledge Bases](https://ojs.aaai.org/index.php/AAAI/article/view/7917) | 実体ベクトルと関係ごとの左右行列で知識ベースを埋め込み、KDE で三つ組の尤度を推定。知識グラフ埋め込みの源流。 | ✅ p.18 |
| 10 | 2026 | AAAI Classic Paper Award 2026（AAAI-11 の論文） | [Understanding Natural Language Commands for Robotic Navigation and Mobile Manipulation](https://ojs.aaai.org/index.php/AAAI/article/view/7979) | 命令文の構造に応じて因子グラフを組む Generalized Grounding Graphs で、フォークリフトへの自然言語命令を物体・場所・行動に接地。 | ✅ p.20 |
| 11 | 2026 | Best Demonstration Award | Next-Generation Metalens Vision System: Powered by AI and Applied to AI（Fen Fang, Muli Yang, Henan Wang ほか） | 公式受賞ページで題名・著者のみ確認（本文未読） | ⚠️ 本文未確認 |
| 12 | 2026 | Best Demonstration Award（Runner Up） | Caption Anything in Video: Fine-grained Object-centric Captioning via Spatiotemporal Multimodal Prompting（Yolo Yunlong Tang, Jing Bi, Chao Huang ほか） | 公式受賞ページで題名・著者のみ確認（本文未読） | ⚠️ 本文未確認 |
| 13 | 2026 | Best Poster Award | MindCross: Fast New Subject Adaptation with Limited Data for Cross-subject Video Reconstruction from Brain Signals（Xuan-Hao Liu, Yan-Kai Liu, Tianyi Zhou, Bao-Liang Lu, Wei-Long Zheng） | 公式受賞ページで題名・著者のみ確認（本文未読） | ⚠️ 本文未確認 |
| 14 | 2026 | Best Poster Award | CAMAR: Continuous Actions Multi-Agent Routing（Artem Pshenitsyn, Aleksandr Panov, Alexey Skrynnik） | 公式受賞ページで題名・著者のみ確認（本文未読） | ⚠️ 本文未確認 |
| 15 | 2026 | Best Poster Award | Preference Elicitation for Step-Wise Explanations in Logic Puzzles（Marco Foschini, Marianne Defresne, Emilio Gamba, Bart Bogaerts, Tias Guns） | 公式受賞ページで題名・著者のみ確認（本文未読） | ⚠️ 本文未確認 |
| 16 | 2026 | Best Poster Award | Fractured Glass, Failing Cameras: Simulating Physics-Based Adversarial Samples for Autonomous Driving Systems（Manav Prabhakar, Jwalandhar Girnar, Arpan Kusari） | 公式受賞ページで題名・著者のみ確認（本文未読） | ⚠️ 本文未確認 |
| 17 | 2026 | Student Abstract Program Award | Cumulant Attention in Vision Transformers（Yuto Morimoto, Zhipeng Wang, Koji Yasuda） | 公式受賞ページで題名・著者のみ確認（本文未読） | ⚠️ 本文未確認 |
| 18 | 2025 | Outstanding Paper Award | [Every Bit Helps: Achieving the Optimal Distortion with a Few Queries](https://ojs.aaai.org/index.php/AAAI/article/view/33507) | 各エージェントへ λ 回の効用問い合わせで distortion O(n^(1/λ)) を達成し、マッチングと選挙で最適界を確定。 | ✅ p.22 |
| 19 | 2025 | Outstanding Paper Award | [Efficient Rectification of Neuro-Symbolic Reasoning Inconsistencies by Abductive Reflection](https://arxiv.org/abs/2412.08457) | 反省ベクトルで誤り位置を示し記号推論で直す ABL-Refl。数独で 97.4%。 | ✅ p.24 |
| 20 | 2025 | Outstanding Paper Award | [Revelations: A Decidable Class of POMDPs with Omega-Regular Objectives](https://arxiv.org/abs/2412.12063) | 状態がいずれ明かされる啓示条件の下で POMDP の概確実戦略の存在が EXPTIME 完全に決定可能になることを示す。 | ✅ p.26 |
| 21 | 2025 | Outstanding Paper Award（AI for Social Alignment Track） | [DivShift: Exploring Domain-Specific Distribution Shifts in Large-Scale, Volunteer-Collected Biodiversity Datasets](https://ojs.aaai.org/index.php/AAAI/article/view/35060) | 市民参加型の生物多様性画像の 5 種類の偏りを分布シフトとして扱い、約 730 万画像で種認識性能への影響を測った。 | ✅ p.28 |
| 22 | 2025 | Best Poster Award | Computing Game Symmetries and Equilibria That Respect Them（Emanuel Tewolde, Brian Hu Zhang, Caspar Oesterheld, Tuomas Sandholm, Vincent Conitzer） | 公式受賞ページで題名・著者のみ確認（本文未読） | ⚠️ 本文未確認 |
| 23 | 2025 | Best Poster Award | BindGPT: A Scalable Framework for 3D Molecular Design via Language Modeling and Reinforcement Learning（Artem Zholus, Maksim Kuznetsov ほか） | 公式受賞ページで題名・著者のみ確認（本文未読） | ⚠️ 本文未確認 |
| 24 | 2025 | Best Poster Award | Eliminating Majority Illusion is Easy（Jack Dippel, Max Dupre la Tour, April Niu, Sanjukta Roy, Adrian Vetta） | 公式受賞ページで題名・著者のみ確認（本文未読） | ⚠️ 本文未確認 |
| 25 | 2025 | AAAI Classic Paper Award 2025 | Toward an Architecture for Never-Ending Language Learning（Tom Mitchell, Andrew Carlson, Justin Betteridge, Bryan Kisiel, Burr Settles, Estevam Hruschka） | NELL（AAAI-10）。ウェブから知識を継続的に読み取る学習アーキテクチャ（公式ページで題名のみ確認）。 | ⚠️ 本文未確認 |
| 26 | 2024 | Outstanding Paper Award | [Proportional Aggregation of Preferences for Sequential Decision Making](https://arxiv.org/abs/2306.14858) | 逐次の投票で少数派も比例的に代表される公理と、それを満たす Phragmén・MES・PAV を示した。 | ✅ p.30 |
| 27 | 2024 | Outstanding Paper Award | [Reliable Conflictive Multi-view Learning](https://arxiv.org/abs/2402.16897) | ビュー間で矛盾するマルチビューデータに対し、決定と信頼度を同時に出す学習法（検索情報に基づく）。 | — 参照のみ |
| 28 | 2024 | Outstanding Paper Award | [GxVAEs: Two Joint VAEs Generate Hit Molecules from Gene Expression Profiles](https://ojs.aaai.org/index.php/AAAI/article/view/29248) | 遺伝子発現プロファイルから候補分子を生成する 2 つの VAE の結合モデル（検索情報に基づく）。 | — 参照のみ |
| 29 | 2024 | Best Paper（AI for Social Impact Track） | [DISCount: Counting in Large Image Collections with Detector-Based Importance Sampling](https://arxiv.org/abs/2306.03151) | 検出器を提案分布とする重要度サンプリングで大規模画像集合の物体数を少ないラベルで推定（検索情報に基づく）。 | — 参照のみ |
| 30 | 2024 | Best Student Paper（AI for Social Impact Track） | Scaling Up Pareto Optimization for Tree Structures with Affine Transformations: Evaluating Hybrid Floating Solar-Hydropower Systems in the Amazon（Marc Grimson, Rafael Almeida, Qinru Shi ほか（Carla Gomes）） | 公式受賞ページで題名・著者のみ確認（本文未読）。AISI トラックの Best Paper・Best Student Paper にはそれぞれ Honorable Mention が 1 本ずつある | ⚠️ 本文未確認 |
| 31 | 2024 | AAAI Classic Paper Award 2024 | Maximum Entropy Inverse Reinforcement Learning（Brian Ziebart, Andrew Maas, Andrew Bagnell, Anind Dey） | 最大エントロピー IRL（AAAI-08）。公式の受賞理由：強化学習にエントロピー正則化を導入し、予測・模倣学習・意思決定・人と AI のアラインメントの改善につながった。 | ⚠️ 本文未確認 |
| 32 | 2023 | Outstanding Paper Award | [Misspecification in Inverse Reinforcement Learning](https://arxiv.org/abs/2212.03201) | IRL の行動モデルの誤指定への頑健性を完全に特徴づけ、割引率・遷移の誤りにほぼ全モデルが非頑健と示した。 | ✅ p.32 |
| 33 | 2023 | Outstanding Student Paper Award | [Decorate the Newcomers: Visual Domain Prompt for Continual Test Time Adaptation](https://arxiv.org/abs/2212.04145) | 入力画像に学習可能な視覚プロンプトを加えて継続的テスト時適応を行う（検索情報に基づく）。 | — 参照のみ |
| 34 | 2023 | Distinguished Paper | [DropMessage: Unifying Random Dropping for Graph Neural Networks](https://arxiv.org/abs/2204.10037) | GNN のランダムドロップ手法（DropEdge, DropNode 等）をメッセージ単位に統一（検索情報に基づく）。AAAI-23 Distinguished Paper は公式ページで計 12 本（本論文ほか 11 本）。 | — 参照のみ |
| 35 | 2023 | AAAI Classic Paper Award 2023 | Theta*: Any-Angle Path Planning on Grids（Kenny Daniel, Alex Nash, Sven Koenig, Ariel Felner） | 格子上で辺に沿わない任意角度の経路を探索する Theta*（AAAI-07）。公式ページで題名のみ確認。 | ⚠️ 本文未確認 |

### 不明な点
- AAAI-26 の最終採択数・採択率の公式値。公式（論文集序文）は投稿約 29,000・査読対象約 23,000 のみで、採択 4,167・17.6% は二次情報。論文集の本会議掲載は 4,055 本（ほか AI Alignment 106、AISI 162）で一致しない。
- AAAI-27 の投稿数・採択数、AAAI-28 の開催地・日程・締切（未発表）。
- AAAI-24 の投稿数（二次情報で 9,862 本と 12,100 本の 2 説、論文集の本会議掲載は 2,331 本）、AAAI-23 の採否通知日。
- 受賞論文の選考理由は公式に掲載されていない（Classic Paper は 2024 年分のみ理由文あり）。評価ポイントは調査者の見立て（Bordes の論文のみ受賞講演の要旨を併用）。
- DivShift の受賞トラック名（公式受賞ページは「AI for Social Alignment Track」、論文集では AISI の節）と著者数（3 名表記と 5 名）。AAAI-25 Outstanding Student Paper の題名。
