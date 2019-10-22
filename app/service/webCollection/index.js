let getData = require(':map/webCollection').getData
let addItem = require(':map/webCollection').addItem
let delItem = require(':map/webCollection').delItem
let delClass = require(':map/webCollection').delClass
let addClass=require(':map/webCollection').addClass
let updateClass=require(':map/webCollection').updateClass
let updateItem=require(':map/webCollection').updateItem

exports.getData = async (req, res) => {
    try {
        let data = await getData(req.session.passport.user.id)
        let map = {}
        let dest = []
        for (let i = 0; i < data.length; i++) {
            var ai = data[i];
            let classId
            if (ai.is_class) {
                classId = ai.id
            } else {
                classId = ai.class_id
            }
            if (!map[classId]) {
                dest.push({
                    classId,
                    className: ai.is_class ? ai.class_name : '',
                    list: ai.is_class ? [] : [{
                        id: ai.id,
                        name: ai.name,
                        url: ai.url
                    }]
                });
                map[classId] = 1;
            } else {
                for (var j = 0; j < dest.length; j++) {
                    var dj = dest[j];
                    if (dj.classId == classId) {
                        if (ai.is_class) {
                            dj.className = ai.class_name
                        } else {
                            dj.list.push({
                                id: ai.id,
                                name: ai.name,
                                url: ai.url
                            })
                        }
                        break;
                    }
                }
            }
        }
        res.send({
            code: 200,
            data: dest
        })
    } catch (err) {
        res.send({
            code: 400,
            msg: 'wrong'
        })
    }
}


exports.addItem = async (req, res) => {
    try {
        if(req.request.id){
            await updateItem({
                id:req.request.id,
                name:req.request.name,
                url:req.request.url,
            })
        }else{
            await addItem({
                accountId: req.session.passport.user.id,
                classId:req.request.classId,
                name:req.request.name,
                url:req.request.url,
            })
        }
        res.send({
            code: 200,
            msg: 'success'
        })
    } catch (err) {
        res.send({
            code: 400,
            msg: 'wrong'
        })
    }
}

exports.delItem = async (req, res) => {
    try {
        await delItem({
            id: req.request.id,
        })
        res.send({
            code: 200,
            msg: 'success add item'
        })
    } catch (err) {
        res.send({
            code: 400,
            msg: 'wrong'
        })
    }
}

exports.delClass = async (req, res) => {
    try {
        await delItem({
            id: req.request.id,
        })
        await delClass({
            id: req.request.id,
        })
        res.send({
            code: 200,
            msg: 'success add item'
        })
    } catch (err) {
        res.send({
            code: 400,
            msg: 'wrong'
        })
    }
}

exports.addClass = async (req, res) => {
    try {
        if(!(req.request.className && req.request.className.length<=50)){
            res.send({
                code:400,
                msg:'wrong className'
            })
        }
        if(req.request.classId){
            // 编辑
            await updateClass({
                classId: req.request.classId,
                className:req.request.className
            })
        }else{
            // 新增
            await addClass({
                className:req.request.className,
                accountId:req.session.passport.user.id
            })
            
        }
        res.send({
            code:200,
            msg:'success'
        })
    } catch (err) {
        res.send({
            code: 400,
            msg: 'wrong'
        })
    }
}