import { Octokit } from "@octokit/rest";

// TBD authentication
// Auth not needed for MVP
export const octokit = new Octokit();

// https://octokit.github.io/rest.js/v20/#repos-get-latest-release
// https://docs.github.com/en/rest/releases/releases?apiVersion=2022-11-28#get-the-latest-release
// This fetches release info for the hard coded repo
export async function fetchLatestRelease(owner: string, repo: string) {
  try {
    const res = await octokit.repos.getLatestRelease({ owner, repo });
    return {
      // This is from the octokit gitHub API result
      tagName: res.data.tag_name,
      publishedAt: res.data.published_at,
      body: res.data.body || "No Release notes available",
    };
  } catch (err: any) {
    // scenario where no release found return null
    if (err.status === 404) return null;
    // re-raise error
    throw err;
  }
}
