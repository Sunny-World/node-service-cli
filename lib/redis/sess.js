let express = require('express')
let app = express()
// session处理
let session = require('express-session')
let RedisStore = require('connect-redis')(session);
var projConf = require(':root/conf/proj.conf.js').default;
let redisStore = new RedisStore({
    // 1. ttl: 过期时间，默认是session.maxAge, 或者是一天
    // 2. disableTTL: 是否允许redis的key有过期时间。这个值优先于ttl
    // 3. db: redis哪个数据库，默认是0
    // 4. pass: 密码
    // 5. prefix: key的前缀，默认是 'sess:'
    // 6. unref: 这个方法作用于底层socket连接，可以在程序没有其他任务后自动退出。
    // 7. serializer: 包含stringify和parse的方法，用于格式化存入redis的值。默认是JSON
    // 8. logErrors: 是否打印redis出错信息，默认false
    //    如果值为true，则会提供一个默认的处理方法（console.error）;
    //    如果是一个函数，则redis的报错信息由它来处理
    //    如果值为false，则不处理出错信息
    host: projConf.redis.host,
    ttl: projConf.redis.ttl,
    port: projConf.redis.port,
    pass: projConf.redis.pass,
    logErrors: true
})

class SessRedis {
    constructor() {
        return redisStore
    }
    client() {
        return redisStore.client
    }
    // 字符串存取
    setKey(key, value) {
        return new Promise((resolve, reject) => {
            this.client.set(key, value, (err, replay) => {
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
            this.client.get(key, (err, replay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(replay);
                }
            })
        })
    }
    delKey(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, replay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(replay);
                }
            })
        })
    }
    // hash存取
    setFieldKey(key, field, value) {
        return new Promise((resolve, reject) => {
            this.client.hset(key, field, value, (err, replay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(replay);
                }
            })
        })
    }
    getFieldKey(key, field) {
        return new Promise((resolve, reject) => {
            this.client.hget(key, field, (err, replay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(replay);
                }
            })
        })
    }
    delFieldKey(key, field) {
        return new Promise((resolve, reject) => {
            this.client.hdel(key, field, (err, replay) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(replay);
                }
            })
        })
    }
}

let sessRedis = new SessRedis()


module.exports = sessRedis