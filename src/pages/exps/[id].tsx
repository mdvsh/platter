import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { Experiment, WellType } from "@/pages/dash";
import { useState } from "react";

import Plate from "@/components/plate";

type FullExperiment = {
  experiment: Experiment;
  wells: WellType[];
};

export const getServerSideProps: GetServerSideProps<{
  data: FullExperiment;
}> = async (context) => {
  const id = context.params?.id;

  const res = await fetch(`${process.env.URL}/api/exps/${id}`);
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
};

export default function Page({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [newWell, setNewWell] = useState({
    plate_id: data.experiment.id,
    comp_id: "",
    row: "",
    col: -1,
    reagent: "",
    antibody: "",
    concentration: -1,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [wells, setWells] = useState(data.wells);
  const isEditing = newWell.comp_id;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let errorMessage = "";

    if (name === "reagent") {
      if (!/^([rR])(\d+)$/.test(value)) {
        errorMessage =
          "Reagent should start with 'r' or 'R' and have only numbers after it.";
      }
    }

    setNewWell((prevWell) => ({ ...prevWell, [name]: value.toUpperCase() }));
    setErrorMessage(errorMessage);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newWell.antibody.length > 40) {
      setErrorMessage(
        "Antibody must be between 20 and 40 characters of A, T, G, or C."
      );
      return;
    }

    if (Number(newWell.concentration) < 0) {
      setErrorMessage("Concentration must be greater than or equal to 0.");
      return;
    }

    if (!/^[A-Za-z]+$/.test(newWell.antibody)) {
      setErrorMessage("Antibody should only contain letters.");
      return;
    }

    if (!/^[A-Za-z]$/.test(newWell.row)) {
      setErrorMessage("Row should be alphabetical.");
      return;
    }

    if (!/^\d+$/.test(newWell.col.toString())) {
      setErrorMessage("Column should be numerical.");
      return;
    }

    const endpoint = isEditing
      ? `/api/wells/${newWell.comp_id}`
      : `/api/wells/create`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWell),
      });

      if (response.ok) {
        const newWellData = await response.json();
        if (isEditing) {
          setWells(
            wells.map((well) =>
              well.comp_id === newWellData.comp_id ? newWellData : well
            )
          );
        } else {
          setWells((prevWells) => [...prevWells, newWellData]);
        }
      } else {
        response
          .json()
          .then((data) => setErrorMessage(data.message + "\n" + data.error));
        console.error("Failed to add well.");
      }
    } catch (error) {
      console.error("Error adding well:", error);
    }
  };

  const handleDeleteWell = async (wellId: string) => {
    console.log("id: " + wellId);
    try {
      const response = await fetch(`/api/wells/${wellId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setWells((wells) => wells.filter((well) => well.comp_id !== wellId));
      } else {
        console.error("Failed to delete well.");
      }
    } catch (error) {
      console.error("Error deleting well:", error);
    }
  };

  const handleWellClick = (well: WellType) => {
    setNewWell({
      ...newWell,
      comp_id: well.comp_id,
      row: well.row,
      col: well.col,
      reagent: well.reagent,
      antibody: well.antibody,
      concentration: well.concentration,
    });
  };

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-2 py-12 mx-auto">
        <div className="flex flex-wrap w-full mb-20 justify-center">
          <div className="lg:w-3/5 w-full mb-6 lg:mb-0">
            {data.experiment && (
              <Plate
                wells={wells}
                rows={data.experiment.size == 96 ? 8 : 16}
                cols={data.experiment.size == 96 ? 12 : 24}
                handleDeleteWell={handleDeleteWell}
                handleWellClick={handleWellClick}
              />
            )}
          </div>
          <div className="lg:w-1/5 w-full leading-relaxed text-base">
            <p className="text-lg">
              <b>Name: </b>
              {data.experiment.name} <br />
              <b>Size: </b>
              {data.experiment.size} wells <br /> <br />
              <b>Well: </b>
            </p>
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
              <div className="mb-4">
                <input
                  type="text"
                  name="row"
                  onChange={handleInputChange}
                  value={newWell.row}
                  placeholder="Row (A, B, C, ...)"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="col"
                  onChange={handleInputChange}
                  value={newWell.col === -1 ? "" : newWell.col}
                  placeholder="Column (1, 2, 3, ...)"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="reagent"
                  onChange={handleInputChange}
                  value={newWell.reagent}
                  placeholder="Reagent"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="antibody"
                  onChange={handleInputChange}
                  value={newWell.antibody}
                  placeholder="Antibody"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="concentration"
                  onChange={handleInputChange}
                  value={
                    newWell.concentration === -1 ? "" : newWell.concentration
                  }
                  placeholder="Concentration"
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  disabled={!newWell.antibody}
                />
              </div>
              <div className="inline-flex rounded-lg">
                {newWell.comp_id ? (
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-2 rounded mx-4"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mx-4"
                  >
                    Create
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteWell(newWell.comp_id)}
                  className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-2 px-2 rounded mx-4"
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
          {errorMessage && (
            <span className="text-red-500 mb-4">{errorMessage}</span>
          )}{" "}
        </div>
      </div>
    </section>
  );
}
