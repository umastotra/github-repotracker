import React, { useEffect, useState } from "react"; // use React hook to run GraphQL queries
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "./graphql";
import { RepositoryList } from "./components/RepositoryList";
import { ReleaseNotesPanel } from "./components/ReleaseNotesPanel";

function App() {
  const { data, loading } = useQuery(GET_REPOSITORIES);
  const [selectedRepo, setSelectedRepo] = useState<any>(null);

  useEffect(() => {
    // Runs GET_REPOSITORIES query as soon as data if fetched
    if (data?.getRepositories?.length && !selectedRepo) {
      const sorted = [...data.getRepositories].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      // Auto select newest repository
      setSelectedRepo(sorted[0]);
    }
  }, [data, selectedRepo]);

  if (loading) return <p className="p-4">Loading repositories...</p>;

  const sortedRepos = [...data.getRepositories].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="h-screen flex flex-col">
      {/* Title Bar */}
      <div className="py-4 bg-white border-b text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          GitHub Repo Tracker
        </h1>
      </div>

      {/* Panels */}
      <div className="flex flex-1 gap-x-4 px-4 bg-gray-50">
        <RepositoryList
          repositories={sortedRepos}
          selectedRepo={selectedRepo}
          onSelect={setSelectedRepo}
        />
        <ReleaseNotesPanel selectedRepo={selectedRepo} />
      </div>
    </div>
  );
}

export default App;
