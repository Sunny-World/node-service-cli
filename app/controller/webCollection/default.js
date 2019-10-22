let app=require(':proj').app
let getData=require(':service/webCollection').getData
let addItem=require(':service/webCollection').addItem
let delItem=require(':service/webCollection').delItem
let delClass=require(':service/webCollection').delClass
let addClass=require(':service/webCollection').addClass
app.post('/api/webCollection/addClass', (req, res) => {
    return addClass(req,res)
})

app.post('/api/webCollection/getData', (req, res) => {
    return getData(req,res)
})

app.post('/api/webCollection/addItem',(req,res)=>{
    return addItem(req,res)
})

app.post('/api/webCollection/delItem',(req,res)=>{
    return delItem(req,res)
})

app.post('/api/webCollection/delClass',(req,res)=>{
    return delClass(req,res)
})

