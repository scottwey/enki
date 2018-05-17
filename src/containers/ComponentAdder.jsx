import React from "react";
import { Flex } from "grid-styled";
import { Button, Title } from "@scottwey/alkali-ui";
import formable from "connectors/formable";

const inputTypes = [
  { element: "input", type: "text" },
  { element: "input", type: "email" },
  { element: "input", type: "number" },
  { element: "textarea" }
];

const ButtonColumn = Flex.extend`
  min-width: 15rem;
`;

const ComponentAdder = ({ addField }) => (
  <ButtonColumn flexDirection="column" alignItems="center" px={4} py={4}>
    <Title mb={3}>Components</Title>
    {inputTypes.map(({ element, type }) => (
      <Button
        primary
        my={2}
        key={type}
        onClick={() => addField({ payload: { element, type } })}
      >
        {type} {element}
      </Button>
    ))}
  </ButtonColumn>
);

export default formable(ComponentAdder);
