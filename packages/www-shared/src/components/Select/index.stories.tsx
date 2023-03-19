import { Meta, StoryObj } from 'storybook-solidjs';
import { Select } from '@components';
import { useFormHandler } from '@utils';
import * as yup from 'yup';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
};

type Story = StoryObj<typeof Select>;

export const Overview: Story = {
  args: {
    label: 'Country',
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

export const ControlledSelect: Story = {
  render: () => {
    const formHandler = useFormHandler(
      yup.object({
        country: yup.number().typeError('Country is required'),
      }),
      { silentValidation: false }
    );

    return (
      <Select
        formHandler={formHandler}
        label="Country"
        placeholder="Select a country"
        name="country"
        options={[
          { value: 1, label: 'Colombia' },
          { value: 2, label: 'Ecuador' },
          { value: 3, label: 'Perú' },
        ]}
      />
    );
  },
};

export default meta;
