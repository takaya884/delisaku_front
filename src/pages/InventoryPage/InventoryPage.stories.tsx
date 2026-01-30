import type { Meta, StoryObj } from '@storybook/react';
import { InventoryPage } from './InventoryPage';

const meta = {
  title: 'Pages/InventoryPage',
  component: InventoryPage,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InventoryPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
