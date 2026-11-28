---
name: ui-zukan
description: >
  UI 部品・UI アクションの標準名リファレンス。ユーザーが「浮いてるボタン」「長押しでブルッと震えて遷移」
  「下から出てくるやつ」「くるくる」のように UI を曖昧・擬音・見た目で説明したとき、
  Material / iOS HIG / Flutter の標準名に対応づけ、正しい部品・ジェスチャー・触覚・遷移・アニメーションを
  選んで実装するために使う。Flutter UI の実装依頼全般、UI の名前を聞かれたとき、
  「この動きなんて言う？」と聞かれたときに発動。
---

# UI図鑑スキル

## 使い方

1. ユーザーの説明から、見た目（部品）と振る舞い（アクション）を分けて読み取る。
2. `references/components.md` と `references/actions.md` で、別名・日本語・擬音（ブルッ／カチッ／くるくる）を含めて該当項目を探す。
3. 実装前に「○○（標準名）として実装します」と一言で確認し、迷いがあれば 2〜3 候補を提示する。
4. 各項目の「AI への伝え方」を仕様の骨子として使い、Flutter API 欄の widget で実装する。
5. 複合アクション（例: 長押し→触覚→遷移）は要素ごとに分解して実装する。

## よくある言い換え → 標準名

| ユーザーの言い方 | 標準名 | id |
|---|---|---|
| 浮いてる／影付きの／Z 軸に浮いたボタン | Elevated Button | `elevated_button` |
| 一番目立つ／塗りつぶしのボタン | Filled Button | `filled_button` |
| 右下の丸い＋ボタン | Floating Action Button | `fab` |
| 下からせり上がる／ハーフモーダル | Bottom Sheet | `modal_bottom_sheet` |
| iOS の下から出る選択肢 | Action Sheet | `action_sheet` |
| 画面下に一瞬出るメッセージ／トースト | Snackbar | `snackbar` |
| くるくる／ローディング | Circular Progress Indicator | `circular_progress` |
| グレーの箱がチラチラ光る読み込み | Skeleton + Shimmer | `skeleton` |
| ドラム式／回すやつ | Wheel Picker | `cupertino_picker` |
| 日／週／月の切替 | Segmented Button | `segmented_button` |
| 小さな角丸のタグ | Chip | `chips` |
| 大きいタイトルが縮む | Large Title App Bar | `large_title_app_bar` |
| 画像ヘッダーが縮む | Collapsing Toolbar | `collapsing_toolbar` |
| ブルッ（1 回） | Impact Haptic (medium) | `haptic_impact` |
| カチッ | Selection Haptic | `haptic_selection` |
| 成功でトントン／失敗でブブブ | Notification Haptic | `haptic_notification` |
| 長押しでブルッと震えて遷移 | Long Press → Haptic → Navigate | `long_press_haptic_navigate` |
| 押すと縮んで弾む | Press Scale (Spring) | `press_scale` |
| 間違えたら左右に揺れる | Shake | `shake` |
| 画像がそのまま拡大して次画面へ | Hero Transition | `hero_transition` |
| 横にスワイプして削除 | Swipe to Dismiss | `swipe_to_dismiss` |
| 引っ張って更新 | Pull to Refresh | `pull_to_refresh` |
| 紙吹雪 | Confetti | `confetti` |
| ハートがポンと弾ける | Like Burst | `like_burst` |

## 参照ファイル

- `references/components.md` — 表示 75 項目
- `references/actions.md` — アクション 39 項目
- オンライン: https://uizukan.dev（項目ごとの URL とデモ）、機械可読: https://uizukan.dev/catalog.json

## 実装時の作法

- 触覚は `HapticFeedback`（services）を使い、Web では no-op になることを前提にする。
- iOS らしさが求められたら Cupertino 系（CupertinoPageRoute / CupertinoActionSheet / CupertinoPicker）を優先。
- Material 3 の名称（Filled / Tonal / Elevated / Outlined / Text）で強調度を揃える。
- 複合アクションは「ジェスチャー」「フィードバック」「遷移」の順に分けて実装する。
