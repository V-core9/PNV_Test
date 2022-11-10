//const { db } = require('../utils/db');
import db from '../utils/db';
const { v4: uuidv4 } = require('uuid');
const { createUserByEmailAndPassword, findUserByEmail } = require('../services/users');
const { createNewPage } = require('../services/pages');
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

  //const seedAdmin = await createUserByEmailAndPassword({ username: 'SlavkoV', email: 'slavko.vuletic92@gmail.com', password: '0123456789', isAdmin: true });

  //log('Seed Admin User', seedAdmin);

  //console.log('db.user object keys', Object.keys(db.user));

  //const jtiSeed = uuidv4();
  //const seedRefreshToken = await addRefreshTokenToWhitelist({ jti: jtiSeed, refreshToken: jwtUtil.generateTokens(seedAdmin, jtiSeed), userId: seedAdmin.id });

  //log('Seed Admin seedRefreshToken', seedRefreshToken);

  const demoAuthor = await findUserByEmail('slavko.vuletic92@gmail.com');
  const demoPage = await createNewPage({
    title: 'Demo Seed Page',
    slug: 'demo-seeded-page',
    description: 'yeaaa page desc',
    body: `<h2>Cras mattis consectetur purus sit amet fermentum.</h2>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>

            <p>Aenean lacinia bibendum nulla sed consectetur.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Donec sed odio dui.Donec ullamcorper nulla non metus auctor fringilla.</p>

            <h2>Cras mattis consectetur purus sit amet fermentum.</h2>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>

            <p>Aenean lacinia bibendum nulla sed consectetur.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Donec sed odio dui.Donec ullamcorper nulla non metus auctor fringilla.</p>

            <h2>Cras mattis consectetur purus sit amet fermentum.</h2>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>

            <p>Aenean lacinia bibendum nulla sed consectetur.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Donec sed odio dui.Donec ullamcorper nulla non metus auctor fringilla.</p>

            <h2>Cras mattis consectetur purus sit amet fermentum.</h2>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>

            <p>Aenean lacinia bibendum nulla sed consectetur.Praesent commodo cursus magna, vel scelerisque nisl consectetur et.Donec sed odio dui.Donec ullamcorper nulla non metus auctor fringilla.</p>`,
    authorId: demoAuthor.id
  });

  console.log(demoPage);

})();
