## 動画からの潜在行動学習と世界モデル内の方策学習（latent-action/）

### 調査履歴
- 2026-10-24: 第3回調査。foundation-world-model と latent-planning の推奨テーマ（潜在行動学習、基盤世界モデル内での方策の後学習と報酬ハッキング、オフライン MBRL の保守性）をまとめて1テーマとした。arXiv API で "latent action" × video / actionless / unlabeled（2025〜2026年で約90件）、"world model" × "reinforcement learning" × VLA、"world model" × "reward hacking"、offline × model-based × pessimism/conservative を新着順に検索した。
- 最新動向は4つに分かれる。(a) 潜在行動の汚染（distractor）と、その理論・対策（LAOM、What Do LAMs Actually Learn?、Why Latent Actions Fail、MaskLAM）。(b) 自然動画への拡大と大規模比較（In-the-Wild LAM、What Matters、OneLA、SkeLAM）。(c) 動画世界モデルの中で VLA を GRPO で学習する流れ（WMPO → WoVR → HaWMPO / WoVR+ / DRILL）。(d) モデル悪用の修復（RENEW）。
- 系譜は、潜在行動側を LAOM・LAPA が引く LAPO → ILPO まで遡った。方策学習側は、WMPO・HaWMPO・RENEW が共通に引く MOPO / MOReL（不確実性罰則によるオフライン MBRL）まで遡った。両者が合流する例として LAWM（潜在行動世界モデル内のオフライン RL）を加えた。
- 既存デッキとの重複を避けるため、Genie・GameNGen・Dreamer 4・Ctrl-World・PlayWorld・Hallucination in WMs（foundation-world-model）、Exploitable WM・AWM（latent-planning）、V-JEPA 2（jepa）は再掲しなかった。
- 本文はすべて arXiv 版で読んだ。ILPO・MOPO・WMPO・LAOM の図は PDF から切り出し、その他は arXiv HTML 版の図を使った。採録先は arXiv のコメント、PDF のヘッダ・脚注、検索結果（WMPO：ICLR 2026、In-the-Wild LAM：ICML 2026 / PMLR 306）で確認した。

### 系譜
```
[潜在行動学習：行動ラベルのない動画から「行動」を取り出す]
ILPO (2019, 離散潜在行動 + 少数の環境操作で実行動に対応付け)
  └→ LAPO (2024, IDM-FDM の予測整合 + VQ ボトルネック、Procgen)
        ├→ Genie (2024, 潜在行動で操作できる基盤世界モデル)              ［既存：foundation-world-model］
        ├→ LAPA (2025, 潜在行動で 7B VLA を事前学習 → 実行動ヘッドを微調整)
        │     └→ UniVLA / CoMo / LAOF (2025)                              ※参照のみ
        ├→ LAOM (2025, distractor で LAPO が壊れる → 潜在空間予測 + 少数ラベル監督)
        │     ├→ What Do LAMs Actually Learn? (2025) → Why Latent Actions Fail (2026)   ※理論、参照のみ
        │     └→ MaskLAM (2026, エージェント領域だけ再構成)                ※参照のみ
        ├→ In-the-Wild LAM (2026, 自然動画 + V-JEPA 2 表現、連続潜在、コントローラで計画)
        │     └→ OneLA / SkeLAM (2026, 共通潜在行動空間・骨格で実行動に接地)  ※参照のみ
        └→ What Matters (2026, 41 設計の大規模比較：LAPO は依然強い、d_z=32)

[世界モデル内での方策学習と保守性]
MBPO (2019) ─→ MOPO (2020, 報酬 − λ·不確実性) / MOReL (2020, 不確実領域を吸収状態に)
                 ├→ C-LAP (2024) ─→ LAWM (2025, 潜在行動世界モデル内のオフライン RL)  ← LAPO と合流
                 ├→ Exploitable WM (2026, 悪用の理論)                       ［既存：latent-planning］
                 │     └→ RENEW (2026, 物理的妥当性の選好でモデルを修復)
                 └→（動画世界モデル × VLA）
                       Ctrl-World (2025) / PlayWorld (2026)                 ［既存：foundation-world-model］
                       WMPO (2025, 画素の動画世界モデル内で GRPO、結果ベース報酬)
                         ├→ WoVR (2026, キーフレーム初期化 + 共進化で幻覚を抑制)  ※参照のみ
                         │     └→ WoVR+ (2026)                                  ※参照のみ
                         ├→ HaWMPO (2026, 幻覚スコアで報酬を割り引く = MOPO 型罰則の動画版)
                         └→ DRILL (2026, 方策改善に効くよう世界モデルを二段階最適化)  ※参照のみ
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Imitating Latent Policies from Observation (ILPO)](https://arxiv.org/abs/1805.07914) | 2019 | ICML | 原典 | 状態系列だけから離散潜在行動と潜在方策を学び、少数の環境操作で実行動に対応付ける。CartPole・Acrobot で100ステップ未満の操作で専門家並み | ✅ p.2 |
| 2 | [MOPO: Model-based Offline Policy Optimization](https://arxiv.org/abs/2005.13239) | 2020 | NeurIPS | 原典 | 学習モデルの不確実性を報酬から引く保守的なオフライン MBRL。真の収益の下界を最大化し、データ外への汎化課題でバッチ内最大を超える | ✅ p.3 |
| 3 | [Learning to Act without Actions (LAPO)](https://arxiv.org/abs/2312.10812) | 2024 | ICLR | 発展 | IDM と FDM の予測整合と VQ ボトルネックで、動画だけから潜在行動を学ぶ。Procgen 16ゲームで真の行動構造を再現し、4M ステップで専門家性能を回復 | ✅ p.4 |
| 4 | [Latent Action Pretraining from Videos (LAPA)](https://arxiv.org/abs/2410.11758) | 2025 | ICLR | 発展 | 動画の離散潜在行動で 7B VLA を事前学習し、少量の軌跡で実行動ヘッドを微調整する。実機で OpenVLA を上回り、人の動画だけでも有効 | ✅ p.5 |
| 5 | [Latent Action Learning Requires Supervision in the Presence of Distractors (LAOM)](https://arxiv.org/abs/2502.00379) | 2025 | ICML | 発展 | 行動と相関する妨害で LAPO が壊れることを示し、潜在空間での予測と 2.5% のラベルによる監督で下流性能を平均 4.2 倍にする | ✅ p.6 |
| 6 | [WMPO: World Model-based Policy Optimization for Vision-Language-Action Models](https://arxiv.org/abs/2511.09515) | 2025 | ICLR 2026 | 最新 | 画素の行動条件付き動画世界モデルの中で VLA を GRPO で学習する。結果ベースの報酬モデルで報酬ハッキングを避け、Mimicgen で 33.6→57.6% | ✅ p.7 |
| 7 | [Latent Action World Models for Control with Unlabeled Trajectories (LAWM)](https://arxiv.org/abs/2512.10016) | 2025 | arXiv | 最新 | 行動付き・行動なしの軌跡を共通の潜在行動で1つの世界モデルに学ばせ、その中でオフライン RL を行う。行動ラベル5%で全ラベル時並み（状態入力のみ） | ✅ p.8 |
| 8 | [Learning Latent Action World Models In The Wild](https://arxiv.org/abs/2601.05230) | 2026 | ICML | 最新 | 自然動画と凍結 V-JEPA 2 表現で潜在行動世界モデルを学ぶ。連続でスパース／ノイズ付きの潜在行動が VQ より有効で、コントローラ経由で DROID・RECON の計画に使える | ✅ p.9 |
| 9 | [RENEW: Towards Learning World Models and Repairing Model Exploitation from Preferences](https://arxiv.org/abs/2607.14180) | 2026 | RLC 2026 ワークショップ | 最新 | 想像軌跡の物理的妥当性に関する選好で、世界モデルの遷移を直接学ぶ（DLHF）。不確実性で問い合わせ先を選び、悪用されやすい領域を修復する（合成オラクル） | ✅ p.10 |
| 10 | [What Matters for Latent Actions in Robot Learning](https://arxiv.org/abs/2608.19613) | 2026 | arXiv | 最新 | 41通りの LAM 設計を LIBERO・LIBERO-Plus・RoboTwin2.0 で比較した。LAPO が依然強い基準で、潜在次元は32、代理指標は再構成系がよい | ✅ p.11 |
| 11 | [HaWMPO: Hallucination-Aware World Model-based Policy Optimization for Generalist Robot Policy](https://arxiv.org/abs/2609.09941) | 2026 | arXiv | 最新 | 行動条件付きの幻覚推定器のスコアで GRPO の報酬を割り引く。LIBERO で WMPO を 6.9pt 上回り、G1 実機で 67.5→80.0% | ✅ p.12 |
| 12 | [MOReL: Model-Based Offline Reinforcement Learning](https://arxiv.org/abs/2005.05951) | 2020 | NeurIPS | 原典 | 不確実性が高い遷移を吸収状態にした悲観的 MDP で学ぶ。PDF は取得したが要旨と関連の節の確認にとどめ、MOPO を代表とした | — 参照のみ |
| 13 | [Genie: Generative Interactive Environments](https://arxiv.org/abs/2402.15391) | 2024 | ICML | 発展 | 動画だけから潜在行動で操作できる基盤世界モデル。LAPA の潜在行動モデルの土台 | ↪ 既存：world-model/foundation-world-model p.4 |
| 14 | [Training Agents Inside of Scalable World Models (Dreamer 4)](https://arxiv.org/abs/2509.24527) | 2025 | arXiv | 発展 | 少量の行動ラベルで世界モデルを学び、想像内 RL で Minecraft を解く | ↪ 既存：world-model/foundation-world-model p.7 |
| 15 | [Ctrl-World: A Controllable Generative World Model for Robot Manipulation](https://arxiv.org/abs/2510.10125) | 2025 | ICLR 2026 | 発展 | 世界モデルで VLA の方策評価と合成データによる改善を行う。WMPO と並ぶ「世界モデル＝シミュレータ」の例 | ↪ 既存：world-model/foundation-world-model p.8 |
| 16 | [PlayWorld: Learning Robot World Models from Autonomous Play](https://arxiv.org/abs/2603.09030) | 2026 | arXiv | 最新 | 自律的な遊びのデータで学んだ世界モデル内で RL を行い、デモだけで学んだモデルでは方策がモデルをハックすると報告 | ↪ 既存：world-model/foundation-world-model p.9 |
| 17 | [Hallucination in World Models is Predictable and Preventable](https://arxiv.org/abs/2606.27326) | 2026 | arXiv | 最新 | 世界モデルの幻覚を予測する指標。HaWMPO の幻覚推定と問題意識が近い | ↪ 既存：world-model/foundation-world-model p.10 |
| 18 | [Imperfect World Models are Exploitable](https://arxiv.org/abs/2605.15960) | 2026 | arXiv | 最新 | モデル悪用を方策順序の逆転として理論化。RENEW と同じグループ | ↪ 既存：world-model/latent-planning p.10 |
| 19 | [V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://arxiv.org/abs/2506.09985) | 2025 | arXiv | 発展 | In-the-Wild LAM が凍結エンコーダと比較対象（V-JEPA 2-AC）に使う | ↪ 既存：world-model/jepa p.6 |
| 20 | [Video PreTraining (VPT)](https://arxiv.org/abs/2206.11795) | 2022 | NeurIPS | 発展 | 少量の行動付きデータで学んだ IDM で Web 動画に疑似ラベルを付ける。LAPO・LAPA・LAOM の比較対象 | — 参照のみ |
| 21 | [Behavioral Cloning from Observation (BCO)](https://arxiv.org/abs/1805.01954) | 2018 | IJCAI | 発展 | 環境との相互作用で IDM を学び、観察だけの実演に行動を付ける。ILPO の比較対象 | — 参照のみ |
| 22 | [UniVLA: Learning to Act Anywhere with Task-centric Latent Actions](https://arxiv.org/abs/2505.06111) | 2025 | arXiv | 発展 | 課題中心の潜在行動で VLA を学ぶ。LAPA の後続として In-the-Wild LAM・What Matters が引用（検索情報のみ） | — 参照のみ |
| 23 | [CoMo: Learning Continuous Latent Motion from Internet Videos for Scalable Robot Learning](https://arxiv.org/abs/2505.17006) | 2025 | arXiv | 発展 | 連続潜在運動を学ぶ LAM。What Matters の比較で LAPO に劣る（What Matters 経由の情報） | — 参照のみ |
| 24 | [LAOF: Robust Latent Action Learning with Optical Flow Constraints](https://arxiv.org/abs/2511.16407) | 2025 | arXiv | 発展 | 光学流の制約を加えた LAPO。What Matters では性能を下げると報告（要旨と What Matters 経由） | — 参照のみ |
| 25 | [AdaWorld: Learning Adaptable World Models with Latent Actions](https://arxiv.org/abs/2503.18938) | 2025 | arXiv | 発展 | 連続潜在行動（VAE 型）で適応可能な世界モデルを学ぶ。In-the-Wild LAM のノイズ型正則化の先行例（検索情報のみ） | — 参照のみ |
| 26 | [What Do Latent Action Models Actually Learn?](https://arxiv.org/abs/2506.15691) | 2025 | NeurIPS | 発展 | 線形 LAM で、潜在行動が行動ではなく外因性ノイズを捉える条件を解析し、PCA との関係を示す（要旨に基づく） | — 参照のみ（要旨のみ） |
| 27 | [Why Latent Actions Fail, and How to Prevent It](https://arxiv.org/abs/2605.20223) | 2026 | arXiv | 最新 | 線形 LAM に外因性状態を加え、再構成目的が外因情報を符号化すること、行動監督が有効な理由を理論的に示す（要旨に基づく。PDF は取得済み） | — 参照のみ（要旨のみ） |
| 28 | [Segment to Focus: Guiding Latent Action Models in the Presence of Distractors (MaskLAM)](https://arxiv.org/abs/2602.02259) | 2026 | arXiv | 最新 | SAM でエージェント領域を取り出し、そこだけを再構成させて distractor を排除する。LAPO 比で正規化リターン最大 4.97 倍（要旨に基づく） | — 参照のみ（要旨のみ） |
| 29 | [Skeleton-Grounded Latent Action Model for Robot World Models (SkeLAM)](https://arxiv.org/abs/2610.31474) | 2026 | arXiv | 最新 | 潜在行動をロボット骨格で接地した運動成分と残差に分け、実行動からの写像を容易にする。DROID で DreamDojo より ADE −19.5%（要旨に基づく） | — 参照のみ（要旨のみ） |
| 30 | [OneLA: Learning Many Worlds from Latent Actions](https://arxiv.org/abs/2610.20160) | 2026 | arXiv | 最新 | 共有の直交辞書で領域をまたぐ連続潜在行動を学び、アダプタで各領域の操作を写像する（要旨に基づく） | — 参照のみ（要旨のみ） |
| 31 | [Constrained Latent Action Policies for Model-Based Offline Reinforcement Learning (C-LAP)](https://arxiv.org/abs/2411.04562) | 2024 | NeurIPS | 発展 | 行動付きデータで潜在行動世界モデルを学び、方策を潜在行動の事前分布内に制約する。LAWM の土台 | — 参照のみ（LAWM 経由） |
| 32 | [WoVR: World Models as Reliable Simulators for Post-Training VLA Policies with RL](https://arxiv.org/abs/2602.13977) | 2026 | arXiv | 最新 | 幻覚を「想像と現実の系統的なずれ」と定義し、キーフレーム初期化と方策・世界モデルの共進化で抑える。導入と実験設定の一部を確認 | — 参照のみ（HaWMPO を代表とした） |
| 33 | [WoVR+: World Model as Reliable Simulator for Versatile VLA Policy Optimization with RL](https://arxiv.org/abs/2610.17922) | 2026 | arXiv | 最新 | WoVR を多視点・長期課題に拡張。RoboTwin で SFT 比 +21.09%（要旨に基づく） | — 参照のみ（要旨のみ） |
| 34 | [World-Gymnast: Training Robots with Reinforcement Learning in a World Model](https://arxiv.org/abs/2602.02454) | 2026 | arXiv | 最新 | 動画世界モデル内で VLM を報酬に VLA を RL する。Bridge で SFT 比最大 18 倍（要旨に基づく。PDF は取得済み） | — 参照のみ（要旨のみ） |
| 35 | [DRILL: Training World Models to Improve Policies, Not Predict Pixels](https://arxiv.org/abs/2610.30814) | 2026 | NeurIPS 2026 | 最新 | 方策の内側 GRPO 更新後の収益を最大化するよう世界モデルを二段階最適化する。WMPO 比 +13.1pt（要旨に基づく） | — 参照のみ（要旨のみ） |
| 36 | [Reinforcing VLAs in Task-Agnostic World Models (RAW-Dream)](https://arxiv.org/abs/2605.12334) | 2026 | arXiv | 最新 | 課題非依存の世界モデルと既製 VLM 報酬で VLA を RL し、二重ノイズ検証で幻覚ロールアウトを除く（要旨に基づく） | — 参照のみ（要旨のみ） |
| 37 | [OpenVLA: An Open-Source Vision-Language-Action Model](https://arxiv.org/abs/2406.09246) | 2024 | CoRL | 発展 | 行動ラベル付きデータで事前学習した 7B VLA。LAPA の比較対象、WMPO・HaWMPO の基本方策（OFT 版） | — 参照のみ |
| 38 | [Deep Reinforcement Learning from Human Preferences](https://arxiv.org/abs/1706.03741) | 2017 | NeurIPS | 原典 | Bradley–Terry 選好による報酬学習。RENEW の DLHF はこの報酬を遷移の対数尤度に置き換える | — 参照のみ |
