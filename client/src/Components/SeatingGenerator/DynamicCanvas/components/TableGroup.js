import { useState, useRef, useEffect } from "react";
import { Rect, Group } from "react-konva";

import TableGroupRow from "./TableGroupRow";
import TableMenu from "./TableMenu";

const TableGroup = ({
  tableInfo,
  tableSize,
  isSelected,
  onSelect,
  onPositionChange,
}) => {
  const [coord, setCoord] = useState({ x: 20, y: 50 });
  const [showTableMenu, setShowTableMenu] = useState(false);
  const shapeRef = useRef();
  const tableRows = new Array(tableInfo.rows);

  const changeTableCoord = (e) => {
    setCoord({ x: e.target.x(), y: e.target.y() });
  };

  useEffect(() => {
    console.log("isselected", isSelected);
    if (isSelected) {
      shapeRef.current.attrs.stroke = "blue";
    } else {
      console.log("not selected");
      console.log(shapeRef);
      shapeRef.current.attrs.stroke = "none";
    }
  }, [isSelected]);

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
      {/* <TableMenu /> */}
      <Rect
        ref={shapeRef}
        x={coord.x}
        y={coord.y}
        width={tableInfo.columns * tableSize}
        height={tableInfo.rows * tableSize}
        fill='transparent'
        stroke='none'
        draggable
        onDragMove={changeTableCoord}
        onDragEnd={() => onPositionChange(coord)}
        onClick={onSelect}
        onTap={onSelect}
      />
    </Group>
  );
};

export default TableGroup;
