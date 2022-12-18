// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
//require('dotenv').config();
import type { NextApiRequest, NextApiResponse } from 'next'

import { gatherUsersLanguages } from '../../../../services/github_insides';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  switch (req.method) {
    case "GET":
      let data;
      try {
        data = await gatherUsersLanguages(<string>req.query.username);
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
