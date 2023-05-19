import { connect } from "react-redux";
import Employees from "./component";

const mapStateToProps = (state) => {
  const { user } = state;
  return { user };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
