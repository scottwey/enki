export const functions = {};
functions.required = value =>
  !value ? "Please fill this field in." : undefined;

export const strings = {};
Object.keys(functions).forEach(name => {
  strings[name.toUpperCase()] = name.toString();
});
