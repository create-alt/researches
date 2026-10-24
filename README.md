# ニューラルセルオートマトン・自己組織化 — 先行研究調査

すべてのセルが同じ小さなニューラルネット（局所更新則）を共有し、近傍とのやりとりだけで形・判断・推論が創発するニューラルセルオートマトン（NCA）について、推論器・世界モデルとしての利用、学習される群知能、ハードウェア化の観点から系譜をまとめる。群知能・SNN・世界モデルの3分野にまたがる。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/ochiai/`）は main ブランチから引き継いでいる。

## テーマ一覧

| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- | --- |
| 第1回 | [局所則の世界モデル・推論器としての NCA](#nca-world-models) | CA＝CNN・Growing NCA・Self-classifying MNIST から、ViTCA・Diff-NCA、ARC-AGI・Reasoning NCA、NCA データによる言語モデル事前学習まで | [pptx](nca-world-models/nca-world-models.pptx) / [pdf](nca-world-models/nca-world-models.pdf) | 10 本 | 32 本 | 2026-10-24 |
| 第1回 | [学習される群知能：NCA から物理モジュール・ロボット群へ](#learned-collective) | GNN 群制御・自己組立エージェントから、ソフトロボットの再生、Physical NCA、Morphobots、Smart Cellular Bricks、粒子 NCA まで | [pptx](learned-collective/learned-collective.pptx) / [pdf](learned-collective/learned-collective.pdf) | 10 本 | 31 本 | 2026-10-24 |
| 第1回 | [離散・非同期 NCA のハードウェア化](#nca-hardware) | μNCA・DiffLogic・Spiking NCA から、光 NCA、DiffLogic CA、組込み NCA、自己組織化デジタル回路まで | [pptx](nca-hardware/nca-hardware.pptx) / [pdf](nca-hardware/nca-hardware.pdf) | 9 本 | 28 本 | 2026-10-24 |

合計：スライド化 29 本、引用論文一覧 91 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-24 | 第1回調査（分野新設）。main の候補分野メモ（candidates/）を出発点に、「局所則の世界モデル・推論器としての NCA」、「学習される群知能：NCA から物理モジュール・ロボット群へ」、「離散・非同期 NCA のハードウェア化」 の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版（OpenReview・学会予稿集・OA 誌・著者公開版など）で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典は ⚠️ 本文未確認として一覧に記載。 既存デッキ（他分野を含む）でスライド化済みの論文は再掲せず、一覧で `↪ 既存：<theme> p.N` として参照。同じ回の別テーマで同じ論文を別の観点からスライド化した例が一部ある。 |

## 追加調査を推奨するテーマ

これまでの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。

1. **再帰・ループ型推論とテスト時スケーリング（NCA と HRM・TRM・LoopViT の比較）**  
   Reasoning NCA や ARC での NCA は、反復回数を増やすほど解ける問題が増える再帰推論器として振る舞う。同じ性質を持つ他の再帰モデルと同じ軸で比較する。

2. **実機で学習しながら動く群と、駆動を伴う自己組立**  
   学習される群知能テーマでは、局所則の学習はほぼシミュレーション内で、実機でのオンライン学習や、自ら動いて形を作る自己組立は少なかった。sim-to-real と合わせて追う。

3. **NCA の量子化・非同期更新・故障への頑健性**  
   NCA を FPGA やニューロモルフィックチップに実装した研究は見つからず、量子化しても動くという主張も定性的だった。ハードウェア化の前提となる頑健性の理論と評価法を調べる。

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は既存デッキ（他分野の場合は `<field>/<theme>`）でスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。

---

<a id="nca-world-models"></a>

## 局所則の世界モデル・推論器としての NCA（nca-world-models/）

資料：[nca-world-models.pptx](nca-world-models/nca-world-models.pptx) ／ [nca-world-models.pdf](nca-world-models/nca-world-models.pdf) ／ 生成元 [spec.json](nca-world-models/spec.json)


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

---

<a id="learned-collective"></a>

## 学習される群知能：NCA から物理モジュール・ロボット群へ（learned-collective/）

資料：[learned-collective.pptx](learned-collective/learned-collective.pptx) ／ [learned-collective.pdf](learned-collective/learned-collective.pdf) ／ 生成元 [spec.json](learned-collective/spec.json)


### 調査履歴
- 2026-10-24: candidates/neural-cellular-automata.md の NPA（2026）と Smart Cellular Bricks（2025）を起点に、arXiv API と Web 検索で「neural cellular automata × robot / swarm / modular」「GNN × decentralized swarm」「learned self-assembly / morphogenesis」の 2024〜2026 年の論文を探した。そこから3本の系譜を原典まで遡った。①格子 NCA の物理化（Growing NCA → ソフトロボット再生 → 物理タイル → 物理ブロック）。②動く近傍の局所則（GNN 群制御 → GNCA → 同変 GNN・NPA・DiffeoMorph）。③強化学習・社会学習で局所則を得る群（自己組立する肢、Kilobot 実機での分散学習）。
- 比較の視点として、手設計の局所則（Reynolds の Boids、Tanner の群れ則、Kilobot の行動表、Slavkov らの Turing パターン）を学習則がどこまで置き換えたか・何を取り戻したか（対称性・頑健性）を各スライドの s2/s5 に書いた。
- Growing NCA と Self-classifying MNIST は同分野の nca-world-models で、Spiking NCA と組込み NCA は nca-hardware でスライド化済みのため、本デッキでは参照のみとした（コーディネータの重複通知に従い、Growing NCA のスライドは物理 NCA（Walker+ 2022）に差し替えた）。
- Kilobot 自己組立（Rubenstein+ 2014）と Morphogenesis in robot swarms（Slavkov+ 2018）は、OpenAlex/Semantic Scholar で OA 版（ブリストル大学・CWI のリポジトリ）を確認したが本環境から到達できず、本文未確認とした。

### 系譜
```
[格子 NCA の物理化]
Growing NCA (2020, 既存:nca-world-models) ─┬→ Regenerating Soft Robots (Horibe+ 2021) → Severe Damage Recovery (2022)
Self-classifying MNIST (2020, 既存) ───────┴→ Physical NCA (Walker+ 2022) → Smart Cellular Bricks (Moreno+ 2025/26)

[動く近傍の局所則（手設計の群れ則 → 学習則）]
Reynolds Boids (1987) / Tanner 群れ則 (2003)  ※手設計
   ├→ GNN 群制御 (Tolstaya+ 2019, 模倣学習) → Equivariant TDAGNN (Transue & Wang 2025)
   └→ GNCA (Grattarola+ 2021, Boids を学び直す) → NPA (Kim+ 2026, 粒子 NCA) → DiffeoMorph (Pahng+ 2025/26, SE(3) 同変)
Growing NCA ───────────────────────────────────→ NPA

[RL・社会学習で局所則を得る群]
Kilobot (Rubenstein+ 2014) / Slavkov+ 2018  ※手設計 ─→ Morphobots (Ben Zion+ 2023, 実機 64 台の分散学習)
Self-Assembling Agents (Pathak+ 2019, RL + 動的 GNN) → Shared Modular Policies (2020) / Local self-attention VSR (Pigozzi+ 2022)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Learning Decentralized Controllers for Robot Swarms with Graph Neural Networks](https://arxiv.org/abs/1903.10527) | 2019 | CoRL | 原典 | 集中型の群れ制御を集約型 GNN で模倣し、局所通信だけの分散則を学習。手設計の局所則より群れを保つ。 | ✅ p.2 |
| 2 | [Learning to Control Self-Assembling Morphologies: A Study of Generalization via Modularity](https://arxiv.org/abs/1902.05546) | 2019 | NeurIPS | 原典 | 磁石で連結する肢が共有方策（動的グラフ NN）で自ら組み上がり、肢数・地形の変化にゼロショット汎化。 | ✅ p.3 |
| 3 | [Regenerating Soft Robots through Neural Cellular Automata](https://arxiv.org/abs/2102.02579) | 2021 | EuroGP | 発展 | GA で進化させた NCA がボクセルロボットを成長させ、損傷後に体を再生して歩行能力を一部回復。 | ✅ p.4 |
| 4 | [Learning Graph Cellular Automata](https://arxiv.org/abs/2110.14237) | 2021 | NeurIPS | 発展 | GNN で任意グラフ上の CA 遷移則を学習。Boids の群れを観測から学び直し、点群を目標形へ収束させた。 | ✅ p.5 |
| 5 | [Physical Neural Cellular Automata for 2D Shape Classification](https://arxiv.org/abs/2203.07548) | 2022 | IROS | 発展 | Arduino タイル20枚が同じ NCA を実行し、隣接通信だけで0〜9の形に合意。学習していない縮小形にも汎化。 | ✅ p.6 |
| 6 | [Morphological computation and decentralized learning in a swarm of sterically interacting robots](https://arxiv.org/abs/2111.06953) | 2023 | Science Robotics | 発展 | 外骨格付き Kilobot 64 台が、方策と報酬を近傍とだけ交換する社会学習で走光性を獲得（ランダム配置の約8倍）。 | ✅ p.7 |
| 7 | [Learning Decentralized Swarms Using Rotation Equivariant Graph Neural Networks](https://arxiv.org/abs/2502.17612) | 2025 | arXiv | 最新 | 群れ制御 GNN に O(2) 同変性を入れ、データ70%減・重み75%減で同等性能、汎化誤差の上界も半減。 | ✅ p.8 |
| 8 | [Smart Cellular Bricks for Decentralized Shape Classification and Damage Recovery](https://arxiv.org/abs/2509.18659) | 2025 | Nature Communications 2026 | 最新 | 約200個の立方体 PCB が 3D-NCA で形のクラスに合意（実機100%、シミュ98.97%）。損傷方向検出90%超。 | ✅ p.9 |
| 9 | [DiffeoMorph: Learning to Morph 3D Shapes Using Differentiable Agent-Based Simulations](https://arxiv.org/abs/2512.17129) | 2025 | arXiv | 最新 | SE(3) 同変 GNN を共有するエージェント群の形態形成則を、Zernike スペクトル損失で微分学習。GNCA・NPA より回転に頑健。 | ✅ p.10 |
| 10 | [Neural Particle Automata: Learning Self-Organizing Particle Dynamics](https://arxiv.org/abs/2601.16096) | 2026 | SIGGRAPH 2026（研究室告知） | 最新 | NCA を SPH 知覚の粒子系に一般化。形態形成・粒子テクスチャ・点群 MNIST 分類 98.42%、未学習の損傷から再生。 | ✅ p.11 |
| 11 | [Growing Neural Cellular Automata](https://distill.pub/2020/growing-ca/) | 2020 | Distill | 原典 | 共有の局所則 NN で種から形を成長・再生させる NCA の原典。サンプルプールと損傷付き学習。 | ↪ 既存：nca-world-models p.3 |
| 12 | [Self-classifying MNIST Digits](https://distill.pub/2020/selforg/mnist/) | 2020 | Distill | 原典 | 局所通信だけでセル群が数字のクラスに合意する分散分類の起点。物理タイル・ブロックの直接の祖先。 | ↪ 既存：nca-world-models p.4 |
| 13 | [Collective control of modular soft robots via embodied Spiking Neural Cellular Automata](https://arxiv.org/abs/2204.02099) | 2022 | Cells2Societies@ICLR WS | 発展 | ボクセルロボットの各モジュールをスパイキング NCA で制御。 | ↪ 既存：nca-hardware p.4 |
| 14 | [A Rotation-Invariant Embedded Platform for (Neural) Cellular Automata](https://arxiv.org/abs/2510.07440) | 2025 | ALIFE | 最新 | 回転不変の組込み NCA モジュール基板。 | ↪ 既存：nca-hardware p.9 |
| 15 | [Deep Reinforcement Learning for Swarm Systems](https://arxiv.org/abs/1807.06613) | 2019 | JMLR | 原典 | 近傍観測の平均埋め込みによる群ロボットの DRL 方策。 | ↪ 既存：swarm-intelligence/deep-learning-fusion p.3 |
| 16 | Programmable self-assembly in a thousand-robot swarm（Rubenstein, Cornejo, Nagpal, [doi:10.1126/science.1254295](https://doi.org/10.1126/science.1254295)） | 2014 | Science | 原典 | 1024 台の Kilobot が手設計の分散アルゴリズム（勾配・エッジフォロー・局所座標）で指定形状に自己組立（検索情報に基づく）。手設計則の代表。 | ⚠️ 本文未確認 |
| 17 | Morphogenesis in robot swarms（Slavkov, Carrillo-Zapata ほか, [doi:10.1126/scirobotics.aau9178](https://doi.org/10.1126/scirobotics.aau9178)） | 2018 | Science Robotics | 原典 | 約300台の Kilobot が反応拡散（Turing パターン）型の手設計則で、自己位置推定なしに有機的な形を作り損傷にも頑健（検索情報に基づく）。OA 版は大学リポジトリにあるが到達不可。 | ⚠️ 本文未確認 |
| 18 | Flocks, Herds and Schools: A Distributed Behavioral Model（Reynolds, [doi:10.1145/37401.37406](https://doi.org/10.1145/37401.37406)） | 1987 | SIGGRAPH | 原典 | 整列・結合・分離の3つの手設計局所則による Boids。GNCA が学び直した対象（検索情報に基づく）。 | ⚠️ 本文未確認 |
| 19 | [Severe Damage Recovery in Evolving Soft Robots through Differentiable Programming](https://arxiv.org/abs/2206.06674) | 2022 | GPEM | 発展 | Horibe+ 2021 の続報。進化で形態を探し、再生は勾配学習で行い機能の80%超を回復（アブストラクトのみ確認、内容が p.4 と重複するためスライド化せず）。 | — 参照のみ |
| 20 | [Evolving Modular Soft Robots without Explicit Inter-Module Communication using Local Self-Attention](https://arxiv.org/abs/2204.06481) | 2022 | GECCO | 発展 | 各ボクセルが共有の局所自己注意コントローラを持ち、モジュール間通信なしで進化。通信ありの MLP より速い移動、未知形態へ微調整で転移（本文読了。数値が図のみでスライド数の都合で除外）。 | — 参照のみ |
| 21 | [One Policy to Control Them All: Shared Modular Policies for Agent-Agnostic Control](https://arxiv.org/abs/2007.04976) | 2020 | ICML | 発展 | 関節ごとの同一モジュール方策＋メッセージパッシングで多様な形態を1方策で制御（アブストラクトのみ。Pathak+ 2019 の続編のため除外）。 | — 参照のみ |
| 22 | [Engineered Self-Organization for Resilient Robot Self-Assembly with Minimal Surprise](https://arxiv.org/abs/1902.05485) | 2019 | arXiv | 発展 | 予測誤差最小化（minimal surprise）を適応度に群ロボットの自己組立行動を進化（アブストラクトのみ確認）。 | — 参照のみ |
| 23 | [LPAC: Learnable Perception-Action-Communication Loops with Applications to Coverage Control](https://arxiv.org/abs/2401.04855) | 2025 | IEEE T-RO | 最新 | CNN 知覚＋GNN 通信＋MLP 行動を模倣学習し、被覆制御で手設計の分散・集中アルゴリズムを上回る（アブストラクトのみ確認）。 | — 参照のみ |
| 24 | [E(n)-equivariant Graph Neural Cellular Automata](https://arxiv.org/abs/2301.10497) | 2024 | TMLR | 発展 | GNCA を等長変換に同変・厳密に局所にした改良（アブストラクトのみ確認）。 | — 参照のみ |
| 25 | [Growing 3D Artefacts and Functional Machines with Neural Cellular Automata](https://arxiv.org/abs/2103.08737) | 2021 | ALIFE | 発展 | 3D NCA で Minecraft の建物や動く機械を成長・再生（アブストラクトのみ確認。ロボット群の観点では間接的なため除外）。 | — 参照のみ |
| 26 | [A Unified Substrate for Body-Brain Co-evolution](https://arxiv.org/abs/2203.12066) | 2022 | GECCO | 発展 | 1つの NCA でモジュラーロボットの体と制御の両方を成長させ、CMA-ES/CMA-ME で進化（アブストラクトのみ確認）。 | — 参照のみ |
| 27 | [Learning Developmental Scaffoldings to Guide Self-Organisation](https://arxiv.org/abs/2605.14998) | 2026 | ALIFE | 最新 | 自己組織化の情報を初期条件（母性前パターン）に置く足場を学習（アブストラクトのみ確認）。DiffeoMorph のオーガナイザと同じ論点。 | — 参照のみ |
| 28 | [Swarm of One: Bottom-up Emergence of Stable Robot Bodies from Identical Cells](https://arxiv.org/abs/2306.12629) | 2023 | IROS | 発展 | 物理的に連結した同一セルの自己組織化で形が決まるロボット Loopy。規則は手設計（アブストラクトのみ確認）。 | — 参照のみ |
| 29 | [Towards self-organized control: Using neural cellular automata to robustly control a cart-pole agent](https://arxiv.org/abs/2106.15240) | 2021 | arXiv | 発展 | NCA を Q 学習で訓練し倒立振子を制御（アブストラクトのみ確認。群ではないため除外）。 | — 参照のみ |
| 30 | [Collective Intelligence for Deep Learning: A Survey of Recent Developments](https://arxiv.org/abs/2111.14377) | 2021 | arXiv | — | 集団知能と深層学習のサーベイ（入口として参照）。 | — 参照のみ |
| 31 | [Neural cellular automata: applications to biology and beyond classical AI](https://arxiv.org/abs/2509.11131) | 2025 | arXiv | — | NCA の生物学・ロボット制御への応用サーベイ（入口として参照）。 | — 参照のみ |

---

<a id="nca-hardware"></a>

## 離散・非同期 NCA のハードウェア化（nca-hardware/）

資料：[nca-hardware.pptx](nca-hardware/nca-hardware.pptx) ／ [nca-hardware.pdf](nca-hardware/nca-hardware.pdf) ／ 生成元 [spec.json](nca-hardware/spec.json)


### 調査履歴
- 2026-10-24: 候補メモ（candidates/neural-cellular-automata.md）のテーマ案 3 を起点に、最新の DiffLogic CA（2025）・Self-Organising Digital Circuits（2026）・組込み CA プラットフォーム（ALIFE 2025）から入った。arXiv API で「cellular automata × FPGA/hardware/microcontroller/logic gate/LUT/spiking/quantized/photonic」、「differentiable logic gate」を検索し、WebSearch で FPGA 実装・量子化 NCA・非同期 NCA を補った。
- 系譜は 2 本を遡った。(1) 論理回路系: DiffLogic（2022）→ Convolutional DiffLogic（2024）→ DiffLogic CA（2025）→ Self-Organising Digital Circuits（2026）。(2) 物理・組込み系: μNCA（2021、量子化）、Spiking NCA（2022）、Photonic NCA（2024）、eNCApsulate（2025）、Woiwode+ の組込みプラットフォーム（2025）。
- 採録先は Crossref で確認した（DiffLogic CA = ALIFE 2025、SODC = ALIFE 2026、Woiwode = ALIFE 2025、Photonic NCA = Light Sci. Appl. 2024、eNCApsulate = IJCARS 2025、Physical NCA = IROS 2022）。
- 非同期 NCA の原典 Niklasson+「Asynchronicity in Neural Cellular Automata」（ALIFE 2021）は OpenAlex で closed、MIT Press Direct にも到達できず本文未確認。Physical NCA（Walker+ 2022）と Smart Cellular Bricks（2025）は同分野の learned-collective 担当がダウンロード済みだったため、重複を避けて本デッキではスライド化しなかった。Growing NCA（2020）も nca-world-models 側で扱う見込みのため参照のみとした。

### 系譜
```
[量子化・小型化]   Texture NCA (2021, 未確認) ─→ μNCA (2021) ─────────────→ eNCApsulate (2025, ESP32 マイコン)
                                                                   Med-NCA (2023) ─┘
[論理回路]         DiffLogic (2022) ─→ Convolutional DiffLogic (2024, FPGA) ─┐
                                                                            ├→ DiffLogic CA (2025) ─→ Self-Organising Digital Circuits (2026)
[非同期]           Growing NCA (2020) ─→ Asynchronicity in NCA (2021, 未確認) ┘
[物理・組込み]     Self-classifying MNIST (2020) ─→ Physical NCA (2022) ─→ Rotation-Invariant Embedded Platform (2025)
                                               └→ Photonic NCA (2024, 光回路)
[SNN]              NCA + 分散制御 (Medvet+ 2020) ─→ Spiking NCA (2022, VSR 制御)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [μNCA: Texture Generation with Ultra-Compact Neural Cellular Automata](https://arxiv.org/abs/2111.13545) | 2021 | arXiv | 原典 | 68〜588 パラメータの NCA でテクスチャを生成。1 バイト量子化でも劣化せず、シェーダで動く。 | ✅ p.2 |
| 2 | [Deep Differentiable Logic Gate Networks](https://arxiv.org/abs/2210.08277) | 2022 | NeurIPS | 原典 | 16 種の 2 入力ゲートを確率論理で緩和し、ゲート網を勾配学習。MNIST 98.47% を CPU 7µs/枚。 | ✅ p.3 |
| 3 | [Collective control of modular soft robots via embodied Spiking Neural Cellular Automata](https://arxiv.org/abs/2204.02099) | 2022 | ICLR 2022 Workshop (Cells2Societies) | 原典 | VSR の各ボクセルを LIF+ホメオスタシスの SNN セルにした NCA。未知地形への適応性が MLP より高い。 | ✅ p.4 |
| 4 | [Deep Learning with Photonic Neural Cellular Automata](https://arxiv.org/abs/2309.13186) | 2024 | Light: Science & Applications | 発展 | 光の干渉と PPLN の非線形で NCA の局所則を実装。光学パラメータ 3 個で 2 クラス分類 98.0%。 | ✅ p.5 |
| 5 | [Convolutional Differentiable Logic Gate Networks](https://arxiv.org/abs/2411.04732) | 2024 | NeurIPS (Oral) | 発展 | 論理ゲート木の畳み込み・OR プーリング・残差初期化。CIFAR-10 86.29%、FPGA で 24ns/枚。 | ✅ p.6 |
| 6 | [eNCApsulate: Neural Cellular Automata for Precision Diagnosis on Capsule Endoscopes](https://arxiv.org/abs/2504.21562) | 2025 | IJCARS | 最新 | ESP32-S3 上の NCA でカプセル内視鏡の出血セグメンテーションと深度推定。47KB、早期打ち切りで 1 枚 1 秒未満。 | ✅ p.7 |
| 7 | [Differentiable Logic Cellular Automata: From Game of Life to Pattern Generation](https://arxiv.org/abs/2506.04912) | 2025 | ALIFE | 最新 | NCA の知覚・更新を DLGN にし、推論時は完全な論理回路。GoL を完全学習、非同期更新・損傷に頑健。 | ✅ p.8 |
| 8 | [A Rotation-Invariant Embedded Platform for (Neural) Cellular Automata](https://arxiv.org/abs/2510.07440) | 2025 | ALIFE | 最新 | 電池駆動・向き自由に連結できる RP2350 セルと回転不変 NCA。形状の自己分類と蛍同期を実演。 | ✅ p.9 |
| 9 | [Self-Organising Digital Circuits](https://arxiv.org/abs/2608.02606) | 2026 | ALIFE | 最新 | 配線マスク付き Transformer の局所方策が LUT 回路を組立・修復。ソフトエラーから 99.99% 超回復。 | ✅ p.10 |
| 10 | [Asynchronicity in Neural Cellular Automata](https://doi.org/10.1162/isal_a_00461) | 2021 | ALIFE | 原典 | Niklasson・Mordvintsev・Randazzo による非同期更新 NCA の原典。DiffLogic CA・Woiwode+ が非同期学習の根拠として引用（検索・引用情報に基づく）。 | ⚠️ 本文未確認 |
| 11 | [Self-Organising Textures](https://doi.org/10.23915/distill.00027.003) | 2021 | Distill | 原典 | Texture NCA。5,856 パラメータで 8 ビット量子化に耐えると μNCA が引用（検索・引用情報に基づく）。 | ⚠️ 本文未確認 |
| 12 | [Growing Neural Cellular Automata](https://doi.org/10.23915/distill.00023) | 2020 | Distill | 原典 | NCA 全体の原典。確率的（非同期）セル更新とサンプルプールを導入。 | — 参照のみ（nca-world-models 側で扱う見込み） |
| 13 | [Physical Neural Cellular Automata for 2D Shape Classification](https://arxiv.org/abs/2203.07548) | 2022 | IROS | 原典 | Arduino Mega のタイル 20 枚で NCA を実機化。更新を半分落とす学習と非同期シミュレーションで、数字 0〜9 の形を全セルが合意。本文読了。 | — 参照のみ（learned-collective と重複回避） |
| 14 | [Smart Cellular Bricks for Decentralized Shape Classification and Damage Recovery](https://arxiv.org/abs/2509.18659) | 2025 | arXiv | 最新 | 約 200 個の立方体モジュールで 3D-NCA の形状分類・損傷回復。 | — 参照のみ（learned-collective 担当） |
| 15 | [Med-NCA: Robust and Lightweight Segmentation with Neural Cellular Automata](https://arxiv.org/abs/2302.03473) | 2023 | IPMI | 発展 | Raspberry Pi で動く医用セグメンテーション NCA。eNCApsulate の前身。 | — 参照のみ（医用応用寄り） |
| 16 | [Unsupervised Training of Neural Cellular Automata on Edge Devices](https://arxiv.org/abs/2407.18114) | 2024 | arXiv | 発展 | Med-NCA（26,432 パラメータ）を Android 端末 5 機種上で学習・微調整。分散重み付き損失で Dice +0.7〜2.8%。本文読了。 | — 参照のみ（医用応用寄り） |
| 17 | [Resource Utilization of Differentiable Logic Gate Networks Deployed on FPGAs](https://arxiv.org/abs/2605.04109) | 2026 | arXiv | 最新 | DLGN 390 モデルを Alveo U200 に合成。最終層を細くすると LUT 約 28% 減。本文読了。NCA を扱わないため。 | — 参照のみ |
| 18 | [Recurrent Deep Differentiable Logic Gate Networks](https://arxiv.org/abs/2508.06097) | 2025 | arXiv | 発展 | DLGN の再帰化（系列処理）。arXiv 一覧で確認のみ。 | — 参照のみ |
| 19 | [FINN: A Framework for Fast, Scalable Binarized Neural Network Inference](https://doi.org/10.1145/3020078.3021744) | 2017 | FPGA | 原典 | FPGA 上の BNN 推論。DiffLogic 系の比較基準。 | — 参照のみ |
| 20 | [Photonic elementary cellular automata for simulation of complex phenomena](https://arxiv.org/abs/2211.01811) | 2023 | Light: Science & Applications | 発展 | Photonic NCA の前段となる光学 ECA。 | — 参照のみ |
| 21 | [Reservoir Computing Hardware with Cellular Automata](https://arxiv.org/abs/1806.04932) | 2018 | arXiv | 原典 | CA を FPGA 上のリザバーとして使う研究。学習済み局所則ではないため。 | — 参照のみ |
| 22 | [A Path to Universal Neural Cellular Automata](https://arxiv.org/abs/2505.13058) | 2025 | GECCO Companion | 発展 | NCA の状態内で行列演算を模倣。SODC 著者 Béna の前作。 | — 参照のみ |
| 23 | Efficient Monocular Depth Estimation on Embedded Systems with Neural Cellular Automata（[DOI](https://doi.org/10.1007/s42979-026-05327-4)） | 2026 | SN Computer Science | 最新 | 組込み向け NCA 深度推定（Crossref の書誌のみ確認）。 | — 参照のみ（本文未取得） |
| 24 | Binary Image Classification on 2D Partitioned Linear Hybrid Cellular Automata on FPGA（[DOI](https://doi.org/10.1109/ijcnn69854.2026.11729336)） | 2026 | IJCNN | 最新 | FPGA 上の CA による 2 値画像分類（Crossref の書誌のみ確認）。 | — 参照のみ（本文未取得） |
| 25 | [Universality Frontier for Asynchronous Cellular Automata](https://arxiv.org/abs/2502.05989) | 2025 | MFCS | 発展 | 非同期 CA の計算普遍性の理論。arXiv 一覧で確認のみ。 | — 参照のみ |
| 26 | [CAX: Cellular Automata Accelerated in JAX](https://arxiv.org/abs/2410.02651) | 2024 | arXiv | 発展 | GPU/TPU 向け CA・NCA 実装ライブラリ。 | — 参照のみ |
| 27 | [Neural cellular automata: applications to biology and beyond classical AI](https://arxiv.org/abs/2509.11131) | 2025 | arXiv | — | NCA のサーベイ。 | — 参照のみ |
| 28 | [Applications of Neural Cellular Automata: State of the Art, Challenges and Opportunities](https://arxiv.org/abs/2609.24595) | 2026 | arXiv | — | NCA 応用のサーベイ（DiffLogic CA・SODC を引用）。 | — 参照のみ |
