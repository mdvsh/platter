import React from "react";
import type { WellType } from "@/pages/dash";

const Well: React.FC<WellType> = ({ comp_id, row, col }) => {
  return (
    <div
      id={comp_id}
      className="rounded-full border border-gray-400 h-8 w-8 flex items-center justify-center"
      title={`Row: ${row}, Column: ${col}`}
    >
      {row}
      {col}
    </div>
  );
};

export default Well;
