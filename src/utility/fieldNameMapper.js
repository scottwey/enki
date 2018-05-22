const fieldNameMapper = (fields, values) => {
  const relevantValuesByName = fields.reduce((obj, { id, name }) => {
    obj[name || id] = values[id];
    return obj;
  }, {});
  return relevantValuesByName;
};

export default fieldNameMapper;
