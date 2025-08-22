import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Table, { Column } from "../DataTable/Table"

type User = { id: number; name: string; email: string; age: number };

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const sample: User[] = [
  { id: 1, name: "Ayush Pawshe", email: "ayush@example.com", age: 21 },
  { id: 2, name: "Ravi Kumar", email: "ravi@example.com", age: 22 },
  { id: 3, name: "Anita Raj", email: "anita@example.com", age: 20 },
];

const meta: Meta<typeof Table<User>> = {
  title: "UI/DataTable",
  component: Table<User>,
  args: {
    data: sample,
    columns,
    loading: false,
    selectable: true,
    selectionMode: "multiple",
    emptyMessage: "No users found",
    "aria-label": "Users table",
  },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Table<User>>;

export const Default: Story = {};

export const Loading: Story = {
  args: { loading: true, data: [] },
};

export const Empty: Story = {
  args: { data: [] },
};

export const SingleSelect: Story = {
  args: { selectable: true, selectionMode: "single" },
};

export const WithCustomCell: Story = {
  args: {
    columns: [
      columns[0],
      {
        key: "email",
        title: "Email",
        dataIndex: "email",
        render: (v: string) => <a href={`mailto:${v}`} className="text-blue-600 underline">{v}</a>,
      },
      columns[2],
    ],
  },
};
