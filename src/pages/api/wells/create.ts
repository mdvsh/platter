import { sql } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

function generateCompId(plate_id: string, row: string, col: number): string {
  const truncatedPlateId = plate_id.substring(0, 8);
  return `${truncatedPlateId}-${row}${col}`;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { row, col, reagent, antibody, concentration, plate_id } = req.body;
    try {
      const result = await sql`
        INSERT INTO wells (comp_id, row, col, reagent, antibody, concentration, plate_id)
        VALUES (${generateCompId(
          plate_id,
          row,
          col
        )}, ${row.toUpperCase()}, ${col}, ${reagent.toUpperCase()}, ${antibody.toUpperCase()}, ${concentration}, ${plate_id})
        RETURNING *;
      `;
      res.status(201).json(result.rows[0]);
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res
        .status(500)
        .json({
          message: "Failed to add well information",
          error: errorMessage,
        });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
