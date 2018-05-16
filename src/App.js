import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import AlkaliProvider from "@scottwey/alkali-ui";
import store from "store";
import Editor from "./Editor";

const App = () => (
  <ReduxProvider store={store}>
    <AlkaliProvider>
      <Editor />
    </AlkaliProvider>
  </ReduxProvider>
);

export default App;
