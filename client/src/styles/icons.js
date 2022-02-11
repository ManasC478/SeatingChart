import {
  MdAddCircleOutline,
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
  MdOutlineDone,
  MdOutlineClear,
  MdOutlineInfo,
  MdOutlineMoreVert,
  MdOutlineModeEditOutline,
  MdOutlineDeleteForever,
} from "react-icons/md";
import { Icon } from "@chakra-ui/icons";

export const AddIcon = (props) => <Icon {...props} as={MdAddCircleOutline} />;
export const DownArrowIcon = (props) => (
  <Icon {...props} as={MdKeyboardArrowDown} />
);
export const RightArrowIcon = (props) => (
  <Icon {...props} as={MdKeyboardArrowRight} />
);
export const CheckIcon = (props) => <Icon {...props} as={MdOutlineDone} />;
export const ClearIcon = (props) => <Icon {...props} as={MdOutlineClear} />;
export const InfoIcon = (props) => <Icon {...props} as={MdOutlineInfo} />;
export const MoreVertIcon = (props) => (
  <Icon {...props} as={MdOutlineMoreVert} />
);
export const EditIcon = (props) => (
  <Icon {...props} as={MdOutlineModeEditOutline} />
);
export const DeleteIcon = (props) => (
  <Icon {...props} as={MdOutlineDeleteForever} />
);
