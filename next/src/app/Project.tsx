import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import {useState } from "react";
import { RepositoryOverview } from "@/components/RepositoryOverview";
import { MultiSelect } from "@/components/multi-select";
import { RepoSearchInput } from "@/components/RepoSearchInput";
import { RepoCard } from "@/components/MinimizedRepositoryCard";
export default function Project(){
const {data, error, isLoading} = useSWR<Repository[]>('/api/repositories',(url : string) => fetcher(url,600));
const [searchQuery, setSearchQuery] = useState('');
const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
const filteredRepo = data?.filter(repo =>
  // match topics
  selectedTopics.every(topic => repo.topics.includes(topic)) &&
  selectedLanguages.every(language =>
  repo.languages?.some(l => l.name === language)) &&
  // match name (case insensitive)
  repo.name.toLowerCase().includes(searchQuery.toLowerCase())
)

const topicCount: Record<string, number> = {};
const languageCount: Record<string, number> = {};
// filter by topics
filteredRepo?.forEach(repo => {
  repo.topics.forEach(topic => {
    topicCount[topic] = (topicCount[topic] || 0) + 1;
  });
  repo.languages?.forEach(language => {
    languageCount[language.name] = (languageCount[language.name] || 0) + 1;
  })
});
// 2. Create unique topic options with count
const topicOptions = Object.keys(topicCount).map(topic => ({
  value: topic,
  label: `${topic} (${topicCount[topic]})`
}));

// filter by languages
// 2. Create unique language options with count
const languageOptions = Object.keys(languageCount).map(language => ({
  value: language,
  label: `${language} (${languageCount[language]})`
}));

  if (isLoading) return <div className="text-center p-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">
        Failed to load repositories
      </div>
    );
  if (!data) return null;
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
	<RepoSearchInput value={searchQuery} onValueChange={setSearchQuery}/>
	<MultiSelect 
		options={topicOptions} 
		onValueChange={setSelectedTopics} 
		defaultValue={[]}
		placeholder="Filter by topics"
		className="relative w-full bg-white dark:bg-gray-800"
		/>
	<MultiSelect 
		options={languageOptions} 
		onValueChange={setSelectedLanguages} 
		defaultValue={[]}
		placeholder="Filter by languages"
		className="relative w-full bg-white dark:bg-gray-800"
		/>
	<div className="flex justify-self-end">
		<span className="text-sm text-gray-500">result : {filteredRepo?.length || 0}</span>
	</div>
	{filteredRepo?.map((repo) => (
		<RepoCard key={repo.id} repo={repo}/>	
	))}

      </div>
    </section>
)};
