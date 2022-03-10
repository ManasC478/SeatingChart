import { Stack, Box, Heading, Center, Text } from "@chakra-ui/react";
import Draggable from "react-draggable";

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
        border={"1px solid"}
        borderColor={"gray.100"}
        borderRadius={"5px"}
      >
        <DynamicCanvas />
      </Box>

      {/* <SeatingLayout /> */}
    </Box>
  );
};

export default SeatingGenerator;
