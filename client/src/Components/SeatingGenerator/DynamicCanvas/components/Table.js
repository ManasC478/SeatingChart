import { useContext } from "react";
import { Rect, Text, Group } from "react-konva";
import { CanvasStudentsContext } from "../../../../ContextProviders";
// import { useStudents } from "../../../../lib/studentsData";

const Table = ({ coord, rowIndex, columnIndex, tableSize, studentId }) => {
  const studentMap = useContext(CanvasStudentsContext);

  return (
    <Group>
      <Rect
        x={coord.x + tableSize * columnIndex}
        y={coord.y + tableSize * rowIndex}
        width={tableSize}
        height={tableSize}
        fill='#c39b77'
        stroke='#9c7c5f'
        // cornerRadius='5'
      />
      <Text
        x={coord.x + tableSize * columnIndex}
        y={coord.y + tableSize * rowIndex}
        width={tableSize}
        height={tableSize}
        padding={5}
        wrap={"char"}
        text={
          Number.isInteger(studentId)
            ? `${studentMap[studentId + 1].first_name} ${studentMap[
                studentId + 1
              ].last_name.charAt(0)}.`
            : ""
        }
      />
    </Group>
  );
};

export default Table;
