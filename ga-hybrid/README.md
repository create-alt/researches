## GA との融合（ga-hybrid/）

### 調査履歴
- 2026-10-23: arXiv API と Web 検索で「PSO × GA hybrid」「LLM × particle swarm」「LLaMEA」「memetic × swarm」「multi-objective PSO × genetic」を直近（2024〜2026）から検索。最新の LMPSO、Cen & Tan（群知能とプロンプトの共進化）、Urbańczyk+（逐次・並列・交互ハイブリッドの比較）、METAFOR を起点にした。
- 系譜は2本たどった。(A) 手作りハイブリッド → モジュール化・自動構成：参考文献から Breeding Swarms（GECCO 2005）、PGPHEA、Swarming GA（PLOS ONE）、PSODE、METAFOR へ。(B) LLM を変異・交叉演算子にする流れ：ELM → EoH → LLaMEA → LMPSO / Cen & Tan。
- 途中でネットワークが広がったため、本文未確認だった古典を OA 版で探し直した。Breeding Swarms は GECCO 2005 予稿の公開版、Swarming GA は PLOS ONE の OA 版で全文を読んだ。Juang 2004、Løvbjerg+ 2001、Angeline 1998、Moscato 1989、Poli+ 2005、FunSearch は正規の公開版に到達できなかった（Nature と PMC は認証・reCAPTCHA で止まった）。
- 多目的最適化での融合（MOPSO の変異演算子、MOEA/D × PSO など）は arXiv に全文がある適当な論文が見つからず、スライド化しなかった（下表で本文未確認として記載）。

### 系譜
```
[A] 手作りハイブリッド → 設計空間の自動探索
  Angeline 1998 / Løvbjerg+ 2001 / Juang 2004 HGAPSO（本文未確認）
     └→ Breeding Swarms (2005, GA 演算子 + VPAC 交叉)  ── PGPHEA (Shi+ 2003, 並列) / HPSOM (2005, 変異)
          └→ Swarming GA (2022, GA の中に PSO を入れ子)
               └→ Consecutive PSO-GA (2025, 逐次・並列・交互を比較)
     └→ DEPSO (2003) → PSODE (2020, モジュール化、800 通り) → METAFOR (2025, PSO/DE/CMA-ES を irace で自動設計)

[B] LLM を変異・交叉演算子・設計者にする
  ELM (2022, LLM = GP の変異) → LMX (2023, LLM = 交叉) / FunSearch (2023-24)
     └→ EoH (2024, 考え + コードを LLM で交叉・変異) → ReEvo (2024)
     └→ LLaMEA (2024, メタヒューリスティック全体を生成。DE/PSO ハイブリッドが多く出現) ← PSODE などのモジュール型枠組み
          └→ LMPSO (2025, PSO の速度 = プロンプト)
          └→ Cen & Tan (2025, 群知能の演算子とプロンプトを共進化)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Breeding Swarms: A GA/PSO Hybrid](https://doi.org/10.1145/1068009.1068035)（[公開 PDF](https://gpbib.pmacs.upenn.edu/gecco2005/docs/p161.pdf)） | 2005 | GECCO 2005 | 原典 | PSO に GA の選択・交叉・変異と速度を使う VPAC 交叉を組み込み、5関数で GA・PSO の双方をおおむね上回った | ✅ p.2 |
| 2 | [A Modular Hybridization of Particle Swarm Optimization and Differential Evolution](https://arxiv.org/abs/2006.11886) | 2020 | GECCO 2020 Companion | 発展 | PSO と DE をモジュール化して 800 通りのハイブリッドを BBOB で評価した。最良の DE には届かなかった | ✅ p.3 |
| 3 | [Swarming genetic algorithm: A nested fully coupled hybrid of GA and PSO](https://doi.org/10.1371/journal.pone.0275094) | 2022 | PLOS ONE | 発展 | GA ループに PSO を入れ子にした SGA。CEC2017 で平均順位 1.28 | ✅ p.4 |
| 4 | [Evolution through Large Models](https://arxiv.org/abs/2206.08896) | 2022 | arXiv | 原典 | コード LLM を GP の変異演算子にした ELM。MAP-Elites で Sodarace プログラムを大量生成 | ✅ p.5 |
| 5 | [Evolution of Heuristics: Towards Efficient Automatic Algorithm Design Using Large Language Model](https://arxiv.org/abs/2401.02051) | 2024 | ICML 2024 | 発展 | 考えとコードを LLM で交叉・変異させるヒューリスティック自動設計。FunSearch より大幅に少ない問い合わせ数 | ✅ p.6 |
| 6 | [LLaMEA: A Large Language Model Evolutionary Algorithm for Automatically Generating Metaheuristics](https://arxiv.org/abs/2405.20132) | 2024 | IEEE TEVC 2025 | 発展 | (1+,1)-ES で LLM にメタヒューリスティック全体を生成させ、BBOB 5D で CMA-ES 超えを得た | ✅ p.7 |
| 7 | [METAFOR: A Hybrid Metaheuristics Software Framework for Single-Objective Continuous Optimization Problems](https://arxiv.org/abs/2502.11225) | 2025 | arXiv | 最新 | PSO/DE/CMA-ES/局所探索の融合を irace で自動設計した。CMA-ES を含むハイブリッドが頑健 | ✅ p.8 |
| 8 | [Large Language Models as Particle Swarm Optimizers](https://arxiv.org/abs/2504.09247) | 2025 | IEEE CEC 2025 | 最新 | 粒子の速度をプロンプトとして表し、LLM が次の位置を生成する LMPSO | ✅ p.9 |
| 9 | [Sequential, Parallel and Consecutive Hybrid Evolutionary-Swarm Optimization Metaheuristics](https://arxiv.org/abs/2508.00229) | 2025 | ICCS 2025 Workshops | 最新 | PSO-GA の逐次・並列・交互（速度と個人最良を継承）を 10〜1000 次元で比較した | ✅ p.10 |
| 10 | [Beyond Algorithm Evolution: An LLM-Driven Framework for the Co-Evolution of Swarm Intelligence Optimization Algorithms and Prompts](https://arxiv.org/abs/2512.09209) | 2025 | arXiv | 最新 | FWA の演算子とプロンプトテンプレートを1つの LLM で共進化させ、EoH/ReEvo/FunSearch を上回った | ✅ p.11 |
| 11 | [A hybrid of genetic algorithm and particle swarm optimization for recurrent network design (Juang)](https://doi.org/10.1109/TSMCB.2003.818557) | 2004 | IEEE TSMC-B 34(2) | 原典 | HGAPSO。GA の上位個体を PSO で強化し、交叉・変異と組み合わせて RNN/ファジィネットを設計（検索情報による） | ⚠️ 本文未確認 |
| 12 | Hybrid particle swarm optimiser with breeding and subpopulations (Løvbjerg, Rasmussen, Krink) | 2001 | GECCO 2001 | 原典 | PSO に算術交叉（breeding）と部分集団を導入した初期のハイブリッド。改善は小さかったと後続研究が報告している。学生課題ページの複製しか見つからず、正規の公開版は確認できなかった | ⚠️ 本文未確認 |
| 13 | [Using selection to improve particle swarm optimization (Angeline)](https://doi.org/10.1109/ICEC.1998.699327) | 1998 | IEEE ICEC 1998 | 原典 | PSO に EA 型のトーナメント選択を導入した最初期の融合（検索情報による） | ⚠️ 本文未確認 |
| 14 | On Evolution, Search, Optimization, Genetic Algorithms and Martial Arts: Towards Memetic Algorithms (Moscato) | 1989 | Caltech C3P Report 826 | 原典 | ミーム的アルゴリズム（GA + 個体の局所学習）の命名と提案 | ⚠️ 本文未確認 |
| 15 | [Extending particle swarm optimisation via genetic programming (Poli, Langdon, Holland)](https://doi.org/10.1007/978-3-540-31989-4_26) | 2005 | EuroGP 2005 | 原典 | GP で PSO の力の式（更新則）を進化させた。LLM による更新則設計の前史 | ⚠️ 本文未確認 |
| 16 | [Mathematical discoveries from program search with large language models (FunSearch)](https://doi.org/10.1038/s41586-023-06924-6) | 2024 | Nature 625 | 原典 | LLM と島モデル進化でプログラムを探索し、cap set やビンパッキングで新しい解を発見した | ⚠️ 本文未確認 |
| 17 | Particle swarm optimization with crossover: a review and empirical analysis (Engelbrecht) | 2016 | Artificial Intelligence Review | 発展 | 交叉を使う PSO の総説と実験比較（検索情報による） | ⚠️ 本文未確認 |
| 18 | Handling multiple objectives with particle swarm optimization (Coello Coello+, MOPSO) | 2004 | IEEE TEVC 8(3) | 原典 | 外部アーカイブと変異演算子を持つ多目的 PSO。多目的での GA 演算子融合の代表（検索情報による） | ⚠️ 本文未確認 |
| 19 | Hybrid evolutionary algorithms based on PSO and GA / PSO-GA based hybrid evolutionary algorithm (Shi+) | 2003 | CEC 2003 / ICMLC 2003 | 原典 | 逐次型 PGSHEA と並列型 PGPHEA の原典。#3 と #9 で比較対象として再実装されている | ⚠️ 本文未確認 |
| 20 | A hybrid Particle Swarm Optimization applied to loss power minimization (Esmin+, HPSOM) | 2005 | IEEE Trans. Power Systems | 発展 | PSO に GA の変異を加えた HPSOM。#3 で比較対象になっている | ⚠️ 本文未確認 |
| 21 | [Particle Swarm Optimization: A survey of historical and recent developments with hybridization perspectives](https://arxiv.org/abs/1804.05319) | 2018 | MAKE 2019 | 発展 | GA/DE/SA/ACO/CS/ABC との融合を表で整理した総説。融合の分類（逐次・並列・演算子組込み）の出典として参照した。総説なのでスライド化は見送った | — 参照のみ |
| 22 | [Language Model Crossover: Variation through Few-Shot Prompting](https://arxiv.org/abs/2302.12170) | 2023 | ACM TELO（arXiv） | 発展 | LLM の few-shot 生成を交叉演算子として使う LMX。ELM と EoH の間をつなぐ。取得したが精読していない | — 参照のみ |
| 23 | [ReEvo: Large Language Models as Hyper-Heuristics with Reflective Evolution](https://arxiv.org/abs/2402.01145) | 2024 | NeurIPS 2024 | 発展 | 短期・長期の反省を入れた LLM 進化によるヒューリスティック設計。#10 の比較対象。精読していない | — 参照のみ |
| 24 | [LLM4CMO: Large Language Model-aided Algorithm Design for Constrained Multiobjective Optimization](https://arxiv.org/abs/2508.11871) | 2025 | arXiv | 最新 | 制約付き多目的 EA の混合演算子などを LLM で設計する。群知能を含まないためスライド化しなかった | — 参照のみ |
| 25 | [Behaviour Space Analysis of LLM-driven Meta-heuristic Discovery](https://arxiv.org/abs/2507.03605) | 2025 | arXiv | 最新 | LLaMEA が生成したアルゴリズムの探索挙動を可視化・分析した。要旨のみ確認 | — 参照のみ |
| 26 | [LLaMEA-SAGE: Guiding Automated Algorithm Design with Structural Feedback from Explainable AI](https://arxiv.org/abs/2601.21511) | 2026 | arXiv | 最新 | 生成コードの AST 特徴量と XAI で LLaMEA の変異指示を誘導する。要旨のみ確認 | — 参照のみ |
| 27 | [Robustness and Invariance of Hybrid Metaheuristics under Objective Function Transformations](https://arxiv.org/abs/2509.05445) | 2025 | arXiv | 最新 | 19 手法に共通のハイブリッド化演算子を加え、変換への頑健性を比べた。DE 系は頑健で PSO 系は劣化する。要旨のみ確認 | — 参照のみ |
| 28 | [Hybrid metaheuristics for architectural design optimization under small evaluation and wall-clock budgets](https://arxiv.org/abs/2610.26202) | 2026 | arXiv | 最新 | 少ない評価回数で使う CMA-ES+DE と PSO+DE 注入のハイブリッド。要旨のみ確認 | — 参照のみ |
| 29 | [Breeding Swarms: A New Approach to Recurrent Neural Network Training](https://gpbib.pmacs.upenn.edu/gecco2005/docs/p185.pdf) | 2005 | GECCO 2005 | 発展 | Breeding Swarms を RNN の学習に応用した姉妹論文。冒頭のみ確認 | — 参照のみ |
| 30 | [SwarmAgentic](https://arxiv.org/abs/2506.15672) / [AgentPSO](https://arxiv.org/abs/2605.08704) | 2025-26 | EMNLP 2025 / arXiv | 最新 | PSO で LLM エージェントシステムを最適化する逆向きの融合。テーマ外のため要旨のみ確認 | — 参照のみ |
