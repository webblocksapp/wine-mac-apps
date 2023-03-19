import { Meta, StoryObj } from 'storybook-solidjs';
import { Box, Checkbox, Code } from '@components';
import { useFormHandler } from '@utils';
import * as yup from 'yup';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
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

type Story = StoryObj<typeof Checkbox>;

export const Overview: Story = {
  args: {
    label: 'Subscribed',
    helperText: 'Mark as subscribed to receive notifications.',
  },
  render: (args) => <Checkbox {...args} />,
};

export const ControlledCheckbox: Story = {
  render: (args) => {
    const formHandler = useFormHandler(
      yup.object({
        subscribed: yup.boolean().oneOf([true]),
        status: yup.string().oneOf(['active', 'inactive']),
      }),
      { silentValidation: false }
    );

    return (
      <>
        <Box mb={2}>
          <Checkbox
            {...args}
            formHandler={formHandler}
            label="Subscribed"
            name="subscribed"
          />
        </Box>
        <Box mb={2}>
          <Checkbox
            {...args}
            formHandler={formHandler}
            label={
              formHandler.getFieldValue('status') === 'active'
                ? 'Active'
                : 'Inactive'
            }
            name="status"
            uncheckedValue="inactive"
            value="active"
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
