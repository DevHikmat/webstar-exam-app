import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Cabinet.scss";
import logo from "../../static/images/logo1.png";
import { items } from "../../utils/AntdSettings";
import { Routes, Route } from "react-router-dom";
import ExamBox from "../../components/ExamBox";
import HistoryBox from "../../components/HistoryBox";

const { Header, Sider, Content } = Layout;

const Cabinet = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
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
            defaultSelectedKeys={[""]}
            items={items}
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
                <Link to="profile">Hikmatullo Mullajonov</Link>
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
              <Route path="/imtihon" element={<ExamBox />} />
              <Route path="/tarix" element={<HistoryBox />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
export default Cabinet;
