// Usage example: node ping.js play.fonline-reloaded.net 2238
const Net = require('net');
const client = new Net.Socket();

let host = process.argv[2];
let port = process.argv[3];

let players=0;
let uptime=0;

function formatTime(uptime) {
    let arr=[];
    let m = (uptime / 60);
    let h = m > 60 ? m / 60 : 0;
    let d = h > 24 ? h / 24 : 0;
    let mo = d > 30 ? mo / 30 : 0;
    if(mo != 0) {
        arr.push(Math.round(mo)+' months');
        arr.push(Math.round(d % 30)+'days');
    }
    else {
        if(d != 0) arr.push(Math.round(d)+' days');
        if(h % 24 != 0) arr.push(Math.round(h % 24) +' hours');
        if(m % 60 != 0) arr.push(Math.round(m % 60) + ' minutes');
    }
    return arr.join(', ');
}

client.on('data', function(chunk) {
    players = chunk.readUInt32LE(0);
    uptime = chunk.readUInt32LE(4);
    console.log('Players: ' + players)
    console.log('Uptime: ' + formatTime(uptime));
    client.end();
});

client.connect({ port: port, host: host }, function() {
    console.log('Connected to ' + host + ':' + port);
    client.write(new Buffer([0xFF, 0xFF, 0x0FF, 0xFF]));
});
