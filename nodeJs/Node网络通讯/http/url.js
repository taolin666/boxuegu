const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.statusCode = 200,
    // res.setHeader('Content-Type', 'text/plan')
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.end('hello /')
  } else if(req.url === '/a') {
    res.end('hello /a')
  } else if(req.url === '/b') {
    res.end('hello b')
  } else {
    res.end('404')
  }
  
})

server.listen(8083, () => {
  console.log(`端口:8083,起来了`)
})

