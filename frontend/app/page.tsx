import Image from "next/image";
import Header from "../components/header.tsx"

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-white">
      <div className="fixed top-0 items-center justify-center">
       <Image
          className="dark:invert justify-items-center"
          src="/pisayian_logo.png"
          alt="Pisayian logo"
          width={200}
          height={50}
          priority
        />
      </div>

      <main className="flex flex-col gap-[32px] row-start-2 text-center items-center sm:items-center">
          <h1 className="text-3xl font-bold text-center text-blue-600">
            Pisayian CSV Converter
          </h1>
          <h1 className="text-xl text-center">
            Convert SPECTRA .csv file to Pisayian database .csv file
          </h1>
        <div className="border border-black/[0.1] dashed rounded-md w-6/4 h-35 items-center justify-center flex">
        <p className="m-4">
          Drag and drop your file or  
        <button className="ml-3 px-4 py-1 transition-colors border border-solid border-black/[0.2]  text-black rounded-full hover:bg-[#f2f2f2] hover:border-black/[0.0]">
            Upload
        </button>
        </p>
        </div>
     </main>

      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p
          className="flex items-center gap-2 text-sm"
        >
          Developed during Kapwa Codefest
        </p>
        
      </footer>
    </div>
  );
}
