const fs = require('fs')
const http = require('http')
const path = require('path')
const url = require('url')

// 从命令行参数获取root目录，默认是当前目录:
var root = path.resolve();

console.log('Static root dir: ' + root);

// 创建服务器
const server = http.createServer((request, response) => {
    // 获得 URL 的 path，类似 '/css/bootstrap.css':
    const pathName = url.parse(request.url).pathname
    // 获得对应的本地文件路径，
    const filePath = path.join(root, pathName)
    fs.stat(filePath, (error, stats) => {
        if (error) {
            console.log(`404:${request.url}`)
            response.writeHead(404)
            response.end('404 not found')
        } else {
            if (!stats.isFile()) return
            console.log(`200:${request.url}`);
            response.writeHead(200)
            fs.createReadStream(filePath).pipe(response)
        }
    })
})

server.listen(2300)