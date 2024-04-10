import React, { useEffect, useState } from 'react'

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1)
  const [fromCur, setFromCur] = useState('INR')
  const [toCur, setToCur] = useState('USD')
  const [convertedAmt, setConvertedAmt] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function convert() {
      setIsLoading(true);
      const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`)
      const data = await res.json()
      setConvertedAmt(data.rates[toCur])
      setIsLoading(false)
    }
    if (fromCur == toCur) return setConvertedAmt(amount)
    convert()
  }, [amount, fromCur, toCur])

  return (
    <div style={{ padding: "10px", fontSize: "15px", marginLeft: "3px" }}>
      <h1>Currency Converter</h1>
      <input placeholder='Enter Amount' style={{ cursor: "revert" }} value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
      <></> From:<select style={{ paddingRight: "5px", marginLeft: "5px", fontSize: "15px" }} value={fromCur} onChange={(e) => setFromCur(e.target.value)} disabled={isLoading} >
        <option>EUR</option>
        <option>USD</option>
        <option>INR</option>
        <option>CAD</option>
        <option>GBP</option>
        <option>CHF</option>
        <option>ZAR</option>
      </select>

      <></> To:<select style={{ paddingRight: "5px", marginLeft: "5px", fontSize: "15px" }} value={toCur} onChange={(e) => setToCur(e.target.value)} disabled={isLoading} >
        <option>INR</option>
        <option>USD</option>
        <option>EUR</option>
        <option>CAD</option>
        <option>GBP</option>
        <option>CHF</option>
        <option>ZAR</option>
      </select>
      <h3>Converted Amount: {convertedAmt} {toCur}</h3>

    </div>
  )
}

export default CurrencyConverter