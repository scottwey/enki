import React from "react";
import { Flex } from "grid-styled";
import FormEditor from "containers/FormEditor";
import ComponentAdder from "containers/ComponentAdder";

const Editor = props => {
  return (
    <Flex w={1} justifyContent="center" alignItems="flex-start">
      <ComponentAdder />
      <FormEditor />
    </Flex>
  );
};

export default Editor;
