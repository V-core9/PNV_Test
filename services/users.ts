// Types and Interfaces
import type { UserBase } from '..';
import { UsersService } from '..';

// Loading of things
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
import db from '../utils/db';


const listUsers = (params: any = {}) => {
  let page = parseInt(params.page || 1);
  let perPage = parseInt(params.perPage || 50);

  if (page < 1 || isNaN(page)) page = 1;
  if (perPage > 100 || perPage < 10 || isNaN(perPage)) perPage = 50;


  return db.user.findMany({
    skip: page * perPage,
    take: perPage,
    orderBy: {
      createdAt: 'desc',
    },
  });
};

const countUsers = () => db.user.count();

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

const findUserByUsername = (username: string) => {
  return db.user.findFirst({
    where: {
      username,
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
  if (!email || !password) {
    throw new Error('You must provide an email and a password.');
  }

  const username: string = user.username || uuidv4();

  const existByEmail = await findUserByEmail(email);
  const existByUsername = await findUserByUsername(username);

  if (!!existByEmail) throw new Error('Email already in use.');
  if (!!existByUsername) throw new Error('Username already in use.');

  password = bcrypt.hashSync(password, 12);

  return db.user.create({
    data: {
      email,
      password: <string>password,
      username,
      isAdmin: false
    },
  });
};


const usersService = {
  listUsers,
  findUserByEmail,
  findUserById,
  findUserByUsername,
  updateUser,
  createUserByEmailAndPassword,
  countUsers,
};

module.exports = usersService;
module.exports.default = usersService;

export default usersService;
