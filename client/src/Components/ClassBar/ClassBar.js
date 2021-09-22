import React, { useState, useEffect } from 'react';

// import icons from material-ui
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CheckIcon from '@material-ui/icons/Check';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import './style.css';

const ClassBar = () => {
    // initialize state variables
    const [studentList, setStudentList] = useState({});
    const [student, setStudent] = useState({ first_name: '', last_name: '', front: null, preferredPartners: {}, notPreferredPartners: {} });
    const [openOptions, setOpenOptions] = useState(false);

    // check for valid student entry
    // const checkValidStudentEntry = () => {

    // }

    // add students to the student list
    const handleSubmit = (e) => {
        e.preventDefault();

        // get last student id
        let studentId = parseInt(Object.keys(studentList)[Object.keys(studentList).length-1]);
        
        // check if id is there. if so then add 1 to id, otherwise equal to 1 as first student of class
        if (isNaN(studentId)) {
            studentId = 1;
        }
        else {
            studentId = studentId + 1;
        }

        setStudentList({ ...studentList, [studentId]: student });
        setStudent({ first_name: '', last_name: '', front: null, preferredPartners: {}, notPreferredPartners: {} });
    }

    return (
        <section className="class-bar">
            <h1>Add Students</h1>
            <form onSubmit={handleSubmit}>
                <RequiredForm student={student} setStudent={setStudent} />
                <span><button id="options-btn" type="button" onClick={() => setOpenOptions(!openOptions)}>{openOptions ? 'Close' : 'More'} Options</button></span>
                <div className="form-optional" style={openOptions ? {display: 'block'} : {display: 'none'}}>
                    <LocationForm student={student} setStudent={setStudent} />
                    <PartnerForm studentList={studentList} student={student} setStudent={setStudent} />
                </div>
            </form>
            <hr />
            <StudentList studentList={studentList} />
        </section>
    )
}

const RequiredForm = ({ student, setStudent }) => {
    return (
        <div className="form-required">
            <input type="text" value={student.first_name} onChange={(e) => setStudent({ ...student, first_name: e.target.value })} placeholder="First Name" required />
            <input type="text" value={student.last_name} onChange={(e) => setStudent({ ...student, last_name: e.target.value })} placeholder="Last Name" required />
            <button id="add-student" type="submit">Add Student</button>
        </div>
    );
}

const LocationForm = ({ student, setStudent }) => {

    return (
        <div className="form-seat-location">
            <h3>Location Preference</h3>
            <div className="seat-location-option">
                <input type="radio" name="front" id="front" value="front" checked={student.front === true} onChange={e => setStudent({ ...student, front: true })} />
                <label htmlFor="front">Front of class</label>
            </div>
            <div className="seat-location-option">
                <input type="radio" name="back" id="back" value="back" checked={student.front === false} onChange={e => setStudent({ ...student, front: false })} />
                <label htmlFor="back">Back of class</label>
            </div>
            <button id="clear-location" type="button" onClick={() => setStudent({ ...student, front: null })}>Clear</button>
        </div>
    );
}

const PartnerForm = ({ studentList, student, setStudent }) => {
    //  set state variables
    const [preferredPartnerList, setPreferredPartnerList] = useState({});
    const [notPreferredPartnerList, setNotPreferredPartnerList] = useState({});
    const [studentPartnerResults, setStudentPartnerResults] = useState({});

    useEffect(() => {
        setPreferredPartnerList({})
        setNotPreferredPartnerList({})
        
        const copyStudentList = () => {
            let tempStudentObj = {};
            Object.keys(studentList).forEach(id => {
                const { first_name, last_name } = studentList[id];
                tempStudentObj[id] = { name: `${first_name} ${last_name.slice(0, 1)}.`, selected: false };
            })
            setStudentPartnerResults(tempStudentObj);
        }

        copyStudentList();
    }, [studentList])

    return (
        <div className="form-partners">
            {/* preferred partner ui - add, see list, delete */}
            <div className="preferred">
                <PartnerSearch isPreferredStudents={true} studentPartnerResults={studentPartnerResults} setStudentPartnerResults={setStudentPartnerResults} partnerList={preferredPartnerList} setPartnerList={setPreferredPartnerList} setStudent={setStudent} student={student} studentList={studentList} />
                <ul className="partner-preferred-list">
                    {
                        Object.keys(preferredPartnerList).map((id, index) => {
                            const { name } = studentPartnerResults[id];
                            return (
                                <li key={index} className="partner-item">
                                    <p>{name}</p>
                                    <button type="button" onClick={() => {
                                        delete preferredPartnerList[id];
                                        setStudentPartnerResults({ ...studentPartnerResults, [id]: { name: name, checked: false } });
                                        delete student.preferredPartners[id];
                                    }}><ClearIcon fontSize={'inherit'}/></button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            {/* not preferred partner ui - add, see list , delete */}
            <div className="not-preferred"> 
                <PartnerSearch isPreferredStudents={false} studentPartnerResults={studentPartnerResults} setStudentPartnerResults={setStudentPartnerResults} partnerList={notPreferredPartnerList} setPartnerList={setNotPreferredPartnerList} setStudent={setStudent} student={student} studentList={studentList} />
                <ul className="partner-not-preferred-list">
                    {
                        Object.keys(notPreferredPartnerList).map((id, index) => {
                            const { name } = studentPartnerResults[id];

                            return (
                                <li key={index} className="partner-item">
                                    <p>{name}</p>
                                    <button type="button" onClick={() => {
                                        delete notPreferredPartnerList[id];
                                        setStudentPartnerResults({ ...studentPartnerResults, [id]: { name: name, checked: false } });
                                        delete student.notPreferredPartners[id];
                                    }}><ClearIcon fontSize={'inherit'}/></button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    ); 
}

const PartnerSearch = ({ studentPartnerResults, setStudentPartnerResults, isPreferredStudents, partnerList, setPartnerList, setStudent, student, studentList }) => {
    const [displayResult, setDisplayResults] = useState(false);
    const maxPartners = 2;

    return (
        <div className="partner-search">
            <div className="partner-input">
                <h3>{isPreferredStudents ? 'Preferred' : 'Not Preferred'} Students</h3>
                <button type="button" onClick={() => setDisplayResults(!displayResult)}>{displayResult ? <ArrowDropDown fontSize={'inherit'} /> : <ArrowRightIcon fontSize={'inherit'} />}</button>
            </div>
            <div className="partner-search-results" style={displayResult ? { display: 'block' } : { display: 'none' }}>
                {
                    Object.keys(studentPartnerResults).length===0 ?
                        <p>No Student Added</p>
                        :
                        (
                            Object.keys(studentPartnerResults).map((id, index) => {
                                // const resultStudent = studentList[id];
                                const { name, checked } = studentPartnerResults[id];
                                const setStd = isPreferredStudents ? { ...student, preferredPartners: { ...student.preferredPartners, [id]: studentList[id] } } : { ...student, notPreferredPartners: { ...student.notPreferredPartners, [id]: studentList[id] } };
                                return (
                                    <div key={index} className="partner-search-item" style={checked ? { opacity: 0.6 } : { opacity: 1 }}>
                                        <p>{id} - {name}</p>
                                        <button
                                            type="button"
                                            disabled={!checked ? Object.keys(partnerList).length >= maxPartners ? true : false : true}
                                            onClick={() => {
                                                setPartnerList({ ...partnerList, [id]: studentPartnerResults[id] });
                                                setStudentPartnerResults({ ...studentPartnerResults, [id]: { name: name, checked: true } });
                                                setStudent(setStd);
                                            }}
                                        >
                                            {checked ? <CheckIcon /> : <AddIcon />}
                                        </button>
                                    </div>
                                );
                            })
                        )
                }
            </div>
        </div>

    );
}

const StudentList = ({ studentList }) => {
    return (
        <section className="student-list">
            <h1>Students</h1>
            <ol>
                {
                    Object.keys(studentList).map((id, index) => {
                        const { first_name, last_name } = studentList[id]
                        return (
                            <li key={index} className="student-item">
                                <p>{first_name} {last_name}</p>
                                <button type="button" onClick={() => delete studentList[id]}><MoreVertIcon /></button>
                            </li>
                        );
                    })
                }
            </ol>
        </section>
    );
}

const StudentItemMoreOptions = () => {
    return (
        <ul className="student-more-options">
            <li className="student-options-item">
                <EditIcon />
                <p>Edit</p>
            </li>
            <li className="student-options-item">
                <DeleteForeverIcon />
                <p>Delete</p>
            </li>
        </ul>
    );
}

export default ClassBar