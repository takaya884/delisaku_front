import type { Meta, StoryObj } from '@storybook/react';
import { Layout } from './Layout';

const meta = {
  title: 'Components/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Layout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPath: '#inventory',
    children: (
      <div style={{ padding: '20px' }}>
        <h2>コンテンツエリア</h2>
        <p>ここにページのコンテンツが表示されます。</p>
      </div>
    ),
  },
};

export const WithHeaderContent: Story = {
  args: {
    currentPath: '#inventory',
    headerContent: (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span style={{ color: 'white' }}>ユーザー名</span>
        <button style={{ 
          padding: '5px 15px', 
          borderRadius: '4px', 
          border: 'none', 
          cursor: 'pointer' 
        }}>
          ログアウト
        </button>
      </div>
    ),
    children: (
      <div style={{ padding: '20px' }}>
        <h2>ヘッダーにログイン情報あり</h2>
        <p>将来的にログイン情報を表示する予定のサンプルです。</p>
      </div>
    ),
  },
};

export const IngredientsPage: Story = {
  args: {
    currentPath: '#ingredients',
    children: (
      <div style={{ padding: '20px' }}>
        <h2>食材登録画面</h2>
        <p>食材登録フォームがここに表示されます。</p>
      </div>
    ),
  },
};
