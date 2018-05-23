import React from "react";
import { Flex } from "grid-styled";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Title, Card, EditableTitle } from "@scottwey/alkali-ui";
import Field from "components/FieldEditor";
import FormJson from "containers/FormJson";

const onDragEnd = (callback, { source, destination }) => {
  if (!destination) {
    return;
  }
  callback({ from: source.index, to: destination.index });
};

const FormEditor = ({
  moveField,
  removeField,
  editField,
  editName,
  toggleValidation,
  form
}) => {
  const { fields } = form;

  return (
    <DragDropContext onDragEnd={onDragEnd.bind(null, moveField)}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Card
            dark
            w={[1, 3 / 4, 1 / 2, 2 / 6]}
            flexDirection="column"
            px={0}
            py={4}
            mt={4}
            mx={2}
            innerRef={provided.innerRef}
          >
            <Flex w={1} py={4} pl={4} justifyContent="flex-start">
              <EditableTitle
                autoFocus
                value={form.name}
                placeholder="Form Name"
                onChange={e => editName({ name: e.target.value })}
              />
            </Flex>
            {fields.map((field, index) => {
              return (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided, snapshot) => (
                    <Field
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      beingDragged={snapshot.isDragging}
                      innerRef={provided.innerRef}
                      style={provided.draggableProps.style}
                      onRemove={removeField}
                      onEdit={payload => editField({ id: field.id, payload })}
                      toggleValidation={validation =>
                        toggleValidation({ id: field.id, validation })
                      }
                      field={field}
                    />
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
            <Flex flexDirection="column" px={[2, 4]}>
              <Title mt={4} mb={3}>
                Configuration
              </Title>
              <FormJson />
            </Flex>
          </Card>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FormEditor;
