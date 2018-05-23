import React from "react";
import formable from "connectors/formable";
import ReactJson from "react-json-view";

const FormJson = ({ form }) => (
  <ReactJson theme="ocean" src={form} style={{ background: "transparent" }} />
);

export default formable(FormJson);
