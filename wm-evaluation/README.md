## 世界モデルの評価・診断指標（wm-evaluation/）

### 調査履歴
- 2026-10-24: 第3回調査。既存テーマ（jepa・foundation-world-model）の next_themes で挙がった「予測誤差・画素忠実度と計画成功率のずれ」「生成的世界モデルの評価指標の乱立」を起点にした。arXiv API で `ti:"world model(s)" AND (evaluat|benchmark|diagnos|metric|proxy)`、`abs:"prediction error" AND abs:"world model" AND abs:planning`、`abs:"optimism bias" AND abs:"world model"` などを新着順に検索し、2026年に急増している診断指標・ベンチマーク論文から現在地を把握した。
- そこから (a) 予測精度と制御性能の不一致の系譜（Objective Mismatch → Value Equivalence → 2026年の JEPA/潜在世界モデルでの再検証）と、(b) 生成動画の評価の系譜（FVD → 物理遵守の Physics-IQ・WorldModelBench、制御性の WorldScore → 閉ループで測る World-in-World → 行動条件付き信頼性の MiraBench）を原典まで遡った。
- スライド化した10本は arXiv 版で本文を全文読んだ（付録は必要箇所のみ）。採録先は arXiv コメントと検索（CVF Open Access・NeurIPS サイト）で確認した。既存デッキでスライド化済みの LeWM・JEPA-WMs・Prediction over Reconstruction（jepa）、Hallucination in WMs（foundation-world-model）、PETS・Exploitable WM（latent-planning）は再掲していない。VIScore（2608.11174）は v2 が arXiv 管理者により取り下げ扱いとなっていたため採用を見送った。

### 系譜
```
[予測精度と意思決定のずれ（objective mismatch）の系譜]
システム同定の伝統 ─→ Objective Mismatch (Lambert+ 2020, L4DC: 1ステップ尤度と報酬の相関が弱い)
                        ├→ Value Equivalence (Grimm+ 2020) / VAML ─→ Unified View (Wei+ 2023, 解法の分類)
                        └→ 2026年の潜在世界モデルでの再検証
                              ├→ LeWM 再現研究 (Singh 2026: 評価条件で 14%↔84%、1ステップ誤差は長期計画を予測しない)
                              ├→ DRPE (Wang+ 2026: 決定に関わる次元の誤差だけが計画を予測)
                              ├→ One-Step Proxy (Cheung & He 2026: 1エポック以降 r≈0、評価シードだけで ±26pt)
                              └→ 周辺: Low Prediction Error Misleads / Decision-Metric Alignment / Operator-on-F / ACPC (2026)

[生成的（動画）世界モデルの評価の系譜]
PSNR・SSIM ─→ FID (2017) ─→ FVD (Unterthiner+ 2018: 分布の忠実度、人間の判断に整合)
   └→ VBench (2024, 画質の多次元評価)
         ├→ 物理遵守: Physics-IQ (Motamed+ 2025, 実写・リアルさ≠物理) / WorldModelBench (Li+ 2025, 物理5法則+人手判定器)
         ├→ 制御性:   WorldScore (Duan+ 2025, カメラ軌道による次シーン生成)
         └→ 閉ループ: World-in-World (Zhang+ 2025/ICLR 2026, 課題成功で評価、画質より制御性)
                         ├→ WorldArena / WorldArena 2.0 (2026, 知覚と機能の差)
                         └→ 行動条件付き信頼性: MiraBench (Yang+ 2026, 楽観バイアス) ─→ CureWM (Xu+ 2026, 失敗で修復)
                                 （関連: Hallucination in WMs, 既存: foundation-world-model）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Towards Accurate Generative Models of Video: A New Metric & Challenges](https://arxiv.org/abs/1812.01717) | 2018 | arXiv | 原典 | I3D 特徴の Fréchet 距離で動画生成を評価する FVD を提案。PSNR・SSIM より人間の判断に一致。 | ✅ p.2 |
| 2 | [Objective Mismatch in Model-based Reinforcement Learning](https://arxiv.org/abs/2002.04523) | 2020 | L4DC 2020 | 原典 | ダイナミクスモデルの1ステップ尤度と制御報酬の相関が弱いことを数千モデルで示し、objective mismatch と命名。 | ✅ p.3 |
| 3 | [Do generative video models understand physical principles?](https://arxiv.org/abs/2501.09038) | 2025 | WACV 2026 | 発展 | 実写396本の Physics-IQ。最良モデルでも 29.5%、見た目のリアルさと物理理解は相関しない。 | ✅ p.4 |
| 4 | [WorldModelBench: Judging Video Generation Models As World Models](https://arxiv.org/abs/2502.20694) | 2025 | NeurIPS 2025 D&B | 発展 | 指示追従・物理5法則・常識で動画生成モデルを採点。6.7万件の人手ラベルと2B 判定器。 | ✅ p.5 |
| 5 | [WorldScore: A Unified Evaluation Benchmark for World Generation](https://arxiv.org/abs/2504.00983) | 2025 | ICCV 2025 | 発展 | 次シーン生成の連鎖として動画・3D・4D 生成を統一評価。制御性・品質・ダイナミクスの10指標。 | ✅ p.6 |
| 6 | [World-in-World: World Models in a Closed-Loop World](https://arxiv.org/abs/2510.18135) | 2025 | ICLR 2026 (Oral) | 発展 | 閉ループの身体性課題の成功率で世界モデルを評価。画質は成功を保証せず制御性が効く。 | ✅ p.7 |
| 7 | [MiraBench: Evaluating Action-Conditioned Reliability in Robotic World Models](https://arxiv.org/abs/2605.29360) | 2026 | arXiv | 最新 | 物理遵守・行動追従・楽観バイアスの3階層。失敗行動でも成功映像を生成する楽観バイアスが広く存在。 | ✅ p.8 |
| 8 | [The Evaluation Protocol Determines the Result: An Independent Reproduction of LeWorldModel on TwoRoom](https://arxiv.org/abs/2608.10145) | 2026 | arXiv | 最新 | LeWM の独立再現。設定にない4つの前処理慣行と評価条件の食い違いで同じ重みが 14%/84%。1ステップ誤差は長期計画を予測しない。 | ✅ p.9 |
| 9 | [Not All Errors Matter: Decision-Relevant Prediction Error Predicts Planning Quality](https://arxiv.org/abs/2609.32322) | 2026 | arXiv | 最新 | 決定に関わる次元の多段誤差 DRPE と iso-error 評価法。総誤差 ρ=−0.25 に対し DRPE ρ=−0.84。 | ✅ p.10 |
| 10 | [One-Step Prediction Fidelity Is a Poor Proxy for Planning Performance in JEPA World Models](https://arxiv.org/abs/2610.19375) | 2026 | NeurIPS 2026 WS (WM-PAI) | 最新 | 凍結デコーダで1ステップ誤差を物理単位化。LeWM で誤差を下げても計画は伸びず（r=−0.010）。 | ✅ p.11 |
| 11 | [LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels](https://arxiv.org/abs/2603.19312) | 2026 | arXiv | 最新 | 予測損失と SIGReg の2項で画素から学ぶ JEPA 世界モデル。#8・#10 の評価対象。 | ↪ 既存：world-model/jepa p.10 |
| 12 | [What Drives Success in Physical Planning with Joint-Embedding Predictive World Models? (JEPA-WMs)](https://arxiv.org/abs/2512.24497) | 2025 | TMLR 2026 | 発展 | 凍結表現上の JEPA 世界モデルの設計要因を計画成功率で体系比較。 | ↪ 既存：world-model/jepa p.8 |
| 13 | [What Makes Video World Model Latents Action-Relevant: Prediction over Reconstruction](https://arxiv.org/abs/2606.07687) | 2026 | arXiv | 最新 | 画素忠実度（PSNR）と行動情報が無関係であることを示す。#1 の系譜への反証的な位置づけ。 | ↪ 既存：world-model/jepa p.11 |
| 14 | [Hallucination in World Models Is Predictable and Preventable](https://arxiv.org/abs/2606.27326) | 2026 | arXiv | 最新 | 世界モデルの幻覚を指標化・予測。#7 MiraBench の楽観バイアスと相補的。 | ↪ 既存：world-model/foundation-world-model p.10 |
| 15 | [Imperfect World Models Are Exploitable](https://arxiv.org/abs/2605.15960) | 2026 | arXiv | 最新 | 不完全な世界モデルが計画器に悪用される条件の分析。 | ↪ 既存：world-model/latent-planning p.10 |
| 16 | [Deep Reinforcement Learning in a Handful of Trials using Probabilistic Dynamics Models (PETS)](https://arxiv.org/abs/1805.12114) | 2018 | NeurIPS 2018 | 原典 | 確率的アンサンブル＋CEM の MBRL。#2 の実験基盤。 | ↪ 既存：world-model/latent-planning p.2 |
| 17 | [The Value Equivalence Principle for Model-Based Reinforcement Learning](https://arxiv.org/abs/2011.03506) | 2020 | NeurIPS 2020 | 発展 | ベルマン更新が一致すればよいとする価値等価原理。予測の正確さより計画に効くモデルを目指す（要旨に基づく）。 | — 参照のみ（要旨のみ確認。#2 の対になる「学習側」の応答で、評価指標そのものではないため） |
| 18 | [A Unified View on Solving Objective Mismatch in Model-Based Reinforcement Learning](https://arxiv.org/abs/2310.06253) | 2023 | arXiv | 発展 | objective mismatch の解法（価値等価・微分可能計画など）を分類するサーベイ（要旨に基づく）。 | — 参照のみ（要旨のみ確認） |
| 19 | [Fréchet Inception Distance (GANs Trained by a Two Time-Scale Update Rule…)](https://arxiv.org/abs/1706.08500) | 2017 | NeurIPS 2017 | 原典 | 画像生成の FID。FVD の直接の前身。 | — 参照のみ（画像生成の指標で本テーマの外） |
| 20 | [VBench: Comprehensive Benchmark Suite for Video Generative Models](https://arxiv.org/abs/2311.17982) | 2023 | CVPR 2024 | 発展 | 動画生成を16次元で評価。#4・#5 が「物理・制御性を測れない」比較対象とする（検索情報に基づく）。 | — 参照のみ（タイトル・他論文での記述のみ） |
| 21 | [VideoPhy: Evaluating Physical Commonsense for Video Generation](https://arxiv.org/abs/2406.03520) | 2024 | arXiv | 発展 | 物理常識の0/1人手判定。#4 の前身（他論文での記述に基づく）。 | — 参照のみ（タイトルのみ） |
| 22 | [How Far is Video Generation from World Model: A Physical Law Perspective](https://arxiv.org/abs/2411.02385) | 2024 | ICML 2025 | 発展 | 2D 物理シミュレーションで動画生成の汎化を検証。分布内は完全、分布外で失敗（要旨に基づく）。 | — 参照のみ（要旨のみ確認） |
| 23 | [WorldGym: World Model as An Environment for Policy Evaluation](https://arxiv.org/abs/2506.00613) | 2025 | arXiv | 発展 | 動画世界モデル内での方策評価が実機成功率と高相関（要旨に基づく）。 | — 参照のみ（要旨のみ確認） |
| 24 | [WorldEval: World Model as Real-World Robot Policies Evaluator](https://arxiv.org/abs/2505.19017) | 2025 | arXiv | 発展 | 世界モデルによる実機方策評価。 | — 参照のみ（タイトルのみ） |
| 25 | [WorldArena: A Unified Benchmark for Evaluating Perception and Functional Utility of Embodied World Models](https://arxiv.org/abs/2602.08971) | 2026 | arXiv | 最新 | 知覚品質16指標と、データ生成・方策評価・計画の機能を統合した EWMScore。知覚と機能の差を報告（要旨に基づく）。 | — 参照のみ（要旨のみ確認。World-in-World と趣旨が重なるため） |
| 26 | [WorldArena 2.0](https://arxiv.org/abs/2605.17912) | 2026 | arXiv | 最新 | 視触覚・RL 環境としての機能・実機プラットフォームへ評価を拡張（要旨に基づく）。 | — 参照のみ（要旨のみ確認） |
| 27 | [World Models Dream of Success: Diagnosing and Repairing Failure Insensitivity in Robot World Models (CureWM)](https://arxiv.org/abs/2610.09134) | 2026 | arXiv | 最新 | 実行で検証した反事実の失敗で公開チェックポイントを修復。LIBERO で楽観率 80%→38%、ただし誤警報も増える。 | — 参照のみ（本文を読んだが評価より修復手法が主のため、MiraBench を優先） |
| 28 | [When Low Prediction Error Misleads Planning: Diagnosing Representation, Dynamics, and Decision Failures in Latent World Models](https://arxiv.org/abs/2610.05550) | 2026 | arXiv | 最新 | 誤差の大半を占める成分と、直すと行動選択が良くなる成分が一致しないことを4系統・4課題で示す（要旨に基づく）。 | — 参照のみ（要旨のみ確認。DRPE と主張が重なるため） |
| 29 | [Decision-Metric Alignment in Latent World Models](https://arxiv.org/abs/2608.18746) | 2026 | arXiv | 最新 | 潜在距離コストが実コストの順位を保つかを Plan-Real Spearman で測り、逆動力学ヘッド付き DA-LeWM を提案（要旨に基づく）。 | — 参照のみ（要旨のみ確認） |
| 30 | [Operator-on-F complements value-equivalence: a planning-time diagnostic for latent world models](https://arxiv.org/abs/2607.04464) | 2026 | RLC 2026 WS | 最新 | TD-MPC2 で報酬誤差は性能を区別できないが、k ステップ潜在押し出しの誤差は計画性能の崩壊と ρ=−0.90（要旨に基づく）。 | — 参照のみ（要旨のみ確認） |
| 31 | [Diagnosing JEPA World Models with Action-Conditioned Predictive Consistency](https://arxiv.org/abs/2608.12939) | 2026 | arXiv | 最新 | 視覚摂動下の行動条件付きロールアウトの乖離（ACPC）で頑健性を診断（要旨に基づく）。 | — 参照のみ（要旨のみ確認） |
| 32 | [Do Better Imagined Rollouts Mean Better Robot Control? A Controlled Study of World-Model Evaluation Under Feedback](https://arxiv.org/abs/2609.02811) | 2026 | arXiv | 最新 | 開ループのロールアウト誤差より、観測補正を含むリプレイ誤差の方が閉ループ性能を予測（ρ=0.923 vs 0.774、要旨に基づく）。 | — 参照のみ（要旨のみ確認） |
| 33 | [VIScore: Diagnosing Planning-Relevant Quality in Latent World Models](https://arxiv.org/abs/2608.11174) | 2026 | arXiv | 最新 | エンコーダ・予測器・計画器を通した品質スコアが成功率と Spearman 0.75 超（要旨に基づく）。 | — 参照のみ（v2 が arXiv 管理者により取り下げ扱いのため不採用） |
| 34 | [Frozen in a Frame: The Velocity Blind Spot in JEPA World Models](https://arxiv.org/abs/2610.04585) | 2026 | arXiv | 最新 | 1フレーム埋め込みは速度を含みえないと指摘。 | — 参照のみ（既存 jepa の readme で言及済み） |
| 35 | [WorldOracle: Benchmarking Action-Conditioned World Models against Real-World Executions](https://arxiv.org/abs/2610.18826) | 2026 | arXiv | 最新 | 同じ初期観測・行動列での実機実行と予測を4観点で比較するベンチマーク（要旨に基づく）。 | — 参照のみ（要旨のみ確認） |
| 36 | [Do World Models Make Better Robots? A Survey of Evaluation Benchmarks for Predictive Embodied Intelligence](https://arxiv.org/abs/2609.29669) | 2026 | arXiv | 最新 | 160ベンチマークを分類し、世界モデルと VLA を閉ループで比べるものは 7% のみと指摘（要旨に基づく）。 | — 参照のみ（要旨のみ確認） |
