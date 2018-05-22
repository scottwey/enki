import React from "react";
import styled from "styled-components";
import { Box } from "grid-styled";
import { Text, Input } from "@scottwey/alkali-ui";
import showable from "connectors/showable";
import Label from "components/Label";
import { strings } from "validations";

const SettingsContainer = Box.extend`
  transition: all 0.3s ease;
  max-height: ${({ show }) => (show ? "800px" : "0")};
  overflow-y: hidden;
  border-left: 5px solid rgba(120, 120, 140, 0.3);
  &:hover {
    border-left: 5px solid rgba(120, 120, 140, 0.7);
  }
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  margin-right: 0.5rem;
`;

const Settings = ({ show, onEdit, field, toggleValidation, ...rest }) => (
  <SettingsContainer mt={2} w={1} pl={3} show={show}>
    <Text mt={1} mb={3}>
      Field Settings
    </Text>
    <Label>
      Field Name
      <Input
        mt={1}
        type="text"
        value={field.name}
        onChange={e => onEdit({ name: e.target.value })}
      />
      <Text fontSize={1} red>
        Required
      </Text>
    </Label>
    <Label>
      Field Label
      <Input
        mt={1}
        type="text"
        value={field.label}
        onChange={e => onEdit({ label: e.target.value })}
      />
    </Label>
    <Label>
      Field Placeholder
      <Input
        mt={1}
        type="text"
        value={field.placeholder}
        onChange={e => onEdit({ placeholder: e.target.value })}
      />
    </Label>
    <Label>
      <Checkbox
        checked={
          !!field.validations && field.validations.includes(strings.REQUIRED)
        }
        onChange={() => toggleValidation(strings.REQUIRED)}
      />
      Required Field
    </Label>
  </SettingsContainer>
);

export default showable(Settings);
