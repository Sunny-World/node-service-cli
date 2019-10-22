let mainMysql = require(':lib/mysql/main').default
let showDate=require(':lib/date').showDate
// 添加分类
exports.addClass=async ({
    className,
    accountId
})=>{
    return await mainMysql.insert(`
        INSERT
        INTO
        web_collection(Id,account_id,class_name,is_class,create_time)
        VALUES(0,?,?,?,?)
    `,[accountId,className,1,showDate('Y-M-D h:m:s')])
}
// 获取配置的信息
exports.getData = async (account_id) => {
    return await mainMysql.findAll(`
        SELECT * 
        FROM web_collection 
        WHERE 
        account_id = ${account_id}
    `)
}
// 添加收藏
exports.addItem=async ({
    accountId,
    classId,
    name,
    url
})=>{
    return await mainMysql.insert(`
        INSERT
        INTO
        web_collection(Id,account_id,class_id,is_class,name,url,create_time)
        VALUES(0,?,?,?,?,?,?)
    `,[accountId,classId,0,name,url,showDate('Y-M-D h:m:s')])
}

// 删除收藏
exports.delItem=async ({
    id
})=>{
    return await mainMysql.del(`
        DELETE
        FROM
        web_collection
        WHERE
        id=${id}
    `)
}
// 删除收藏
exports.delClass=async ({
    id
})=>{
    return await mainMysql.del(`
        DELETE
        FROM
        web_collection
        WHERE
        class_id=${id}
    `)
}
// 更新类目
exports.updateClass=async ({
    classId,
    className
})=>{
    return await mainMysql.update(`
        UPDATE
        web_collection
        SET
        class_name=?
        WHERE
        id=?
    `,[className,classId])
}
// 更新类目
exports.updateItem=async ({
    id,
    name,
    url
})=>{
    return await mainMysql.update(`
        UPDATE
        web_collection
        SET
        name=?,url=?
        WHERE
        id=?
    `,[name,url,id])
}