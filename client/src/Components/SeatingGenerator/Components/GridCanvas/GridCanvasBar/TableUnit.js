import React, { useState } from "react";

import { useDrag } from "react-dnd";

import { dragItemTypes } from "../DragItemTypes";

const TableUnit = ({ width, height }) => {
  const [tableInfo, setTableInfo] = useState({ id: "", studentId: "" });

  const [{ isDragging }, drag] = useDrag(() => ({
    type: dragItemTypes.TABLE,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className='table-unit'
      style={{ border: isDragging ? "5px solid pink" : "5px solid black" }}
      ref={drag}
    ></div>
  );
};

export default TableUnit;
