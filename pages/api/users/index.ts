// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserBase } from '../../../';
const { listUsers, createUserByEmailAndPassword } = require('../../../services/users');

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserBase[] | { message: string }>) {
  console.time(`${req.method}::${req.url} `)
  switch (req.method) {
    case "GET":
      res.status(200).json(await listUsers({}))
      break;

    case "POST":
      console.log(req.body);
      let newUser = await createUserByEmailAndPassword(req.body);
      res.status(200).json(newUser === false ? { message: "Failed To Create New User." } : newUser);
      break

    default:
      res.status(400).json({ message: "Unsupported request method." })
      break;
  }
  console.timeEnd(`${req.method}::${req.url} `)

}
