import React, { useState, useContext } from "react";
import { useStudents } from "../../../../lib/studentsData";
import { Heading, Box, Stack, Switch, useToast, Text } from "@chakra-ui/react";

// import components
import RequiredForm from "./Components/RequiredForm";
import LocationForm from "./Components/LocationForm";
import PartnerForm from "./Components/PartnerForm";
// import { NotificationsContext } from "../../../../ContextProviders";

// import css file
// import "./style.css";

const StudentForm = () => {
  const toast = useToast();
  const { studentMap, addStudent } = useStudents();
  // const { setNotifications } = useContext(NotificationsContext);
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    vPosition: null,
    hPosition: null,
    dismissed: false,
    preferredPartners: [],
    notPreferredPartners: [],
  });
  const [openOptions, setOpenOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // get last student id
    let studentId = parseInt(
      Object.keys(studentMap)[Object.keys(studentMap).length - 1]
    );

    // check if id is there. if so then add 1 to id, otherwise equal to 1 as first student of class
    if (isNaN(studentId)) {
      studentId = 1;
    } else {
      studentId = studentId + 1;
    }

    addStudent(studentId, student);
    setStudent({
      first_name: "",
      last_name: "",
      vPosition: null,
      hPosition: null,
      dismissed: false,
      preferredPartners: [],
      notPreferredPartners: [],
    });
    // setNotifications({ type: "okay", message: "Student added successfully" });
    toast({
      description: "Student added.",
      status: "success",
      position: "bottom-right",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Box
      boxShadow={"md"}
      border={"1px solid"}
      borderColor={"gray.100"}
      borderRadius={"5px"}
      py={"10px"}
      px={"20px"}
    >
      <Heading fontWeight={"thin"} mb={5}>
        Add Students
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <Stack spacing={4}>
            <RequiredForm student={student} setStudent={setStudent} />
            <Stack isInline spacing={2} align={"center"}>
              <Switch
                size={"md"}
                defaultIsChecked={openOptions}
                onChange={() => setOpenOptions(!openOptions)}
              />
              <Text>More Options</Text>
            </Stack>
          </Stack>
          <Stack
            spacing={5}
            style={openOptions ? { display: "block" } : { display: "none" }}
          >
            <LocationForm student={student} setStudent={setStudent} />
            <PartnerForm student={student} setStudent={setStudent} />
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default StudentForm;
