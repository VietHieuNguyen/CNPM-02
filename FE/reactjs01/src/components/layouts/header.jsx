import { useContext } from "react";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setAuth({
      isAuthenticated: false,
      user: {
        email: "",
        name: "",
      },
    });
    navigate("/");
  };

  const selectedKey = location.pathname === "/user" ? "user" : "home";
  const accountLabel = auth.isAuthenticated
    ? auth?.user?.name || auth?.user?.email || "Tai khoan"
    : "Tai khoan";

  const items = [
    {
      label: <Link to="/">Home</Link>,
      key: "home",
      icon: <HomeOutlined />,
    },
    ...(auth.isAuthenticated
      ? [
          {
            label: <Link to="/user">Users</Link>,
            key: "user",
            icon: <TeamOutlined />,
          },
        ]
      : []),
    {
      label: accountLabel,
      key: "account",
      icon: <UserOutlined />,
      children: auth.isAuthenticated
        ? [
            {
              label: <span onClick={handleLogout}>Dang xuat</span>,
              key: "logout",
              icon: <LogoutOutlined />,
            },
          ]
        : [
            {
              label: <Link to="/login">Dang nhap</Link>,
              key: "login",
              icon: <LoginOutlined />,
            },
            {
              label: <Link to="/register">Dang ky</Link>,
              key: "register",
              icon: <UserAddOutlined />,
            },
          ],
    },
  ];

  return (
    <header className="site-header">
      <div className="brand">
        <SafetyBadge />
        <span>BT03 Auth</span>
      </div>
      <Menu
        className="nav-menu"
        selectedKeys={[selectedKey]}
        mode="horizontal"
        items={items}
      />
    </header>
  );
};

const SafetyBadge = () => (
  <span className="brand-mark">
    <UserOutlined />
  </span>
);

export default Header;
