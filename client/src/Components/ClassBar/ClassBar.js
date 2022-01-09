import React, { useState } from "react";

// import icons from material-ui
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

// import components
import StudentList from "./Components/StudentList/StudentList";
import StudentForm from "./Components/StudentForm/StudentForm";
import StudentFileForm from "./Components/StudentFileForm/StudentFileForm";

import "./style.css";

const ClassBar = ({ studentMap, setStudentMap }) => {
  // initialize state variables

  return (
    <section className='class-bar'>
      <StudentForm studentMap={studentMap} setStudentMap={setStudentMap} />
      <StudentFileForm setStudentMap={setStudentMap} />
      <StudentList studentMap={studentMap} />
    </section>
  );
};

const StudentItemMoreOptions = () => {
  return (
    <ul className='student-more-options'>
      <li className='student-options-item'>
        <EditIcon />
        <p>Edit</p>
      </li>
      <li className='student-options-item'>
        <DeleteForeverIcon />
        <p>Delete</p>
      </li>
    </ul>
  );
};

export default ClassBar;
