let app = require(':proj').app
let request = require('request');

request = request.defaults({ jar: true })

app.all('/api/public/npmStat', (req, res) => {
    request.get({
        url: `https://npm-stat.com/api/download-counts?package=${req.request.package}&from=${req.request.from}&until=${req.request.until}`,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }, (error, response, body) => {
        body = JSON.parse(body)
        res.json({
            code:200,
            data:body[`${req.request.package}`]
        })
    })
})