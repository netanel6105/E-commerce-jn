import React, { useContext, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TOKEN_KEY } from "../../../services/services";

import { FaHeart } from "react-icons/fa";
// import { MyContext } from "../../../context/myContext";
import { FAVS_LOCAL_KEY, SHOPPING_BAG_LOCAL_KEY, getLocalBag } from "../../../services/LocalService";

const HeaderUser = () => {
  const nav = useNavigate();
  const searchRef = useRef();

  const getCountFavs = () => JSON.parse(localStorage.getItem(FAVS_LOCAL_KEY))?.length || 0;
  const getCountCart = () => JSON.parse(localStorage.getItem(SHOPPING_BAG_LOCAL_KEY))?.length || 0;
  const [counterFav, setCounterFav] = useState(getCountFavs());
  const [counterCart, setCounterCart] = useState(getCountCart());

  useEffect(() => {
    setCounterFav(getCountFavs());
    setCounterCart(getCountCart());
  }, [getCountCart(),getCountFavs()]);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    toast.info("you logged out, see you soon ");
    nav("/");
  };

  return (
    <div>
      <div className="flex flex-col p-4 bg-neutral-800">
        <div className="flex  justify-between items-center">
          <Link
            to="/"
            className="font-bold text-lg ml-16 text-white hover:text-yellow-400"
          >
            J&N
          </Link>

          <div className="flex   mr-16 items-center ml-auto gap-2 border-black rounded-xl bg-neutral-100">
            <button
              onClick={() => {
                nav(`/search?s=${searchRef.current.value}`);
              }}
            >
              <CiSearch className="ml-2 text-yellow-600" />
            </button>
            <input
              onKeyDown={(e) => {
                e.key === "Enter" && nav(`/search?s=${searchRef.current.value}`);
              }}
              className="bg-neutral-100 rounded-xl outline-none"
              ref={searchRef} 
              type="search"
              placeholder="Search"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-around items-center p-4">
        <div className="flex gap-5">
          <Link to={"/shoppingBag"}>
            <div className="flex items-center justify-center bg-white">
              <div className="relative scale-75 mt-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-8 w-8 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span className="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">
                  {counterCart}
                </span>
              </div>
            </div>
          </Link>

          <div className="">
            <Link to={"/favs/"}>
              <div className="relative scale-75">
                <span className="absolute left-8 -top-2 bg-red-600 rounded-full p-0.5 px-2 text-sm text-red-50">
                  {counterFav}
                </span>
                <FaHeart size={35} className="ml-1" />
              </div>
            </Link>
          </div>
        </div>

        {!localStorage.getItem("token") ? (
          <div>
            <div className="flex gap-5">
              <Link
                to="/register"
                className="font-semibold text-lg text-black hover:text-blue-600"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="font-semibold text-lg text-black hover:text-blue-600"
              >
                Login
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <button
              onClick={logout}
              className="bg-red-700 rounded-full py-1 px-3 font-bold text-white"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderUser;



