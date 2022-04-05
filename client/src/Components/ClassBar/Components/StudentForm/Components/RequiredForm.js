import React from "react";
import { FormControl, Input, Button, Stack } from "@chakra-ui/react";

const RequiredForm = ({ student, setStudent }) => {
  return (
    <Stack spacing={4}>
      <FormControl>
        <Stack spacing={2}>
          <Input
            type='text'
            variant={"filled"}
            value={student.first_name}
            onChange={(e) =>
              setStudent({ ...student, first_name: e.target.value })
            }
            placeholder='First Name'
            isRequired
          />
          <Input
            type='text'
            variant={"filled"}
            value={student.last_name}
            onChange={(e) =>
              setStudent({ ...student, last_name: e.target.value })
            }
            placeholder='Last Name'
            isRequired
          />
        </Stack>
      </FormControl>
      <Button
        type='submit'
        bg={"black"}
        color={"white"}
        _hover={{ bg: "gray.600" }}
      >
        Add Student
      </Button>
    </Stack>
  );
};

export default RequiredForm;
