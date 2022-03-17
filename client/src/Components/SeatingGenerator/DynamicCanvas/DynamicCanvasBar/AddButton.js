import { Button, useToast } from "@chakra-ui/react";
import { useTables } from "../../../../lib/tableData";
import uuid from "react-uuid";

const AddButton = ({ tableRows, tableColumns, ...rest }) => {
  const toast = useToast();
  const { addTable, tableSize } = useTables();

  const onAddTable = () => {
    const width = parseInt(
      document.querySelector("#canvas-container")?.offsetWidth
    );
    const height = 600;
    const position = {
      x: Math.floor(Math.random() * (width - tableSize * tableColumns)),
      y: Math.floor(Math.random() * (height - tableSize * tableRows)),
    };
    const error = addTable(uuid(), {
      rows: tableRows,
      columns: tableColumns,
      vPosition: "front",
      hPosition: "left",
      position,
      students: [],
    });

    if (error) {
      toast({
        description: error,
        status: "error",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        description: "Table added.",
        status: "success",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
    }
  };
  return (
    <Button
      variant={"solid"}
      size={"md"}
      onClick={onAddTable}
      bg={"black"}
      color={"white"}
      _hover={{ bg: "gray.600" }}
      {...rest}
    >
      Add Table
    </Button>
  );
};

export default AddButton;
