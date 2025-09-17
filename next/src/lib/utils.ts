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
		"X-GitHub-Api-Version" : "2022-11-28"
	},
	...options,
	"next": {"revalidate": timeValidity},
});
