// 接受主进程的信息
process.on('message', (data) => {
  console.log('data', data)
})

// 发送给主进程的数据
process.send('我收到了')
console.log('process.env', process.env.NODE_UNIQUE_ID)