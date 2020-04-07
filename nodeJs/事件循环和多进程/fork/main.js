const {fork} = require('child_process');
const path = require('path');

let child = fork(path.resolve(__dirname, './child.js'));

// 主进程接受到子进程到消息（接收）
child.on('message', (m) => {
  console.log(`接收到儿子的信息：${m}`)
})

// 主进程发送给子进程的信息（发送）
child.send('我是来自主进程的信息，你收到了吗？')