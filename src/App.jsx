import { useState } from "react";
import { currencyConverter } from "./api/postApi";

import "./App.css";

function App() {
  const [amount, setAmount] = useState(0); // AAmount to convert
  const [fromCurrency, setFromCurrency] = useState("USD"); //Base currency
  const [toCurrency, setToCurrency] = useState("INR"); // Target Currency
  const [convertedAmount, setConvertedAmount] = useState(null); //Converted value
  const [loading, setLoading] = useState(false); //Loading State
  const [error, setError] = useState(null); //Error state

  //HandleConverCurrency
  const handleConvertCurrency = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await currencyConverter(fromCurrency, toCurrency, amount);
      const {conversion_result} = await res.data;
      setLoading(false);
      setConvertedAmount(conversion_result);
      console.log(res.data);
    } catch (error) {
      setError("Error fetching conversionn rate");
      console.error(error);
    }
  };
  return (
    <section className="currency-converter">
      <div className="currency-div">
        <h1>Currency Converter</h1>
        <div>
          <label htmlFor="currency_amount">
            Amount:
            <input
              type="number"
              id="currency_amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </label>
        </div>
        <div className="currency-selector">
          <div>
            <label>
              From:
              <select
                value={fromCurrency}
                // eslint-disable-next-line react/no-unknown-property
                setFromCurrency={(e) => setFromCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
                <option value="GBP">GBP</option>
                <option value="AUD">AUD</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              TO:
              <select
                value={toCurrency}
                // eslint-disable-next-line react/no-unknown-property
                setfromCurrency={(e) => setToCurrency(e.target.value)}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="INR">INR</option>
                <option value="GBP">GBP</option>
                <option value="AUD">AUD</option>
              </select>
            </label>
          </div>
        </div>
        <button
          disabled={loading || amount <= 0}
          onClick={handleConvertCurrency}
        >
          {loading ? "Converting.." : "Convert"}
        </button>
      
      <hr />
      {convertedAmount && (
        <div>
          <h2>
            {amount} {fromCurrency} = {convertedAmount.toFixed(2)}
            {toCurrency}
          </h2>
        </div>
      )}
      {error && <p>{error}</p>}
      </div>
    </section>
  );
}

export default App;
