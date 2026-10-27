## 組成的汎化と言語・行動の共発達（compositional-generalization/）

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
