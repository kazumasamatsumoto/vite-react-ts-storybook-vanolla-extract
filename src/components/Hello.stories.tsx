// src/components/Hello.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import Hello from "./Hello";

// Meta 定義（コンポーネントのメタ情報）
const meta: Meta<typeof Hello> = {
  title: "Components/Hello",
  component: Hello,
  argTypes: {
    name: { control: "text" },
  },
};

export default meta;

// Story の型定義
type Story = StoryObj<typeof Hello>;

// Default Story の定義
export const Default: Story = {
  args: {
    name: "Storybook User",
  },
};
