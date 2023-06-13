import React from 'react'

const ExchangeRate = ({exchangeRate, chosenPC, chosenSC}) => {
  return (
    <div className='exchange'>
        <h1>Exchange Rate</h1>
      <h3>{exchangeRate}</h3>
      <p>{chosenPC} to {chosenSC}</p>
    </div>
  )
}

export default ExchangeRate
