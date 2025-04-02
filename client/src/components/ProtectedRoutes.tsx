import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { getIsLogin } from "../store/selector/authSelector";

const ProtectedRoute = () => {
  const isLogin = useSelector(getIsLogin);

  return isLogin ? <Outlet /> : <Navigate to={"/signin"} />;
};

export default ProtectedRoute;
