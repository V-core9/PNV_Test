// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import usersService from '../../../services/users';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  switch (req.method) {
    case "GET":
      let data;
      try {
        data = await usersService.findUserById(<string>req.query.id);
      } catch (error) {
        data = { message: "User Not found." }
      }
      res.status(200).json(data);
      break;

    default:
      res.status(400).json({ message: "Bad request." })
      break;
  }

}
