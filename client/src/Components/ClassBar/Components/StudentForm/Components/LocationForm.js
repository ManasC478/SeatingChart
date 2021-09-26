import React from 'react';

// import css file
import './style.css';

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
    )
}

export default LocationForm
