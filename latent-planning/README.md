## 潜在空間での計画と分布外への逸脱（latent-planning/）

### 調査履歴
- 2026-10-23: arXiv API で "latent planning"、"world model" × "gradient-based planning" / "MPPI" / "cross-entropy method" / "model exploitation" / "out-of-distribution" / "amortized"、"TD-MPC" を新着順に検索し、2025〜2026年の動向を把握した。最新動向は (a) 勾配計画の再興（AWM → GRASP、Dream-MPC）、(b) モデル悪用の理論化（Exploitable WM）、(c) LeWM 上で計画を償却化する手法（LeFlow、LePlanner、GC-IDM、HIJP）、(d) 潜在距離コストと表現の診断（Objective is the Bottleneck、Latent Projection、ATM ほか）の4つに分かれる。
- そこから3つの系譜を原典まで遡った。(1) 学習モデル上の標本ベース計画：PETS → PlaNet → TD-MPC → Dream-MPC。(2) モデル誤差の悪用と分布外への逸脱の抑制：DAE-Reg → AWM → Exploitable WM。(3) 生成モデルを計画器にする流れ：Diffuser → LeFlow。いずれも全文を読んでスライド化した。
- JEPA 系世界モデルそのもの（LeWM, DINO-WM, PLDM, V-JEPA 2）は jepa テーマが扱うため、ここでは「その上でどう計画するか」に絞った。表現学習側の計画改善（Temporal Straightening など）は参照のみとした。
- 採録先は arXiv のコメント欄、本文の脚注、検索結果で確認した。AWM は arXiv に採録の注記がなく、NeurIPS 2026 公式サイトに掲載されていることを検索で確認した（neurips.cc には直接アクセスできなかった）。

### 系譜
```
[標本ベース計画と償却化]
PETS (2018, 確率的アンサンブル + CEM-MPC)
  └→ PlaNet (2019, 潜在空間 RSSM 上の CEM)
        └→ TD-MPC (2022, 潜在 MPPI + 終端価値 + 方策による提案)
              ├→ TD-MPC2 (2023) → BMPC (2025)                     ※参照のみ
              └→ Dream-MPC (2026, 方策で初期化した勾配 MPC + Q 不確実性罰則)

[モデル誤差の悪用と分布外逸脱の抑制]
PETS (2018, 暗黙の頑健性)  ─┐
DAE-Reg (2019, データ密度による軌道正則化) ─┬→ MOPO / MOReL (2020, オフライン RL の不確実性罰則)  ※参照のみ
                                          ├→ Grad-MPC (2023) ─→ AWM (2025, 敵対的学習で勾配計画を頑健化) → GRASP (2026, 仮想状態の並列勾配計画)
                                          └→ Exploitable WM (2026, 順序の逆転としての悪用の理論・安全地平線)
                                              （既存 hierarchical：Hi-LeWM は上位 CEM の分布外探索を失敗要因として分析）

[生成モデルによる計画・償却化]
Diffuser (2022, 軌道拡散 = 計画) → Decision Diffuser (2023)  ※参照のみ
  └→ LeFlow (2026, 凍結 LeWM の潜在軌道を rectified flow で生成し、ロールアウトで検証)
       ├ LePlanner (2026, 反復型の償却化コントローラ + 行動支持罰則)       ※参照のみ
       └ GC-IDM (2026) / HIJP (2026, 逆動力学による探索不要の計画)          ※参照のみ
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Deep Reinforcement Learning in a Handful of Trials using Probabilistic Dynamics Models (PETS)](https://arxiv.org/abs/1805.12114) | 2018 | NeurIPS | 原典 | 確率的 NN のアンサンブルと軌道サンプリングで不確実性を伝播し、CEM-MPC で計画する。model-free の漸近性能に少ない試行数で到達。 | ✅ p.2 |
| 2 | [Learning Latent Dynamics for Planning from Pixels (PlaNet)](https://arxiv.org/abs/1811.04551) | 2019 | ICML | 原典 | 画素から RSSM を学び、潜在空間だけで CEM-MPC を行う。DMC 6課題で D4PG の約1/200 のエピソード数。 | ✅ p.3 |
| 3 | [Regularizing Trajectory Optimization with Denoising Autoencoders](https://arxiv.org/abs/1903.11981) | 2019 | NeurIPS | 原典 | 計画は「自分のモデルへの敵対的攻撃」だと指摘し、DAE で軌道をデータ分布内に正則化する。勾配計画（Adam）の破綻を防ぐ。 | ✅ p.4 |
| 4 | [Temporal Difference Learning for Model Predictive Control (TD-MPC)](https://arxiv.org/abs/2203.04955) | 2022 | ICML | 発展 | 課題指向の潜在モデル TOLD 上で、短い地平線の MPPI と TD 学習した終端価値・方策による提案を組み合わせる。Dog・Humanoid を解く。 | ✅ p.5 |
| 5 | [Planning with Diffusion for Flexible Behavior Synthesis (Diffuser)](https://arxiv.org/abs/2205.09991) | 2022 | ICML | 原典 | 軌道全体の拡散モデルで、ガイダンスとインペインティングにより計画する。Maze2D で IQL・MPPI を大差で上回る。 | ✅ p.6 |
| 6 | [Closing the Train-Test Gap in World Models for Gradient-Based Planning (AWM)](https://arxiv.org/abs/2512.09929) | 2025 | NeurIPS 2026 | 最新 | 勾配計画がモデル誤差を突くずれを分析。FGSM による敵対的学習で損失地形を平滑化し、勾配計画を CEM 並みの精度・1/10 の時間にする。 | ✅ p.7 |
| 7 | [Parallel Stochastic Gradient-Based Planning for World Models (GRASP)](https://arxiv.org/abs/2602.00475) | 2026 | ICML | 最新 | 仮想状態を力学罰則つきで並列最適化し、状態雑音と状態勾配の遮断で長地平線の視覚計画を安定化する。成功判定は世界モデル上。 | ✅ p.8 |
| 8 | [Dream-MPC: Gradient-Based Model Predictive Control with Latent Imagination](https://arxiv.org/abs/2605.04568) | 2026 | ICML | 最新 | 方策で初期化した少数の行動列を勾配で磨く MPC。Q アンサンブルの不確実性罰則と解の再利用を加え、BMPC 比 IQM +26.7%。 | ✅ p.9 |
| 9 | [Imperfect World Models are Exploitable](https://arxiv.org/abs/2605.15960) | 2026 | arXiv | 最新 | モデル悪用を方策順序の逆転として定義し、豊かな方策集合では避けられないことを証明。ε-悪用に対する安全地平線を閉形式で導出。 | ✅ p.10 |
| 10 | [LeFlow: Generative Latent Flow Planning for World Models](https://arxiv.org/abs/2608.24855) | 2026 | arXiv | 最新 | 凍結 LeWM の潜在軌道を rectified flow で生成し、逆動力学で行動に戻してロールアウトで検証する。CEM より4.5〜14倍速く、成功率も高い。 | ✅ p.11 |
| 11 | [Gradient-based Planning with World Models (Grad-MPC)](https://arxiv.org/abs/2312.17227) | 2023 | arXiv | 発展 | PlaNet/Dreamer 上で CEM を勾配降下に置き換え、方策初期化版も提案。全文を読んだが実験が小規模で、AWM・Dream-MPC の比較対象として扱った。 | — 参照のみ（小規模な予備的研究のため） |
| 12 | [LePlanner: An Iterative Amortized Controller For World Models](https://arxiv.org/abs/2609.13845) | 2026 | arXiv | 最新 | 凍結 LeWM を通じて行動計画を反復修正する償却化コントローラ。arrival-and-hold 損失と、データの行動支持外を罰する GMM 罰則を使う。全文を読んだ。 | — 参照のみ（PushT 成功率が要旨 98%・本文 94% で不一致。LeFlow と同系統） |
| 13 | [Latent Geometry Beyond Search: Amortizing Planning in World Models (GC-IDM)](https://arxiv.org/abs/2605.08732) | 2026 | arXiv | 最新 | LeWM 上でゴール条件付き逆動力学モデルに計画を償却化し、CEM 並みの成功率を 100〜130 倍低コストで出す（要旨に基づく）。 | — 参照のみ（要旨のみ） |
| 14 | [Beyond Action Prediction: Learning Search-Free Planning in Latent Space (HIJP)](https://arxiv.org/abs/2610.23615) | 2026 | arXiv | 最新 | ハインドサイトでゴールを付け替えた逆 JEPA で、探索なしに多段の行動列を生成する（要旨に基づく）。 | — 参照のみ（要旨のみ） |
| 15 | [Temporal Straightening for Latent Planning](https://arxiv.org/abs/2603.12231) | 2026 | ICML | 最新 | 潜在軌道の曲率を正則化して、潜在のユークリッド距離を測地距離に近づけ、勾配計画を安定させる（要旨に基づく）。 | — 参照のみ（表現学習側のため jepa テーマ寄り） |
| 16 | [The Objective Is the Bottleneck: Latent World Models Encode What Their Planners Cannot Use](https://arxiv.org/abs/2608.12959) | 2026 | arXiv | 最新 | LeWM の長地平線での失敗は予測器ではなく潜在二乗距離コストが原因だと示し、到達可能性ヘッドに置き換えて改善する（要旨に基づく）。 | — 参照のみ（要旨のみ） |
| 17 | [Latent Projection for Latent Planning](https://arxiv.org/abs/2610.26979) | 2026 | CoRL 2026 ワークショップ | 最新 | SIGReg のガウス性からガウス・マルコフ遷移を当てはめ、不確実性の小さい部分空間に計画コストを制限する（要旨に基づく）。 | — 参照のみ（要旨のみ） |
| 18 | [ATM: Why Latent World Models Can Fail to Plan](https://arxiv.org/abs/2606.09028) | 2026 | arXiv | 最新 | 予測遷移からの行動識別性（逆リスク）が、予測損失よりも計画性能をよく説明すると示す（要旨に基づく）。 | — 参照のみ（要旨のみ） |
| 19 | [When Low Prediction Error Misleads Planning](https://arxiv.org/abs/2610.05550) | 2026 | arXiv | 最新 | 予測誤差の大部分を占める成分と、行動選択を改善する成分が一致しないことを分解して示す（要旨に基づく）。 | — 参照のみ（要旨のみ） |
| 20 | [In CEM, a World Model Is Also a Proposal Mechanism](https://arxiv.org/abs/2610.00921) | 2026 | arXiv | 最新 | CEM で世界モデルが「選択」と「次の提案分布」の両方に効くことを分離評価した（要旨に基づく）。 | — 参照のみ（要旨のみ） |
| 21 | [TD-MPC2: Scalable, Robust World Models for Continuous Control](https://arxiv.org/abs/2310.16828) | 2023 | ICLR 2024 | 発展 | TD-MPC を大規模・多課題に拡張した後継。Dream-MPC の土台。 | — 参照のみ（Dream-MPC 経由） |
| 22 | [Bootstrapped Model Predictive Control (BMPC)](https://arxiv.org/abs/2503.18871) | 2025 | arXiv | 発展 | MPC 専門家を模倣して方策を学び、その方策で MPC を導く TD-MPC2 の拡張。Dream-MPC の土台。 | — 参照のみ（Dream-MPC 経由） |
| 23 | [MOPO: Model-based Offline Policy Optimization](https://arxiv.org/abs/2005.13239) | 2020 | NeurIPS | 発展 | モデルの不確実性を報酬から引く保守的なオフライン MBRL。 | — 参照のみ（方策学習が主体のため。本文未読） |
| 24 | [MOReL: Model-Based Offline Reinforcement Learning](https://arxiv.org/abs/2005.05951) | 2020 | NeurIPS | 発展 | 高不確実な遷移を吸収状態にした悲観的 MDP を作るオフライン MBRL。 | — 参照のみ（方策学習が主体のため。本文未読） |
| 25 | [Model-Based Reinforcement Learning via Latent-Space Collocation (LatCo)](https://arxiv.org/abs/2106.13229) | 2021 | ICML | 発展 | 潜在状態を最適化変数とするコロケーション計画。GRASP の比較対象。 | — 参照のみ（GRASP 経由） |
| 26 | [Is Conditional Generative Modeling all you need for Decision-Making? (Decision Diffuser)](https://arxiv.org/abs/2211.15657) | 2022 | ICLR 2023 | 発展 | 状態軌道を拡散で生成し、逆動力学で行動に戻す。LeFlow の先行研究。 | — 参照のみ（LeFlow 経由） |
| 27 | [Defining and Characterizing Reward Hacking](https://arxiv.org/abs/2209.13085) | 2022 | NeurIPS | 発展 | 報酬ハッキングを価値順序の逆転として定義した理論。Exploitable WM の出発点。 | — 参照のみ（Exploitable WM 経由） |
| 28 | [DINO-WM: World Models on Pre-trained Visual Features enable Zero-shot Planning](https://arxiv.org/abs/2411.04983) | 2024 | ICML 2025 | 発展 | 凍結 DINOv2 特徴上の世界モデルと CEM による計画。AWM・GRASP の土台。 | — 参照のみ（jepa テーマで扱う） |
| 29 | Mind the Gap: Promises and Pitfalls of Hierarchical Planning in LeWorldModel (Hi-LeWM) | 2026 | WM@Booth ワークショップ | 最新 | 上位 CEM の分布外探索が失敗要因で、データ由来のマクロ行動に制約すると改善する。 | ↪ 既存：hierarchical p.9 |
| 30 | Deep Hierarchical Planning from Pixels (Director) | 2022 | NeurIPS | 原典 | 世界モデルの潜在空間でのサブゴール計画。 | ↪ 既存：hierarchical p.3 |
| 31 | Hierarchical World Models as Visual Whole-Body Humanoid Controllers (Puppeteer) | 2024 | ICLR 2025 | 発展 | TD-MPC2 を2階層にした階層世界モデル。 | ↪ 既存：hierarchical p.7 |
| 32 | Planning to Explore via Self-Supervised World Models (Plan2Explore) | 2020 | ICML | 発展 | アンサンブルの不一致を内発的報酬にして、世界モデル上で探索を計画する。 | ↪ 既存：intrinsic-reward p.5 |
