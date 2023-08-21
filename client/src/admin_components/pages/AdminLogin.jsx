import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { API_URL, TOKEN_KEY, doApiMethod } from '../../services/services';



const AdminLogin = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  // let emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const nav = useNavigate();


  const onSub = (bodyData) => {
    console.log(bodyData);
    doApi(bodyData)
  }

  const doApi = async (bodyData) => {
    try {
      let url = API_URL + "/users/login";
      let data = await doApiMethod(url, 'POST', bodyData)
      console.log(data);
      localStorage.setItem(TOKEN_KEY, data.token)
      nav("/admin/users")
    }
    catch (err) {
      console.log(err);
      alert('email or pass wrong')
    }
  }


  return (
    <div  className="overflow-hidden w-screen rounded-lg border border-gray-200 shadow-md m-5">
    <div className='bg-gray-800 pl-12  text-blue-300 p-4 font-medium'>Login</div>

    <form onSubmit={handleSubmit(onSub)} className="pl-[200px] px-8 pt-[100px] pb-8 mb-4 "> 

      <div className="mb-4">
        <label className="block text-black-700 text-xl font-bold mb-2">
          email:
        </label>

        <input {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i })}
          className="shadow appearance-none border rounded w-96  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="email" />
        {errors.email && <div className='text-red-600 '>*enter valid email</div>}
      </div>


      <div class="mb-6">
        <label className="block text-black-700 text-xl font-bold mb-2" >
          Password:
        </label>
        <input  {...register("password", { required: true, minLength: 3 })}
          className="shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="**********" />
        {errors.password && <div className='text-red-600'>*enter valid password (min 3 chars)</div>}

      </div>

      <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Login
        </button>

      </div>
    </form>
  </div>
  

  )
}

export default AdminLogin