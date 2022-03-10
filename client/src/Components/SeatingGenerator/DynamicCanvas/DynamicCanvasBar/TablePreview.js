import { useState } from "react";
import {
  Stack,
  Switch,
  Checkbox,
  Text,
  SimpleGrid,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

const TablePreview = ({ tableRows, tableColumns }) => {
  const [showPreview, setShowPreview] = useState(false);

  let tableArr;
  if (!tableRows || !tableColumns) {
    tableArr = [];
  } else {
    tableArr = Array(tableRows * tableColumns);
  }

  return (
    // <Stack spacing={5} align={"center"} w={"200px"} py={5}>
    //   <Stack isInline spacing={2} align={"center"}>
    //     {/* <Switch
    //       defaultIsChecked={showPreview}
    //       onChange={() => setShowPreview(!showPreview)}
    //       size={"lg"}
    //     />
    //     <Text>Table Preview</Text> */}
    //     <Checkbox
    //       isChecked={showPreview}
    //       onChange={(e) => setShowPreview(e.target.checked)}
    //     >
    //       Table Preview
    //     </Checkbox>
    //   </Stack>
    //   <Stack d={showPreview ? "flex" : "none"} spacing={1} align={"center"}>
    //     <SimpleGrid columns={tableColumns}>
    //       {[...tableArr].map((cell, index) => {
    //         return (
    //           <Box
    //             border={"1px solid black"}
    //             w={"40px"}
    //             h={"40px"}
    //             key={index}
    //           ></Box>
    //         );
    //       })}
    //     </SimpleGrid>
    //     <Text d={tableArr.length ? "block" : "none"}>
    //       {tableRows} x {tableColumns}
    //     </Text>
    //   </Stack>
    <Popover
      isOpen={showPreview}
      //   onClose={() => setShowPreview(false)}
      placement='bottom'
    >
      <PopoverTrigger>
        <Checkbox
          isChecked={showPreview}
          onChange={(e) => setShowPreview(e.target.checked)}
        >
          Table Preview
        </Checkbox>
      </PopoverTrigger>
      <PopoverContent w={"auto"} p={5}>
        <PopoverArrow />
        <PopoverBody>
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
        </PopoverBody>
      </PopoverContent>
    </Popover>
    // </Stack>
  );
};

export default TablePreview;
