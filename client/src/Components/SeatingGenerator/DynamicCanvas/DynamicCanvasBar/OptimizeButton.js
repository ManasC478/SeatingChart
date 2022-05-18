import { useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { validateRandomization } from "../../../../utils";
import { useStudents } from "../../../../lib/studentsData";
import { useTables } from "../../../../lib/tableData";
import { optimizeSeats } from "../../../../api/algorithm";

const RandomizeButton = ({ disableButtons, undisableButtons, ...rest }) => {
  const { studentMap, size } = useStudents();
  const { tableMap, totalTables, setTables } = useTables();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  // function calls the api to randomize seats
  const handleOptimizeSeats = async () => {
    setLoading(true);
    disableButtons();
    try {
      //   validate the api body
      validateRandomization(size, totalTables);
      //   call api
      const res = await optimizeSeats(studentMap, tableMap);

      if (res.status >= 400) {
        throw { status: 500, message: "Failed to randomize seats" };
      }
      setTables(res.data.studentList);
    } catch (error) {
      console.log(
        `/components/SeatingGenerator/DynamicCanvas/DynamicCanvasBar/OptimizeButton: ${error.message}`
      );
      if (error.status >= 500) {
        toast({
          title: "500 server error",
          description: "Please try again later.",
          status: "error",
          position: "bottom-right",
          duration: 4000,
          isClosable: true,
        });
      } else {
        toast({
          description: error.message,
          status: "error",
          position: "bottom-right",
          duration: 4000,
          isClosable: true,
        });
      }
    }
    undisableButtons();
    setLoading(false);
  };
  return (
    <Button
      variant={"ghost"}
      size={"md"}
      onClick={handleOptimizeSeats}
      isLoading={loading}
      w={"full"}
      bg={"black"}
      color={"white"}
      _hover={{ bg: "gray.600" }}
      {...rest}
    >
      Optimize
    </Button>
  );
};

export default RandomizeButton;
