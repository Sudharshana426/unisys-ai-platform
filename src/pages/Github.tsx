import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Code, Eye, GitBranch, GitCommit, GitFork, Github as GithubIcon, GitPullRequest, Star, Users } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "AI-Powered Learning Assistant",
    description: "Natural language processing model that assists students with learning difficult concepts.",
    language: "Python",
    stars: 45,
    forks: 12,
    lastUpdated: "2 days ago",
    contributors: 3,
    progress: 85,
    commits: 124,
    pullRequests: 8,
    issues: 5
  },
  {
    id: 2,
    name: "Smart College Timetable Generator",
    description: "Algorithm that optimizes classroom and faculty allocation for efficient timetable generation.",
    language: "JavaScript",
    stars: 28,
    forks: 7,
    lastUpdated: "1 week ago",
    contributors: 2,
    progress: 92,
    commits: 87,
    pullRequests: 4,
    issues: 2
  },
  {
    id: 3,
    name: "College Event Management Portal",
    description: "Web application for managing and coordinating campus events with registration system.",
    language: "TypeScript",
    stars: 19,
    forks: 5,
    lastUpdated: "3 weeks ago",
    contributors: 4,
    progress: 70,
    commits: 156,
    pullRequests: 12,
    issues: 8
  },
  {
    id: 4,
    name: "Automated Attendance System",
    description: "Face recognition based attendance tracking system for classrooms.",
    language: "Python",
    stars: 38,
    forks: 15,
    lastUpdated: "5 days ago",
    contributors: 6,
    progress: 60,
    commits: 98,
    pullRequests: 5,
    issues: 10
  }
];

const contributions = [
  {
    id: 1,
    project: "TensorFlow",
    description: "Fixed documentation typos in the getting started guide",
    date: "Jan 15, 2023",
    status: "Merged",
    pullRequestNumber: "#45632"
  },
  {
    id: 2,
    project: "React",
    description: "Added test cases for the useEffect hook",
    date: "Mar 22, 2023",
    status: "Merged",
    pullRequestNumber: "#23451"
  },
  {
    id: 3,
    project: "Django",
    description: "Improved error handling in authentication middleware",
    date: "May 10, 2023",
    status: "In Review",
    pullRequestNumber: "#8765"
  }
];

const activities = [
  { id: 1, type: "commit", project: "AI-Powered Learning Assistant", message: "Improved accuracy of NLP model", time: "2 hours ago" },
  { id: 2, type: "issue", project: "Smart College Timetable Generator", message: "Fixed room allocation algorithm", time: "Yesterday" },
  { id: 3, type: "pullRequest", project: "College Event Management Portal", message: "Added email notification system", time: "3 days ago" },
  { id: 4, type: "star", project: "TensorFlow", message: "Starred TensorFlow repository", time: "5 days ago" },
  { id: 5, type: "fork", project: "React Native", message: "Forked React Native repository", time: "1 week ago" }
];

const languageColors: Record<string, string> = {
  Python: "bg-blue-500",
  JavaScript: "bg-yellow-500",
  TypeScript: "bg-blue-600",
  Java: "bg-orange-600",
  "C++": "bg-purple-500",
  "C#": "bg-green-600"
};

const GithubPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">GitHub & Projects</h1>
          <p className="text-muted-foreground">Connect your GitHub account to track projects and contributions</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <GithubIcon className="mr-2 h-4 w-4" />
            Refresh GitHub Data
          </Button>
          <Button>
            <Code className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      <Card className="border-dashed">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border-2 border-primary/20">
              <AvatarImage src="https://avatars.githubusercontent.com/u/12345678?v=4" alt="GitHub Avatar" />
              <AvatarFallback>RS</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">Rahul Sharma</CardTitle>
              <CardDescription className="flex items-center">
                <GithubIcon className="h-4 w-4 mr-1" /> rahulsharma42
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">Repositories</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">156</p>
              <p className="text-sm text-muted-foreground">Contributions</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">43</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">58</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="projects">
        <TabsList className="mb-4">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="contributions">Contributions</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>
        
        <TabsContent value="projects" className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      {project.name}
                      <Badge variant="outline" className="ml-2">
                        <div className={`mr-1 w-2 h-2 rounded-full ${languageColors[project.language]}`}></div>
                        {project.language}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="mt-1">{project.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      <span className="text-sm">{project.stars}</span>
                    </div>
                    <div className="flex items-center">
                      <GitFork className="h-4 w-4 mr-1" />
                      <span className="text-sm">{project.forks}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center">
                    <GitCommit className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{project.commits} commits</span>
                  </div>
                  <div className="flex items-center">
                    <GitPullRequest className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{project.pullRequests} pull requests</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span>{project.contributors} contributors</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Project Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="text-sm text-muted-foreground">
                  Last updated {project.lastUpdated}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Project
                  </Button>
                  <Button size="sm">
                    <GithubIcon className="mr-2 h-4 w-4" />
                    Open in GitHub
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="contributions">
          <div className="space-y-4">
            {contributions.map((contribution) => (
              <Card key={contribution.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">{contribution.project}</CardTitle>
                    <Badge variant={contribution.status === "Merged" ? "default" : "outline"}>
                      {contribution.status}
                    </Badge>
                  </div>
                  <CardDescription>{contribution.pullRequestNumber} • {contribution.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{contribution.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button size="sm">View Pull Request</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="activity">
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
                      {activity.type === "commit" && <GitCommit className="h-5 w-5" />}
                      {activity.type === "issue" && <Code className="h-5 w-5" />}
                      {activity.type === "pullRequest" && <GitPullRequest className="h-5 w-5" />}
                      {activity.type === "star" && <Star className="h-5 w-5" />}
                      {activity.type === "fork" && <GitFork className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm text-muted-foreground">{activity.project}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GithubPage;
