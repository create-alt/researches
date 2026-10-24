# 能動的推論・自由エネルギー原理 — 先行研究調査

知覚・学習・行動を、生成モデルのもとでの（期待）自由エネルギー最小化として統一的に扱う能動的推論（Active Inference）について、深層化・階層化・認識的価値（好奇心）の観点から系譜をまとめる。世界モデル分野（内発的報酬・階層化）の姉妹分野にあたる。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/ochiai/`）は main ブランチから引き継いでいる。

## テーマ一覧

| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- | --- |
| 第1回 | [深層能動的推論と世界モデル](#deep-active-inference) | Ueltzhöffer 2018・Millidge・FEEF・Fountas 2020 から、Contrastive AIF、AXIOM、Distributional AIF、実ロボット制御、情報利得の理論まで | [pptx](deep-active-inference/deep-active-inference.pptx) / [pdf](deep-active-inference/deep-active-inference.pdf) | 11 本 | 28 本 | 2026-10-24 |
| 第1回 | [階層的・多時間スケール生成モデル](#hierarchical-generative-models) | Rao & Ballard 1999・HDM・MTRNN から、PV-RNN、APC、くりこみ生成モデル（RGM）、後続表現による階層 AIF まで | [pptx](hierarchical-generative-models/hierarchical-generative-models.pptx) / [pdf](hierarchical-generative-models/hierarchical-generative-models.pdf) | 10 本 | 24 本 | 2026-10-24 |
| 第1回 | [認識的価値（好奇心）と LLM エージェント・発達ロボティクス](#epistemic-agents) | IMGEP・DAD・action-oriented AIF から、MAGELLAN・BED-LLM・文脈獲得としての AIF、好奇心の理論保証、スパイキング AIF まで | [pptx](epistemic-agents/epistemic-agents.pptx) / [pdf](epistemic-agents/epistemic-agents.pdf) | 10 本 | 27 本 | 2026-10-24 |

合計：スライド化 31 本、引用論文一覧 79 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-24 | 第1回調査（分野新設）。main の候補分野メモ（candidates/）を出発点に、「深層能動的推論と世界モデル」、「階層的・多時間スケール生成モデル」、「認識的価値（好奇心）と LLM エージェント・発達ロボティクス」 の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版（OpenReview・学会予稿集・OA 誌・著者公開版など）で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典は ⚠️ 本文未確認として一覧に記載。 既存デッキ（他分野を含む）でスライド化済みの論文は再掲せず、一覧で `↪ 既存：<theme> p.N` として参照。同じ回の別テーマで同じ論文を別の観点からスライド化した例が一部ある。 |

## 追加調査を推奨するテーマ

これまでの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。

1. **期待自由エネルギー（EFE）と RL 目的関数の理論的関係、学習進捗と情報利得の統一**  
   深層 AIF テーマで、認識的価値が効くのは方向付きの探索が必要な課題に限られ、DreamerV3 などに勝った報告の勝因は EFE 以外（物体中心の事前分布・専門家データ）だった。EFE・学習進捗・情報利得の関係を理論側から整理し、好奇心の保証（Curiosity is Knowledge）と結ぶ。

2. **深層 AIF と世界モデル RL の公正なベンチマーク**  
   比較データ・計算予算が揃っていない報告が多く、Champion+ 2024 の再検証では EFE 版が退化した。同条件で DreamerV3 等と比べる評価基盤を調べる。

3. **構造学習と精度の自律最適化（階層の深さ・抽象の粒度を自動で決める）**  
   状態・行動の抽象を学習で得ているのは SR 階層 AIF と APC だけで、多くは階層を手で設計している。精度（precision）の自律調整（PV-RNN のメタ事前分布）や物体中心・ベイズ構造学習（AXIOM）と合わせて追う。

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は既存デッキ（他分野の場合は `<field>/<theme>`）でスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。

---

<a id="deep-active-inference"></a>

## 深層能動的推論と世界モデル（deep-active-inference/）

資料：[deep-active-inference.pptx](deep-active-inference/deep-active-inference.pptx) ／ [deep-active-inference.pdf](deep-active-inference/deep-active-inference.pdf) ／ 生成元 [spec.json](deep-active-inference/spec.json)


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

---

<a id="hierarchical-generative-models"></a>

## 階層的・多時間スケール生成モデル（hierarchical-generative-models/）

資料：[hierarchical-generative-models.pptx](hierarchical-generative-models/hierarchical-generative-models.pptx) ／ [hierarchical-generative-models.pdf](hierarchical-generative-models/hierarchical-generative-models.pdf) ／ 生成元 [spec.json](hierarchical-generative-models/spec.json)


### 調査履歴
- 2026-10-24: `candidates/active-inference.md` のテーマ案2を起点に、arXiv API で "hierarchical active inference"・"renormalising generative"・"PV-RNN"・"multiple timescale"＋"active inference"、著者（Jun Tani / Shingo Murata / Rajesh P. N. Rao / Karl Friston）を検索し、2025–26年の最新（SR 階層 AIF、RGM の再現実装、Habitat での階層 AIF、PV-RNN の精度自律調整）から入った。
- そこから3つの系譜を原典まで遡った。①Rao 系：Rao & Ballard 1999 → APC 2022 → SR 階層 AIF 2026。②Friston 系：HDM 2008 →（Deep temporal models 2017）→ RGM 2024 → Zaghw+ 2026。③谷研系：MTRNN 2008 → PV-RNN 2019 → Oyama+ 2026（と Fujii & Murata 2025）。
- Rao & Ballard 1999 は出版社版が閉じているが、著者（Rao）の UW ページで公開されている PDF で全文を読んだ。Friston 2008・MTRNN は PLoS の OA 版、Deep temporal models は PMC の HTML 版で読んだ。
- Fujii & Murata 2025 は全文を読んだが、同分野 `deep-active-inference` でスライド化済みのため本デッキからは外した（調整役からの重複通知による）。

### 系譜
```
[知覚の階層]  Rao & Ballard 1999（予測符号化）
                 │                       └──────────────┐
[Friston 系]  HDM (Friston 2008) ── Deep temporal models (2017, 離散・入れ子時間) ── RGM (2024, くりこみ) ── Zaghw+ 2026（導出と検証済み実装）
                 │                                                                    └ 連続/離散ハイブリッド階層 → Pezzato+ 2025（Habitat）
[Rao 系]                                    APC (Rao+ 2022, 状態・行動の階層) ── SR 階層 AIF (Rangarajan & Rao 2026)
[谷研系]      MTRNN (Yamashita & Tani 2008) ── PV-RNN (2019, 確率的・メタ事前分布) ── Oyama+ 2026（精度の自律調整）
                                            └─ Fujii & Murata 2025（slow/fast 世界モデル＋抽象行動, 既存：deep-active-inference）
[世界モデル側の姉妹系譜] CW-VAE / Director / HWM / H-JEPA …（既存：world-model/hierarchical）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Predictive coding in the visual cortex: a functional interpretation of some extra-classical receptive-field effects](https://doi.org/10.1038/4580)（[著者公開 PDF](https://homes.cs.washington.edu/~rao/Rao-Ballard-NN-1999.pdf)） | 1999 | Nature Neuroscience | 原典 | 上位が予測・下位が誤差を送る階層的予測符号化。端点抑制を誤差ニューロンの応答として再現。 | ✅ p.2 |
| 2 | [Hierarchical Models in the Brain](https://doi.org/10.1371/journal.pcbi.1000211) | 2008 | PLoS Comput. Biol. | 原典 | 状態空間モデルを積み重ねた階層動的モデル（HDM）と DEM による反転。皮質回路への対応づけ。 | ✅ p.3 |
| 3 | [Emergence of Functional Hierarchy in a Multiple Timescale Neural Network Model: A Humanoid Robot Experiment](https://doi.org/10.1371/journal.pcbi.1000220) | 2008 | PLoS Comput. Biol. | 原典 | 時定数の違いだけで運動プリミティブと系列の機能階層が創発する MTRNN。 | ✅ p.4 |
| 4 | [A Novel Predictive-Coding-Inspired Variational RNN Model for Online Prediction and Recognition](https://arxiv.org/abs/1811.01339) | 2019 | Neural Computation | 発展 | MTRNN に確率的潜在変数とメタ事前分布 w、誤差回帰を加えた PV-RNN。 | ✅ p.5 |
| 5 | [Active Predictive Coding: A Unified Neural Framework for Learning Hierarchical World Models for Perception and Planning](https://arxiv.org/abs/2210.13461) | 2022 | arXiv（改訂版 Neural Computation 2024, [doi](https://doi.org/10.1162/neco_a_01627)） | 発展 | ハイパーネットで下位の状態遷移と方策（オプション）を生成する状態-行動階層。 | ✅ p.6 |
| 6 | [From pixels to planning: scale-free active inference](https://arxiv.org/abs/2407.20292) | 2024 | arXiv（Front. Netw. Physiol. 2025） | 発展 | 経路を潜在変数に持つ離散 POMDP をくりこみ群で積み上げた RGM。画像・動画・音・ゲーム。 | ✅ p.7 |
| 7 | [Mobile Manipulation with Active Inference for Long-Horizon Rearrangement Tasks](https://arxiv.org/abs/2507.17338) | 2025 | IWAI 2025（CCIS 2026） | 最新 | 離散上位 AIF＋連続階層 AIF 全身制御で Habitat 3タスクの最先端を上回る。 | ✅ p.8 |
| 8 | [Hierarchical Active Inference using Successor Representations](https://arxiv.org/abs/2604.15679) | 2026 | Neural Computation | 最新 | SR のクラスタリングでマクロ状態、AIF でマクロ行動を学ぶ階層的能動的推論。 | ✅ p.9 |
| 9 | [Renormalising Generative Models for Active Inference: Foundations, Derivations, and Verification](https://arxiv.org/abs/2608.09512) | 2026 | IWAI 2026 | 最新 | RGM の導出のやり直しと、SPM 実装の Python 翻訳をオラクルテストで検証。 | ✅ p.10 |
| 10 | [Predictive-Coding-Based Autonomous Regulation of Internally Generated and Externally Coupled Processing in Human-Robot Interaction](https://arxiv.org/abs/2609.06888) | 2026 | arXiv プレプリント | 最新 | 再構成誤差の履歴で PV-RNN のメタ事前分布を自律的に切り替え、物理 HRI で評価。 | ✅ p.11 |
| 11 | [Real-World Robot Control by Deep Active Inference With a Temporally Hierarchical World Model](https://arxiv.org/abs/2512.01924) | 2025 | IEEE RA-L | 最新 | slow/fast 世界モデル＋VQ 抽象行動＋抽象世界モデルで EFE を高速評価（全文確認済み）。 | ↪ 既存：active-inference/deep-active-inference p.10 |
| 12 | [Deep temporal models and active inference](https://doi.org/10.1016/j.neubiorev.2018.04.004)（[PMC 版](https://pmc.ncbi.nlm.nih.gov/articles/PMC5998386/)） | 2017 | Neurosci. Biobehav. Rev.（2018 年に再掲） | 原典 | 上位状態が下位系列の初期状態を生成する入れ子時間の離散 AIF。読書の眼球運動、MMN・P300 を再現。PMC の HTML で全文を読んだが、図画像の配信元（cdn.ncbi）に到達できずスライド化を見送った。 | — 参照のみ |
| 13 | [AXIOM: Learning to Play Games in Minutes with Expanding Object-Centric Models](https://arxiv.org/abs/2505.24784) | 2025 | arXiv | 最新 | 勾配なしで成長するオブジェクト中心の AIF 世界モデル（RGM と同じ VERSES 系）。 | ↪ 既存：active-inference/deep-active-inference p.9 |
| 14 | [Schema-based active inference supports rapid generalization …](https://arxiv.org/abs/2601.18946) | 2026 | arXiv | 最新 | 上位が抽象タスク構造（スキーマ）、下位が空間ナビゲーションの2層 AIF。mPFC の符号を再現（アブストラクトのみ確認）。 | — 参照のみ |
| 15 | [Hybrid Recurrent Models Support Emergent Descriptions for Hierarchical Planning and Control](https://arxiv.org/abs/2408.10970) | 2024 | IWAI 2024 workshop | 発展 | rSLDS の離散モードをオプション的サブゴールとして上位 MDP で計画（アブストラクトのみ確認）。 | — 参照のみ |
| 16 | [Spatial and Temporal Hierarchy for Autonomous Navigation using Active Inference in Minigrid Environment](https://arxiv.org/abs/2312.05058) | 2024 | Entropy | 発展 | 空間と時間の2種の階層を持つ AIF ナビゲーション（検索結果のみ）。 | — 参照のみ |
| 17 | [Deep AIF with Diffusion Policy and Multiple Timescale World Model for Real-World Exploration and Navigation](https://arxiv.org/abs/2510.23258) | 2025 | arXiv | 最新 | 拡散方策で候補行動を出し MTRSSM で EFE を評価する実ロボットナビ（アブストラクトのみ）。deep-active-inference 側の領域。 | — 参照のみ |
| 18 | [Dynamic planning in hierarchical active inference](https://arxiv.org/abs/2402.11658) | 2024 | Neural Networks 2025 | 発展 | 連続/離散の階層 AIF による動的計画（Pezzato+ の基盤の一つ、書誌のみ）。 | — 参照のみ |
| 19 | [Free-Energy-Gated Plasticity for Real-Time Online Motor Learning in Physical Human-Robot Interaction](https://arxiv.org/abs/2608.23000) | 2026 | arXiv | 最新 | 自由エネルギーでゲートされる PV-RNN のオンライン学習（谷研、書誌のみ）。 | — 参照のみ |
| 20 | [Lessons from Neuroscience for AI: How integrating Actions, Compositional Structure and Episodic Memory …](https://arxiv.org/abs/2512.22568) | 2025 | arXiv | 最新 | Rao らによる APC 系の展望論文（書誌のみ）。 | — 参照のみ |
| 21 | Pezzulo, Rigoli, Friston "Hierarchical active inference: a theory of motivated control"（[doi](https://doi.org/10.1016/j.tics.2018.01.009)） | 2018 | Trends Cogn. Sci. | 発展 | 動機づけ制御を階層 AIF で説明する理論レビュー（検索情報に基づく）。OA 版を見つけられなかった。 | ⚠️ 本文未確認 |
| 22 | Kiebel, Daunizeau, Friston "A hierarchy of time-scales and the brain"（[doi](https://doi.org/10.1371/journal.pcbi.1000209)） | 2008 | PLoS Comput. Biol. | 原典 | 上位ほど遅い時間スケールを持つ皮質階層の仮説（MTRNN と同号）。時間の都合で未読。 | — 参照のみ |
| 23 | [CW-VAE: Clockwork Variational Autoencoders](https://arxiv.org/abs/2102.09532) | 2021 | NeurIPS | 発展 | 上位ほど遅く更新される時間階層の潜在動力学（世界モデル側）。 | ↪ 既存：world-model/hierarchical p.2 |
| 24 | [Deep Hierarchical Planning from Pixels (Director)](https://arxiv.org/abs/2206.04114) | 2022 | NeurIPS | 発展 | 世界モデル内で上位がサブゴールを出す階層 RL（APC と対比）。 | ↪ 既存：world-model/hierarchical p.3 |

### メモ（重複・範囲）
- 世界モデル分野の階層化（CW-VAE, Director, HWM, H-JEPA など）は `world-model/hierarchical` に任せ、本デッキは「生成モデルの階層を自由エネルギー／予測符号化で扱う系譜」に絞った。
- Fujii & Murata 2025 と AXIOM は `deep-active-inference` でスライド化済みのため参照のみとした。

---

<a id="epistemic-agents"></a>

## 認識的価値（好奇心）と LLM エージェント・発達ロボティクス（epistemic-agents/）

資料：[epistemic-agents.pptx](epistemic-agents/epistemic-agents.pptx) ／ [epistemic-agents.pdf](epistemic-agents/epistemic-agents.pdf) ／ 生成元 [spec.json](epistemic-agents/spec.json)


※ デッキ表紙では、長い題が2行に折り返して重なるため「認識的価値（好奇心）と LLM・発達ロボティクス」と短縮した。

### 調査履歴
- 2026-10-24: `candidates/active-inference.md` の最新研究（Tinker+ 2026、Active Inference as Context Acquisition）と「その他」欄（BED-LLM、ODAR、Curiosity is Knowledge、スパイキング AIF、HW 実装）を起点にした。arXiv API で "active inference" × curiosity/epistemic × LLM、"expected information gain" × LLM、"learning progress" × curiosity を新しい順に検索し、2025〜2026 の動向（ASIG、Kriz+ 2026、CA-BED、Shoot First、LPM）を把握した。
- 系譜は3本を原典まで遡った。(1) ベイズ実験計画：BED-LLM → DAD → Lindley 1956。(2) 学習進捗の好奇心：MAGELLAN → IMGEP → Oudeyer+ 2007。(3) 能動的推論の認識的価値：Curiosity is Knowledge / Tinker+ → Tschantz+ 2020 → Friston+ 2015。
- 本文の取得：arXiv 版（HTML/PDF）に加え、Tschantz+ 2020 は PLOS の OA 版 PDF で読んだ。Friston+ 2015 は Semantic Scholar で CLOSED。Schwartenbeck+ 2019（eLife, OA）は eLife に到達できず、PMC は reCAPTCHA／proof-of-work、bioRxiv は 429/403 で止まり、本文未確認とした。Oudeyer+ 2007 は著者サイト（pyoudeyer.com）に到達できなかった。OpenAlex は当日のレート上限で使えなかった。
- 同分野の deep-active-inference（Fountas 2020、AXIOM など）と、世界モデル分野の内発的報酬テーマ（ICM、Disagreement、Plan2Explore、ICL Curiosity など）との重複は避けた。

### 系譜
```
[ベイズ実験計画]  Lindley 1956 (⚠️) ──► DAD (Foster+ 2021, 償却BED) ──► BED-LLM (2025/ICLR 2026) ──┬─► ASIG / Kriz+ 2026（償却BEDのLLM化, 参照のみ）
                                                                                                └─► AIF as Context Acquisition (2026)
[学習進捗]        Oudeyer+ 2007 IAC (⚠️) ──► IMGEP (2017/JMLR 2022) ──► MAGELLAN (ICML 2025) ─ ─ ► LPM (ICLR 2026, 参照のみ)
[AIFの認識的価値] Friston+ 2015 (⚠️) ─┬─► Schwartenbeck+ 2019 (⚠️)
                                     └─► Tschantz+ 2020（action-oriented）──┬─► Tinker・銅谷・谷 2026（発達ロボ）
                                                                          ├─► Pragmatic Curiosity → Curiosity is Knowledge (2026, 理論保証; BED/BOと統合)
                                                                          └─► ODAR (2026, LLM推論の計算配分)
[小節: スパイキング/HW]  SCN (Boerlin+ 2013) ──► SFEC (Urbano+ 2026) ;  pymdp ──► Pižurica+ 2025 (HW指向, 参照のみ)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Intrinsically Motivated Goal Exploration Processes with Automatic Curriculum Learning](https://arxiv.org/abs/1708.02190) | 2017 | JMLR 2022 | 原典 | 学習進捗で目標空間を選ぶ IMGEP/AMB。実ロボットが道具使用を自力発見 | ✅ p.2 |
| 2 | [Learning action-oriented models through active inference](https://doi.org/10.1371/journal.pcbi.1007805) | 2020 | PLOS Comput. Biol. | 発展 | EFE（道具的＋認識的価値）で学ぶと bad bootstrap を避け、行動に必要な簡潔なモデルが得られる（PLOS の OA 版で読了） | ✅ p.3 |
| 3 | [Deep Adaptive Design: Amortizing Sequential Bayesian Experimental Design](https://arxiv.org/abs/2103.02438) | 2021 | ICML 2021 | 原典 | 逐次 BOED を方策ネットワークに償却し、ミリ秒で適応設計 | ✅ p.4 |
| 4 | [MAGELLAN: Metacognitive predictions of learning progress guide autotelic LLM agents in large goal spaces](https://arxiv.org/abs/2502.07709) | 2025 | ICML 2025 | 発展 | LLM が自分の能力を予測して LP を推定し、言語目標のカリキュラムを自動生成 | ✅ p.5 |
| 5 | [BED-LLM: Intelligent Information Gathering with LLMs and Bayesian Experimental Design](https://arxiv.org/abs/2508.21184) | 2025 | ICLR 2026 | 発展 | LLM の予測分布で EIG を推定して質問を選ぶ。20 Questions で +37.4pt | ✅ p.6 |
| 6 | [Curiosity-Driven Development of Action and Language in Robots Through Self-Exploration](https://arxiv.org/abs/2510.05013) | 2026 | Science Advances | 最新 | 好奇心つき償却 AIF で命令文と行動を自己探索で習得、未学習文 85.1%、U 字型発達を再現 | ✅ p.7 |
| 7 | [Curiosity is Knowledge: Self-Consistent Learning and No-Regret Optimization with Active Inference](https://arxiv.org/abs/2602.06029) | 2026 | arXiv | 最新 | 十分な好奇心で事後一致性と後悔有界性が同時に成り立つという EFE 初の理論保証 | ✅ p.8 |
| 8 | [ODAR: Principled Adaptive Routing for LLM Reasoning via Active Inference](https://arxiv.org/abs/2602.23681) | 2026 | arXiv | 最新 | 償却 EFE の難易度推定で Fast/Slow LLM に振り分け、自由エネルギー最小で回答を融合 | ✅ p.9 |
| 9 | [Active Inference as Context Acquisition for AI Agents](https://arxiv.org/abs/2608.19202) | 2026 | arXiv | 最新 | 質問・検索・ツール呼び出しを EFE の二層最適化で定式化。DP オラクル付き OQA で LLM を評価 | ✅ p.10 |
| 10 | [Efficient and robust control with spikes that constrain free energy](https://arxiv.org/abs/2603.09729) | 2026 | arXiv | 最新 | 自由エネルギーを下げるときだけ発火する SNN 制御 SFEC。Nengo 比で20〜30倍少ないスパイク | ✅ p.11 |
| 11 | [Active inference and epistemic value](https://doi.org/10.1080/17588928.2015.1020053)（Friston, Rigoli, Ognibene ほか） | 2015 | Cognitive Neuroscience 6(4) | 原典 | EFE を認識的価値（情報利得）と外発的価値に分け、好奇心を原理から導いた（検索情報に基づく）。Semantic Scholar で CLOSED | ⚠️ 本文未確認 |
| 12 | [Computational mechanisms of curiosity and goal-directed exploration](https://doi.org/10.7554/eLife.41703)（Schwartenbeck ほか） | 2019 | eLife | 発展 | AIF で新奇性（パラメータ情報利得）と顕著性（状態情報利得）を区別した好奇心モデル（検索情報に基づく）。eLife/PMC/bioRxiv いずれも本文に到達できず | ⚠️ 本文未確認 |
| 13 | [On a Measure of the Information Provided by an Experiment](https://doi.org/10.1214/aoms/1177728069)（Lindley） | 1956 | Ann. Math. Stat. | 原典 | 実験の価値を期待情報利得（相互情報量）で測るベイズ実験計画の起点（検索情報に基づく）。OA 版を確認できず | ⚠️ 本文未確認 |
| 14 | [Intrinsic Motivation Systems for Autonomous Mental Development](https://doi.org/10.1109/TEVC.2006.890271)（Oudeyer, Kaplan, Hafner） | 2007 | IEEE TEC | 原典 | 学習進捗（予測誤差の減少）を内発的報酬とする IAC（検索情報に基づく）。著者サイトに到達できず | ⚠️ 本文未確認 |
| 15 | [Pragmatic Curiosity: A Hybrid Learning-Optimization Paradigm via Active Inference](https://arxiv.org/abs/2602.06104) | 2026 | arXiv | 最新 | Curiosity is Knowledge の手法編。EFE で BO と BED を統合（検索結果の要旨のみ） | — 参照のみ（理論編を優先） |
| 16 | [A Hardware-oriented Approach for Efficient Active Inference Computation and Deployment](https://arxiv.org/abs/2508.13177) | 2025 | arXiv | 最新 | pymdp を疎な統一計算グラフに変換し、Jetson Orin で遅延1/2以下・メモリ最大35%減（全文読了） | — 参照のみ（4頁の短報で、評価が対数尤度計算のみ） |
| 17 | [Planning to Be Surprised: Optimal Bayesian Exploration in Dynamic Environments](https://arxiv.org/abs/1103.5708) | 2011 | arXiv | 原典 | 情報利得（驚き）を報酬にした最適ベイズ探索。系譜確認のみ | — 参照のみ（スライド枠の都合） |
| 18 | [Modern Bayesian Experimental Design](https://arxiv.org/abs/2302.14545) | 2023 | Statistical Science | 発展 | BED の計算手法のレビュー（要旨のみ） | — 参照のみ（レビュー） |
| 19 | [Uncertainty of Thoughts: Uncertainty-Aware Planning Enhances Information Seeking in Large Language Models](https://arxiv.org/abs/2402.03271) | 2024 | NeurIPS 2024 | 発展 | 情報利得型の報酬で質問を選ぶ LLM 手法。BED-LLM は決定論的尤度の仮定を批判（要旨のみ） | — 参照のみ（BED-LLM で代表） |
| 20 | [Amortising Bayesian Experimental Design for Sequential Information Gathering in LLMs](https://arxiv.org/abs/2607.03426) | 2026 | ICML 2026 WS (FoGen) | 最新 | EIG 報酬の多ターン GRPO で BED を 7B LLM に償却。BED-LLM 比で推論コスト25分の1以下（要旨のみ） | — 参照のみ（ワークショップ） |
| 21 | [Amortizing Sequential Experimental Design in Reasoning LLMs](https://arxiv.org/abs/2610.20832) | 2026 | arXiv | 最新 | 推論 LLM に情報利得報酬で実験計画の推論を学習させ、MediQ へ転移（要旨のみ） | — 参照のみ（直近で未精読） |
| 22 | [CA-BED: Conversation-Aware Bayesian Experimental Design](https://arxiv.org/abs/2606.01182) | 2026 | ICLR 2026 WS | 最新 | 会話木上で EIG を伝播させる推論時の対話計画（要旨のみ） | — 参照のみ |
| 23 | [Shoot First, Ask Questions Later? Building Rational Agents that Explore and Act Like People](https://arxiv.org/abs/2510.20886) | 2025 | ICLR 2026 | 最新 | Collaborative Battleship で、BED に着想した LM 推論が人間や GPT-5 を上回る（要旨のみ） | — 参照のみ |
| 24 | [Beyond Noisy-TVs: Noise-Robust Exploration Via Learning Progress Monitoring](https://arxiv.org/abs/2509.25438) | 2025 | ICLR 2026 | 最新 | 学習進捗を報酬にして noisy-TV を避け、LP が情報利得の単調指標であることを示した（要旨のみ） | — 参照のみ（RL の内発的報酬寄り） |
| 25 | [Compression Progress (Schmidhuber)](https://arxiv.org/abs/0812.4360) | 2008 | arXiv | 原典 | 圧縮進捗を好奇心とする理論 | ↪ 既存：world-model/intrinsic-reward p.2 |
| 26 | [Can In-Context Learning Support Intrinsic Curiosity?](https://arxiv.org/abs/2606.19476) | 2026 | arXiv | 最新 | 文脈内学習による好奇心 | ↪ 既存：world-model/intrinsic-reward p.10 |
| 27 | [Guiding Pretraining in Reinforcement Learning with Large Language Models (ELLM)](https://arxiv.org/abs/2302.06692) | 2023 | ICML 2023 | 発展 | LLM が探索目標を提案 | ↪ 既存：world-model/foundation-world-model p.2 |
