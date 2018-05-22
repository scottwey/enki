import React from "react";
import { TextArea, Input } from "@scottwey/alkali-ui";

const elementMapping = { textarea: TextArea, input: Input };

const FieldRenderer = ({
  element,
  name,
  type,
  placeholder,
  onChange,
  onBlur,
  ...rest
}) => {
  const Element = elementMapping[element] || element;
  return (
    <Element
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default FieldRenderer;
