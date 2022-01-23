import React, { useState, useContext } from "react";
import uuid from "react-uuid";
import { useTables } from "../../../../lib/tableData";
import { useToast } from "@chakra-ui/react";
// import { NotificationsContext } from "../../../../ContextProviders";

// import material ui icons
import { AddIcon } from "../../../../styles/icons";

// import css file
import "./style.css";

const DynamicCanvasBar = () => {
  const toast = useToast();
  const { addTable, tableSize, changeTableSize } = useTables();
  // const { setNotifications } = useContext(NotificationsContext);

  const [tableRows, setTableRows] = useState(1);
  const [tableColumns, setTableColumns] = useState(1);
  const [size, setSize] = useState("50");

  const onAddTable = () => {
    const error = addTable(uuid(), {
      rows: tableRows,
      columns: tableColumns,
      vPosition: "front",
      hPosition: "left",
      students: [],
    });

    if (error) {
      // setNotifications({ type: "danger", message: error });
      toast({
        description: error,
        status: "error",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
    } else {
      // setNotifications({ type: "okay", message: "Table added" });
      toast({
        description: "Table added.",
        status: "success",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <section className='dynamic-bar'>
      <div className='insert-table'>
        <form>
          <label htmlFor='table-rows'>
            <input
              type='number'
              min='1'
              max='10'
              value={tableRows}
              onChange={(e) => setTableRows(parseInt(e.target.value) || "")}
            />{" "}
            Rows
          </label>
          <label htmlFor='table-columns'>
            <input
              type='number'
              min='1'
              max='10'
              value={tableColumns}
              onChange={(e) => setTableColumns(parseInt(e.target.value) || "")}
            />{" "}
            Columns
          </label>
          <label htmlFor='size'>
            Size{" "}
            <input
              type='number'
              name='size'
              id='size'
              min='50'
              max='100'
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                changeTableSize(e.target.value);
              }}
            />
          </label>
        </form>
      </div>
      <div className='dynamic-bar-divider'></div>
      <TablePreview tableRows={tableRows} tableColumns={tableColumns} />
      <button id='add-table' onClick={onAddTable}>
        <AddIcon />
      </button>
    </section>
  );
};

const TablePreview = ({ tableRows, tableColumns }) => {
  let tableArr;
  if (!tableRows || !tableColumns) {
    tableArr = [];
  } else {
    tableArr = Array(tableRows * tableColumns);
  }

  return (
    <div className='table-preview'>
      <h2>Table Preview</h2>
      <div
        className='table-display'
        style={{
          display: "grid",
          gridTemplateRows: "1fr ".repeat(tableRows),
          gridTemplateColumns: "1fr ".repeat(tableColumns),
        }}
      >
        {[...tableArr].map((cell, index) => {
          return <span key={index}></span>;
        })}
      </div>
      <p style={{ display: tableArr.length ? "block" : "none" }}>
        {tableRows} x {tableColumns}
      </p>
    </div>
  );
};

export default DynamicCanvasBar;
