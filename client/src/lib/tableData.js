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

  return {
    tableArr,
    addTable,
  };
}
