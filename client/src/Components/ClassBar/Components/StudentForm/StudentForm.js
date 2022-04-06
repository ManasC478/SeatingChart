import React, { useState } from "react";
import { useStudents } from "../../../../lib/studentsData";
import {
  Heading,
  Box,
  Stack,
  Switch,
  useToast,
  Text,
  HStack,
} from "@chakra-ui/react";
import uuid from "react-uuid";

import RequiredForm from "./Components/RequiredForm";
import LocationForm from "./Components/LocationForm";
import PartnerForm from "./Components/PartnerForm";

const StudentForm = () => {
  const toast = useToast();
  const { addStudent } = useStudents();
  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    vPosition: null,
    hPosition: null,
    // dismissed: false,
    preferredPartners: [],
    notPreferredPartners: [],
  });
  const [openOptions, setOpenOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    addStudent(uuid(), student);
    setStudent({
      first_name: "",
      last_name: "",
      vPosition: null,
      hPosition: null,
      dismissed: false,
      preferredPartners: [],
      notPreferredPartners: [],
    });
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
            <HStack spacing={2} align={"center"}>
              <Switch
                size={"md"}
                defaultIsChecked={openOptions}
                onChange={() => setOpenOptions(!openOptions)}
              />
              <Text>More Options</Text>
            </HStack>
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
