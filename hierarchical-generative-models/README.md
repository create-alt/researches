## 階層的・多時間スケール生成モデル（hierarchical-generative-models/）

### 調査履歴
- 2026-10-24: `candidates/active-inference.md` のテーマ案2を起点に、arXiv API で "hierarchical active inference"・"renormalising generative"・"PV-RNN"・"multiple timescale"＋"active inference"、著者（Jun Tani / Shingo Murata / Rajesh P. N. Rao / Karl Friston）を検索し、2025–26年の最新（SR 階層 AIF、RGM の再現実装、Habitat での階層 AIF、PV-RNN の精度自律調整）から入った。
- そこから3つの系譜を原典まで遡った。①Rao 系：Rao & Ballard 1999 → APC 2022 → SR 階層 AIF 2026。②Friston 系：HDM 2008 →（Deep temporal models 2017）→ RGM 2024 → Zaghw+ 2026。③谷研系：MTRNN 2008 → PV-RNN 2019 → Oyama+ 2026（と Fujii & Murata 2025）。
- Rao & Ballard 1999 は出版社版が閉じているが、著者（Rao）の UW ページで公開されている PDF で全文を読んだ。Friston 2008・MTRNN は PLoS の OA 版、Deep temporal models は PMC の HTML 版で読んだ。
- Fujii & Murata 2025 は全文を読んだが、同分野 `deep-active-inference` でスライド化済みのため本デッキからは外した（調整役からの重複通知による）。

### 系譜
```
[知覚の階層]  Rao & Ballard 1999（予測符号化）
                 │                       └──────────────┐
[Friston 系]  HDM (Friston 2008) ── Deep temporal models (2017, 離散・入れ子時間) ── RGM (2024, くりこみ) ── Zaghw+ 2026（導出と検証済み実装）
                 │                                                                    └ 連続/離散ハイブリッド階層 → Pezzato+ 2025（Habitat）
[Rao 系]                                    APC (Rao+ 2022, 状態・行動の階層) ── SR 階層 AIF (Rangarajan & Rao 2026)
[谷研系]      MTRNN (Yamashita & Tani 2008) ── PV-RNN (2019, 確率的・メタ事前分布) ── Oyama+ 2026（精度の自律調整）
                                            └─ Fujii & Murata 2025（slow/fast 世界モデル＋抽象行動, 既存：deep-active-inference）
[世界モデル側の姉妹系譜] CW-VAE / Director / HWM / H-JEPA …（既存：world-model/hierarchical）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Predictive coding in the visual cortex: a functional interpretation of some extra-classical receptive-field effects](https://doi.org/10.1038/4580)（[著者公開 PDF](https://homes.cs.washington.edu/~rao/Rao-Ballard-NN-1999.pdf)） | 1999 | Nature Neuroscience | 原典 | 上位が予測・下位が誤差を送る階層的予測符号化。端点抑制を誤差ニューロンの応答として再現。 | ✅ p.2 |
| 2 | [Hierarchical Models in the Brain](https://doi.org/10.1371/journal.pcbi.1000211) | 2008 | PLoS Comput. Biol. | 原典 | 状態空間モデルを積み重ねた階層動的モデル（HDM）と DEM による反転。皮質回路への対応づけ。 | ✅ p.3 |
| 3 | [Emergence of Functional Hierarchy in a Multiple Timescale Neural Network Model: A Humanoid Robot Experiment](https://doi.org/10.1371/journal.pcbi.1000220) | 2008 | PLoS Comput. Biol. | 原典 | 時定数の違いだけで運動プリミティブと系列の機能階層が創発する MTRNN。 | ✅ p.4 |
| 4 | [A Novel Predictive-Coding-Inspired Variational RNN Model for Online Prediction and Recognition](https://arxiv.org/abs/1811.01339) | 2019 | Neural Computation | 発展 | MTRNN に確率的潜在変数とメタ事前分布 w、誤差回帰を加えた PV-RNN。 | ✅ p.5 |
| 5 | [Active Predictive Coding: A Unified Neural Framework for Learning Hierarchical World Models for Perception and Planning](https://arxiv.org/abs/2210.13461) | 2022 | arXiv（改訂版 Neural Computation 2024, [doi](https://doi.org/10.1162/neco_a_01627)） | 発展 | ハイパーネットで下位の状態遷移と方策（オプション）を生成する状態-行動階層。 | ✅ p.6 |
| 6 | [From pixels to planning: scale-free active inference](https://arxiv.org/abs/2407.20292) | 2024 | arXiv（Front. Netw. Physiol. 2025） | 発展 | 経路を潜在変数に持つ離散 POMDP をくりこみ群で積み上げた RGM。画像・動画・音・ゲーム。 | ✅ p.7 |
| 7 | [Mobile Manipulation with Active Inference for Long-Horizon Rearrangement Tasks](https://arxiv.org/abs/2507.17338) | 2025 | IWAI 2025（CCIS 2026） | 最新 | 離散上位 AIF＋連続階層 AIF 全身制御で Habitat 3タスクの最先端を上回る。 | ✅ p.8 |
| 8 | [Hierarchical Active Inference using Successor Representations](https://arxiv.org/abs/2604.15679) | 2026 | Neural Computation | 最新 | SR のクラスタリングでマクロ状態、AIF でマクロ行動を学ぶ階層的能動的推論。 | ✅ p.9 |
| 9 | [Renormalising Generative Models for Active Inference: Foundations, Derivations, and Verification](https://arxiv.org/abs/2608.09512) | 2026 | IWAI 2026 | 最新 | RGM の導出のやり直しと、SPM 実装の Python 翻訳をオラクルテストで検証。 | ✅ p.10 |
| 10 | [Predictive-Coding-Based Autonomous Regulation of Internally Generated and Externally Coupled Processing in Human-Robot Interaction](https://arxiv.org/abs/2609.06888) | 2026 | arXiv プレプリント | 最新 | 再構成誤差の履歴で PV-RNN のメタ事前分布を自律的に切り替え、物理 HRI で評価。 | ✅ p.11 |
| 11 | [Real-World Robot Control by Deep Active Inference With a Temporally Hierarchical World Model](https://arxiv.org/abs/2512.01924) | 2025 | IEEE RA-L | 最新 | slow/fast 世界モデル＋VQ 抽象行動＋抽象世界モデルで EFE を高速評価（全文確認済み）。 | ↪ 既存：active-inference/deep-active-inference p.10 |
| 12 | [Deep temporal models and active inference](https://doi.org/10.1016/j.neubiorev.2018.04.004)（[PMC 版](https://pmc.ncbi.nlm.nih.gov/articles/PMC5998386/)） | 2017 | Neurosci. Biobehav. Rev.（2018 年に再掲） | 原典 | 上位状態が下位系列の初期状態を生成する入れ子時間の離散 AIF。読書の眼球運動、MMN・P300 を再現。PMC の HTML で全文を読んだが、図画像の配信元（cdn.ncbi）に到達できずスライド化を見送った。 | — 参照のみ |
| 13 | [AXIOM: Learning to Play Games in Minutes with Expanding Object-Centric Models](https://arxiv.org/abs/2505.24784) | 2025 | arXiv | 最新 | 勾配なしで成長するオブジェクト中心の AIF 世界モデル（RGM と同じ VERSES 系）。 | ↪ 既存：active-inference/deep-active-inference p.9 |
| 14 | [Schema-based active inference supports rapid generalization …](https://arxiv.org/abs/2601.18946) | 2026 | arXiv | 最新 | 上位が抽象タスク構造（スキーマ）、下位が空間ナビゲーションの2層 AIF。mPFC の符号を再現（アブストラクトのみ確認）。 | — 参照のみ |
| 15 | [Hybrid Recurrent Models Support Emergent Descriptions for Hierarchical Planning and Control](https://arxiv.org/abs/2408.10970) | 2024 | IWAI 2024 workshop | 発展 | rSLDS の離散モードをオプション的サブゴールとして上位 MDP で計画（アブストラクトのみ確認）。 | — 参照のみ |
| 16 | [Spatial and Temporal Hierarchy for Autonomous Navigation using Active Inference in Minigrid Environment](https://arxiv.org/abs/2312.05058) | 2024 | Entropy | 発展 | 空間と時間の2種の階層を持つ AIF ナビゲーション（検索結果のみ）。 | — 参照のみ |
| 17 | [Deep AIF with Diffusion Policy and Multiple Timescale World Model for Real-World Exploration and Navigation](https://arxiv.org/abs/2510.23258) | 2025 | arXiv | 最新 | 拡散方策で候補行動を出し MTRSSM で EFE を評価する実ロボットナビ（アブストラクトのみ）。deep-active-inference 側の領域。 | — 参照のみ |
| 18 | [Dynamic planning in hierarchical active inference](https://arxiv.org/abs/2402.11658) | 2024 | Neural Networks 2025 | 発展 | 連続/離散の階層 AIF による動的計画（Pezzato+ の基盤の一つ、書誌のみ）。 | — 参照のみ |
| 19 | [Free-Energy-Gated Plasticity for Real-Time Online Motor Learning in Physical Human-Robot Interaction](https://arxiv.org/abs/2608.23000) | 2026 | arXiv | 最新 | 自由エネルギーでゲートされる PV-RNN のオンライン学習（谷研、書誌のみ）。 | — 参照のみ |
| 20 | [Lessons from Neuroscience for AI: How integrating Actions, Compositional Structure and Episodic Memory …](https://arxiv.org/abs/2512.22568) | 2025 | arXiv | 最新 | Rao らによる APC 系の展望論文（書誌のみ）。 | — 参照のみ |
| 21 | Pezzulo, Rigoli, Friston "Hierarchical active inference: a theory of motivated control"（[doi](https://doi.org/10.1016/j.tics.2018.01.009)） | 2018 | Trends Cogn. Sci. | 発展 | 動機づけ制御を階層 AIF で説明する理論レビュー（検索情報に基づく）。OA 版を見つけられなかった。 | ⚠️ 本文未確認 |
| 22 | Kiebel, Daunizeau, Friston "A hierarchy of time-scales and the brain"（[doi](https://doi.org/10.1371/journal.pcbi.1000209)） | 2008 | PLoS Comput. Biol. | 原典 | 上位ほど遅い時間スケールを持つ皮質階層の仮説（MTRNN と同号）。時間の都合で未読。 | — 参照のみ |
| 23 | [CW-VAE: Clockwork Variational Autoencoders](https://arxiv.org/abs/2102.09532) | 2021 | NeurIPS | 発展 | 上位ほど遅く更新される時間階層の潜在動力学（世界モデル側）。 | ↪ 既存：world-model/hierarchical p.2 |
| 24 | [Deep Hierarchical Planning from Pixels (Director)](https://arxiv.org/abs/2206.04114) | 2022 | NeurIPS | 発展 | 世界モデル内で上位がサブゴールを出す階層 RL（APC と対比）。 | ↪ 既存：world-model/hierarchical p.3 |

### メモ（重複・範囲）
- 世界モデル分野の階層化（CW-VAE, Director, HWM, H-JEPA など）は `world-model/hierarchical` に任せ、本デッキは「生成モデルの階層を自由エネルギー／予測符号化で扱う系譜」に絞った。
- Fujii & Murata 2025 と AXIOM は `deep-active-inference` でスライド化済みのため参照のみとした。
