## 階層化（hierarchical/）

### 調査履歴
- 2026-10-23: arXiv API で "hierarchical world model" / "temporal abstraction" + "world model" / "hierarchical JEPA" / "multi-timescale" を新着順に検索し、2026年の最新動向（HWM → H-JEPA、Hi-LeWM、Orbis 2、MHWA ほか）を把握した。そこから遡り、(a) 多時間スケール潜在ダイナミクスの系譜（Clockwork RNN → VTA → CW-VAE → MTS3）、(b) 世界モデル上のサブゴール計画の系譜（Director → HIEROS）、(c) LeCun の H-JEPA 構想から JEPA 系潜在世界モデルの階層 MPC へ至る系譜（H-JEPA 構想 → Puppeteer → HWM → H-JEPA / Hi-LeWM）を追った。
- 2026-10-23（ネットワーク拡張後）: 本文未確認だった LeCun (2022) と THICK (ICLR 2024) の正規公開版を OpenReview・ICLR proceedings・テュービンゲン大学リポジトリ・MPI-IS のページで探したが、OpenReview はチャレンジ認証（403）、その他は接続不可だった。OpenAlex と Semantic Scholar はレート制限で使えなかった。代わりに arXiv にある Dawid & LeCun (2023) の講義ノート（H-JEPA の節を含む）を全文読んでスライド化した。

### 系譜
```
[多時間スケール潜在ダイナミクス]
Clockwork RNN (2014) ─┐
TD-VAE (2018) ────────┼→ VTA (2019) → CW-VAE (2021) ──→ MTS3 (2023) ──→ Orbis 2 (2026, 運転映像・抽象度×時間)
                      │                    └────────────────────────────↗
[世界モデル上のサブゴール計画]
World Models (2018) → PlaNet/Dreamer → Director (2022) ──→ HIEROS (2023, 3階層・S5WM)
GateL0RD (2021) → THICK (2024, 適応的時間抽象) ※本文未確認
[H-JEPA 構想 → JEPA 系潜在世界モデルの階層 MPC]
LeCun "A Path Towards AMI" (2022) ※本文未確認 ─ Dawid & LeCun 講義ノート (2023)
   ├→ Puppeteer (2024, TD-MPC2 の2階層・抽象度の階層)
   └→ HWM (2026, 共有潜在空間の多時間スケール MPC)
          ├→ H-JEPA (2026, 階層ごとに独自の潜在空間・end-to-end)
          ├→ Hi-LeWM / Mind the Gap (2026, 後付け階層の限界分析)
          └→ Metro-WM, 凍結 HWM 上のサブゴール学習 (2026)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Clockwork Variational Autoencoders](https://arxiv.org/abs/2102.09532) | 2021 | arXiv | 原典 | 上位ほど遅いクロックで遷移する階層潜在系列による長期動画予測。時間的抽象化の効果を4データセットで実証。 | ✅ p.2 |
| 2 | [Deep Hierarchical Planning from Pixels (Director)](https://arxiv.org/abs/2206.04114) | 2022 | NeurIPS | 原典 | 世界モデルの潜在空間で manager が離散コード化した潜在ゴールを選び worker が追う。疎報酬の一人称 Ant Maze を解く。 | ✅ p.3 |
| 3 | [Introduction to Latent Variable Energy-Based Models: A Path Towards Autonomous Machine Intelligence](https://arxiv.org/abs/2306.02572) | 2023 | J. Stat. Mech. 2024 | 原典 | LeCun (2022) の講義ノート。EBM・JEPA を解説し、短期の JEPA-1 と長期の JEPA-2 を積む H-JEPA 構想を図示（実験なし）。 | ✅ p.4 |
| 4 | [Multi Time Scale World Models (MTS3)](https://arxiv.org/abs/2310.18534) | 2023 | NeurIPS | 発展 | 遅いタスク潜在が速い状態ダイナミクスを条件付ける2階層の確率的状態空間モデル。閉形式推論で長期予測と不確実性推定。 | ✅ p.5 |
| 5 | [Hieros: Hierarchical Imagination on Structured State Space Sequence World Models](https://arxiv.org/abs/2310.05167) | 2023 | arXiv | 発展 | 各階層が S5 世界モデルと actor-critic を持つ3階層のサブゴール型エージェント。Atari100k で平均・中央値の SOTA。 | ✅ p.6 |
| 6 | [Hierarchical World Models as Visual Whole-Body Humanoid Controllers (Puppeteer)](https://arxiv.org/abs/2405.18418) | 2024 | ICLR 2025 | 発展 | MoCap 追従の低位 TD-MPC2 と視覚から参照動作を出す高位を積む階層世界モデル。56自由度ヒューマノイドで自然な動作。 | ✅ p.7 |
| 7 | [Hierarchical Planning with Latent World Models (HWM)](https://arxiv.org/abs/2604.03208) | 2026 | CoRL | 最新 | 共有潜在空間で複数時間スケールの JEPA 系世界モデルを学習し、上位予測を下位 MPC のサブゴールにする。Franka P&P 70%。 | ✅ p.8 |
| 8 | [Mind the Gap: Promises and Pitfalls of Hierarchical Planning in LeWorldModel](https://arxiv.org/abs/2607.12547) | 2026 | WM@Booth ワークショップ | 最新 | 凍結 LeWM に上位を後付けした Hi-LeWM の分析。上位 CEM の分布外探索が失敗要因で、データ由来マクロ行動に制約すると改善。 | ✅ p.9 |
| 9 | [Orbis 2: A Hierarchical World Model for Driving](https://arxiv.org/abs/2607.15898) | 2026 | arXiv | 最新 | 抽象（圧縮 DINO, 2Hz）と詳細（10Hz）の2階層予測器による運転世界モデル。長期安定性と表現品質で SOTA。 | ✅ p.10 |
| 10 | [H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning](https://arxiv.org/abs/2610.06805) | 2026 | arXiv | 最新 | 階層ごとに独自の潜在空間を持つ行動条件付き JEPA を end-to-end 学習。AntMaze で平坦 18% → 3階層 73%。 | ✅ p.11 |
| 11 | [A Path Towards Autonomous Machine Intelligence](https://openreview.net/forum?id=BZ5a1r-kVsf) (LeCun) | 2022 | OpenReview（ポジションペーパー v0.9.2） | 原典 | 構成器・知覚・世界モデル・コスト・行為者・短期記憶からなる自律知能アーキテクチャを提案し、多階層・多時間スケールの予測と階層計画を担う H-JEPA を中核に据える（検索情報と #3 の講義ノートに基づく）。 | ⚠️ 本文未確認 |
| 12 | Learning Hierarchical World Models with Adaptive Temporal Abstractions from Discrete Latent Dynamics (THICK) ([OpenReview](https://openreview.net/forum?id=TjCDNssXKU)) | 2024 | ICLR | 発展 | Gumbsch, Sajid, Martius, Butz。下位は潜在の一部を疎にしか更新せず（不変な文脈）、上位は文脈が変わる場面だけを予測する2階層世界モデル。適応的な時間抽象化で MBRL と計画を改善（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 13 | [World Models](https://arxiv.org/abs/1803.10122) | 2018 | NeurIPS 2018（関連版） | 原典 | V（VAE）・M（MDN-RNN）・C の構成で、世界モデルの「夢」の中で方策を学ぶ。世界モデル概念の原典だが単一時間スケールで階層は持たない。 | — 参照のみ（非階層のため） |
| 14 | [A Clockwork RNN](https://arxiv.org/abs/1402.3511) | 2014 | ICML | 原典 | RNN の隠れ層をモジュールに分け異なる周期で更新する。CW-VAE の固定クロックの発想源。 | — 参照のみ（世界モデルではない） |
| 15 | [Temporal Difference Variational Auto-Encoder](https://arxiv.org/abs/1806.03107) | 2018 | ICLR 2019 | 原典 | 信念状態からの跳躍予測（jumpy prediction）を学ぶ系列生成モデル。階層は持たない。 | — 参照のみ（CW-VAE で言及） |
| 16 | [Variational Temporal Abstraction (VTA)](https://arxiv.org/abs/1910.00775) | 2019 | NeurIPS | 発展 | 下位が上位の遷移時刻を決める2階層の状態空間モデルで jumpy imagination を行う。CW-VAE の主要比較対象。 | — 参照のみ（CW-VAE で比較） |
| 17 | [Sparsely Changing Latent States for Prediction and Planning (GateL0RD)](https://arxiv.org/abs/2110.15949) | 2021 | NeurIPS | 発展 | 潜在状態の更新に L0 ペナルティを課し疎に変化させる RNN。THICK の下位層の基盤。 | — 参照のみ（THICK の前身） |
| 18 | [Forecaster: Towards Temporally Abstract Tree-Search Planning from Pixels](https://arxiv.org/abs/2310.09997) | 2023 | arXiv | 発展 | 時間的に抽象化した世界モデル上で高位ゴールの木探索を行う階層RL。 | — 参照のみ（小規模検証） |
| 19 | [Learning World Models With Hierarchical Temporal Abstractions: A Probabilistic Perspective](https://arxiv.org/abs/2404.16078) | 2024 | 博士論文（KIT） | 発展 | MTS3 著者の博士論文。多時間スケール確率的世界モデルの体系化。 | — 参照のみ（MTS3 と重複） |
| 20 | [Exploring the limits of Hierarchical World Models in Reinforcement Learning](https://arxiv.org/abs/2406.00483) | 2024 | arXiv | 発展 | 静的・環境非依存の時間抽象で階層世界モデルとゴール提案エージェントを学習し、HMBRL の限界を評価。 | — 参照のみ（概要確認のみ） |
| 21 | [Simple Hierarchical Planning with Diffusion](https://arxiv.org/abs/2401.02644) | 2024 | arXiv | 発展 | 上位で jumpy に拡散計画し下位で詰める Hierarchical Diffuser。世界モデル型ではなく軌道生成型。 | — 参照のみ（周辺領域） |
| 22 | [LeWorldModel](https://arxiv.org/abs/2603.19312) | 2026 | arXiv | 発展 | 2項の損失（次埋め込み予測＋SIGReg）だけで画素から安定に end-to-end 学習する JEPA 世界モデル。H-JEPA・Hi-LeWM の第1層。 | — 参照のみ（非階層の基盤） |
| 23 | [Compositional Planning with Jumpy World Models](https://arxiv.org/abs/2602.19634) | 2026 | arXiv | 最新 | 事前学習方策が誘導する多時間スケールの状態占有を TD Flow で学ぶ jumpy world model により方策の合成を計画。 | — 参照のみ（方策合成寄り） |
| 24 | [FF-JEPA: Long-Horizon Planning in World Models with Latent Planners](https://arxiv.org/abs/2606.09311) | 2026 | arXiv | 最新 | 行動なしの潜在プランナーが次のサブゴールを予測し、行動条件付き予測器と組み合わせて目標画像なしで長期計画。 | — 参照のみ（概要確認のみ） |
| 25 | [Metro-WM: Long-Horizon Latent Planning with Realisable Sub-Goals](https://arxiv.org/abs/2609.31868) | 2026 | arXiv | 最新 | 生成した潜在サブゴールは物理的に実現不能になりがちと指摘し、経験から実在の状態をグラフ検索してサブゴールにする。 | — 参照のみ（Hi-LeWM と論点が重複） |
| 26 | [Learning Goal-Conditioned Subgoals through Frozen Hierarchical World Models](https://arxiv.org/abs/2610.26179) | 2026 | arXiv | 最新 | H-JEPA 配布の HWM チェックポイント上で、上位の候補最適化を軽量なゴール条件付きネットワークに置き換える。 | — 参照のみ（直近・小規模） |
| 27 | [MHWA: Multi-timescale Hierarchical World-Action Model](https://arxiv.org/abs/2610.14727) | 2026 | arXiv | 最新 | ストライド付き高位文脈チャネルと文脈依存の専門家混合で自己回帰世界モデルのドリフトを抑える。 | — 参照のみ（概要確認のみ） |
