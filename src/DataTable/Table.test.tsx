import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Table, { Column } from "../DataTable/Table"

type Row = { id: number; name: string; age: number };
const columns: Column<Row>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

const rows: Row[] = [
  { id: 1, name: "Charlie", age: 30 },
  { id: 2, name: "Alice", age: 25 },
  { id: 3, name: "Bob", age: 28 },
];

describe("DataTable", () => {
  test("renders headers and rows", () => {
    render(<Table<Row> data={rows} columns={columns} aria-label="rows" />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Age")).toBeInTheDocument();
    expect(screen.getByText("Charlie")).toBeInTheDocument();
  });

  test("sorts ascending then descending on header click", () => {
    render(<Table<Row> data={rows} columns={columns} aria-label="rows" />);
    const nameHeader = screen.getByText("Name");
    fireEvent.click(nameHeader); // asc
    const cellsAsc = screen.getAllByRole("cell").map((c) => c.textContent);
    // first column, first row should be 'Alice' (A..)
    expect(cellsAsc.includes("Alice")).toBeTruthy();

    fireEvent.click(nameHeader); // desc
    const cellsDesc = screen.getAllByRole("cell").map((c) => c.textContent);
    expect(cellsDesc.includes("Charlie")).toBeTruthy();
  });

  test("selects rows (multiple)", () => {
    const spy = jest.fn();
    render(
      <Table<Row>
        data={rows}
        columns={columns}
        selectable
        onRowSelect={spy}
        aria-label="rows"
      />
    );
    const rowButtons = screen.getAllByRole("button", { name: /select row|deselect row/i });
    fireEvent.click(rowButtons[0]);
    fireEvent.click(rowButtons[1]);
    expect(spy).toHaveBeenLastCalledWith([
      rows[0],
      rows[1],
    ]);
  });

  test("shows empty state", () => {
    render(<Table<Row> data={[]} columns={columns} emptyMessage="Nothing here" />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  test("shows loading state", () => {
    render(<Table<Row> data={[]} columns={columns} loading />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
