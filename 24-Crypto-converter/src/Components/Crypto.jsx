import React, { useEffect, useState } from 'react'

const CURRENCY_OPTIONS = ['USD', 'EUR', 'GBP', 'CNY', 'JPY']
const CRYPTO_API = 'https://api.frontendeval.com/fake/crypto/'

const Crypto = () => {
  const [amount, setAmount] = useState(localStorage.getItem('amount') || 0)
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [conversionRate, setConversionRate] = useState(0)
  const [prevConvertedAmt, setPrevConvertedAmt] = useState(0)
  const [currency, setCurrency] = useState(
    localStorage.getItem('currency') || CURRENCY_OPTIONS[0]
  )
  const [isLoading, setIsLoading] = useState(false)
  const priceChange = convertedAmount - prevConvertedAmt

  useEffect(() => {
    localStorage.setItem('amount', amount)
    localStorage.setItem('currency', currency)
  }, [amount, currency])

  useEffect(() => {
    async function fetchConversionRate() {
      setIsLoading(true)
      try {
        const res = await fetch(`${CRYPTO_API}${currency}`)
        const data = await res.json()
        setConversionRate(data.value)
      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchConversionRate()

    const timer = setInterval(fetchConversionRate, 4000)
    return () => {
      clearInterval(timer)
    }
  }, [currency])

  useEffect(() => {
    setPrevConvertedAmt(convertedAmount)
    setConvertedAmount(amount * conversionRate)
  }, [conversionRate])

  const getCurrencySymbol = (curr) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      CNY: '¥',
      JPY: '¥'
    }
    return symbols[curr] || curr
  }

  return (
    <div className="crypto-app">
      <div className="crypto-container">
        <div className="crypto-header">
          <h1 className="app-title">STRIFF</h1>
          <p className="app-subtitle">Crypto Currency Converter</p>
        </div>
        
        <div className="form-section">
          <div className="input-group">
            <label htmlFor="amountToConvert" className="input-label">
              Amount to Convert
            </label>
            <input
              type="number"
              id="amountToConvert"
              className="input-field"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount..."
              min="0"
              step="any"
            />
          </div>

          <div className="input-group">
            <label htmlFor="currency" className="input-label">
              Target Currency
            </label>
            <select 
              id="currency" 
              className="select-field"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {CURRENCY_OPTIONS.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {getCurrencySymbol(value)}  {value}
                  </option>
                )
              })}
            </select>
          </div>
        </div>

        <div className="results-section">
          <div className="conversion-header">
            <span className="conversion-label">STRIFF Crypto Equivalent</span>
            {isLoading && <div className="loading-spinner"></div>}
          </div>
          
          <div className="conversion-result">
            {getCurrencySymbol(currency)} {convertedAmount.toFixed(3)}
          </div>
          
          <div className={`price-change ${priceChange > 0 ? 'positive' : priceChange < 0 ? 'negative' : 'neutral'}`}>
            <span className="change-icon">
              {priceChange > 0 ? '⬆️' : priceChange < 0 ? '⬇️' : '—'}
            </span>
            <span className="change-text">
              Change: {priceChange > 0 ? '+' : ''}{priceChange.toFixed(3)}
            </span>
          </div>
        </div>

        <div className="footer-info">
          <p>Updates every 4 seconds</p>
        </div>
      </div>
    </div>
  )
}

export default Crypto