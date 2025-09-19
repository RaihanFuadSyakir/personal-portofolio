import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, YAxis, XAxis, Tooltip } from "recharts";
export default function RepositoryDetail({ repo }: { repo: Repository }) {
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
	</>
)};
