import React, { useState, useEffect, useContext } from "react";
import { assignSeats } from "../../api/algorithm";
import { NotificationsContext } from "../../ContextProviders";
import { useStudents } from "../../lib/studentsData";
import { useTables } from "../../lib/tableData";

// import components
import DynamicCanvas from "./DynamicCanvas/DynamicCanvas";
import DynamicCanvasBar from "./DynamicCanvas/DynamicCanvasBar/DynamicCanvasBar";

import "./style.css";

const SeatingGenerator = () => {
  const { studentMap } = useStudents();
  const { tableArr } = useTables();
  const { setNotifications } = useContext(NotificationsContext);
  const [assignedSeats, setAssignedSeats] = useState([]);
  const [seatingChartScore, setSeatingChartScore] = useState(null);

  const handleAssignSeats = async () => {
    try {
      if (Object.keys(studentMap).length <= 0) throw "Please add students before generating the seating chart";
      const {
        data: { studentList, bestSeatingChartScore },
      } = await assignSeats(studentMap, tableArr);
      setAssignedSeats(studentList);
      setSeatingChartScore(bestSeatingChartScore);
    } catch (error) {
      // setNotifications({ type: "danger", message: error });
    }
  };

  return (
    <main className='seating-generator'>
      <div className='generator'>
        <DynamicCanvasBar />
        <h1>Front</h1>
        <DynamicCanvas />
      </div>
      <button onClick={handleAssignSeats}>Click to Assign Seats</button>
      <h3>{seatingChartScore}</h3>
      <div className='student-grid'>
        {assignedSeats.map((student, index) => {
          const {
            name,
            sitNextTo,
            doNotSitNextTo,
            happy,
            sad,
            frontPreference,
            backPreference,
          } = student;
          const [sitNextToStudent1, sitNextToStudent2] = sitNextTo;
          const [dontSitNextToStudent1, dontSitNextToStudent2] = doNotSitNextTo;
          return (
            <div key={index} className='student'>
              <p>
                <strong>Name:</strong> {name}
              </p>{" "}
              <br></br>
              <p>
                <strong>sitNextTo:</strong> {sitNextToStudent1},{" "}
                {sitNextToStudent2}
              </p>
              <p>
                <strong>doNotSitNextTo:</strong> {dontSitNextToStudent1},{" "}
                {dontSitNextToStudent2}
              </p>
              <p>
                <strong>Happy With:</strong> {happy}
              </p>
              <p>
                <strong>Sad With:</strong> {sad}
              </p>
              <p>
                <strong>Front Pref:</strong> {frontPreference}
              </p>
              <p>
                <strong>Back Pref:</strong> {backPreference}
              </p>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default SeatingGenerator;
