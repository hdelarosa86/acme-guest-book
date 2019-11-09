const fs = require('fs');
const http = require('http');
const path = require('path');

/*______________________________________________*/

const readFilePromise = path => {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res(data);
      }
    });
  });
};

http
  .createServer((req, res) => {
    if (req.url === '/api/guests') {
      readFilePromise('./guests.json').then(data => {
        res.write(data);
        res.end();
      });
    }

    else if(req.url === '/') {
        readFilePromise('./index.html').then(data => {
            res.write(data);
            res.end();
          });
    }
  })
  .listen(3000);