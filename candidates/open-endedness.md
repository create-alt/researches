# 隣接分野調査：オープンエンド学習・人工生命（Open-endedness / ALife / Quality-Diversity）

- 調査日：2026-10-23
- 調査方法：WebSearch と arXiv API（export.arxiv.org）で候補を集め、主要6本は arXiv HTML 版の本文（導入・手法・実験・結論）を読んで要約した。数値には出典の表・図・節番号を添えた。arXiv ID・タイトル・著者は arXiv API の返り値で照合済み。
- 採録先：本文・arXiv コメント・学会や雑誌の公式情報で確認できたものだけを書いた。確認できなかったものは「arXiv プレプリント」とした。

---

## 1. 分野の概要とユーザーの3分野とのつながり

オープンエンド性（open-endedness）とは、「固定した目的に収束せず、新しく興味深い人工物（解・環境・行動・生命様の構造）を際限なく生み出し続ける」性質のこと。これを計算機上で実現しようとする研究群で、新奇性探索、Quality-Diversity（QD：MAP-Elites など、多様で高性能な解の集合＝アーカイブを照らし出す最適化）、環境と解の共進化（POET）、人工生命（ALife）がその流れにある。2024年以降は、基盤モデルを「人間的な面白さの判定器」や「知的な変異演算子」として使う研究（OMNI-EPIC、ASAL、AlphaEvolve 系、Darwin Gödel Machine、AI Scientist）が急増している。

- **群知能（PSO/ACO、DL・GA との融合）とのつながり**：QD は「局所競争つきの GA」として定式化でき（下記 DNS）、GA × 多様性維持の直系にあたる。Boids・Particle Life などの群・粒子系は ALife の代表的な基盤（substrate）で、ASAL ではそのパラメータ空間そのものを基盤モデルで探索している。PSO 型の母集団更新を LLM エージェント設計に使う研究（SwarmAgentic）もある。
- **世界モデル（内発的報酬）とのつながり**：新奇性・学習進捗・「面白さ」は内発的動機づけと同じ問題意識から来ている。オープンエンドな課題生成（OMNI-EPIC、POET）は、世界モデルを使うエージェントのカリキュラム源にもなる。
- **SNN とのつながり**：直接の接点は少ないが、ニューラルセルオートマトンやスパイキング網の構造・規則を QD で探索する方向が考えられる（ニューロモルフィック回路の多様な設計候補の生成など）。

## 2. 系譜の起点となる古典

| 年 | タイトル | 一言 |
| --- | --- | --- |
| 2011 | J. Lehman, K. O. Stanley, "Abandoning Objectives: Evolution Through the Search for Novelty Alone." *Evolutionary Computation* 19(2) | 目的関数を捨てて行動の新奇性だけを報酬にする「新奇性探索」。欺瞞的な問題では目的指向探索に勝つことを示した。 |
| 2015 | J.-B. Mouret, J. Clune, "Illuminating search spaces by mapping elites."（[arXiv:1504.04909](https://arxiv.org/abs/1504.04909)） | MAP-Elites。行動記述子のグリッドの各セルにエリートを1つずつ保持する QD の基本形。 |
| 2019 | R. Wang, J. Lehman, J. Clune, K. O. Stanley, "Paired Open-Ended Trailblazer (POET)."（[arXiv:1901.01753](https://arxiv.org/abs/1901.01753)） | 環境とエージェントを共進化させ、課題そのものを生み出し続ける。オープンエンド学習の代表例。 |

補足：思想的な起点として J. Clune "AI-GAs"（[arXiv:1905.10985](https://arxiv.org/abs/1905.10985), 2019）、基盤モデル時代への橋渡しとして OMNI-EPIC（Faldor, Zhang, Cully, Clune, [arXiv:2405.15568](https://arxiv.org/abs/2405.15568), 2024）も重要。

---

## 3. 最新研究（2025〜2026年）

### 3.1 ASAL — 基盤モデルで人工生命シミュレーションを自動探索
- **原題**：Automating the Search for Artificial Life with Foundation Models
- **著者**：Akarsh Kumar, Chris Lu, Louis Kirsch, Yujin Tang, Kenneth O. Stanley, Phillip Isola, David Ha（MIT / Sakana AI ほか）
- **発表**：*Artificial Life* 31(3): 368–396（MIT Press, 2025。arXiv 初出は 2024-12）
- **リンク**：[arXiv:2412.17799](https://arxiv.org/abs/2412.17799)
- **要約**：ALife の「基盤」（Boids、Particle Life、Life-like CA、Lenia、NCA）のパラメータ空間を、CLIP / DINOv2 の埋め込み空間で評価して探索する枠組み。3つのモードがある：①テキストで指定した現象に一致する世界を探す「教師あり目標」（式2）、②時間とともに表現空間で新奇であり続ける世界を探す「オープンエンド性」（式3）、③互いに離れた世界の集合で基盤全体を照らす「イルミネーション」（式4）。最適化には Sep-CMA-ES、GA、BPTT を使う。
- Life-like CA の全 262,144 規則を総当たりで評価すると、Conway のライフゲームはオープンエンド性スコアで上位5%に入った（4.2節、図5）。Particle Life で「a caterpillar」が見つかるのは粒子数 1,000 以上のときだけで、"more is different" を定量的に示した（図7b）。
- 表現の比較では、CLIP ≳ DINOv2 で、どちらも画素表現よりはるかに人間に近い多様性を与えた（図8）。評価は主に定性的で、基盤の表現力が上限になるという限界を著者も述べている。

### 3.2 Darwin Gödel Machine（DGM）— オープンエンドな自己改善コーディングエージェント
- **原題**：Darwin Godel Machine: Open-Ended Evolution of Self-Improving Agents
- **著者**：Jenny Zhang, Shengran Hu, Cong Lu, Robert Lange, Jeff Clune
- **発表**：ICLR 2026
- **リンク**：[arXiv:2505.22954](https://arxiv.org/abs/2505.22954)
- **要約**：Schmidhuber の Gödel Machine が要求する「改善の証明」を「ベンチマークでの実証」に置き換えた。エージェントが自分のコードベース（ツール・ワークフロー）を書き換え、その子孫を**アーカイブ**に蓄える。親は「性能に比例し、子の数に反比例する」確率で選ぶ（QD／新奇性探索の考え方）。自己改善そのものがコーディング課題なので、ベンチマークでの改善がそのまま自己改善能力の向上につながる、という構造になっている。
- 80 イテレーションで、SWE-bench Verified の成功率は 20.0% → 50.0%、Polyglot は 14.0% → 38.0%（部分集合）、Polyglot 全体では 14.2% → 30.7%（図2、4.4節）。「自己改善なし」「アーカイブなし（常に最新版を改変）」の両アブレーションを上回った（図2）。
- 発見されたエージェントは別のモデルにも移植できた。Claude 3.7 Sonnet に載せ替えると 19.0% → 59.5% で、SWE-bench で進化させたエージェントは Polyglot でも 28.9% を出した（図4）。1回の実行に約2週間と多額の API 費用がかかり、探索の仕組み自体は固定で自己改変できない（6章）。

### 3.3 ShinkaEvolve — サンプル効率の高いオープンソースの LLM 駆動プログラム進化
- **原題**：ShinkaEvolve: Towards Open-Ended And Sample-Efficient Program Evolution
- **著者**：Robert Tjarko Lange, Yuki Imajuku, Edoardo Cetin（Sakana AI）
- **発表**：ICLR 2026（ポスター。Sakana AI の公開資料と第三者情報による。公式採録リストでは未確認）
- **リンク**：[arXiv:2509.19349](https://arxiv.org/abs/2509.19349)
- **要約**：AlphaEvolve 型の「LLM を変異演算子とする島モデル進化」に、3つの工夫を加えた：①性能と子の数で親を重み付けサンプリングする（探索と利用の両立）、②コード埋め込みの類似度＋LLM による新奇性判定で、似たプログラムを棄却サンプリングする、③UCB1 で LLM アンサンブルの選択確率を適応させる。オープンソース（Apache 2.0）で公開。
- 26円の円詰め問題では、150 回未満の評価で AlphaEvolve の解を上回った（図5）。AIME 用のエージェント足場（gpt-4.1-nano、10 呼び出し以内）では「3専門家＋査読＋統合」の7呼び出し構成を発見し、別年度の問題や別モデルにも移植できた（図6）。
- ALE-Bench LITE では、ALE-Agent の解を平均約2.3%改善した。ahc039 では 5位相当（2880）から2位相当（3140）に上がった（図7）。MoE の負荷分散損失を 556M モデルで進化させ、2.7B モデルでも既存の global-batch LBL を上回った（図8）。アブレーションでは、重み付き親選択と埋め込み棄却が特に効いた（図9）。

### 3.4 The AI Scientist（Nature 版）— 研究ライフサイクル全体の自動化
- **原題**：Towards End-to-End Automation of AI Research
- **著者**：Yutaro Yamada, Robert Tjarko Lange, Cong Lu, Chris Lu, Shengran Hu, Jakob Foerster, David Ha, Jeff Clune（arXiv 版の著者順。Nature 版は Chris Lu が筆頭とする情報があり、引用時は要確認）
- **発表**：*Nature* 651, 914–919（2026）
- **リンク**：[arXiv:2606.15497](https://arxiv.org/abs/2606.15497)（前身：AI Scientist-v2, [arXiv:2504.08066](https://arxiv.org/abs/2504.08066)）
- **要約**：アイデア生成（MAP-Elites 型のアイデアアーカイブ＋Semantic Scholar での新規性フィルタ）→ 実験 → 執筆 → 自動査読までを1つの系にまとめた。実験は2方式で、テンプレート利用型と、4段階の**エージェント的木探索**（初期調査、ハイパーパラメータ調整、研究課題の実行、アブレーション）を使うテンプレート不要型がある。
- 自動査読器は、ICLR の過去論文に対する採否予測で balanced accuracy 0.69（2017–2024）、学習カットオフ後の 2025 年でも 0.66 で、人間同士の一致度（NeurIPS 2021 一貫性実験の 0.66）と同等だった（表1）。生成される論文の質は基盤モデルの公開時期とともに上がり（p<0.00001、図1B）、木探索のノード数を増やすほど上がった（図2C）。
- ICLR 2025 の ICBINB ワークショップ（採択率70%）に投稿した3本のうち1本が平均 6.33（6, 7, 6）で採択水準を超えた。事前の取り決めにより取り下げている（4章、図3）。限界として、着想の浅さ、実装の誤り、引用の幻覚があり、本会議水準には達していない（5章）。

### 3.5 Digital Red Queen — Core War での LLM による敵対的プログラム進化
- **原題**：Digital Red Queen: Adversarial Program Evolution in Core War with LLMs
- **著者**：Akarsh Kumar, Ryan Bahlous-Boldi, Prafull Sharma, Phillip Isola, Sebastian Risi, Yujin Tang, David Ha（Sakana AI / MIT ほか）
- **発表**：arXiv プレプリント（2026）
- **リンク**：[arXiv:2601.03335](https://arxiv.org/abs/2601.03335)
- **要約**：チューリング完全な ALife 環境 Core War で、各ラウンドに「過去の全チャンピオンに勝つ新しい warrior」を進化させる、最小限の自己対戦（Red Queen 動力学）を実装した。ラウンド内の最適化には、行動記述子を（生成スレッド数, メモリ被覆）とした **MAP-Elites** を使い、変異演算子は GPT-4.1 mini。
- 静的最適化（1ラウンド）の結果は次のとおり。ゼロショットの warrior は人間製 294 体の 1.7% にしか勝てず、best-of-8 は合計で 22.1%。進化させた専門家集合は合計で 89.1% に勝ち、勝ちか引き分けまで含めると 96.3%。ただし単体では平均 27.9% と脆かった（図2）。
- 複数ラウンドにすると、未知の人間製 warrior に対する汎用性が上がった。96 回の独立実行の間で表現型の分散は減ったが、遺伝子型（コード埋め込み）の分散は変わらなかった。著者はこれを収斂進化に似た現象としている（図3, 4）。履歴長を K=1 から K=10 にすると、じゃんけん型のサイクルが 77% 減った（4.3節）。MAP-Elites を単一セルに置き換えると性能が落ち（図8）、コード埋め込みの線形プローブで汎用性を R²=0.461 で予測できた（図9）。

### 3.6 Dominated Novelty Search（DNS）— QD を「局所競争つき GA」として定式化し直す
- **原題**：Dominated Novelty Search: Rethinking Local Competition in Quality-Diversity
- **著者**：Ryan Bahlous-Boldi, Maxence Faldor, Luca Grillotti, Hannah Janmohamed, Lisa Coiffard, Lee Spector, Antoine Cully（UMass Amherst / Imperial College London ほか）
- **発表**：GECCO 2025（pp. 104–112、DBLP による）
- **リンク**：[arXiv:2502.00593](https://arxiv.org/abs/2502.00593)
- **要約**：QD アルゴリズムは「GA の選択の直前に、適応度を変換する競争関数を挟んだもの」と書き直せることを示した（アルゴリズム2）。MAP-Elites も閾値型の非構造アーカイブも、この競争関数の特殊例になる（4.1節）。そのうえで、**自分より適応度の高い個体のうち近い k 体までの平均距離**を競争適応度とする DNS を提案した。グリッドの境界も距離閾値も要らない。
- Brax の Walker、Ant、Ant Blocks のすべてで、Threshold-Elites と Cluster-Elites を QD スコア・被覆率ともに上回った（p<10⁻⁹）。到達できない領域を含む Walker と Ant Blocks では MAP-Elites も上回った（p<10⁻³）（図4）。
- 軌道を n 点サンプルした高次元記述子の迷路 Kheperax では、n=2 と n=10 を除くすべての次元で全手法を有意に上回った（図5）。AURORA 型の教師なし記述子でも最良だった（図6）。著者は今後の方向として、競争関数そのものをニューラルネットで学習させることを挙げている。

### その他の注目研究（アブストラクトまたは書誌情報のみ確認）
- **AlphaEvolve**（Novikov ら、arXiv 2025, [arXiv:2506.13131](https://arxiv.org/abs/2506.13131)）：Gemini を変異演算子にした進化的コーディングエージェント。行列乗算・スケジューリングなどで新しいアルゴリズムを発見した。
- **Huxley-Gödel Machine**（Wang ら、Schmidhuber 研究室、arXiv 2025, [arXiv:2510.21614](https://arxiv.org/abs/2510.21614)）：DGM の親選択を、系統（クレード）全体の将来性推定に置き換えた自己改善エージェント。
- **Behavioral Foundation Models for Quality Diversity**（Bendib ら、NeurIPS 2026 採録と記載, [arXiv:2609.35615](https://arxiv.org/abs/2609.35615)）：方策パラメータ空間ではなく、行動基盤モデルの潜在空間で QD を行う。DL × QD の最新例。
- **Guiding Evolution of Artificial Life Using Vision-Language Models**（ASAL++、Baid ら、ALIFE 2025, [arXiv:2509.22447](https://arxiv.org/abs/2509.22447)）：第2の基盤モデルが進化の目標を次々に提案する、ASAL のオープンエンド版。
- **OpenLife**（Masumori ら、ALIFE 2026, [arXiv:2606.31046](https://arxiv.org/abs/2606.31046)）：記憶・代謝（予算）を持つ LLM エージェントを実世界で約12週間動かし、生命様の動態を観察した。
- **SwarmAgentic**（Zhang ら、arXiv 2025, [arXiv:2506.15672](https://arxiv.org/abs/2506.15672)）：PSO に着想を得た母集団更新で、LLM エージェント系を一から自動生成する。群知能 × LLM の直接の接点。
- **Swarm Systems as a Platform for Open-Ended Evolutionary Dynamics**（Sayama、*Phil. Trans. R. Soc. A* 383, [arXiv:2409.01469](https://arxiv.org/abs/2409.01469)）：Swarm Chemistry を例に、異種スウォームをオープンエンド進化の基盤として論じたレビュー。

---

## 4. 本リポジトリの新しい調査分野にする場合のテーマ案

1. **`quality-diversity`：QD アルゴリズムの基礎と DL・群知能との融合**
   新奇性探索 → MAP-Elites → CVT-ME / AURORA → DNS（QD＝局所競争 GA）→ BFM-QD（潜在空間 QD）と追う。「GA・PSO の多様性維持」と比べ、局所競争の設計空間を整理する。`swarm-intelligence` ブランチの GA 融合テーマとつながる。
2. **`llm-driven-evolution`：LLM 駆動の進化的探索と自己改善エージェント**
   ELM（Evolution through Large Models）→ FunSearch → AlphaEvolve → ShinkaEvolve、および DGM → HGM → AI Scientist（Nature 2026）を扱う。「アーカイブ（踏み石）の保持」「新奇性による棄却」「親選択」といった QD 由来の部品が性能にどう効くかを、アブレーションを横断して比較する。
3. **`foundation-model-alife`：基盤モデル × 人工生命・オープンエンド性の評価**
   ASAL、ASAL++、Digital Red Queen、OpenLife、Lenia / Flow-Lenia / NCA、Swarm Chemistry を扱う。オープンエンド性をどう測るか（FM 埋め込みでの新奇性、表現型と遺伝子型の収斂、Open-Endedness Bench [arXiv:2610.02588](https://arxiv.org/abs/2610.02588) など）を中心に据える。Boids・Particle Life を通じて群知能とも接続できる。
