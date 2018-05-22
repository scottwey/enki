import React from "react";
import { Flex } from "grid-styled";
import { Button, Text, EditableText } from "@scottwey/alkali-ui";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Settings from "components/FieldEditor/Settings";
import SettingsButton from "components/FieldEditor/SettingsButton";
import FieldRenderer from "components/FieldRenderer";

const FieldContainer = Flex.extend`
  position: relative;
  background: inherit;
  border-left: 12px solid rgba(170, 170, 190, 0.2);
  transition: border-left 0.3s linear;
  &:hover,
  &:active {
    border-left: 12px solid rgba(170, 170, 190, 0.65);
  }
`;

class Field extends React.Component {
  render() {
    const {
      field,
      onRemove,
      onEdit,
      toggleValidation,
      provided,
      beingDragged,
      ...rest
    } = this.props;
    const { id, type, name, label, element, placeholder, validations } = field;
    return (
      <FieldContainer
        {...rest}
        primary
        flexDirection="column"
        alignItems="flex-start"
        beingDragged={beingDragged}
        my={3}
        pt={1}
        pb={3}
        px={4}
        w={1}
      >
        <Flex
          w={1}
          py={1}
          px={1}
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <EditableText
            value={label}
            placeholder="Label"
            onChange={e => onEdit({ label: e.target.value })}
          />
          <Flex>
            <Text
              color={name ? null : "white"}
              background={name ? null : "red"}
              fontSize={1}
              mr={1}
              px={1}
            >
              {name || `no name (${id})`}
            </Text>
            <Text fontSize={1}>:</Text>
            <Text fontSize={1} ml={1}>
              {type || element}
            </Text>
          </Flex>
        </Flex>
        <FieldRenderer
          type={type}
          element={element}
          placeholder={placeholder}
        />
        <Flex w={1} justifyContent="space-between">
          <Text fontSize={2} w={2 / 3} justifyContent="flex-start">
            {validations && validations.join(", ")}
          </Text>
          <Flex justifyContent="flex-end">
            {onRemove && (
              <Button
                white
                color="red"
                mx={2}
                mt={3}
                px={3}
                onClick={() => onRemove({ id })}
              >
                <FontAwesomeIcon icon={faTimes} />
              </Button>
            )}
            <SettingsButton id={id} />
          </Flex>
        </Flex>
        <Settings
          toggleValidation={toggleValidation}
          onEdit={onEdit}
          id={id}
          field={field}
        />
      </FieldContainer>
    );
  }
}

export default Field;
