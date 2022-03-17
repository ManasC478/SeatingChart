import { ButtonGroup, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import RandomizeButton from "./RandomizeButton";
import OptimizeButton from "./OptimizeButton";
import ClearStudentsButton from "./ClearStudentsButton";
import ClearTablesButton from "./ClearTablesButton";
import AddButton from "./AddButton";

const Buttons = ({ tableRows, tableColumns }) => {
  return (
    <Stack spacing={2}>
      <ButtonGroup justify={"center"} align={"center"}>
        <AddButton
          w={"full"}
          fontSize={"sm"}
          py={2}
          px={4}
          wordBreak={"break-all"}
          tableRows={tableRows}
          tableColumns={tableColumns}
        />
        <ClearStudentsButton
          w={"full"}
          fontSize={"sm"}
          py={2}
          px={4}
          wordBreak={"break-all"}
        />
        <ClearTablesButton
          w={"full"}
          fontSize={"sm"}
          py={2}
          px={4}
          wordBreak={"break-all"}
        />
      </ButtonGroup>
      <ButtonGroup>
        <OptimizeButton
          w={"full"}
          fontSize={"sm"}
          py={2}
          px={4}
          wordBreak={"break-all"}
        />
        <RandomizeButton
          w={"full"}
          fontSize={"sm"}
          py={2}
          px={4}
          wordBreak={"break-all"}
        />
      </ButtonGroup>
    </Stack>
  );
};

export default Buttons;
