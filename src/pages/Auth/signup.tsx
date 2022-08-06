import { Button, Checkbox, Col, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { signup } from "../../api/users";
import { Navigate, useNavigate } from "react-router-dom";

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    const Signup = async () => {
      const data = await signup(values);
      message.success("Bạn đã đăng ký thành công");
      navigate("/signin");
      console.log(data);
    };
    Signup();

    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Col span={12} offset={6}>
      <Form
        name="basic"
        labelCol={{ span: 24 }}
        //   wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Không được bỏ trống!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default SignupPage;
