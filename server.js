const http = require('http');
const path = require('path');
const fs = require('fs');
const PORT = 4000;
const hostname = 'localhost';

  // creat a server using the createServer method 
const server = http.createServer(function(req, res) {

  // serverHandler callback function :an if block to check if the incoming request is a GET request and the request url is / then code inside if statement will be executed.

    if(req.method === 'GET' && req.url === '/') {
        let filePath = path.resolve(__dirname + "/index.html")
      //check if the index.html exists in our directory
        let fileExists = fs.existsSync(filePath);
      // if the file does not exist, return a 404 status
    if (!fileExists) {
        res.statusCode = 404;
        res.writeHead('Content-Type', 'text/html');

        res.end(`
            <html>
                <body>
                <h3>Page not found</h3>
                </body>
            </html>`)
    } 
    else {
        //If file exists, create a readable stream using createReadStream method from fs module and pipe into res object which sends it to the browser.
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(filePath).pipe(res);
        }
    }
});
//server.listen to start our server on the PORT 4000.
server.listen(PORT, hostname, () => {
    console.log(`Server running at ${hostname}:${PORT}`);   
})