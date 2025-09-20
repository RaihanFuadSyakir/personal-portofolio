import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
export function CommitsCard({ commits }: { commits: Commit[] }) {
  return (
    <Card className="max-h-96 overflow-y-auto">
      <CardHeader>
        <CardTitle>Recent Commits ({commits.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {commits.map((commit) => (
            <li
              key={commit.sha}
              className="border-b border-gray-200 dark:border-gray-700 pb-2"
            >
              {/* Commit SHA + message */}
              <div className="flex items-center justify-between">
                <a
                  href={commit.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {commit.sha.slice(0, 7)}
                </a>
		<HoverCard>
                  <HoverCardTrigger asChild>
                    <span className="truncate max-w-xs cursor-pointer text-sm text-gray-700 dark:text-gray-300">
                      {commit.message}
                    </span>
                  </HoverCardTrigger>
                  <HoverCardContent className="max-w-md text-sm">
                    {commit.message}
                  </HoverCardContent>
                </HoverCard>
              </div>

              {/* Author + Committer */}
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 space-y-1">
                <p>
                  <span className="font-medium">Author:</span>{" "}
                  {commit.author.name} —{" "}
                  {new Date(commit.author.date).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium">Committer:</span>{" "}
                  {commit.committer.name} —{" "}
                  {new Date(commit.committer.date).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
