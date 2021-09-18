import React, { useState, useEffect } from 'react';

// import icons from material-ui
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import CheckIcon from '@material-ui/icons/Check';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import './style.css';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

const ClassBar = () => {
    // initialize state variables
    const [studentList, setStudentList] = useState({});
    const [student, setStudent] = useState({ first_name: '', last_name: '', front: null, preferredPartners: [], notPreferredPartners: [] });
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
        // setStudent({});
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
            <ol className="student-list">
                {
                    Object.keys(studentList).map((student, index) => {
                        const { first_name } = studentList[student]
                        return (
                            <li key={index} student="student-item">
                                {first_name}
                            </li>
                        );
                    })
                }
            </ol>
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
    // const [preferredPartner, setPreferredPartner] = useState('');
    // const [notPreferredPartner, setNotPreferredPartner] = useState('');
    const [studentPartnerResults, setStudentPartnerResults] = useState({});

    useEffect(() => {
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
                <PartnerSearch isPreferredStudents={true} studentPartnerResults={studentPartnerResults} setStudentPartnerResults={setStudentPartnerResults} partnerList={preferredPartnerList} setPartnerList={setPreferredPartnerList} />
                <ul className="partner-preferred-list">
                    {
                        preferredPartnerList.map((partner, index) => {
                            return (
                                <li  key={index} className="partner-item">
                                    <p>{partner}</p>
                                    <button type="button"><DeleteForeverIcon fontSize={'inherit'}/></button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
            {/* not preferred partner ui - add, see list , delete */}
            <div className="not-preferred"> 
                <PartnerSearch isPreferredStudents={false} studentPartnerResults={studentPartnerResults} setStudentPartnerResults={setStudentPartnerResults} partnerList={notPreferredPartnerList} setPartnerList={setNotPreferredPartnerList} />
                <ul className="partner-not-preferred-list">
                    {
                        notPreferredPartnerList.map((partner, index) => {
                            return (
                                <li key={index} className="partner-item">
                                    <p>{partner}</p>
                                    <button type="button"><DeleteForeverIcon fontSize={'inherit'}/></button>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        </div>
    ); 
}

const PartnerSearch = ({ studentPartnerResults, setStudentPartnerResults, isPreferredStudents, partnerList, setPartnerList }) => {
    const [displayResult, setDisplayResults] = useState(false);
    const maxPartners = 2;

    // const handleFilter = (e) => {
    //     const word = e.target.value;
    //     setSearchWord(word);
    //     const filteredList = studentList.filter(student => student.name.toLowerCase().includes(word.toLowerCase()));

    //     if (searchWord === '') {
    //         setFilteredStudents([]);
    //     }
    //     else {
    //         setFilteredStudents(filteredList);
    //     }
    // }

    // console.log(studentPartnerResults, 'jh');

    const handleAddPartner = () => {
        
    }

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
                                const { name, checked } = studentPartnerResults[id];
                                return (
                                    <div key={index} className="partner-search-item" style={checked ? { opacity: 0.6 } : { opacity: 1 }}>
                                        <p>{id} - {name}</p>
                                        <button
                                            type="button"
                                            disabled={checked}
                                            onClick={() => {
                                                setPartnerList({...partnerList })
                                                setStudentPartnerResults({...studentPartnerResults, [id]: { name: name, checked: true }})}
                                            }
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

export default ClassBar