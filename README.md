# Delisaku Front-End

飲食店向けの在庫管理・レシピ管理システムのフロントエンドアプリケーション

## 概要

Delisakuは、レストランや飲食店向けの在庫とレシピを効率的に管理するためのWebアプリケーションです。React + TypeScriptで構築され、Storybookを使用したコンポーネント開発とデモデータでの動作確認が可能です。

## 主な機能

- **在庫管理**: 食材や材料の在庫を追跡・管理
  - 在庫数量のリアルタイム表示
  - 低在庫アラート
  - 賞味期限管理
  
- **レシピ管理**: レシピの作成・参照
  - 材料リスト
  - 調理手順
  - 人数・時間情報

- **レスポンシブデザイン**: スマートフォンからデスクトップまで対応

## 技術スタック

- **React 19**: UIライブラリ
- **TypeScript**: 型安全性
- **Vite**: 高速ビルドツール
- **Storybook 10**: コンポーネント開発・ドキュメント
- **CSS3**: レスポンシブデザイン（CSS変数とメディアクエリ）

## セットアップ

### 前提条件

- Node.js 18以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone https://github.com/takaya884/delisaku_front.git
cd delisaku_front

# 依存関係のインストール
npm install
```

## 開発

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

### Storybookの起動

```bash
npm run storybook
```

ブラウザで http://localhost:6006 を開きます。

Storybookでは各コンポーネントを個別に確認でき、デモデータを使用して様々な状態をテストできます。

## ビルド

```bash
# プロダクションビルド
npm run build

# ビルドのプレビュー
npm run preview

# Storybookのビルド
npm run build-storybook
```

## プロジェクト構成

```
delisaku_front/
├── src/
│   ├── components/        # 再利用可能なコンポーネント
│   │   ├── Header/        # ヘッダーコンポーネント
│   │   ├── InventoryCard/ # 在庫カード
│   │   ├── InventoryList/ # 在庫リスト
│   │   ├── RecipeCard/    # レシピカード
│   │   └── RecipeList/    # レシピリスト
│   ├── pages/             # ページコンポーネント
│   │   ├── InventoryPage/ # 在庫管理ページ
│   │   └── RecipePage/    # レシピ管理ページ
│   ├── types/             # TypeScript型定義
│   ├── data/              # デモデータ
│   ├── styles/            # グローバルスタイル
│   ├── App.tsx            # メインアプリケーション
│   └── main.tsx           # エントリーポイント
├── .storybook/            # Storybook設定
├── index.html             # HTML テンプレート
├── vite.config.ts         # Vite設定
└── tsconfig.json          # TypeScript設定
```

## レスポンシブ対応

このアプリケーションは、モバイルファーストのアプローチで設計されています：

- **モバイル**: 576px未満
- **タブレット**: 576px - 768px
- **デスクトップ**: 768px以上

CSS変数とメディアクエリを使用して、デバイスサイズに応じた最適な表示を実現しています。

## Storybookの使い方

Storybookには以下のストーリーが含まれています：

- **Components/InventoryCard**: 在庫カードの様々な状態
- **Components/RecipeCard**: レシピカードの様々な状態
- **Components/InventoryList**: 在庫リスト表示
- **Components/RecipeList**: レシピリスト表示
- **Components/Header**: レスポンシブヘッダー
- **Pages/InventoryPage**: 在庫管理ページ全体
- **Pages/RecipePage**: レシピ管理ページ全体

各ストーリーでは、デモデータを使用してコンポーネントの動作を確認できます。

## ライセンス

ISC
