import { Stack, Box, Flex, Text, Button } from "@chakra-ui/react";
import Draggable from "react-draggable";
import { useTables } from "../../lib/tableData";

// import components
import DynamicCanvas from "./DynamicCanvas/DynamicCanvas";
import DynamicCanvasBar from "./DynamicCanvas/DynamicCanvasBar/DynamicCanvasBar";
import SeatingLayout from "./SeatingLayout";

// import "./style.css";

const SeatingGenerator = () => {
  return (
    <Box mb={100}>
      <DynamicCanvasBar />
      <Box
        id='canvas-container'
        boxShadow={"md"}
        w={"full"}
        h={"600px"}
        border={"1px solid"}
        borderColor={"gray.100"}
        borderRadius={"5px"}
        overflow={"hidden"}
        pos={"relative"}
      >
        <DynamicCanvas />
      </Box>

      {/* <SeatingLayout /> */}
    </Box>
  );
};

export default SeatingGenerator;
