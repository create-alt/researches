## Graph Transformer・グラフ基盤モデルと LLM（graph-transformers/）

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
