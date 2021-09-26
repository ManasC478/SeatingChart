import React, { useState, useEffect, useContext } from 'react'

// import material ui icons
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ClearIcon from '@material-ui/icons/Clear';

// import components
import { NotificationsContext } from '../../../../../ContextProviders';

// import css file
import './style.css';

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
    )
}

const PartnerSearch = ({ studentPartnerResults, setStudentPartnerResults, isPreferredStudents, partnerList, setPartnerList, setStudent, student, studentList }) => {
    const { setNotifications } = useContext(NotificationsContext);
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
                                // const setStd = isPreferredStudents ? { ...student, preferredPartners: { ...student.preferredPartners, [id]: studentList[id] } } : { ...student, notPreferredPartners: { ...student.notPreferredPartners, [id]: studentList[id] } };
                                const setStd = isPreferredStudents ? { ...student, preferredPartners: [ ...student.preferredPartners, id] } : { ...student, notPreferredPartners: [ ...student.notPreferredPartners, id] };
                                return (
                                    <div key={index} className="partner-search-item" style={checked ? { opacity: 0.6 } : { opacity: 1 }}>
                                        <p>{id} - {name}</p>
                                        <button
                                            type="button"
                                            disabled={!checked ? false : true}
                                            onClick={() => {
                                                if (Object.keys(partnerList).length >= maxPartners) {
                                                    setNotifications({ type: 'danger', message: `Max partner preferences is ${maxPartners}` });
                                                } else {
                                                    setPartnerList({ ...partnerList, [id]: studentPartnerResults[id] });
                                                    setStudentPartnerResults({ ...studentPartnerResults, [id]: { name: name, checked: true } });
                                                    setStudent(setStd);
                                                }
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

export default PartnerForm