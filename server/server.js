const http = require('http')
const url = require('url');

// build a simple http server
http.createServer((request, response) => {
    response.writeHead(200, { 'Content-type': 'text/plain' })
    response.write('You did it!')
    response.end()
}).listen(8000)

// handling URL parameters
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

