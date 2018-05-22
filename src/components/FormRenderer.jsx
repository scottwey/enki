import React from "react";
import { Formik } from "formik";
import { Flex } from "grid-styled";
import { Card, Text, Title, Button } from "@scottwey/alkali-ui";
import FieldRenderer from "components/FieldRenderer";
import validate from "utility/validate";
import fieldNameMapper from "utility/fieldNameMapper";
import Label from "components/Label";
import ErrorsAndWarnings from "components/ErrorsAndWarnings";

const LargeLabel = Label.extend`
  font-size: 1.2rem;
`;

const FormikFieldRenderer = ({
  id,
  label,
  values,
  errors,
  handleChange,
  handleBlur,
  touched: touch,
  // make sure that name does not override name={id}
  // refactor later to change name to something else
  name: _name,
  ...rest
}) => {
  const value = values[id];
  const error = errors[id];
  const touched = touch[id];
  return (
    <LargeLabel>
      <Text my={1}>{label || "Label"}</Text>
      <Flex flexDirection="column" justifyContent="center">
        <FieldRenderer
          name={id}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          {...rest}
        />
        <ErrorsAndWarnings error={touched && error} />
      </Flex>
    </LargeLabel>
  );
};

const FormRenderer = ({ form }) => {
  const { name: formName, fields } = form;
  return (
    <Flex w={1 / 2} px={3} justifyContent="flex-start">
      <Card primary w={1} flexDirection="column" px={4} py={4} mt={4}>
        <Title my={4}>{formName || "Form Name"}</Title>
        <Formik
          validate={validate.bind(null, fields)}
          onSubmit={(values, { setSubmitting }) => {
            const mappedValues = fieldNameMapper(fields, values);
            console.log(mappedValues);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting
          }) => {
            const isErrored = Object.keys(errors).length > 0;
            return (
              <form onSubmit={handleSubmit}>
                {fields.map(field => (
                  <FormikFieldRenderer
                    key={field.id}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    {...field}
                  />
                ))}
                <Flex justifyContent="flex-end" w={1} mt={4}>
                  <Button
                    dark
                    type="submit"
                    disabled={isSubmitting || isErrored}
                  >
                    Submit
                  </Button>
                </Flex>
              </form>
            );
          }}
        </Formik>
      </Card>
    </Flex>
  );
};

export default FormRenderer;
