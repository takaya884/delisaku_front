import type { Meta, StoryObj } from '@storybook/react';
import { RecipeList } from './RecipeList';
import { demoRecipes } from '../../data/demoData';

const meta = {
  title: 'Components/RecipeList',
  component: RecipeList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipeList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    recipes: demoRecipes,
  },
};

export const Empty: Story = {
  args: {
    recipes: [],
  },
};

export const WithViewCallback: Story = {
  args: {
    recipes: demoRecipes,
    onView: (recipe) => {
      console.log('View clicked:', recipe);
      alert(`詳細表示: ${recipe.name}`);
    },
  },
};

export const SingleRecipe: Story = {
  args: {
    recipes: [demoRecipes[0]],
  },
};
