import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const exps = await sql`SELECT * FROM experiments`;
      res.status(200).json(exps.rows);
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
      res.status(500).json({ message: 'Failed to fetch experiments', error: errorMessage });
    }
  } else if (req.method === 'POST') {
    try {
      let name, size;
      if (req.query.name && req.query.size) {
        name = req.query.name as string;
        size = parseInt(req.query.size as string);
      } else {
        name = req.body.name;
        size = req.body.size;
      }
      if (!name || !size) {
        return res.status(400).json({ message: 'Experiment name and plate size required.' });
      }
      if (size !== 96 && size !== 384) {
        return res.status(400).json({ message: 'Invalid plate size. Plate size must be 96 or 384.' });
      }
      const result = await sql`
        INSERT INTO experiments (name, size)
        VALUES (${name}, ${size})
        RETURNING *;
      `;
      res.status(201).json(result.rows[0]);
    } catch (error) {
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
      res.status(500).json({ message: 'Failed to create experiment', error: errorMessage });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
