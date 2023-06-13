import React, { useState } from 'react'
import ExchangeRate from './ExchangeRate'
import axios from 'axios'

const CyConverter = () => {
    const currencies = ['BTC', 'ETH', 'USD', 'XRP', 'LTC', 'ADA']
    const [chosenPC, setChosenPC] = useState('BTC')
    const [chosenSC, setChosenSC] = useState('BTC')
    const [amount, setAmount] = useState(0)
    const [exchangeRate, setExchangeRate] = useState(0)
    const [primaryExchangedRate, setPrimaryExchangedRate] = useState('BTC')
    const [secondaryExchangedRate, setSecondaryExchangedRate] = useState('BTC')
    const [results, setResults] = useState(0)
    console.log(amount);
    
function convert(){

    const options = {
  method: 'GET',
  url: 'http://localhost:8000/convert',
  params: {from_currency: chosenPC, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSC},
};

    axios.request(options)
    .then(function(response){
     console.log(response.data);
    //  console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
     setExchangeRate(response.data)
    //  setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
     setResults(response.data * amount)
    //  setResults(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
     setPrimaryExchangedRate(chosenPC)
     setSecondaryExchangedRate(chosenSC)
    }).catch(function(error){
    console.error(error);
    })
        




        //this has been handled in the backend

        // const axios = require('axios');
// const options = {
//   method: 'GET',
//   url: 'https://alpha-vantage.p.rapidapi.com/query',
//   params: {from_currency: chosenPC, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSC},
//   headers: {
//     'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
//     'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
//   }
// };

//     axios.request(options)
//     .then(function(response){
//      console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
//      setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
//      setResults(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
//      setPrimaryExchangedRate(chosenPC)
//      setSecondaryExchangedRate(chosenSC)
//     }).catch(function(error){
//     console.error(error);
//     })
    console.log(exchangeRate);

}
    


  return (
    <div className='converter'>
      <h3>Currency converter</h3>

      <div className='input-box'>
        <table>
            <tbody>
                <tr>
                    <td>Primary Currency</td>
                    <td>
                        <input
                        type='number'
                        value={amount}
                        name='currency-amt-1'
                        onChange={event => setAmount(event.target.value)}
                        />
                    </td>
                    <td>
                        <select
                        value={chosenPC}
                        name='currency-opt-1'
                        className='currency-options'
                        onChange={event => setChosenPC(event.target.value)}
                        >
                            {currencies.map(
                                (currency, index) => (
                                    <option key={index}>{currency}</option>
                                )
                            )}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Secondary Currency</td>
                    <td>
                        <input
                        type='number'
                        value={results}
                        name='currency-amt-2'
                        disabled={true}
                        />
                    </td>
                    <td>
                        <select
                        value={chosenSC}
                        name='currency-opt-2'
                        className='currency-options'
                        onChange={event => setChosenSC(event.target.value)}
                        >
                            {currencies.map(
                                (currency, index) => (
                                    <option key={index}>{currency}</option>
                                )
                            )}
                        </select>
                    </td>
                </tr>
            </tbody>
        </table>

        <button className='btn-convert' onClick={convert}>Convert</button>
      </div>

      <ExchangeRate
      exchangeRate={exchangeRate}
      chosenPC={primaryExchangedRate}
      chosenSC={secondaryExchangedRate}
      />
    </div>
  )
}

export default CyConverter
