## 自己・非自己識別と異常検知（negative-selection/）

### 調査履歴
- 2026-10-27: arXiv API と Web 検索で「negative selection」「artificial immune system × anomaly/intrusion/malware/fault」「dendritic cell algorithm」「danger theory」「immune-inspired」を 2024〜2026 から検索。最新の Immuno-VLM（ICML 2026）、ESIA（2026）、AAPD（RSOS 2025）、Li+ 2025（Scientific Reports、PMC の全文 HTML）を起点にした。
- 系譜は2本たどった。(A) 負の選択：Forrest+ 1994 → LISYS（Hofmeyr & Forrest 2000）→ ML 視点の再評価（Glickman+ 2005）→ 実数値 NSA のレビュー（Gupta & Dasgupta 2021）→ 2025〜2026 の基盤モデル上の負の選択。(B) 危険理論：Aickelin & Cayzer 2002 → DCA（Greensmith+ 2005）。Forrest 研究室の論文は UNM の著者公開 PDF、Aickelin 研究室の論文は arXiv の著者投稿版で全文を読んだ（Forrest+ 1994 は Type3 フォントで文字が抽出できず、ページ画像で読んだ）。
- 依頼範囲の V-detector（Ji & Dasgupta 2004）、Stibor らの批判（GECCO 2005 ほか）、Kim & Bentley 2001、Textor 2012、Stibor+ 2009（DCA の幾何学的解析）は、公開 PDF のあるホスト（gpbib.cs.ucl.ac.uk、cs.york.ac.uk、TUM、tuprints、johannes-textor.name 等）がいずれもプロキシで遮断され、本文未確認。V-detector と Stibor の結論は、Gupta & Dasgupta 2021 と Li+ 2025 の本文中の記述・実験（V-detector が NSL-KDD で検出率0.14%）で間接的に押さえた。
- IoT×AIS×深層学習（HAIS-IDS 2025、DeepDCA 2020）は出版社サイト（pan.pl、MDPI）が遮断され本文未確認。LLM の脱獄検知 IMAG（2025）は同分野 immune-network-ml の担当範囲（AI の免疫系）と重なるため参照のみとした。
- 軸「深層学習の異常検知に対して AIS がまだ有効な条件」についての整理：(1) 自己の表現が低次元・安定であること（Forrest 1994 の指数コスト式、Gupta 2021 の t-SNE 2次元での好成績、Li 2025 の高次元での崩壊）。(2) 自己を「多数派の仲間」として分散・オンラインに定義できること（LISYS、AAPD）。(3) 検出器を乱数でなく意味のある空間（LLM が生成した概念、基盤モデルの埋め込み）で作れること（Immuno-VLM、ESIA）。逆に Glickman 2005 と Li 2025 は、効いているのが免疫らしさではなく汎化や教師ラベル・KNN であることを示している。

### 系譜
```
[A] 負の選択（自己を学び、補集合を検出器で覆う）
  Forrest+ 1994 Negative Selection（r 連続一致、ファイル改ざん検知）
     ├→ Forrest+ 1996 Sense of Self（系列の正の検出、参照のみ）
     └→ Hofmeyr & Forrest 2000 ARTIS/LISYS（分散 NSA＋共刺激・記憶、侵入検知）
           └→ Glickman+ 2005（LISYS ≒ 1-NN、機構のアブレーション）
     ├→ 実数値 NSA：González & Dasgupta 2003 → V-detector (Ji & Dasgupta 2004/2009)（本文未確認）
     │     └→ 批判：Kim & Bentley 2001 / Stibor+ 2005（一クラス SVM に劣る、高次元で破綻）（本文未確認）
     │           └→ Gupta & Dasgupta 2021（レビュー＋一クラス手法20種との比較）
     │                 └→ Li+ 2025 Sci Rep（異常サンプルを検出器中心に＋KNN。従来 NSA は NSL-KDD で検出率1%未満）
     └→ 基盤モデル上の負の選択（2026）
           ├→ Immuno-VLM（LLM＝計算論的胸腺、意味的抗体で CLIP の OOD 検出）
           └→ ESIA（衛星異常監視、LLM プロンプトを負の選択でふるう）

[B] 危険理論（非自己ではなく危険に反応）
  Matzinger 1994（本文未確認）→ Aickelin & Cayzer 2002 → Aickelin+ 2003（IDS への提案）
     └→ Greensmith+ 2005 DCA → dDCA 2008 → Gu+ 2013（形式化・ノイズ）／ Stibor+ 2009（線形識別器と同等との批判、本文未確認）

[C] 免疫ネットワーク型の異常・故障検知
  Farmer, Packard & Perelson 1986（未調査）→ O'Keeffe 2025 AAPD（群ロボの劣化検知・診断）
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | [Self-Nonself Discrimination in a Computer](https://doi.org/10.1109/RISP.1994.296580)（[著者公開 PDF](https://www.cs.unm.edu/~forrest/publications/virus.pdf)） | 1994 | IEEE S&P | 原典 | 胸腺の負の選択を模した NSA の原典。自己と r 連続一致しない乱数列を検出器にし、ファイル改ざん・ウイルス感染を確率的に検知 | ✅ p.2 |
| 2 | [Architecture for an Artificial Immune System](https://doi.org/10.1162/106365600568257)（[著者公開 PDF](https://www.cs.unm.edu/~forrest/publications/hofmeyr_forrest.pdf)） | 2000 | Evolutionary Computation | 発展 | 分散 NSA に共刺激・記憶・寿命・表現多様性を加えた ARTIS と侵入検知 LISYS。実侵入7/7件、誤検知1.76件/日 | ✅ p.3 |
| 3 | [The Danger Theory and Its Application to Artificial Immune Systems](https://arxiv.org/abs/0801.3549) | 2002 | ICARIS | 原典 | 危険理論を AIS に紹介した概念論文。非自己でなく危険信号に反応する設計を提案 | ✅ p.4 |
| 4 | [Introducing Dendritic Cells as a Novel Immune-Inspired Algorithm for Anomaly Detection](https://arxiv.org/abs/1004.3196) | 2005 | ICARIS | 発展 | 樹状細胞アルゴリズム DCA の原典。PAMP・危険・安全信号を融合して抗原の文脈を判定 | ✅ p.5 |
| 5 | [A Machine Learning Evaluation of an Artificial Immune System](https://doi.org/10.1162/1063656054088512)（[著者公開 PDF](https://www.cs.unm.edu/~forrest/publications/lisys-ecj-05.pdf)） | 2005 | Evolutionary Computation | 発展 | LISYS を 1-NN の変種とみなし、免疫機構を足し引きして寄与を測定。効いたのは汎化と時間的集積 | ✅ p.6 |
| 6 | [Negative Selection Algorithm Research and Applications in the last decade: A Review](https://arxiv.org/abs/2105.06109) | 2021 | arXiv プレプリント | 発展 | NSA 30年を4期に整理し、V-detector 等を一クラス手法20種（AE・VAE・GAN 含む）と比較 | ✅ p.7 |
| 7 | [Detecting and Diagnosing Faults in Autonomous Robot Swarms with an Artificial Antibody Population Model](https://arxiv.org/abs/2412.19942) | 2025 | Royal Society Open Science | 最新 | 抗体集団動態で群ロボの徐々の劣化を検知・診断。完全故障は Ψ_T=1・Ψ_F=0、群の成果を理想の70〜97%に維持 | ✅ p.8 |
| 8 | [Generating detectors from anomaly samples via negative selection for network intrusion detection](https://doi.org/10.1038/s41598-025-20516-6)（[PMC 全文](https://pmc.ncbi.nlm.nih.gov/articles/PMC12534389/)） | 2025 | Scientific Reports | 最新 | 従来 NSA が高次元で検出器を作れない原因を分析し、異常サンプル中心の検出器＋KNN を提案。NSL-KDD 検出率73.45% | ✅ p.9 |
| 9 | [Immuno-VLM: Immunizing Large Vision-Language Models via Generative Semantic Antibodies for Open-World Trustworthiness](https://arxiv.org/abs/2605.30745) | 2026 | ICML | 最新 | LLM が生成した意味的抗体で CLIP の OOD 検出を学習する負の選択。ImageNet-O AUROC 83.4 | ✅ p.10 |
| 10 | [Earth Surface Immune System for Rapid Monitoring of Unknown Anomalies](https://arxiv.org/abs/2609.20662) | 2026 | arXiv プレプリント | 最新 | 衛星画像の未知異常を自然免疫段（位置特定）と獲得免疫段（負の選択で選んだプロンプトで認識）で監視 | ✅ p.11 |
| 11 | [Real-valued negative selection algorithm with variable-sized detectors](https://doi.org/10.1007/978-3-540-24854-5_30) | 2004 | GECCO（LNCS 3102） | 発展 | V-detector の原典。検出器ごとに半径を変え、少数の検出器で非自己を覆う（検索情報に基づく）。公開 PDF のホストに到達できず | ⚠️ 本文未確認 |
| 12 | V-detector: An efficient negative selection algorithm with "probably adequate" detector coverage（Ji & Dasgupta） | 2009 | Information Sciences | 発展 | V-detector の雑誌版。被覆率の統計的推定で検出器生成を止める（検索情報に基づく） | ⚠️ 本文未確認 |
| 13 | [Is negative selection appropriate for anomaly detection?](https://doi.org/10.1145/1068009.1068061) | 2005 | GECCO | 発展（批判） | 実数値 NSA と自己検出器分類は高精度に正例・負例の両方を要し、一クラス SVM は一クラスだけで足りると指摘（検索情報に基づく） | ⚠️ 本文未確認 |
| 14 | A comparative study of real-valued negative selection to statistical anomaly detection techniques（Stibor, Timmis, Eckert） | 2005 | ICARIS（LNCS 3627） | 発展（批判） | V-detector は KDD データで統計的異常検知に検出率で及ばないと報告（検索情報に基づく） | ⚠️ 本文未確認 |
| 15 | An evaluation of negative selection in an artificial immune system for network intrusion detection（Kim & Bentley） | 2001 | GECCO | 発展（批判） | ネットワーク侵入検知で負の選択の検出器生成がスケールしないことを示した（他論文の引用に基づく） | ⚠️ 本文未確認 |
| 16 | A comparative study of negative selection based anomaly detection in sequence data（Textor） | 2012 | ICARIS | 発展（再評価） | r-chunk / r 連続検出器の NSA が実データ14種でカーネル・オートマトン・n-gram 法と同等以上（検索情報に基づく） | ⚠️ 本文未確認 |
| 17 | Geometrical insights into the dendritic cell algorithm（Stibor, Oates, Kendall, Garibaldi） | 2009 | GECCO | 発展（批判） | DCA の信号処理が線形識別に相当することを幾何学的に示した（Gu+ 2013 の記述に基づく） | ⚠️ 本文未確認 |
| 18 | HAIS-IDS: A hybrid artificial immune system model for intrusion detection in IoT | 2025 | Bull. Polish Academy of Sciences | 最新 | VAE を使うクローン選択層と DC 型の適応層の2層 AIS で IoT 侵入検知（検索情報に基づく） | ⚠️ 本文未確認 |
| 19 | [DeepDCA（Self-Normalizing NN × DCA、IoT ボット検知）](https://www.mdpi.com/2076-3417/10/6/1909) | 2020 | Applied Sciences | 発展 | SNN と DCA を組み合わせ IoT-Bot で精度98.73%超（検索情報に基づく）。MDPI に到達できず | ⚠️ 本文未確認 |
| 20 | Tolerance, danger, and the extended family（Matzinger） | 1994 | Annual Review of Immunology | 原典（免疫学） | 危険理論の提唱（Aickelin & Cayzer 2002 の記述に基づく） | ⚠️ 本文未確認 |
| 21 | [A Sense of Self for Unix Processes](https://www.cs.unm.edu/~forrest/publications/ieee-sp-96-unix.pdf) | 1996 | IEEE S&P | 発展 | システムコール列の短い相関で「自己」を定義するホスト型侵入検知。負の選択でなく正の検出のため参照のみ | — 参照のみ |
| 22 | [The Evolution of System-call Monitoring](https://www.cs.unm.edu/~forrest/publications/acsac08.pdf) | 2008 | ACSAC | 発展 | システムコール監視研究の回顧。冒頭のみ確認したため参照のみ | — 参照のみ |
| 23 | [Danger Theory: The Link between AIS and IDS?](https://arxiv.org/abs/0803.1997) | 2003 | ICARIS | 発展 | 危険理論に基づく次世代 IDS の研究計画。2002 年版と内容が重なるため参照のみ | — 参照のみ |
| 24 | [The Deterministic Dendritic Cell Algorithm](https://arxiv.org/abs/1006.1512) | 2008 | ICARIS | 発展 | 確率要素を除いた dDCA。ポートスキャンで検証。DCA 原典と重なるため参照のみ | — 参照のみ |
| 25 | [Theoretical formulation and analysis of the deterministic dendritic cell algorithm](https://arxiv.org/abs/1305.7476) | 2013 | arXiv（BioSystems 投稿版） | 発展 | dDCA の集合論的定義と計算量 O(n²) の解析。理論寄りで軸から外れるため参照のみ | — 参照のみ |
| 26 | [Quiet in Class: Classification, Noise and the Dendritic Cell Algorithm](https://arxiv.org/abs/1307.1391) | 2013 | ICARIS | 発展（批判） | DCA の分類段を ML に置き換え、動的フィルタの利点を検証。冒頭のみ確認のため参照のみ | — 参照のみ |
| 27 | [Quantum Genetic Optimization for Negative Selection Algorithms in Anomaly Detection](https://arxiv.org/abs/2605.22527) | 2026 | arXiv プレプリント | 最新 | EvoSeedRNSA の GA を量子遺伝的アルゴリズムに置換。単一データでの小規模評価のため参照のみ | — 参照のみ |
| 28 | [From static to adaptive: immune memory-based jailbreak detection for large language models](https://arxiv.org/abs/2512.03356) | 2025 | arXiv プレプリント | 最新 | 免疫記憶型の LLM 脱獄検知 IMAG。immune-network-ml（AI の免疫系）の範囲のため参照のみ | — 参照のみ |
| 29 | [AEGIS: Adversarial Entropy-Guided Immune System](https://arxiv.org/abs/2604.02149) | 2026 | arXiv プレプリント | 最新 | 名称は免疫系だが中身は状態空間モデルによる暗号化通信の異常検知。免疫機構が薄いため参照のみ | — 参照のみ |
| 30 | [Designing an Artificial Immune System inspired Intrusion Detection System](https://arxiv.org/abs/2208.07801) | 2022 | arXiv プレプリント | 発展 | 自己・非自己と危険理論を組み合わせた AIS-IDS の設計論。実験がなく参照のみ | — 参照のみ |
