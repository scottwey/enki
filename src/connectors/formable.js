import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as formActions from "ducks/form";

const mapStateToProps = ({ form }) => ({ form });
const mapDispatchToProps = dispatch =>
  bindActionCreators(formActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps);
