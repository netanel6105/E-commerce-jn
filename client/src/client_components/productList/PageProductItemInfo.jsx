import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiGet } from "../../services/services";
import Loading from "../../global/Loading";
import { FaHeart } from "react-icons/fa";
import { BsArrowLeftCircle } from "react-icons/bs";
import SameProductList from "./SameProductList";
import {
  addIdToFavLocal,
  addIdToShopBag,
  getLocal,
  getLocalBag,
  removeIdFromLocal,
  removeIdFromLocalBag,
} from "../../services/LocalService";

const PageProductItemInfo = () => {
  const [info, setInfo] = useState({});
  const [isFav, setIsFav] = useState(false);
  const [isBag, setIsBag] = useState(false);
  const nav = useNavigate();
  const params = useParams();

  useEffect(() => {
    doApi();
    checkFav();
    checkBag();
  }, [params]);

  const doApi = async () => {
    let url = `${API_URL}/products/single/${params["id"]}`;
    let data = await doApiGet(url);
    console.log(data);
    setInfo(data);
  };

  const onBackClick = () => {
    nav(-1);
  };

  const onAddRemoveFav = (_id) => {
    if (!isFav) {
      addIdToFavLocal(_id);
    } else {
      removeIdFromLocal(_id);
    }

    checkFav();
  };

  const checkFav = () => {
    // TODO:בודקים מול הלוקאל אם קיים בפייבוריט
    let fav_ar = getLocal();
    if (fav_ar.includes(params["id"])) {
      setIsFav(true);
    } else {
      setIsFav(false);
    }
  };

  const onAddRemoveBag = (_id) => {
    if (!isBag) {
      addIdToShopBag(_id);
    } else {
      removeIdFromLocalBag(_id);
    }

    checkBag();
  };

  const checkBag = () => {
    // TODO:בודקים מול הלוקאל אם קיים בשופינג באג
    let bag_ar = getLocalBag();
    if (bag_ar.includes(params["id"])) {
      setIsBag(true);
    } else {
      setIsBag(false);
    }
  };

  return (
    <div className="">
      {info._id ? (
        <React.Fragment>
          <div className="flex flex-wrap justify-around ">
            <div className="flex flex-wrap ">
              <img
                src={info.img_url}
                className="w-[500px] md:w-auto mt-5 border"
                alt="app image"
              />
            </div>

          <div className="flex flex-wrap ">
            <div className="   mr-12  ml-10  mt-8">
              <h1 className="text-4xl mt-5 text-center">{info.name.substring(0, 24)}</h1>

              <h2 className="text-xl mt-3 text-center">
                {info.description.substring(0, 46)}
              </h2>

              <div className=" flex  justify-center text-center mt-16 ">
                <h2 className="bg-yellow-200 text-xl w-[250px] md:w-auto ">{info.price} ILS</h2>
                
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  onClick={() => {
                    onAddRemoveBag(info._id);
                    
                  }}
                  className="bg-black text-white font-serif w-[250px] md:w-auto text-1xl h-[35px] "
                >
                  <span>{isBag ? "REMOVE FROM BAG" : "ADD TO BAG"}</span>
                </button>
              </div>

              <div className="mt-10 flex justify-center ">
                <button
                  onClick={() => {
                    onAddRemoveFav(info._id);
                  }}
                  className="flex justify-center ml-3 space-x-2 w-[230px] mr-3 mb-5"
                >
                  <FaHeart className="mt-1"/>
                  <h1 className="">{isFav ? "REMOVE FROM LIST" : "ADD MY LIST"}</h1>
                </button>

                
              </div>

              <div className="p-3 mt-20 ">
              <button
                  onClick={onBackClick}
                  className="flex flex-wrap  items-center  w-[100px] md:w-auto bg-black text-white rounded-full place-content-center py-1 px-2"
                >
                  <BsArrowLeftCircle
                    style={{ color: "gold", marginBottom: "1px" }}
                    className="me-2 mt-1"
                  />
                  Back
                </button>
              </div>
            </div>
            </div>
          </div>

          <hr className="mt-5 flex flex-wrap" />
          <SameProductList _id={info._id} category={info.category} />
        </React.Fragment>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default PageProductItemInfo;
