import { Meta, StoryObj } from 'storybook-solidjs';
import { Select } from '@components';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
};

type Story = StoryObj<typeof Select>;

export const Overview: Story = {
  args: {
    label: 'Countries',
    placeholder: 'Select a country',
  },
  render: (args) => (
    <Select
      {...args}
      options={[
        { value: 1, label: 'Colombia' },
        { value: 2, label: 'Ecuador' },
        { value: 3, label: 'Perú' },
      ]}
    />
  ),
};

export default meta;
