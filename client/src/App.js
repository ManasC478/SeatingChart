import React, { useEffect } from "react";
import {
  Grid,
  Center,
  Heading,
  Stack,
  useDisclosure,
  Text,
  Link,
  Box,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";

import ClassBar from "./Components/ClassBar/ClassBar";
import SeatingGenerator from "./Components/SeatingGenerator/SeatingGenerator";
import AppInfo from "./AppInfo";
import { TableProvider } from "./lib/tableData";
import { StudentsProvider } from "./lib/studentsData";
import { OpenDirectionsIcon } from "./styles/icons";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    const openInfoModal = setTimeout(() => {
      onOpen();
    }, 3000);

    return () => {
      clearTimeout(openInfoModal);
    };
  }, [onOpen]);

  return (
    <Box pos={"relative"}>
      <Stack spacing={14} minW={1000} maxW={1200} mx={"auto"} my={10}>
        <Stack spacing={2}>
          <Center>
            <Heading>Ideal Seating Chart Generator</Heading>
          </Center>
          <Center>
            <Box w={"600px"}>
              <Text textAlign={"center"}>
                A collaboration between{" "}
                <Link
                  color='blue.400'
                  href='https://github.com/ManasC478'
                  isExternal
                >
                  ManasC478
                </Link>{" "}
                and{" "}
                <Link
                  color='blue.400'
                  href='https://github.com/Kefir101'
                  isExternal
                >
                  Kefir101
                </Link>{" "}
                to make a free, easy-to-use, seating chart generator and
                eliminate the arduous manual seating charts.
              </Text>
            </Box>
          </Center>
        </Stack>
        <Grid templateColumns={"300px minmax(0,1fr)"} gap={10}>
          <TableProvider>
            <StudentsProvider>
              <ClassBar />
              <SeatingGenerator />
            </StudentsProvider>
          </TableProvider>
          <AppInfo isOpen={isOpen} onClose={onClose} />
        </Grid>
      </Stack>
      <Tooltip label='Instructions'>
        <IconButton
          aria-label='Instructions'
          width='75px'
          height='75px'
          variant='outline'
          bg={"yellow.600"}
          color={"white"}
          pos={"fixed"}
          top={5}
          right={5}
          icon={<OpenDirectionsIcon boxSize='9' />}
          isRound
          onClick={onOpen}
          _hover={{ bg: "yellow.700" }}
        />
      </Tooltip>
    </Box>
  );
}

export default App;
