import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Input from "../InputComponent/Input"; // ✅ This will pick Input.ts automatically

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

// ✅ Basic usage
export const Default: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
  },
};

// ✅ Variants
export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "20rem" }}>
      <Input label="Filled" placeholder="Filled variant" variant="filled" />
      <Input label="Outlined" placeholder="Outlined variant" variant="outlined" />
      <Input label="Ghost" placeholder="Ghost variant" variant="ghost" />
    </div>
  )
};

// ✅ Sizes
export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "20rem" }}>
      <Input label="Small" placeholder="Small size" size="sm" />
      <Input label="Medium" placeholder="Medium size" size="md" />
      <Input label="Large" placeholder="Large size" size="lg" />
    </div>
  )
};

// ✅ States
export const States: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem", width: "20rem" }}>
      <Input label="Disabled" placeholder="Can't type here" disabled />
      <Input label="Invalid" placeholder="Invalid state" invalid errorMessage="This field is required" />
      <Input label="With Helper" placeholder="Helper text example" helperText="Enter your full name" />
    </div>
  )
};

// ✅ Password + Clear Button
export const WithExtras: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    variant: "outlined",
  },
};
