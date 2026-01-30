# Storybook 使用ガイド

このドキュメントでは、Delisakuプロジェクトで使用しているStorybookの基本的な使い方を説明します。

## Storybookとは

Storybookは、UIコンポーネントを独立して開発・テスト・ドキュメント化するためのツールです。各コンポーネントを様々な状態で確認でき、デモデータを使った動作確認が可能です。

## セットアップ

### Storybookの起動

```bash
npm run storybook
```

ブラウザで http://localhost:6006 が自動的に開きます。

### Storybookのビルド

静的なStorybookサイトを生成するには：

```bash
npm run build-storybook
```

`storybook-static` ディレクトリに出力されます。

## 基本的な使い方

### 1. コンポーネントの確認

左側のサイドバーから確認したいコンポーネントを選択します。

- **Components/**: 再利用可能なUIコンポーネント
  - `InventoryCard`: 在庫カード
  - `RecipeCard`: レシピカード
  - `IngredientForm`: 食材登録フォーム
  - `Sidebar`: サイドバーナビゲーション
  - `Layout`: 全体レイアウト
  
- **Pages/**: ページ全体のコンポーネント
  - `InventoryPage`: 在庫管理ページ
  - `RecipePage`: レシピ管理ページ
  - `IngredientPage`: 食材登録ページ

### 2. ストーリーの確認

各コンポーネントには複数の「ストーリー」があり、異なる状態やプロパティでの表示を確認できます。

例：`InventoryCard` コンポーネントのストーリー
- `Default`: 標準状態
- `LowStock`: 在庫が少ない状態
- `ExpiringSoon`: 賞味期限が近い状態
- `WithEditCallback`: 編集ボタン付き

### 3. コントロールパネル

画面下部の「Controls」タブでは、プロパティをインタラクティブに変更できます。

- テキストや数値を変更
- ブール値（true/false）の切り替え
- オブジェクトやリストの編集

### 4. アクションの確認

「Actions」タブでは、ボタンクリックなどのイベントが発火した際のログを確認できます。

## 食材登録機能のデモ

### 食材登録フォームの使用

1. サイドバーから `Components/IngredientForm` を選択
2. `InteractiveDemo` ストーリーを選択
3. フォームに以下の情報を入力：
   - 食材コード: `ING001`
   - 食材名: `トマト`
   - 単位: `kg`
   - 入数: `10`
   - 仕入価格: `500`
4. 「登録する」ボタンをクリック
5. アラートで登録データが表示されます

### 食材登録ページのデモ

1. サイドバーから `Pages/IngredientPage` を選択
2. `Interactive` ストーリーを選択
3. フォームに情報を入力して登録
4. 画面下部の「登録済み食材」リストに追加されます
5. 複数の食材を連続で登録できます

## ストーリーの作成方法

新しいコンポーネントを作成する際は、以下のテンプレートを参考にしてください：

```typescript
// ComponentName.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // プロパティのデフォルト値
  },
};

export const VariantName: Story = {
  args: {
    // バリエーションのプロパティ
  },
};
```

## ベストプラクティス

1. **各コンポーネントにストーリーを作成**: UIコンポーネントを作成したら、必ずストーリーも作成してください。

2. **様々な状態をカバー**: 通常状態、エラー状態、空の状態など、様々なケースをストーリーで表現しましょう。

3. **ドキュメントを追加**: `parameters.docs.description` を使って、コンポーネントやストーリーの説明を追加しましょう。

4. **レスポンシブ確認**: Storybookのビューポートサイズを変更して、レスポンシブデザインを確認しましょう。

## トラブルシューティング

### Storybookが起動しない

```bash
# node_modulesを削除して再インストール
rm -rf node_modules
npm install
npm run storybook
```

### ホットリロードが効かない

ブラウザのキャッシュをクリアして再読み込みしてください。

### ストーリーが見つからない

ファイル名が `*.stories.tsx` になっているか確認してください。

## 参考リンク

- [Storybook 公式ドキュメント](https://storybook.js.org/docs)
- [Storybook for React](https://storybook.js.org/docs/react/get-started/introduction)
