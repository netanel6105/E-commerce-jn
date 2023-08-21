import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { API_URL, doApiMethod } from "../../services/services";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();

  const onSubForm = (bodyData) => {
    console.log(bodyData);
    doApi(bodyData);
  };

  const doApi = async (bodyData) => {
    try {
      let url = `${API_URL}/users`;
      let data = await doApiMethod(url, "POST", bodyData);
      if (data._id) {
        nav("/login");
        toast.success("You sign up succefuly, now you can log in");
      }
    } catch (err) {
      if (err.code == 11000) {
        toast.error("Email already in system , You need to login");
      } else {
        alert("There problem , come back later");
        console.log(err);
      }
    }
  };

  return(
<div className="flex flex-wrap justify-center">
    <div  className="overflow-hidden w-[600px] rounded-lg border border-gray-200 shadow-md m-5">
    <div className=' bg-neutral-800 pl-12  text-blue-300 p-4 font-medium'>Register</div>

    <form onSubmit={handleSubmit(onSubForm)} className=" px-8 pt-[100px] pb-8 mb-4 "> 

      <div className="mb-4">
        <label className="block text-black-700 text-xl font-bold mb-2">
         Name:
        </label>

        <input {...register("name", {  required: true, minLength: 2 })}
          className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Name" />
        {errors.name && <div className='text-red-600 '>*enter valid Name</div>}
      </div>


      <div className="mb-4">
        <label className="block text-black-700 text-xl font-bold mb-2">
          email:
        </label>

        <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
          className="shadow appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="email" />
        {errors.email && <div className='text-red-600 '>*enter valid email</div>}
      </div>


      <div class="mb-6">
        <label className="block text-black-700 text-xl font-bold mb-2" >
          Password:
        </label>
        <input  {...register("password", { required: true, minLength: 3 })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="**********" />
        {errors.password && <div className='text-red-600'>*enter valid password (min 3 chars)</div>}

      </div>

      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Register
        </button>

      </div>
    </form>
  </div>
  </div>
  )
};

export default Register;
