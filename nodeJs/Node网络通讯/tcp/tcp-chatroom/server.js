const net = require('net');
const server = net.createServer();
const types = require('./types')
// const clients = []
const users = []
server.on('connection', clientSocket => {
  // clients.push(clientSocket)
  clientSocket.on('data', (data) => {
    // console.log('客户端说：', data.toString())
    // clients.forEach(scoket => {
    //   if(scoket !== clientSocket) {
    //     scoket.write(data)
    //   }
    // })
    data = JSON.parse(data.toString().trim())
    switch (data.type) {
      case types.login:
        if (users.find(item => item.nickname === data.nickname)) {
          return clientSocket.write(JSON.stringify({
            type:types.login,
            success: false,
            message: '昵称已重复'
          }))
        }
        clientSocket.nickname = data.nickname;
        users.push(clientSocket);
        clientSocket.write(JSON.stringify({
          type: types.login,
          success: true,
          message: '登陆成功',
          nickname: data.nickname,
          sumUsers: users.length,
        }))
        users.forEach(user => {
          if (user !== clientSocket) {
            user.write(JSON.stringify({
              type: types.log,
              message: `${clientSocket.nickname}上线了，当前用户${users.length}`
            }))
          }
        })
        break
      case types.broadcast:
        users.forEach(item => {
          item.write(JSON.stringify({
            type: types.broadcast,
            nickname: clientSocket.nickname,
            message: data.message
          }))
        })
        break
      case types.p2p:
        const user = users.find(item => item.nickname === data.nickname)
        if (!user) {
          return clientSocket.write(JSON.stringify({
            type: types.p2p,
            success: false,
            message: '该用户不存在'
          }))
        }
        user.write(JSON.stringify({
          nickname: clientSocket.nickname,
          type: types.p2p,
          success: true,
          message: data.message
        }))
        break
      default:
        break
    }
  })

  clientSocket.on('end', () => {
    const index = users.findIndex(item => item.nickname === clientSocket.nickname)
    if (index !== -1) {
      const offlineUser = users[index]
      users.splice(index, 1)
      users.forEach(item => {
        item.write(JSON.stringify({
          type: types.log,
          message: `${offlineUser.nickname}离线了，当前用户${users.length}`
        }))
      })
    }
  })
})
server.listen(3000, ()=> console.log('server running...'))