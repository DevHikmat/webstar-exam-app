import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Image, Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { items } from "../../utils/AntdSettings";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../static/images/logo1.png";
import QuizBox from "../../components/QuizBox/QuizBox";
import HistoryBox from "../../components/HistoryBox/HistoryBox";
import "./Cabinet.scss";
import { getQuizStart, getQuizSuccess } from "../../redux/quizSlice";
import { QuizService } from "../../services/QuizService";
import QuizUserView from "../../components/QuizBox/QuizUserView";
import { authLogout } from "../../redux/authSlice";
import Profile from "../../components/Profile/Profile";

const { Header, Sider, Content } = Layout;

const Cabinet = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    dispatch(authLogout());
    navigate("/login");
  };

  const handleGetAllQuiz = async () => {
    dispatch(getQuizStart());
    try {
      const data = await QuizService.getAllQuiz();
      dispatch(
        getQuizSuccess(
          data.quizzes.map((que, index) => ({ ...que, key: index }))
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllQuiz();
  }, []);

  return (
    <div className="cabinet">
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          style={{ backgroundColor: "white" }}
          className="shadow"
        >
          <div className="demo-logo-vertical">
            <Link to="/cabinet" className="logo-box">
              <img src={logo} alt="logo" className="img-fluid rounded-circle" />
            </Link>
          </div>
          <Menu
            theme="light"
            mode="inline"
            defaultSelectedKeys={[
              String(
                items.findIndex(
                  (item) => "/cabinet" + item.url === location.pathname
                ) + 1
              ),
            ]}
            items={[
              ...items,
              {
                key: "3",
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
              position: "sticky",
              top: 0,
              zIndex: "999",
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
              <div className="d-flex align-items-center gap-2">
                <div className="user-title-avatar">
                  {currentUser?.profilePicture ? (
                    <Image src={currentUser.profilePicture.url} />
                  ) : (
                    <Image
                      src="error"
                      fallback="https://www.transparentpng.com/thumb/user/gray-user-profile-icon-png-fP8Q1P.png"
                    />
                  )}
                </div>
                <h4>
                  <Link to="profile">
                    {currentUser?.firstname} {currentUser?.lastname}
                  </Link>
                </h4>
              </div>
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
              <Route path="/" element={<QuizBox />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/quiz/:id" element={<QuizUserView />} />
              <Route path="/history" element={<HistoryBox />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default Cabinet;
