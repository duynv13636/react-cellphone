import React from "react";
import { Navigate } from "react-router-dom";
import { message, Modal } from "antd";

const PrivateRouter = ({ children }: any) => {
    console.log(children);
    
  const auth = JSON.parse(localStorage.getItem("username") as string);
  console.log(auth);
  if (!auth) {
    // Modal.error({
    //   title: "Chưa đăng nhập tài khoản quản trị!",
    //   content: "Vui lòng đăng nhập bằng tài khoản admin để vào !",
    // });
    message.error("Bạn chưa đăng nhập");
    return <Navigate to="/signin" />;
  }
  if (auth.user.status === 0) {
    // Modal.error({
    //   title: "Tài khoản không được phân quyền quản trị",
    //   content: "Vui lòng đăng nhập bằng tài khoản admin để vào !",
    // });
    message.error("Bạn không phải là admin");
    return <Navigate to="/" />;
  }
  return <>{children}</>;
};

export default PrivateRouter;