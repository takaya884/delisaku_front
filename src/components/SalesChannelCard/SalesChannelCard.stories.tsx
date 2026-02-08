import type { Meta, StoryObj } from '@storybook/react';
import { SalesChannelCard } from './SalesChannelCard';
import { SalesChannel } from '../../types';

const meta: Meta<typeof SalesChannelCard> = {
  title: 'Components/SalesChannelCard',
  component: SalesChannelCard,
};

export default meta;
type Story = StoryObj<typeof SalesChannelCard>;

const sampleChannel: SalesChannel = {
  id: 'pos-cloud',
  name: 'POSレジシステム（クラウド型）',
  category: 'in-store',
  description: 'クラウド型POSシステムからの売上データ取得',
  retrievalMethod: 'api',
  apiEndpoint: '/api/pos/sales/daily',
  apiDocUrl: 'https://docs.pos-provider.com/api',
  notes: 'スマレジ、Airレジ、SquareなどのクラウドPOS API連携。OAuth2.0認証を使用し、日次バッチでデータ取得。',
  icon: '💻',
};

export const ApiIntegration: Story = {
  args: {
    channel: sampleChannel,
  },
};

export const CsvImport: Story = {
  args: {
    channel: {
      id: 'pos-onpremise',
      name: 'POSレジシステム（オンプレミス型）',
      category: 'in-store',
      description: 'オンプレミス型POSシステムからの売上データ取得',
      retrievalMethod: 'csv-import',
      notes: '日次でCSVエクスポート機能を使用。自動フォルダ監視でCSVファイルを検知し、データベースに取り込み。',
      icon: '🖥️',
    },
  },
};

export const ManualInput: Story = {
  args: {
    channel: {
      id: 'manual-sales',
      name: '手売り（現金レジスター・手動記帳）',
      category: 'in-store',
      description: '手動記帳された売上データの入力',
      retrievalMethod: 'manual',
      notes: '営業終了後に担当者が管理画面から手入力。モバイル対応の入力フォームを提供。',
      icon: '📝',
    },
  },
};

export const WithoutApiDoc: Story = {
  args: {
    channel: {
      id: 'ticket-machine',
      name: '券売機（食券販売機）',
      category: 'in-store',
      description: '券売機からの売上データ取得',
      retrievalMethod: 'csv-import',
      notes: '券売機の管理ソフトから日次CSVエクスポート。FTP/SFTP経由で自動転送。',
      icon: '🎫',
    },
  },
};
