import { Rect, Text, Group } from "react-konva";

const Table = ({ coord, rowIndex, columnIndex, tableSize }) => {
  return (
    <Group>
      <Rect
        x={coord.x + tableSize * columnIndex}
        y={coord.y + tableSize * rowIndex}
        width={tableSize}
        height={tableSize}
        fill='red'
        stroke='black'
      />
      <Text width={tableSize} height={tableSize} padding={5} wrap={"char"} />
    </Group>
  );
};

export default Table;
