const PORT = process.env.PORT || 8000 
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')
const app = express()

const newspapers = [
    {
        name: 'times',
        address: 'https://www.thetimes.co.uk/environment/climate-change',
        base: '',
        source: 'The Times (UK)'
    },
    {
        name: 'guardian',
        address: 'https://www.theguardian.com/environment/climate-crisis',
        base: '',
        source: 'The Guardian (UK)'
    },
    {
        name: 'telegraph',
        address: 'https://www.telegraph.co.uk/climate-change',
        base: 'https://www.telegraph.co.uk',
        source: 'Telegraph (UK)'
    },
    {
        name: 'nytimes',
        address: 'https://www.nytimes.com/section/climate',
        base: 'https://www.nytimes.com',
        source: 'The New York Times (USA)'
    },
    {
        name: 'wsjournal',
        address: 'https://www.wsj.com/news/types/environment-science',
        base: '',
        source: 'The Wall Street Journal (USA)'
    },
    {
        name: 'washingtonpost',
        address: 'https://www.washingtonpost.com/climate-environment/',
        base: '',
        source: 'The Washington Post (USA)'
    },
    {
        name: 'independent',
        address: 'https://www.independent.co.uk/climate-change/news',
        base: 'https://www.independent.co.uk',
        source: 'The Independent (UK)'
    },
    {
        name: 'timesofindia',
        address: 'https://timesofindia.indiatimes.com/home/environment',
        base: '',
        source: 'The Times of India'
    },
    {
        name: 'sydneymorningherald',
        address: 'https://www.smh.com.au/environment/climate-change',
        base: '',
        source: 'The Sidney Morning Herald (Australia)'
    },
    {
        name: 'dailymail',
        address: 'https://www.dailymail.co.uk/news/climate_change_global_warming/index.html',
        base: '',
        source: 'Daily Mail (UK)'
    }
]

const articles = []

newspapers.forEach(newspaper => {
    axios.get(newspaper.address)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                articles.push({
                    title,
                    url: newspaper.base + url,
                    source: newspaper.source
                })
            })
        })
})

app.get('/', (req, res) => {
    res.json('Climate Change News API')
})

app.get('/news', (req, res) => {
    res.json(articles)
})

app.get('/news/:newspaperId', (req, res) => {
    const newspaperId = req.params.newspaperId
    const newspaperAddress = newspapers.filter(newspaper => newspaper.name === newspaperId)[0].address
    const newspaperBase = newspapers.filter(newspaper => newspaper.name === newspaperId)[0].base
    const newspaperSource = newspapers.filter(newspaper => newspaper.name === newspaperId)[0].source

    axios.get(newspaperAddress)
        .then((response) => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $('a:contains("climate")', html).each(function () {
                const title = $(this).text()
                const url = $(this).attr('href')
                specificArticles.push({
                    title,
                    url: newspaperBase + url,
                    source: newspaperSource
                })
            })
            res.json(specificArticles)
        }).catch(err => console.log(err))
})

app.listen(PORT, () => console.log(`Server running on PORT  ${PORT}`))