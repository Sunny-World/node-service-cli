let app=require(':proj').app

app.get('/home', (req, res) => {
    res.send('hello')
})
