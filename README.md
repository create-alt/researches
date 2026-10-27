# グラフニューラルネットワーク — 先行研究調査

グラフ構造データを扱うニューラルネットワーク（GNN）について、メッセージパッシングの基礎と表現力・過平滑化・過圧縮、Graph Transformer とグラフ基盤モデル・LLM との統合、GNN による物理シミュレーションと世界モデルの観点から系譜をまとめる。群知能・NCA・世界モデル分野の GNN 応用とつながる。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/`）は main ブランチから引き継いでいる。

## テーマ一覧

| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- | --- |
| 第1回 | [メッセージパッシング GNN の基礎と表現力](#message-passing) | スペクトル GCN・GCN・GraphSAGE・GAT・MPNN から、GIN と WL テストによる表現力、高次 WL・部分グラフ GNN、過平滑化・過圧縮と曲率による rewiring、長距離依存の最新理論まで | [pptx](message-passing/message-passing.pptx) / [pdf](message-passing/message-passing.pdf) | 10 本 | 29 本 | 2026-10-27 |
| 第1回 | [Graph Transformer・グラフ基盤モデルと LLM](#graph-transformers) | Graph Transformer・Graphormer・GPS と位置符号化、疎化から、グラフ基盤モデル（事前学習・プロンプト・汎用モデル）、LLM とグラフの統合まで | [pptx](graph-transformers/graph-transformers.pptx) / [pdf](graph-transformers/graph-transformers.pdf) | 11 本 | 36 本 | 2026-10-27 |
| 第1回 | [GNN による物理シミュレーション・世界モデル](#graph-world-models) | Interaction Networks・Graph Networks・GNS・MeshGraphNets から、等変 GNN、GraphCast と気象予測、物体中心・関係的な世界モデルとロボット操作まで | [pptx](graph-world-models/graph-world-models.pptx) / [pdf](graph-world-models/graph-world-models.pdf) | 11 本 | 33 本 | 2026-10-27 |

合計：スライド化 32 本、引用論文一覧 98 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-27 | 第1回調査（分野新設）。「メッセージパッシング GNN の基礎と表現力」、「Graph Transformer・グラフ基盤モデルと LLM」、「GNN による物理シミュレーション・世界モデル」の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版で全文を確認した論文のみスライド化し、到達できなかった重要論文は本文未確認として一覧に記載。既存デッキ（他分野を含む）でスライド化済みの論文は再掲せず参照。 |

## 追加調査を推奨するテーマ

これまでの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。

1. **長距離依存の評価方法論と過圧縮対策の比較（rewiring・仮想ノード・状態空間型）**  
   メッセージパッシングテーマでは、長距離依存ベンチマーク（LRGB など）の差がハイパーパラメータ調整で縮むという指摘があった。評価方法論の検証と、rewiring・仮想ノード・状態空間型 GNN による過圧縮対策を同じ条件で比べた研究を追う。

2. **PFN 型グラフ基盤モデルとグラフのスケーリング則**  
   Graph Transformer テーマでは、公開グラフデータの不足がグラフ基盤モデルのボトルネックだった。合成事前分布による in-context 学習（PFN 型）と、事前学習データ・モデル規模のスケーリング則を調べる。

3. **確率的な学習シミュレータと長期ロールアウトの安定化**  
   世界モデルテーマでは、GraphCast の後継が拡散・アンサンブルによる確率的予報へ移り、長期ロールアウトの誤差蓄積が共通の課題だった。気象と物理シミュレーション、ロボット操作の粒子・点群世界モデルでの GNN と Transformer の使い分けを含めて追う。

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は既存デッキ（他分野の場合は `<field>/<theme>`）でスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。

---

<a id="message-passing"></a>

## メッセージパッシング GNN の基礎と表現力（message-passing/）

資料：[message-passing.pptx](message-passing/message-passing.pptx) ／ [message-passing.pdf](message-passing/message-passing.pdf) ／ 生成元 [spec.json](message-passing/spec.json) ／ [テーマ README](message-passing/README.md)


### 調査履歴
- 2026-10-27: arXiv API で "over-squashing" "oversquashing" "over-smoothing" "Weisfeiler" "message passing + expressive" "long-range + message passing" を新しい順に検索し、2025〜2026年の動向をつかんだ。中心は、表現力理論そのものへの批判（MPC, NeurIPS 2025）、過平滑化・過圧縮の統一（勾配消失, NeurIPS 2025）、通念の再検討（ICLR 2026）、長距離ベンチマークの検証（GRIP, NeurIPS 2026）。
- そこから2つの系譜を原典まで遡った。(1) 表現力：MPNN の枠組み（Gilmer+ 2017）→ 1-WL 上限（GIN, Xu+ 2019）→ 準同型表現力（Zhang+ 2024）→ MPC（Kemper+ 2025）。(2) 深さと長距離：スペクトル GCN（Bruna+ 2014）→ GCN（Kipf & Welling 2017）の深さの壁 → 過圧縮（Alon & Yahav 2021）→ 曲率と rewiring（Topping+ 2022）→ 勾配消失による統一（Arroyo+ 2025）と通念の再検討（Arnaiz-Rodriguez & Errica 2026）。
- スライド化した10本はすべて arXiv 版の本文を読んだ。Graph Transformer 系（GAT を含む注意機構の系譜）は同分野の graph-transformers 担当に任せ、本デッキでは参照のみにした。

### 系譜
```
[スペクトル系]  Spectral Networks (Bruna+ 2014) ─→ ChebNet (2016) ─→ GCN (Kipf & Welling 2017)
                                                                          │（2〜3層が最良：深さの壁）
[枠組み]        GNN (Scarselli+ 2009) ─→ GG-NN (2016) ─→ MPNN (Gilmer+ 2017) ←─ GCN/GraphSAGE/GAT を包含
                                                                          │
[表現力]        GIN (Xu+ 2019) / k-GNN (Morris+ 2019)：1-WL が上限
                  └→ 部分グラフ GNN (ESAN 2022) ─→ 準同型表現力 (Zhang+ 2024)
                                                     └→ MPC (Kemper+ 2025)：表現力理論への批判、課題難度へ
[深さ・長距離]  過平滑化 (Li+ 2018, Oono & Suzuki 2020)
                過圧縮 (Alon & Yahav 2021) ─→ 曲率と SDRF (Topping+ 2022) ─→ 幅・深さ・位相 (Di Giovanni+ 2023)
                  │                                                         ├→ GNN-SSM：勾配消失で統一 (Arroyo+ 2025)
                  └→ LRGB (2022) ─→ LRGB 再評価 (Tönshoff+ 2023)          └→ rewiring サーベイ (Attali+ 2026)
[2026 の見直し] 通念の再検討 (Arnaiz-Rodriguez & Errica, ICLR 2026)・Position (Kormann+ 2026)・GRIP/TRIP (NeurIPS 2026)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Spectral Networks and Locally Connected Networks on Graphs](https://arxiv.org/abs/1312.6203) | 2014 | ICLR | 原典 | ラプラシアン固有基底上の対角作用素として畳み込みをグラフへ一般化。スペクトル乗数の平滑化で局所フィルタを得る。 | ✅ p.2 |
| 2 | [Semi-Supervised Classification with Graph Convolutional Networks](https://arxiv.org/abs/1609.02907) | 2017 | ICLR | 発展 | スペクトル畳み込みの1次近似と renormalization trick で GCN を導出。引用ネットワークの半教師あり分類で大幅改善。 | ✅ p.3 |
| 3 | [Neural Message Passing for Quantum Chemistry](https://arxiv.org/abs/1704.01212) | 2017 | ICML | 原典 | 既存8モデルを MPNN（message/update/readout）に統一し、QM9 の13物性で SOTA。 | ✅ p.4 |
| 4 | [How Powerful are Graph Neural Networks?](https://arxiv.org/abs/1810.00826) | 2019 | ICLR | 原典 | 近傍集約 GNN の識別能力は 1-WL が上限と証明し、それに達する GIN を提案。 | ✅ p.5 |
| 5 | [On the Bottleneck of Graph Neural Networks and its Practical Implications](https://arxiv.org/abs/2006.05205) | 2021 | ICLR | 原典 | 受容野の指数的増大で情報が固定長ベクトルに押し込まれる「過圧縮」を提唱。FA 層で QM9 誤差 -42%。 | ✅ p.6 |
| 6 | [Understanding over-squashing and bottlenecks on graphs via curvature](https://arxiv.org/abs/2111.14522) | 2022 | ICLR | 発展 | 負曲率の辺が過圧縮を起こすことを Balanced Forman curvature で証明し、rewiring 法 SDRF を提案。 | ✅ p.7 |
| 7 | [Beyond Weisfeiler-Lehman: A Quantitative Framework for GNN Expressiveness](https://arxiv.org/abs/2401.08514) | 2024 | ICLR (Oral) | 発展 | 準同型数を数えられるパターン族で表現力を特徴づけ、MPNN〜2-FGNN の厳密な階層と部分グラフ計数能力を導出。 | ✅ p.8 |
| 8 | [On Vanishing Gradients, Over-Smoothing, and Over-Squashing in GNNs: Bridging Recurrent and Graph Learning](https://arxiv.org/abs/2502.10818) | 2025 | NeurIPS | 最新 | 過平滑化と過圧縮を勾配消失で統一。状態空間型 GNN-SSM で深い GCN と長距離課題を改善。 | ✅ p.9 |
| 9 | [What Expressivity Theory Misses: Message Passing Complexity for GNNs](https://arxiv.org/abs/2509.01254) | 2025 | NeurIPS (Spotlight) | 最新 | lossyWL に基づく連続的な課題難度 MPC を提案し、表現力理論が説明できない性能差を説明。 | ✅ p.10 |
| 10 | [Oversmoothing, Oversquashing, Heterophily, Long-Range, and more: Demystifying Common Beliefs in Graph Machine Learning](https://arxiv.org/abs/2505.15547) | 2026 | ICLR | 最新 | 9つの通念を反例で反駁し、過圧縮を計算上／位相的ボトルネックに分けるよう提言。 | ✅ p.11 |
| 11 | [The Graph Neural Network Model](https://doi.org/10.1109/TNN.2008.2005605)（Scarselli+） | 2009 | IEEE TNN | 原典 | 縮小写像を不動点まで反復する再帰型の最初期 GNN（GCN 論文 4.2節などの記述に基づく）。OpenAlex 上は Wollongong 大学リポジトリ等に公開版があるが、この環境から到達できず。 | ⚠️ 本文未確認 |
| 12 | [Convolutional Neural Networks on Graphs with Fast Localized Spectral Filtering](https://arxiv.org/abs/1606.09375)（ChebNet） | 2016 | NeurIPS | 発展 | Chebyshev 多項式でスペクトルフィルタを近似し K 局所化・線形計算量に。GCN 論文の式 4〜5 と Table 3 で内容を確認。 | — 参照のみ（Bruna と GCN の間の中継として GCN スライドで言及） |
| 13 | [Gated Graph Sequence Neural Networks](https://arxiv.org/abs/1511.05493)（GG-NN） | 2016 | ICLR | 発展 | GRU で更新する MPNN の代表例。MPNN 論文の基盤モデル。 | — 参照のみ（MPNN スライドに包含） |
| 14 | [Inductive Representation Learning on Large Graphs](https://arxiv.org/abs/1706.02216)（GraphSAGE） | 2017 | NeurIPS | 発展 | 近傍サンプリングと mean/max/LSTM 集約による帰納的 GNN。 | — 参照のみ（GIN の比較対象として言及） |
| 15 | [Graph Attention Networks](https://arxiv.org/abs/1710.10903)（GAT） | 2018 | ICLR | 発展 | 近傍への注意重みで集約する MPNN。 | — 参照のみ（注意機構系は graph-transformers 担当） |
| 16 | [Weisfeiler and Leman Go Neural: Higher-order Graph Neural Networks](https://arxiv.org/abs/1810.02244)（k-GNN） | 2019 | AAAI | 原典 | GIN と同時期に GNN と 1-WL の同等性を示し、k-WL に基づく高次 GNN を提案。 | — 参照のみ（GIN と結論が重複） |
| 17 | [Deeper Insights into Graph Convolutional Networks for Semi-Supervised Learning](https://arxiv.org/abs/1801.07606) | 2018 | AAAI | 原典 | GCN をラプラシアン平滑化と解釈し、過平滑化を指摘。 | — 参照のみ（アブストラクトのみ確認） |
| 18 | [Graph Neural Networks Exponentially Lose Expressive Power for Node Classification](https://arxiv.org/abs/1905.10947) | 2020 | ICLR | 発展 | GCN を力学系とみなし、深くすると出力が連結成分と次数の情報だけの部分空間へ指数的に近づくことを証明。 | — 参照のみ（アブストラクトのみ確認） |
| 19 | [Equivariant Subgraph Aggregation Networks](https://arxiv.org/abs/2110.02910)（ESAN） | 2022 | ICLR | 発展 | グラフを部分グラフの集合として扱い 1-WL を超える。部分グラフ GNN の代表。 | — 参照のみ（Zhang+ 2024 が包含） |
| 20 | [Long Range Graph Benchmark](https://arxiv.org/abs/2206.08164) | 2022 | NeurIPS D&B | 発展 | 長距離依存を要するとされるベンチマーク群（Peptides 等）。 | — 参照のみ |
| 21 | [On Over-Squashing in Message Passing Neural Networks: The Impact of Width, Depth, and Topology](https://arxiv.org/abs/2302.02941) | 2023 | ICML | 発展 | 幅は緩和するが深さは勾配消失に支配され、位相（commute time）が最も効くことを示す。 | — 参照のみ（アブストラクトのみ確認） |
| 22 | [DRew: Dynamically Rewired Message Passing with Delay](https://arxiv.org/abs/2305.08018) | 2023 | ICML | 発展 | 層ごとに到達距離を広げる動的 rewiring と遅延。Arroyo+ の比較対象。 | — 参照のみ |
| 23 | [Where Did the Gap Go? Reassessing the Long-Range Graph Benchmark](https://arxiv.org/abs/2309.00367) | 2023 | arXiv プレプリント | 発展 | 調整した MPNN で LRGB の Transformer との差が消えると報告。 | — 参照のみ |
| 24 | [How does over-squashing affect the power of GNNs?](https://arxiv.org/abs/2306.03589) | 2024 | TMLR | 発展 | 過圧縮から MPNN の表現力の限界を導く。Kemper+ の関連研究。 | — 参照のみ |
| 25 | [Future Directions in the Theory of Graph Machine Learning](https://arxiv.org/abs/2402.02287) | 2024 | ICML | 発展 | 表現力・汎化・最適化の理論の今後の課題を整理。 | — 参照のみ |
| 26 | [Position: Don't be Afraid of Over-Smoothing And Over-Squashing](https://arxiv.org/abs/2601.07419) | 2026 | arXiv プレプリント | 最新 | 精度と過平滑化はほぼ無相関、過圧縮対策も有意な改善をもたらさないと主張。 | — 参照のみ（アブストラクトのみ確認。Arnaiz-Rodriguez & Errica と主張が重なる） |
| 27 | [Graph Rewiring in GNNs to Mitigate Over-Squashing and Over-Smoothing: A Survey](https://arxiv.org/abs/2605.00951) | 2026 | IJCAI Survey | 最新 | rewiring 手法のサーベイ。 | — 参照のみ |
| 28 | [Reachability is not enough: Diagnosing long-range behavior in GNNs](https://arxiv.org/abs/2609.33674) | 2026 | arXiv プレプリント | 最新 | 距離ごとの入力の影響を測り、到達可能でも遠方情報を使えていないことを診断する枠組み。 | — 参照のみ（アブストラクトのみ確認） |
| 29 | [Get a GRIP, this will be a long TRIP: A Quantifiable Long-Range Framework for Verifying Over-squashing](https://arxiv.org/abs/2610.03556) | 2026 | NeurIPS D&B | 最新 | 長距離ベンチマークが満たすべき4公理と、任意グラフを証明付きで長距離課題にする GRIP/TRIP を提案。 | — 参照のみ（アブストラクトのみ確認。次テーマ候補） |

---

<a id="graph-transformers"></a>

## Graph Transformer・グラフ基盤モデルと LLM（graph-transformers/）

資料：[graph-transformers.pptx](graph-transformers/graph-transformers.pptx) ／ [graph-transformers.pdf](graph-transformers/graph-transformers.pdf) ／ 生成元 [spec.json](graph-transformers/spec.json) ／ [テーマ README](graph-transformers/README.md)


### 調査履歴
- 2026-10-27: arXiv API で "graph foundation model"（2026年だけで約50件）、"graph transformer" × "message passing"、"scaling law" × GNN、LLM × graph reasoning を新しい順に検索し、2025〜2026 の論点（GFM は調整済み GNN に勝てるか、十億規模のスケーリング則、GT 対 MPNN の再検証、LLM のグラフ推論）を把握した。
- 系譜は3本を原典まで遡った。(1) Graph Transformer：GraphBFF・GNN+ → GPS → Graphormer → GT（Dwivedi & Bresson 2020）、疎化は Exphormer。(2) グラフ基盤モデル：Fair Evaluation of GFMs → OFA（ICLR 2024）。(3) LLM とグラフ：G1・GREG → GraphGPT → Talk like a Graph（ICLR 2024）。
- 位置符号化（LapPE・RWSE・SignNet）は単独のスライドにせず、GT（LapPE の導入）、Graphormer（最短路距離バイアス）、GPS（PE/SE の分類と比較）、GNN+（RWSE が小データで効く）の各スライドで扱った。
- 本文はすべて arXiv（PDF・HTML）で読んだ。スライド化した11本はいずれも全文を確認済み。2026年の新しい論文の一部（Acacia、GREG、Shirzad & Sutherland 2026、Gutteridge+ 2026 など）は要旨または本文の一部のみ確認し、参照のみとした。
- 既存デッキとの重複はなし（他分野に GNN 群制御・Att-GCN などがあるが本テーマとは別論文）。同分野の別担当 message-passing と、再評価系（Tönshoff+ 2023、Luo+ 2024）が重なる可能性がある。

### 系譜
```
[Graph Transformer]
  GT (Dwivedi & Bresson 2020, 疎な注意 + LapPE)
    ├─► SAN (Kreuzer+ 2021, 参照のみ)
    └─► Graphormer (Ying+ 2021, 全結合注意 + 最短路距離バイアス, OGB-LSC 1位)
          └─► GPS (Rampášek+ 2022, PE/SE + MPNN + 大域注意のレシピ)
                ├─► Exphormer (Shirzad+ 2023, エクスパンダーで疎化)
                │     └─► Shirzad & Sutherland 2026（大域通信は定数メモリか, 参照のみ）
                ├─► [再検証] Tönshoff+ 2023 (LRGB) ─► GNN+ (Luo+ 2025, 調整済み古典 GNN が GT と同等以上)
                └─► GraphBFF (Bechler-Speicher+ 2026, 14億パラメータ・スケーリング則)

[グラフ基盤モデル]
  OFA (Liu+ 2023, テキストで特徴を統一 + プロンプトグラフ)
    ├─► Position: GFMs are Already Here (Mao+ 2024, 参照のみ)
    ├─► OpenGraph / AnyGraph / GCOPE ... ─┐
    └─► G2T-FM / GraphPFN (PFN 型, 参照のみ) ─┴─► Fair Evaluation of GFMs (Platonov+ 2026, PFN 型だけが GNN に勝つ)
  Acacia (Sato 2026, Web グラフで LLM なしに学習, 参照のみ)

[LLM とグラフ]
  NLGraph (Wang+ 2023, 参照のみ)
    └─► Talk like a Graph (Fatemi+ 2023, グラフをテキストに符号化する方法の系統的研究)
          ├─► GraphGPT (Tang+ 2023, グラフトークン + 指示チューニング) ─► LLaGA (2024, 参照のみ)
          ├─► GraphToken (Perozzi+ 2024, 参照のみ)
          └─► G1 (Guo+ 2025, 検証可能報酬の RL) ─► GREG (Porras-Valenzuela+ 2026, GNN+GT の位置符号化を LLM へ, 参照のみ)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [A Generalization of Transformer Networks to Graphs](https://arxiv.org/abs/2012.09699) | 2020 | AAAI 2021 Workshop (DLG) | 原典 | 注意を近傍に限り、Laplacian 固有ベクトルを位置符号化に使う最初期の汎用 Graph Transformer。 | ✅ p.2 |
| 2 | [Do Transformers Really Perform Bad for Graph Representation? (Graphormer)](https://arxiv.org/abs/2106.05234) | 2021 | NeurIPS 2021 | 発展 | 中心性・最短路距離・辺の符号化を注意バイアスに入れ、OGB-LSC で1位。 | ✅ p.3 |
| 3 | [Recipe for a General, Powerful, Scalable Graph Transformer (GPS)](https://arxiv.org/abs/2205.12454) | 2022 | NeurIPS 2022 | 発展 | PE/SE・局所 MPNN・大域注意の3要素で GT を設計するレシピ。 | ✅ p.4 |
| 4 | [Exphormer: Sparse Transformers for Graphs](https://arxiv.org/abs/2303.06147) | 2023 | ICML 2023 | 発展 | 局所近傍・エクスパンダー・仮想ノードの疎注意で線形計算量。 | ✅ p.5 |
| 5 | [One for All: Towards Training One Graph Model for All Classification Tasks (OFA)](https://arxiv.org/abs/2310.00149) | 2023 | ICLR 2024 | 原典 | 全グラフをテキスト属性グラフにして LLM で埋め込み、1つの GNN とプロンプトグラフで全分類タスクを解く。 | ✅ p.6 |
| 6 | [Talk like a Graph: Encoding Graphs for Large Language Models](https://arxiv.org/abs/2310.04560) | 2023 | ICLR 2024 | 原典 | グラフのテキスト符号化方法・タスク・構造が LLM の精度を大きく左右することを示した。 | ✅ p.7 |
| 7 | [GraphGPT: Graph Instruction Tuning for Large Language Models](https://arxiv.org/abs/2310.13023) | 2023 | SIGIR 2024 | 発展 | グラフエンコーダ出力を射影したグラフトークンで LLM を指示チューニング。 | ✅ p.8 |
| 8 | [Can Classic GNNs Be Strong Baselines for Graph-level Tasks? (GNN+)](https://arxiv.org/abs/2502.09263) | 2025 | ICML 2025 | 最新 | 6技法を足した古典 GNN が14データセットで GT と同等以上。 | ✅ p.9 |
| 9 | [G1: Teaching LLMs to Reason on Graphs with Reinforcement Learning](https://arxiv.org/abs/2505.18499) | 2025 | NeurIPS 2025 | 最新 | 50課題の Erdős で検証可能報酬の RL を行い、7B で o3-mini 並みのグラフ推論。 | ✅ p.10 |
| 10 | [Billion-Scale Graph Foundation Models (GraphBFF)](https://arxiv.org/abs/2602.04768) | 2026 | arXiv プレプリント | 最新 | 14億パラメータの異種グラフ Transformer を企業グラフで事前学習し、スケーリング則を提示。 | ✅ p.11 |
| 11 | [A Fair Evaluation of Graph Foundation Models for Node Property Prediction](https://arxiv.org/abs/2606.24509) | 2026 | ICML 2026 Workshop (GFM) | 最新 | GFM 9種を調整済み GNN と比べ、PFN 型だけが勝つと示した再評価。 | ✅ p.12 |
| 12 | [Where Did the Gap Go? Reassessing the Long-Range Graph Benchmark](https://arxiv.org/abs/2309.00367) | 2023 | arXiv プレプリント | 発展 | LRGB での GT と MPNN の差は調整不足による過大評価と指摘。要旨と主要表のみ確認、GNN+ に包含されるためスライド化せず。 | — 参照のみ |
| 13 | [Rethinking Graph Transformers with Spectral Attention (SAN)](https://arxiv.org/abs/2106.03893) | 2021 | NeurIPS 2021 | 発展 | Laplacian スペクトル全体を学習する位置符号化。GPS・Graphormer の比較対象として言及のみ。 | — 参照のみ |
| 14 | [Graph Neural Networks with Learnable Structural and Positional Representations (LSPE)](https://arxiv.org/abs/2110.07875) | 2021 | ICLR 2022 | 発展 | RWSE の導入と位置表現の学習。GPS の SE 選択の根拠として言及のみ。 | — 参照のみ |
| 15 | [Benchmarking Graph Neural Networks](https://arxiv.org/abs/2003.00982) | 2020 | JMLR 2023 | 原典 | ZINC・PATTERN・CLUSTER など GT 系の標準ベンチマーク。言及のみ。 | — 参照のみ |
| 16 | [Classic GNNs are Strong Baselines: Reassessing GNNs for Node Classification](https://arxiv.org/abs/2406.08993) | 2024 | NeurIPS 2024 | 発展 | ノード分類で調整済み古典 GNN が GT と同等以上。GNN+ の前作として言及のみ。 | — 参照のみ |
| 17 | [Position: Graph Learning Will Lose Relevance Due To Poor Benchmarks](https://arxiv.org/abs/2502.14546) | 2025 | arXiv プレプリント | 最新 | グラフ学習のベンチマーク不備を批判。GNN+・GraphBFF が引用。タイトルと引用文脈のみ確認。 | — 参照のみ |
| 18 | [Position: Graph Foundation Models are Already Here](https://arxiv.org/abs/2402.02216) | 2024 | ICML 2024 (Position) | 発展 | GFM の可能性を「グラフ語彙」の観点で論じる。検索で確認したのみ。 | — 参照のみ |
| 19 | [Towards Neural Scaling Laws on Graphs](https://arxiv.org/abs/2402.02054) | 2024 | arXiv プレプリント | 発展 | 公開グラフでのスケーリング則の先行研究。GraphBFF の比較文脈として言及のみ。 | — 参照のみ |
| 20 | [Can Language Models Solve Graph Problems in Natural Language? (NLGraph)](https://arxiv.org/abs/2305.10037) | 2023 | NeurIPS 2023 | 原典 | LLM のグラフ推論ベンチマークの先駆け。Talk like a Graph が拡張。言及のみ。 | — 参照のみ |
| 21 | [Let Your Graph Do the Talking: Encoding Structured Data for LLMs (GraphToken)](https://arxiv.org/abs/2402.05862) | 2024 | arXiv プレプリント | 発展 | 学習したグラフ埋め込みをソフトプロンプトとして LLM に渡す。言及のみ。 | — 参照のみ |
| 22 | [LLaGA: Large Language and Graph Assistant](https://arxiv.org/abs/2402.08170) | 2024 | ICML 2024 | 発展 | ノード列をテンプレート化して LLM に渡すグラフアシスタント。言及のみ。 | — 参照のみ |
| 23 | [GLBench: A Comprehensive Benchmark for Graph with Large Language Models](https://arxiv.org/abs/2407.07457) | 2024 | arXiv プレプリント | 発展 | Graph+LLM 手法の統一ベンチマーク。検索結果の要約のみ確認。 | — 参照のみ |
| 24 | [Turning Tabular Foundation Models into Graph Foundation Models (G2T-FM)](https://arxiv.org/abs/2508.20906) | 2025 | arXiv プレプリント | 最新 | タブラー基盤モデルにグラフ由来特徴を足して GFM にする。Fair Evaluation で評価対象。言及のみ。 | — 参照のみ |
| 25 | [GraphPFN: A Prior-Data Fitted Graph Foundation Model](https://arxiv.org/abs/2509.21489) | 2025 | ICML 2026 | 最新 | 合成グラフ事前分布で学習したグラフ専用 PFN。Fair Evaluation で全データ1位。本文未読のため次の調査候補。 | — 参照のみ |
| 26 | [GraphLand: Evaluating Graph Machine Learning Models on Diverse Industrial Data](https://arxiv.org/abs/2409.14500) | 2024 | NeurIPS 2025 D&B | 最新 | 産業由来のノード性質予測ベンチマーク。Fair Evaluation の評価基盤。言及のみ。 | — 参照のみ |
| 27 | [Training Graph Foundation Models on The Web Graph (Acacia)](https://arxiv.org/abs/2609.30894) | 2026 | arXiv プレプリント | 最新 | Common Crawl の Web グラフだけで学習した decoder-only の GFM（315M）。導入部のみ確認。 | — 参照のみ |
| 28 | [Scaling Graph Reasoning in Language Models with Learnable Graph Positional Encodings (GREG)](https://arxiv.org/abs/2610.27439) | 2026 | arXiv プレプリント | 最新 | GNN＋GT の位置符号化と近傍マスクで LLM を1000ノード規模へ。草稿段階の記述が多く、スライド化は見送り。 | — 参照のみ |
| 29 | [Graph Serializations for Reasoning LLMs](https://arxiv.org/abs/2610.22734) | 2026 | Findings of EMNLP 2026 | 最新 | 15の直列化形式 × 9設定で、構造推論は形式に敏感と報告。要旨のみ確認。 | — 参照のみ |
| 30 | [Global Communication or Graph-Specific Memory?](https://arxiv.org/abs/2610.05874) | 2026 | arXiv プレプリント | 最新 | 転移的設定では大域通信が共有メモリと同等の可能性。Exphormer 著者による自己検証。要旨のみ確認。 | — 参照のみ |
| 31 | [Are Graph Transformers Necessary? Efficient Long-Range Message Passing with Fractal Nodes in MPNNs](https://arxiv.org/abs/2511.13010) | 2025 | AAAI 2026 | 最新 | 部分グラフ要約ノードで MPNN の長距離伝播を補い GT と同等。要旨のみ確認。 | — 参照のみ |
| 32 | [Cluster Attention for Graph Machine Learning](https://arxiv.org/abs/2604.07492) | 2026 | arXiv プレプリント | 最新 | コミュニティ内全注意で受容野と構造バイアスを両立。要旨のみ確認。 | — 参照のみ |
| 33 | [Can Graph Foundation Models Generalize Over Architecture?](https://arxiv.org/abs/2603.22984) | 2026 | arXiv プレプリント | 最新 | 固定バックボーンの GFM は到達範囲の異なる課題で破綻すると理論・実験で示す。要旨のみ確認。 | — 参照のみ |
| 34 | [When Do Graph Foundation Models Transfer? A Data-Centric Theory](https://arxiv.org/abs/2605.29828) | 2026 | ICML 2026 | 最新 | グラフォン極限で領域間の出力差を分解し、スペクトル PE の安定性も論じる。要旨のみ確認。 | — 参照のみ |
| 35 | [Evaluating Progress in Graph Foundation Models: A Comprehensive Benchmark and New Insights](https://arxiv.org/abs/2603.10033) | 2026 | arXiv プレプリント | 最新 | 話題と形式の2軸の領域差で GFM を評価するベンチマーク。要旨のみ確認。 | — 参照のみ |
| 36 | [Graph Foundation Models: A Comprehensive Survey](https://arxiv.org/abs/2505.15116) | 2025 | arXiv プレプリント | 最新 | GFM のサーベイ（バックボーン・事前学習・適応で整理）。検索結果のみ確認。 | — 参照のみ |

---

<a id="graph-world-models"></a>

## GNN による物理シミュレーション・世界モデル（graph-world-models/）

資料：[graph-world-models.pptx](graph-world-models/graph-world-models.pptx) ／ [graph-world-models.pdf](graph-world-models/graph-world-models.pdf) ／ 生成元 [spec.json](graph-world-models/spec.json) ／ [テーマ README](graph-world-models/README.md)


### 調査履歴
- 2026-10-27: arXiv API で "graph network simulator"、"MeshGraphNets"、"graph neural network AND world model"、"particle AND graph neural AND manipulation" を新しい順に検索し、WebSearch で拡散型 GNN（Diffusion Graph Networks）と長期ロールアウトの安定性（IGNS）を確認して 2025〜2026 年の現在地をつかんだ。最新動向は (1) 拡散・Transformer 型との比較、(2) 長距離依存と誤差蓄積の対策、の2つに集約される。
- そこから DeepMind の系譜（GNS → MeshGraphNets → GraphCast）をたどり、原典の Interaction Networks（2016）と Graph Networks 総説（2018）まで遡った。分岐として、物体中心の世界モデル（C-SWM）とロボット操作の粒子世界モデル（ParticleFormer）、物理の対称性（EGNN）を加えた。
- 本文はすべて arXiv 版の PDF（2023 年以降は HTML 版の図も）で読んだ。既存デッキ（world-model、neural-cellular-automata ほか全分野）との重複はない。

### 系譜
```
Interaction Networks (2016) ─→ Graph Networks 総説 (2018)
                                   │
        ┌──────────────────────────┼─────────────────────────┐
   物体中心・ロボット              粒子・メッシュ               対称性
   C-SWM (2020)                  GNS (2020)                 EGNN (2021)
        │                            │
        │                      MeshGraphNets (2021)
        │                            │
        │            ┌───────────────┼──────────────────┬────────────────┐
        │       GraphCast (2023)  DGN 拡散 (2025)   Mesh Transformer (2025)  IGNS ハミルトン (2026)
        │       実天気予報        平衡分布を直接生成   GNN を注意で置換       長距離・長期安定
        │
   ParticleFormer (2025)
   GNN を Transformer で置換したロボット用 3D 世界モデル
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Interaction Networks for Learning about Objects, Relations and Physics](https://arxiv.org/abs/1612.00222) | 2016 | NIPS 2016 | 原典 | 関係モデルと物体モデルを分けた学習型物理エンジン。1ステップ学習で数千ステップのロールアウトと物体数の汎化を示した。 | ✅ p.2 |
| 2 | [Relational inductive biases, deep learning, and graph networks](https://arxiv.org/abs/1806.01261) | 2018 | arXiv | 原典 | IN・MPNN・NLNN などを統一する GN ブロックと encode-process-decode を提案した総説兼ポジション論文。 | ✅ p.3 |
| 3 | [Contrastive Learning of Structured World Models](https://arxiv.org/abs/1911.12247) | 2020 | ICLR 2020 | 発展 | 画素から物体スロットを抽出し GNN 遷移を対照損失で学ぶ物体中心世界モデル。 | ✅ p.4 |
| 4 | [Learning to Simulate Complex Physics with Graph Networks](https://arxiv.org/abs/2002.09405) | 2020 | ICML 2020 | 発展 | 粒子グラフ上のメッセージパッシングで流体・砂・粘性体を学ぶ GNS。ノイズ注入で誤差蓄積に対処。 | ✅ p.5 |
| 5 | [Learning Mesh-Based Simulation with Graph Networks](https://arxiv.org/abs/2010.03409) | 2021 | ICLR 2021 | 発展 | メッシュ空間とワールド空間の2種のエッジを持つ MeshGraphNets。適応リメッシュも学習。 | ✅ p.6 |
| 6 | [E(n) Equivariant Graph Neural Networks](https://arxiv.org/abs/2102.09844) | 2021 | ICML 2021 | 発展 | 距離と相対ベクトルだけで E(n) 等変にした簡潔な GNN。 | ✅ p.7 |
| 7 | [GraphCast: Learning skillful medium-range global weather forecasting](https://arxiv.org/abs/2212.12794) | 2023 | Science 2023 | 発展 | マルチメッシュ GNN で 10 日予報。HRES を 1380 項目の 90.3% で上回る。 | ✅ p.8 |
| 8 | [Learning Distributions of Complex Fluid Simulations with Diffusion Graph Networks](https://arxiv.org/abs/2504.02843) | 2025 | ICLR 2025 | 最新 | 多段 GNN をデノイザにした拡散モデルで流れの平衡分布を直接生成。 | ✅ p.9 |
| 9 | [ParticleFormer: A 3D Point Cloud World Model for Multi-Object, Multi-Material Robotic Manipulation](https://arxiv.org/abs/2506.23126) | 2025 | CoRL 2025 | 最新 | 粒子間相互作用を GNN でなく Transformer で学ぶロボット用 3D 世界モデル。GBND（GNN 型）を上回る。 | ✅ p.10 |
| 10 | [Training Transformers for Mesh-Based Simulations](https://arxiv.org/abs/2508.18051) | 2025 | arXiv | 最新 | 隣接行列を注意マスクにした Transformer で MGN を大きく上回り、スケーリング則も推定。 | ✅ p.11 |
| 11 | [Improving Long-Range Interactions in Graph Neural Simulators via Hamiltonian Dynamics](https://arxiv.org/abs/2511.08185) | 2026 | ICLR 2026 | 最新 | ポートハミルトン動力学と多段損失で長距離伝搬と長期ロールアウトを安定化する IGNS。 | ✅ p.12 |
| 12 | [A Compositional Object-Based Approach to Learning Physical Dynamics (NPE)](https://arxiv.org/abs/1612.00341) | 2017 | ICLR 2017 | 原典 | IN と独立に提案された物体・関係分解の物理予測モデル（検索情報と IN 本文の記述に基づく）。 | — 参照のみ（IN と同時期の並行研究のため IN を代表とした） |
| 13 | [Neural Message Passing for Quantum Chemistry (MPNN)](https://arxiv.org/abs/1704.01212) | 2017 | ICML 2017 | 原典 | GNN を message/update/readout で統一。GN 総説が特殊ケースとして整理。 | — 参照のみ（同分野 message-passing テーマの範囲） |
| 14 | [Graph networks as learnable physics engines for inference and control](https://arxiv.org/abs/1806.01242) | 2018 | ICML 2018 | 発展 | GN を順モデルとして関節体の推定・制御に使う。GN 総説・GNS が引用。 | — 参照のみ（GN 総説で要旨を把握） |
| 15 | [Learning Particle Dynamics for Manipulating Rigid Bodies, Deformable Objects, and Fluids (DPI-Net)](https://arxiv.org/abs/1810.01566) | 2019 | ICLR 2019 | 発展 | 階層粒子 GNN。GNS の比較対象（BoxBath）。 | — 参照のみ（GNS 本文の比較で言及） |
| 16 | [Object-Centric Learning with Slot Attention](https://arxiv.org/abs/2006.15055) | 2020 | NeurIPS 2020 | 発展 | 反復注意で物体スロットを得る。C-SWM の限界（同一物体の区別）への後続の答え。 | — 参照のみ（物体発見側の論文のため） |
| 17 | [SlotFormer: Unsupervised Visual Dynamics Simulation with Object-Centric Models](https://arxiv.org/abs/2210.05861) | 2023 | ICLR 2023 | 発展 | スロット表現上の Transformer 動力学。物体中心世界モデルの GNN→Transformer の流れ。 | — 参照のみ（タイトル確認のみ） |
| 18 | [MultiScale MeshGraphNets](https://arxiv.org/abs/2210.00612) | 2022 | arXiv | 発展 | 粗いメッシュとの2階層で受容野を広げる MGN の拡張。 | — 参照のみ（検索結果と後続論文での言及のみ） |
| 19 | [E(3)-Equivariant Graph Neural Networks for Data-Efficient and Accurate Interatomic Potentials (NequIP)](https://arxiv.org/abs/2101.03164) | 2022 | Nat. Commun. 2022 | 発展 | 高次テンソル表現の等変 GNN で原子間ポテンシャルを学習。 | — 参照のみ（分子・材料寄りのため EGNN を代表とした） |
| 20 | [Geometric and Physical Quantities Improve E(3) Equivariant Message Passing (SEGNN)](https://arxiv.org/abs/2110.02905) | 2022 | ICLR 2022 | 発展 | ベクトル・テンソル属性を扱う等変メッセージパッシング。 | — 参照のみ（タイトル確認のみ） |
| 21 | [Forecasting Global Weather with Graph Neural Networks](https://arxiv.org/abs/2202.07575) | 2022 | arXiv | 発展 | Keisler の GNN 天気予報。GraphCast の先行研究。 | — 参照のみ（GraphCast 本文の比較で言及） |
| 22 | [Pangu-Weather](https://arxiv.org/abs/2211.02556) | 2023 | Nature 2023 | 発展 | 3D Transformer の天気予報。GraphCast が 252 項目中 99.2% で上回る比較対象。 | — 参照のみ（GraphCast 本文の比較で言及） |
| 23 | [GenCast: Diffusion-based ensemble forecasting for medium-range weather](https://arxiv.org/abs/2312.15796) | 2024 | Nature 2025 | 最新 | GraphCast の後継で、拡散モデルによるアンサンブル予報。GraphCast のぼやけと決定論性を解消。 | — 参照のみ（タイトル・要旨確認のみ。次テーマ候補） |
| 24 | [PDE-Refiner: Achieving Accurate Long Rollouts with Neural PDE Solvers](https://arxiv.org/abs/2308.05732) | 2023 | NeurIPS 2023 | 発展 | 反復的な精緻化で長期ロールアウトを安定化。DGN が長期不安定性の文献として引用。 | — 参照のみ（GNN でないため） |
| 25 | [RoboCraft: Learning to See, Simulate, and Shape Elasto-Plastic Objects with Graph Networks](https://arxiv.org/abs/2205.02909) | 2022 | RSS 2022 | 発展 | 粒子 GNN で粘土を操作。ParticleFormer が批判する GBND の代表。 | — 参照のみ（検索結果で確認） |
| 26 | [AdaptiGraph: Material-Adaptive Graph-Based Neural Dynamics for Robotic Manipulation](https://arxiv.org/abs/2407.07889) | 2024 | RSS 2024 | 発展 | 材質パラメータに適応する粒子 GNN。ParticleFormer の比較対象 GBND の系列。 | — 参照のみ（検索結果で確認） |
| 27 | [Transolver: A Fast Transformer Solver for PDEs on General Geometries](https://arxiv.org/abs/2402.02366) | 2024 | ICML 2024 | 発展 | 物理状態のスライスに注意する Transformer の PDE ソルバ。メッシュ Transformer が関連研究に挙げる。 | — 参照のみ（タイトル確認のみ） |
| 28 | [Graph-Coupled Oscillator Networks (GraphCON)](https://arxiv.org/abs/2202.02296) | 2022 | ICML 2022 | 発展 | 振動子型 GNN で過平滑化を回避。IGNS の比較対象。 | — 参照のみ（IGNS 本文の比較で言及） |
| 29 | [Fluid-DiT: Graph-Free Diffusion Transformers for Fluid Flow Simulations Learning](https://arxiv.org/abs/2608.07161) | 2026 | arXiv | 最新 | DGN の GNN デノイザを注意に置き換えた拡散 Transformer。DGN より高精度と主張。 | — 参照のみ（アブストラクトのみ確認） |
| 30 | [MeshGraphNet-Transformer: Scalable Mesh-based Learned Simulation for Solid Mechanics](https://arxiv.org/abs/2601.23177) | 2026 | arXiv | 最新 | MGN のエンコーダに物理注意 Transformer の大域プロセッサを組み合わせ、工業規模の衝突解析に対応。 | — 参照のみ（アブストラクトのみ確認） |
| 31 | [Learning Equivariant Neural-Augmented Object Dynamics From Few Interactions (PIEGraph)](https://arxiv.org/abs/2605.02699) | 2026 | arXiv | 最新 | バネ質点の解析モデルを等変 GNN で補正し、少数の実機データで物体動力学を学ぶ。 | — 参照のみ（アブストラクトのみ確認） |
| 32 | [COGENT: Continuous Graph Emulators with Neural ODEs for Long-Term Physical Forecasting](https://arxiv.org/abs/2606.11162) | 2026 | arXiv | 最新 | 履歴をグラフで符号化し潜在 Neural ODE で連続時間に展開する氷床シミュレーションのエミュレータ。 | — 参照のみ（アブストラクトのみ確認） |
| 33 | [TRACE: A spatiotemporal contact memory graph network simulator for granular dynamics](https://arxiv.org/abs/2609.02991) | 2026 | arXiv | 最新 | 接触の記憶を持つ GNS で粒状体の長期ロールアウト誤差を下げると報告（検索結果の要約）。 | — 参照のみ（検索結果のみ確認） |
