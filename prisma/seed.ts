//const { db } = require('../utils/db');
import db from '../utils/db';
const { v4: uuidv4 } = require('uuid');
const { createUserByEmailAndPassword } = require('../services/users');
const {
  addRefreshTokenToWhitelist: addRefreshTokenToWhitelist,
  findRefreshTokenById: findRefreshTokenById,
  deleteRefreshToken: deleteRefreshToken,
  revokeTokens: revokeTokens
} = require('../services/auth');

import jwtUtil from '../utils/jwt';

const log = (...args: any) => console.log(...args);

(async () => {
  console.log('Prisma Types', Object.keys(db));

  const seedAdmin = await createUserByEmailAndPassword({ username: 'SlavkoV', email: 'slavko.vuletic92@gmail.com', password: '0123456789', isAdmin: true });

  log('Seed Admin User', seedAdmin);

  console.log('db.user object keys', Object.keys(db.user));

  const jtiSeed = uuidv4();
  const seedRefreshToken = await addRefreshTokenToWhitelist({ jti: jtiSeed, refreshToken: jwtUtil.generateTokens(seedAdmin, jtiSeed), userId: seedAdmin.id });

  log('Seed Admin seedRefreshToken', seedRefreshToken);

})();
