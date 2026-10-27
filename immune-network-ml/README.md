## 免疫ネットワーク理論と機械学習・AI との融合（immune-network-ml/）

### 調査履歴
- 2026-10-27: arXiv API と Web 検索で「immune network / artificial immune / immune-inspired × learning・LLM・agent・adversarial」を 2024〜2026 年から検索し、LLM ジェイルブレイク防御（TIM, IMAG）、エージェント防御（ANIS, AgentAntibody, GRAD）、深層 AIN による継続学習（Deep AIN）を最新動向として把握した。
- そこから系譜を遡り、Jerne (1974) → Farmer, Packard & Perelson (1986) の抗体濃度方程式 → 石黒・渡邊らの免疫ネットワーク型行動調停（J-STAGE で全文取得）→ Whitbrook・Aickelin らのイディオタイプ網ロボット制御、および aiNet・AIRS（免疫分類器）→ aiNet の批判的検証（Stibor+）の流れを追った。
- DNN との接点として RAILS（適応免疫型の敵対的防御）、計算免疫学との境界として DeepRC（現代 Hopfield＝注意による免疫レパートリー分類）を追加した。
- Jerne 1974・Farmer+ 1986・aiNet 原典（書籍章）・AIRS（Kent リポジトリ／ミシシッピ州立大の修論は到達不可）・渡邊+ 1998（JRM, 名古屋市大の著者ページは到達不可）は正規の公開版に到達できず本文未確認。OpenAlex は当日の無料枠切れ、Semantic Scholar は 429 で利用できなかった。

### 系譜
```
[免疫ネットワーク理論]
Jerne 1974（イディオタイプ網・本文未確認）
  └→ Farmer, Packard & Perelson 1986（抗体濃度の微分方程式・分類子システムとの対応・本文未確認）
        ├→ [ロボット行動調停] 石黒+ 1997 (Immunoid) → 渡邊+ 1998 → Whitbrook+ 2007（RL との比較）→ Whitbrook+ 2010（GA＋イディオタイプ網・実機移植）
        ├→ [データ解析] aiNet (de Castro & Von Zuben 2001) → Stibor+ 2007（圧縮品質の批判的検証）
        │                AIRS (Watkins+ 2002/2004, 免疫分類器)
        │                     └→ Deep AIN (Sithungu 2026, 構造化親和性によるクラス逐次学習)
        └→ [連想記憶との同型] Agliari+ 2011–13（免疫網＝多重 Hopfield）… DeepRC (Widrich+ 2020, 注意＝現代 Hopfield で免疫レパートリー分類)

[適応免疫 → 深層学習・LLM の防御]
CLONALG 2002（既存：clonal-selection） → RAILS 2022（DNN の敵対的防御）
  → TIM 2025（テスト時に検知→LoRA で獲得免疫） → IMAG 2025（免疫記憶バンク＋能動免疫）
  → ANIS 2026（エージェント免疫の概念設計） / AgentAntibody 2026（エピトープ・抗体ライブラリの自己進化） / GRAD 2026
```

### 引用論文一覧
| # | 論文 | 年 | 発表 | 系譜 | 概要 | スライド |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Towards a network theory of the immune system（Jerne） | 1974 | Ann. Immunol. (Inst. Pasteur) 125C:373–389 | 原典 | 抗体が抗原だけでなく他の抗体の idiotope も認識し、刺激・抑制のネットワークとして免疫系が自己調節するという仮説（検索情報・引用文献に基づく）。 | ⚠️ 本文未確認 |
| 2 | [The immune system, adaptation, and machine learning](https://doi.org/10.1016/0167-2789(86)90240-X) | 1986 | Physica D 22 | 原典 | Jerne の網を抗体濃度の微分方程式で定式化し、Holland の分類子システムとの類似を示した（抄録・引用文献に基づく）。以後のロボット AIS の大半がこの式を使う。 | ⚠️ 本文未確認 |
| 3 | [免疫情報処理機構に基づく分散型コンセンサス決定ネットワークの構築](https://doi.org/10.9746/sicetr1965.33.524) | 1997 | 計測自動制御学会論文集 | 原典 | 要素行動を抗体、状況を抗原とし paratope/idiotope の刺激・抑制で行動調停。生存時間 337→867。 | ✅ p.2 |
| 4 | [Emergent construction of a behavior arbitration mechanism based on the immune system](https://doi.org/10.1163/156855398X00163) | 1997 | Advanced Robotics | 発展 | 石黒・渡邊らによる免疫網型行動調停の英文誌版（検索情報）。 | — 参照のみ（本文未取得、J-STAGE 版で代替） |
| 5 | [Emergent construction of behavior arbitration mechanism based on the immune system](https://doi.org/10.1109/ICEC.1998.699855) / Autonomous Mobile Robot Behavior Control Using Immune Network (JRM 10(4)) | 1998 | ICEC 1998 / JRM | 発展 | 強化学習信号で idiotope を獲得し免疫網を自動構築、実機ゴミ集めロボットへ適用（検索情報、Whitbrook+ 2007 の記述）。著者ページ・出版社は到達不可。 | ⚠️ 本文未確認 |
| 6 | [Experimental Results On Compression Quality of aiNet](https://www.cs.ucdavis.edu/~vemuri/papers/papers/stibor_vemuri_foci.pdf)（採録版 doi:10.1109/FOCI.2007.371518） | 2007 | IEEE FOCI 2007 | 発展 | aiNet の出力が入力分布を保つかを Parzen 密度＋KL で検証し、密な領域で品質が悪いことを示した。採録版は Stibor & Timmis 名義。 | ✅ p.3 |
| 7 | [aiNet: An Artificial Immune Network for Data Analysis](https://doi.org/10.4018/978-1-930708-25-9.ch012) | 2001 | Data Mining: A Heuristic Approach（書籍章） | 原典 | クローン選択と抗体間抑制で冗長性を除いた代表点を作り、MST でクラスタリングする免疫網（Stibor+ 2007 の記述と検索情報）。 | ⚠️ 本文未確認 |
| 8 | [A resource limited artificial immune classifier](https://doi.org/10.1109/CEC.2002.1007049) / [AIRS: a revised version (GPEM 2004)](https://doi.org/10.1023/B:GENP.0000030197.83685.94) | 2002/2004 | CEC 2002 / GPEM | 原典 | 資源制限・クローン選択・記憶細胞を使う教師あり免疫分類器 AIRS（検索情報）。Kent リポジトリと修論は到達不可。 | ⚠️ 本文未確認 |
| 9 | [Idiotypic Immune Networks in Mobile Robot Control](https://arxiv.org/abs/0803.2981) | 2007 | IEEE TSMC-B | 発展 | RL のみ／簡略網／完全イディオタイプ網を比較し、完全網がスタック脱出を 8.53→4.78 反復に短縮。全文読了したが arXiv 版に図表がないため 2010 年版を代表としてスライド化。 | — 参照のみ（p.4 の s2 で引用） |
| 10 | [An Idiotypic Immune Network as a Short Term Learning Architecture for Mobile Robots](https://arxiv.org/abs/0910.3115) | 2008 | ICARIS 2008 | 発展 | GA で事前進化した行動をイディオタイプ網で選ぶ LTL-STL 構成の初出。 | — 参照のみ（後継の 2010 年版で代表） |
| 11 | [Two-Timescale Learning Using Idiotypic Behaviour Mediation For A Navigating Mobile Robot](https://arxiv.org/abs/1006.2945) | 2010 | Applied Soft Computing | 発展 | LTL-STL 構成の詳細版。 | — 参照のみ |
| 12 | [Real-world Transfer of Evolved Artificial Immune System Behaviours between Small and Large Scale Robotic Platforms](https://arxiv.org/abs/1305.7432) | 2010 | Evolutionary Intelligence | 発展 | epuck で進化させた行動をイディオタイプ網で Pioneer 実機へ移植。失敗率 0% 対 RL のみ 4〜17%。 | ✅ p.4 |
| 13 | [A Recommender System based on Idiotypic Artificial Immune Networks](https://arxiv.org/abs/0803.2970) | 2005 | J. Math. Modelling and Algorithms | 発展 | イディオタイプ網の抑制で推薦の多様性を確保（抄録）。 | — 参照のみ（推薦応用で本テーマの主線外） |
| 14 | [Immuno-inspired robotic applications: a review](https://arxiv.org/abs/1202.4261) | 2012 | arXiv | 発展 | 免疫着想ロボティクスのレビュー。石黒らの調停は限定的成果と評価（検索情報）。 | — 参照のみ |
| 15 | [Multitasking associative networks](https://arxiv.org/abs/1111.5191) / [Immune networks: multitasking capabilities near saturation](https://arxiv.org/abs/1305.5936) | 2012/2013 | PRL / J. Phys. A | 発展 | 免疫網（B・T 細胞）を多重処理する Hopfield 型連想記憶として統計力学で解析（抄録）。 | — 参照のみ（理論物理寄り） |
| 16 | [Modern Hopfield Networks and Attention for Immune Repertoire Classification](https://arxiv.org/abs/2007.13505) | 2020 | NeurIPS 2020 | 発展 | 注意＝現代 Hopfield で免疫レパートリーを多インスタンス分類（DeepRC）。CMV で AUC 0.831。 | ✅ p.5 |
| 17 | [Hopfield Networks is All You Need](https://arxiv.org/abs/2008.02217) | 2020 | ICLR 2021 | 発展 | Transformer 注意＝連続状態 Hopfield の更新則、指数的記憶容量（DeepRC の理論的基盤）。 | — 参照のみ |
| 18 | [ImmuNetNAS](https://arxiv.org/abs/2002.12704) | 2020 | arXiv | 発展 | 免疫網アルゴリズムで CNN アーキテクチャ探索（抄録）。 | — 参照のみ（NAS は最適化寄り） |
| 19 | [RAILS: A Robust Adversarial Immune-inspired Learning System](https://arxiv.org/abs/2107.02840) | 2022 | IEEE Access | 発展 | 適応免疫の群集・親和性成熟を DNN の敵対的防御に写す。CIFAR-10 PGD で 52.0%（DkNN 41.7%）。 | ✅ p.6 |
| 20 | [Immuno-mimetic Deep Neural Networks (Immuno-Net)](https://arxiv.org/abs/2107.02842) | 2021 | arXiv | 発展 | RAILS を含む免疫模倣 DNN の枠組み（抄録）。 | — 参照のみ（RAILS と重複） |
| 21 | [CLONALG](https://doi.org/10.1109/TEVC.2002.1011539) | 2002 | IEEE TEVC | 原典 | クローン選択アルゴリズム。RAILS・Deep AIN の更新則の源流。 | ↪ 既存：clonal-selection p.3 |
| 22 | Self-Nonself Discrimination in a Computer (Forrest+) | 1994 | IEEE S&P | 原典 | 負の選択。ANIS・AgentAntibody が先行 AIS として引用。 | — 参照のみ（negative-selection 担当の範囲） |
| 23 | [Test-Time Immunization (TIM)](https://arxiv.org/abs/2505.22271) | 2025 | arXiv | 最新 | 推論中に検知したジェイルブレイクで LoRA を逐次微調整し「獲得免疫」。ASR-50 は全設定 0%。 | ✅ p.7 |
| 24 | [From static to adaptive: immune memory-based jailbreak detection (IMAG)](https://arxiv.org/abs/2512.03356) | 2025 | arXiv | 最新 | 隠れ状態の記憶バンク照合＋2 エージェントの能動免疫＋記憶更新。平均検知精度 94%。 | ✅ p.8 |
| 25 | [Immune: Improving Safety Against Jailbreaks in Multi-modal LLMs via Inference-Time Alignment](https://arxiv.org/abs/2411.18688) | 2024 | CVPR 2025 | 最新 | 安全報酬モデルで復号を誘導する推論時整合（抄録）。免疫は名称のみ。 | — 参照のみ（免疫機構の写像なし） |
| 26 | [Rapid Response: Mitigating LLM Jailbreaks with a Few Examples](https://arxiv.org/abs/2411.07494) | 2024 | arXiv | 最新 | 少数の攻撃例から防御を素早く拡張（TIM の関連研究として引用）。 | — 参照のみ |
| 27 | [Antibody: Strengthening Defense Against Harmful Fine-Tuning](https://arxiv.org/abs/2603.00498) | 2026 | ICLR 2026 | 最新 | 有害サンプルの勾配寄与を抑える微調整防御（抄録）。免疫は名称のみ。 | — 参照のみ |
| 28 | [Immunization against harmful fine-tuning attacks](https://arxiv.org/abs/2402.16382) | 2024 | EMNLP 2024 | 最新 | 有害微調整への「免疫化」条件の定式化（抄録）。 | — 参照のみ |
| 29 | [VaccineRAG](https://arxiv.org/abs/2509.04502) | 2025 | arXiv | 最新 | 有害 RAG サンプルへの MLLM の耐性向上（抄録）。 | — 参照のみ |
| 30 | [Cowpox: Towards the Immunity of VLM-based Multi-Agent Systems](https://arxiv.org/abs/2508.09230) | 2025 | arXiv | 最新 | 感染拡大を抑える「治療サンプル」を配布するマルチエージェント防御（抄録）。 | — 参照のみ（疫学モデル寄り） |
| 31 | [Agent-Native Immune System (ANIS)](https://arxiv.org/abs/2606.28270) | 2026 | arXiv | 最新 | エージェント向け 6 層免疫アーキテクチャの概念論文。実験なし。 | ✅ p.9 |
| 32 | [AgentAntibody](https://arxiv.org/abs/2608.04053) | 2026 | arXiv | 最新 | エピトープ抽象化と抗体ライブラリの成熟・誘導で利用者の暗黙境界を学習。マクロ SU-HM 81.1%。 | ✅ p.10 |
| 33 | [GRAD: Graph-Structured Antibody Defense for LLM Agents](https://arxiv.org/abs/2610.22828) | 2026 | arXiv | 最新 | 実行グラフで分散した攻撃証拠を集約し、凍結エンコーダ上に検知エキスパート（抗体）を追加する継続適応（抄録）。 | — 参照のみ（時間の都合で本文精読せず） |
| 34 | [Structured Affinity for Unsupervised Visual Class-Incremental Memory in Deep Artificial Immune Networks](https://arxiv.org/abs/2608.20104) | 2026 | arXiv | 最新 | ZNCC 親和性の B 細胞フィルタを積層した Deep AIN でリプレイなしのクラス逐次学習。 | ✅ p.11 |
| 35 | [Immuno-VLM](https://arxiv.org/abs/2605.30745) | 2026 | ICML 2026 | 最新 | LLM で「意味的抗体（近傍外れ値の記述）」を生成し負の選択的に開集合認識（抄録）。 | — 参照のみ（negative-selection 寄り） |
| 36 | [AbGPT](https://arxiv.org/abs/2409.06090) / [S2ALM](https://arxiv.org/abs/2411.15215) | 2024 | arXiv | 最新 | 抗体配列言語モデルによる生成・表現学習（抄録）。計算免疫学側の境界。 | — 参照のみ（AIS との接続なし） |
| 37 | [AEGIS: Adversarial Entropy-Guided Immune System](https://arxiv.org/abs/2604.02149) | 2026 | arXiv | 最新 | 状態空間モデルによるゼロデイ通信回避検知を免疫系と称する（抄録）。 | — 参照のみ（侵入検知で negative-selection 寄り） |
