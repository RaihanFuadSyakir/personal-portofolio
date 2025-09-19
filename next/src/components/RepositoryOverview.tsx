import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1", "#14B8A6", "#8B5CF6"];

export function RepositoryOverview({ data }: { data: Repository[] }) {
  if (!data) return null;

  // 📊 Summary
  const repoCount = data.length;
  const totalSize = data.reduce((sum, repo) => sum + repo.size, 0);
  console.log(totalSize);
  const avgSize = repoCount > 0 ? Math.round(totalSize / repoCount) : 0;

  // 📊 Aggregate languages
  const languageMap: Record<string, number> = {};
  data.forEach(repo => {
    repo.languages?.forEach(lang => {
      languageMap[lang.name] = (languageMap[lang.name] || 0) + lang.size;
    });
  });
  const languageSizeTotal = Object.values(languageMap).reduce((sum, size) => sum + size, 0);
  const languages = Object.entries(languageMap).map(([name, size]) => ({
    name,
    size,
    percent: Number(((size / languageSizeTotal) * 100).toFixed(2)),
  }));
  return (
    <Card>
      <CardHeader>
        <CardTitle>Repository Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-gray-500">Total Repos</p>
            <p className="text-xl font-bold">{repoCount}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Total Size (KB)</p>
            <p className="text-xl font-bold">{totalSize}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg Repo Size (KB)</p>
            <p className="text-xl font-bold">{avgSize}</p>
          </div>
        </div>

        {/* Donut Chart for Languages */}
        {languages.length > 0 && (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languages}
                  dataKey="percent"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                  label
                >
                  {languages.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`}/>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <p className="mt-2 text-center text-sm text-gray-500">
              Language usage distribution across all repositories
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
