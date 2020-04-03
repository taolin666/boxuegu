const dgram = require('dgram');
const serve = dgram.createSocket('udp4');


serve.on('listening', ()=> {
  var address = serve.address();
  console.log(`serve running: ${address.address}: ${address.port}`)

  let memberAddr = '组播地址'
  setInterval(() => {
    // 受限地址：255.255.255.255
    serve.send('taolin', 8000, memberAddr)
  },2000)
})

serve.on('message', (msg, remoteInfo) => {
  console.log(`serve got ${msg} from ${remoteInfo.address}: ${remoteInfo.port}`)
})

serve.on('error', (err)=> {
  console.log(`serve error: ${err}`)
})

serve.bind(4000)