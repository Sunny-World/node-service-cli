let mysql = require("mysql");
var projConf = require(":root/conf/proj.conf.js").default;
class Mysql {
    constructor() {
        let connection = mysql.createConnection({
            host: projConf.mysql.host,
            port: projConf.mysql.port,
            user: projConf.mysql.user,
            password: projConf.mysql.password,
            database: projConf.mysql.database
        });
        this.connection = connection;
    }
    start() {
        try {
            this.connection.connect();
        } catch (err) {
            console.log(err);
        }
    }
    findOne(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (error, results) => {
                if (!results || results === undefined) {
                    return resolve(false);
                }
                try {
                    results = JSON.parse(JSON.stringify(results));
                } catch (err) {
                    return resolve(false);
                }
                if (error) {
                    return reject(error);
                }
                if (results.length > 1) {
                    return reject("查询结果非唯一");
                }
                if (results.length == 0) {
                    return resolve(false);
                }
                resolve(results[0]);
            });
        });
    }
    findAll(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (error, results) => {
                if (error) {
                    reject(error);
                }
                results = JSON.parse(JSON.stringify(results));
                resolve(results);
            });
        });
    }
    insert(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (error, result) => {
                if (error) {
                    reject(error);
                }
                if (result) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    resolve(resolve);
                }
            });
        });
    }
    del(sql) {
        console.log(sql);
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (error, result) => {
                if (error) {
                    reject(error);
                }
                if (result) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    resolve(resolve);
                }
            });
        });
    }
    update(sql, params) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, params, (error, result) => {
                if (error) {
                    reject(error);
                }
                if (result) {
                    resolve(JSON.parse(JSON.stringify(result)));
                } else {
                    resolve(resolve);
                }
            });
        });
    }
}
exports.default = new Mysql();
