import React, { useState, useContext } from "react";
import {
  Flex,
  Box,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Stack,
  Divider,
  Button,
  SimpleGrid,
  Grid,
  Switch,
  useToast,
} from "@chakra-ui/react";
import uuid from "react-uuid";
import { useTables } from "../../../../lib/tableData";
// import { useToast } from "@chakra-ui/react";

// import material ui icons
import { AddIcon } from "../../../../styles/icons";

// import css file
import "./style.css";

const DynamicCanvasBar = () => {
  const toast = useToast();
  const { addTable, tableSize, changeTableSize } = useTables();
  // const { setNotifications } = useContext(NotificationsContext);

  const [tableRows, setTableRows] = useState(1);
  const [tableColumns, setTableColumns] = useState(1);
  // const [size, setSize] = useState("50");

  const onAddTable = () => {
    const error = addTable(uuid(), {
      rows: tableRows,
      columns: tableColumns,
      vPosition: "front",
      hPosition: "left",
      students: [],
    });

    if (error) {
      // setNotifications({ type: "danger", message: error });
      toast({
        description: error,
        status: "error",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
    } else {
      // setNotifications({ type: "okay", message: "Table added" });
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
    <Flex
      as={"section"}
      justify={"space-between"}
      align={"center"}
      w={"full"}
      boxShadow={"sm"}
      py={5}
      px={8}
      borderRadius={"5px"}
      mb={"50px"}
      border={"1px solid"}
      borderColor={"gray.100"}
    >
      <Box>
        <Text as={"h2"} fontWeight={"extrabold"} fontSize={"18px"} mb={5}>
          Table Dimensions
        </Text>
        <Stack spacing={2}>
          <Stack isInline spacing={5} align={"center"}>
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
            <Text>Rows</Text>
          </Stack>
          <Stack isInline spacing={5} align={"center"}>
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
            <Text>Columns</Text>
          </Stack>
        </Stack>
      </Box>
      <Divider
        height={100}
        borderColor={"blackAlpha.500"}
        orientation={"vertical"}
        mx={5}
      />
      <Stack spacing={5} align={"center"} justify={"center"}>
        <Stack isInline spacing={5} align={"center"}>
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
          <Text>Table Size</Text>
        </Stack>

        <Button
          leftIcon={<AddIcon fontSize={20} />}
          variant={"solid"}
          size={"md"}
          onClick={onAddTable}
          _hover={{ bg: "gray.600" }}
        >
          Add Table
        </Button>
      </Stack>
      <Divider
        height={100}
        borderColor={"blackAlpha.500"}
        orientation={"vertical"}
        ml={5}
      />
      <TablePreview tableRows={tableRows} tableColumns={tableColumns} />
      {/* <Stack spacing={10} isInline alignItems={"center"}>
      </Stack> */}
    </Flex>
  );
};

const TablePreview = ({ tableRows, tableColumns }) => {
  const [showPreview, setShowPreview] = useState(false);

  let tableArr;
  if (!tableRows || !tableColumns) {
    tableArr = [];
  } else {
    tableArr = Array(tableRows * tableColumns);
  }

  return (
    <Stack spacing={5} align={"center"} w={"200px"} py={5}>
      <Stack isInline spacing={2} align={"center"}>
        <Switch
          defaultIsChecked={showPreview}
          onChange={() => setShowPreview(!showPreview)}
          size={"lg"}
        />
        <Text>Table Preview</Text>
      </Stack>
      <Stack d={showPreview ? "flex" : "none"} spacing={1} align={"center"}>
        <SimpleGrid columns={tableColumns}>
          {[...tableArr].map((cell, index) => {
            return (
              <Box
                border={"1px solid black"}
                w={"40px"}
                h={"40px"}
                key={index}
              ></Box>
            );
          })}
        </SimpleGrid>
        <Text d={tableArr.length ? "block" : "none"}>
          {tableRows} x {tableColumns}
        </Text>
      </Stack>
    </Stack>
  );
};

export default DynamicCanvasBar;
