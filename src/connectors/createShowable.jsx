import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggle } from "ducks/show";

const bindShowableElement = boundConnect => ({
  showingElement: ShowingElement,
  hiddenElement: HiddenElement = null
}) => {
  const conditionalShow = ({ show, ...rest }) =>
    show ? <ShowingElement {...rest} /> : <HiddenElement {...rest} />;
  return boundConnect(conditionalShow);
};

const bindToggleElement = boundConnect => ({
  toggleElement: ToggleElement
}) => {};

const createShowable = ({ id }) => {
  const boundToggle = toggle.bind(null, id);
  const boundMapStateToProps = ({ show }) => ({
    show: show[id]
  });
  const boundDispatchToProps = dispatch =>
    bindActionCreators({ toggle: boundToggle }, dispatch);
  const boundConnect = connect(boundMapStateToProps, boundDispatchToProps);
  const returnObject = boundConnect;
  returnObject.bindShowableElement = bindShowableElement(boundConnect);
  returnObject.bindShowableElement = bindToggleElement(boundConnect);
  return returnObject;
};
