import { Meta, StoryObj } from 'storybook-solidjs';
import { Box } from '@components';

const meta: Meta<typeof Box> = {
  title: 'Components/Box',
  component: Box,
  argTypes: {
    border: {
      options: [1, 2, 3, 4, 5],
      control: { type: 'select' },
    },
    padding: {
      options: [1, 2, 3, 4, 5],
      control: { type: 'select' },
    },
  },
};

type Story = StoryObj<typeof Box>;

export const Overview: Story = {
  args: {
    border: 1,
    padding: 1,
  },
  render: (args) => <Box {...args}>Box Content</Box>,
};

export default meta;
