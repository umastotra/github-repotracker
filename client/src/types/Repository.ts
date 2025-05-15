export type Repository = {
  id: string;
  name: string;
  owner: string;
  createdAt: string;
  latestRelease?: {
    tagName: string;
    publishedAt: string;
    body?: string;
  };
};
