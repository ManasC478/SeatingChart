import React, { useState } from "react";

import GridCanvasBar from "./GridCanvasBar/GridCanvasBar";
import GridUnit from "./Components/GridUnit";

import "./style.css";

const GridCanvas = () => {
  const [gridTables, setGridTables] = useState({});
  const [gridTable, setGridTable] = useState({});
  const [gridRows, setGridRows] = useState(5);
  const [gridColumns, setGridColumns] = useState(5);

  let gridArr = Array(gridRows * gridColumns);
  if (!gridRows || !gridColumns) {
    gridArr = [];
  } else {
  }
  console.log(gridArr);

  return (
    <>
      <GridCanvasBar
        gridRows={gridRows}
        setGridRows={setGridRows}
        gridColumns={gridColumns}
        setGridColumns={setGridColumns}
      />
      <div
        className='generator-ui'
        style={{
          display: "grid",
          gridTemplateRows: "1fr ".repeat(gridRows),
          gridTemplateColumns: "1fr ".repeat(gridColumns),
        }}
      >
        {[...gridArr].map((unit, index) => {
          return <GridUnit key={index} />;
        })}
      </div>
    </>
  );
};

export default GridCanvas;
