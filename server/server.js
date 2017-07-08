const http = require('http')
const url = require('url');
const fs = require('fs')


const MimeTypes = {
  plain: 'text/plain',
  html: 'text/html',
  js: 'text/javascript'
}


// build a simple http server
http.createServer((request, response) => {
  response.writeHead(200, { 'Content-type': MimeTypes.plain })
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
      rsp.writeHead(200, { 'Content-Type': MimeTypes.plain })
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
    response.writeHead(200, { 'Content-Type': MimeTypes.html })
    response.write(html)
    response.end()
  })
}).listen(8003)
