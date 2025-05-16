import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_REPOSITORY, GET_REPOSITORIES } from "../graphql";

export const AddRepositoryForm = () => {
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");

  const [addRepository, { loading, error }] = useMutation(ADD_REPOSITORY, {
    refetchQueries: [GET_REPOSITORIES],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!owner || !name) return;

    try {
      await addRepository({ variables: { owner, name } });
      setOwner("");
      setName("");
    } catch (err) {
      console.error("Failed to add repository", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-1/2 mb-4 space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <input
          type="text"
          placeholder="Repository Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-1/2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-sm">Failed to add repository.</p>
      )}
    </form>
  );
};
