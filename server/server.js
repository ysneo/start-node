const http = require('http')

// build a simple http server
http.createServer((request, response) => {
    response.writeHead(200, { 'Content-type': 'text/plain' })
    response.write('You did it!')
    response.end()
}).listen(8000)