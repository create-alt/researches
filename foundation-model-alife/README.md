## 基盤モデル × 人工生命とオープンエンド性の評価（foundation-model-alife/）

### 調査履歴
- 2026-10-24: `candidates/open-endedness.md` の ASAL・Digital Red Queen を起点に、arXiv API（"open-endedness" / "open-ended evolution" / "artificial life" / Lenia / Particle Life / Swarm Chemistry）と WebSearch で 2025〜2026 年の論文を収集した。系譜は 3 本を原典まで遡った。①基盤（substrate）の系譜：Lenia → Flow-Lenia、Boids → Swarm Chemistry、NCA → Petri Dish NCA、Core War。②定義の系譜：Hughes+ 2024 の「観察者にとって新奇かつ学習可能」。③評価・探索の系譜：ASAL（FM 埋め込みでの新奇性）→ ASAL++ / E&E / PBT-NCA / DRQ → Picbreeder-VLM・Open-Endedness Bench。
- スライド化した 10 本はすべて arXiv の本文（HTML または PDF）を通読した。Swarm Chemistry 原典（2009）は OpenAlex で closed と判定され、Petri Dish NCA 原典は Sakana AI のページ（pub.sakana.ai）が 403 だったため、どちらも本文未確認。

### 系譜
```
[基盤]  Game of Life ─ SmoothLife ─ Lenia (2019) ─→ Flow-Lenia (2022/2025) ─→ E&E (2025, VLM 目標)
        Boids (1987) ─→ Swarm Chemistry (2009) ─→ Sayama レビュー (2025)
        NCA (2020) ─→ Petri Dish NCA (2025) ─→ PBT-NCA (2026)
        Core War (1984) ─────────────────────────→ Digital Red Queen (2026)
[定義]  Soros & Stanley (2014) / Sigaud+ (2023) ─→ Hughes+ 2024「観察者にとって novel かつ learnable」
[評価]  手設計指標（進化活性度 Bedau, 複雑性） ─→ ASAL (2024/25: FM 埋め込みでの新奇性・照明)
           ├→ ASAL++ (2025: 目標を FM が提案)   ├→ PBT-NCA (2026: 新奇性＋DINOv2 多様性)
           ├→ DRQ (2026: 自己対戦＋MAP-Elites、表現型/遺伝子型の収斂)
           └→ Picbreeder-VLM (2026: 人間 vs VLM、FM 指標の敵対的水増し)
        エージェント研究の過程評価 ─→ Open-Endedness Bench (2026)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Lenia — Biology of Artificial Life](https://arxiv.org/abs/1812.05433) | 2019 | Complex Systems 28(3) | 原典 | GoL を連続化した CA。対話型進化で 400 種超・18 科の生命体を発見・分類した。 | ✅ p.2 |
| 2 | [Open-Endedness is Essential for Artificial Superhuman Intelligence](https://arxiv.org/abs/2406.04268) | 2024 | ICML 2024（Position, oral） | 原典 | 観察者から見て「新奇かつ学習可能」という開放端性の形式的定義。FM＋開放端アルゴリズムを ASI への道と主張した。 | ✅ p.3 |
| 3 | [Flow-Lenia: Emergent evolutionary dynamics in mass conservative continuous cellular automata](https://arxiv.org/abs/2506.08569) | 2025 | Artificial Life 31(2) | 発展 | 質量保存とパラメータ局在化で、局在パターンと多種の内在的進化を実現した。進化活性度で評価。初出は [arXiv:2212.07906](https://arxiv.org/abs/2212.07906)。 | ✅ p.4 |
| 4 | [Swarm Systems as a Platform for Open-Ended Evolutionary Dynamics](https://arxiv.org/abs/2409.01469) | 2025 | Phil. Trans. R. Soc. A 383 | 発展 | Swarm Chemistry とその派生をレビューし、異種スウォームを開放端進化の基盤として位置づけた。 | ✅ p.5 |
| 5 | [Automating the Search for Artificial Life with Foundation Models](https://arxiv.org/abs/2412.17799) | 2025 | Artificial Life 31(3) | 発展 | CLIP / DINOv2 の埋め込みで ALife を目標一致・開放端・照明の3方式で探索する ASAL。 | ✅ p.6 |
| 6 | [Guiding Evolution of Artificial Life Using Vision-Language Models](https://arxiv.org/abs/2509.22447) | 2025 | ALIFE 2025 | 最新 | ASAL++。第2の FM（Gemma-3）が次の目標プロンプトを提案し続ける。 | ✅ p.7 |
| 7 | [Digital Red Queen: Adversarial Program Evolution in Core War with LLMs](https://arxiv.org/abs/2601.03335) | 2026 | GECCO 2026（researchr の書誌による） | 最新 | Core War で過去の全チャンピオンに勝つ warrior を LLM＋MAP-Elites で進化。汎用性の上昇と表現型の収斂。 | ✅ p.8 |
| 8 | [In Search of the Ingredients of Open-Endedness: Replicating Picbreeder with Large Vision-Language Models](https://arxiv.org/abs/2605.23908) | 2026 | GECCO 2026 | 最新 | Picbreeder を VLM で再現し、人間との差を意味的再現率・被覆半径・系統樹バランスで測った。 | ✅ p.9 |
| 9 | [Evolving Many Worlds: Towards Open-Ended Discovery in Petri Dish NCA via Population-Based Training](https://arxiv.org/abs/2604.11248) | 2026 | arXiv プレプリント | 最新 | PD-NCA の世界の集団を、新奇性＋DINOv2 視覚多様性で PBT により進化させる。 | ✅ p.10 |
| 10 | [Open-Endedness Bench: Measuring Epistemic Process from Agent Records](https://arxiv.org/abs/2610.02588) | 2026 | arXiv プレプリント | 最新 | 研究エージェントの実行ログから、主張と行為を結ぶグラフで認識的プロセスを採点する。 | ✅ p.11 |
| 11 | [Swarm Chemistry](https://doi.org/10.1162/artl.2009.15.1.15107) (Sayama) | 2009 | Artificial Life 15(1) | 原典 | Boids 型の異種粒子群をレシピで定義し、対話型進化で自己組織パターンを探索した人工化学（検索情報と #4 のレビューに基づく）。OpenAlex で closed、OA 版なし。 | ⚠️ 本文未確認 |
| 12 | [Petri Dish Neural Cellular Automata](https://pub.sakana.ai/pdnca/) (Zhang, Risi, Darlow) | 2025 | Sakana AI（Late-breaking abstract とされる） | 原典 | 複数の NCA がシミュレーション中も勾配で学習しながら領土を奪い合う基盤（検索情報と #9 の記述に基づく）。arXiv 版がなく、PDF は 403。 | ⚠️ 本文未確認 |
| 13 | Picbreeder: A Case Study in Collaborative Evolutionary Exploration of Design Space (Secretan+) | 2011 | Evolutionary Computation 19(3) | 原典 | 人間が CPPN 画像を協調的に対話型進化させた開放端探索の代表例（#8 の記述に基づく）。OA 版の有無は未確認。 | ⚠️ 本文未確認 |
| 14 | [Expedition & Expansion: Leveraging Semantic Representations for Goal-Directed Exploration in Continuous Cellular Automata](https://arxiv.org/abs/2509.03863) | 2025 | arXiv プレプリント | 最新 | Flow-Lenia で、CLIP 空間の新奇性探索と VLM（o4-mini）が生成する言語目標への遠征を交互に行う。NS は約3,000反復で頭打ちになるが、E&E は CLIP / DINO の両空間で多様性を伸ばした。遠征由来の解は全体の 42.2±13.7%（無作為なら 4.64%）の子孫を残した。全文を読んだが、ASAL++ と論点が重なるためスライド化は見送った。 | — 参照のみ |
| 15 | [Toward Artificial Open-Ended Evolution within Lenia using Quality-Diversity](https://arxiv.org/abs/2406.04235) | 2024 | ALIFE 2024 | 発展 | Leniabreeder。MAP-Elites / AURORA で Lenia の自己組織パターンを探索する（アブストラクトのみ確認。QD テーマと重なるためスライド化せず）。 | — 参照のみ |
| 16 | [Exploring Flow-Lenia Universes with a Curiosity-driven AI Scientist](https://arxiv.org/abs/2505.15998) | 2025 | ALIFE 2025 | 最新 | IMGEP で Flow-Lenia の生態系レベルのダイナミクスを探索する（アブストラクトのみ確認）。 | — 参照のみ |
| 17 | [Directing Open-Ended Evolution in Artificial Life via Multi-Scale Path Divergence](https://arxiv.org/abs/2606.17091) | 2026 | arXiv プレプリント | 最新 | 繰り込み群に着想を得た明示式の指標 MSPD を、開放端進化の適合度と分析指標に使う（Flow-Lenia, Particle Life++）。ブラックボックスの FM 指標への対案（アブストラクトのみ確認）。 | — 参照のみ |
| 18 | [An Information-Theoretic Definition for Open-Ended Learning](https://arxiv.org/abs/2606.08369) | 2026 | arXiv プレプリント | 最新 | 「bit-equivalent」の線形成長で開放端環境を定義し、古典的バンディットは開放端でないことを示す（アブストラクトのみ確認）。 | — 参照のみ |
| 19 | [TerraLingua: Emergence and Analysis of Open-endedness in LLM Ecologies](https://arxiv.org/abs/2603.16910) | 2026 | arXiv プレプリント | 最新 | 資源制約と寿命のある LLM エージェント生態系で、規範や文化的系統の出現を「AI 人類学者」が分析する（アブストラクトのみ確認）。 | — 参照のみ |
| 20 | [A speciation simulation that partly passes open-endedness tests](https://arxiv.org/abs/2603.01701) | 2026 | arXiv プレプリント | 最新 | 進化活性度統計（Bedau 型）で ToLSim の開放端性を検定。累積活性度は非有界だが、新規活性度は持続的にゼロだった（アブストラクトのみ確認）。 | — 参照のみ |
| 21 | [OpenLife: Toward Open-World Artificial Life with Autonomous LLM Agents](https://arxiv.org/abs/2606.31046) | 2026 | ALIFE 2026 | 最新 | 記憶と代謝（予算）を持つ LLM エージェントを実世界で長期間動かす（`candidates/open-endedness.md` の記載のみ）。 | — 参照のみ |
| 22 | [Microcosmos: Reimagining Artificial Life for the GPU Era](https://arxiv.org/abs/2607.02954) | 2026 | ALIFE 2026 | 最新 | 流体中の弾性フィラメント生物を扱う、微分可能な GPU ALife エンジン（アブストラクトのみ確認）。 | — 参照のみ |
| 23 | [Semantic Lenia: Emergence of Homeostatic Solitons within the Semantic Space of Large Language Models](https://arxiv.org/abs/2608.11657) | 2026 | arXiv プレプリント | 最新 | LLM の推論を Lenia 型の閉ループ力学系とみなし、意味空間のソリトンを観察する（アブストラクトのみ確認）。 | — 参照のみ |
| 24 | [The Artificial Experimentalist: Discovery and Control of Self-Organizing Phenomena with Autotelic Reinforcement Learning](https://arxiv.org/abs/2608.26116) | 2026 | ALIFE 2026 | 最新 | CARL。自己目的的 RL で Lenia のソリトンを発見し、操作する（アブストラクトのみ確認）。 | — 参照のみ |
| 25 | [Can AI Detect Life? Lessons from Artificial Life](https://arxiv.org/abs/2604.11915) | 2026 | ALIFE 2026 | 最新 | 生命検出の ML が分布外の人工生命サンプルに簡単に騙されることを示す。FM による「生命らしさ」評価への警鐘（アブストラクトのみ確認）。 | — 参照のみ |
| 26 | [Meta-Diversity Search in Complex Systems, A Recipe for Artificial Open-Endedness ?](https://arxiv.org/abs/2312.00455) | 2023 | arXiv プレプリント | 発展 | Lenia を人工化学とし、表現を階層的に学ぶ発見アシスタント Holmes でメタ多様性探索を行う（アブストラクトのみ確認）。 | — 参照のみ |
| 27 | [Lenia and Expanded Universe](https://arxiv.org/abs/2005.03742) | 2020 | ALIFE 2020 | 発展 | Lenia の多カーネル・多チャネル拡張（書誌情報のみ確認）。 | — 参照のみ |
| 28 | [Seeking Open-Ended Evolution in Swarm Chemistry II: Analyzing Long-Term Dynamics via Automated Object Harvesting](https://arxiv.org/abs/1804.03304) | 2018 | ALIFE 2018 | 発展 | 進化版 Swarm Chemistry の長期動態を、自動「収穫」したパターンで解析する（#4 の記述と書誌情報のみ確認）。 | — 参照のみ |
| 29 | [OMNI: Open-endedness via Models of human Notions of Interestingness](https://arxiv.org/abs/2306.01711) / [OMNI-EPIC](https://arxiv.org/abs/2405.15568) | 2023/2024 | arXiv プレプリント | 発展 | FM を「人間的な面白さ」のモデルとして課題選択・生成に使う（書誌情報のみ確認。LLM 駆動進化テーマと重なる）。 | — 参照のみ |
| 30 | [Novel type of phase transition in a system of self-driven particles (Vicsek+)](https://arxiv.org/abs/cond-mat/0611743) | 1995 | Phys. Rev. Lett. | 原典 | 自己駆動粒子の整列モデル。Boids / Swarm Chemistry の物理的な対応物。 | ↪ 既存：swarm-intelligence/foundations p.2 |
| 31 | [AlphaEvolve: A coding agent for scientific and algorithmic discovery](https://arxiv.org/abs/2506.13131) | 2025 | arXiv プレプリント | 発展 | LLM を変異演算子とする進化的コーディング。DRQ が「静的最適化」の代表として対比する。 | ↪ 既存：swarm-intelligence/metabbo p.7 |
