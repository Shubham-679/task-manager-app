import { useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import { logoutUser } from "../actions/userAction";

const Logout = ({ token }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUser(token));
    localStorage.clear();
    window.location = "/";
  });
  return null;
};
const mapStateToProps = (state) => ({
  token: state.users.token
});
export default connect(mapStateToProps)(Logout);
