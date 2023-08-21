import {createContext, useEffect, useState} from 'react';
import { API_URL, TOKEN_KEY, doApiGet } from '../services/services';
import { RiNumbersFill } from 'react-icons/ri';


export const MyContext = createContext(RiNumbersFill);




const MyContextTest = ({children}) => {
    
  const [userInfo, setUserInfo] = useState({});
  // const nav = useNavigate();
  const [counterFav, setCounterFav] = useState(2);
  const [counterCart, setCounterCart] = useState(4);

  // console.log(counterFav);
  // console.log(counterCart);

  const [addToDo, setToDo] = useState([
    "Add another component to Tailwind Components",
    "Submit Todo App Component to Tailwind Components",
  ]);


  useEffect(() => {
    doUserApi();
  }, [localStorage[TOKEN_KEY]]);

  const doUserApi = async () => {
    if (localStorage[TOKEN_KEY]) {
      try {
        const url = API_URL + "/users/myInfo";
        const resp = await doApiGet(url);
        setUserInfo(resp);
        console.log(resp);
      } catch (err) {
        console.log(err);
        localStorage.removeItem(TOKEN_KEY);
      }
    }
  };


  const addNewToDo = (mission) => {
    setToDo([...addToDo, mission]);
  };

  return (
    <MyContext.Provider
    value={{
      // logout,
    //   addToDo,
    //   addNewToDo,
    //   userInfo,
    //   setUserInfo,
    //   doUserApi,
   
      counterFav,
      counterCart,
    }}
  >
    {children}
    </MyContext.Provider>
  )
}

export default MyContextTest