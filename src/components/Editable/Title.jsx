import { Title } from "@scottwey/alkali-ui";
import mixin from "./mixin";

const EditableTitle = Title.extend`
  ${mixin};
`.withComponent("input");

export default EditableTitle;
