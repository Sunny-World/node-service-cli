// 路径处理
require("./proj/proj.path.js");
// express框架引入
let app = require(":proj").app;

// express配置 app.use
require(":proj/express.configure");

// controller层
require(":proj/requireFiles").getAppModule(__dirname + "/app/controller");

// 端口监听
app.listen(3000);
