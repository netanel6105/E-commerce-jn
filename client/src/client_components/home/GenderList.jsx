import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, doApiGet } from "../../services/services";

const GenderList = () => {
  const nav = useNavigate();
  const [ar, setAr] = useState([]);

  useEffect(() => {
    // doApi();
  }, []);

  // const doApi = async () => {
  //   let url = API_URL + "/categories";
  //   let data = await doApiGet(url);
  //   console.log(data);
  //   setAr(data);
  // };

  return (
    <div className="h-[400px]">
      <div className="flex justify-center mt-16">
        <h1 className="text-7xl text-bold">Choose gender :)</h1>
      </div>

      <div className="flex justify-center  mt-32">
        <button
          onClick={() => {}}
          className="bg-black text-white rounded-full py-5 px-16 font-bold"
        >
          MEN
        </button>
        <button className="bg-black text-white rounded-full py-5 ml-8 px-12 font-bold">
          WOMEN
        </button>
      </div>
    </div>
  );
};

export default GenderList;
