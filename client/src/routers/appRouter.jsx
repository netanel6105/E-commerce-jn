import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayoutAdmin from "../layout/layoutAdmin/LayoutAdmin";
import { ToastContainer } from "react-toastify";
import LayoutUser from "../layout/layoutUser/LayoutUser";
import { MyContext } from "../context/myContext";

import UserList from "../admin_components/pages/users/UserList";
import AdminLogin from "../admin_components/pages/AdminLogin";
import Dashboard from "../admin_components/pages/Dashboard";
import CategoryList from "../admin_components/pages/category/categoryList";
import ProductList from "../admin_components/pages/products/ProductList";

import Comment from "../admin_components/pages/Comment";
import ToDolist from "../admin_components/pages/todo/ToDolist";
import EditProducts from "../admin_components/pages/products/EditProducts";
import AddUser from "../admin_components/pages/users/AddUser";
import AddProduct from "../admin_components/pages/products/AddProduct";
import EditCategory from "../admin_components/pages/category/EditCategory";
import AddCategory from "../admin_components/pages/category/AddCategory";
import Home from "../client_components/Home";

import PageProductList from "../client_components/productList/PageProductList";
import Register from "../client_components/userPages/Register";
import Login from "../client_components/userPages/Login";
import PageProductItemInfo from "../client_components/productList/PageProductItemInfo";
import Payment from "../client_components/productList/Payment";
import ThanksForPay from "../client_components/productList/ThanksForPay";
import SearchProductList from "../misc/SearchProductList";
import FavsProduct from "../misc/FavsProduct";
import ShoppingBag from "../misc/ShoppingBag";
import AcountSumPay from "../client_components/productList/AcountSumPay";
import GenderList from "../client_components/home/GenderList";
import Weather from "../admin_components/pages/weather/Weather";
import Currency from "../client_components/productList/Currency";


const AppRouter = () => {
  return (
    <Router>
      <MyContext.Provider value={{}}>
        {/* User Layout */}
        <Routes>
          <Route path="/" element={<LayoutUser />}>
            <Route index element={<Home />} />
            <Route path="/category/:catName" element={<PageProductList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/info/:id" element={<PageProductItemInfo />} />
            <Route path="/payment/" element={<Payment />} />
            <Route path="/sumPay/" element={<AcountSumPay />} />
            <Route path="/thanks/" element={<ThanksForPay />} />
            <Route path="/search/" element={<SearchProductList />} />
            <Route path="/favs/" element={<FavsProduct />} />
            <Route path="/shoppingBag/" element={<ShoppingBag />} />
            <Route path="/gender/" element={<GenderList />} />
            <Route path="/currency/" element={<Currency />} />
          </Route>
          {/* Admin Layout */}
          <Route path="/admin/" element={<LayoutAdmin />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin/category" element={<CategoryList />} />
            <Route path="/admin/category/edit/:id" element={<EditCategory />} />
            <Route path="/admin/category/new" element={<AddCategory />} />
            <Route path="/admin/product" element={<ProductList />} />
            <Route path="/admin/product/edit/:id" element={<EditProducts />} />
            <Route path="/admin/product/new" element={<AddProduct />} />
            <Route path="/admin/users" element={<UserList />} />
            <Route path="/admin/users/add" element={<AddUser />} />
            {/* <Route path="/admin/comment" element={<Comment />} /> */}
            <Route path="/admin/todo" element={<ToDolist />} />
            <Route path="/admin/weather" element={<Weather />} />
          </Route>
          {/* Not Found */}
          <Route path="/" element={<h1>Not Found 404</h1>} />
        </Routes>

        <ToastContainer theme="colored" position="top-left" />
      </MyContext.Provider>
    </Router>
  );
};
export default AppRouter;
