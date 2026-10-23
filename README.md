# SNN（スパイキングニューラルネットワーク） — 先行研究調査

スパイクで情報を伝えるニューラルネットワーク（SNN）について、学習手法・大規模化・それを動かすハードウェアの系譜をまとめる。テーマは調査者の提案による（学習手法／Spiking Transformer・大規模化／ニューロモルフィックハードウェアと応用）。

落合陽一フォーマット（1論文1スライド）のデッキをテーマごとに置いている。テンプレートと生成ツール（`template/`, `tools/ochiai/`）は main ブランチから引き継いでいる。

## テーマ一覧

| テーマ | 範囲 | 資料 | スライド化 | 一覧掲載 | 調査日 |
| --- | --- | --- | --- | --- | --- |
| [学習手法](#training) | STDP・ANN-SNN 変換・サロゲート勾配・e-prop・EventProp から並列学習まで | [pptx](training/training.pptx) / [pdf](training/training.pdf) | 12 本 | 37 本 | 2026-10-23 |
| [Spiking Transformer・大規模化](#spiking-transformer) | 深い残差 SNN から Spiking Transformer、スパイキング LLM とスケーリング則まで | [pptx](spiking-transformer/spiking-transformer.pptx) / [pdf](spiking-transformer/spiking-transformer.pdf) | 11 本 | 37 本 | 2026-10-23 |
| [ニューロモルフィックハードウェアと応用](#neuromorphic-hardware) | TrueNorth・Loihi 2・Speck・SpiNNaker2 などのチップと、ベンチマーク・エッジ応用 | [pptx](neuromorphic-hardware/neuromorphic-hardware.pptx) / [pdf](neuromorphic-hardware/neuromorphic-hardware.pdf) | 12 本 | 31 本 | 2026-10-23 |

合計：スライド化 35 本、引用論文一覧 105 本（テーマ間の重複を含む）。

## 調査履歴

| 日付 | 内容 |
| --- | --- |
| 2026-10-23 | 初回調査。「学習手法」、「Spiking Transformer・大規模化」、「ニューロモルフィックハードウェアと応用」 の各テーマについて、2024〜2026 年の最新動向から系譜を原典まで遡って調査。本文は arXiv と正規のオープンアクセス版（OpenReview・学会予稿集・OA 誌など）で全文を確認した論文のみスライド化。出版社サイトのみで公開されている原典は ⚠️ 本文未確認として一覧に記載。 |

## 追加調査を推奨するテーマ

全テーマの調査を通して見えた、この分野で次に調べるべきテーマ。各テーマ節の末尾にはテーマ単位の候補もある。

1. **時間方向の並列学習とスパイキング状態空間モデル**  
   学習手法側の FidLIF・PSN・FPT と、大規模化側の SpikingSSMs・SpikingBrain の線形注意は、どちらも「BPTT の逐次性を崩して長系列を学ぶ」問題に集まっている。LIF への忠実性・逐次推論との両立・表現力のトレードオフを横断して比べる価値が高い。ハードウェア側でも Loihi 2 上の SSM・線形 RNN 実装が進んでいる。

2. **エネルギー評価の方法論（理論推定と実機計測の差）**  
   3テーマとも、省エネの主張の多くが 45nm の演算単価による理論推定にとどまっている（Spikformer〜SpikingBrain, BSD-Edge）。NeuroBench・floorline・SNABSuite は、synop などの代理指標が実機の性能を説明しきれないことを示した。「どの指標で SNN の効率を主張すべきか」を、実測研究とモデル化研究からまとめて整理すべき。

3. **スパイク符号化と量子化の境界（整数で学習し、スパイクで推論）**  
   E-SpikeFormer の SFA、SpikeLLM の GIF、SpikingBrain の適応閾値・ビット単位符号化は、どれも「何ステップで何ビットを運ぶか」という同じ問いへの答えで、ANN-SNN 変換（QCFS）とも地続きになっている。低ビット量子化研究との違いと、時間符号化（1ニューロン1スパイク）の可能性を横断して調べるとよい。

## 凡例

- 「スライド」列：`✅ p.N` はデッキの N ページ目（表紙が p.1）、`⚠️ 本文未確認` は影響が大きいが本文にアクセスできなかった論文（概要は書誌・検索情報に基づく）、`— 参照のみ` は調査過程で参照したがスライド化しなかった論文。
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
