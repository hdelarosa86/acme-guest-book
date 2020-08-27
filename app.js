const fs = require('fs');
const http = require('http');
const path = require('path');

/*______________________________________________*/

const readFilePromise = (path) => {
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

const writeFilePromise = (file, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(file, data, (err, data) => {
      if (err) {
        rej(err);
      } else {
        res();
      }
    });
  });
};
const addUser = (user) => {
  return readFilePromise('./guests.json')
    .then((data) => {
      const users = JSON.parse(data);
      let max = users.reduce((acc, user) => {
        if (user.id > acc) {
          acc = user.id;
        }
        return acc;
      }, 0);
      user.id = max + 1;
      users.push(user);
      return writeFilePromise('./guests.json', JSON.stringify(users));
    })
    .then(() => {
      return user;
    });
};

http
  .createServer((req, res) => {
    if (req.url === '/api/guests') {
      if (req.method === 'GET') {
        readFilePromise(path.join(__dirname, '/guests.json')).then((data) => {
          res.write(data);
          res.end();
        });
      } else if (req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
          body += chunk;
        });
        req.on('end', () => {
          const user = JSON.parse(body);
          addUser(user)
            .then((data) => {
              res.statusCode = 201;
              res.write(JSON.stringify(data));
              res.end();
            })
            .catch((ex) => console.log(ex));
        });
      }
    } else if (req.url === '/') {
      readFilePromise(path.join(__dirname, '/index.html')).then((data) => {
        res.write(data);
        res.end();
      });
    }
  })
  .listen(3000);
