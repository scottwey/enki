import React from "react";
import { TextArea, Input } from "@scottwey/alkali-ui";

const elementMapping = { textarea: TextArea, input: Input };

const FieldRenderer = ({ element, type, placeholder }) => {
  const Element = elementMapping[element] || element;
  return <Element type={type} placeholder={placeholder} />;
};

export default FieldRenderer;
