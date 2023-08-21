import React, { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../../services/services";
import { Link } from "react-router-dom";

const CategoryStrip = () => {
  const [ar, setAr] = useState([]);


  useEffect(() => {
    doApi();
   

  }, []);

  const doApi = async () => {
    let url = API_URL + "/categories";
    let data = await doApiGet(url);
    console.log(data);
    setAr(data);
  };

  return (
    <div className="flex flex-row justify-around p-4 bg-white border-2">
      {ar.map((item, i) => {
        return (
          <Link
            to={"/category/" + item.category_id}
            className="cat-transform  text-lg text-black hover:text-yellow-400
            transform hover:scale-125   transition duration-500"
          >
            {item.category_id}
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryStrip;
