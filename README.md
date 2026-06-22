# [vsTalk]()

![README_header](./images/vsTalk.png)

vsTalk は、
**「話が脱線する」「同じ話が繰り返される」「一人の発言が長くなりすぎる」**
といった **会議あるある** を解決するための、議論サポートアプリです。

## リンク

- **アプリ URL**: https://vs-talk.vercel.app/
- **デモ動画**： https://www.youtube.com/watch?v=JXIKyg7eKTE

## 製品概要

### 背景 (製品開発のきっかけ、課題等)

**STOP!! の背徳感を味わおう**  
会議やディスカッションでは、次のような問題がよく発生します。

- 話の繰り返しが起きる

- 一人の発言が長くなりすぎる

- 話題が本筋から脱線する

- 共通認識のズレが起きている

これらに気づいていても、

**「話を遮るのは気まずい」**
**「空気を壊したくない」**

といった心理的ハードルから、
誰も止められないままムダな議論が続いてしまうことが少なくありません。

**vsTalk** は、
「誰でも・心理的負担なく」話を止められる仕組みを提供します。

- ワンタップで議論をストップ

- 個人を責めない設計

- 全員が同じ状況を共有できる

これにより、ムダな議論を早く終わらせ、建設的な話題に戻すことができます。

### 製品説明（具体的な製品の説明）

### 特長


#### 1. 匿名ストップ機能

- 理由の選択
<img width="733" height="420" alt="image" src="https://github.com/user-attachments/assets/7bec92d2-6fdc-4839-8ece-b47edb5ee49b" />



誰が止めたかは分からない

発言者を特定しないため、気兼ねなく使える

- ストップボタンの押下
<img width="763" height="436" alt="image" src="https://github.com/user-attachments/assets/6d5ea139-44f2-4912-a77b-11e544d13179" />


#### 2. 全員通知

<img width="1833" height="1023" alt="image" src="https://github.com/user-attachments/assets/97bfe454-76dc-4d7b-8406-ea6bcbc09e09" />


ストップボタンが押されると、参加者全員に即時通知

「今、話を整理すべきタイミング」であることを共有

#### 3. 原因の可視化


以下のような理由を表示可能

- 話の繰り返し

- 話のターンの独占

- 話題からの脱線

- 共通認識のズレ

vsTalk は、会議を **「我慢の場」** ではなく、ルールのあるゲームのような体験に変えることを目指しています。

## 開発技術

### 活用した技術

#### フロントエンド

- React (Vite) / TypeScript
- Tailwind css v4 (UI設計・レスポンシブ対応)
- lucide-react (アイコン)
- Socket.io(リアルタイム通信)

#### バックエンド

- Node.js + Socket.io (リアルタイム通信)

#### DB

- Supabase (認証・DB・RLS設計)

#### デプロイ

- Vercel (フロントエンド)
- Render (Socketサーバー)

## ローカルでの起動方法

#### フロントエンド

```
cd frontend
npm install
npm run dev
```

#### バックエンド

```
cd backend
docker build -t vstalk .
docker run -p 3000:3000 vstalk
```
