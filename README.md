# SNN（スパイキングニューラルネットワーク） — 先行研究調査

スパイクで情報を伝えるニューラルネットワーク（SNN）について、学習手法・大規模化・それを動かすハードウェアの系譜をまとめる。テーマは調査者の提案による（学習手法／Spiking Transformer・大規模化／ニューロモルフィックハードウェアと応用）。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/ochiai/`）は main ブランチから引き継いでいる。

## テーマ一覧

| 回 | テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- | --- |
| 第1回 | [学習手法](#training) | STDP・ANN-SNN 変換・サロゲート勾配・e-prop・EventProp から並列学習まで | [pptx](training/training.pptx) / [pdf](training/training.pdf) | 12 本 | 37 本 | 2026-10-23 |
| 第1回 | [Spiking Transformer・大規模化](#spiking-transformer) | 深い残差 SNN から Spiking Transformer、スパイキング LLM とスケーリング則まで | [pptx](spiking-transformer/spiking-transformer.pptx) / [pdf](spiking-transformer/spiking-transformer.pdf) | 11 本 | 37 本 | 2026-10-23 |
| 第1回 | [ニューロモルフィックハードウェアと応用](#neuromorphic-hardware) | TrueNorth・Loihi 2・Speck・SpiNNaker2 などのチップと、ベンチマーク・エッジ応用 | [pptx](neuromorphic-hardware/neuromorphic-hardware.pptx) / [pdf](neuromorphic-hardware/neuromorphic-hardware.pdf) | 12 本 | 31 本 | 2026-10-23 |
| 第2回 | [時間方向の並列学習とスパイキング状態空間モデル](#parallel-training) | S4・S5 から PSN・FPT・P-SpikeSSM・PMSN・Bullet Trains まで、BPTT の逐次性を崩す学習とスパイキング SSM | [pptx](parallel-training/parallel-training.pptx) / [pdf](parallel-training/parallel-training.pdf) | 10 本 | 35 本 | 2026-10-23 |
| 第2回 | [エネルギー評価の方法論（理論推定と実機計測の差）](#energy-evaluation) | Davidson & Furber・SATA から、データ移動を含む推定、QNN との公平比較、Loihi 2 と Jetson の実測比較まで | [pptx](energy-evaluation/energy-evaluation.pptx) / [pdf](energy-evaluation/energy-evaluation.pdf) | 10 本 | 29 本 | 2026-10-23 |
| 第2回 | [スパイク符号化と量子化の境界](#spike-coding) | TTFS・バースト／位相符号から、TTFS≡ReLU、整数学習＋スパイク推論、TTFS-LLM・Spora まで | [pptx](spike-coding/spike-coding.pptx) / [pdf](spike-coding/spike-coding.pdf) | 11 本 | 37 本 | 2026-10-23 |

合計：スライド化 66 本、引用論文一覧 206 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-23 | 第1回調査。「学習手法」、「Spiking Transformer・大規模化」、「ニューロモルフィックハードウェアと応用」 の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版（OpenReview・学会予稿集・OA 誌など）で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典は ⚠️ 本文未確認として一覧に記載。 |
| 2026-10-23 | 第2回調査。第1回の推奨テーマ 「時間方向の並列学習とスパイキング状態空間モデル」、「エネルギー評価の方法論（理論推定と実機計測の差）」、「スパイク符号化と量子化の境界」 を追加調査。既存デッキでスライド化済みの論文は再掲せず、一覧で `↪ 既存：<theme> p.N` として参照。同じ回の別テーマで同じ論文を別の観点からスライド化した例が一部ある。 |

## 追加調査を推奨するテーマ

第2回までの全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾（next themes）にはテーマ単位の候補もある。

1. **SNN と量子化 ANN の公平なベンチマーク**  
   エネルギー評価とスパイク符号化の両テーマが同じ結論に達した。QNN と公平に比べると SNN が省エネになるのは T≤5・スパイク率 5.7% 未満程度に限られ（Yan+ TCAD 2026）、実チップで測った比較はまだ少ない。同一タスク・同一ビット幅・データ移動込みで比べるベンチマーク設計を独立テーマにすべき。

2. **SNN 専用加速器のデータフローと、時間符号の時刻分解能**  
   時刻方向のデータ再利用・疎イベントの移動コスト・静的電力が実機の効率を決めている。TTFS の量子化誤差と遅延、SSM・線形 RNN を「学習は並列、推論は逐次」でニューロモルフィック HW に載せる設計と合わせて、HW 側から調べる。

3. **入力依存（選択的）スパイキングニューロンと、多値スパイク×低ビット LLM**  
   並列学習テーマでは入力依存パラメータが性能の主因に見え、スパイク符号化テーマでは多値・2 進位取りスパイクが低ビット量子化 LLM と合流しつつある。Mamba 型の選択的ダイナミクスを持つスパイキングニューロンと、大規模スパイキング LM の設計を合わせて追う。

<details><summary>第1回の推奨テーマ（第2回で調査済み）</summary>

- 時間方向の並列学習とスパイキング状態空間モデル → [時間方向の並列学習とスパイキング状態空間モデル](#parallel-training)
- エネルギー評価の方法論（理論推定と実機計測の差） → [エネルギー評価の方法論（理論推定と実機計測の差）](#energy-evaluation)
- スパイク符号化と量子化の境界（整数で学習し、スパイクで推論） → [スパイク符号化と量子化の境界](#spike-coding)

</details>

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`↪ 既存：<theme> p.N` は同じ分野の既存デッキでスライド化済み、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
- 「系譜」列：原典（系譜の起点）／発展／最新（主に 2025〜2026 年）。

---

<a id="training"></a>

## 学習手法（training/）

資料：[training.pptx](training/training.pptx) ／ [training.pdf](training/training.pdf) ／ 生成元 [spec.json](training/spec.json)


### 調査履歴
- 2026-10-23: arXiv API（`spiking neural network` × training/surrogate/online/conversion/local、新しい順）と Web 検索で 2025〜2026 年の動向を把握した。並列学習（FidLIF）、エッジでの局所学習（BSD）、LLM の変換（LAS/FAS）、局所学習則のサーベイ（NeuroTrain）、厳密勾配（Eventax）などが見つかった。そこから4つの系譜を原典まで遡った。①サロゲート勾配 BPTT（SuperSpike / SLAYER → Neftci+ 解説 → Gygax & Zenke の理論）、②局所・オンライン学習（STDP → e-prop → OTTT → BSD）、③厳密勾配（EventProp）、④ANN-SNN 変換（Rueckauer+ → QCFS）。
- 同日（ネットワーク拡張後）: OpenAlex で OA 版を探した。Diehl & Cook 2015 と Rueckauer+ 2017 は Frontiers の OA 版、e-prop は Nature Communications の OA 版を全文で確認し、スライドにした（e-prop は arXiv 前身版から差し替えた）。Bi & Poo 1998（jneurosci.org と PMC に到達できない）と SpikeProp 2002（CWI リポジトリに到達できない）は引き続き本文未確認。
- Spiking Transformer・大規模化（LLM 変換を含む）とニューロモルフィックハードウェアは別テーマの担当なので、学習アルゴリズムとして関わる範囲だけを扱った。

### 系譜
```
[局所学習則]  STDP (Bi&Poo 1998, 未確認) ─→ STDP-MNIST (Diehl+ 2015)
                                              │
[SG-BPTT]     SpikeProp (2002, 未確認)       │
                 ↓ (スパイク時刻微分の限界)     ↓ (三因子則として再解釈)
              SuperSpike (2018) ─┬─ SLAYER (2018)
                                 ↓
                     SG解説 (Neftci+ 2019) ──────────→ SG理論 (Gygax & Zenke 2024)
                                 │                          ↑ (厳密勾配との対比)
[厳密勾配]                        └→ EventProp (2021) ───────┘
[オンライン/局所]  SuperSpike → e-prop (2020) → OTTT (2022) → BSD-Edge (2026)
[並列化]          SG-BPTT → PSN (2023, 未調査) → FPT (2025, 未調査) → FidLIF (2026)
[ANN-SNN変換]     Cao+/Diehl+ 2015 (未確認) → Rueckauer+ 2017 → QCFS (2022) → LAS/FAS (2025, LLM; 別テーマ寄り)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Unsupervised learning of digit recognition using spike-timing-dependent plasticity](https://doi.org/10.3389/fncom.2015.00099) | 2015 | Front. Comput. Neurosci. | 原典 | STDP・側抑制・適応閾値だけで学習する教師なし2層SNN。MNIST 95.0%。 | ✅ p.2 |
| 2 | [Conversion of Continuous-Valued Deep Networks to Efficient Event-Driven Networks for Image Classification](https://doi.org/10.3389/fnins.2017.00682) | 2017 | Front. Neurosci. | 原典 | ANN-SNN 変換の誤差を理論化し、減算リセット・パーセンタイル正規化・max-pool/softmax/BN のスパイク版を導入。VGG-16/Inception-V3 を初めて SNN 化。 | ✅ p.3 |
| 3 | [SuperSpike: Supervised learning in multi-layer spiking neural networks](https://arxiv.org/abs/1705.11146) | 2018 | Neural Computation | 原典 | サロゲート微分による電圧依存三因子学習則。沈黙状態からでも多層 SNN を学習できる。 | ✅ p.4 |
| 4 | [SLAYER: Spike Layer Error Reassignment in Time](https://arxiv.org/abs/1810.08646) | 2018 | NeurIPS | 原典 | 誤差を時間方向にも再配分する逆伝播。軸索遅延も学習し、CUDA 実装を公開。NMNIST 99.20%、DVS Gesture 93.64%。 | ✅ p.5 |
| 5 | [Surrogate Gradient Learning in Spiking Neural Networks](https://arxiv.org/abs/1901.09948) | 2019 | IEEE Signal Processing Magazine | 発展 | SNN を RNN として定式化し、サロゲート勾配を体系化した解説論文。 | ✅ p.6 |
| 6 | [A solution to the learning dilemma for recurrent networks of spiking neurons](https://doi.org/10.1038/s41467-020-17236-y) | 2020 | Nature Communications | 発展 | 勾配を「学習信号 × 適格度トレース」に分解するオンライン学習 e-prop。TIMIT・Atari で BPTT に迫る。 | ✅ p.7 |
| 7 | [Biologically inspired alternatives to backpropagation through time for learning in recurrent neural nets](https://arxiv.org/abs/1901.09049) | 2019 | arXiv | 発展 | e-prop の前身版（e-prop 1/2/3、L2L・synthetic gradient との組み合わせ）。通読して p.7 の補足に使った。 | — 参照のみ（p.7 の前身版） |
| 8 | [Event-based backpropagation can compute exact gradients for spiking neural networks](https://arxiv.org/abs/2009.08378) | 2021 | Scientific Reports | 発展 | 随伴法と偏微分のジャンプ条件で厳密勾配を求める事象駆動の逆伝播 EventProp。 | ✅ p.8 |
| 9 | [Optimal ANN-SNN Conversion for High-accuracy and Ultra-low-latency Spiking Neural Networks](https://arxiv.org/abs/2303.04347) | 2022 | ICLR | 発展 | 量子化 clip-floor-shift 活性で変換誤差の期待値を0にした（QCFS）。CIFAR-10 で 4 ステップ 93.96%。 | ✅ p.9 |
| 10 | [Online Training Through Time for Spiking Neural Networks](https://arxiv.org/abs/2210.04195) | 2022 | NeurIPS | 発展 | 前シナプストレースと瞬時損失による順方向学習 OTTT。メモリが時刻数に依存せず、ImageNet でも BPTT 以上。 | ✅ p.10 |
| 11 | [Elucidating the theoretical underpinnings of surrogate gradient learning in spiking neural networks](https://arxiv.org/abs/2404.14964) | 2024 | Neural Computation (2025) | 最新 | 確率的自動微分によってサロゲート勾配に理論的根拠を与えた。一方でサロゲート勾配はどの代理損失の勾配でもないことを示した。 | ✅ p.11 |
| 12 | [Learning While Inferring: Local and Parallel Learning for Edge SNNs across Sensing Modalities](https://arxiv.org/abs/2610.03149) | 2026 | arXiv | 最新 | 双方向スパイク蒸留（BSD）でエッジ SNN が推論しながら局所・並列に学習する。25 課題で BP との差は平均 3.8pt、推定学習エネルギーは 0.36 倍。 | ✅ p.12 |
| 13 | [FidLIF: Parallel Training of High-Fidelity Spiking Neurons with Exact BPTT](https://arxiv.org/abs/2610.16924) | 2026 | arXiv | 最新 | Newton 法と結合スキャンでハードリセット LIF を全時刻並列に学習し、BPTT と等価な勾配を得る。 | ✅ p.13 |
| 14 | [Synaptic Modifications in Cultured Hippocampal Neurons: Dependence on Spike Timing, Synaptic Strength, and Postsynaptic Cell Type (Bi & Poo)](https://doi.org/10.1523/JNEUROSCI.18-24-10464.1998) | 1998 | J. Neurosci. | 原典 | STDP（前→後で増強、後→前で抑圧）を実験で示した古典（検索情報に基づく）。jneurosci.org と PMC に到達できない。 | ⚠️ 本文未確認 |
| 15 | [Error-backpropagation in temporally encoded networks of spiking neurons (SpikeProp)](https://doi.org/10.1016/S0925-2312(01)00658-0) | 2002 | Neurocomputing | 原典 | 発火時刻を微分して逆伝播する最初期の手法。1ニューロン1スパイクに限られる（検索情報と引用元の記述に基づく）。Elsevier と CWI リポジトリに到達できない。 | ⚠️ 本文未確認 |
| 16 | Fast-classifying, high-accuracy spiking deep networks through weight and threshold balancing (Diehl+) | 2015 | IJCNN | 原典 | データに基づく重み正規化による ANN-SNN 変換（引用元の記述に基づく）。IEEE のため到達できない。 | ⚠️ 本文未確認 |
| 17 | Spiking deep convolutional neural networks for energy-efficient object recognition (Cao+) | 2015 | IJCV | 原典 | ReLU と IF ニューロンの発火率を対応させた最初期の変換。 | — 参照のみ（出版社サイトに到達できない。Rueckauer+ でカバー） |
| 18 | [Spatio-Temporal Backpropagation for Training High-performance Spiking Neural Networks (STBP)](https://arxiv.org/abs/1706.02609) | 2018 | Front. Neurosci. | 発展 | 空間・時間方向の BPTT と近似微分による直接学習。SLAYER と並ぶ初期の SG-BPTT。 | — 参照のみ（SuperSpike/SLAYER と内容が重なるため） |
| 19 | [Long short-term memory and learning-to-learn in networks of spiking neurons (LSNN)](https://arxiv.org/abs/1803.09574) | 2018 | NeurIPS | 発展 | 適応閾値ニューロンで LSTM 並みの再帰 SNN を BPTT で学習。e-prop の土台。 | — 参照のみ |
| 20 | [Synaptic Plasticity Dynamics for Deep Continuous Local Learning (DECOLLE)](https://arxiv.org/abs/1811.10766) | 2020 | Front. Neurosci. | 発展 | 層ごとの固定ランダム読み出しによる局所損失で学習するオンライン手法。 | — 参照のみ |
| 21 | [Going Deeper in Spiking Neural Networks: VGG and Residual Architectures](https://arxiv.org/abs/1802.02627) | 2019 | Front. Neurosci. | 発展 | 閾値バランスによる深い CNN の変換。 | — 参照のみ |
| 22 | [A Free Lunch From ANN: Towards Efficient, Accurate Spiking Neural Networks Calibration (SNNC-AP)](https://arxiv.org/abs/2106.06984) | 2021 | ICML | 発展 | 変換後に重み・バイアスを較正する手法。QCFS の主な比較対象。 | — 参照のみ |
| 23 | [Towards Memory- and Time-Efficient Backpropagation for Training Spiking Neural Networks (SLTT)](https://arxiv.org/abs/2302.14311) | 2023 | ICCV | 発展 | 時間方向の勾配経路を省いてメモリと時間を削る。OTTT の後続。 | — 参照のみ |
| 24 | [Parallel Spiking Neurons with High Efficiency and Ability to Learn Long-term Dependencies (PSN)](https://arxiv.org/abs/2304.12760) | 2023 | NeurIPS | 発展 | リセットを除いて時間方向を並列化したニューロン。FidLIF の主な比較対象。 | — 参照のみ |
| 25 | [Efficient Parallel Training Methods for Spiking Neural Networks with Constant Time Complexity (FPT)](https://arxiv.org/abs/2506.12087) | 2025 | ICML | 発展 | 固定点反復で LIF 軌道を並列に求める。FidLIF の直接の前身。 | — 参照のみ |
| 26 | [Automatic Differentiation of Programs with Discrete Randomness (stochAD)](https://arxiv.org/abs/2210.08572) | 2022 | NeurIPS | — | 離散乱数を含むプログラムの不偏な自動微分。Gygax & Zenke の理論的基盤（SNN 論文ではない）。 | — 参照のみ |
| 27 | [Biologically Plausible Learning via Bidirectional Spike-Based Distillation (BSD)](https://arxiv.org/abs/2509.20284) | 2025 | ICLR 2026 | 発展 | 順方向と逆方向の2本のスパイキング網を局所的に整列させる BSD の原典。p.12 はそのエッジ応用。 | — 参照のみ（アブストラクトのみ確認） |
| 28 | [LAS: Loss-less ANN-SNN Conversion for Fully Spike-Driven Large Language Models](https://arxiv.org/abs/2505.09659) | 2025 | AAAI 2026 | 最新 | 外れ値と非線形演算用の専用ニューロンで LLM を無損失に変換。 | — 参照のみ（大規模化テーマの担当範囲） |
| 29 | [FAS: Fast ANN-SNN Conversion for Spiking Large Language Models](https://arxiv.org/abs/2502.04405) | 2025 | arXiv | 最新 | 事前学習済み LLM を微調整と較正の2段階で変換。 | — 参照のみ（大規模化テーマの担当範囲） |
| 30 | [NeuroTrain: Surveying Local Learning Rules for Spiking Neural Networks with an Open Benchmarking Framework](https://arxiv.org/abs/2605.15058) | 2026 | arXiv | 最新 | SNN 学習則の分類体系と snnTorch ベースのベンチマーク基盤を示したサーベイ。 | — 参照のみ（サーベイのため） |
| 31 | [Training event-based neural networks with exact gradients via Differentiable ODE Solving in JAX (Eventax)](https://arxiv.org/abs/2603.08146) | 2026 | arXiv | 最新 | 微分可能 ODE ソルバーで任意のニューロンモデルの厳密勾配を求める。EventProp の一般化。 | — 参照のみ |
| 32 | [SpikingGamma: Surrogate-Gradient Free and Temporally Precise Online Training of SNNs with Smoothed Delays](https://arxiv.org/abs/2602.01978) | 2026 | arXiv | 最新 | 内部の再帰メモリと sigma-delta 符号化で、SG なしのオンライン学習を実現。 | — 参照のみ |
| 33 | [Convex Optimization of Spiking Neural Networks with Global and Approximation Guarantees](https://arxiv.org/abs/2605.08022) | 2026 | arXiv | 最新 | LIF 網の正則化学習を等価な凸計画に帰着し、大域最適を保証。 | — 参照のみ |
| 34 | [A Gradient-based yet Spike-Timing-Dependent Solution to the Feedback Learning Problem in Neural Microcircuits](https://arxiv.org/abs/2609.08070) | 2026 | arXiv | 最新 | 局所スパイク時刻から時間的信用割当を導く gradient tunneling によるオンライン学習。 | — 参照のみ |
| 35 | [Beyond Rate Coding: Surrogate Gradients Enable Spike Timing Learning in Spiking Neural Networks](https://arxiv.org/abs/2507.16043) | 2025 | arXiv | 最新 | SG 学習がレートでなくスパイク時刻の情報も使えることを示した。 | — 参照のみ |
| 36 | [Adaptive Surrogate Gradients for Sequential Reinforcement Learning in Spiking Neural Networks](https://arxiv.org/abs/2510.24461) | 2025 | arXiv | 最新 | SG の傾きの設定とスケジュールが強化学習の性能を大きく左右することを示した。 | — 参照のみ |
| 37 | [NDOT: Neuronal Dynamics-based Online Training for Spiking Neural Networks](https://proceedings.mlr.press/v235/jiang24a.html) | 2024 | ICML | 発展 | ニューロンのダイナミクスに基づき、BPTT のメモリ問題を避けるオンライン学習法（タイトルと検索結果の要約のみ確認）。 | — 参照のみ |

---

<a id="spiking-transformer"></a>

## Spiking Transformer・大規模化（spiking-transformer/）

資料：[spiking-transformer.pptx](spiking-transformer/spiking-transformer.pptx) ／ [spiking-transformer.pdf](spiking-transformer/spiking-transformer.pdf) ／ 生成元 [spec.json](spiking-transformer/spec.json)


### 調査履歴
- 2026-10-23: arXiv API で「spiking × transformer / language model / LLM / SSM」を新しい順に検索し、2025〜2026 年の動向（SpikingBrain 1.0/2.0、スパイキング LM のスケーリング則、SDLLM、NeuronSpark など）を把握した。そこから 2 つの系譜を原典まで遡った。(1) 視覚: Spike-driven Transformer v3 → v2 → v1 → Spikformer → 深い残差 SNN の SEW-ResNet。(2) 言語: SpikingBrain → SpikeLLM / E-SpikeFormer（整数学習・スパイク推論）→ SpikeGPT（RWKV）、さらに SpikingSSMs（SSM）。学習則一般とハードウェアは別テーマ担当なので、アーキテクチャとスケーリングに絞った。スライド化した 11 本はすべて arXiv 版の全文を読んだ。途中でネットワークが広がったが、重要論文はいずれも arXiv で本文を読めたため、「本文未確認」の論文はない。

### 系譜
```
[視覚・アーキテクチャ系]
SEW-ResNet (2021, 深い残差SNN)
  └─> Spikformer (2022, スパイク自己注意 SSA)
        └─> Spike-driven Transformer (2023, マスク+加算のみ / 膜電位ショートカット)
              └─> Meta-SpikeFormer = SDT V2 (2024, Conv+ViT メタ構造, ImageNet 80%)
                    └─> E-SpikeFormer = SDT V3 (2024/TPAMI2025, 整数学習→スパイク推論 SFA, 173M・86.2%)
                                                     │（整数学習・スパイク推論の考え方）
[言語・系列モデル系]                                  ▼
SEW 型残差 ─> SpikeGPT (2023, Spiking RWKV)    SpikingBrain (2025, 線形/ハイブリッド注意+MoE+適応閾値スパイク, 7B/76B)
               ├─> SpikingSSMs (2024, LIF×S4D)        └─> SpikingBrain2.0 (2026, MoBA+SSE の DSSA, 5B, INT8-Spiking/FP8)
               ├─> SpikeLLM (2024, GIF/OBSpiking で 7〜70B LLM をスパイク化) ─┘
               └─> Compute-Optimal Scaling Laws for Spiking LMs (2026, IsoFLOP: N_opt∝C^0.56)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Deep Residual Learning in Spiking Neural Networks](https://arxiv.org/abs/2102.04159) | 2021 | NeurIPS 2021 | 原典 | スパイク同士を要素ごとの関数で結ぶ SEW 残差により、直接学習で 152 層の SNN を実現し、深くするほど精度が上がることを示した。 | ✅ p.2 |
| 2 | [Spikformer: When Spiking Neural Network Meets Transformer](https://arxiv.org/abs/2209.15425) | 2022 | ICLR 2023 | 原典 | softmax のないスパイク自己注意（SSA）による初の直接学習 Spiking Transformer。ImageNet 74.81%。 | ✅ p.3 |
| 3 | [SpikeGPT: Generative Pre-trained Language Model with Spiking Neural Networks](https://arxiv.org/abs/2302.13939) | 2023 | TMLR 2024 | 原典 | RWKV を基にした初のスパイキング生成言語モデル（46M/216M）。線形計算量で言語生成を行う。 | ✅ p.4 |
| 4 | [Spike-driven Transformer](https://arxiv.org/abs/2307.01694) | 2023 | NeurIPS 2023 | 発展 | マスクと加算だけで動く SDSA と膜電位ショートカットで、全層をスパイク駆動にした。ImageNet 77.1%。 | ✅ p.5 |
| 5 | [Spike-driven Transformer V2: Meta Spiking Neural Network Architecture Inspiring the Design of Next-generation Neuromorphic Chips](https://arxiv.org/abs/2404.03663) | 2024 | ICLR 2024 | 発展 | Conv 型と Transformer 型のブロックを組み合わせたメタ骨格 Meta-SpikeFormer。ImageNet 80%、検出・セグメンテーションにも対応。 | ✅ p.6 |
| 6 | [SpikeLLM: Scaling up Spiking Neural Network to Large Language Models via Saliency-based Spiking](https://arxiv.org/abs/2407.04752) | 2024 | ICLR 2025 | 発展 | GIF ニューロンと OBSpiking で 7〜70B の LLaMA をスパイク化し、同等演算量の量子化 LLM を上回った。 | ✅ p.7 |
| 7 | [SpikingSSMs: Learning Long Sequences with Sparse and Parallel Spiking State Space Models](https://arxiv.org/abs/2408.14909) | 2024 | AAAI 2025 | 発展 | S4D に LIF を組み込み、代理ネットワーク SDN で並列に学習できるようにした。LRA 84.3%、WikiText-103 PPL 33.9。 | ✅ p.8 |
| 8 | [Scaling Spike-driven Transformer with Efficient Spike Firing Approximation Training](https://arxiv.org/abs/2411.16061) | 2024 | IEEE TPAMI 2025 | 最新 | 整数で学習しスパイクで推論する SFA と、E-SpikeFormer・MIM 事前学習で 173M・ImageNet 86.2% まで拡大した（SDT V3）。 | ✅ p.9 |
| 9 | [SpikingBrain: Spiking Brain-inspired Large Models](https://arxiv.org/abs/2509.05276) | 2025 | arXiv プレプリント | 最新 | Qwen2.5 を線形・ハイブリッド注意と MoE に変換した 7B/76B のスパイキング LLM。適応閾値スパイク符号化と MetaX GPU での学習。 | ✅ p.10 |
| 10 | [SpikingBrain2.0: Brain-Inspired Foundation Models for Efficient Long-Context and Cross-Platform Inference](https://arxiv.org/abs/2604.22575) | 2026 | arXiv プレプリント | 最新 | MoBA と SSE を組み合わせた DSSA による 5B のハイブリッドスパイキング LLM/VLM。7k A100 時間未満で変換し、INT8-Spiking と FP8 の 2 経路で符号化。 | ✅ p.11 |
| 11 | [Compute-Optimal Scaling Laws for Spiking Language Models](https://arxiv.org/abs/2610.15146) | 2026 | NeurIPS 2026 WS (AXIOM) | 最新 | スパイキング LM の IsoFLOP スケーリング則で N_opt∝C^0.56 を得た。スパイク化による損失コストは計算量とともに縮む。 | ✅ p.12 |
| 12 | [Advancing Spiking Neural Networks towards Deep Residual Learning (MS-ResNet)](https://arxiv.org/abs/2112.08954) | 2021 | arXiv（TNNLS 版あり） | 発展 | 膜電位ショートカット（MS）残差の原典。SDT 系が採用した。SEW-ResNet と同時期の別解のため、参照のみとした。 | — 参照のみ |
| 13 | [Spikformer V2: Join the High Accuracy Club on ImageNet with an SNN Ticket](https://arxiv.org/abs/2401.02020) | 2024 | arXiv | 発展 | Spikformer を自己教師事前学習で拡大した（172.7M・82.4%）。E-SpikeFormer の比較対象。視覚系の枝が重なるため参照のみ。 | — 参照のみ |
| 14 | [QKFormer: Hierarchical Spiking Transformer using Q-K Attention](https://arxiv.org/abs/2403.16552) | 2024 | NeurIPS 2024 | 発展 | Q-K 注意による階層型 Spiking Transformer。視覚 SOTA 競争の一系統で、本テーマの大規模化の主筋ではないため参照のみ。 | — 参照のみ |
| 15 | [Spikingformer: A Key Foundation Model for Spiking Neural Networks](https://arxiv.org/abs/2304.11954) | 2023 | AAAI 2026 | 発展 | Spikformer の残差を見直して乗算を排除した改良版。SDT と同じ問題意識のため参照のみ。 | — 参照のみ |
| 16 | [SpikeBERT: A Language Spikformer Learned from BERT with Knowledge Distillation](https://arxiv.org/abs/2308.15122) | 2023 | arXiv | 発展 | Spikformer を BERT からの蒸留で言語分類に適用した。生成・大規模化の主筋から外れるため参照のみ。 | — 参照のみ |
| 17 | [SpikingBERT: Distilling BERT to Train Spiking Language Models Using Implicit Differentiation](https://arxiv.org/abs/2308.10873) | 2023 | AAAI 2024 | 発展 | 暗黙微分と蒸留で学習するスパイキング BERT。参照のみ。 | — 参照のみ |
| 18 | [SpikeLM: Towards General Spike-Driven Language Modeling via Elastic Bi-Spiking Mechanisms](https://arxiv.org/abs/2406.03287) | 2024 | arXiv | 発展 | 双方向・振幅可変スパイクで言語モデルを完全にスパイク化した。SpikeLLM の前身のため、そちらを優先した。 | — 参照のみ |
| 19 | [Sorbet: A Neuromorphic Hardware-Compatible Transformer-Based Spiking Language Model](https://arxiv.org/abs/2409.15298) | 2024 | ICML 2025 | 発展 | softmax と LayerNorm をハードウェア向けに置き換えたスパイキング言語モデル。ハードウェア寄りのため参照のみ。 | — 参照のみ |
| 20 | [P-SpikeSSM: Harnessing Probabilistic Spiking State Space Models for Long-Range Dependency Tasks](https://arxiv.org/abs/2406.02923) | 2024 | ICLR 2025 | 発展 | 確率的スパイクによる SSM。SpikingSSMs の並行研究のため参照のみ。 | — 参照のみ |
| 21 | [FAS: Fast ANN-SNN Conversion for Spiking Large Language Models](https://arxiv.org/abs/2502.04405) | 2025 | arXiv | 発展 | LLM の ANN-SNN 変換を高速化した。変換手法は学習則テーマに近いため参照のみ。 | — 参照のみ |
| 22 | [LAS: Loss-less ANN-SNN Conversion for Fully Spike-Driven Large Language Models](https://arxiv.org/abs/2505.09659) | 2025 | arXiv | 発展 | 損失のない LLM の ANN-SNN 変換。同上の理由で参照のみ。 | — 参照のみ |
| 23 | [NeuronSpark: Selective Spiking State Space Models with Adaptive Computation for Language Modeling](https://arxiv.org/abs/2603.16148) | 2026 | arXiv | 最新 | 入力依存のスパイク膜ダイナミクスにより、1.1B のスパイキング SSM LM をゼロから事前学習した（抄録のみ確認）。単著プレプリントのため参照のみ。 | — 参照のみ |
| 24 | [Spike-driven Large Language Model (SDLLM)](https://arxiv.org/abs/2604.16475) | 2026 | arXiv | 最新 | γ-SQP 2 段スパイク符号化と双方向符号化で、密行列積を疎加算に置き換えた LLM（抄録のみ確認）。11 本の上限を超えるため参照のみ。 | — 参照のみ |
| 25 | [Winner-Take-All Spiking Transformer for Language Modeling](https://arxiv.org/abs/2604.11321) | 2026 | arXiv | 最新 | WTA 機構による softmax なしのスパイク自己注意で、エンコーダ型・デコーダ型の LM を作った（抄録のみ確認）。参照のみ。 | — 参照のみ |
| 26 | [BiSpikCLM: A Spiking Language Model integrating Softmax-Free Spiking Attention and Spike-Aware Alignment Distillation](https://arxiv.org/abs/2605.13859) | 2026 | arXiv | 最新 | 完全 2 値・MatMul なしの因果 LM（〜1.3B）。蒸留により、少ないトークンで ANN に近い性能を得た（抄録のみ確認）。参照のみ。 | — 参照のみ |
| 27 | [SpikeMLLM: Spike-based Multimodal Large Language Models via Modality-Specific Temporal Scales and Temporal Compression](https://arxiv.org/abs/2604.18610) | 2026 | arXiv | 最新 | Qwen2VL-72B などの MLLM をスパイク表現化し、RTL アクセラレータも試作した（抄録のみ確認）。参照のみ。 | — 参照のみ |
| 28 | [Rethinking the Tradeoff Between Temporal Encoding and Nonlinear Computation in Spiking Language Models (Spora)](https://arxiv.org/abs/2610.10933) | 2026 | arXiv | 最新 | 2 値時間重み符号化で、T ステップに最大 T ビットを載せるスパイキング LM。GLUE で SpikeLM を上回った（抄録のみ確認）。参照のみ。 | — 参照のみ |
| 29 | [URCHIN: A Horizontal Spiking Language Model for Data-Constrained Pretraining](https://arxiv.org/abs/2609.13899) | 2026 | BabyLM WS (EMNLP 2026) | 最新 | Dale 則に従う側方結合 LIF・128 ニューロンの極小スパイキング SSM LM（抄録のみ確認）。大規模化とは逆の方向のため参照のみ。 | — 参照のみ |
| 30 | [Large Language Models with At Most One Spike per Neuron](https://arxiv.org/abs/2609.05151) | 2026 | arXiv | 最新 | 1 ニューロンあたり最大 1 スパイクの時間符号化 LLM（題目のみ確認）。参照のみ。 | — 参照のみ |
| 31 | [SpikeOPD: Stable On-Policy Distillation for Autoregressive Spiking Language Models](https://arxiv.org/abs/2608.26720) | 2026 | arXiv | 最新 | スパイキング LM のオンポリシー蒸留（題目のみ確認）。学習法寄りのため参照のみ。 | — 参照のみ |
| 32 | [Spike-based dynamic computing with asynchronous sensing-computing neuromorphic chip (Speck)](https://doi.org/10.1038/s41467-024-47811-6) | 2024 | Nature Communications | 発展 | SFA や SpikingBrain が想定する非同期スパイク駆動チップ。ハードウェアテーマの担当範囲のため参照のみ。 | — 参照のみ |
| 33 | [MoBA: Mixture of Block Attention for Long-Context LLMs](https://arxiv.org/abs/2502.13189) | 2025 | arXiv | 関連 | SpikingBrain2.0 の疎ソフトマックス注意。非スパイクの要素技術のため参照のみ。 | — 参照のみ |
| 34 | [Scaling Linear Attention with Sparse State Expansion](https://arxiv.org/abs/2507.16577) | 2025 | arXiv | 関連 | SpikingBrain2.0 の疎線形注意 SSE。参照のみ。 | — 参照のみ |
| 35 | [Gated Linear Attention Transformers with Hardware-Efficient Training](https://arxiv.org/abs/2312.06635) | 2023 | ICML 2024 | 関連 | SpikingBrain-7B の線形注意 GLA。参照のみ。 | — 参照のみ |
| 36 | [MetaFormer Baselines for Vision (CAFormer)](https://arxiv.org/abs/2210.13452) | 2022 | TPAMI | 関連 | Meta-SpikeFormer が手本にした ANN のメタ構造。参照のみ。 | — 参照のみ |
| 37 | [Training Compute-Optimal Large Language Models (Chinchilla)](https://arxiv.org/abs/2203.15556) | 2022 | NeurIPS 2022 | 関連 | スパイキング LM スケーリング則が用いた IsoFLOP 法の原典。参照のみ。 | — 参照のみ |

---

<a id="neuromorphic-hardware"></a>

## ニューロモルフィックハードウェアと応用（neuromorphic-hardware/）

資料：[neuromorphic-hardware.pptx](neuromorphic-hardware/neuromorphic-hardware.pptx) ／ [neuromorphic-hardware.pdf](neuromorphic-hardware/neuromorphic-hardware.pdf) ／ 生成元 [spec.json](neuromorphic-hardware/spec.json)


### 調査履歴
- 2026-10-23: arXiv API（Loihi / SpiNNaker2 / NeuroBench / Speck / event camera × neuromorphic hardware）で 2024〜2026 年の最新動向を把握し、Loihi 2 上の LLM・転倒検知、SpiNNaker2 チップ論文、floorline 性能モデルを起点に選定。そこから (a) チップの系譜（TrueNorth → Loihi → Loihi 2、SpiNNaker → SpiNNaker2、Darwin3、Speck）、(b) エネルギー評価法の系譜（Blouw+ 2018 の動的エネルギー/推論 → SNABSuite → NeuroBench → floorline）、(c) イベントカメラ応用（Speck 上の視線追跡、IMX636+Loihi 2）の3本を原典側へ遡った。
- 途中でネットワークが拡張されたため、OpenAlex で OA 版を探索。Speck（Nature Communications）と SNABSuite（Frontiers）は OA 全文を読めたのでスライド化した。TrueNorth・Loihi・SpiNNaker・Tianjic・Loihi サーベイは OA 版に到達できず（出版社サイト・著者サイトとも遮断）、本文未確認のままとした。
- 学習アルゴリズム・Spiking Transformer は別テーマのため、ハードウェア・システム評価・応用に関係する範囲だけを扱った。

### 系譜
```
[チップ]
TrueNorth (Merolla+ 2014, ⚠️) ── Eedn on TrueNorth (Esser+ 2016) ─────────────┐
Loihi (Davies+ 2018, ⚠️) ─┬─ KWS on Loihi (Blouw+ 2018)                       │
                          └─ Loihi 2 信号処理 (Orchard+ 2021) ─┬─ MatMul-free LLM on Loihi 2 (Abreu+ 2025)
                                                               └─ IMX636+Loihi 2 転倒検知 (Khacef+ 2026)
SpiNNaker (Furber+ 2014, ⚠️) ───────────────── SpiNNaker2 chip (Scholze+ 2026)
Tianjic (Pei+ 2019, ⚠️) / Darwin 系 ─────────── Darwin3 (Ma+ 2024) → DarwinWafer (2025)
Speck (Yao+ 2024: センサ統合・完全非同期) ───── Retina (Bonazzi+ 2024: Speck 上の視線追跡)

[評価法]
KWS on Loihi (Blouw+ 2018: 動的エネルギー/推論)
  → SNABSuite (Ostrau+ 2022: 単価分解エネルギーモデル・横断ベンチマーク)
  → NeuroBench (Yik+ 2025: algorithm/system の2トラック標準)
  → Floorline (Yik+ 2025: synop 等の代理指標の限界とボトルネックモデル)
  → 応用での NeuroBench 準拠評価（Khacef+ 2026）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Convolutional Networks for Fast, Energy-Efficient Neuromorphic Computing](https://arxiv.org/abs/1603.08270) | 2016 | PNAS | 原典 | TrueNorth 上で2値ニューロン・3値重み制約下の CNN（Eedn）を学習し、8課題で SOTA 近傍精度を >6000 FPS/W で実行 | ✅ p.2 |
| 2 | [Benchmarking Keyword Spotting Efficiency on Neuromorphic Hardware](https://arxiv.org/abs/1812.01739) | 2018 | arXiv プレプリント | 原典 | Loihi と CPU/GPU/Jetson/Movidius を同一 KWS 網で比較し、動的エネルギー/推論で Loihi が最小 | ✅ p.3 |
| 3 | [Efficient Neuromorphic Signal Processing with Loihi 2](https://arxiv.org/abs/2111.03746) | 2021 | IEEE SiPS | 発展 | Loihi 2 のプログラマブルニューロンで Resonate-and-Fire を実装し STFT・光学フロー等を効率化（エミュレーション評価） | ✅ p.4 |
| 4 | [Benchmarking Neuromorphic Hardware and Its Energy Expenditure](https://doi.org/10.3389/fnins.2022.873935) | 2022 | Frontiers in Neuroscience | 発展 | 横断ベンチマーク SNABSuite と単価分解型エネルギーモデル。SpiNNaker/BrainScaleS/Spikey/GPU を比較（Frontiers OA 版で全文確認） | ✅ p.5 |
| 5 | [Darwin3: A large-scale neuromorphic chip with a Novel ISA and On-Chip Learning](https://arxiv.org/abs/2312.17582) | 2024 | National Science Review | 発展 | 専用 ISA と結合圧縮で 235 万ニューロン/チップ、可プログラムなオンチップ学習 | ✅ p.6 |
| 6 | [Spike-based dynamic computing with asynchronous sensing-computing neuromorphic chip](https://doi.org/10.1038/s41467-024-47811-6) | 2024 | Nature Communications | 発展 | DVS 統合・完全非同期 SoC「Speck」（待機 0.42 mW）と注意型動的 SNN（Nature Communications OA 版で全文確認） | ✅ p.7 |
| 7 | [Retina: Low-Power Eye Tracking with Event Camera and Spiking Hardware](https://arxiv.org/abs/2312.00425) | 2024 | CVPR Workshops | 発展 | 眼鏡装着 DVS の瞳孔追跡 SNN を Speck に実装、end-to-end 2.89〜4.8 mW | ✅ p.8 |
| 8 | [Neuromorphic Principles for Efficient Large Language Models on Intel Loihi 2](https://arxiv.org/abs/2503.18002) | 2025 | ICLR 2025 Workshop (SCOPE) | 最新 | 370M MatMul-free LLM を Loihi 2（24 チップ）で実行、エッジ GPU 比スループット最大3倍・エネルギー約半分（予備結果） | ✅ p.9 |
| 9 | [NeuroBench: A Framework for Benchmarking Neuromorphic Computing Algorithms and Systems](https://arxiv.org/abs/2304.04640) | 2025 | Nature Communications | 最新 | algorithm/system の2トラックからなるコミュニティ標準ベンチマーク（Xylo・Loihi 2 のベースライン） | ✅ p.10 |
| 10 | [Modeling and Optimizing Performance Bottlenecks for Neuromorphic Accelerators](https://arxiv.org/abs/2511.21549) | 2025 | arXiv プレプリント | 最新 | AKD1000/Speck/Loihi 2 の実測から floorline 性能モデルを提案、最適化で最大 3.86 倍高速 | ✅ p.11 |
| 11 | [Privacy-preserving fall detection at the edge using Sony IMX636 event-based vision sensor and Intel Loihi 2 neuromorphic processor](https://arxiv.org/abs/2511.22554) | 2026 | IEEE NICE | 最新 | HD イベントセンサと Loihi 2 を FPGA 直結した転倒検知、単一チップ約 90 mW・F1 83.6% | ✅ p.12 |
| 12 | [The SpiNNaker2 chip: a many-core platform for flexible and scalable brain-inspired computing](https://arxiv.org/abs/2607.24396) | 2026 | IEEE OJCAS | 最新 | 152 PE・DVFS・DNN アクセラレータを持つ SpiNNaker2 の設計と実測（2.77 TOPS/W、SNN >15 万ニューロン） | ✅ p.13 |
| 13 | [A million spiking-neuron integrated circuit with a scalable communication network and interface](https://doi.org/10.1126/science.1254642) | 2014 | Science | 原典 | IBM TrueNorth。4096 コア・100 万ニューロン・2.56 億シナプス、ビデオ処理で約 63〜70 mW（検索情報に基づく。Science は非 OA、著者サイトは到達不可） | ⚠️ 本文未確認 |
| 14 | [Loihi: A Neuromorphic Manycore Processor with On-Chip Learning](https://doi.org/10.1109/MM.2018.112130359) | 2018 | IEEE Micro | 原典 | Intel 初代 Loihi（14 nm、128 コア、プログラマブルな学習則）（検索情報・引用元論文の記述に基づく。IEEE は到達不可） | ⚠️ 本文未確認 |
| 15 | [The SpiNNaker Project](https://doi.org/10.1109/JPROC.2014.2304638) | 2014 | Proceedings of the IEEE | 原典 | ARM 多コアとマルチキャストルータによる大規模 SNN シミュレーション基盤（IEEE 上は無料公開だが到達不可、Manchester リポジトリも遮断） | ⚠️ 本文未確認 |
| 16 | [Towards artificial general intelligence with hybrid Tianjic chip architecture](https://doi.org/10.1038/s41586-019-1424-8) | 2019 | Nature | 原典 | ANN と SNN を同一チップで混在実行する Tianjic、無人自転車デモ（検索情報に基づく。非 OA） | ⚠️ 本文未確認 |
| 17 | [Advancing Neuromorphic Computing With Loihi: A Survey of Results and Outlook](https://doi.org/10.1109/JPROC.2021.3067593) | 2021 | Proceedings of the IEEE | 発展 | Loihi 上の成果の総括（OA だが IEEE サイトに到達不可） | ⚠️ 本文未確認 |
| 18 | [Benchmarks for progress in neuromorphic computing](https://doi.org/10.1038/s42256-019-0097-1) | 2019 | Nature Machine Intelligence | 発展 | ニューロモルフィック分野のベンチマーク整備を訴えた論説（非 OA） | ⚠️ 本文未確認 |
| 19 | [Neural inference at the frontier of energy, space, and time](https://doi.org/10.1126/science.adh1174) | 2023 | Science | 発展 | TrueNorth の後継的位置づけの IBM NorthPole（非 SNN の近メモリ推論チップ）（非 OA） | ⚠️ 本文未確認 |
| 20 | [SpiNNaker2: A Large-Scale Neuromorphic System for Event-Based and Asynchronous Machine Learning](https://arxiv.org/abs/2401.04491) | 2024 | NeurIPS 2023 Workshop (MLNCP) | 発展 | SpiNNaker2 システムの概説。チップの包括報告（#12）に内容が包含されるため参照のみ | — 参照のみ |
| 21 | [Efficient Video and Audio processing with Loihi 2](https://arxiv.org/abs/2310.03251) | 2023 | arXiv プレプリント | 発展 | sigma-delta・RF・graded spike で映像/音声処理の EDP を大幅改善。Orchard+ 2021 と #8 で系譜を代表させたため参照のみ | — 参照のみ |
| 22 | [Scalable MatMul-free Language Modeling](https://arxiv.org/abs/2406.02528) | 2024 | arXiv プレプリント | 発展 | 行列積なし LLM の元論文（Loihi 2 実装の言及あり）。アルゴリズム寄りのため参照のみ | — 参照のみ |
| 23 | [Neurobench: DCASE 2020 Acoustic Scene Classification benchmark on XyloAudio 2](https://arxiv.org/abs/2410.23776) | 2024 | arXiv プレプリント | 発展 | NeuroBench system track の Xylo ベースライン詳細。#9 に要約されるため参照のみ | — 参照のみ |
| 24 | [A compact neuromorphic system for ultra-energy-efficient, on-device robot localization](https://arxiv.org/abs/2408.16754) | 2025 | Science Robotics | 発展 | Speck 上の視覚的場所認識による自己位置推定。Speck 応用は #7 で代表させたため参照のみ | — 参照のみ |
| 25 | [Efficient Deployment of Spiking Neural Networks on SpiNNaker2 for DVS Gesture Recognition Using Neuromorphic Intermediate Representation](https://arxiv.org/abs/2504.06748) | 2025 | NICE 2025 | 発展 | NIR 経由で SNN を SpiNNaker2 に展開。#12 の DVS Gesture 実験の元になった作業のため参照のみ | — 参照のみ |
| 26 | [Event-based backpropagation on the neuromorphic platform SpiNNaker2](https://arxiv.org/abs/2412.15021) | 2024 | NeurIPS 2024 Workshop (MLNCP) | 発展 | SpiNNaker2 上の EventProp によるオンチップ学習。学習アルゴリズム寄りのため参照のみ | — 参照のみ |
| 27 | [A Compute and Communication Runtime Model for Loihi 2](https://arxiv.org/abs/2601.10035) | 2026 | arXiv プレプリント | 最新 | Loihi 2 の max-affine（多次元 roofline）実行時間モデル。#10 と主題が重なるため参照のみ | — 参照のみ |
| 28 | [DarwinWafer: A Wafer-Scale Neuromorphic Chip](https://arxiv.org/abs/2509.16213) | 2025 | arXiv プレプリント | 最新 | Darwin3 チップレット 64 個をウェハ上に集積（1.5 億ニューロン、4.9 pJ/SOP）。アブストラクトのみ確認のため参照のみ | — 参照のみ |
| 29 | [The BrainScaleS-2 accelerated neuromorphic system with hybrid plasticity](https://arxiv.org/abs/2201.11063) | 2022 | arXiv プレプリント | 発展 | アナログ加速型 BrainScaleS-2 の概説。デジタル系を中心にしたため参照のみ | — 参照のみ |
| 30 | [Real-Time Frame- and Event-based Object Detection with Spiking Neural Networks on Edge Neuromorphic Hardware: Design, Deployment and Benchmark](https://arxiv.org/abs/2605.00146) | 2026 | arXiv プレプリント | 最新 | Loihi 2 上の SNN 物体検出を Jetson 等と比較。アブストラクトのみ確認のため参照のみ | — 参照のみ |
| 31 | [Efficient Onboard Spacecraft Pose Estimation with Event Cameras and Neuromorphic Hardware](https://arxiv.org/abs/2604.04117) | 2026 | CVPR 2026 Workshop (AI4SPACE) | 最新 | イベントカメラ＋BrainChip Akida による宇宙機姿勢推定。アブストラクトのみ確認のため参照のみ | — 参照のみ |

---

<a id="parallel-training"></a>

## 時間方向の並列学習とスパイキング状態空間モデル（parallel-training/）

資料：[parallel-training.pptx](parallel-training/parallel-training.pptx) ／ [parallel-training.pdf](parallel-training/parallel-training.pdf) ／ 生成元 [spec.json](parallel-training/spec.json)


### 調査履歴
- 2026-10-23（第2回調査）: arXiv API で「spiking × parallel / reset / state space / SSM / linear recurrent / associative scan / fixed point」を新しい順に検索し、2025〜2026 年の動向をつかんだ。見つかったのは DSN（Parallel Training in SNNs）、Bullet Trains（ICML 2026）、FPT（ICML 2025）、SiLIF、LongSpike、Phase SSM、PHC など。そこから2つの系譜を原典まで遡った。① SSM 側：S4 → S5（並列スキャン）→ S4D on Loihi 2（逐次推論のハードウェア実装）。② SNN 側：PSN（リセットを除いた並列化）→ P-SpikeSSM / PMSN（スパイキング SSM、TDR）→ FPT（固定点反復）→ DSN（動的減衰）／Bullet Trains（厳密なハードリセットの結合スキャン）。
- 既存テーマで扱った SpikingSSMs（spiking-transformer）と FidLIF（training）は再掲していない。スライド化した 10 本は、いずれも arXiv 版の本文（手法・実験・結果・考察）を読んだ。採録先は arXiv のコメント欄、PDF のヘッダ、Web 検索で確認した（S4D on Loihi 2 は NeurIPS 2024 Workshop MLNCP、PMSN は IEEE TNNLS 2026）。
- 並列スキャンの原典である Blelloch (1990) と、ML への適用の原典である Martin & Cundy (2018) は S5 の中で関係が整理されているため、参照のみとした。

### 系譜
```
[SSM 側]   HiPPO/LSSL (2020-21) ─→ S4 (2021, 畳み込みで並列学習・再帰で推論)
                                      ├─→ S4D (2022) ─────────→ S4D on Loihi 2 (2024, チップ上で逐次推論)
                                      └─→ S5 (2022, 対角 MIMO + 並列スキャン) ←─ Martin & Cundy (2018) ←─ Blelloch (1990)
                                             ├─→ LRU (2023) / Mamba (2023, 入力依存の減衰)
                                             └─→ Bullet Trains (2026, アフィン写像の結合スキャン)
[SNN 側]   LIF + SG-BPTT（逐次）
              └─→ PSN (2023, リセットを除いて H=WX) ─┬─→ PSU / SPSN (2023-24)
                                                    ├─→ FPT (2025, 固定点反復で LIF を近似) ─→ FidLIF (2026, Newton+スキャン; 既存: training)
                                                    └─→ DSN (2026, 動的減衰 = Mamba 型の選択的線形再帰)
[スパイキング SSM]  S4 + スパイク
              ├─→ BinaryS4D (2023) / SpikingSSMs (2024; 既存: spiking-transformer) / SPikE-SSM (2024)
              ├─→ P-SpikeSSM (2024, ベルヌーイ発火で並列化)
              ├─→ PMSN (2024, 多区画 SSM + TDR リセット)
              └─→ SiLIF (2025, SSM のパラメータ化を逐次学習の AdLIF/RF へ; 並列化しない対照例)
                     → LongSpike (2026) / Phase SSM (2026) / PHC (2026)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Efficiently Modeling Long Sequences with Structured State Spaces](https://arxiv.org/abs/2111.00396) | 2021 | ICLR 2022 | 原典 | HiPPO 行列を正規＋低ランクに分解した S4。畳み込みで並列に学習し、再帰で推論する。LRA 平均 86.09%、Path-X を初めて解いた。 | ✅ p.2 |
| 2 | [Simplified State Space Layers for Sequence Modeling](https://arxiv.org/abs/2208.04933) | 2022 | ICLR 2023 | 発展 | 対角 MIMO SSM を並列スキャンで計算する S5。LRA 87.46%、Path-X 98.58%。 | ✅ p.3 |
| 3 | [Parallel Spiking Neurons with High Efficiency and Ability to Learn Long-term Dependencies](https://arxiv.org/abs/2304.12760) | 2023 | NeurIPS 2023 | 原典 | リセットを除いて膜電位を H=WX で一括計算する PSN。masked 版・sliding 版も提案。Seq. CIFAR10 88.45%。 | ✅ p.4 |
| 4 | [P-SpikeSSM: Harnessing Probabilistic Spiking State Space Models for Long-Range Dependency Tasks](https://arxiv.org/abs/2406.02923) | 2024 | ICLR 2025 | 発展 | SSM 出力を発火確率としてベルヌーイ発火させ、並列に学習するスパイキング SSM。LRA でスパイキングモデルの SOTA（Path-X の報告なし）。 | ✅ p.5 |
| 5 | [PMSN: A Parallel Multi-compartment Spiking Neuron for Multiscale Temporal Processing](https://arxiv.org/abs/2408.14917) | 2024 | IEEE TNNLS 2026 | 発展 | 多区画ニューロン。隠れ区画を SSM 畳み込みで、出力区画を時間分離リセット（TDR）で並列化した。SHD 95.10%。FPGA 実装あり。 | ✅ p.6 |
| 6 | [A Diagonal Structured State Space Model on Loihi 2 for Efficient Streaming Sequence Processing](https://arxiv.org/abs/2409.15022) | 2024 | NeurIPS 2024 Workshop (MLNCP) | 発展 | S4D を Loihi 2 に初めて実装した。1トークンずつの処理で Jetson 比エネルギー 1/1000、遅延 1/75。バッチ処理では GPU が有利。 | ✅ p.7 |
| 7 | [Efficient Parallel Training Methods for Spiking Neural Networks with Constant Time Complexity](https://arxiv.org/abs/2506.12087) | 2025 | ICML 2025 | 最新 | リセット付き LIF を固定点反復（K≈3）で並列に計算する FPT。順伝播はシグモイドで緩めた近似。T=128 で BPTT の約13倍速い。 | ✅ p.8 |
| 8 | [SiLIF: Structured State Space Model Dynamics and Parametrization for Spiking Neural Networks](https://arxiv.org/abs/2506.06374) | 2025 | arXiv プレプリント | 最新 | S4 流の Δt 学習・対数再パラメータ化・S4D 初期化を AdLIF/RF に移植した。学習は逐次 BPTT のまま。SSC 82.03%、GSC 95.88%。 | ✅ p.9 |
| 9 | [Parallel Training in Spiking Neural Networks](https://arxiv.org/abs/2602.01133) | 2026 | arXiv プレプリント | 最新 | リセットの機能を分析し、入力依存の動的減衰でリセットを置き換えた DSN。並列学習と逐次推論を両立する。WikiText-103 PPL 28.50、30k への外挿も可能。 | ✅ p.10 |
| 10 | [Bullet Trains: Parallelizing Training of Temporally Precise Spiking Neural Networks](https://arxiv.org/abs/2603.13283) | 2026 | ICML 2026 | 最新 | 連続時間のイベント駆動 SNN で、厳密なハードリセットを保ったまま結合スキャンでスパイクを並列に処理し、最大44倍速い。発火時刻は Newton 法で求める。 | ✅ p.11 |
| 11 | [SpikingSSMs: Learning Long Sequences with Sparse and Parallel Spiking State Space Models](https://arxiv.org/abs/2408.14909) | 2024 | AAAI 2025 | 発展 | S4D に LIF を組み込み、代理ネットワーク SDN で並列に学習する。 | ↪ 既存：spiking-transformer p.8 |
| 12 | [FidLIF: Parallel Training of High-Fidelity Spiking Neurons with Exact BPTT](https://arxiv.org/abs/2610.16924) | 2026 | arXiv | 最新 | Newton 法と結合スキャンでハードリセット LIF を並列に学習し、BPTT と等価な勾配を得る。 | ↪ 既存：training p.13 |
| 13 | [Event-based backpropagation can compute exact gradients for spiking neural networks](https://arxiv.org/abs/2009.08378) | 2021 | Scientific Reports | 原典 | EventProp。Bullet Trains の厳密勾配の前提。 | ↪ 既存：training p.8 |
| 14 | [Efficient Neuromorphic Signal Processing with Loihi 2](https://arxiv.org/abs/2111.03746) | 2021 | SiPS 2021 | 発展 | Loihi 2 のプログラマブル・ニューロンによる信号処理。S4D on Loihi 2 の基盤。 | ↪ 既存：neuromorphic-hardware p.4 |
| 15 | [Neuromorphic Principles for Efficient Large Language Models on Intel Loihi 2](https://arxiv.org/abs/2503.18002) | 2025 | arXiv | 最新 | 線形再帰の MatMul-free LLM を Loihi 2 で動かした例。 | ↪ 既存：neuromorphic-hardware p.9 |
| 16 | [SpikingBrain: Spiking Brain-inspired Large Models](https://arxiv.org/abs/2509.05276) | 2025 | arXiv | 最新 | 線形注意とスパイク符号化による大規模スパイキング LM。DSN と同じグループ。 | ↪ 既存：spiking-transformer p.10 |
| 17 | [Parallelizing Linear Recurrent Neural Nets Over Sequence Length](https://arxiv.org/abs/1709.04057) | 2017 | ICLR 2018 | 原典 | 線形 RNN を並列スキャンで系列長方向に並列化した、ML での原典（抄録と S5 の関連研究節で確認）。 | — 参照のみ |
| 18 | [Prefix Sums and Their Applications](https://www.cs.cmu.edu/~guyb/papers/Ble93.pdf) | 1990 | CMU Tech. Report CMU-CS-90-190 | 原典 | 並列スキャン（prefix sum）アルゴリズムの古典。S5 と Bullet Trains が引用している（計算機科学の文献のため参照のみ）。 | — 参照のみ |
| 19 | [Combining Recurrent, Convolutional, and Continuous-time Models with Linear State-Space Layers (LSSL)](https://arxiv.org/abs/2110.13985) | 2021 | NeurIPS 2021 | 原典 | S4 の前身。O(N²L) の計算が問題だった（S4 本文の記述に基づく）。 | — 参照のみ |
| 20 | [On the Parameterization and Initialization of Diagonal State Space Models (S4D)](https://arxiv.org/abs/2206.11893) | 2022 | NeurIPS 2022 | 発展 | 対角 SSM。S4D on Loihi 2、P-SpikeSSM、SiLIF の基盤。 | — 参照のみ |
| 21 | [Resurrecting Recurrent Neural Networks for Long Sequences (LRU)](https://arxiv.org/abs/2303.06349) | 2023 | ICML 2023 | 発展 | 線形・対角化した RNN で深層 SSM の性能を再現し、SSM と線形 RNN の対応を示した（抄録のみ確認）。 | — 参照のみ |
| 22 | [Mamba: Linear-Time Sequence Modeling with Selective State Spaces](https://arxiv.org/abs/2312.00752) | 2023 | COLM 2024 | 発展 | 入力依存の選択的 SSM。DSN の動的減衰は同じ構造をとる（参照のみ）。 | — 参照のみ |
| 23 | [Accelerating SNN Training with Stochastic Parallelizable Spiking Neurons (SPSN)](https://arxiv.org/abs/2306.12666) | 2023 | IJCNN 2023 | 発展 | 線形積分と発火を分離し、確率的発火で並列化した。PSN と同時期の研究（抄録のみ確認）。 | — 参照のみ |
| 24 | [Parallel Spiking Unit for Efficient Training of Spiking Neural Networks (PSU)](https://arxiv.org/abs/2402.00449) | 2024 | IJCNN 2024 | 発展 | 積分と発火を分離し、リセットを確率的に扱う。FPT は K=2 の特殊ケースとして説明している（抄録と FPT・DSN の記述で確認）。 | — 参照のみ |
| 25 | [PRF: Parallel Resonate and Fire Neuron for Long Sequence Learning in Spiking Neural Networks](https://arxiv.org/abs/2410.03530) | 2024 | arXiv | 発展 | 分離リセットで O(L log L) の並列学習を行う、共鳴発火型ニューロン（抄録のみ確認）。PMSN・DSN と役割が重なるため参照のみ。 | — 参照のみ |
| 26 | [SPikE-SSM: A Sparse, Precise, and Efficient Spiking State Space Model for Long Sequences Learning](https://arxiv.org/abs/2410.17268) | 2024 | arXiv | 発展 | 並列の max-min 境界圧縮（PMBC）でリセット付きのスパイクを反復的に求めるスパイキング SSM（抄録と DSN・Bullet Trains の記述で確認）。 | — 参照のみ |
| 27 | [Learning Long Sequences in Spiking Neural Networks (BinaryS4D)](https://arxiv.org/abs/2401.00955) | 2023 | arXiv | 発展 | S4 の出力を LIF でスパイク化した初期のスパイキング SSM（P-SpikeSSM の比較対象。抄録のみ確認）。 | — 参照のみ |
| 28 | [Multiplication-Free Parallelizable Spiking Neurons with Efficient Spatio-Temporal Dynamics](https://arxiv.org/abs/2501.14490) | 2025 | NeurIPS 2025 | 発展 | 乗算なしのチャネル単位 PSN（PSN 系の改良。抄録のみ確認）。 | — 参照のみ |
| 29 | [Accelerating Linear Recurrent Neural Networks for the Edge with Unstructured Sparsity](https://arxiv.org/abs/2502.01330) | 2025 | ICML 2025 | 最新 | 疎な線形 RNN を Loihi 2 で動かし、同じ精度で計算量を半分にした（抄録のみ確認）。ハードウェアとの整合の続編候補。 | — 参照のみ |
| 30 | [Scaling Up Resonate-and-Fire Networks for Fast Deep Learning (S5-RF)](https://arxiv.org/abs/2504.00719) | 2025 | arXiv | 発展 | S5 の構造と HiPPO 初期化を使う RF ニューロン。SiLIF と PMSN の比較対象（抄録のみ確認）。 | — 参照のみ |
| 31 | [Revisiting Reset Mechanisms in Spiking Neural Networks for Sequential Modeling](https://arxiv.org/abs/2504.17751) | 2025 | arXiv | 最新 | 系列モデリングにおけるリセットの役割の再検討（arXiv 検索で題名のみ確認）。 | — 参照のみ |
| 32 | [Modern Neuromorphic AI: From Intra-Token to Inter-Token Processing](https://arxiv.org/abs/2601.00245) | 2026 | arXiv | 最新 | SNN・SSM・Transformer の関係を「トークン内／トークン間処理」で整理した総説（抄録のみ確認）。 | — 参照のみ |
| 33 | [Parallelized Hierarchical Connectome: A Spatiotemporal Recurrent Framework for Spiking State-Space Models](https://arxiv.org/abs/2604.01295) | 2026 | arXiv（Neural Networks 投稿中） | 最新 | 対角 SSM に層内の空間再帰と生物学的な事前知識を加えた PHCSSM（抄録のみ確認。単著のため参照のみ）。 | — 参照のみ |
| 34 | [LongSpike: Fractional Order Spiking State Space Models for Efficient Long Sequence Learning](https://arxiv.org/abs/2606.12895) | 2026 | arXiv | 最新 | 分数階 SSM をスパイク化し、LRA・WikiText-103 で評価（抄録のみ確認）。 | — 参照のみ |
| 35 | [Phase State Space Models: Parallel, Surrogate-Free Training of Spiking Networks](https://arxiv.org/abs/2608.07754) | 2026 | arXiv | 最新 | 共鳴発火ネットワークを位相 SSM として並列に学習する（抄録のみ確認。単著で定量評価が限られるため参照のみ）。 | — 参照のみ |

---

<a id="energy-evaluation"></a>

## エネルギー評価の方法論（理論推定と実機計測の差）（energy-evaluation/）

資料：[energy-evaluation.pptx](energy-evaluation/energy-evaluation.pptx) ／ [energy-evaluation.pdf](energy-evaluation/energy-evaluation.pdf) ／ 生成元 [spec.json](energy-evaluation/spec.json)


### 調査履歴
- 2026-10-23: arXiv API と WebSearch（"spiking energy estimation", "memory access / data movement", "fair comparison ANN", "Loihi 2 vs Jetson measured" など）で 2024〜2026 年の動向を把握した。起点にしたのは Yan+（TCAD 2026, v6）、Höfflin & Wassner（2025）、Gamage+（2026）と、2026 年のプレプリント群（Sparsity Tax、Sparsity Ceiling、表現力で正規化した比較、モダリティ別ベンチマーク）。
- そこから3本の系譜を原典側へ遡った。(a) 解析モデル：Horowitz の演算単価 → Davidson & Furber 2021（メモリ込みの損益分岐）→ Lemaire 2022 → Yan 2026（容量を揃えた QNN 双子）。(b) HWシミュレータ：SpinalFlow → SATA → Bhattacharjee 2024。(c) 公平な比較と実測：Ottati 2023（公表チップの横断比較）、Shen 2024（量子化ANN）、Xu 2025（同一プロセッサ）、Gamage 2026（Loihi 2 実機）。
- OA 版を探した結果：Davidson & Furber は Frontiers、Shen は CVF Open Access で全文を読めた。Horowitz 2014、Dampfhoffer+ 2023（HAL は到達不可、S2 では CLOSED）、SpinalFlow、Deng+ 2020 は OA 版に到達できず、本文未確認とした。OpenAlex はレート制限のため使えず、Crossref と Semantic Scholar でメタデータを確認した。
- 既存テーマとの重複：NeuroBench・floorline・SNABSuite・KWS on Loihi（neuromorphic-hardware）と Spikformer（spiking-transformer）は再掲せず、既存デッキへの参照とした。

### 系譜
```
[演算単価の原典] Horowitz ISSCC 2014 (⚠️: 45nm で MAC≈4.6pJ / AC≈0.9pJ、SRAM/DRAM アクセス単価)
   │  ← 多くの SNN 論文が「MAC/AC 回数×単価」で省エネを主張する根拠
   ▼
[解析モデル：メモリ込み]
Davidson & Furber 2021（N_spk<1.72 の損益分岐）
  ├→ Lemaire+ 2022（メモリ・アドレス計算込み、HW非依存。SNN 6〜8倍有利と推定）
  │     └→ Höfflin & Wassner 2025（HW非依存と HW考慮で結論が反転）
  ├→ Dampfhoffer+ 2023 (⚠️: Eyeriss 型でデータ再利用込み。0.15〜1.38 スパイク/シナプス)
  ├→ Ottati+ 2023（公表チップの実測を横断比較。静的画像は ANN がパレート優位）
  └→ Yan+ 2026（容量を揃えた QNN-SNN 双子、NoC・再利用込みの閉形式損益分岐）
        ↑ 比較相手を量子化 ANN に：Shen+ 2024（Bit Budget：T時刻 SNN ≈ Tビット QANN）
[HWシミュレータ]
SpinalFlow 2020 (⚠️) → SATA 2022（スパース性考慮のエネルギー推定基盤）
                      → Bhattacharjee+ 2024（推定 10〜83倍 → 実効 1.3〜6.8倍）
[同一HW・実チップでの計測]
Xu+ 2025（SENECA 上でスパース化 ANN と SNN を同条件比較、ゲートレベル電力）
  → Gamage+ 2026（Loihi 2 実機 vs Jetson/M2、動的・静的・EDP を分離）
  （既存：KWS on Loihi 2018 → SNABSuite 2022 → NeuroBench 2025 → floorline 2025）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Comparison of Artificial and Spiking Neural Networks on Digital Hardware](https://doi.org/10.3389/fnins.2021.651141) | 2021 | Frontiers in Neuroscience | 原典 | 同一デジタル回路上で ANN と レート符号化 SNN の費用を分解し、メモリアクセスを含めると平均 1.72 スパイク/活性値未満でないと SNN は勝てないと示した（Frontiers OA 版で全文確認） | ✅ p.2 |
| 2 | [SATA: Sparsity-Aware Training Accelerator for Spiking Neural Networks](https://arxiv.org/abs/2204.05422) | 2022 | IEEE TCAD | 発展 | BPTT 学習 SNN 用のスパース性考慮加速器とエネルギー推定枠組み。Eyeriss 型 ANN 比で SNN 学習は 1.27 倍、メモリ（GLB/DRAM）が支配的 | ✅ p.3 |
| 3 | [An Analytical Estimation of Spiking Neural Networks Energy Efficiency](https://arxiv.org/abs/2210.13107) | 2022 | ICONIP | 発展 | シナプス演算・メモリ・アドレス計算を数える HW非依存の指標。3データセットで SNN 6〜8 倍省エネと推定 | ✅ p.4 |
| 4 | [To Spike or Not To Spike: A Digital Hardware Perspective on Deep Learning Acceleration](https://arxiv.org/abs/2306.15749) | 2023 | IEEE JETCAS | 発展 | ANN/SNN 加速器を簡易モデルと公表チップの実測で比較。ImageNet では SNPU'23（1.95mJ）が同じ 28nm の ANN（0.46mJ）にパレート支配される | ✅ p.5 |
| 5 | [Are SNNs Truly Energy-efficient? — A Hardware Perspective](https://arxiv.org/abs/2309.03388) | 2024 | ICASSP | 発展 | FLOPs×T×スパース率による推定省エネを SATA/SpikeSim で再評価し、推定 10〜83 倍が実効 1.3〜6.8 倍に縮むことを示した | ✅ p.6 |
| 6 | [Are Conventional SNNs Really Efficient? A Perspective from Network Quantization](https://arxiv.org/abs/2311.10802) | 2024 | CVPR | 発展 | T 時刻 SNN と T ビット QANN の等価性を示し、SynOps に代わる Bit Budget / S-ACE を提案（CVF Open Access 版で全文確認） | ✅ p.7 |
| 7 | [Event-based Optical Flow on Neuromorphic Processor: ANN vs. SNN Comparison based on Activation Sparsification](https://arxiv.org/abs/2407.20421) | 2025 | Neural Networks | 発展 | SENECA 上でスパース化した ANN と SNN を同条件で比較（SNN はエネルギー 75.2%）。差の要因は画素単位の密度 | ✅ p.8 |
| 8 | [Hardware-aware vs. Hardware-agnostic Energy Estimation for SNN in Space Applications](https://arxiv.org/abs/2508.19654) | 2025 | IAA-SPAICE | 最新 | 同じ SNN/CNN に HW非依存と HW考慮の推定を適用。前者は一律 50〜60% 省エネ、後者はメモリ単価比と HW 種別で結論が反転 | ✅ p.9 |
| 9 | [Reconsidering the Energy Efficiency of Spiking Neural Networks Inference from Analytical Perspectives](https://arxiv.org/abs/2409.08290) | 2026 | IEEE TCAD | 最新 | 容量を揃えた QNN-SNN 双子とデータ移動込みの第一原理モデル。典型条件で T=5 ならスパイク率 5.7% 未満が必要 | ✅ p.10 |
| 10 | [Real-Time Frame- and Event-based Object Detection with Spiking Neural Networks on Edge Neuromorphic Hardware: Design, Deployment and Benchmark](https://arxiv.org/abs/2605.00146) | 2026 | Neurocomputing | 最新 | Loihi 2 実機の SNN 検出と Jetson/M2 の ANN を実測比較。動的エネルギーは Loihi 2 が最小だが EDP は Orin Nano が最良、静的電力が支配的 | ✅ p.11 |
| 11 | [1.1 Computing's energy problem (and what we can do about it)](https://doi.org/10.1109/ISSCC.2014.6757323) | 2014 | ISSCC | 原典 | 45nm の演算・メモリアクセスのエネルギー単価表（SNN 論文の E_MAC=4.6pJ、E_AC=0.9pJ の出典）。引用元論文の記述と検索情報に基づく。IEEE は到達不可、S2 では CLOSED | ⚠️ 本文未確認 |
| 12 | [Are SNNs Really More Energy-Efficient Than ANNs? an In-Depth Hardware-Aware Study](https://doi.org/10.1109/TETCI.2022.3214509) | 2023 | IEEE TETCI | 発展 | Eyeriss を事例に、データ再利用・スパース性・メモリを含めた ANN 効率の上限と比較し、SNN が勝つには 0.15〜1.38 スパイク/シナプス程度の高いスパース性が必要と示した（検索情報と引用元に基づく。HAL 版は到達不可） | ⚠️ 本文未確認 |
| 13 | [SpinalFlow: An Architecture and Dataflow Tailored for Spiking Neural Networks](https://doi.org/10.1109/ISCA45697.2020.00038) | 2020 | ISCA | 原典 | 系統配列上の SNN 専用データフロー。レート符号化 SNN は Row-Stationary の Eyeriss より最大約 60 倍、16 時刻の SNN は ANN より最大約 16 倍エネルギーを要すると指摘（それぞれ SATA と Bhattacharjee の記述に基づく） | ⚠️ 本文未確認 |
| 14 | [Rethinking the performance comparison between SNNS and ANNS](https://doi.org/10.1016/j.neunet.2019.09.005) | 2020 | Neural Networks | 原典 | 画像入力では SNN は精度・演算量とも不利、イベントカメラ入力では有利と演算数ベースで比較（Xu+ 2025 の記述に基づく。非 OA） | ⚠️ 本文未確認 |
| 15 | [Synaptic Activity and Hardware Footprint of Spiking Neural Networks in Digital Neuromorphic Systems](https://doi.org/10.1145/3520133) | 2022 | ACM TECS | 発展 | FPGA 上で ANN/SNN 加速器を設計し、演算数指標と実際の消費の不一致を示した（Lemaire+ 2022 の記述に基づく） | ⚠️ 本文未確認 |
| 16 | [SpikeSim: An end-to-end Compute-in-Memory Hardware Evaluation Tool for Benchmarking Spiking Neural Networks](https://arxiv.org/abs/2210.12899) | 2023 | IEEE TCAD | 発展 | RRAM クロスバ上の SNN の精度・エネルギー・遅延・面積を評価するツール。#5 で用途と結果を代表させたため参照のみ | — 参照のみ |
| 17 | [STEP: A Unified Spiking Transformer Evaluation Platform for Fair and Reproducible Benchmarking](https://arxiv.org/abs/2505.11151) | 2025 | NeurIPS | 最新 | Spiking Transformer の統一ベンチマーク。エネルギー節（Sec. 5.5）では、ビット直列の量子化 Transformer（16.5mJ）がメモリ込みで Spiking Transformer（17.2mJ）を下回ると示す。主題が Transformer 評価全般のため参照のみ（エネルギー節のみ精読） | — 参照のみ |
| 18 | [Energy efficiency analysis of Spiking Neural Networks for space applications](https://arxiv.org/abs/2505.11418) | 2025 | Astrodynamics | 最新 | EuroSAT 分類で SNN 各手法を比較し、HW非依存の EMAC 指標を提案（#8 が比較対象とした手法）。アブストラクトと #8 の記述のみ確認のため参照のみ | — 参照のみ |
| 19 | [Towards an Expressivity-Normalized Energy-Demand Comparison of ANNs and SNNs](https://arxiv.org/abs/2608.29869) | 2026 | arXiv プレプリント | 最新 | 線形領域数の上界で表現力を揃えた ANN/SNN のエネルギー比 η を定義し、幅・スパース性・深さの臨界値を導出。4頁の理論的試論で実証が乏しいため参照のみ（全文確認） | — 参照のみ |
| 20 | [The Sparsity Tax: Weight Sparsity Trade-offs in Event-Driven SIMD and SIMT Neuromorphic Cores](https://arxiv.org/abs/2607.22790) | 2026 | IEEE MCSoC | 最新 | 重みスパース化が SIMD 型神経形態コアに課す制御・メタデータ・メモリの「税」を GF22 ゲートレベルで定量化。重み側スパース性の扱いが主題のため参照のみ（本文の大半を確認） | — 参照のみ |
| 21 | [The Sparsity Ceiling: Where Spiking Networks Can and Cannot Trade Activity for Energy](https://arxiv.org/abs/2607.26648) | 2026 | arXiv プレプリント | 最新 | 発火率を下げられる限界は課題依存（順伝播知覚は 5%、再帰 LM は約 50% が下限）と主張。単著 5 頁でアブストラクト中心の確認のため参照のみ | — 参照のみ |
| 22 | [Benchmarking spiking neural networks across sensing modalities on edge devices](https://arxiv.org/abs/2609.00026) | 2026 | arXiv プレプリント | 最新 | 5 モダリティ・7 物理エッジ機器・4 神経形態シミュレータで 4,662 評価。SNN の省エネは 1.27〜29.58 倍とモダリティ依存で、遅延・メモリは悪化。エネルギー計測法の記述が補足資料頼みのため参照のみ（本文確認） | — 参照のみ |
| 23 | [Energy Aware Development of Neuromorphic Implantables: From Metrics to Action](https://arxiv.org/abs/2506.09599) | 2025 | arXiv プレプリント | 最新 | SNN ベンチマーク文献のエネルギー指標 13 種を、入手性・忠実度・行動可能性・傾向分析の 4 観点で分類。アブストラクトのみ確認のため参照のみ | — 参照のみ |
| 24 | [Benchmarking Keyword Spotting Efficiency on Neuromorphic Hardware](https://arxiv.org/abs/1812.01739) | 2018 | arXiv プレプリント | 原典 | Loihi と CPU/GPU の動的エネルギー/推論の実測比較 | ↪ 既存：neuromorphic-hardware p.3 |
| 25 | [Benchmarking Neuromorphic Hardware and Its Energy Expenditure](https://doi.org/10.3389/fnins.2022.873935) | 2022 | Frontiers in Neuroscience | 発展 | SNABSuite と単価分解型のエネルギーモデル | ↪ 既存：neuromorphic-hardware p.5 |
| 26 | [NeuroBench: A Framework for Benchmarking Neuromorphic Computing Algorithms and Systems](https://arxiv.org/abs/2304.04640) | 2025 | Nature Communications | 最新 | synop・effective MAC 等の algorithm track 指標と system track 実測の標準 | ↪ 既存：neuromorphic-hardware p.10 |
| 27 | [Modeling and Optimizing Performance Bottlenecks for Neuromorphic Accelerators](https://arxiv.org/abs/2511.21549) | 2025 | arXiv プレプリント | 最新 | 総 synop などの代理指標は実機性能を説明できないと示した floorline モデル | ↪ 既存：neuromorphic-hardware p.11 |
| 28 | [Spikformer: When Spiking Neural Network Meets Transformer](https://arxiv.org/abs/2209.15425) | 2022 | ICLR 2023 | 発展 | Horowitz 単価による SOP ベースのエネルギー推定を用いる代表例（#6・#17 の比較対象） | ↪ 既存：spiking-transformer p.3 |
| 29 | [Conversion of Continuous-Valued Deep Networks to Efficient Event-Driven Networks for Image Classification](https://doi.org/10.3389/fnins.2017.00682) | 2017 | Frontiers in Neuroscience | 原典 | ANN→SNN 変換。#1 が想定するレート符号化 SNN の出所 | ↪ 既存：training p.3 |

---

<a id="spike-coding"></a>

## スパイク符号化と量子化の境界（spike-coding/）

資料：[spike-coding.pptx](spike-coding/spike-coding.pptx) ／ [spike-coding.pdf](spike-coding/spike-coding.pdf) ／ 生成元 [spec.json](spike-coding/spec.json)


### 調査履歴
- 2026-10-23（第2回調査）: arXiv API（`spiking` × time-to-first-spike/TTFS、graded/multi-level/integer spike、quantized、coding/encoding のタイトル検索、新しい順）と Web 検索で 2025〜2026 年の動向をつかんだ。TTFS-LLM（1.5B）、2 進時間重み符号の Spora、I-LIF/SFA の注意での等価性の破れ（PT-SSA）、TTFS の多面体幾何、QNN との公平なエネルギー比較（QNN-SNN 双子）が見つかった。
- そこから 3 つの系譜を原典まで遡った。①時間符号（Mostafa 2017 → Stanojevic+ 2024 → TTFS-LLM / 多面体幾何）、②位取り符号（位相/バースト：Park+ 2019 → FS ニューロン：Stöckl & Maass 2021 → Spora）、③レート符号＝量子化（Rueckauer+ 2017〔既存：training〕→ Fast-SNN → I-LIF → PT-SSA、および QNN-SNN 双子のエネルギー比較）。
- 本文は arXiv で読んだ（DAC・Nature MI・TPAMI・Nature Commun.・ECCV・TCAD 採録版に対応する arXiv 版）。位相符号の原典 Kim+ 2018、TTFS 変換の原典 Rueckauer & Liu 2018、Thorpe+ 2001 は出版社サイトにしかなく、本文未確認。OpenAlex は当日の無料枠を使い切っており（429）、Semantic Scholar も 429 で、OA 版の探索は Crossref と arXiv 検索に限られた。
- 既存テーマとの重複：QCFS・Rueckauer+ 2017（training）、E-SpikeFormer/SFA・SpikeLLM・SpikingBrain（spiking-transformer）は再掲せず、s6 と系譜図で参照した。spiking-transformer で題目のみ参照していた「LLM with At Most One Spike per Neuron」と Spora は、本テーマで全文を読みスライド化した。

### 系譜
```
[時間符号 TTFS]  Thorpe+ 2001 (未確認) ─ Maass 1997 (未確認)
                    ↓
                 Mostafa 2017（z=e^t で区分線形） ──────────────→ TTFS 多面体幾何 (Singh+ 2026：ReLU より細かい分割)
                    ↓ (Rueckauer & Liu 2018 変換, 未確認 / Göltz+ 2021)
                 Stanojevic+ 2024（TTFS≡ReLU、0.3 spikes/neuron）
                    ↓
                 TTFS-LLM (Zhao+ 2026：R-TTFS で BERT / GPT-2 1.5B)

[位取り符号]      位相符号 Kim+ 2018 (未確認) → バースト/位相 Park+ 2019 → FS ニューロン (Stöckl & Maass 2021：K ステップ＝K ビット)
                                                                       ↓
                                                         Spora (Liu+ 2026：2 進時間重み UBS/BBS＋シフト注意)

[レート符号＝量子化] Rueckauer+ 2017 (既存：training) → QCFS 2022 (既存：training)
                    ↓
                 Fast-SNN (Hu+ 2023：T=2^b−1 で一様量子化と等価) ─→ QNN-SNN 双子のエネルギー比較 (Yan+ 2024/2026)
                    ↓
                 SpikeYOLO / I-LIF (Luo+ 2024：整数で学習しスパイクで推論)
                    ↓ → E-SpikeFormer / SFA (2024, 既存：spiking-transformer) → SpikingBrain (既存)
                 PT-SSA (Xue+ 2026：注意では整数⇔スパイクの等価性が崩れる TIM を解消)
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Supervised learning based on temporal coding in spiking neural networks](https://arxiv.org/abs/1606.08165) | 2017 | IEEE TNNLS 2018 | 原典 | 発火時刻を z=e^t に変換すると入出力が区分線形になり、1 スパイク/ニューロンの SNN を逆伝播で直接学習できる。MNIST 誤り 2.45%。 | ✅ p.2 |
| 2 | [Fast and Efficient Information Transmission with Burst Spikes in Deep Spiking Neural Networks](https://arxiv.org/abs/1809.03142) | 2019 | DAC | 原典 | 閾値を下げて連発させるバースト符号と、入力＝位相・隠れ＝バーストのハイブリッド符号。CIFAR-10 VGG-16 で DNN と同じ 91.41% を、より少ないステップとスパイクで達成。 | ✅ p.3 |
| 3 | [Optimized spiking neurons can classify images with high accuracy through temporal coding with two spikes](https://arxiv.org/abs/2002.00860) | 2021 | Nature Machine Intelligence | 発展 | 時刻ごとの重み d(t) をもつ FS ニューロン。ReLU では K ステップの 2 進符号になる。EfficientNet-B7 を ImageNet 83.57%・約 2 スパイク/ニューロンで変換。 | ✅ p.4 |
| 4 | [Fast-SNN: Fast Spiking Neural Network by Converting Quantized ANN](https://arxiv.org/abs/2305.19868) | 2023 | IEEE TPAMI | 発展 | IF の発火率と b ビット一様量子化が T=2^b−1 で等価。QAT 済み ANN を変換し、ImageNet VGG-16 を T=3 で 71.31%。符号付き IF で順序誤差を除く。 | ✅ p.5 |
| 5 | [High-performance deep spiking neural networks with 0.3 spikes per neuron](https://arxiv.org/abs/2306.08744) | 2024 | Nature Communications | 発展 | 閾値交差時の傾き B=1 の恒等写像で、TTFS-SNN の学習軌道が ReLU と一致。CIFAR100 72.24%、L1 正則化で 0.20〜0.27 スパイク/ニューロン。 | ✅ p.6 |
| 6 | [Integer-Valued Training and Spike-Driven Inference Spiking Neural Network for High-performance and Energy-efficient Object Detection (SpikeYOLO)](https://arxiv.org/abs/2407.20708) | 2024 | ECCV | 発展 | 整数 0..D で学習し、推論では D 個の仮想ステップのスパイクに展開する I-LIF。COCO mAP@50 66.2%。D を増やす方が T を増やすより効く。 | ✅ p.7 |
| 7 | [Reconsidering the Energy Efficiency of Spiking Neural Networks Inference from Analytical Perspectives](https://arxiv.org/abs/2409.08290) | 2024 | IEEE TCAD 2026 | 発展 | T ステップ SNN と ⌈log2(T+1)⌉ ビット QNN を「双子」として、データ移動込みでエネルギーを比較。SNN が有利なのは T≤5・スパイク率 5.7% 未満程度。 | ✅ p.8 |
| 8 | [Large Language Models with At Most One Spike per Neuron](https://arxiv.org/abs/2609.05151) | 2026 | arXiv | 最新 | 参照時刻つき R-TTFS で LayerNorm・注意まで TTFS 化した LLM。GPT-2 XL（1.5B）まで拡大。GLUE はベースラインに迫るが、言語モデリングの ppl は大きく劣化。 | ✅ p.9 |
| 9 | [Polyhedral Geometry of Time-to-First-Spike Neural Networks](https://arxiv.org/abs/2609.11227) | 2026 | arXiv | 最新 | 正の重みの TTFS ネットの因果領域を多面体幾何で解析。maxout 型で指数個のアフィン片をもち、ReLU より細かい分割を作れる（上下界と実験）。 | ✅ p.10 |
| 10 | [Parallel Time-Aligned Spiking Self-Attention for Consistent Integer-Valued Training and Spike-Driven Inference](https://arxiv.org/abs/2610.03291) | 2026 | arXiv | 最新 | I-LIF/SFA を自己注意に使うと、時刻をまたぐ積で整数推論とスパイク推論が食い違う（TIM、ImageNet で −27.78pt）。時刻をそろえた並列注意で差を 0.06pt に。 | ✅ p.11 |
| 11 | [Rethinking the Tradeoff Between Temporal Encoding and Nonlinear Computation in Spiking Language Models (Spora)](https://arxiv.org/abs/2610.10933) | 2026 | arXiv | 最新 | 2 進時間重みの UBS/BBS 符号とシフト近似 softmax。4 ステップで GLUE 76.6。同じ状態数の静的 4bit QAT より CoLA で +6.43 MCC。 | ✅ p.12 |
| 12 | [Deep neural networks with weighted spikes (Kim+)](https://doi.org/10.1016/j.neucom.2018.05.087) | 2018 | Neurocomputing | 原典 | 位相符号（重み付きスパイク）による ANN→SNN 変換の原典。閾値を 2^−(1+t mod k) で振動させ、k ステップで k ビットを送る（Park+ 2019 の記述に基づく）。 | ⚠️ 本文未確認 |
| 13 | [Conversion of analog to spiking neural networks using sparse temporal coding (Rueckauer & Liu)](https://doi.org/10.1109/ISCAS.2018.8351295) | 2018 | ISCAS | 原典 | ReLU ネットを TTFS SNN に変換する最初期の手法（Stanojevic+・TTFS-LLM・FS 論文の記述に基づく）。IEEE のため本文にアクセスできない。 | ⚠️ 本文未確認 |
| 14 | [Spike-based strategies for rapid processing (Thorpe+)](https://doi.org/10.1016/S0893-6080(01)00083-1) | 2001 | Neural Networks | 原典 | 最初のスパイク時刻・順位で情報を表す（rank-order coding）生物学的な根拠と戦略。TTFS 系の引用元。出版社サイトのみ。 | ⚠️ 本文未確認 |
| 15 | [Networks of spiking neurons: The third generation of neural network models (Maass)](https://doi.org/10.1016/S0893-6080(97)00011-7) | 1997 | Neural Networks | 原典 | スパイク時刻で計算する SNN の計算能力の古典。多面体幾何論文が普遍性の出発点として引用。 | ⚠️ 本文未確認 |
| 16 | [Fast and energy-efficient neuromorphic deep learning with first-spike times (Göltz+)](https://arxiv.org/abs/1912.11443) | 2021 | Nature Machine Intelligence | 発展 | BrainScaleS-2 上の TTFS 学習（絶対時刻方式）。Mostafa と Stanojevic の間をつなぐが、紙幅の都合で参照のみ。 | — 参照のみ |
| 17 | [An Exact Mapping From ReLU Networks to Spiking Neural Networks (Stanojevic+)](https://arxiv.org/abs/2212.12522) | 2023 | Neural Networks | 発展 | ReLU→TTFS の厳密写像（α1 モデル）。2024 論文の前提。題目と 2024 論文中の記述のみ確認。 | — 参照のみ |
| 18 | [Conversion of Continuous-Valued Deep Networks to Efficient Event-Driven Networks for Image Classification (Rueckauer+)](https://doi.org/10.3389/fnins.2017.00682) | 2017 | Front. Neurosci. | 原典 | レート符号変換の基準。Fast-SNN・FS 論文の比較対象。 | ↪ 既存：training p.3 |
| 19 | [Optimal ANN-SNN Conversion for High-accuracy and Ultra-low-latency Spiking Neural Networks (QCFS)](https://arxiv.org/abs/2303.04347) | 2022 | ICLR | 発展 | 量子化 clip-floor-shift 活性による変換。Fast-SNN と並ぶ「レート符号＝量子化」の代表。 | ↪ 既存：training p.9 |
| 20 | [Scaling Spike-driven Transformer with Efficient Spike Firing Approximation Training (E-SpikeFormer / SFA)](https://arxiv.org/abs/2411.16061) | 2024 | IEEE TPAMI 2025 | 発展 | I-LIF を正規化した SFA。PT-SSA が注意での等価性の破れを指摘した対象。 | ↪ 既存：spiking-transformer p.9 |
| 21 | [SpikeLLM: Scaling up Spiking Neural Network to Large Language Models via Saliency-based Spiking](https://arxiv.org/abs/2407.04752) | 2024 | ICLR 2025 | 発展 | GIF ニューロン（多値スパイク）で LLM をスパイク化。TTFS-LLM・Spora の比較文脈。 | ↪ 既存：spiking-transformer p.7 |
| 22 | [SpikingBrain: Spiking Brain-inspired Large Models](https://arxiv.org/abs/2509.05276) | 2025 | arXiv | 最新 | 整数→スパイク符号化で 7B/76B を構成。I-LIF/SFA 系譜の大規模版。 | ↪ 既存：spiking-transformer p.10 |
| 23 | [Modeling and Optimizing Performance Bottlenecks for Neuromorphic Accelerators (Floorline)](https://arxiv.org/abs/2511.21549) | 2025 | arXiv | 関連 | ニューロモルフィック計算の性能上限モデル。Yan+ のエネルギー比較と相補的。 | ↪ 既存：neuromorphic-hardware p.11 |
| 24 | [SpikeLM: Towards General Spike-Driven Language Modeling via Elastic Bi-Spiking Mechanisms](https://arxiv.org/abs/2406.03287) | 2024 | ICML 2024 | 発展 | 双方向・振幅可変（3 値）スパイクの言語モデル。Spora・TTFS-LLM の主な比較対象。 | — 参照のみ（spiking-transformer でも参照のみ） |
| 25 | [Sorbet: A Neuromorphic Hardware-Compatible Transformer-Based Spiking Language Model](https://arxiv.org/abs/2409.15298) | 2024 | ICML 2025 | 発展 | シフト型 softmax・PowerNorm を使う 16 ステップのスパイキング言語モデル。Spora の比較対象。 | — 参照のみ |
| 26 | TTFSFormer: A TTFS-based Lossless Conversion of Spiking Transformer (Zhao, Huang, Ding, Yu) | 2025 | ICML | 発展 | TTFS による Transformer の無損失変換（TTFS-LLM の関連研究の記述に基づく）。本文未取得。 | — 参照のみ |
| 27 | SpikedAttention: Training-free and fully spike-driven transformer-to-SNN conversion with winner-oriented spike shift for softmax operation (Hwang+) | 2024 | NeurIPS | 発展 | 時間符号による Transformer 変換（TTFS-LLM の引用に基づく）。本文未取得。 | — 参照のみ |
| 28 | [Ternary Spike: Learning Ternary Spikes for Spiking Neural Networks](https://arxiv.org/abs/2312.06372) | 2023 | AAAI 2024 | 発展 | {−1,0,1} の 3 値スパイク。多値スパイクの一系統として検索で確認（未読）。 | — 参照のみ |
| 29 | [ShiftLIF: Efficient Multi-Level Spiking Neurons with Power-of-Two Quantization](https://arxiv.org/abs/2605.01866) | 2026 | arXiv | 最新 | 膜電位を 2 のべき乗の多値スパイクに写す LIF。抄録のみ確認（Spora と同じ方向）。 | — 参照のみ |
| 30 | [Burst Spiking Neural Networks (BuSNN)](https://arxiv.org/abs/2607.11914) | 2026 | arXiv（TPAMI 投稿） | 最新 | バースト発火による段階的スパイクで頑健性を高める。抄録のみ確認。 | — 参照のみ |
| 31 | [Latency and accuracy tradeoffs in Spiking Neural Networks (Falcon)](https://arxiv.org/abs/2609.35260) | 2026 | arXiv | 最新 | 層間のタイムステップ単位パイプラインにより、SNN が bit-serial QNN より速く終わりうる。待つほど遅く不正確になる層もあると証明。導入部と問題設定のみ精読し、音声 KWS・アナログ CIM に特化しているため参照のみ。 | — 参照のみ |
| 32 | [Revisiting Reset Mechanisms in Spiking Neural Networks for Sequential Modeling](https://arxiv.org/abs/2504.17751) | 2025 | arXiv | 最新 | 画像では SNN は量子化活性 ANN と同じで、系列では 2 値活性 RNN と見るべきと主張。抄録のみ確認。 | — 参照のみ |
| 33 | [NEXUS: Bit-Exact ANN-to-SNN Equivalence via Neuromorphic Gate Circuits](https://arxiv.org/abs/2601.21279) | 2026 | arXiv | 最新 | IF ニューロンの論理ゲートで IEEE-754 演算を組み、ビット単位で ANN と等価にすると主張。単著・自己申告の数値が多く、抄録のみ確認。 | — 参照のみ |
| 34 | [Closing the Theory-Practice Gap in Spiking Transformers via Effective Dimension](https://arxiv.org/abs/2604.15769) | 2026 | arXiv | 最新 | レート歪み理論によるスパイク数の下界 Ω(L²nd/ε²) と有効次元による説明。6 頁の短報で、抄録のみ確認。 | — 参照のみ |
| 35 | [Energy-Efficient and Dequantization-Free Q-LLMs: A Spiking Neural Network Approach to Salient Value Mitigation (SpikeQuant)](https://arxiv.org/abs/2510.19498) | 2025 | arXiv | 最新 | 量子化 LLM の外れ値活性だけをスパイク列に再符号化し、混合精度を時間方向で実現。抄録のみ確認。 | — 参照のみ |
| 36 | [Rate Coding or Direct Coding: Which One is Better for Accurate, Robust, and Energy-efficient Spiking Neural Networks?](https://arxiv.org/abs/2202.03133) | 2022 | ICASSP | 発展 | 入力のレート符号と直接（実数）符号の比較。題目と抄録のみ確認。 | — 参照のみ |
| 37 | [Integer Binary-Range Alignment Neuron for Spiking Neural Networks](https://arxiv.org/abs/2506.05679) | 2025 | arXiv | 最新 | 整数値ニューロンの範囲合わせ。I-LIF 系の派生として題目のみ確認。 | — 参照のみ |
