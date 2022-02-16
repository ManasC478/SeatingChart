import { Stack, Box, Heading, Center } from "@chakra-ui/react";

// import components
import DynamicCanvas from "./DynamicCanvas/DynamicCanvas";
import DynamicCanvasBar from "./DynamicCanvas/DynamicCanvasBar/DynamicCanvasBar";

import "./style.css";

const SeatingGenerator = () => {
  return (
    <main className='seating-generator'>
      <div className='generator'>
        <DynamicCanvasBar />
        <Stack spacing={3}>
          <Center
            w={"full"}
            py={5}
            boxShadow={"md"}
            border={"1px solid"}
            borderColor={"gray.100"}
            borderRadius={"5px"}
          >
            <Heading>Front</Heading>
          </Center>
          <Box
            id='canvas-container'
            boxShadow={"md"}
            w={"full"}
            border={"1px solid"}
            borderColor={"gray.100"}
            borderRadius={"5px"}
          >
            <DynamicCanvas />
          </Box>
        </Stack>
      </div>
    </main>
  );
};

export default SeatingGenerator;
