import React, { useEffect, useState } from "react";
import AuthAdmin from "../../auth/AuthAdmin";
import { useSearchParams } from "react-router-dom";
import WeatherForm from "./WeatherForm";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
import { toast } from "react-toastify";

const Weather = () => {
  let [info, setInfo] = useState({});
  const [query] = useSearchParams();
  useEffect(() => {
    //   doApi(query.get("q"));
    doApi("Jerusalem");
  }, []);

  const doApi = async (_town) => {
    try {
        
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${_town}&APPID=a2d581b7fe2328a3df77563f53ea4a62`;
        let resp = await axios.get(url);
        console.log(resp.data);
        setInfo(resp.data);
    } 
    catch (err) {
        console.log(err);
        toast.error('you need insert somthing')
    }
  };

  return (
    <div
      className="overflow-hidden w-screen rounded-lg border border-gray-200 shadow-md m-5"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/314726/pexels-photo-314726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AuthAdmin />
      <div className="bg-gray-800 flex justify-center flex-wrap p-4">
        <WeatherForm doApi={doApi} />
      </div>
      {info.name && <WeatherInfo info={info} />}
    </div>
  );
};

export default Weather;
