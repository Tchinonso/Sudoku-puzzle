const PORT = 8000
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()

const app = express()

app.use(cors())

app.get('/results',(req,res)=>{
    const passedLevel = req.query.level
    // this is from the api params, query is the levels array and level is the level you want to play
    console.log(req.query.level);
    console.log(passedLevel);
    const options = {
        method: 'GET',
        url: 'https://twinword-word-association-quiz.p.rapidapi.com/type1/',
        params: {
          level: passedLevel,
          area: 'sat'
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'twinword-word-association-quiz.p.rapidapi.com'
        }
      };
      
         axios.request(options)
                .then(function(response){
                    console.log(response.data);
                    res.json(response.data)
                }).catch(function(error){
                    console.error(error);
                    console.log(error.response.status);
                })
})

app.listen(8000, () => console.log(`Server is listening on port ${PORT}`))