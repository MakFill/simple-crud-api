const persons = require('./personModel.js');
const { validateIncomingBody, validateUUID } = require('./validate.js');

const controller = {
  getPersons: async (req, res) => {
    try {
      const data = await persons.getAll();
      res.writeHead(200, 'Content-Type: application/json');
      res.end(JSON.stringify(data));
    } catch (err) {
      process.stderr.write('Internal error: ' + err);
      res.writeHead(500);
      res.end('Internal server error');
    }
  },

  getPerson: async (req, res, id) => {
    if (!validateUUID(id)) {
      res.writeHead(400);
      res.end(`id ${id} not uuid`);
    }
    try {
      const data = await persons.getById(id);
      if (!data) {
        res.writeHead(404);
        res.end(`Person with id ${id} not found`);
      } else {
        res.writeHead(200, 'Content-Type: application/json');
        res.end(JSON.stringify(data));
      }
    } catch (err) {
      process.stderr.write('Internal error: ' + err);
      res.writeHead(500);
      res.end('Internal server error');
    }
  },

  addPerson: async (req, res) => {
    try {
      let body = '';
      req.on('data', (data) => {
        body += data.toString();
      });

      req.on('end', async () => {
        try {
          const item = JSON.parse(body);

          const valid = validateIncomingBody(item);
          if (valid !== 'Valid') {
            res.writeHead(400, 'Content-Type: plain/text');
            res.end(valid);
          } else {
            const newPerson = await persons.create(item);
            res.writeHead(201, 'Content-Type: application/json');
            res.end(JSON.stringify(newPerson));
          }
        } catch (err) {
          process.stderr.write('Internal error: ' + err);
          res.writeHead(500);
          res.end('Internal server error');
        }
      });
    } catch (err) {
      process.stderr.write('Internal error: ' + err);
      res.writeHead(500);
      res.end('Internal server error');
    }
  },

  updatePerson: async (req, res, id) => {
    if (!validateUUID(id)) {
      res.writeHead(400);
      res.end(`id ${id} not uuid`);
    }
    try {
      const data = await persons.getById(id);
      if (!data) {
        res.writeHead(404);
        res.end(`Person with id ${id} not found`);
      } else {
        let body = '';
        req.on('data', (data) => {
          body += data.toString();
        });

        req.on('end', async () => {
          try {
            const item = JSON.parse(body);

            const valid = validateIncomingBody(item);
            if (valid !== 'Valid') {
              res.writeHead(400, 'Content-Type: plain/text');
              res.end(valid);
            } else {
              const newPerson = await persons.update(id, item);
              res.writeHead(200, 'Content-Type: application/json');
              res.end(JSON.stringify(newPerson));
            }
          } catch (err) {
            process.stderr.write('Internal error: ' + err);
            res.writeHead(500);
            res.end('Internal server error');
          }
        });
      }
    } catch (err) {
      process.stderr.write('Internal error: ' + err);
      res.writeHead(500);
      res.end('Internal server error');
    }
  },

  deletePerson: async (req, res, id) => {
    if (!validateUUID(id)) {
      res.writeHead(400);
      res.end(`id ${id} not uuid`);
    }
    try {
      const data = await persons.getById(id);
      if (!data) {
        res.writeHead(404);
        res.end(`Person with id ${id} not found`);
      } else {
        await persons.delete(id);
        res.writeHead(204, 'Content-Type: application/json');
        res.end();
      }
    } catch (err) {
      process.stderr.write('Internal error: ' + err);
      res.writeHead(500);
      res.end('Internal server error');
    }
  },

  wrongMethod: (res) => {
    res.writeHead(405, 'Content-Type: plain/text');
    res.end('Method Not Allowed');
  },

  wrongUrl: (res) => {
    res.writeHead(404, 'Content-Type: plain/text');
    res.end("The URL passed doesn't exist");
  },
};

module.exports = controller;
