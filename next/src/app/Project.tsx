import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { ResponsiveContainer, BarChart, CartesianGrid, Bar, XAxis, YAxis, Tooltip } from "recharts";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { RepositoryOverview } from "@/components/RepositoryOverview";
export default function Project(){
const {data, error, isLoading} = useSWR<Repository[]>('/api/repositories',(url : string) => fetcher(url,0));
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

        {/* 🔹 Repo Info */}
        {repo && (
          <Card>
            <CardHeader>
              <CardTitle>{repo.name}</CardTitle>
              <p className="text-sm text-gray-500">
                {repo.description || "No description available"}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                <span className="font-semibold">Created:</span>{" "}
                {new Date(repo.created_at).toLocaleDateString()}
              </p>
              <p>
                <span className="font-semibold">Topics:</span>{" "}
                {repo.topics.length > 0 ? repo.topics.join(", ") : "None"}
              </p>
              <p>
                <span className="font-semibold">GitHub URL:</span>{" "}
                <a
                  href={repo.html_url}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  {repo.full_name}
                </a>
              </p>

              {/* Individual Repo Chart */}
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[{ name: repo.name, size: repo.size }]}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="size" fill="#10B981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
)};
