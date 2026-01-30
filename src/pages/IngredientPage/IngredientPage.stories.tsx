import type { Meta, StoryObj } from '@storybook/react';
import { IngredientPage } from './IngredientPage';

const meta = {
  title: 'Pages/IngredientPage',
  component: IngredientPage,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '食材登録ページ。フォームから食材を登録し、登録済みリストで確認できます。',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IngredientPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSave: (ingredient) => {
      console.log('Ingredient saved:', ingredient);
    },
  },
};

export const Interactive: Story = {
  args: {
    onSave: (ingredient) => {
      console.log('Saved ingredient:', ingredient);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'フォームに入力して登録すると、下部のリストに追加されます。Storybook上でデータの登録フローを確認できます。',
      },
    },
  },
};
