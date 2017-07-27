const fs = require('fs')
const path = require('path')

function addMapping(router, mapping) {
    for (let url in mapping) {
        const methodAndPath = url.split(' ')
        const method = methodAndPath[0]
        const urlPath = methodAndPath[1]
        router[method.toLowerCase()](urlPath, mapping[url])
        console.log(`register URL mapping: ${method} ${urlPath}`);
    }
}

function addControllers(router, controller_dir) {
    const filePath = path.resolve(controller_dir)
    const files = fs.readdirSync(filePath)
    const js_files = files.filter(file => file.endsWith('.js'))
    console.log(js_files);
    js_files.forEach(f => {
        console.log(`process ${controller_dir}:${f}...`)
        // import js file
        const mapping = require(`${__dirname}/${controller_dir}/${f}`)
        addMapping(router, mapping)
    })
}

function initController(dir) {
    const router = require('koa-router')()
    const controllers_dir = dir || 'controller'
    addControllers(router, controllers_dir)
    return router.routes()
}

module.exports = initController