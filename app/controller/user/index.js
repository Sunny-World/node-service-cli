let app = require(':proj').app
let findUserFromId=require(':map/user').findUserFromId

// 获取用户信息
app.all('/api/user/getInfo',async (req,res,next)=>{
    try{
        let userInfo=await findUserFromId(req.session.passport.user.id)
        res.send({
            code:200,
            data:{
                username:userInfo.username,
                clinical:userInfo.clinical
            }
        })
    }catch(err){
        res.send({
            code:400,
            data:''
        })
    }
})