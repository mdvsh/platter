import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { id } = req.query;
      if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid id parameter' });
      }
      const result = await sql`
      SELECT * FROM experiments
      WHERE id = ${id};
    `;
      if (result.rows.length === 0) {
        return res.status(404).json({ message: "Experiment not found" });
      }
      const wells = await sql`SELECT * FROM well WHERE plate_id = ${id}`;
      res.status(200).json(result.rows[0]);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res
        .status(500)
        .json({ message: "Failed to fetch experiment", error: errorMessage });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      if (typeof id !== 'string') {
        return res.status(400).json({ message: 'Invalid id parameter' });
      }
      const result = await sql`
        DELETE FROM experiments
        WHERE id = ${id}
      `;
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Experiment not found" });
      }
      res.status(200).json({ message: "Experiment deleted successfully" });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res
        .status(500)
        .json({ message: "Failed to delete experiment", error: errorMessage });
    } 
  }
  else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
