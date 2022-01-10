import { Group } from "react-konva";

import Table from "./Table";

const TableGroupRow = ({ coord, columns, rowIndex, tableSize }) => {
  const tableColumns = new Array(columns);
  return (
    <Group>
      {[...tableColumns].map((row, index) => (
        <Table
          key={index}
          rowIndex={rowIndex}
          columnIndex={index}
          coord={coord}
          tableSize={tableSize}
        />
      ))}
    </Group>
  );
};

export default TableGroupRow;
