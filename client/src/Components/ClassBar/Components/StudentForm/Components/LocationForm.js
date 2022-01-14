import React from "react";
import { useStudents } from "../../../../../lib/studentsData";

// import css file
import "./style.css";

const LocationForm = () => {
  const { student, updateVPosition, clearVPosition } = useStudents();
  return (
    <div className='form-seat-location'>
      <h3>Location Preference</h3>
      <div className='seat-location-option'>
        <input
          type='radio'
          name='front'
          id='front'
          value='front'
          checked={student.vPosition === "front"}
          onChange={(e) => updateVPosition("front")}
        />
        <label htmlFor='front'>Front of class</label>
      </div>
      <div className='seat-location-option'>
        <input
          type='radio'
          name='middle'
          id='middle'
          value='middle'
          checked={student.vPosition === "middle"}
          onChange={(e) => updateVPosition("middle")}
        />
        <label htmlFor='middle'>Middle of class</label>
      </div>
      <div className='seat-location-option'>
        <input
          type='radio'
          name='back'
          id='back'
          value='back'
          checked={student.vPosition === "back"}
          onChange={(e) => updateVPosition("back")}
        />
        <label htmlFor='back'>Back of class</label>
      </div>
      <button
        id='clear-location'
        type='button'
        onClick={() => clearVPosition()}
      >
        Clear
      </button>
    </div>
  );
};

export default LocationForm;
