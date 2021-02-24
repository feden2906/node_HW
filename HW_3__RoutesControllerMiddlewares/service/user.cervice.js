const fs = require("fs");
const path = require('path');
const {promisify} = require('util');

const errorMessages = require('../error/error.messages');

const readFilePromise = promisify(fs.readFile);

const pathDB = path.join(process.cwd(), 'dataBase', 'users.json');


module.exports = {
  findAllUsers: async (preferLanguage, query) => {
    const data = await readFilePromise(pathDB);
    const { userName } = query;
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

    const chosenUser = users.find(user => user.id === +userId)

    if (!chosenUser) {
      throw new Error(errorMessages.USER_NOT_FOUND[preferLanguage]);
    }

    return chosenUser;
  },






  createUser: (userObject) => {
    DB.push(userObject);
  }
}
