const ROOT_PATH = process.cwd()
require('best-require')(ROOT_PATH, {
    root: ROOT_PATH,
    proj: ROOT_PATH + '/proj',
    app: ROOT_PATH + '/app',
    controller: ROOT_PATH + '/app/controller',
    config: ROOT_PATH + '/app/config',
    lib: ROOT_PATH + '/lib',
    service: ROOT_PATH + '/app/service',
    map: ROOT_PATH + '/app/map'
})