const PORT = process.env.PORT || 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const articles = []
const newsPapers = [
    {
        name: "guardian",
        address: 'https://guardian.ng/tag/cryptocurrency/',
        base: ''
    },
    {
        name: "cds",
        address: 'https://cryptodataspace.com/?gclid=CjwKCAjw67ajBhAVEiwA2g_jECBCramiGl_bvUKEJyvtFXYGh0tSo8HtLWe7ETAlTbabplu-VNqk-RoCiiYQAvD_BwE',
        base: ''
    },
    {
        name: "coindesk",
        address: 'https://www.coindesk.com/',
        base: ''
    },
    {
        name: "cryptopotato",
        address: 'https://cryptopotato.com/crypto-news/',
        base: ''
    },
    {
        name: "coinmarketcap",
        address: 'https://coinmarketcap.com/headlines/news/',
        base: ''
    },
]

newsPapers.forEach(newspaper => {
    axios.get(newspaper.address)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("crypto")', html).each(function(){
            const title = $(this).text()
            const url = $(this).attr('href')

            articles.push({
                title,
                url: newspaper.base + url,
                // url,
                source: newspaper.name
            })
        })
    })
})

app.get('/',(req,res) => {
    res.json('welcome to my personal api')
})

app.get('/cryptonews',(req,res) => {
    res.json(articles)


    // axios.get('https://guardian.ng/tag/cryptocurrency/')
    // .then((response) => {
    //     const html = response.data
    //     // console.log(html);
    //     const $ = cheerio.load(html)

    //     $('a:contains("crypto")', html).each(function(){
    //         const title = $(this).text()
    //         const url = $(this).attr('href')

    //         articles.push({
    //             title,
    //             url
    //         })
    //     })
    //     res.json(articles)
    // })
    // .catch((err) => console.log(err))
})

app.get('/cryptonews/:id', async(req,res) =>{
    const id = req.params.id

    const newsPapersAddress = newsPapers.filter(newspaper => newspaper.name == id)[0].address
    const newsPapersBase = newsPapers.filter(newspaper => newspaper.name == id)[0].base

    axios.get(newsPapersAddress)
    .then((response) => {
        const html = response.data
        const $ = cheerio.load(html)
        const specificArticles = []

        $('a:contains("crypto")', html).each(function(){
            const title = $(this).text()
            const url = $(this).attr('href')

            specificArticles.push({
                title,
                url: newsPapersBase.base + url,
                // url,
                source: id
            })
        })
        res.json(specificArticles)
    })
    .catch((err) => console.log(err))
})


app.listen(PORT, () => console.log(`Personal API is listening on port ${PORT}`))