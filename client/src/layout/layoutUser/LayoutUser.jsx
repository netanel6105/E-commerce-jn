import React from "react";
import HeaderUser from "./headerUser/HeaderUser";
import { Outlet } from "react-router-dom";
import FooterUser from "./footerLayout/FooterUser";

const LayoutUser = () => {
  return (
    <div>
      <HeaderUser />
      <Outlet />
      <FooterUser />
    </div>
  );
};

export default LayoutUser;
