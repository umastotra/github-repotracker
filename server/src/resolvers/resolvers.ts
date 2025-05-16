import { PrismaClient } from "@prisma/client"; // import Prisma client to connect to PostgreSQL databaase
import { fetchLatestRelease } from "../services/octokit"; // import octokit to talk to GitHub API

const prisma = new PrismaClient();

// Create GraphQL resolvers object to map GraphQL queries and fields to actual functions that return data
export const resolvers = {
  Query: {
    getRepositories: async () => {
      // This fetches all repositories from repository table in PostgresQL
      return await prisma.repository.findMany();
    },
  },
  Repository: {
    // This is field leverl resolver for the release field inside each repository fetches release information for each repo
    // returns null if no release iss found
    latestRelease: async (repo: { owner: string; name: string }) => {
      return await fetchLatestRelease(repo.owner, repo.name);
    },
  },
  Mutation: {
    addRepository: async (_: any, args: { owner: string; name: string }) => {
      return await prisma.repository.create({
        data: {
          owner: args.owner,
          name: args.name,
        },
      });
    },
    deleteRepository: async (_: any, args: { id: number }) => {
      await prisma.repository.delete({
        where: {
          id: args.id,
        },
      });
      return true;
    },
  },
};
