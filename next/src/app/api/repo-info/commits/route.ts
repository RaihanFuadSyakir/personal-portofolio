import { githubFetcher, githubParseLinkHeader } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
	const encodedUrl = request.nextUrl.searchParams.get("url");
	const username = process.env.GITHUB_USERNAME;
	if(!encodedUrl) return new NextResponse("Missing url", { status: 400 });
	const url = decodeURIComponent(encodedUrl);
	const isInvalid = (username && !url.includes(username));
	if (isInvalid) {
	  return new NextResponse("Invalid url", { status: 400 })
	}
	const itemsPerPage = 30;
	const urlToSend = url + `?per_page=${itemsPerPage}`;
	const raw = await githubFetcher(urlToSend, {},600);
	const linkPagination = raw.headers.get("link");
	const json = await raw.json();
	let totalData = 0;
	if(linkPagination){
	  const links = githubParseLinkHeader(linkPagination);
	  const lastLink = new URL(links.last);
	  totalData = itemsPerPage * parseInt(lastLink.searchParams.get("page") || "1");
	} else {
		totalData = json.length;
	}

	if(raw.status === 404) return new NextResponse("Not found", { status: 404 });
	const data : Commit[] = json.map((commit: any) => ({
		sha: commit.sha,
		message: commit.commit.message,
		author: commit.commit.author,
		committer: commit.commit.committer,
		html_url: commit.html_url
	}));
	return Response.json({data, total_data : totalData});
}
