import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  LockOutlined,
  MailOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { createUserApi } from "../until/api";

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { name, email, password } = values;
    const res = await createUserApi(name, email, password);

    if (res?.EC === 0) {
      notification.success({
        message: "CREATE USER",
        description: res?.EM ?? "Success",
      });
      navigate("/login");
      return;
    }

    notification.error({
      message: "CREATE USER",
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
                <UserAddOutlined />
              </div>
              <div>
                <h1>Dang ky tai khoan</h1>
                <p>Tao tai khoan moi de thu nghiem JWT auth.</p>
              </div>
            </div>

            <Form
              name="register"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Please input your name!",
                  },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined />}
                  placeholder="Nguyen Van A"
                />
              </Form.Item>

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
                  placeholder="Toi thieu 6 ky tu"
                />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  Tao tai khoan
                </Button>
              </Form.Item>
            </Form>

            <Link to="/" className="back-link">
              <ArrowLeftOutlined /> Quay lai trang chu
            </Link>
            <Divider />
            <div className="auth-switch">
              Da co tai khoan? <Link to="/login">Dang nhap</Link>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default RegisterPage;
