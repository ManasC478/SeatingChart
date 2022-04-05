import { useTables } from "../../../../lib/tableData";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Wrap,
  Stack,
  Text,
} from "@chakra-ui/react";

const TableInput = ({
  tableRows,
  tableColumns,
  setTableRows,
  setTableColumns,
}) => {
  const { tableSize, changeTableSize } = useTables();

  return (
    <Wrap spacing={2}>
      <Stack spacing={0}>
        <Text>Rows</Text>
        <NumberInput
          w={"100px"}
          defaultValue={1}
          max={5}
          min={1}
          value={tableRows}
          onChange={(value) => {
            setTableRows(parseInt(value) || "");
          }}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Stack>
      <Stack spacing={0}>
        <Text>Columns</Text>
        <NumberInput
          w={"100px"}
          defaultValue={1}
          max={5}
          min={1}
          value={tableColumns}
          onChange={(value) => setTableColumns(parseInt(value) || "")}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Stack>
      <Stack spacing={0}>
        <Text>Table Size</Text>
        <NumberInput
          w={"100px"}
          defaultValue={50}
          max={100}
          min={50}
          value={tableSize}
          onChange={(value) => changeTableSize(value)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Stack>
    </Wrap>
  );
};

export default TableInput;
