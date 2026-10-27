## LLM 駆動の進化的探索と自己改善エージェント（llm-driven-evolution/）

### 調査履歴
- 2026-10-24: `candidates/open-endedness.md`（DGM・ShinkaEvolve・AI Scientist Nature 版の要約）を出発点に、arXiv API で「Darwin Gödel Machine」「self-improving × open-ended」「LLM-driven evolution」「evolutionary coding agent」「hyperagents」「OMNI-EPIC」「ShinkaEvolve / OpenEvolve」を新しい順に検索した。2026 年の後続（Hyperagents、HGM-Dual、MetaShare、AdaEvolve、LEVI、ExpEvolve）と、ハーネスの部品を統計的に比較した Gupta+ 2026 を最新の起点にした。
- 系譜は3本たどった。(A) LLM を変異・交叉演算子にする流れ：ELM（既存）→ LMX → Promptbreeder（自己参照）→ ShinkaEvolve。(B) 面白さ・課題生成の流れ：OMNI → OMNI-EPIC。(C) 自己改善エージェント：Gödel Machine（2003, 理論）→ STOP / ADAS / Gödel Agent / SICA → DGM → HGM / Hyperagents。AI Scientist は (A)(B) の部品（アイデアのアーカイブ、新規性フィルタ、木探索）を研究工程全体に使った応用として扱った。
- 本テーマの焦点である「QD 由来の部品（アーカイブ＝踏み石、新奇性・面白さ、親選択）が性能に与える効果」は、各論文のアブレーションを下の比較表に集約した。
- 群知能分野ですでにスライド化された ELM・EoH・LLaMEA（ga-hybrid）、FunSearch・AlphaEvolve・ReEvo（metabbo / aco-neural）、SwarmAgentic（deep-learning-fusion）は再掲せず ↪ で参照した。新奇性探索・MAP-Elites・POET などの QD の古典は同分野の quality-diversity テーマ、ASAL・ASAL++・Digital Red Queen は foundation-model-alife テーマでスライド化済みのため再掲せず、↪ で参照した。
- 採録先は、Promptbreeder（PMLR v235）、OMNI・OMNI-EPIC・DGM（本文・ICLR 公式ページ）、ShinkaEvolve（ICLR 2026 ポスターページ）、LMX（ACM TELO 4(4)）を確認した。HGM の ICLR 2026（Oral）は共著者の公開投稿による情報で、公式リストは未確認。Hyperagents は二次情報に ICLR 2026 とあるが一次情報で確認できず arXiv プレプリントとした。

### 系譜
```
[A] LLM = 変異・交叉演算子
  ELM (2022, 既存:ga-hybrid) ── FunSearch (2023, 既存:metabbo)
     └→ LMX (2023, 親を並べた few-shot = 交叉, EDA との対応)
          └→ Promptbreeder (2023, 変異プロンプトも進化 = 自己参照)
          └→ QDAIF (2023, LLM で質と多様性を評価)
     └→ AlphaEvolve (2025, 既存:metabbo) ─→ OpenEvolve (OSS)
          └→ ShinkaEvolve (2025, DGM 式親選択 + 新奇性棄却 + LLM バンディット)
          └→ AdaEvolve / LEVI / ExpEvolve (2026)
          └→ No Universal Harness (2026, 部品を分解して 310 万ロールアウトで比較 → 万能のハーネスはない)
             Simple Baselines (Gideoni+ 2026) / What Do Evolutionary Coding Agents Evolve? (2026)

[B] 面白さのモデルと課題の自動生成
  POET (2019) / 学習進捗カリキュラム (Kanitscheider+ 2021)
     └→ OMNI (2023, 基盤モデル = 面白さのモデル)
          └→ OMNI-EPIC (2024, 課題 + 環境 + 報酬をコードで生成, 課題アーカイブ)

[C] 自己改善エージェント
  Gödel Machine (Schmidhuber 2003, 証明に基づく自己改変)
     └→ STOP (2023) / ADAS (2024, 固定メタエージェント) / Gödel Agent (2024) / SICA (2025, 山登り)
          └→ Darwin Gödel Machine (2025, 証明→評価, アーカイブ + 非貪欲な親選択)   ← [B] OMNI-EPIC
               ├→ HGM (2025, 親選択を子孫クレードの成績 CMP に)
               │    └→ HGM-Dual (2026)
               └→ Hyperagents / DGM-H (2026, メタエージェントも編集対象)
                    └→ MetaShare (2026)

[A]+[B] の応用：AI Scientist v1 (2024) → v2 (2025, 木探索) → Nature 版 (2026, 統合 + 自動査読器の検証)
```

### QD 由来の部品のアブレーション比較（本テーマの横断まとめ）
| 部品 | 論文（スライド） | 比較の条件 | 結果 | 注意点 |
| --- | --- | --- | --- | --- |
| アーカイブ（踏み石） | OMNI-EPIC (p.5) | 課題アーカイブあり vs なし | 埋めたセル数・ANNECS-OMNI とも有意に上（p<0.05, Fig. 4） | 3回（学習なし）/5回（RL あり） |
| アーカイブ（踏み石） | DGM (p.6) | 全子孫を保持 vs 常に最新版を改変 | SWE-bench 50.0 vs 23.0、Polyglot 38.0 vs 14.0（Table 1） | 各条件1実行 |
| アーカイブ（踏み石） | Hyperagents (p.9) | DGM-H vs アーカイブなし | 査読 0.710 vs 0.0、報酬設計 0.372 vs 0.116（中央値, Fig. 2） | 5実行、Wilcoxon p<0.05 |
| アーカイブ（踏み石） | No Universal Harness (p.11) | Top-K アーカイブ拡大、ε 全履歴探索、MAP-Elites＋島 | Top-K 拡大単独は有意差なし。最良の K=1・ε=20% も Holm 補正後 p=0.678。OpenEvolve 完全版は最下位（P̂maj=0.033） | 5回 vs 基準 100/30 回、数学3問 |
| 親選択（非貪欲） | DGM (p.6) | 性能×子の少なさで確率抽出 vs 常に最良（Greedy） | 50.0/38.0 vs 39.7/30.0（App. A.3） | 各1実行 |
| 親選択（非貪欲） | ShinkaEvolve (p.7) | 重み付き vs 山登り vs Best-of-N | 重み付き＞山登り＞Best-of-N（円詰め, Fig. 9） | 1課題・1本の曲線 |
| 親選択（信号の種類） | HGM (p.8) | クレード成績 CMP vs 自身の性能（DGM/SICA） | CMP との相関 0.778 vs 0.285/0.444、最良 56.7 vs 53.3/50.0（Table 1–2） | 各1実行 |
| 親選択（木探索） | No Universal Harness (p.11) | UCT/PUCT の追加 | 一部の組で改善するが、深さ・複数親を足すと逆転（Fig. 1b, 4） | 組ごとに効果の向きが変わる |
| 新奇性・面白さ | OMNI (p.3) | LP＋MoI vs LP のみ vs 一様 | Crafter 習得 82 vs 55 vs 4 課題（Fig. 3） | 退屈課題は人工的に作成 |
| 新奇性・面白さ | OMNI-EPIC (p.5) | MoI あり vs LP のみ（面白さ指示と事後判定を除去） | 多様性・ANNECS-OMNI とも有意に上（Fig. 4） | 同上 |
| 新奇性・面白さ | ShinkaEvolve (p.7) | 埋め込み棄却（＋LLM 判定）vs 棄却なし | 棄却あり＞なし。LLM 判定の上乗せは小さい（Fig. 9） | 1課題 |
| 自己参照（改善手順の改善） | Promptbreeder (p.4) | 超変異・Lamarck 変異・初期化の多様化を個別に除去 | ほぼ全データで除去により低下。初期化の多様化の寄与が最大（Fig. 4） | 集団10、200評価 |
| 自己参照（改善手順の改善） | DGM (p.6) / Hyperagents (p.9) | メタエージェント固定（ADAS 相当）vs 自己改善 | DGM 39.0/28.0 vs 50.0/38.0。DGM-H は査読 0.0 vs 0.710、転移後 imp@50 0.630 vs DGM 0.0 | DGM は1実行、DGM-H は5実行 |

まとめ：個々の論文の中では「アーカイブを残す」「最良だけを親にしない」「似た候補を捨てる」はほぼ一貫して効いている。特に自己改善エージェント（DGM, DGM-H）ではアーカイブ除去の打撃が大きい。一方で、それらの多くは1〜数回の実行による比較で、予算をそろえて多数回試行した Gupta+ 2026 では、固定の部品の組み合わせはどれも問題・モデルを越えて一貫して勝たなかった（数学3問・公開モデルという限定つき）。部品の効果は「探索空間と評価器の性質に依存する」と読むのが妥当で、部品の選択自体を探索中に適応させる方向（AdaEvolve、適応的ハーネス配分、Hyperagents の外側ループの自己改変）が次の焦点になっている。

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Language Model Crossover: Variation through Few-Shot Prompting](https://arxiv.org/abs/2302.12170) | 2023 | ACM TELO 2024 | 原典 | 親を並べた few-shot プロンプトの続きを子とする交叉演算子 LMX。5領域で専用演算子なしに進化を回し、EDA との対応を示した | ✅ p.2 |
| 2 | [OMNI: Open-endedness via Models of human Notions of Interestingness](https://arxiv.org/abs/2306.01711) | 2023 | ICLR 2024 | 原典 | 基盤モデルを面白さのモデルとし、学習進捗と組み合わせた自動カリキュラム。Crafter で習得課題 82（LP 単独 55） | ✅ p.3 |
| 3 | [Promptbreeder: Self-Referential Self-Improvement Via Prompt Evolution](https://arxiv.org/abs/2309.16797) | 2023 | ICML 2024 | 発展 | タスクプロンプトと変異プロンプトを同時に進化させる自己参照的プロンプト進化。GSM8K 83.9%（ゼロショット） | ✅ p.4 |
| 4 | [OMNI-EPIC: Open-endedness via Models of human Notions of Interestingness with Environments Programmed in Code](https://arxiv.org/abs/2405.15568) | 2024 | ICLR 2025 | 発展 | 課題・環境・報酬を LLM がコードで生成し、課題アーカイブを広げ続ける。アーカイブ・面白さの除去で多様性が低下 | ✅ p.5 |
| 5 | [Darwin Godel Machine: Open-Ended Evolution of Self-Improving Agents](https://arxiv.org/abs/2505.22954) | 2025 | ICLR 2026 | 発展 | 自己改変するコーディングエージェントの全子孫をアーカイブし非貪欲に親を選ぶ。SWE-bench 20→50%、アーカイブなし 23%、貪欲 39.7% | ✅ p.6 |
| 6 | [ShinkaEvolve: Towards Open-Ended And Sample-Efficient Program Evolution](https://arxiv.org/abs/2509.19349) | 2025 | ICLR 2026 | 最新 | DGM 式親選択・新奇性棄却・LLM バンディットを加えた OSS のプログラム進化。円詰めで150評価未満で AlphaEvolve 超え | ✅ p.7 |
| 7 | [Huxley-Gödel Machine: Human-Level Coding Agent Development by an Approximation of the Optimal Self-Improving Machine](https://arxiv.org/abs/2510.21614) | 2025 | ICLR 2026（共著者情報） | 最新 | 子孫クレードの成績 CMP で展開先を選ぶ自己改善木探索。DGM・SICA を上回り CPU 時間 1/2.38 | ✅ p.8 |
| 8 | [Hyperagents](https://arxiv.org/abs/2603.19461) | 2026 | arXiv | 最新 | タスクエージェントとメタエージェントを1つの編集可能プログラムにした DGM-H。コーディング以外でも自己改善し、改善能力が領域を越えて転移 | ✅ p.9 |
| 9 | [Towards End-to-End Automation of AI Research](https://arxiv.org/abs/2606.15497) | 2026 | Nature 651 (2026) | 最新 | The AI Scientist の統合版。自動査読器は人間間一致と同等（BA 0.66〜0.69）、生成論文1本がワークショップ査読で 6.33 | ✅ p.10 |
| 10 | [Automated Discovery Has No Universally Superior Harness](https://arxiv.org/abs/2607.18235) | 2026 | arXiv | 最新 | OpenEvolve / TTT-Discover 型ハーネスを部品に分解し 30構成×12組で比較。固定ハーネスはどれも一貫して勝たず、部分実行の成績による適応配分が有効 | ✅ p.11 |
| 11 | [Evolution through Large Models (ELM)](https://arxiv.org/abs/2206.08896) | 2022 | arXiv | 原典 | LLM を GP の変異演算子にし MAP-Elites と組み合わせた。LMX の直接の前身 | ↪ 既存：swarm-intelligence/ga-hybrid p.5 |
| 12 | [Evolution of Heuristics (EoH)](https://arxiv.org/abs/2401.02051) | 2024 | ICML 2024 | 発展 | 考えとコードを LLM で交叉・変異してヒューリスティクスを進化 | ↪ 既存：swarm-intelligence/ga-hybrid p.6 |
| 13 | [LLaMEA](https://arxiv.org/abs/2405.20132) | 2024 | IEEE TEVC 2025 | 発展 | LLM でメタヒューリスティクス全体を生成・進化 | ↪ 既存：swarm-intelligence/ga-hybrid p.7 |
| 14 | [FunSearch: Mathematical discoveries from program search with large language models](https://doi.org/10.1038/s41586-023-06924-6) | 2023 | Nature 625 (2024) | 原典 | LLM と評価器の島モデル進化で cap set などの新構成を発見 | ↪ 既存：swarm-intelligence/metabbo p.5 |
| 15 | [ReEvo](https://arxiv.org/abs/2402.01145) | 2024 | NeurIPS 2024 | 発展 | 反省（reflection）付きの LLM ヒューリスティクス進化 | ↪ 既存：swarm-intelligence/metabbo p.6 |
| 16 | [AlphaEvolve](https://arxiv.org/abs/2506.13131) | 2025 | arXiv | 発展 | Gemini を変異演算子にした進化的コーディングエージェント。ShinkaEvolve・OpenEvolve の比較対象 | ↪ 既存：swarm-intelligence/metabbo p.7 |
| 17 | [SwarmAgentic](https://arxiv.org/abs/2506.15672) | 2025 | EMNLP 2025 | 発展 | PSO 型の母集団更新で LLM エージェント系を自動生成 | ↪ 既存：swarm-intelligence/deep-learning-fusion p.10 |
| 18 | [Goedel Machines: Self-Referential Universal Problem Solvers Making Provably Optimal Self-Improvements](https://arxiv.org/abs/cs/0309048) | 2003 | arXiv（理論） | 原典 | 期待効用の改善を証明できたときだけ自己を書き換える理論的な自己改善機械。DGM・HGM の出発点。実験を伴わない理論論文のためスライド化しなかった | — 参照のみ |
| 19 | [Self-Taught Optimizer (STOP)](https://arxiv.org/abs/2310.02304) | 2023 | COLM 2024 | 発展 | LLM を呼ぶ「改善器」プログラムが自分自身を改善する。DGM の前身の一つ（アブストラクトのみ確認） | — 参照のみ |
| 20 | [Automated Design of Agentic Systems (ADAS)](https://arxiv.org/abs/2408.08435) | 2024 | ICLR 2025 | 発展 | 固定のメタエージェントがコードでエージェントを設計しアーカイブに蓄積。DGM・DGM-H の「自己改善なし」対照に相当（アブストラクトのみ確認） | — 参照のみ |
| 21 | [Gödel Agent](https://arxiv.org/abs/2410.04444) | 2024 | ACL 2025 | 発展 | 自分の論理を実行時に書き換える自己参照エージェント。アーカイブを持たない（アブストラクトのみ確認） | — 参照のみ |
| 22 | [A Self-Improving Coding Agent (SICA)](https://arxiv.org/abs/2504.15228) | 2025 | arXiv | 発展 | 自己編集で SWE-bench 部分集合 17→53%。最良版を登る山登り型で、DGM の Greedy 対照・HGM の比較対象（アブストラクトのみ確認） | — 参照のみ |
| 23 | [Quality-Diversity through AI Feedback (QDAIF)](https://arxiv.org/abs/2310.13032) | 2023 | ICLR 2024 | 発展 | LLM で変異と質・多様性の評価の両方を行う QD。創作文で有効（アブストラクトのみ確認。quality-diversity テーマとの境界のため未スライド化） | — 参照のみ |
| 24 | [The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery](https://arxiv.org/abs/2408.06292) | 2024 | arXiv | 発展 | テンプレート型の自動研究系 v1。内容は Nature 版（#9）に統合されたため単独ではスライド化しなかった | — 参照のみ |
| 25 | [The AI Scientist-v2: Workshop-Level Automated Scientific Discovery via Agentic Tree Search](https://arxiv.org/abs/2504.08066) | 2025 | arXiv | 発展 | テンプレート不要・エージェント的木探索の v2。Nature 版（#9）に統合 | — 参照のみ |
| 26 | [Large Language Models as Optimizers (OPRO)](https://arxiv.org/abs/2309.03409) | 2023 | ICLR 2024 | 発展 | 過去の解と点数をプロンプトに並べて LLM に次の解を出させる最適化。Promptbreeder の比較対象 | — 参照のみ |
| 27 | [Multi-task curriculum learning in a complex, visual, hard-exploration domain: Minecraft](https://arxiv.org/abs/2106.14876) | 2021 | arXiv | 原典 | 双方向の学習進捗によるカリキュラム。OMNI の LP 部分の基礎 | — 参照のみ |
| 28 | [Learning to Discover at Test Time (TTT-Discover)](https://arxiv.org/abs/2601.16175) | 2026 | arXiv | 最新 | テスト時に RL で LLM を学習させながら PUCT 型探索で発見する。#10 が探索部分を分解 | — 参照のみ |
| 29 | [Simple Baselines are Competitive with Code Evolution](https://arxiv.org/abs/2602.16805) | 2026 | arXiv | 最新 | 単純な2つの基準法が複雑なコード進化パイプラインと同等以上。探索アルゴリズムより探索空間の設計が効くと報告（アブストラクトのみ確認） | — 参照のみ |
| 30 | [AdaEvolve: Adaptive LLM Driven Zeroth-Order Optimization](https://arxiv.org/abs/2602.20133) | 2026 | arXiv | 最新 | 改善量の信号で島内の探索強度・島間の予算・停滞時のメタ指導を適応させる（アブストラクトのみ確認） | — 参照のみ |
| 31 | [LEVI: Stronger Search Architectures Can Substitute for Larger LLMs in Evolutionary Search](https://arxiv.org/abs/2605.09764) | 2026 | arXiv | 最新 | 多様性を保つ解データベースと変異モデルの振り分けで、小さい LLM でも ShinkaEvolve 等に 3.3〜6.7 倍少ない予算で並ぶ（アブストラクトのみ確認） | — 参照のみ |
| 32 | [What Do Evolutionary Coding Agents Evolve?](https://arxiv.org/abs/2605.20086) | 2026 | arXiv | 最新 | 進化の軌跡データ EvoTrace を作り、得点向上の多くが少数の編集型に由来し、追加行の約30%が削除済み行の再導入だと示した（アブストラクトのみ確認） | — 参照のみ |
| 33 | [ExpEvolve: Structuring and Reusing Experience for Open-Ended Discovery](https://arxiv.org/abs/2610.29303) | 2026 | arXiv | 最新 | プログラムから得点差を説明するアイデア因子を抽出して探索を導く（アブストラクトのみ確認） | — 参照のみ |
| 34 | [HGM-Dual: Lineage-Aware Guided Agent Harness Optimization for Long-Horizon Planning](https://arxiv.org/abs/2610.30042) | 2026 | arXiv | 最新 | 課題能力と自己改変能力が一致しない計画課題向けに、系譜情報を文脈にした診断誘導型のハーネス進化（アブストラクトのみ確認） | — 参照のみ |
| 35 | [MetaShare: Failure-Aware Collective Self-Improvement for Open-Ended Agents](https://arxiv.org/abs/2610.21887) | 2026 | NeurIPS 2026 WS | 最新 | 失敗した改変も符号付きの性能差とともに記録し、系譜をまたいで共有する（アブストラクトのみ確認） | — 参照のみ |
| 36 | [Paired Open-Ended Trailblazer (POET)](https://arxiv.org/abs/1901.01753) | 2019 | arXiv | 原典 | 環境とエージェントの共進化。OMNI-EPIC の比較対象。QD の古典として quality-diversity テーマ側で扱う | — 参照のみ |
| 37 | [Illuminating search spaces by mapping elites (MAP-Elites)](https://arxiv.org/abs/1504.04909) | 2015 | arXiv | 原典 | 行動記述子のグリッドでエリートを保持する QD の基本形。LMX・AI Scientist・OpenEvolve が利用。quality-diversity テーマ側で扱う | — 参照のみ |
| 38 | [Automating the Search for Artificial Life with Foundation Models (ASAL)](https://arxiv.org/abs/2412.17799) | 2024 | Artificial Life 31(3) 2025 | 発展 | 基盤モデルの埋め込み空間で ALife シミュレーションの新奇性・多様性を測って探索する。OMNI と同じく基盤モデルを人間的な判定器に使う流れ | ↪ 既存：foundation-model-alife p.6 |
| 39 | [Guiding Evolution of Artificial Life Using Vision-Language Models (ASAL++)](https://arxiv.org/abs/2509.22447) | 2025 | ALIFE 2025 | 発展 | 第2の基盤モデルが進化の目標を次々に提案する ASAL のオープンエンド版。OMNI-EPIC の課題生成と対応する | ↪ 既存：foundation-model-alife p.7 |
| 40 | [Digital Red Queen: Adversarial Program Evolution in Core War with LLMs](https://arxiv.org/abs/2601.03335) | 2026 | GECCO 2026 | 最新 | LLM を変異演算子とした MAP-Elites で Core War のプログラムを自己対戦的に進化させる。MAP-Elites を単一セルにすると性能が落ちるというアーカイブのアブレーションを含む | ↪ 既存：foundation-model-alife p.8 |
