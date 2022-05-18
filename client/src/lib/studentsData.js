import React, { useState, useContext, createContext, useRef } from "react";
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
  const size = useRef(updateTotalStudentsCache(getTotalStudents(studentMap)));

  const addStudent = (id, student) => {
    size.current++;
    updateTotalStudentsCache(size.current);
    setStudentMap(updateStudentCache({ ...studentMap, [id]: student }));
  };

  const addStudentWithCSV = (map) => {
    size.current = Object.keys(map).length;
    updateTotalStudentsCache(size.current);
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
        (n) => n !== id
      );

      const filteredNotPreferred = _.remove(
        student.notPreferredPartners,
        (n) => {
          return n !== id;
        }
      );

      updatedStudentMap[studentId] = {
        ...student,
        preferredPartners: filteredPreferred,
        notPreferredPartners: filteredNotPreferred,
      };
    });

    size.current--;
    updateTotalStudentsCache(size.current);
    setStudentMap(updateStudentCache(updatedStudentMap));
  };

  const deleteAllStudents = () => {
    size.current = 0;
    updateTotalStudentsCache(size.current);
    setStudentMap(updateStudentCache({}));
  };

  const getStudentName = (id) => {
    return id
      ? `${studentMap[id].first_name} ${studentMap[id].last_name.charAt(0)}`
      : "";
  };

  return {
    size,
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

const updateTotalStudentsCache = (added) => {
  window.localStorage.setItem(
    "seating-chart-generator-total-students",
    JSON.stringify(added)
  );
  return getCachedTotalStudents();
};

const getCachedTotalStudents = () => {
  const res =
    JSON.parse(
      window.localStorage.getItem("seating-chart-generator-total-students")
    ) || false;
  return res;
};

const getTotalStudents = (studentMap) => {
  return Object.keys(studentMap).length;
};
