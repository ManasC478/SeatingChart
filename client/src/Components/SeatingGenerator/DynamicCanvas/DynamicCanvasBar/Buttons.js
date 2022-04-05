import { useState } from "react";
import { ButtonGroup, Stack } from "@chakra-ui/react";
import RandomizeButton from "./RandomizeButton";
import OptimizeButton from "./OptimizeButton";
import ClearStudentsButton from "./ClearStudentsButton";
import ClearTablesButton from "./ClearTablesButton";
import AddButton from "./AddButton";

const Buttons = ({ tableRows, tableColumns }) => {
  const [disableButtons, setDisableButtons] = useState(false);
  return (
    <Stack spacing={2}>
      <ButtonGroup justify={"center"} align={"center"}>
        <AddButton
          w={"full"}
          fontSize={"sm"}
          py={2}
          px={4}
          wordBreak={"break-all"}
          isDisabled={disableButtons}
          tableRows={tableRows}
          tableColumns={tableColumns}
        />
        <ClearStudentsButton
          w={"full"}
          fontSize={"sm"}
          py={2}
          px={4}
          wordBreak={"break-all"}
          isDisabled={disableButtons}
        />
        <ClearTablesButton
          w={"full"}
          fontSize={"sm"}
          py={2}
          px={4}
          wordBreak={"break-all"}
          isDisabled={disableButtons}
        />
      </ButtonGroup>
      <ButtonGroup>
        <OptimizeButton
          w={"full"}
          fontSize={"sm"}
          py={2}
          px={4}
          wordBreak={"break-all"}
          isDisabled={disableButtons}
          disableButtons={() => setDisableButtons(true)}
          undisableButtons={() => setDisableButtons(false)}
        />
        <RandomizeButton
          w={"full"}
          fontSize={"sm"}
          py={2}
          px={4}
          wordBreak={"break-all"}
          isDisabled={disableButtons}
          disableButtons={() => setDisableButtons(true)}
          undisableButtons={() => setDisableButtons(false)}
        />
      </ButtonGroup>
    </Stack>
  );
};

export default Buttons;
