import { useRouter } from "next/router";
import Image from "next/image";
import landing from "../../../public/landing.svg";
import type {
  InferGetServerSidePropsType,
  GetServerSideProps,
  GetServerSidePropsContext,
} from "next";
import type { Experiment, WellType } from "@/pages/dash";
import Link from "next/link";
import { useState } from "react";

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
    col: "",
    reagent: "",
    antibody: "",
    concentration: "", // Assuming this will be a string input that gets parsed into a number
  });
  const [errorMessage, setErrorMessage] = useState("");

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
      // ONLY WHILE DEV.
      // if (newWell.antibody.length < 20 || newWell.antibody.length > 40) {
      setErrorMessage(
        "Antibody must be between 20 and 40 characters of A, T, G, or C."
      );
      return;
    }
    try {
      const response = await fetch(`/api/wells/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newWell),
      });
      console.log(JSON.stringify(newWell));
      if (response.ok) {
        // Handle success response
        console.log("Well added successfully!");
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

  return (
    <div className="flex">
      <div className="w-70">
        <p>f</p>
      </div>
      <div className="w-30">
        <p>
          <b>Name:</b>
          {data.experiment.name}
        </p>
        <p>
          <b>Size:</b>
          {data.experiment.size}
        </p>
        <hr />
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
              value={newWell.col}
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
              value={newWell.concentration}
              placeholder="Concentration"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              disabled={!newWell.antibody}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add Well
          </button>
        </form>
      </div>
      {errorMessage && (
        <span className="text-red-500 mb-4">{errorMessage}</span>
      )}{" "}
    </div>
  );
}
