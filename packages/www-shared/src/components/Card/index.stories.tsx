import { Meta, StoryObj } from 'storybook-solidjs';
import { Card } from '@components';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

type Story = StoryObj<typeof Card>;

export const Overview: Story = {
  render: () => <Card>Card Content</Card>,
};

export default meta;
