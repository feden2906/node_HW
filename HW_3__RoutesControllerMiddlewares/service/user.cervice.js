const fs = require("fs");
const path = require('path');
const {promisify} = require('util');

const errorMessages = require('../error/error.messages');

const readFilePromise = promisify(fs.readFile);
const writeFilePromise = promisify(fs.writeFile);

const pathDB = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {
  findAllUsers: async (preferLanguage, query) => {
    const data = await readFilePromise(pathDB);
    const {userName} = query;
    let users = JSON.parse(data);

    if (userName) {
      users = users.filter(user => user.userName === userName);
    }

    if (!users) {
      throw new Error(errorMessages.USERS_NOT_FOUND[preferLanguage]);
    }

    return users;
  },

  findUserById: async (userId, preferLanguage) => {
    const data = await readFilePromise(pathDB);
    const users = JSON.parse(data);

    const chosenUser = users.find(user => user.id === +userId);

    if (!chosenUser) {
      throw new Error(errorMessages.USER_NOT_FOUND[preferLanguage]);
    }

    return chosenUser;
  },

  createUser: async (newUser, preferLanguage) => {
    const data = await readFilePromise(pathDB);
    const users = JSON.parse(data).sort((a, b) => a.id - b.id);

    const userExists = users.some(user => user.email === newUser.email);

    if (userExists) {
      throw new Error(errorMessages.USER_IS_EXISTS[preferLanguage]);
    }

    users.push({...newUser, id: users[users.length - 1].id + 1});
    await writeFilePromise(pathDB, JSON.stringify(users));
  },

  deleteUser: async (userId, preferLanguage) => {
    const data = await readFilePromise(pathDB);
    const users = JSON.parse(data);

    const filteredUsers = users.filter(user => user.id !== +userId);

    if (users.length === filteredUsers.length) {
      throw new Error(errorMessages.USER_NOT_FOUND[preferLanguage]);
    }

    await writeFilePromise(pathDB, JSON.stringify(filteredUsers));
  }
}
