import React, { useContext, useEffect, useState } from "react";
import { getLocalBag, removeIdFromLocalBag } from "../services/LocalService";
import { API_URL, doApiGet, doApiMethod } from "../services/services";
import Loading from "../global/Loading";
import { RiDeleteBin2Fill } from "react-icons/ri";

import { Link, useNavigate, useParams } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
// import { MyContext } from "../context/myContext";

const ShoppingBag = () => {
  // יכיל את הרשימה של המוצרים של אותה קטגוריה
  const [ar, setAr] = useState([]);

  const [shoppingBag_ar, setShoppingBag_ar] = useState(getLocalBag());
  // יכיל את המידע על הקטגוריה
  const [catInfo, setCatInfo] = useState({});
  const [loading, setLoading] = useState(false);
  // const [isBag, setIsBag] = useState(false);
  const nav = useNavigate();
 

  useEffect(() => {
    // console.log(params["catName"]);
    doApi();
    checkBag();
  }, [shoppingBag_ar]);

  const doApi = async () => {
    setLoading(true);

    // מביא את רשימת המוצרים של אותה קטגוריה
    console.log(shoppingBag_ar);
    let url = `${API_URL}/products/groupApp`;
    let data = await doApiMethod(url, "POST", { ids: shoppingBag_ar });
    console.log(data);
    setAr(data);
    setLoading(false);
    
  };

  const onAddRemoveBag = (_id) => {
    removeIdFromLocalBag(_id);
    checkBag();
  };

  const checkBag = () => {
    // TODO:בודקים מול הלוקאל אם קיים בשופינג באג
    getLocalBag();
  };

  return (
    <div className="text-center  justify-center border ml-3 min-h-[500px]">
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <h1 className="text-lg">Your Shopping Bag</h1>
          <p className="">{catInfo.info}</p>
          <div className="flex flex-wrap place-content-center mt-4">
             {ar.map((item) => {
              return (
                <div className="text-center justify-center border ml-3">
                  <div className="flex justify-center">
                    <img
                      src={item.img_url}
                      className="w-[250px] h-[300px]"
                      alt={item.name}
                    />
                  </div>

                  <div className="mt-2">{item.price} ILS</div>

                  <div className="mb-1">{item.name.substring(0, 13)}</div>

                  <div className="h-[50px] border-4 w-full  flex justify-center items-center ">
                    <Link className="mr-2  py-2  " to={"/info/" + item._id}>
                      <FaPencilAlt />
                    </Link>

                    <button
                      onClick={() => {
                        onAddRemoveBag(item._id);
                        doApi()
                      }}
                      className="ml-5"
                    >
                      <RiDeleteBin2Fill />
                    </button>
                  </div>
                </div>
              );
            })}
            
          </div>
            {!!JSON.parse(localStorage["Shopping_bag_ar"]).length && (
                <button onClick={()=>{
                  nav("/sumPay/")
                }}
                
                className=" mt-5 submit-button px-4 py-2 rounded-full bg-blue-300 text-blue-900 focus:ring focus:outline-none w-[300px] text-xl font-semibold transition-colors">
              Pay now
            </button>  
            )}
        </React.Fragment>
      )}
    </div>
  );
};

export default ShoppingBag;

{
  /* <button
            onClick={() => {
              setModalOpen(true);
            }}
            className=" mt-5 submit-button px-4 py-2 rounded-full bg-blue-300 text-blue-900 focus:ring focus:outline-none w-[300px] text-xl font-semibold transition-colors"
          >
            Pay now
          </button>

          <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex flex-col items-center justify-center">
            {modalOpen && (
              <Modal
                title={<div className="text-3xl">Go To Payment Page</div>}
                onClose={() => setModalOpen(false)}
                footer={
                  <div>
                    <button
                      className="bg-yellow-600 rounded-md py-2 px-5  font-bold"
                      onClick={() => {
                        nav("/payment/");
                        setModalOpen(false);
                      }}
                    >
                      Yes
                    </button>

                    <button
                      className="bg-black rounded-md py-2 px-3 mt-2 mb-2 ml-2 font-bold"
                      onClick={() => setModalOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                }
              >
                Are you sure ?
              </Modal>
            )}
          </div> */
}
