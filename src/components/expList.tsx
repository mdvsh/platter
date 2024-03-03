import { useEffect, useState } from "react";

interface Experiment {
  id: number;
  name: string;
  size: number;
}

const ExpList = () => {
  const [experiments, setExperiments] = useState<Experiment[]>([]);

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
              <b>{experiment.name}</b> w. {experiment.size} plates
            </span>
            <button
              className="text-red-500"
              // onClick={() => handleDelete(experiment.id)}
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
