const { exec, execFile } = require('child_process');
// 在shell里执行ls的命令，data是返回结果
exec('ls', (err, data, dataerr) => {
  console.log(data)
})
// 可以通过流的方式打印
let child = exec('ls');
child.stdout.on('data',(info)=> {
  console.log(`info:${info}`)
})

// 在shell里执行ls -c的命令，data是返回结果
execFile('ls',['-c'], (err, data, dataerr) => {
  console.log(data)
})