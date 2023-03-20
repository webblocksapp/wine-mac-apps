import { Meta, StoryObj } from 'storybook-solidjs';
import { Box, Typography, TypographyProps } from '@components';
import { For } from 'solid-js';

const options = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'small',
  'abbr',
  'mark',
  'p',
  'strong',
  's',
  'em',
  'del',
  'sub',
  'ins',
  'sup',
  'kbd',
  'u',
];

const meta: Meta<typeof Typography> = {
  title: 'Components/Typography',
  component: Typography,
};

type Story = StoryObj<typeof Typography>;

export const Overview: Story = {
  args: {
    component: 'p',
  },
  argTypes: {
    component: {
      options,
      control: { type: 'select' },
    },
  },
  render: (args) => (
    <Typography {...args}>Component {args.component}</Typography>
  ),
};

export const Typographies: Story = {
  render: () => (
    <For each={options}>
      {(item) => (
        <Box>
          <Typography component={item as TypographyProps['component']}>
            {item}
          </Typography>
        </Box>
      )}
    </For>
  ),
};

export default meta;
