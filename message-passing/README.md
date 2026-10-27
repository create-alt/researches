## メッセージパッシング GNN の基礎と表現力（message-passing/）

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
