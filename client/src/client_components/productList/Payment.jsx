import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Payment = (props) => {
  const sum = props.sum;
  const curr = props.curr;
  const nav = useNavigate();

  const onBackClick = () => {
    nav("/");
  };

  return (
    <div className="justify-center min-h-[300px]">
      <div className="flex justify-center">
        {localStorage["Shopping_bag_ar"] &&
        JSON.parse(localStorage["Shopping_bag_ar"]).length ? (
          <div className="overflow-hidden w-[800px] rounded-lg border border-gray-200 shadow-md m-5">
            <div className="bg-gray-800 text-left pl-9 text-blue-300 p-4 font-medium">
              Payment
            </div>

            <div className="mt-9 p-5">
              <PayPalScriptProvider>
                <PayPalButtons />
              </PayPalScriptProvider>
            </div>

            <div className="flex justify-center mt-5">
              <img
                src="https://ynet-pic1.yit.co.il/picserver5/crop_images/2020/08/30/ByBNgJFQD/ByBNgJFQD_0_0_1050_591_x-large.jpg"
                className="w-[300px] rounded-3xl"
                alt=""
              />
            </div>

            <div className="mb-2 p-2">
              <h2 className="mt-16 p-2 bg-yellow-300 rounded-md text-xl font-mono">
                Total Price: {sum} {curr}
              </h2>
            </div>
          </div>
        ) : (
          <button
            onClick={onBackClick}
            className="bg-black text-white  font-bold p-2 mt-28 rounded-md"
          >
            Go Back
          </button>
        )}
      </div>
    </div>
  );
};

export default Payment;
