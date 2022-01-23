import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";

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
  const [tableMap, setTableMap] = useState({});
  const [tableSize, setTableSize] = useState(50);
  const totalTables = useRef(0);

  const validateTable = (tableInfo) => {
    const { rows, columns } = tableInfo;
    if (rows > 2 && columns > 2) {
      return false;
    }

    return true;
  };

  const addTable = (id, tableInfo) => {
    if (!validateTable(tableInfo)) {
      return "Not a valid table.";
    }

    setTableMap({ ...tableMap, [id]: tableInfo });
    totalTables.current += tableInfo.rows * tableInfo.columns;
    console.log(totalTables);
  };

  const changeTableSize = (size) => {
    if (!size.length || parseInt(size) < 50) {
      setTableSize(50);
    } else {
      setTableSize(parseInt(size));
    }
  };

  const setTables = (tables) => {
    setTableMap(tables);
  };

  return {
    tableMap,
    tableSize,
    totalTables: totalTables.current,
    changeTableSize,
    addTable,
    setTables,
  };
}
