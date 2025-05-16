import { gql } from "@apollo/client";

// GraphQL query so we can use it in App.tsx
export const GET_REPOSITORIES = gql`
  query GetRepositories {
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

export const ADD_REPOSITORY = gql`
  mutation AddRepository($owner: String!, $name: String!) {
    addRepository(owner: $owner, name: $name) {
      id
      name
      owner
      createdAt
    }
  }
`;

export const DELETE_REPOSITORY = gql`
  mutation DeleteRepository($id: Int!) {
    deleteRepository(id: $id)
  }
`;
