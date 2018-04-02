var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', (req, res) => {
    url = 'http://www.paginasamarillas.com.co/cali/servicios/escuelas-de-baile?page=2'
    
    request(url, function(error, response, html) {
        if (!error) {
            var $ = cheerio.load(html)
            var data = []

            $('.figBox .titleFig a .semibold').each(function(i, elemt) {
                let val = i + 1
                if (val % 2 === 0) {
                    data.push({
                        title: $(this).text()
                    })
                }
            })
            var val = $('.titleFig').children().length
            res.status(200).send({data})
        }
    })
})

app.listen('3005')

console.log('Web Scraping 3005');

exports = module.exports = app;