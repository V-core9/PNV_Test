//const { db } = require('../utils/db');
import db from '../utils/db';
const { createUserByEmailAndPassword } = require('../services/users');
const log = (...args: any) => console.log(...args);

(async () => {
  console.log('Prisma Types', Object.keys(db));

  const seedAdmin = await createUserByEmailAndPassword({ username: 'SlavkoV', email: 'slavko.vuletic92@gmail.com', password: '0123456789', isAdmin: true });

  log('Seed Admin User', seedAdmin);

  console.log('db.user object keys', Object.keys(db.user));

})();
