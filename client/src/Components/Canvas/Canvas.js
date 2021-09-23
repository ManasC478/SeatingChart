import React, { useState, useEffect } from 'react';
import { assignSeats } from '../../api/algorithm';

import './style.css';

const Canvas = () => {
    const [assignedSeats, setAssignedSeats] = useState([]);
    const [seatingChartScore, setSeatingChartScore] = useState(null);
    
    const handleAssignSeats = async () => {
        try {
            const { data: { studentList, bestSeatingChartScore } } = await assignSeats(['dummy', 'list', 'sent', 'to', 'backend']);
            console.log(studentList);
            setAssignedSeats(studentList);
            setSeatingChartScore(bestSeatingChartScore)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="canvas">
          { 
            console.log(assignedSeats)
          }
            <button onClick={handleAssignSeats}>Click to Assign Seats</button>
            <h3>{seatingChartScore}</h3>
            <div className="student-grid">
                {
                    assignedSeats.map((student, index) => {
                      const {name, sitNextTo, doNotSitNextTo, happy, sad, frontPreference, backPreference} = student;
                      const [sitNextToStudent1, sitNextToStudent2] = sitNextTo;
                      const [dontSitNextToStudent1, dontSitNextToStudent2] = doNotSitNextTo;
                        return (
                          <div key={index} class="student-item">
                            <p><strong>Name:</strong> {name}</p> <br></br>
                            {/* <p><strong>sitNextTo:</strong> {sitNextToStudent1}, {sitNextToStudent2}</p>
                            <p><strong>doNotSitNextTo:</strong> {dontSitNextToStudent1}, {dontSitNextToStudent2}</p> */}
                            <p><strong>Happy With:</strong> {happy}</p>
                            <p><strong>Sad With:</strong> {sad}</p>
                            <p><strong>Front Pref:</strong> {frontPreference ? 'yes' : 'idc'}</p>
                            <p><strong>Back Pref:</strong> {backPreference ? 'yes' : 'idc'}</p>
                          </div>
                        );
                    })
                }
            </div>
        </main>
    )
}

export default Canvas