import { useState, useRef } from "react";
import { Rect, Group } from "react-konva";

import TableGroupRow from "./TableGroupRow";

const TableGroup = ({ tableInfo, tableSize }) => {
  const [selected, setSelected] = useState(false);
  const [coord, setCoord] = useState({ x: 20, y: 50 });

  const changeTableCoord = (e) => {
    setCoord({ x: e.target.x(), y: e.target.y() });
  };
  console.log(selected);
  const tableRows = new Array(tableInfo.rows);

  return (
    <Group>
      {[...tableRows].map((row, index) => (
        <TableGroupRow
          key={index}
          coord={coord}
          rowIndex={index}
          columns={tableInfo.columns}
          tableSize={tableSize}
        />
      ))}
      <Rect
        x={coord.x}
        y={coord.y}
        stroke={selected ? "blue" : "red"}
        width={tableInfo.columns * tableSize}
        height={tableInfo.rows * tableSize}
        fill='transparent'
        draggable
        onDragMove={changeTableCoord}
        onClick={() => setSelected(true)}
      />
    </Group>
  );
};

export default TableGroup;
