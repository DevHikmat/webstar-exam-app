import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GroupService } from "./services/GroupService";
import {
  getGroupsStart,
  getGroupsSuccess,
  getGroupsFailure,
} from "./redux/groupSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Cabinet from "./pages/cabinet/Cabinet";
import Admin from "./pages/admin/Admin";

function App() {
  const { isChange } = useSelector((state) => state.groups);
  const dispatch = useDispatch();

  const handleGroups = async () => {
    dispatch(getGroupsStart());
    try {
      const data = await GroupService.getAllGroups();
      dispatch(getGroupsSuccess(data.groups));
    } catch (error) {
      dispatch(getGroupsFailure(error.response.data.message));
    }
  };

  useEffect(() => {
    handleGroups();
  }, [isChange]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/cabinet/*" element={<Cabinet />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
