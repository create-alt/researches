# 世界モデル — 先行研究調査

環境のダイナミクスを学習した内部モデル（世界モデル）を、探索・計画・表現学習に使う研究の系譜をまとめる。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/ochiai/`）は main ブランチから引き継いでいる。

## テーマ一覧

| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- | --- |
| 第1回 | [内発的報酬](#intrinsic-reward) | 世界モデルの予測誤差・不確実性・学習進捗を内発的報酬にした探索と教師なし事前学習 | [pptx](intrinsic-reward/intrinsic-reward.pptx) / [pdf](intrinsic-reward/intrinsic-reward.pdf) | 10 本 | 42 本 | 2026-10-23 |
| 第1回 | [階層化](#hierarchical) | 時間・抽象度の階層を持つ世界モデルと、その上での階層的計画 | [pptx](hierarchical/hierarchical.pptx) / [pdf](hierarchical/hierarchical.pdf) | 10 本 | 27 本 | 2026-10-23 |
| 第2回 | [JEPA 系の非生成型潜在世界モデル](#jepa) | VICReg・I-JEPA から DINO-WM・PLDM・V-JEPA 2・LeJEPA・LeWM まで、画素を再構成しない潜在世界モデルの基盤 | [pptx](jepa/jepa.pptx) / [pdf](jepa/jepa.pdf) | 10 本 | 38 本 | 2026-10-23 |
| 第2回 | [潜在空間での計画と分布外への逸脱](#latent-planning) | PETS・PlaNet・TD-MPC・Diffuser から、学習済み世界モデル上の勾配計画・モデル誤差の悪用対策まで | [pptx](latent-planning/latent-planning.pptx) / [pdf](latent-planning/latent-planning.pdf) | 10 本 | 32 本 | 2026-10-23 |
| 第2回 | [動画・基盤世界モデルの能動データ収集と意味的好奇心](#foundation-world-model) | LLM による好奇心（ELLM, Motif）と、Genie・Dreamer 4・Ctrl-World などの基盤世界モデルの訓練データ設計 | [pptx](foundation-world-model/foundation-world-model.pptx) / [pdf](foundation-world-model/foundation-world-model.pdf) | 10 本 | 31 本 | 2026-10-23 |

合計：スライド化 50 本、引用論文一覧 170 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-23 | 第1回調査。「内発的報酬」、「階層化」 の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版（OpenReview・学会予稿集・OA 誌など）で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典は ⚠️ 本文未確認として一覧に記載。 |
| 2026-10-23 | 第2回調査。第1回の推奨テーマ 「JEPA 系の非生成型潜在世界モデル」、「潜在空間での計画と分布外への逸脱」、「動画・基盤世界モデルの能動データ収集と意味的好奇心」 を追加調査。既存デッキでスライド化済みの論文は再掲せず、一覧で `↪ 既存：<theme> p.N` として参照。同じ回の別テーマで同じ論文を別の観点からスライド化した例が一部ある。 |

## 追加調査を推奨するテーマ

第2回までの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。

1. **世界モデルの評価・診断指標（予測誤差と計画成功率・制御性のずれ）**  
   第2回の3テーマすべてで「予測誤差や画素忠実度が良くても計画に効かない」「評価条件で成功率が大きく変わる（LeWM の再現研究）」「生成的世界モデルの幻覚・制御性の測り方が定まらない」という同じ問題が出た。計画を見据えた診断指標、幻覚検出、ベンチマークの設計を横断して調べる価値が最も高い。

2. **確率的・多峰な未来を扱う潜在世界モデル**  
   JEPA 系の多くは決定論的な予測器で、多峰な未来を平均化してしまう。潜在変数付き JEPA、潜在拡散・flow matching による予測（LeFlow など）、不確実性を計画に使う手法を、生成型（Dreamer 系）との比較を含めて整理するとよい。

3. **行動ラベルのない動画からの潜在行動学習と、世界モデル内での方策後学習**  
   Genie 以来の潜在行動学習、基盤世界モデルの中での RL・合成データによる方策学習、そこで起こる報酬ハッキングと保守性（オフライン MBRL の不確実性罰則）を、データ収集テーマの続きとして追う。

<details><summary>第1回の推奨テーマ（第2回で調査済み）</summary>

- JEPA 系の非生成型（予測型）潜在世界モデルの基盤 → [JEPA 系の非生成型潜在世界モデル](#jepa)
- 潜在空間での計画・探索アルゴリズムと分布外への逸脱 → [潜在空間での計画と分布外への逸脱](#latent-planning)
- 動画・基盤世界モデルの能動データ収集と意味的好奇心 → [動画・基盤世界モデルの能動データ収集と意味的好奇心](#foundation-world-model)

</details>

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は同じ分野の既存デッキでスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。

---

<a id="intrinsic-reward"></a>

## 内発的報酬（intrinsic-reward/）

資料：[intrinsic-reward.pptx](intrinsic-reward/intrinsic-reward.pptx) ／ [intrinsic-reward.pdf](intrinsic-reward/intrinsic-reward.pdf) ／ 生成元 [spec.json](intrinsic-reward/spec.json)


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

---

<a id="hierarchical"></a>

## 階層化（hierarchical/）

資料：[hierarchical.pptx](hierarchical/hierarchical.pptx) ／ [hierarchical.pdf](hierarchical/hierarchical.pdf) ／ 生成元 [spec.json](hierarchical/spec.json)


### 調査履歴
- 2026-10-23: arXiv API で "hierarchical world model" / "temporal abstraction" + "world model" / "hierarchical JEPA" / "multi-timescale" を新着順に検索し、2026年の最新動向（HWM → H-JEPA、Hi-LeWM、Orbis 2、MHWA ほか）を把握した。そこから遡り、(a) 多時間スケール潜在ダイナミクスの系譜（Clockwork RNN → VTA → CW-VAE → MTS3）、(b) 世界モデル上のサブゴール計画の系譜（Director → HIEROS）、(c) LeCun の H-JEPA 構想から JEPA 系潜在世界モデルの階層 MPC へ至る系譜（H-JEPA 構想 → Puppeteer → HWM → H-JEPA / Hi-LeWM）を追った。
- 2026-10-23（ネットワーク拡張後）: 本文未確認だった LeCun (2022) と THICK (ICLR 2024) の正規公開版を OpenReview・ICLR proceedings・テュービンゲン大学リポジトリ・MPI-IS のページで探したが、OpenReview はチャレンジ認証（403）、その他は接続不可だった。OpenAlex と Semantic Scholar はレート制限で使えなかった。代わりに arXiv にある Dawid & LeCun (2023) の講義ノート（H-JEPA の節を含む）を全文読んでスライド化した。

### 系譜
```
[多時間スケール潜在ダイナミクス]
Clockwork RNN (2014) ─┐
TD-VAE (2018) ────────┼→ VTA (2019) → CW-VAE (2021) ──→ MTS3 (2023) ──→ Orbis 2 (2026, 運転映像・抽象度×時間)
                      │                    └────────────────────────────↗
[世界モデル上のサブゴール計画]
World Models (2018) → PlaNet/Dreamer → Director (2022) ──→ HIEROS (2023, 3階層・S5WM)
GateL0RD (2021) → THICK (2024, 適応的時間抽象) ※本文未確認
[H-JEPA 構想 → JEPA 系潜在世界モデルの階層 MPC]
LeCun "A Path Towards AMI" (2022) ※本文未確認 ─ Dawid & LeCun 講義ノート (2023)
   ├→ Puppeteer (2024, TD-MPC2 の2階層・抽象度の階層)
   └→ HWM (2026, 共有潜在空間の多時間スケール MPC)
          ├→ H-JEPA (2026, 階層ごとに独自の潜在空間・end-to-end)
          ├→ Hi-LeWM / Mind the Gap (2026, 後付け階層の限界分析)
          └→ Metro-WM, 凍結 HWM 上のサブゴール学習 (2026)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Clockwork Variational Autoencoders](https://arxiv.org/abs/2102.09532) | 2021 | arXiv | 原典 | 上位ほど遅いクロックで遷移する階層潜在系列による長期動画予測。時間的抽象化の効果を4データセットで実証。 | ✅ p.2 |
| 2 | [Deep Hierarchical Planning from Pixels (Director)](https://arxiv.org/abs/2206.04114) | 2022 | NeurIPS | 原典 | 世界モデルの潜在空間で manager が離散コード化した潜在ゴールを選び worker が追う。疎報酬の一人称 Ant Maze を解く。 | ✅ p.3 |
| 3 | [Introduction to Latent Variable Energy-Based Models: A Path Towards Autonomous Machine Intelligence](https://arxiv.org/abs/2306.02572) | 2023 | J. Stat. Mech. 2024 | 原典 | LeCun (2022) の講義ノート。EBM・JEPA を解説し、短期の JEPA-1 と長期の JEPA-2 を積む H-JEPA 構想を図示（実験なし）。 | ✅ p.4 |
| 4 | [Multi Time Scale World Models (MTS3)](https://arxiv.org/abs/2310.18534) | 2023 | NeurIPS | 発展 | 遅いタスク潜在が速い状態ダイナミクスを条件付ける2階層の確率的状態空間モデル。閉形式推論で長期予測と不確実性推定。 | ✅ p.5 |
| 5 | [Hieros: Hierarchical Imagination on Structured State Space Sequence World Models](https://arxiv.org/abs/2310.05167) | 2023 | arXiv | 発展 | 各階層が S5 世界モデルと actor-critic を持つ3階層のサブゴール型エージェント。Atari100k で平均・中央値の SOTA。 | ✅ p.6 |
| 6 | [Hierarchical World Models as Visual Whole-Body Humanoid Controllers (Puppeteer)](https://arxiv.org/abs/2405.18418) | 2024 | ICLR 2025 | 発展 | MoCap 追従の低位 TD-MPC2 と視覚から参照動作を出す高位を積む階層世界モデル。56自由度ヒューマノイドで自然な動作。 | ✅ p.7 |
| 7 | [Hierarchical Planning with Latent World Models (HWM)](https://arxiv.org/abs/2604.03208) | 2026 | CoRL | 最新 | 共有潜在空間で複数時間スケールの JEPA 系世界モデルを学習し、上位予測を下位 MPC のサブゴールにする。Franka P&P 70%。 | ✅ p.8 |
| 8 | [Mind the Gap: Promises and Pitfalls of Hierarchical Planning in LeWorldModel](https://arxiv.org/abs/2607.12547) | 2026 | WM@Booth ワークショップ | 最新 | 凍結 LeWM に上位を後付けした Hi-LeWM の分析。上位 CEM の分布外探索が失敗要因で、データ由来マクロ行動に制約すると改善。 | ✅ p.9 |
| 9 | [Orbis 2: A Hierarchical World Model for Driving](https://arxiv.org/abs/2607.15898) | 2026 | arXiv | 最新 | 抽象（圧縮 DINO, 2Hz）と詳細（10Hz）の2階層予測器による運転世界モデル。長期安定性と表現品質で SOTA。 | ✅ p.10 |
| 10 | [H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning](https://arxiv.org/abs/2610.06805) | 2026 | arXiv | 最新 | 階層ごとに独自の潜在空間を持つ行動条件付き JEPA を end-to-end 学習。AntMaze で平坦 18% → 3階層 73%。 | ✅ p.11 |
| 11 | [A Path Towards Autonomous Machine Intelligence](https://openreview.net/forum?id=BZ5a1r-kVsf) (LeCun) | 2022 | OpenReview（ポジションペーパー v0.9.2） | 原典 | 構成器・知覚・世界モデル・コスト・行為者・短期記憶からなる自律知能アーキテクチャを提案し、多階層・多時間スケールの予測と階層計画を担う H-JEPA を中核に据える（検索情報と #3 の講義ノートに基づく）。 | ⚠️ 本文未確認 |
| 12 | Learning Hierarchical World Models with Adaptive Temporal Abstractions from Discrete Latent Dynamics (THICK) ([OpenReview](https://openreview.net/forum?id=TjCDNssXKU)) | 2024 | ICLR | 発展 | Gumbsch, Sajid, Martius, Butz。下位は潜在の一部を疎にしか更新せず（不変な文脈）、上位は文脈が変わる場面だけを予測する2階層世界モデル。適応的な時間抽象化で MBRL と計画を改善（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 13 | [World Models](https://arxiv.org/abs/1803.10122) | 2018 | NeurIPS 2018（関連版） | 原典 | V（VAE）・M（MDN-RNN）・C の構成で、世界モデルの「夢」の中で方策を学ぶ。世界モデル概念の原典だが単一時間スケールで階層は持たない。 | — 参照のみ（非階層のため） |
| 14 | [A Clockwork RNN](https://arxiv.org/abs/1402.3511) | 2014 | ICML | 原典 | RNN の隠れ層をモジュールに分け異なる周期で更新する。CW-VAE の固定クロックの発想源。 | — 参照のみ（世界モデルではない） |
| 15 | [Temporal Difference Variational Auto-Encoder](https://arxiv.org/abs/1806.03107) | 2018 | ICLR 2019 | 原典 | 信念状態からの跳躍予測（jumpy prediction）を学ぶ系列生成モデル。階層は持たない。 | — 参照のみ（CW-VAE で言及） |
| 16 | [Variational Temporal Abstraction (VTA)](https://arxiv.org/abs/1910.00775) | 2019 | NeurIPS | 発展 | 下位が上位の遷移時刻を決める2階層の状態空間モデルで jumpy imagination を行う。CW-VAE の主要比較対象。 | — 参照のみ（CW-VAE で比較） |
| 17 | [Sparsely Changing Latent States for Prediction and Planning (GateL0RD)](https://arxiv.org/abs/2110.15949) | 2021 | NeurIPS | 発展 | 潜在状態の更新に L0 ペナルティを課し疎に変化させる RNN。THICK の下位層の基盤。 | — 参照のみ（THICK の前身） |
| 18 | [Forecaster: Towards Temporally Abstract Tree-Search Planning from Pixels](https://arxiv.org/abs/2310.09997) | 2023 | arXiv | 発展 | 時間的に抽象化した世界モデル上で高位ゴールの木探索を行う階層RL。 | — 参照のみ（小規模検証） |
| 19 | [Learning World Models With Hierarchical Temporal Abstractions: A Probabilistic Perspective](https://arxiv.org/abs/2404.16078) | 2024 | 博士論文（KIT） | 発展 | MTS3 著者の博士論文。多時間スケール確率的世界モデルの体系化。 | — 参照のみ（MTS3 と重複） |
| 20 | [Exploring the limits of Hierarchical World Models in Reinforcement Learning](https://arxiv.org/abs/2406.00483) | 2024 | arXiv | 発展 | 静的・環境非依存の時間抽象で階層世界モデルとゴール提案エージェントを学習し、HMBRL の限界を評価。 | — 参照のみ（概要確認のみ） |
| 21 | [Simple Hierarchical Planning with Diffusion](https://arxiv.org/abs/2401.02644) | 2024 | arXiv | 発展 | 上位で jumpy に拡散計画し下位で詰める Hierarchical Diffuser。世界モデル型ではなく軌道生成型。 | — 参照のみ（周辺領域） |
| 22 | [LeWorldModel](https://arxiv.org/abs/2603.19312) | 2026 | arXiv | 発展 | 2項の損失（次埋め込み予測＋SIGReg）だけで画素から安定に end-to-end 学習する JEPA 世界モデル。H-JEPA・Hi-LeWM の第1層。 | — 参照のみ（非階層の基盤） |
| 23 | [Compositional Planning with Jumpy World Models](https://arxiv.org/abs/2602.19634) | 2026 | arXiv | 最新 | 事前学習方策が誘導する多時間スケールの状態占有を TD Flow で学ぶ jumpy world model により方策の合成を計画。 | — 参照のみ（方策合成寄り） |
| 24 | [FF-JEPA: Long-Horizon Planning in World Models with Latent Planners](https://arxiv.org/abs/2606.09311) | 2026 | arXiv | 最新 | 行動なしの潜在プランナーが次のサブゴールを予測し、行動条件付き予測器と組み合わせて目標画像なしで長期計画。 | — 参照のみ（概要確認のみ） |
| 25 | [Metro-WM: Long-Horizon Latent Planning with Realisable Sub-Goals](https://arxiv.org/abs/2609.31868) | 2026 | arXiv | 最新 | 生成した潜在サブゴールは物理的に実現不能になりがちと指摘し、経験から実在の状態をグラフ検索してサブゴールにする。 | — 参照のみ（Hi-LeWM と論点が重複） |
| 26 | [Learning Goal-Conditioned Subgoals through Frozen Hierarchical World Models](https://arxiv.org/abs/2610.26179) | 2026 | arXiv | 最新 | H-JEPA 配布の HWM チェックポイント上で、上位の候補最適化を軽量なゴール条件付きネットワークに置き換える。 | — 参照のみ（直近・小規模） |
| 27 | [MHWA: Multi-timescale Hierarchical World-Action Model](https://arxiv.org/abs/2610.14727) | 2026 | arXiv | 最新 | ストライド付き高位文脈チャネルと文脈依存の専門家混合で自己回帰世界モデルのドリフトを抑える。 | — 参照のみ（概要確認のみ） |

---

<a id="jepa"></a>

## JEPA 系の非生成型潜在世界モデル（jepa/）

資料：[jepa.pptx](jepa/jepa.pptx) ／ [jepa.pdf](jepa/jepa.pdf) ／ 生成元 [spec.json](jepa/spec.json)


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

---

<a id="latent-planning"></a>

## 潜在空間での計画と分布外への逸脱（latent-planning/）

資料：[latent-planning.pptx](latent-planning/latent-planning.pptx) ／ [latent-planning.pdf](latent-planning/latent-planning.pdf) ／ 生成元 [spec.json](latent-planning/spec.json)


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

---

<a id="foundation-world-model"></a>

## 動画・基盤世界モデルの能動データ収集と意味的好奇心（foundation-world-model/）

資料：[foundation-world-model.pptx](foundation-world-model/foundation-world-model.pptx) ／ [foundation-world-model.pdf](foundation-world-model/foundation-world-model.pdf) ／ 生成元 [spec.json](foundation-world-model/spec.json)


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
