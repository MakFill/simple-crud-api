import data from './data.json';
import { v4 } from 'uuid';

export const persons = {
  getAll: async () => {
    return new Promise((res, rej) => {
      res(data);
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
