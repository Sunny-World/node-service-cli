// pm2 配置
module.exports = {
  apps: [{
    name: 'jiweiqing',
    script: 'index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    output: './log/out.log',
    error: './log/error.log',
    log: './log/combined.outerr.log',
    // env: {
    //   NODE_ENV: 'development'
    // },
    // env_production: {
    //   NODE_ENV: 'production'
    // }
  }]
};
