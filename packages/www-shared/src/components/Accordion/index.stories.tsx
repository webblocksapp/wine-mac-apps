import { Meta, StoryObj } from 'storybook-solidjs';
import { Accordion as AccordionComponent, Typography } from '@components';

const meta: Meta<typeof AccordionComponent> = {
  title: 'Components/Accordion',
  component: AccordionComponent,
};

type Story = StoryObj<typeof AccordionComponent>;

export const Accordion: Story = {
  args: {
    text: 'Item 1',
    disabled: false,
    expandable: true,
    open: false,
  },
  render: (args) => (
    <AccordionComponent
      {...args}
      children={
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      }
    />
  ),
};

export default meta;
