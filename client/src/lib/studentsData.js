import React, { useState, useEffect, useContext, createContext, useRef } from "react";
import _ from "lodash";

const studentContext = createContext();

export function StudentsProvider({ children }) {
  const students = useStudentProvider();
  return (
    <studentContext.Provider value={students}>
      {children}
    </studentContext.Provider>
  );
}

export const useStudents = () => {
  return useContext(studentContext);
};

function useStudentProvider() {
  const [studentMap, setStudentMap] = useState(getCachedStudents());
  const size = useRef(0);

  const addStudent = (id, student) => {
    size.current++;
    setStudentMap(updateStudentCache({ ...studentMap, [id]: student }));
  };

  const addStudentWithCSV = (map) => {
    setStudentMap(updateStudentCache(map));
  };

  const updateStudent = (id, data) => {
    setStudentMap(updateStudentCache({ ...studentMap, [id]: data }));
  };

  const deleteStudent = (id) => {
    delete studentMap[id];
    const updatedStudentMap = {};
    Object.keys(studentMap).forEach((studentId) => {
      const student = studentMap[studentId];
      const filteredPreferred = _.remove(
        student.preferredPartners,
        (n) => n !== parseInt(id)
      );

      const filteredNotPreferred = _.remove(
        student.notPreferredPartners,
        (n) => {
          return n !== parseInt(id);
        }
      );

      updatedStudentMap[studentId] = {
        ...student,
        preferredPartners: filteredPreferred,
        notPreferredPartners: filteredNotPreferred,
      };
    });

    setStudentMap(updateStudentCache(updatedStudentMap));
  };

  const deleteAllStudents = () => {
    setStudentMap(updateStudentCache({}));
  };

  const getStudentName = (id) => {
    return id
      ? `${studentMap[id].first_name} ${studentMap[id].last_name.charAt(0)}`
      : "";
  };

  return {
    studentMap,
    addStudent,
    addStudentWithCSV,
    updateStudent,
    getStudentName,
    deleteStudent,
    deleteAllStudents,
  };
}

const updateStudentCache = (students) => {
  window.localStorage.setItem(
    "seating-chart-generator-students",
    JSON.stringify(students)
  );
  return getCachedStudents();
};

const getCachedStudents = () => {
  const res =
    JSON.parse(
      window.localStorage.getItem("seating-chart-generator-students")
    ) || {};
  return res;
};
