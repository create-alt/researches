## GNN による物理シミュレーション・世界モデル（graph-world-models/）

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
