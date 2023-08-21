import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { getLocalBag, removeIdFromLocalBag } from "../../services/LocalService";
import { API_URL, doApiMethod } from "../../services/services";
import Loading from "../../global/Loading";
import { RiDeleteBin2Fill } from "react-icons/ri";
import Payment from "./Payment";

const AcountSumPay = () => {
  const [ar, setAr] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("ILS");
  const [shoppingBag_ar, setShoppingBag_ar] = useState(getLocalBag());
  const [loading, setLoading] = useState(false);
  const [sumPrice, setSumPrice] = useState(0);

  const [catInfo, setCatInfo] = useState({});
  const [currencies, setCurrencies] = useState({});

  useEffect(() => {
    doApi();
    doCurrencyApi();
  }, []);

  const doCurrencyApi = async () => {
    try {
      const response = await axios.get(
        `https://free.currconv.com/api/v7/convert?q=USD_${selectedCurrency}&compact=ultra&apiKey=61416545dff3425647b4`
      );
      setCurrencies(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Error fetching currency data");
    }
  };

  useEffect(() => {
    doApi();
  }, [selectedCurrency]); //selectedCurrency

  const doApi = async () => {
    setLoading(true);
    let url = `${API_URL}/products/groupApp`;
    let data = await doApiMethod(url, "POST", { ids: shoppingBag_ar });
    setAr(data);
    setLoading(false);
    calculateSumPrice(data);
  };

  const calculateSumPrice = (data) => {
    const totalPrice = data.reduce(
      (sum, item) =>
        sum + convertPriceToSelectedCurrency(item.price, item.currency),
      0
    );
    setSumPrice(totalPrice.toFixed(2)); // Round to 2 decimal places
  };

  const convertPriceToSelectedCurrency = (price, itemCurrency) => {
    if (
      currencies[`${selectedCurrency}_USD`] &&
      currencies[`${itemCurrency}_USD`]
    ) {
      const selectedCurrencyRate = currencies[`${selectedCurrency}_USD`];
      const itemCurrencyRate = currencies[`${itemCurrency}_USD`];
      console.log(itemCurrencyRate);
      return parseFloat(price) * (itemCurrencyRate / selectedCurrencyRate);
      // console.log(price);
    }
    // If the conversion rates are not available, return the original price
    return parseFloat(price);
  };

  const onAddRemoveBag = (_id) => {
    removeIdFromLocalBag(_id);
    checkBag();
  };

  const checkBag = () => {
    // TODO:בודקים מול הלוקאל אם קיים בשופינג באג
    getLocalBag();
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div className="text-center md:w-auto">
      <div className="text-center md:w-auto">
        <div className="flex flex-wrap justify-center items-center">
          <h1 className="text-3xl font-bold font-serif">Order Summary :</h1>
          <div className="mt-4 md:mt-0 md:ml-4">
            <select
              className="p-2 rounded border"
              onChange={handleCurrencyChange}
              value={selectedCurrency}
            >
              <option value="ILS">ILS</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <div className="md:w-auto mt-4 flex flex-wrap justify-center border">
            {ar.map((item) => {
              return (
                <div className="p-5 flex justify-center mt-5" key={item._id}>
                  <div className="flex border">
                    <div>
                      <img
                        src={item.img_url}
                        className="w-[180px] h-[200px] mx-auto md:mx-0"
                        alt={item.name}
                      />
                    </div>

                    <div className="ml-9 p-5">
                      <h2 className="mt-10">
                        {convertPriceToSelectedCurrency(
                          item.price,
                          item.currency
                        ).toFixed(2)}{" "}
                        {selectedCurrency}
                      </h2>

                      <h2 className="mt-3">{item.name.substring(0, 13)}</h2>
                    </div>

                    <div className="ml-9">
                      <button
                        onClick={() => {
                          onAddRemoveBag(item._id);
                          doApi();
                        }}
                        className="mt-20 border-4"
                      >
                        <RiDeleteBin2Fill size={30} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-black">
            <h2 className="font-mono text-2xl text-white">
              Total Price: {sumPrice} {selectedCurrency}
            </h2>
          </div>
        </React.Fragment>
      )}

      <Payment sum={sumPrice} curr={selectedCurrency} />
    </div>
  );
};

export default AcountSumPay;
