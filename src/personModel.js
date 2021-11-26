const data = require('./data.json');
const { v4 } = require('uuid');

const persons = {
  getAll: async () => {
    return new Promise((res, rej) => {
      try {
        res(data);
      } catch (err) {
        rej(err);
      }
    });
  },

  getById: async (id) => {
    return new Promise((res, rej) => {
      try {
        const item = data.find((elem) => elem.id === id);
        res(item);
      } catch (err) {
        rej(err);
      }
    });
  },

  create: async (item) => {
    return new Promise((res, rej) => {
      try {
        const newPerson = { id: v4(), ...item };
        data.push(newPerson);
        res(newPerson);
      } catch (err) {
        rej(err);
      }
    });
  },

  update: async (id, item) => {
    return new Promise(async (res, rej) => {
      try {
        const index = data.findIndex((el) => el.id === id);
        const updatedItem = { ...item, id };
        data[index] = updatedItem;
        res(updatedItem);
      } catch (err) {
        rej(err);
      }
    });
  },

  delete: async (id) => {
    return new Promise(async (res, rej) => {
      try {
        const index = data.findIndex((el) => el.id === id);
        const deletedItem = data.splice(index, 1);
        res(deletedItem);
      } catch (err) {
        rej(err);
      }
    });
  },
};

module.exports = persons;
