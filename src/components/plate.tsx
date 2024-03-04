import React from "react";
import type { WellType } from "@/pages/dash";

interface PlateProps {
  wells: WellType[];
  rows: number;
  cols: number;
  handleDeleteWell: (wellId: string) => void;
  handleWellClick: (well: WellType) => void;
}

const generateEmptyWell = (row: string, col: number): WellType => {
  return {
    id: "",
    plate_id: "",
    comp_id: "",
    row,
    col,
    reagent: "",
    antibody: "",
    concentration: -1,
  };
};

const Plate: React.FC<PlateProps> = ({
  wells,
  rows,
  cols,
  handleDeleteWell,
  handleWellClick,
}) => {
  const rowLabels = Array.from({ length: rows }, (_, index) =>
    String.fromCharCode(65 + index)
  );

  const columnLabels = Array.from({ length: cols }, (_, index) => index + 1);

  const renderWell = (row: string, colIndex: number) => {
    const wellData = wells.find(
      (well) => well.row === row && well.col === colIndex + 1
    );
    return (
      <div
        key={`${row}${colIndex}`}
        style={{
          width: "30px",
          height: "30px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {wellData ? (
          <button
            onClick={() => handleWellClick(wellData)}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "blue",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
              padding: "0",
            }}
          />
        ) : (
          <button
            onClick={() => handleWellClick(generateEmptyWell(row, colIndex))}
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: "transparent",
              border: "1px solid #ccc",
            }}
          />
        )}
      </div>
    );
  };

  const renderPlateGrid = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div style={{ width: "30px" }} />{" "}
          {columnLabels.map((colLabel) => (
            <div key={colLabel} style={{ width: "30px", textAlign: "center" }}>
              {colLabel}
            </div>
          ))}
        </div>
        {rowLabels.map((rowLabel, rowIndex) => (
          <div key={rowLabel} style={{ display: "flex" }}>
            <div style={{ width: "30px", textAlign: "center" }}>{rowLabel}</div>
            {columnLabels.map((_, colIndex) => renderWell(rowLabel, colIndex))}
          </div>
        ))}
      </div>
    );
  };

  return <div className="plateHolder">{renderPlateGrid()}</div>;
};

export default Plate;
