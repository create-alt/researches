## ICLR（iclr/）

### 調査履歴
- 2026-10-27: WebSearch（iclr.cc・blog.iclr.cc の検索結果スニペット）、ccf-deadlines の iclr.yml、受賞一覧の集約（GitHub: Top-Conference-Best-Papers）で ICLR 2023〜2027 の締切・会期・投稿数と 2023〜2026 年の Outstanding Paper・Honorable Mention・Test of Time を調べた。iclr.cc・blog.iclr.cc・media.iclr.cc には直接到達できず、公式情報は検索スニペットで確認した。
- 本文は arXiv から 12 本の PDF を取得し全文を読んでスライド化（2026 年の受賞 5 本はすべて含む）。ICLR 2026 の査読をめぐる問題（LLM 生成査読、OpenReview の身元流出）と ICLR 2027 の新ルール（投稿上限・相互査読・AI 利用申告）は ICLR blog と報道で確認した。

### 締切の要点
- ICLR 2027（2027-04-26〜30、米国カリフォルニア州・San Francisco と報道）の投稿締切は過ぎている（アブストラクト 2026-09-18、論文 2026-09-25、AoE、公式）。今後は査読公開 2026-11-05、著者・査読者の議論終了 2026-11-18、採否通知 2026-12-16（いずれも公式）。
- 次の投稿機会は ICLR 2028（推定）：アブストラクト 2027-09-17 前後、論文 2027-09-24 前後（23:59 AoE）。根拠は過去 5 回の締切がいずれも 9 月下旬〜10 月初旬（論文 9/28、9/28、10/1、9/24、9/25）で、直近 2 回は 9 月第 3〜4 金曜であること。
- ICLR 2027 から 1 著者 20 本の投稿上限、相互査読義務（3 本以上の著者は 6 本以上査読）、AI 利用申告の必須化が入った。

### 受賞・話題の論文一覧
| # | 年 | 賞 | 論文 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026 | Outstanding Paper Award | [Transformers are Inherently Succinct](https://openreview.net/forum?id=Yxz92UuPLQ) | 固定精度 Transformer は LTL・RNN より指数的、有限オートマトンより二重指数的に簡潔であり、検証は EXPSPACE 完全であることを証明。 | ✅ p.2 |
| 2 | 2026 | Outstanding Paper Award | [LLMs Get Lost In Multi-Turn Conversation](https://openreview.net/forum?id=VKGTGGcwl6) | 指示を小出しにする多ターン会話で 15 の LLM が平均 39% 性能を落とし、主因は信頼性の低下であることを 20 万会話超のシミュレーションで示した。 | ✅ p.4 |
| 3 | 2026 | Test of Time Award（ICLR 2016 論文） | [Unsupervised Representation Learning with Deep Convolutional Generative Adversarial Networks](https://arxiv.org/abs/1511.06434) | DCGAN。畳み込み GAN の安定な設計指針と、潜在空間の演算による意味操作を示し、画像生成分野を始動させた。DDPG と共同受賞。 | ✅ p.6 |
| 4 | 2026 | Test of Time Award（ICLR 2016 論文） | [Continuous control with deep reinforcement learning](https://arxiv.org/abs/1509.02971) | DDPG。DQN の経験再生と目標ネットワークを決定論的方策勾配に持ち込み、連続行動の物理制御を深層 RL で解いた。DCGAN と共同受賞。 | ✅ p.8 |
| 5 | 2026 | Outstanding Paper Honorable Mention | [The Polar Express: Optimal Matrix Sign Methods and Their Application to the Muon Algorithm](https://openreview.net/forum?id=yRtgZ1K8hO) | Muon の極分解を、各反復で minimax 最適な奇数多項式を選ぶ行列積だけの反復法で計算し、GPT-2 学習の検証損失を改善した。 | ✅ p.10 |
| 6 | 2025 | Outstanding Paper Award | [Safety Alignment Should Be Made More Than Just a Few Tokens Deep](https://openreview.net/forum?id=6Mxhg9PtDE) | 安全性整列が先頭数トークンにしか効いていない「浅さ」を示し、各種脱獄を統一的に説明。データ拡張と制約付き微調整で対策した。 | ✅ p.12 |
| 7 | 2025 | Outstanding Paper Award | [Learning Dynamics of LLM Finetuning](https://openreview.net/forum?id=tPNHOoZFl9) | 微調整の1ステップの影響を分解する枠組みで、SFT 後の幻覚や DPO の squeezing effect を説明し、簡単な改善法を導いた。 | ✅ p.14 |
| 8 | 2025 | Outstanding Paper Award | [AlphaEdit: Null-Space Constrained Model Editing for Language Models](https://openreview.net/forum?id=HvSytvg3Jh) | LLM の知識編集で、更新を保存したい知識の零空間に射影して既存知識を壊さないようにする手法。（概要は検索情報・題名に基づく） | — 参照のみ |
| 9 | 2025 | Outstanding Paper Honorable Mention | [Data Shapley in One Training Run](https://openreview.net/forum?id=HD6bWcj87Y) | 再学習なしに、1回の学習の中で各データの寄与（Data Shapley 値）を推定する手法。（概要は検索情報・題名に基づく） | — 参照のみ |
| 10 | 2025 | Outstanding Paper Honorable Mention | [SAM 2: Segment Anything in Images and Videos](https://openreview.net/forum?id=Ha6RTeWMd0) | 画像と動画の両方でプロンプトに応じて物体を切り出すセグメンテーション基盤モデル。（概要は検索情報・題名に基づく） | — 参照のみ |
| 11 | 2025 | Outstanding Paper Honorable Mention | [Faster Cascades via Speculative Decoding](https://openreview.net/forum?id=vo9t20wsmd) | 小モデルと大モデルのカスケードと投機的デコーディングを組み合わせ、推論を高速化する手法。（概要は検索情報・題名に基づく） | — 参照のみ |
| 12 | 2025 | Test of Time Award（ICLR 2015 論文） | [Adam: A Method for Stochastic Optimization](https://arxiv.org/abs/1412.6980) | 勾配の1次・2次モーメントとバイアス補正による適応的最適化法。深層学習の事実上の標準になった。 | ✅ p.16 |
| 13 | 2025 | Test of Time Runner-up（ICLR 2015 論文） | [Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/abs/1409.0473) | 注意機構（attention）を初めて系列変換に導入したニューラル機械翻訳。Transformer の源流。（概要は検索情報・題名に基づく） | — 参照のみ |
| 14 | 2024 | Outstanding Paper Award | [Learning Interactive Real-World Simulators](https://openreview.net/forum?id=sFyTZEqmUY) | UniSim。多様なデータを統合した行動条件付き動画拡散モデルで実世界シミュレータを学び、その中で学んだ方策が実機に移った。 | ✅ p.18 |
| 15 | 2024 | Outstanding Paper Award | [Vision Transformers Need Registers](https://openreview.net/forum?id=2dnO3LLiJ1) | 大型 ViT の高ノルム外れトークンを大域情報の置き場と解釈し、レジスタトークンの追加で解消した。 | ✅ p.20 |
| 16 | 2024 | Outstanding Paper Award | [Generalization in diffusion models arises from geometry-adaptive harmonic representations](https://openreview.net/forum?id=ANvmVS2Yr0) | 拡散モデルが訓練データを記憶せず汎化する仕組みを、画像の幾何に適応した調和基底による表現として説明した。（概要は検索情報・題名に基づく） | — 参照のみ |
| 17 | 2024 | Outstanding Paper Award | [Never Train from Scratch: Fair Comparison of Long-Sequence Models Requires Data-Driven Priors](https://openreview.net/forum?id=PdaPky8MUn) | 長系列モデルの比較では自己事前学習を入れないと Transformer が不当に不利になることを示し、評価の前提を見直した。（概要は検索情報・題名に基づく） | — 参照のみ |
| 18 | 2024 | Outstanding Paper Award | [Protein Discovery with Discrete Walk-Jump Sampling](https://openreview.net/forum?id=zMPHKOmQNb) | 離散配列のタンパク質（抗体）設計に、スコアベースの walk-jump サンプリングを用いる生成手法。（概要は検索情報・題名に基づく） | — 参照のみ |
| 19 | 2024 | Outstanding Paper Honorable Mention | [Amortizing intractable inference in large language models](https://openreview.net/forum?id=Ouj6p4ca60) | GFlowNet による微調整で、LLM の扱いにくい事後分布からのサンプリングを償却する。（概要は検索情報・題名に基づく） | — 参照のみ |
| 20 | 2024 | Outstanding Paper Honorable Mention | [Approximating Nash Equilibria in Normal-Form Games via Stochastic Optimization](https://openreview.net/forum?id=cc8h3I3V4E) | 標準形ゲームのナッシュ均衡近似を、確率的最適化で解ける損失関数として定式化した。（概要は検索情報・題名に基づく） | — 参照のみ |
| 21 | 2024 | Outstanding Paper Honorable Mention | [Beyond Weisfeiler-Lehman: A Quantitative Framework for GNN Expressiveness](https://openreview.net/forum?id=HSKaGOi7Ar) | 準同型の数え上げで GNN の表現力を定量化する枠組み。 | ↪ 既存：gnn/message-passing |
| 22 | 2024 | Outstanding Paper Honorable Mention | [Flow Matching on General Geometries](https://openreview.net/forum?id=g7ohDlTITL) | フローマッチングを一般の多様体上に拡張した生成モデル（Riemannian Flow Matching）。（概要は検索情報・題名に基づく） | — 参照のみ |
| 23 | 2024 | Outstanding Paper Honorable Mention | [Is ImageNet worth 1 video? Learning strong image encoders from 1 long unlabelled video](https://openreview.net/forum?id=Yen1lGns2o) | 1本の長い一人称動画からの自己教師あり学習で強い画像エンコーダを得る。（概要は検索情報・題名に基づく） | — 参照のみ |
| 24 | 2024 | Outstanding Paper Honorable Mention | [Meta Continual Learning Revisited: Implicitly Enhancing Online Hessian Approximation via Variance Reduction](https://openreview.net/forum?id=TpD2aG1h0D) | メタ継続学習をヘッセ近似の観点から再解釈し、分散低減で改善した。（概要は検索情報・題名に基づく） | — 参照のみ |
| 25 | 2024 | Outstanding Paper Honorable Mention | [Model Tells You What to Discard: Adaptive KV Cache Compression for LLMs](https://openreview.net/forum?id=uNrFpDPMyo) | 注意ヘッドごとの特性に応じて KV キャッシュを適応的に圧縮する（FastGen）。（概要は検索情報・題名に基づく） | — 参照のみ |
| 26 | 2024 | Outstanding Paper Honorable Mention | [Proving Test Set Contamination in Black-Box Language Models](https://openreview.net/forum?id=KS8mIvetg2) | ベンチマークの並び順への感度から、ブラックボックス LLM のテストセット汚染を統計的に証明する。（概要は検索情報・題名に基づく） | — 参照のみ |
| 27 | 2024 | Outstanding Paper Honorable Mention | [Robust agents learn causal world models](https://openreview.net/forum?id=pOoKI3ouv1) | 分布シフトに頑健なエージェントは必然的に因果世界モデルを学んでいることを理論的に示した。本アーカイブの world-model 分野に関係が深い。（概要は検索情報・題名に基づく） | — 参照のみ |
| 28 | 2024 | Outstanding Paper Honorable Mention | [The mechanistic basis of data dependence and abrupt learning in an in-context classification task](https://openreview.net/forum?id=aN4Jf6Cx69) | 文脈内学習が急に立ち上がる現象とデータ分布への依存を、誘導ヘッドの形成として機構的に説明した。（概要は検索情報・題名に基づく） | — 参照のみ |
| 29 | 2024 | Outstanding Paper Honorable Mention | [Towards a statistical theory of data selection under weak supervision](https://openreview.net/forum?id=HhfcNgQn6p) | 弱い教師の下でどのデータを選んで学習すべきかの統計理論。（概要は検索情報・題名に基づく） | — 参照のみ |
| 30 | 2024 | Test of Time Award（ICLR 2014 論文） | [Auto-Encoding Variational Bayes](https://arxiv.org/abs/1312.6114) | VAE と再パラメータ化トリック。深層生成モデルと変分推論の基盤。（概要は検索情報・題名に基づく） | — 参照のみ |
| 31 | 2024 | Test of Time Runner-up（ICLR 2014 論文） | [Intriguing properties of neural networks](https://arxiv.org/abs/1312.6199) | 敵対的サンプルの発見。ニューラルネットの頑健性研究の起点。（概要は検索情報・題名に基づく） | — 参照のみ |
| 32 | 2023 | Outstanding Paper Award | [Rethinking the Expressive Power of GNNs via Graph Biconnectivity](https://openreview.net/forum?id=r9hNv76KoT3) | 二重連結性で GNN の表現力を測り、多くの GNN が関節点すら判別できないことを示し、距離付き WL（GD-WL）で解決した。 | ✅ p.22 |
| 33 | 2023 | Outstanding Paper Award | [Emergence of Maps in the Memories of Blind Navigation Agents](https://openreview.net/forum?id=lTt4KjHSsyl) | 自己運動しか感じない盲目の航法エージェントの記憶に、地図状の表現が自然に生まれることを示した。 | ✅ p.24 |
| 34 | 2023 | Outstanding Paper Award | [Universal Few-shot Learning of Dense Prediction Tasks with Visual Token Matching](https://openreview.net/forum?id=88nT0j5jAn) | 任意の密な予測タスクを少数例から学ぶ汎用手法（Visual Token Matching）。（概要は検索情報・題名に基づく） | — 参照のみ |
| 35 | 2023 | Outstanding Paper Award | [DreamFusion: Text-to-3D using 2D Diffusion](https://openreview.net/forum?id=FjNys5c7VyY) | 2D の画像拡散モデルを事前分布に使い（Score Distillation Sampling）、テキストから 3D を生成する。（概要は検索情報・題名に基づく） | — 参照のみ |
| 36 | 2023 | Outstanding Paper Honorable Mention | [Towards Understanding Ensemble, Knowledge Distillation and Self-Distillation in Deep Learning](https://openreview.net/forum?id=Uuf2q9TfXGA) | アンサンブルと知識蒸留が効く理由を「多視点」データ構造で理論的に説明した。（概要は検索情報・題名に基づく） | — 参照のみ |
| 37 | 2023 | Outstanding Paper Honorable Mention | [Mastering the Game of No-Press Diplomacy via Human-Regularized Reinforcement Learning and Planning](https://openreview.net/forum?id=F61FwJTZhb) | 人間のプレイで正則化した RL と計画で、交渉なしの Diplomacy を攻略した。（概要は検索情報・題名に基づく） | — 参照のみ |
| 38 | 2023 | Outstanding Paper Honorable Mention | [On the duality between contrastive and non-contrastive self-supervised learning](https://openreview.net/forum?id=kDEL91Dufpa) | 対照学習と非対照学習（VICReg など）の自己教師あり学習が理論的に近いことを示した。（概要は検索情報・題名に基づく） | — 参照のみ |
| 39 | 2023 | Outstanding Paper Honorable Mention | [Conditional Antibody Design as 3D Equivariant Graph Translation](https://openreview.net/forum?id=LFHFQbjxIiP) | 抗体の配列と立体構造を等変 GNN で同時に生成する（MEAN）。（概要は検索情報・題名に基づく） | — 参照のみ |
| 40 | 2023 | Outstanding Paper Honorable Mention | [Disentanglement with Biological Constraints: A Theory of Functional Cell Types](https://openreview.net/forum?id=9Z_GfhZnGH) | 非負性とエネルギー制約が、神経細胞の機能的な細胞型（もつれの解けた表現）を生むことを理論的に示した。（概要は検索情報・題名に基づく） | — 参照のみ |

### 不明な点
- ICLR 2027 の確定投稿数・採択数（アブストラクト登録 6 万超、フル投稿 4 万超との報道のみ）。開催地・会期の公式確定（公式ページは未確定表記）。カメラレディ締切。
- ICLR 2028 の日程（未発表のため推定）と、例年の公式日程の公開時期。
- ICLR 2024 の採否通知日（公式 Dates ページの該当行を確認できなかった）。
- ICLR 2026 Outstanding Paper Honorable Mention（Polar Express）に対する選考委員会のコメント。2023〜2025 年の受賞論文ごとの選考コメント（選考基準のみ確認）。
- ICLR 2025 の投稿数は資料により 11,565〜11,672 本と幅がある（採択 3,704 本）。
- 2023 年の Test of Time 賞は確認できなかった（同賞は 2024 年に始まったとみられるが公式には未確認）。
