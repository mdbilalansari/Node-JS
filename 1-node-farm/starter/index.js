const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

/////////////////////////////////
// FILES
/*
// Blocking, synchronous way
const textIn = fs.readFileSync(`${__dirname}/txt/input.txt`, 'utf-8');
console.log(textIn);
const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync(`${__dirname}/txt/output.txt`, textOut);
console.log('File written!');

// Non-blocking, asynchronous way
fs.readFile(`${__dirname}/txt/start.txt`, 'utf-8', (err, data1) => {
  if (err) return console.log('ERROR! 💥');

  fs.readFile(`${__dirname}/txt/${data1}.txt`, 'utf-8', (err, data2) => {
    console.log(data2);
    fs.readFile(`${__dirname}/txt/append.txt`, 'utf-8', (err, data3) => {
      console.log(data3);

      fs.writeFile(`${__dirname}/txt/final.txt`, `${data2}\n${data3}`, 'utf-8', (err) => {
        console.log('Your file has been written 😁');
      });
    });
  });
});
console.log('Will read file!');
*/

/////////////////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const slugs = dataObj.map((el) => slugify(el.productName, { lower: true }));

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardsHtml = dataObj.map((el) => replaceTemplate(tempCard, el)).join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    // Product Page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, { 'Content-type': 'text/html' });
    res.end('<h1>Page not found (404)!</h1>');
  }
});
server.listen(3000, '127.0.0.1', () => {
  console.log('Listning to request on port 3000.');
});
