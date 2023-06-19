import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { QuizService } from "../../services/QuizService";
import { adminItems } from "../../utils/AntdSettings";
import { UserService } from "../../services/UserService";
import { CategoryService } from "../../services/CategoryService";
import { getAllUsersStart, getAllUsersSuccess } from "../../redux/userSlice";
import logo from "../../static/images/logo1.png";
import CategoryBox from "../../components/CategoryBox/CategoryBox";
import ExamBox from "../../components/ExamBox/ExamBox";
import GroupsBox from "../../components/GroupBox/GroupBox";
import "./Admin.scss";
import UsersBox from "../../components/UserBox/UserBox";
import UserInfoBox from "../../components/UserBox/UserInfoBox";
import { getQuizStart, getQuizSuccess } from "../../redux/quizSlice";
import {
  getAllCategoryStart,
  getAllCategorySuccess,
} from "../../redux/categorySlice";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isChange, currentUser } = useSelector((state) => state.users);
  const { category } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleAllUsers = async () => {
    dispatch(getAllUsersStart());
    try {
      const data = await UserService.getAllUsers();
      dispatch(getAllUsersSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAllQuiz = async () => {
    dispatch(getQuizStart());
    try {
      const data = await QuizService.getAllQuiz();
      dispatch(getQuizSuccess(data.quizzes));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleAllCategory = async () => {
    dispatch(getAllCategoryStart());
    try {
      const data = await CategoryService.getAllCategory();
      dispatch(getAllCategorySuccess(data.categories));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    handleAllCategory();
  }, [category.isChange]);

  useEffect(() => {
    handleAllQuiz();
  }, []);

  useEffect(() => {
    handleAllUsers();
  }, [isChange]);
  return (
    <div className="admin">
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: "white" }}
          className="shadow"
        >
          <div className="demo-logo-vertical">
            <Link to="/admin" className="logo-box">
              <img src={logo} alt="logo" className="img-fluid rounded-circle" />
            </Link>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[
              String(
                adminItems.findIndex(
                  (item) => "/admin" + item.url === location.pathname
                ) + 1
              ),
            ]}
            items={[
              ...adminItems,
              {
                key: "5",
                icon: <i className="fa-solid fa-arrow-right-from-bracket"></i>,
                label: (
                  <div onClick={handleLogout} className="logout-box">
                    Profildan chiqish
                  </div>
                ),
              },
            ]}
          />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
            className="shadow-sm"
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div className="user-title">
              <h4>
                <Link to="profile">
                  {currentUser?.firstname} {currentUser?.lastname}
                </Link>
              </h4>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Routes>
              <Route path="/" element={<CategoryBox />} />
              <Route path="/exams" element={<ExamBox />} />
              <Route path="/groups" element={<GroupsBox />} />
              <Route path="/users" element={<UsersBox />} />
              <Route path="/users/:id" element={<UserInfoBox />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default Admin;
