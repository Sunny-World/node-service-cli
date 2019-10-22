let app = require(":proj").app;
let createRoom = require(":map/count").createRoom;
let getNickList = require(":map/count").getNickList;
let searchRoomById = require(":map/count").searchRoomById;
var expressWs = require("express-ws");
let uuid = require("uuid");
expressWs(app);
// 获取用户信息
app.all("/api/count/searchRoom", async (req, res, next) => {
    try {
        // let userInfo = await findUserFromId(req.session.passport.user.id);
        res.send({
            code: 200,
            data: {}
        });
    } catch (err) {
        res.send({
            code: 800,
            data: ""
        });
    }
});
// 获取用户信息
app.all("/api/count/createRoom", async (req, res, next) => {
    try {
        const list = await getNickList(4);
        const room_id = (Math.random() + "" + new Date().getTime())
            .toString(36)
            .slice(-10);
        await createRoom({
            room_id,
            room_name: req.request.roomName,
            count: req.request.count,
            enter_code: req.request.password,
            nick_name_list: list.map(i => i.nick_name).join(",")
        });
        res.send({
            code: 200,
            msg: `create success`,
            data: {
                roomId: room_id
            }
        });
    } catch (err) {
        res.send({
            code: 800,
            msg: "创建错误，请再试一次",
            data: null
        });
    }
});

app.all("/api/count/getRoomInfo", async (req, res, next) => {
    try {
        const result = await searchRoomById({
            room_id: req.request.roomId
        });
        console.log(result);
        if (result === false) {
            res.send({
                code: 800,
                data: "room can not be find"
            });
        } else {
            res.send({
                code: 200,
                data: result
            });
        }
    } catch (err) {
        res.send({
            code: 800,
            data: ""
        });
    }
});
// 实体房间ws容器
const roomWs = {};
// ws用户池
const clients = {};
// 广播房间内的用户
const broadRoom = roomId => {
    if (roomWs[roomId]) {
        const addrs = roomWs[roomId].list.map(i => i.addrId);
        for (let i of roomWs[roomId].prelist) {
            if (clients[i.uuid]) {
                clients[i.uuid].ws.send(
                    JSON.stringify({
                        addrs
                    })
                );
            }
        }
    }
};

//定义server的事件
app.ws("/", (ws, req) => {
    console.log("client connect to server successful!");
    ws.send("你连接成功了");
    let uuid = uuid.v4();
    clients[uuid] = {
        ws: ws
    };
    ws.on("message", async msg => {
        try {
            msg = JSON.parse(msg);
            console.log(msg);
            // 进入房间
            if (msg.type === "enterRoom" && msg.roomId) {
                clients[uuid].roomId = msg.roomId;
                // 初始化房间信息
                if (roomWs[msg.roomId] === undefined) {
                    roomWs[msg.roomId] = {};
                    roomWs[msg.roomId].list = [];
                    roomWs[msg.roomId].preList = [];
                }
                if (msg.addrId) {
                    // 如果进入房间并且入座
                    clients[uuid].addrId = msg.addrId;
                    roomWs[msg.roomId].list.push({
                        addrId: String(msg.addrId),
                        uuid
                    });
                } else {
                    // 如果进入房间未入座
                    roomWs[msg.roomId].prelist.push({
                        uuid
                    });
                }
                broadRoom(msg.roomId);
            }
        } catch (err) {
            console.log("msg is not json");
        }

        // ws.send("你连接成功了");
    });
    ws.on("close", function(msg) {
        if (clients[uuid].roomId) {
            roomWs[clients[uuid].roomId].preList.remove(uuid);
            roomWs[clients[uuid].roomId].list.remove(uuid);

            broadRoom(clients[uuid].roomId);
        }
        delete clients[uuid];
        console.log("client is closed");
    });
});
