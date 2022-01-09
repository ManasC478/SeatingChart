import { useState } from "react";
import { Rect, Group } from "react-konva";

import TableGroupRow from "./TableGroupRow";

const TableGroup = ({ tableInfo }) => {
  const [coord, setCoord] = useState({ x: 20, y: 50 });
  const changeTableCoord = (e) => {
    setCoord({ x: e.target.x(), y: e.target.y() });
  };

  const tableRows = new Array(tableInfo.rows);

  return (
    <Group>
      {[...tableRows].map((row, index) => (
        <TableGroupRow
          key={index}
          coord={coord}
          rowIndex={index}
          columns={tableInfo.columns}
        />
      ))}
      <Rect
        x={coord.x}
        y={coord.y}
        width={tableInfo.rows * 50}
        height={tableInfo.columns * 50}
        fill='transparent'
        draggable
        onDragMove={changeTableCoord}
      />
    </Group>
  );
};

export default TableGroup;
