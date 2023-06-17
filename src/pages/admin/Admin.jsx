import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminItems } from "../../utils/AntdSettings";
import { Routes, Route } from "react-router-dom";
import { UserService } from "../../services/UserService";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsersStart, getAllUsersSuccess } from "../../redux/userSlice";
import logo from "../../static/images/logo1.png";
import ExamBox from "../../components/ExamBox";
import GroupsBox from "../../components/GroupsBox";
import "./Admin.scss";
import UsersBox from "../../components/UsersBox";
import UserInfoBox from "../../components/UserInfoBox";

const { Header, Sider, Content } = Layout;

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isChange, currentUser } = useSelector((state) => state.users);
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

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    navigate("/login");
  };

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
                key: "4",
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
              <Route path="/" element={<ExamBox />} />
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
