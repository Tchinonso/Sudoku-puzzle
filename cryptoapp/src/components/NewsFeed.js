import React, { useEffect, useState } from 'react'
import axios from 'axios'




const NewsFeed = () => {
  const [articles, setArticles] = useState(null)

  useEffect(() => {
    // const axios = require('axios');

     const options = {
      method: 'GET',
      url: 'http://localhost:8000/news',
    };
  
     axios.request(options)
          .then(function(response){
              console.log(response.data);
              setArticles(response.data)
          }).catch(function(error){
              console.error(error);
              console.log(error.response.status);
          })
  

    // this is now handled in the backend
    // const options = {
    //   method: 'GET',
    //   url: 'https://crypto-update-live.p.rapidapi.com/news',
    //   headers: {
    //     'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    //     'X-RapidAPI-Host': 'crypto-update-live.p.rapidapi.com'
    //   }
    // };
  
    //  axios.request(options)
    //       .then(function(response){
    //           console.log(response.data);
    //           setArticles(response.data)
    //       }).catch(function(error){
    //           console.error(error);
    //           console.log(error.response.status);
    //       })
  },[])

  console.log(articles);

  const first5Articles = articles?.slice(0,5)

  return (
    <div className='news-feed'>
      <h1>News Feed</h1>

      {/* {articles.map(article => (<p>{article.title}</p>))} */}

      {first5Articles?.map(
        (article, _index) => (
          <div key={_index}>
            <a href={article.URL}>
            <p>{article.Title}</p>
            </a>
          </div>
         
        )
      )}
      {/* {first20Articles?.map(
        article => (
          <p>{article.description}</p>
        )
      )}
      {first20Articles?.map(
        article => (
          <p>{article.date}</p>
        )
      )} */}
    </div>
  )
}

export default NewsFeed
