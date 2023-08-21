import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import AuthAdmin from '../../auth/AuthAdmin';
import Loading from '../../../global/Loading';
import { API_URL, doApiGet, doApiMethod } from '../../../services/services';

const EditCategory = () => {
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const params = useParams();
  const nav = useNavigate();
  const [info ,setInfo] = useState({});

  useEffect(()=>{
    doApiInit();
  },[])


  const doApiInit = async () => {
    let url = API_URL + "/categories/single/" + params["id"];
    try {
      let data = await doApiGet(url);
      console.log({ data });
      setInfo(data);
    } catch (err) {
      console.log(err);
      alert("there are problem!!");
    }
  };


  const onSub = (bodyData) => {
    console.log(bodyData);
    doApi(bodyData);
  };

  const doApi = async (bodyData) => {
    try {
      let url = API_URL + "/categories/" + params["id"];
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
        
  
        <h1 className="text-xl text-center mt-2">Edit Category</h1>
  
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


  
          

              {/* category_name */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {" "}
                  Category_id{" "}
                </label>
                <input
                  defaultValue={info.category_id}
                  {...register("category_id", { minLength: 2, required: true })}
                  type="text"
                  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.category_id && (
                  <div className="text-danger">
                    * Enter valid category_id (min 2 chars){" "}
                  </div>
                )}
              </div>
  
  
              {/* Description */}
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  {" "}
                  info
                </label>
                <input
                  defaultValue={info.info}
                  {...register("info", { minLength: 2, required: true })}
                  type="text"
                  id="large-input"
                  className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.info && (
                  <div className="text-danger">
                    {" "}
                    * Enter valid info (min 2 chars){" "}
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


export default EditCategory