import React from "react";
import { Box, Stack, Text, Divider } from "@chakra-ui/react";
import { useStudents } from "../../../../lib/studentsData";

import StudentItem from "./StudentItem";

// import css file
import "./style.css";

const StudentList = () => {
  const { studentMap } = useStudents();

  return (
    <Box
      borderRadius={"5px"}
      boxShadow={"md"}
      m={50}
      p={5}
      border={"1px solid"}
      borderColor={"gray.100"}
    >
      <Text as={"h2"} fontWeight={"bold"} fontSize={"xl"}>
        Students
      </Text>
      <Divider mb={5} />
      <Stack>
        {Object.keys(studentMap).map((id, index) => (
          <StudentItem key={index} id={id} />
          // const { first_name, last_name } = studentMap[id];
          // return (
          //   <Flex key={index} justify={"space-between"}>
          //     <Text>
          //       {first_name} {last_name}
          //     </Text>
          //     <IconButton
          //       variant={"ghost"}
          //       borderRadius={"full"}
          //       icon={<MoreVertIcon fontSize={"xl"} />}
          //     />
          //   </Flex>
          // );
        ))}
      </Stack>
    </Box>
  );
};

export default StudentList;
