## 局所則の世界モデル・推論器としての NCA（nca-world-models/）

### 調査履歴
- 2026-10-24: `candidates/neural-cellular-automata.md` の 3.1〜3.3（Reasoning NCA、NCA Pre-pre-training、Why WMs Fail to Learn CA）を起点にした。arXiv API で `abs:"neural cellular automata"`（新着順 120 件）、`"cellular automata" AND "world model"`、`"cellular automata" AND (LLM / transformer pretraining / reasoning / test-time / diffusion)` を検索し、2025〜26 年の現在地を確認した。そこから4本の系譜を遡った。(a) 局所則の学習：Reasoning NCA → NCA for ARC-AGI / ARC-NCA → Self-classifying MNIST → Growing NCA → CA as CNN。(b) CA データによる事前学習：NCA Pre-pre-training → Edge of Chaos → LifeGPT 系。(c) 世界モデルの診断：Why WMs Fail → Gilpin・Springer & Kenyon・Vafa ら。(d) Transformer・拡散との融合：ViTCA・Diff-NCA。
- 本文は arXiv 版（HTML/PDF）で全文を読んだ。Distill の2本（Growing NCA、Self-classifying MNIST）は distill.pub に到達できなかった。そこで Distill 公式の GitHub リポジトリ（distillpub/post--growing-ca、distillpub/post--selforg-mnist）にある公開版 HTML で全文を読み、図もそこから取った。
- 分野横断の重複確認：既存デッキでスライド化済みの論文はない。世界モデル分野の Hallucination in WMs（foundation-world-model）だけを参照した。同分野の learned-collective（Smart Cellular Bricks、NPA など）と nca-hardware（DiffLogic CA など）は別担当なので、参照のみにした。

### 系譜
```
[局所則の学習 → 分散推論 → 推論器]
CA as CNN (Gilpin 2019, CA=畳み込み+1×1 で厳密表現)
  └→ Growing NCA (2020, 連続状態・確率的非同期更新・サンプルプール・損傷学習)
        ├→ Self-classifying MNIST (2020, 局所通信で大域ラベルに合意＝分散推論の原点)
        │     └→ NCA for ARC-AGI (Xu & Miikkulainen, ALIFE 2025) ／ ARC-NCA (Guichard+ 2025)
        │           └→ Reasoning NCA (Etcheverry+ 2026, 迷路・数独・ARC、テスト時スケーリング、分散適応計算)
        │                 ┆ 同時期: Adaptive NCA (Spitznagel & Keuper 2026), Pathfinding NCA (2023) が迷路の前段
        ├→ ViTCA (NeurIPS 2022, 局所化した自己注意の NCA) → AdaNCA (2024)
        └→ Diff-NCA / FourierDiff-NCA (2024, NCA を拡散の denoiser に、フーリエ空間で大域通信)

[CA の軌道で Transformer を事前学習]
ECA 予測 (LifeGPT 2024, Burtsev 2024)
  └→ Intelligence at the Edge of Chaos (ICLR 2025, ECA の複雑さと下流転移)
        └→ NCA Pre-pre-training (Lee+ 2026, ランダム NCA 軌道で 1.6B LLM を言語の前に学習)
              ┆ 理論的背景: Epiplexity (Finzi+ 2026)

[世界モデルは CA 規則を学べるか（診断）]
CA as CNN (2019) ─ It's Hard to Learn the Game of Life (2021) ─ Vafa+ (2024, 生成モデルの暗黙の世界モデル評価)
  └→ Why WMs Fail to Learn CA (Guo & Liu 2026, 空間局所性・時間局所性・時間安定性の3欠落)
        ┆ 関連: Diffusion Forcing (2024, causal freezing), Hallucination in WMs (既存: world-model/foundation-world-model)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Cellular automata as convolutional neural networks](https://arxiv.org/abs/1809.02942) | 2019 | Phys. Rev. E | 原典 | 任意の CA が 3×3 畳み込みと 1×1 畳み込みで厳密に表せることを示し、2560 規則を勾配学習して内部表現を解析した。 | ✅ p.2 |
| 2 | [Growing Neural Cellular Automata](https://distill.pub/2020/growing-ca/)（読んだ版: [GitHub 公開版](https://github.com/distillpub/post--growing-ca)） | 2020 | Distill | 原典 | 種1セルから形を成長・維持・再生させる NCA。確率的非同期更新・サンプルプール・損傷学習という以後の標準レシピを確立した。 | ✅ p.3 |
| 3 | [Self-classifying MNIST Digits](https://distill.pub/2020/selforg/mnist/)（読んだ版: [GitHub 公開版](https://github.com/distillpub/post--selforg-mnist)） | 2020 | Distill | 発展 | セル集団が局所通信だけで数字ラベルに合意する。L2 損失＋ノイズで全一致率 88% を安定に保った。 | ✅ p.4 |
| 4 | [Attention-based Neural Cellular Automata (ViTCA)](https://arxiv.org/abs/2211.01233) | 2022 | NeurIPS | 発展 | 3×3 近傍に局所化した自己注意を更新則にした NCA。ノイズ除去で ViT・U-Net・UNetCA を概ね上回り、損傷や解像度変更にも頑健。 | ✅ p.5 |
| 5 | [Frequency-Time Diffusion with Neural Cellular Automata](https://arxiv.org/abs/2401.06291) | 2024 | arXiv | 発展 | NCA を拡散の denoiser にした Diff-NCA と、フーリエ空間で大域通信する FourierDiff-NCA。1.1M パラメータで CelebA の FID 43.86。 | ✅ p.6 |
| 6 | [Intelligence at the Edge of Chaos](https://arxiv.org/abs/2410.02536) | 2025 | ICLR | 発展 | ECA の軌道で GPT-2 を事前学習。規則が複雑（Class IV）なほど推論・チェスへの転移が良く、複雑すぎても悪い。 | ✅ p.7 |
| 7 | [Neural Cellular Automata for ARC-AGI](https://arxiv.org/abs/2506.15746) | 2025 | ALIFE | 発展 | タスクごとに NCA を数分で勾配学習し、対象 172 タスク中 23 を完全正解。失敗の主因は訓練例の丸暗記。 | ✅ p.8 |
| 8 | [Training Language Models via Neural Cellular Automata](https://arxiv.org/abs/2603.10055) | 2026 | arXiv（二次情報では NeurIPS 2026、未確認） | 最新 | ランダム NCA の軌道 164M トークンで LLM を言語の前に事前学習。PPL を最大 6% 改善し、収束は 1.6 倍速い。C4 1.6B トークンより良い。 | ✅ p.9 |
| 9 | [Reasoning with Neural Cellular Automata](https://arxiv.org/abs/2609.36126) | 2026 | arXiv | 最新 | 局所・非同期の NCA で迷路・数独・ARC-AGI-1 を解く。テスト時スケーリング（格子・時間・並列試行＋刈り込み）と分散適応計算を備える。 | ✅ p.10 |
| 10 | [Why Do Conventional World Models Fail to Learn Cellular Automata?](https://arxiv.org/abs/2609.39604) | 2026 | arXiv | 最新 | CA で世界モデルの長期ロールアウトを診断。空間局所性・時間局所性・時間安定性の欠落を、2D RoPE・前フレーム近傍・causal freezing で直した。 | ✅ p.11 |
| 11 | [ARC-NCA: Towards Developmental Solutions to the Abstraction and Reasoning Corpus](https://arxiv.org/abs/2505.08778) | 2025 | arXiv（ALIFE 2025） | 発展 | 標準 NCA と隠れ記憶付きの EngramNCA を ARC に適用し、262 の固定サイズタスクで最大 12.9%（ChatGPT 4.5 は 10.3%、Table 2）。同時期の #7 を代表として選んだため、本文は概要と結果表のみ確認。 | — 参照のみ |
| 12 | [2D Spatial Reasoning with Adaptive Neural Cellular Automata](https://arxiv.org/abs/2610.08518) | 2026 | arXiv | 最新 | 空間的に可変でデータ適応的な知覚場を持つ aNCA を提案し、数独・画像数独・迷路で SOTA を主張する。#9 と同時期で課題も重なるため、冒頭のみ確認。 | — 参照のみ |
| 13 | [Pathfinding Neural Cellular Automata](https://arxiv.org/abs/2301.06820) | 2023 | arXiv | 発展 | 迷路の最短路を NCA で解く先行例で、#9 が参照している。未読。 | — 参照のみ |
| 14 | [Can You Learn an Algorithm? Generalizing from Easy to Hard Problems with Recurrent Networks](https://arxiv.org/abs/2106.04537) | 2021 | arXiv | 関連 | 再帰網の反復を増やして小さな迷路から大きな迷路へ外挿する DeepThinking 系。#9 のベースライン（後継は [2202.05826](https://arxiv.org/abs/2202.05826)）。未読。 | — 参照のみ |
| 15 | [Less is More: Recursive Reasoning with Tiny Networks (TRM)](https://arxiv.org/abs/2510.04871) | 2025 | arXiv | 関連 | 大域結合の小型再帰推論モデル。#9 の ARC での比較対象。未読。 | — 参照のみ |
| 16 | [LifeGPT](https://arxiv.org/abs/2409.12182) | 2024 | arXiv | 関連 | Game of Life を GPT で予測する。#10 によると画素精度は高いが、完全ロールアウトは 64.2%。未読。 | — 参照のみ |
| 17 | [AutomataGPT](https://arxiv.org/abs/2506.17333) | 2025 | arXiv | 関連 | 2次元 CA の予測と規則推定を Transformer で行う。#10 が画素精度評価の例として挙げる。未読。 | — 参照のみ |
| 18 | [Learning Elementary Cellular Automata with Transformers](https://arxiv.org/abs/2412.01417) | 2024 | arXiv | 関連 | Transformer による ECA 規則学習。#10 の関連研究。未読。 | — 参照のみ |
| 19 | [It's Hard for Neural Networks To Learn the Game of Life](https://arxiv.org/abs/2009.01398) | 2020 | arXiv | 関連 | 最小構成の CNN では Game of Life の学習が難しいと示した。#10 と #1 の議論に関わる。未読。 | — 参照のみ |
| 20 | [Evaluating the World Model Implicit in a Generative Model](https://arxiv.org/abs/2406.03689) | 2024 | NeurIPS | 関連 | 生成モデルが予測は良くても世界モデルを回復しないことを示す評価法。#10 の問題意識の源。未読。 | — 参照のみ |
| 21 | [Diffusion Forcing: Next-token Prediction Meets Full-Sequence Diffusion](https://arxiv.org/abs/2407.01392) | 2024 | NeurIPS | 関連 | フレームごとのノイズ水準で系列を拡散生成する。#10 の causal freezing の出典。未読。 | — 参照のみ |
| 22 | [From Entropy to Epiplexity](https://arxiv.org/abs/2601.03220) | 2026 | arXiv | 関連 | 計算資源に限りのある観測者にとっての情報量（epiplexity）。#8 が「決定論的な CA から学べる理由」として引用。未読。 | — 参照のみ |
| 23 | [Fractal basins trap latent reasoning](https://arxiv.org/abs/2609.04963) | 2026 | arXiv | 関連 | 再帰推論モデルの状態空間がフラクタルな吸引域を持つ（Gilpin ら）。#9 がテスト時探索の動機として引用。未読。 | — 参照のみ |
| 24 | [Variational Neural Cellular Automata](https://arxiv.org/abs/2201.12360) | 2022 | ICLR | 発展 | NCA を VAE のデコーダにした生成モデル。#5 の比較対象（FID 299.9）。未読。 | — 参照のみ |
| 25 | [AdaNCA: Neural Cellular Automata As Adaptors For More Robust Vision Transformer](https://arxiv.org/abs/2406.08298) | 2024 | arXiv | 発展 | ViT の層間に NCA を挟んで頑健性を上げる。ViTCA の逆向きの融合。未読。 | — 参照のみ |
| 26 | [Neural Cellular Automata and Deep Equilibrium Models](https://arxiv.org/abs/2501.03573) | 2025 | arXiv | 関連 | NCA の不動点を DEQ として捉える。ViTCA が挙げた「陰的微分で BPTT のメモリ問題を避ける」方向の具体例。未読。 | — 参照のみ |
| 27 | [Learning Locally Interacting Discrete Dynamical Systems](https://arxiv.org/abs/2404.06460) | 2024 | L4DC | 関連 | 局所相互作用する離散力学系を、データ効率よくスケーラブルに予測する。局所性の帰納バイアスを持つ世界モデルの先行例。未読。 | — 参照のみ |
| 28 | [Learning PDE Time-Stepping with Neural Cellular Automata](https://arxiv.org/abs/2608.30328) | 2026 | arXiv | 関連 | NCA を PDE の時間発展ソルバとして学習する。#10 の連続系への拡張と対になる。未読。 | — 参照のみ |
| 29 | [Differentiable Logic Cellular Automata](https://arxiv.org/abs/2506.04912) | 2025 | arXiv | 関連 | 論理ゲート網で CA 規則を学ぶ。#7 が解釈性の方向として挙げる。nca-hardware 担当のため参照のみ。 | — 参照のみ |
| 30 | [Self-Organising Textures](https://distill.pub/selforg/2021/textures) | 2021 | Distill | 発展 | Growing NCA の続編で、テクスチャを生成する NCA。本テーマの軸（推論・世界モデル）から外れるため未読。 | — 参照のみ |
| 31 | [A New Kind of Network? Review and Reference Implementation of NCA](https://arxiv.org/abs/2604.24990) / [Applications of NCA: State of the Art](https://arxiv.org/abs/2609.24595) | 2026 | arXiv | サーベイ | 2026 年の NCA サーベイ2本。入口として有用。未読。 | — 参照のみ |
| 32 | [Hallucination in World Models is Predictable and Preventable](https://arxiv.org/abs/2606.27326)（Hansen+ 2026） | 2026 | arXiv | 関連 | 世界モデルの幻覚の分析。#10 の長期崩壊診断と対で読むとよい。 | ↪ 既存：world-model/foundation-world-model p.10 |
