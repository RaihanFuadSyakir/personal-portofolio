"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import RepositoryDetail from "./RepositoryDetail"
interface RepoCardProps {
  repo: Repository
}

export function RepoCard({ repo}: RepoCardProps) {
  return (
    <>
	<Dialog>
	  <DialogTrigger>
	   <Card
	      className={cn(
		"group relative w-full cursor-pointer transition-colors",
		"hover:bg-muted/70"
	      )}
	    >
	      {/* Hover overlay */}
	      <div
		className={cn(
		  "absolute inset-0 flex items-center justify-center",
		  "bg-black/40 text-white text-sm font-medium opacity-0 transition-opacity",
		  "group-hover:opacity-100"
		)}
	      >
		Click for detail
	      </div>

	      <CardHeader>
		<CardTitle>{repo.name}</CardTitle>
	      </CardHeader>
	      <CardContent className="grid grid-cols-8 gap-2">
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
		    className="bg-red-100 text-red-700 dark:bg-rose-900 dark:text-rose-300 m-1"
		    >
		      {lang.name}
		    </Badge>
		  ))
		) : (
		  "-"
		)}
		</div>
	      </CardContent>
	    </Card>
	  </DialogTrigger>
  	    <DialogOverlay>
		  <DialogContent className="overflow-y-auto max-h-[90vh]">
		    <DialogHeader>
		      <DialogTitle>Repository Detail</DialogTitle>
		    </DialogHeader>
		    <RepositoryDetail repo={repo}/>
		  </DialogContent>
	    </DialogOverlay>
	</Dialog>
    </>
  )
}
