import React from "react";
import { Flex } from "grid-styled";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Title as EditableTitle } from "components/Editable";
import { Card } from "@scottwey/alkali-ui";
import Field from "components/FieldEditor";
import formable from "connectors/formable";

const FormEditor = ({ moveField, removeField, editField, editName, form }) => {
  const { fields } = form;

  const onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    moveField({ from: source.index, to: destination.index });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <Card
            primary
            w={2 / 6}
            flexDirection="column"
            px={2}
            py={5}
            mt={4}
            innerRef={provided.innerRef}
          >
            <Flex w={1} pb={2} px={3} justifyContent="flex-end">
              <EditableTitle
                textAlign="right"
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
          </Card>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default formable(FormEditor);
