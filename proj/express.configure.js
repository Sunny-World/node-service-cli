let app=require(':proj').app

// 本地鉴权
let passport = require('passport')
let bodyParser = require('body-parser')

// session 持久化(基于redis)
let session = require('express-session')
let sessRedis = require('../lib/redis/sess');
let cookieParser = require('cookie-parser')
let flash = require('connect-flash')


// app.configure(() => {
app.use(cookieParser('cookie-salt'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// session 持久化(基于redis)
app.use(session({
    // 对session id 相关的cookie 进行签名
    secret: 'yourSercret',
    resave: false,
    // 是否保存未初始化的会话
    saveUninitialized: false,
    cookie: {
        secure: false,
        // 时间1小时
        maxAge: 1000 * 60 * 60
    },
    store: sessRedis
}))


app.use(passport.initialize());
app.use(passport.session());
app.use(flash())

// 综合请求包含三处
app.use((req, res, next) => {
    req.request = Object.assign(req.params, req.query, req.body)
    res.header('jj-app',JSON.stringify({
        auth:req.isAuthenticated()?1:0
    }))
    next()
})
// 接收到请求刷新session有效请求时长
app.use(function(req, res, next){
    req.session._garbage = Date();
    req.session.touch();
    next();
});

// })