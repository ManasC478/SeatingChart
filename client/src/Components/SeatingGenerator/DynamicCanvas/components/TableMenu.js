import { Group, Text } from "react-konva";

const TableMenu = () => {
  return (
    <Group>
      <Text
        x={10}
        y={50}
        fontFamily={"FontAwesome"}
        text={"\uf2ed"}
        fill='black'
      />
    </Group>
  );
};

export default TableMenu;
