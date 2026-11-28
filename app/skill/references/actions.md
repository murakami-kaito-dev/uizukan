# UI図鑑 — アクション (Actions)

## Gestures / ジェスチャー

### Tap / タップ

- id: `tap`  URL: https://uizukan.dev/entry/tap/
- 種別: アクション / Gestures
- 別名: Click, Press, Single Tap
- 呼び名: Material 3=Gestures（Tap） / Material 2=Gestures（Tap） / Android (Compose)=Modifier.clickable / detectTapGestures(onTap:) / iOS (HIG)=Tap / SwiftUI=.onTapGesture / TapGesture / Web=click / pointerup イベント / Flutter=GestureDetector(onTap:) / InkWell
- Flutter: `GestureDetector(onTap:) / InkWell`
- 関連: double_tap, long_press, ripple, press_scale

**説明**: 触れて離した瞬間に発火する。押した瞬間（onTapDown）と離した瞬間（onTapUp）を分けて取れば、押している間の見た目変化が作れる。

**使いどころ**: ほぼ全ての操作。ボタン部品は内部で処理済みなので、自作の面に付けるときに使う。

**AI への伝え方（日本語）**: このカード全体をタップできるようにして。押している間は少し暗くなり、離したら詳細画面に遷移。

**Prompt (English)**: Make the whole card tappable: dim slightly while pressed, and navigate to the detail screen on release.


### Double Tap / ダブルタップ

- id: `double_tap`  URL: https://uizukan.dev/entry/double_tap/
- 種別: アクション / Gestures
- 別名: Double Click, Two Taps
- 呼び名: Material 3=該当なし（Gestures に個別名は無い） / Material 2=Gestures（two quick taps＝zoom） / Android (Compose)=Modifier.combinedClickable(onDoubleClick:) / detectTapGestures(onDoubleTap:) / iOS (HIG)=Double tap / SwiftUI=.onTapGesture(count: 2) / Web=dblclick イベント / Flutter=GestureDetector(onDoubleTap:)
- Flutter: `GestureDetector(onDoubleTap:)`
- 関連: tap, like_burst, pinch_zoom

**説明**: 短い間隔で 2 回タップしたときに発火する。単タップと共存させると、単タップの反応が少し遅れる（2 回目を待つため）。

**使いどころ**: 画像への「いいね」、地図や写真のズームイン。重要操作には向かない（発見されにくい）。

**AI への伝え方（日本語）**: 投稿画像をダブルタップしたら「いいね」が付いて、画像の中央に大きなハートが一瞬ポンと出て消えるようにして。

**Prompt (English)**: Double-tapping the post image should like it and pop a large heart in the center of the image that fades out.


### Long Press / 長押し

- id: `long_press`  URL: https://uizukan.dev/entry/long_press/
- 種別: アクション / Gestures
- 別名: Press and Hold, Touch and Hold, Long Tap
- 呼び名: Material 3=Gestures（Long press） / Material 2=Gestures（Long press） / Android (Compose)=Modifier.combinedClickable(onLongClick:) / detectTapGestures(onLongPress:) / iOS (HIG)=Touch and hold / SwiftUI=.onLongPressGesture / LongPressGesture / Web=contextmenu イベント（標準の長押しイベントは無い。pointerdown + タイマー） / Flutter=GestureDetector(onLongPress:) / InkWell(onLongPress:)
- Flutter: `GestureDetector(onLongPress:) / InkWell(onLongPress:)`
- 関連: long_press_haptic_navigate, context_menu, drag_reorder, tooltip

**説明**: 一定時間（Flutter 既定 500ms）押し続けると発火する。発火の瞬間に触覚を鳴らすと「認識された」ことが伝わる。

**使いどころ**: コンテキストメニュー、複数選択モードへの切替、並べ替え開始、ツールチップ表示。

**AI への伝え方（日本語）**: リストの行を長押ししたら、軽く振動してから複数選択モードに入るようにして。

**Prompt (English)**: Long-pressing a list row should trigger a light haptic and enter multi-select mode.


### Long Press → Haptic → Navigate / 長押し → 振動 → 画面遷移

- id: `long_press_haptic_navigate`  URL: https://uizukan.dev/entry/long_press_haptic_navigate/
- 種別: アクション / Gestures
- 別名: Hold to Confirm, Press-and-hold Action, Haptic Long Press
- 呼び名: Material 3=該当なし（Long press + Haptics + Transition の組み合わせ） / Material 2=該当なし（組み合わせ） / Android (Compose)=combinedClickable(onLongClick) + performHapticFeedback(LongPress) + NavController.navigate / iOS (HIG)=Touch and hold + Impact haptic + push / SwiftUI=.onLongPressGesture + .sensoryFeedback(.impact) + NavigationLink / Web=該当なし（pointer + navigator.vibrate() + History API） / Flutter=GestureDetector(onLongPress:) + HapticFeedback.mediumImpact() + Navigator.push
- Flutter: `GestureDetector(onLongPress:) + HapticFeedback.mediumImpact() + Navigator.push`
- 実機でのみ体験可（触覚など）
- 関連: long_press, haptic_impact, push_slide, press_scale

**説明**: 「長押し」「触覚フィードバック（Impact）」「画面遷移」の 3 つを組み合わせたパターン。誤タップで遷移したくない操作や、隠しショートカット的な入口に使う。Claude に伝えるときは 3 要素を分けて言うと確実。

**使いどころ**: 重要だが誤操作を避けたい遷移（削除確認画面、管理モード）、上級者向けショートカット。

**AI への伝え方（日本語）**: このボタンを長押し（約 0.5 秒）したら、HapticFeedback.mediumImpact() で端末を短く振動させてから、次の画面に push 遷移して。通常のタップでは何も起きないように。押している間はボタンを少し縮めて「溜め」を見せて。

**Prompt (English)**: When this button is long-pressed (~0.5s), fire HapticFeedback.mediumImpact() and then push the next screen. A normal tap should do nothing. While pressed, scale the button down slightly to show the "charge".


### Swipe to Dismiss / スワイプで削除

- id: `swipe_to_dismiss`  URL: https://uizukan.dev/entry/swipe_to_dismiss/
- 種別: アクション / Gestures
- 別名: Swipe to Delete, Dismissible, Swipe Away
- 呼び名: Material 3=該当なし（Gestures では Swipe の一般記述のみ） / Material 2=Gestures（Swipe to dismiss） / Android (Compose)=SwipeToDismissBox / iOS (HIG)=Swipe（dismiss） / SwiftUI=.swipeActions / .onDelete / Web=該当なし（Pointer Events で自作） / Flutter=Dismissible
- Flutter: `Dismissible`
- 関連: swipe_actions, snackbar_undo, list_tile

**説明**: 行を端までドラッグすると画面外へ飛んで消える。背面に赤い背景とゴミ箱アイコンを出して「削除される」ことを予告する。

**使いどころ**: メール・通知・タスクなど、削除やアーカイブが頻繁なリスト。

**AI への伝え方（日本語）**: タスクの行を左にスワイプすると削除できるようにして。スワイプ中は背面に赤い背景とゴミ箱アイコン、削除後は Snackbar で「元に戻す」。

**Prompt (English)**: Let users swipe a task row left to delete it. Show a red background with a trash icon behind while swiping, then a Snackbar with "Undo".


### Swipe Actions / スワイプで操作ボタンを出す

- id: `swipe_actions`  URL: https://uizukan.dev/entry/swipe_actions/
- 種別: アクション / Gestures
- 別名: Swipe to Reveal, Leading/Trailing Swipe Actions, Slidable, Swipe Menu
- 呼び名: Material 3=該当なし（M3 に無い） / Material 2=該当なし（M2 に無い） / Android (Compose)=SwipeToDismissBox（背景に action） / iOS (HIG)=Swipe（reveal actions） / SwiftUI=.swipeActions(edge:) / Web=該当なし（Pointer Events で自作） / Flutter=flutter_slidable（Slidable + ActionPane）
- Flutter: `flutter_slidable（Slidable + ActionPane）`
- 関連: swipe_to_dismiss, list_tile, popup_menu

**説明**: 行をスワイプすると隠れていたボタン群がスライドして出る。iOS メールの標準挙動。端まで引き切ると先頭のアクションが即実行される（full swipe）。

**使いどころ**: 行ごとに 2〜3 個の操作がある一覧（メール、タスク、チャット一覧）。

**AI への伝え方（日本語）**: メール一覧の行を左にスワイプすると「アーカイブ」「削除」のボタンが出る Swipe Actions にして。端まで引き切ったら削除が即実行されるように。

**Prompt (English)**: Add Swipe Actions to the mail list: swiping a row left reveals "Archive" and "Delete" buttons; a full swipe immediately deletes.


### Drag to Reorder / ドラッグで並べ替え

- id: `drag_reorder`  URL: https://uizukan.dev/entry/drag_reorder/
- 種別: アクション / Gestures
- 別名: Drag and Drop Reorder, Reorderable List, Sortable
- 呼び名: Material 3=Gestures（Drag） / Material 2=Gestures（Long press and drag to reorder） / Android (Compose)=該当なし（LazyColumn + Modifier.draggable で自作 / reorderable ライブラリ） / iOS (HIG)=Drag（Move a UI element） / SwiftUI=.onMove（EditMode） / Web=HTML Drag and Drop API（draggable） / Flutter=ReorderableListView / ReorderableDragStartListener
- Flutter: `ReorderableListView / ReorderableDragStartListener`
- 関連: long_press, list_tile, haptic_impact

**説明**: 行を長押しすると浮き上がり（elevation）、ドラッグで他の行が避けて隙間を作る。離すと新しい位置に収まる。右端の ≡ ハンドルで掴む方式もある。

**使いどころ**: お気に入り順、プレイリスト、タスクの優先順位など、ユーザーが順序を決めるリスト。

**AI への伝え方（日本語）**: タスク一覧を Drag to Reorder できるようにして。右端の ≡ ハンドルを掴んで動かす方式で、持ち上げた行は影付きで浮き、離すと順番が保存されるように。

**Prompt (English)**: Make the task list reorderable by dragging the ≡ handle at the right edge. The lifted row floats with a shadow, and the new order is saved on drop.


### Pinch In / Pinch Out / ピンチイン／ピンチアウト

- id: `pinch_zoom`  URL: https://uizukan.dev/entry/pinch_zoom/
- 種別: アクション / Gestures
- 別名: Pinch to Zoom, ピンチイン, ピンチアウト, Zoom In / Zoom Out, Pinch Zoom, Scale Gesture, Pan and Zoom
- 呼び名: Material 3=Gestures（Pinch） / Material 2=Gestures（Pinch to zoom） / Android (Compose)=Modifier.transformable / detectTransformGestures / iOS (HIG)=Zoom（pinch） / SwiftUI=MagnifyGesture / Web=Pointer Events / touch-action: pinch-zoom / Flutter=InteractiveViewer
- Flutter: `InteractiveViewer`
- 関連: double_tap, grid, hero_transition

**説明**: 画像や地図を 2 本指で拡大縮小し、1 本指でパンする。ダブルタップで段階ズームを併用することが多い。

**使いどころ**: 写真ビューア、地図、図面、レシート画像。

**AI への伝え方（日本語）**: 写真の拡大表示画面で、ピンチアウトで拡大・ピンチインで縮小（Pinch to Zoom。1 本指で移動）できるようにして。最大 4 倍、ダブルタップで 2 倍⇄等倍。

**Prompt (English)**: In the photo viewer, support Pinch to Zoom (two-finger scale, one-finger pan), max 4x, and double-tap to toggle between 2x and 1x.


### Context Menu (Long-press Preview) / コンテキストメニュー（長押しプレビュー）

- id: `context_menu`  URL: https://uizukan.dev/entry/context_menu/
- 種別: アクション / Gestures
- 別名: Peek and Pop, Haptic Touch Menu, 3D Touch Menu, Long-press Menu
- 呼び名: Material 3=Menus（Context menu） / Material 2=Menus（Context menu） / Android (Compose)=DropdownMenu を長押しで開く（View 系は ContextMenu） / iOS (HIG)=Context menus / SwiftUI=.contextMenu / Web=contextmenu イベント / Menu（WAI-ARIA パターン） / Flutter=CupertinoContextMenu
- Flutter: `CupertinoContextMenu`
- 実機でのみ体験可（触覚など）
- 関連: long_press, popup_menu, haptic_impact

**説明**: 長押しで背景がぼけ、対象が Hero のように拡大表示され、「共有・コピー・削除」などのメニューが下に並ぶ。触覚も同時に鳴る。

**使いどころ**: リンク・画像・カードに対する補助操作を、画面を汚さずに提供したいとき。

**AI への伝え方（日本語）**: 画像を長押しすると iOS 風の Context Menu が出るようにして。画像が浮き上がって拡大され、下に「共有／保存／削除」のメニュー。

**Prompt (English)**: Long-pressing an image should open an iOS-style Context Menu: the image lifts and enlarges with a blurred background and "Share / Save / Delete" actions below.


### Tap Outside to Dismiss Keyboard / 外側タップでキーボードを閉じる

- id: `tap_outside_dismiss_keyboard`  URL: https://uizukan.dev/entry/tap_outside_dismiss_keyboard/
- 種別: アクション / Gestures
- 別名: Dismiss Keyboard on Tap, Unfocus on Tap, Keyboard Dismiss
- 呼び名: Material 3=該当なし（M3 に無い） / Material 2=該当なし（M2 に無い） / Android (Compose)=LocalFocusManager.clearFocus() + Modifier.pointerInput / iOS (HIG)=該当なし（慣習。Virtual keyboards の dismiss） / SwiftUI=.scrollDismissesKeyboard / UIApplication.sendAction(#selector(resignFirstResponder)) / Web=blur() / document の click / Flutter=TextField(onTapOutside:) / GestureDetector + FocusScope
- Flutter: `TextField(onTapOutside:) / GestureDetector + FocusScope`
- 関連: text_field_outlined, tap

**説明**: フォーム画面の余白をタップしたときにフォーカスを外し、キーボードを閉じる。Flutter は既定ではしないので明示的に付ける。スクロールで閉じる方式もある。

**使いどころ**: ほぼ全てのフォーム画面。

**AI への伝え方（日本語）**: フォーム画面で、入力欄の外をタップしたらキーボードが閉じるようにして。スクロールを始めたときも閉じて。

**Prompt (English)**: On the form screen, dismiss the keyboard when tapping outside a text field, and also when the user starts scrolling.


### Pull to Refresh / 引っ張って更新

- id: `pull_to_refresh`  URL: https://uizukan.dev/entry/pull_to_refresh/
- 種別: アクション / Gestures
- 別名: Swipe to Refresh, Pull-down Refresh, Refresh Control
- 呼び名: Material 3=Pull to refresh（Progress indicators の用法） / Material 2=Swipe to refresh（SwipeRefreshLayout） / Android (Compose)=PullToRefreshBox / iOS (HIG)=該当なし（慣習。UIKit の Refresh control） / SwiftUI=.refreshable / Web=該当なし（ブラウザ機能。overscroll-behavior で制御） / Flutter=RefreshIndicator / CupertinoSliverRefreshControl
- Flutter: `RefreshIndicator / CupertinoSliverRefreshControl`
- 関連: infinite_scroll, circular_progress, overscroll_bounce

**説明**: リスト最上部で下方向にドラッグすると更新インジケータが現れ、離すと再取得する。Material は円形のスピナーが降りてくる、iOS は放射状インジケータが引き伸ばされる。

**使いどころ**: フィード・受信箱・通知など、新着が発生する一覧。

**AI への伝え方（日本語）**: フィードを Pull to Refresh で更新できるようにして。iOS では iOS 風のインジケータ（CupertinoSliverRefreshControl）にして。

**Prompt (English)**: Add Pull to Refresh to the feed. On iOS use the native-style CupertinoSliverRefreshControl.


### Drag to Dismiss / ドラッグで閉じる

- id: `drag_to_dismiss_sheet`  URL: https://uizukan.dev/entry/drag_to_dismiss_sheet/
- 種別: アクション / Gestures
- 別名: Swipe Down to Close, Interactive Dismiss, Pull Down to Dismiss
- 呼び名: Material 3=Bottom sheets（drag to dismiss） / Material 2=Sheets: bottom（drag to dismiss） / Android (Compose)=ModalBottomSheet（既定でドラッグで閉じる） / iOS (HIG)=Sheets（drag to dismiss） / SwiftUI=.sheet（.interactiveDismissDisabled で制御） / Web=該当なし（Pointer Events で自作） / Flutter=showModalBottomSheet(enableDrag: true) / 自作（GestureDetector + Transform）
- Flutter: `showModalBottomSheet(enableDrag: true) / 自作（GestureDetector + Transform）`
- 関連: modal_bottom_sheet, slide_up_modal, pinch_zoom

**説明**: モーダルを指の動きに追従させて閉じる。途中で離すと戻る、一定距離を超えると閉じる。写真ビューアでは背景が徐々に透明になる。

**使いどころ**: Bottom Sheet、全画面の画像ビューア、iOS 風の sheet。

**AI への伝え方（日本語）**: 全画面の画像ビューアを、下にドラッグすると指に追従して縮みながら閉じられるようにして。背景は距離に応じて透明に。閾値未満で離したら元に戻る。

**Prompt (English)**: Let the full-screen image viewer be dismissed by dragging down: the image follows the finger and shrinks, the background fades with distance, and it snaps back if released below the threshold.


## Haptics / 触覚フィードバック

### Selection Haptic / 選択の触覚（カチッ）

- id: `haptic_selection`  URL: https://uizukan.dev/entry/haptic_selection/
- 種別: アクション / Haptics
- 別名: Selection Click, Selection Feedback, Tick Haptic
- 呼び名: Material 3=該当なし（触覚は Android の指針。M3 部品には規定なし） / Material 2=該当なし（M2 に無い） / Android (Compose)=HapticFeedbackType.SegmentTick（View 系は HapticFeedbackConstants.CLOCK_TICK） / iOS (HIG)=Selection / SwiftUI=.sensoryFeedback(.selection) / Web=navigator.vibrate()（種類の区別なし） / Flutter=HapticFeedback.selectionClick()
- Flutter: `HapticFeedback.selectionClick()`
- 実機でのみ体験可（触覚など）
- 関連: haptic_impact, cupertino_picker, segmented_button, slider

**説明**: 選択肢が切り替わるたびに鳴らす、ごく短く軽い振動。ドラム式ピッカー、スライダーの目盛り、セグメント切替で使う。

**使いどころ**: 連続して何度も鳴る可能性がある切替操作。重い Impact を連打すると不快になる。

**AI への伝え方（日本語）**: セグメントを切り替えるたびに HapticFeedback.selectionClick()（軽い「カチッ」）を鳴らして。

**Prompt (English)**: Fire HapticFeedback.selectionClick() (a light tick) every time the segment selection changes.


### Impact Haptic (Light / Medium / Heavy) / 衝撃の触覚（軽・中・重の「ブルッ」）

- id: `haptic_impact`  URL: https://uizukan.dev/entry/haptic_impact/
- 種別: アクション / Haptics
- 別名: Impact Feedback, Light Impact, Medium Impact, Heavy Impact, Bump
- 呼び名: Material 3=該当なし（M3 部品には規定なし） / Material 2=該当なし（M2 に無い） / Android (Compose)=VibrationEffect.EFFECT_TICK / EFFECT_CLICK / EFFECT_HEAVY_CLICK / iOS (HIG)=Impact（Light / Medium / Heavy / Rigid / Soft） / SwiftUI=.sensoryFeedback(.impact(weight:)) / Web=navigator.vibrate()（種類の区別なし） / Flutter=HapticFeedback.lightImpact / mediumImpact / heavyImpact
- Flutter: `HapticFeedback.lightImpact / mediumImpact / heavyImpact`
- 実機でのみ体験可（触覚など）
- 関連: haptic_selection, haptic_notification, long_press_haptic_navigate, drag_reorder

**説明**: 物理的な衝突を模した振動。light は軽いタップの反応、medium はボタン確定やトグル、heavy はドラッグのドロップや重要な確定に使う。「ブルッ」と言いたいときは大抵これの medium。

**使いどころ**: light：軽い ON/OFF・いいね／medium：長押し認識・確定・ドラッグ開始／heavy：ドロップ・大きな状態変化。

**AI への伝え方（日本語）**: ボタンを確定したときに HapticFeedback.mediumImpact() で端末を短く「ブルッ」と振動させて。軽い操作は lightImpact、ドロップ時は heavyImpact を使い分けて。

**Prompt (English)**: On confirm, call HapticFeedback.mediumImpact() for a short bump. Use lightImpact for minor toggles and heavyImpact for drops / major state changes.


### Notification Haptic (Success / Warning / Error) / 結果通知の触覚（成功・警告・エラー）

- id: `haptic_notification`  URL: https://uizukan.dev/entry/haptic_notification/
- 種別: アクション / Haptics
- 別名: Success Haptic, Error Haptic, Notification Feedback, Double Buzz
- 呼び名: Material 3=該当なし（M3 部品には規定なし） / Material 2=該当なし（M2 に無い） / Android (Compose)=HapticFeedbackType.Confirm / Reject（View 系は HapticFeedbackConstants.CONFIRM / REJECT） / iOS (HIG)=Notification（Success / Warning / Error） / SwiftUI=.sensoryFeedback(.success / .warning / .error) / Web=navigator.vibrate()（種類の区別なし） / Flutter=HapticFeedback（組み合わせ）/ haptic_feedback パッケージ
- Flutter: `HapticFeedback（組み合わせ）/ haptic_feedback パッケージ`
- 実機でのみ体験可（触覚など）
- 関連: haptic_impact, shake, otp_field, confetti

**説明**: iOS が用意している 3 種のパターン振動。成功は軽い 2 連、警告は中 2 連、エラーは強い 3 連。Flutter 標準にはないので、impact を複数回組み合わせて模倣するか、プラグイン（haptic_feedback など）を使う。

**使いどころ**: 決済完了、送信成功、認証コード誤り、フォームの送信失敗。

**AI への伝え方（日本語）**: 決済が成功したら iOS の Success 通知触覚（軽い 2 連の振動）、失敗したら Error 触覚（強い 3 連の振動）を鳴らして。Flutter 標準にないので HapticFeedback の impact を組み合わせて模倣して。

**Prompt (English)**: On successful payment play the iOS Success notification haptic (two light bumps); on failure play the Error haptic (three heavy bumps). Flutter has no built-in, so emulate them by sequencing HapticFeedback impacts.


### Haptic on Toggle / スイッチ切替時の触覚

- id: `haptic_on_toggle`  URL: https://uizukan.dev/entry/haptic_on_toggle/
- 種別: アクション / Haptics
- 別名: Switch Haptic, Toggle Feedback
- 呼び名: Material 3=該当なし（M3 部品には規定なし） / Material 2=該当なし（M2 に無い） / Android (Compose)=HapticFeedbackType.ToggleOn / ToggleOff / iOS (HIG)=該当なし（Toggle の慣習。Impact / Selection の組み合わせ） / SwiftUI=Toggle（既定で触覚あり） / Web=該当なし（navigator.vibrate() で自作） / Flutter=Switch.onChanged + HapticFeedback.lightImpact()
- Flutter: `Switch.onChanged + HapticFeedback.lightImpact()`
- 実機でのみ体験可（触覚など）
- 関連: switch_toggle, haptic_impact

**説明**: iOS 標準のスイッチは自動で鳴るが、Material の Switch は鳴らないので onChanged で明示する。ON と OFF で強さを変える実装もある。

**使いどころ**: 設定画面のスイッチ全般。

**AI への伝え方（日本語）**: Material の Switch でも iOS のように切替時に軽い触覚が鳴るようにして。

**Prompt (English)**: Make the Material Switch fire a light haptic on toggle, like iOS does natively.


## Transitions / 画面遷移

### Push Transition / プッシュ遷移（右からスライド）

- id: `push_slide`  URL: https://uizukan.dev/entry/push_slide/
- 種別: アクション / Transitions
- 別名: Slide Transition, Push Navigation, Horizontal Push, Drill-down
- 呼び名: Material 3=Shared axis（X）/ Forward and backward / Material 2=Shared axis / Android (Compose)=NavHost enterTransition = slideInHorizontally / iOS (HIG)=該当なし（Navigation bars の push。個別名は無い） / SwiftUI=NavigationStack + NavigationLink / Web=View Transitions API（cross-document） / Flutter=CupertinoPageRoute / go_router + CupertinoPage
- Flutter: `CupertinoPageRoute / go_router + CupertinoPage`
- 関連: slide_up_modal, hero_transition, fade_through, long_press_haptic_navigate

**説明**: 階層を「深く進む」遷移。iOS では前の画面が 1/3 だけ左に動き、左端スワイプで戻れる。戻るときは逆再生。

**使いどころ**: 一覧 → 詳細のように、階層を下る遷移。作成・編集は Full-screen Dialog（下から）。

**AI への伝え方（日本語）**: 一覧から詳細への遷移を、iOS 風に右からスライドする Push 遷移にして。左端からのスワイプで戻れるように。Android でも同じ動きで統一して。

**Prompt (English)**: Make list → detail an iOS-style Push transition sliding in from the right, with edge-swipe back. Use the same motion on Android for consistency.


### Slide Up (Modal Presentation) / 下からせり上がる遷移（モーダル）

- id: `slide_up_modal`  URL: https://uizukan.dev/entry/slide_up_modal/
- 種別: アクション / Transitions
- 別名: Present Modally, Bottom Slide, Cover Vertical, Sheet Presentation
- 呼び名: Material 3=Dialogs（Full-screen dialog の遷移） / Material 2=Dialogs（Full-screen dialog の遷移） / Android (Compose)=NavHost enterTransition = slideInVertically / iOS (HIG)=Sheets（modal presentation） / SwiftUI=.sheet / .fullScreenCover / Web=<dialog> + CSS transition / Flutter=MaterialPageRoute(fullscreenDialog: true) / CupertinoPageRoute(fullscreenDialog: true)
- Flutter: `MaterialPageRoute(fullscreenDialog: true) / CupertinoPageRoute(fullscreenDialog: true)`
- 関連: full_screen_dialog, modal_bottom_sheet, push_slide, drag_to_dismiss_sheet

**説明**: 横方向の push が「階層を進む」なのに対し、縦方向の slide up は「一時的な別作業」を意味する。iOS の pageSheet では背後の画面が少し縮んで奥に下がる。

**使いどころ**: 新規作成、フィルタ、ログイン、設定変更などの一時タスク。

**AI への伝え方（日本語）**: 「新規作成」画面を下からせり上がるモーダルとして表示して。iOS では背後の画面が少し縮む pageSheet 風にして。

**Prompt (English)**: Present the "Create" screen as a modal sliding up from the bottom. On iOS mimic the pageSheet where the screen behind shrinks slightly.


### Fade Through / フェードスルー（タブ切替の遷移）

- id: `fade_through`  URL: https://uizukan.dev/entry/fade_through/
- 種別: アクション / Transitions
- 別名: Cross Fade, Fade Transition, Top-level Transition
- 呼び名: Material 3=Fade through / Top level / Material 2=Fade through / Android (Compose)=AnimatedContent(fadeIn + scaleIn) / NavHost fadeIn / iOS (HIG)=該当なし（Cross-dissolve） / SwiftUI=.transition(.opacity) / Web=View Transitions API（既定の cross-fade） / Flutter=animations: PageTransitionSwitcher + FadeThroughTransition
- Flutter: `animations: PageTransitionSwitcher + FadeThroughTransition`
- 関連: bottom_navigation_bar, crossfade, push_slide

**説明**: 階層関係のない画面同士（タブ切替など）の遷移。方向性を持たせないのが特徴。Material の animations パッケージに FadeThroughTransition がある。

**使いどころ**: Bottom Navigation のタブ切替、ステップ間の内容差し替え。

**AI への伝え方（日本語）**: Bottom Navigation のタブを切り替えるときに、Material の Fade Through（前がフェードアウト、次が少し拡大しつつフェードイン）を使って。

**Prompt (English)**: When switching bottom navigation tabs, use Material Fade Through: the old page fades out and the new page fades in while scaling up slightly.


### Hero Transition (Shared Element) / ヒーロー遷移（共有要素アニメーション）

- id: `hero_transition`  URL: https://uizukan.dev/entry/hero_transition/
- 種別: アクション / Transitions
- 別名: Shared Element Transition, Container Transform, Zoom Transition, matchedGeometryEffect
- 呼び名: Material 3=Container transform / Material 2=Container transform / Android (Compose)=SharedTransitionLayout + Modifier.sharedElement / iOS (HIG)=該当なし（Zoom transition＝iOS 18） / SwiftUI=.matchedGeometryEffect / .navigationTransition(.zoom)（iOS 18） / Web=View Transitions API（view-transition-name） / Flutter=Hero(tag:)
- Flutter: `Hero(tag:)`
- 関連: card, grid, push_slide, pinch_zoom

**説明**: 2 つの画面に同じ tag を持つ要素があると、遷移中にその要素が位置・サイズを補間しながら移動する。画像・カードで使うと連続性が生まれる。

**使いどころ**: 一覧 → 詳細で、画像やカードがそのまま主役になる遷移。

**AI への伝え方（日本語）**: 一覧のサムネイル画像をタップすると、その画像が詳細画面の上部に拡大しながら飛んでいく Hero（Shared Element）遷移にして。

**Prompt (English)**: When a thumbnail in the list is tapped, use a Hero (Shared Element) transition so the image flies and expands into the header of the detail screen.


### Swipe Between Pages / 横スワイプでページ送り

- id: `page_view_swipe`  URL: https://uizukan.dev/entry/page_view_swipe/
- 種別: アクション / Transitions
- 別名: Paging, Horizontal Paging, Swipe Navigation, Pager
- 呼び名: Material 3=Lateral（Tabs の swipe） / Material 2=Lateral navigation / Android (Compose)=HorizontalPager / iOS (HIG)=Page controls（swipe between pages） / SwiftUI=TabView + .tabViewStyle(.page) / Web=CSS scroll-snap（Carousel） / Flutter=PageView + PageController
- Flutter: `PageView + PageController`
- 関連: page_indicator, carousel, tab_bar, snap_scrolling

**説明**: ページ単位で吸着（snap）する横スクロール。オンボーディング、タブ内容、写真ビューアの基本。ドットや Tab と連動させる。

**使いどころ**: オンボーディング、ストーリー形式のコンテンツ、Tab の内容切替。

**AI への伝え方（日本語）**: オンボーディングを 3 ページの横スワイプ（PageView）にして。最後のページだけ「はじめる」ボタン、それ以外は「次へ」でプログラム的にページ送り。

**Prompt (English)**: Build onboarding as 3 horizontally swipeable pages (PageView). Show "Get started" only on the last page; otherwise a "Next" button that advances programmatically.


## Motion & Micro-interactions / マイクロインタラクション

### Ripple (Ink Splash) / リップル（波紋）

- id: `ripple`  URL: https://uizukan.dev/entry/ripple/
- 種別: アクション / Motion & Micro-interactions
- 別名: Ink Splash, Ink Ripple, Touch Ripple, Material Ripple
- 呼び名: Material 3=State layer（ripple は Android の実装名） / Material 2=Ripple（Touch feedback） / Android (Compose)=Modifier.clickable の indication（ripple()） / iOS (HIG)=該当なし（Highlight のみ） / SwiftUI=該当なし（ButtonStyle の isPressed で表現） / Web=該当なし（CSS で自作） / Flutter=InkWell / Ink
- Flutter: `InkWell / Ink`
- 関連: tap, press_scale, elevated_button, cupertino_button

**説明**: 押した点を中心に半透明の円が広がり、面全体を薄く覆う。Material Design の「触れた」フィードバック。Ink 系 widget は Material の上でしか描けない点に注意。

**使いどころ**: Material 風アプリのタップ可能な面すべて。iOS 風にしたいなら使わない。

**AI への伝え方（日本語）**: このカードをタップしたとき、押した位置から Material のリップル（波紋）が広がるようにして。角丸の中にクリップして。

**Prompt (English)**: When this card is tapped, show a Material ripple expanding from the touch point, clipped to the rounded corners.


### Press Scale (Spring Bounce) / 押すと縮んで弾むボタン

- id: `press_scale`  URL: https://uizukan.dev/entry/press_scale/
- 種別: アクション / Motion & Micro-interactions
- 別名: Tap Scale, Squash and Stretch, Bouncy Button, Spring Animation, Scale on Press
- 呼び名: Material 3=該当なし（M3 に無い） / Material 2=該当なし（M2 に無い） / Android (Compose)=Modifier.scale + animateFloatAsState（InteractionSource） / iOS (HIG)=該当なし（慣習。Button の pressed 状態） / SwiftUI=.scaleEffect + .animation / ButtonStyle（configuration.isPressed） / Web=CSS :active + transform: scale() / Flutter=AnimatedScale + GestureDetector(onTapDown / Up / Cancel)
- Flutter: `AnimatedScale + GestureDetector(onTapDown / Up / Cancel)`
- 関連: ripple, tap, like_burst, cupertino_button

**説明**: Material のリップルとは別系統の、iOS 寄りのタップ反応。押下中に縮み、離すと overshoot して戻る（easeOutBack）。「気持ちいい」ボタンの定番。

**使いどころ**: カード・大きなボタン・ゲーム風 UI。小さなアイコンには過剰。

**AI への伝え方（日本語）**: このボタンを、押している間は 0.95 倍に縮み、離すと少しオーバーシュートして弾んで戻る Press Scale アニメーションにして。リップルは無しで。

**Prompt (English)**: Give this button a Press Scale animation: shrink to 0.95 while pressed and spring back with a slight overshoot on release. No ripple.


### Shake (Error Wiggle) / シェイク（エラー時の左右振動）

- id: `shake`  URL: https://uizukan.dev/entry/shake/
- 種別: アクション / Motion & Micro-interactions
- 別名: Wiggle, Error Shake, Wrong Password Shake, Horizontal Shake
- 呼び名: Material 3=該当なし（M3 に無い） / Material 2=該当なし（M2 に無い） / Android (Compose)=Animatable + keyframes / iOS (HIG)=該当なし（慣習。パスコード誤入力の揺れ） / SwiftUI=.keyframeAnimator / .offset + withAnimation / Web=CSS @keyframes / Flutter=AnimationController + Transform.translate（sin 波）
- Flutter: `AnimationController + Transform.translate（sin 波）`
- 関連: haptic_notification, otp_field, password_field

**説明**: macOS のログイン画面で有名な、否定を表す左右の揺れ。±8dp 程度を 3〜4 往復、400ms 前後。エラー触覚と組み合わせると効果的。

**使いどころ**: パスワード・PIN の誤り、必須項目未入力での送信、無効な操作。

**AI への伝え方（日本語）**: パスワードが間違っていたら、入力欄が左右に小刻みに揺れる Shake アニメーション（±8dp、約 400ms）をして、同時にエラー触覚を鳴らして。

**Prompt (English)**: If the password is wrong, play a horizontal Shake animation on the field (±8dp, ~400ms) and fire the error haptic at the same time.


### Expand / Collapse / 展開・折りたたみアニメーション

- id: `expand_collapse`  URL: https://uizukan.dev/entry/expand_collapse/
- 種別: アクション / Motion & Micro-interactions
- 別名: Animated Size, Reveal, Disclosure Animation, Accordion Animation
- 呼び名: Material 3=該当なし（Motion に個別名は無い） / Material 2=該当なし（M2 に無い） / Android (Compose)=AnimatedVisibility / Modifier.animateContentSize / iOS (HIG)=Disclosure controls / SwiftUI=DisclosureGroup / withAnimation / Web=<details> / CSS grid-template-rows の transition / Flutter=AnimatedSize / AnimatedCrossFade
- Flutter: `AnimatedSize / AnimatedCrossFade`
- 関連: expansion_tile, crossfade

**説明**: サイズの変化を補間して、内容が滑らかに現れる／消える動き。矢印アイコンの回転を添えると状態が伝わる。

**使いどころ**: 「もっと見る」、詳細設定の開閉、FAQ、フィルタパネル。

**AI への伝え方（日本語）**: 説明文を 3 行で省略し、「もっと見る」をタップすると全文が下に滑らかに伸びて表示される Expand / Collapse にして。矢印も 180° 回転させて。

**Prompt (English)**: Truncate the description to 3 lines; tapping "Read more" smoothly expands to the full text. Rotate the chevron 180° as well.


### Cross-fade Switch / クロスフェード切替

- id: `crossfade`  URL: https://uizukan.dev/entry/crossfade/
- 種別: アクション / Motion & Micro-interactions
- 別名: Animated Switcher, Fade Swap, Content Transition
- 呼び名: Material 3=Fade（transition pattern） / Material 2=Fade（Motion system） / Android (Compose)=Crossfade / AnimatedContent / iOS (HIG)=該当なし（Cross-dissolve） / SwiftUI=.transition(.opacity) / Web=CSS transition: opacity / View Transitions API / Flutter=AnimatedSwitcher
- Flutter: `AnimatedSwitcher`
- 関連: skeleton, loading_button, fade_through, expand_collapse

**説明**: 古い child がフェードアウトしつつ新しい child がフェードインする。key を変えることで「別物になった」と Flutter に伝える。

**使いどころ**: スケルトン→本文、ボタン内のラベル⇄スピナー、アイコンの状態変化。

**AI への伝え方（日本語）**: 読み込み中はスピナー、完了したら内容、を AnimatedSwitcher でクロスフェード（200ms）させて。パッと切り替わらないように。

**Prompt (English)**: Cross-fade (200ms) between the spinner while loading and the content when done using AnimatedSwitcher, instead of an abrupt swap.


### Animated Counter / 数字のカウントアップ

- id: `animated_counter`  URL: https://uizukan.dev/entry/animated_counter/
- 種別: アクション / Motion & Micro-interactions
- 別名: Count Up, Rolling Number, Odometer, Number Ticker
- 呼び名: Material 3=該当なし（M3 に無い） / Material 2=該当なし（M2 に無い） / Android (Compose)=AnimatedContent + animateIntAsState / iOS (HIG)=該当なし（iOS 標準には無い） / SwiftUI=.contentTransition(.numericText()) / Web=該当なし（requestAnimationFrame で自作） / Flutter=TweenAnimationBuilder<int>
- Flutter: `TweenAnimationBuilder<int>`
- 関連: stat_tile, confetti, linear_progress

**説明**: 数値を補間して表示する。単純なカウントアップと、各桁が縦にスロットのように回る「ローリング」がある。達成感・強調に使う。

**使いどころ**: 合計金額、獲得ポイント、歩数、フォロワー数など、数字が主役の場面。

**AI への伝え方（日本語）**: 獲得ポイントを表示するとき、0 から実際の値まで 800ms かけてカウントアップさせて（easeOut）。3 桁区切りで。

**Prompt (English)**: When showing earned points, count up from 0 to the actual value over 800ms with easeOut, formatted with thousands separators.


### Shimmer / シマー（光が流れるローディング）

- id: `shimmer`  URL: https://uizukan.dev/entry/shimmer/
- 種別: アクション / Motion & Micro-interactions
- 別名: Shimmer Effect, Skeleton Animation, Loading Glow, Sweep Highlight
- 呼び名: Material 3=該当なし（Skeleton loaders として言及のみ） / Material 2=該当なし（M2 に無い） / Android (Compose)=該当なし（Brush.linearGradient + rememberInfiniteTransition で自作） / iOS (HIG)=該当なし（iOS 標準には無い） / SwiftUI=該当なし（.redacted + 自作のグラデーション） / Web=CSS @keyframes（background-position） / Flutter=ShaderMask + AnimationController / shimmer パッケージ
- Flutter: `ShaderMask + AnimationController / shimmer パッケージ`
- 関連: skeleton, crossfade

**説明**: スケルトンにかける斜めのグラデーションのループ。「読み込み中」を静止画より強く伝える。1.2〜1.5 秒周期。

**使いどころ**: Skeleton Screen の上。ボタンの上を流して「押して」と誘導する演出にも使う。

**AI への伝え方（日本語）**: Skeleton の上に、左から右へ白い光が 1.5 秒周期で流れる Shimmer をかけて。

**Prompt (English)**: Overlay a Shimmer on the skeleton: a white highlight sweeping left to right on a 1.5s loop.


### Confetti (Celebration) / 紙吹雪（達成演出）

- id: `confetti`  URL: https://uizukan.dev/entry/confetti/
- 種別: アクション / Motion & Micro-interactions
- 別名: Celebration Effect, Particle Burst, Success Animation, Party Popper
- 呼び名: Material 3=該当なし（M3 に無い） / Material 2=該当なし（M2 に無い） / Android (Compose)=該当なし（Canvas で自作） / iOS (HIG)=該当なし（iOS 標準には無い） / SwiftUI=該当なし（Canvas / SpriteKit で自作） / Web=該当なし（canvas-confetti 等） / Flutter=confetti: ConfettiWidget + ConfettiController
- Flutter: `confetti: ConfettiWidget + ConfettiController`
- 関連: haptic_notification, animated_counter, like_burst

**説明**: 色とりどりの紙片が噴き出して落ちる演出。Success 触覚・チェックマークのアニメーションと組み合わせる。1〜2 秒で終わらせる。

**使いどころ**: 初回タスク完了、連続記録の達成、決済完了、レベルアップ。多用すると価値が下がる。

**AI への伝え方（日本語）**: 目標を達成したら、画面上部中央から紙吹雪が 2 秒噴き出す Confetti 演出を出して。同時に Success 触覚を鳴らして。

**Prompt (English)**: When the goal is reached, burst Confetti from the top-center of the screen for 2 seconds and fire the success haptic.


### Like Burst (Heart Pop) / いいねのポップ（ハートが弾ける）

- id: `like_burst`  URL: https://uizukan.dev/entry/like_burst/
- 種別: アクション / Motion & Micro-interactions
- 別名: Heart Animation, Like Animation, Favorite Pop, Twitter Heart
- 呼び名: Material 3=該当なし（M3 に無い） / Material 2=該当なし（M2 に無い） / Android (Compose)=該当なし（Animatable + scale で自作） / iOS (HIG)=該当なし（iOS 標準には無い） / SwiftUI=.symbolEffect(.bounce)（iOS 17） / Web=CSS @keyframes / Flutter=AnimatedScale + IconButton
- Flutter: `AnimatedScale + IconButton`
- 関連: icon_button, double_tap, press_scale, confetti

**説明**: Twitter / Instagram の「いいね」。scale 0→1.3→1.0 のバネ動作、色の変化、周囲の粒子（任意）を 400ms 程度で。

**使いどころ**: いいね・お気に入り・ブックマークなど、感情を伴う ON 操作。

**AI への伝え方（日本語）**: いいねボタンをタップしたら、ハートが 1.3 倍に弾んでから戻りつつ赤くなる Like Burst アニメーションにして。軽い触覚付きで。

**Prompt (English)**: On tapping the like button, play a Like Burst: the heart springs to 1.3x then settles while turning red, with a light haptic.


### Undo Pattern / 「元に戻す」パターン

- id: `snackbar_undo`  URL: https://uizukan.dev/entry/snackbar_undo/
- 種別: アクション / Motion & Micro-interactions
- 別名: Undo Snackbar, Optimistic Delete, Soft Delete with Undo
- 呼び名: Material 3=Snackbar（action: Undo） / Material 2=Snackbar（Undo action） / Android (Compose)=SnackbarHostState.showSnackbar(actionLabel = "Undo") / iOS (HIG)=該当なし（Shake to undo / Undo ボタン） / SwiftUI=該当なし（自作の toast + Undo） / Web=該当なし（Toast with Undo。role="status"） / Flutter=ScaffoldMessenger + SnackBarAction + Timer
- Flutter: `ScaffoldMessenger + SnackBarAction + Timer`
- 関連: snackbar, swipe_to_dismiss, alert_dialog

**説明**: 確認ダイアログを出す代わりに、先に消して（楽観的更新）Snackbar で取り消しを提供する。数秒後に本当に削除する。

**使いどころ**: 取り消しが容易な削除・アーカイブ。決済のような不可逆操作には使わない。

**AI への伝え方（日本語）**: 削除は確認ダイアログを出さず、即座にリストから消して「削除しました／元に戻す」の Snackbar を 4 秒出す Undo パターンにして。元に戻すで同じ位置に復元。

**Prompt (English)**: Use the Undo pattern for delete: remove from the list immediately (no confirm dialog) and show a "Deleted / Undo" Snackbar for 4s; Undo restores it at the same index.


### Staggered Entrance / 順番に現れるリスト（スタッガー）

- id: `staggered_list`  URL: https://uizukan.dev/entry/staggered_list/
- 種別: アクション / Motion & Micro-interactions
- 別名: Staggered Animation, Cascade Animation, List Entrance Animation, Fade-in Slide-up
- 呼び名: Material 3=該当なし（Motion に個別名は無い） / Material 2=Motion（Stagger） / Android (Compose)=AnimatedVisibility + delay / iOS (HIG)=該当なし（iOS 標準には無い） / SwiftUI=.animation(.delay) / PhaseAnimator / Web=CSS animation-delay / Flutter=flutter_staggered_animations: AnimationLimiter + AnimationConfiguration.staggeredList
- Flutter: `flutter_staggered_animations: AnimationLimiter + AnimationConfiguration.staggeredList`
- 関連: crossfade, card, chat_bubble

**説明**: 各要素の開始を 50〜80ms ずつずらして、画面が「生きて」見えるようにする。初回表示だけに使い、スクロール中には使わない。

**使いどころ**: 画面の初回表示、検索結果の表示、ダッシュボードのカード群。

**AI への伝え方（日本語）**: 画面を開いたとき、リストの各行が上から順に 60ms ずつ遅れて、下から 20dp スライドしながらフェードインする Staggered Entrance にして。

**Prompt (English)**: On screen open, animate list rows in with a Staggered Entrance: each row fades in while sliding up 20dp, delayed 60ms after the previous one.


## Scrolling Behaviors / スクロール挙動

### Collapsing Toolbar / 縮むヘッダー（コラプシングツールバー）

- id: `collapsing_toolbar`  URL: https://uizukan.dev/entry/collapsing_toolbar/
- 種別: アクション / Scrolling Behaviors
- 別名: Collapsing App Bar, Flexible Space, Expandable Header, Sliver App Bar
- 呼び名: Material 3=Top app bar（scroll behavior: exit until collapsed） / Material 2=Collapsing toolbar（CollapsingToolbarLayout） / Android (Compose)=TopAppBarDefaults.exitUntilCollapsedScrollBehavior + LargeTopAppBar / iOS (HIG)=Navigation bars（Large title が縮む） / SwiftUI=.navigationBarTitleDisplayMode(.large)（自動） / Web=position: sticky + scroll-driven animations / Flutter=CustomScrollView + SliverAppBar
- Flutter: `CustomScrollView + SliverAppBar`
- 関連: large_title_app_bar, parallax_header, app_bar, hero_transition

**説明**: 先頭に画像や大きなタイトルを置き、上スクロールで高さが減っていき、最終的に App Bar だけが残って固定される。引っ張ると画像が伸びる stretch も付けられる。

**使いどころ**: プロフィール、商品詳細、記事など、ヘッダー画像がある画面。

**AI への伝え方（日本語）**: 商品詳細の上に高さ 240 の画像ヘッダーを置き、スクロールすると縮んで App Bar に収まる Collapsing Toolbar にして。タイトルは縮んだときだけ表示。下に引っ張ると画像が伸びるように。

**Prompt (English)**: Put a 240dp image header above the product detail that collapses into the App Bar on scroll (Collapsing Toolbar). Show the title only when collapsed, and stretch the image on overscroll.


### Parallax Scrolling / パララックス（視差スクロール）

- id: `parallax_header`  URL: https://uizukan.dev/entry/parallax_header/
- 種別: アクション / Scrolling Behaviors
- 別名: Parallax Effect, Parallax Header, Depth Scrolling
- 呼び名: Material 3=該当なし（M3 に無い） / Material 2=該当なし（M2 に無い） / Android (Compose)=Modifier.graphicsLayer + scroll offset / iOS (HIG)=該当なし（iOS 標準には無い） / SwiftUI=GeometryReader / .scrollTransition / Web=background-attachment: fixed / scroll-driven animations / Flutter=Flow + FlowDelegate / Transform.translate
- Flutter: `Flow + FlowDelegate / Transform.translate`
- 関連: collapsing_toolbar, card, carousel

**説明**: スクロール量の半分だけ背景をずらすなど、レイヤーごとに移動速度を変えて立体感を出す。ヘッダーやカード内画像で使う。

**使いどころ**: ヒーロー画像付きの記事、旅行・不動産などビジュアル重視の一覧。

**AI への伝え方（日本語）**: リストの各カード内の画像を、スクロールに合わせて少し遅れて動く Parallax 効果にして（画像はカードの高さより大きくして、はみ出しをクリップ）。

**Prompt (English)**: Give each card image in the list a Parallax effect: the image moves slightly slower than the scroll (image taller than the card, overflow clipped).


### Infinite Scroll (Pagination) / 無限スクロール（追加読み込み）

- id: `infinite_scroll`  URL: https://uizukan.dev/entry/infinite_scroll/
- 種別: アクション / Scrolling Behaviors
- 別名: Load More, Endless Scroll, Lazy Loading, Paging
- 呼び名: Material 3=該当なし（M3 に無い） / Material 2=該当なし（M2 に無い） / Android (Compose)=LazyColumn + LazyListState（末尾検知）/ Paging 3 / iOS (HIG)=該当なし（iOS 標準には無い） / SwiftUI=List + .onAppear（末尾で読み込み） / Web=IntersectionObserver / Feed（WAI-ARIA パターン） / Flutter=ListView.builder + ScrollController / infinite_scroll_pagination
- Flutter: `ListView.builder + ScrollController / infinite_scroll_pagination`
- 関連: pull_to_refresh, skeleton, circular_progress, empty_state

**説明**: スクロール位置が末尾から一定距離に入ったら次ページを取得し、末尾にローディング行を出す。重複取得の防止と「これ以上ない」の表示が必要。

**使いどころ**: SNS のフィード、検索結果、商品一覧など、件数が多い一覧。

**AI への伝え方（日本語）**: フィードを Infinite Scroll にして。末尾の 200px 手前で次ページを取得し、末尾にスピナー行を出す。読み込み中の二重取得を防ぎ、最後まで来たら「以上です」を表示。

**Prompt (English)**: Make the feed Infinite Scroll: fetch the next page when within 200px of the end, show a spinner row at the bottom, guard against duplicate fetches, and show "That's all" at the end.


### Hide on Scroll / スクロールでバーを隠す

- id: `scroll_to_hide_bar`  URL: https://uizukan.dev/entry/scroll_to_hide_bar/
- 種別: アクション / Scrolling Behaviors
- 別名: Scroll-aware Bar, Auto-hide Navigation, Quick Return, Floating App Bar
- 呼び名: Material 3=Top app bar（scroll behavior: enter always） / Material 2=Top app bar（scroll flags: scroll|enterAlways） / Android (Compose)=TopAppBarDefaults.enterAlwaysScrollBehavior / iOS (HIG)=Navigation bars / Tab bars（hidesBarsOnSwipe） / SwiftUI=.toolbarVisibility を scroll で切替 / Web=該当なし（scroll イベントで自作） / Flutter=SliverAppBar(floating: true, snap: true) / userScrollDirection
- Flutter: `SliverAppBar(floating: true, snap: true) / userScrollDirection`
- 関連: fab, extended_fab, app_bar, bottom_navigation_bar

**説明**: スクロール方向を監視し、下方向で隠し上方向で出す。読む場所が広がり、本文に集中できる。SNS のタイムライン・ニュースの記事・ブラウザのアドレスバーでよく見る。下のタブ（Bottom Navigation Bar）は、いつでも切り替えられるよう隠さないのが一般的。

**使いどころ**: 長い記事、フィード、写真一覧など、読むことが主目的の画面。設定画面や短い画面では隠さない。

**AI への伝え方（日本語）**: フィード画面で、下にスクロールすると上の App Bar と FAB が隠れ、少しでも上にスクロールすると戻ってくる Hide on Scroll にして。App Bar は floating + snap、下のタブ（Bottom Navigation Bar）は隠さず固定のまま。

**Prompt (English)**: On the feed, hide the top App Bar and the FAB when scrolling down and bring them back as soon as the user scrolls up (Hide on Scroll). Make the App Bar floating + snap, and keep the Bottom Navigation Bar always visible.


### Overscroll Bounce (Rubber Band) / バウンス（端で跳ね返る）

- id: `overscroll_bounce`  URL: https://uizukan.dev/entry/overscroll_bounce/
- 種別: アクション / Scrolling Behaviors
- 別名: Rubber Band Effect, Bouncing Scroll, Elastic Scroll, Overscroll Glow (Android)
- 呼び名: Material 3=該当なし（Android は Stretch overscroll） / Material 2=該当なし（Edge glow） / Android (Compose)=OverscrollEffect（stretch） / iOS (HIG)=Scroll views（bounce） / SwiftUI=ScrollView（既定で bounce）/ .scrollBounceBehavior / Web=overscroll-behavior / Flutter=ScrollPhysics（BouncingScrollPhysics）
- Flutter: `ScrollPhysics（BouncingScrollPhysics）`
- 関連: pull_to_refresh, collapsing_toolbar, snap_scrolling

**説明**: iOS はバウンス、Android は端で光る（glow）か伸びる（stretch）。Flutter は platform で自動切替するが、physics を指定して統一もできる。

**使いどころ**: iOS らしさを保ちたい一覧。Pull to Refresh（iOS 風）や stretch ヘッダーには必須。

**AI への伝え方（日本語）**: この一覧を Android でも iOS と同じバウンス（Rubber Band）挙動にして。端で光る Android の glow は出さないで。

**Prompt (English)**: Make this list bounce at the edges (Rubber Band) on Android too, exactly like iOS, instead of the Android overscroll glow.


### Snap Scrolling / スナップ（要素に吸着するスクロール）

- id: `snap_scrolling`  URL: https://uizukan.dev/entry/snap_scrolling/
- 種別: アクション / Scrolling Behaviors
- 別名: Paging Scroll, Snap to Item, Scroll Snapping, Magnetic Scroll
- 呼び名: Material 3=Carousel（snap） / Material 2=該当なし（M2 に無い） / Android (Compose)=LazyRow + rememberSnapFlingBehavior / HorizontalPager / iOS (HIG)=Scroll views（paging） / SwiftUI=.scrollTargetBehavior(.viewAligned / .paging) / Web=CSS scroll-snap-type / Flutter=PageView(viewportFraction:) / SnapScrollPhysics（自作）
- Flutter: `PageView(viewportFraction:) / SnapScrollPhysics（自作）`
- 関連: carousel, page_view_swipe, cupertino_picker, page_indicator

**説明**: 自由なスクロールではなく、要素の境界で必ず止まる。カルーセル、時間選択、カード送りで使う。PageView は 1 画面ずつ、ListWheelScrollView は行ごとに吸着。

**使いどころ**: カルーセル、横並びカード、ドラム式ピッカー、ストーリー UI。

**AI への伝え方（日本語）**: 横に並んだカード（幅 280、隙間 16）を、指を離すと最寄りのカードの左端に吸着する Snap Scrolling にして。

**Prompt (English)**: Make the horizontal row of cards (width 280, gap 16) snap so that on release it settles on the nearest card's left edge.


### Scroll to Top / 先頭へ戻る

- id: `scroll_to_top`  URL: https://uizukan.dev/entry/scroll_to_top/
- 種別: アクション / Scrolling Behaviors
- 別名: Back to Top, Tap Status Bar to Scroll, Tap Tab to Scroll Top
- 呼び名: Material 3=該当なし（M3 に無い） / Material 2=該当なし（M2 に無い） / Android (Compose)=LazyListState.animateScrollToItem(0) / iOS (HIG)=該当なし（慣習。Status bar タップで先頭へ） / SwiftUI=ScrollViewReader + proxy.scrollTo / Web=window.scrollTo({ top: 0, behavior: "smooth" }) / Flutter=ScrollController.animateTo / PrimaryScrollController
- Flutter: `ScrollController.animateTo / PrimaryScrollController`
- 関連: bottom_navigation_bar, fab, infinite_scroll

**説明**: iOS はステータスバーのタップで先頭へ戻るのが OS 標準（Flutter は PrimaryScrollController を使えば自動）。選択中タブの再タップで戻すのも定番。長い一覧では「↑」ボタンを出す。

**使いどころ**: 長いフィード・一覧すべて。

**AI への伝え方（日本語）**: 選択中のタブをもう一度タップしたら一覧の先頭へ滑らかにスクロールする Scroll to Top を付けて。iOS のステータスバーのタップでも戻れるように PrimaryScrollController を使って。

**Prompt (English)**: Tapping the already-selected tab should smoothly Scroll to Top of the list. Use PrimaryScrollController so tapping the iOS status bar also works.


