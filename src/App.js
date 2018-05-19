import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import AlkaliProvider from "@scottwey/alkali-ui";
import store from "store";
import Editor from "Editor";

const colors = { black: "#333340", white: "#fefefe" };
const globals = { background: "#f9fafb" };

const App = () => (
  <ReduxProvider store={store}>
    <AlkaliProvider
      colors={colors}
      globals={globals}
      somethingElse="alskghalkshg"
    >
      <Editor />
    </AlkaliProvider>
  </ReduxProvider>
);

export default App;
