// This is GraphQL server code
// npm run dev will bring up server at http://localhost:4000/

import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
const { typeDefs } = require("./schema/typeDefs");
const { resolvers } = require("./resolvers/resolvers");

const prisma = new PrismaClient();

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
