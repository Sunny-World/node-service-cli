let mainMysql = require(':lib/mysql/main').default
let showDate=require(':lib/date').showDate

// 根据用户id查询用户信息
exports.findUserFromId = async (id) => {
    return await mainMysql.findOne(`
        SELECT * 
        FROM account 
        WHERE 
        id = ${id}
    `)
}
// 根据支付宝id查询用户信息
exports.findUserFromAlipayUserId = async (alipayUserId) => {
    return await mainMysql.findOne(`
        SELECT * 
        FROM account 
        WHERE 
        alipay_user_id = ${alipayUserId}
    `)
}

// 根据登录账号查询用户信息
exports.findUserFromLoginAccount = async (account) => {
    return await mainMysql.findOne(`
        SELECT * 
        FROM account 
        WHERE 
        mail = ${account}
        or
        username = ${account}
    `)
}

// 添加用户信息通过支付宝方式
exports.addUser=async ({
    username,
    alipayUserId,
    alpayUserLongId
})=>{
    return await mainMysql.insert(`
        INSERT
        INTO
        account(Id,username,alipay_user_id,alipay_user_long_id,create_time)
        VALUES(0,?,?,?,?)
    `,[username,alipayUserId,alpayUserLongId,showDate('Y-M-D h:m:s')])
}
