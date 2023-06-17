import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GroupService } from "./services/GroupService";
import { UserService } from "./services/UserService";
import {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailure,
} from "./redux/groupSlice";
import { getOneUserStart, getOneUserSuccess } from "./redux/userSlice";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Cabinet from "./pages/cabinet/Cabinet";
import Admin from "./pages/admin/Admin";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isChange } = useSelector((state) => state.groups);
  const navigate = useNavigate();
  const [protectedRoute, setProtectedRoute] = useState([]);
  const [adminRoute, setAdminRoute] = useState([
    { path: "/admin/*", element: <Admin /> },
    { path: "/", element: <Dashboard /> },
  ]);
  const [studentRoute, setStudentRoute] = useState([
    { path: "/cabinet/*", element: <Cabinet /> },
    { path: "/", element: <Dashboard /> },
  ]);

  const handleGroups = async () => {
    dispatch(getGroupsStart());
    try {
      const data = await GroupService.getAllGroups();
      dispatch(getGroupsSuccess(data.groups));
    } catch (error) {
      dispatch(getGroupsFailure(error.response.data.message));
    }
  };

  const getCurrentUser = async () => {
    dispatch(getOneUserStart());
    const id = localStorage.getItem("id");
    try {
      const data = await UserService.getOneUser(id);
      if (!data) navigate("/login");
      if (data.role === "admin") {
        !location.pathname.startsWith("/admin") && navigate("/admin");
        setProtectedRoute(adminRoute);
      } else if (data.role === "student") {
        !location.pathname.startsWith("/cabinet") && navigate("/cabinet");
        setProtectedRoute(studentRoute);
      }
      dispatch(getOneUserSuccess(data));
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  useEffect(() => {
    handleGroups();
  }, [isChange]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {protectedRoute?.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
