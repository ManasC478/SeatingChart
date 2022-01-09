import { Group } from "react-konva";

import Table from "./Table";

const TableGroupRow = ({ coord, columns, rowIndex }) => {
  const tableColumns = new Array(columns);
  return (
    <Group>
      {[...tableColumns].map((row, index) => (
        <Table
          key={index}
          rowIndex={rowIndex}
          columnIndex={index}
          coord={coord}
        />
      ))}
    </Group>
  );
};

export default TableGroupRow;
