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
  const [tableMap, setTableMap] = useState(getCachedTables());
  const [tableSize, setTableSize] = useState(getCachedTableSize());
  const studentsAdded = useRef(getCachedStudentsAdded(false));
  const totalTables = useRef(getCachedTotalTables(0));

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

    setTableMap(updateTableCache({ ...tableMap, [id]: tableInfo }));
    totalTables.current += updateTotalTablesCache(
      tableInfo.rows * tableInfo.columns
    );
  };

  const changeTableSize = (size) => {
    if (!size.length || parseInt(size) < 50) {
      setTableSize(updateTableSizeCache(50));
    } else {
      setTableSize(updateTableSizeCache(parseInt(size)));
    }
  };

  const setTables = (tables) => {
    setTableMap(updateTableCache(tables));
    studentsAdded.current = updateStudentsAddedCache(true);
  };

  const clearTableStudents = () => {
    if (!studentsAdded) {
      return;
    }

    const clearedTableMap = {};

    Object.keys(tableMap).forEach((tableId) => {
      clearedTableMap[tableId] = { ...tableMap[tableId], students: [] };
    });

    setTableMap(updateTableCache(clearedTableMap));
    studentsAdded.current = updateStudentsAddedCache(false);
  };

  const clearTables = () => {
    setTableMap(updateTableCache({}));
    studentsAdded.current = updateStudentsAddedCache(false);
  };

  const setTablePosition = (id, tableInfo) => {
    setTableMap(updateTableCache({ ...tableMap, [id]: tableInfo }));
  };

  return {
    tableMap,
    tableSize,
    totalTables: totalTables.current,
    changeTableSize,
    addTable,
    setTables,
    clearTableStudents,
    clearTables,
    setTablePosition,
  };
}

const updateTableCache = (tables) => {
  window.localStorage.setItem(
    "seating-chart-generator-tables",
    JSON.stringify(tables)
  );
  return getCachedTables();
};

const getCachedTables = () => {
  const res =
    JSON.parse(window.localStorage.getItem("seating-chart-generator-tables")) ||
    {};
  return res;
};

const updateTableSizeCache = (size) => {
  window.localStorage.setItem(
    "seating-chart-generator-tables-size",
    JSON.stringify(size)
  );
  return getCachedTableSize();
};

const getCachedTableSize = () => {
  const res =
    JSON.parse(
      window.localStorage.getItem("seating-chart-generator-tables-size")
    ) || 50;
  return res;
};

const updateStudentsAddedCache = (added) => {
  window.localStorage.setItem(
    "seating-chart-generator-students-added",
    JSON.stringify(added)
  );
  return getCachedStudentsAdded();
};

const getCachedStudentsAdded = () => {
  const res =
    JSON.parse(
      window.localStorage.getItem("seating-chart-generator-students-added")
    ) || false;
  return res;
};

const updateTotalTablesCache = (added) => {
  window.localStorage.setItem(
    "seating-chart-generator-total-tables",
    JSON.stringify(added)
  );
  return getCachedTotalTables();
};

const getCachedTotalTables = () => {
  const res =
    JSON.parse(
      window.localStorage.getItem("seating-chart-generator-total-tables")
    ) || false;
  return res;
};
