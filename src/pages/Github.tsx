<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code, Eye, GitBranch, GitCommit, GitFork, Github as GithubIcon, GitPullRequest, Star, Users, AlertCircle, Loader2 } from "lucide-react";
import { githubService, GitHubUser, GitHubRepo, GitHubEvent, GitHubContribution } from '@/services/githubService';
import GitHubCalendar from 'react-github-calendar';
import { format, formatDistanceToNow } from 'date-fns';

// Language colors mapping
const languageColors: Record<string, string> = {
  Python: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  TypeScript: "bg-blue-600",
  Java: "bg-orange-600",
  "C++": "bg-purple-500",
  "C#": "bg-green-600",
  HTML: "bg-red-500",
  CSS: "bg-blue-400",
  Ruby: "bg-red-600",
  Go: "bg-cyan-500",
  Rust: "bg-orange-700",
  PHP: "bg-purple-600",
  Swift: "bg-orange-500",
  Kotlin: "bg-purple-700",
  Scala: "bg-red-700",
  R: "bg-blue-700",
  Shell: "bg-gray-500",
  "Objective-C": "bg-blue-800",
  Vue: "bg-green-500",
  React: "bg-blue-400",
  Angular: "bg-red-500",
  Svelte: "bg-orange-500",
  "": "bg-gray-400" // For repositories with no language
};

// Event type icons mapping
const eventTypeIcons: Record<string, React.ReactNode> = {
  PushEvent: <GitCommit className="h-5 w-5" />,
  IssuesEvent: <Code className="h-5 w-5" />,
  PullRequestEvent: <GitPullRequest className="h-5 w-5" />,
  WatchEvent: <Star className="h-5 w-5" />,
  ForkEvent: <GitFork className="h-5 w-5" />,
  CreateEvent: <GitBranch className="h-5 w-5" />,
  DeleteEvent: <GitBranch className="h-5 w-5" />,
  default: <Code className="h-5 w-5" />
};

const GithubPage = () => {
  // State for GitHub data
  const [username, setUsername] = useState<string>("");
  const [userData, setUserData] = useState<GitHubUser | null>(null);
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [activities, setActivities] = useState<GitHubEvent[]>([]);
  const [contributions, setContributions] = useState<GitHubContribution[]>([]);
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("projects");

  // Fetch GitHub data
  const fetchGitHubData = async (username: string) => {
    if (!username) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch user data
      const user = await githubService.fetchUserData(username);
      setUserData(user);
      
      // Fetch repositories
      const repos = await githubService.fetchUserRepos(username);
      setRepositories(repos);
      
      // Fetch activities
      const events = await githubService.fetchUserActivity(username);
      setActivities(events);
      
      // Fetch contributions
      const contribs = await githubService.fetchUserContributions(username);
      setContributions(contribs);
    } catch (err) {
      console.error("Error fetching GitHub data:", err);
      setError("Failed to fetch GitHub data. Please check the username and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      fetchGitHubData(username.trim());
    }
  };

  // Format date to relative time
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return dateString;
    }
  };

  // Get event message based on event type
  const getEventMessage = (event: GitHubEvent) => {
    switch (event.type) {
      case 'PushEvent':
        return `Pushed to ${event.repo.name}`;
      case 'IssuesEvent':
        return `${event.payload.action} issue in ${event.repo.name}`;
      case 'PullRequestEvent':
        return `${event.payload.action} pull request in ${event.repo.name}`;
      case 'WatchEvent':
        return `Starred ${event.repo.name}`;
      case 'ForkEvent':
        return `Forked ${event.repo.name}`;
      case 'CreateEvent':
        return `Created ${event.payload.ref_type} in ${event.repo.name}`;
      case 'DeleteEvent':
        return `Deleted ${event.payload.ref_type} in ${event.repo.name}`;
      default:
        return `Interacted with ${event.repo.name}`;
    }
  };

  // Get event icon based on event type
  const getEventIcon = (eventType: string) => {
    return eventTypeIcons[eventType] || eventTypeIcons.default;
  };

=======

import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  AlertCircle, 
  Code, 
  ExternalLink, 
  Eye, 
  FileCode, 
  GitBranch, 
  Github as GithubIcon, 
  GitPullRequest, 
  History, 
  PlusCircle, 
  Search, 
  Star, 
  UsersRound 
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Github = () => {
  const [githubUsername, setGithubUsername] = useState("rahulsharma");
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [addRepoDialogOpen, setAddRepoDialogOpen] = useState(false);
  
  // Sample data - in a real app, this would come from GitHub API
  const repositories = [
    {
      id: 1,
      name: "ai-learning-assistant",
      description: "AI-powered learning assistant for personalized education",
      language: "Python",
      stars: 28,
      forks: 12,
      issues: 5,
      lastUpdated: "2023-09-15T10:30:00",
      isPrivate: false,
      url: "https://github.com/rahulsharma/ai-learning-assistant"
    },
    {
      id: 2,
      name: "smart-study-planner",
      description: "A study planning application with task organization and reminders",
      language: "JavaScript",
      stars: 46,
      forks: 23,
      issues: 3,
      lastUpdated: "2023-10-02T15:45:00",
      isPrivate: false,
      url: "https://github.com/rahulsharma/smart-study-planner"
    },
    {
      id: 3,
      name: "course-recommendation-system",
      description: "Machine learning based course recommendation system",
      language: "Python",
      stars: 35,
      forks: 17,
      issues: 8,
      lastUpdated: "2023-08-20T09:15:00",
      isPrivate: false,
      url: "https://github.com/rahulsharma/course-recommendation-system"
    },
    {
      id: 4,
      name: "college-event-manager",
      description: "Event management system for colleges and universities",
      language: "TypeScript",
      stars: 19,
      forks: 7,
      issues: 2,
      lastUpdated: "2023-10-10T11:20:00",
      isPrivate: true,
      url: "https://github.com/rahulsharma/college-event-manager"
    },
    {
      id: 5,
      name: "student-portfolio",
      description: "Dynamic portfolio website for students",
      language: "JavaScript",
      stars: 32,
      forks: 14,
      issues: 4,
      lastUpdated: "2023-09-28T16:40:00",
      isPrivate: false,
      url: "https://github.com/rahulsharma/student-portfolio"
    }
  ];
  
  const projects = [
    {
      id: 1,
      name: "E-Learning Platform",
      description: "A comprehensive e-learning platform with course management, student tracking, and interactive assignments",
      tech: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
      demoUrl: "https://demo.e-learning-platform.example.com",
      repoUrl: "https://github.com/rahulsharma/ai-learning-assistant",
      image: "https://images.unsplash.com/photo-1610484826967-09c5720778c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGUlMjBsZWFybmluZ3xlbnwwfHwwfHx8MA%3D%3D",
      lastUpdated: "2023-10-12T14:25:00"
    },
    {
      id: 2,
      name: "Smart Study Planner",
      description: "An application to help students organize their study schedules, track progress, and integrate with calendar apps",
      tech: ["React Native", "Firebase", "Redux", "Google Calendar API"],
      demoUrl: "https://play.google.com/store/apps/details?id=com.smartstudyplanner",
      repoUrl: "https://github.com/rahulsharma/smart-study-planner",
      image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3R1ZHl8ZW58MHx8MHx8fDA%3D",
      lastUpdated: "2023-09-30T10:15:00"
    },
    {
      id: 3,
      name: "Course Recommendation System",
      description: "A machine learning based system that recommends courses to students based on their academic history and career goals",
      tech: ["Python", "TensorFlow", "Flask", "PostgreSQL", "scikit-learn"],
      demoUrl: null,
      repoUrl: "https://github.com/rahulsharma/course-recommendation-system",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGNvdXJzZXN8ZW58MHx8MHx8fDA%3D",
      lastUpdated: "2023-08-25T16:40:00"
    }
  ];
  
  const contributions = [
    {
      date: "2023-10-15",
      count: 8
    },
    {
      date: "2023-10-14",
      count: 5
    },
    {
      date: "2023-10-13",
      count: 10
    },
    {
      date: "2023-10-12",
      count: 3
    },
    {
      date: "2023-10-11",
      count: 6
    },
    {
      date: "2023-10-10",
      count: 4
    },
    {
      date: "2023-10-09",
      count: 7
    }
  ];
  
  const activities = [
    {
      id: 1,
      type: "commit",
      repo: "ai-learning-assistant",
      branch: "main",
      message: "Add natural language processing for student queries",
      date: "2023-10-15T09:30:00"
    },
    {
      id: 2,
      type: "pull_request",
      repo: "smart-study-planner",
      number: 45,
      title: "Implement Google Calendar integration",
      date: "2023-10-14T16:20:00",
      status: "open"
    },
    {
      id: 3,
      type: "issue",
      repo: "course-recommendation-system",
      number: 23,
      title: "Fix recommendation algorithm for new users",
      date: "2023-10-13T11:45:00",
      status: "closed"
    },
    {
      id: 4,
      type: "commit",
      repo: "college-event-manager",
      branch: "feature/attendance",
      message: "Add QR code based attendance tracking",
      date: "2023-10-12T14:10:00"
    },
    {
      id: 5,
      type: "pull_request",
      repo: "student-portfolio",
      number: 18,
      title: "Add dark mode support",
      date: "2023-10-11T10:05:00",
      status: "merged"
    }
  ];
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
    
    if (diffSec < 60) {
      return `${diffSec} seconds ago`;
    } else if (diffMin < 60) {
      return `${diffMin} minutes ago`;
    } else if (diffHour < 24) {
      return `${diffHour} hours ago`;
    } else if (diffDay < 30) {
      return `${diffDay} days ago`;
    } else {
      return formatDate(dateString);
    }
  };
  
  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      "JavaScript": "bg-yellow-400",
      "TypeScript": "bg-blue-400",
      "Python": "bg-blue-600",
      "Java": "bg-orange-600",
      "C++": "bg-pink-500",
      "Go": "bg-cyan-500",
      "Rust": "bg-orange-700",
      "PHP": "bg-purple-500",
      "Ruby": "bg-red-600",
      "C#": "bg-green-600",
      "Swift": "bg-orange-500",
      "Kotlin": "bg-purple-400"
    };
    
    return colors[language] || "bg-gray-400";
  };
  
  const handleConnectGithub = () => {
    // In a real app, this would initiate OAuth flow with GitHub
    setIsConnected(true);
    setConnectDialogOpen(false);
    toast.success("GitHub account connected successfully!");
  };
  
  const handleAddRepository = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would create a new repository or link an existing one
    setAddRepoDialogOpen(false);
    toast.success("Repository added successfully!");
  };
  
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">GitHub & Projects</h1>
          <p className="text-muted-foreground">Manage your repositories and showcase your projects</p>
        </div>
        
<<<<<<< HEAD
        <form onSubmit={handleSubmit} className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Enter GitHub username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </>
            ) : (
              <>
            <GithubIcon className="mr-2 h-4 w-4" />
                Connect
              </>
            )}
          </Button>
        </form>
      </div>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && !userData ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : userData ? (
        <>
      <Card className="border-dashed">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
                  <AvatarImage src={userData.avatar_url} alt={`${userData.name || userData.login} Avatar`} />
                  <AvatarFallback>{userData.login.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
                  <CardTitle className="text-2xl">{userData.name || userData.login}</CardTitle>
              <CardDescription className="flex items-center">
                    <GithubIcon className="h-4 w-4 mr-1" /> {userData.login}
              </CardDescription>
                  {userData.bio && <p className="mt-1 text-sm">{userData.bio}</p>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{userData.public_repos}</p>
              <p className="text-sm text-muted-foreground">Repositories</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{activities.length}</p>
                  <p className="text-sm text-muted-foreground">Recent Activities</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{userData.followers}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
                  <p className="text-2xl font-bold">{userData.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
        </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
              <Button variant="outline" size="sm" asChild>
                <a href={userData.html_url} target="_blank" rel="noopener noreferrer">
                  <GithubIcon className="mr-2 h-4 w-4" />
                  View GitHub Profile
                </a>
              </Button>
            </CardFooter>
      </Card>
      
          <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-4">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : repositories.length > 0 ? (
                repositories.map((repo) => (
                  <Card key={repo.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                            {repo.name}
                            {repo.language && (
                      <Badge variant="outline" className="ml-2">
                                <div className={`mr-1 w-2 h-2 rounded-full ${languageColors[repo.language] || languageColors[""]}`}></div>
                                {repo.language}
                      </Badge>
                            )}
                    </CardTitle>
                          <CardDescription className="mt-1">{repo.description || "No description provided"}</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                            <span className="text-sm">{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center">
                      <GitFork className="h-4 w-4 mr-1" />
                            <span className="text-sm">{repo.forks_count}</span>
                    </div>
=======
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          {isConnected ? (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
                <GithubIcon className="h-3 w-3" />
                {githubUsername}
              </Badge>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setAddRepoDialogOpen(true)}
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Repository
              </Button>
            </div>
          ) : (
            <Button onClick={() => setConnectDialogOpen(true)}>
              <GithubIcon className="h-4 w-4 mr-2" />
              Connect GitHub
            </Button>
          )}
        </div>
      </div>

      {isConnected ? (
        <Tabs defaultValue="repositories" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>
          
          {/* Repositories Tab */}
          <TabsContent value="repositories" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">Your Repositories</CardTitle>
                  <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search repositories..."
                      className="pl-8"
                    />
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
                  </div>
                </div>
              </CardHeader>
              <CardContent>
<<<<<<< HEAD
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <GitCommit className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{repo.default_branch} branch</span>
                  </div>
                  <div className="flex items-center">
                    <GitPullRequest className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>{repo.open_issues_count} open issues</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span>Public repository</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                          <span>Last Updated</span>
                          <span>{formatDate(repo.updated_at)}</span>
                  </div>
                        <Progress value={100} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="text-sm text-muted-foreground">
                        Last updated {formatDate(repo.updated_at)}
                </div>
                <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-2 h-4 w-4" />
                    View Project
                          </a>
                  </Button>
                        <Button size="sm" asChild>
                          <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="mr-2 h-4 w-4" />
                    Open in GitHub
                          </a>
                  </Button>
                </div>
              </CardFooter>
            </Card>
                ))
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">No repositories found</p>
                  </CardContent>
                </Card>
              )}
        </TabsContent>
        
        <TabsContent value="contributions">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : contributions.length > 0 ? (
                <Card>
                <CardHeader>
                    <CardTitle>Contribution Calendar</CardTitle>
                    <CardDescription>Your GitHub activity over the past year</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                      <div className="flex flex-wrap">
                        {contributions.map((contribution) => (
                          <div
                            key={contribution.date}
                            style={{
                              backgroundColor: contribution.count > 0 
                                ? `hsl(${Math.min(contribution.count * 20, 120)}, 70%, 50%)` 
                                : '#ebedf0',
                              width: '12px',
                              height: '12px',
                              margin: '4px',
                              display: 'inline-block',
                            }}
                            title={`${contribution.count} contributions on ${contribution.date}`}
                          />
            ))}
          </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">No contribution data available</p>
                  </CardContent>
                </Card>
              )}
        </TabsContent>
        
        <TabsContent value="activity">
              {isLoading ? (
                <div className="flex justify-center items-center h-32">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                </div>
              ) : activities.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Recent GitHub Activity</CardTitle>
              <CardDescription>Your actions from the past month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className="bg-muted p-2 rounded-full">
                            {getEventIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                            <p className="font-medium">{getEventMessage(activity)}</p>
                            <p className="text-sm text-muted-foreground">{activity.repo.name}</p>
                            <p className="text-xs text-muted-foreground mt-1">{formatDate(activity.created_at)}</p>
=======
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead className="hidden md:table-cell">Language</TableHead>
                        <TableHead className="hidden md:table-cell">Stars</TableHead>
                        <TableHead className="hidden lg:table-cell">Updated</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {repositories.map((repo) => (
                        <TableRow key={repo.id}>
                          <TableCell>
                            <div>
                              <div className="flex items-center gap-2">
                                <FileCode className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{repo.name}</span>
                                {repo.isPrivate && (
                                  <Badge variant="outline" className="text-xs">Private</Badge>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {repo.description}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <span className={`h-3 w-3 rounded-full ${getLanguageColor(repo.language)}`}></span>
                              {repo.language}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-muted-foreground" />
                              {repo.stars}
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-muted-foreground">
                            {formatTimeAgo(repo.lastUpdated)}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => window.open(repo.url, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contributions</CardTitle>
                  <CardDescription>Your recent GitHub activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-1 mb-2">
                    {contributions.map((day, index) => (
                      <div 
                        key={index} 
                        className="flex flex-col items-center"
                        title={`${day.date}: ${day.count} contributions`}
                      >
                        <div 
                          className={`h-8 w-6 rounded-sm ${
                            day.count === 0 ? 'bg-gray-100' :
                            day.count < 5 ? 'bg-green-200' :
                            day.count < 10 ? 'bg-green-400' : 'bg-green-600'
                          }`} 
                        />
                        <span className="text-xs mt-1 text-muted-foreground">
                          {new Date(day.date).getDate()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-4">
                    <span>{contributions.reduce((sum, day) => sum + day.count, 0)} contributions in the last week</span>
                    <Button variant="link" size="sm" className="p-0 h-auto">
                      View full calendar
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Overview</CardTitle>
                  <CardDescription>Your GitHub statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                      <div className="text-3xl font-bold">{repositories.length}</div>
                      <div className="text-sm text-muted-foreground">Repositories</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                      <div className="text-3xl font-bold">
                        {repositories.reduce((sum, repo) => sum + repo.stars, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Stars</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                      <div className="text-3xl font-bold">
                        {repositories.reduce((sum, repo) => sum + repo.forks, 0)}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Forks</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-3 border rounded-lg">
                      <div className="text-3xl font-bold">
                        {repositories.filter(repo => !repo.isPrivate).length}
                      </div>
                      <div className="text-sm text-muted-foreground">Public Repos</div>
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <Card key={project.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="object-cover w-full h-full transition-transform hover:scale-105 duration-200"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription>
                      Last updated: {formatDate(project.lastUpdated)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm mb-3">{project.description}</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.map((tech, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(project.repoUrl, '_blank')}
                    >
                      <Code className="h-3 w-3 mr-1" />
                      Code
                    </Button>
                    
                    {project.demoUrl && (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => window.open(project.demoUrl!, '_blank')}
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Demo
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
              
              <Card className="flex flex-col items-center justify-center p-6 border-dashed border-2">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <PlusCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Add New Project</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Showcase your latest project with details and screenshots
                </p>
                <Button>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </Card>
            </div>
          </TabsContent>
          
          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Your latest GitHub actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative pl-6 border-l space-y-6">
                  {activities.map((activity) => (
                    <div key={activity.id} className="relative">
                      <div className="absolute -left-[28px] p-1 rounded-full bg-background border">
                        {activity.type === "commit" ? (
                          <GitBranch className="h-4 w-4 text-primary" />
                        ) : activity.type === "pull_request" ? (
                          <GitPullRequest className="h-4 w-4 text-purple-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-orange-500" />
                        )}
                      </div>
                      
                      <div className="mb-1">
                        <div className="flex flex-wrap gap-1 items-center mb-1">
                          <span className="font-medium">{activity.repo}</span>
                          {activity.type === "commit" && (
                            <>
                              <span className="text-muted-foreground">({activity.branch})</span>
                              <Badge variant="outline" className="text-xs">commit</Badge>
                            </>
                          )}
                          {activity.type === "pull_request" && (
                            <>
                              <Badge variant="outline" className="text-xs">PR #{activity.number}</Badge>
                              {activity.status === "open" && (
                                <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">open</Badge>
                              )}
                              {activity.status === "merged" && (
                                <Badge variant="outline" className="bg-purple-100 text-purple-800 text-xs">merged</Badge>
                              )}
                            </>
                          )}
                          {activity.type === "issue" && (
                            <>
                              <Badge variant="outline" className="text-xs">issue #{activity.number}</Badge>
                              {activity.status === "open" && (
                                <Badge variant="outline" className="bg-green-100 text-green-800 text-xs">open</Badge>
                              )}
                              {activity.status === "closed" && (
                                <Badge variant="outline" className="bg-red-100 text-red-800 text-xs">closed</Badge>
                              )}
                            </>
                          )}
                        </div>
                        
                        <p className="text-sm">
                          {activity.type === "commit" ? activity.message : activity.title}
                        </p>
                      </div>
                      
                      <div className="flex items-center text-xs text-muted-foreground">
                        <History className="h-3 w-3 mr-1" />
                        <span>{formatTimeAgo(activity.date)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Collaborations</CardTitle>
                <CardDescription>Projects you're collaborating on</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">College Technical Fest Website</h3>
                        <p className="text-sm text-muted-foreground">With 4 other contributors</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <p className="text-sm mb-3">
                      Website for annual technical festival with event registration, participant management and real-time updates.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">AS</div>
                        <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">KR</div>
                        <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">MJ</div>
                        <div className="w-7 h-7 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">DV</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <UsersRound className="h-3 w-3 mr-1" />
                        Manage Team
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">Research Project: ML for Education</h3>
                        <p className="text-sm text-muted-foreground">With Prof. Kumar and 2 others</p>
                      </div>
                      <Badge variant="outline">Research</Badge>
                    </div>
                    <p className="text-sm mb-3">
                      Research project on applying machine learning techniques to optimize educational outcomes.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white text-xs">PK</div>
                        <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">SV</div>
                        <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center text-white text-xs">RM</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <UsersRound className="h-3 w-3 mr-1" />
                        Manage Team
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <div className="rounded-full bg-primary/10 p-4 mb-4">
              <GithubIcon className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">Connect Your GitHub Account</h2>
            <p className="text-center text-muted-foreground mb-6 max-w-md">
              Connect your GitHub account to showcase your repositories, projects, and contributions within the platform.
            </p>
            <Button onClick={() => setConnectDialogOpen(true)}>
              <GithubIcon className="h-4 w-4 mr-2" />
              Connect GitHub
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Connect GitHub Dialog */}
      <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect GitHub Account</DialogTitle>
            <DialogDescription>
              Link your GitHub account to access your repositories and showcase your projects.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
              <GithubIcon className="h-12 w-12 mb-2" />
              <p className="text-center text-sm text-muted-foreground mb-4">
                You'll be redirected to GitHub to authorize access to your account.
              </p>
              <Button onClick={handleConnectGithub} className="w-full">
                Continue with GitHub
              </Button>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p className="mb-1">This will allow the app to:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Read your repositories, commits, and public information</li>
                <li>Show your activities and contributions</li>
                <li>Track progress on your coding projects</li>
              </ul>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Add Repository Dialog */}
      <Dialog open={addRepoDialogOpen} onOpenChange={setAddRepoDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Repository</DialogTitle>
            <DialogDescription>
              Create a new repository or link an existing one from your GitHub account.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddRepository} className="space-y-4 py-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="repoName">Repository Name</Label>
                <Input
                  id="repoName"
                  placeholder="e.g., my-awesome-project"
                  required
                />
              </div>
<<<<<<< HEAD
            </CardContent>
          </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <p className="text-center text-muted-foreground">No recent activity found</p>
                  </CardContent>
                </Card>
              )}
        </TabsContent>
      </Tabs>
        </>
      ) : (
        <Card className="border-dashed">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Enter a GitHub username to view profile data</p>
          </CardContent>
        </Card>
      )}
=======
              
              <div className="space-y-2">
                <Label htmlFor="repoDesc">Description</Label>
                <Textarea
                  id="repoDesc"
                  placeholder="Brief description of your repository"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="repoVisibility">Visibility</Label>
                <Select defaultValue="public">
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Public repositories are visible to anyone. Private repositories are only visible to you and collaborators you specify.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="repoInit">Initialize repository</Label>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="repoInit" className="form-checkbox" />
                  <label htmlFor="repoInit" className="text-sm">
                    Add README, .gitignore, and license files
                  </label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setAddRepoDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Create Repository
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
    </div>
  );
};

export default Github;
