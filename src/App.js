import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import AlkaliProvider from "@scottwey/alkali-ui";
import store from "store";
import Editor from "./Editor";

const colors = { black: "#333340", red: "#c00" };
colors.primary = colors.black;

const App = () => (
  <ReduxProvider store={store}>
    <AlkaliProvider colors={colors}>
      <Editor />
    </AlkaliProvider>
  </ReduxProvider>
);

export default App;
