// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserBase } from '../../../';
const { listUsers, createUserByEmailAndPassword } = require('../../../services/users');

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserBase[] | { message: string }>) {

  switch (req.method) {
    case "GET":
      res.status(200).json(await listUsers({}))
      break;

    case "POST":
      res.status(200).json([await createUserByEmailAndPassword(req.body)])

    default:
      res.status(400).json({ message: "Unsupported request method." })
      break;
  }

}
