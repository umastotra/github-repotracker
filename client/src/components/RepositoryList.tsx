import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_REPOSITORY } from "../graphql";
import { Repository } from "../types/Repository";

// interface Repository {
//   id: string;
//   name: string;
//   createdAt: string;
//   latestRelease?: {
//     tagName: string;
//     publishedAt: string;
//   };
// }

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
  const [deleteRepo] = useMutation(DELETE_REPOSITORY, {
    refetchQueries: ["GetRepositories"],
  });

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this repo?")) {
      deleteRepo({ variables: { id } });
    }
  };
  return (
    <div className="w-1/2 p-6 overflow-hidden border border-gray-300 rounded bg-white">
      <h2 className="text-xl font-semibold mb-4 border-b pb-2">Repositories</h2>
      <div className="space-y-2">
        {repositories.map((repo) => (
          <div
            key={repo.id}
            onClick={() => onSelect(repo)}
            className={`cursor-pointer p-3 rounded flex items-center justify-between transition-all duration-200 ${
              selectedRepo?.name === repo.name && selectedRepo?.id == repo.id
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
            <button
              onClick={() => handleDelete(Number(repo.id))}
              className="text-red-500 hover:underline text-sm"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
