const dgram = require('dgram');
const client = dgram.createSocket('udp4');

client.on('listening', ()=> {
  // 组播
  let memberAddr = '组播地址'
  client.addMembership(memberAddr)
})

client.on('message', (msg, remoteInfo) => {
  console.log(`client got ${msg} from ${remoteInfo.address}: ${remoteInfo.port}`)
})

client.on('error', err=> {
  console.log(`client error:${err}`)
})
client.bind(8000)