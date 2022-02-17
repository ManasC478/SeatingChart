import React, { useState, useEffect, useContext } from "react";
import { useStudents } from "../../../../../lib/studentsData";
import {
  Text,
  IconButton,
  Flex,
  Stack,
  useToast,
  Box,
  Button,
} from "@chakra-ui/react";

// import icons
import {
  AddIcon,
  DownArrowIcon,
  RightArrowIcon,
  CheckIcon,
  ClearIcon,
} from "../../../../../styles/icons";

// import components
// import { NotificationsContext } from "../../../../../ContextProviders";

// import css file
// import "./style.css";

const PartnerForm = ({ student, setStudent }) => {
  const { studentMap } = useStudents();
  // const { student, studentMap } = useStudents();
  //  set state variables
  const [preferredPartnerList, setPreferredPartnerList] = useState({});
  const [notPreferredPartnerList, setNotPreferredPartnerList] = useState({});
  const [studentPartnerResults, setStudentPartnerResults] = useState({});

  useEffect(() => {
    setPreferredPartnerList({});
    setNotPreferredPartnerList({});

    const copyStudentList = () => {
      let tempStudentObj = {};
      Object.keys(studentMap).forEach((id) => {
        const { first_name, last_name } = studentMap[id];
        tempStudentObj[id] = {
          name: `${first_name} ${last_name.slice(0, 1)}.`,
          selected: false,
        };
      });
      setStudentPartnerResults(tempStudentObj);
    };

    copyStudentList();
  }, [studentMap]);

  return (
    <Stack>
      {/* preferred partner ui - add, see list, delete */}
      <Stack spacing={1}>
        <PartnerSearch
          student={student}
          setStudent={setStudent}
          isPreferredStudents={true}
          studentPartnerResults={studentPartnerResults}
          setStudentPartnerResults={setStudentPartnerResults}
          partnerList={preferredPartnerList}
          setPartnerList={setPreferredPartnerList}
        />
        <Box>
          {Object.keys(preferredPartnerList).map((id, index) => {
            const { name } = studentPartnerResults[id];
            return (
              <Flex key={index} justify={"space-between"} align={"center"}>
                <Text>
                  {id} - {name}
                </Text>
                <IconButton
                  variant={"ghost"}
                  borderRadius={"full"}
                  color={"red.400"}
                  icon={<ClearIcon fontSize={"lg"} />}
                  onClick={() => {
                    delete preferredPartnerList[id];
                    setStudentPartnerResults({
                      ...studentPartnerResults,
                      [id]: { name: name, checked: false },
                    });
                    delete student.preferredPartners[id];
                  }}
                />
              </Flex>
            );
          })}
        </Box>
      </Stack>
      {/* not preferred partner ui - add, see list , delete */}
      <Stack spacing={1}>
        <PartnerSearch
          student={student}
          setStudent={setStudent}
          isPreferredStudents={false}
          studentPartnerResults={studentPartnerResults}
          setStudentPartnerResults={setStudentPartnerResults}
          partnerList={notPreferredPartnerList}
          setPartnerList={setNotPreferredPartnerList}
        />
        <Box>
          {Object.keys(notPreferredPartnerList).map((id, index) => {
            const { name } = studentPartnerResults[id];

            return (
              <Flex key={index} justify={"space-between"} align={"center"}>
                <Text>
                  {id} - {name}
                </Text>
                <IconButton
                  variant={"ghost"}
                  borderRadius={"full"}
                  color={"red.400"}
                  icon={<ClearIcon fontSize={"lg"} />}
                  onClick={() => {
                    delete notPreferredPartnerList[id];
                    setStudentPartnerResults({
                      ...studentPartnerResults,
                      [id]: { name: name, checked: false },
                    });
                    delete student.notPreferredPartners[id];
                  }}
                />
              </Flex>
            );
          })}
        </Box>
      </Stack>
    </Stack>
  );
};

const PartnerSearch = ({
  student,
  setStudent,
  studentPartnerResults,
  setStudentPartnerResults,
  isPreferredStudents,
  partnerList,
  setPartnerList,
}) => {
  const toast = useToast();
  // const { student, updatePreferredPartners, updateNotPreferredPartners } = useStudents();
  const { updatePreferredPartners, updateNotPreferredPartners } = useStudents();
  // const { setNotifications } = useContext(NotificationsContext);
  const [displayResult, setDisplayResults] = useState(false);
  const maxPartners = 2;

  return (
    <Stack spacing={2}>
      <Flex justify={"space-between"} align={"center"}>
        <Text as={"h3"}>
          {isPreferredStudents ? "Preferred" : "Not Preferred"} Students
        </Text>
        <IconButton
          variant={"ghost"}
          borderRadius={"full"}
          onClick={() => setDisplayResults(!displayResult)}
          icon={
            displayResult ? (
              <DownArrowIcon fontSize={"xl"} />
            ) : (
              <RightArrowIcon fontSize={"xl"} />
            )
          }
        />
      </Flex>
      <Box
        boxShadow={"inner"}
        border={"1px solid"}
        borderColor={"gray.100"}
        p={1}
        borderRadius={"5px"}
        // spacing={1}
        d={displayResult ? "block" : "none"}
      >
        {Object.keys(studentPartnerResults).length === 0 ? (
          <Text>No Student Added</Text>
        ) : (
          Object.keys(studentPartnerResults).map((id, index) => {
            // const resultStudent = studentList[id];
            const { name, checked } = studentPartnerResults[id];
            // const setStd = isPreferredStudents ? { ...student, preferredPartners: { ...student.preferredPartners, [id]: studentList[id] } } : { ...student, notPreferredPartners: { ...student.notPreferredPartners, [id]: studentList[id] } };
            // const setStd = isPreferredStudents
            //   ? [...student.preferredPartners, id]
            //   : [...student.notPreferredPartners, id];
            // const setStd = isPreferredStudents
            //   ? {
            //       ...student,
            //       preferredPartners: [...student.preferredPartners, id],
            //     }
            //   : {
            //       ...student,
            //       notPreferredPartners: [...student.notPreferredPartners, id],
            //     };
            return (
              <Flex
                justify={"space-between"}
                align={"center"}
                py={1}
                px={3}
                key={index}
                style={checked ? { opacity: 0.6 } : { opacity: 1 }}
                borderRadius={"5px"}
                _hover={{ bg: "gray.100" }}
              >
                <Text>
                  {id} - {name}
                </Text>
                <IconButton
                  variant={"ghost"}
                  _hover={{ bg: "gray.300" }}
                  borderRadius={"full"}
                  fontSize={"lg"}
                  disabled={!checked ? false : true}
                  onClick={() => {
                    if (Object.keys(partnerList).length >= maxPartners) {
                      // setNotifications({
                      //   type: "danger",
                      //   message: `Max partner preferences is ${maxPartners}`,
                      // });
                      toast({
                        description: `Max partner preferences is ${maxPartners}.`,
                        status: "error",
                        position: "bottom-right",
                        duration: 4000,
                        isClosable: true,
                      });
                    } else {
                      setPartnerList({
                        ...partnerList,
                        [id]: studentPartnerResults[id],
                      });
                      setStudentPartnerResults({
                        ...studentPartnerResults,
                        [id]: { name: name, checked: true },
                      });
                      if (isPreferredStudents) {
                        // updatePreferredPartners(id);
                        setStudent({
                          ...student,
                          preferredPartners: [...student.preferredPartners, id],
                        });
                      } else {
                        // updateNotPreferredPartners(id);
                        setStudent({
                          ...student,
                          notPreferredPartners: [
                            ...student.notPreferredPartners,
                            id,
                          ],
                        });
                      }
                    }
                  }}
                  icon={checked ? <CheckIcon /> : <AddIcon />}
                />
              </Flex>
            );
          })
        )}
      </Box>
    </Stack>
  );
};

export default PartnerForm;
