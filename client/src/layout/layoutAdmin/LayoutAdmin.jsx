import React from "react";
import HeaderAdmin from "./headerAdmin/HeaderAdmin";
import { Outlet } from "react-router-dom";
import Navbar from "./headerAdmin/Navbar";
const LayoutAdmin = () => {
  return (
    <div className="flex">
      
      <HeaderAdmin />
      <Outlet />
    </div>
  );
};

export default LayoutAdmin;
