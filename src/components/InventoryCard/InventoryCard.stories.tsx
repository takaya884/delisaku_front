import type { Meta, StoryObj } from '@storybook/react';
import { InventoryCard } from './InventoryCard';

const meta = {
  title: 'Components/InventoryCard',
  component: InventoryCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InventoryCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      id: '1',
      name: 'トマト',
      category: '野菜',
      quantity: 50,
      unit: 'kg',
      minQuantity: 10,
      lastUpdated: '2026-01-30',
      expiryDate: '2026-02-15',
    },
  },
};

export const LowStock: Story = {
  args: {
    item: {
      id: '2',
      name: '牛肉',
      category: '肉類',
      quantity: 8,
      unit: 'kg',
      minQuantity: 10,
      lastUpdated: '2026-01-30',
      expiryDate: '2026-02-02',
    },
  },
};

export const ExpiringSoon: Story = {
  args: {
    item: {
      id: '3',
      name: '魚',
      category: '魚介類',
      quantity: 15,
      unit: 'kg',
      minQuantity: 5,
      lastUpdated: '2026-01-30',
      expiryDate: '2026-02-03',
    },
  },
};

export const NoExpiryDate: Story = {
  args: {
    item: {
      id: '4',
      name: 'オリーブオイル',
      category: '調味料',
      quantity: 5,
      unit: 'L',
      minQuantity: 2,
      lastUpdated: '2026-01-30',
    },
  },
};

export const WithEditCallback: Story = {
  args: {
    item: {
      id: '5',
      name: 'パスタ',
      category: '乾物',
      quantity: 25,
      unit: 'kg',
      minQuantity: 10,
      lastUpdated: '2026-01-30',
    },
    onEdit: (item) => {
      console.log('Edit clicked:', item);
      alert(`編集: ${item.name}`);
    },
  },
};
