import React, { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../../services/services";
import PageProductItem from "./PageProductItem";

const SameProductList = (props) => {
  const [ar, setAr] = useState([]);
  let { category } = props;

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    console.log(category);

    let urlCat = `${API_URL}/products/?cat=${category}&perPage=5`;
    let dataCat = await doApiGet(urlCat);
    // console.log(dataCat);
    let appAr = dataCat;
    console.log(props._id);
    console.log(appAr);
    // לבדוק אם האיידי של האפליקציה המוצגת קיים במערך ואז להוריד אותו
    // אם לא לדאוג שהמערך יהיה באורך 4 פריטים בלבד
    let productIndex = appAr.findIndex((item) => item._id == props._id);

    productIndex > -1 ? appAr.splice(productIndex, 1) : appAr.pop();
    setAr(appAr);
  };

  return (
    <div className="">
      <h2 className="text-center text-xl font-bold mt-2" >SIMILAR ITEMS</h2>

     <div className="flex flex-wrap justify-center p-2 space-x-3 ">
      {ar.map((item) => {
        return <PageProductItem key={item._id} item={item} />;
      })}
     </div>
    </div>
  );
};

export default SameProductList;
