let redis = require('redis')
let redisDb = redis.createClient(6379, '127.0.0.1', {
    connect_timeout: 5000
})

class Redis {
    constructor() {}
    client(){
        return redisDb
    }
    // 字符串存取
    setKey(key,value){
        return new Promise((resolve, reject) => {
            redisDb.set(key,value, (err, replay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(replay);
                }
            })
        })
    }
    getKey(key) {
        return new Promise((resolve, reject) => {
            redisDb.get(key, (err, replay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(replay);
                }
            })
        })
    }
    delKey(key){
        return new Promise((resolve, reject) => {
            redisDb.del(key, (err, replay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(replay);
                }
            })
        })
    }
    // hash存取
    setFieldKey(key,field,value) {
        return new Promise((resolve, reject) => {
            redisDb.hset(key,field,value, (err, replay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(replay);
                }
            })
        })
    }
    getFieldKey(key,field) {
        return new Promise((resolve, reject) => {
            redisDb.hget(key,field, (err, replay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(replay);
                }
            })
        })
    }
    delFieldKey(key,field) {
        return new Promise((resolve, reject) => {
            redisDb.hdel(key,field, (err, replay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(replay);
                }
            })
        })
    }
}
module.exports = new Redis()