import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { toggle } from "ducks/show";

const ShowerHider = ({
  show,
  toggle,
  showingElement: ShowingElement,
  hiddenElement: HiddenElement = null,
  ...rest
}) =>
  show ? (
    <ShowingElement toggle={toggle} {...rest} />
  ) : (
    <HiddenElement toggle={toggle} {...rest} />
  );

const mapStateToProps = ({ show }, { id }) => ({
  show: show[id]
});

const mapDispatchToProps = (dispatch, { id }) =>
  bindActionCreators({ toggle: toggle.bind(null, { id }) }, dispatch);

const showable = connect(mapStateToProps, mapDispatchToProps);

export default showable;

showable.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export const ShowHide = showable(ShowerHider);
