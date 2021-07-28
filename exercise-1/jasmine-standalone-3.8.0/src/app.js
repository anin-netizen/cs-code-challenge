const http = require('http');
const fs = require('fs');

//const hostname = '127.0.0.1';
const port = 3000;

const index = fs.readFileSync(`./index.html`);
const server = http.createServer((req, res) => {
  console.log("req url", req.url);
  res.writeHead(200, { 'Content-Type': 'text/html' })
  return res.end(index);
})
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}/`)
});
