import React from "react";
import { Stack } from "@chakra-ui/react";

import StudentList from "./Components/StudentList/StudentList";
import StudentForm from "./Components/StudentForm/StudentForm";
import StudentFileForm from "./Components/StudentFileForm/StudentFileForm";

import "./style.css";

const ClassBar = () => {
  return (
    <Stack
      spacing={10}
      w={"full"}
      overflowY={"scroll"}
      sx={{
        "&::-webkit-scrollbar": {
          width: "0",
        },
        "&::-webkit-scrollbar-thumb": {},
      }}
    >
      <StudentForm />
      <StudentFileForm />
      <StudentList />
    </Stack>
  );
};

export default ClassBar;
