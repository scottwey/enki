import React from "react";
import ErrorsAndWarnings from "components/ErrorsAndWarnings";
import Input from "components/Input";
import { Flex } from "grid-styled";
import TextArea from "components/TextArea";
import { Text as EditableText } from "components/Editable";
import { Button, Text } from "@scottwey/alkali-ui";
import faCog from "@fortawesome/fontawesome-free-solid/faCog";
import faTimes from "@fortawesome/fontawesome-free-solid/faTimes";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";

const elementMapping = { textarea: TextArea, input: Input };

const FieldRenderer = ({ element, type }) => {
  const Element = elementMapping[element] || element;
  return <Element type={type} />;
};

const FieldContainer = Flex.extend`
  position: relative;
  background: inherit;
  border-left: 12px solid rgba(170, 170, 190, 0.3);
  transition: border-left 0.3s linear;
  &:hover,
  &:active {
    border-left: 12px solid rgba(170, 170, 190, 0.7);
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
          px={3}
          py={1}
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
        <ErrorsAndWarnings error="" />
        {onRemove && (
          <Flex w={1} justifyContent="flex-end">
            <Button mx={1} mt={3} px={3} red onClick={() => onRemove({ id })}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
            <Button mx={1} mt={3} px={3} white onClick={() => onRemove({ id })}>
              <FontAwesomeIcon icon={faCog} />
            </Button>
          </Flex>
        )}
      </FieldContainer>
    );
  }
}

export default Field;
