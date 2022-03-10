import { Box, Button, Flex, IconButton, Text } from "@chakra-ui/react";

const Table = ({ tableSize, name }) => {
  return (
    <Box border={"1px solid#9c7c5f"} w={`${tableSize}px`} h={`${tableSize}px`}>
      <Text>{name}</Text>
    </Box>
  );
};

export default Table;
