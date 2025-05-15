import React from "react";

interface Repository {
  id: string;
  name: string;
  createdAt: string;
  latestRelease?: {
    tagName: string;
    publishedAt: string;
  };
}

interface Props {
  repositories: Repository[];
  selectedRepo: Repository | null;
  onSelect: (repo: Repository) => void;
}

export function RepositoryList({
  repositories,
  selectedRepo,
  onSelect,
}: Props) {
  return (
    <div className="w-1/2 p-6 overflow-hidden border border-gray-300 rounded bg-white">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Repositories</h2>
      <div className="space-y-2">
        {repositories.map((repo) => (
          <div
            key={repo.id}
            onClick={() => onSelect(repo)}
            className={`cursor-pointer p-3 rounded flex items-center justify-between transition-all duration-200 ${
              selectedRepo?.name === repo.name
                ? "border-2 border-green-600"
                : "border border-gray-300"
            }`}
          >
            <div className="text-base font-medium">{repo.name}</div>
            {repo.latestRelease ? (
              <div className="ml-4 px-3 py-1 bg-green-50 border border-green-300 rounded text-sm whitespace-nowrap">
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
    </div>
  );
}
