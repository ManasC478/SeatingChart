import React, { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import { useTables } from "../../../lib/tableData";
import { useStudents } from "../../../lib/studentsData";
import { CanvasStudentsContext } from "../../../ContextProviders";

import TableGroup from "./components/TableGroup";

const DynamicCanvas = () => {
  const { tableMap, tableSize } = useTables();
  const { studentMap } = useStudents();
  const [selectedId, selectShape] = useState(null);

  // const checkDeselect = (e) => {
  //   // deselect when clicked on empty area
  //   const clickedOnEmpty = e.target === e.target.getStage();
  //   console.log(clickedOnEmpty);
  //   if (clickedOnEmpty) {
  //     selectShape(null);
  //   }
  // };

  const checkPosition = (third, position) => {
    if (position < third) {
      return 1;
    } else if (position > 2 * third) {
      return 3;
    } else {
      return 2;
    }
  };

  const getCanvasWidth = () => {
    const canvasContainer = document.querySelector("#canvas-container");
    console.log(parseInt(canvasContainer?.offsetWidth));
    return parseInt(canvasContainer?.offsetWidth);
  };

  return (
    <Stage
      width={getCanvasWidth()}
      height={600}
      style={{
        borderRadius: "5px",
      }}
      // onMouseDown={checkDeselect}
      // onTouchStart={checkDeselect}
    >
      <Layer>
        <CanvasStudentsContext.Provider value={studentMap}>
          {Object.keys(tableMap).map((id) => (
            <TableGroup
              key={id}
              tableSize={tableSize}
              tableInfo={tableMap[id]}
              isSelected={id === selectedId}
              // onSelect={() => {
              //   console.log("selected");
              //   selectShape(id);
              // }}
              onPositionChange={({ x, y }) => {
                const tableInfo = tableMap[id];
                const vThird = checkPosition(200, y + tableSize / 2);
                const hThird = checkPosition(200, x + tableSize / 2);

                tableInfo.vPosition =
                  vThird === 1 ? "front" : vThird === 2 ? "middle" : "back";
                tableInfo.hPosition =
                  hThird === 1 ? "left" : hThird === 2 ? "middle" : "right";

                // console.log(tableInfo);
              }}
            />
          ))}
        </CanvasStudentsContext.Provider>
      </Layer>
    </Stage>
  );
};

export default DynamicCanvas;
