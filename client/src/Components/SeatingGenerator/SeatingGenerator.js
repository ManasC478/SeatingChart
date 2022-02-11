import React, { useState, useEffect, useContext } from "react";
import { Stack, Box, Heading, Center } from "@chakra-ui/react";
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
        <Stack spacing={3}>
          <Center
            w={"full"}
            py={5}
            boxShadow={"md"}
            border={"1px solid"}
            borderColor={"gray.100"}
            borderRadius={"5px"}
          >
            <Heading>Front</Heading>
          </Center>
          <Box
            id='canvas-container'
            boxShadow={"md"}
            w={"full"}
            border={"1px solid"}
            borderColor={"gray.100"}
            borderRadius={"5px"}
          >
            <DynamicCanvas />
          </Box>
        </Stack>
      </div>
      <button onClick={handleAssignSeats}>Click to Assign Seats</button>
    </main>
  );
};

export default SeatingGenerator;
