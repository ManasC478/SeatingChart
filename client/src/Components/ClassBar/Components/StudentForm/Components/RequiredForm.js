import React from "react";
import { useStudents } from "../../../../../lib/studentsData";

// import css file
import "./style.css";

const RequiredForm = () => {
  const { student, updateFirstName, updateLastName } = useStudents();
  return (
    <div className='form-required'>
      <input
        type='text'
        value={student.first_name}
        onChange={(e) => updateFirstName(e.target.value)}
        placeholder='First Name'
        required
      />
      <input
        type='text'
        value={student.last_name}
        onChange={(e) => updateLastName(e.target.value)}
        placeholder='Last Name'
        required
      />
      <button id='add-student' type='submit'>
        Add Student
      </button>
    </div>
  );
};

export default RequiredForm;
