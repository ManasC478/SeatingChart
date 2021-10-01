import React, { useState, useContext } from 'react';
import { CSVReader } from 'react-papaparse';

import { NotificationsContext } from '../../../../ContextProviders';

// material ui icons
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

// import css file
import './style.css';

const StudentFileForm = ({ setStudentMap }) => {
    const { setNotifications } = useContext(NotificationsContext);
    const [openInfo, setOpenInfo] = useState(false);

    const handleOnDrop = (data) => {
        let studentMap = {};
        console.log(data);

        try {
            data.forEach(({ data, errors }) => {
                if (errors.length > 0) {
                    throw errors;
                }
                if (isNaN(data[0])) {
                    throw 'Invalid CSV file. Please check for unnecessary spaces or values.';
                }
    
                const [id, first_name, last_name, front, preferred1, preferred2, notPreferred1, notPreferred2] = data;
                studentMap[parseInt(id)] = { first_name, last_name, front: parseInt(front)===1, preferredPartners: [parseInt(preferred1), parseInt(preferred2)], notPreferredPartners: [parseInt(notPreferred1), parseInt(notPreferred2)] }
            });
            
            setStudentMap(studentMap);
            setNotifications({ type: 'okay', message: 'Successfully added students from csv file'})
        } catch (error) {
            console.log('hi');
            console.log(error);
            setNotifications({ type: 'danger', message: error });
        }
        // console.log('---------------------------')
        // console.log(data)
        // console.log('---------------------------')

    }

    const handleOnError = (err, file, inputElem, reason) => {
        console.log(file);
        console.log(inputElem);
        console.log(reason);
        console.log(err)
    }

    // const handleOnRemoveFile = (data) => {
    //     console.log('---------------------------')
    //     console.log(data)
    //     console.log('---------------------------')
    // }
    return (
        <section className="student-file-form">
            <div className="title-info">
                <h1>Add CSV File</h1>
                <button className="upload-csv-info" onClick={() => setOpenInfo(!openInfo)}><InfoOutlinedIcon /></button>
                <div className="upload-csv-info-popup" style={openInfo ? { display: 'block' } : { display: 'none'}}>
                    <h3>Valid CSV File</h3>
                    <div>
                        <h4>Column Names</h4>
                        <ol>
                            <li>
                                <h5>Student ID</h5>
                                <ul>
                                    <li>A unique number for the student</li>
                                </ul>
                            </li>
                            <li>
                                <h5>First Name</h5>
                                <ul>
                                    <li>Student's first name</li>
                                    <li>If student has middle, then add the middle initial</li>
                                </ul>
                            </li>
                            <li>
                                <h5>Last Name</h5>
                                <ul>
                                    <li>Student's last name</li>
                                </ul>
                            </li>
                            <li>
                                <h5>Location</h5>
                                <ul>
                                    <li>Students seating preference: front or back</li>
                                    <li>Front = 1</li>
                                    <li>Back = 0</li>
                                </ul>
                            </li>
                            <li>
                                <h5>Preferred</h5>
                                <ul>
                                    <li>Students the student wants to sit next to</li>
                                    <li>Add a list with the student's unique ID. e.g. [2, 3] with 2 and 3 being the IDs</li>
                                </ul>
                            </li>
                            <li>
                                <h5>Not Preferred</h5>
                                <ul>
                                    <li>Students the student does not want to sit next to</li>
                                    <li>Add a list with the student's unique ID. e.g. [2, 3] with 2 and 3 being the IDs</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="file-drop-box">
                <CSVReader
                    onDrop={handleOnDrop}
                    onError={handleOnError}
                    addRemoveButton
                    removeButtonColor='#659cef'
                    // onRemoveFile={handleOnRemoveFile}
                >
                    <span>Drop CSV file here or click to upload.</span>
                </CSVReader>

            </div>
        </section>
    )
}

export default StudentFileForm
