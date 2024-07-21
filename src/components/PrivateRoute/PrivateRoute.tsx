import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { PropChildren } from "../../types/types";

const PrivateRoute = ({ children }: PropChildren) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const location = useLocation();

  return isLoggedIn ? children : <Navigate to="login" state={location} />;
};
export default PrivateRoute;
