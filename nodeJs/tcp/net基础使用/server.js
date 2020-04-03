const net = require('net');
const server = net.createServer();

server.on('connection', (clientSocket) => {
  console.log('有新的进来了')
  
  clientSocket.on('data', (data) => {
    // 接受客户端端内容
    console.log('客户端说：'+data.toString())
  })

  // 服务端给客户端发的内容
  clientSocket.write('hello')
})
server.listen(6666, () => {
  console.log('服务器已启动')
})