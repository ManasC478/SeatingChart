import { useRef, useState } from "react";
import {
  Box,
  Text,
  Flex,
  IconButton,
  Icon,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Stack,
  Select,
  useToast,
  Tooltip,
} from "@chakra-ui/react";
import _ from "lodash";
import { useStudents } from "../../../../lib/studentsData";
import { useTables } from "../../../../lib/tableData";

// import material ui icons
import {
  MoreVertIcon,
  EditIcon,
  DeleteIcon,
  ClearIcon,
  DownArrowIcon,
  DismissIcon,
} from "../../../../styles/icons";

const StudentItem = ({ id }) => {
  const { studentMap } = useStudents();
  const student = studentMap[id];
  // const [dismissed, setDismissed] = useState(student.dismissed);
  // console.log(dismissed);

  return (
    <Box>
      <Flex justify={"space-between"} align={"center"}>
        <Text>
          {student.first_name} {student.last_name}
        </Text>
        <Stack isInline spacing={0}>
          {/* <DismissButton setDismiss={() => setDismissed(!dismissed)} /> */}
          <EditButton student={student} id={id} />
          <DeleteButton id={id} />
        </Stack>
      </Flex>
      {/* <Box
        pos={"absolute"}
        w={"full"}
        h={"full"}
        bg={dismissed && "rgba(0,0,0,0.5"}
      ></Box> */}
    </Box>
  );
};

// const DismissButton = ({ setDismiss }) => {
//   return (
//     <Tooltip label='Dismiss student. This student will be dismissed from the seating chart.'>
//       <IconButton
//         onClick={setDismiss}
//         variant={"ghost"}
//         isRound
//         icon={<DismissIcon fontSize={"xl"} />}
//       />
//     </Tooltip>
//   );
// };

const EditButton = ({ student, id }) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement='right'
    >
      <PopoverTrigger>
        <IconButton
          variant={"ghost"}
          borderRadius={"full"}
          icon={<EditIcon fontSize={"xl"} />}
        />
      </PopoverTrigger>
      <PopoverContent p={5}>
        <PopoverArrow />
        <PopoverCloseButton />
        <EditForm student={student} id={id} onClose={onClose} />
      </PopoverContent>
    </Popover>
  );
};

const hasStudentDataChanged = (initialData, modifiedData) => {
  return _.isEqual(initialData, modifiedData);
};

const EditForm = ({ student, id, onClose }) => {
  const { updateStudent } = useStudents();
  const toast = useToast();
  const [editData, setEditData] = useState(student);

  const handleEdit = () => {
    updateStudent(id, editData);
    toast({
      description: "Updated student.",
      status: "success",
      position: "bottom-right",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Stack spacing={2}>
      <FormControl>
        <FormLabel fontWeight={"normal"}>First and last name</FormLabel>
        <Stack isInline spacing={2}>
          <Input
            value={editData.first_name}
            onChange={(e) =>
              setEditData({ ...editData, first_name: e.target.value })
            }
            placeholder={"First name..."}
          />
          <Input
            value={editData.last_name}
            onChange={(e) =>
              setEditData({ ...editData, last_name: e.target.value })
            }
            placeholder={"Last name..."}
          />
        </Stack>
        <FormErrorMessage>Error message</FormErrorMessage>
      </FormControl>
      <FormControl>
        <FormLabel fontWeight={"normal"}>Location</FormLabel>
        <Stack isInline spacing={2}>
          <Select
            icon={<DownArrowIcon />}
            onChange={(e) =>
              setEditData({ ...editData, vPosition: e.target.value })
            }
            value={editData.vPosition || ""}
            size='md'
          >
            <option value='front'>Front</option>
            <option value='middle'>Middle</option>
            <option value='back'>Back</option>
          </Select>
          <FormErrorMessage>Error message</FormErrorMessage>
          <Select
            icon={<DownArrowIcon />}
            onChange={(e) =>
              setEditData({ ...editData, hPosition: e.target.value })
            }
            value={editData.hPosition || ""}
            size='md'
          >
            <option value='left'>Left</option>
            <option value='middle'>Middle</option>
            <option value='right'>Right</option>
          </Select>
        </Stack>
        <FormErrorMessage>Error message</FormErrorMessage>
      </FormControl>
      <ButtonGroup d='flex' justifyContent='flex-end' mt={5}>
        <Button variant='outline' onClick={onClose}>
          Cancel
        </Button>
        <Button
          isDisabled={hasStudentDataChanged(student, editData)}
          bg={"black"}
          _hover={{ bg: "gray.600" }}
          color={"white"}
          onClick={handleEdit}
        >
          Save
        </Button>
      </ButtonGroup>
    </Stack>
  );
};

const DeleteButton = ({ id }) => {
  const toast = useToast();
  const { deleteStudent } = useStudents();
  const { setReassignTables, clearTableStudents, deleteStudentFromTable } =
    useTables();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  const handleDelete = () => {
    // setReassignTables(true);
    // clearTableStudents();
    deleteStudentFromTable(id);
    deleteStudent(id);
    toast({
      description: "Deleted student.",
      status: "success",
      position: "bottom-right",
      duration: 4000,
      isClosable: true,
    });

    onClose();
  };

  return (
    <Box>
      <IconButton
        variant={"ghost"}
        borderRadius={"full"}
        icon={<DeleteIcon fontSize={"xl"} />}
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog isOpen={isOpen} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Student
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={onClose}>Cancel</Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default StudentItem;
