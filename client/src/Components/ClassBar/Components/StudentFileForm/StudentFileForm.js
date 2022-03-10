import React, { useState, useContext } from "react";
import { CSVReader } from "react-papaparse";
import { useStudents } from "../../../../lib/studentsData";
import {
  useToast,
  Box,
  Text,
  Heading,
  IconButton,
  Stack,
  Center,
  Icon,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";

// import { NotificationsContext } from "../../../../ContextProviders";

// material ui icons
import { InfoIcon, FileUploadIcon } from "../../../../styles/icons";

// import css file
import "./style.css";

const StudentFileForm = () => {
  const toast = useToast();
  const { addStudentWithCSV } = useStudents();
  // const { setNotifications } = useContext(NotificationsContext);
  const [openInfo, setOpenInfo] = useState(false);

  const handleOnDrop = (data) => {
    let studentMap = {};
    console.log(data);
    try {
      data.forEach(({ data, errors }) => {
        if (errors.length > 0) {
          throw errors;
        }
        if (isNaN(data[0])) {
          throw "Invalid CSV file. Please check for unnecessary spaces or values.";
        }

        const [
          id,
          first_name,
          last_name,
          vPosition,
          hPosition,
          preferred1,
          preferred2,
          notPreferred1,
          notPreferred2,
        ] = data;

        studentMap[parseInt(id)] = {
          first_name,
          last_name,
          vPosition: vPosition || null,
          hPosition: hPosition || null,
          preferredPartners: [parseInt(preferred1), parseInt(preferred2)],
          notPreferredPartners: [
            parseInt(notPreferred1),
            parseInt(notPreferred2),
          ],
        };
      });

      addStudentWithCSV(studentMap);
      // setNotifications({
      //   type: "okay",
      //   message: "Successfully added students from csv file",
      // });
      toast({
        title: "Uploaded csv file.",
        description: "Successfully added students from csv file.",
        status: "success",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      // setNotifications({ type: "danger", message: error });
      toast({
        title: "Error.",
        description: error,
        status: "error",
        position: "bottom-right",
        duration: 4000,
        isClosable: true,
      });
    }
    console.log("---------------------------");
    console.log(data);
    console.log("---------------------------");
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(file);
    console.log(inputElem);
    console.log(reason);
    console.log(err);
  };

  // const handleOnRemoveFile = (data) => {
  //     console.log('---------------------------')
  //     console.log(data)
  //     console.log('---------------------------')
  // }
  return (
    // <section className='student-file-form'>
    //   <div className='title-info'>
    //     <h1>Add CSV File</h1>
    //     <button
    //       className='upload-csv-info'
    //       onClick={() => setOpenInfo(!openInfo)}
    //     >
    //       <InfoIcon />
    //     </button>
    //     <div
    //       className='upload-csv-info-popup'
    //       style={openInfo ? { display: "block" } : { display: "none" }}
    //     >
    //       <h3>Valid CSV File</h3>
    //       <div>
    //         <h4>Column Names</h4>
    //         <ol>
    //           <li>
    //             <h5>Student ID</h5>
    //             <ul>
    //               <li>A unique number for the student</li>
    //             </ul>
    //           </li>
    //           <li>
    //             <h5>First Name</h5>
    //             <ul>
    //               <li>Student's first name</li>
    //               <li>If student has middle, then add the middle initial</li>
    //             </ul>
    //           </li>
    //           <li>
    //             <h5>Last Name</h5>
    //             <ul>
    //               <li>Student's last name</li>
    //             </ul>
    //           </li>
    //           <li>
    //             <h5>Location</h5>
    //             <ul>
    //               <li>Students seating preference: front or back</li>
    //               <li>Front = 1</li>
    //               <li>Back = 0</li>
    //             </ul>
    //           </li>
    //           <li>
    //             <h5>Preferred</h5>
    //             <ul>
    //               <li>Students the student wants to sit next to</li>
    //               <li>
    //                 Add a list with the student's unique ID. e.g. [2, 3] with 2
    //                 and 3 being the IDs
    //               </li>
    //             </ul>
    //           </li>
    //           <li>
    //             <h5>Not Preferred</h5>
    //             <ul>
    //               <li>Students the student does not want to sit next to</li>
    //               <li>
    //                 Add a list with the student's unique ID. e.g. [2, 3] with 2
    //                 and 3 being the IDs
    //               </li>
    //             </ul>
    //           </li>
    //         </ol>
    //       </div>
    //     </div>
    //   </div>
    //   <div className='file-drop-box'>
    //     <CSVReader
    //       onDrop={handleOnDrop}
    //       onError={handleOnError}
    //       addRemoveButton
    //       removeButtonColor='#659cef'
    //       // onRemoveFile={handleOnRemoveFile}
    //     >
    //       <span>Drop CSV file here or click to upload.</span>
    //     </CSVReader>
    //   </div>
    // </section>
    <Box
      boxShadow={"md"}
      border={"1px solid"}
      borderColor={"gray.100"}
      borderRadius={"5px"}
      py={"10px"}
      px={"20px"}
    >
      <Stack spacing={2}>
        <Flex justify={"space-between"} align={"center"}>
          <Heading fontWeight={"thin"} fontSize={"xl"}>
            Add CSV File
          </Heading>
          <InfoButton>
            <IconButton
              aria-label='CSV Info'
              isRound
              bg={"none"}
              icon={<InfoIcon boxSize={6} />}
            />
          </InfoButton>
        </Flex>
        <Box>
          <CSVReader
            onDrop={handleOnDrop}
            onError={handleOnError}
            addRemoveButton
            removeButtonColor='#659cef'
            // onRemoveFile={handleOnRemoveFile}
          >
            <Stack spacing={1} color={"gray.500"}>
              <Text>Drag and drop or upload</Text>
              <Center>
                <FileUploadIcon boxSize={6} />
              </Center>
            </Stack>
          </CSVReader>
        </Box>
      </Stack>
    </Box>
  );
};

const InfoButton = ({ children }) => (
  <Popover>
    <PopoverTrigger>{children}</PopoverTrigger>
    <PopoverContent>
      <PopoverArrow />
      <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
    </PopoverContent>
  </Popover>
);

export default StudentFileForm;
