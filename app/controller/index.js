let app=require(':proj').app

// 请求拦截
app.get('/', (req, res) => {
    res.send('hello')
})