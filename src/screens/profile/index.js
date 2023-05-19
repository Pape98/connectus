import { connect } from "react-redux";
import { employeeActions } from "../../state/actions";
import Profile from "./component";

const mapStateToProps = (state) => {
  const { user } = state;
  return { user, employees: state.employee.all };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchEmployees: () => dispatch(employeeActions.fetchEmployees()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
