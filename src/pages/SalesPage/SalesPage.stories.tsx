import type { Meta, StoryObj } from '@storybook/react';
import { SalesPage } from './SalesPage';

const meta: Meta<typeof SalesPage> = {
  title: 'Pages/SalesPage',
  component: SalesPage,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof SalesPage>;

export const Default: Story = {};
