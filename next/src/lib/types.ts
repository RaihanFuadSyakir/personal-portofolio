interface Profile {
	username : string;
	name : string;
	avatar_url: string;
	profile_url: string;
	repos_url : string;
}
interface Repository {
	id : number;
	node_id : string;
	name : string;
	size : number;
	topics : string[];
	full_name : string;
	git_url : string;
	html_url : string;
	merges_url : string;
	commits_url : string;
	languages_url : string;
	created_at : string;
	description : string;
	languages? : {name : string, size : number}[];
}
interface GithubCommit {
  sha: string
  html_url: string
  commit: {
    message: string
    author: {
      name: string
      email: string
      date: string
    }
    committer: {
      name: string
      email: string
      date: string
    }
  }
}
interface Commit {
	sha : string;
	html_url : string;
	url : string;
	message : string;
	author : {
		name : string;
		email : string;
		date : string;
	};
	committer : {
		name : string;
		email : string;
		date : string;
	};
}
