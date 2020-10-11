var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const api_key = "6a55cae4-ba5d-4377-b941-247eb2036477";
const iv = "5pZnlWC7KdPyFZ00UzwApQ==";
const payload = "Dz0N23alAgDlFKpBgyqwIA=="
app.get('/', function(req, res) {
   res.send('index.html');
});

// adminNamespace.use((socket, next) => {
//     // ensure the user has sufficient rights
//     next();
//   });
io.on('connection', function(socket) {
   console.log('A user connected');
   let pList = []
   //Send a message after a timeout of 4seconds
   let counter = 0
   let data = api_key + "*" + iv + "*" + payload
   let p = setInterval(() => {
   let cur  = ++counter
   console.log("current counter", cur)
   socket.emit('aaa', data);
    // io.emit('aaa', ++counter);

}, 50);
    socket.on('ccc', (data) => {
    console.log(data);
  });
   socket.on('disconnect', function () {
      clearInterval(p);

      console.log('A user disconnected');
   });
});

http.listen(8765, function() {
   console.log('listening on *:8765');
});