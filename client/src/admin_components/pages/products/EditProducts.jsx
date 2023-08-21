import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../../services/services';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthAdmin from "../../auth/AuthAdmin";
import Loading from '../../../global/Loading';

const EditProducts = () => {

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const params = useParams();
  const nav = useNavigate();
  const [info ,setInfo] = useState({});

  useEffect(()=>{
    doApiInit();
  },[])

  
  const doApiInit = async () => {
    let url = API_URL + "/products/single/" + params["id"];
    try {
      let data = await doApiGet(url);
      console.log({ data });
      setInfo(data);
    } catch (err) {
      console.log(err);
      alert("there are problem, come back latter 1234");
    }
  };

  const onSub = (bodyData) => {
    console.log(bodyData);
    doApi(bodyData);
  };

  const doApi = async (bodyData) => {
    try {
      let url = API_URL + "/products/" + params["id"];
      let data = await doApiMethod(url, "PUT", bodyData);
      console.log(data);
      if (data.modifiedCount == 1) {
        toast.info("Product Update");
        nav(-1);
      } else {
        toast.error("You not change nothing from the last update");
      }
    } catch (err) {
      console.log(err);
      alert("There problem come back later");
    }
  };

  return (
    <div className="overflow-hidden w-full rounded-lg border border-gray-200 shadow-md m-5">
      <AuthAdmin />
      

      <h1 className="text-xl text-center mt-2">Edit product</h1>

      {!info._id ? (
        <Loading/>
      ) : (
        <form onSubmit={handleSubmit(onSub)} id="id_form" className="p-5 flex">
          <div className="min-w-[600px] ml-5">
            {/*name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {" "}
                Name{" "}
              </label>
              <input
                defaultValue={info.name}
                {...register("name", { minLength: 2, required: true })}
                type="text"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.name && (
                <div className="text-danger">
                  {" "}
                  * Enter valid name (min 2 chars){" "}
                </div>
              )}
            </div>

            {/* price */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price{" "}
              </label>
              <input
                defaultValue={info.price}
                {...register("price", { minLength: 2, required: true })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.price && (
                <div className="text-danger">
                  {" "}
                  * Enter valid price min 2 chars{" "}
                </div>
              )}
            </div>

            {/* category_name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {" "}
                Category_name{" "}
              </label>
              <input
                defaultValue={info.category}
                {...register("category", { minLength: 2, required: true })}
                type="text"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.category && (
                <div className="text-danger">
                  * Enter valid category_name (min 2 chars){" "}
                </div>
              )}
            </div>

            {/* gender */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {" "}
                Gender{" "}
              </label>
              <input
                defaultValue={info.gender}
                {...register("gender", { minLength: 2, required: true })}
                type="text"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.gender && (
                <div className="text-danger">
                  {" "}
                  * Enter valid gender (min 2 chars){" "}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {" "}
                Description
              </label>
              <input
                defaultValue={info.description}
                {...register("description", { minLength: 2, required: true })}
                type="text"
                id="large-input"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.description && (
                <div className="text-danger">
                  {" "}
                  * Enter valid Description (min 2 chars){" "}
                </div>
              )}
            </div>

            {/*  img_url*/}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {" "}
                Img_url{" "}
              </label>
              <input
                defaultValue={info.img_url}
                {...register("img_url", { minLength: 2, required: false })}
                type="text"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.img_url && (
                <div className="text-danger">
                  {" "}
                  * Enter valid img_url (min 2 chars){" "}
                </div>
              )}
            </div>

            <div className="mt-4">
              <button onClick={() => nav(-1)} type='button' className='bg-black text-white  rounded-full py-2 px-4  font-bold'  >Back</button>

              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded-full w-[120px]">
                Update
              </button>

            </div>
          </div>

          

          <div className="w-[400px] ml-20 mt-7">
            <img src={info.img_url} alt={info.name} />
          </div>
        </form>
      )}
    </div>
  );
};
 
export default EditProducts