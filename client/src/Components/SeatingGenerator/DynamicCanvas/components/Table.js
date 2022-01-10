import { Rect } from "react-konva";

const Table = ({ coord, rowIndex, columnIndex, tableSize }) => {
  return (
    <Rect
      x={coord.x + tableSize * columnIndex}
      y={coord.y + tableSize * rowIndex}
      width={tableSize}
      height={tableSize}
      fill='red'
      stroke='black'
    />
  );
};

export default Table;
