import React from "react";
import { CSVReader } from "react-papaparse";
import { useStudents } from "../../../../lib/studentsData";
import {
  useToast,
  Box,
  Text,
  Heading,
  IconButton,
  Stack,
  Center,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

import { InfoIcon, FileUploadIcon } from "../../../../styles/icons";

import "./style.css";

const StudentFileForm = () => {
  const toast = useToast();
  const { addStudentWithCSV } = useStudents();

  const handleOnDrop = (data) => {
    let studentMap = {};
    data.forEach(({ data, errors }) => {
      try {
        if (errors.length > 0) {
          throw new Error(errors[0]);
        }
        if (isNaN(data[0])) {
          throw new Error(
            "Invalid CSV file. Please check for unnecessary spaces or values."
          );
        }

        const [
          id,
          first_name,
          last_name,
          vPosition,
          hPosition,
          preferred,
          notPreferred,
        ] = data;

        if (!id) return;

        const preferredPartners = preferred
          .substring(1, preferred.length - 1)
          .split(" ")
          .map((ele) => ele);

        const notPreferredPartners = notPreferred
          .substring(1, notPreferred.length - 1)
          .split(" ")
          .map((ele) => ele);

        studentMap[id] = {
          first_name,
          last_name,
          vPosition: vPosition || "",
          hPosition: hPosition || "",
          preferredPartners,
          notPreferredPartners,
        };
      } catch (error) {
        toast({
          title: "Error.",
          description: error.message,
          status: "error",
          position: "bottom-right",
          duration: 4000,
          isClosable: true,
        });
      }
    });

    addStudentWithCSV(studentMap);
    toast({
      title: "Uploaded csv file.",
      description: "Successfully added students from csv file.",
      status: "success",
      position: "bottom-right",
      duration: 4000,
      isClosable: true,
    });
  };

  const handleOnError = (err, file, inputElem, reason) => {
    toast({
      title: "Error.",
      description: err,
      status: "error",
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
      <Stack spacing={2}>
        <Flex justify={"space-between"} align={"center"}>
          <Heading fontWeight={"thin"} fontSize={"xl"}>
            Add CSV File
          </Heading>
          <InfoButton>
            <IconButton
              aria-label='CSV Info'
              isRound
              bg={"none"}
              icon={<InfoIcon boxSize={6} />}
            />
          </InfoButton>
        </Flex>
        <Box>
          <CSVReader
            onDrop={handleOnDrop}
            onError={handleOnError}
            addRemoveButton
            removeButtonColor='#659cef'
          >
            <Stack spacing={1} color={"gray.500"}>
              <Text>Drag and drop or upload</Text>
              <Center>
                <FileUploadIcon boxSize={6} />
              </Center>
            </Stack>
          </CSVReader>
        </Box>
      </Stack>
    </Box>
  );
};

const InfoButton = ({ children }) => (
  <Popover placement={"right"}>
    <PopoverTrigger>{children}</PopoverTrigger>
    <PopoverContent p={5} w={"600px"}>
      <PopoverArrow />
      <PopoverBody>
        <Box>
          <OrderedList spacing={3}>
            <ListItem>
              <Text>
                To create a CSV file, simply use Excel, Google Spreadsheets, or
                some other spreadsheet software. Then, add only the required
                information in each cell (ID, name, position, etc).
              </Text>
            </ListItem>
            <ListItem>
              <Text>Using each student as a row in the CSV file</Text>
              <UnorderedList ml={5}>
                <ListItem>Column A: ID</ListItem>
                <ListItem>Column B: First name</ListItem>
                <ListItem>Column C: Last name</ListItem>
                <ListItem>Column D: front/middle/back preference</ListItem>
                <ListItem>Column E: left/middle/right preference</ListItem>
                <ListItem>
                  Column F*: list of students (using IDs) to sit with
                </ListItem>
                <ListItem>
                  Column G*: list of students (using IDs) to not sit with
                </ListItem>
                <ListItem>Formatting for * columns:</ListItem>
                <UnorderedList ml={5}>
                  <ListItem>If no students, state “NA”</ListItem>
                  <ListItem>Maximum of 3 students</ListItem>
                  <ListItem>
                    Format as a list with [ ] as the starting/closing, with
                    space in between. Example: [2 1 6].
                  </ListItem>
                </UnorderedList>
              </UnorderedList>
            </ListItem>
            <ListItem>
              <Text>Example CSV: https://ibb.co/Yy88xTZ</Text>
            </ListItem>
          </OrderedList>
        </Box>
      </PopoverBody>
    </PopoverContent>
  </Popover>
);

export default StudentFileForm;
