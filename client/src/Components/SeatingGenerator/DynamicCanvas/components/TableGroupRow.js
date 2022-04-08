import { Group } from "react-konva";

import Table from "./Table";

const TableGroupRow = ({ coord, columns, rowIndex, tableSize, students }) => {
  const tableColumns = new Array(columns);

  const tables = [];
  for (let i = 0; i < tableColumns.length; i++) {
    tables.push(
      <Table
        key={i}
        rowIndex={rowIndex}
        columnIndex={i}
        coord={coord}
        tableSize={tableSize}
        studentId={students[i] || null}
      />
    );
  }
  return <Group>{tables}</Group>;
};

export default TableGroupRow;
