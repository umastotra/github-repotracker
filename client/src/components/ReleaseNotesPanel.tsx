import React from "react";
import DOMPurify from "dompurify";

interface ReleaseNotesPanelProps {
  selectedRepo: {
    name: string;
    latestRelease?: {
      body?: string;
    };
  } | null;
}

export function ReleaseNotesPanel({ selectedRepo }: ReleaseNotesPanelProps) {
  const cleanHTML = DOMPurify.sanitize(selectedRepo?.latestRelease?.body || "");
  return (
    <div className="w-1/2 p-6 overflow-auto border border-gray-300 rounded bg-white">
      <div className="p-6 min-h-full">
        <div className="border border-gray-300 rounded p-4 bg-white shadow-sm">
          <h2 className="text-lg font-bold mb-3 text-gray-800">
            Release Notes
          </h2>
          {selectedRepo?.latestRelease?.body ? (
            <pre className="whitespace-pre-wrap text-sm font-mono text-gray-700">
              {selectedRepo.latestRelease.body}
            </pre>
          ) : (
            <p className="text-sm text-gray-500 italic">
              No release notes available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
