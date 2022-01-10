import React, { useState, useEffect, useContext, createContext } from "react";

const tableContext = createContext();

export function TableProvider({ children }) {
  const tables = useTableProvider();
  return (
    <tableContext.Provider value={tables}>{children}</tableContext.Provider>
  );
}

export const useTables = () => {
  return useContext(tableContext);
};

function useTableProvider() {
  const [tableArr, setTableArr] = useState([]);
  const [tableSize, setTableSize] = useState(50);

  const validateTable = (tableInfo) => {
    const { rows, columns } = tableInfo;
    if (rows > 2 && columns > 2) {
      return false;
    }

    return true;
  };

  const addTable = (tableInfo) => {
    if (!validateTable(tableInfo)) {
      return "Not a valid table";
    }

    setTableArr([...tableArr, tableInfo]);
  };

  const changeTableSize = (size) => {
    if (!size.length || parseInt(size) < 50) {
      setTableSize(50);
    } else {
      setTableSize(parseInt(size));
    }
  };

  return {
    tableArr,
    tableSize,
    changeTableSize,
    addTable,
  };
}
