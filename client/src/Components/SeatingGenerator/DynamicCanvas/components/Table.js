import { Rect } from "react-konva";

const Table = ({ coord, rowIndex, columnIndex }) => {
  return (
    <Rect
      x={coord.x + 50 * columnIndex}
      y={coord.y + 50 * rowIndex}
      width={50}
      height={50}
      fill='red'
      stroke='black'
    />
  );
};

export default Table;
