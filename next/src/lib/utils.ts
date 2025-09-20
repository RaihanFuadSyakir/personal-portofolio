import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const fetcher = (url : string,timeValidity : number = 3600) => fetch(url,
		 {"next": {"revalidate": timeValidity}})
		.then(res => res.json());
export const githubFetcher = (url : string,options : object,timeValidity : number = 3600) => fetch(url, {
	'headers': {
		'Authorization': `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
		"X-GitHub-Api-Version" : "2022-11-28",
		"Accept": "application/vnd.github+json"
	},
	...options,
	"next": {"revalidate": timeValidity},
});
export function githubParseLinkHeader(header: string): Record<string, string> {
  return Object.fromEntries(
    header
      .split(",")
      .map(part => {
        const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
        return match ? [match[2], match[1]] as const : null;
      })
      .filter((entry): entry is readonly [string, string] => entry !== null)
  );
}
const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444", "#6366F1"];
export function getColorForString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash); // simple hash
  }
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
}
