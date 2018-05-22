import React from "react";
import { Flex } from "grid-styled";
import FormEditor from "containers/FormEditor";
import FormRenderer from "containers/FormRenderer";
import ComponentAdder from "containers/ComponentAdder";

const Editor = props => {
  return (
    <Flex w={1} justifyContent="center" alignItems="flex-start">
      <ComponentAdder />
      <FormEditor />
      <FormRenderer />
    </Flex>
  );
};

export default Editor;
