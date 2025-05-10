// This is GraphQL server code
// npm run dev will bring up server at http://localhost:4000/

import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
const { typeDefs } = require("./schema/typeDefs");

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    repositories: async () => {
      // This fetches all repos from PostgreSQL
      return await prisma.repository.findMany();
    },
  },
  Mutation: {
    // This adds the repository to PostgreSQL
    // TBD - Not implemented yet but addd this
    addRepository: async (_: any, args: { owner: string; name: string }) => {
      return await prisma.repository.create({
        data: {
          owner: args.owner,
          name: args.name,
        },
      });
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
