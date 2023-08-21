import React from "react";
import { Link } from "react-router-dom";

// import { fixImageUrl } from '../../services/services';

const PageProductItem = (props) => {
  let item = props.item;

  return (
    <div className="text-center justify-center border ml-3">
      <div className="flex justify-center">
        <img src={item.img_url} className="w-[250px] h-[300px]" alt="" />
      </div>

      <div className="mt-2">{item.price} ILS</div>

      <div className="mb-1">{item.name.substring(0, 13)}</div>

      <div className="h-[50px] flex items-center justify-center">
        <Link
          className="bg-black text-white py-2 w-[150px] font-bold"
          to={"/info/" + item._id}
        >
          SHOP NOW
        </Link>
      </div>
    </div>
  );
};

export default PageProductItem;
