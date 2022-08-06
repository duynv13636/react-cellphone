import { Button, Col, Form, Input, message } from "antd";
import React from "react";
import { signin, signup } from "../../api/users";
import { useNavigate } from "react-router-dom";

const SigninPage: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    try {
      const Signin = async () => {
        const data = await signin(values);
        message.success("Bạn đã đăng nhập thành công");
        navigate("/");
        console.log(data);
      };
      Signin();
    } catch (error) {
      console.log(error);
    }

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
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
    </Col>
  );
};

export default SigninPage;
