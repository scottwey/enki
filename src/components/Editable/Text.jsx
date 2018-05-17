import { Text } from "@scottwey/alkali-ui";
import mixin from "./mixin";

const EditableText = Text.extend`
  ${mixin};
`.withComponent("input");

export default EditableText;
