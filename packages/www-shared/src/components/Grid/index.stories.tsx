import { Meta, StoryObj } from 'storybook-solidjs';
import { Box, Grid } from '@components';

const meta: Meta<typeof Grid> = {
  title: 'Components/Grid',
  component: Grid,
  argTypes: {
    columnSpacing: {
      options: [1, 2, 3, 4, 5],
      control: { type: 'select' },
    },
    rowSpacing: {
      options: [1, 2, 3, 4, 5],
      control: { type: 'select' },
    },
  },
};

type Story = StoryObj<typeof Grid>;

export const GridSpacing: Story = {
  args: {
    columnSpacing: 4,
    rowSpacing: 4,
  },

  render: (args) => (
    <Grid {...args} container>
      <Grid item xs={12} md={4}>
        <Box border={2} padding={2}>
          Item 1
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box border={2} padding={2}>
          Item 2
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box border={2} padding={2}>
          Item 3
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box border={2} padding={2}>
          Item 4
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box border={2} padding={2}>
          Item 5
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box border={2} padding={2}>
          Item 6
        </Box>
      </Grid>
    </Grid>
  ),
};

export default meta;
