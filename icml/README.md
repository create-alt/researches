## ICML（icml/）

### 調査履歴
- 2026-10-27: WebSearch のスニペット（ICML 公式ブログ・virtual サイト・Fact Sheet・RIKEN AIP・大学ニュース等の URL を記録）と ccf-deadlines の icml.yml で、ICML 2023〜2026 の締切・会期・投稿数と ICML 2027 の見通しを確認。ICML 2026 の受賞（Outstanding Paper 2、同 Honorable Mention 5、Outstanding Position Paper 1、同 Honorable Mention 1、Test of Time 1）をすべて特定し、本文（arXiv）を全文読んで 10 本をスライド化。2025 年の Outstanding Paper から拡散言語モデルと創造性の 2 本を追加し計 12 本。
- 2023〜2025 年の Outstanding/Best Paper と Test of Time は検索結果と受賞一覧リポジトリ（FeijiangHan/Top-Conference-Best-Papers）を照合して一覧化。
- icml.cc、blog.icml.cc、aihub、36kr 等のニュースサイトには到達できず、受賞の選考理由（laudatio）の原文は読めていない（A3C と Censor's Toolkit のみ二次報道の引用あり）。

### 締切の要点
- ICML 2027 は 2026-10-27 時点で CFP 未発表（**推定**）。開催地は公式 Future Meetings で「南米」（都市未定）、会期は 2027 年 7 月中旬の見込み。
- 論文締切は **2027-01-28（木）23:59 AoE 前後**（推定。2023〜2026 は 1/26、2/1、1/30、1/28 と 1 月最終週〜2 月初め、幅 1/21〜2/2）。アブストラクト締切はその約 1 週間前（2027-01-21 前後）。
- 採否通知は 2027-04-30 前後（2024・2025 は 5/1、2026 は 4/30）。直近の ICML 2026 は 1/23 アブストラクト、1/28 論文（AoE）、著者応答 3/30、通知 4/30、会期 7/6〜11（ソウル）。

### 受賞・話題の論文一覧
| # | 年 | 賞 | 論文 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026 | Outstanding Paper Award | [The Flexibility Trap: Rethinking the Value of Arbitrary Order in Diffusion Language Models](https://arxiv.org/abs/2601.15165) | 拡散言語モデルの任意順序生成は数学・コードの推論では解の探索を狭めると示し、RL 時だけ AR 順にして標準 GRPO を使う JustGRPO（GSM8K 89.1%）を提案。 | ✅ p.2 |
| 2 | 2026 | Outstanding Paper Award | [High-accuracy sampling for diffusion models and log-concave distributions](https://arxiv.org/abs/2602.01338) | 勾配のみの棄却サンプリング FORS により、拡散モデルのサンプリングを polylog(1/δ) ステップで達成。対数凹分布にも適用。 | ✅ p.4 |
| 3 | 2026 | Test of Time Award | [Asynchronous Methods for Deep Reinforcement Learning](https://arxiv.org/abs/1602.01783) | 複数 actor-learner の非同期更新で replay なしに深層 RL を安定化した A3C。CPU 16 コアで Atari の当時の最高性能。 | ✅ p.6 |
| 4 | 2026 | Outstanding Position Paper Award | [Position: The Alignment Community is Unintentionally Building a Censor's Toolkit](https://arxiv.org/abs/2608.12346) | アラインメント手法（データ選別・事後学習・推論時制御）が検閲と世論操作に転用されうるデュアルユース技術だと論じ、監査・ベンチマーク・多元性を提言。 | ✅ p.8 |
| 5 | 2026 | Outstanding Paper Honorable Mention | [The Obfuscation Atlas: Mapping Where Honesty Emerges in RLVR with Deception Probes](https://arxiv.org/abs/2602.15515) | 嘘検出プローブを報酬に入れた RLVR の結果を正直・露骨な欺瞞・出力の難読化・活性の難読化の 4 類型に整理し、十分な KL と検出ペナルティで正直な方策が得られると示した。 | ✅ p.10 |
| 6 | 2026 | Outstanding Paper Honorable Mention | [Motion Attribution for Video Generation](https://arxiv.org/abs/2601.08828) | 動画生成の動きを学習クリップへ帰属させる Motive。選んだ 10% のデータで全データ微調整を超える動きの質。 | ✅ p.12 |
| 7 | 2026 | Outstanding Paper Honorable Mention | [How much can language models memorize?](https://arxiv.org/abs/2505.24832) | 意図しない記憶と汎化を圧縮で分離し、GPT 型モデルの記憶容量を約 3.6 bits/param と測定。容量超過で汎化と double descent が始まる。 | ✅ p.14 |
| 8 | 2026 | Outstanding Paper Honorable Mention | [A Random Matrix Theory Perspective on the Consistency of Diffusion Models](https://arxiv.org/abs/2602.02908) | 別データで学習した拡散モデルの出力が一致する理由を線形デノイザのランダム行列理論で説明（ノイズの繰り込み、過収縮、異方性）。 | ✅ p.16 |
| 9 | 2026 | Outstanding Paper Honorable Mention | [To Grok Grokking: Provable Grokking in Ridge Regression](https://arxiv.org/abs/2601.19791) | リッジ回帰＋weight decay の勾配降下でグロッキングが起きることを end-to-end に証明し、遅れが 1/(ηλ) に比例することを示した。 | ✅ p.18 |
| 10 | 2026 | Outstanding Position Paper Honorable Mention | [Position: AI/ML Deepfake Research is Misaligned with AI-Generated Non-Consensual Intimate Imagery (AIG-NCII)](https://arxiv.org/abs/2607.18263) | ディープフェイク研究は真正性の問題に偏り、同意のない性的画像という主要な悪用をほぼ扱っていないと文献分析で示し、9 項目の提言を行った。 | ✅ p.20 |
| 11 | 2025 | Outstanding Paper Award | [Train for the Worst, Plan for the Best: Understanding Token Ordering in Masked Diffusions](https://arxiv.org/abs/2502.06768) | マスク拡散モデルは学習で難しい穴埋め問題を抱えるが、推論時の順序選択で回避でき、数独の正解率を 7% 未満から約 90% に上げた。 | ✅ p.22 |
| 12 | 2025 | Outstanding Paper Award | [Roll the dice & look before you leap: Going beyond the creative limits of next-token prediction](https://arxiv.org/abs/2504.15266) | 創造性を抽象化した最小課題で、次トークン学習と温度サンプリングの限界を示し、多トークン学習とシード条件づけを提案。 | ✅ p.24 |
| 13 | 2025 | Outstanding Paper Award | [CollabLLM: From Passive Responders to Active Collaborators](https://arxiv.org/abs/2502.00640) | 多ターン先の対話への影響を見込んだ報酬で LLM を学習し、受け身の応答ではなく能動的に協働するアシスタントにする手法。 | — 参照のみ |
| 14 | 2025 | Outstanding Paper Award | [Score Matching with Missing Data](https://arxiv.org/abs/2506.00557) | 欠損のあるデータからスコアマッチングでスコア関数を学ぶ方法の提案と理論。 | — 参照のみ |
| 15 | 2025 | Outstanding Paper Award | [Conformal Prediction as Bayesian Quadrature](https://arxiv.org/abs/2502.13228) | コンフォーマル予測をベイズ求積の観点から捉え直し、保証の解釈と拡張を与えた。 | — 参照のみ |
| 16 | 2025 | Outstanding Paper Award | [The Value of Prediction in Identifying the Worst-Off](https://arxiv.org/abs/2501.19334) | 公共政策で最も困窮した人を特定するとき、予測精度の向上と支援対象の拡大のどちらが価値を持つかを比較分析した。 | — 参照のみ |
| 17 | 2025 | Outstanding Position Paper Award | [Position: The AI Conference Peer Review Crisis Demands Author Feedback and Reviewer Rewards](https://arxiv.org/abs/2505.04966) | AI 会議の査読危機に対し、著者から査読への評価と査読者への報酬の仕組みを提案。 | — 参照のみ |
| 18 | 2025 | Outstanding Position Paper Award | [Position: AI Safety should prioritize the Future of Work](https://arxiv.org/abs/2504.13959) | AI 安全性の議論は労働と雇用への影響を優先課題として扱うべきだと主張。 | — 参照のみ |
| 19 | 2025 | Test of Time Award | [Batch Normalization: Accelerating Deep Network Training by Reducing Internal Covariate Shift](https://arxiv.org/abs/1502.03167) | ミニバッチ統計で中間層を正規化し、深層ネットの学習を高速・安定化した BatchNorm。 | — 参照のみ |
| 20 | 2025 | Test of Time Honorable Mention | [Trust Region Policy Optimization](https://arxiv.org/abs/1502.05477) | 方策の更新幅を KL で制約し単調改善を目指す方策最適化 TRPO。 | — 参照のみ |
| 21 | 2025 | Test of Time Honorable Mention | [Variational Inference with Normalizing Flows](https://arxiv.org/abs/1505.05770) | 可逆変換の連鎖で柔軟な近似事後分布を作る正規化フローを変分推論に導入。 | — 参照のみ |
| 22 | 2024 | Best Paper Award | [Genie: Generative Interactive Environments](https://arxiv.org/abs/2402.15391) | ラベルなし動画から潜在行動を学び、操作可能な 2D 環境を生成する世界モデル。 | ↪ 既存：world-model/foundation-world-model |
| 23 | 2024 | Best Paper Award | [Discrete Diffusion Modeling by Estimating the Ratios of the Data Distribution](https://arxiv.org/abs/2310.16834) | スコアエントロピー損失による離散拡散モデル SEDD。拡散言語モデルの流れの起点の一つ。 | — 参照のみ |
| 24 | 2024 | Best Paper Award | [Scaling Rectified Flow Transformers for High-Resolution Image Synthesis](https://arxiv.org/abs/2403.03206) | Rectified Flow と MM-DiT による高解像度画像生成のスケーリング（Stable Diffusion 3）。 | — 参照のみ |
| 25 | 2024 | Best Paper Award | [VideoPoet: A Large Language Model for Zero-Shot Video Generation](https://arxiv.org/abs/2312.14125) | 多様なモダリティをトークン化した LLM でゼロショット動画生成を行う VideoPoet。 | — 参照のみ |
| 26 | 2024 | Best Paper Award | [Debating with More Persuasive LLMs Leads to More Truthful Answers](https://arxiv.org/abs/2402.06782) | より説得力のある LLM 同士の討論を判定することで、弱い判定者でも真実に近づけることを示したスケーラブル監督の研究。 | — 参照のみ |
| 27 | 2024 | Best Paper Award | [Stealing part of a production language model](https://arxiv.org/abs/2403.06634) | API 経由の問い合わせだけで本番 LLM の埋め込み射影層の一部を復元する攻撃。 | — 参照のみ |
| 28 | 2024 | Best Paper Award | [Probabilistic Inference in Language Models via Twisted Sequential Monte Carlo](https://arxiv.org/abs/2404.17546) | Twisted SMC で LLM の条件付き生成・推論を確率的に扱う枠組み。 | — 参照のみ |
| 29 | 2024 | Best Paper Award | [Information Complexity of Stochastic Convex Optimization: Applications to Generalization, Memorization, and Tracing](https://arxiv.org/abs/2402.09327) | 確率的凸最適化における汎化と記憶の情報量的なトレードオフを解析した理論研究。 | — 参照のみ |
| 30 | 2024 | Best Paper Award（Position） | [Position: Measure Dataset Diversity, Don't Just Claim It](https://arxiv.org/abs/2407.08188) | データセットの「多様性」を測定理論に基づいて定義・検証すべきと主張。 | — 参照のみ |
| 31 | 2024 | Best Paper Award（Position） | [Position: Considerations for Differentially Private Learning with Large-Scale Public Pretraining](https://arxiv.org/abs/2212.06470) | 大規模な公開データで事前学習した差分プライバシー学習の評価と前提を問い直した。 | — 参照のみ |
| 32 | 2024 | Test of Time Award | [DeCAF: A Deep Convolutional Activation Feature for Generic Visual Recognition](https://arxiv.org/abs/1310.1531) | ImageNet で学習した CNN の中間特徴を汎用の画像特徴として転用し、転移学習の有効性を示した。 | — 参照のみ |
| 33 | 2023 | Outstanding Paper Award | [Learning-Rate-Free Learning by D-Adaptation](https://openreview.net/forum?id=GXZ6cT5cvY) | 学習率の調整を不要にする D-Adaptation。凸最適化で最適な収束率を保証。 | — 参照のみ |
| 34 | 2023 | Outstanding Paper Award | [A Watermark for Large Language Models](https://openreview.net/forum?id=aX8ig9X2a7) | 生成時に語彙の一部を優遇する統計的な透かしで、LLM 生成文を検出可能にする。 | — 参照のみ |
| 35 | 2023 | Outstanding Paper Award | [Generalization on the Unseen, Logic Reasoning and Degree Curriculum](https://openreview.net/forum?id=3dqwXb1te4) | 未見領域への汎化でネットワークが最小次数の補間解に偏ることを示し、次数カリキュラムを提案。 | — 参照のみ |
| 36 | 2023 | Outstanding Paper Award | [Adapting to game trees in zero-sum imperfect information games](https://openreview.net/forum?id=O1j4uFuSVW) | 不完全情報ゼロ和ゲームで木構造に適応して ε 最適戦略を学ぶアルゴリズムと下界。 | — 参照のみ |
| 37 | 2023 | Outstanding Paper Award | [Self-Repellent Random Walks on General Graphs - Achieving Minimal Sampling Variance via Nonlinear Markov Chains](https://openreview.net/forum?id=450iImFM4U) | 訪問済みノードを避ける非線形マルコフ連鎖でグラフ上のサンプリング分散を下げる。 | — 参照のみ |
| 38 | 2023 | Outstanding Paper Award | [Bayesian Design Principles for Frequentist Sequential Learning](https://openreview.net/forum?id=tRhQsHnoFw) | ベイズ的な設計原理から頻度論的な逐次意思決定（バンディット等）のアルゴリズムを導く一般枠組み。 | — 参照のみ |
| 39 | 2023 | Test of Time Award | [Learning Fair Representations](https://proceedings.mlr.press/v28/zemel13.html) | 保護属性の情報を除きつつ有用性を保つ表現学習で、集団・個人の公平性を機械学習に導入した。 | — 参照のみ |
| 40 | 2023 | Test of Time Runner-up | [Deep Canonical Correlation Analysis](https://proceedings.mlr.press/v28/andrew13.html) | 2 つのビューを深層ネットで非線形変換し、相関を最大化する深層 CCA。 | — 参照のみ |

### 不明な点
- ICML 2027 の公式締切・会期・開催都市（未発表）。
- ICML 2026 受賞論文の選考理由の原文（公式ブログに到達できず）。評価ポイントの多くは「調査者の見立て」。
- ICML 2026 の採択数（6,352 と 6,552 の食い違い。6,352・26.6% を採用）とポジション・トラックの採択数。
- ICML 2023 Test of Time のもう 1 本の Runner-up、ICML 2024・2026 Test of Time の Honorable Mention の有無。
- ICML 2024 のアブストラクト締切、ICML 2022 の投稿・採択数。
- 本文を読んでいない過去の受賞論文（表の「参照のみ」）の概要は検索情報に基づく短い要約。
