"use client";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header.tsx"
import { useRef, useState } from "react";

export default function Home() {
  // store the file input DOM element
  const fileInputRef = useRef(null);

  // create state to store the file after selection
  const [selectedFile, setSelectedFile] = useState(null);

  // file selection button
  const handleClick = () => {
    // trigger the hidden file input
    fileInputRef.current.click();
  };

  // triggered when a file is selected
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
    }
  };

  // file upload button
  // handles upload logic and POST to backend
  const handleUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }

    // convert the file to Pisayian database format
    // TODO
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-gradient-to-b from-yellow-50 to-red-50">
      <div className="fixed top-0 items-center justify-center">
       <Link href="https://www.pisayian.org/" target="_blank" rel="noopener noreferrer">
         <Image
            className="dark:invert justify-items-center"
            src="/pisayian_logo.png"
            alt="Pisayian logo"
            width={200}
            height={50}
            priority
          />
       </Link>
      </div>

      <main className="flex flex-col gap-[32px] row-start-2 text-center items-center sm:items-center">
          <h1 className="text-3xl font-bold text-center text-blue-600">
            Pisayian CSV Converter
          </h1>
          <h1 className="text-xl text-center">
            Convert SPECTRA .csv file to Pisayian database .csv file
          </h1>
        <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
        <div className="border border-black/[0.1] dashed rounded-md w-6/4 h-35 items-center justify-center flex">
        <p className="m-4">
          Drag and drop your file or  
        <button className="ml-3 px-4 py-1 transition-colors border border-solid border-black/[0.2]  text-black rounded-full hover:bg-[#f2f2f2] hover:border-black/[0.0]" onClick={handleClick}>
              Pick a file
        </button>
        </p>
        {selectedFile && (
            <p>Selected: {selectedFile.name}</p> 
        )}
        </div>
 
        <button className="flex ml-3 px-4 py-1 transition-colors border border-solid border-black/[0.2]  text-black rounded-full hover:bg-[#f2f2f2] hover:border-black/[0.0]" onClick={handleUpload}> 
            Upload
        </button>
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
