import { gql } from "apollo-server"; // import for 'gql' template literal for GraphQL schema in string format

// export schema so it can be used by Apollo server setup later
export const typeDefs = gql`
  type LatestRelease {
    tagName: String
    publishedAt: String
    body: String
  }

  type Repository {
    id: Int!
    owner: String!
    name: String!
    createdAt: String!
    latestRelease: LatestRelease
  }

  type Query {
    getRepositories: [Repository!]!
  }

  type Mutation {
    addRepository(owner: String!, name: String!): Repository!
    deleteRepository(id: Int!): Boolean!
  }
`;
