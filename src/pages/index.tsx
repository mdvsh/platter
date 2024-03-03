import Image from "next/image";
import landing from "../../public/landing.svg";

export default function Home() {
  return (
    <section className="text-gray-700 body-font">
      <div className="container mx-auto flex flex-col px-5 py-10 justify-center items-center">
        <Image
          src={landing}
          alt="an illustration of doctors ig"
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
        />
        <div className="w-full md:w-2/3 flex flex-col mb-16 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
            Never miss an <i>assay</i> experimental insight
          </h1>
          <p className="mb-8 leading-relaxed">
            so assay! much plates. Dont give me amino acids please...Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Ut dicta, voluptates,
            incidunt voluptatum debitis adipisci quaerat minima repellat magni
            reprehenderit obcaecati voluptate eveniet officiis nam saepe esse
            eius. Laudantium, magnam.
            <br />
          </p>
          <p className="text-sm mt-2 text-gray-500 mb-8 w-full">
            Your data remains untouched. (or something reassuring like that in a
            compbio setting.)
          </p>
        </div>
      </div>
    </section>
  );
}
