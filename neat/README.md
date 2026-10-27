## NEAT とトポロジー進化・間接符号化（neat/）

### 調査履歴
- 2026-10-27: arXiv API で「NEAT AND neuroevolution」「HyperNEAT OR CPPN」「indirect encoding」「ti:neuroevolution」を新しい順に検索し、2025〜2026 年の動向（TensorNEAT による GPU 化、Claret らの ES-HyperNEAT 一連の研究、低ランク分解型の間接符号化、FER 仮説、LLM による構造探索）を把握した。
- そこから系譜を NEAT（2002）→ rtNEAT（2005）→ CPPN / HyperNEAT（2007）→ DPPN（2016）・CoDeepNEAT（2017）・WANN（2019）とさかのぼった。NEAT と rtNEAT は UT Austin の著者公開 PDF、HyperNEAT は GECCO 2007 会議版（GP Bibliography 掲載の PDF）で全文を読んだ。
- CPPN（GPEM 2007）、HyperNEAT 雑誌版（ALife 2009）、ES-HyperNEAT（ALife 2012）は OpenAlex・Semantic Scholar で OA 版を探した。しかし、eplex.cs.ucf.edu は応答がなく、UCF STARS は Cloudflare のチャレンジページ、MIT Press は 403 だったため、本文は取得できなかった。
- 「LLM による構造生成と NEAT の直接比較」をうたう論文は見つからなかった。LLM 駆動の NAS（EvoPrompting、LLMatic、GraphIR）は参照のみとした。

### 系譜
```
NEAT (2002) ─┬─ rtNEAT / NERO (2005)  ……実時間・連続置換
             │
             ├─ CPPN (2007, 本文未確認) ─ HyperNEAT (2007/2009) ─┬─ ES-HyperNEAT (2012, 本文未確認)
             │                                                   │     └─ Quadtree Bottleneck / JAX-ESHN (2026) ─ EMR-HyperNEAT (2026)
             │                                                   ├─ DPPN (2016) ……微分可能な間接符号化
             │                                                   │     └─ 低ランク分解による間接符号化 (2025)
             │                                                   └─ Picbreeder (2008/2011) ─ FER 仮説 (2025)
             │
             ├─ CoDeepNEAT (2017) ……層・モジュールの進化（NAS へ）─ LLM 駆動 NAS（EvoPrompting 2023, LLMatic 2024, GraphIR 2026）
             ├─ WANN (2019) ……重みを捨て構造だけを探索
             └─ TensorNEAT (2024/2025) ……個体群のテンソル化と GPU 化
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Evolving Neural Networks through Augmenting Topologies](https://nn.cs.utexas.edu/downloads/papers/stanley.ec02.pdf) | 2002 | Evolutionary Computation | 原典 | NEAT。歴史的マーキング・種分化・最小構造からの複雑化で、トポロジーと重みを同時に進化させる。DPNV を ESP の1/5の評価回数で解いた。 | ✅ p.2 |
| 2 | [Real-Time Neuroevolution in the NERO Video Game](https://nn.cs.utexas.edu/downloads/papers/stanley.ieeetec05.pdf) | 2005 | IEEE TEC | 発展 | rtNEAT。数 tick ごとに1体ずつ置き換え、種分化動態を連続的に近似する。プレイヤーが部隊を訓練するゲーム NERO を構築した。 | ✅ p.3 |
| 3 | [Generating Large-Scale Neural Networks Through Discovering Geometric Regularities](https://gpbib.pmacs.upenn.edu/gecco2007/docs/p997.pdf) | 2007 | GECCO | 発展 | HyperNEAT の会議版。CPPN(x1,y1,x2,y2) で基板の全結合重みを生成する。11×11 の解を再学習なしで 55×55（約900万結合）に拡大できた。 | ✅ p.4 |
| 4 | [Convolution by Evolution: Differentiable Pattern Producing Networks](https://arxiv.org/abs/1606.02580) | 2016 | GECCO | 発展 | DPPN。CPPN の構造は進化、重みは逆伝播で学習する（ラマルク型）。約200パラメータで自己符号化器の15.8万重みを生成した。 | ✅ p.5 |
| 5 | [Evolving Deep Neural Networks](https://arxiv.org/abs/1703.00548) | 2017 | arXiv（書籍章 2019） | 発展 | DeepNEAT / CoDeepNEAT。層を単位とした NEAT と、モジュール・設計図の協調共進化。CIFAR-10 で誤差7.3%を得た。 | ✅ p.6 |
| 6 | [Weight Agnostic Neural Networks](https://arxiv.org/abs/1906.04358) | 2019 | NeurIPS | 発展 | WANN。共有重み1つで課題を解く構造を、NEAT 型の構造変異と多目的順位付けで探索した。 | ✅ p.7 |
| 7 | [TensorNEAT: A GPU-accelerated Library for NeuroEvolution of Augmenting Topologies](https://arxiv.org/abs/2504.08339) | 2025 | ACM TELO | 最新 | NEAT 個体群を NaN で埋めた同形状テンソルにして JAX で GPU 化した。最大544倍速く、evosax の GA より難しい課題で優位。 | ✅ p.8 |
| 8 | [Tensorized NeuroEvolution of Augmenting Topologies for GPU Acceleration](https://arxiv.org/abs/2404.01817) | 2024 | GECCO | 最新 | #7 の会議版。数値（Table 1）はこちらから引用した。 | ✅ p.8（#7 と統合） |
| 9 | [Low Rank Factorizations are Indirect Encodings for Deep Neuroevolution](https://arxiv.org/abs/2504.03037) | 2025 | arXiv | 最新 | 重み行列を低ランク因子の積で表し、因子だけを GA で進化させる間接符号化。Transformer 言語モデルで直接符号化を大きく上回った。 | ✅ p.9 |
| 10 | [Questioning Representational Optimism in Deep Learning: The Fractured Entangled Representation Hypothesis](https://arxiv.org/abs/2505.11581) | 2025 | arXiv（position paper） | 最新 | Picbreeder（NEAT＋CPPN の開放的探索）の網と SGD の網は、同じ出力でも内部表現が異なる（UFR 対 FER）という仮説を提起した。 | ✅ p.10 |
| 11 | [On Scaling Coordinate-Based Neuroevolution: The Quadtree Bottleneck in ES-HyperNEAT](https://arxiv.org/abs/2608.24480) | 2026 | arXiv | 最新 | JAX-ESHN。ES-HyperNEAT の四分木は CPPN ごとに位置数が異なり、vmap で個体群をベクトル化できないことを実証した。 | ✅ p.11 |
| 12 | [Compositional Pattern Producing Networks: A Novel Abstraction of Development](https://doi.org/10.1007/s10710-007-9028-8) | 2007 | GPEM | 原典 | CPPN の原典。発生過程を模擬せず、ガウス・sin などの関数合成で対称・反復を持つパターンを生成する（HyperNEAT・DPPN・FER 論文の記述に基づく）。 | ⚠️ 本文未確認 |
| 13 | [A Hypercube-Based Encoding for Evolving Large-Scale Neural Networks](https://doi.org/10.1162/artl.2009.15.2.15202) | 2009 | Artificial Life | 発展 | HyperNEAT の雑誌版。会議版（#3）でスライド化した。 | ⚠️ 本文未確認 |
| 14 | [An Enhanced Hypercube-Based Encoding for Evolving the Placement, Density, and Connectivity of Neurons](https://doi.org/10.1162/ARTL_a_00071) | 2012 | Artificial Life | 発展 | ES-HyperNEAT。CPPN 出力の分散に応じた四分木で、隠れノードの位置と密度を自動で決める（#11 の記述に基づく）。 | ⚠️ 本文未確認 |
| 15 | [Abandoning Objectives: Evolution Through the Search for Novelty Alone](https://doi.org/10.1162/EVCO_a_00025) | 2011 | Evolutionary Computation | 発展 | Novelty Search。NEAT 上で目的関数の代わりに新奇性で探索する。 | ↪ 既存：open-endedness/quality-diversity p.2 |
| 16 | [Illuminating search spaces by mapping elites](https://arxiv.org/abs/1504.04909) | 2015 | arXiv | 発展 | MAP-Elites。FER 論文が開放的探索の抽象化として挙げる。 | ↪ 既存：open-endedness/quality-diversity p.3 |
| 17 | [In Search of the Ingredients of Open-Endedness: Replicating Picbreeder with Large Vision-Language Models](https://arxiv.org/abs/2605.23908) | 2026 | arXiv | 最新 | Picbreeder-VLM。Picbreeder の人間の選択を大規模 VLM に置き換えて再現を試みた。 | ↪ 既存：open-endedness/foundation-model-alife p.9 |
| 18 | Picbreeder: A Case Study in Collaborative Evolutionary Exploration of Design Space (Secretan+) | 2011 | Evolutionary Computation | 発展 | 人がオンラインで CPPN 画像を交配する開放的探索。FER の比較対象を生んだ（FER 論文の記述で把握）。 | — 参照のみ（本文未取得） |
| 19 | Competitive Coevolution through Evolutionary Complexification (Stanley & Miikkulainen) | 2004 | JAIR | 発展 | NEAT の複雑化が競争的共進化での「軍拡」を持続させることを示す。NEAT 論文の展望の実証。 | — 参照のみ（時間の都合で未読） |
| 20 | [Generative NeuroEvolution for Deep Learning](https://arxiv.org/abs/1312.5355) | 2013 | arXiv | 発展 | HyperNEAT で LeNet-5 の重みを進化させても MNIST は約50%にとどまり、逆伝播との併用で約90%。DPPN が問題提起に引用。 | — 参照のみ |
| 21 | [Regularized Evolution for Image Classifier Architecture Search](https://arxiv.org/abs/1802.01548) | 2019 | AAAI | 発展 | AmoebaNet。年齢つきトーナメント選択の進化 NAS で、手設計を超える画像分類器を得た。CoDeepNEAT 以後の進化 NAS の到達点。 | — 参照のみ（NAS 寄りのため） |
| 22 | [Towards Self-Assembling Artificial Neural Networks through Neural Developmental Programs](https://arxiv.org/abs/2307.08197) | 2023 | arXiv | 発展 | NDP。発生過程（自己組織的な成長）で網を作る間接符号化。CPPN とは逆に発生を明示的に模擬する。 | — 参照のみ |
| 23 | [EvoPrompting: Language Models for Code-Level Neural Architecture Search](https://arxiv.org/abs/2302.14838) | 2023 | NeurIPS | 最新 | LM を進化 NAS の変異・交叉演算子に使う。LLM による構造生成の代表例。 | — 参照のみ（NEAT との直接比較なし） |
| 24 | [LLMatic: Neural Architecture Search via Large Language Models and Quality Diversity Optimization](https://arxiv.org/abs/2306.01102) | 2024 | GECCO | 最新 | LLM のコード生成と QD を組み合わせた NAS。 | — 参照のみ |
| 25 | [GraphIR: Architecture-Level Search States for LLM-Guided Neural Architecture Evolution](https://arxiv.org/abs/2608.01633) | 2026 | arXiv | 最新 | LLM 駆動の構造進化に、計算骨格・変異面・妥当性制約からなる中間表現を与える。 | — 参照のみ |
| 26 | [Searching Search Spaces: Meta-evolving a Geometric Encoding for Neural Networks](https://arxiv.org/abs/2403.14019) | 2024 | arXiv | 最新 | GENE（ニューロン間距離で重みを決める間接符号化）の距離関数を CGP でメタ進化させた。 | — 参照のみ |
| 27 | [Tensor-Accelerated Eager Multi-Resolution Grids for Evolving Large-Scale Substrates](https://arxiv.org/abs/2608.27612) | 2026 | GECCO Companion | 最新 | EMR-HyperNEAT。共有の多解像度格子を一括評価してマスクし、#11 のボトルネックを解消する（4ページの短報）。 | — 参照のみ（#11 で要点を記載） |
| 28 | [Per-Node Activation Function Evolution in Indirectly Encoded Substrates](https://arxiv.org/abs/2610.00149) | 2026 | ALIFE | 最新 | 単調な活性化関数だけでは進化が parity を解けず、ノードごとの活性化関数の進化で解決。表現力ではなく探索の限界と指摘。 | — 参照のみ |
| 29 | [Multi-Behavioral Evolved Substrates Through Neuromodulation and Activation Selection](https://arxiv.org/abs/2610.00148) | 2026 | ALIFE | 最新 | CPPN 基板に神経修飾と活性化関数選択を組み合わせ、単一遺伝子型で複数行動を獲得する。 | — 参照のみ |
| 30 | [Breaking the Central Bias: Spatially Partitioned Experts for Coordinate-Based Neuroevolution](https://arxiv.org/abs/2609.11518) | 2026 | ICPR 2026 workshop | 最新 | ES-HyperNEAT の MNIST で入力が中央に偏る問題を、空間分割した専門家網で解消（21%→43%）。 | — 参照のみ |
| 31 | [Investigating Hyperparameter Optimization and Transferability for ES-HyperNEAT](https://arxiv.org/abs/2609.00449) | 2026 | arXiv | 最新 | TPE で ES-HyperNEAT のハイパラを探索し、MNIST 29.0%。 | — 参照のみ |
| 32 | [Early-Stopping Thresholds for ES-HyperNEAT](https://arxiv.org/abs/2609.13533) | 2026 | IEEE CEC | 最新 | 初期3世代の適応度で見込みのない試行を打ち切り、計算を41.6%削減。 | — 参照のみ |
| 33 | [Continual Reinforcement Learning with Neuroevolution](https://arxiv.org/abs/2610.01583) | 2026 | arXiv | 最新 | 継続 RL で ES は安定性と可塑性のバランスが最良、GA は最も可塑的だが忘却しやすい。 | — 参照のみ（ES/GA 寄り） |
| 34 | [TRON: Transferring Naturally Evolved Network Architectures into Neuroevolution](https://arxiv.org/abs/2610.35647) | 2026 | arXiv | 最新 | タンパク質相互作用ネットワークを構造の事前分布として使い、種分化と隔離で新個体を保護する構造進化。 | — 参照のみ |
| 35 | [SPECS: Speciated Evolutionary Circuit Synthesis](https://arxiv.org/abs/2607.14027) | 2026 | arXiv | 最新 | NEAT の種分化と構造変異をアナログ回路の構造・素子値の同時合成に転用した。 | — 参照のみ（応用） |
| 36 | [Seq103: A Unified Neuroevolution Framework for Compact Sequence Architecture Discovery](https://arxiv.org/abs/2606.07664) | 2026 | arXiv | 最新 | 系列分類向けの NEAT 型フレームワーク。 | — 参照のみ（応用） |
| 37 | [Deep Neuroevolution: Genetic Algorithms Are a Competitive Alternative for Training Deep Neural Networks](https://arxiv.org/abs/1712.06567) | 2017 | arXiv | 発展 | Deep GA。乱数シードによる変異の圧縮表現。#9 の土台。 | — 参照のみ（並行テーマ neuroevolution-at-scale） |
| 38 | [HyperNetworks](https://arxiv.org/abs/1609.09106) | 2016 | ICLR 2017 | 発展 | 勾配で学習する重み生成網。HyperNEAT の考えを微分可能化した系譜。 | — 参照のみ（hypernetworks 分野で調査） |
