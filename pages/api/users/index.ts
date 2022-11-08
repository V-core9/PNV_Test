// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { UserBase } from '../../../';
const { listUsers, createUserByEmailAndPassword } = require('../../../services/users');

export default async function handler(req: NextApiRequest, res: NextApiResponse<UserBase[] | { message: string, status?: string }>) {
  console.time(`${req.method}::${req.url} `)
  switch (req.method) {
    case "GET":
      res.status(200).json(await listUsers({ ...req.query }));
      break;

    case "POST":
      try {
        //console.log(req.body);
        const user: any = await createUserByEmailAndPassword({ ...req.body });
        delete user.password;
        res.status(200).json({ ...user });
      } catch (err: any) {
        res.status(400).json({ status: 'error', message: err.message })
      }
      break

    default:
      res.status(400).json({ message: "Unsupported request method." })
      break;
  }
  console.timeEnd(`${req.method}::${req.url} `)

}
