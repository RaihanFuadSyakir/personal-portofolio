import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { ResponsiveContainer, BarChart, CartesianGrid, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { RepositoryOverview } from "@/components/RepositoryOverview";
import RepositoryDetail from "@/components/RepositoryDetail";
export default function Project(){
const {data, error, isLoading} = useSWR<Repository[]>('/api/repositories',(url : string) => fetcher(url,600));
const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
const [allLanguages, setAllLanguages] = useState<{ name: string; size: number }[]>([]);
useEffect(() => {
  if(!data) return;
  const languages = data.reduce((acc, repo) => {
    if (repo.languages) {
      acc.push(...repo.languages);
    }
    return acc;
  }, [] as { name: string; size: number }[]);
  setAllLanguages(languages);
},[data]);
  if (isLoading) return <div className="text-center p-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">
        Failed to load repositories
      </div>
    );
  if (!data) return null;
const repo = data.find((r) => r.name === selectedRepo);
return(
  <section
      id="project"
      className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-6 py-12 rounded-md"
    >
      <div className="grid grid-cols-1 items-center gap-6 p-4 max-w-5xl w-full">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Projects
          </h1>
        </div>

	<RepositoryOverview data={data} />
        {/* 🔹 Dropdown */}
        <Select onValueChange={setSelectedRepo}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a repository" />
          </SelectTrigger>
          <SelectContent>
            {data.map((repo) => (
              <SelectItem key={repo.id} value={repo.name}>
                {repo.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
	{repo && <RepositoryDetail repo={repo} />}

      </div>
    </section>
)};
