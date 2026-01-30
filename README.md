# Delisaku Front-End

飲食店向けの在庫管理・レシピ管理システムのフロントエンドアプリケーション

## 概要

Delisakuは、レストランや飲食店向けの在庫とレシピを効率的に管理するためのWebアプリケーションです。React + TypeScriptで構築され、Storybookを使用したコンポーネント開発とデモデータでの動作確認が可能です。

## 主な機能

- **在庫管理**: 食材や材料の在庫を追跡・管理
  - 在庫数量のリアルタイム表示
  - 低在庫アラート
  - 賞味期限管理

- **食材登録**: 新しい食材をシステムに登録
  - 食材コード、食材名、単位
  - 入数、仕入価格
  - 賞味期限
  - 商品画像、発注先URL
  
- **レシピ管理**: レシピの作成・参照
  - 材料リスト
  - 調理手順
  - 人数・時間情報

- **レスポンシブデザイン**: スマートフォンからデスクトップまで対応

## 技術スタック

| カテゴリ | 技術 | バージョン | 用途 |
|---------|------|-----------|------|
| **フレームワーク** | React | 19.x | UIライブラリ |
| **言語** | TypeScript | 5.x | 型安全性 |
| **ビルドツール** | Vite | 7.x | 高速ビルド・開発サーバー |
| **UIドキュメント** | Storybook | 10.x | コンポーネント開発・ドキュメント |
| **E2Eテスト** | Playwright | 1.x | 自動ブラウザテスト |
| **ユニットテスト** | Vitest | 4.x | コンポーネントテスト |
| **スタイリング** | CSS3 | - | レスポンシブデザイン（CSS変数とメディアクエリ） |

## アーキテクチャ

### ディレクトリ構成

```
delisaku_front/
├── src/
│   ├── components/        # 再利用可能なコンポーネント
│   │   ├── Header/        # ヘッダーコンポーネント
│   │   ├── Sidebar/       # サイドバーナビゲーション
│   │   ├── Layout/        # 全体レイアウト
│   │   ├── InventoryCard/ # 在庫カード
│   │   ├── InventoryList/ # 在庫リスト
│   │   ├── IngredientForm/ # 食材登録フォーム
│   │   ├── RecipeCard/    # レシピカード
│   │   └── RecipeList/    # レシピリスト
│   ├── pages/             # ページコンポーネント
│   │   ├── InventoryPage/ # 在庫管理ページ
│   │   ├── IngredientPage/ # 食材登録ページ
│   │   └── RecipePage/    # レシピ管理ページ
│   ├── types/             # TypeScript型定義
│   ├── data/              # デモデータ
│   ├── styles/            # グローバルスタイル
│   ├── App.tsx            # メインアプリケーション
│   └── main.tsx           # エントリーポイント
├── e2e/                   # E2Eテスト
├── docs/                  # ドキュメント
├── .storybook/            # Storybook設定
├── playwright.config.ts   # Playwright設定
├── vite.config.ts         # Vite設定
└── tsconfig.json          # TypeScript設定
```

### コンポーネント設計方針

1. **Atomic Design パターン**
   - コンポーネントを小さな単位に分割
   - 再利用可能なコンポーネントを作成
   - ページ単位でコンポーネントを組み合わせ

2. **関心の分離**
   - 各コンポーネントは単一責任の原則に従う
   - スタイルはコンポーネントごとに分離（CSS Modules的アプローチ）
   - 型定義は `types/` ディレクトリで一元管理

3. **テスタビリティ**
   - 各コンポーネントにStorybookストーリーを作成
   - E2Eテストでユーザーフローを検証
   - Propsによる依存性注入で単体テストを容易に

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

# Playwright ブラウザのインストール（E2Eテスト用）
npx playwright install chromium
```

## 開発

### 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:5173 を開きます。

### Storybookの起動

```bash
npm run storybook
```

ブラウザで http://localhost:6006 を開きます。

Storybookでは各コンポーネントを個別に確認でき、デモデータを使用して様々な状態をテストできます。

詳しい使い方は [Storybook使用ガイド](./docs/STORYBOOK_GUIDE.md) を参照してください。

## テスト

### E2Eテストの実行

```bash
# ヘッドレスモードで実行
npm run test:e2e

# UIモードで実行（デバッグ用）
npm run test:e2e:ui

# ブラウザを表示して実行
npm run test:e2e:headed
```

## ビルド

```bash
# プロダクションビルド
npm run build

# ビルドのプレビュー
npm run preview

# Storybookのビルド
npm run build-storybook
```

## 新規画面の追加方法

新しい画面を追加する際は、以下の手順に従ってください：

### 1. 型定義の追加（必要に応じて）

```typescript
// src/types/index.ts に型を追加
export interface NewFeature {
  id: string;
  name: string;
  // ...
}
```

### 2. コンポーネントの作成

```bash
# 新しいコンポーネントディレクトリを作成
mkdir -p src/components/NewComponent
```

以下のファイルを作成：
- `NewComponent.tsx` - コンポーネント本体
- `NewComponent.css` - スタイル
- `NewComponent.stories.tsx` - Storybookストーリー
- `index.ts` - エクスポート

### 3. ページコンポーネントの作成

```bash
mkdir -p src/pages/NewPage
```

### 4. ルーティングの追加

`src/App.tsx` にページを追加：

```typescript
import { NewPage } from './pages/NewPage';

// PageType に追加
type PageType = 'inventory' | 'recipes' | 'ingredients' | 'newpage';

// renderPage に追加
case 'newpage':
  return <NewPage />;
```

### 5. サイドバーへのリンク追加

`src/components/Layout/Layout.tsx` のサイドバーアイテムに追加：

```typescript
const sidebarItems: SidebarItem[] = [
  // ...
  { id: 'newpage', label: '新機能', href: '#newpage', icon: '🆕' },
];
```

### 6. E2Eテストの追加

`e2e/` ディレクトリに新しいテストファイルを作成。

## レスポンシブ対応

このアプリケーションは、モバイルファーストのアプローチで設計されています：

- **モバイル**: 576px未満
- **タブレット**: 576px - 768px
- **デスクトップ**: 768px以上

CSS変数とメディアクエリを使用して、デバイスサイズに応じた最適な表示を実現しています。

## Storybookの使い方

Storybookには以下のストーリーが含まれています：

- **Components/Sidebar**: サイドバーナビゲーション
- **Components/Layout**: レイアウトコンポーネント
- **Components/IngredientForm**: 食材登録フォーム
- **Components/InventoryCard**: 在庫カードの様々な状態
- **Components/RecipeCard**: レシピカードの様々な状態
- **Components/InventoryList**: 在庫リスト表示
- **Components/RecipeList**: レシピリスト表示
- **Components/Header**: レスポンシブヘッダー
- **Pages/IngredientPage**: 食材登録ページ全体
- **Pages/InventoryPage**: 在庫管理ページ全体
- **Pages/RecipePage**: レシピ管理ページ全体

各ストーリーでは、デモデータを使用してコンポーネントの動作を確認できます。

## ライセンス

ISC
