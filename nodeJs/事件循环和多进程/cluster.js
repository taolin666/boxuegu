const http = require('http');

const cluster = require('cluster');

const numCpus = require('os').cpus().length;

// if (cluster.isMaster) {
//   for(var i=0;i<numCpus; i++){
//     cluster.fork()
//   }
//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`工作进程${worker.process.pid} 已退出`)
//   })
// } else {
//   http.createServer((req, res) => {
//     res.end('hello');
//   }).listen(8085, () => {
//     console.log('8085')
//   })
// }


// http.createServer((req, res) => {
//   res.end('hello');
// }).listen(8085)
console.log(process.env)
if (cluster.isMaster) {
  console.log(`主进程 ${process.pid} 正在运行`);

  // 衍生工作进程。
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`工作进程 ${worker.process.pid} 已退出`);
  });
} else {
  // 工作进程可以共享任何 TCP 连接。
  // 在本例子中，共享的是 HTTP 服务器。
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('你好世界\n');
  }).listen(8085);

  console.log(`工作进程 ${process.pid} 已启动`);
}