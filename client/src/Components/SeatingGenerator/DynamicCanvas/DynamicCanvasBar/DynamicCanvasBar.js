import React, { useState } from "react";
import { Box, Heading, Stack, Grid, Center } from "@chakra-ui/react";

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

export default DynamicCanvasBar;
