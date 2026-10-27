## 深層能動的推論と世界モデル（deep-active-inference/）

### 調査履歴
- 2026-10-24: `candidates/active-inference.md` の AXIOM・DAIF・Fujii & Murata を出発点にした。arXiv API で「deep active inference」「expected free energy」「active inference × world model / Dreamer / reinforcement learning」を新しい順に検索し、2025〜2026年の動向を確認した。見つかったのは、EFE の後悔理論（What Information Buys）、EFE を計画の計算量制御に使う研究、凸 MDP としての定式化など。
- 「EFE は RL＋内発的報酬に対して本当に優位か」を軸に、各論文の RL 比較と認識的価値のアブレーションを中心に読んだ。系譜は AXIOM・DAIF・R-AIF が共通して引く Fountas 2020 → Millidge 2020 / Tschantz 2020 → Ueltzhöffer 2018 → Friston 2015 と遡った。追試・批判の系統として Champion+ (2024) も加えた。
- 原典の Friston+ (2015) "Active inference and epistemic value" と Friston (2010) は、OpenAlex では closed。UCL Discovery・UEA などのリポジトリにもプロキシで到達できず、本文未確認とした。
- 同分野の別担当（hierarchical-generative-models / epistemic-agents）とは、Fujii & Murata (2025) が階層テーマとも重なりうる。本デッキでは「実機で EFE を計算可能にした」観点で扱った。
- 本文を読んだ論文の数値は、すべて本文中の表・図から取った。「参照のみ」の論文はアブストラクトまたは書誌情報だけを確認した。

### 系譜
```
[原典] Friston 2010 FEP / Friston+ 2015 EFE = 外在的価値＋認識的価値   ※本文未確認
   │
   └─> Deep AIF (Ueltzhöffer 2018: 生成・推論・行動を NN 化、進化戦略で VFE 最小化)
          │
          ├─> DAIVPG (Millidge 2020: EFE を TD で償却 ≒ 最大エントロピー方策勾配。認識的価値は効かず)
          │      └─> DAIF (Akgül+ 2026, ICML: AIF を分布型 RL として実装、遷移モデル不要)
          │             └─> What Information Buys (Kandemir+ 2026: 情報利得 vs 信頼幅の後悔理論)
          ├─> FEEF (Tschantz+ 2020: アンサンブル情報利得＋CEM。疎報酬 Mountain Car でのみ明確な差)
          │      └─> AXIOM (Heins+ 2025: 物体中心ベイズ混合モデル＋EFE、Gameworld 10k で DreamerV3/BBF 超え)
          └─> DAIMC (Fountas+ 2020: EFE 全項を MC 推定＋MCTS＋習慣ネット)
                 ├─> Contrastive AIF (Mazzaglia+ 2021: 対照学習で再構成なし、Dreamer と比較)
                 │      └─> R-AIF (Nguyen+ 2025, ICRA: 学習した選好＋EFE actor-critic、DreamerV3 と比較)
                 ├─> Deconstructing DAI (Champion+ 2024: 再検証。解けたのは報酬最大化版だけ)
                 └─> Fujii & Murata 2025 (RA-L: 時間階層世界モデル＋VQ 抽象行動で実機 EFE)
                        └─> Yokozawa+ 2025 (拡散方策＋MTRSSM で実環境ナビゲーション)
```

**軸「EFE は RL＋内発的報酬より優位か」の整理**
- 認識的価値が効いたのは、方向付きの探索が必要な課題（疎報酬の Mountain Car、AXIOM の Bounce、蓋を開けて確かめる場面）に限られる。単純な制御では効かず（DAIVPG、FEEF の Cup Catch）、負の報酬がある課題では逆効果のこともある（AXIOM の Gold・Cross、Champion）。
- DreamerV3/BBF に勝った報告（AXIOM、R-AIF）の主な勝因は、EFE の情報利得ではなかった。AXIOM は物体中心のコア事前分布、R-AIF は専門家データ由来の選好。DAIF は「状態抽象による計算効率」に AIF の利点を置き直している。
- 理論面では、生の情報利得は信頼幅として減衰が速すぎて線形後悔を招く。√ で較正しても、報酬が固定なら Bayes-UCBVI 以下。報酬・目標がエージェントのデータから選ばれる（自己目標・恒常性の設定点が動く）条件でのみ優位になる（What Information Buys）。

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [The free-energy principle: a unified brain theory?](https://doi.org/10.1038/nrn2787) | 2010 | Nature Reviews Neuroscience | 原典 | 知覚・学習・注意を変分自由エネルギー最小化として統一的に説明した FEP の代表的レビュー（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 2 | [Active inference and epistemic value](https://doi.org/10.1080/17588928.2015.1020053) | 2015 | Cognitive Neuroscience | 原典 | EFE を認識的価値（情報利得）＋外在的価値に分解し、好奇心・探索が原理から出ることを示した（検索情報・引用文献に基づく）。OA 版に到達できず。 | ⚠️ 本文未確認 |
| 3 | [Deep Active Inference](https://arxiv.org/abs/1709.02341) | 2018 | Biological Cybernetics | 原典 | 生成・推論・行動を NN 化し、進化戦略で VFE を最小化して Mountain Car を解いた最初の深層 AIF。 | ✅ p.2 |
| 4 | [Deep Active Inference as Variational Policy Gradients](https://arxiv.org/abs/1907.03876) | 2020 | J. Math. Psychol. | 発展 | EFE を TD で償却する深層 AIF。最大エントロピー方策勾配との対応を示し、認識的価値の効果はほぼないと報告。 | ✅ p.3 |
| 5 | [Reinforcement Learning through Active Inference](https://arxiv.org/abs/2002.12636) | 2020 | ICLR 2020 Workshop (BAICS) | 発展 | FEEF を目的にしたアンサンブル＋CEM のモデルベース RL。疎報酬・報酬なしで探索の効果を示した。 | ✅ p.4 |
| 6 | [Deep active inference agents using Monte-Carlo methods](https://arxiv.org/abs/2006.04176) | 2020 | NeurIPS 2020 | 発展 | EFE 全項を MC 推定し、MCTS と習慣ネットで計画する深層 AIF。dSprites と Animal-AI で評価。 | ✅ p.5 |
| 7 | [Contrastive Active Inference](https://arxiv.org/abs/2110.10083) | 2021 | NeurIPS 2021 | 発展 | 自由エネルギーと EFE を NCE で置き換え、再構成なしで目標画像に到達。Dreamer と比較。 | ✅ p.6 |
| 8 | [Deconstructing deep active inference](https://arxiv.org/abs/2303.01618) | 2024 | Neural Computation（arXiv 2023） | 発展 | 深層 AIF 8実装を再検証し段階的に再構築。dSprites を解けたのは報酬最大化版だけで、EFE 版は退化した。 | ✅ p.7 |
| 9 | [R-AIF: Solving Sparse-Reward Robotic Tasks from Pixels with Active Inference and World Models](https://arxiv.org/abs/2409.14216) | 2025 | ICRA 2025（題は SR-AIF） | 発展 | 専門家データから選好状態を対照学習で生成し、EFE を actor-critic で最小化。Meta-World・robosuite で DreamerV3 と比較。 | ✅ p.8 |
| 10 | [AXIOM: Learning to Play Games in Minutes with Expanding Object-Centric Models](https://arxiv.org/abs/2505.24784) | 2025 | arXiv プレプリント | 最新 | 勾配を使わない物体中心ベイズ混合モデル＋EFE 計画。Gameworld 10k で BBF・DreamerV3 を上回る。 | ✅ p.9 |
| 11 | [Real-World Robot Control by Deep Active Inference With a Temporally Hierarchical World Model](https://arxiv.org/abs/2512.01924) | 2025 | IEEE RA-L | 最新 | 時間階層 RSSM＋VQ 抽象行動＋抽象世界モデルで、実機の EFE 評価を 2.37 ms に短縮。 | ✅ p.10 |
| 12 | [Distributional Active Inference](https://arxiv.org/abs/2601.20985) | 2026 | ICML 2026 | 最新 | AIF を push-forward RL として分布型 RL に埋め込み、遷移モデルなしで19環境の SOTA を更新。 | ✅ p.11 |
| 13 | [What Information Buys in Active Inference](https://arxiv.org/abs/2610.19046) | 2026 | arXiv プレプリント | 最新 | AIF の情報利得と Bayes-UCBVI の信頼幅を後悔で比較。較正した情報利得は目標が適応的なときだけ有利。 | ✅ p.12 |
| 14 | [Whence the Expected Free Energy?](https://arxiv.org/abs/2004.08128) | 2021 | Neural Computation | 発展 | EFE は「未来の自由エネルギー」そのものではなく、自然な拡張はむしろ探索を抑えると示し、FEEF を提案（アブストラクトのみ確認）。図のない理論論文で、論点は p.3–4・p.12 に反映。 | — 参照のみ |
| 15 | [Active Inference: Demystified and Compared](https://arxiv.org/abs/1909.10863) | 2021 | Neural Computation | 発展 | 離散 AIF と Q 学習・ベイズモデルベース RL を OpenAI Gym の離散環境で比較し、報酬なしでも選好学習で行動できると示した（アブストラクトのみ確認）。離散状態のためスライド化せず。 | — 参照のみ |
| 16 | [The Free Energy Principle for Perception and Action: A Deep Learning Perspective](https://arxiv.org/abs/2207.06415) | 2022 | Entropy | 発展 | 深層学習の観点から FEP/AIF を整理した総説（アブストラクトのみ確認）。総説のためスライド化せず。 | — 参照のみ |
| 17 | [Deep Active Inference with Diffusion Policy and Multiple Timescale World Model for Real-World Exploration and Navigation](https://arxiv.org/abs/2510.23258) | 2025 | arXiv プレプリント | 最新 | 拡散方策で候補行動を生成し、MTRSSM で EFE を評価する実環境ナビゲーション（アブストラクトのみ確認）。Fujii & Murata の続編のため省略。 | — 参照のみ |
| 18 | [Deep Active Inference Agents for Delayed and Long-Horizon Environments](https://arxiv.org/abs/2505.19867) | 2025 | arXiv プレプリント | 最新 | 多段潜在遷移と EFE 勾配を受ける方策網で、遅延・長期の産業シナリオを制御（アブストラクトのみ確認）。 | — 参照のみ |
| 19 | [Knowing When to Stop Thinking: A Dissection of Expected Free Energy as a Test-Time Compute Controller for Latent World-Model Planning](https://arxiv.org/abs/2610.28011) | 2026 | arXiv プレプリント | 最新 | EFE 風の目的を潜在世界モデル計画の計算量制御に使う分析。凍結モデルでは不一致報酬が成功率を下げる（アブストラクトのみ確認）。 | — 参照のみ |
| 20 | [Principled Direction-Free Intrinsic Motivation through Model-Free Epistemic Free-Energy Estimators](https://arxiv.org/abs/2607.16858) | 2026 | IWAI 2026 | 最新 | 選好なし EFE の novelty 項から、モデルフリーの内発的報酬を導く（アブストラクトのみ確認）。 | — 参照のみ |
| 21 | [Active Inference as a Convex Markov Decision Process](https://arxiv.org/abs/2607.20152) | 2026 | arXiv プレプリント | 最新 | 閉ループ方策の EFE 最小化を凸 MDP として定式化（アブストラクトのみ確認）。 | — 参照のみ |
| 22 | [Reframing the Expected Free Energy: Four Formulations and a Unification](https://arxiv.org/abs/2402.14460) | 2024 | arXiv プレプリント | 発展 | EFE の4つの定式化を統一する試み（arXiv 検索結果の題目のみ確認）。 | — 参照のみ |
| 23 | [Expected Free Energy-based Planning as Variational Inference](https://arxiv.org/abs/2606.20658) | 2026 | TMLR 2026 | 最新 | EFE 計画を変分推論として定式化（arXiv 検索結果の書誌のみ確認）。 | — 参照のみ |
| 24 | [Deep Active Inference for Partially Observable MDPs](https://arxiv.org/abs/2009.03622) | 2020 | IWAI 2020 | 発展 | R-AIF の比較対象（Himst-G）になった POMDP 向け深層 AIF（書誌のみ確認）。 | — 参照のみ |
| 25 | [Mastering Diverse Domains through World Models (DreamerV3)](https://arxiv.org/abs/2301.04104) | 2023 | arXiv → Nature 2025 | 比較対象 | AXIOM・R-AIF の比較基準となる世界モデル RL（本デッキでは比較対象として参照）。 | — 参照のみ |
| 26 | [From pixels to planning: scale-free active inference](https://arxiv.org/abs/2407.20292) | 2024 | arXiv プレプリント | 発展 | くりこみ生成モデル（RGM）による階層 AIF。階層テーマ（別担当）に譲る。 | — 参照のみ |
| 27 | [Planning to Explore via Self-Supervised World Models (Plan2Explore)](https://arxiv.org/abs/2005.05960) | 2020 | ICML 2020 | 比較対象 | 世界モデル内の情報利得（アンサンブル不一致）探索。FEEF と同型の RL 側の手法。 | ↪ 既存：world-model/intrinsic-reward p.5 |
| 28 | [Deep Hierarchical Planning from Pixels (Director)](https://arxiv.org/abs/2206.04114) | 2022 | NeurIPS 2022 | 比較対象 | 時間階層の世界モデル RL。Fujii & Murata の比較軸。 | ↪ 既存：world-model/hierarchical p.3 |
