import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { useState } from "react";
import { RepositoryOverview } from "@/components/RepositoryOverview";
import { MultiSelect } from "@/components/multi-select";
import { RepoSearchInput } from "@/components/RepoSearchInput";
import { RepoCard } from "@/components/MinimizedRepositoryCard";
export default function Project() {
  const { data, error, isLoading } = useSWR<Repository[]>(
    "/api/repositories",
    (url: string) => fetcher(url, 600),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [sortField, setSortField] = useState<"created_at" | "updated_at">(
    "created_at",
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const filteredAndSortedRepo = (data || [])
    .filter(
      (repo) =>
        selectedTopics.every((topic) => repo.topics.includes(topic)) &&
        selectedLanguages.every((language) =>
          repo.languages?.some((l) => l.name === language),
        ) &&
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .sort((a, b) => {
      const aValue = a[sortField]; // ✅ TypeScript knows this is valid
      const bValue = b[sortField];

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const topicCount: Record<string, number> = {};
  const languageCount: Record<string, number> = {};
  // filter by topics
  filteredAndSortedRepo?.forEach((repo) => {
    repo.topics.forEach((topic) => {
      topicCount[topic] = (topicCount[topic] || 0) + 1;
    });
    repo.languages?.forEach((language) => {
      languageCount[language.name] = (languageCount[language.name] || 0) + 1;
    });
  });
  // 2. Create unique topic options with count
  const topicOptions = Object.keys(topicCount).map((topic) => ({
    value: topic,
    label: `${topic} (${topicCount[topic]})`,
  }));

  // filter by languages
  // 2. Create unique language options with count
  const languageOptions = Object.keys(languageCount).map((language) => ({
    value: language,
    label: `${language} (${languageCount[language]})`,
  }));

  if (isLoading) return <div className="text-center p-8">Loading...</div>;
  if (error)
    return (
      <div className="text-center p-8 text-red-500">
        Failed to load repositories
      </div>
    );
  if (!data) return null;
  return (
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
        <RepoSearchInput value={searchQuery} onValueChange={setSearchQuery} />
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
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-md">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Sort by:
            </span>

            <select
              value={sortField}
              onChange={(e) =>
                setSortField(e.target.value as "created_at" | "updated_at")
              }
              className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            >
              <option value="created_at">Created At</option>
              <option value="updated_at">Updated At</option>
            </select>

            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
              className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>

          <div className="text-sm text-gray-500">
            Result: {filteredAndSortedRepo?.length}
          </div>
        </div>
        {filteredAndSortedRepo?.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}
