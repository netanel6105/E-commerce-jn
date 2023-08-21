// import { useContext } from "react";
// import { MyContext } from "../context/myContext";

export const FAVS_LOCAL_KEY = "Ecomm_favs_ar";
export const SHOPPING_BAG_LOCAL_KEY = "Shopping_bag_ar";
const localFav_ar = localStorage[FAVS_LOCAL_KEY] ? JSON.parse(localStorage[FAVS_LOCAL_KEY]) : [];
const shopping_bag_ar = localStorage[SHOPPING_BAG_LOCAL_KEY] ? JSON.parse(localStorage[SHOPPING_BAG_LOCAL_KEY]) : [];

// const {setCounter, counter} = useContext(MyContext)
// פונקציה שמוסיפה ללוקאל איי די למערך הלוקאלי
export const addIdToFavLocal = (_id) => {
    localFav_ar.push(_id);
    
    if (localFav_ar.length > 20) {
      localFav_ar.shift();
  }
    localStorage.setItem(FAVS_LOCAL_KEY, JSON.stringify(localFav_ar));
  }

  export const getLocal = () => {
    return localFav_ar;
  }

  // מוחק איי די מהלוקאל
export const removeIdFromLocal = (_id) => {
    let favIDIndex = localFav_ar.findIndex(val => val === _id)
    localFav_ar.splice(favIDIndex, 1);
   
    localStorage.setItem(FAVS_LOCAL_KEY, JSON.stringify(localFav_ar));
  }

  

export const addIdToShopBag = (_id) => {
  shopping_bag_ar.push(_id);
  
    if (shopping_bag_ar.length > 20) {
      shopping_bag_ar.shift();
  }
    localStorage.setItem(SHOPPING_BAG_LOCAL_KEY, JSON.stringify(shopping_bag_ar));
  }


  export const getLocalBag = () => {
    return shopping_bag_ar;
  }


export const removeIdFromLocalBag = (_id) => {
    let bagIDIndex = shopping_bag_ar.findIndex(valBag => valBag === _id)
    shopping_bag_ar.splice(bagIDIndex, 1);
    // setCounter(counter--);
    localStorage.setItem(SHOPPING_BAG_LOCAL_KEY, JSON.stringify(shopping_bag_ar));
  }
  