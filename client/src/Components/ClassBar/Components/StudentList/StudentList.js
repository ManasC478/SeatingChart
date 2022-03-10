import React, { useState } from "react";
import {
  Box,
  Stack,
  Flex,
  Text,
  Divider,
  IconButton,
  Tooltip,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useStudents } from "../../../../lib/studentsData";
import { DeleteIcon } from "../../../../styles/icons";

import StudentItem from "./StudentItem";

// import css file
// import "./style.css";

const StudentList = () => {
  const { studentMap } = useStudents();

  return (
    <Box
      borderRadius={"5px"}
      boxShadow={"md"}
      p={5}
      border={"1px solid"}
      borderColor={"gray.100"}
    >
      <Flex justify={"space-between"} align={"center"}>
        <Text as={"h2"} fontWeight={"thin"} fontSize={"xl"}>
          Students
        </Text>
        <DeleteAllButton />
      </Flex>
      <Divider mb={5} />
      <Stack>
        {Object.keys(studentMap).map((id, index) => (
          <StudentItem key={index} id={id} />
        ))}
      </Stack>
    </Box>
  );
};

const DeleteAllButton = () => {
  const toast = useToast();
  const { deleteAllStudents } = useStudents();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const handleDeleteAll = () => {
    deleteAllStudents();
    toast({
      description: "Deleted all students.",
      status: "success",
      position: "bottom-right",
      duration: 4000,
      isClosable: true,
    });

    onClose();
  };

  return (
    <Box>
      <Tooltip label='Delete all students'>
        <IconButton
          variant={"ghost"}
          borderRadius={"full"}
          icon={<DeleteIcon fontSize={"xl"} />}
          onClick={() => setIsOpen(true)}
        />
      </Tooltip>
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete All Students
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme='red' onClick={handleDeleteAll} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default StudentList;
