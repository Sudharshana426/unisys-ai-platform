import React, { useState, useEffect } from 'react';
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
  UsersRound,
  Loader2
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  fetchGithubUser, 
  fetchUserRepos, 
  fetchUserActivities, 
  fetchUserContributions,
  type GithubUser,
  type GithubRepo,
  type GithubActivity
} from '@/services/githubService';

const Github = () => {
  const [githubUsername, setGithubUsername] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [connectDialogOpen, setConnectDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [userData, setUserData] = useState<GithubUser | null>(null);
  const [repositories, setRepositories] = useState<GithubRepo[]>([]);
  const [activities, setActivities] = useState<GithubActivity[]>([]);
  const [contributions, setContributions] = useState<any[]>([]);

  const handleConnectGithub = async () => {
    if (!githubUsername) {
      toast.error("Please enter a GitHub username");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const user = await fetchGithubUser(githubUsername);
      const repos = await fetchUserRepos(githubUsername);
      const acts = await fetchUserActivities(githubUsername);
      const contribs = await fetchUserContributions(githubUsername);

      setUserData(user);
      setRepositories(repos);
      setActivities(acts);
      setContributions(contribs);
      setIsConnected(true);
      setConnectDialogOpen(false);
      toast.success("Successfully connected to GitHub!");
    } catch (err) {
      setError("Failed to fetch GitHub data. Please check the username and try again.");
      toast.error("Failed to connect to GitHub");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;
    return `${Math.floor(months / 12)} years ago`;
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-blue-500',
      Python: 'bg-green-500',
      Java: 'bg-red-500',
      'C++': 'bg-pink-500',
      Ruby: 'bg-red-600',
      PHP: 'bg-purple-500',
      Go: 'bg-cyan-500',
      Rust: 'bg-orange-500',
      default: 'bg-gray-500'
    };
    return colors[language] || colors.default;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">GitHub Integration</h1>
          <p className="text-muted-foreground">Connect and manage your GitHub profile</p>
        </div>
        
        <Button onClick={() => setConnectDialogOpen(true)} variant={isConnected ? "outline" : "default"}>
          <GithubIcon className="mr-2 h-4 w-4" />
          {isConnected ? 'Connected' : 'Connect GitHub'}
        </Button>
      </div>

      {!isConnected ? (
        <Card>
          <CardHeader>
            <CardTitle>Connect Your GitHub Account</CardTitle>
            <CardDescription>
              Connect your GitHub account to track your repositories, contributions, and activity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <GithubIcon className="h-8 w-8" />
                <div>
                  <h3 className="font-medium">GitHub Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your coding activity and showcase your projects
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={() => setConnectDialogOpen(true)}>
              Connect GitHub
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="repositories">Repositories</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Repositories
                  </CardTitle>
                  <FileCode className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userData?.public_repos}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Followers
                  </CardTitle>
                  <UsersRound className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userData?.followers}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Following
                  </CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{userData?.following}</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest GitHub activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4">
                      <div className="mt-1">
                        {activity.type === 'PushEvent' ? (
                          <GitBranch className="h-5 w-5" />
                        ) : activity.type === 'PullRequestEvent' ? (
                          <GitPullRequest className="h-5 w-5" />
                        ) : (
                          <History className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.repo.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.type.replace('Event', '')} - {formatTimeAgo(activity.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="repositories" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {repositories.map((repo) => (
                <Card key={repo.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <span className="truncate">{repo.name}</span>
                      {repo.private && (
                        <Badge variant="outline">Private</Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {repo.description || 'No description provided'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        {repo.language && (
                          <div className="flex items-center gap-1">
                            <div className={`h-3 w-3 rounded-full ${getLanguageColor(repo.language)}`} />
                            <span className="text-sm">{repo.language}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span className="text-sm">{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitBranch className="h-4 w-4" />
                          <span className="text-sm">{repo.forks_count}</span>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Updated {formatTimeAgo(repo.updated_at)}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                        View Repository
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Activity Feed</CardTitle>
                <CardDescription>Your recent GitHub activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4">
                      <div className="mt-1">
                        {activity.type === 'PushEvent' ? (
                          <GitBranch className="h-5 w-5" />
                        ) : activity.type === 'PullRequestEvent' ? (
                          <GitPullRequest className="h-5 w-5" />
                        ) : (
                          <History className="h-5 w-5" />
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {activity.repo.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.type.replace('Event', '')} - {formatTimeAgo(activity.created_at)}
                        </p>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(activity.created_at)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      <Dialog open={connectDialogOpen} onOpenChange={setConnectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect GitHub Account</DialogTitle>
            <DialogDescription>
              Enter your GitHub username to connect your account
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="username">GitHub Username</Label>
              <Input
                id="username"
                placeholder="Enter your GitHub username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConnectDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConnectGithub} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <GithubIcon className="mr-2 h-4 w-4" />
                  Connect
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Github;
