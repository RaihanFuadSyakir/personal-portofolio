import { githubFetcher } from "@/lib/utils";

export async function GET(request: Request) {
	const githubUserUrl = "https://api.github.com/user";
	const raw = await githubFetcher(githubUserUrl, {}).then(res => res.json());
	const data: Profile = {
		username: raw.login,
		name: raw.name,
		avatar_url: raw.avatar_url,
		profile_url: raw.html_url,
		repos_url: raw.repos_url
	};
	return Response.json(data);
}
