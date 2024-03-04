import React from "react";
import Well from "./well";
import type { WellType } from "@/pages/dash";

interface PlateProps {
  wells: WellType[];
  rows: string[];
  cols: number[];
}

const Plate: React.FC<PlateProps> = ({ wells, rows, cols }) => {
  return (
    <div className="grid grid-cols-12 gap-2">
      {rows.map((row) =>
        cols.map((col) => {
          const well = wells.find((w) => w.row === row && w.col === col);
          return well ? (
            <Well key={well.id} {...well} />
          ) : (
            <div key={`${row}${col}`} className="h-8 w-8"></div>
          );
        })
      )}
    </div>
  );
};

export default Plate;
