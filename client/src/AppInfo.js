import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
  Heading,
  Text,
  Stack,
  Box,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

const AppInfo = ({ onClose, isOpen }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent p={5}>
        <ModalHeader>
          <Center>
            <Heading fontSize={"3xl"}>Directions</Heading>
          </Center>
        </ModalHeader>
        <ModalBody>
          <Box>
            <OrderedList spacing={3}>
              <ListItem>
                <Text>Add the students by</Text>
                <UnorderedList ml={5}>
                  <ListItem>
                    Creating one student at a time with their name, and
                    (optionally) preferences
                  </ListItem>
                  <Text>or</Text>
                  <ListItem>
                    Uploading a CSV (comma-separated value) file of all the
                    students
                  </ListItem>
                </UnorderedList>
              </ListItem>
              <ListItem>
                <Text>
                  Add the tables by setting the size (rows and columns) of each
                  table and adding it to the classroom, then moving it to the
                  proper place
                </Text>
              </ListItem>
              <ListItem>
                <Text>To create the seating chart</Text>
                <UnorderedList ml={5}>
                  <ListItem>
                    For random seating, click the “Randomize” button
                  </ListItem>
                  <ListItem>
                    For preference-based seating, click the Optimize button
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </OrderedList>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AppInfo;
