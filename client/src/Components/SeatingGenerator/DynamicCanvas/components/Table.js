import { useContext } from "react";
import { Rect, Text, Group } from "react-konva";
import { CanvasStudentsContext } from "../../../../ContextProviders";
import $ from 'jquery';
// import { useStudents } from "../../../../lib/studentsData";

const Table = ({ coord, rowIndex, columnIndex, tableSize, studentId }) => {
  const studentMap = useContext(CanvasStudentsContext);
  const isFilled = Number.isInteger(studentId);
  let name, nameLength, fSize = 0;
  if(isFilled){
    name = studentMap[studentId + 1].first_name + " " + studentMap[studentId + 1].last_name.charAt(0) + ".";
    let nameElement = document.createElement('span');
    nameElement.innerHTML = name; 
    $("body").append(nameElement);
    nameLength = $(nameElement).width();
    fSize = Number(tableSize)*0.9*12/nameLength;
  }  
  return (
    <Group>
      <Rect
        x={coord.x + tableSize * columnIndex}
        y={coord.y + tableSize * rowIndex}
        width={tableSize}
        height={tableSize}
        fill='#c39b77'
        stroke='#9c7c5f'
      />
      <Text
        x={coord.x + tableSize * columnIndex}
        y={coord.y + tableSize * rowIndex}
        width={tableSize}
        height={tableSize}
        padding={5}
        wrap={"char"}
        fontSize={fSize}
        text={isFilled ? name : ""}
      />
    </Group>
  );
};

export default Table;
