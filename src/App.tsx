// src/App.tsx
import React, { useState } from "react";
import "./App.css";
import Input from "./InputComponent/Input";
import Table, { Column } from "./DataTable/Table"

type User = { id: number; name: string; email: string; age: number };

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const data: User[] = [
  { id: 1, name: "Ayush Pawshe", email: "ayush@example.com", age: 21 },
  { id: 2, name: "Ravi Kumar", email: "ravi@example.com", age: 22 },
  { id: 3, name: "Anita Raj", email: "anita@example.com", age: 20 },
];

function App() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center gap-10 bg-gray-50 p-6">
      <h1 className="text-3xl font-bold">🚀 Component Showcase</h1>

      {/* -------- Input Showcase -------- */}
      <div className="w-full flex flex-col items-center gap-6">
        <Input
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          helperText="This will be displayed on your profile"
          clearable
          variant="outlined"
          size="md"
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          helperText="Must be at least 8 characters"
          clearable
        />

        <Input
          label="Email"
          placeholder="Enter your email"
          value="wrong email"
          onChange={() => {}}
          invalid
          errorMessage="Invalid email format"
          variant="filled"
        />

        <Input
          label="Disabled"
          placeholder="Can't type here"
          disabled
          value="Read only text"
          onChange={() => {}}
          variant="ghost"
        />

        <div className="flex flex-col gap-3 w-80">
          <Input label="Small" placeholder="Small size" size="sm" />
          <Input label="Medium" placeholder="Medium size" size="md" />
          <Input label="Large" placeholder="Large size" size="lg" />
        </div>
      </div>

      {/* -------- DataTable Showcase -------- */}
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">📊 DataTable Demo</h2>
        <Table<User>
          data={data}
          columns={columns}
          selectable
          selectionMode="multiple"
          onRowSelect={(rows) => console.log("selected:", rows)}
          aria-label="Users table"
        />
      </div>
    </div>
  );
}

export default App;
