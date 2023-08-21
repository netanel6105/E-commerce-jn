import React, { useEffect, useState } from "react";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiMethod } from "../services/services";
import { getLocal } from "../services/LocalService";
import Loading from "../global/Loading";
import PageProductItem from "../client_components/productList/PageProductItem";
// import { Modal } from "../global/Modal";

const FavsProduct = () => {
  // יכיל את הרשימה של המוצרים של אותה קטגוריה
  const [ar, setAr] = useState([]);
  const [favsLocal_ar, setFavsLocalAr] = useState(getLocal());
  // יכיל את המידע על הקטגוריה
  const [catInfo, setCatInfo] = useState({});
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    // console.log(params["catName"]);
    doApi();
  }, []);

  const doApi = async () => {
    setLoading(true);

    // מביא את רשימת המשחקים של אותה קטגוריה
    console.log(favsLocal_ar);
    let url = `${API_URL}/products/groupApp`;
    let data = await doApiMethod(url, "POST", { ids: favsLocal_ar });
    console.log(data);
    setAr(data);
    setLoading(false);
  };

  return (
    <div className="text-center  justify-center border  min-h-[500px]">
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <h1 className="text-lg">Your favorite products</h1>
          <p className="">{catInfo.info}</p>
          <div className="flex flex-wrap place-content-center mt-4">
            {ar.map((item) => {
            return (
              <div className="text-center justify-center  border mt-4 ml-3">
                <div className="flex justify-center">
                  <img src={item.img_url} className="w-[250px] h-[300px]" alt="" />
                </div>
          
                <div className="mt-2">{item.price} ILS</div>
          
                <div className="mb-1">{item.name.substring(0, 13)}</div>
          
                <div className="h-[50px] flex items-center justify-center">
                  <Link
                    className="bg-black text-white py-2 w-[150px] font-bold"
                    to={"/info/" + item._id}
                  >
                    MORE INFO 
                  </Link>
                </div>
              </div>
            );
            })}
          </div>

        
        </React.Fragment>
      )}
    </div>
  );
};

export default FavsProduct;
