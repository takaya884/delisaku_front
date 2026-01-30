import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar, SidebarItem } from './Sidebar';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems: SidebarItem[] = [
  { id: 'inventory', label: '在庫管理', href: '#inventory', icon: '📦' },
  { id: 'recipes', label: 'レシピ', href: '#recipes', icon: '🍳' },
  { id: 'ingredients', label: '食材登録', href: '#ingredients', icon: '🥬' },
  { id: 'settings', label: '設定', href: '#settings', icon: '⚙️' },
];

export const Open: Story = {
  args: {
    items: defaultItems,
    isOpen: true,
    onToggle: () => {},
    currentPath: '#inventory',
  },
};

export const Closed: Story = {
  args: {
    items: defaultItems,
    isOpen: false,
    onToggle: () => {},
    currentPath: '#inventory',
  },
};

export const WithInteraction: Story = {
  args: {
    items: defaultItems,
    isOpen: true,
    onToggle: () => {},
    currentPath: '#ingredients',
  },
  render: function RenderWithInteraction(args) {
    const [isOpen, setIsOpen] = useState(args.isOpen);
    return (
      <div style={{ minHeight: '400px' }}>
        <Sidebar
          {...args}
          isOpen={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        />
      </div>
    );
  },
};
