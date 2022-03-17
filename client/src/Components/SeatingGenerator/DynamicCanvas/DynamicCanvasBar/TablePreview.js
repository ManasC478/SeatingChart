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
    <Popover
      isOpen={showPreview}
      //   onClose={() => setShowPreview(false)}
      placement='bottom'
      closeOnBlur={false}
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
