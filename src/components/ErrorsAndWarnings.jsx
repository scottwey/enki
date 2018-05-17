import { themeGet } from "styled-system";
import { Flex } from "grid-styled";

const ErrorsAndWarnings = Flex.extend.attrs({
  children: ({ error, warning }) => error || warning,
  px: 3,
  py: ({ error, warning }) => (error || warning ? 2 : 0),
  my: 1
})`
  font-weight: 400;
  font-size: 1rem;
  width: 100%;
  transition: all .3s ease;
  background: ${({ error, warning }) =>
    error || warning ? "white" : "transparent"};
  height: ${({ error, warning }) => (error || warning ? "auto" : "0")};
  color: ${({ error, warning }) =>
    error ? "red" : warning ? "#eebb00" : themeGet("colors.black", "black")};
`;

export default ErrorsAndWarnings;
