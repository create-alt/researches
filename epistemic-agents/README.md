## 認識的価値（好奇心）と LLM エージェント・発達ロボティクス（epistemic-agents/）

※ デッキ表紙では、長い題が2行に折り返して重なるため「認識的価値（好奇心）と LLM・発達ロボティクス」と短縮した。

### 調査履歴
- 2026-10-24: `candidates/active-inference.md` の最新研究（Tinker+ 2026、Active Inference as Context Acquisition）と「その他」欄（BED-LLM、ODAR、Curiosity is Knowledge、スパイキング AIF、HW 実装）を起点にした。arXiv API で "active inference" × curiosity/epistemic × LLM、"expected information gain" × LLM、"learning progress" × curiosity を新しい順に検索し、2025〜2026 の動向（ASIG、Kriz+ 2026、CA-BED、Shoot First、LPM）を把握した。
- 系譜は3本を原典まで遡った。(1) ベイズ実験計画：BED-LLM → DAD → Lindley 1956。(2) 学習進捗の好奇心：MAGELLAN → IMGEP → Oudeyer+ 2007。(3) 能動的推論の認識的価値：Curiosity is Knowledge / Tinker+ → Tschantz+ 2020 → Friston+ 2015。
- 本文の取得：arXiv 版（HTML/PDF）に加え、Tschantz+ 2020 は PLOS の OA 版 PDF で読んだ。Friston+ 2015 は Semantic Scholar で CLOSED。Schwartenbeck+ 2019（eLife, OA）は eLife に到達できず、PMC は reCAPTCHA／proof-of-work、bioRxiv は 429/403 で止まり、本文未確認とした。Oudeyer+ 2007 は著者サイト（pyoudeyer.com）に到達できなかった。OpenAlex は当日のレート上限で使えなかった。
- 同分野の deep-active-inference（Fountas 2020、AXIOM など）と、世界モデル分野の内発的報酬テーマ（ICM、Disagreement、Plan2Explore、ICL Curiosity など）との重複は避けた。

### 系譜
```
[ベイズ実験計画]  Lindley 1956 (⚠️) ──► DAD (Foster+ 2021, 償却BED) ──► BED-LLM (2025/ICLR 2026) ──┬─► ASIG / Kriz+ 2026（償却BEDのLLM化, 参照のみ）
                                                                                                └─► AIF as Context Acquisition (2026)
[学習進捗]        Oudeyer+ 2007 IAC (⚠️) ──► IMGEP (2017/JMLR 2022) ──► MAGELLAN (ICML 2025) ─ ─ ► LPM (ICLR 2026, 参照のみ)
[AIFの認識的価値] Friston+ 2015 (⚠️) ─┬─► Schwartenbeck+ 2019 (⚠️)
                                     └─► Tschantz+ 2020（action-oriented）──┬─► Tinker・銅谷・谷 2026（発達ロボ）
                                                                          ├─► Pragmatic Curiosity → Curiosity is Knowledge (2026, 理論保証; BED/BOと統合)
                                                                          └─► ODAR (2026, LLM推論の計算配分)
[小節: スパイキング/HW]  SCN (Boerlin+ 2013) ──► SFEC (Urbano+ 2026) ;  pymdp ──► Pižurica+ 2025 (HW指向, 参照のみ)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Intrinsically Motivated Goal Exploration Processes with Automatic Curriculum Learning](https://arxiv.org/abs/1708.02190) | 2017 | JMLR 2022 | 原典 | 学習進捗で目標空間を選ぶ IMGEP/AMB。実ロボットが道具使用を自力発見 | ✅ p.2 |
| 2 | [Learning action-oriented models through active inference](https://doi.org/10.1371/journal.pcbi.1007805) | 2020 | PLOS Comput. Biol. | 発展 | EFE（道具的＋認識的価値）で学ぶと bad bootstrap を避け、行動に必要な簡潔なモデルが得られる（PLOS の OA 版で読了） | ✅ p.3 |
| 3 | [Deep Adaptive Design: Amortizing Sequential Bayesian Experimental Design](https://arxiv.org/abs/2103.02438) | 2021 | ICML 2021 | 原典 | 逐次 BOED を方策ネットワークに償却し、ミリ秒で適応設計 | ✅ p.4 |
| 4 | [MAGELLAN: Metacognitive predictions of learning progress guide autotelic LLM agents in large goal spaces](https://arxiv.org/abs/2502.07709) | 2025 | ICML 2025 | 発展 | LLM が自分の能力を予測して LP を推定し、言語目標のカリキュラムを自動生成 | ✅ p.5 |
| 5 | [BED-LLM: Intelligent Information Gathering with LLMs and Bayesian Experimental Design](https://arxiv.org/abs/2508.21184) | 2025 | ICLR 2026 | 発展 | LLM の予測分布で EIG を推定して質問を選ぶ。20 Questions で +37.4pt | ✅ p.6 |
| 6 | [Curiosity-Driven Development of Action and Language in Robots Through Self-Exploration](https://arxiv.org/abs/2510.05013) | 2026 | Science Advances | 最新 | 好奇心つき償却 AIF で命令文と行動を自己探索で習得、未学習文 85.1%、U 字型発達を再現 | ✅ p.7 |
| 7 | [Curiosity is Knowledge: Self-Consistent Learning and No-Regret Optimization with Active Inference](https://arxiv.org/abs/2602.06029) | 2026 | arXiv | 最新 | 十分な好奇心で事後一致性と後悔有界性が同時に成り立つという EFE 初の理論保証 | ✅ p.8 |
| 8 | [ODAR: Principled Adaptive Routing for LLM Reasoning via Active Inference](https://arxiv.org/abs/2602.23681) | 2026 | arXiv | 最新 | 償却 EFE の難易度推定で Fast/Slow LLM に振り分け、自由エネルギー最小で回答を融合 | ✅ p.9 |
| 9 | [Active Inference as Context Acquisition for AI Agents](https://arxiv.org/abs/2608.19202) | 2026 | arXiv | 最新 | 質問・検索・ツール呼び出しを EFE の二層最適化で定式化。DP オラクル付き OQA で LLM を評価 | ✅ p.10 |
| 10 | [Efficient and robust control with spikes that constrain free energy](https://arxiv.org/abs/2603.09729) | 2026 | arXiv | 最新 | 自由エネルギーを下げるときだけ発火する SNN 制御 SFEC。Nengo 比で20〜30倍少ないスパイク | ✅ p.11 |
| 11 | [Active inference and epistemic value](https://doi.org/10.1080/17588928.2015.1020053)（Friston, Rigoli, Ognibene ほか） | 2015 | Cognitive Neuroscience 6(4) | 原典 | EFE を認識的価値（情報利得）と外発的価値に分け、好奇心を原理から導いた（検索情報に基づく）。Semantic Scholar で CLOSED | ⚠️ 本文未確認 |
| 12 | [Computational mechanisms of curiosity and goal-directed exploration](https://doi.org/10.7554/eLife.41703)（Schwartenbeck ほか） | 2019 | eLife | 発展 | AIF で新奇性（パラメータ情報利得）と顕著性（状態情報利得）を区別した好奇心モデル（検索情報に基づく）。eLife/PMC/bioRxiv いずれも本文に到達できず | ⚠️ 本文未確認 |
| 13 | [On a Measure of the Information Provided by an Experiment](https://doi.org/10.1214/aoms/1177728069)（Lindley） | 1956 | Ann. Math. Stat. | 原典 | 実験の価値を期待情報利得（相互情報量）で測るベイズ実験計画の起点（検索情報に基づく）。OA 版を確認できず | ⚠️ 本文未確認 |
| 14 | [Intrinsic Motivation Systems for Autonomous Mental Development](https://doi.org/10.1109/TEVC.2006.890271)（Oudeyer, Kaplan, Hafner） | 2007 | IEEE TEC | 原典 | 学習進捗（予測誤差の減少）を内発的報酬とする IAC（検索情報に基づく）。著者サイトに到達できず | ⚠️ 本文未確認 |
| 15 | [Pragmatic Curiosity: A Hybrid Learning-Optimization Paradigm via Active Inference](https://arxiv.org/abs/2602.06104) | 2026 | arXiv | 最新 | Curiosity is Knowledge の手法編。EFE で BO と BED を統合（検索結果の要旨のみ） | — 参照のみ（理論編を優先） |
| 16 | [A Hardware-oriented Approach for Efficient Active Inference Computation and Deployment](https://arxiv.org/abs/2508.13177) | 2025 | arXiv | 最新 | pymdp を疎な統一計算グラフに変換し、Jetson Orin で遅延1/2以下・メモリ最大35%減（全文読了） | — 参照のみ（4頁の短報で、評価が対数尤度計算のみ） |
| 17 | [Planning to Be Surprised: Optimal Bayesian Exploration in Dynamic Environments](https://arxiv.org/abs/1103.5708) | 2011 | arXiv | 原典 | 情報利得（驚き）を報酬にした最適ベイズ探索。系譜確認のみ | — 参照のみ（スライド枠の都合） |
| 18 | [Modern Bayesian Experimental Design](https://arxiv.org/abs/2302.14545) | 2023 | Statistical Science | 発展 | BED の計算手法のレビュー（要旨のみ） | — 参照のみ（レビュー） |
| 19 | [Uncertainty of Thoughts: Uncertainty-Aware Planning Enhances Information Seeking in Large Language Models](https://arxiv.org/abs/2402.03271) | 2024 | NeurIPS 2024 | 発展 | 情報利得型の報酬で質問を選ぶ LLM 手法。BED-LLM は決定論的尤度の仮定を批判（要旨のみ） | — 参照のみ（BED-LLM で代表） |
| 20 | [Amortising Bayesian Experimental Design for Sequential Information Gathering in LLMs](https://arxiv.org/abs/2607.03426) | 2026 | ICML 2026 WS (FoGen) | 最新 | EIG 報酬の多ターン GRPO で BED を 7B LLM に償却。BED-LLM 比で推論コスト25分の1以下（要旨のみ） | — 参照のみ（ワークショップ） |
| 21 | [Amortizing Sequential Experimental Design in Reasoning LLMs](https://arxiv.org/abs/2610.20832) | 2026 | arXiv | 最新 | 推論 LLM に情報利得報酬で実験計画の推論を学習させ、MediQ へ転移（要旨のみ） | — 参照のみ（直近で未精読） |
| 22 | [CA-BED: Conversation-Aware Bayesian Experimental Design](https://arxiv.org/abs/2606.01182) | 2026 | ICLR 2026 WS | 最新 | 会話木上で EIG を伝播させる推論時の対話計画（要旨のみ） | — 参照のみ |
| 23 | [Shoot First, Ask Questions Later? Building Rational Agents that Explore and Act Like People](https://arxiv.org/abs/2510.20886) | 2025 | ICLR 2026 | 最新 | Collaborative Battleship で、BED に着想した LM 推論が人間や GPT-5 を上回る（要旨のみ） | — 参照のみ |
| 24 | [Beyond Noisy-TVs: Noise-Robust Exploration Via Learning Progress Monitoring](https://arxiv.org/abs/2509.25438) | 2025 | ICLR 2026 | 最新 | 学習進捗を報酬にして noisy-TV を避け、LP が情報利得の単調指標であることを示した（要旨のみ） | — 参照のみ（RL の内発的報酬寄り） |
| 25 | [Compression Progress (Schmidhuber)](https://arxiv.org/abs/0812.4360) | 2008 | arXiv | 原典 | 圧縮進捗を好奇心とする理論 | ↪ 既存：world-model/intrinsic-reward p.2 |
| 26 | [Can In-Context Learning Support Intrinsic Curiosity?](https://arxiv.org/abs/2606.19476) | 2026 | arXiv | 最新 | 文脈内学習による好奇心 | ↪ 既存：world-model/intrinsic-reward p.10 |
| 27 | [Guiding Pretraining in Reinforcement Learning with Large Language Models (ELLM)](https://arxiv.org/abs/2302.06692) | 2023 | ICML 2023 | 発展 | LLM が探索目標を提案 | ↪ 既存：world-model/foundation-world-model p.2 |
