import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Center,
  Heading,
  Text,
  Box,
  ListItem,
  OrderedList,
  UnorderedList,
} from "@chakra-ui/react";

const AppInfo = ({ onClose, isOpen }) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent p={5} w={"600px"}>
        <ModalHeader>
          <Center>
            <Heading fontSize={"3xl"}>Instructions</Heading>
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
                  <Text style={{textAlign: "center", transform: `translateX(-30px)`}}>OR</Text>
                  <ListItem>
                    Uploading a .csv file (comma-separated value) of all the students
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
                    For preference-based seating, click the "Optimize" button
                  </ListItem>
                  <ListItem>
                    For random seating, click the “Randomize” button
                  </ListItem>
                </UnorderedList>
              </ListItem>
              <ListItem>
                <Text>Save the seating chart by</Text>
                <UnorderedList ml={5}>
                  <ListItem>
                    Right clicking the seating chart and selecting “Save image as...”
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
