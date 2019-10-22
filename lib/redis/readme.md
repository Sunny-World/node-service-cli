```js
let redisDb=require('./lib/redis')
redisDb.setKey('javison','test').then(res=>{})
redisDb.getKey('javison').then(res=>{})
redisDb.delKey('javison').then(res=>{})
```