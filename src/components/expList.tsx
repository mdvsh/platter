import { useEffect, useState } from "react";
import type { Experiment } from "@/pages/dash";
import Link from "next/link"; // Added import for Link from Next.js

const ExpList = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);

  const handleDelete = async (id: string) => {
    try {
      let prevExps = experiments;
      const response = await fetch(`/api/exps/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log(`Experiment with ID ${id} deleted successfully.`);
      } else {
        console.error(`Failed to delete experiment with ID ${id}.`);
      }
      setExperiments(prevExps => prevExps.filter(exp => exp.id !== id));
    } catch (error) {
      console.error('An error occurred while deleting the experiment:', error);
    }
  };

  useEffect(() => {
    const fetchExperiments = async () => {
      const response = await fetch("/api/exps");
      const data = await response.json();
      setExperiments(data);
    };

    fetchExperiments();
  }, []);

  return (
    <ul className="list-none">
      {experiments.map((experiment) => (
        <li key={experiment.id} className="border-b border-gray-200 py-2">
          <div className="flex justify-between" key={experiment.id}>
            <span>
              <Link href={`/exps/${experiment.id}`}>
                <b>{experiment.name}</b>
              </Link>{" "}
              w. {experiment.size} plates
            </span>
            <button
              className="text-red-500"
              onClick={() => handleDelete(experiment.id)}
            >
              delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ExpList;
