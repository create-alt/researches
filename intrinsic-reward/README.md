## 内発的報酬（intrinsic-reward/）

### 調査履歴
- 2026-10-23: arXiv API と WebSearch で「world model × intrinsic / curiosity / disagreement / information gain / empowerment」の2024〜2026年の論文を検索し、最新動向を確認した。見つかった流れは、Dreamer 系の探索（Enter the Void、InDRiVE、DreamerV3-XP）、VLM による意味的好奇心（SENSEI）、学習進捗の再定式化（Curiosity-Critic、ICL Curiosity）、動画世界モデルのデータ収集（AIM）。
- これらの論文が共通して引用する系譜を遡った。たどった順は Plan2Explore → Disagreement → ICM → Schmidhuber (1990–91) の人工好奇心。物体操作の分岐 CEE-US → SENSEI も追った。
- 1991年の原典（SAB'91、IJCNN'91）は本文に到達できなかった。追記のネットワーク拡張を受けて、Semantic Scholar で OA 版（TUM mediaTUM、Herts UHRA）を探した。リポジトリへの接続はプロキシで拒否され、idsia.ch の著者ページにも到達できなかった。OpenAlex は当日の利用上限に達していた。代わりに、著者自身が1990–2008年を総括した arXiv 論文（0812.4360）を原典枠としてスライド化した。
- InDRiVE は全文を読んだが、手法は Plan2Explore の運転への適用にとどまる。重複を避けるためスライド化しなかった。

### 系譜
```
[原典] Schmidhuber 1990–91 人工好奇心（予測誤差 → 学習進捗）  ※本文未確認、総括 = Compression Progress (2008)
   │
   ├─ 予測誤差型 ──> ICM (2017) ──> Large-Scale Curiosity / RND (2018)
   │                    │
   │                    └─ 確率的環境への対処 ──> Disagreement (2019, アンサンブル分散)
   │                                                 │
   │                       潜在世界モデル内での想像探索 └─> Plan2Explore (2020) ──┬─> CEE-US (2022, 構造化 GNN 世界モデル)
   │                                                                              │        └─> SENSEI (2025, VLM の“面白さ”＋不一致)
   │                                                                              ├─> Enter the Void (2025, 事前分布エントロピー計画)
   │                                                                              └─> InDRiVE (2025, 運転での報酬なし事前学習)
   │
   └─ 学習進捗型 ──────────────────> Curiosity-Critic (2026, 累積誤差改善 = 現在誤差 − ノイズ床)
                                     ICL Curiosity (2026, 文脈内学習器で学習進捗 / BIG を近似)

[傍流] Empowerment (Klyubin 2005) ─────> AIM (2026, 1ステップ・エンパワーメントで動画世界モデルの訓練データを能動収集)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Driven by Compression Progress: A Simple Principle Explains Essential Aspects of Subjective Beauty, Novelty, Surprise, Interestingness, Attention, Curiosity, Creativity, Art, Science, Music, Jokes](https://arxiv.org/abs/0812.4360) | 2008 | arXiv（短縮版は Journal of SICE 2009） | 原典 | 内発的報酬を世界モデル（圧縮器）の圧縮進捗とする一般原理。1990–1997年の実装（予測誤差 → 予測器改善 → KL）も整理している | ✅ p.2 |
| 2 | [Curiosity-driven Exploration by Self-supervised Prediction (ICM)](https://arxiv.org/abs/1705.05363) | 2017 | ICML | 原典 | 逆モデルで学んだ特徴空間での順モデル誤差を好奇心報酬にする。VizDoom、Mario | ✅ p.3 |
| 3 | [Self-Supervised Exploration via Disagreement](https://arxiv.org/abs/1906.04161) | 2019 | ICML | 発展 | 順モデル・アンサンブルの予測分散を報酬にする。確率的環境に頑健で、方策を微分で最適化できる。実ロボットでも検証 | ✅ p.4 |
| 4 | [Planning to Explore via Self-Supervised World Models (Plan2Explore)](https://arxiv.org/abs/2005.05960) | 2020 | ICML | 発展 | Dreamer の潜在空間で latent disagreement を想像上で最大化して探索し、ゼロショット／少数ショットで適応する | ✅ p.5 |
| 5 | [Curious Exploration via Structured World Models Yields Zero-Shot Object Manipulation (CEE-US)](https://arxiv.org/abs/2206.11403) | 2022 | NeurIPS | 発展 | GNN アンサンブルの不一致を iCEM で計画する自由遊び。物体操作をゼロショットで解く | ✅ p.6 |
| 6 | [SENSEI: Semantic Exploration Guided by Foundation Models to Learn Versatile World Models](https://arxiv.org/abs/2503.01584) | 2025 | ICML | 最新 | VLM の“面白さ”選好を蒸留して世界モデルで予測し、不一致と Go-Explore 的に組み合わせる | ✅ p.7 |
| 7 | [Enter the Void: Exploring with High Entropy Plans（arXiv 登録題名: Enter the Void - Planning to Seek Entropy When Reward is Scarce）](https://arxiv.org/abs/2505.16787) | 2025 | arXiv プレプリント（査読中） | 最新 | DreamerV3 の事前分布エントロピーと報酬で想像軌道を選び、推論時に計画する。再計画は PPO メタ方策が決める | ✅ p.8 |
| 8 | [Curiosity-Critic: Cumulative Prediction Error Improvement as a Tractable Intrinsic Reward for World Model Training](https://arxiv.org/abs/2604.18701) | 2026 | ICML 2026 Workshop (EIML) | 最新 | 累積誤差改善を「現在誤差 − 学習した漸近誤差」で近似し、noisy TV を回避する。格子世界で検証 | ✅ p.9 |
| 9 | [Can In-Context Learning Support Intrinsic Curiosity?](https://arxiv.org/abs/2606.19476) | 2026 | arXiv プレプリント | 最新 | ICL 予測器で学習進捗型の報酬 r^sum を計算する。一般 MDP では BIG を不偏推定できないこと、BED 設定では収束することを証明 | ✅ p.10 |
| 10 | [Training Controllable World Models via Action Influence Maximization (AIM)](https://arxiv.org/abs/2610.27387) | 2026 | CoRL | 最新 | 動画世界モデルの制御性はデータの I(A;S'\|S) で上界される。エンパワーメント型の報酬でデータを能動収集し、85倍のデータ効率 | ✅ p.11 |
| 11 | [InDRiVE: Reward-Free World-Model Pretraining for Autonomous Driving via Latent Disagreement](https://arxiv.org/abs/2512.18850) | 2025 | arXiv プレプリント | 最新 | DreamerV3 と latent disagreement による CARLA での報酬なし事前学習。ゼロショット成功率は Town01 で 75.7%、Town02 で 73.2%。全文を読んだが、手法が Plan2Explore の適用のためスライド化しなかった | — 参照のみ |
| 12 | A possibility for implementing curiosity and boredom in model-building neural controllers (Schmidhuber) [DOI](https://doi.org/10.7551/mitpress/3115.003.0030) | 1991 | SAB'91 (MIT Press) | 原典 | 予測誤差を好奇心報酬とする最初期の提案とされる（#1 の総括、および #8 による整理に基づく）。OA 版（mediaTUM）は接続拒否で到達できなかった | ⚠️ 本文未確認 |
| 13 | Curious model-building control systems (Schmidhuber) | 1991 | IJCNN（IEEE） | 原典 | 予測器の改善（学習進捗）を報酬にし、ノイズへの執着を避ける提案とされる（#1 Sec. 3.2 に基づく） | ⚠️ 本文未確認 |
| 14 | Formal Theory of Creativity, Fun, and Intrinsic Motivation (1990–2010) (Schmidhuber) [DOI](https://doi.org/10.1109/TAMD.2010.2056368) | 2010 | IEEE TAMD | 原典 | 圧縮進捗理論の正式なまとめ（ICM などが引用）。出版社サイトにも著者ページにも到達できなかった | ⚠️ 本文未確認 |
| 15 | Reinforcement driven information acquisition in non-deterministic environments (Storck, Hochreiter, Schmidhuber) | 1995 | ICANN | 原典 | 事前・事後分布の KL（Bayesian surprise）を好奇心報酬にする（#1 Sec. 3.3 に基づく） | ⚠️ 本文未確認 |
| 16 | Empowerment: A universal agent-centric measure of control (Klyubin, Polani, Nehaniv) [DOI](https://doi.org/10.1109/CEC.2005.1554676) | 2005 | IEEE CEC | 原典（傍流） | 行動と将来センサのチャネル容量としてエンパワーメントを定義した（#10 が1ステップ版として引用）。OA 版（Herts UHRA）は接続拒否で到達できなかった | ⚠️ 本文未確認 |
| 17 | Intrinsic Motivation Systems for Autonomous Mental Development (Oudeyer, Kaplan, Hafner) [DOI](https://doi.org/10.1109/TEVC.2006.890271) | 2007 | IEEE TEC | 原典（傍流） | 学習進捗に基づく IAC。発達ロボティクスにおける学習進捗型の代表とされる | ⚠️ 本文未確認 |
| 18 | [Keep your options open: an information-based driving principle for sensorimotor systems (Klyubin+)](https://doi.org/10.1371/journal.pone.0004018) | 2008 | PLoS ONE | 発展（傍流） | エンパワーメントの OA 論文。到達できることは確認したが、本テーマの主系譜外のため精読していない | — 参照のみ |
| 19 | [Incentivizing Exploration in RL with Deep Predictive Models](https://arxiv.org/abs/1507.00814) | 2015 | arXiv（NIPS WS） | 発展 | オートエンコーダ特徴空間の予測誤差ボーナス。ICM が比較対象として言及 | — 参照のみ |
| 20 | [VIME: Variational Information Maximizing Exploration](https://arxiv.org/abs/1605.09674) | 2016 | NIPS | 発展 | BNN 動力学モデルの情報利得を報酬にする。ICM の比較対象 | — 参照のみ |
| 21 | [Planning to Be Surprised: Optimal Bayesian Exploration in Dynamic Environments](https://arxiv.org/abs/1103.5708) | 2011 | AGI | 発展 | 情報利得を計画で最大化する理論。Plan2Explore と ICL Curiosity が引用 | — 参照のみ |
| 22 | [Surprise-Based Intrinsic Motivation for Deep RL](https://arxiv.org/abs/1703.01732) | 2017 | NIPS WS | 発展 | 驚き（surprisal）型の報酬 | — 参照のみ |
| 23 | [Learning to Play with Intrinsically-Motivated Self-Aware Agents](https://arxiv.org/abs/1802.07442) | 2018 | NeurIPS | 発展 | 世界モデルの損失を予測する好奇心。CEE-US が言及 | — 参照のみ |
| 24 | [Large-Scale Study of Curiosity-Driven Learning](https://arxiv.org/abs/1808.04355) | 2018 | ICLR 2019 | 発展 | 予測誤差型好奇心の大規模比較と、noisy TV 問題の指摘 | — 参照のみ |
| 25 | [Exploration by Random Network Distillation (RND)](https://arxiv.org/abs/1810.12894) | 2018 | ICLR 2019 | 発展 | ランダム固定ネットの蒸留誤差を新規性にする。世界モデルを使わない対照手法 | — 参照のみ |
| 26 | [Model-Based Active Exploration (MAX)](https://arxiv.org/abs/1810.12162) | 2019 | ICML | 発展 | アンサンブルで新規性を計画する（低次元状態）。Plan2Explore の比較対象 | — 参照のみ |
| 27 | [Discovering and Achieving Goals via World Models (LEXA)](https://arxiv.org/abs/2110.09514) | 2021 | NeurIPS | 発展 | Plan2Explore 型の探索とゴール到達を世界モデル内で学習する | — 参照のみ |
| 28 | [URLB: Unsupervised Reinforcement Learning Benchmark](https://arxiv.org/abs/2110.15191) | 2021 | NeurIPS D&B | 発展 | 教師なし RL ベンチマーク（CEE-US はこの実装を基準に使用） | — 参照のみ |
| 29 | [Mastering Diverse Domains through World Models (DreamerV3)](https://arxiv.org/abs/2301.04104) | 2023 | arXiv / Nature 2025 | 発展 | SENSEI、Enter the Void、InDRiVE の基盤エージェント | — 参照のみ |
| 30 | [Curious Replay for Model-based Adaptation](https://arxiv.org/abs/2306.15934) | 2023 | ICML | 発展 | 好奇心で世界モデルのリプレイを優先づけする | — 参照のみ |
| 31 | [Motif: Intrinsic Motivation from Artificial Intelligence Feedback](https://arxiv.org/abs/2310.00166) | 2023 | ICLR 2024 | 発展 | LLM の選好から内発的報酬を蒸留する（SENSEI の蒸留部分の基礎） | — 参照のみ |
| 32 | [World Model Agents with Change-Based Intrinsic Motivation](https://arxiv.org/abs/2503.21047) | 2025 | NLDL 2025 投稿 | 最新 | CBET を DreamerV3 に適用。Crafter、Minigrid で効果は限定的 | — 参照のみ |
| 33 | [From Curiosity to Competence: How World Models Interact with the Dynamics of Exploration](https://arxiv.org/abs/2507.08210) | 2025 | arXiv | 最新 | Dreamer で好奇心（情報利得）とエンパワーメントの相互作用を分析 | — 参照のみ |
| 34 | [DreamerV3-XP: Optimizing exploration through uncertainty estimation](https://arxiv.org/abs/2510.21418) | 2025 | arXiv | 最新 | 世界モデル・アンサンブルの報酬予測不一致と優先リプレイを追加 | — 参照のみ |
| 35 | [WorldLLM: Improving LLMs' world modeling using curiosity-driven theory-making](https://arxiv.org/abs/2506.06725) | 2025 | arXiv | 最新 | LLM の世界モデリングを好奇心駆動の仮説生成で改善 | — 参照のみ |
| 36 | [Optimistic World Models](https://arxiv.org/abs/2602.10044) | 2026 | arXiv | 最新 | 楽観的な動力学損失による探索（DreamerV3、STORM）。内発的報酬を使わない対照的アプローチ | — 参照のみ |
| 37 | [Remember to be Curious: Episodic Context and Persistent Worlds for 3D Exploration](https://arxiv.org/abs/2605.22814) | 2026 | arXiv | 最新 | オンライン 3D 再構成を持続的な世界モデルとする好奇心探索 | — 参照のみ |
| 38 | [Learning to See through Action: Predictive Curiosity for Robots (DySCOVER)](https://arxiv.org/abs/2610.14302) | 2026 | arXiv | 最新 | 再構成誤差と世界モデルの予測誤差でロボットが能動的に視覚学習する | — 参照のみ |
| 39 | [CURIO: Curiosity-Driven Test-Time Learning for Open-Ended Discovery](https://arxiv.org/abs/2610.04851) | 2026 | arXiv | 最新 | LLM の隠れ状態上の Intrinsic Curiosity World Model による予測誤差ボーナス | — 参照のみ |
| 40 | [Second Thoughts: Exploring and Planning through Comparative Imagination in World Models (SDI)](https://arxiv.org/abs/2610.28779) | 2026 | arXiv | 最新 | アンサンブル不要の想像比較による探索信号 | — 参照のみ |
| 41 | [Hallucination in World Models is Predictable and Preventable](https://arxiv.org/abs/2606.27326) | 2026 | arXiv | 最新 | 予測不安定性を好奇心として能動収集する（AIM が同時期の研究として言及） | — 参照のみ |
| 42 | [Deep Learning: Our Miraculous Year 1990-1991](https://arxiv.org/abs/2005.05744) | 2020 | arXiv | 原典（回顧） | Schmidhuber による1990–91年研究の回顧（人工好奇心を含む） | — 参照のみ |
