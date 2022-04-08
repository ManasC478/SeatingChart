import { useContext } from "react";
import { Rect, Text, Group } from "react-konva";
import { CanvasStudentsContext } from "../../../../ContextProviders";
import $ from "jquery";

const Table = ({ coord, rowIndex, columnIndex, tableSize, studentId }) => {
  const studentMap = useContext(CanvasStudentsContext);
  const isFilled = studentId != null;
  let name, nameLength, fSize, letters;
  if (isFilled) {
    let needsLastName = false;
    Object.values(studentMap).forEach((student) => {
      if (student !== undefined) {
        if (student.last_name !== studentMap[studentId].last_name) {
          if (student.first_name === studentMap[studentId].first_name) {
            needsLastName = true;
          }
        }
      }
    });
    letters = studentMap[studentId].first_name.trim().length;
    name =
      studentMap[studentId].first_name.trim() +
      (needsLastName
        ? " " + studentMap[studentId].last_name.trim().charAt(0) + "."
        : "");
    let nameElement = document.createElement("span");
    nameElement.innerHTML = name;
    $("body").append(nameElement);
    nameLength = $(nameElement).width();
    nameElement.remove();
    if (letters <= 4) fSize = 15;
    else fSize = (Number(tableSize) * 0.9 * 13) / nameLength;
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
        align='center'
        verticalAlign='middle'
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
