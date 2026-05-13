import { useContext } from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  LockOutlined,
  LoginOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../components/context/auth";
import { loginApi } from "../until/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;
    const res = await loginApi(email, password);

    if (res && res.EC === 0) {
      localStorage.setItem("access_token", res.access_token);
      notification.success({
        message: "LOGIN USER",
        description: "Success",
      });
      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.user?.email ?? "",
          name: res?.user?.name ?? "",
        },
      });
      navigate("/");
      return;
    }

    notification.error({
      message: "LOGIN USER",
      description: res?.EM ?? "error",
    });
  };

  return (
    <section className="auth-page">
      <Row justify="center" className="auth-row">
        <Col xs={24} sm={20} md={14} lg={9} xl={7}>
          <div className="auth-card">
            <div className="auth-heading">
              <div className="auth-icon">
                <LoginOutlined />
              </div>
              <div>
                <h1>Đăng nhập</h1>
                <p>Sử dụng tài khoản để truy cập danh sách user</p>
              </div>
            </div>

            <Form
              name="login"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="you@example.com"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined />}
                  placeholder="Nhap mat khau"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>

            <Link to="/" className="back-link">
              <ArrowLeftOutlined /> Quay lại trang chủ
            </Link>
            <Divider />
            <div className="auth-switch">
              Chưa có tài khoản? <Link to="/register">Đăng kí</Link>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default LoginPage;
