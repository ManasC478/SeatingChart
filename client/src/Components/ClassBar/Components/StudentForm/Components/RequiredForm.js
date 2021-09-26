import React from 'react';

// import css file
import './style.css';

const RequiredForm = ({ student, setStudent }) => {
    return (
        <div className="form-required">
            <input type="text" value={student.first_name} onChange={(e) => setStudent({ ...student, first_name: e.target.value })} placeholder="First Name" required />
            <input type="text" value={student.last_name} onChange={(e) => setStudent({ ...student, last_name: e.target.value })} placeholder="Last Name" required />
            <button id="add-student" type="submit">Add Student</button>
        </div>
    )
}

export default RequiredForm
