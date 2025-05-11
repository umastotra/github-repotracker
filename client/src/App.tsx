import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client"; // use React hook to run GraphQL queries
import { GET_REPOSITORIES } from "./graphql";
import { ReleaseNotesPanel } from "./components/ReleaseNotesPanel";

function App() {
  // Runs GET_REPOSITORIES query as soon as component loads
  const { data, loading, error } = useQuery(GET_REPOSITORIES);
  const [selectedRepo, setSelectedRepo] = useState<any>(null); // Accepts full repo object

  console.log("data", data);
  console.log("loading", data);
  console.log("error", data);

  // auto select newest repo
  useEffect(() => {
    if (data?.getRepositories?.length && !selectedRepo) {
      const sorted = [...data.getRepositories].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setSelectedRepo(sorted[0]);
      console.group("auto selected:", sorted[0]);
    }
  }, [data, selectedRepo]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error.message}</p>;

  // Sort the respositories again for display
  const sortedRepos = [...data.getRepositories].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    // Use flex box and Use the h-screen utility to make an element span the entire height of the viewport
    <div className="flex h-screen flex-col">
      {/* Title on Top */}
      <div className="py-4 bg-white border-b text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          GitHub Repo Tracker (MVP)
        </h1>
      </div>

      {/* Horizontal layout to have repositories list on left and release notes on right  */}
      <div className="flex flex-1 overflow-hidden">
        {/* Repo List */}
        <div className="w-1/2 p-6 space-y-2 overflow-auto border-r">
          {sortedRepos.map((repo: any) => (
            <div
              key={repo.id}
              onClick={() => setSelectedRepo(repo)}
              className={`cursor-pointer p-3 border rounded hover:bg-gray-100 flex items-center justify-between transition-all duration-200 ${
                selectedRepo?.name === repo.name
                  ? "border-2 border-green-500"
                  : "border border-gray-300"
              }`}
            >
              {/* Display repository name */}
              <div className="text-base font-medium">{repo.name}</div>

              {/* Display corresponding version and published date */}
              {repo.latestRelease ? (
                <div className="ml-4 px-3 py-1 bg-green-50 border border-black rounded text-sm whitespace-nowrap">
                  {repo.latestRelease.tagName}{" "}
                  {new Date(repo.latestRelease.publishedAt)
                    .toISOString()
                    .slice(0, 10)}
                </div>
              ) : (
                <div className="ml-4 text-sm text-gray-400 italic">
                  No release
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Side panel with Release Notes for selected repo */}
        <ReleaseNotesPanel selectedRepo={selectedRepo} />
      </div>
    </div>
  );
}
export default App;
