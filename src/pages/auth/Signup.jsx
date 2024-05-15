import React from "react";
import {
  Button,
  Form,
  Grid,
  Input,
  Typography,
  theme,
  Image,
  Spin,
  Alert,
  Row,
  Col,
} from "antd";
import {
  LockOutlined,
  MailOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import logo from "../../assets/img/logo 2.png";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";
const { useToken } = theme;

const Signup = () => {
  const { token } = useToken();
  const screens = Grid.useBreakpoint();
  const { loading, error, registerUser } = useSignup();
  const handleRegister = (values) => {
    registerUser(values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          margin: "0 auto",
          padding: screens.md
            ? `${token.paddingXL}px`
            : `${token.paddingXL}px ${token.padding}px`,
          width: "400px",
          border: "1px solid #e0e0e0",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: token.marginXL }}>
          <Image preview={false} width={55} src={logo} />
          <Typography.Title
            style={{
              fontSize: screens.md
                ? token.fontSizeHeading2
                : token.fontSizeHeading3,
            }}
          >
            Sign Up
          </Typography.Title>
          <Typography.Text>Welcome !</Typography.Text>
          <Typography.Text>
            <br />
            Please enter your details below to sign up.
          </Typography.Text>
        </div>
        <Form
          name="signup"
          layout="vertical"
          requiredMark="optional"
          autoComplete="on"
          onFinish={handleRegister}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Phone" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your Password!",
                  },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please input your address!",
                  },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your city!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="City" />
          </Form.Item>
          <Form.Item
            name="pincode"
            rules={[
              {
                required: true,
                message: "Please input your pincode!",
              },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Pincode" />
          </Form.Item>
          {error && (
            <Alert description={error} type="error" showIcon closable />
          )}
          <Form.Item style={{ marginBottom: "16px" }}>
            <Button
              block
              type={`${loading ? "" : "primary"}`}
              htmlType="submit"
            >
              {loading ? <Spin /> : "Signup"}
            </Button>
          </Form.Item>
          <Typography.Text style={{ textAlign: "center", display: "block" }}>
            Already have an account? <Link to="/signin">Login</Link>
          </Typography.Text>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
