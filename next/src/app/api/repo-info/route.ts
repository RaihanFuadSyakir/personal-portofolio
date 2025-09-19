import { githubFetcher } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
	const encodedUrl = request.nextUrl.searchParams.get("url");
	const username = process.env.GITHUB_USERNAME;
	const isInvalid =
	  !encodedUrl || (username && !encodedUrl.includes(username))
	if (isInvalid) {
	  return new NextResponse("Invalid url", { status: 400 })
	}
	const url = decodeURIComponent(encodedUrl);
	const data = await githubFetcher(url, {}).then(res => res.json());
	return Response.json(data);
}
