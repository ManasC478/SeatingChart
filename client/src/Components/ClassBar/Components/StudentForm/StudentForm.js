import React, { useState, useContext } from 'react';

// import components
import RequiredForm from './Components/RequiredForm';
import LocationForm from './Components/LocationForm';
import PartnerForm from './Components/PartnerForm';
import { NotificationsContext } from '../../../../ContextProviders';

// import css file
import './style.css';

const StudentForm = ({ studentMap, setStudentMap }) => {
    const { setNotifications } = useContext(NotificationsContext);
    const [student, setStudent] = useState({ first_name: '', last_name: '', front: null, preferredPartners: [], notPreferredPartners: [] });
    const [openOptions, setOpenOptions] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // get last student id
        let studentId = parseInt(Object.keys(studentMap)[Object.keys(studentMap).length-1]);
        
        // check if id is there. if so then add 1 to id, otherwise equal to 1 as first student of class
        if (isNaN(studentId)) {
            studentId = 1;
        }
        else {
            studentId = studentId + 1;
        }

        setStudentMap({ ...studentMap, [studentId]: student });
        setStudent({ first_name: '', last_name: '', front: null, preferredPartners: [], notPreferredPartners: [] });
        setNotifications({ type: 'okay', message: 'Student added successfully' });
    }

    return (
        <section className="student-form">
            <h1>Add Students</h1>
            <form onSubmit={handleSubmit}>
                <RequiredForm student={student} setStudent={setStudent} />
                <span><button id="options-btn" type="button" onClick={() => setOpenOptions(!openOptions)}>{openOptions ? 'Close' : 'More'} Options</button></span>
                <div className="form-optional" style={openOptions ? {display: 'block'} : {display: 'none'}}>
                    <LocationForm student={student} setStudent={setStudent} />
                    <PartnerForm studentMap={studentMap} student={student} setStudent={setStudent} />
                </div>
            </form>
        </section>
    )
}

export default StudentForm
