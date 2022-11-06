// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserBase } from '../../../';

//import { v4 as uuidv4 } from 'uuid';

import usersService from '../../../services/users';
const { createUserByEmailAndPassword, findUserByEmail } = usersService;

/**
 *
 * @swagger
 * tags:
 *  name: Auth
 *  description: API to manage Authorization of the user.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Auth:
 *       type: object
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: Auth Refresh Token.
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *     NewAuth:
 *       allOf:
 *         - type: object
 *           properties:
 *             accessToken:
 *               type: string
 *               description: Auth Access Token.
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *         - $ref: '#/components/schemas/Auth'
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The Auth Email.
 *           example: slavko.vuletic92@gmail.com
 *         password:
 *           type: string
 *           description: The Auth Password.
 *           example: 0123456789
 *     RevokeToken:
 *       type: object
 *       properties:
 *         user_id:
 *           type: string
 *           description: User ID to Revoke Tokens.
 *           example: 89daw19d81wa9
 *     RevokeTokenResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: User by ID Revoked Token.
 *           example: Tokens revoked for user with id 89daw19d81wa9
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register new user using auth.
 *     requestBody:
 *       description: Optional description in *Markdown*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     description: This should register new user and provide new auth tokens for user, basically not requiring authentication though login.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User Register Success.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: '#/components/schemas/NewAuth'
*/
export default async function handler(req: NextApiRequest, res: NextApiResponse<UserBase | UserBase[] | { message: string, status?: string }>) {
  console.time(`${req.method}::${req.url} `)
  switch (req.method) {
    case "POST":
      console.log(req.body);

      try {
        const { email, password } = req.body;
        if (!email || !password) {
          throw new Error('You must provide an email and a password.');
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
          throw new Error('Email already in use.');
        }

        const user: any = await createUserByEmailAndPassword({ email, password, username: req.body.username });

        if (!user) {
          throw new Error('Failed to register user.');
        }

        res.status(200).json(user);
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
