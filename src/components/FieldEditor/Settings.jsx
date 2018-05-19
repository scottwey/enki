import React from "react";
import { Box } from "grid-styled";
import { Button, Text } from "@scottwey/alkali-ui";
import showable from "connectors/showable";

const SettingsContainer = Box.extend`
  transition: max-height 0.3s linear;
  max-height: ${({ show }) => (show ? "1000px" : "0")};
  overflow-y: hidden;
`;

const Settings = ({ toggle, show, ...rest }) => (
  <SettingsContainer w={1} show={show}>
    Field Settings Go Here
  </SettingsContainer>
);

export default showable(Settings);
