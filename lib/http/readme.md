```js
let req = require('./lib/http/request.js')

req.httpGet('www.kuaidi100.com', {
    type: 'shunfeng',
    postid: 123455
},'/query').then(res=>{
    console.log(res)
})
```