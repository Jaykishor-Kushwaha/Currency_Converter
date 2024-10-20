import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState(1.0);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);

  // API Key and Endpoint
  const API_KEY = 'cur_live_881BvOxcAxsZjw3AkLput0LmlGzGuio2rtxsakYK';
  const API_ENDPOINT = `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}`;

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      const fetchExchangeRate = async () => {
        try {
          const response = await fetch(
            `${API_ENDPOINT}&base_currency=${fromCurrency}&currencies=${toCurrency}`
          );
          const data = await response.json();

          console.log('API response:', data);

          if (data && data.data && data.data[toCurrency]) {
            setExchangeRate(data.data[toCurrency].value);
          } else {
            console.error(`Exchange rate for ${toCurrency} not found`);
            setExchangeRate(null);
          }
        } catch (error) {
          console.error("Error fetching exchange rate:", error);
          setExchangeRate(null);
        }
      };

      fetchExchangeRate();
    }
  }, [fromCurrency, toCurrency]);

  const handleConvert = () => {
    if (exchangeRate) {
      setConvertedAmount((amount * exchangeRate).toFixed(2));
    } else {
      setConvertedAmount("Conversion unavailable.");
    }
  };

  return (
    <div className="currency-converter">
      <h1>Currency Converter</h1>
      <p>Check live foreign currency exchange rates</p>

      <div className="converter">
        <input
          type="number"
          value={amount}
          onChange={handleAmountChange}
          min="0"
          step="0.01"
        />

        <select value={fromCurrency} onChange={handleFromCurrencyChange}>
          <option value="USD">USD - US Dollar</option>
          <option value="EUR">EUR - Euro</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="INR">INR - Indian Rupee</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CNY">CNY - Chinese Yuan</option>
          <option value="CHF">CHF - Swiss Franc</option>
        </select>

        <button onClick={handleSwapCurrencies} className="swap-button">
          ⇄
        </button>

        <select value={toCurrency} onChange={handleToCurrencyChange}>
          <option value="EUR">EUR - Euro</option>
          <option value="USD">USD - US Dollar</option>
          <option value="GBP">GBP - British Pound</option>
          <option value="INR">INR - Indian Rupee</option>
          <option value="JPY">JPY - Japanese Yen</option>
          <option value="CAD">CAD - Canadian Dollar</option>
          <option value="AUD">AUD - Australian Dollar</option>
          <option value="CNY">CNY - Chinese Yuan</option>
          <option value="CHF">CHF - Swiss Franc</option>
        </select>

        <button onClick={handleConvert} className="convert-button">
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="result">
          <h2>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</h2>
        </div>
      )}

      <p className="disclaimer">
      I use the mid-market rate for my converter. This is for informational purposes only.


      </p>
    </div>
  );
}

export default App;
