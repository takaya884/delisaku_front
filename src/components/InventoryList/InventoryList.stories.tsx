import type { Meta, StoryObj } from '@storybook/react';
import { InventoryList } from './InventoryList';
import { demoInventoryItems } from '../../data/demoData';

const meta = {
  title: 'Components/InventoryList',
  component: InventoryList,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InventoryList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: demoInventoryItems,
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const WithEditCallback: Story = {
  args: {
    items: demoInventoryItems,
    onEdit: (item) => {
      console.log('Edit clicked:', item);
      alert(`編集: ${item.name}`);
    },
  },
};

export const SingleItem: Story = {
  args: {
    items: [demoInventoryItems[0]],
  },
};
