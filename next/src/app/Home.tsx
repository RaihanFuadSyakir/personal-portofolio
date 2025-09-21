"use client"
import { useGoToPageSection } from "@/components/custom-hook/UseGoToPage";
// Home.jsx
export default function Home({name} : {name : string | undefined}) {
const goToPageSection = useGoToPageSection();
  return (
    <section
      id="home"
      className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6 rounded-md"
    >
    <div className="grid grid-cols-1 items-center gap-4 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Hi, I&apos;m <span className="text-blue-600">{name}</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
          A passionate <span className="font-semibold">Web Developer</span> who loves building 
          clean, modern, and user-friendly applications.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <a
	    href="#project"
	    onClick={goToPageSection}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            View My Work
          </a>
          <a
	    href="#about"
	    onClick={goToPageSection}
            className="px-6 py-3 border border-gray-400 dark:border-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            About Me
          </a>
        </div>
      </div>

    </div>
    </section>
  );
}
