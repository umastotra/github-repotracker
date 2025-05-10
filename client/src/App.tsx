import { useQuery } from "@apollo/client"; // use React hook to run GraphQL queries
import { GET_REPOSITORIES } from "./graphql";

function App() {
  // Runs GET_REPOSITORIES query as soon as component loads
  const { data, loading, error } = useQuery(GET_REPOSITORIES);

  console.log("data", data);
  console.log("loading", data);
  console.log("error", data);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-600">Error: {error.message}</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tracked GitHub Repositories</h1>
      <ul className="space-y-4">
        {data.getRepositories.map((repo: any) => (
          <li key={repo.id} className="p-4 border rounded shadow-sm bg-white">
            <div className="text-lg font-semibold">
              {repo.owner}/{repo.name}
            </div>
            {repo.latestRelease ? (
              <div className="text-sm text-green-600">
                Latest Release: {repo.latestRelease.tagName}
                <br />
                Published:{" "}
                {new Date(repo.latestRelease.publishedAt).toLocaleDateString()}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No release found</div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
