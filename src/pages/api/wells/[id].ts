import { sql } from "@vercel/postgres";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { id } = req.query;
    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid id parameter" });
    }
    try {
      const result = await sql`SELECT * FROM wells WHERE comp_id = ${id};`;
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: "Well not found" });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({
        message: "Failed to fetch well information",
        error: errorMessage,
      });
    }
  } else if (req.method === "PUT") {
    const { id } = req.query;
    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid id parameter" });
    }
    const { row, col, reagent, antibody, concentration } = req.body;
    // if (row && col) {
    //   return res.status(400).json({ message: "Please don't change existing well key.", error: "DB Key error" });
    // }
    try {
      const result = await sql`
      UPDATE wells
      SET reagent = ${reagent}, antibody = ${antibody}, concentration = ${concentration}
      WHERE comp_id = ${id}
      RETURNING *;
    `;
      if (result.rows.length > 0) {
        res.status(200).json(result.rows[0]);
      } else {
        res.status(404).json({ message: "Well not found" });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res.status(500).json({
        message: "Failed to update well information",
        error: errorMessage,
      });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    if (typeof id !== "string") {
      return res.status(400).json({ message: "Invalid id parameter" });
    }
    try {
      const result = await sql`DELETE FROM wells WHERE comp_id = ${id};`;
      if (result.rowCount > 0) {
        res.status(200).json({ message: "Well deleted successfully" });
      } else {
        res.status(404).json({ message: "Well not found" });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      res
        .status(500)
        .json({ message: "Failed to delete well", error: errorMessage });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
