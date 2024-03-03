import { useRouter } from "next/router";
import Image from "next/image";
import landing from "../../../public/landing.svg";
import type { InferGetServerSidePropsType, GetServerSideProps, GetServerSidePropsContext } from "next";
import type { Experiment } from "@/pages/dash";
import Link from "next/link";

type Params = {id: string};

export const getServerSideProps: GetServerSideProps<{
  experiment: Experiment;
}> = async (context) => {
  const id = context.params?.id;

  const res = await fetch(`${process.env.URL}/api/exps/${id}`);
  const experiment: Experiment = await res.json();

  return {
    props: {
      experiment,
    },
  };
};

export default function Page({
  experiment,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="flex">
      <div className="w-70">
        <Image
          src={landing}
          alt="an illustration of doctors ig"
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
        />
      </div>
      <div className="w-30">
        <p>Name: {experiment.name}</p>
        <p>Size: {experiment.size}</p>
        <p>ID: {experiment.id} </p>
      </div>
    </div>
  );
}
