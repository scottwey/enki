import React from "react";
import styled from "styled-components";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Flex } from "grid-styled";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as formActions from "ducks/form";
import { Button, Card, Title, Text } from "@scottwey/alkali-ui";
import TextArea from "react-textarea-autosize";

const FieldColumn = Card.extend``;

const EditableText = Text.extend`
  color: #faf7f6;
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
  width: ${({ value, placeholder }) =>
    `${((value && 0.9 * value.length) ||
      (placeholder && 0.9 * placeholder.length) ||
      3) + 1.5}ch`};
  max-width: 100%;
  box-sizing: border-box;
`.withComponent("input");

const EditableTitle = Title.extend`
  color: #faf7f6;
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
  width: ${({ value, placeholder }) =>
    `${((value && 0.9 * value.length) ||
      (placeholder && 0.9 * placeholder.length) ||
      3) + 1.5}ch`};
  max-width: 100%;
  box-sizing: border-box;
`.withComponent("input");

const Input = styled.input`
  will-change: background;
  -webkit-appearance: none;
  outline: none;
  background: rgba(190, 190, 190, 0.2);
  border: none;
  border: 3px solid rgba(255, 255, 255, 0.3);
  color: white;
  width: 100%;
  font-size: 1.5rem;
  padding: 0 1rem;
  height: 3rem;
  line-height: 3rem;
  transition: border 0.3s linear;
  box-sizing: border-box;
  box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.1),
    inset 0 0 15px rgba(0, 0, 0, 0.2);
  &:focus {
    border: 3px solid rgba(255, 255, 255, 0.7);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.35),
      0 0 15px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.1);
  }
`;

const StyledTextArea = Input.withComponent(TextArea);

const elementMapping = { textarea: StyledTextArea, input: Input };

const FieldRenderer = ({ element, type }) => {
  const Element = elementMapping[element] || element;
  return <Element type={type} />;
};

const FieldContainer = Flex.extend`
  position: relative;
  border-top: ${({ top, beingDragged }) =>
    top || beingDragged ? "none" : "1px solid rgba(250, 250, 250, 0.3)"};
  background: ${({ beingDragged }) => (beingDragged ? "#72727f" : "#52525f")};
  }
`;

const ErrorsAndWarnings = Flex.extend.attrs({
  children: ({ error, warning }) => error || warning,
  px: 3,
  py: ({ error, warning }) => (error || warning ? 2 : 0)
})`
  font-size: 1rem;
  width: 100%;
  transition: all .3s ease;
  background: ${({ error, warning }) =>
    error || warning ? "rgba(255, 255, 255, 0.9)" : "transparent"};
  height: ${({ error, warning }) => (error || warning ? "auto" : "0")};
  color: ${({ error, warning }) =>
    error ? "#cc0000" : warning ? "#eebb00" : "black"};
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
        flexDirection="column"
        alignItems="flex-start"
        beingDragged={beingDragged}
        p={4}
        w={1}
      >
        <Flex w={1} p={2} justifyContent="space-between" alignItems="flex-end">
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
          <Text fontSize={1} color="rgba(255, 255, 255, 0.7)">
            {type || element}
          </Text>
        </Flex>
        <FieldRenderer
          type={type}
          element={element}
          placeholder={placeholder}
        />
        <ErrorsAndWarnings error="" />
        {onRemove && (
          <Flex w={1} justifyContent="flex-end">
            <Button mt={3} white onClick={() => onRemove({ id })}>
              remove
            </Button>
          </Flex>
        )}
      </FieldContainer>
    );
  }
}

const inputTypes = [
  { element: "input", type: "text" },
  { element: "input", type: "email" },
  { element: "input", type: "number" },
  { element: "textarea" }
];

const ButtonColumn = Flex.extend`
  min-width: 15rem;
`;

const App = ({
  form,
  addField,
  moveField,
  removeField,
  editName,
  editField,
  ...rest
}) => {
  const onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    moveField({ from: source.index, to: destination.index });
  };

  const { fields } = form;

  return (
    <Flex w={1} justifyContent="center" alignItems="flex-start">
      <ButtonColumn flexDirection="column" alignItems="center" px={4} py={4}>
        <Title mb={3}>Append</Title>
        {inputTypes.map(({ element, type }) => (
          <Button
            black
            my={2}
            key={type}
            onClick={() => addField({ payload: { element, type } })}
          >
            {type} {element}
          </Button>
        ))}
      </ButtonColumn>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <FieldColumn
              dark
              w={2 / 6}
              flexDirection="column"
              px={0}
              py={3}
              mt={4}
              innerRef={provided.innerRef}
            >
              <Flex w={1} px={3} py={2} justifyContent="flex-end">
                <EditableTitle
                  textAlign="right"
                  value={form.name}
                  placeholder="Form Name"
                  onChange={e => editName({ name: e.target.value })}
                />
              </Flex>
              {fields.map((field, index) => {
                return (
                  <Draggable
                    key={field.id}
                    draggableId={field.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <Field
                        beingDragged={snapshot.isDragging}
                        top={index === 0}
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={provided.draggableProps.style}
                        onRemove={removeField}
                        onEdit={editField}
                        field={field}
                      />
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </FieldColumn>
          )}
        </Droppable>
      </DragDropContext>
    </Flex>
  );
};

const mapStateToProps = ({ form }) => ({ form });
const mapDispatchToProps = dispatch =>
  bindActionCreators(formActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
