import { useState, useRef, useEffect } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  Button,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import Draggable from "react-draggable";
import { useTables } from "../../lib/tableData";
import { useStudents } from "../../lib/studentsData";
import { DeleteIcon, EditIcon } from "../../styles/icons";

import Table from "./Table";

const TableGroup = ({ tableInfo }) => {
  const { tableSize } = useTables();
  const { studentMap } = useStudents();
  const [showOptions, setShowOptions] = useState(false);

  const tables = new Array(tableInfo.rows * tableInfo.columns);

  const getStudentName = (index) => {
    const studentId = tableInfo.students[index];

    if (Number.isInteger(studentId)) {
      return `${studentMap[studentId + 1].first_name} ${studentMap[
        studentId + 1
      ].last_name.charAt(0)}.`;
    } else {
      return "";
    }
  };

  console.log(document.querySelector(".seating-layout"));

  return (
    <Box>
      <Draggable
        //   handle='.drag'
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        bounds='parent'
        offsetParent={document.querySelector(".seating-layout")}
        // grid={[25, 25]}
        // scale={1}
        // onStart={this.handleStart}
        // onDrag={this.handleDrag}
        // onStop={this.handleStop}
      >
        <button
          onClick={() => {
            console.log("clicked");
            setShowOptions(true);
          }}
        >
          <SimpleGrid
            columns={tableInfo.columns}
            w={`${tableInfo.columns * tableSize}px`}
            bg={"#c39b77"}
          >
            {/* <button
          onClick={() => {
            console.log("clicked");
            setShowOptions(true);
          }}
        > */}
            {[...tables].map((table, index) => {
              const studentName = getStudentName(index);
              return (
                <Table
                  //   className='drag'
                  key={index}
                  tableSize={tableSize}
                  name={studentName}
                />
              );
            })}
            {/* </button> */}
          </SimpleGrid>
        </button>
      </Draggable>
      <OptionsBar
        show={showOptions}
        onClickOutside={() => {
          setShowOptions(false);
        }}
      />
    </Box>
  );
};

const OptionsBar = ({ show, onClickOutside }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);
  return (
    <Flex
      //   d={show ? "flex" : "none"}
      pos={"absolute"}
      ref={ref}
      top={"-50px"}
      left={0}
    >
      <IconButton icon={<EditIcon />} />
      <IconButton icon={<DeleteIcon />} />
    </Flex>
  );
};

export default TableGroup;
