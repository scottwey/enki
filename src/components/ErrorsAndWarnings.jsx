import { Flex } from "grid-styled";

const ErrorsAndWarnings = Flex.extend.attrs({
  children: ({ error, warning }) => error || warning,
  px: 0,
  my: 1
})`
  font-weight: 400;
  font-size: 1rem;
  height: 2rem;
  line-height: 1rem;
  width: 100%;
  transition: all .3s ease;
  opacity: ${({ error, warning }) => (error || warning ? "1" : "0")};
  color: ${({ error, warning }) =>
    error ? "red" : warning ? "#eebb00" : "inherit"};
`;

export default ErrorsAndWarnings;
