## DeepLearning・NN との融合（deep-learning-fusion/）

### 調査履歴
- 2026-10-23: arXiv API（"particle swarm" AND "large language model"、swarm AND "neural architecture search"、"ant colony" AND neural、"meta-black-box"、swarm AND MARL 等）と WebSearch で 2024〜2026 年の動向を把握した。そこから融合の方向別に3系譜（①群知能でNN/LLMを最適化、②NN/DRLで群知能を学習・強化、③LLMを群知能の演算子に）と、深層MARLによる群制御の起点を遡った。
- ①は Heterogeneous Swarms → Model Swarms → IPPSO（PSO による CNN 構造探索）、②は DyNACO → GFACS → DeepACO と GLEET（MetaBBO 系）、③は SwarmAgentic → LMPSO（→ OPRO/LMEA）の順に遡った。
- 採録先は arXiv コメントと Crossref で確認した（LMPSO＝IEEE CEC 2025、SwarmAgentic＝EMNLP 2025）。ネットワーク拡張後に psoCNN（Elsevier、bronze OA）と Socha & Blum 2007（Springer）の公開版を Semantic Scholar・Crossref・doi.org で探したが、いずれも出版社サイトにしかなく本文を取得できなかった。OpenAlex は当日のレート上限で使えなかった。

### 系譜
```
① 群知能で NN / LLM を最適化（重み・構造・役割）
   [Kennedy & Eberhart 1995 PSO（別テーマ）]
     └→ IPPSO (Wang+ 2018, PSOでCNN構造探索) ─┬→ psoCNN (2019) / DeepSwarm (ACO-NAS, 2019)
                                                 └→ Model Swarms (Feng+ 2024, LLM重み空間でPSO)
                                                       └→ Heterogeneous Swarms (Feng+ 2025, 役割DAG+重みをPSO)

② NN / 深層RL で群知能を学習・強化（learning to optimize）
   ACO 側:  DeepACO (Ye+ 2023, GNNでη学習) → GFACS (Kim+ 2024, GFlowNetで多峰事前分布)
                 └──────────────→ NeuFACO (2025) → DyNACO (Tran+ 2026, フェロモンを観測する動的誘導)
   PSO 側:  L2L w/o GD (Chen+ 2017) → DRL-PSO/RLEPSO → GLEET (Ma+ 2024, Transformerで粒子ごとにEET制御)
            （MetaBox 2023 / LES 2022 など MetaBBO 潮流）

③ LLM を群知能の演算子に
   OPRO / LMEA (2024) → LMPSO (Shinohara+ 2025, 速度=プロンプト)
                          └→ SwarmAgentic (Zhang+ 2025, 言語PSOでエージェント系を生成) → AgentPSO (2026)
   Model Swarms ─────────────┘（LLM×PSO の重み版）

④ 深層MARL による群制御
   Hüttenrauch+ 2019（平均埋め込みDRL）→ GNN群制御 / LLM駆動の群シミュレーション (Jimenez-Romero+ 2025)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Evolving Deep Convolutional Neural Networks by Variable-length Particle Swarm Optimization for Image Classification](https://arxiv.org/abs/1803.06492) | 2018 | IEEE CEC 2018 | 原典 | IP アドレス風の符号化と Disabled 層で、可変長 CNN 構造を PSO で探索（IPPSO）。MDRBI で既存12手法より低い誤差 | ✅ p.2 |
| 2 | [Deep Reinforcement Learning for Swarm Systems](https://arxiv.org/abs/1807.06613) | 2019 | JMLR 2019 | 原典 | 近傍観測の平均埋め込みを状態とする深層RLで、群の分散方策を学習。個体数が変わっても転用できる | ✅ p.3 |
| 3 | [DeepACO: Neural-enhanced Ant Systems for Combinatorial Optimization](https://arxiv.org/abs/2309.14032) | 2023 | NeurIPS 2023 | 原典 | ACO のヒューリスティック η を GNN＋REINFORCE で学習。8種の組合せ最適化で ACO を一貫して改善 | ✅ p.4 |
| 4 | [Ant Colony Sampling with GFlowNets for Combinatorial Optimization](https://arxiv.org/abs/2403.07041) | 2024 | AISTATS 2025 | 発展 | DeepACO の η を GFlowNet（off-policy, energy reshaping）で学習して多峰の事前分布にし、ACO 探索との相乗を狙う（GFACS） | ✅ p.5 |
| 5 | [Auto-configuring Exploration-Exploitation Tradeoff in Evolutionary Computation via Deep Reinforcement Learning](https://arxiv.org/abs/2404.08239) | 2024 | GECCO 2024 | 発展 | Transformer 方策が PSO の粒子ごとの c1 を動的制御。問題クラスで学習し未知問題へ汎化（GLEET） | ✅ p.6 |
| 6 | [Model Swarms: Collaborative Search to Adapt LLM Experts via Swarm Intelligence](https://arxiv.org/abs/2410.11163) | 2024 | ICML 2025 | 発展 | LoRA 専門家を粒子として重み空間を PSO 探索し、200事例程度で LLM を適応。12の合成手法を上回る | ✅ p.7 |
| 7 | [Heterogeneous Swarms: Jointly Optimizing Model Roles and Weights for Multi-LLM Systems](https://arxiv.org/abs/2502.04510) | 2025 | NeurIPS 2025 | 最新 | マルチLLM系の DAG（役割）と重みを、PSO で交互に最適化。JFK-score で個別の貢献を評価 | ✅ p.8 |
| 8 | [Large Language Models as Particle Swarm Optimizers](https://arxiv.org/abs/2504.09247) | 2025 | IEEE CEC 2025 | 最新 | 速度をプロンプトで表し、LLM が次の解を生成する LMPSO。TSP、ヒューリスティック改良、記号回帰で評価 | ✅ p.9 |
| 9 | [SwarmAgentic: Towards Fully Automated Agentic System Generation via Swarm Intelligence](https://arxiv.org/abs/2506.15672) | 2025 | EMNLP 2025 | 最新 | エージェント系を言語の粒子として、LLM が失敗を考慮した速度・位置更新を行い、ゼロから自動生成 | ✅ p.10 |
| 10 | [Beyond Static Priors: Dynamic Neural Guidance for Large-Scale Ant Colony Optimization](https://arxiv.org/abs/2606.04039) | 2026 | KDD 2026 | 最新 | フェロモンと現行解を観測する semi-MDP 方策で ACO を動的に誘導（DyNACO）。TSP 10万ノードまで拡張 | ✅ p.11 |
| 11 | [Particle swarm optimization of deep neural networks architectures for image classification](https://doi.org/10.1016/j.swevo.2019.05.010) | 2019 | Swarm and Evolutionary Computation | 発展 | psoCNN。PSO で CNN 構造を探索する代表的研究（被引用数約350）。S2 上は bronze OA だが Elsevier にしかなく、本文を取得できない（検索情報に基づく） | ⚠️ 本文未確認 |
| 12 | [An ant colony optimization algorithm for continuous optimization: application to feed-forward neural network training](https://doi.org/10.1007/s00521-007-0084-z) | 2007 | Neural Computing and Applications | 原典 | ACO_R（連続 ACO）を順伝播 NN の重み学習に適用した古典研究（検索情報に基づく）。Springer で到達不可 | ⚠️ 本文未確認 |
| 13 | Particle Swarm Optimization (Kennedy & Eberhart) | 1995 | IEEE ICNN 1995 | 原典 | PSO の原典。NN の重み学習を応用例に含む。群知能の原典は別テーマ「全体像」の担当なので、ここでは扱わない | — 参照のみ |
| 14 | [DeepSwarm: Optimising Convolutional Neural Networks using Swarm Intelligence](https://arxiv.org/abs/1905.07350) | 2019 | arXiv プレプリント | 発展 | ACO による NAS（フェロモン更新＋progressive NAS＋重み再利用）。①の代表は IPPSO としたため、概要・導入のみ確認 | — 参照のみ |
| 15 | [Learning to Learn without Gradient Descent by Gradient Descent](https://arxiv.org/abs/1611.03824) | 2017 | ICML 2017 | 原典 | RNN でブラックボックス最適化器を学習する L2O の起点。GLEET 系の背景としてメタデータのみ確認 | — 参照のみ |
| 16 | [Discovering Evolution Strategies via Meta-Black-Box Optimization](https://arxiv.org/abs/2211.11260) | 2022 | ICLR 2023 | 発展 | 注意機構でパラメータ化した ES をメタ学習（LES）。MetaBBO の代表例。群知能ではなく ES なのでスライド化しない | — 参照のみ |
| 17 | [MetaBox: A Benchmark Platform for Meta-Black-Box Optimization with Reinforcement Learning](https://arxiv.org/abs/2310.08252) | 2023 | NeurIPS 2023 | 発展 | RL で PSO/DE 等を制御する MetaBBO 手法のベンチマーク。GLEET の評価基盤の文脈 | — 参照のみ |
| 18 | [ReEvo: Large Language Models as Hyper-Heuristics with Reflective Evolution](https://arxiv.org/abs/2402.01145) | 2024 | NeurIPS 2024 | 発展 | DeepACO 著者による、LLM で ACO 等のヒューリスティックを進化させる研究。GA 型の LLM 最適化なので参照のみ | — 参照のみ |
| 19 | [NeuFACO: Neural Focused Ant Colony Optimization for Traveling Salesman Problem](https://arxiv.org/abs/2509.16938) | 2025 | arXiv プレプリント（RIVF'25 投稿） | 発展 | DyNACO と同じ著者による前段研究（PPO＋GNN で FACO を誘導）。DyNACO が上位互換なので参照のみ | — 参照のみ |
| 20 | [Large Language Model Enhanced Particle Swarm Optimization for Hyperparameter Tuning for Deep Learning Models](https://arxiv.org/abs/2504.14126) | 2025 | IEEE OJ-CS 2025（検索情報） | 最新 | 性能の悪い粒子の位置を LLM が置き換える PSO で DL のハイパラを調整。LMPSO と同系統なので検索結果のみ確認 | — 参照のみ |
| 21 | [Multi-Agent Systems Powered by Large Language Models: Applications in Swarm Intelligence](https://arxiv.org/abs/2503.03800) | 2025 | arXiv プレプリント | 最新 | NetLogo の蟻の採餌・鳥の群れで、エージェントの規則を GPT-4o のプロンプトに置き換える。アブストラクトのみ確認 | — 参照のみ |
| 22 | [AgentPSO: Evolving Agent Reasoning Skill via Multi-agent Particle Swarm Optimization](https://arxiv.org/abs/2605.08704) | 2026 | ICML 2026 AI4Math Workshop | 最新 | 自然言語のスキルを粒子状態、意味的な更新方向を速度として推論スキルを進化させる。ワークショップ論文なのでアブストラクトと導入のみ確認 | — 参照のみ |
| 23 | [Transformer-Guided Swarm Intelligence for Frugal Neural Architecture Search](https://arxiv.org/abs/2607.11826) | 2026 | arXiv プレプリント | 最新 | RL で学習した Transformer 制御器（大域探索）と ABC（局所探索）を組み合わせた省資源 NAS。題目・要旨のみ確認 | — 参照のみ |
| 24 | [G-ICSO-NAS: Shifting Gears between Gradient and Swarm for Robust Neural Architecture Search](https://arxiv.org/abs/2604.00703) | 2026 | IJCNN 2026 | 最新 | DARTS 系の勾配 NAS と競合群最適化（CSO）を段階的に切り替えるハイブリッド NAS。要旨のみ確認 | — 参照のみ |
