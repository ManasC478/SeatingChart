import { Button, useToast } from "@chakra-ui/react";
import { useStudents } from "../../../../lib/studentsData";
import { useTables } from "../../../../lib/tableData";

const ClearButton = ({ ...rest }) => {
  const { clearTableStudents } = useTables();
  const handleClearSeats = () => {
    clearTableStudents();
  };
  return (
    <Button
      variant={"ghost"}
      size={"md"}
      onClick={handleClearSeats}
      bg={"black"}
      color={"white"}
      _hover={{ bg: "gray.600" }}
      {...rest}
    >
      Clear Students
    </Button>
  );
};

export default ClearButton;
