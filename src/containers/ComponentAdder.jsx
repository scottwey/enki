import React from "react";
import { Flex } from "grid-styled";
import { Button, Title } from "@scottwey/alkali-ui";
import formable from "connectors/formable";
import { inputTypes } from "config";

const ButtonColumn = Flex.extend`
  min-width: 15rem;
`;

const ComponentAdder = ({ addField }) => (
  <ButtonColumn
    flexDirection="column"
    alignItems="center"
    w={1 / 6}
    px={4}
    py={4}
    mx={2}
  >
    <Title mb={3}>Components</Title>
    {inputTypes.map(({ element, type }) => (
      <Button
        primary
        my={2}
        key={`${element}-${type}`}
        onClick={() => addField({ payload: { element, type } })}
      >
        {type} {element}
      </Button>
    ))}
  </ButtonColumn>
);

export default formable(ComponentAdder);
