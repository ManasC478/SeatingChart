import React, { useState } from "react";
import { Stage, Layer, Text } from "react-konva";
import { useTables } from "../../../lib/tableData";

import TableGroup from "./components/TableGroup";

const DynamicCanvas = () => {
  const { tableArr } = useTables();

  return (
    <>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        className='generator-ui'
      >
        <Layer>
          {tableArr.map((tableInfo, index) => (
            <TableGroup key={index} tableInfo={tableInfo} />
          ))}
        </Layer>
      </Stage>
    </>
  );
};

export default DynamicCanvas;
