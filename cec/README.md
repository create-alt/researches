## IEEE CEC（cec/）

### 調査履歴
- 2026-10-27: WebSearch のスニペット（ieeecec.org/2027、IEEE CIS カレンダー、attend.ieee.org/wcci-2026、各大学の受賞ニュース）、ccf-deadlines の cec.yml、Ryoji Tanabe の採択率集計（GitHub ryojitanabe/ecconf を clone）で CEC 2022〜2027 の締切・会期・投稿数・採択率を確認した。
- 受賞は CEC 2026 Best Student Paper、CEC 2025 Best Paper・Best Poster、CEC 2024 Best Student Paper を大学のニュースで確認。2026 年は公式の受賞が 1 件しか見つからなかったため、arXiv に CEC 2026 採録と明記された論文から話題の 4 本を選んだ（選定理由は venue.json の basis）。
- 本文は arXiv 版を全文読んでスライド化した（10 本）。公式サイト（ieeecec.org, attend.ieee.org）、IEEE Xplore、ryojitanabe.github.io には本環境から到達できなかった。

### 締切の要点
- **CEC 2027（Edinburgh, 2027-07-25〜28、単独開催）**：フルペーパー **2027-02-28**（公式、延長なし）、ショートペーパー 2027-03-15（公式）、採否通知 2027-04-07（公式）。カメラレディは未発表で、例年の通知後 4〜6 週から 5 月上旬〜中旬と推定。
- 例年（2023〜2026）の締切は 1 月中旬〜下旬（2026 年は 01-31 AoE）だったが、2027 年は 2 月末に後ろ倒しになった。第一報 CFP の値として 2027-01-15 を載せる集計サイト（Tanabe ecconf、aconf.org）もあり、日付は公式サイトで再確認するのが安全。
- 直近の回は CEC 2026（WCCI 2026, Maastricht, 2026-06-21〜26）：締切 2026-01-31（AoE）、通知 03-16〜22、投稿 625・採択 235（38%）。

### 受賞・話題の論文一覧
| # | 年 | 賞 | 論文 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026 | Best Student Paper | [On the Structural (Dis)Agreement of Landscape Representations in Black-Box Optimization](https://arxiv.org/abs/2605.28121) | ELA・DeepELA・TransOptAS・DoE2Vec の 4 表現が問題空間をどう分割するかを教師なしで比較し、どれも単独では不十分と示した。 | ✅ p.2 |
| 2 | 2026 | 話題 | [Early-Stopping Thresholds for ES-HyperNEAT: A Data-Driven Approach from Fitness Dynamics](https://arxiv.org/abs/2609.13533) | 序盤の適応度推移の二値分類から打ち切り規則を導き、計算量を 41.6% 削減。 | ✅ p.4 |
| 3 | 2026 | 話題 | [Genetic Programming with Transformer-Based Mutation for Approximate Circuit Design](https://arxiv.org/abs/2605.21055) | Transformer が CGP の変異分布を提案し、一部条件で EvoApproxLib を上回る近似乗算器を得た。 | ✅ p.6 |
| 4 | 2026 | 話題 | [Solving Few-Shot Multiobjective Multitask Optimization via Iterative Sequential Transfer](https://arxiv.org/abs/2609.11228) | 少数ショットの多目的マルチタスク最適化を、1 タスクずつ選んで逐次転移する問題の列に変換。 | ✅ p.8 |
| 5 | 2026 | 話題（競技会トラック） | [RCMAES: A Robust CMA-ES Variant for CEC2026 Competition](https://arxiv.org/abs/2604.27138) | CEC 2026 単目的競技会向けの CMA-ES 変種。非線形な集団縮小と再始動で DE 系強豪に迫る。 | ✅ p.10 |
| 6 | 2025 | Best Paper | [A Theoretical Analysis of Analogy-Based Evolutionary Transfer Optimization](https://arxiv.org/abs/2503.21156) | 類推の 3 過程と転移の 3 課題を対応づけ、負の転移を防ぐ必要十分条件などを定理化。 | ✅ p.12 |
| 7 | 2025 | Best Poster | Physics-Informed Optimization via Ising Spin System Evolution | Ising スピン系の発展に基づく最適化 EvoIsing（NUS、検索情報に基づく）。 | ⚠️ 本文未確認 |
| 8 | 2025 | 話題 | [GPU-accelerated Evolutionary Many-objective Optimization Using Tensorized NSGA-III](https://arxiv.org/abs/2504.06067) | NSGA-III を近似なしで完全テンソル化し、CPU 版比最大 3629 倍の高速化。 | ✅ p.14 |
| 9 | 2025 | 話題 | [Diverse Prompts: Illuminating the Prompt Space of Large Language Models with MAP-Elites](https://arxiv.org/abs/2504.14367) | 文法生成プロンプトを MAP-Elites で探索し、構造と LLM 性能の関係を地図化。 | ✅ p.16 |
| 10 | 2025 | 話題 | [Large Language Models as Particle Swarm Optimizers](https://arxiv.org/abs/2504.09247) | LLM を PSO の更新に組み込む。 | ↪ 既存：swarm-intelligence/ga-hybrid |
| 11 | 2024 | Best Student Paper | MOEA/D-CMA Made Better with (1+1)-CMA-ES | MOEA/D に (1+1)-CMA-ES を組み込んだ多目的最適化（CityU、検索情報に基づく）。 | ⚠️ 本文未確認 |
| 12 | 2024 | 話題 | [Large Language Models as Evolutionary Optimizers](https://arxiv.org/abs/2310.19046) | LLM に選択・交叉・変異を自然言語で指示する LMEA。小規模 TSP ではほぼ最適。 | ✅ p.18 |
| 13 | 2024 | 話題 | [Non-Spatial Hash Chemistry as a Minimalistic Open-Ended Evolutionary System](https://arxiv.org/abs/2404.18027) | 空間なしの最小人工化学で、複製実体のサイズの非有界成長を示した。 | ✅ p.20 |

### 不明な点
- CEC 2026 の Best Paper（学生以外）、CEC 2025 の Best Student Paper、CEC 2024 の Best Paper、CEC 2023 の各賞の受賞論文。
- CEC 2024 Best Student Paper の本文（arXiv 版・著者公開版なし）と CEC 2025 Best Poster の本文・著者。
- CEC 2025 Best Paper の採録版の正確な題名（受賞報道と arXiv 版で題名がわずかに異なる）。
- CEC 2027 のカメラレディ、特別セッション・競技会・チュートリアル提案の締切、ページ数規定、締切のタイムゾーン。
- CEC 2025 の延長後の最終締切と通知日、CEC 2023 の締切（ccf-deadlines の値のみ）、CEC 2022 の投稿数。
- WCCI 2026 の最終的なページ数規定とリバッタルの有無、CEC 2026 競技会の最終順位。
