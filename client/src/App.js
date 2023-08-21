import "./App.css";
import { API_URL, TOKEN_KEY, doApiGet } from "./services/services";
import React, { useEffect, useState } from "react";
import AppRouter from "./routers/appRouter"; // Import AppRouter from the appropriate file
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function App() {

  // const logout = async() =>{
  //   localStorage.removeItem(TOKEN_KEY);
  //   toast.info('you logged out, see you soon ')
  //   // nav('/');
  // }

  return (

    <div className="App">
        <AppRouter />
    </div>

  );
}

export default App;
