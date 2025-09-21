import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { useEffect, useState } from "react";
import { RepositoryOverview } from "@/components/RepositoryOverview";
import RepositoryDetail from "@/components/RepositoryDetail";
import { MultiSelect } from "@/components/multi-select";
import { RepoSearchInput } from "@/components/RepoSearchInput";
import { RepoCard } from "@/components/MinimizedRepositoryCard";
export default function Project(){
const {data, error, isLoading} = useSWR<Repository[]>('/api/repositories',(url : string) => fetcher(url,600));
const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
const [searchQuery, setSearchQuery] = useState('');
const [allLanguages, setAllLanguages] = useState<{ name: string; size: number }[]>([]);
const allTopics = Array.from(new Set(data?.flatMap(repo => repo.topics)));
const topicOptions = allTopics.map(topic => ({ label: topic, value: topic }));
const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
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
const filteredRepo = data.filter(repo =>
  // match topics
  selectedTopics.every(topic => repo.topics.includes(topic)) &&
  // match name (case insensitive)
  repo.name.toLowerCase().includes(searchQuery.toLowerCase())
)
function onSelectRepo(id:number){
	console.log(id);
}
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
	<MultiSelect options={topicOptions} onValueChange={setSelectedTopics} defaultValue={[]}/>
	<RepoSearchInput value={searchQuery} onValueChange={setSearchQuery}/>
	{filteredRepo.map((repo) => (
		<RepoCard key={repo.id} repo={repo} onClick={onSelectRepo} />	
	))}
	{repo && <RepositoryDetail repo={repo} />}

      </div>
    </section>
)};
