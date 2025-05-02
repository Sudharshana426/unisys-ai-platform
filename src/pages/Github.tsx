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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">GitHub & Projects</h1>
          <p className="text-muted-foreground">Connect your GitHub account to track projects and contributions</p>
        </div>
        
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
                  </div>
                </div>
              </CardHeader>
              <CardContent>
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
                    </div>
                  </div>
                ))}
              </div>
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
    </div>
  );
};

export default GithubPage;
