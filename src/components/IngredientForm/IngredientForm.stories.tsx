import type { Meta, StoryObj } from '@storybook/react';
import { IngredientForm } from './IngredientForm';

const meta = {
  title: 'Components/IngredientForm',
  component: IngredientForm,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '食材登録フォームコンポーネント。食材の基本情報と追加情報を入力できます。',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IngredientForm>;

export default meta;
type Story = StoryObj<typeof meta>;

const handleSubmit = (data: unknown) => {
  console.log('Form submitted:', data);
};

const handleCancel = () => {
  console.log('Form cancelled');
};

export const Default: Story = {
  args: {
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  },
};

export const WithInitialData: Story = {
  args: {
    initialData: {
      code: 'ING001',
      name: 'トマト',
      unit: 'kg',
      packageQuantity: 10,
      purchasePrice: 500,
      expiryDate: '2026-02-15',
      imageUrl: '',
      orderUrl: 'https://example.com/order/tomato',
    },
    onSubmit: handleSubmit,
    onCancel: handleCancel,
  },
};

export const Submitting: Story = {
  args: {
    onSubmit: handleSubmit,
    isSubmitting: true,
  },
};

export const WithoutCancel: Story = {
  args: {
    onSubmit: handleSubmit,
  },
};

export const InteractiveDemo: Story = {
  args: {
    onSubmit: (data) => {
      console.log('Submitted:', data);
      alert(`登録されました:\n${JSON.stringify(data, null, 2)}`);
    },
    onCancel: handleCancel,
  },
  parameters: {
    docs: {
      description: {
        story: 'フォームに入力して「登録する」ボタンをクリックすると、入力データがアラートで表示されます。',
      },
    },
  },
};
