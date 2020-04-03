const net  = require('net');
const types = require('./types')
let nickname = null;
const client = net.createConnection({
  host: '127.0.0.1',
  port: 3000
})
// 客服端发送给服务端
client.on('connect', (data) => {
  console.log('客户端与服务器连接成功')
  process.stdout.write('请输入昵称:')
  process.stdin.on('data', data => {
    data = data.toString().trim();
    if (!nickname) {
      return client.write(JSON.stringify({
        type:types.login,
        nickname: data
      }))
    }
    const match = /^@(\w+)\s(.+)$/.exec(data)
    // 私聊
    if (match) {
      return client.write(JSON.stringify({
        type: types.p2p,
        message: match[2],
        nickname: match[1]
      }))
    }
    // 群聊
    client.write(JSON.stringify({
      type: types.broadcast,
      message:data
    }))
  })
})
// 客户端接受服务端
client.on('data', data => {
  data = JSON.parse(data.toString().trim())
  switch (data.type) {
    case types.login:
      if (!data.success) {
        console.log(`登陆失败：${data.message}`);
        process.stdout.write('请输入昵称：')
      } else {
        nickname = data.nickname
        console.log(`登陆成功,在线人数：${data.sumUsers}人`)
      }
      break
    case types.broadcast:
      console.log(`${data.nickname}: ${data.message}`)
      break
    case types.p2p:
      console.log('data' + data.nickname)
      if(!data.success) {
        return console.log(`发送失败，原因：${data.message}`)
      }
      console.log(`${data.nickname}对你说：${data.message}`)
      break
    case types.log:
      console.log(data.message)
      break
    default:
      console.log(`未知消息类型`)
      break
  }
})