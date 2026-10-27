## 確率的・多峰な未来を扱う潜在世界モデル（stochastic-latent/）

### 調査履歴
- 2026-10-24: 第3回調査（jepa テーマの推奨テーマ3）。arXiv API で "world model" AND (stochastic / multimodal / "latent diffusion" / "flow matching" / "latent variable")、JEPA AND stochastic などを新着順に検索した。2026年に増えている確率的な JEPA・特徴空間の生成モデル（FlowWM、JEDI、Branch-JEPA、Flow-JEPA、MDN-VJEPA など）と、生成型の動画世界モデルの確率の較正を問う評価（CaliBench、PAWBench）から現在地を把握した。
- そこから、(a) 確率的潜在変数による動画予測（SV2P → SVG → PlaNet の RSSM）、(b) 離散潜在・トークン化（DreamerV2 → VQM → IRIS → Δ-IRIS/STORM）、(c) 拡散・flow matching の世界モデル（DIAMOND → NWM → JEDI/FlowWM）、(d) 不確実性を使った計画（VQM の偶然ノード → Stochastic MuZero、NWM のサンプル平均評価）の4つの系譜を遡った。軸は「生成型（画素・VAE 潜在を生成）か、非生成型（JEPA・凍結特徴の予測）か」。
- 本文は arXiv 版で全文を読んだ（付録は必要な箇所のみ）。Stochastic MuZero は OpenReview がチャレンジ認証（403）で取得できず、本文未確認。DIAMOND は指示により対象外（潜在空間版を優先）とし、参照のみ。既存テーマでスライド化済みの PlaNet・PETS・Diffuser・LeFlow・DINO-WM・V-JEPA 2・LeWM・Dreamer 4 などは再掲していない。

### 系譜
```
[確率的潜在変数（変分推論）]
Finn+ 2016 CDNA（決定論・MSE → 平均化してぼやける）
   └→ SV2P (2017, 動画全体の潜在 z・3段階学習)
          └→ SVG (2018, 時刻ごとの z_t と学習事前分布)
                 └→ PlaNet RSSM (2019, 既存：latent-planning) → Dreamer 系
                        └→ DreamerV2 (2021, ガウス → 32×32 カテゴリカル潜在, KL バランシング)

[離散符号・トークン化 ＋ 自己回帰]
VQ-VAE (2017) ─┬→ VQM (2021, 環境の応答を離散符号にし MCTS で分岐) → Stochastic MuZero (2022, ※本文未確認)
               └→ IRIS (2023, 16 トークン/フレーム ＋ GPT 型 Transformer)
                      ├→ STORM (2023), TWM, Δ-IRIS (2024)
                      └→ Orbis (2025, 離散トークン vs flow matching の比較)

[拡散・flow matching（生成型）]
DIAMOND (2024, 画素拡散) ─→ NWM (2024/CVPR 2025, SD-VAE 潜在の CDiT, CEM 計画)
                         ─→ JEDI (2026, JEPA 型の潜在をノイズ除去損失で end-to-end 学習)
Frozen Forecasting / Walker+ (2025, 凍結特徴上の潜在拡散) ─→ FlowWM (2026, DINOv3 特徴上の flow matching)

[非生成型（JEPA）の確率化]
LeCun 2022 / 潜在変数 EBM（既存：hierarchical）─→ DINO-WM・V-JEPA 2・LeWM（既存：jepa, いずれも決定論的）
   ├→ VJEPA / MDN-VJEPA (2026, 変分・混合密度)
   ├→ Branch-JEPA (2026, K 個の重みつき後続状態, エネルギースコア)
   ├→ Flow-JEPA (2026, LeWM の予測器を flow matching に)
   └→ UWM-JEPA (2026, 密度行列による信念の保持)

[評価：確率は正しいか]
SV2P/SVG の best-of-N 評価 → Quantifying Multimodality (2021) → CaliBench (2026, 解析解のある場面で較正を検定), PAWBench (2026)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Stochastic Variational Video Prediction (SV2P)](https://arxiv.org/abs/1710.11252) | 2017 | ICLR 2018 | 原典 | 動画予測に潜在変数を入れ、サンプルごとに異なる未来を出す。決定論モデルの平均化を実データで示した | ✅ p.2 |
| 2 | [Stochastic Video Generation with a Learned Prior (SVG)](https://arxiv.org/abs/1802.07687) | 2018 | ICML 2018 | 発展 | 時刻ごとの潜在変数と学習事前分布。衝突時だけ分散が立ち上がる。RSSM の原型 | ✅ p.3 |
| 3 | [Mastering Atari with Discrete World Models (DreamerV2)](https://arxiv.org/abs/2010.02193) | 2020 | ICLR 2021 | 発展 | RSSM の確率的状態を 32×32 カテゴリカルにし、Atari 55 で人間並み。離散潜在の効果をアブレーション | ✅ p.4 |
| 4 | [Vector Quantized Models for Planning (VQM)](https://arxiv.org/abs/2106.04615) | 2021 | ICML 2021 | 発展 | 環境の応答を VQ 符号にし、MCTS で行動と符号の両方を分岐させる。1人チェスで MuZero の崩壊を回復 | ✅ p.5 |
| 5 | [Transformers are Sample-Efficient World Models (IRIS)](https://arxiv.org/abs/2209.00588) | 2022 | ICLR 2023 | 発展 | 離散トークン＋自己回帰 Transformer の世界モデル。Atari 100k 平均 1.046、多様な未来を生成 | ✅ p.6 |
| 6 | [Navigation World Models (NWM)](https://arxiv.org/abs/2412.03572) | 2024 | CVPR 2025 | 発展 | SD-VAE 潜在の条件付き拡散 Transformer で航行の未来を生成し、CEM で計画。ATE 1.13（NoMaD 1.93） | ✅ p.7 |
| 7 | [JEDI: Joint Embedding Diffusion World Model for Online Model-Based Reinforcement Learning](https://arxiv.org/abs/2605.13013) | 2026 | arXiv | 最新 | JEPA 型の潜在をノイズ除去損失だけで end-to-end 学習する潜在拡散世界モデル。Atari 100k IQM 0.688 | ✅ p.8 |
| 8 | [Flow Matching in Feature Space for Stochastic World Modeling (FlowWM)](https://arxiv.org/abs/2606.29059) | 2026 | arXiv | 最新 | 凍結 DINOv3 特徴上の flow matching。決定論予測が平均に潰れることを証明し、Waymo の将来知覚で上回る | ✅ p.9 |
| 9 | [Branch-JEPA: Finite-Support Predictive Distributions for JEPA World Models](https://arxiv.org/abs/2607.05238) | 2026 | arXiv | 最新 | JEPA の点予測を K 個の重みつき後続状態に置き換え、エネルギースコアで学習。AV2・OGBench で検証 | ✅ p.10 |
| 10 | [CaliBench: Are the Stochastic Dynamics of Video World Models Physically Calibrated?](https://arxiv.org/abs/2608.16829) | 2026 | TMLR 2026 | 最新 | 解析解のある9場面で動画世界モデルの結果分布の較正を検定。主要6モデルの多くが過集中・モード崩壊 | ✅ p.11 |
| 11 | [Learning Latent Dynamics for Planning from Pixels (PlaNet)](https://arxiv.org/abs/1811.04551) | 2019 | ICML | 原典 | RSSM（決定論部＋確率的状態）の原典。SVG と DreamerV2 をつなぐ | ↪ 既存：world-model/latent-planning p.3 |
| 12 | [Deep Reinforcement Learning in a Handful of Trials using Probabilistic Dynamics Models (PETS)](https://arxiv.org/abs/1805.12114) | 2018 | NeurIPS | 原典 | 確率的アンサンブルで偶然・認識の不確実性を分けて計画に使う | ↪ 既存：world-model/latent-planning p.2 |
| 13 | [Planning with Diffusion for Flexible Behavior Synthesis (Diffuser)](https://arxiv.org/abs/2205.09991) | 2022 | ICML | 原典 | 軌道全体の拡散による計画 | ↪ 既存：world-model/latent-planning p.6 |
| 14 | [LeFlow: Generative Latent Flow Planning for World Models](https://arxiv.org/abs/2608.24855) | 2026 | arXiv | 最新 | 潜在空間の flow による計画 | ↪ 既存：world-model/latent-planning p.11 |
| 15 | [DINO-WM: World Models on Pre-trained Visual Features enable Zero-shot Planning](https://arxiv.org/abs/2411.04983) | 2024 | ICML 2025 | 発展 | 凍結 DINOv2 特徴上の決定論的予測器。FlowWM の比較対象 | ↪ 既存：world-model/jepa p.4 |
| 16 | [V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://arxiv.org/abs/2506.09985) | 2025 | arXiv | 発展 | 決定論的な JEPA 予測器による計画 | ↪ 既存：world-model/jepa p.6 |
| 17 | [LeWorldModel: Stable End-to-End Joint-Embedding Predictive Architecture from Pixels](https://arxiv.org/abs/2603.19312) | 2026 | arXiv | 最新 | SIGReg による end-to-end JEPA 世界モデル。Flow-JEPA の土台 | ↪ 既存：world-model/jepa p.10 |
| 18 | [What Drives Success in Physical Planning with Joint-Embedding Predictive World Models? (JEPA-WMs)](https://arxiv.org/abs/2512.24497) | 2025 | TMLR 2026 | 最新 | 決定論的予測器は未来の平均しか学べないと限界に挙げた（本テーマの起点） | ↪ 既存：world-model/jepa p.8 |
| 19 | [Dreamer-CDP: Improving Reconstruction-free World Models Via Continuous Deterministic Representation Prediction](https://arxiv.org/abs/2603.07083) | 2026 | ICLR 2026 WS | 最新 | Dreamer の再構成を JEPA 型予測に置き換えた | ↪ 既存：world-model/jepa p.9 |
| 20 | [Introduction to Latent Variable Energy-Based Models (Dawid & LeCun)](https://arxiv.org/abs/2306.02572) | 2023 | J. Stat. Mech. 2024 | 原典 | 潜在変数 EBM で多峰な予測を扱う構想 | ↪ 既存：world-model/hierarchical p.4 |
| 21 | [Training Agents Inside of Scalable World Models (Dreamer 4)](https://arxiv.org/abs/2509.24527) | 2025 | arXiv | 最新 | 潜在空間の shortcut forcing による生成型世界モデル | ↪ 既存：world-model/foundation-world-model p.7 |
| 22 | [Hallucination in World Models is Predictable and Preventable](https://arxiv.org/abs/2606.27326) | 2026 | arXiv | 最新 | 生成型世界モデルの幻覚の評価 | ↪ 既存：world-model/foundation-world-model p.10 |
| 23 | Planning in Stochastic Environments with a Learned Model (Stochastic MuZero) ([OpenReview](https://openreview.net/forum?id=X6D9bAHhBQ1)) | 2022 | ICLR 2022 | 発展 | Antonoglou, Schrittwieser, Ozair, Hubert, Silver。afterstate と偶然ノードの VQ 符号で MuZero を確率的環境へ広げ、2048・バックギャモンで SOTA 相当、囲碁は MuZero 並み（検索情報に基づく） | ⚠️ 本文未確認（OpenReview が 403） |
| 24 | A Path Towards Autonomous Machine Intelligence (LeCun) ([OpenReview](https://openreview.net/forum?id=BZ5a1r-kVsf)) | 2022 | ポジションペーパー | 原典 | JEPA と潜在変数による多峰な予測の構想 | ⚠️ 本文未確認 |
| 25 | [Diffusion for World Modeling: Visual Details Matter in Atari (DIAMOND)](https://arxiv.org/abs/2405.12399) | 2024 | NeurIPS | 発展 | 画素空間の拡散世界モデル。NWM・JEDI の比較対象 | — 参照のみ（指示により潜在空間版を優先） |
| 26 | [Decoupled Drift-Diffusion World Models for Consistent Future Frame Prediction (D3WM)](https://arxiv.org/abs/2610.19212) | 2026 | arXiv | 最新 | ガウス NLL で決定論的な平均と空間的な不確実性マップを回帰し、不確実な領域だけ拡散で生成する。Push-T・BridgeData V2・DL3DV で検証。本文1〜4章を読んだ | — 参照のみ（VAE 潜在の画像生成寄りで、枠の都合） |
| 27 | [Flow-JEPA: Robust Latent Dynamics for JEPA World Models via Flow Matching](https://arxiv.org/abs/2608.29029) | 2026 | arXiv | 最新 | LeWM の点予測を軌道全体の条件付き flow matching に替え、成功率 86→92%、ノイズ下 67→86%（抄録） | — 参照のみ（抄録のみ確認） |
| 28 | [Reconstruction or Semantics? What Makes a Latent Space Useful for Robotic World Models](https://arxiv.org/abs/2605.06388) | 2026 | arXiv | 最新 | 行動条件付き潜在拡散世界モデルの潜在として、再構成型 VAE と意味型エンコーダ6種を比較（抄録） | — 参照のみ（抄録のみ確認） |
| 29 | [Frozen Forecasting: A Unified Evaluation (Walker+)](https://arxiv.org/abs/2507.13942) | 2025 | arXiv | 発展 | 凍結した視覚表現の上で潜在拡散により未来の特徴を予測し、分布的な指標で評価。FlowWM の直接の先行研究（抄録と FlowWM の記述） | — 参照のみ |
| 30 | [MDN-VJEPA: Multimodal Probabilistic Joint-Embedding World Models](https://arxiv.org/abs/2610.13956) | 2026 | arXiv | 最新 | JEPA の予測器を混合密度ネットにし、平均ではなく多峰な信念全体で計画すると決定が変わると示す（抄録） | — 参照のみ（単著 69 頁、抄録のみ） |
| 31 | [VJEPA: Variational Joint Embedding Predictive Architectures as Probabilistic World Models](https://arxiv.org/abs/2601.14354) | 2026 | arXiv（ICML 2026 と Branch-JEPA が引用） | 最新 | JEPA の変分化。予測状態表現・ベイズフィルタとの統一を主張（抄録） | — 参照のみ |
| 32 | [UWM-JEPA: Predictive World Models That Imagine in Belief Space](https://arxiv.org/abs/2605.25313) | 2026 | arXiv | 最新 | 密度行列の潜在とユニタリ予測器で、ブラインドロールアウト中も不確実性を保つ（抄録） | — 参照のみ |
| 33 | [STORM: Efficient Stochastic Transformer based World Models for Reinforcement Learning](https://arxiv.org/abs/2310.09615) | 2023 | NeurIPS 2023 | 発展 | カテゴリカル確率潜在＋Transformer の Atari 100k 世界モデル（抄録） | — 参照のみ |
| 34 | [Efficient World Models with Context-Aware Tokenization (Δ-IRIS)](https://arxiv.org/abs/2406.19320) | 2024 | ICML 2024 | 発展 | 時刻間の確率的な差分だけを離散符号化し、IRIS を効率化（抄録） | — 参照のみ |
| 35 | [Orbis: Overcoming Challenges of Long-Horizon Prediction in Driving World Models](https://arxiv.org/abs/2507.13162) | 2025 | arXiv | 発展 | 離散トークンと flow matching の連続モデルを同じトークナイザで比較（抄録）。後継 Orbis 2 は既存：world-model/hierarchical | — 参照のみ |
| 36 | [PAWBench: How Far Are We from Probabilistically Aligned World Modeling?](https://arxiv.org/abs/2608.27345) | 2026 | arXiv | 最新 | 50 場面・11 モデルで、繰り返し生成が正しい行動分布を再現するか（確率的整合）を評価（抄録） | — 参照のみ（CaliBench で代表） |
| 37 | [World Models That Know When They Don't Know (C3)](https://arxiv.org/abs/2512.05927) | 2025 | arXiv | 最新 | 適正スコアリング規則で潜在空間の不確実性を較正し、画素単位の不確実性マップを出す（抄録） | — 参照のみ |
| 38 | [Quantifying Multimodality in World Models](https://arxiv.org/abs/2112.07263) | 2021 | arXiv | 発展 | 世界モデルの多峰な不確実性を検出・定量化する指標の提案（抄録） | — 参照のみ |
| 39 | [Mastering Diverse Domains through World Models (DreamerV3)](https://arxiv.org/abs/2301.04104) | 2023 | Nature 2025 | 発展 | DreamerV2 の後継。JEDI が確率的フレームスキップ Atari で比較 | — 参照のみ |
| 40 | [Mastering Atari, Go, Chess and Shogi by Planning with a Learned Model (MuZero)](https://arxiv.org/abs/1911.08265) | 2019 | Nature 2020 | 原典 | 決定論的な学習モデルによる MCTS。VQM・Stochastic MuZero の出発点 | — 参照のみ |
| 41 | [Model-Based Reinforcement Learning for Atari (SimPLe)](https://arxiv.org/abs/1903.00374) | 2019 | ICLR 2020 | 発展 | 離散潜在つきの画素予測モデルで PPO を学習 | — 参照のみ |
| 42 | Var-JEPA: A Variational Formulation of the Joint-Embedding Predictive Architecture (Gögl & Yau) | 2026 | ICML 2026 | 最新 | Branch-JEPA の関連研究に挙がる JEPA の変分定式化（引用情報のみ） | — 参照のみ（本文未取得） |
