"use client";
import Home from "./Home";
import About from "./About";
import Project from "./Project";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
export default function Page() {
  const { data } = useSWR<Profile>("/api/profile", (url: string) =>
    fetcher(url, 0),
  );
  return (
    <div className="mt-24 grid grid-cols-1 gap-4">
      <Home />
      <About avatarUrl={data?.avatar_url} name={data?.name} />
      <Project />
    </div>
  );
}
