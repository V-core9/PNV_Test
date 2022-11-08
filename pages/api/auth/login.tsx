// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { AuthJWT } from '../../../';
const { listUsers, createUserByEmailAndPassword, findUserByEmail } = require('../../../services/users');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const v_to_sha256 = require('v_to_sha256');
const bcrypt = require('bcrypt');
const { generateTokens } = require('../../../utils/jwt');
const {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens
} = require('../../../services/auth');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user using auth.
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     description: Provides fresh Access and Refresh Tokens for user to use.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User Login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/NewAuth'
*/


export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthJWT | { status: string, message: string }>) {
  console.time(`${req.method}::${req.url} `)
  switch (req.method) {
    case "POST":
      try {
        console.log(req.body);
        const { email, password } = req.body;
        if (!email || !password) {
          throw new Error('You must provide an email and a password.');
        }

        const existingUser = await findUserByEmail(email);

        if (!existingUser) {
          throw new Error('User does not exist.');
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
          throw new Error('Invalid login credentials.');
        }

        //const jti = uuidv4();
        const { accessToken, refreshToken } = generateTokens(existingUser);

        const loginRez = await addRefreshTokenToWhitelist({ refreshToken, userId: existingUser.id });

        res.status(200).json({
          accessToken,
          refreshToken,
        });
      } catch (err: any) {
        res.status(400).json({ status: 'error', message: err.message })
      }
      break

    default:
      res.status(400).json({ status: 'error', message: "Unsupported request method." })
      break;
  }
  console.timeEnd(`${req.method}::${req.url} `)

}
