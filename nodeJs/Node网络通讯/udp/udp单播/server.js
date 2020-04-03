const dgram = require('dgram');
const serve = dgram.createSocket('udp4');


serve.on('listening', ()=> {
  var address = serve.address();
  console.log(`serve running: ${address.address}: ${address.port}`)
})

serve.on('message', (msg, remoteInfo) => {
  console.log(`serve got ${msg} from ${remoteInfo.address}: ${remoteInfo.port}`)
  serve.send('world', remoteInfo.port, remoteInfo.address)
})

serve.on('error', (err)=> {
  console.log(`serve error: ${err}`)
})

serve.bind(4000)