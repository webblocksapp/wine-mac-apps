import { Meta, StoryObj } from 'storybook-solidjs';
import { TreeMenu } from '@components';

const meta: Meta<typeof TreeMenu> = {
  title: 'Components/TreeMenu',
  component: TreeMenu,
};

type Story = StoryObj<typeof TreeMenu>;

export const Overview: Story = {
  render: () => (
    <TreeMenu
      menu={[
        {
          text: 'Section 1',
          section: true,
          children: [{ text: 'Children 1-1' }, { text: 'Children 1-2' }],
        },
        {
          text: 'Section 2',
          section: true,
          children: [{ text: 'Children 2-1' }, { text: 'Children 2-2' }],
        },
      ]}
    />
  ),
};

export default meta;
