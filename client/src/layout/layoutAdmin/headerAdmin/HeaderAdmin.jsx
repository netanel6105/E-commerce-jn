import React, { useState } from "react";
import {
  FaBars,
  FaCommentAlt,
  FaShoppingBag,
  FaTh,
  FaUsers,
  FaSearchLocation,
  FaLockOpen,
  FaList,
} from "react-icons/fa";
import {TiWeatherPartlySunny} from "react-icons/ti"
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";

function HeaderAdmin({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/admin/login",
      name: "Login",
      icon: <FaLockOpen />,
    },
    {
      path: "/admin/category",
      name: "Category",
      icon: <FaSearchLocation />,
    },
    {
      path: "/admin/product",
      name: "Product",
      icon: <FaShoppingBag />,
    },
    {
      path: "/admin/users",
      name: "Users",
      icon: <FaUsers />,
    },
    // {
    //   path: "/admin/comment",
    //   name: "Comment",
    //   icon: <FaCommentAlt />,
    // },
    {
      path: "/admin/todo",
      name: "Todo",
      icon: <FaList />,
    },
    {
      path: "/admin/weather",
      name: "Weather",
      icon: <TiWeatherPartlySunny/>
    },
  ];

  return (
    
    
    
    <div className="flex">
      <div className="flex">
        <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar ">
          <div className="top_section">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
              Admin
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars"
            >
              <FaBars onClick={toggle} />
            </div>
          </div>
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link"
              activeclassName="active"
            >
              <div className="icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text"
              >
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
        {/* <main className="flex">{children}</main> */}
      </div>
      
    </div>
  );
}

export default HeaderAdmin;
