import { Meta, StoryObj } from 'storybook-solidjs';
import { Button } from '@components';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    color: {
      options: ['primary', 'secondary', 'contrast'],
      control: { type: 'select' },
    },
    variant: {
      options: ['outline', 'filled'],
      control: { type: 'select' },
    },
  },
};

type Story = StoryObj<typeof Button>;

export const Overview: Story = {
  args: {
    color: 'primary',
    variant: 'outline',
  },
  render: (args) => <Button {...args}>My Button</Button>,
};

export default meta;
