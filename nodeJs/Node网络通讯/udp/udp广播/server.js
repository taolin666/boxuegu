const dgram = require('dgram');
const serve = dgram.createSocket('udp4');


serve.on('listening', ()=> {
  var address = serve.address();
  console.log(`serve running: ${address.address}: ${address.port}`)
  serve.send('taolin', 8000, '255.255.255.255')
  // 广播设置:true是打开，false是关闭
  serve.setBroadcast(true);
  setInterval(() => {
    // 受限地址：255.255.255.255
    serve.send('taolin', 8000, '255.255.255.255')
  },2000)
})

serve.on('message', (msg, remoteInfo) => {
  console.log(`serve got ${msg} from ${remoteInfo.address}: ${remoteInfo.port}`)
})

serve.on('error', (err)=> {
  console.log(`serve error: ${err}`)
})

serve.bind(4000)