import React from "react";

import TableUnit from "./TableUnit";
import "./style.css";

const GridCanvasBar = ({
  gridRows,
  setGridRows,
  gridColumns,
  setGridColumns,
}) => {
  // const [gridRows, setGridRows] = useState(0);
  // const [gridColumns, setGridColumns] = useState(0);

  return (
    <section className='grid-bar'>
      <div className='insert-table'>
        <form>
          <label htmlFor='table-rows'>
            <input
              type='number'
              min='5'
              max='15'
              value={gridRows}
              onChange={(e) => setGridRows(parseInt(e.target.value))}
            />{" "}
            Grid Rows
          </label>
          <label htmlFor='table-columns'>
            <input
              type='number'
              min='5'
              max='15'
              value={gridColumns}
              onChange={(e) => setGridColumns(parseInt(e.target.value))}
            />{" "}
            Grid Columns
          </label>
        </form>
      </div>
      <div className='grid-bar-divider'></div>
      <TableUnit />
      {/* <div className="table-unit-container">
            </div> */}
    </section>
  );
};

export default GridCanvasBar;
