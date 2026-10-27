## 遺伝的プログラミングとシンボリック回帰（genetic-programming/）

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
