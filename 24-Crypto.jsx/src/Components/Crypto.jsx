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
  const priceChange = convertedAmount - prevConvertedAmt

  useEffect(() => {
    localStorage.setItem('amount', amount)
    localStorage.setItem('currency', currency)
  }, [amount, currency])

  useEffect(() => {
    async function fetchConversionRate() {
      try {
        const res = await fetch(`${CRYPTO_API}${currency}`)
        const data = await res.json()
        // console.log(data)
        setConversionRate(data.value)
      } catch (err) {
        console.log(err)
      }
    }
    fetchConversionRate()

    const timer = setInterval(fetchConversionRate, 2000)
    return () => {
      clearInterval(timer)
    }
  }, [currency])

  useEffect(() => {
    setPrevConvertedAmt(convertedAmount)
    setConvertedAmount(amount * conversionRate)
  }, [conversionRate])

  return (
    <div>
      <label htmlFor="amountToConvert">
        Amount to Convert :
        <input
          type="text"
          id="amountToConvert"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>

      <label htmlFor="currency">
        Currency :
        <select id="currency" onChange={(e) => setCurrency(e.target.value)}>
          {CURRENCY_OPTIONS.map((value, index) => {
            return (
              <option key={index} value={value}>
                {value}
              </option>
            )
          })}
        </select>
      </label>
      <p>STRIFF Crypto Equivalent: {convertedAmount.toFixed(3)}</p>
      <p className={`change ${priceChange > 0 ? 'green' : 'red'}`}>
        Change : {priceChange > 0 ? '⬆️' : '⬇️'} {priceChange.toFixed(3)}
      </p>
    </div>
  )
}

export default Crypto
