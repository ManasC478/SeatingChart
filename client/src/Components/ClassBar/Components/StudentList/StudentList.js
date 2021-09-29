import React from 'react'

// import material ui icons
import MoreVertIcon from '@material-ui/icons/MoreVert';

// import css file
import './style.css';

const StudentList = ({ studentMap }) => {
    return (
        <section className="student-list">
            <h1>Students</h1>
            <ol>
                {
                    Object.keys(studentMap).map((id, index) => {
                        const { first_name, last_name } = studentMap[id]
                        return (
                            <li key={index} className="student-item">
                                <p>{first_name} {last_name}</p>
                                <button type="button" onClick={() => delete studentMap[id]}><MoreVertIcon /></button>
                            </li>
                        );
                    })
                }
            </ol>
        </section>
    )
}

export default StudentList
