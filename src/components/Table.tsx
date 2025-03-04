import { ReactNode } from "react";

interface Column<T> {
  header: string;
  render: (item: T) => ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
}

export function Table<T>({ data, columns, onRowClick }: TableProps<T>) {
  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr
            key={rowIndex}
            onClick={() => onRowClick && onRowClick(item)}
            style={{ cursor: onRowClick ? "pointer" : "default" }}
          >
            {columns.map((column, colIndex) => (
              <td key={colIndex}>{column.render(item)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
