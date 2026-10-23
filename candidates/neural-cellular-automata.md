# 隣接分野調査: ニューラルセルオートマトン・自己組織化システム（Neural Cellular Automata, NCA）

調査日: 2026-10-23 ／ 対象期間: 2025〜2026年を中心に
本文の確認方法: 最新研究 6 本は arXiv の HTML 版本文（導入・手法・実験・考察）を読んで要約した。数値の出典として表・図の番号を添える。arXiv ID とタイトルの一致は arXiv API（export.arxiv.org）で確認済み。

---

## 1. 分野の概要と、ユーザーの3分野とのつながり

NCA は、格子上のすべてのセルが同じ小さなニューラルネット（局所更新則）を共有し、近傍セルの状態だけを見て状態を繰り返し更新する再帰モデルである。勾配降下で更新則を学習すると、種1個から形を「成長」させたり、壊れた部分を再生したり、セル同士の局所通信だけで大域的な判断（分類・推論）に合意したりする。

- **群知能**とのつながり: 中央制御なしに局所相互作用から大域秩序が創発する点は PSO/ACO と同じ構図。NCA はその局所則を DL で学習できる。粒子版の NCA（後述の NPA）や物理モジュール群（後述の Smart Cellular Bricks）は、そのままロボット群の分散制御の問題になる。
- **SNN／ニューロモルフィック**とのつながり: 計算が局所・並列・非同期（確率的な発火マスク）・重み共有で、大域的な同期やメモリ移動が要らない。ニューロモルフィックHW や論理回路（DiffLogic CA）への写像に向く。
- **世界モデル**とのつながり: CA は「局所則で時間発展する世界」の最小モデルであり、世界モデルが正確な規則を学べるかを測るテストベッドになる（後述の Guo & Liu 2026）。NCA の生成データで Transformer を事前学習する研究も出てきた。

## 2. 系譜の起点となる古典

| 文献 | 年 | 一言 |
|---|---|---|
| W. Gilpin, "Cellular automata as convolutional neural networks", Phys. Rev. E 100, 032402（arXiv:1809.02942） | 2019 | 任意の CA 規則が畳み込み＋MLP で厳密に書けることを示し、CA を勾配学習の対象にした。 |
| A. Mordvintsev, E. Randazzo, E. Niklasson, M. Levin, "Growing Neural Cellular Automata", Distill | 2020 | 「Growing NCA」の原典。種1セルから絵文字を成長させ、サンプルプール（replay）と損傷付き学習で自己修復する安定なアトラクタを得た。今回の論文のほぼすべてがこの学習法を継承している。 |
| E. Randazzo, A. Mordvintsev ほか, "Self-classifying MNIST Digits", Distill | 2020 | 局所通信だけでセル集団が「自分がどの数字の一部か」に合意する。分散分類・分散推論の系譜の起点で、後の物理ブロックや点群分類にもつながる。 |

## 3. 最新研究（2025〜2026年）

### 3.1 Reasoning NCA — 局所セルだけで迷路・数独・ARC を解く

- **原題**: Reasoning with Neural Cellular Automata
- **著者**: Mayalen Etcheverry, Pietro Miotti ほか（計10名、Blake Richards・Eyvind Niklasson が共同監修。Google Paradigms of Intelligence Team）
- **発表先**: arXiv プレプリント（2026-09）
- **リンク**: https://arxiv.org/abs/2609.36126
- **要約**: 3×3 近傍だけを見る非同期更新の NCA を、迷路・数独・ARC-AGI-1・画素空間の Visual Sudoku で学習し、HRM/TRM/LoopViT のような大域接続の再帰推論モデルと比較した。新しい点は三つ。(1) サンプルリプレイと確率的摂動（ノイズ・損傷・正解入れ替え）で学習する。(2) テスト時に並列試行・ロールアウト長・格子サイズを増やして難問に汎化させ、冗長な軌道を刈り込む Niche-Capped Diversity Pruning を入れた。(3) 確信度の高いセルの発火率を下げる「分散型の適応計算」。結果（表1）: 9×9 迷路で学習した 10K パラメータの NCA が 201×201 迷路で 100%（DeepThink 784K は 74.0%）。Sudoku-OOD は 98.5%（AKOrN 89.5%）。ARC-AGI-1 は 3.5M パラメータで pass@2 48.8%（TRM 7M は 44.6%、LoopViT は 60〜66%）、pass@64 で 60.3%、3モデルのアンサンブルで 63.0%。迷路で途中に損傷を与えると、適応計算は修復までの総セル更新数を 0.52 倍に減らした（図8）。テスト時のノイズ注入は精度を下げるどころか上げた（図7B）。
- **前段の研究**: Xu & Miikkulainen「Neural Cellular Automata for ARC-AGI」（ALIFE 2025, arXiv:2506.15746）と Guichard ほか「ARC-NCA」（arXiv:2505.08778。262 の固定サイズタスクで 12.9%）が、NCA を ARC に初めて当てた先行例。

### 3.2 NCA Pre-pre-training — NCA の軌道で Transformer を「言語の前に」事前学習

- **原題**: Training Language Models via Neural Cellular Automata
- **著者**: Dan Lee, Seungwook Han, Akarsh Kumar, Pulkit Agrawal（MIT / Improbable AI Lab）
- **発表先**: arXiv プレプリント（2026-03）。検索結果では NeurIPS 2026 の仮想会議ページに掲載されているが、本環境からは会議サイトに接続できず未確認。
- **リンク**: https://arxiv.org/abs/2603.10055
- **要約**: 重みをランダムに引いた離散 NCA（12×12 格子、10状態）の時空間軌道を 2×2 パッチでトークン化し、1.6B パラメータの Llama 型 Transformer を次トークン予測で「事前の事前学習」した。その後に通常の言語事前学習（OpenWebText / OpenWebMath / CodeParrot）を行う。系列ごとに規則が違うので、モデルは文脈内で規則を推論するよう強いられる。また gzip 圧縮率で NCA の複雑さを選べる。結果: NCA は 164M トークンだけで最終パープレキシティを最大約6%下げ、収束を 1.4〜1.6 倍速めた（図2）。1.6B トークンの C4（自然言語）による事前の事前学習よりも 5% 良かった（図4）。下流タスクの差は小さいが一貫しており（表1）、GSM8K pass@32 は 36.6→37.9%、BigBench-Lite pass@4 は 25.9→36.5%。転移の主な担い手は attention 層（図5）。最適な NCA の複雑さは領域で異なり、コードは単純な動態、数学・Web 文は複雑な動態が合う。

### 3.3 CA で世界モデルを診断 — 従来型の世界モデルはなぜ CA の規則を学べないのか

- **原題**: Why Do Conventional World Models Fail to Learn Cellular Automata?
- **著者**: Shaoyang Guo, Ziming Liu
- **発表先**: arXiv プレプリント（2026-09）
- **リンク**: https://arxiv.org/abs/2609.39604
- **要約**: 8×8 トーラス上の外部総和型 2値 CA（2^18 通りの規則。半分を学習用、半分を未知規則として保留）で、8 フレーム観測して次の 8 フレームを予測させ、512 セルすべてが正しいロールアウトの割合（SeqAcc）で、CNN・Transformer・拡散型の世界モデルを評価した。画素単位の精度は高いのに、ロールアウトはほとんど正しくならない。CNN は画素 96.3% 正解でもロールアウト完遂は 18.9% で、同時（joint）拡散モデルは 0%。原因を三つに切り分け、それぞれ骨格を変えない最小限の修正で直した（図1・図3）。(1) 空間局所性: 1次元 RoPE では Game of Life で 39.1%、2次元 RoPE では 100%。(2) 時間局所性: 各トークンに前フレームの 3×3 近傍を付けると、未知規則で 25.8%→99.9%。KV shift なら 2.6K パラメータで厳密になる。(3) 時間安定性: 拡散モデルにフレーム順の causal freezing を入れると、同じ重みのまま 42.2%→99.9%。世界モデル研究に向けた教訓は、「見た目の予測精度」と「規則を獲得したか」は別物で、局所性の帰納バイアスは能力ではなく信頼性を買う、ということ。

### 3.4 NCA + LPPN — 粗い格子の NCA を任意解像度で描画する

- **原題**: Neural Cellular Automata: From Cells to Pixels
- **著者**: Ehsan Pajouheshgar, Yitao Xu, Ali Abbasi, Alexander Mordvintsev, Wenzel Jakob, Sabine Süsstrunk
- **発表先**: SIGGRAPH 2026（arXiv の journal_ref による）
- **リンク**: https://arxiv.org/abs/2506.22899
- **要約**: NCA は学習時のメモリ・計算が格子サイズの2乗で増え、情報も1ステップに1近傍しか伝わらないため、従来はせいぜい 64²〜256² の解像度に限られていた。本研究は NCA を粗い格子で動かし、局所補間したセル状態と図形内の局所座標を入力とする小さな SIREN 型デコーダ（LPPN）で外見を描画する。動態と外見を分けたことで、出力解像度は格子サイズから独立する。対象は形態形成・PBR テクスチャ・メッシュ上テクスチャ・3D ボリュームテクスチャ。結果（表1）: 形態形成では 96² 格子の NCA（41K パラメータ）＋LPPN（11K）が 768² の RGBA を出力した。LPPN によるパラメータの増加は約 25%。PBR では約 13K パラメータで 9×1024² 値のテクスチャを表現した。損傷からの再生と、パラメータ差し替えによる形のモーフィングは保たれた（図7）。128² 格子から再学習なしで 8192² までサンプリングでき（図2）、ブラウザでリアルタイムに動く。

### 3.5 NPA — NCA を格子から粒子系へ（群れとして振る舞う NCA）

- **原題**: Neural Particle Automata: Learning Self-Organizing Particle Dynamics
- **著者**: Hyunsoo Kim, Ehsan Pajouheshgar, Sabine Süsstrunk, Wenzel Jakob, Jinah Park
- **発表先**: arXiv プレプリント（2026-01）
- **リンク**: https://arxiv.org/abs/2601.16096
- **要約**: セルを格子点に固定するオイラー的な NCA を、連続的な位置と内部状態を持つ粒子のラグランジュ系に一般化した。位置と状態の両方を共有の学習則で更新する。近傍が毎ステップ変わるため、格子畳み込みの代わりに微分可能な SPH（平滑化粒子流体力学）演算子で密度・勾配を推定し、CUDA カーネルで全対計算を避けて拡張性を持たせた。学習した課題（表3）は、2D 形態形成（4096 粒子、11K パラメータ）、3D Gaussian splat の形態形成（16384 粒子、38K）、粒子テクスチャ、点群 MNIST の分散分類。点群 MNIST はテスト精度 98.42%。推論時に粒子数・SPH 半径・更新確率 p を変えても安定で、p→0 では実質ポアソン過程の完全非同期になる（図9・10）。状態の消去・切断・凝集から再生でき、そのうち切断と凝集は学習時に見ていない（図11）。形ができた後も粒子が渦状に循環し続け（図13）、別々に学習した「種」を混ぜると協調や撹乱が起きる（図14）。

### 3.6 Smart Cellular Bricks — 約200個の物理ブロックが NCA で自分の形と損傷を認識する

- **原題**: Smart Cellular Bricks for Decentralized Shape Classification and Damage Recovery
- **著者**: Rodrigo Moreno, Andres Faina, Shyam Sudhakaran, Kathryn Walker, Sebastian Risi（IT University of Copenhagen / Sakana AI ほか）
- **発表先**: arXiv プレプリント（2025-09、v2）。二次情報（Sakana AI の発表・報道）では Nature Communications 採録とされるが、掲載ページは本環境から未確認。
- **リンク**: https://arxiv.org/abs/2509.18659
- **要約**: 6 面に接続端子を持つ立方体 PCB モジュール（マイコン・LED 内蔵）を積み上げ、各モジュールが同じ 3D-NCA（状態は 28 次元: alpha 1・隠れ 20・クラス 7）を実行する。物体の種類（飛行機・椅子・車・机・家・ギター・船）を、隣接面とのシリアル通信だけで推定する。大域状態や位置情報は使わない。結果: シミュレーション（487 形状）で 98.97%（図3A）。実機ではギター 26 個から丸テーブル 197 個までの 4 形状すべてで全ブロックが正しく合意し（収束率 100%、約23反復=70秒、図2）、5本脚の机など未学習の変形にもおおむね汎化した。15% のモジュールを故障させても飛行機・船は頑健で、細い首を持つギターは弱かった（図3B）。形状条件付きにすると、損傷方向の検出は 90% 超。数個の種セルからの回復精度は、隠れ次元 128 で 0.64〜0.95（表1）。隠れチャネルには、胚の体軸のような左右・前後の「モルフォゲン様」パターンが自然に現れた（図4）。

## 4. その他の注目研究（アブストラクトと一覧のみ確認）

- **Differentiable Logic CA**（Miotti, Niklasson, Randazzo, Mordvintsev, arXiv:2506.04912, 2025）: 微分可能論理ゲート網で CA の更新則を学習し、推論時は完全に離散の回路として動く。Game of Life の規則学習、トカゲ形の成長、非同期更新での頑健性。ニューロモルフィック／論理HW への写像に最も近い。
- **A Path to Universal NCA**（Béna, Faldor, Goodman, Cully, GECCO 2025 Companion, arXiv:2505.13058）: 連続 NCA に行列積・転置といった計算の基本操作を学習させ、MNIST を分類するニューラルネットを CA の状態の中でエミュレートした。
- **Evolving Many Worlds: Petri Dish NCA via Population-Based Training**（Berdica, Foerster, Hutter, Zela, arXiv:2604.11248, 2026）: 空間を奪い合う複数の NCA（PD-NCA）の集団を、「過去の行動に対する新規性＋現在の見た目の多様性」を目的関数とする PBT でメタ進化させ、胞子のような拡散や移動する巨視構造といった開放端の現象を得た。GA と新規性報酬（内発的報酬に近い）の組み合わせなので、ユーザーの関心と二重に接点がある。
- **MetaLearnNCA**（Guichard ほか, arXiv:2610.08479, 2026）: 相互作用する NCA による少数ショットのオフラインメタ学習。
- **A New Kind of Network? Review and Reference Implementation of NCA**（Spitznagel & Keuper, arXiv:2604.24990, 2026）、**Applications of NCA: State of the Art, Challenges and Opportunities**（Lemke ほか, arXiv:2609.24595, 2026）: 2026年のサーベイ2本。入口として有用。
- 拡散モデルとの融合の先駆けは Kalkhof ほか「Frequency-Time Diffusion with NCA」（Diff-NCA / FourierDiff-NCA, arXiv:2401.06291, 2024）。2025〜26年は、拡散的な雑音付与で再帰推論を正則化する方向（3.1 の関連研究節が引用する同時期の研究）に広がっている。

## 5. この分野を本リポジトリの新しい調査分野にする場合のテーマ案

1. **「局所則の世界モデル」: NCA を世界モデル・推論器として使う**
   3.1（局所推論とテスト時スケーリング）、3.2（NCA データによる Transformer 事前学習）、3.3（世界モデルの規則獲得の診断）を軸にする。問いは、世界モデルの潜在ダイナミクスに局所性・非同期性の帰納バイアスを入れると、長期ロールアウトの正確さや汎化がどう変わるか。ユーザーの「世界モデル（内発的報酬・階層化）」に直結し、Petri Dish NCA のような開放端探索と内発的報酬の比較も入れられる。
2. **「学習される群知能」: NCA/NPA から物理モジュール・ロボット群へ**
   3.5（粒子 NCA）、3.6（物理ブロック）、Growing NCA の自己修復、ソフトロボットの再生（Horibe ほか 2021, arXiv:2102.02579）を並べ、PSO/ACO のような手設計の局所則と、勾配や進化で学習した局所則を比較する。「DL・GA との融合」という既存の関心をそのまま拡張できる。
3. **「離散・非同期 NCA のハードウェア化」: DiffLogic CA・Spiking NCA・ニューロモルフィック**
   DiffLogic CA（2506.04912）、Self-Organising Digital Circuits（Barylli ほか, arXiv:2608.02606）、組込み CA プラットフォーム（Woiwode ほか, ALIFE 2025, arXiv:2510.07440）、Spiking NCA によるモジュラーソフトロボット制御（Nadizar ほか 2022, arXiv:2204.02099）を軸に、NCA を SNN／ニューロモルフィックチップや論理回路で動かす研究を整理する。ユーザーの SNN／ニューロモルフィックHW の調査と相互参照しやすい。

---

### 付記（確認状況）
- arXiv API で ID とタイトルの一致を確認した: 2609.36126, 2603.10055, 2609.39604, 2506.22899, 2601.16096, 2509.18659, 2506.15746, 2505.08778, 2506.04912, 2505.13058, 2604.11248, 2610.08479, 2604.24990, 1809.02942。2609.24595, 2401.06291, 2102.02579, 2204.02099, 2608.02606, 2510.07440 は arXiv API の検索結果一覧で ID とタイトルを確認した。
- 採録先: 3.4 は arXiv の journal_ref（SIGGRAPH 2026）による。3.2（NeurIPS 2026）と 3.6（Nature Communications）は二次情報のみで、一次ページは未確認。
