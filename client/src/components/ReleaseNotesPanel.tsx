interface ReleaseNotesPanelProps {
  selectedRepo: any;
}

export function ReleaseNotesPanel({ selectedRepo }: ReleaseNotesPanelProps) {
  if (!selectedRepo) {
    return (
      <div className="flex-1 p-6 text-gray-500 text-sm">
        Select a repository to view release notes.
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 overflow-auto border-l border-gray-300 bg-white">
      <h2 className="text-xl font-semibold mb-4">
        {selectedRepo.name} Release Notes
      </h2>
      {selectedRepo.latestRelease?.body ? (
        <pre className="whitespace-pre-wrap text-sm font-mono">
          {selectedRepo.latestRelease.body}
        </pre>
      ) : (
        <p className="text-gray-500 text-sm">No release notes available.</p>
      )}
    </div>
  );
}
