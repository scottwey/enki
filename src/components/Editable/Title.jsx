import { Title } from "@scottwey/alkali-ui";
import mixin, { width } from "./mixin";

const EditableTitle = Title.extend`
  ${mixin};
  ${width};
`.withComponent("input");

export default EditableTitle;
