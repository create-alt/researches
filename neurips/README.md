## NeurIPS（neurips/）

### 調査履歴
- 2026-10-27: WebSearch（公式 Dates・CFP・ブログ記事・Fact Sheet のスニペット）、ccf-deadlines の nips.yml、arXiv（本文と API の検索）、proceedings.neurips.cc を情報源に、NeurIPS 2022〜2026 の締切・開催地・投稿数、2023〜2025 の受賞、2026 の Oral 採択論文を調べた。neurips.cc・blog.neurips.cc・media.neurips.cc と OpenReview API には到達できず、公式ページの本文は検索スニペットでしか確認していない。
- 2026 の受賞はまだ発表されていない。そのため、著者が arXiv コメントで NeurIPS 2026 Oral と明記している本会議論文から、本アーカイブの分野に近い 4 本を「話題」としてスライド化した。2025 の受賞 8 本（Best 4、Runner-up 3、Test of Time 1）は全文を読んでスライド化した。
- 2026-10-28: 公式サイト（neurips.cc）に直接アクセスし、2023〜2025 の受賞一覧（awards_detail、2024 の Test of Time ページ）で題名・区分を照合して全件一致を確認した（2023 の DPO・Data-Constrained Scaling の Runner-up、word2vec の Test of Time、2024 の Autoguidance の Runner-up を含む）。2026 の受賞ページは空（未発表）。2026 の公式 Oral 一覧（Sydney・Atlanta・Paris の計 132 件）で、スライド化した 4 本がすべて Oral であることを確認した。2022〜2026 の Dates ページでリバッタル・通知・カメラレディを補い、Future Meetings で 2027 の開催地域（欧州）を確認した。2024 の受賞 4 本（VAR・STDE・Autoguidance・Rho-1）を arXiv で全文読んでスライドに追加した。blog.neurips.cc と media.neurips.cc（Fact Sheet）にはまだ届かず、選考委員会のコメントは取得できていない。

### 締切の要点
- NeurIPS 2027 は公式に「欧州」で開くとだけ発表されている（Future Meetings。2028 は米国西部）。都市・会期・締切は未発表で、Conferences/2027 のページもまだない。
- 締切は推定。公式 Dates で、2023〜2026 のアブストラクト締切は 5/11, 5/15, 5/11, 5/4、論文締切は 5/17, 5/22, 5/15, 5/6 で、年々早まっている。2027 はアブストラクト 5 月上旬（代表値 2027-05-06）、論文 5 月中旬前半（代表値 2027-05-12）と推定。リバッタル（著者との議論）は 7 月下旬〜8 月上旬（2026 は 7/27〜8/3）、採否通知は 9 月下旬（2026 は 9/24）、カメラレディは 10 月下旬（2023〜2025 は 10/27, 10/30, 10/23）。
- 直近の NeurIPS 2026 は Sydney が本会場（12/6〜12）で、Atlanta・Paris が公式サテライト（いずれも 12/9〜13）。投稿 30,709 本、採択 7,900 本（25.7%、所属機関のニュースによる値）。

### 受賞・話題の論文一覧
| # | 年 | 賞 | 論文 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- |
| 1 | 2026 | Oral（話題、Atlanta） | [Language-Conditioned World Modeling for Visual Navigation](https://arxiv.org/abs/2603.26741) | 言語指示と開始画像だけから全軌道を予測する課題とデータを作り、拡散世界モデル＋潜在 actor-critic と統一自己回帰モデルを比較した。 | ✅ p.2 |
| 2 | 2026 | Oral（話題、Paris） | [Unifying Goal-Conditioned RL and Unsupervised Skill Learning via Control-Maximization](https://arxiv.org/abs/2605.06145) | GCRL の 3 定式化は最適方策が食い違うことを示し、それぞれに対応するスキル学習（MISL）の目的を上下界で特定した理論研究。 | ✅ p.4 |
| 3 | 2026 | Oral（話題、Sydney） | [ProCompNav: Proactive Instance Navigation with Comparative Judgment for Ambiguous User Queries](https://arxiv.org/abs/2605.06223) | 曖昧な指示で個体を探すとき、候補を二分する Yes/No 質問で絞り込む。成功率が上がり、利用者の回答は約 1/26 になった。 | ✅ p.6 |
| 4 | 2026 | Oral（話題、Sydney） | [Thinking with Images as Continuous Actions: Numerical Visual Chain-of-Thought](https://arxiv.org/abs/2602.23959) | 視覚 CoT の領域座標を連続値の行動として出力し、GRPO に組み込む。7B モデルで 32B モデルを上回った（公式題名は "...as Continuous Policy: ..."）。 | ✅ p.8 |
| 5 | 2025 | Best Paper | [Gated Attention for Large Language Models](https://arxiv.org/abs/2505.06708) | SDPA の出力にシグモイドゲートを掛けると、性能・安定性・長文外挿が向上し、attention sink が消える。 | ✅ p.10 |
| 6 | 2025 | Best Paper | [1000 Layer Networks for Self-Supervised RL](https://arxiv.org/abs/2503.14858) | Contrastive RL を最大 1024 層まで深くすると性能が 2〜50 倍になり、新しい行動が創発した。 | ✅ p.12 |
| 7 | 2025 | Best Paper | [Why Diffusion Models Don't Memorize](https://arxiv.org/abs/2505.17638) | 記憶が始まる時刻だけが訓練データ数に比例して遅れるため、早期終了で汎化できる窓が広がる。 | ✅ p.14 |
| 8 | 2025 | Best Paper（DB track） | [Artificial Hivemind](https://arxiv.org/abs/2510.22954) | 2.6 万件の開かれた問いで、LLM のモデル内の反復とモデル間の均質化を定量化した。 | ✅ p.16 |
| 9 | 2025 | Runner-up | [Does Reinforcement Learning Really Incentivize Reasoning Capacity in LLMs Beyond the Base Model?](https://arxiv.org/abs/2504.13837) | pass@k を大きな k で比べると基盤モデルが上回る。RLVR は効率を上げるが、推論能力の境界は広げない。 | ✅ p.18 |
| 10 | 2025 | Runner-up | [Optimal Mistake Bounds for Transductive Online Learning](https://arxiv.org/abs/2512.12567) | トランスダクティブ設定の最適誤り回数を Θ(√d) で決着させ、30 年来の未解決問題を解いた。 | ✅ p.20 |
| 11 | 2025 | Runner-up | [Superposition Yields Robust Neural Scaling](https://arxiv.org/abs/2505.10465) | 表現の重ね合わせが強いと損失はモデル幅に反比例する。これが LLM のスケーリング則を説明する。 | ✅ p.22 |
| 12 | 2025 | Test of Time | [Faster R-CNN](https://proceedings.neurips.cc/paper/2015/hash/14bfa6bb14875e45bba028a21ed38046-Abstract.html) | 特徴を共有する RPN とアンカーを導入した、二段式物体検出の標準形（NIPS 2015）。 | ✅ p.24 |
| 13 | 2024 | Best Paper | [Visual Autoregressive Modeling (VAR)](https://arxiv.org/abs/2404.02905) | 画像を粗→細の「次スケール予測」で自己回帰生成し、ImageNet 256 で FID 1.73。GPT 型 AR で初めて DiT を上回った。 | ✅ p.26 |
| 14 | 2024 | Best Paper | [Stochastic Taylor Derivative Estimator](https://arxiv.org/abs/2412.00088) | Taylor モード AD にランダムなジェットを入れて任意の微分作用素を不偏推定。100 万次元の PDE を GPU 1 枚・8 分で解いた。 | ✅ p.28 |
| 15 | 2024 | Runner-up | [Guiding a Diffusion Model with a Bad Version of Itself](https://arxiv.org/abs/2406.02507) | 小さく学習の浅い自分自身で誘導する autoguidance。多様性を保ったまま画質を上げ、ImageNet-512 で FID 1.25。 | ✅ p.30 |
| 16 | 2024 | Runner-up | [Not All Tokens Are What You Need for Pretraining (Rho-1)](https://arxiv.org/abs/2404.07965) | 参照モデルとの超過損失が大きいトークンだけを学ぶ SLM。15B トークンで 500B 使う DeepSeekMath-7B に匹敵。 | ✅ p.32 |
| 17 | 2024 | Best Paper（D&B） | [The PRISM Alignment Dataset](https://arxiv.org/abs/2404.16019) | 参加型・個人化された人間フィードバックによるアライメント用データセット（公式受賞一覧の要旨に基づく）。 | ⚠️ 本文未確認 |
| 18 | 2024 | Test of Time | [Generative Adversarial Nets](https://arxiv.org/abs/1406.2661) | NIPS 2014 の GAN。 | — 参照のみ |
| 19 | 2024 | Test of Time | [Sequence to Sequence Learning with Neural Networks](https://arxiv.org/abs/1409.3215) | NIPS 2014 の Seq2Seq。 | — 参照のみ |
| 20 | 2023 | Outstanding | [Privacy Auditing with One (1) Training Run](https://arxiv.org/abs/2305.08846) | 1 回の学習で差分プライバシーを監査する。 | ⚠️ 本文未確認 |
| 21 | 2023 | Outstanding | [Are Emergent Abilities of Large Language Models a Mirage?](https://arxiv.org/abs/2304.15004) | LLM の「創発能力」は評価指標による見かけの現象だと論じた。 | ⚠️ 本文未確認 |
| 22 | 2023 | Runner-up | [Scaling Data-Constrained Language Models](https://arxiv.org/abs/2305.16264) | データが限られるときの、反復学習を含むスケーリング則。 | ⚠️ 本文未確認 |
| 23 | 2023 | Runner-up | [Direct Preference Optimization](https://arxiv.org/abs/2305.18290) | 選好データから方策を直接最適化する DPO。 | ⚠️ 本文未確認 |
| 24 | 2023 | Outstanding（D&B） | [ClimSim](https://arxiv.org/abs/2306.08754) | 物理と ML を組み合わせた気候エミュレーション用のデータセット。 | ⚠️ 本文未確認 |
| 25 | 2023 | Outstanding（D&B） | [DecodingTrust](https://arxiv.org/abs/2306.11698) | GPT モデルの信頼性を総合的に評価する。 | ⚠️ 本文未確認 |
| 26 | 2023 | Test of Time | [Distributed Representations of Words and Phrases and their Compositionality](https://arxiv.org/abs/1310.4546) | NIPS 2013 の word2vec。 | — 参照のみ |

受賞の区分はすべて公式の受賞一覧（https://neurips.cc/virtual/2023〜2025/awards_detail、2024 の Test of Time は https://neurips.cc/virtual/2024/test-of-time/105032）で確認した。

### 不明な点
- NeurIPS 2026 の Best Paper・Runner-up・Test of Time はまだ発表されていない（公式の受賞ページは 2026-10-28 時点で空。例年 11 月末〜12 月上旬に発表）。発表されたら差し替えが必要。
- NeurIPS 2027 の都市・会期・締切（「欧州」以外は未発表）。2026 のカメラレディ締切（公式 Dates に記載なし）。
- 2023〜2025 の選考委員会コメント（受賞理由）。公式ブログと報道資料（media.neurips.cc）に届かず、評価ポイントは調査者の見立てのまま。
- 2022 の採択数（Paper Copilot 2,671、Fact Sheet の検索抜粋 2,905 で基準が食い違う）。2023 の投稿数は Fact Sheet の検索抜粋で 12,343（Paper Copilot は 12,345）。2026 の投稿・採択数は公式統計が未公開で、所属機関のニュースによる値。
