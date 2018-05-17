import { Text } from "@scottwey/alkali-ui";
import mixin, { width } from "./mixin";

const EditableText = Text.extend`
  ${mixin};
  ${width};
`.withComponent("input");

export default EditableText;
