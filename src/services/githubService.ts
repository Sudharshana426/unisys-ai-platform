import axios from 'axios';

// GitHub API base URL
const GITHUB_API_BASE_URL = 'https://api.github.com';

// Types for GitHub API responses
export interface GitHubUser {
  login: string;
  avatar_url: string;
  name: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  open_issues_count: number;
  default_branch: string;
}

export interface GitHubEvent {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
  };
  created_at: string;
  payload: any;
}

export interface GitHubContribution {
  date: string;
  count: number;
}

// GitHub service functions
export const githubService = {
  // Fetch user profile data
  fetchUserData: async (username: string): Promise<GitHubUser> => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching GitHub user data:', error);
      throw error;
    }
  },

  // Fetch user repositories
  fetchUserRepos: async (username: string): Promise<GitHubRepo[]> => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}/repos?sort=updated&per_page=10`);
      return response.data;
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      throw error;
    }
  },

  // Fetch user activity/events
  fetchUserActivity: async (username: string): Promise<GitHubEvent[]> => {
    try {
      const response = await axios.get(`${GITHUB_API_BASE_URL}/users/${username}/events?per_page=10`);
      return response.data;
    } catch (error) {
      console.error('Error fetching GitHub activity:', error);
      throw error;
    }
  },

  // Fetch user contributions (this is a simplified version as the actual GitHub API doesn't provide this directly)
  fetchUserContributions: async (username: string): Promise<GitHubContribution[]> => {
    // This is a placeholder. In a real implementation, you might need to use a different approach
    // or a third-party service to get contribution data
    try {
      // For now, we'll return mock data
      const today = new Date();
      const contributions: GitHubContribution[] = [];
      
      for (let i = 0; i < 365; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        contributions.push({
          date: date.toISOString().split('T')[0],
          count: Math.floor(Math.random() * 10)
        });
      }
      
      return contributions;
    } catch (error) {
      console.error('Error fetching GitHub contributions:', error);
      throw error;
    }
  }
}; 