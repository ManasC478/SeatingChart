import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { dragItemTypes } from "../DragItemTypes";

import TableUnit, { getIsDragging } from "../GridCanvasBar/TableUnit";

const GridUnit = () => {
  const [occupied, setOccupied] = useState(false);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: dragItemTypes.TABLE,
    drop: () => dropTable(),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dropTable = () => {
    setOccupied(true);
  };

  return (
    <div className='grid-unit' ref={drop}>
      {occupied && <TableUnit />}
    </div>
  );
};

export default GridUnit;
