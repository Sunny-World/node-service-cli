let app=require(':proj').app
let svgCaptcha = require('svg-captcha');

// 本地鉴权
let passport = require('passport')
require(':service/authLogin/local')

app.all('/api/login/isLogin',(req,res,next)=>{
    res.send({
        code:200,
        data:req.isAuthenticated()?1:0
    })
})

// 登录校验
app.get('/api/login', (req, res, next) => {
    return passport.authenticate('local.login', (err, user, info) => {
        if (err) res.send(err)
        if (user !== false) {
            req.login(user,(err)=>{
                if(err) res.send(err)
                return res.send({
                    code:200,
                    data:user
                })
            })
        } else {
            // 校验失败
            res.send(info)
        }
    })(req, res, next)
})

app.all('/api/user/login',(req,res)=>{
    if(req.session.loginImgCode===undefined){
        return res.send({
            code:400,
            msg:'请获取图形验证码'
        })
    }
    if(req.request.imgCode!=req.session.loginImgCode){
        return res.send({
            code:400,
            msg:'图形验证码不正确'
        })
    }
    if(!/[a-zA-Z0-9@_-]{1,}/.test(req.request.account)){
        return res.send({
            code:400,
            msg:'用户名或邮箱不正确'
        })
    }
    if(req.request.imgCode!=req.session.loginImgCode){
        return res.send({
            code:400,
            msg:'图形验证码不正确'
        })
    }
    req.request.password=decodeURIComponent(req.request.password)
    if(!/^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?![,\.#%'\+\*\-:;^_`]+$)[,\.#%'\+\*\-:;^_`0-9A-Za-z]{6,16}$/.test(req.request.password)){
        return res.send({
            code:400,
            msg:'账号或密码不正确'
        })
    }
    return res.send({
        code:400,
        img:req.session.loginImgCode,
        request:req.request
    })
})

app.all('/api/logout', function (req, res) {
    req.logout();
    res.send({
        code:200,
        msg:'退出登录'
    })
})

app.get('/api/login/imgCode',(req,res)=>{
    let codeConfig = {
        size: 5, // 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        width: 200,
        height: 80,
        color: true,
    }
    let captcha = svgCaptcha.createMathExpr(codeConfig);
    req.session.loginImgCode = captcha.text.toLowerCase(); //存session用于验证接口获取文字码
    res.type('svg')
    res.status(200).send(captcha.data);
})