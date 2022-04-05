import { Box } from "@chakra-ui/react";

// import components
import DynamicCanvas from "./DynamicCanvas/DynamicCanvas";
import DynamicCanvasBar from "./DynamicCanvas/DynamicCanvasBar/DynamicCanvasBar";

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
    </Box>
  );
};

export default SeatingGenerator;
