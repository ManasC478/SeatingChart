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
  // const [student, setStudent] = useState({
  //   first_name: "",
  //   last_name: "",
  //   vPosition: null,
  //   hPosition: null,
  //   preferredPartners: [],
  //   notPreferredPartners: [],
  // });

  const addStudent = (id, student) => {
    setStudentMap({ ...studentMap, [id]: student });
    // setStudent({
    //   first_name: "",
    //   last_name: "",
    //   vPosition: null,
    //   hPosition: null,
    //   preferredPartners: [],
    //   notPreferredPartners: [],
    // });
  };

  const addStudentWithCSV = (map) => {
    setStudentMap(map);
  };

  // const updateFirstName = (name) => {
  //   setStudent({ ...student, first_name: name });
  // };

  // const updateLastName = (name) => {
  //   setStudent({ ...student, last_name: name });
  // };

  // const updateVPosition = (position) => {
  //   setStudent({ ...student, vPosition: position });
  // };

  // const clearVPosition = () => {
  //   setStudent({ ...student, vPosition: null });
  // };

  // const updateHPosition = (position) => {
  //   setStudent({ ...student, hPosition: position });
  // };

  // const clearHPosition = () => {
  //   setStudent({ ...student, hPosition: null });
  // };

  // const updatePreferredPartners = (id) => {
  //   setStudent({
  //     ...student,
  //     preferredPartners: [...student.preferredPartners, id],
  //   });
  // };

  // const updateNotPreferredPartners = (id) => {
  //   setStudent({
  //     ...student,
  //     notPreferredPartners: [...student.notPreferredPartners, id],
  //   });
  // };

  const updateStudent = (id, data) => {
    setStudentMap({ ...studentMap, [id]: data });
  };

  // handle delete where all the student's id in other students preferences become
  // const deleteStudent = (id, data) => {
  //   setStudentMap({ ...studentMap, [id]: data });
  // };

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
  };
  // return {
  //   studentMap,
  //   student,
  //   addStudent,
  //   addStudentWithCSV,
  //   updateFirstName,
  //   updateLastName,
  //   updateVPosition,
  //   clearHPosition,
  //   clearVPosition,
  //   updateHPosition,
  //   updatePreferredPartners,
  //   updateNotPreferredPartners,
  //   updateStudent,
  //   getStudentName,
  // };
}
