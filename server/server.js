const http = require('http')
const url = require('url');
const fs = require('fs')


const fileExtensions = {
  'html': 'text/html',
  'css': 'text/css',
  'js': 'text/javascript',
  'json': 'application/json',
  'png': 'image/png',
  'jpg': 'image/jpg',
  'wav': 'audio/wav',
  'ico': 'image/x-icon'
}


// build a simple http server
http.createServer((request, response) => {
  response.writeHead(200, { 'Content-type': fileExtensions.plain })
  response.write('You did it!')
  response.end()
}).listen(8000)

// handling URL parameters http://127.0.0.1:8001/?name=Jack&age=24
http.createServer((request, response) => {
  const params = url.parse(request.url, true).query
  response.writeHead(200, {
    'Content-Type': 'text/plain'
  });
  response.write(`
        Here is your data from url: ${params.name} is ${params.age} years old.
    `.trim())
  response.end()
}).listen(8001)

// reading and writing file   http://127.0.0.1:8002/
http.createServer((req, rsp) => {
  if (req.url === '/') {
    const fileName = './src/count.txt'
    fs.readFile(fileName, 'utf-8', (er, data) => {
      if (er) throw er
      rsp.writeHead(200, { 'Content-Type': fileExtensions.plain })
      rsp.write(`previous number is ${data}\n`)
      const plus = parseInt(data) + 1
      fs.writeFile(fileName, plus, () => {
        rsp.write(`
          Now the number is ${plus}
         `.trim())
        rsp.end('\nit\'s end.')
      })
    })
  } else {
    rsp.writeHead(404)
    rsp.write('404 not found')
    rsp.end()
  }
}).listen(8002)

// to build a server with html
// 1. single file .html
http.createServer((request, response) => {
  const fileName = './index.html'
  fs.readFile(fileName, 'utf-8', (er, html) => {
    if (er) throw er
    response.writeHead(200, { 'Content-Type': fileExtensions.html })
    response.write(html)
    response.end()
  })
}).listen(8003)

// 2. more complex, need to load extra file, like script src
http.createServer((request, response) => {
  // const fileHtml = './index_js.html'
  // const fileJs = './src/app.js'

  // if (request.url === '/') {
  //   fs.readFile(fileHtml, 'utf-8', (er, html) => {
  //     if (er) throw er
  //     response.writeHead(200, { 'Content-Type': MimeTypes.html })
  //     response.write(html)
  //     response.end()
  //   })
  // } else {
  //   fs.readFile(fileJs, 'utf-8', (er, js) => {
  //     if (er) throw er
  //     response.writeHead(200, { 'Content-Type': MimeTypes.js })
  //     response.write(js)
  //     response.end()
  //   })
  // }

  // new
  let path, fileSuffix, mimeType

  if (request.url === '/') {
    path = './index_main.html'
    fileSuffix = 'html'
  } else {
    path = '.' + request.url
    fileSuffix = path.split('.').pop()
  }
  mimeType = fileExtensions[fileSuffix]

  fs.readFile(path, 'utf-8', (er, data) => {
    if (er) throw er
    response.writeHead(200, { 'Content-Type': mimeType })
    response.write(data)
    response.end()
  })

}).listen(8004)
