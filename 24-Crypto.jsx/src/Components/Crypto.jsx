import React, { useState } from 'react'

const Crypto = () => {
  const currencyOptions = ['USD', 'EUR', 'GBP', 'CNY']
  const [amount, setAmount] = useState(0)
  const [convertedAmount, setConvertedAmount] = useState(0)
  
  return (
    <div>
      <label htmlFor="amountToConvert">
        Amount to Convert : 
        <input type="text" 
        id='amountToConvert'
        value={amount}
        onChange={(e) => setAmount(e.target.value)}/>
      </label>

      <label htmlFor="currency">
        Currency : 
        <select id="currency">
          {currencyOptions.map((value, index) => {
            return <option key={index} value={value}>
              {value}
            </option>}
          )}
        </select>
      </label>
      <p>STRIFF Crypto Equivalent: {convertedAmount}</p>
      <p className='change'>Change : ⬆️ 0.5</p>
    </div>
  )
}

export default Crypto