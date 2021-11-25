require('dotenv').config();
const http = require('http');
const controller = require('./personController.js');

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  if (req.url === '/person' || req.url === '/person/') {
    switch (req.method) {
      case 'GET':
        controller.getPersons(req, res);
        break;
      case 'POST':
        controller.addPerson(req, res);
        break;
      default:
        controller.wrongMethod(res);
        break;
    }
  } else if (req.url.match(/^\/person\//)) {
    const id = req.url.replace('/person/', '');
    switch (req.method) {
      case 'GET':
        controller.getPerson(req, res, id);
        break;
      case 'PUT':
        controller.updatePerson(req, res, id);
        break;
      case 'DELETE':
        controller.deletePerson(req, res, id);
        break;
      default:
        controller.wrongMethod(res);
        break;
    }
  } else {
    controller.wrongUrl(res);
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
