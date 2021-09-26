import React from 'react'

// import material ui icons
import MoreVertIcon from '@material-ui/icons/MoreVert';

// import css file
import './style.css';

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
    )
}

export default StudentList
