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
          <RadioGroup
            onChange={(value) => setStudent({ ...student, vPosition: value })}
            value={student.vPosition}
          >
            <Stack isInline spacing={4}>
              <Radio name='front' id='front' value='front'>
                Front
              </Radio>
              <Radio name='middle' id='middle' value='middle'>
                Middle
              </Radio>
              <Radio name='back' id='back' value='back'>
                Back
              </Radio>
            </Stack>
          </RadioGroup>
          <Button
            variant={"outline"}
            size={"sm"}
            w={"25%"}
            // bg={"black"}
            // color={"white"}
            // _hover={{ bg: "gray.600" }}
            onClick={() => setStudent({ ...student, vPosition: "" })}
          >
            Clear
          </Button>
        </Stack>

        <Stack spacing={2}>
          <RadioGroup
            onChange={(value) => setStudent({ ...student, hPosition: value })}
            value={student.hPosition}
          >
            <Stack isInline spacing={4}>
              <Radio name='left' id='left' value='left'>
                Left
              </Radio>
              <Radio name='middle' id='middle' value='middle'>
                Middle
              </Radio>
              <Radio name='right' id='right' value='right'>
                Right
              </Radio>
            </Stack>
          </RadioGroup>
          <Button
            variant={"outline"}
            size={"sm"}
            w={"25%"}
            // bg={"black"}
            // color={"white"}
            // _hover={{ bg: "gray.600" }}
            onClick={() => setStudent({ ...student, hPosition: "" })}
          >
            Clear
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LocationForm;
