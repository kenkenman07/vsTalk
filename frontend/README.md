# vsTalk フロントエンド 設計書

## 設計思想
本プロジェクトでは、画面表示・データ管理・処理ロジックの役割を分けることを意識して設計しました。
役割ごとにファイルを分けることで、コードの見通しを良くし、機能追加や修正がしやすい構成にしています。

- 画面表示
  - /pages に実装しています
    - 複数の画面で共通して使う見た目や機能は、components として切り出し、再利用しやすいようにしています
  - ユーザーが操作する画面や表示部分を担当します
- データベース処理
  - /modules に実装しています 
  - データの保存・取得など、データベースとのやり取りを担当します
- アプリケーションの処理ロジック
  - /services に実装しています
  - 画面から受け取った情報をもとに、必要な処理を行います

## データフロー



## 機能

### 主機能

- ルーム作成機能
  - 時間設定
  - ルーム名
- ルーム参加機能
  - socket.io のルーム機能
- 議論中断機能
  - socket.io

### サブ機能

- ユーザ登録
  - Google ログイン
- ルーム削除
  - ユーザが 0 人になってから 10 分で削除
  - supabase edge function

## ページ

- サインインページ(/signin)
  - Google サインイン ボタン

- ホームページ(/)
  - タイトル
  - ルーム作成遷移ボタン
  - ルーム参加遷移ボタン
  - プロフィールページ遷移ボタン

- ルーム作成ページ(/create)
  - 戻るボタン
    - ホームページ遷移

  - タイトル
  - ルーム情報入力
    - ルーム名

  - 作成ボタン
    - DB 登録(makeRoom)
    - 議論ページ遷移

- ルーム参加ページ(/join)
  - 戻るボタン
  - ルーム一覧
    - ルーム名
    - 参加人数
    - 参加ボタン
      - 議論ページ遷移

- 議論ページ(/meet)
  - 退出ボタン
    - ホームページ遷移
  - 議論中断理由選択
    - ４つ
  - 議論中断ボタン
  - メンバー一覧
  - 経過時間表示

- プロフィールページ(/profile)
  - 戻るボタン
  - 名前変更ボタン
    - 変更名入力フォーム
  - ログアウトボタン

## ロジック

### services

#### auth

- サインイン
- サインアウト

#### rooms

- ルーム作成
- ルーム参加
- ルーム退出
- ルーム一覧取得

### auth

#### サインイン(signIn)

- Google ログイン
  - (supabase に Google ID, key を登録)
- ユーザ情報取得
  - getSession()
- currentUser.state に登録

#### サインアウト(signOut)

- auth.signOut()
- currentUser.state をリセット

### rooms

#### ルーム作成(ルーム名)(createRoom)

- rooms に登録
  - &取得
- room_member に登録
  - &取得
- rooms.state に登録
- roomMember.state に登録

#### ルーム参加(joinRoom)

- room_member に新規追加
  - &取得
- roomMember.state に登録

#### ルーム退出

- room_member から本人を削除
- room_member を数えて 0 人なら
  - rooms から該当 room 消す
- roomInfo をリセット → 未実装

#### ルーム一覧取得(getNameAndCount)

- roomsから全room取得
- room_memberで、各roomの人数を取得

#### プロフィール(名前)変更

- profileを更新
  - 新profileを取得

- currentUser.stateにセット
  - {...currentUser, displayName: profile.displayname}

### hooks

#### ソケット通信(useSocket)

- socket.ts からクライアントをインポート
  {
  joinRoom,
  sendMessage,
  registerMessageHandler,
  leaveRoom,
  messages
  }

#### ルーム作成機能

- roomId を送る

#### メッセージ送信機能

- メッセージを送る

#### メッセージ受信ハンドラ登録機能

- メッセージを受け取った際のハンドラを登録する

## データ保管

### DB

#### rooms

- id (↔roomMember:roomId)
- name
- createdAt

#### room_member

- room_id (↔rooms:id)
- member_id(↔auth:id)

#### profile

- user_id
- display_name

### jotai

#### currentUser.state

#### roomInfo.state

- [rooms][id]
- [rooms][name]
- [room_member][member_id]

## 修正点

- グローバルステートの処理をサービスから UI 側に持ってくる
- それぞれの理由に応じた行動を提案する
