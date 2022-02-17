import { useState, useRef, useEffect } from "react";
import { Rect, Group } from "react-konva";
import { useStudents } from "../../../../lib/studentsData";
import { useTables } from "../../../../lib/tableData";
import { randomFunc } from "../../../../utils";

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
  // const [showTableMenu, setShowTableMenu] = useState(false);
  // const shapeRef = useRef();
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

  // useEffect(() => {
  //   // console.log("isselected", isSelected);
  //   if (isSelected) {
  //     shapeRef.current.attrs.stroke = "blue";
  //   } else {
  //     // console.log("not selected");
  //     // console.log(shapeRef);
  //     shapeRef.current.attrs.stroke = "none";
  //   }
  // }, [isSelected]);

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
        // ref={shapeRef}
        x={coord.x}
        y={coord.y}
        width={tableInfo.columns * tableSize}
        height={tableInfo.rows * tableSize}
        fill='transparent'
        draggable
        onDragMove={changeTableCoord}
        onDragEnd={() => onPositionChange(coord)}
        // onClick={onSelect}
        // onTap={onSelect}
      />
    </Group>
  );
};

export default TableGroup;
