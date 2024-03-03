import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";


// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//  if (req.method === 'DELETE') {
//   try {
//     const { id } = req.query;
//     const result = await sql`
//       DELETE FROM plate
//       WHERE id = ${id}
//       RETURNING *;
//     `;
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Experiment not found' });
//     }
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     const errorMessage = (error instanceof Error) ? error.message : 'Unknown error';
//     res.status(500).json({ message: 'Failed to delete experiment', error: errorMessage });
//   }
// }
// }