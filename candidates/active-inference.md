# 隣接分野調査：能動的推論・自由エネルギー原理（Active Inference / FEP）

- 調査日：2026-10-23
- 調査方法：WebSearch と arXiv API（export.arxiv.org）で候補を集め、主要6本は arXiv HTML 版の本文（導入・手法・実験・結論）を読んで要約した。数値には出典の表・図・節番号を添えた。arXiv ID・タイトル・著者は arXiv API の返り値で照合済み。
- 採録先：本文・arXiv コメント・学会の公式ページで確認できたものだけを書いた。確認できなかったものは「arXiv プレプリント」とした。

---

## 1. 分野の概要とユーザーの3分野とのつながり

能動的推論（Active Inference, AIF）は、自由エネルギー原理（FEP）を行動選択にまで広げた枠組みで、知覚・学習・行動を「生成モデルのもとで（期待）自由エネルギーを最小化すること」として1つにまとめる。方策の評価に使う期待自由エネルギー（EFE）は、**実利的価値**（選好する観測への近さ。報酬に相当）と**認識的価値**（期待情報利得＝好奇心）の和に分けられる。このため探索と利用のトレードオフが、目的関数を足し合わせなくても原理から出てくる。

- **世界モデル（内発的報酬・階層化）とのつながり**：AIF はそもそも「世界モデル（生成モデル）を持つエージェント」の理論で、認識的価値は内発的報酬（情報利得型の好奇心）を原理から導く。Friston らの階層的・多時間スケールの生成モデル（RGM など）は、世界モデルの階層化テーマと直接重なる。
- **SNN・ニューロモルフィックとのつながり**：FEP は予測符号化をはじめとする脳の計算理論が出発点で、スパイクで自由エネルギーを下げる制御（下記「その他」）や、組込み・ハードウェア向けの AIF 実装も現れている。省電力 HW 上で動く「脳型エージェント」の理論的な土台になりうる。
- **群知能とのつながり**：多エージェント AIF（UAV スウォーム、マルチロボットの協調探索）では、群の協調を「各個体の信念更新と EFE 最小化」として書き直す試みが出てきている。

## 2. 系譜の起点となる古典

| 年 | タイトル | 一言 |
| --- | --- | --- |
| 2010 | K. Friston, "The free-energy principle: a unified brain theory?" *Nature Reviews Neuroscience* 11 | 知覚・学習・注意を変分自由エネルギー最小化で統一的に説明した、FEP の代表的レビュー。 |
| 2015 | K. Friston, F. Rigoli, D. Ognibene, C. Mathys, T. FitzGerald, G. Pezzulo, "Active inference and epistemic value." *Cognitive Neuroscience* 6(4) | EFE を「認識的価値（情報利得）＋外発的価値」に分け、好奇心と探索が原理から出てくることを示した。現在の AIF 研究のほとんどがこの定式化を出発点にしている。 |
| 2020 | Z. Fountas, N. Sajid, P. Mediano, K. Friston, "Deep active inference agents using Monte-Carlo methods." NeurIPS 2020 ([arXiv:2006.04176](https://arxiv.org/abs/2006.04176)) | 深層生成モデル＋MCTS で EFE を近似し、画像入力のタスクへ AIF を拡大した「深層能動的推論」の代表作。 |

補足：階層化の起点としては Friston ら "From pixels to planning: scale-free active inference"（[arXiv:2407.20292](https://arxiv.org/abs/2407.20292), 2024。くりこみ生成モデル RGM）も重要。

---

## 3. 最新研究（2025〜2026年）

### 3.1 AXIOM — 勾配を使わないオブジェクト中心の AIF 世界モデル
- **原題**：AXIOM: Learning to Play Games in Minutes with Expanding Object-Centric Models
- **著者**：Conor Heins, Toon Van de Maele, Alexander Tschantz ほか（Karl Friston, Christopher Buckley ら計14名、VERSES AI）
- **発表**：arXiv プレプリント（2025）。学会採録は確認できなかった
- **リンク**：[arXiv:2505.24784](https://arxiv.org/abs/2505.24784)
- **要約**：画素をスロット混合モデルでオブジェクトに分解し、物体ごとの運動は区分線形の切替動力学、物体間の相互作用は疎な関係混合モデルで表す。全モジュールが新しいデータに応じてコンポーネントを**オンラインで増やし**、Bayesian Model Reduction で併合する。学習は逐次の変分ベイズ更新だけで、ニューラルネット・勾配・リプレイバッファは使わない。計画では EFE（効用＋rMM パラメータの情報利得）を最小化する（式10）。
- 自作のベンチマーク Gameworld 10k（10ゲーム、1万ステップ制限）で、全ゲームにおいて BBF・DreamerV3 と同等以上の累積報酬を出した。例：Gold では 190±18（BBF −26±12、DreamerV3 −21±10）、Hunt では 206±20（4±12 / 6±9）（表1）。パラメータ数は 0.3〜1.6M で DreamerV3 の 420M よりはるかに小さく、モデル更新は 18 ms/step（BBF 135 ms、DreamerV3 221 ms）（表2）。
- 情報利得項は Bounce では学習を速めたが、Gold では負の報酬がある情報豊富な状態へ誘導して逆効果だった（表1のアブレーション）。著者自身が認める限界は2点で、コア事前分布を人手で設計していることと、Atari 級の複雑な環境は未検証であること。

### 3.2 Distributional Active Inference（DAIF）— AIF を分布型強化学習の拡張として定式化
- **原題**：Distributional Active Inference
- **著者**：Abdullah Akgül, Gulcin Baykal, Manuel Haußmann, Mustafa Mert Çelikok, Melih Kandemir
- **発表**：ICML 2026（PMLR 306）
- **リンク**：[arXiv:2601.20985](https://arxiv.org/abs/2601.20985)
- **要約**：AIF の目的関数を変分ベイズと do 演算（因果推論）から導き直すと、通常使われる形より単純な等価形になることを示した。さらに「収益分布＝方策が誘導する軌道測度を収益汎関数で押し出したもの」とみなす push-forward RL を定式化した。これにより、遷移モデルを陽に学習しなくても AIF を分布型 RL（潜在空間での分位点 TD 学習）として実装できる。
- 潜在多様体上に動力学がある Latent RiverSwim では、ホライズンが伸びるとモデルベース RL（PSRL）も分布型 RL（IQN 系）も解けなくなるが、DAIF は性能を保った（図2）。
- EvoGym 7・DMC 7・DMC Vision 5 の計19環境で、学習曲線下面積（AULC）の平均順位が 1.5 / 1.6 / 1.9 と最良だった。AIF 成分だけを除いた DTD3 は 2.0 / 2.4 / 2.9（表1）。計算時間の増加は +12% で、DSAC（+26%）や DRND（+37%）より小さい（6章）。
- 限界（著者記載）：陽な EFE 項や、認識的価値と道具的価値の分離は実装しておらず、認識的価値は逆ガンマ事前分布の事後分散として暗黙に入っているだけ。

### 3.3 時間階層世界モデルによる深層 AIF の実ロボット制御
- **原題**：Real-World Robot Control by Deep Active Inference With a Temporally Hierarchical World Model
- **著者**：Kentaro Fujii, Shingo Murata（慶應義塾大学）
- **発表**：IEEE Robotics and Automation Letters（RA-L）採録（arXiv コメントによる、2025）
- **リンク**：[arXiv:2512.01924](https://arxiv.org/abs/2512.01924)
- **要約**：世界モデルを slow / fast の2時間スケールの隠れ状態（RSSM 型）で構成した。加えて、行動系列を残差ベクトル量子化で 64 個の「抽象行動」に圧縮する行動モデルと、抽象行動から未来の slow 状態を直接予測する抽象世界モデルを導入した。こうして EFE の評価を有限個の候補に対する1回の推論で済ませる。
- 6自由度の実ロボットによるボール・蓋の操作課題で、総成功率は 70.7%。比較対象は目標条件付き Diffusion Policy 24.4%、非階層版 51.2%、抽象世界モデルなし 37.2%（表I）。全候補の評価にかかる時間は 2.37 ms で、逐次評価する従来法の 71.8 ms より短い（VI-A節）。
- 選好精度 γ を下げると、「蓋を開けて中を確認する」探索行動の EFE が目標指向行動より小さくなり、行動が探索に切り替わった（表II）。CALVIN でも平均成功率 37.5%（GC-DP 34.8%）（付録表III）。ただし探索と目標指向の切り替えは手動調整の γ に依存している（著者記載）。

### 3.4 後続表現（SR）による階層的 AIF
- **原題**：Hierarchical Active Inference using Successor Representations
- **著者**：Prashant Rangarajan, Rajesh P. N. Rao（ワシントン大学）
- **発表**：Neural Computation 採録（arXiv コメントによる、2026）
- **リンク**：[arXiv:2604.15679](https://arxiv.org/abs/2604.15679)
- **要約**：下位レベルで学習した後続表現（SR）行列をスペクトルクラスタリングして「マクロ状態」を得る。ボトルネック状態へ向かう下位方策を AIF で学習して「マクロ行動」とし、上位でも SR と集約 EFE を使って計画する。海馬の SR 仮説と AIF を結びつけ、状態と行動の階層を両方とも学習する。著者は、FEP 系の脳理論でこれを示したのは初めてと述べている。
- Gridworld では、平坦な AIF は階層版の約10倍のエピソードを必要とした。学習後の安定性 RS は 0.281（平坦 0.677、Q 学習 0.526）（図6）。Mountain Car では計画ステップが 8 対 105（図17d）、PointMaze の UMaze では 4 対 135（図20）。到達できたゴール数は、階層版が 5/5・5/5・6/6、平坦版が 5/5・2/5・0/6（UMaze / Medium / Large、図23）。
- POMDP 版では、観測ノイズの大きい部屋を避けて長い経路を選ぶ「不確実性と報酬のトレードオフ」が EFE から自然に出てきた（図13–15）。ただし連続空間は離散化して扱っており、深層化（特徴ベースの SR）は今後の課題。

### 3.5 好奇心駆動 AIF によるロボットの行動・言語の発達
- **原題**：Curiosity-Driven Development of Action and Language in Robots Through Self-Exploration（arXiv v1 の題は "Co-Development"）
- **著者**：Theodore Jerome Tinker, Kenji Doya, Jun Tani（OIST）
- **発表**：Science Advances 12, eaee7533（2026。OIST 研究室の業績リストと報道から確認）
- **リンク**：[arXiv:2510.05013](https://arxiv.org/abs/2510.05013)
- **要約**：シミュレーション上のクレーン型ロボットに「動詞＋形容詞＋名詞」の命令文（6×6×5＝180通り）を与えた。視覚・触覚・固有感覚・音声のモダリティごとに複雑度（好奇心）項を持つ予測モデルで AIF を行い、Q 学習で償却して自己探索させた。
- 学習に使ったのは全組み合わせの33%（60文）だけだが、全モダリティに好奇心を入れた条件では、未学習の文に対する成功率が 6万エポックで 85.1% に達した。好奇心なしの条件は同時点で 41%、12万エポックでやっと 80.8%（図3、図S5）。語彙を小さくすると汎化は 29% まで落ちた（図4）。
- 「丸暗記が先、組成的汎化が後」「例外規則による U 字型発達」など、発達心理学の知見と対応する現象が再現された（考察 H3–H5）。SAC ベースラインは大きく劣った（補足図S6, S7）。限界は、全てシミュレーションで約6万試行を要する点。

### 3.6 LLM エージェントの「文脈獲得」を AIF として定式化
- **原題**：Active Inference as Context Acquisition for AI Agents
- **著者**：Sanchayan Dutta, Sai Niranjan Ramachandran, Suvrit Sra（UC Davis / TU München）
- **発表**：arXiv プレプリント（2026）
- **リンク**：[arXiv:2608.19202](https://arxiv.org/abs/2608.19202)
- **要約**：LLM エージェントが行う確認質問・検索・ツール呼び出し・プロンプト試行を「文脈行動」とみなす。内側で潜在タスク状態の信念を更新し、外側で「文脈行動・タスク行動・停止」をコスト込みの EFE で選ぶ、という1ステップの二層最適化として定式化した。決定論的な観測では、認識的価値はトークンコストで正規化した期待情報利得になる。
- 不確実性を厳密に測れる「Optimal Question Asking（OQA）」ベンチマークを新たに作った。二値属性 N=25/100、多値属性 N=100〜300 で、動的計画法による最適質問戦略（オラクル）を基準にしている（定理5.1）。GPT-5、Claude Sonnet 4.5、Gemini 2.5 Pro など7モデルを評価したところ、どのモデルも毎ターン不確実性を減らしはするが、オラクルより質問数が多かった（図1–3）。
- 文体が隠れた商品説明の生成課題では、エントロピー／コストで質問を選ぶ方策が適合率 0.375（約219トークン）を達成し、質問しない場合の 0.0417（約112トークン）を大きく上回った（7章）。限界（著者記載）：固定の属性表を使い、ツールは無効にしているため、現実の対話への一般化は未検証。

### その他の注目研究（アブストラクトまたは書誌情報のみ確認）
- **BED-LLM**（Choudhury ら、ICLR 2026, [arXiv:2508.21184](https://arxiv.org/abs/2508.21184)）：LLM の予測分布から期待情報利得を推定して質問を選ぶ。AIF とは名乗っていないが、認識的価値の LLM 版にあたる。
- **ODAR**（Ma ら、arXiv 2026, [arXiv:2602.23681](https://arxiv.org/abs/2602.23681)）：償却 AIF で難易度を推定し、Fast / Slow エージェントに振り分ける LLM 推論ルーティング。
- **Curiosity is Knowledge**（Li ら、arXiv 2026, [arXiv:2602.06029](https://arxiv.org/abs/2602.06029)）：「好奇心が十分なら事後一致性と後悔の有界性が同時に保証される」という、EFE エージェントの初の理論保証。
- **Deep AIF with Diffusion Policy and Multiple Timescale World Model**（Yokozawa ら、arXiv 2025, [arXiv:2510.23258](https://arxiv.org/abs/2510.23258)）：拡散方策と多時間スケール世界モデルによる、実環境の探索・ナビゲーション。
- **Efficient and robust control with spikes that constrain free energy**（Urbano ら、arXiv 2026, [arXiv:2603.09729](https://arxiv.org/abs/2603.09729)）：自由エネルギーを下げるときだけ発火するスパイキング制御網。SNN 分野への橋渡しになる。
- **A Hardware-oriented Approach for Efficient Active Inference Computation and Deployment**（Pižurica ら、arXiv 2025, [arXiv:2508.13177](https://arxiv.org/abs/2508.13177)）：pymdp を疎な計算グラフに変換し、レイテンシを1/2以下、メモリを最大35%削減した。
- **Flying by Inference: Active Inference World Models for Adaptive UAV Swarms**（Arshid ら、arXiv 2026, [arXiv:2604.27935](https://arxiv.org/abs/2604.27935)）：GA 計画器の実演から確率的世界模型を学び、スウォームの再計画を AIF で行う。群知能＋GA との接点になる。

---

## 4. 本リポジトリの新しい調査分野にする場合のテーマ案

1. **`deep-active-inference`：深層能動的推論と世界モデルのスケーリング**
   Fountas 2020 → AXIOM → DAIF → Fujii & Murata → Yokozawa と、DreamerV3 などの RL 世界モデルとの比較を軸にする。「EFE は RL＋内発的報酬に対して本当に優位か、優位ならどの条件か」（サンプル効率、計算資源の制約、潜在空間の抽象化）を整理する。既存の `world-model` ブランチの内発的報酬テーマと対比しやすい。
2. **`hierarchical-generative-models`：階層的・多時間スケール生成モデル**
   RGM（scale-free AIF）、SR による階層 AIF、時間階層 RSSM＋抽象行動（VQ）、MTRNN 系（谷研究室）を扱う。状態抽象と行動抽象（options）を自由エネルギーの観点から統一できるかを調べる。`world-model` の「階層化」テーマの姉妹テーマになる。
3. **`epistemic-agents`：認識的価値（好奇心）と LLM／発達ロボティクス**
   情報利得による能動的情報収集（Context Acquisition、BED-LLM、ODAR）、好奇心の理論保証（Curiosity is Knowledge）、発達ロボットでの言語・行動の獲得（Tinker ら）を扱う。スパイキング AIF や AIF の HW 実装を小節として加えれば、SNN 分野への橋渡しにもなる。
