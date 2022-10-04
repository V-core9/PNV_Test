const bcrypt = require('bcrypt');
//const { db } = require('../utils/db');
import db from '../utils/db';


const usersService = {

  listUsers() {
    return db.user.findMany();
  },

  findUserByEmail(email: string) {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  },

  findUserById(id: string) {
    return db.user.findUnique({
      where: {
        id,
      },
    });
  },

  updateUser(user: any) {
    if (user.password !== undefined) delete user.password;
    return db.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: user.email,
        isAdmin: user.isAdmin,
      }
    });
  },

  createUserByEmailAndPassword(user: any) {
    user.password = bcrypt.hashSync(user.password, 12);
    return db.user.create({
      data: user,
    });
  }
};

module.exports = usersService;
module.exports.default = usersService;

export default usersService;
