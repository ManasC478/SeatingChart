import React, { useState, useEffect, useContext } from "react";
import { assignSeats } from "../../api/algorithm";
// import { NotificationsContext } from "../../ContextProviders";
import { useStudents } from "../../lib/studentsData";
import { useTables } from "../../lib/tableData";
import { useToast } from "@chakra-ui/react";

// import components
import DynamicCanvas from "./DynamicCanvas/DynamicCanvas";
import DynamicCanvasBar from "./DynamicCanvas/DynamicCanvasBar/DynamicCanvasBar";

import "./style.css";

const SeatingGenerator = () => {
  const toast = useToast();
  const { studentMap } = useStudents();
  const { tableMap, totalTables, setTables } = useTables();
  // const { setNotifications } = useContext(NotificationsContext);
  const [assignedSeats, setAssignedSeats] = useState([]);
  const [seatingChartScore, setSeatingChartScore] = useState(null);

  const handleAssignSeats = async () => {
    try {
      console.log(totalTables);
      if (Object.keys(studentMap).length <= 0)
        throw "Please add students before generating the seating chart.";
      else if (Object.keys(studentMap).length > totalTables) {
        throw "Number of students is more than number of tables. Please add more tables.";
      }

      const res = await assignSeats(studentMap, tableMap);
      if (res.status >= 500) {
        toast({
          title: "Internal error",
          description: "Failed to randomize the seats",
          status: "error",
          position: "bottom-right",
          duration: 4000,
          isClosable: true,
        });
        return;
      }
      console.log(res);
      setTables(res.data.studentList);
    } catch (error) {
      console.log("error");
      // setNotifications({ type: "danger", message: error });
      toast({
        description: error,
        status: "error",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
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
