import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL, doApiGet } from "../../services/services";
import GenderList from "./GenderList";

const CategoryList = () => {
  const nav = useNavigate();
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
    <div className="w-full flex flex-col items-center">
      {ar.map((item, i) => {
        const handleClick = () => {
          nav(`/category/${item.category_id}`);
        };

        return (
          <div
            className="py-1 w-[1200px]  md:w-[1300px] h-[400px] flex items-center justify-center font-semibold"
            onClick={handleClick}
            key={item._id}
          >
            <div className="relative w-full h-full">
              <img
                src={item.img_url}
                className="w-full h-full object-cover"
                alt={item.name}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-gray-900 text-4xl md:text-8xl">
                  <Link
                    to={`/category/${item.category_id}`}
                    className="text-center"
                  >
                    {item.name}
                  </Link>
                  {/* <Link to="/category/gender/">{item.name}</Link> */}
                </h3>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// {/* <div className="w-full flex flex-col items-center">
//   {ar.map((item, i) => {
//     return (
//       <div className="py-1 w-[1300px] h-[500px] flex items-center justify-center font-semibold"
//       onClick={() => { nav("/category/" + item.category_id); }} key={item._id}
//        >

//         <div className="relative w-full h-full">
//           <img src={item.img_url} className="w-full h-full object-cover" alt={item.name} />
//           <div className="absolute inset-0 flex items-center justify-center">
//             <h3 className="text-gray-900 text-8xl  ">
//               <Link to={"/category/" + item.category_id} >{item.name}</Link>
//               {/* <Link to={"/category/gender/"}>{item.name}</Link> */}
//             </h3>
//           </div>
//         </div>

//       </div>
//     );
//   })}
// </div> */}

export default CategoryList;
