import { Button, useToast } from "@chakra-ui/react";
import { useStudents } from "../../../../lib/studentsData";
import { useTables } from "../../../../lib/tableData";

const ClearTablesButton = ({ ...rest }) => {
  const { clearTables } = useTables();
  const handleClearTables = () => {
    clearTables();
  };
  return (
    <Button
      variant={"ghost"}
      size={"md"}
      onClick={handleClearTables}
      bg={"black"}
      color={"white"}
      _hover={{ bg: "gray.600" }}
      {...rest}
    >
      Clear Tables
    </Button>
  );
};

export default ClearTablesButton;
