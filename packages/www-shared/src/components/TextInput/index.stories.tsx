import { Meta, StoryObj } from 'storybook-solidjs';
import { Box, Code, TextInput } from '@components';
import { useFormHandler } from '@utils';
import * as yup from 'yup';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  argTypes: {
    prevSlot: {
      options: ['None', 'Start'],
      mapping: {
        None: undefined,
        Start: <Box padding={2}>Start</Box>,
      },
      control: { type: 'select' },
    },
    nextSlot: {
      options: ['None', 'End'],
      mapping: {
        None: undefined,
        End: <Box padding={2}>End</Box>,
      },
      control: { type: 'select' },
    },
  },
};

type Story = StoryObj<typeof TextInput>;

export const Overview: Story = {
  args: {
    label: 'Name',
    placeholder: 'Write your name',
    helperText: 'f.e. John Wick',
  },
  render: (args) => <TextInput {...args} />,
};

export const ControlledInput: Story = {
  render: (args) => {
    const formHandler = useFormHandler(
      yup.object({
        name: yup.string().required(),
      }),
      { silentValidation: false }
    );

    return (
      <>
        <Box mb={2}>
          <TextInput
            {...args}
            formHandler={formHandler}
            label="Name"
            placeholder="Write your name"
            name="name"
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
