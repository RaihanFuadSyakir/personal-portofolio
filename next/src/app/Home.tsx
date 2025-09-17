"use client"
import { useGoToPageSection } from "@/components/custom-hook/UseGoToPage";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// Home.jsx
export default function Home() {
const goToPageSection = useGoToPageSection();
const { data, error, isLoading } = useSWR<Profile>('/api/profile',(url) => fetcher(url,0));
  return (
    <section
      id="home"
      className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-6"
    >
    <div className="grid sm:grid-cols-2 grid-cols-1 items-center gap-4">
    <div className="flex justify-center">
	    <Avatar className="sm:w-full w-64 h-auto">
		    <AvatarImage src={data?.avatar_url} />
		    <AvatarFallback>CN</AvatarFallback>
	    </Avatar>
    </div>

      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Hi, I'm <span className="text-blue-600">{data?.name}</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-700 dark:text-gray-300">
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
