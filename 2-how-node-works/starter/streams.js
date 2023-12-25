const fs = require('fs');
const http = require('http');

const server = http.createServer();
server.on('request', (req, res) => {
  res.writeHead(200, { 'Content-type': 'text/html' });
  // SOlution 1
  // fs.readFile(`${__dirname}/test-file.txt`, 'utf-8', (err, data) => {
  //   if (err) console.log(err);
  //   else res.end(data);
  // });
  // SOlution 2
  // const readable = fs.createReadStream(`${__dirname}/test-files.txt`, 'utf-8');
  // readable.on('data', chunk => {
  //   res.write(chunk);
  // });
  // readable.on('end', () => {
  //   res.end();
  // });
  // readable.on('error', err => {
  //   console.log('My Error:', err);
  //   res.writeHead(500);
  //   res.end('File not found!');
  // }

  // SOlution 3
  const readable = fs.createReadStream(`${__dirname}/test-file.txt`, 'utf-8');
  // readableSource.pipe(writableDest)
  readable.pipe(res);
  readable.on('error', err => {
    console.log('My Error:', err);
    res.writeHead(500);
    res.end('File not found!');
  });
});

server.listen(3000, () => {
  console.log('Listning at port 3000');
});
