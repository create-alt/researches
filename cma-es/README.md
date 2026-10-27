## CMA-ES とその発展（cma-es/）

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
