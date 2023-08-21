import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const WeatherForm = (props) => {
  const nav = useNavigate();
  const inputRef = useRef();

  const onSearchClick1 = () => {
    //   nav("/?q="+inputRef.current.value)
    props.doApi(inputRef.current.value);
  };
  return (
   
     
        <div className="flex w-[350px]">
          <input
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                onSearchClick1();
              }
            }}
            ref={inputRef}
            type="text"
            className="w-full rounded-lg border border-gray-400 p-2"
            placeholder="Search ..."
          />
          <button
            onClick={onSearchClick1}
            className="ml-2  rounded-lg bg-blue-500 py-2 px-2    text-white hover:bg-blue-600"
          >
            Search
          </button>
        </div>
     
   
  );
};

export default WeatherForm;
