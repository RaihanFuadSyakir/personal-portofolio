import { githubFetcher } from "@/lib/utils";
export async function GET() {
	const githubSearhUrl = "https://api.github.com/search/repositories?q=";
	const username = process.env.GITHUB_USERNAME;
	const query = encodeURIComponent(`user:${username} is:public topics:>0`);
	const githubFetchUrl = githubSearhUrl + query;
	const raw = await githubFetcher(githubFetchUrl, {},600).then(res => res.json());
	const data : Repository[]= raw.items.map((repo: Repository) => ({
		id: repo.id,
		node_id: repo.node_id,
		name: repo.name,
		size: repo.size,
		topics: repo.topics,
		full_name: repo.full_name,
		git_url: repo.git_url,
		html_url: repo.html_url,
		merges_url: repo.merges_url,
		commits_url: repo.commits_url,
		created_at: repo.created_at,
		description: repo.description,
		languages_url: repo.languages_url
	}));
	const dataWLang = await Promise.all(
		data.map(async repo => {
			const res : Record<string, number> = await githubFetcher(repo.languages_url, {}).then(res => res.json());
			return {
				...repo,
				languages: Object.entries(res).map(([name, size]) => ({ name, size }))
			};
		})
	)
	return Response.json(dataWLang);
}
