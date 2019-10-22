let mainMysql = require(":lib/mysql/main").default;
let showDate = require(":lib/date").showDate;
// 添加分类
exports.createRoom = async ({
    room_id,
    room_name,
    count,
    enter_code,
    nick_name_list
}) => {
    return await mainMysql.insert(
        `
        INSERT
        INTO
        room_list(Id,room_id,room_name,count,enter_code,nick_name_list,create_time)
        VALUES(0,?,?,?,?,?,?)
    `,
        [
            room_id,
            room_name,
            count,
            enter_code,
            nick_name_list,
            showDate("Y-M-D h:m:s")
        ]
    );
};

// 随机获取一组昵称数据
exports.getNickList = async num => {
    return await mainMysql.findAll(`
        SELECT *,RAND() as r FROM nick_list ORDER BY r LIMIT 0,${num}
    `);
};

// 搜索房间
exports.searchRoomList = async ({ room_name }) => {
    return await mainMysql.findAll(
        `
        SELECT * FROM room_list WHERE room_name like '%` +
            room_name +
            `%'
    `
    );
};

// 搜索房间id
exports.searchRoomById = async ({ room_id }) => {
    return await mainMysql.findOne(
        `
        SELECT * FROM room_list WHERE room_id = ${room_id}
    `
    );
};
