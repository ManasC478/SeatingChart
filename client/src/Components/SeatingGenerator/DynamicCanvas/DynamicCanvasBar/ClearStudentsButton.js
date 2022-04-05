import { Button } from "@chakra-ui/react";
import { useTables } from "../../../../lib/tableData";

const ClearStudentsButton = ({ ...rest }) => {
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

export default ClearStudentsButton;
