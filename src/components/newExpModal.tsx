import type { Experiment } from "@/pages/dash";
import { useState } from "react";

function ExperimentModal({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: Experiment) => void;
}) {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/exps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, size: parseInt(size) }),
    });
    console.log(response.body);
    if (response.ok) {
      const newExperiment = await response.json();
      onSuccess(newExperiment);
    } else {
      console.error("Experiment creation failed");
      response.json().then(data => setErrorMessage(data.message));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-md max-w-md w-full mx-2 md:mx-0">
        <div className="flex justify-between items-center border-b px-5 py-3">
          <h3 className="text-lg font-medium text-gray-900">
            Create New Experiment
          </h3>
          <button onClick={onClose}>
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="px-5 py-4">
          <input
            type="text"
            placeholder="Experiment Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="96">96</option>
            <option value="384">384</option>
          </select>
          {errorMessage && (
            <div className="text-red-500 mb-4">{errorMessage}</div>
          )}{" "}
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-5 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg"
            >
              Create
            </button>
            <button
              onClick={onClose}
              type="button"
              className="px-5 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-4 focus:outline-none focus:ring-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ExperimentModal;
