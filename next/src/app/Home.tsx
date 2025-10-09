"use client";
import { useGoToPageSection } from "@/components/custom-hook/UseGoToPage";
import { Quote } from "lucide-react";

export default function Home() {
  const goToPageSection = useGoToPageSection();

  return (
    <section
      id="home"
      className="flex items-center justify-center bg-slate-100/70 dark:bg-slate-900/70 px-6 py-20 rounded-2xl transition-colors duration-300"
    >
      <div className="grid grid-cols-1 items-center gap-8 max-w-3xl text-center">
        {/* Quote Section */}
        <div className="space-y-4">
          <Quote className="mx-auto h-8 w-8 text-blue-600 dark:text-blue-400 opacity-70" />
          <p className="text-xl italic text-slate-700 dark:text-slate-200">
            “The Web does not just connect machines, it connects people.”
          </p>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            — Tim Berners-Lee
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="mt-10 flex justify-center gap-5">
          <a
            href="#project"
            onClick={goToPageSection}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg dark:bg-blue-500 dark:hover:bg-blue-400 transition-all duration-200"
          >
            View My Work
          </a>
          <a
            href="#about"
            onClick={goToPageSection}
            className="px-6 py-3 font-medium bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500 transition-all duration-200"
          >
            About Me
          </a>
        </div>
      </div>
    </section>
  );
}
