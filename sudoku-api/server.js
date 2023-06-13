const PORT = 8080
const axios = require('axios').default
const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.post('/solve', (req, res) =>{
    const options = {
        method: 'POST',
        url: 'https://sudoku-solver3.p.rapidapi.com/sudokusolver/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.rapid_api_key,
          'X-RapidAPI-Host': 'sudoku-solver3.p.rapidapi.com'
        },
        data: {
          input: req.body.numbers
        }
      };
      
       axios.request(options)
          .then(function(response){
              console.log(response.data);
              //this function is no longer valid as the data is no longer passed in the frontend
            //   populateValues(response.data.solvable, response.data.solution)

            //we will use res.json() instead
            res.json(response.data)
          }).catch(function(error){
              console.error(error);
              console.log(error.response.status);
          })
})




app.listen(PORT,()=> console.log(`server is listening on PORT ${PORT}`))