import { ApolloClient, InMemoryCache } from "@apollo/client";

// Set up the Apollo Client instance
export const client = new ApolloClient({
  uri: "http://localhost:4000", // Your GraphQL server address - connects frontend to GraphQL backend

  // store and reuse query results efficiently
  cache: new InMemoryCache(),
});
