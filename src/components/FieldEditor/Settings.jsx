import React from "react";
import { Box } from "grid-styled";
import { Button, Text, Input } from "@scottwey/alkali-ui";
import showable from "connectors/showable";

const SettingsContainer = Box.extend`
  transition: max-height 0.3s ease;
  max-height: ${({ show }) => (show ? "800px" : "0")};
  overflow-y: hidden;
`;

const Label = Text.extend.attrs({ flexDirection: "column", py: 2 })``;

const Settings = ({ show, onEdit, field, ...rest }) => (
  <SettingsContainer mt={2} w={1} show={show}>
    <Label>
      Label:{" "}
      <Input
        type="text"
        value={field.label}
        onChange={e => onEdit({ label: e.target.value })}
      />
    </Label>
    <Label>
      Placeholder:{" "}
      <Input
        type="text"
        value={field.placeholder}
        onChange={e => onEdit({ placeholder: e.target.value })}
      />
    </Label>
  </SettingsContainer>
);

export default showable(Settings);
