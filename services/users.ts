// Types and Interfaces
import type { UserBase } from '..';
import { UsersService } from '..';

// Loading of things
const bcrypt = require('bcrypt');
import db from '../utils/db';


const listUsers = () => {
  return db.user.findMany();
};

const findUserByEmail = (email: string) => {
  return db.user.findUnique({
    where: {
      email,
    },
  });
};

const findUserById = (id: string) => {
  return db.user.findUnique({
    where: {
      id,
    },
  });
};

const updateUser = (user: UserBase) => {
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
};

const createUserByEmailAndPassword = async (user: UserBase) => {
  let { email, password } = user;
  const existingUser = await findUserByEmail(email);
  if (!existingUser) {

    password = bcrypt.hashSync(password, 12);
    return db.user.create({
      data: {
        email,
        password
      },
    });

  }

  return false;
};


const usersService: UsersService = {
  listUsers: listUsers,
  findUserByEmail: findUserByEmail,
  findUserById: findUserById,
  updateUser: updateUser,
  createUserByEmailAndPassword: createUserByEmailAndPassword,
};

module.exports = usersService;
module.exports.default = usersService;

export default usersService;
