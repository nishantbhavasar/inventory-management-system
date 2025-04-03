import { useDispatch } from "react-redux";
import { NavLink, Outlet } from "react-router";
import { logout } from "../store/reducers/authReducer";

const Layout = () => {
  const dispatch = useDispatch();
  return (
    <div className="flex h-screen w-screen">
      {/* Side Bar */}
      <div className="h-screen w-1/6 border-r-2 border-gray-700] p-3 flex flex-col justify-between">
        <ul className="flex flex-col gap-3">
          <NavLink
            className={({ isActive }) =>
              `w-full inline-block border-2 border-secondary p-1 rounded-lg hover:bg-secondary ${
                isActive ? "bg-secondary" : ""
              }`
            }
            to={"/inventories"}
          >
            Inventories
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `w-full inline-block border-2 border-secondary p-1 rounded-lg hover:bg-secondary ${
                isActive ? "bg-secondary" : ""
              }`
            }
            to={"/categories"}
          >
            Categories
          </NavLink>
        </ul>
        <div
          className={
            "w-full inline-block border-2 border-secondary p-1 rounded-lg cursor-pointer hover:bg-secondary"
          }
          onClick={() => {
            dispatch(logout());
          }}
        >
          Logout
        </div>
      </div>
      {/* Content Section */}
      <div className="h-screen w-5/6 p-3">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
