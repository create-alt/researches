# 遺伝的アルゴリズム — 先行研究調査

遺伝的アルゴリズム（GA）と進化計算について、ネットワーク構造を進化させる NEAT と間接符号化、連続最適化の標準手法 CMA-ES、分子設計・配送計画・ロボット設計などの応用、遺伝的プログラミングとシンボリック回帰、進化戦略による大規模ニューロエボリューション（LLM の微調整を含む）の観点から系譜をまとめる。群知能分野の GA との融合、開放性分野の品質多様性とつながる。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/`）は main ブランチから引き継いでいる。

## テーマ一覧

| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- | --- |
| 第1回 | [NEAT とトポロジー進化・間接符号化](#neat) | NEAT・rtNEAT から、CPPN・HyperNEAT・DPPN などの間接符号化、CoDeepNEAT・WANN、JAX/GPU 実装の TensorNEAT、FER 仮説と ES-HyperNEAT の最新まで | [pptx](neat/neat.pptx) / [pdf](neat/neat.pdf) | 10 本 | 38 本 | 2026-10-27 |
| 第1回 | [CMA-ES とその発展](#cma-es) | CMA-ES のチュートリアルを原典に、NES による自然勾配の解釈、大規模化（LM-CMA）、多目的化、混合整数への拡張と収束解析、学習率適応、ベイズ最適化との融合、LLM との協調、停止基準とモジュール化実装まで | [pptx](cma-es/cma-es.pptx) / [pdf](cma-es/cma-es.pdf) | 11 本 | 39 本 | 2026-10-27 |
| 第1回 | [遺伝的アルゴリズムの応用](#applications) | GB-GA・GuacaMol・PMO による分子設計ベンチマークから、LLM を演算子にした分子 GA、配送計画の HGS と学習型初期化、結晶構造探索、進化的ロボット設計、合成可能性を考慮した GA まで | [pptx](applications/applications.pptx) / [pdf](applications/applications.pdf) | 10 本 | 27 本 | 2026-10-27 |
| 第1回 | [遺伝的プログラミングとシンボリック回帰](#genetic-programming) | Cartesian GP・lexicase selection から、AI Feynman・PySR・SRBench によるベンチマーク、LLM を使ったシンボリック回帰と LLM による演算子設計まで | [pptx](genetic-programming/genetic-programming.pptx) / [pdf](genetic-programming/genetic-programming.pdf) | 10 本 | 28 本 | 2026-10-27 |
| 第1回 | [進化戦略・ニューロエボリューションの大規模化](#neuroevolution-at-scale) | OpenAI-ES・Deep GA から、ES と勾配の関係、GPU/JAX による並列化、進化的モデルマージ、ES による LLM の微調整（EGGROLL など）まで | [pptx](neuroevolution-at-scale/neuroevolution-at-scale.pptx) / [pdf](neuroevolution-at-scale/neuroevolution-at-scale.pdf) | 11 本 | 34 本 | 2026-10-27 |

合計：スライド化 52 本、引用論文一覧 166 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-27 | 第1回調査（分野新設）。指定テーマの「NEAT」「CMA-ES」「応用」に、推薦テーマとして「遺伝的プログラミングとシンボリック回帰」と「進化戦略・ニューロエボリューションの大規模化」を加えた5テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典（Hansen & Ostermeier 2001、Koza 1992 など）は本文未確認として一覧に記載。既存デッキ（他分野を含む）でスライド化済みの論文は再掲せず参照。 |

## 追加調査を推奨するテーマ

これまでの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。

1. **LLM を演算子にした進化計算と古典的手法の比較（コスト対効果）**  
   分子設計では LLM を交叉に使う GA が首位でも実行時間は約20倍で、NEAT 型のトポロジー進化と LLM 駆動の構造探索を直接比べた研究は見つからなかった。CMA-ES と LLM の協調（Centaur など）、LLM による GP 演算子の設計も含め、同じ評価予算で古典手法と比べた研究を追う。

2. **ES による LLM の継続学習と、低ランク・部分空間 ES の理論**  
   大規模化テーマでは「ES で微調整すると忘れるか」で結論が割れた。EGGROLL の rank-1 摂動の安定性解析、量子化空間・部分空間での ES、ツール呼び出しなど非微分な長期ホライズン系への適用を合わせて調べる。

3. **混合変数への CMA-ES の拡張と、再始動・停止の設計**  
   CMA-ES with Margin から CatCMA と収束解析へと、混合整数への拡張が急速に体系化している。IPOP/BIPOP の再始動から、盆地を見つけて配る構造化再始動と停止基準の定量評価までを追う。

4. **シンボリック回帰のベンチマークの公平性と、エージェント型シンボリック回帰**  
   SRBench 2.0（GP 系中心）と LLM-SRBench（LLM 系中心）で評価軸が分かれ、数値精度では PySR が LLM 系に勝つなど結論が指標に依存する。データ汚染の対策と、仮説・実験・診断を回すエージェント型の手法を合わせて調べる。

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は既存デッキ（他分野の場合は `<field>/<theme>`）でスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。

---

<a id="neat"></a>

## NEAT とトポロジー進化・間接符号化（neat/）

資料：[neat.pptx](neat/neat.pptx) ／ [neat.pdf](neat/neat.pdf) ／ 生成元 [spec.json](neat/spec.json) ／ [テーマ README](neat/README.md)


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

---

<a id="cma-es"></a>

## CMA-ES とその発展（cma-es/）

資料：[cma-es.pptx](cma-es/cma-es.pptx) ／ [cma-es.pdf](cma-es/cma-es.pdf) ／ 生成元 [spec.json](cma-es/spec.json) ／ [テーマ README](cma-es/README.md)


### 調査履歴
- 2026-10-27: arXiv API（`abs:"CMA-ES"`、`ti:"covariance matrix adaptation"`、学習率・収束・混合整数・LLM との組合せ）と WebSearch で 2025〜2026 年の CMA-ES 研究を洗い出し、学習率適応（LRA）、混合整数 ES の収束理論、停止基準の定量評価、モジュール化（ModCMA）、LLM との協調（Centaur）を最新動向として選んだ。
- そこから系譜を遡り、原典 CMA-ES（Hansen & Ostermeier 2001）→ 自然勾配による再解釈（NES）→ 大規模化（sep-CMA / VD-CMA → LM-CMA）、多目的化（MO-CMA-ES → COMO-CMA-ES）、混合整数化（CMA-ES with Margin）、BO との組合せ（CMA-BO）を追った。
- 原典 2001 年論文・IPOP・BIPOP・MO-CMA-ES・sep-CMA は OpenAlex で OA 版を探したが、MIT Press / IEEE / ACM は非公開、OA 版のある HAL（inria-00382093, inria-00287367）はこの環境から到達不可のため本文未確認。原典枠には内容を最もよく伝える Hansen のチュートリアル（arXiv）を置いた。
- 既存デッキとの重複回避：IGO と Beyond IGO-Flow（swarm-intelligence/particle-theory）、CMA-MAE（open-endedness/quality-diversity）、LES（swarm-intelligence/metabbo）、LLaMEA（swarm-intelligence/ga-hybrid）、COCO（swarm-intelligence/algo-evaluation）は参照のみ。深層学習・LLM 向け大規模 ES は neuroevolution-at-scale 担当に譲った。

### 系譜
```
[原典] CMA-ES (Hansen & Ostermeier 2001, 本文未確認) ── 解説: CMA-ES Tutorial (Hansen 2016)
   │
   ├─ 自然勾配としての再解釈: NES (Wierstra+ 2014) ─ IGO (Ollivier+ 2017, 既存) ─┐
   │                                                                          └→ LRA-CMA-ES (Nomura+ 2024)
   ├─ 再始動: IPOP (2005) / BIPOP (2009)（本文未確認） ──────────────→ Stopping criteria (Tanabe 2026)
   ├─ 大規模化: sep-CMA (2008, 本文未確認) / VD-CMA (2014) ─────────→ LM-CMA (Loshchilov 2017)
   ├─ 多目的化: MO-CMA-ES (Igel+ 2007, 本文未確認) ─────────────────→ COMO-CMA-ES (Touré+ 2019)
   ├─ 混合整数: CMA-ES with Margin (Hamano+ 2022) ─────────────────→ Mixed-integer ES convergence (Hamano+ 2026)
   ├─ BO との協調: CMA-BO (Ngo+ 2024)
   ├─ LLM との協調: (EvoLLM 2024, 参照のみ) ───────────────────────→ Centaur (Ferreira+ 2026)
   └─ 部品化と自動設定: ModEA (2016) / modular CMA-ES (2021) ──────→ ModCMA (de Nobel+ 2026)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [The CMA Evolution Strategy: A Tutorial](https://arxiv.org/abs/1604.00772) | 2016 | arXiv プレプリント | 原典 | rank-μ・rank-one 更新と CSA を導出つきで解説した CMA-ES の標準文献。既定パラメータ・終了判定・実装を収録。 | ✅ p.2 |
| 2 | [Natural Evolution Strategies](https://arxiv.org/abs/1106.4487) | 2014 | JMLR | 発展 | 期待適応度の自然勾配で分布を更新する NES（xNES・SNES）。xNES と CMA-ES の rank-μ 更新の対応を示した。 | ✅ p.3 |
| 3 | [LM-CMA: an Alternative to L-BFGS for Large Scale Black-box Optimization](https://arxiv.org/abs/1511.00221) | 2017 | Evolutionary Computation | 発展 | m 本の進化パスからコレスキー因子を再構成する限定メモリ CMA-ES。10 万次元で L-BFGS と比較。 | ✅ p.4 |
| 4 | [Uncrowded Hypervolume Improvement: COMO-CMA-ES and the Sofomore framework](https://arxiv.org/abs/1904.08823) | 2019 | GECCO | 発展 | 単目的 CMA-ES を p 個束ねる多目的枠組みと UHVI 適応度。2 目的凸二次で線形収束。 | ✅ p.5 |
| 5 | [CMA-ES with Margin: Lower-Bounding Marginal Probability for Mixed-Integer Black-Box Optimization](https://arxiv.org/abs/2205.13482) | 2022 | GECCO | 発展 | 整数次元の周辺確率に下限を課して固定化を防ぐ混合整数 CMA-ES。2 値を含む問題で成功率 100%。 | ✅ p.6 |
| 6 | [CMA-ES with Learning Rate Adaptation](https://arxiv.org/abs/2401.15876) | 2024 | ACM TELO | 発展 | SNR 一定を目標に学習率を適応。既定 λ のまま多峰・雑音問題を解く。 | ✅ p.7 |
| 7 | [High-dimensional Bayesian Optimization via Covariance Matrix Adaptation Strategy](https://arxiv.org/abs/2402.03104) | 2024 | TMLR | 発展 | CMA の楕円を BO の局所領域にするメタアルゴリズム。100〜500 次元で TuRBO・BAxUS・CMA-ES を上回る。 | ✅ p.8 |
| 8 | [Can LLMs Beat Classical Hyperparameter Optimization Algorithms? A Study on autoresearch](https://arxiv.org/abs/2603.24647) | 2026 | arXiv プレプリント | 最新 | 言語モデル学習の HPO で古典手法が LLM エージェントに勝ち、CMA-ES の内部状態を LLM と共有する Centaur が最良。 | ✅ p.9 |
| 9 | [Convergence Analysis of Evolution Strategies for Mixed-Integer Optimization](https://arxiv.org/abs/2605.21000) | 2026 | GECCO | 最新 | 整数分散の下限だけでは連続変数が早期収束し、上限も入れれば線形収束することをドリフト解析で証明。 | ✅ p.10 |
| 10 | [Quantitative Performance Analysis of Stopping Criteria for CMA-ES](https://arxiv.org/abs/2606.09220) | 2026 | PPSN | 最新 | pycma の停止基準 11 種を POSE 指標で BBOB 上で定量評価。tolfunhist とポートフォリオが最良。 | ✅ p.11 |
| 11 | [The Modular CMA-ES: A Framework for Modern Evolution Strategies](https://arxiv.org/abs/2610.09699) | 2026 | arXiv プレプリント | 最新 | 14 モジュール・約 1486 万変種を組める ModCMA。行列適応の比較と SMAC による関数別自動設定。 | ✅ p.12 |
| 12 | [Completely Derandomized Self-Adaptation in Evolution Strategies](https://doi.org/10.1162/106365601750190398) | 2001 | Evolutionary Computation | 原典 | CMA-ES の原論文。累積経路による共分散行列適応とステップサイズ制御を導入（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 13 | [Reducing the Time Complexity of the Derandomized Evolution Strategy with Covariance Matrix Adaptation (CMA-ES)](https://doi.org/10.1162/106365603321828970) | 2003 | Evolutionary Computation | 発展 | rank-μ 更新を導入し大集団での適応を高速化（チュートリアルの記述に基づく）。 | ⚠️ 本文未確認 |
| 14 | [A Restart CMA Evolution Strategy With Increasing Population Size](https://doi.org/10.1109/CEC.2005.1554902) | 2005 | CEC | 発展 | 再始動ごとに λ を 2 倍にする IPOP-CMA-ES（ModCMA・Tanabe 2026 の記述に基づく）。 | ⚠️ 本文未確認 |
| 15 | [Benchmarking a BI-population CMA-ES on the BBOB-2009 Function Testbed](https://doi.org/10.1145/1570256.1570333) | 2009 | GECCO Workshop | 発展 | 大集団と小集団（σ も乱択）の 2 系統を予算で切り替える BIPOP-CMA-ES。HAL の OA 版は環境から到達不可。 | ⚠️ 本文未確認 |
| 16 | [Covariance Matrix Adaptation for Multi-objective Optimization](https://doi.org/10.1162/evco.2007.15.1.1) | 2007 | Evolutionary Computation | 発展 | (1+1)-CMA-ES を超体積選択で束ねた MO-CMA-ES（COMO-CMA-ES 論文の記述に基づく）。 | ⚠️ 本文未確認 |
| 17 | [A Simple Modification in CMA-ES Achieving Linear Time and Space Complexity](https://doi.org/10.1007/978-3-540-87700-4_30) | 2008 | PPSN | 発展 | 共分散を対角に限定した sep-CMA-ES。HAL の OA 版は環境から到達不可。 | ⚠️ 本文未確認 |
| 18 | [Large Language Models As Evolution Strategies](https://arxiv.org/abs/2402.18381) | 2024 | arXiv プレプリント | 発展 | 離散化した解を順位順にプロンプトし LLM に平均を提案させる EvoLLM。本文は読んだが比較相手に CMA-ES がなく、LLM×CMA-ES の枠は Centaur を優先。 | — 参照のみ |
| 19 | [Explicit and Non-asymptotic Query Complexities of Rank-Based Zeroth-order Algorithms on Smooth Functions](https://arxiv.org/abs/2512.16200) | 2025 | arXiv プレプリント | 最新 | 順位ベース ZO 法の明示的な問い合わせ計算量 Õ(dL/μ·log…) を証明し、対数重みを Blom 近似で説明。本文は読んだが実験・図がなく単著プレプリントのため理論枠は Hamano+ 2026 を優先。 | — 参照のみ |
| 20 | [Integer Natural Evolution Strategies](https://arxiv.org/abs/2608.23714) | 2026 | arXiv プレプリント | 最新 | 両側幾何分布の自然勾配から ℓ1 型ステップサイズ適応を導いた整数 NES（アブストラクトのみ確認）。 | — 参照のみ |
| 21 | [CatCMA with Margin for Single- and Multi-Objective Mixed-Variable Black-Box Optimization](https://arxiv.org/abs/2504.07884) | 2025 | GECCO（拡張版プレプリント） | 最新 | 連続・整数・カテゴリを同時に扱う CatCMAwM と多目的版 COMO-CatCMAwM（アブストラクトのみ確認）。 | — 参照のみ |
| 22 | [CatCMA: Stochastic Optimization for Mixed-Category Problems](https://arxiv.org/abs/2405.09962) | 2024 | GECCO | 発展 | 正規分布とカテゴリ分布の同時分布を IGO で更新する混合カテゴリ最適化（題目・要旨のみ確認）。 | — 参照のみ |
| 23 | [MSC-CMA-ES: Structure-Aware Restarts for CMA-ES via Cyclic Nearest-Better Basin Discovery](https://arxiv.org/abs/2606.15830) | 2026 | arXiv プレプリント | 最新 | 近傍最良クラスタリングで盆地を見つけて再始動を配る。CEC 合成関数で BIPOP の 2.7 倍の到達率（アブストラクトのみ確認）。 | — 参照のみ |
| 24 | [Covariance Matrix Adaptation Evolution Strategy without a matrix](https://arxiv.org/abs/2601.00102) | 2025 | GECCO Companion | 最新 | 差分ベクトルのアーカイブから標本し、標準 CMA-ES と同分布を保つ行列なし版（アブストラクトのみ確認）。 | — 参照のみ |
| 25 | [Covariance Matrix Adaptation Evolution Strategy for Low Effective Dimensionality](https://arxiv.org/abs/2412.01156) | 2024 | arXiv プレプリント | 発展 | 要素ごとの SNR で有効次元を推定し既定値とノルム計算を補正する CMA-ES-LED（アブストラクトのみ確認）。 | — 参照のみ |
| 26 | [A Superlinearly Convergent Evolution Strategy](https://arxiv.org/abs/2505.10987) | 2025 | arXiv プレプリント | 最新 | ヘッセ推定 ES の組換えを準ニュートン段に置き換え超線形収束（アブストラクトのみ確認）。 | — 参照のみ |
| 27 | [Abnormal Mutations: Evolution Strategies Don't Require Gaussianity](https://arxiv.org/abs/2502.03148) | 2025 | arXiv プレプリント | 最新 | 一様分布などの非正規変異でも CMA-ES の性能がほぼ変わらないと実証（アブストラクトのみ確認）。ModCMA の標本化モジュールの根拠。 | — 参照のみ |
| 28 | [Global Linear Convergence of Evolution Strategies on More Than Smooth Strongly Convex Functions](https://arxiv.org/abs/2009.08647) | 2022 | SIAM J. Optim. | 発展 | (1+1)_κ-ES の大域線形収束を強凸を含む広い関数族で証明（アブストラクトのみ確認）。 | — 参照のみ |
| 29 | [CMA-ES with Learning Rate Adaptation: Can CMA-ES with Default Population Size Solve Multimodal and Noisy Problems?](https://arxiv.org/abs/2304.03473) | 2023 | GECCO | 発展 | LRA-CMA-ES の会議版（TELO 版で拡張済みのため #6 で代表）。 | — 参照のみ |
| 30 | [cmaes: A Simple yet Practical Python Library for CMA-ES](https://arxiv.org/abs/2402.01373) | 2024 | arXiv プレプリント | 発展 | LRA・Margin・warm start などを実装したライブラリ（題目・要旨のみ確認）。 | — 参照のみ |
| 31 | [Greedy Is a Strong Default: Agents as Iterative Optimizers](https://arxiv.org/abs/2603.27415) | 2026 | arXiv プレプリント | 最新 | LLM 提案の貪欲山登りが XGBoost 調整で CMA-ES と同等の AUC を 3 倍少ない評価で得たと報告（アブストラクトのみ確認）。 | — 参照のみ |
| 32 | [A Hybrid Nested Harness for Decoupling Structure and Parameters in LLM-Driven Optimization](https://arxiv.org/abs/2608.08156) | 2026 | LM4Sci @ COLM | 最新 | LLM が構造を、CMA-ES が数値を担う入れ子探索（アブストラクトのみ確認）。 | — 参照のみ |
| 33 | [Learning to Orchestrate Evolutionary Search: Progression-Aware DRL for Dynamic DE-CMA-ES Coordination](https://arxiv.org/abs/2610.11546) | 2026 | arXiv プレプリント | 最新 | DDPG で DE と CMA-ES の資源配分・集団サイズ・再始動を制御（アブストラクトのみ確認）。 | — 参照のみ |
| 34 | [Information-Geometric Optimization Algorithms](https://arxiv.org/abs/1106.3708) | 2017 | JMLR | 発展 | CMA-ES・NES・cGA を自然勾配流で統一した IGO 枠組み。 | ↪ 既存：swarm-intelligence/particle-theory p.2 |
| 35 | [Beyond IGO-Flow: Toward Convergence Analysis of IGO in Continuous Spaces](https://arxiv.org/abs/2606.17523) | 2026 | PPSN | 最新 | 離散時間 IGO（学習率有限）の収束解析。 | ↪ 既存：swarm-intelligence/particle-theory p.10 |
| 36 | [Covariance Matrix Adaptation MAP-Annealing](https://arxiv.org/abs/2205.10752) | 2023 | GECCO | 発展 | CMA-ES を品質多様性最適化に組み込んだ CMA-MAE。 | ↪ 既存：open-endedness/quality-diversity p.6 |
| 37 | [Discovering Evolution Strategies via Meta-Black-Box Optimization (LES)](https://arxiv.org/abs/2211.11260) | 2023 | ICLR | 発展 | 注意機構による ES 更新則のメタ学習。 | ↪ 既存：swarm-intelligence/metabbo p.4 |
| 38 | [LLaMEA: A Large Language Model Evolutionary Algorithm for Automatically Generating Metaheuristics](https://arxiv.org/abs/2405.20132) | 2024 | IEEE TEVC | 発展 | LLM によるメタヒューリスティクス自動生成。 | ↪ 既存：swarm-intelligence/ga-hybrid p.7 |
| 39 | [COCO: A Platform for Comparing Continuous Optimizers in a Black-Box Setting](https://arxiv.org/abs/1603.08785) | 2021 | Optim. Methods Softw. | 発展 | CMA-ES 研究の標準ベンチマーク基盤（BBOB）。 | ↪ 既存：swarm-intelligence/algo-evaluation p.5 |

---

<a id="applications"></a>

## 遺伝的アルゴリズムの応用（applications/）

資料：[applications.pptx](applications/applications.pptx) ／ [applications.pdf](applications/applications.pdf) ／ 生成元 [spec.json](applications/spec.json) ／ [テーマ README](applications/README.md)


### 調査履歴
- 2026-10-27: arXiv API と WebSearch で 2025〜2026 年の GA 応用（"genetic algorithm" × molecule / materials / vehicle routing / morphology / LLM）を探索。分子設計では SynGA（ICLR 2026）、MolLEO（ICLR 2025）、Genetic GFN（NeurIPS 2024）が共通して Graph GA（GB-GA）と PMO を出発点としていたため、GB-GA → GuacaMol → PMO と原典まで遡った。
- 配送計画は EARLI（NVIDIA 2025）が初期化対象とする HGS-CVRP（Vidal 2022）まで遡り、材料（汎用 NNP×GA の結晶構造予測）とロボット形態進化（brain-body 同時進化の網羅的地形解析）を加えて「どんな問題で GA が DL より有効か」を軸に 10 本をスライド化した。
- 古典的成功例の NASA ST5 進化アンテナ（Hornby+ 2006 / 2011）は NTRS・出版社とも到達できず、Semantic Scholar でも OA 版がなく本文未確認。GB-GA は PMC の OAI-PMH（JATS XML）で全文を読み、図は Table 2 を再描画した。

### 系譜
```
[分子設計]
GB-GA (Jensen 2019) ──> GuacaMol (Brown+ 2019: 目的指向で Graph GA が首位)
        │                      │
        │                      └──> PMO (Gao+ 2022: 評価回数を揃えても Graph GA は2位)
        │                                 ├──> Genetic GFN (Kim+ 2024: GA を GFlowNet の探索器に)
        ├──────────────────────────────────> MolLEO (Wang+ 2025: LLM を交叉・変異に)
        └──────────────────────────────────> SynGA (Lo+ 2026: 合成経路を遺伝子に)
[配送計画]
HGS (Vidal+ 2012, 本文未確認) ──> HGS-CVRP (Vidal 2022) ──> EARLI (Greenberg+ 2025: RL 初期化 + GA)
                                                        └─> PyVRP+ (Malik+ 2026, 参照のみ: LLM が HGS 部品を進化)
[材料]
USPEX (Oganov & Glass 2006, 本文未確認) ─> CHGA ─> GA-CSP with PFP (Shibayama+ 2025: 汎用 NNP 評価)
[ロボット形態]
Evolving Virtual Creatures (Sims 1994, 本文未確認) ─> Evolution Gym (2021) ─> Brain-Body Landscape (Mertan & Cheney 2025)
[古典的成功例]
NASA ST5 進化アンテナ (Lohn+ 2004 / Hornby+ 2006 / 2011, 本文未確認)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [A graph-based genetic algorithm and generative model/Monte Carlo tree search for the exploration of chemical space](https://doi.org/10.1039/C8SC05372C)（[PMC 版](https://pmc.ncbi.nlm.nih.gov/articles/PMC6438151/)） | 2019 | Chemical Science | 原典 | 分子グラフ上の交叉・変異による GB-GA。罰則付き logP で、1,000 評価・30 秒の GA が約2万評価・8時間の RNN/VAE 系を上回った。 | ✅ p.2 |
| 2 | [GuacaMol: Benchmarking Models for De Novo Molecular Design](https://arxiv.org/abs/1811.09621) | 2019 | J. Chem. Inf. Model. | 発展 | 分子設計ベンチマーク。目的指向20課題で Graph GA 17.983 が首位、SMILES LSTM 17.340 が2位。品質は LSTM が上。 | ✅ p.3 |
| 3 | [Hybrid Genetic Search for the CVRP: Open-Source Implementation and SWAP* Neighborhood](https://arxiv.org/abs/2012.10384) | 2022 | Computers & Operations Research | 原典 | HGS の公開実装と SWAP* 近傍。Uchoa 100問で平均ギャップ 0.11%（OR-Tools 4.01%、LKH-3 1.00%）。 | ✅ p.4 |
| 4 | [Sample Efficiency Matters: A Benchmark for Practical Molecular Optimization](https://arxiv.org/abs/2206.12411) | 2022 | NeurIPS (D&B) | 発展 | 評価1万回の制約で25手法を比較。REINVENT と Graph GA が上位で、新しい深層手法の多くは及ばない。 | ✅ p.5 |
| 5 | [Genetic-guided GFlowNets for Sample Efficient Molecular Optimization](https://arxiv.org/abs/2402.05961) | 2024 | NeurIPS | 最新 | Graph GA を GFlowNet のオフポリシー探索に使う。PMO 合計 16.213 で首位。 | ✅ p.6 |
| 6 | [Efficient Evolutionary Search Over Chemical Space with Large Language Models](https://arxiv.org/abs/2406.16976) | 2025 | ICLR | 最新 | Graph GA の交叉・変異を GPT-4 / BioT5 / MoleculeSTM に置換（MolLEO）。PMO 合計 17.862。実行時間は大幅増。 | ✅ p.7 |
| 7 | [Accelerating Vehicle Routing via AI-Initialized Genetic Algorithms](https://arxiv.org/abs/2504.06126) | 2025 | arXiv プレプリント | 最新 | RL で初期集団を作り GA（HGS / cuOpt / PyVRP）で改良する EARLI。500顧客で10倍の高速化。 | ✅ p.8 |
| 8 | [Efficient Crystal Structure Prediction Using Universal Neural Network Potential with Diversity Preservation in Genetic Algorithms](https://arxiv.org/abs/2503.21201) | 2025 | arXiv プレプリント | 最新 | 汎用 NNP（PFP）評価の GA 型結晶構造予測。エイジングとニッチングで凸包全体を探索し、CHGA・ランダム探索を上回る。 | ✅ p.9 |
| 9 | [Evolutionary Brain-Body Co-Optimization Consistently Fails to Select for Morphological Potential](https://arxiv.org/abs/2508.17464) | 2025 | Artificial Life（採録決定、ALIFE 2025 拡張版） | 最新 | 130万形態の地形を網羅し、同時進化が有望な形態を過小評価して淘汰することを示した（GA が苦手な場面）。 | ✅ p.10 |
| 10 | [A Genetic Algorithm for Navigating Synthesizable Molecular Spaces](https://arxiv.org/abs/2509.20719) | 2026 | ICLR | 最新 | 合成木を遺伝子とする SynGA。SynGBO は PMO 16.426 で合成制約なしの最良手法も上回る。 | ✅ p.11 |
| 11 | [Automated Antenna Design with Evolutionary Algorithms](https://doi.org/10.2514/6.2006-7242) | 2006 | AIAA SPACE 2006 | 原典 | NASA ST5 衛星に搭載された進化設計 X バンドアンテナの事例紹介（検索情報に基づく）。NTRS・出版社に到達できず OA 版も見つからない。 | ⚠️ 本文未確認 |
| 12 | [Computer-Automated Evolution of an X-Band Antenna for NASA's Space Technology 5 Mission](https://doi.org/10.1162/EVCO_a_00005) | 2011 | Evolutionary Computation | 原典 | 宇宙で飛んだ初の進化設計ハードウェアとされる ST5 アンテナの詳細（検索情報に基づく）。Semantic Scholar 上も非 OA。 | ⚠️ 本文未確認 |
| 13 | [Human-competitive evolved antennas](https://doi.org/10.1017/S0890060408000164) | 2008 | AI EDAM | 原典 | 進化アンテナが人手設計と同等以上であることの事例研究（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 14 | [A Hybrid Genetic Algorithm for Multidepot and Periodic Vehicle Routing Problems](https://doi.org/10.1287/opre.1120.1048) | 2012 | Operations Research | 原典 | HGS の原論文（Vidal+ 2012）。多様性管理付きハイブリッド GA（検索情報と HGS-CVRP 本文の記述に基づく）。 | ⚠️ 本文未確認 |
| 15 | [Crystal structure prediction using ab initio evolutionary techniques: Principles and applications](https://doi.org/10.1063/1.2210932) | 2006 | J. Chem. Phys. | 原典 | USPEX（Oganov & Glass）。GA 型結晶構造予測の代表（検索情報と GA-CSP 本文の記述に基づく）。 | ⚠️ 本文未確認 |
| 16 | [Evolving Virtual Creatures](https://doi.org/10.1145/192161.192167) | 1994 | SIGGRAPH | 原典 | 形態と制御の同時進化の原点（Sims）。Brain-Body Landscape 本文で起点として引用。 | ⚠️ 本文未確認 |
| 17 | [Genetic algorithms are strong baselines for molecule generation](https://arxiv.org/abs/2310.09267) | 2023 | arXiv プレプリント | 発展 | mol_ga。分位サンプリングの単純 GA が PMO の全手法を上回るとし「GA 基準」を提案。冒頭のみ確認、内容が PMO・Genetic GFN と重なるためスライド化せず。 | — 参照のみ |
| 18 | [Augmenting Genetic Algorithms with Deep Neural Networks for Exploring the Chemical Space](https://arxiv.org/abs/1909.11655) | 2020 | ICLR | 発展 | GA+D。SELFIES GA に識別器で新規性圧をかける。PMO 内の比較対象として参照のみ。 | — 参照のみ |
| 19 | [PyVRP+: LLM-Driven Metacognitive Heuristic Evolution for Hybrid Genetic Search in Vehicle Routing Problems](https://arxiv.org/abs/2604.07872) | 2026 | AAMAS | 最新 | LLM が HGS の部品を Reason-Act-Reflect で進化させ、最大 2.70% 改善（要旨のみ確認）。LLM 進化は既存テーマと重なるため参照のみ。 | — 参照のみ |
| 20 | [MolLIBRA: Genetic Molecular Optimization with Multi-Fingerprint Surrogates and Text-Molecule Aligned Critic](https://arxiv.org/abs/2602.07002) | 2026 | arXiv プレプリント | 最新 | GA 候補を GP アンサンブルと CLAMP で事前選別。PMO-1K で 22 課題中 14 課題首位（要旨のみ）。 | — 参照のみ |
| 21 | [ToolMol: Evolutionary Agentic Framework for Multi-objective Drug Discovery](https://arxiv.org/abs/2605.12784) | 2026 | arXiv プレプリント | 最新 | 多目的 GA と RDKit ツールを使う LLM エージェント演算子（要旨のみ）。 | — 参照のみ |
| 22 | [GEMS -- Guided Evolutionary Molecule Design for Sustainable Chemicals](https://arxiv.org/abs/2605.15932) | 2026 | arXiv プレプリント | 最新 | 専門家が対話的に GA の評価関数を操作する可視分析ツール（要旨のみ）。 | — 参照のみ |
| 23 | [Complex crystal structure prediction using ML-enhanced multi-minima iterative genetic algorithm](https://arxiv.org/abs/2607.01004) | 2026 | arXiv プレプリント | 最新 | ANN ポテンシャル＋メタダイナミクス風ペナルティの GA で La4Co4Pb 構造を予測（要旨のみ）。 | — 参照のみ |
| 24 | [Shaping the Evolutionary Dynamics of Robot Morphology via Adaptive Control Learning](https://arxiv.org/abs/2608.23100) | 2026 | arXiv プレプリント | 最新 | 制御学習が形態進化に与える影響を「形態知能」と「真のポテンシャル」に分解（要旨のみ）。 | — 参照のみ |
| 25 | [Language Model Crossover: Variation through Few-Shot Prompting](https://arxiv.org/abs/2302.12170) | 2023 | ACM TELO | 発展 | LLM を交叉演算子にする LMX。MolLEO の先行。 | ↪ 既存：open-endedness/llm-driven-evolution p.2 |
| 26 | [Illuminating search spaces by mapping elites](https://arxiv.org/abs/1504.04909) | 2015 | arXiv | 発展 | MAP-Elites。Brain-Body Landscape の比較手法。 | ↪ 既存：open-endedness/quality-diversity p.3 |
| 27 | [Attention, Learn to Solve Routing Problems!](https://arxiv.org/abs/1803.08475) | 2019 | ICLR | 発展 | EARLI の RL 方策の基盤となった Attention Model。 | ↪ 既存：swarm-intelligence/aco-neural p.4 |

---

<a id="genetic-programming"></a>

## 遺伝的プログラミングとシンボリック回帰（genetic-programming/）

資料：[genetic-programming.pptx](genetic-programming/genetic-programming.pptx) ／ [genetic-programming.pdf](genetic-programming/genetic-programming.pdf) ／ 生成元 [spec.json](genetic-programming/spec.json) ／ [テーマ README](genetic-programming/README.md)


### 調査履歴
- 2026-10-27: arXiv API で「symbolic regression × LLM」「genetic programming」の 2025〜2026 年の新着を確認したところ、LLM で方程式や GP 演算子を生成する研究が急増していた。そこから LLM-SR → LLM-SRBench、PySR → SRBench → SRBench 2.0 という「手法とベンチマークの系譜」と、GP 側の表現・選択の原典（CGP、lexicase → ε-lexicase、GSGP → TSGP）へ遡った。
- 原典の本文は GP bibliography（gpbib.pmacs.upenn.edu）のキャッシュや著者公開版、Semantic Scholar の openAccessPdf で探した。CGP（GECCO 1999 予稿の PS を ghostscript で PDF 化）と Helmuth+ 2015（著者版）は全文を読めた。Koza 1989/1992、Schmidt & Lipson 2009、Moraglio+ 2012（GSGP）、Brameier & Banzhaf 2001（Linear GP）は正規の公開版に届かず本文未確認とした（Schmidt & Lipson と Koza は第三者の授業サイトなどに複製があったが、出所が正規でないため使っていない）。
- 既存デッキ（swarm-intelligence/ga-hybrid・metabbo、open-endedness/llm-driven-evolution）との重複を避け、FunSearch・LLaMEA・LMX などは参照のみにした。

### 系譜
```
[GP の表現]
Koza の木構造 GP (1989/1992, 本文未確認)
  ├→ CGP (Miller 1999) ……………………→ Runtime Analysis of CGP (2026, 参照のみ)
  ├→ Linear GP (Brameier & Banzhaf 2001, 本文未確認)
  └→ GSGP (Moraglio+ 2012, 本文未確認) → SLIM_GSGP (2024) → TSGP (Anthes+ 2025)

[GP の選択]
Lexicase (Spector 2012 / Helmuth+ 2015) → ε-lexicase (La Cava+ 2016)
  → LLM によるゼロショット親選択 (Zhang+ 2026, PPSN)

[シンボリック回帰の手法とベンチマーク]
Eureqa / Schmidt & Lipson (2009, 本文未確認)
  → AI Feynman (2020) ─┐
  → ε-lexicase など GP 系 ─┴→ SRBench (2021) → PySR / EmpiricalBench (2023) → SRBench 2.0 (2025)
[LLM 時代]
FunSearch (2024, 既存) → LLM-SR (ICLR 2025) → LLM-SRBench (ICML 2025) → DIGEST・SRHarness など (2026)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [An empirical study of the efficiency of learning boolean functions using a Cartesian Genetic Programming approach](https://gpbib.pmacs.upenn.edu/gecco1999/GP-411.ps) | 1999 | GECCO | 原典 | 格子状ノードの整数列で表す Cartesian GP を提案。偶数パリティ・乗算器で GP/EP より最大約20倍少ない評価数。 | ✅ p.2 |
| 2 | [Epsilon-Lexicase Selection for Regression](https://arxiv.org/abs/1905.13266) | 2016 | GECCO | 発展 | lexicase 選択の合格条件を MAD ベースの ε で緩め、回帰で最良のテスト誤差。 | ✅ p.3 |
| 3 | [AI Feynman: a Physics-Inspired Method for Symbolic Regression](https://arxiv.org/abs/1905.11481) | 2020 | Science Advances | 発展 | NN で対称性・分離可能性を見つけ問題を再帰分割。Feynman 100式を全て復元（Eureqa 71%）。 | ✅ p.4 |
| 4 | [Contemporary Symbolic Regression Methods and their Relative Performance](https://arxiv.org/abs/2107.14351) | 2021 | NeurIPS D&B | 発展 | 14 SR 手法・252問題のオープンベンチマーク SRBench。GP 系 Operon が実データで最良。 | ✅ p.5 |
| 5 | [Interpretable Machine Learning for Science with PySR and SymbolicRegression.jl](https://arxiv.org/abs/2305.01582) | 2023 | arXiv | 発展 | 進化→簡約→定数最適化ループの実用 SR ライブラリ。EmpiricalBench で 35/45 正解。 | ✅ p.6 |
| 6 | [LLM-SR: Scientific Equation Discovery via Programming with Large Language Models](https://arxiv.org/abs/2404.18400) | 2025 | ICLR (Oral) | 最新 | LLM が式の骨格をプログラムで提案し係数は最適化、島モデルで進化。OOD で既存 SR を大きく上回る。 | ✅ p.7 |
| 7 | [Transformer Semantic Genetic Programming for Symbolic Regression](https://arxiv.org/abs/2501.18479) | 2025 | GECCO | 最新 | 意味が近い式の対で学習したトランスフォーマを変異演算子に使う。SLIM_GSGP より小さく高精度。 | ✅ p.8 |
| 8 | [LLM-SRBench: A New Benchmark for Scientific Equation Discovery with Large Language Models](https://arxiv.org/abs/2504.10415) | 2025 | ICML (Oral) | 最新 | 暗記で解けない239問。最良でも記号正解率31.5%、PySR は数値精度では LLM-SR を上回る。 | ✅ p.9 |
| 9 | [Call for Action: towards the next generation of symbolic regression benchmark](https://arxiv.org/abs/2505.03977) | 2025 | GECCO Workshop | 最新 | SRBench 2.0。25手法×24データ×30試行で「全データで最良の手法はない」。評価の標準化を提言。 | ✅ p.10 |
| 10 | [Benchmarking Zero-Shot LLM-Generated Parent Selection in Genetic Programming for Symbolic Regression](https://arxiv.org/abs/2607.23505) | 2026 | PPSN | 最新 | 8種の LLM に GP の親選択をゼロショットで書かせ比較。平均では自動 lexicase に届かない。 | ✅ p.11 |
| 11 | [Hierarchical Genetic Algorithms Operating on Populations of Computer Programs](https://gpbib.pmacs.upenn.edu/gp-html/JohnKoza.html) (Koza) | 1989 | IJCAI | 原典 | 木構造プログラムを交叉・選択で進化させる GP の最初期論文。後の書籍 Genetic Programming (MIT Press, 1992) で SR を GP の応用として定式化（検索情報に基づく）。ijcai.org と著者サイトに到達できず。 | ⚠️ 本文未確認 |
| 12 | [Distilling Free-Form Natural Laws from Experimental Data](https://doi.org/10.1126/science.1165893) (Schmidt & Lipson) | 2009 | Science | 原典 | GP による SR で振り子などの実測データから保存則を自動発見したとする論文。Eureqa の基盤（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 13 | [Geometric Semantic Genetic Programming](https://doi.org/10.1007/978-3-642-32937-1_3) (Moraglio, Krawiec, Johnson) | 2012 | PPSN | 原典 | 親の線形結合などで意味空間を直接探索する幾何学的意味論的演算子を導入（検索情報・TSGP 本文の記述に基づく）。Kent 大リポジトリ等に到達できず。 | ⚠️ 本文未確認 |
| 14 | [A comparison of linear genetic programming and neural networks in medical data mining](https://doi.org/10.1109/4235.910462) (Brameier & Banzhaf) | 2001 | IEEE TEC | 原典 | 命令列でプログラムを表す Linear GP の代表論文（検索情報に基づく）。OA 版なし。 | ⚠️ 本文未確認 |
| 15 | [Solving Uncompromising Problems with Lexicase Selection](https://www.cs.hamilton.edu/~thelmuth/Pubs/lexicase-IEEETEC-2014.pdf) (Helmuth, Spector, Matheson) | 2015 | IEEE TEC | 原典 | lexicase 選択を「妥協できない」問題（代数・乗算器・単語数え・階乗の SR）で検証し、多様性が高いことを示す。著者版を確認。回帰への拡張である ε-lexicase をスライド化したため参照のみ。 | — 参照のみ |
| 16 | [Comment on the Article "Distilling Free-Form Natural Laws from Experimental Data"](https://arxiv.org/abs/1210.7273) (Hillar & Sommer) | 2012 | arXiv | 発展 | Schmidt & Lipson の適合度関数が Hamilton 方程式・Newton 法則を暗に含み「物理の事前知識なし」の主張は誤りと批判。原典が未読のため参照のみ。 | — 参照のみ |
| 17 | [Rethinking Symbolic Regression Datasets and Benchmarks for Scientific Discovery](https://arxiv.org/abs/2206.10540) (SRSD, Matsubara+) | 2022 | DMLR | 発展 | Feynman データの一様サンプリングを物理的な分布に直したベンチマーク。SRBench 2.0 / LLM-SRBench の議論で参照。 | — 参照のみ |
| 18 | [Symbolic Regression with a Learned Concept Library](https://arxiv.org/abs/2409.09359) (LaSR, Grayeli+) | 2024 | NeurIPS | 発展 | LLM が抽出した概念で PySR の探索を導く。LLM-SRBench の比較手法として数値のみ参照。 | — 参照のみ |
| 19 | [Deliberate Evolution: Agentic Reasoning for Sample-Efficient Symbolic Regression with LLMs](https://arxiv.org/abs/2606.04360) | 2026 | ICML | 最新 | エージェント的推論で LLM-SR 系の試行回数を減らす（タイトル・概要のみ確認）。 | — 参照のみ |
| 20 | [DIGEST: Discovery-Guided LLM Tuning for Symbolic Regression](https://arxiv.org/abs/2610.33880) | 2026 | arXiv | 最新 | 発見過程を使って LLM 自体を SR 向けに調整（タイトル・概要のみ確認、10月投稿）。 | — 参照のみ |
| 21 | [SRHarness: A Harness for Agentic Symbolic Regression](https://arxiv.org/abs/2609.35501) | 2026 | arXiv | 最新 | エージェント型 SR の実行基盤（タイトルのみ確認）。 | — 参照のみ |
| 22 | [Automating Parent Selection Configuration in Genetic Programming with Agentic AI](https://arxiv.org/abs/2608.17172) | 2026 | arXiv | 最新 | RAG 付きエージェントが親選択を実装すると ε-lexicase を再発見し同等性能（概要のみ確認）。 | — 参照のみ |
| 23 | [Runtime Analysis of Cartesian Genetic Programming in Evolving Boolean Functions](https://arxiv.org/abs/2606.15923) | 2026 | PPSN | 最新 | CGP のブール関数進化の実行時間解析（タイトルのみ確認）。CGP 系譜の最新理論。 | — 参照のみ |
| 24 | [SymbolicArena: A Unified Infrastructure for Benchmark Distillation and Dynamic Evaluation in Symbolic Regression](https://arxiv.org/abs/2609.35113) | 2026 | arXiv | 最新 | SR ベンチマークの蒸留と動的評価の基盤（タイトルのみ確認）。 | — 参照のみ |
| 25 | [Mathematical discoveries from program search with large language models](https://doi.org/10.1038/s41586-023-06924-6) (FunSearch) | 2024 | Nature | 発展 | LLM＋評価器の進化的プログラム探索。LLM-SR の直接の先行研究。 | ↪ 既存：swarm-intelligence/metabbo p.5 |
| 26 | [LLaMEA: A Large Language Model Evolutionary Algorithm for Automatically Generating Metaheuristics](https://arxiv.org/abs/2405.20132) (van Stein & Bäck) | 2024 | IEEE TEVC 2025 | 発展 | LLM でメタヒューリスティクスを進化的に生成。Zhang+ 2026 の比較対象。 | ↪ 既存：swarm-intelligence/ga-hybrid p.7 |
| 27 | [Evolution of Heuristics: Towards Efficient Automatic Algorithm Design Using Large Language Model](https://arxiv.org/abs/2401.02051) (EoH, Liu+) | 2024 | ICML | 発展 | 思考と実装を同時に進化させる LLM ヒューリスティクス設計。Zhang+ 2026 で参照。 | ↪ 既存：swarm-intelligence/ga-hybrid p.6 |
| 28 | [Language Model Crossover: Variation through Few-Shot Prompting](https://arxiv.org/abs/2302.12170) (LMX, Meyerson+) | 2023 | ACM TELO 2024 | 発展 | LLM を交叉演算子として使う。LLM-SR の比較対象（SR でも評価）。 | ↪ 既存：open-endedness/llm-driven-evolution p.2 |

---

<a id="neuroevolution-at-scale"></a>

## 進化戦略・ニューロエボリューションの大規模化（neuroevolution-at-scale/）

資料：[neuroevolution-at-scale.pptx](neuroevolution-at-scale/neuroevolution-at-scale.pptx) ／ [neuroevolution-at-scale.pdf](neuroevolution-at-scale/neuroevolution-at-scale.pdf) ／ 生成元 [spec.json](neuroevolution-at-scale/spec.json) ／ [テーマ README](neuroevolution-at-scale/README.md)


### 調査履歴
- 2026-10-27: arXiv API で `abs:"evolution strategies" AND (abs:LLM OR abs:"language model")`、`ti:"evolution strategies" AND (ti:scale OR ti:fine-tuning OR ti:LLM OR ti:reasoning)` を新しい順に検索した。2025-09 の ES at Scale（ICML 2026）以降、LLM の全パラメータを ES で微調整する研究が 2026 年に急増していること（EGGROLL、忘却論争、GRPO との幾何比較、Pass@K の被覆、QES・Hyper-ES・非同期 ES など）を確認した。
- 系譜は 2 本たどった。(A) ES の大規模並列：OpenAI-ES → Deep GA / ES と SGD の関係 → PES → EvoJAX（evosax）→ ES at Scale → EGGROLL。(B) LLM への進化計算の持ち込み：進化的モデルマージ（低次元レシピ）→ ES at Scale（全パラメータ）→ 忘却・幾何・被覆をめぐる 2026 年の論争（Abdi+ → Hoy+ → Ba+）。
- 前任者が downloads/ に置いた 13 本の PDF を再利用し、全スライド論文は arXiv 版の本文（問題提起・手法・実験・考察、主要な付録）を読んだ。HTML 版のある 2024 年以降の論文は HTML から図を取得し、それ以外は PDF をページ画像化して切り抜いた。採録先は arXiv のコメント欄と Web 検索（EGGROLL の ICML 2026 は ICML の poster ページ）で確認した。
- ES の原典である Rechenberg（1973）・Schwefel（1977）は書籍で本文に届かず「本文未確認」とした。NES（Wierstra+ 2014）は cma-es 担当との重複を避け参照のみにした。

### 系譜
```
[ES の古典] Rechenberg 1973 / Schwefel 1977〔本文未確認〕 → NES (Wierstra+ 2008/2014, 参照のみ)
                                                            │
[A] 大規模並列化と勾配推定                                     ▼
  OpenAI-ES (2017, 乱数シード共有でスカラー通信、1,440 コアで線形高速化)
     ├→ Deep GA (2017, 勾配を近似しない GA でも 4M パラメータ CNN、シード列で個体を圧縮)
     ├→ ES と SGD の関係 (2017, ES ≒ ノイズ入り SGD、相関 3.9% でも学べる)  ── ES≠有限差分 (Lehman+ 2017, 参照のみ)
     ├→ PES (2021, 部分展開でも不偏な ES 勾配推定) ── LES (2023)〔既存：swarm-intelligence/metabbo〕
     └→ EvoJAX (2022, JAX で集団評価を GPU/TPU に) ── evosax (2022, 30 種の ES/GA を JAX で、参照のみ)
           │
[B] LLM への持ち込み ▼
  Evolutionary Model Merge (2024/2025, CMA-ES でマージレシピを探索：数十〜数百次元)
     └→ ES at Scale (2025/2026, 次元削減なしで数十億パラメータを集団 30 で微調整)
          ├→ EGGROLL (2025/2026, 低ランク摂動で推論並みのスループット、集団 100 万)
          │     └→ EGGROLL, Unrolled / QES / Hyper-ES / 非同期 ES（2026, 参照のみ）
          └→ ES と破滅的忘却 (Abdi+ 2026, 更新ノルム 1000 倍・密で忘却)
                └→ ES vs GRPO の幾何 (Hoy+ 2026, 平坦方向のランダムウォーク α²Td/N で統一説明)
                      └→ ES の推論被覆 (Ba+ 2026, Pass@K で GRPO 超、ドリフト≠忘却)
                         ── Overcoming Forgetting (Schweighofer+ 2026, 参照のみ)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Evolution Strategies as a Scalable Alternative to Reinforcement Learning](https://arxiv.org/abs/1703.03864) | 2017 | arXiv | 原典 | NES を単純化した OpenAI-ES で深層 RL を解き、シード共有で 1,440 コアまで線形高速化。Humanoid 10 分、Atari で A3C と互角。 | ✅ p.2 |
| 2 | [Deep Neuroevolution: Genetic Algorithms are a Competitive Alternative for Training Deep Neural Networks for Reinforcement Learning](https://arxiv.org/abs/1712.06567) | 2017 | arXiv | 発展 | 交叉なしの単純 GA で 4M パラメータ CNN を進化させ Atari で DQN・A3C・ES と互角。シード列による個体圧縮。 | ✅ p.3 |
| 3 | [On the Relationship Between the OpenAI Evolution Strategy and Stochastic Gradient Descent](https://arxiv.org/abs/1712.06564) | 2017 | arXiv | 発展 | MNIST で ES と SGD の勾配相関を測定。ES はノイズ入り SGD とみなせ、相関 3.9% でも 97% に達する。 | ✅ p.4 |
| 4 | [Unbiased Gradient Estimation in Unrolled Computation Graphs with Persistent Evolution Strategies](https://arxiv.org/abs/2112.13835) | 2021 | ICML | 発展 | 摂動を展開間で累積し、部分展開でも打ち切りバイアスのない ES 勾配を得る PES。ICML 2021 Outstanding Paper。 | ✅ p.5 |
| 5 | [EvoJAX: Hardware-Accelerated Neuroevolution](https://arxiv.org/abs/2202.05008) | 2022 | GECCO（Companion） | 発展 | アルゴリズム・方策・タスクを JAX で書き集団評価を GPU/TPU に載せる基盤。従来比 10〜20 倍高速。 | ✅ p.6 |
| 6 | [Evolutionary Optimization of Model Merging Recipes](https://arxiv.org/abs/2403.13187) | 2025 | Nature Machine Intelligence | 発展 | PS・DFS の両空間でマージレシピを CMA-ES で探索。7B 日本語数学 LLM が 70B 級を上回る。 | ✅ p.7 |
| 7 | [Evolution Strategies at Scale: LLM Fine-Tuning Beyond Reinforcement Learning](https://arxiv.org/abs/2509.24372) | 2026 | ICML | 最新 | 数十億パラメータの LLM を次元削減なし・集団 30 の ES で微調整し、Countdown で PPO・GRPO を上回る。 | ✅ p.8 |
| 8 | [Evolution Strategies at the Hyperscale](https://arxiv.org/abs/2511.16652) | 2026 | ICML | 最新 | 低ランク摂動の EGGROLL で ES のスループットを約 100 倍に。集団 2^20 で int8 RNN 言語モデルを事前学習。 | ✅ p.9 |
| 9 | [Evolutionary Strategies lead to Catastrophic Forgetting in LLMs](https://arxiv.org/abs/2601.20861) | 2026 | arXiv | 最新 | ES 微調整は GRPO に近い精度だが既存能力が約 10% 落ちる。更新ノルム約 1,000 倍・低疎性が原因と主張。 | ✅ p.10 |
| 10 | [Matching Accuracy, Different Geometry: Evolution Strategies vs GRPO in LLM Post-Training](https://arxiv.org/abs/2604.01499) | 2026 | COLM | 最新 | 精度同等でも ES 更新は約 100 倍のノルムでほぼ直交。平坦方向のランダムウォーク α²Td/N で説明。 | ✅ p.11 |
| 11 | [Understanding Evolution Strategies for LLM Reasoning: Broader Reasoning Coverage than GRPO](https://arxiv.org/abs/2608.27351) | 2026 | arXiv | 最新 | ES はエントロピー崩壊せず Pass@K で GRPO を上回る。大きなドリフトは必ずしも忘却を意味しない。 | ✅ p.12 |
| 12 | Evolutionsstrategie: Optimierung technischer Systeme nach Prinzipien der biologischen Evolution（Rechenberg） | 1973 | Frommann-Holzboog（書籍） | 原典 | 進化戦略の起源。変異と選択による実数パラメータ最適化（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 13 | Numerische Optimierung von Computer-Modellen mittels der Evolutionsstrategie（Schwefel） | 1977 | Birkhäuser（書籍） | 原典 | (μ,λ)/(μ+λ) など多個体 ES の体系化（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 14 | [Natural Evolution Strategies](https://arxiv.org/abs/1106.4487) | 2014 | JMLR | 原典 | 探索分布の自然勾配で ES を定式化。OpenAI-ES はその平均だけを動かす簡略版。cma-es 担当との重複回避のため。 | — 参照のみ |
| 15 | [ES Is More Than Just a Traditional Finite-Difference Approximator](https://arxiv.org/abs/1712.06568) | 2017 | GECCO 2018 | 発展 | ES は点でなく分布を最適化するため、有限差分より摂動に頑健な解を選ぶ。Zhang+ の対になる論文（冒頭のみ確認）。 | — 参照のみ |
| 16 | [Improving Exploration in Evolution Strategies for Deep Reinforcement Learning via a Population of Novelty-Seeking Agents](https://arxiv.org/abs/1712.06560) | 2018 | NeurIPS | 発展 | NS-ES。OpenAI-ES に新奇性探索を組み合わせ欺瞞的課題を解く。本文未読のため。 | — 参照のみ |
| 17 | [evosax: JAX-Based Evolution Strategies](https://arxiv.org/abs/2212.04180) | 2022 | arXiv | 発展 | 30 種の ES/GA を JAX で実装し jit・vmap・pmap で加速。本文は読んだが定量評価が乏しく EvoJAX で代表させた。 | — 参照のみ |
| 18 | [Simple random search provides a competitive approach to reinforcement learning](https://arxiv.org/abs/1803.07055) | 2018 | NeurIPS | 発展 | ARS。線形方策のランダム探索が MuJoCo で RL と競合。PES の Swimmer 比較の基準。 | — 参照のみ |
| 19 | [Fine-Tuning Language Models with Just Forward Passes](https://arxiv.org/abs/2305.17333) | 2023 | NeurIPS | 発展 | MeZO。2 点のゼロ次推定で LLM を省メモリ微調整（主に教師あり）。ES at Scale・EGGROLL の比較対象。 | — 参照のみ |
| 20 | [EGGROLL, Unrolled: Understanding and Improving Low-Rank Evolution Strategies at Scale](https://arxiv.org/abs/2609.10980) | 2026 | arXiv | 最新 | rank-1 摂動の平均場が非保存的になり最適解の安定性を反転させうると解析（要旨のみ確認）。 | — 参照のみ |
| 21 | [Asynchrony Is Nearly Free for Evolution Strategies on Long-Horizon LLM Agentic Tasks](https://arxiv.org/abs/2610.04196) | 2026 | arXiv | 最新 | WebShop で古い適応度を許す有界非同期 ES を検証（要旨のみ確認）。 | — 参照のみ |
| 22 | [Overcoming Forgetting in LLM Fine-Tuning with Evolution Strategies](https://arxiv.org/abs/2605.30148) | 2026 | arXiv | 最新 | ES の忘却は回復しうる性能ドリフトで RL でも起きると主張し、Anchored Weight Decay を提案（要旨のみ確認）。 | — 参照のみ |
| 23 | [Quantized Evolution Strategies: High-precision Fine-tuning of Quantized LLMs at Low-precision Cost](https://arxiv.org/abs/2602.03120) | 2026 | arXiv | 最新 | 量子化 LLM を誤差フィードバック付き ES で量子化空間のまま全パラメータ微調整（要旨のみ確認）。 | — 参照のみ |
| 24 | [Hyper-ES: Effective Evolution Strategies for LLM Reasoning via Descent Direction Merging](https://arxiv.org/abs/2608.05541) | 2026 | arXiv | 最新 | 少数の勾配微調整で得た降下方向の張る部分空間で ES を回す（要旨のみ確認）。 | — 参照のみ |
| 25 | [The Blessing of Dimensionality in LLM Fine-tuning: A Variance-Curvature Perspective](https://arxiv.org/abs/2602.00170) | 2026 | arXiv | 最新 | 微調整地形の曲率が低次元であることから小集団 ES の成功を説明（要旨のみ確認）。 | — 参照のみ |
| 26 | [ESSAM: A Novel Competitive Evolution Strategies Approach to Reinforcement Learning for Memory Efficient LLMs Fine-Tuning](https://arxiv.org/abs/2602.01003) | 2026 | arXiv | 最新 | 省メモリ LLM 微調整のための競争型 ES（タイトル・要旨のみ確認）。 | — 参照のみ |
| 27 | [DART-ES: Difficulty-Aware Reweighting and Targeted Replay for Fine-Tuning LLMs with Evolution Strategies](https://arxiv.org/abs/2610.06993) | 2026 | arXiv | 最新 | 難易度に応じた再重み付けとリプレイで ES 微調整を改善（タイトルのみ確認）。 | — 参照のみ |
| 28 | [Beyond the Best Guess: Improving LLM Solution Coverage with Evolution Strategies](https://arxiv.org/abs/2608.12679) | 2026 | arXiv | 最新 | ES で LLM の解の被覆を高める（タイトルのみ確認）。Ba+ の関連研究。 | — 参照のみ |
| 29 | [Continual Test-Time Learning with Evolution Strategies](https://arxiv.org/abs/2610.24137) | 2026 | arXiv | 最新 | ES によるテスト時継続学習（タイトルのみ確認）。 | — 参照のみ |
| 30 | [Understanding and correcting pathologies in the training of learned optimizers](https://arxiv.org/abs/1810.10180) | 2019 | ICML | 発展 | truncated ES と再パラメータ化勾配の組み合わせで学習済み最適化器を訓練。PES の比較対象（本文未読）。 | — 参照のみ |
| 31 | [Discovering Evolution Strategies via Meta-Black-Box Optimization (LES)](https://arxiv.org/abs/2211.11260) | 2023 | ICLR | 発展 | ES の更新則自体を注意機構でメタ学習。 | ↪ 既存：swarm-intelligence/metabbo p.4 |
| 32 | [Model Swarms: Collaborative Search to Adapt LLM Experts via Swarm Intelligence](https://arxiv.org/abs/2410.11163) | 2024 | arXiv | 発展 | PSO で LLM エキスパートの重みを探索。進化的マージの群知能版。 | ↪ 既存：swarm-intelligence/deep-learning-fusion p.7 |
| 33 | [Abandoning Objectives: Evolution Through the Search for Novelty Alone](https://doi.org/10.1162/EVCO_a_00025) | 2011 | Evolutionary Computation | 原典 | 新奇性探索。Deep GA の GA-NS の元。 | ↪ 既存：open-endedness/quality-diversity p.2 |
| 34 | [PBT-NCA (Berdica+ 2026)](https://arxiv.org/abs/2604.11248) | 2026 | arXiv | 最新 | EGGROLL と同じ FLAIR グループによる進化的な NCA 探索。 | ↪ 既存：open-endedness/foundation-model-alife p.10 |
