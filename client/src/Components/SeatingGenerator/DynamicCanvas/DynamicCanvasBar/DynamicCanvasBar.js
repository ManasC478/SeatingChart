import React, { useState, useContext } from "react";
import {
  Flex,
  Box,
  Text,
  Heading,
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
  Center,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useTables } from "../../../../lib/tableData";

import { AddIcon } from "../../../../styles/icons";

// import components
import RandomizeButton from "./RandomizeButton";
import OptimizeButton from "./OptimizeButton";
import ClearButton from "./ClearButton";
import ClearTablesButton from "./ClearTablesButton";
import AddButton from "./AddButton";
import TablePreview from "./TablePreview";

const DynamicCanvasBar = () => {
  const { tableSize, changeTableSize } = useTables();

  const [tableRows, setTableRows] = useState(1);
  const [tableColumns, setTableColumns] = useState(1);

  return (
    <Box
      as={"section"}
      w={"full"}
      boxShadow={"sm"}
      py={5}
      px={8}
      borderRadius={"5px"}
      mb={"50px"}
      border={"1px solid"}
      borderColor={"gray.100"}
    >
      <Stack spacing={2}>
        <Center>
          <Heading textAlign={"center"} as={"h2"} fontWeight={"thin"} mb={2}>
            Menu
          </Heading>
        </Center>
        <Grid gridTemplateColumns={"50% 50%"} gridColumnGap={0}>
          <Stack spacing={3}>
            <Wrap isInline spacing={2}>
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
            <TablePreview tableRows={tableRows} tableColumns={tableColumns} />
          </Stack>
          <Stack>
            <Wrap justify={"center"} align={"center"}>
              <WrapItem>
                <AddButton
                  w={"full"}
                  fontSize={"sm"}
                  py={2}
                  px={4}
                  tableRows={tableRows}
                  tableColumns={tableColumns}
                />
              </WrapItem>
              <WrapItem>
                <OptimizeButton w={"full"} fontSize={"sm"} py={2} px={4} />
              </WrapItem>
              <WrapItem>
                <RandomizeButton w={"full"} fontSize={"sm"} py={2} px={4} />
              </WrapItem>
              <WrapItem>
                <ClearButton w={"full"} fontSize={"sm"} py={2} px={4} />
              </WrapItem>
              <WrapItem>
                <ClearTablesButton w={"full"} fontSize={"sm"} py={2} px={4} />
              </WrapItem>
            </Wrap>
            <Stack isInline spacing={1}></Stack>
            <Stack isInline spacing={1}></Stack>
          </Stack>
        </Grid>
      </Stack>
    </Box>
  );
};

// const TablePreview = ({ tableRows, tableColumns }) => {
//   const [showPreview, setShowPreview] = useState(false);

//   let tableArr;
//   if (!tableRows || !tableColumns) {
//     tableArr = [];
//   } else {
//     tableArr = Array(tableRows * tableColumns);
//   }

//   return (
//     <Stack spacing={5} align={"center"} w={"200px"} py={5}>
//       <Stack isInline spacing={2} align={"center"}>
//         <Switch
//           defaultIsChecked={showPreview}
//           onChange={() => setShowPreview(!showPreview)}
//           size={"lg"}
//         />
//         <Text>Table Preview</Text>
//       </Stack>
//       <Stack d={showPreview ? "flex" : "none"} spacing={1} align={"center"}>
//         <SimpleGrid columns={tableColumns}>
//           {[...tableArr].map((cell, index) => {
//             return (
//               <Box
//                 border={"1px solid black"}
//                 w={"40px"}
//                 h={"40px"}
//                 key={index}
//               ></Box>
//             );
//           })}
//         </SimpleGrid>
//         <Text d={tableArr.length ? "block" : "none"}>
//           {tableRows} x {tableColumns}
//         </Text>
//       </Stack>
//     </Stack>
//   );
// };

export default DynamicCanvasBar;
