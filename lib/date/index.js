function add0(m) { //对日期类数据返回两位数字
    return m < 10 ? '0' + m : m
}

function applyNew(ctor, args) {
    var applyArgs = ([{}]).concat(args || []);
    var f = Function.prototype.bind.apply(ctor, applyArgs);
    return new f();
}

/**
 * 获取当前时间
 * @return string
 * @param ("Y-M-D h:m:s") 或 ("Y-M-D h:m:s",时间戳)
 * YMDhms直接替换对应时间单位，格式可自由替换
 * 没有参数直接返回Y-M-D h:m:s(如2018-01-01 12:21:45)
 * 有参数则直接替换
 */
function showDate() {
    var now;
    if (arguments.length == 2 && arguments[1] && new Date(arguments[1]) == 'Invalid Date') {
        var arr = arguments[1].match(/\d+/g);
        now = applyNew(Date, arr)
    } else if (arguments.length != 2) {
        now = new Date();
    } else {
        now = new Date(arguments[1])
    }
    // var now = arguments.length == 2 ? new Date(arguments[1]) : new Date();
    var year = now.getFullYear();
    var month = add0(now.getMonth() + 1);
    var date = add0(now.getDate());
    var hour = add0(now.getHours());
    var minute = add0(now.getMinutes());
    var seconds = add0(now.getSeconds());
    if (!arguments.length) {
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + seconds;
    } else if (arguments.length > 0) {
        if (arguments[0].indexOf("Y") > -1) {
            arguments[0] = arguments[0].replace(/Y/g, year)
        }
        if (arguments[0].indexOf("M") > -1) {
            arguments[0] = arguments[0].replace(/M/g, month)
        }
        if (arguments[0].indexOf("D") > -1) {
            arguments[0] = arguments[0].replace(/D/g, date)
        }
        if (arguments[0].indexOf("h") > -1) {
            arguments[0] = arguments[0].replace(/h/g, hour)
        }
        if (arguments[0].indexOf("m") > -1) {
            arguments[0] = arguments[0].replace(/m/g, minute)
        }
        if (arguments[0].indexOf("s") > -1) {
            arguments[0] = arguments[0].replace(/s/g, seconds)
        }
        return arguments[0];
    }
}

exports.showDate = showDate