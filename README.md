# 言語と行動の接地・汎化 — 先行研究調査

自然言語と行動を結びつけ、少数の言語・行動データから、未学習の行動を自然言語だけを手がかりに実行・獲得させる研究について、組成的汎化、言語から報酬・目標を作る行動獲得、基盤モデル（VLA・言語条件付き世界モデル）によるゼロショット行動生成の3方向から系譜をまとめる。能動的推論（谷研究室の系譜）と世界モデル（潜在行動・基盤世界モデル）の分野とつながる。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/`）は main ブランチから引き継いでいる。

## テーマ一覧

| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- | --- |
| 第1回 | [組成的汎化と言語・行動の共発達](#compositional-generalization) | Sugita & Tani 2003・SCAN・Hill+ 2020・gSCAN・LangLfP から、少数対データでの動作と説明文の対応付け、言語と行動の共発達、組合せ汎化を狙った VLA まで | [pptx](compositional-generalization/compositional-generalization.pptx) / [pdf](compositional-generalization/compositional-generalization.pdf) | 11 本 | 33 本 | 2026-10-25 |
| 第1回 | [言語から報酬・目標を生成する行動獲得](#language-to-reward) | LEARN を原典に、LLM が報酬コードを書く系（L2R・Eureka・RDA・BIRD）と VLM が観測を採点する系（VLM-RMs・RL-VLM-F・RoboReward・SOLE-R1）まで | [pptx](language-to-reward/language-to-reward.pptx) / [pdf](language-to-reward/language-to-reward.pdf) | 10 本 | 31 本 | 2026-10-25 |
| 第1回 | [基盤モデル・言語条件付き世界モデルによるゼロショット行動生成](#foundation-policies) | SayCan・Code as Policies・RT-2・UniPi・Dynalang・π0.5 から、VLA の汎化の限界を検証した 2025〜2026 年の研究まで | [pptx](foundation-policies/foundation-policies.pptx) / [pdf](foundation-policies/foundation-policies.pdf) | 10 本 | 32 本 | 2026-10-25 |

合計：スライド化 31 本、引用論文一覧 96 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-25 | 第1回調査（分野新設）。少数の言語・行動データから未学習の行動を自然言語だけで実行・獲得させる、という関心を軸に、「組成的汎化と言語・行動の共発達」、「言語から報酬・目標を生成する行動獲得」、「基盤モデル・言語条件付き世界モデルによるゼロショット行動生成」 の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版（OpenReview・学会予稿集・OA 誌・著者公開版など）で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典は ⚠️ 本文未確認として一覧に記載。 既存デッキ（他分野を含む）でスライド化済みの論文は再掲せず、一覧で `↪ 既存：<theme> p.N` として参照。同じ回の別テーマで同じ論文を別の観点からスライド化した例が一部ある。 |

## 追加調査を推奨するテーマ

これまでの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。

1. **言語に行動を「選ばせる」学習法**  
   基盤モデルのテーマでは、言語・視覚の意味理解は汎化しても、言語指示が無視される／内部に表現されているのに行動選択に効かない、という失敗が繰り返し示された。反事実ガイダンス・ベイズ分解・勾配隔離など、言語を行動選択に効かせる学習法を1テーマとして追う。

2. **データ被覆の設計と、少数の新語・新動作の獲得**  
   組成的汎化テーマでは、どの組合せを見せれば足りるか（データ被覆）が汎化を大きく左右した。少数の新語を一回で学ぶ fast mapping と LLM の事前知識の結合、人間動画・動画生成・潜在行動からの運動側の汎化と合わせて、ユーザーの関心（少数データから未学習の行動へ）に直結するテーマとして調べる。

3. **言語による報酬の頑健性と、言語化しにくい「やり方」の指定**  
   言語は「何を達成するか」しか伝えないため、報酬が高くても不自然・有害な挙動が残り、VLM 報酬の偽陽性による報酬ハッキングも起きる。報酬ハッキングの評価法、様式・自然さ・安全の指定、報酬モデルによる VLA の自己改善を合わせて追う。

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は既存デッキ（他分野の場合は `<field>/<theme>`）でスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。

---

<a id="compositional-generalization"></a>

## 組成的汎化と言語・行動の共発達（compositional-generalization/）

資料：[compositional-generalization.pptx](compositional-generalization/compositional-generalization.pptx) ／ [compositional-generalization.pdf](compositional-generalization/compositional-generalization.pdf) ／ 生成元 [spec.json](compositional-generalization/spec.json) ／ [テーマ README](compositional-generalization/README.md)


### 調査履歴
- 2026-10-25: arXiv API で "compositional generalization" × robot/language/VLA/embodied、"systematic generalization" × instruction following、gSCAN、BabyAI、著者 Jun Tani・Tetsuya Ogata を新しい順に検索し、2025〜2026 の動向（VLA の組合せ汎化：Scale Up Strategically、CRAFT、ReGuide、MA-VLA、Exploring the Limits of Combinatorial Generalization など）をつかんだ。
- 系譜は3本を原典まで遡った。(1) 発達ロボティクス：Vijayaraghavan+ 2025 → Sugita & Tani の PB 結合（NIPS 2003）。(2) 系統性ベンチマーク：gSCAN・Hill+ 2020 → SCAN（ICML 2018）。(3) ロボット方策：CRAFT・Scale Up Strategically・TRA → LangLfP（RSS 2021）。少数の対データで結ぶ尾形研の系統（Toyoda+ 2022）と、記号で組み合わせるニューロシンボリック系統（Ground-Compose-Reinforce）を加えた。
- 本文の取得：arXiv 版（HTML/PDF）に加え、Sugita & Tani は NeurIPS proceedings の公開 PDF で読んだ。雑誌版 Sugita & Tani 2005（Adaptive Behavior）は OIST の公開 PDF への接続が拒否され、OpenAlex は当日のレート上限、Semantic Scholar は 429 で OA 版を探せず本文未確認とした。
- 軸は「何が未学習の組合せへの汎化を決めるか」＝ データの組合せ被覆（SCAN・Vijayaraghavan+・Scale Up Strategically・CRAFT）、身体性と感覚運動の構造（Hill+・Vijayaraghavan+）、表現の分解（Sugita & Tani・TRA・GCR・CRAFT）。
- 既存デッキとの重複：Tinker・銅谷・谷 2026（active-inference/epistemic-agents）、MTRNN・PV-RNN（active-inference/hierarchical-generative-models）は再掲せず参照のみ。同分野の language-to-reward（言語から報酬・目標）と foundation-policies（VLA・言語条件付き世界モデル）は別担当のため、VLA は「組合せ汎化そのもの」を主題とする論文（Scale Up Strategically、CRAFT）に限った。

### 系譜
```
[発達ロボティクス：言語と行動の結合]
  Sugita & Tani 2003 (NIPS, PB 結合) ── 2005 Adaptive Behavior 版（本文未確認）
      ├─► MTRNN / PV-RNN（既存：active-inference/hierarchical-generative-models）
      ├─► Vijayaraghavan+ 2025 (Science Robotics, PV-RNN＋能動的推論, 組合せ数と汎化)
      │       └─► Tinker・銅谷・谷 2026（既存：active-inference/epistemic-agents, 好奇心で自己探索）
      └─► [尾形研] Yamada+ 2018 PRAE ─► Toyoda+ 2021 ─► Toyoda+ 2022 (RA-L, 少数対データ)

[系統性ベンチマーク：何が汎化を決めるか]
  SCAN (Lake & Baroni 2018) ──┬─► gSCAN (Ruis+ 2020, 接地) ─► Qiu+ 2021 / Ruis & Lake 2022（参照のみ）
                              ├─► Hill+ 2020 (ICLR, 身体性・視点・語数が汎化を生む)
                              └─► Lake & Baroni 2023 MLC (Nature, 参照のみ)
  BabyAI (2019) ─► Hashemi+ 2025 / Milano & Nolfi 2026（参照のみ）

[ロボット方策：少数の言語ラベル → 組合せ汎化]
  LangLfP (Lynch & Sermanet 2021, 言語は1%未満) ─► CALVIN (2022, 参照のみ)
      └─► TRA (Myers+ 2025, 時間整合で連結を組成)
  Gao+ 2024（環境因子の組成的データ収集, 参照のみ）
      └─► Scale Up Strategically (Qi+ 2026, 因子の偏りに応じた被覆)
  VLA の視覚の近道 (Xing+ 2025 ほか) ─► CRAFT (Yang+ 2026, 反実仮想でスキル単位の教師を移す)

[ニューロシンボリック：意味は学習・組合せは記号]
  Reward Machines ─► Ground-Compose-Reinforce (Li+ 2025, 350軌跡から分布外の行動)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [A Holistic Approach to Compositional Semantics: a connectionist model and robot experiments](https://proceedings.neurips.cc/paper_files/paper/2003/hash/3baa271bc35fe054c86928f7016e8ae6-Abstract.html) | 2003 | NIPS 2003 | 原典 | 言語と行動の RNNPB を PB で結合。18文中14対から学び未学習4文の行動を生成 | ✅ p.2 |
| 2 | [Generalization without Systematicity: On the Compositional Skills of Sequence-to-Sequence Recurrent Networks](https://arxiv.org/abs/1711.00350) | 2018 | ICML 2018 | 原典 | 命令→行動系列の SCAN。ランダム分割は解けるが "jump" の組合せは1.2% | ✅ p.3 |
| 3 | [Environmental drivers of systematicity and generalization in a situated agent](https://arxiv.org/abs/1910.00571) | 2020 | ICLR 2020 | 発展 | 3D の身体を持つエージェントは未学習の動詞×物体を零ショット実行。語数・一人称視点・視覚の多様さが汎化を決める | ✅ p.4 |
| 4 | [A Benchmark for Systematic Generalization in Grounded Language Understanding](https://arxiv.org/abs/2003.05161) | 2020 | NeurIPS 2020 | 発展 | 接地版 SCAN（gSCAN）。8分割のうち標準モデルは大半で失敗 | ✅ p.5 |
| 5 | [Language Conditioned Imitation Learning over Unstructured Data](https://arxiv.org/abs/2005.07648) | 2021 | RSS 2021 | 原典 | 言語ラベル1%未満の遊びデータから言語条件付き方策（LangLfP）。4連続指示52.1% | ✅ p.6 |
| 6 | [Learning Bidirectional Translation between Descriptions and Actions with Small Paired Data](https://arxiv.org/abs/2203.04218) | 2022 | IEEE RA-L 2022 | 発展 | 対なしデータで RAE を事前学習し、少数の対で中間表現を結合 | ✅ p.7 |
| 7 | [Development of Compositionality and Generalization through Interactive Learning of Language and Action of Robots](https://arxiv.org/abs/2403.19995) | 2025 | Science Robotics 2025 | 最新 | PV-RNN＋能動的推論。組合せの種類が多いほど未学習の動詞×名詞への汎化が向上 | ✅ p.8 |
| 8 | [Temporal Representation Alignment: Successor Features Enable Emergent Compositionality in Robot Instruction Following](https://arxiv.org/abs/2502.05454) | 2025 | NeurIPS 2025 | 最新 | 時間方向の表現整合だけで未学習のタスク連結を実行（実機で最良ベースラインの約1.8〜3倍） | ✅ p.9 |
| 9 | [Ground-Compose-Reinforce: Grounding Language in Agentic Behaviours using Limited Data](https://arxiv.org/abs/2507.10741) | 2025 | NeurIPS 2025 | 最新 | 命題を350軌跡で接地し Reward Machine で組合せて RL。データにない行動を獲得 | ✅ p.10 |
| 10 | [Scale Up Strategically: Learning Compositional Generalization via Bias-Aware Evaluation and Data Collection for Robotic Manipulation](https://arxiv.org/abs/2607.21582) | 2026 | arXiv | 最新 | 命令因子の近道（色が支配的）を FDR/FDH で測り、弱い因子に寄せた収集で必要デモ半減 | ✅ p.11 |
| 11 | [Same Scene, Different Task: Skill Alignment for Compositional Generalization in VLAs](https://arxiv.org/abs/2610.00524) | 2026 | arXiv | 最新 | 反実仮想ペアに同スキルの教師を移す CRAFT。未実演の組合せ 8.4%→84.2% | ✅ p.12 |
| 12 | [Learning semantic combinatoriality from the interaction between linguistic and behavioral processes](https://doi.org/10.1177/105971230501300102)（Sugita & Tani） | 2005 | Adaptive Behavior 13(1) | 原典 | NIPS 2003 版の雑誌拡張版。組成性は言語と行動の密な相互作用から力学系として自己組織化すると主張（検索情報に基づく）。OIST 掲載 PDF に到達できず | ⚠️ 本文未確認 |
| 13 | [BabyAI: A Platform to Study the Sample Efficiency of Grounded Language Learning](https://arxiv.org/abs/1810.08272) | 2019 | ICLR 2019 | 発展 | 合成言語の格子世界で指示追従のサンプル効率を測る基盤（要旨のみ） | — 参照のみ（ベンチマークは gSCAN で代表） |
| 14 | [CALVIN: A Benchmark for Language-Conditioned Policy Learning for Long-Horizon Robot Manipulation Tasks](https://arxiv.org/abs/2112.03227) | 2022 | IEEE RA-L | 発展 | 言語条件付き長期操作のベンチマーク（要旨のみ） | — 参照のみ（ベンチマーク） |
| 15 | [Grounded Language Learning Fast and Slow](https://arxiv.org/abs/2009.01719) | 2021 | ICLR 2021 | 発展 | 3D エージェントが一度見た新語を同一エピソード内で使う（要旨のみ） | — 参照のみ（スライド枠） |
| 16 | [Systematic Generalization on gSCAN: What is Nearly Solved and What is Next?](https://arxiv.org/abs/2109.12243) | 2021 | EMNLP 2021 | 発展 | gSCAN の多くの分割は解けたが副詞・方向が残ることを整理（題目のみ） | — 参照のみ |
| 17 | [Improving Systematic Generalization Through Modularity and Augmentation](https://arxiv.org/abs/2202.10745) | 2022 | arXiv | 発展 | gSCAN をモジュール構造とデータ拡張で解く（題目のみ） | — 参照のみ |
| 18 | [Compositional Networks Enable Systematic Generalization for Grounded Language Understanding](https://arxiv.org/abs/2008.02742) | 2020 | Findings of EMNLP 2021 | 発展 | 構文に沿ったモジュール合成で gSCAN を汎化（題目のみ） | — 参照のみ |
| 19 | [Human-like systematic generalization through a meta-learning neural network](https://doi.org/10.1038/s41586-023-06668-3)（Lake & Baroni） | 2023 | Nature | 発展 | 組成性のメタ学習（MLC）で人間並みの系統的汎化（検索情報に基づく） | — 参照のみ（言語のみで行動を扱わない） |
| 20 | [Efficient Data Collection for Robotic Manipulation via Compositional Generalization](https://arxiv.org/abs/2403.05110) | 2024 | RSS 2024 | 発展 | 環境因子の組成的汎化を利用したデータ収集（題目のみ。Scale Up Strategically の直接の先行） | — 参照のみ |
| 21 | [Shortcut Learning in Generalist Robot Policies: The Role of Dataset Diversity and Fragmentation](https://arxiv.org/abs/2508.06426) | 2025 | arXiv | 最新 | 汎用ロボット方策の近道学習とデータの多様性・断片化（CRAFT の引用で確認、題目のみ） | — 参照のみ |
| 22 | SkillNet: Hierarchical Skill Modeling for Compositional Generalization in Vision-Language Action Models（Xie+） | 2026 | ICML 2026 | 最新 | VLA の階層スキルモデルで組合せ汎化（CRAFT の引用で確認、題目のみ） | — 参照のみ（本文未入手） |
| 23 | [Exploring the Limits of Combinatorial Generalization in Embodied Manipulation](https://arxiv.org/abs/2610.15425) | 2026 | arXiv | 最新 | 原子スキルの再結合ベンチマーク RoboCombine。連結の失敗は引き継ぎ時の開始状態のずれと指摘（要旨のみ） | — 参照のみ（直近で未精読） |
| 24 | [Correcting WHERE, Preserving HOW: Compositional Generalization for Vision-Language-Action Models via Referential Guidance](https://arxiv.org/abs/2609.38616) | 2026 | arXiv | 最新 | 訓練不要のラッパーで参照先を補正し、組成シフトで最大+56.8pt（要旨のみ） | — 参照のみ |
| 25 | [Inductive Biases for Zero-shot Systematic Generalization in Language-informed Reinforcement Learning](https://arxiv.org/abs/2501.15270) | 2025 | arXiv | 最新 | BabyAI で Neural Production Systems＋記憶によるモジュール性・疎性の帰納バイアス（要旨のみ） | — 参照のみ |
| 26 | [Alignment among Language, Vision and Action Representations](https://arxiv.org/abs/2601.22948) | 2026 | arXiv | 最新 | BabyAI の行動由来の言語埋め込みが LLM の表現と整合（precision@15 0.70〜0.73、要旨のみ） | — 参照のみ |
| 27 | [Comparing Generalization in Learning with Limited Numbers of Exemplars: Transformer vs. RNN in Attractor Dynamics](https://arxiv.org/abs/2311.10763) | 2023 | arXiv | 発展 | 谷研。少数例での汎化を Transformer と RNN で比較（題目のみ） | — 参照のみ |
| 28 | [Embodying Pre-Trained Word Embeddings Through Robot Actions](https://arxiv.org/abs/2104.08521) | 2021 | IEEE RA-L | 発展 | 尾形研。事前学習語埋め込みを行動に合わせて変換し未知語に対応（題目のみ） | — 参照のみ |
| 29 | [Sensorimotor Input as a Language Generalisation Tool: A Neurorobotics Model for Generation and Generalisation of Noun-Verb Combinations with Sensorimotor Inputs](https://arxiv.org/abs/1605.03261) | 2016 | arXiv | 発展 | 感覚運動入力が名詞×動詞の組合せ汎化を助ける神経ロボティクスモデル（題目のみ） | — 参照のみ |
| 30 | [Language as a Cognitive Tool to Imagine Goals in Curiosity-Driven Exploration](https://arxiv.org/abs/2002.09253) | 2020 | NeurIPS 2020 | 発展 | 言語の組成性で未経験の目標を想像して探索（IMAGINE、題目のみ） | — 参照のみ（目標生成は language-to-reward 寄り） |
| 31 | [Curiosity-Driven Development of Action and Language in Robots Through Self-Exploration](https://arxiv.org/abs/2510.05013)（Tinker, Doya, Tani） | 2026 | Science Advances | 最新 | 好奇心つき能動的推論で命令文と行動を自己探索で習得、未学習文85.1% | ↪ 既存：active-inference/epistemic-agents p.7 |
| 32 | PV-RNN (Ahmadi & Tani 2019) | 2019 | Neural Computation | 発展 | Vijayaraghavan+ の連想層に使われる変分 RNN | ↪ 既存：active-inference/hierarchical-generative-models p.5 |
| 33 | MTRNN (Yamashita & Tani 2008) | 2008 | PLOS Comput. Biol. | 発展 | 多時間スケール RNN による行動の機能階層 | ↪ 既存：active-inference/hierarchical-generative-models p.4 |

---

<a id="language-to-reward"></a>

## 言語から報酬・目標を生成する行動獲得（language-to-reward/）

資料：[language-to-reward.pptx](language-to-reward/language-to-reward.pptx) ／ [language-to-reward.pdf](language-to-reward/language-to-reward.pdf) ／ 生成元 [spec.json](language-to-reward/spec.json) ／ [テーマ README](language-to-reward/README.md)


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

---

<a id="foundation-policies"></a>

## 基盤モデル・言語条件付き世界モデルによるゼロショット行動生成（foundation-policies/）

資料：[foundation-policies.pptx](foundation-policies/foundation-policies.pptx) ／ [foundation-policies.pdf](foundation-policies/foundation-policies.pdf) ／ 生成元 [spec.json](foundation-policies/spec.json) ／ [テーマ README](foundation-policies/README.md)


### 調査履歴
- 2026-10-25: arXiv API で 2025〜2026 年の VLA の汎化・指示追従・頑健性評価（"vision-language-action" AND generalization/unseen instructions/instruction following、LIBERO 派生ベンチマーク）を起点に現在地を把握。診断研究（INT-ACT、LIBERO-Plus、Encoded but Not in Control）と改善手法（APT）を選び、そこから VLA の系譜（π0.5 → RT-2）と、LLM で計画する系譜（SayCan → Code as Policies）、動画生成・言語条件付き世界モデルの系譜（UniPi、Dynalang）の原典まで遡った。
- 整理の軸は「未学習の指示に対して何が汎化しているか（言語理解・視覚・運動のどこか）」。原典期は「言語→スキル列」の層だけが汎化し運動は固定（SayCan/CaP）、RT-2 は意味・視覚概念は汎化するが新しい動作は出ないと明言。2025〜26 年の診断研究は、VLA が言語を無視する・意図は正しいが実行で失敗する・言語は内部に表現されているのに行動を選ばない、という 3 段階の失敗を示している。
- 同分野の compositional-generalization / language-to-reward は別担当。既存デッキの LAPA・Genie・Dreamer 4・Ctrl-World・V-JEPA 2 は再掲していない。

### 系譜
```
[LLM が計画・コードを担う]
  SayCan (2022) ──→ Code as Policies (2023) ……→ （Inner Monologue / VoxPoser：未調査）
        │ 「言語→スキル列」だけが汎化、運動は既存スキルに固定
        ▼
[VLM そのものを方策にする VLA]
  RT-1 (2022, 参照のみ) ──→ RT-2 (2023) ──→ OpenVLA / π0 (参照のみ) ──→ π0.5 (2025)
        │ 意味・視覚概念は汎化、新しい運動は汎化しない
        ▼
[診断：何が汎化していないか]
  INT-ACT (2025：意図は正しいが実行で失敗)
     └→ LIBERO-PRO / LIBERO-Plus (2025-26：言語を無視、目標置換で 0〜20%)
          └→ Encoded but Not in Control (2026：言語は表現されているが行動を選ばない)
[改善]
  Knowledge Insulation (2025, 参照のみ) / BayesVLA (2025, 参照のみ) ──→ APT (2026：行動側を先に言語なしで事前学習)

[動画・世界モデル経由で言語を行動へ]
  UniPi (2023：テキスト→動画→逆動力学)    Dynalang (2024：言語で未来を予測する世界モデル)
        └→ Genie / Dreamer 4 / Ctrl-World（既存：world-model/foundation-world-model）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Do As I Can, Not As I Say: Grounding Language in Robotic Affordances](https://arxiv.org/abs/2204.01691) | 2022 | CoRL 2022 | 原典 | LLM のスキル有用度と価値関数による実行可能性の積でスキルを選ぶ SayCan。101 指示で計画 84%・実行 74%。 | ✅ p.2 |
| 2 | [Code as Policies: Language Model Programs for Embodied Control](https://arxiv.org/abs/2209.07753) | 2023 | ICRA 2023 | 発展 | コード生成 LLM が知覚 API と制御プリミティブを組み合わせた方策コードを書く。未見指示で CLIPort 0% に対し 62〜80%。 | ✅ p.3 |
| 3 | [Learning Universal Policies via Text-Guided Video Generation](https://arxiv.org/abs/2302.00111) | 2023 | NeurIPS 2023 | 原典 | テキスト条件付き動画拡散で計画し逆動力学で行動化する UniPi。未見の言語組合せで 46〜60%。 | ✅ p.4 |
| 4 | [RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control](https://arxiv.org/abs/2307.15818) | 2023 | CoRL 2023 | 原典 | 行動をトークン化して VLM を Web データと共同微調整した VLA。未見条件で 62% 対 RT-1 32%、新しい動作は獲得しない。 | ✅ p.5 |
| 5 | [Learning to Model the World with Language](https://arxiv.org/abs/2308.01399) | 2024 | ICML 2024 | 発展 | 言語を未来予測の手がかりとして扱う多モーダル世界モデル Dynalang。多様なヒントを使うほど性能が上がる。 | ✅ p.6 |
| 6 | [π0.5: a Vision-Language-Action Model with Open-World Generalization](https://arxiv.org/abs/2504.16054) | 2025 | CoRL 2025 | 発展 | 他ロボット・Web・サブタスク予測・口頭指示を共同学習し、未学習の家庭で長期タスクを実行。Web データは未見物体の言語追従に効く。 | ✅ p.7 |
| 7 | [From Intention to Execution: Probing the Generalization Boundaries of Vision-Language-Action Models](https://arxiv.org/abs/2506.09930) | 2025 | arXiv プレプリント | 最新 | 50 タスクの診断スイート INT-ACT。意図の正しさ 84.5% に対し成功 30.4% という「意図と行動のギャップ」。 | ✅ p.8 |
| 8 | [LIBERO-Plus: In-depth Robustness Analysis of Vision-Language-Action Models](https://arxiv.org/abs/2510.13626) | 2026 | CVPR 2026（改題） | 最新 | 7 次元の摂動で VLA を解析。指示を空にしても成功が保たれ、目標を置換すると 0〜20% に落ちる＝言語を無視。 | ✅ p.9 |
| 9 | [APT: Action Expert Pretraining Improves Instruction Generalization of Vision-Language-Action Policies](https://arxiv.org/abs/2606.12366) | 2026 | CoRL 2026 | 最新 | 行動エキスパートを言語なしの視覚→行動事前分布として先に学習し、後から言語を注入。LIBERO-PRO の対象置換で π0.5 の 0〜1% を大きく上回る。 | ✅ p.10 |
| 10 | [Encoded but Not in Control: Revealing the Grounding Gap in Vision-Language Robot Policies](https://arxiv.org/abs/2610.06235) | 2026 | arXiv プレプリント | 最新 | 対象差し替えで VLA/WAM は元の物体へ 86〜98% 向かう一方、新しい対象は内部でほぼ 100% 線形に読み出せる「接地ギャップ」。 | ✅ p.11 |
| 11 | [RT-1: Robotics Transformer for Real-World Control at Scale](https://arxiv.org/abs/2212.06817) | 2023 | RSS 2023 | 原典 | 大規模実機データで学習した言語条件付き Transformer 方策。RT-2 のベースライン（アブストラクトと RT-2 本文での記述に基づく）。 | — 参照のみ（RT-2 で代表） |
| 12 | [Inner Monologue: Embodied Reasoning through Planning with Language Models](https://arxiv.org/abs/2207.05608) | 2022 | CoRL 2022 | 発展 | SayCan に成功検出などの環境フィードバックを言語で返し閉ループ計画にする（アブストラクトに基づく）。 | — 参照のみ（SayCan 系の閉ループ化） |
| 13 | [Socratic Models: Composing Zero-Shot Multimodal Reasoning with Language](https://arxiv.org/abs/2204.00598) | 2022 | ICLR 2023 | 発展 | VLM の知覚を言語化して LLM の計画に差し込む構成（CaP 本文での比較に基づく）。 | — 参照のみ |
| 14 | [VoxPoser: Composable 3D Value Maps for Robotic Manipulation with Language Models](https://arxiv.org/abs/2307.05973) | 2023 | CoRL 2023 | 発展 | LLM が 3D 価値マップを合成して軌道を最適化する、CaP の後継的手法（検索情報に基づく）。 | — 参照のみ（次に読む候補） |
| 15 | [OpenVLA: An Open-Source Vision-Language-Action Model](https://arxiv.org/abs/2406.09246) | 2024 | CoRL 2024 | 発展 | 970k 実機デモで学習した 7B のオープン VLA。LoRA による新タスクへの効率的微調整を検証（アブストラクトに基づく）。 | — 参照のみ（π0.5 で代表） |
| 16 | [π0: A Vision-Language-Action Flow Model for General Robot Control](https://arxiv.org/abs/2410.24164) | 2024 | RSS 2025 | 発展 | VLM に flow matching の行動エキスパートを付けた VLA（アブストラクトと π0.5 本文に基づく）。 | — 参照のみ（π0.5 で代表） |
| 17 | [Knowledge Insulating Vision-Language-Action Models: Train Fast, Run Fast, Generalize Better](https://arxiv.org/abs/2505.23705) | 2025 | NeurIPS 2025 | 発展 | 行動エキスパートからの勾配が VLM の知識移転を損なうことを示し、VLM を隔離する学習法を提案（アブストラクトに基づく）。 | — 参照のみ（APT で比較） |
| 18 | [Yell At Your Robot: Improving On-the-Fly from Language Corrections](https://arxiv.org/abs/2403.12910) | 2024 | RSS 2024 | 発展 | 人の言語による修正で高レベル方策をその場で改善する階層方策（アブストラクトに基づく）。 | — 参照のみ（対話的修正は次テーマ候補） |
| 19 | [LIBERO-PRO: Towards Robust and Fair Evaluation of Vision-Language-Action Models Beyond Memorization](https://arxiv.org/abs/2510.03827) | 2025 | arXiv プレプリント | 最新 | LIBERO の物体・初期状態・指示・環境を摂動すると 90% 超が 0% に崩れ、壊れた指示でも出力が変わらない（アブストラクトに基づく）。 | — 参照のみ（LIBERO-Plus と重複） |
| 20 | [LIBERO-Para: A Diagnostic Benchmark and Metrics for Paraphrase Robustness in VLA Models](https://arxiv.org/abs/2603.28301) | 2026 | EMNLP 2026 | 最新 | 言い換えで 22〜52 pt 低下、主因は物体名の語彙変化で、失敗の 80〜96% は計画段階（アブストラクトに基づく）。 | — 参照のみ |
| 21 | [Rephrase Before You Act: Characterizing and Mitigating Language Sensitivity in Vision-Language-Action Models](https://arxiv.org/abs/2610.10526) | 2026 | arXiv プレプリント | 最新 | 1 語の違いで成功率が数十 pt 変わる。LLM が蒸留した言い換え規則で指示を書き換えると未学習タスクで改善（アブストラクトに基づく）。 | — 参照のみ |
| 22 | [Flatness Preserves Instruction Following in Vision-Language-Action Models](https://arxiv.org/abs/2606.23641) | 2026 | arXiv プレプリント | 最新 | 少量データ微調整での「instruction blindness」を SAM による平坦化で緩和（アブストラクトに基づく）。 | — 参照のみ |
| 23 | [Do Vision-Language-Action Models Understand Instructions? A Mechanistic Interpretability Study on Language Grounding](https://arxiv.org/abs/2610.10178) | 2026 | arXiv プレプリント | 最新 | π0.5 と GR00T N1.7 の活性化パッチングで、抽象的な言い換えには鈍感で方向語に敏感と分析（アブストラクトに基づく）。 | — 参照のみ |
| 24 | [Do VLAs Really Follow Instructions? Diagnosing How-Level Instruction Following in Vision-Language-Action Models](https://arxiv.org/abs/2610.21251) | 2026 | arXiv プレプリント | 最新 | 「どうやるか」を指定する指示は現行 VLA で効かず、区間ごとの指示付与でも分布外には広がらない（アブストラクトに基づく）。 | — 参照のみ |
| 25 | [InstructMove: A Text-Indispensable Benchmark for Instruction-Following Manipulation](https://arxiv.org/abs/2608.22990) | 2026 | arXiv プレプリント | 最新 | 複数の行動が視覚的に妥当で言語でしか決まらない場面を作る評価（アブストラクトに基づく）。 | — 参照のみ |
| 26 | [When Vision Overrides Language: Evaluating and Mitigating Counterfactual Failures in VLAs](https://arxiv.org/abs/2602.17659) | 2026 | arXiv プレプリント | 最新 | 反事実ベンチマーク LIBERO-CF と二系統推論の Counterfactual Action Guidance（アブストラクトに基づく）。 | — 参照のみ（次に読む候補） |
| 27 | [Seeing to Act, Prompting to Specify: A Bayesian Factorization of Vision Language Action Policy](https://arxiv.org/abs/2512.11218) | 2025 | arXiv プレプリント | 発展 | 視覚→行動の事前分布と言語尤度に分解する BayesVLA。APT の前身（アブストラクトに基づく）。 | — 参照のみ（APT で代表） |
| 28 | [Veo-Act: Enhancing VLA Policies with Frontier Video Models](https://arxiv.org/abs/2604.04502) | 2026 | arXiv プレプリント | 最新 | 最先端の動画生成モデルで VLA を強化する UniPi 系の最新研究（arXiv 検索結果の題名に基づく）。 | — 参照のみ |
| 29 | [GR00T N1: An Open Foundation Model for Generalist Humanoid Robots](https://arxiv.org/abs/2503.14734) | 2025 | arXiv プレプリント | 発展 | VLM と拡散行動モジュールの二系統 VLA。Encoded but Not in Control の評価対象（同論文の記述に基づく）。 | — 参照のみ |
| 30 | Genie: Generative Interactive Environments | 2024 | ICML 2024 | 発展 | 動画から潜在行動付きの世界モデルを学習。 | ↪ 既存：world-model/foundation-world-model p.4 |
| 31 | Dreamer 4（Training Agents Inside of Scalable World Models） | 2025 | arXiv プレプリント | 最新 | 動画世界モデル内での方策学習。UniPi・Dynalang の発展先。 | ↪ 既存：world-model/foundation-world-model p.7 |
| 32 | LAPA: Latent Action Pretraining from Videos | 2025 | ICLR 2025 | 発展 | 行動ラベルなし動画から潜在行動で VLA を事前学習。新しい運動の獲得手段として関連。 | ↪ 既存：world-model/latent-action p.5 |
