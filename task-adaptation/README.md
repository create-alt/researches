## メタ学習・継続学習とアダプタ生成（task-adaptation/）

### 調査履歴
- 2026-10-27: arXiv API で hypernetwork × LoRA / adapter / continual learning / in-context learning を新しい順に検索し、2026 年の動向（Doc-to-LoRA・SHINE とその後続、知識衝突の Override Gap、ICL との比較の Model of Models、継続学習での知識の相互作用、Parametric Skills など）をつかんだ。
- 系譜は3本を原典まで遡った。(1) 継続学習：von Oswald+ 2020（タスク埋め込み→重み）→ HyperZero（RL の文脈→方策）。(2) few-shot：HyperTransformer（サポート集合→CNN 重み、HyperMAML は参照のみ）。(3) LLM のアダプタ生成：HyperTuning（少数例→PEFT）→ Text-to-LoRA（説明文→LoRA）・DnD（プロンプト→LoRA）→ Doc-to-LoRA・SHINE（文書→LoRA）→ Override Gap（矛盾知識で失敗）。
- 軸は「未学習タスクに重みを直接生成して適応する」ことの限界と ICL との比較。各論文の ICL（または文脈あり）ベースラインとの数値差を s4・s5 に入れた：HyperTuning は ICL 相当に僅差で負け、T2L は弱い 3-shot ICL には勝つがタスク別 LoRA に届かず、SHINE は MQA で ICL に 14 点差、Override Gap は指示付き RAG に負け、Model of Models は言語モデルで ICL の利得の 11〜14% しか回収できない。
- 本文はすべて arXiv 版（PDF、2023 年以降は HTML の図も）で読んだ。採録先は arXiv コメントと Web 検索（PMLR・NeurIPS・ICML の virtual ページ）で確認した。
- 既存デッキとの重複はなし。同分野の別担当と重なりうる HyperNetworks（Ha+ 2016、weight-generation の範囲）、RPG・p-diff（weight-space-learning の範囲）はスライド化せず参照のみとした。

### 系譜
```
HyperNetworks (Ha+ 2016, 参照のみ; 同分野 weight-generation)
 ├─[継続学習] HNET-CL (von Oswald+ 2020, ICLR) ── タスク埋め込み→全重み、重みを正則化で記憶
 │      ├─► Posterior Meta-Replay (2021)・Continual HyperTransformer (2023)（参照のみ）
 │      └─[RL] HyperZero (Rezaei-Shoshtari+ 2023, AAAI) ── MDP 文脈→方策・価値の重み
 │             └─► Hypernetworks in Meta-RL (Beck+ 2022)（参照のみ）
 ├─[few-shot] HyperTransformer (Zhmoginov+ 2022, ICML) ── サポート集合→CNN 重み
 │      └─ HyperMAML (2022)（参照のみ）
 └─[LLM アダプタ生成]
        HyperTuning (Phang+ 2023, ICML) ── 少数例→prefix/LoRA（ICL 相当に僅差で劣る）
          ├─► HINT (2023)・HyperLoRA (2024)・Generative Adapter (2025)（参照のみ）
          ├─► Text-to-LoRA (Charakorn+ 2025, ICML) ── 説明文→LoRA
          │      └─► Doc-to-LoRA (Charakorn+ 2026, ICML) ── 文書→LoRA（文脈蒸留をメタ学習）
          │             └─► Override Gap (Cheng+ 2026) ── 矛盾知識の上書きに失敗＝振幅の問題
          ├─► Drag-and-Drop LLMs (Liang+ 2025, NeurIPS) ── プロンプト群→LoRA（← RPG/p-diff）
          ├─► SHINE (Liu+ 2026, ICML) ── LLM 自身で符号化、全層 LoRA
          │      └─► Knowledge Interaction in HN-based CL (Zheng+ 2026)（参照のみ）
          └─► Model of Models (Howell 2026) ── 放出 vs ICL vs 勾配適応の境界（resolution-K）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Continual learning with hypernetworks](https://arxiv.org/abs/1906.00695) | 2020 | ICLR | 原典 | タスク埋め込みから標的ネットの全重みを生成し、過去タスクの生成重みを正則化で固定して忘却を防ぐ。 | ✅ p.2 |
| 2 | [HyperTransformer: Model Generation for Supervised and Semi-Supervised Few-Shot Learning](https://arxiv.org/abs/2201.04182) | 2022 | ICML | 原典 | サポート集合から Transformer が小型 CNN の重みを1回で生成。小さい CNN で MAML++・RFS を上回る。 | ✅ p.3 |
| 3 | [Hypernetworks for Zero-shot Transfer in Reinforcement Learning](https://arxiv.org/abs/2211.15457) | 2023 | AAAI | 発展 | MDP の報酬・ダイナミクスのパラメータから方策と価値関数の重みを生成し、未学習タスクにゼロショット転移。 | ✅ p.4 |
| 4 | [HyperTuning: Toward Adapting Large Language Models without Back-propagation](https://arxiv.org/abs/2211.12485) | 2023 | ICML | 原典 | 少数例から凍結 T5 の prefix/LoRA を生成。ICL 相当（T5-MTF-Few-shot）に僅差で劣るが推論時に例が不要。 | ✅ p.5 |
| 5 | [Text-to-LoRA: Instant Transformer Adaption](https://arxiv.org/abs/2506.06105) | 2025 | ICML | 発展 | タスク説明文だけから LoRA を生成。未学習ベンチマークで多タスク LoRA を上回るがタスク別 LoRA には届かない。 | ✅ p.6 |
| 6 | [Drag-and-Drop LLMs: Zero-Shot Prompt-to-Weights](https://arxiv.org/abs/2506.16406) | 2025 | NeurIPS | 発展 | ラベルなしプロンプト群から LoRA 一式を生成。比較対象が他データセットの LoRA 平均で弱い点に注意。 | ✅ p.7 |
| 7 | [Doc-to-LoRA: Learning to Instantly Internalize Contexts](https://arxiv.org/abs/2602.15902) | 2026 | ICML | 最新 | 文脈蒸留をメタ学習し、文書を1秒未満で LoRA に内在化。窓の4倍超の長さにも外挿。 | ✅ p.8 |
| 8 | [SHINE: A Scalable In-Context Hypernetwork for Mapping Context to LoRA in a Single Pass](https://arxiv.org/abs/2602.06358) | 2026 | ICML | 最新 | LLM 自身でメモリ状態を作り M2P Transformer で全層 LoRA を生成。1ターン QA で ICL に迫る。 | ✅ p.9 |
| 9 | [The Override Gap: A Magnitude Account of Knowledge Conflict Failure in Hypernetwork-Based Instant LLM Adaptation](https://arxiv.org/abs/2604.23750) | 2026 | arXiv | 最新 | 生成 LoRA は事前知識と矛盾する文書を上書きできない。原因は振幅で、上位層の増幅（学習不要）で改善。 | ✅ p.10 |
| 10 | [Model of Models: When Does Emitting a Specialist Beat Attending, Adapting, or Tuning?](https://arxiv.org/abs/2608.21386) | 2026 | arXiv | 最新 | 重み放出・ICL・勾配適応・ゼロショットを6タスクで比較。低次元タスク族では放出が勝ち、言語モデルでは ICL に大差で負ける。 | ✅ p.11 |
| 11 | [HyperNetworks](https://arxiv.org/abs/1609.09106) | 2016 | ICLR 2017 | 原典 | ハイパーネットワークの原典。同分野 weight-generation で扱うため本テーマでは参照のみ。 | — 参照のみ |
| 12 | [HyperMAML: Few-Shot Adaptation of Deep Models with Hypernetworks](https://arxiv.org/abs/2205.15745) | 2022 | arXiv | 発展 | MAML の内側ループの勾配更新をハイパーネットに置き換える。HyperTransformer と同系統のため冒頭のみ確認し参照のみ。 | — 参照のみ |
| 13 | [Knowledge Interaction in Hypernetwork-based Continual Learning: Conflict and Composition](https://arxiv.org/abs/2610.15677) | 2026 | arXiv | 最新 | SHINE 上で基盤・アダプタ・文脈の3つの知識源の衝突と多段推論を分析。文脈が優先され、合成は失敗しやすい。要旨・序論のみ確認。 | — 参照のみ |
| 14 | [On-the-fly Weight Generation: A Hypernetwork Proof of Concept on ARC-1D](https://arxiv.org/abs/2610.00820) | 2026 | NeurIPS 2026 WS | 最新 | ARC-1D で少数例から小さな専門モデルの重みを生成し、部分的な合成汎化を示す。要旨のみ確認。 | — 参照のみ |
| 15 | [Scaling Laws for Hypernetwork-Based Knowledge Injection in Large Language Models](https://arxiv.org/abs/2607.19604) | 2026 | arXiv | 最新 | 大量の事実を固定 LoRA へ注入するハイパーネットのスケーリング則（MegaWikiQA）。要旨のみ確認。 | — 参照のみ |
| 16 | [Infinite-Parameter LLMs: Generating and Adapting Weights from Live Data](https://arxiv.org/abs/2609.18842) | 2026 | arXiv | 最新 | ライブデータから低ランク変調を生成し、生成器の潜在状態をベイズ更新する。要旨のみ確認。 | — 参照のみ |
| 17 | [Parametric Skills](https://arxiv.org/abs/2606.30015) | 2026 | arXiv | 最新 | テキストのスキルをハイパーネットで LoRA に変換し、SWE エージェントで文脈なしに使う。要旨のみ確認。 | — 参照のみ |
| 18 | [Investigating the Effectiveness of HyperTuning via Gisting](https://arxiv.org/abs/2402.16817) | 2024 | arXiv | 発展 | HyperTuning の後続（Gisting による改良）。検索で存在のみ確認。 | — 参照のみ |
| 19 | [HyperLoRA: Efficient Cross-Task Generalization via Constrained Low-Rank Adapters Generation](https://openreview.net/forum?id=xa4GYUSvhW) | 2024 | EMNLP Findings | 発展 | 少数例から LoRA を生成（T2L・D2L が引用）。未調査。 | — 参照のみ |
| 20 | [Generative Adapter: Contextualizing Language Models in Parameters with a Single Forward Pass](https://openreview.net/forum?id=bc3sUsS6ck) | 2025 | ICLR | 発展 | 文脈から一部の層のアダプタを生成（SHINE・D2L の比較対象）。未調査。 | — 参照のみ |
| 21 | HINT: Hypernetwork Instruction Tuning for Efficient Zero- & Few-Shot Generalisation（[arXiv](https://arxiv.org/abs/2212.10315)） | 2023 | ACL | 発展 | 指示文からアダプタと prefix を生成。未調査。 | — 参照のみ |
| 22 | [Hypernetworks in Meta-Reinforcement Learning](https://proceedings.mlr.press/v205/beck23a.html) | 2022 | CoRL | 発展 | メタ RL でハイパーネット方策が潜在条件付けと競合することを示す（Model of Models が再現）。未調査。 | — 参照のみ |
| 23 | [Continual HyperTransformer: A Meta-Learner for Continual Few-Shot Learning](https://arxiv.org/abs/2301.04584) | 2023 | TMLR | 発展 | HyperTransformer を継続 few-shot に拡張。未調査。 | — 参照のみ |
| 24 | [Posterior Meta-Replay for Continual Learning](https://arxiv.org/abs/2103.01133) | 2021 | NeurIPS | 発展 | HNET-CL をタスクごとの事後分布の生成へ拡張。未調査。 | — 参照のみ |
| 25 | Meta-Learning with Latent Embedding Optimization（LEO, [arXiv](https://arxiv.org/abs/1807.05960)） | 2019 | ICLR | 原典 | 潜在空間で重みを生成し SGD で補正する few-shot 法（HyperTransformer の比較対象）。未調査。 | — 参照のみ |
| 26 | Efficient Off-Policy Meta-RL via Probabilistic Context Variables（PEARL, [arXiv](https://arxiv.org/abs/1903.08254)） | 2019 | ICML | 発展 | 文脈潜在変数によるメタ RL（HyperZero・Model of Models の比較対象）。未調査。 | — 参照のみ |
| 27 | Towards Modular LLMs by Building and Reusing a Library of LoRAs（Arrow Routing, [arXiv](https://arxiv.org/abs/2405.11157)） | 2024 | ICML | 発展 | LoRA ライブラリのゼロショット経路選択（T2L の比較対象）。未調査。 | — 参照のみ |
| 28 | Cartridges（[arXiv](https://arxiv.org/abs/2506.06266)） | 2025 | arXiv | 発展 | 自己学習で長文脈を prefix 形式の小さな表現に圧縮（D2L が引用）。未調査。 | — 参照のみ |
| 29 | Self-Adapting Language Models（SEAL, [arXiv](https://arxiv.org/abs/2506.10943)） | 2025 | arXiv | 発展 | 自己生成データでの test-time training（SHINE の比較対象）。未調査。 | — 参照のみ |
| 30 | Locating and Editing Factual Associations in GPT（ROME, [arXiv](https://arxiv.org/abs/2202.05262)） | 2022 | NeurIPS | 原典 | 中間層 MLP の事実を直接編集（Override Gap が関連づけ）。未調査。 | — 参照のみ |
| 31 | RPG（Recurrent Parameter Generation, Wang+ 2025）・p-diff（Neural Network Diffusion, [arXiv](https://arxiv.org/abs/2402.13144)） | 2024–2025 | arXiv | 発展 | 重みの生成モデル（DnD の比較対象）。同分野 weight-space-learning の範囲のため参照のみ。 | — 参照のみ |
