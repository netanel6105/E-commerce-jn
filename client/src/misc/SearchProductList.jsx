import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URL, doApiGet } from "../services/services";
import Loading from "../global/Loading";
import PageProductItem from "../client_components/productList/PageProductItem";

const SearchProductList = () => {
  // יכיל את הרשימה של האפליקציות/משחקים של אותה קטגוריה
  const [ar, setAr] = useState([]);
  const [query] = useSearchParams();
  // יכיל את המידע על הקטגוריה
  const [searchFor, setSearchFor] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // console.log(params["catName"]);
    doApi();
  }, [query])

  const doApi = async () => {
    // ?s=
    setSearchFor(query.get("s"));
    let url = `${API_URL}/products/?search=${query.get("s")}&perPage=4`;
    let data = await doApiGet(url);
    console.log(data);
    setAr(data);
  }

  return (
    <div className="text-center  border ml-3">

         {loading ? <Loading /> :
      <React.Fragment>
        <h1 className=''>Search for {searchFor}:</h1>
        
        <div className="flex flex-wrap mt-5 place-content-center">

          {ar.map(item => {
            return (
              <PageProductItem key={item._id} item={item} />
            )
          })}
        </div>
      </React.Fragment>
      }
    </div>
  )
};

export default SearchProductList;
