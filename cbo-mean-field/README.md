## Consensus-Based Optimization（CBO）と群れの平均場理論（cbo-mean-field/）

### 調査履歴
- 2026-10-23: foundations 調査の推奨テーマ1を受けて、arXiv API で "consensus-based optimization" を新しい順に約100件洗い出し、2025〜2026 年の最新動向（一様時間 propagation of chaos、有限 N の安定性、CBO→ES/MPPI の統一、ロボット応用）を把握した。そこから Fornasier+ 2021（W2 距離による大域収束）→ Carrillo+ 2018（分散ベース解析）→ Pinnau+ 2017（原典）へ遡り、PSO との接続（Grassi & Pareschi 2021）、サンプリング（CBS 2022）、制約付き（Carrillo+ 2024）の拡張枝を追った。
- 原典 2 本（M3AS）を含め、スライドにした 10 本はすべて arXiv 版で全文を読んだ（2023 年以降の一部は HTML 版の図を利用）。理論論文は定理の主張と証明の方針まで読み、補題の細部の証明は概略のみ確認した。
- foundations 既存の Huang+ 2022（PSO の大域収束）、Borghi+ 2026（PSO の長時間安定性）、Vicsek 1995 は再掲せず、↪ で参照した。多目的・鞍点・二層・一様時間の別解など、関連論文はアブストラクトと序論で確認して一覧に載せた。

### 系譜
```
【原典】 Pinnau+ 2017 CBO ✅（Gibbs 重み平均への合意＋距離比例の雑音、平均場 PDE）
            │
            ├→ Carrillo+ 2018 ✅（平均場の適切性・分散ベースの合意と Laplace 原理）
            │      ├→ Carrillo+ 2019（成分ごと雑音・ミニバッチ, 高次元 ML）
            │      └→ Huang & Qiu 2021（平均場極限の定性的証明）
            │
            ├→ 【PSO との接続】 Grassi & Pareschi 2021 ✅（SD-PSO、慣性 m→0 で CBO）
            │      → Cipriani+ 2021（零慣性極限の厳密化）→ Huang+ 2022 PSO 大域収束 ↪foundations
            │      → Borghi+ 2026 PSO 長時間安定性 ↪foundations ／ Hoffmann+ 2026（係数結合下の保証）
            │
            ├→ 【転換点】 Fornasier+ 2021 ✅（W2 距離＝Lyapunov、初期条件の緩和、離散 CBO の確率的収束）
            │      ├→ Riedl+ 2023（CBO≒勾配降下の確率的緩和）
            │      ├→ Gerber+ 2023（CBO/CBS の定量的平均場極限）
            │      ├→ 【一様時間】 Huang & Kouhkouh 2024（再スケール版）／Bayraktar+ 2025（有界領域・弱）
            │      │          → Gerber+ 2025 ✅（原型 CBO で UiT PoC）→ Ha+ 2026（2階 CBO 版）
            │      ├→ 【有限 N・離散】 Göttlich+ 2025 ✅（合意多様体への指数安定）／Bonandin+ 2025（強収束）
            │      │          ／Bianchi+ 2025（固定小雑音での長時間）
            │      └→ 【雑音・離散化の再設計】 Fornasier+ 2026 ✅（δ-CBO→CF→CH=MPPI=(1,N)-ES）
            │                 → Sun+ 2026 ✅（ロボット軌道最適化）／Haug 2026（変種の平均場極限）
            │
            ├→ 【サンプリング】 Carrillo+ 2022 CBS ✅ → Gerber+ 2023 ／ Bungert+ 2022 polarized
            ├→ 【制約付き】 Borghi+ 2021（ペナルティ）→ Beddrich+ 2024（反射境界）→ Carrillo+ 2024 ✅（勾配強制項）
            ├→ 【多目的】 Borghi+ 2022 ／ 【鞍点】 Huang+ 2022 CBO-SP
            └→ 【機械学習】 Carrillo+ 2019 ／ Roith+ 2025（敵対的攻撃, NES との接続）／ De Deyn+ 2025（2層 NN の平均場）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [A consensus-based model for global optimization and its mean-field limit](https://arxiv.org/abs/1604.05648) | 2017 | M3AS | 原典 | CBO の提案。Gibbs 重み平均への合意と距離比例の雑音で探索し、平均場 PDE へ移行できる。d=20 Rastrigin で α が N より効く。 | ✅ p.2 |
| 2 | [An analytical framework for a consensus-based global optimization method](https://arxiv.org/abs/1602.00220) | 2018 | M3AS | 発展 | 平均場 Fokker–Planck の適切性、分散の指数減衰による合意、Laplace 原理で合意点が最小点近くにあることを証明。 | ✅ p.3 |
| 3 | [From particle swarm optimization to consensus based optimization: stochastic modeling and mean-field limit](https://arxiv.org/abs/2012.05613) | 2021 | M3AS | 発展 | PSO を記憶つき SDE（SD-PSO）にし、平均場 VFP 方程式と慣性 m→0 での CBO を形式的に導出。 | ✅ p.4 |
| 4 | [Consensus-based optimization methods converge globally](https://arxiv.org/abs/2103.15130) | 2021 | SIAM J. Optim. 2024 | 発展 | W2 距離を Lyapunov 関数とし、緩い初期条件で平均場の大域収束と離散 CBO の確率的収束を証明。 | ✅ p.5 |
| 5 | [Consensus Based Sampling](https://arxiv.org/abs/2106.02519) | 2022 | Stud. Appl. Math. | 発展 | 重み付き平均・共分散で事後分布サンプリングと MAP 推定を切り替える CBS。線形逆問題で収束率を明示。 | ✅ p.6 |
| 6 | [An interacting particle consensus method for constrained global optimization](https://arxiv.org/abs/2405.00891) | 2024 | arXiv | 発展 | 等式制約へ向かう勾配強制項つき CBO。平均場の指数収束と線形陰的離散化。ペナルティ CBO・CB2O を大きく上回る。 | ✅ p.7 |
| 7 | [Uniform-in-time propagation of chaos for Consensus-Based Optimization](https://arxiv.org/abs/2505.08669) | 2025 | arXiv | 最新 | 原型 CBO で一様時間の propagation of chaos（O(1/J)）と有限粒子の概収束を証明。 | ✅ p.8 |
| 8 | [Exponential stability of finite-N consensus-based optimization](https://arxiv.org/abs/2510.19565) | 2025 | arXiv | 最新 | 有限 N・有限 α の異方性 CBO が合意多様体へ指数安定（平均二乗の率 2λ−σ²）であることを示す。 | ✅ p.9 |
| 9 | [From Consensus-Based Optimization to Evolution Strategies: Proof of Global Convergence](https://arxiv.org/abs/2602.11677) | 2026 | arXiv | 最新 | δ-CBO・Consensus Freezing・Consensus Hopping（MPPI, ES）を接続し、不変測度と無限時間の指数収束を証明。 | ✅ p.10 |
| 10 | [Consensus-based Optimization (CBO): Towards Global Optimality in Robotics](https://arxiv.org/abs/2602.06868) | 2026 | arXiv | 最新 | ロボット軌道最適化に CBO を導入し、MPPI・CMA-ES より低コストの解を得る。 | ✅ p.11 |
| 11 | [On the Global Convergence of Particle Swarm Optimization Methods](https://arxiv.org/abs/2201.12460) | 2022 | Appl. Math. Optim. 2023 | 発展 | CBO の解析法を慣性・記憶つき PSO の平均場に移植した大域収束の証明。 | ↪ 既存：foundations p.6 |
| 12 | [Long-time Stability and Convergence of Particle Swarm Optimization](https://arxiv.org/abs/2607.24696) | 2026 | arXiv | 最新 | PSO の停滞仮定の解析と平均場理論を離散時間でつなぐ。 | ↪ 既存：foundations p.12 |
| 13 | [Novel type of phase transition in a system of self-driven particles](https://arxiv.org/abs/cond-mat/0611743) | 1995 | PRL | 原典 | 群れの集団運動モデル（Vicsek）。CBO が着想した合意・整列モデルの源流。 | ↪ 既存：foundations p.2 |
| 14 | [A consensus-based global optimization method for high dimensional machine learning problems](https://arxiv.org/abs/1909.09249) | 2019 | arXiv | 発展 | 成分ごとの雑音で次元依存を除き、ミニバッチで計算量を削減。高次元 ML 向け CBO（アブストラクトで確認） | — 参照のみ |
| 15 | [On the mean-field limit for the consensus-based optimization](https://arxiv.org/abs/2105.12919) | 2021 | arXiv | 発展 | 経験測度のタイトネスによる平均場極限の定性的証明。PSO にも拡張（アブストラクトで確認） | — 参照のみ |
| 16 | [Zero-Inertia Limit: from Particle Swarm Optimization to Consensus Based Optimization](https://arxiv.org/abs/2104.06939) | 2021 | arXiv | 発展 | Grassi & Pareschi の零慣性極限を収束率つきで厳密化（アブストラクトで確認） | — 参照のみ |
| 17 | [Constrained consensus-based optimization](https://arxiv.org/abs/2111.10571) | 2021 | arXiv | 発展 | 厳密ペナルティと反復的な係数更新による制約付き CBO（アブストラクトで確認） | — 参照のみ |
| 18 | [A consensus-based algorithm for multi-objective optimization and its mean-field description](https://arxiv.org/abs/2203.16384) | 2022 | arXiv | 発展 | スカラー化した部分問題を粒子群が同時に解く多目的 CBO（アブストラクトで確認）。多目的枝の代表 | — 参照のみ |
| 19 | [Consensus-Based Optimization for Saddle Point Problems](https://arxiv.org/abs/2212.12334) | 2022 | SIAM J. Control Optim. 2024 | 発展 | min/max の2群で非凸・非凹の大域ナッシュ均衡を求める CBO-SP（アブストラクトと序論で確認）。制約付きを優先しスライド化せず | — 参照のみ |
| 20 | [Gradient is All You Need? How Consensus-Based Optimization can be Interpreted as a Stochastic Relaxation of Gradient Descent](https://arxiv.org/abs/2306.09778) | 2023 | SIAM J. Math. Data Sci. 2026 | 発展 | 微分なしの CBO が SGD 的に振る舞うことを示し、勾配法の確率的緩和を説明（アブストラクトで確認） | — 参照のみ |
| 21 | [Mean-field limits for Consensus-Based Optimization and Sampling](https://arxiv.org/abs/2312.07373) | 2023 | arXiv | 発展 | 小確率事象を除く Sznitman 論法の一般化で CBO・CBS の定量的平均場極限（アブストラクトと Gerber+ 2025 の整理で確認） | — 参照のみ |
| 22 | [CBX: Python and Julia packages for consensus-based interacting particle methods](https://arxiv.org/abs/2403.14470) | 2024 | JOSS | 発展 | CBO 系手法の実装ライブラリ（CBXPy / ConsensusBasedX.jl）（アブストラクトで確認） | — 参照のみ |
| 23 | [Constrained Consensus-Based Optimization and Numerical Heuristics for the Few Particle Regime](https://arxiv.org/abs/2410.10361) | 2024 | arXiv | 発展 | 反射境界条件による制約付き CBO の収束率つき証明と少粒子向け工夫（アブストラクトで確認） | — 参照のみ |
| 24 | [Uniform-in-time mean-field limit estimate for the Consensus-Based Optimization](https://arxiv.org/abs/2411.03986) | 2024 | arXiv | 最新 | 合意点を κ で再スケールした CBO で一様時間の平均場極限（アブストラクトで確認） | — 参照のみ |
| 25 | [Uniform-in-time weak propagation of chaos for consensus-based optimization](https://arxiv.org/abs/2502.00582) | 2025 | arXiv | 最新 | 有界領域の CBO で弱誤差 O(1/N) が一様時間で成立（アブストラクトで確認） | — 参照のみ |
| 26 | [Consensus-based optimization for closed-box adversarial attacks and a connection to evolution strategies](https://arxiv.org/abs/2506.24048) | 2025 | arXiv | 最新 | Consensus Hopping と NES の関係を示し、敵対的攻撃で CBO が NES を上回る場合を報告（アブストラクトで確認） | — 参照のみ |
| 27 | [Consensus-Based Optimization Beyond Finite-Time Analysis](https://arxiv.org/abs/2509.12907) | 2025 | arXiv | 最新 | 小さい固定雑音の CBO の長時間挙動を平均場・有限粒子の両方で評価（アブストラクトで確認） | — 参照のみ |
| 28 | [A modified Consensus-Based Optimization model: consensus formation and uniform-in-time propagation of chaos](https://arxiv.org/abs/2511.19116) | 2025 | arXiv | 最新 | 正則化した Gibbs 重みで合意形成と一様時間 PoC を統一的に示す（アブストラクトで確認） | — 参照のみ |
| 29 | [Mean-Field Model for Two-Layer Neural Networks Trained with Consensus-Based Optimization](https://arxiv.org/abs/2511.21466) | 2025 | arXiv | 最新 | 2層 NN を CBO で学習し、Adam との比較・併用と Wasserstein-over-Wasserstein の平均場モデル（アブストラクトで確認） | — 参照のみ |
| 30 | [Strong Global Convergence of the Consensus-Based Optimization Algorithm](https://arxiv.org/abs/2512.10654) | 2025 | arXiv | 最新 | 離散時間 CBO の大域最小点への強い平均二乗収束を Δt・N の明示的な率で証明（本文確認済み。図・実験がなく、Fornasier+ 2021 の改良に当たるため参照のみ） | — 参照のみ |
| 31 | [Uniform-in-time propagation of chaos for Second-Order Consensus-Based Optimization](https://arxiv.org/abs/2605.20697) | 2026 | arXiv | 最新 | 速度に合意力と雑音が働く2階 CBO の一様時間 PoC（アブストラクトで確認） | — 参照のみ |
| 32 | [From Consensus-Based Optimization to Particle Swarm Optimization: Convergence Guarantees under Drift-Diffusion Coupling](https://arxiv.org/abs/2609.17002) | 2026 | arXiv（NeurIPS 2026 WS 投稿） | 最新 | PSO の係数結合の下でも CBO の収束保証が成り立つパラメータ域を構成（アブストラクトで確認） | — 参照のみ |
| 33 | [Quantitative Mean-Field Limits for Recent Variants of Consensus-Based Optimization](https://arxiv.org/abs/2610.02901) | 2026 | arXiv（修士論文） | 最新 | δ-CBO・CF・CH の定量的平均場極限（アブストラクトで確認） | — 参照のみ |
| 34 | [Convergence of a first-order consensus-based global optimization algorithm](https://arxiv.org/abs/1910.08239) | 2019 | arXiv | 発展 | 全粒子が共通の雑音をもつ簡略版 CBO の有限 N 解析（Göttlich+ 2025 の引用から把握。未読） | — 参照のみ |
| 35 | [Polarized consensus-based dynamics for optimization and sampling](https://arxiv.org/abs/2211.05238) | 2022 | Math. Program. 2025 | 発展 | 局所的な合意点で複数の最小点・多峰分布を扱う変種（タイトルと掲載情報のみ。未読） | — 参照のみ |
