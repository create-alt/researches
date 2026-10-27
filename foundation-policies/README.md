## 基盤モデル・言語条件付き世界モデルによるゼロショット行動生成（foundation-policies/）

### 調査履歴
- 2026-10-25: arXiv API で 2025〜2026 年の VLA の汎化・指示追従・頑健性評価（"vision-language-action" AND generalization/unseen instructions/instruction following、LIBERO 派生ベンチマーク）を起点に現在地を把握。診断研究（INT-ACT、LIBERO-Plus、Encoded but Not in Control）と改善手法（APT）を選び、そこから VLA の系譜（π0.5 → RT-2）と、LLM で計画する系譜（SayCan → Code as Policies）、動画生成・言語条件付き世界モデルの系譜（UniPi、Dynalang）の原典まで遡った。
- 整理の軸は「未学習の指示に対して何が汎化しているか（言語理解・視覚・運動のどこか）」。原典期は「言語→スキル列」の層だけが汎化し運動は固定（SayCan/CaP）、RT-2 は意味・視覚概念は汎化するが新しい動作は出ないと明言。2025〜26 年の診断研究は、VLA が言語を無視する・意図は正しいが実行で失敗する・言語は内部に表現されているのに行動を選ばない、という 3 段階の失敗を示している。
- 同分野の compositional-generalization / language-to-reward は別担当。既存デッキの LAPA・Genie・Dreamer 4・Ctrl-World・V-JEPA 2 は再掲していない。

### 系譜
```
[LLM が計画・コードを担う]
  SayCan (2022) ──→ Code as Policies (2023) ……→ （Inner Monologue / VoxPoser：未調査）
        │ 「言語→スキル列」だけが汎化、運動は既存スキルに固定
        ▼
[VLM そのものを方策にする VLA]
  RT-1 (2022, 参照のみ) ──→ RT-2 (2023) ──→ OpenVLA / π0 (参照のみ) ──→ π0.5 (2025)
        │ 意味・視覚概念は汎化、新しい運動は汎化しない
        ▼
[診断：何が汎化していないか]
  INT-ACT (2025：意図は正しいが実行で失敗)
     └→ LIBERO-PRO / LIBERO-Plus (2025-26：言語を無視、目標置換で 0〜20%)
          └→ Encoded but Not in Control (2026：言語は表現されているが行動を選ばない)
[改善]
  Knowledge Insulation (2025, 参照のみ) / BayesVLA (2025, 参照のみ) ──→ APT (2026：行動側を先に言語なしで事前学習)

[動画・世界モデル経由で言語を行動へ]
  UniPi (2023：テキスト→動画→逆動力学)    Dynalang (2024：言語で未来を予測する世界モデル)
        └→ Genie / Dreamer 4 / Ctrl-World（既存：world-model/foundation-world-model）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Do As I Can, Not As I Say: Grounding Language in Robotic Affordances](https://arxiv.org/abs/2204.01691) | 2022 | CoRL 2022 | 原典 | LLM のスキル有用度と価値関数による実行可能性の積でスキルを選ぶ SayCan。101 指示で計画 84%・実行 74%。 | ✅ p.2 |
| 2 | [Code as Policies: Language Model Programs for Embodied Control](https://arxiv.org/abs/2209.07753) | 2023 | ICRA 2023 | 発展 | コード生成 LLM が知覚 API と制御プリミティブを組み合わせた方策コードを書く。未見指示で CLIPort 0% に対し 62〜80%。 | ✅ p.3 |
| 3 | [Learning Universal Policies via Text-Guided Video Generation](https://arxiv.org/abs/2302.00111) | 2023 | NeurIPS 2023 | 原典 | テキスト条件付き動画拡散で計画し逆動力学で行動化する UniPi。未見の言語組合せで 46〜60%。 | ✅ p.4 |
| 4 | [RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control](https://arxiv.org/abs/2307.15818) | 2023 | CoRL 2023 | 原典 | 行動をトークン化して VLM を Web データと共同微調整した VLA。未見条件で 62% 対 RT-1 32%、新しい動作は獲得しない。 | ✅ p.5 |
| 5 | [Learning to Model the World with Language](https://arxiv.org/abs/2308.01399) | 2024 | ICML 2024 | 発展 | 言語を未来予測の手がかりとして扱う多モーダル世界モデル Dynalang。多様なヒントを使うほど性能が上がる。 | ✅ p.6 |
| 6 | [π0.5: a Vision-Language-Action Model with Open-World Generalization](https://arxiv.org/abs/2504.16054) | 2025 | CoRL 2025 | 発展 | 他ロボット・Web・サブタスク予測・口頭指示を共同学習し、未学習の家庭で長期タスクを実行。Web データは未見物体の言語追従に効く。 | ✅ p.7 |
| 7 | [From Intention to Execution: Probing the Generalization Boundaries of Vision-Language-Action Models](https://arxiv.org/abs/2506.09930) | 2025 | arXiv プレプリント | 最新 | 50 タスクの診断スイート INT-ACT。意図の正しさ 84.5% に対し成功 30.4% という「意図と行動のギャップ」。 | ✅ p.8 |
| 8 | [LIBERO-Plus: In-depth Robustness Analysis of Vision-Language-Action Models](https://arxiv.org/abs/2510.13626) | 2026 | CVPR 2026（改題） | 最新 | 7 次元の摂動で VLA を解析。指示を空にしても成功が保たれ、目標を置換すると 0〜20% に落ちる＝言語を無視。 | ✅ p.9 |
| 9 | [APT: Action Expert Pretraining Improves Instruction Generalization of Vision-Language-Action Policies](https://arxiv.org/abs/2606.12366) | 2026 | CoRL 2026 | 最新 | 行動エキスパートを言語なしの視覚→行動事前分布として先に学習し、後から言語を注入。LIBERO-PRO の対象置換で π0.5 の 0〜1% を大きく上回る。 | ✅ p.10 |
| 10 | [Encoded but Not in Control: Revealing the Grounding Gap in Vision-Language Robot Policies](https://arxiv.org/abs/2610.06235) | 2026 | arXiv プレプリント | 最新 | 対象差し替えで VLA/WAM は元の物体へ 86〜98% 向かう一方、新しい対象は内部でほぼ 100% 線形に読み出せる「接地ギャップ」。 | ✅ p.11 |
| 11 | [RT-1: Robotics Transformer for Real-World Control at Scale](https://arxiv.org/abs/2212.06817) | 2023 | RSS 2023 | 原典 | 大規模実機データで学習した言語条件付き Transformer 方策。RT-2 のベースライン（アブストラクトと RT-2 本文での記述に基づく）。 | — 参照のみ（RT-2 で代表） |
| 12 | [Inner Monologue: Embodied Reasoning through Planning with Language Models](https://arxiv.org/abs/2207.05608) | 2022 | CoRL 2022 | 発展 | SayCan に成功検出などの環境フィードバックを言語で返し閉ループ計画にする（アブストラクトに基づく）。 | — 参照のみ（SayCan 系の閉ループ化） |
| 13 | [Socratic Models: Composing Zero-Shot Multimodal Reasoning with Language](https://arxiv.org/abs/2204.00598) | 2022 | ICLR 2023 | 発展 | VLM の知覚を言語化して LLM の計画に差し込む構成（CaP 本文での比較に基づく）。 | — 参照のみ |
| 14 | [VoxPoser: Composable 3D Value Maps for Robotic Manipulation with Language Models](https://arxiv.org/abs/2307.05973) | 2023 | CoRL 2023 | 発展 | LLM が 3D 価値マップを合成して軌道を最適化する、CaP の後継的手法（検索情報に基づく）。 | — 参照のみ（次に読む候補） |
| 15 | [OpenVLA: An Open-Source Vision-Language-Action Model](https://arxiv.org/abs/2406.09246) | 2024 | CoRL 2024 | 発展 | 970k 実機デモで学習した 7B のオープン VLA。LoRA による新タスクへの効率的微調整を検証（アブストラクトに基づく）。 | — 参照のみ（π0.5 で代表） |
| 16 | [π0: A Vision-Language-Action Flow Model for General Robot Control](https://arxiv.org/abs/2410.24164) | 2024 | RSS 2025 | 発展 | VLM に flow matching の行動エキスパートを付けた VLA（アブストラクトと π0.5 本文に基づく）。 | — 参照のみ（π0.5 で代表） |
| 17 | [Knowledge Insulating Vision-Language-Action Models: Train Fast, Run Fast, Generalize Better](https://arxiv.org/abs/2505.23705) | 2025 | NeurIPS 2025 | 発展 | 行動エキスパートからの勾配が VLM の知識移転を損なうことを示し、VLM を隔離する学習法を提案（アブストラクトに基づく）。 | — 参照のみ（APT で比較） |
| 18 | [Yell At Your Robot: Improving On-the-Fly from Language Corrections](https://arxiv.org/abs/2403.12910) | 2024 | RSS 2024 | 発展 | 人の言語による修正で高レベル方策をその場で改善する階層方策（アブストラクトに基づく）。 | — 参照のみ（対話的修正は次テーマ候補） |
| 19 | [LIBERO-PRO: Towards Robust and Fair Evaluation of Vision-Language-Action Models Beyond Memorization](https://arxiv.org/abs/2510.03827) | 2025 | arXiv プレプリント | 最新 | LIBERO の物体・初期状態・指示・環境を摂動すると 90% 超が 0% に崩れ、壊れた指示でも出力が変わらない（アブストラクトに基づく）。 | — 参照のみ（LIBERO-Plus と重複） |
| 20 | [LIBERO-Para: A Diagnostic Benchmark and Metrics for Paraphrase Robustness in VLA Models](https://arxiv.org/abs/2603.28301) | 2026 | EMNLP 2026 | 最新 | 言い換えで 22〜52 pt 低下、主因は物体名の語彙変化で、失敗の 80〜96% は計画段階（アブストラクトに基づく）。 | — 参照のみ |
| 21 | [Rephrase Before You Act: Characterizing and Mitigating Language Sensitivity in Vision-Language-Action Models](https://arxiv.org/abs/2610.10526) | 2026 | arXiv プレプリント | 最新 | 1 語の違いで成功率が数十 pt 変わる。LLM が蒸留した言い換え規則で指示を書き換えると未学習タスクで改善（アブストラクトに基づく）。 | — 参照のみ |
| 22 | [Flatness Preserves Instruction Following in Vision-Language-Action Models](https://arxiv.org/abs/2606.23641) | 2026 | arXiv プレプリント | 最新 | 少量データ微調整での「instruction blindness」を SAM による平坦化で緩和（アブストラクトに基づく）。 | — 参照のみ |
| 23 | [Do Vision-Language-Action Models Understand Instructions? A Mechanistic Interpretability Study on Language Grounding](https://arxiv.org/abs/2610.10178) | 2026 | arXiv プレプリント | 最新 | π0.5 と GR00T N1.7 の活性化パッチングで、抽象的な言い換えには鈍感で方向語に敏感と分析（アブストラクトに基づく）。 | — 参照のみ |
| 24 | [Do VLAs Really Follow Instructions? Diagnosing How-Level Instruction Following in Vision-Language-Action Models](https://arxiv.org/abs/2610.21251) | 2026 | arXiv プレプリント | 最新 | 「どうやるか」を指定する指示は現行 VLA で効かず、区間ごとの指示付与でも分布外には広がらない（アブストラクトに基づく）。 | — 参照のみ |
| 25 | [InstructMove: A Text-Indispensable Benchmark for Instruction-Following Manipulation](https://arxiv.org/abs/2608.22990) | 2026 | arXiv プレプリント | 最新 | 複数の行動が視覚的に妥当で言語でしか決まらない場面を作る評価（アブストラクトに基づく）。 | — 参照のみ |
| 26 | [When Vision Overrides Language: Evaluating and Mitigating Counterfactual Failures in VLAs](https://arxiv.org/abs/2602.17659) | 2026 | arXiv プレプリント | 最新 | 反事実ベンチマーク LIBERO-CF と二系統推論の Counterfactual Action Guidance（アブストラクトに基づく）。 | — 参照のみ（次に読む候補） |
| 27 | [Seeing to Act, Prompting to Specify: A Bayesian Factorization of Vision Language Action Policy](https://arxiv.org/abs/2512.11218) | 2025 | arXiv プレプリント | 発展 | 視覚→行動の事前分布と言語尤度に分解する BayesVLA。APT の前身（アブストラクトに基づく）。 | — 参照のみ（APT で代表） |
| 28 | [Veo-Act: Enhancing VLA Policies with Frontier Video Models](https://arxiv.org/abs/2604.04502) | 2026 | arXiv プレプリント | 最新 | 最先端の動画生成モデルで VLA を強化する UniPi 系の最新研究（arXiv 検索結果の題名に基づく）。 | — 参照のみ |
| 29 | [GR00T N1: An Open Foundation Model for Generalist Humanoid Robots](https://arxiv.org/abs/2503.14734) | 2025 | arXiv プレプリント | 発展 | VLM と拡散行動モジュールの二系統 VLA。Encoded but Not in Control の評価対象（同論文の記述に基づく）。 | — 参照のみ |
| 30 | Genie: Generative Interactive Environments | 2024 | ICML 2024 | 発展 | 動画から潜在行動付きの世界モデルを学習。 | ↪ 既存：world-model/foundation-world-model p.4 |
| 31 | Dreamer 4（Training Agents Inside of Scalable World Models） | 2025 | arXiv プレプリント | 最新 | 動画世界モデル内での方策学習。UniPi・Dynalang の発展先。 | ↪ 既存：world-model/foundation-world-model p.7 |
| 32 | LAPA: Latent Action Pretraining from Videos | 2025 | ICLR 2025 | 発展 | 行動ラベルなし動画から潜在行動で VLA を事前学習。新しい運動の獲得手段として関連。 | ↪ 既存：world-model/latent-action p.5 |
