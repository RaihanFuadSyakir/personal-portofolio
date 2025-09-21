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
	      <CardContent className="flex flex-wrap gap-2">
		{repo.topics.length > 0 ? (
		  repo.topics.map((topic) => (
		    <Badge key={topic} variant="secondary">
		      {topic}
		    </Badge>
		  ))
		) : (
		  <span className="text-sm text-muted-foreground">No topics</span>
		)}
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
