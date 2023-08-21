import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, doApiGet } from "../../services/services";
import Loading from "../../global/Loading";
import PageProductItem from "./PageProductItem";

const PageProductList = () => {
  const [ar, setAr] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [catInfo, setCatInfo] = useState([]);
  // const [gender, setGender] = useState([]);
 

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    setLoading(true);
    let catName = params["catName"];
    // let gender = params["men"];
    
    let urlCat = `${API_URL}/categories/byCat/${catName}`;
    let dataCat = await doApiGet(urlCat);
    console.log(dataCat);
    setCatInfo(dataCat)

    let url = `${API_URL}/products/?cat=${catName}`;
    let data = await doApiGet(url);
    console.log(data);
    setAr(data);

    // let urlGender = `${API_URL}/products/byGender/${gender}`;
    // let dataGender = await doApiGet(urlGender);
    // console.log(dataGender);
    // setGender(dataGender);
    
    setLoading(false)


  };


  
  return (

    <div className='text-center'>
    {loading && <Loading/>}

    <React.Fragment>
    <h1 className='text-3xl mt-2 mb-1'>Best  {catInfo.name} </h1>
    <h2 className="mb-1">VIEW ALL</h2>
    
   
    <div className=' flex  flex-wrap gap-3  justify-center'>

        {ar.map(item =>{
            return(
                <PageProductItem key={item._id} item={item}/>
            )
        })}
    </div>
    </React.Fragment>
</div>
  )
};

export default PageProductList;
