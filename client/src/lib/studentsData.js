import React, { useState, useEffect, useContext, createContext } from "react";

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
  const [studentMap, setStudentMap] = useState({});
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    vPosition: null,
    hPosition: null,
    preferredPartners: [],
    notPreferredPartners: [],
  });

  const validateTable = (tableInfo) => {
    const { rows, columns } = tableInfo;
    if (rows > 2 && columns > 2) {
      return false;
    }

    return true;
  };

  const addStudent = (id) => {
    setStudentMap({ ...studentMap, [id]: student });
    setStudent({
      first_name: "",
      last_name: "",
      vPosition: null,
      hPosition: null,
      preferredPartners: [],
      notPreferredPartners: [],
    });
  };

  const updateFirstName = (name) => {
    setStudent({ ...student, first_name: name });
  };

  const updateLastName = (name) => {
    setStudent({ ...student, last_name: name });
  };

  const updateVPosition = (position) => {
    setStudent({ ...student, vPosition: position });
  };

  const clearVPosition = () => {
    setStudent({ ...student, vPosition: null });
  };

  const updateHPosition = (position) => {
    setStudent({ ...student, hPosition: position });
  };

  const clearHPosition = () => {
    setStudent({ ...student, hPosition: null });
  };

  const updatePreferredPartners = (id) => {
    setStudent({
      ...student,
      preferredPartners: [...student.preferredPartners, student],
    });
  };

  const updateNotPreferredPartners = (id) => {
    setStudent({
      ...student,
      notPreferredPartners: [...student.notPreferredPartners, id],
    });
  };

  return {
    studentMap,
    student,
    addStudent,
    updateFirstName,
    updateLastName,
    updateVPosition,
    clearHPosition,
    clearVPosition,
    updateHPosition,
    updatePreferredPartners,
    updateNotPreferredPartners,
  };
}
