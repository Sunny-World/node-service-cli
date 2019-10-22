let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy

passport.use('local.login', new LocalStrategy((username, password, done) => {
    var user = {
        id: '1',
        username: 'admin',
        password: 'pass'
    }
    // 可以配置通过数据库方式读取登陆账号
    if (username !== user.username) {
        return done(null, false, {
            code:400,
            message: '用户名或密码错误'
        })
    }
    if (password !== user.password) {
        return done(null, false, {
            code:400,
            message: '用户名或密码错误'
        })
    }
    user.pass=null
    return done(null, user)
}))

passport.serializeUser(function (user, done) {//保存user对象
    done(null, user)//可以通过数据库方式操作
})

passport.deserializeUser(function (user, done) {//删除user对象
    done(null, user)//可以通过数据库方式操作
})

return passport