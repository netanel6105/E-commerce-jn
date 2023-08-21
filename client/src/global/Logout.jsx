import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../context/myContext';

const Logout = () => {
    const nav = useNavigate();
    const {logout} = useContext(MyContext)

    useEffect(()=>{
        logout()
        nav("/admin/login")
    },[])
  return (
    <></>
  )

}

export default Logout
