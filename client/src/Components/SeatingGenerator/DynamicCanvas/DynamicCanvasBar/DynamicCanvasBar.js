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
import Buttons from "./Buttons";
import TablePreview from "./TablePreview";
import TableInput from "./TableInput";

const DynamicCanvasBar = () => {
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
        <Grid gridTemplateColumns={"50% 50%"} gridColumnGap={5}>
          <Stack spacing={3}>
            <TableInput
              tableRows={tableRows}
              tableColumns={tableColumns}
              setTableRows={setTableRows}
              setTableColumns={setTableColumns}
            />
            <TablePreview tableRows={tableRows} tableColumns={tableColumns} />
          </Stack>
          <Buttons tableRows={tableRows} tableColumns={tableColumns} />
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
