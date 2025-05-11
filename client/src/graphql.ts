import { gql } from "@apollo/client";

// GraphQL query so we can use it in App.tsx
export const GET_REPOSITORIES = gql`
  query {
    getRepositories {
      id
      owner
      name
      createdAt
      latestRelease {
        tagName
        publishedAt
        body
      }
    }
  }
`;
