const inputStyleMixin = `
  color: inherit;
  outline: none;
  border: none;
  background: transparent;
  padding: 0;
  max-width: 100%;
  box-sizing: border-box;
  &::placeholder {
    color: rgba(160, 160, 160, 0.3);
  }
`;

export const width = ({ value, placeholder }) => {
  return `width: ${((value && 0.9 * value.length) ||
    (placeholder && 0.9 * placeholder.length) ||
    3) + 1.5}ch`;
};

export default inputStyleMixin;
