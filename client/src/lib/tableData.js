import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useRef,
} from "react";
import _ from "lodash";

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
  const studentsAdded = useRef(getCachedStudentsAdded());
  const totalTables = useRef(updateTotalTablesCache(getTotalTables(tableMap)));
  const reassignTables = useRef(false);

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
    totalTables.current += tableInfo.rows * tableInfo.columns;
    updateTotalTablesCache(totalTables.current);
  };

  const changeTableSize = (size) => {
    if (!size.length || parseInt(size) < 50) {
      setTableSize(updateTableSizeCache(50));
    } else {
      setTableSize(updateTableSizeCache(parseInt(size)));
    }
  };

  const setTables = (tables) => {
    studentsAdded.current = updateStudentsAddedCache(true);
    reassignTables.current = false;
    setTableMap(updateTableCache(tables));
  };

  const clearTableStudents = () => {
    if (!studentsAdded) {
      return;
    }

    const clearedTableMap = {};

    Object.keys(tableMap).forEach((tableId) => {
      clearedTableMap[tableId] = { ...tableMap[tableId], students: [] };
    });

    studentsAdded.current = updateStudentsAddedCache(false);
    setTableMap(updateTableCache(clearedTableMap));
  };

  const clearTables = () => {
    studentsAdded.current = updateStudentsAddedCache(false);
    setTableMap(updateTableCache({}));
  };

  const setTablePosition = (id, tableInfo) => {
    setTableMap(updateTableCache({ ...tableMap, [id]: tableInfo }));
  };

  const setReassignTables = (val) => {
    reassignTables.current = val;
  };

  const deleteStudentFromTable = (id) => {
    const updatedTableMap = {};

    Object.keys(tableMap).forEach((tableId) => {
      const table = tableMap[tableId];
      const filteredStudents = table.students;

      const removedElementIndex = table.students.indexOf(parseInt(id) - 1);
      if (removedElementIndex !== -1) {
        filteredStudents.splice(removedElementIndex, 1, null);
      }

      updatedTableMap[tableId] = {
        ...table,
        students: filteredStudents,
      };
    });

    setTableMap(updateTableCache(updatedTableMap));
  };

  return {
    tableMap,
    tableSize,
    totalTables: totalTables.current,
    studentsAdded: studentsAdded.current,
    reassignTables: reassignTables.current,
    changeTableSize,
    addTable,
    setTables,
    clearTableStudents,
    clearTables,
    setTablePosition,
    setReassignTables,
    deleteStudentFromTable,
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

const getTotalTables = (tableMap) => {
  if (!Object.keys(tableMap).length) {
    return 0;
  }

  let numTables = 0;
  Object.values(tableMap).forEach((table) => {
    numTables += table.rows * table.columns;
  });

  return numTables;
};
