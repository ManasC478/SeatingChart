import { Group } from "react-konva";
import { useStudents } from "../../../../lib/studentsData";
import { useTables } from "../../../../lib/tableData";

import Table from "./Table";

const TableGroupRow = ({ coord, columns, rowIndex, tableSize, students }) => {
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
          studentId={students[index] || null}
        />
      ))}
    </Group>
  );
};

export default TableGroupRow;
