import type { Meta, StoryObj } from '@storybook/react';
import { RecipeCard } from './RecipeCard';

const meta = {
  title: 'Components/RecipeCard',
  component: RecipeCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipeCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    recipe: {
      id: '1',
      name: 'トマトパスタ',
      description: '新鮮なトマトを使ったシンプルなパスタ',
      category: 'パスタ',
      servings: 4,
      prepTime: 10,
      cookTime: 20,
      ingredients: [
        { itemId: '1', itemName: 'トマト', quantity: 0.5, unit: 'kg' },
        { itemId: '2', itemName: '玉ねぎ', quantity: 0.2, unit: 'kg' },
        { itemId: '4', itemName: 'オリーブオイル', quantity: 0.05, unit: 'L' },
        { itemId: '5', itemName: 'パスタ', quantity: 0.4, unit: 'kg' },
      ],
      instructions: [
        'パスタを茹でる',
        '玉ねぎをみじん切りにする',
        'オリーブオイルで玉ねぎを炒める',
        'トマトを加えて煮込む',
        '茹でたパスタと和える',
      ],
    },
  },
};

export const WithImage: Story = {
  args: {
    recipe: {
      id: '2',
      name: 'ビーフシチュー',
      description: '濃厚な牛肉のシチュー',
      category: '煮込み料理',
      servings: 6,
      prepTime: 20,
      cookTime: 120,
      imageUrl: 'https://via.placeholder.com/400x200/97bc62/ffffff?text=Beef+Stew',
      ingredients: [
        { itemId: '3', itemName: '牛肉', quantity: 1, unit: 'kg' },
        { itemId: '2', itemName: '玉ねぎ', quantity: 0.5, unit: 'kg' },
        { itemId: '1', itemName: 'トマト', quantity: 0.3, unit: 'kg' },
      ],
      instructions: [
        '牛肉を一口大に切る',
        '玉ねぎを薄切りにする',
        '牛肉を焼き色がつくまで炒める',
        '玉ねぎとトマトを加える',
        '弱火で2時間煮込む',
      ],
    },
  },
};

export const ManyIngredients: Story = {
  args: {
    recipe: {
      id: '3',
      name: '野菜カレー',
      description: '色々な野菜が入った栄養満点のカレー',
      category: 'カレー',
      servings: 8,
      prepTime: 15,
      cookTime: 45,
      ingredients: [
        { itemId: '1', itemName: 'トマト', quantity: 0.4, unit: 'kg' },
        { itemId: '2', itemName: '玉ねぎ', quantity: 0.3, unit: 'kg' },
        { itemId: '6', itemName: 'じゃがいも', quantity: 0.6, unit: 'kg' },
        { itemId: '7', itemName: 'にんじん', quantity: 0.3, unit: 'kg' },
        { itemId: '8', itemName: 'ピーマン', quantity: 0.2, unit: 'kg' },
        { itemId: '9', itemName: 'カレールー', quantity: 0.2, unit: 'kg' },
      ],
      instructions: [
        '野菜を一口大に切る',
        '玉ねぎを炒める',
        '野菜を加えて炒める',
        '水を加えて煮込む',
        'カレールーを加えて完成',
      ],
    },
  },
};

export const WithCallback: Story = {
  args: {
    recipe: {
      id: '4',
      name: '和風スパゲティ',
      description: '醤油ベースの和風パスタ',
      category: 'パスタ',
      servings: 2,
      prepTime: 5,
      cookTime: 10,
      ingredients: [
        { itemId: '5', itemName: 'パスタ', quantity: 0.2, unit: 'kg' },
        { itemId: '10', itemName: '醤油', quantity: 0.03, unit: 'L' },
      ],
      instructions: ['パスタを茹でる', '醤油と和える'],
    },
    onView: (recipe) => {
      console.log('View clicked:', recipe);
      alert(`詳細表示: ${recipe.name}`);
    },
  },
};
