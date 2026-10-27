## 学習手法（training/）

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
