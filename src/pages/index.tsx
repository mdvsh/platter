import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/nav";
import Footer from "@/components/footer";
import Landing from "@/components/landing";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  return (
    // <main
    //   className={`flex flex-col items-center justify-between p-24 ${inter.className}`}
    // >
    <main>
      <Navbar />
      <Landing />
      <Footer />
    </main>
  );
}
