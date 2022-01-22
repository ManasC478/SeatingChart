import React, { useState, useEffect } from "react";
import { Stage, Layer, Text } from "react-konva";
import { useTables } from "../../../lib/tableData";

import TableGroup from "./components/TableGroup";

const DynamicCanvas = () => {
  const { tableMap, tableSize } = useTables();
  const [selectedId, selectShape] = useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    console.log(clickedOnEmpty);
    if (clickedOnEmpty) {
      selectShape(null);
    }
    console.log(selectedId);
  };

  const checkPosition = (third, position) => {
    if (position < third) {
      return 1;
    } else if (position > 2 * third) {
      return 3;
    } else {
      return 2;
    }
  };

  // useEffect(() => {
  //   const parentDiv = document.querySelector(".konvajs-content").parentNode;
  //   console.log(parentDiv.width);
  // }, []);

  return (
    <Stage
      width={600}
      height={600}
      onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}
    >
      <Layer>
        {Object.keys(tableMap).map((id) => (
          <TableGroup
            key={id}
            tableSize={tableSize}
            tableInfo={tableMap[id]}
            isSelected={id === selectedId}
            onSelect={() => {
              console.log("selected");
              selectShape(id);
            }}
            onPositionChange={({ x, y }) => {
              const tableInfo = tableMap[id];
              const vThird = checkPosition(200, y + tableSize / 2);
              const hThird = checkPosition(200, x + tableSize / 2);

              tableInfo.vPosition =
                vThird === 1 ? "front" : vThird === 2 ? "middle" : "back";
              tableInfo.hPosition =
                hThird === 1 ? "left" : hThird === 2 ? "middle" : "right";

              console.log(tableInfo);
            }}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default DynamicCanvas;
