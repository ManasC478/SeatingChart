import { useState, useRef, useEffect } from "react";
import { Rect, Group } from "react-konva";
import { useStudents } from "../../../../lib/studentsData";
import { useTables } from "../../../../lib/tableData";
import { randomFunc } from "../../../../utils";

import TableGroupRow from "./TableGroupRow";
import TableMenu from "./TableMenu";

const TableGroup = ({ tableInfo, tableSize, onPositionChange }) => {
  const [coord, setCoord] = useState({
    x: tableInfo.position.x,
    y: tableInfo.position.y,
  });

  const tableRows = new Array(tableInfo.rows);

  const changeTableCoord = (e) => {
    setCoord({ x: e.target.x(), y: e.target.y() });
  };

  const getStudents = (i) => {
    if (tableInfo.students.length <= 0) {
      return [];
    }
    const row = i * tableInfo.columns;
    return tableInfo.students.slice(row, row + tableInfo.columns);
  };

  return (
    <Group>
      {[...tableRows].map((row, index) => (
        <TableGroupRow
          key={index}
          coord={coord}
          rowIndex={index}
          columns={tableInfo.columns}
          tableSize={tableSize}
          students={getStudents(index)}
        />
      ))}
      {/* <TableMenu /> */}
      <Rect
        x={coord.x}
        y={coord.y}
        width={tableInfo.columns * tableSize}
        height={tableInfo.rows * tableSize}
        fill='transparent'
        draggable
        onDragMove={changeTableCoord}
        onDragEnd={() => {
          const width = parseInt(
            document.querySelector("#canvas-container")?.offsetWidth
          );
          const height = 600;
          const x =
            coord.x + tableSize * tableInfo.columns > width
              ? width - tableSize * tableInfo.columns
              : coord.x < 0
              ? 0
              : coord.x;
          const y =
            coord.y + tableSize * tableInfo.rows > height
              ? height - tableSize * tableInfo.rows
              : coord.y < 0
              ? 0
              : coord.y;
          setCoord({ x, y });
          onPositionChange({ ...tableInfo, position: { x, y } });
        }}
      />
    </Group>
  );
};

export default TableGroup;
