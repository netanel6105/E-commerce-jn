import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiMethod } from '../../../services/services';
import { toast } from 'react-toastify';

const AddCategory = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();
  const [error, setError] = useState('')
  const [img, setImg]= useState(null)


  const onSub = (_bodyData) =>{
    console.log(_bodyData);
    doApi(_bodyData)
  }

  const doApi = async(_bodyData) =>{
    let url = API_URL+"/categories";
    try {
      let data = await doApiMethod(url,"POST",_bodyData);
      if(data._id){
        toast.info("Category Added");
        nav("/admin/category");
      }
    }
     catch (err) {
      console.log(err.response.data);
      alert("There are problem!!");
    }
    }
  

  const handleChangeImg=(event)=>{
    setImg(event.target.value)
    console.log("lala");

  }

  return (
    <div>
      <h4 className="font-medium ml-6 mt-2">Add Category</h4>
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


            {/* category_id */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {" "}
                category_id{" "}
              </label>
              <input
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

           

            {/* info */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                
                info
              </label>
              <input
                {...register("info", { minLength: 2, required: true })}
                type="text"
                id="large-input"
                className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              {errors.info && (
                <div className="text-danger">
                  
                  * Enter valid info (min 2 chars)
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
        <div className="w-[400px]  ml-20 mt-7 ">
          <h1 className="text-center">Image in Live:</h1>
          <img className='h-[50vh]' src={img} alt="" />
        </div>
      </div>
    </div>
  );
};
export default AddCategory