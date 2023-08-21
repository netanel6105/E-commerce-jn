import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL, doApiMethod } from "../../../services/services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();
  const [error, setError] = useState('')
  const [img, setImg]= useState(null)


  const onSub = (_bodyData) => {
    console.log(_bodyData);
    doApi(_bodyData);
  };

  const doApi = async (_bodyData) => {
    let url = API_URL+"/products";
    try {
        let data = await doApiMethod(url,"POST", _bodyData );
        if(data._id){
            toast.info("Product Added");
            nav("/admin/product");
        }
    } 
    catch (err) {
        console.log(err);
        alert(err.response.data.err_msg);
      }
  };

  const handleChangeImg=(event)=>{
    setImg(event.target.value)
    console.log("lala");

  }

  return (
    <div>
      <h4 className="font-medium ml-6 mt-2">Add Product</h4>
      <div className="flex overflow-hidden w-full rounded-lg border border-gray-200 shadow-md m-5">
        <form onSubmit={handleSubmit(onSub)} id="id_form" className="p-5 flex">
          <div className="min-w-[600px] ml-5">
            {/*name */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {" "}
                Name{" "}
              </label>
              <input
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

           
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Price{" "}
              </label>
              <input
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

            {/* ref={inputRef} */}
            {/*  img_url*/}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {" "}
                Img_url{" "}
              </label>
              <input
             
                {...register("img_url", { minLength: 2, required: false })}
                onChange={handleChangeImg}
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
                Add
              </button>
            </div>
          </div>
        </form>
        <div className="w-[400px] ml-20 mt-7 ">
          <h1 className="text-center">Image in Live:</h1>
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
