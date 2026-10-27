## 言語から報酬・目標を生成する行動獲得（language-to-reward/）

### 調査履歴
- 2026-10-25: 「行動デモなしで、言語で書かれた課題を報酬関数・成功判定に変換して新しい行動を獲得する」研究を対象に、arXiv API で reward hacking × VLM reward、VLM reward model × RL × robot、LLM × reward function design、success detection × VLM を新しい順に検索し、WebSearch で 2026 年の VLM 報酬モデル群（RoboReward、LRM、TOPReward、MARVL、VLLR、Demo2Reward）を補った。2025〜2026 の現在地は「汎用報酬 VLM（RoboReward → SOLE-R1）」「少数デモでの補正（Demo2Reward）」「報酬コード探索への視覚診断（RDA）」「反復報酬設計の統一評価と報酬ハッキング（BIRD）」と把握した。
- 系譜は2本を原典まで遡った。(1) LLM が報酬コードを書く系：BIRD／RDA → Eureka → Language to Rewards → LEARN。(2) VLM が観測を採点する系：SOLE-R1／Demo2Reward → RoboReward → RL-VLM-F → VLM-RMs → LEARN（言語→報酬の学習）。
- 本文はすべて arXiv 版（PDF／HTML）で読んだ。Demo2Reward は RLC/RLJ 2026 採録との検索情報があるが arXiv 版の紙面で確認できず、arXiv プレプリントとした。RoboReward・SOLE-R1・BIRD も採録先を確認できず arXiv プレプリントとした。
- 既存デッキとの重複を確認：ELLM・Motif（world-model/foundation-world-model）、SENSEI（world-model/intrinsic-reward）、OMNI・OMNI-EPIC（open-endedness/llm-driven-evolution）、ReEvo（swarm-intelligence/metabbo・aco-neural）は再掲せず参照に留めた。Eureka 系は既存デッキになかったため本テーマでスライド化した。同分野の compositional-generalization・foundation-policies は別担当。

### 系譜
```
[言語→報酬の学習]  AGILE (Bahdanau+ 2018, 参照のみ) ─┐
                   LEARN (Goyal+ 2019, 原典) ────────┴─┬─────────────────────────────────────────────┐
                                                        │                                             │
[LLM が報酬コードを書く]                                ▼                                             │
  Kwon+ 2023 (LLM を代理報酬に, 参照のみ)    Language to Rewards (Yu+ 2023, 報酬パラメータ＋MPC)        │
                                              │                                                       │
                                              ▼                                                       │
                     Text2Reward (参照のみ) ─ Eureka (Ma+ 2023, 報酬コードの進化探索＋reflection)       │
                                              ├─► DrEureka (2024, 参照のみ) / RF-Agent・REvolve（参照のみ）│
                                              ├─► RDA (Lee+ 2026, VLM の動画診断で指示整合)            │
                                              └─► BIRD (Bhamidipaty+ 2026, IRD 14手法の統一比較と報酬ハッキング)
                                                                                                      │
[VLM が観測を採点する]                                                                                ▼
  Du+ 2023 SuccessVQA (参照のみ) ─ VLM-RMs (Rocamonde+ 2023, CLIP 類似度を報酬) ─ RoboCLIP / LAMP（参照のみ）
                                              │
                                              ▼
                                   RL-VLM-F (Wang+ 2024, VLM の選好→報酬モデル)   [Motif (既存) は LLM 選好版]
                                              │
                         GVL (2024, 参照のみ) ┤
                                              ▼
                                   RoboReward (Lee+ 2026, 実機向け汎用報酬 VLM とベンチ)
                                     ├─► SOLE-R1 (Schroeder+ 2026, CoT 進捗推論で未学習課題をゼロから RL)
                                     └─► Demo2Reward (Gumbsch+ 2026, 少数デモで判定指示を最適化)
                                   （並行：Robometer・LRM・TOPReward, 参照のみ）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Using Natural Language for Reward Shaping in Reinforcement Learning](https://arxiv.org/abs/1903.02020) | 2019 | IJCAI 2019 | 原典 | 行動頻度と指示の対応を学ぶ LEARN の確率をポテンシャル型の形状報酬にし、Montezuma's Revenge 15課題で成功回数を平均60%増 | ✅ p.2 |
| 2 | [Language to Rewards for Robotic Skill Synthesis](https://arxiv.org/abs/2306.08647) | 2023 | CoRL 2023 | 発展 | LLM が動作記述→報酬パラメータを書き MuJoCo MPC で合成。17課題の90%（CaP 50%） | ✅ p.3 |
| 3 | [Eureka: Human-Level Reward Design via Coding Large Language Models](https://arxiv.org/abs/2310.12931) | 2023 | ICLR 2024 | 発展 | 環境コード＋課題文から報酬コードを生成し進化探索。29課題の83%で人の報酬超え、ペン回し | ✅ p.4 |
| 4 | [Vision-Language Models are Zero-Shot Reward Models for Reinforcement Learning](https://arxiv.org/abs/2310.12921) | 2023 | ICLR 2024 | 発展 | CLIP 類似度を零ショット報酬にし、人型の姿勢課題 8中5 を学習。CLIP の規模が鍵 | ✅ p.5 |
| 5 | [RL-VLM-F: Reinforcement Learning from Vision Language Foundation Model Feedback](https://arxiv.org/abs/2402.03681) | 2024 | ICML 2024 | 発展 | VLM に画像対の選好を答えさせて報酬モデルを学習。布・ロープ等7課題で既存 VLM 報酬を上回る | ✅ p.6 |
| 6 | [RoboReward: General-Purpose Vision-Language Reward Models for Robotics](https://arxiv.org/abs/2601.00675) | 2026 | arXiv | 最新 | 反実仮想の負例拡張で実機動画の進捗報酬 VLM（4B/8B）とベンチを構築。実機 RL で成功率 10→80% | ✅ p.7 |
| 7 | [SOLE-R1: Video-Language Reasoning as the Sole Reward for On-Robot Reinforcement Learning](https://arxiv.org/abs/2603.28730) | 2026 | arXiv | 最新 | 時刻ごとの CoT 進捗推論を唯一の報酬に、デモなし・乱数初期化から未学習24課題を学習。ハッキング耐性も分析 | ✅ p.8 |
| 8 | [From Demonstrations to Rewards: Test-Time Prompt Optimization for VLM Reward Models](https://arxiv.org/abs/2606.00083) | 2026 | arXiv（RLC 2026 との情報あり・未確認） | 最新 | 3〜10本のデモで VLM 成功判定器の指示を自動改訂し偽陽性を抑える Demo2Reward | ✅ p.9 |
| 9 | [RDA: Reward Design Agent for Reinforcement Learning](https://arxiv.org/abs/2606.01672) | 2026 | RLC 2026 | 最新 | Eureka 型探索に部分課題ごとの VLM 動画診断を加え、指示整合度を 0.47→0.70（HumanoidBench） | ✅ p.10 |
| 10 | [A Bird's-Eye View of Iterative Reward Design](https://arxiv.org/abs/2610.04364) | 2026 | arXiv | 最新 | 反復報酬設計14手法を統一実装で比較。単純な設計選択が有効、高得点でも不自然・有害な挙動が残る | ✅ p.11 |
| 11 | [Learning to Understand Goal Specifications by Modelling Reward (AGILE)](https://arxiv.org/abs/1806.01946) | 2018 | ICLR 2019 | 原典 | 専門家の例から指示条件付き報酬モデルを RL と同時に学ぶ（アブストラクトのみ確認） | — 参照のみ（LEARN と同時期の別流派。枠の都合） |
| 12 | [Reward Design with Language Models](https://arxiv.org/abs/2303.00001) | 2023 | ICLR 2023 | 発展 | LLM（GPT-3）を学習中の代理報酬として直接問い合わせる（アブストラクトのみ確認） | — 参照のみ（テキスト環境中心のため） |
| 13 | [Vision-Language Models as Success Detectors](https://arxiv.org/abs/2303.07280) | 2023 | arXiv | 発展 | Flamingo を SuccessVQA として微調整した成功判定器（アブストラクトのみ確認） | — 参照のみ（RL での最適化圧下の検証なし） |
| 14 | [Text2Reward: Reward Shaping with Language Models for Reinforcement Learning](https://arxiv.org/abs/2309.11489) | 2023 | ICLR 2024 | 発展 | 環境の簡潔な表現に基づき密な形状報酬コードを生成、人のフィードバックで改訂（アブストラクトのみ確認） | — 参照のみ（Eureka と同系統で枠の都合） |
| 15 | [RoboCLIP: One Demonstration is Enough to Learn Robot Policies](https://arxiv.org/abs/2310.07899) | 2023 | NeurIPS 2023 | 発展 | 動画言語モデルの埋め込み類似度で、デモ動画1本または文章から報酬を作る（アブストラクトのみ確認） | — 参照のみ（文章版は性能が低いと RL-VLM-F が報告） |
| 16 | [Language Reward Modulation for Pretraining Reinforcement Learning (LAMP)](https://arxiv.org/abs/2308.12270) | 2023 | arXiv | 発展 | VLM の言語報酬を下流課題報酬ではなく事前学習の探索報酬に使う（アブストラクトのみ確認） | — 参照のみ |
| 17 | [DrEureka: Language Model Guided Sim-To-Real Transfer](https://arxiv.org/abs/2406.01967) | 2024 | RSS 2024 | 発展 | Eureka を報酬とドメインランダム化の自動設計に広げ実機転移（アブストラクトのみ確認） | — 参照のみ（枠の都合） |
| 18 | [Vision Language Models are In-Context Value Learners (GVL)](https://arxiv.org/abs/2411.04549) | 2024 | ICLR 2025 | 発展 | シャッフルしたフレームの並べ替えとして VLM に進捗を推定させる零ショット価値推定（アブストラクトのみ確認） | — 参照のみ（SOLE-R1・Demo2Reward の比較対象） |
| 19 | [Robometer: Scaling General-Purpose Robotic Reward Models via Trajectory Comparisons](https://arxiv.org/abs/2603.02115) | 2026 | RSS 2026 | 最新 | 進捗損失と軌跡間の選好損失を併用する汎用ロボット報酬モデル（アブストラクトのみ確認） | — 参照のみ（RoboReward と同系統） |
| 20 | [Large Reward Models: Generalizable Online Robot Reward Generation with Vision-Language Models](https://arxiv.org/abs/2603.16065) | 2026 | arXiv | 最新 | VLM を進捗・完了・時間対比の3種の報酬生成器に特化し、模倣方策を PPO で改善（アブストラクトのみ確認） | — 参照のみ |
| 21 | [TOPReward: Token Probabilities as Hidden Zero-Shot Rewards for Robotics](https://arxiv.org/abs/2602.19313) | 2026 | arXiv | 最新 | 数値を生成させず「完了した」のトークン確率から進捗報酬を得る（アブストラクトのみ確認） | — 参照のみ |
| 22 | [Causal Reward World Models: Zero-shot Reward Design for Automated Skill Generation](https://arxiv.org/abs/2606.23280) | 2026 | arXiv | 最新 | 報酬成分と物理量の因果構造を事前学習し、反復なしで報酬コードを零ショット生成（アブストラクトのみ確認） | — 参照のみ |
| 23 | [ROOT: Discovering Rewards for User-Specified Embodied Behaviors](https://arxiv.org/abs/2610.04250) | 2026 | arXiv | 最新 | 報酬・方策・観察を木で保持し、動画言語モデルの洞察で歩容など様式の報酬を探索（アブストラクトのみ確認） | — 参照のみ（RDA と同方向） |
| 24 | [RF-Agent: Automated Reward Function Design via Language Agent Tree Search](https://arxiv.org/abs/2602.23876) | 2026 | arXiv | 最新 | 報酬設計を MCTS 付きの言語エージェントとして定式化（アブストラクトのみ確認） | — 参照のみ（BIRD の比較対象） |
| 25 | [Specifying Reward Functions for RL Without Environment Sampling (EARS)](https://arxiv.org/abs/2609.15544) | 2026 | arXiv | 最新 | LLM で報酬特徴を作り、想像軌跡への選好で重みを学ぶ環境相互作用なしの報酬指定（アブストラクトのみ確認） | — 参照のみ |
| 26 | [No Free Checker: A Survey of Verifiers for Robot Policies](https://arxiv.org/abs/2609.09250) | 2026 | arXiv | 最新 | 報酬モデル・成功判定・形式検証など約150の検証器を「得やすさ」と「信頼性」で整理したサーベイ（アブストラクトのみ確認） | — 参照のみ（サーベイ） |
| 27 | [Guiding Pretraining in Reinforcement Learning with Large Language Models (ELLM)](https://arxiv.org/abs/2302.06692) | 2023 | ICML 2023 | 発展 | LLM が提案した目標の達成度を言語類似度で報酬化する探索 | ↪ 既存：world-model/foundation-world-model p.2 |
| 28 | [Motif: Intrinsic Motivation from Artificial Intelligence Feedback](https://arxiv.org/abs/2310.00166) | 2023 | ICLR 2024 | 発展 | LLM の選好から内発的報酬を学ぶ（RL-VLM-F の LLM 版にあたる） | ↪ 既存：world-model/foundation-world-model p.3 |
| 29 | [SENSEI: Semantic Exploration Guided by Foundation Models to Learn Versatile World Models](https://arxiv.org/abs/2503.01584) | 2025 | ICML 2025 | 発展 | VLM の注釈から「興味深さ」の報酬を蒸留して探索 | ↪ 既存：world-model/intrinsic-reward p.7 |
| 30 | [OMNI-EPIC: Open-endedness via Models of human Notions of Interestingness with Environments Programmed in Code](https://arxiv.org/abs/2405.15568) | 2024 | ICLR 2025 | 発展 | LLM が環境コードと成功判定コードを生成し開放的に課題を作る | ↪ 既存：open-endedness/llm-driven-evolution p.5 |
| 31 | [ReEvo: Large Language Models as Hyper-Heuristics with Reflective Evolution](https://arxiv.org/abs/2402.01145) | 2024 | NeurIPS 2024 | 発展 | LLM の反省付き進化でヒューリスティクスを設計（Eureka 型探索の最適化版） | ↪ 既存：swarm-intelligence/metabbo p.6 |
