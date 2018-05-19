import React from "react";
import Input from "components/Input";
import { Flex } from "grid-styled";
import TextArea from "components/TextArea";
import { Text as EditableText } from "components/Editable";
import { Button, Text } from "@scottwey/alkali-ui";
import faCog from "@fortawesome/fontawesome-free-solid/faCog";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import Settings from "components/FieldEditor/Settings";
import SettingsButton from "components/FieldEditor/SettingsButton";

const elementMapping = { textarea: TextArea, input: Input };

const FieldRenderer = ({ element, type }) => {
  const Element = elementMapping[element] || element;
  return <Element type={type} />;
};

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
      provided,
      beingDragged,
      ...rest
    } = this.props;
    const { id, type, label, element, placeholder } = field;
    return (
      <FieldContainer
        {...rest}
        primary
        flexDirection="column"
        alignItems="flex-start"
        beingDragged={beingDragged}
        my={3}
        py={1}
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
            my={2}
            onChange={e => {
              onEdit({
                payload: { ...field, label: e.target.value }
              });
            }}
          />
          <Text fontSize={1}>{type || element}</Text>
        </Flex>
        <FieldRenderer
          type={type}
          element={element}
          placeholder={placeholder}
        />
        {onRemove && (
          <Flex w={1} justifyContent="flex-end">
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
            <SettingsButton id={id} />
          </Flex>
        )}
        <Settings onEdit={onEdit} id={id} field={field} />
      </FieldContainer>
    );
  }
}

export default Field;
