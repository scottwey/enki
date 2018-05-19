import React from "react";
import { Button, Text } from "@scottwey/alkali-ui";
import showable from "connectors/showable";
import faCog from "@fortawesome/fontawesome-free-solid/faCog";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const SettingsButton = ({ toggle, show }) => (
  <Button white={!show} black={show} mx={2} mt={3} px={3} onClick={toggle}>
    <FontAwesomeIcon icon={faCog} />
  </Button>
);

export default showable(SettingsButton);
