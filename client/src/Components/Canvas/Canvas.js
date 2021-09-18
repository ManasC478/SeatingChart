import React, { useState, useEffect } from 'react';
import { assignSeats } from '../../api/algorithm';

import './style.css';

const Canvas = () => {
    const [assignedSeats, setAssignedSeats] = useState([]);
    
    const handleAssignSeats = async () => {
        try {
            const { data: { studentList } } = await assignSeats(['dummy', 'list', 'sent', 'to', 'backend']);
            setAssignedSeats(studentList);    
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="canvas">
            <button onClick={handleAssignSeats}>Click to Assign Seats</button>
            <div className="student-grid">
                {
                    assignedSeats.map((student, index) => {
                        return (
                            <p key={index}>{student}</p>
                        );
                    })
                }
            </div>
        </main>
    )
}

export default Canvas