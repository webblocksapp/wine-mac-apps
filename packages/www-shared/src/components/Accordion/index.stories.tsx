import { Meta, StoryObj } from 'storybook-solidjs';
import { Accordion as AccordionComponent } from '@components';

const meta: Meta<typeof AccordionComponent> = {
  title: 'Accordion',
  component: AccordionComponent,
};

type Story = StoryObj<typeof AccordionComponent>;

export const Accordion: Story = {
  args: {
    text: 'Item 1',
  },
  render: (args) => <AccordionComponent {...args} />,
};

export default meta;
