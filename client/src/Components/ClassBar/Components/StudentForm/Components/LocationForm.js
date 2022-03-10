import React from "react";
import { Radio, RadioGroup, Stack, Text, Button } from "@chakra-ui/react";
import { useStudents } from "../../../../../lib/studentsData";

// import css file
// import "./style.css";

const LocationForm = ({ student, setStudent }) => {
  // const { student, updateVPosition, clearVPosition } = useStudents();
  return (
    <Stack>
      <Text as={"h3"}>Location Preference</Text>
      <Stack spacing={2}>
        <Stack>
          <RadioGroup>
            {console.log(null === "hi")}
            <Stack spacing={2}>
              <Radio
                name='front'
                id='front'
                value='front'
                isChecked={student.vPosition === "front"}
                onChange={() => setStudent({ ...student, vPosition: "front" })}
              >
                Front
              </Radio>
              <Radio
                name='middle'
                id='middle'
                value='middle'
                isChecked={student.vPosition === "middle"}
                onChange={() => setStudent({ ...student, vPosition: "middle" })}
              >
                Middle
              </Radio>
              <Radio
                name='back'
                id='back'
                value='back'
                isChecked={student.vPosition === "back"}
                onChange={() => setStudent({ ...student, vPosition: "back" })}
              >
                Back
              </Radio>
            </Stack>
          </RadioGroup>
          <Button
            type='button'
            w={"50%"}
            bg={"black"}
            color={"white"}
            _hover={{ bg: "gray.600" }}
            fontSize={"sm"}
            onClick={() => setStudent({ ...student, vPosition: null })}
          >
            Clear
          </Button>
        </Stack>

        <Stack spacing={2}>
          <RadioGroup>
            <Stack spacing={2}>
              <Radio
                name='left'
                id='left'
                value='left'
                isChecked={student.hPosition === "left"}
                onChange={() => setStudent({ ...student, hPosition: "left" })}
              >
                Left
              </Radio>
              <Radio
                name='middle'
                id='middle'
                value='middle'
                isChecked={student.hPosition === "middle"}
                onChange={() => setStudent({ ...student, hPosition: "middle" })}
              >
                Middle
              </Radio>
              <Radio
                name='right'
                id='right'
                value='right'
                isChecked={student.hPosition === "right"}
                onChange={() => setStudent({ ...student, hPosition: "right" })}
              >
                Right
              </Radio>
            </Stack>
          </RadioGroup>
          <Button
            type='button'
            w={"50%"}
            bg={"black"}
            color={"white"}
            _hover={{ bg: "gray.600" }}
            fontSize={"sm"}
            onClick={() => setStudent({ ...student, hPosition: null })}
          >
            Clear
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LocationForm;
