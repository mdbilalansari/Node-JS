const EventEmitter = require('events');
const http = require('http');

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on('newSale', () => {
  console.log('There was a new sale!');
});

setTimeout(() => {
  myEmitter.on('newSale', () => {
    console.log('Customer name: Bilal Ansari');
  });
}, 2000);

myEmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} item left`);
});

setTimeout(() => {
  myEmitter.emit('newSale', 10);
}, 2500);

////////////////////////////////////////////////////////////////////////////////

const server = http.createServer();

server.on('request', (req, res) => {
  console.log('Request Recieved!');
});

server.on('request', (req, res) => {
  console.log('Another Request Recieved!');
  res.end('Request Recieved!');
});

server.on('close', () => {
  console.log('Server Closed');
});

server.listen(3000, 'localhost', () => {
  console.log('Server is listning at port 3000 ...');
});
