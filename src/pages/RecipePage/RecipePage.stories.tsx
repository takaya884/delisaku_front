import type { Meta, StoryObj } from '@storybook/react';
import { RecipePage } from './RecipePage';

const meta = {
  title: 'Pages/RecipePage',
  component: RecipePage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RecipePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
