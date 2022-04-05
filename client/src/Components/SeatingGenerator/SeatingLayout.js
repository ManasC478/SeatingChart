import { Box } from "@chakra-ui/react";
import { useTables } from "../../lib/tableData";

import TableGroup from "./TableGroup";

const SeatingLayout = () => {
  const { tableMap } = useTables();
  return (
    <Box
      boxShadow={"md"}
      w={"full"}
      border={"1px solid"}
      borderColor={"gray.100"}
      borderRadius={"5px"}
      h={"600px"}
      pos={"relative"}
      className='seating-layout'
    >
      {Object.keys(tableMap).map((id) => (
        <TableGroup key={id} tableInfo={tableMap[id]} />
      ))}
    </Box>
  );
};

export default SeatingLayout;
