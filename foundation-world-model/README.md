## 動画・基盤世界モデルの能動データ収集と意味的好奇心（foundation-world-model/）

### 調査履歴
- 2026-10-23: 第1回調査（intrinsic-reward）の推奨テーマを受けて開始した。arXiv API と WebSearch で「world model × hallucination / active data / controllability / active learning / curiosity × video」「VLM・LLM × interestingness / semantic exploration」の2025〜2026年の論文を検索した。見つかった最新動向は4つある。PlayWorld（自律的な遊び）、Hallucination in World Models（幻覚予測器を好奇心報酬に使う）、OnlineWM（シミュレータとの能動オンライン学習）、ConfAL-WM（信頼度に基づく能動学習）。
- 生成側の系譜は、これらが共通して引用する Dreamer 4 → GameNGen / DIAMOND → Genie（動画のみで学ぶ基盤世界モデル）と遡った。ロボット側の分岐として Ctrl-World（ICLR 2026）を追った。
- 意味側の系譜は、PlayWorld の VLM タスク提案と WorldLLM の好奇心駆動の仮説検証から、Motif → ELLM / OMNI（LLM を「面白さ」のモデルとして使う）へ遡った。
- 既存デッキとの重複を避けるため、SENSEI・AIM・Plan2Explore・ICL Curiosity（intrinsic-reward）と Orbis 2（hierarchical）は再掲しなかった。JEPA 系は別担当のため扱っていない。
- 本文はすべて arXiv 版で読んだ（ELLM と GameNGen の図は PDF から切り出し、その他は arXiv HTML 版の図を使用）。

### 系譜
```
[意味側：LLM/VLM による「何が面白いか」]
ELLM (2023, LLM が目標を提案) ─┬─> Motif (2023, LLM の選好を報酬に蒸留) ──> SENSEI (2025, VLM 版 + 世界モデル)［既存：intrinsic-reward］
OMNI (2023, 面白さのモデル) ───┘                                              │
        │                                                                      │
        └─> WorldLLM (2025, 好奇心 RL で仮説を反証するデータを集め、LLM 世界モデルを改善)
                                                                               │
[生成側：大規模な行動条件付き動画世界モデル]                                   │
World Models (2018) ─> Genie (2024, 動画のみ・潜在行動・ΔtPSNR)                │
                       └─> GameNGen (2024, RL エージェントのプレイを記録して拡散モデルを学習)
                       └─> DIAMOND (2024)                                      │
                              └─> Dreamer 4 (2025, shortcut forcing、少量の行動ラベル、想像内 RL)
                              └─> Ctrl-World (2025, 多視点・フレーム単位の行動・DROID で方策を評価/改善)
                                                                               │
[合流：世界モデルの訓練データを能動的に設計する（2026）]                       ▼
  PlayWorld (2026, VLM がタスクを提案し VLA が遊ぶ → 接触の多い遷移を被覆)  ← 意味的な目標提案
  AIM (2026, エンパワーメントでデータを収集)［既存：intrinsic-reward］
  Hallucination in WMs (2026, 幻覚予測器 = 好奇心報酬、被覆を考えた再サンプリング)  ← Plan2Explore 型の不一致
  OnlineWM (2026, 「新しく、かつ学習可能」な分岐を能動選択 + 反実仮想の対)  ← 学習進捗型の好奇心
  ConfAL-WM (2026, 信頼度プローブによる能動学習)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Guiding Pretraining in Reinforcement Learning with Large Language Models (ELLM)](https://arxiv.org/abs/2302.06692) | 2023 | ICML | 原典 | LLM が状態の説明文から目標を提案し、キャプションと目標の類似度を内発的報酬にする。Crafter で1エピソードあたり約6個の達成（新規性型は3未満） | ✅ p.2 |
| 2 | [Motif: Intrinsic Motivation from Artificial Intelligence Feedback](https://arxiv.org/abs/2310.00166) | 2023 | ICLR 2024 | 発展 | LLM によるメッセージ対の選好を報酬モデルに蒸留する。NetHack では内発的報酬のみでスコア学習に勝ち、oracle で約30% | ✅ p.3 |
| 3 | [Genie: Generative Interactive Environments](https://arxiv.org/abs/2402.15391) | 2024 | ICML | 原典 | 3万時間の行動ラベルなしゲーム動画から、潜在行動で操作できる 11B の基盤世界モデルを学習する。制御性の指標 ΔtPSNR を提案 | ✅ p.4 |
| 4 | [Diffusion Models Are Real-Time Game Engines (GameNGen)](https://arxiv.org/abs/2408.14837) | 2024 | ICLR 2025 | 発展 | RL エージェントのプレイ記録で SD1.4 を DOOM のシミュレータ化（20FPS）。エージェントのデータはランダム方策のデータより忠実（Table 3） | ✅ p.5 |
| 5 | [WorldLLM: Improving LLMs' world modeling using curiosity-driven theory-making](https://arxiv.org/abs/2506.06725) | 2025 | arXiv（RLDM 2025 で発表） | 発展 | 自然言語の仮説をベイズ推論で更新し、予測誤差・学習進捗を報酬とする RL で証拠を集めて LLM 世界モデルを改善する | ✅ p.6 |
| 6 | [Training Agents Inside of Scalable World Models (Dreamer 4)](https://arxiv.org/abs/2509.24527) | 2025 | arXiv プレプリント | 発展 | shortcut forcing による実時間の 2B 世界モデル。オフラインのみで Minecraft のダイヤを取得。行動ラベル 100h で全ラベル時の 85% | ✅ p.7 |
| 7 | [Ctrl-World: A Controllable Generative World Model for Robot Manipulation](https://arxiv.org/abs/2510.10125) | 2025 | ICLR 2026 | 最新 | 多視点・記憶検索・フレーム単位の行動条件で VLA と閉ループ対話する。方策の順位を予測でき、合成データで成功率を 38.7%→83.4% に改善 | ✅ p.8 |
| 8 | [PlayWorld: Learning Robot World Models from Autonomous Play](https://arxiv.org/abs/2603.09030) | 2026 | arXiv プレプリント | 最新 | VLM がタスクを提案し VLA が実行する自律的な遊びでデータを収集。接触の多い遷移の予測と方策評価（r=0.877）、世界モデル内 RL で実機 +65% | ✅ p.9 |
| 9 | [Hallucination in World Models is Predictable and Preventable](https://arxiv.org/abs/2606.27326) | 2026 | arXiv プレプリント | 最新 | MMBench2（427h・210 タスク）で幻覚を3種に分類。ラベル不要の予測器（ρ≈−0.80）を好奇心報酬にし、未知タスクに各50軌跡で適応する | ✅ p.10 |
| 10 | [OnlineWM: Causality-Aware Active Online Learning for Effective World Modeling](https://arxiv.org/abs/2609.23753) | 2026 | arXiv プレプリント | 最新 | 8B の HY-World 1.5 を Minecraft シミュレータとの能動オンライン学習（難易度を場面と行動に分解）と反実仮想の対で後学習する | ✅ p.11 |
| 11 | [OMNI: Open-endedness via Models of human Notions of Interestingness](https://arxiv.org/abs/2306.01711) | 2023 | ICLR 2024 | 原典 | 基盤モデルを「面白さのモデル（MoI）」に使い、学習可能かつ面白いタスクを優先する。ELLM と並ぶ意味的好奇心の原典。PDF は取得したが、関連研究の節の確認にとどめ、ELLM を代表としてスライド化した | — 参照のみ |
| 12 | [OMNI-EPIC: Open-endedness via Models of human Notions of Interestingness with Environments Programmed in Code](https://arxiv.org/abs/2405.15568) | 2024 | arXiv | 発展 | OMNI を、コードで書いた環境の生成へ拡張した（Motif スライドの s6 で言及）。未読 | — 参照のみ |
| 13 | [SENSEI: Semantic Exploration Guided by Foundation Models to Learn Versatile World Models](https://arxiv.org/abs/2503.01584) | 2025 | ICML | 発展 | VLM の面白さの選好を世界モデルで予測し、不一致と組み合わせる。Motif の VLM 版 | ↪ 既存：intrinsic-reward p.7 |
| 14 | [Training Controllable World Models via Action Influence Maximization (AIM)](https://arxiv.org/abs/2610.27387) | 2026 | CoRL | 最新 | 動画世界モデルの制御性はデータの I(A;S'\|S) で上界されることを示し、エンパワーメントでデータを能動収集する（PlayWorld と同じグループ） | ↪ 既存：intrinsic-reward p.11 |
| 15 | [Planning to Explore via Self-Supervised World Models (Plan2Explore)](https://arxiv.org/abs/2005.05960) | 2020 | ICML | 発展 | 潜在世界モデルでの不一致探索。Hallucination in WMs が好奇心データ収集の基準として引用 | ↪ 既存：intrinsic-reward p.5 |
| 16 | [Can In-Context Learning Support Intrinsic Curiosity?](https://arxiv.org/abs/2606.19476) | 2026 | arXiv | 最新 | ICL 予測器による学習進捗型の好奇心。WorldLLM と近い問題設定 | ↪ 既存：intrinsic-reward p.10 |
| 17 | [Orbis 2: A Hierarchical World Model for Driving](https://arxiv.org/abs/2607.15898) | 2026 | arXiv | 最新 | 運転向けの階層的な生成世界モデル（基盤世界モデルの応用例） | ↪ 既存：hierarchical p.10 |
| 18 | [Diffusion for World Modeling: Visual Details Matter in Atari (DIAMOND)](https://arxiv.org/abs/2405.12399) | 2024 | NeurIPS | 発展 | 拡散世界モデル内で RL を行う（Atari 100k で HNS 1.46、CS:GO のシミュレーション）。PDF は取得したが精読していない。データ収集の観点が薄いため GameNGen を代表とした | — 参照のみ |
| 19 | [Cosmos World Foundation Model Platform for Physical AI](https://arxiv.org/abs/2501.03575) | 2025 | arXiv | 発展 | NVIDIA の世界基盤モデル基盤。動画キュレーションのパイプラインを含む。大部のため、要旨と構成の確認にとどめた | — 参照のみ |
| 20 | [ConfAL-WM: Confidence-Guided Active Learning for Action-Conditioned World Models](https://arxiv.org/abs/2608.25572) | 2026 | arXiv | 最新 | EVAC の UNet 特徴に信頼度プローブを付け、タスク・フレーム・パッチ単位でデータ予算を配分する（RoboTwin2.0、40% 予算）。PDF は取得したが要旨のみ確認。OnlineWM と同系統のため1本に絞った | — 参照のみ |
| 21 | [MEND: Label-Free Detection, Localisation, and Correction of Latent Hallucination in World Models](https://arxiv.org/abs/2609.39182) | 2026 | DICTA 2026 | 最新 | 条件付きスコアネットで潜在世界モデルの幻覚を検出・局在化・補正する（AUROC 最大 0.80）。要旨のみ確認 | — 参照のみ |
| 22 | [What You Think is What You See: Driving Exploration in VLM Agents via Visual-Linguistic Curiosity (GLANCE)](https://arxiv.org/abs/2605.03782) | 2026 | ICML 2026 | 最新 | VLM エージェントの言語的世界モデルと視覚表現の不一致を好奇心にする。検索結果の情報のみ | — 参照のみ |
| 23 | [Autonomous Improvement of Instruction Following Skills via Foundation Models (SOAR)](https://arxiv.org/abs/2407.20635) | 2024 | CoRL | 発展 | VLM が提案したタスクでロボットが自律的にデータを集め、方策を改善する。PlayWorld が最も近い先行研究として挙げる | — 参照のみ |
| 24 | [Doing Experiments and Revising Rules with Natural Language and Probabilistic Reasoning](https://arxiv.org/abs/2402.06025) | 2024 | NeurIPS | 発展 | 自然言語のルールを確率推論で改訂する。WorldLLM の Scientist の基礎 | — 参照のみ |
| 25 | [Active World Model Learning with Progress Curiosity](https://arxiv.org/abs/2007.07853) | 2020 | ICML | 発展 | 学習進捗型の好奇心で世界モデルを能動的に学習する（white noise 問題への対処）。OnlineWM が理論的根拠として引用 | — 参照のみ |
| 26 | [WorldCompass: Reinforcement Learning for Long-Horizon World Models](https://arxiv.org/abs/2602.09022) | 2026 | arXiv | 最新 | 報酬ベースの後学習で動画世界モデルの行動精度を高める。OnlineWM の初期値・比較対象 | — 参照のみ |
| 27 | [IRASim: A Fine-Grained World Model for Robot Manipulation](https://arxiv.org/abs/2406.14540) | 2024 | arXiv | 発展 | フレーム単位の行動条件付けを持つロボット動画世界モデル。Ctrl-World の比較対象 | — 参照のみ |
| 28 | [Evaluating Robot Policies in a World Model (WPE)](https://arxiv.org/abs/2506.00613) | 2025 | arXiv | 発展 | 動画世界モデルによる方策評価。Ctrl-World・PlayWorld の比較対象 | — 参照のみ |
| 29 | [World Models](https://arxiv.org/abs/1803.10122) | 2018 | arXiv（NeurIPS 2018 版は別題） | 原典 | VAE+RNN の世界モデル。ランダム方策のロールアウトで VizDoom を学習した（GameNGen が対比） | — 参照のみ |
| 30 | [Video PreTraining (VPT): Learning to Act by Watching Unlabeled Online Videos](https://arxiv.org/abs/2206.11795) | 2022 | NeurIPS | 発展 | 逆動力学モデルで Web 動画に行動ラベルを付ける。Dreamer 4 のデータセットと比較対象 | — 参照のみ |
| 31 | Genie 3: A new frontier for world models（DeepMind 技術ブログ） | 2025 | ブログ | 最新 | 実時間で多様な場面を生成する基盤世界モデル。論文の本文がない | ⚠️ 本文未確認 |
