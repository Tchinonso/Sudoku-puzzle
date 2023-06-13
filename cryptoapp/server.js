const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/',(req,res) => {
    res.json('hi')
})
app.get('/convert',(req,res) => {
    const fromCurrency = req.query.from_currency
    const toCurrency = req.query.to_currency
    console.log('fromCurrency', fromCurrency);
    console.log('toCurrency', toCurrency);
    
    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {from_currency: fromCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: toCurrency},
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
      };
      
          axios.request(options)
          .then(function(response){
           console.log(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
           res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
        //    setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
        //    setResults(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'] * amount)
        //    setPrimaryExchangedRate(chosenPC)
        //    setSecondaryExchangedRate(chosenSC)
          }).catch(function(error){
          console.error(error);
          })
})

app.get('/news',(req,res) => {
    const options = {
        method: 'GET',
        url: 'https://crypto-update-live.p.rapidapi.com/news',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'crypto-update-live.p.rapidapi.com'
        }
      };
    
       axios.request(options)
            .then(function(response){
                res.json(response.data);
            }).catch(function(error){
                console.error(error);
                console.log(error.response.status);
            })
})


app.listen(8000, () => console.log(`Server is listening on port ${PORT}`))