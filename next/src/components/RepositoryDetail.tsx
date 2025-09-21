"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetcher, getColorForString } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useEffect } from "react";
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip } from "recharts";
import useSWR from "swr";
import { CommitsCard } from "./CommitsCard";
export default function RepositoryDetail({ repo }: { repo: Repository }) {
	const commitList = useSWR<{data: Commit[], total_data: number}>(`/api/repo-info/commits?url=${encodeURIComponent(repo.commits_url.replace("{/sha}",""))}`,
				  (url : string) => fetcher(url,600));
	return (
	<>
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
	        <span className="font-semibold">Size:</span>{" "}
		{repo.size > 1000000 ? repo.size / 1000000 : repo.size / 1000}{repo.size > 1000000 ? "MB" : "KB"}
	      </p>
	      <p>
	        <span className="font-semibold">Total Commits:</span>{" "}
		{commitList.data?.total_data || 0}
	      </p>
	      <div className="grid grid-cols-8 gap-2">
		<div className="col-span-2">
			<p className="text-sm flex justify-between font-semibold">
			<span>Topics</span>
			<span>:</span>
			</p>{" "}
		</div>
		<div className="col-span-6 flex flex-wrap">
		{repo.topics.length > 0 ? (
		  repo.topics.map((topic) => (
		    <Badge
		    key={topic}
		    variant="outline"
		    className="bg-blue-100 text-blue-700 dark:bg-sky-900 dark:text-sky-300 m-1"
		    >
		      {topic}
		    </Badge>
		  ))
		) : (
		  "-"
		)}
		</div>
		<div className="col-span-2">
			<p className="text-sm flex justify-between font-semibold">
			<span>Languages</span>
			<span>:</span>
			</p>{" "}
		</div>
		<div className="col-span-6 flex flex-wrap">
		{repo.languages?.length || 0 > 0 ? (
		  repo.languages?.map((lang) => (
		    <Badge
		    key={lang.name}
		    variant="outline"
		    className="bg-red-100 text-red-700 dark:bg-sky-900 dark:text-sky-300 m-1"
		    >
		      {lang.name}
		    </Badge>
		  ))
		) : (
		  "-"
		)}
		</div>

	      </div>
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
	      {commitList.isLoading ? <div className="h-10 w-40 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div> : 
		      <CommitsCard commits={commitList.data?.data || []} />
	      }
            </CardContent>
          </Card>
        )}
	</>
)};
