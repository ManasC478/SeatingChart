import React, { useState, useEffect } from "react";
import { Stage, Layer } from "react-konva";
import { useTables } from "../../../lib/tableData";
import { useStudents } from "../../../lib/studentsData";
import { CanvasStudentsContext } from "../../../ContextProviders";

import TableGroup from "./components/TableGroup";

const DynamicCanvas = () => {
  const { tableMap, tableSize, setTablePosition } = useTables();
  const { studentMap } = useStudents();

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
    return parseInt(canvasContainer?.offsetWidth);
  };

  return (
    <Stage
      width={getCanvasWidth()}
      height={600}
      style={{
        borderRadius: "5px",
      }}
    >
      <Layer>
        <CanvasStudentsContext.Provider value={studentMap}>
          {Object.keys(tableMap).map((id) => (
            <TableGroup
              key={id}
              tableSize={tableSize}
              tableInfo={tableMap[id]}
              onPositionChange={(info) => {
                const vThird = checkPosition(
                  200,
                  info.position.y + tableSize / 2
                );
                const hThird = checkPosition(
                  getCanvasWidth() / 3,
                  info.position.x + tableSize / 2
                );

                info.vPosition =
                  vThird === 1 ? "front" : vThird === 2 ? "middle" : "back";
                info.hPosition =
                  hThird === 1 ? "left" : hThird === 2 ? "middle" : "right";

                setTablePosition(id, info);
              }}
            />
          ))}
        </CanvasStudentsContext.Provider>
      </Layer>
    </Stage>
  );
};

export default DynamicCanvas;
