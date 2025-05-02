import axios from 'axios';

// GitHub API base URL
const GITHUB_API_BASE = 'https://api.github.com';

// Types for GitHub API responses
export interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
  private: boolean;
  html_url: string;
}

export interface GithubActivity {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  payload: any;
  created_at: string;
}

// GitHub service functions
export const fetchGithubUser = async (username: string): Promise<GithubUser> => {
  const response = await axios.get(`${GITHUB_API_BASE}/users/${username}`);
  return response.data;
};

export const fetchUserRepos = async (username: string): Promise<GithubRepo[]> => {
  const response = await axios.get(`${GITHUB_API_BASE}/users/${username}/repos?sort=updated&per_page=100`);
  return response.data;
};

export const fetchUserActivities = async (username: string): Promise<GithubActivity[]> => {
  const response = await axios.get(`${GITHUB_API_BASE}/users/${username}/events/public`);
  return response.data;
};

export const fetchUserContributions = async (username: string): Promise<any[]> => {
  // Note: GitHub doesn't have a direct API for contributions
  // You'll need to implement web scraping or use a third-party service
  // For now, returning mock data
  return [];
};

export const searchRepositories = async (query: string): Promise<GithubRepo[]> => {
  const response = await axios.get(`${GITHUB_API_BASE}/search/repositories?q=${query}`);
  return response.data.items;
}; 