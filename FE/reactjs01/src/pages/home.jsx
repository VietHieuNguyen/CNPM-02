import { Button, Card, Col, Row, Statistic } from "antd";
import {
  CrownOutlined,
  LoginOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import heroImage from "../assets/hero.png";

const HomePage = () => {
  return (
    <section className="page-shell home-page">
      <Row gutter={[24, 24]} align="middle">
        <Col xs={24} lg={14}>
          <div className="home-intro">
            <span className="eyebrow">React + NodeJS</span>
            <h1>JWT Auth Demo</h1>
            <p>
              Giao diện đăng nhập
            </p>
            <div className="home-actions">
              <Link to="/login">
                <Button type="primary" size="large" icon={<LoginOutlined />}>
                  Đăng nhập
                </Button>
              </Link>
              <Link to="/user">
                <Button size="large" icon={<TeamOutlined />}>
                  Xem user
                </Button>
              </Link>
            </div>
          </div>
        </Col>
        <Col xs={24} lg={10}>
          <div className="home-visual">
            <img src={heroImage} alt="JWT auth workspace" />
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="summary-grid">
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Auth flow"
              value="Login"
              prefix={<SafetyCertificateOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Token type" value="Bearer" prefix={<CrownOutlined />} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic title="Protected API" value="/user" prefix={<TeamOutlined />} />
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default HomePage;
