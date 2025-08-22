import React, { useMemo, useState, useEffect } from "react";
import { CheckSquare, Square, ChevronUp, ChevronDown } from "lucide-react";
import clsx from "clsx";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode; 
}

export interface DataTableProps<T extends { id?: string | number }> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
 
  selectionMode?: "single" | "multiple";
  onRowSelect?: (selectedRows: T[]) => void;
  emptyMessage?: string;
 
  "aria-label"?: string;
 
  className?: string;
}

type SortState<T> = {
  columnKey?: string;
  dataIndex?: keyof T;
  direction: "asc" | "desc";
} | null;

function getValue<T>(row: T, key: keyof T) {

  return row[key];
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  selectionMode = "multiple",
  onRowSelect,
  emptyMessage = "No records found",
  className,
  ...aria
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState<T>>(null);
  const [selectedKeys, setSelectedKeys] = useState<Array<string | number>>([]);


  const rowKey = (row: T, idx: number) =>
    (row.id as string | number | undefined) ?? idx;

  const sortedData = useMemo(() => {
    if (!sort) return data;
    const { dataIndex, direction } = sort;
    const copy = [...data];
    copy.sort((a, b) => {
      const va = getValue(a, dataIndex!);
      const vb = getValue(b, dataIndex!);
      
      const na = va instanceof Date ? va.getTime() : va;
      const nb = vb instanceof Date ? vb.getTime() : vb;
      if (na < nb) return direction === "asc" ? -1 : 1;
      if (na > nb) return direction === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [data, sort]);

  const allSelected =
    selectable &&
    selectionMode === "multiple" &&
    sortedData.length > 0 &&
    selectedKeys.length === sortedData.length;

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    setSort((prev) => {
      if (!prev || prev.columnKey !== col.key) {
        return { columnKey: col.key, dataIndex: col.dataIndex, direction: "asc" };
      }
      // toggle asc -> desc -> off
      if (prev.direction === "asc")
        return { ...prev, direction: "desc" };
      return null;
    });
  };

  const toggleAll = () => {
    if (selectionMode !== "multiple") return;
    if (allSelected) {
      setSelectedKeys([]);
    } else {
      setSelectedKeys(sortedData.map((r, i) => rowKey(r, i)));
    }
  };

  const toggleOne = (key: string | number) => {
    if (!selectable) return;
    if (selectionMode === "single") {
      setSelectedKeys((prev) => (prev.includes(key) ? [] : [key]));
      return;
    }
    
    setSelectedKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  useEffect(() => {
    if (!onRowSelect) return;
    const selectedRows = sortedData.filter((r, i) =>
      selectedKeys.includes(rowKey(r, i))
    );
    onRowSelect(selectedRows);
    
  }, [selectedKeys, sortedData]);

  return (
    <div className={clsx("w-full", className)}>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table
          className="min-w-full text-left text-sm"
          role="table"
          aria-rowcount={sortedData.length}
          {...aria}
        >
          <thead className="bg-gray-50" role="rowgroup">
            <tr role="row">
              {selectable && (
                <th scope="col" className="w-12 px-3 py-3">
                  {selectionMode === "multiple" ? (
                    <button
                      aria-label={allSelected ? "Deselect all rows" : "Select all rows"}
                      className="p-1 rounded hover:bg-gray-100"
                      onClick={toggleAll}
                    >
                      {allSelected ? <CheckSquare size={18} /> : <Square size={18} />}
                    </button>
                  ) : (
                    <span className="sr-only">Row selection</span>
                  )}
                </th>
              )}
              {columns.map((col) => {
                const isSorted = sort?.columnKey === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={clsx(
                      "px-4 py-3 font-semibold text-gray-700 whitespace-nowrap",
                      col.sortable && "cursor-pointer select-none"
                    )}
                    onClick={() => toggleSort(col)}
                    aria-sort={
                      col.sortable
                        ? isSorted
                          ? sort!.direction === "asc"
                            ? "ascending"
                            : "descending"
                          : "none"
                        : undefined
                    }
                  >
                    <span className="inline-flex items-center gap-1">
                      {col.title}
                      {col.sortable && (
                        <>
                          {isSorted ? (
                            sort!.direction === "asc" ? (
                              <ChevronUp className="inline" size={16} />
                            ) : (
                              <ChevronDown className="inline" size={16} />
                            )
                          ) : (
                            <span className="opacity-30">
                              <ChevronUp size={16} />
                            </span>
                          )}
                        </>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody role="rowgroup" className="divide-y divide-gray-100">
            {/* Loading */}
            {loading && (
              <tr role="row">
                <td
                  role="cell"
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  <div className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
                    Loading...
                  </div>
                </td>
              </tr>
            )}

            {/* Empty state */}
            {!loading && sortedData.length === 0 && (
              <tr role="row">
                <td
                  role="cell"
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-10 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            )}

            {/* Data rows */}
            {!loading &&
              sortedData.map((row, idx) => {
                const key = rowKey(row, idx);
                const isSelected = selectable && selectedKeys.includes(key);
                return (
                  <tr
                    key={key}
                    role="row"
                    className={clsx(
                      "hover:bg-gray-50",
                      isSelected && "bg-blue-50"
                    )}
                    aria-selected={isSelected || undefined}
                    onClick={() => selectable && toggleOne(key)}
                  >
                    {selectable && (
                      <td role="cell" className="w-12 px-3 py-3">
                        <button
                          aria-label={isSelected ? "Deselect row" : "Select row"}
                          className="p-1 rounded hover:bg-gray-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleOne(key);
                          }}
                        >
                          {isSelected ? (
                            <CheckSquare size={18} />
                          ) : (
                            <Square size={18} />
                          )}
                        </button>
                      </td>
                    )}
                    {columns.map((col) => {
                      const value = getValue(row, col.dataIndex);
                      return (
                        <td
                          key={col.key}
                          role="cell"
                          className="px-4 py-3 text-gray-700 whitespace-nowrap"
                        >
                          {col.render ? col.render(value, row) : String(value)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
