## 遺伝的アルゴリズムの応用（applications/）

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
