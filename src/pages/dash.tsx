import ExpList from "@/components/expList";
import ExperimentModal from "@/components/newExpModal";

import { useState } from "react";
import { useRouter } from "next/router";

export interface Well {
  id: string;
  comp_id: string;
  row: string;
  col: number;
  reagent: string;
  antibody: string;
  concentration: number;
  plate_id: string;
}

export interface Experiment {
  id: string;
  name: string;
  size: number;
  wells: Well[];
}

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  const handleSuccessfulNewExp = (newExp: Experiment) => {
    setModalOpen(false);
    router.push(`/exps/${newExp.id}`)
  }

  return (
    <section className="text-gray-700 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Your Experiments
            </h1>
            <div className="h-1 w-20 bg-amber-500 rounded mb-6"></div>
          </div>
          <div className="lg:w-1/2 w-full leading-relaxed text-base">
            <div className="text-sm lg:text-base text-gray-800">
              There are two types of plates available for your experiments:
              <ul className="list-disc pl-5">
                <li>
                  <span className="font-semibold">Type A:</span> 384-well plates
                  (24 rows x 16 columns)
                </li>
                <li>
                  <span className="font-semibold">Type B:</span> 96-well plates
                  (12 rows x 8 columns)
                </li>
              </ul>{" "}
              <br />
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perspiciatis, tempore labore. Corrupti et animi error vel minus
              iste magni aperiam a architecto fugiat, ullam inventore doloremque
              debitis cum quod iusto.
            </div>
          </div>
        </div>
        <ExpList />
      </div>
    <div className="flex justify-center">
      <button
        onClick={() => setModalOpen(true)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded my-8">
        Create New Experiment
      </button>
      <ExperimentModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleSuccessfulNewExp} />
    </div>
    </section>
  );
};

export default Dashboard;
