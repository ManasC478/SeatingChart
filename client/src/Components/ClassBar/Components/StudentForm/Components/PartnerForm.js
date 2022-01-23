import React, { useState, useEffect, useContext } from "react";
import { useStudents } from "../../../../../lib/studentsData";
import { useToast } from "@chakra-ui/react";

// import icons
import {
  AddIcon,
  DownArrowIcon,
  RightArrowIcon,
  CheckIcon,
  ClearIcon,
} from "../../../../../styles/icons";

// import components
// import { NotificationsContext } from "../../../../../ContextProviders";

// import css file
import "./style.css";

const PartnerForm = () => {
  const { student, studentMap } = useStudents();
  //  set state variables
  const [preferredPartnerList, setPreferredPartnerList] = useState({});
  const [notPreferredPartnerList, setNotPreferredPartnerList] = useState({});
  const [studentPartnerResults, setStudentPartnerResults] = useState({});

  useEffect(() => {
    setPreferredPartnerList({});
    setNotPreferredPartnerList({});

    const copyStudentList = () => {
      let tempStudentObj = {};
      Object.keys(studentMap).forEach((id) => {
        const { first_name, last_name } = studentMap[id];
        tempStudentObj[id] = {
          name: `${first_name} ${last_name.slice(0, 1)}.`,
          selected: false,
        };
      });
      setStudentPartnerResults(tempStudentObj);
    };

    copyStudentList();
  }, [studentMap]);

  return (
    <div className='form-partners'>
      {/* preferred partner ui - add, see list, delete */}
      <div className='preferred'>
        <PartnerSearch
          isPreferredStudents={true}
          studentPartnerResults={studentPartnerResults}
          setStudentPartnerResults={setStudentPartnerResults}
          partnerList={preferredPartnerList}
          setPartnerList={setPreferredPartnerList}
        />
        <ul className='partner-preferred-list'>
          {Object.keys(preferredPartnerList).map((id, index) => {
            const { name } = studentPartnerResults[id];
            return (
              <li key={index} className='partner-item'>
                <p>{name}</p>
                <button
                  type='button'
                  onClick={() => {
                    delete preferredPartnerList[id];
                    setStudentPartnerResults({
                      ...studentPartnerResults,
                      [id]: { name: name, checked: false },
                    });
                    delete student.preferredPartners[id];
                  }}
                >
                  <ClearIcon fontSize={"inherit"} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      {/* not preferred partner ui - add, see list , delete */}
      <div className='not-preferred'>
        <PartnerSearch
          isPreferredStudents={false}
          studentPartnerResults={studentPartnerResults}
          setStudentPartnerResults={setStudentPartnerResults}
          partnerList={notPreferredPartnerList}
          setPartnerList={setNotPreferredPartnerList}
        />
        <ul className='partner-not-preferred-list'>
          {Object.keys(notPreferredPartnerList).map((id, index) => {
            const { name } = studentPartnerResults[id];

            return (
              <li key={index} className='partner-item'>
                <p>{name}</p>
                <button
                  type='button'
                  onClick={() => {
                    delete notPreferredPartnerList[id];
                    setStudentPartnerResults({
                      ...studentPartnerResults,
                      [id]: { name: name, checked: false },
                    });
                    delete student.notPreferredPartners[id];
                  }}
                >
                  <ClearIcon fontSize={"inherit"} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

const PartnerSearch = ({
  studentPartnerResults,
  setStudentPartnerResults,
  isPreferredStudents,
  partnerList,
  setPartnerList,
}) => {
  const toast = useToast();
  const { student, updatePreferredPartners, updateNotPreferredPartners } =
    useStudents();
  // const { setNotifications } = useContext(NotificationsContext);
  const [displayResult, setDisplayResults] = useState(false);
  const maxPartners = 2;

  return (
    <div className='partner-search'>
      <div className='partner-input'>
        <h3>{isPreferredStudents ? "Preferred" : "Not Preferred"} Students</h3>
        <button type='button' onClick={() => setDisplayResults(!displayResult)}>
          {displayResult ? (
            <DownArrowIcon fontSize={"inherit"} />
          ) : (
            <RightArrowIcon fontSize={"inherit"} />
          )}
        </button>
      </div>
      <div
        className='partner-search-results'
        style={displayResult ? { display: "block" } : { display: "none" }}
      >
        {Object.keys(studentPartnerResults).length === 0 ? (
          <p>No Student Added</p>
        ) : (
          Object.keys(studentPartnerResults).map((id, index) => {
            // const resultStudent = studentList[id];
            const { name, checked } = studentPartnerResults[id];
            // const setStd = isPreferredStudents ? { ...student, preferredPartners: { ...student.preferredPartners, [id]: studentList[id] } } : { ...student, notPreferredPartners: { ...student.notPreferredPartners, [id]: studentList[id] } };
            // const setStd = isPreferredStudents
            //   ? [...student.preferredPartners, id]
            //   : [...student.notPreferredPartners, id];
            // const setStd = isPreferredStudents
            //   ? {
            //       ...student,
            //       preferredPartners: [...student.preferredPartners, id],
            //     }
            //   : {
            //       ...student,
            //       notPreferredPartners: [...student.notPreferredPartners, id],
            //     };
            return (
              <div
                key={index}
                className='partner-search-item'
                style={checked ? { opacity: 0.6 } : { opacity: 1 }}
              >
                <p>
                  {id} - {name}
                </p>
                <button
                  type='button'
                  disabled={!checked ? false : true}
                  onClick={() => {
                    if (Object.keys(partnerList).length >= maxPartners) {
                      // setNotifications({
                      //   type: "danger",
                      //   message: `Max partner preferences is ${maxPartners}`,
                      // });
                      toast({
                        description: `Max partner preferences is ${maxPartners}.`,
                        status: "error",
                        position: "bottom-right",
                        duration: 4000,
                        isClosable: true,
                      });
                    } else {
                      setPartnerList({
                        ...partnerList,
                        [id]: studentPartnerResults[id],
                      });
                      setStudentPartnerResults({
                        ...studentPartnerResults,
                        [id]: { name: name, checked: true },
                      });
                      if (isPreferredStudents) {
                        updatePreferredPartners(id);
                      } else {
                        updateNotPreferredPartners(id);
                      }
                    }
                  }}
                >
                  {checked ? <CheckIcon /> : <AddIcon />}
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PartnerForm;
