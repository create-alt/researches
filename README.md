# 世界モデル — 先行研究調査

環境のダイナミクスを学習した内部モデル（世界モデル）を、探索・計画・表現学習に使う研究の系譜をまとめる。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/ochiai/`）は main ブランチから引き継いでいる。

## テーマ一覧

| テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- |
| [内発的報酬](#intrinsic-reward) | 世界モデルの予測誤差・不確実性・学習進捗を内発的報酬にした探索と教師なし事前学習 | [pptx](intrinsic-reward/intrinsic-reward.pptx) / [pdf](intrinsic-reward/intrinsic-reward.pdf) | 10 本 | 42 本 | 2026-10-23 |
| [階層化](#hierarchical) | 時間・抽象度の階層を持つ世界モデルと、その上での階層的計画 | [pptx](hierarchical/hierarchical.pptx) / [pdf](hierarchical/hierarchical.pdf) | 10 本 | 27 本 | 2026-10-23 |

合計：スライド化 20 本、引用論文一覧 69 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-23 | 初回調査。「内発的報酬」、「階層化」 の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版（OpenReview・学会予稿集・OA 誌など）で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典は ⚠️ 本文未確認として一覧に記載。 |

## 追加調査を推奨するテーマ

全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾にはテーマ単位の候補もある。

1. **JEPA 系の非生成型（予測型）潜在世界モデルの基盤**  
   階層化の最新論文（HWM, H-JEPA, Hi-LeWM）は、どれも LeWM・PLDM・DINO-WM・V-JEPA 2 を第1層に使っている。崩壊を防ぐ手法（SIGReg, VICReg）と表現の質が上位の計画性能を決めているため、土台を独立テーマとして押さえる価値が高い。内発的報酬の「何を予測誤差とするか」にも直結する。代表：LeWorldModel (2026), LeJEPA (2025), V-JEPA 2 (2025), DINO-WM (2024)。

2. **潜在空間での計画・探索アルゴリズムと分布外への逸脱**  
   Hi-LeWM と Metro-WM は「階層化の失敗は上位探索が学習分布の外に出ることから来る」と示した。Enter the Void は計画時のエントロピー最大化で Plan2Explore を上回ったと主張している。CEM・MPPI・勾配法と、償却化したサブゴール生成を横並びで比べると、両テーマの論点（探索とモデル誤差の悪用）をまとめて整理できる。

3. **動画・基盤世界モデルの能動データ収集と意味的好奇心**  
   AIM (2026) では、内発的報酬の使い道が「エージェントの探索」から「大規模動画世界モデルの訓練データ設計」へ移りつつある。SENSEI (2025) は VLM による「面白さ」の事前知識の導入を示した。DreamerV4、Ctrl-World、PlayWorld などの生成的世界モデルの制御性・忠実性の評価と合わせて追う価値がある。

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
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
