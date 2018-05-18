import styled from "styled-components";

const Input = styled.input`
  will-change: background;
  -webkit-appearance: none;
  outline: none;
  background: rgba(190, 190, 190, 0.2);
  border: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  width: 100%;
  font-size: 1.5rem;
  padding: 0 1rem;
  height: 3rem;
  line-height: 3rem;
  transition: border 0.3s linear;
  box-sizing: border-box;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1), inset 0 0 4px rgba(0, 0, 0, 0.2);
  color: inherit;
  &:focus {
    border: 1px solid rgba(200, 200, 200, 0.7);
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1),
      inset 0 0 4px rgba(0, 0, 0, 0.2), 0 0 15px rgba(200, 200, 200, 0.1),
      0 0 30px rgba(200, 200, 200, 0.1);
  }
`;

export default Input;
