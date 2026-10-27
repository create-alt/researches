## JEPA 系の非生成型潜在世界モデル（jepa/）

### 調査履歴
- 2026-10-23: 第2回調査（階層化テーマの推奨テーマ3）。arXiv API で "JEPA" AND "world model"、"LeWM"、"SIGReg"、"LeWorldModel"、"LeJEPA"、"DINO-WM"、"V-JEPA 2" などを新着順に検索し、2026年に急増している JEPA 世界モデル論文（LeWM の派生、崩壊防止・速度情報の欠落・評価プロトコルの批判など）から現在地を把握した。そこから (a) 崩壊防止の系譜（VICReg → PLDM → LeJEPA/SIGReg → LeWM）、(b) 表現空間で予測する JEPA の系譜（LeCun の構想 → I-JEPA → V-JEPA → V-JEPA 2/2-AC）、(c) 凍結表現上の世界モデルの系譜（DINO-WM → JEPA-WMs）、(d) 生成型（Dreamer など）との比較・論争（Dreamer-CDP、Prediction over Reconstruction）を遡って追った。
- 本文は arXiv 版で全文を読んだ（付録は必要箇所のみ）。LeCun (2022) のポジションペーパーは OpenReview が 403 で今回も取得できず、本文未確認のまま。既存テーマ（hierarchical）でスライド化済みの H-JEPA 構想・HWM・Hi-LeWM・H-JEPA は再掲していない。

### 系譜
```
[崩壊防止の系譜]
BYOL (2020, EMA+predictor) / Barlow Twins (2021, 相関の白色化)
   └→ VICReg (2021/ICLR 2022, 分散・共分散の明示的正則化)
          ├→ PLDM (2025, 時間方向 VICReg+IDM で画素から end-to-end の潜在ダイナミクス)
          └→ LeJEPA / SIGReg (2025, 等方ガウスへの分布一致・1ハイパーパラメータ)
                 └→ LeWM (2026, 予測+SIGReg の2項で画素から end-to-end)
                        ├→ 再現・批判: 評価プロトコル依存 (2608.10145), 速度の盲点 (Frozen in a Frame), 1ステップ誤差≠計画性能
                        └→ 階層化: Hi-LeWM, H-JEPA (既存: hierarchical)

[表現空間で予測する JEPA の系譜]
LeCun "A Path Towards AMI" (2022) ※本文未確認 ─ H-JEPA 構想ノート (2023, 既存: hierarchical)
   └→ I-JEPA (2023, 画像のマスク表現予測)
          └→ V-JEPA (2024, 動画) → V-JEPA 2 / 2-AC (2025, 1M時間の動画+62時間のロボット動画で計画)

[凍結表現上の世界モデル]
DINOv2 → DINO-WM (2024/ICML 2025) ─┐
V-JEPA 2-AC (2025) ────────────────┼→ JEPA-WMs (2025/TMLR 2026, 設計要因の体系比較) → HWM (2026, 既存: hierarchical)
PLDM (2025) ───────────────────────┘

[生成型との比較・論争]
World Models (2018) → Dreamer/DreamerV3 (再構成) ─→ MuDreamer (2024), DreamerPro (2022) → Dreamer-CDP (2026, JEPA 型予測で Dreamer に並ぶ)
Learning by Reconstruction Produces Uninformative Features (2024) → Prediction over Reconstruction (2026, 画素忠実度と行動情報は無相関)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [VICReg: Variance-Invariance-Covariance Regularization for Self-Supervised Learning](https://arxiv.org/abs/2105.04906) | 2021 | ICLR 2022 | 原典 | 不変・分散・共分散の3項で崩壊を明示的に防ぐ自己教師あり学習。ImageNet 線形 73.2%。PLDM の崩壊防止の基盤。 | ✅ p.2 |
| 2 | [Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture (I-JEPA)](https://arxiv.org/abs/2301.08243) | 2023 | CVPR 2023 | 原典 | 文脈ブロックから複数ターゲットブロックの表現を予測する非生成型 SSL。データ拡張なしで ViT-H/14 線形 79.3%。 | ✅ p.3 |
| 3 | [DINO-WM: World Models on Pre-trained Visual Features enable Zero-shot Planning](https://arxiv.org/abs/2411.04983) | 2024 | ICML 2025 | 発展 | 凍結 DINOv2 のパッチ特徴上で行動条件付き予測器を学び、潜在空間の MPC でゼロショット計画。PushT 0.90（DreamerV3 0.30）。 | ✅ p.4 |
| 4 | [Learning from Reward-Free Offline Data: A Case for Planning with Latent Dynamics Models (PLDM)](https://arxiv.org/abs/2502.14819) | 2025 | NeurIPS 2025 | 発展 | 報酬なしオフラインデータで RL 5手法と比較。VICReg 型損失で end-to-end に学ぶ潜在ダイナミクス＋MPPI が未知配置への汎化で最良。 | ✅ p.5 |
| 5 | [V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://arxiv.org/abs/2506.09985) | 2025 | arXiv | 発展 | 1M 時間超の動画で V-JEPA を 1B に拡大し、62時間のロボット動画で行動条件付き予測器（2-AC）を後学習。Franka でゼロショット P&P 80%（Octo 15%）。 | ✅ p.6 |
| 6 | [LeJEPA: Provable and Scalable Self-Supervised Learning Without the Heuristics](https://arxiv.org/abs/2511.08544) | 2025 | arXiv | 最新 | 等方ガウスが最適な埋め込み分布と証明し、ランダム射影＋Epps–Pulley 検定の SIGReg を提案。EMA・stop-gradient 不要。 | ✅ p.7 |
| 7 | [What Drives Success in Physical Planning with Joint-Embedding Predictive World Models?](https://arxiv.org/abs/2512.24497) | 2025 | TMLR 2026 | 最新 | JEPA-WM の設計要因（計画器・rollout 損失・固有受容覚・エンコーダ・AdaLN・規模）を体系比較し、DINO-WM と V-JEPA 2-AC を上回る構成を提示。 | ✅ p.8 |
| 8 | [Dreamer-CDP: Improving Reconstruction-free World Models Via Continuous Deterministic Representation Prediction](https://arxiv.org/abs/2603.07083) | 2026 | ICLR 2026 ワークショップ（tiny paper） | 最新 | DreamerV3 の再構成損失を連続・決定的な表現の予測に置き換え、Crafter で Dreamer と同等（16.2% vs 14.5%）。 | ✅ p.9 |
| 9 | [LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels](https://arxiv.org/abs/2603.19312) | 2026 | arXiv | 最新 | 予測 MSE＋SIGReg の2項で画素から安定に end-to-end 学習する 15M の JEPA 世界モデル。Push-T 96%、計画は DINO-WM の48倍速。 | ✅ p.10 |
| 10 | [What Makes Video World Model Latents Action-Relevant: Prediction over Reconstruction](https://arxiv.org/abs/2606.07687) | 2026 | arXiv | 最新 | 8系統の事前学習表現を逆動力学プローブで比較。行動の読み出しやすさは画素忠実度でなく時間的な予測事前学習で決まる。 | ✅ p.11 |
| 11 | [A Path Towards Autonomous Machine Intelligence](https://openreview.net/forum?id=BZ5a1r-kVsf) (LeCun) | 2022 | OpenReview（ポジションペーパー） | 原典 | JEPA と、潜在空間で予測・計画する世界モデルを中核に据えた自律知能アーキテクチャの提案（検索情報と講義ノート #12 に基づく）。OpenReview の PDF は 403 で取得できず。 | ⚠️ 本文未確認 |
| 12 | [Introduction to Latent Variable Energy-Based Models: A Path Towards Autonomous Machine Intelligence](https://arxiv.org/abs/2306.02572) | 2023 | J. Stat. Mech. 2024 | 原典 | LeCun 構想の講義ノート。EBM・JEPA・H-JEPA の解説。 | ↪ 既存：hierarchical p.4 |
| 13 | [Hierarchical Planning with Latent World Models (HWM)](https://arxiv.org/abs/2604.03208) | 2026 | CoRL | 最新 | JEPA 系世界モデルを複数時間スケールで学び階層 MPC を行う。 | ↪ 既存：hierarchical p.8 |
| 14 | [Mind the Gap: Promises and Pitfalls of Hierarchical Planning in LeWorldModel](https://arxiv.org/abs/2607.12547) | 2026 | ワークショップ | 最新 | 凍結 LeWM に上位層を後付けした Hi-LeWM の分析。 | ↪ 既存：hierarchical p.9 |
| 15 | [H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning](https://arxiv.org/abs/2610.06805) | 2026 | arXiv | 最新 | 階層ごとに独自の潜在空間を持つ行動条件付き JEPA の end-to-end 学習。 | ↪ 既存：hierarchical p.11 |
| 16 | [Revisiting Feature Prediction for Learning Visual Representations from Video (V-JEPA)](https://arxiv.org/abs/2404.08471) | 2024 | arXiv | 発展 | I-JEPA を動画に拡張した表現予測。V-JEPA 2 の直接の前身。 | — 参照のみ（V-JEPA 2 に内容が包含されるため） |
| 17 | [Bootstrap your own latent (BYOL)](https://arxiv.org/abs/2006.07733) | 2020 | NeurIPS 2020 | 原典 | EMA ターゲットと predictor で負例なしの共同埋め込みを学ぶ。I-JEPA・V-JEPA の EMA の源流。 | — 参照のみ（VICReg スライドで比較対象として扱った） |
| 18 | [Barlow Twins: Self-Supervised Learning via Redundancy Reduction](https://arxiv.org/abs/2103.03230) | 2021 | ICML 2021 | 原典 | 2視点の相互相関行列を単位行列に近づける。VICReg の共分散項の出典。 | — 参照のみ（VICReg と重複） |
| 19 | [Joint Embedding Predictive Architectures Focus on Slow Features](https://arxiv.org/abs/2211.10831) | 2022 | NeurIPS 2022 SSL ワークショップ | 発展 | VICReg 型 JEPA は動画で遅く変わる特徴（背景など）に崩壊しうると指摘。PLDM の時間方向分散項の動機。 | — 参照のみ（短報、PLDM に吸収） |
| 20 | [Learning by Reconstruction Produces Uninformative Features For Perception](https://arxiv.org/abs/2402.11337) | 2024 | arXiv | 発展 | 再構成学習は知覚に不要な高分散成分に容量を使うと理論的に示す。JEPA 側の再構成批判の根拠。 | — 参照のみ（画像 SSL の理論で世界モデルではない） |
| 21 | [Mastering Diverse Domains through World Models (DreamerV3)](https://arxiv.org/abs/2301.04104) | 2023 | Nature 2025 | 原典 | 再構成型 RSSM 世界モデルの代表。DINO-WM・PLDM・Dreamer-CDP の比較対象。 | — 参照のみ（生成型の比較対象） |
| 22 | [MuDreamer: Learning Predictive World Models without Reconstruction](https://arxiv.org/abs/2405.15083) | 2024 | arXiv | 発展 | 行動・価値予測で Dreamer の再構成を置き換える。Crafter では Dreamer に劣る（Dreamer-CDP の比較）。 | — 参照のみ |
| 23 | [When Does LeJEPA Learn a World Model?](https://arxiv.org/abs/2605.26379) | 2026 | arXiv | 最新 | 定常・加法ノイズの遷移下で LeJEPA が潜在変数を線形に同定でき、それが成り立つ唯一の分布がガウスだと証明。 | — 参照のみ（アブストラクトのみ確認） |
| 24 | [Reconstruction or Semantics? What Makes a Latent Space Useful for Robotic World Models](https://arxiv.org/abs/2605.06388) | 2026 | arXiv | 最新 | 行動条件付き潜在拡散世界モデルの潜在空間として、再構成型（VAE・Cosmos）と意味型（V-JEPA 2.1 など）を比較。 | — 参照のみ（アブストラクトのみ確認、#10 と論点が重複） |
| 25 | [Sensorimotor World Models: Perception for Action via Inverse Dynamics](https://arxiv.org/abs/2606.20104) | 2026 | arXiv | 最新 | 逆動力学の正則化だけで崩壊を防ぎ、制御可能な自由度に寄せた潜在世界モデルを end-to-end 学習。 | — 参照のみ（アブストラクトのみ確認） |
| 26 | [A Generalization Theory for JEPA-Based World Models](https://arxiv.org/abs/2606.27014) | 2026 | arXiv | 最新 | JEPA 事前学習を行動条件付き共起行列の低ランク分解とみなし、計画の後悔に関する汎化境界を導出。 | — 参照のみ（アブストラクトのみ確認） |
| 27 | [Fast LeWorldModel](https://arxiv.org/abs/2606.26217) | 2026 | arXiv | 最新 | LeWM の派生研究。 | — 参照のみ（タイトルのみ確認） |
| 28 | [Temporally Centered SIGReg Improves LeWorldModel Representations for Robot Policy Learning](https://arxiv.org/abs/2607.26924) | 2026 | arXiv | 最新 | SIGReg を時間方向に中心化して LeWM の表現をロボット方策学習向けに改善する派生。 | — 参照のみ（タイトルのみ確認） |
| 29 | [The Evaluation Protocol Determines the Result: An Independent Reproduction of LeWorldModel on TwoRoom](https://arxiv.org/abs/2608.10145) | 2026 | arXiv | 最新 | LeWM の独立再現。公開設定にない4つの前処理慣行が結果を左右し、論文付録とリポジトリの評価条件の違いで公式重みが 14% と 84% に分かれると報告。 | — 参照のみ（アブストラクトのみ確認、LeWM スライドの所感で言及） |
| 30 | [No Gaussian Required: Contrastive Inverse Dynamics for JEPA World Models](https://arxiv.org/abs/2608.17542) | 2026 | arXiv | 最新 | SIGReg の代わりに、遷移がどの行動によるかを当てる Action-NCE で崩壊を防ぐ。平均で SIGReg と同等。 | — 参照のみ（アブストラクトのみ確認） |
| 31 | [The Planning Limits of Latent World Models](https://arxiv.org/abs/2609.39235) | 2026 | arXiv | 最新 | 5種の凍結エンコーダ上の予測器で、目標が想像軌道の範囲内（5〜10ステップ先）にあるときしか行動を正しく順位付けできず、完全な予測でも限界が残ると報告。 | — 参照のみ（PDF は取得したがアブストラクトのみ確認） |
| 32 | [Frozen in a Frame: The Velocity Blind Spot in JEPA World Models](https://arxiv.org/abs/2610.04585) | 2026 | arXiv | 最新 | 1フレームの埋め込みは速度を含みえず、公式 LeWM でも速度プローブがチャンス以下と指摘。姿勢と差分の運動コードに分ける TI-JEPA を提案。 | — 参照のみ（アブストラクトのみ確認） |
| 33 | [Preserving Unstable Modes Through Inverse Dynamics in JEPA World Models](https://arxiv.org/abs/2610.07540) | 2026 | arXiv | 最新 | 予測＋崩壊防止だけでは制御可能な不安定モードが潰れうると示し、行動再構成（逆動力学）損失で有限時間到達部分空間での単射性を保証。 | — 参照のみ（アブストラクトのみ確認） |
| 34 | [One-Step Prediction Fidelity Is a Poor Proxy for Planning Performance in JEPA World Models](https://arxiv.org/abs/2610.19375) | 2026 | NeurIPS 2026 ワークショップ | 最新 | 1ステップ予測誤差と計画成功率の相関は最初の1エポック以降ほぼ0（r = −0.010）と報告。 | — 参照のみ（アブストラクトのみ確認） |
| 35 | [VIScore: Diagnosing Planning-Relevant Quality in Latent World Models](https://arxiv.org/abs/2608.11174) | 2026 | arXiv | 最新 | 潜在世界モデルの計画に関わる品質を診断する指標の提案。 | — 参照のみ（タイトルのみ確認、next_themes で言及） |
| 36 | [When Low Prediction Error Misleads Planning: Diagnosing Representation, Dynamics, and Decision Failures in Latent World Models](https://arxiv.org/abs/2610.05550) | 2026 | arXiv | 最新 | 予測誤差の大半を占める成分と、直すと行動選択が最も良くなる成分が一致しないことを、LeWM を含む4系統・4タスクで示す。 | — 参照のみ（アブストラクトのみ確認） |
| 37 | [Flow-JEPA: Robust Latent Dynamics for JEPA World Models via Flow Matching](https://arxiv.org/abs/2608.29029) | 2026 | arXiv | 最新 | LeWM を土台に、潜在ダイナミクスを flow matching で表して計画の頑健性を高める。 | — 参照のみ（検索結果の概要のみ確認） |
| 38 | [AVL-JEPA: Preventing Causal Dynamics Information Collapse In Joint Embedding Predictive Architecture World Models](https://arxiv.org/abs/2610.03587) | 2026 | arXiv | 最新 | JEPA 世界モデルで因果的なダイナミクス情報が潰れる問題への対策。 | — 参照のみ（タイトルのみ確認） |
