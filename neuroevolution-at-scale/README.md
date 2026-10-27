## 進化戦略・ニューロエボリューションの大規模化（neuroevolution-at-scale/）

### 調査履歴
- 2026-10-27: arXiv API で `abs:"evolution strategies" AND (abs:LLM OR abs:"language model")`、`ti:"evolution strategies" AND (ti:scale OR ti:fine-tuning OR ti:LLM OR ti:reasoning)` を新しい順に検索した。2025-09 の ES at Scale（ICML 2026）以降、LLM の全パラメータを ES で微調整する研究が 2026 年に急増していること（EGGROLL、忘却論争、GRPO との幾何比較、Pass@K の被覆、QES・Hyper-ES・非同期 ES など）を確認した。
- 系譜は 2 本たどった。(A) ES の大規模並列：OpenAI-ES → Deep GA / ES と SGD の関係 → PES → EvoJAX（evosax）→ ES at Scale → EGGROLL。(B) LLM への進化計算の持ち込み：進化的モデルマージ（低次元レシピ）→ ES at Scale（全パラメータ）→ 忘却・幾何・被覆をめぐる 2026 年の論争（Abdi+ → Hoy+ → Ba+）。
- 前任者が downloads/ に置いた 13 本の PDF を再利用し、全スライド論文は arXiv 版の本文（問題提起・手法・実験・考察、主要な付録）を読んだ。HTML 版のある 2024 年以降の論文は HTML から図を取得し、それ以外は PDF をページ画像化して切り抜いた。採録先は arXiv のコメント欄と Web 検索（EGGROLL の ICML 2026 は ICML の poster ページ）で確認した。
- ES の原典である Rechenberg（1973）・Schwefel（1977）は書籍で本文に届かず「本文未確認」とした。NES（Wierstra+ 2014）は cma-es 担当との重複を避け参照のみにした。

### 系譜
```
[ES の古典] Rechenberg 1973 / Schwefel 1977〔本文未確認〕 → NES (Wierstra+ 2008/2014, 参照のみ)
                                                            │
[A] 大規模並列化と勾配推定                                     ▼
  OpenAI-ES (2017, 乱数シード共有でスカラー通信、1,440 コアで線形高速化)
     ├→ Deep GA (2017, 勾配を近似しない GA でも 4M パラメータ CNN、シード列で個体を圧縮)
     ├→ ES と SGD の関係 (2017, ES ≒ ノイズ入り SGD、相関 3.9% でも学べる)  ── ES≠有限差分 (Lehman+ 2017, 参照のみ)
     ├→ PES (2021, 部分展開でも不偏な ES 勾配推定) ── LES (2023)〔既存：swarm-intelligence/metabbo〕
     └→ EvoJAX (2022, JAX で集団評価を GPU/TPU に) ── evosax (2022, 30 種の ES/GA を JAX で、参照のみ)
           │
[B] LLM への持ち込み ▼
  Evolutionary Model Merge (2024/2025, CMA-ES でマージレシピを探索：数十〜数百次元)
     └→ ES at Scale (2025/2026, 次元削減なしで数十億パラメータを集団 30 で微調整)
          ├→ EGGROLL (2025/2026, 低ランク摂動で推論並みのスループット、集団 100 万)
          │     └→ EGGROLL, Unrolled / QES / Hyper-ES / 非同期 ES（2026, 参照のみ）
          └→ ES と破滅的忘却 (Abdi+ 2026, 更新ノルム 1000 倍・密で忘却)
                └→ ES vs GRPO の幾何 (Hoy+ 2026, 平坦方向のランダムウォーク α²Td/N で統一説明)
                      └→ ES の推論被覆 (Ba+ 2026, Pass@K で GRPO 超、ドリフト≠忘却)
                         ── Overcoming Forgetting (Schweighofer+ 2026, 参照のみ)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Evolution Strategies as a Scalable Alternative to Reinforcement Learning](https://arxiv.org/abs/1703.03864) | 2017 | arXiv | 原典 | NES を単純化した OpenAI-ES で深層 RL を解き、シード共有で 1,440 コアまで線形高速化。Humanoid 10 分、Atari で A3C と互角。 | ✅ p.2 |
| 2 | [Deep Neuroevolution: Genetic Algorithms are a Competitive Alternative for Training Deep Neural Networks for Reinforcement Learning](https://arxiv.org/abs/1712.06567) | 2017 | arXiv | 発展 | 交叉なしの単純 GA で 4M パラメータ CNN を進化させ Atari で DQN・A3C・ES と互角。シード列による個体圧縮。 | ✅ p.3 |
| 3 | [On the Relationship Between the OpenAI Evolution Strategy and Stochastic Gradient Descent](https://arxiv.org/abs/1712.06564) | 2017 | arXiv | 発展 | MNIST で ES と SGD の勾配相関を測定。ES はノイズ入り SGD とみなせ、相関 3.9% でも 97% に達する。 | ✅ p.4 |
| 4 | [Unbiased Gradient Estimation in Unrolled Computation Graphs with Persistent Evolution Strategies](https://arxiv.org/abs/2112.13835) | 2021 | ICML | 発展 | 摂動を展開間で累積し、部分展開でも打ち切りバイアスのない ES 勾配を得る PES。ICML 2021 Outstanding Paper。 | ✅ p.5 |
| 5 | [EvoJAX: Hardware-Accelerated Neuroevolution](https://arxiv.org/abs/2202.05008) | 2022 | GECCO（Companion） | 発展 | アルゴリズム・方策・タスクを JAX で書き集団評価を GPU/TPU に載せる基盤。従来比 10〜20 倍高速。 | ✅ p.6 |
| 6 | [Evolutionary Optimization of Model Merging Recipes](https://arxiv.org/abs/2403.13187) | 2025 | Nature Machine Intelligence | 発展 | PS・DFS の両空間でマージレシピを CMA-ES で探索。7B 日本語数学 LLM が 70B 級を上回る。 | ✅ p.7 |
| 7 | [Evolution Strategies at Scale: LLM Fine-Tuning Beyond Reinforcement Learning](https://arxiv.org/abs/2509.24372) | 2026 | ICML | 最新 | 数十億パラメータの LLM を次元削減なし・集団 30 の ES で微調整し、Countdown で PPO・GRPO を上回る。 | ✅ p.8 |
| 8 | [Evolution Strategies at the Hyperscale](https://arxiv.org/abs/2511.16652) | 2026 | ICML | 最新 | 低ランク摂動の EGGROLL で ES のスループットを約 100 倍に。集団 2^20 で int8 RNN 言語モデルを事前学習。 | ✅ p.9 |
| 9 | [Evolutionary Strategies lead to Catastrophic Forgetting in LLMs](https://arxiv.org/abs/2601.20861) | 2026 | arXiv | 最新 | ES 微調整は GRPO に近い精度だが既存能力が約 10% 落ちる。更新ノルム約 1,000 倍・低疎性が原因と主張。 | ✅ p.10 |
| 10 | [Matching Accuracy, Different Geometry: Evolution Strategies vs GRPO in LLM Post-Training](https://arxiv.org/abs/2604.01499) | 2026 | COLM | 最新 | 精度同等でも ES 更新は約 100 倍のノルムでほぼ直交。平坦方向のランダムウォーク α²Td/N で説明。 | ✅ p.11 |
| 11 | [Understanding Evolution Strategies for LLM Reasoning: Broader Reasoning Coverage than GRPO](https://arxiv.org/abs/2608.27351) | 2026 | arXiv | 最新 | ES はエントロピー崩壊せず Pass@K で GRPO を上回る。大きなドリフトは必ずしも忘却を意味しない。 | ✅ p.12 |
| 12 | Evolutionsstrategie: Optimierung technischer Systeme nach Prinzipien der biologischen Evolution（Rechenberg） | 1973 | Frommann-Holzboog（書籍） | 原典 | 進化戦略の起源。変異と選択による実数パラメータ最適化（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 13 | Numerische Optimierung von Computer-Modellen mittels der Evolutionsstrategie（Schwefel） | 1977 | Birkhäuser（書籍） | 原典 | (μ,λ)/(μ+λ) など多個体 ES の体系化（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 14 | [Natural Evolution Strategies](https://arxiv.org/abs/1106.4487) | 2014 | JMLR | 原典 | 探索分布の自然勾配で ES を定式化。OpenAI-ES はその平均だけを動かす簡略版。cma-es 担当との重複回避のため。 | — 参照のみ |
| 15 | [ES Is More Than Just a Traditional Finite-Difference Approximator](https://arxiv.org/abs/1712.06568) | 2017 | GECCO 2018 | 発展 | ES は点でなく分布を最適化するため、有限差分より摂動に頑健な解を選ぶ。Zhang+ の対になる論文（冒頭のみ確認）。 | — 参照のみ |
| 16 | [Improving Exploration in Evolution Strategies for Deep Reinforcement Learning via a Population of Novelty-Seeking Agents](https://arxiv.org/abs/1712.06560) | 2018 | NeurIPS | 発展 | NS-ES。OpenAI-ES に新奇性探索を組み合わせ欺瞞的課題を解く。本文未読のため。 | — 参照のみ |
| 17 | [evosax: JAX-Based Evolution Strategies](https://arxiv.org/abs/2212.04180) | 2022 | arXiv | 発展 | 30 種の ES/GA を JAX で実装し jit・vmap・pmap で加速。本文は読んだが定量評価が乏しく EvoJAX で代表させた。 | — 参照のみ |
| 18 | [Simple random search provides a competitive approach to reinforcement learning](https://arxiv.org/abs/1803.07055) | 2018 | NeurIPS | 発展 | ARS。線形方策のランダム探索が MuJoCo で RL と競合。PES の Swimmer 比較の基準。 | — 参照のみ |
| 19 | [Fine-Tuning Language Models with Just Forward Passes](https://arxiv.org/abs/2305.17333) | 2023 | NeurIPS | 発展 | MeZO。2 点のゼロ次推定で LLM を省メモリ微調整（主に教師あり）。ES at Scale・EGGROLL の比較対象。 | — 参照のみ |
| 20 | [EGGROLL, Unrolled: Understanding and Improving Low-Rank Evolution Strategies at Scale](https://arxiv.org/abs/2609.10980) | 2026 | arXiv | 最新 | rank-1 摂動の平均場が非保存的になり最適解の安定性を反転させうると解析（要旨のみ確認）。 | — 参照のみ |
| 21 | [Asynchrony Is Nearly Free for Evolution Strategies on Long-Horizon LLM Agentic Tasks](https://arxiv.org/abs/2610.04196) | 2026 | arXiv | 最新 | WebShop で古い適応度を許す有界非同期 ES を検証（要旨のみ確認）。 | — 参照のみ |
| 22 | [Overcoming Forgetting in LLM Fine-Tuning with Evolution Strategies](https://arxiv.org/abs/2605.30148) | 2026 | arXiv | 最新 | ES の忘却は回復しうる性能ドリフトで RL でも起きると主張し、Anchored Weight Decay を提案（要旨のみ確認）。 | — 参照のみ |
| 23 | [Quantized Evolution Strategies: High-precision Fine-tuning of Quantized LLMs at Low-precision Cost](https://arxiv.org/abs/2602.03120) | 2026 | arXiv | 最新 | 量子化 LLM を誤差フィードバック付き ES で量子化空間のまま全パラメータ微調整（要旨のみ確認）。 | — 参照のみ |
| 24 | [Hyper-ES: Effective Evolution Strategies for LLM Reasoning via Descent Direction Merging](https://arxiv.org/abs/2608.05541) | 2026 | arXiv | 最新 | 少数の勾配微調整で得た降下方向の張る部分空間で ES を回す（要旨のみ確認）。 | — 参照のみ |
| 25 | [The Blessing of Dimensionality in LLM Fine-tuning: A Variance-Curvature Perspective](https://arxiv.org/abs/2602.00170) | 2026 | arXiv | 最新 | 微調整地形の曲率が低次元であることから小集団 ES の成功を説明（要旨のみ確認）。 | — 参照のみ |
| 26 | [ESSAM: A Novel Competitive Evolution Strategies Approach to Reinforcement Learning for Memory Efficient LLMs Fine-Tuning](https://arxiv.org/abs/2602.01003) | 2026 | arXiv | 最新 | 省メモリ LLM 微調整のための競争型 ES（タイトル・要旨のみ確認）。 | — 参照のみ |
| 27 | [DART-ES: Difficulty-Aware Reweighting and Targeted Replay for Fine-Tuning LLMs with Evolution Strategies](https://arxiv.org/abs/2610.06993) | 2026 | arXiv | 最新 | 難易度に応じた再重み付けとリプレイで ES 微調整を改善（タイトルのみ確認）。 | — 参照のみ |
| 28 | [Beyond the Best Guess: Improving LLM Solution Coverage with Evolution Strategies](https://arxiv.org/abs/2608.12679) | 2026 | arXiv | 最新 | ES で LLM の解の被覆を高める（タイトルのみ確認）。Ba+ の関連研究。 | — 参照のみ |
| 29 | [Continual Test-Time Learning with Evolution Strategies](https://arxiv.org/abs/2610.24137) | 2026 | arXiv | 最新 | ES によるテスト時継続学習（タイトルのみ確認）。 | — 参照のみ |
| 30 | [Understanding and correcting pathologies in the training of learned optimizers](https://arxiv.org/abs/1810.10180) | 2019 | ICML | 発展 | truncated ES と再パラメータ化勾配の組み合わせで学習済み最適化器を訓練。PES の比較対象（本文未読）。 | — 参照のみ |
| 31 | [Discovering Evolution Strategies via Meta-Black-Box Optimization (LES)](https://arxiv.org/abs/2211.11260) | 2023 | ICLR | 発展 | ES の更新則自体を注意機構でメタ学習。 | ↪ 既存：swarm-intelligence/metabbo p.4 |
| 32 | [Model Swarms: Collaborative Search to Adapt LLM Experts via Swarm Intelligence](https://arxiv.org/abs/2410.11163) | 2024 | arXiv | 発展 | PSO で LLM エキスパートの重みを探索。進化的マージの群知能版。 | ↪ 既存：swarm-intelligence/deep-learning-fusion p.7 |
| 33 | [Abandoning Objectives: Evolution Through the Search for Novelty Alone](https://doi.org/10.1162/EVCO_a_00025) | 2011 | Evolutionary Computation | 原典 | 新奇性探索。Deep GA の GA-NS の元。 | ↪ 既存：open-endedness/quality-diversity p.2 |
| 34 | [PBT-NCA (Berdica+ 2026)](https://arxiv.org/abs/2604.11248) | 2026 | arXiv | 最新 | EGGROLL と同じ FLAIR グループによる進化的な NCA 探索。 | ↪ 既存：open-endedness/foundation-model-alife p.10 |
