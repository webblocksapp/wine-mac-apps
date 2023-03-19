import { Meta, StoryObj } from 'storybook-solidjs';
import { Box, Checkboxes, Code } from '@components';
import { useFormHandler } from '@utils';
import * as yup from 'yup';

const meta: Meta<typeof Checkboxes> = {
  title: 'Components/Checkboxes',
  component: Checkboxes,
  argTypes: {
    display: {
      options: ['Default', 'Switch'],
      mapping: {
        Default: undefined,
        Switch: 'switch',
      },
      control: { type: 'select' },
    },
  },
};

type Story = StoryObj<typeof Checkboxes>;

export const Overview: Story = {
  args: {
    label: 'Favorite foods',
    helperText: 'Mark some of your favorite foods.',
  },
  render: (args) => (
    <Checkboxes
      {...args}
      options={[
        { value: 1, label: 'Pizza' },
        { value: 2, label: 'Hamburger' },
        { value: 3, label: 'Ice cream' },
      ]}
    />
  ),
};

export const ControlledCheckboxes: Story = {
  render: (args) => {
    const formHandler = useFormHandler(
      yup.object({
        favoriteFoods: yup.array(yup.number()).min(1),
      }),
      { silentValidation: false }
    );

    return (
      <>
        <Box mb={2}>
          <Checkboxes
            {...args}
            formHandler={formHandler}
            label="Favorite foods"
            name="favoriteFoods"
            options={[
              { value: 1, label: 'Pizza' },
              { value: 2, label: 'Hamburger' },
              { value: 3, label: 'Ice cream' },
            ]}
          />
        </Box>
        <Box mb={2}>
          <Code>{JSON.stringify(formHandler.formData())}</Code>
        </Box>
      </>
    );
  },
};

export default meta;
