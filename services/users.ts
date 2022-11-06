// Types and Interfaces
import type { UserBase } from '..';
import { UsersService } from '..';

// Loading of things
const { v4: uuidv4 } = require('uuid');
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

  const username: string = user.username || uuidv4();

  const existingUser = await findUserByEmail(email);
  if (!existingUser) {

    password = bcrypt.hashSync(password, 12);

    return db.user.create({
      data: {
        email,
        password: <string>password,
        username,
        isAdmin: false
      },
    });

  }

  return false;
};


const usersService = {
  listUsers,
  findUserByEmail,
  findUserById,
  updateUser,
  createUserByEmailAndPassword,
};

module.exports = usersService;
module.exports.default = usersService;

export default usersService;
