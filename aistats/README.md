## AISTATS（aistats/）

### 調査履歴
- 2026-10-27: aistats.org / virtual.aistats.org には到達できなかったため、公式サイトの Jekyll ソース（GitHub の aistats/aistats2023〜2027。2023〜2025 の受賞・日程、2027 の日程・開催地）、WebSearch の検索スニペット（virtual.aistats.org の 2026 Dates・Awards・CFP、2027 Submission FAQ・SAC Guidelines、大学の受賞ニュース）、ccf-deadlines の YAML、PMLR（v206・v238・v258・v300 の目次と本文 PDF）を使って調べた。
- 対象は AISTATS 2023〜2027 の締切・会期・規模と、2023〜2026 の受賞（Best Paper / Best Student Paper / Test of Time / Notable / Outstanding Student Paper Highlights）。受賞・注目論文 11 本は PMLR の本文 PDF を全文読み、デッキにした。
- 採択率の集計は GitHub の conference-acceptance-rate を使い、検索スニペット（myhuiban, Paper Copilot）と照合した。投稿トピックの推移は PMLR の題名から自分で集計した。

### 締切の要点
- **AISTATS 2027（30th, Montréal, 2027-05-03〜06）の締切は過ぎた**（公式）：アブストラクト 2026-09-29、論文（補足資料込み）2026-10-06（いずれも 23:59 AoE）。現在は審査中で、査読と AI 査読の公開が 2026-11-16、著者–査読者ディスカッションが 11-23〜12-03、採否通知が 2027-01-20。
- 次に投稿できるのは **AISTATS 2028**（推定）：アブストラクト 2027-09-28 前後、論文 2027-10-05 前後（AoE）、通知 2028-01-20 前後、会期 2028-05 上旬。根拠は、2023〜2027 回の締切が 10 月上〜中旬から 9 月末・10 月初めへ前倒しされてきたこと（アブストラクトは 10/6, 10/6, 10/3, 9/25, 9/29）。

### 受賞・話題の論文一覧
| # | 年 | 賞 | 論文 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026 | Best Paper | [EventFlow: Forecasting Temporal Point Processes with Flow Matching](https://proceedings.mlr.press/v300/kerrigan26a.html) | 時間点過程を非自己回帰で生成する flow matching。多段予測誤差を 20〜53% 削減。 | ✅ p.2 |
| 2 | 2026 | Best Student Paper | [We Still Don’t Understand High-Dimensional Bayesian Optimization](https://proceedings.mlr.press/v300/doumont26a.html) | 超球へ写した線形カーネル GP が 60〜6,392 次元の BO で SOTA に並ぶ。 | ✅ p.4 |
| 3 | 2026 | Test of Time | [Non-stochastic Best Arm Identification and Hyperparameter Optimization](https://proceedings.mlr.press/v51/jamieson16.html) | HPO を最良腕同定として Successive Halving を解析（AISTATS 2016、Hyperband の前身）。 | ✅ p.6 |
| 4 | 2026 | Test of Time, Honorable Mention | [Deep Kernel Learning](https://proceedings.mlr.press/v51/wilson16.html) | 深層ネット＋基底カーネルを GP 周辺尤度で同時学習（AISTATS 2016）。 | ✅ p.8 |
| 5 | 2025 | Best Paper | [Variational Inference in Location-Scale Families: Exact Recovery of the Mean and Correlation Matrix](https://proceedings.mlr.press/v258/margossian25a.html) | 対称性があれば VI は誤指定下でも平均・相関行列を正確に回復することを証明。 | ✅ p.10 |
| 6 | 2025 | Best Student Paper | [Pick-to-Learn and Self-Certified Gaussian Process Approximations](https://proceedings.mlr.press/v258/marks25a.html) | P2L を早期停止・ベイズ化し、貪欲 SoD GP 近似に鋭い汎化上界を付与。 | ✅ p.12 |
| 7 | 2025 | Test of Time | [Deeply-Supervised Nets](https://proceedings.mlr.press/v38/lee15a.html) | 隠れ層ごとの補助分類器で勾配消失を緩和（AISTATS 2015）。 | ✅ p.14 |
| 8 | 2024 | Test of Time | [Black Box Variational Inference](https://proceedings.mlr.press/v33/ranganath14.html) | スコア関数勾配と分散削減による汎用 VI（AISTATS 2014）。 | ✅ p.16 |
| 9 | 2024 | Outstanding Student Paper Highlight | [Functional Flow Matching](https://proceedings.mlr.press/v238/kerrigan24a.html) | 関数空間の flow matching。2026 Best Paper の前身。 | ✅ p.18 |
| 10 | 2024 | Outstanding Student Paper Highlight | Learning-Based Algorithms for Graph Searching Problems（DePavia, Tani, Vakilian） | 題名と著者のみ確認（公式 awards ページ） | ⚠️ 本文未確認 |
| 11 | 2024 | Outstanding Student Paper Highlight | End-to-end Feature Selection Approach for Learning Skinny Trees（Ibrahim, Behdin, Mazumder） | 題名と著者のみ確認 | ⚠️ 本文未確認 |
| 12 | 2024 | Outstanding Student Paper Highlight | Online Learning of Decision Trees with Thompson Sampling（Chaouki, Read, Bifet） | 題名と著者のみ確認 | ⚠️ 本文未確認 |
| 13 | 2024 | Outstanding Student Paper Highlight | Learning to Defer to a Population: A Meta-Learning Approach（Tailor ほか） | 題名と著者のみ確認 | ⚠️ 本文未確認 |
| 14 | 2024 | Outstanding Student Paper Highlight | Mixed Models with Multiple Instance Learning（Engelmann ほか） | 題名と著者のみ確認 | ⚠️ 本文未確認 |
| 15 | 2024 | Outstanding Student Paper Highlight | Deep Classifier Mimicry without Data Access（Braun, Mundt, Kersting） | 題名と著者のみ確認 | ⚠️ 本文未確認 |
| 16 | 2023 | Test of Time | [Deep Gaussian Processes](https://proceedings.mlr.press/v31/damianou13a.html) | GP の階層化と変分下界による層数選択（AISTATS 2013）。 | ✅ p.20 |
| 17 | 2023 | Notable Paper | [The Power of Recursion in Graph Neural Networks for Counting Substructures](https://proceedings.mlr.press/v206/tahmasebi23a.html) | 再帰的近傍プーリング GNN の部分構造数え上げ能力と計算量下界。 | ✅ p.22 |
| 18 | 2023 | Notable Paper | [Inducing Point Allocation for Sparse Gaussian Processes in High-Throughput Bayesian Optimisation](https://proceedings.mlr.press/v206/moss23a.html) | 高スループット BO の疎 GP の誘導点配置（検索情報に基づく） | ⚠️ 本文未確認 |
| 19 | 2025 | （既存デッキ） | [Ant Colony Sampling with GFlowNets for Combinatorial Optimization](https://arxiv.org/abs/2403.07041) | 公式の賞ではない。本アーカイブで唯一の AISTATS 論文 | ↪ 既存：swarm-intelligence/deep-learning-fusion |

### 不明な点
- AISTATS 2026 の投稿数・採択率の公式値（「2,100 超」（UCI 報道）と「約 2,400」（IMS 案内）のみ。PMLR 収録は 588 本）。
- AISTATS 2026 に上記 4 件以外の賞（Best Paper Honorable Mention など）があるか（公式 awards ページに到達できず）。
- AISTATS 2023・2024 に Best Paper 賞があったか（公式サイトのソースには記載なし）。
- 2023 Notable papers（口頭発表 32 本）のうち 2 本以外の扱い、2024 Highlights の 6 本の本文。
- AISTATS 2027 のカメラレディ締切とワークショップ提案締切（公式未確認）、AISTATS 2028 の開催地・日程。
