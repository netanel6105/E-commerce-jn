import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Currency = () => {

    const [currency, setCurrency] = useState({});
    const [selectedCurrency, setSelectedCurrency] = useState('USD');
    const [amount, setAmount] = useState(1);
  
    const doCurrencyApi = async () => {
      try {
        let url = `https://free.currconv.com/api/v7/convert?q=${selectedCurrency}_USD&compact=ultra&apiKey=61416545dff3425647b4`
        let resp = await axios.get(url);
        setCurrency(resp.data);
      } catch (err) {
        console.log(err);
        // Handle error (e.g., show error message)
      }
    };
  
    useEffect(() => {
      doCurrencyApi();
    }, [selectedCurrency]);
  
    const handleCurrencyChange = (event) => {
      setSelectedCurrency(event.target.value);
    };
  
    const handleAmountChange = (event) => {
      setAmount(event.target.value);
    };
  
    const calculatedValue = amount * currency[selectedCurrency];
    const displayValue = isNaN(calculatedValue) ? '' : calculatedValue.toFixed(2);
  
    
  return (
    <div className="p-4">
    <h1 className="text-3xl font-bold mb-4">USD to {selectedCurrency} Converter</h1>
    <select
      className="p-2 rounded border"
      onChange={handleCurrencyChange}
      value={selectedCurrency}
    >
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="ILS">ILS</option>
    </select>
    <input
      type="number"
      className="p-2 mt-2 rounded border block"
      value={amount}
      onChange={handleAmountChange}
    />
    {displayValue && (
      <h1 className="text-xl font-bold mt-4">
        {amount} USD = {displayValue} {selectedCurrency}
      </h1>
    )}
  </div>
  )
}

export default Currency