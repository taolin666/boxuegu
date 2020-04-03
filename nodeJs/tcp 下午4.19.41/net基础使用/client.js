const net = require('net');

const client = net.createConnection({
  host: '127.0.0.1',
  port: 6666
})
client.on('connect', ()=> {
  console.log('连接成功')
  // 写给服务端端内容
  client.write('world');

  // 获取终端输入发送给服务端
  process.stdin.on('data', data => {
    console.log(data.toString().trim())
    client.write(data.toString().trim())
  })
})

// 接受服务端发送的内容
client.on('data', (data) => {
   console.log(data.toString())
})


