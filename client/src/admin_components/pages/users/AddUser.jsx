import React from 'react'
import { API_URL, doApiMethod } from '../../../services/services';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const AddUser = () => {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();
    const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    const onSub = (_bodyData) =>{
        console.log(_bodyData);
        doApi(_bodyData) 
    }


    const doApi = async(_bodyData)=>{
        try {
         let url = API_URL+"/users";
         let data = await doApiMethod(url,'POST',_bodyData);
         if (data._id) {
            toast.info("users added");
            nav("/admin/users");
         }   
        }
        catch (err) {
            console.log(err);
            alert("There problem come back later");
        }
    }


  return (
    <div>
      <h4 className='font-medium ml-6 mt-2'>Add User</h4>
    <div className="flex overflow-hidden w-full rounded-lg border border-gray-200 shadow-md m-5">
     <form onSubmit={handleSubmit(onSub)} id="id_form" className="p-5 flex">
          <div className="min-w-[600px] ml-5">

           {/*name */}
           <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Name </label>
              <input  {...register('name', { required: { value: true, message: 'name is required' }, minLength: { value: 2, message: 'At least 2 characters' }, maxLength: { value: 20, message: 'Maximum 20 characters' } })}
                type="text"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
              {errors.name && <p className='text-red-600'>{errors.name.message} </p>}
            </div>

            {/* email */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email </label>
              <input {...register('email', { required: { value: true, message: 'email is required' }, pattern: { value: emailReg, message: 'Invalid email' } })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
             {errors.email && <p className='text-red-600'>{errors.email.message} </p>}
            </div>


    
            {/* password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> password </label>
              <input  {...register('password', { required: true, minLength: 3, maxLength: 20 })}
                type="text"
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50  focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
             {errors.password && <p className='text-red-600'>password is required </p>}

            </div>


            <div className="mt-4">
            <button onClick={() => nav(-1)} type='button' className='bg-black text-white  rounded-full py-2 px-4  font-bold'  >Back</button>

              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded-full w-[120px]">
                Add 
              </button>
            </div>
          </div>

        </form>
         
    </div>
    </div>
  )
}

export default AddUser