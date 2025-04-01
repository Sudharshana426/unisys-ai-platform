
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, MessageSquare, Plus, Settings, Video } from "lucide-react";

const scheduledInterviews = [
  {
    id: 1,
    type: "Technical",
    company: "Google",
    role: "Software Engineer",
    date: "November 15, 2023",
    time: "3:00 PM - 4:30 PM",
    interviewer: "Alex Johnson",
    interviewerRole: "Senior Software Engineer",
    interviewerImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
    format: "Video Call",
    topics: ["Algorithms", "Data Structures", "System Design"],
    status: "Confirmed"
  },
  {
    id: 2,
    type: "Behavioral",
    company: "Amazon",
    role: "Software Development Engineer",
    date: "November 18, 2023",
    time: "10:00 AM - 11:00 AM",
    interviewer: "Sarah Williams",
    interviewerRole: "Engineering Manager",
    interviewerImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
    format: "Video Call",
    topics: ["Leadership Principles", "Project Experience", "Team Collaboration"],
    status: "Pending Confirmation"
  }
];

const pastInterviews = [
  {
    id: 3,
    type: "Technical",
    company: "Microsoft",
    role: "Software Engineer II",
    date: "October 28, 2023",
    interviewer: "David Chen",
    interviewerRole: "Principal Engineer",
    interviewerImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
    format: "Video Call",
    score: 8.5,
    feedback: "Strong problem-solving skills. Could improve on system design explanations.",
    topics: ["Algorithms", "Problem Solving", "Object-Oriented Design"],
    status: "Completed",
    strengths: ["Algorithm optimization", "Code clarity", "Testing approach"],
    improvements: ["System design communication", "Edge case handling"]
  },
  {
    id: 4,
    type: "Behavioral",
    company: "Facebook",
    role: "Frontend Engineer",
    date: "October 15, 2023",
    interviewer: "Lisa Thompson",
    interviewerRole: "Technical Recruiting Manager",
    interviewerImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=50&h=50&fit=crop",
    format: "Phone Screen",
    score: 9.2,
    feedback: "Excellent communication of past experiences. Great alignment with company values.",
    topics: ["Past Projects", "Conflict Resolution", "Leadership Experience"],
    status: "Completed",
    strengths: ["Storytelling", "Project impact description", "Teamwork examples"],
    improvements: ["More specific metrics", "Conciseness"]
  }
];

const practiceOptions = [
  {
    id: 1,
    title: "Algorithm Interview Prep",
    description: "Practice common algorithm questions with an AI interviewer",
    duration: "30-60 min",
    difficulty: "Medium to Hard",
    topics: ["Data Structures", "Algorithms", "Problem Solving"],
    popularity: 92,
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop",
  },
  {
    id: 2,
    title: "System Design Interview",
    description: "Design scalable systems and discuss architectural decisions",
    duration: "45-60 min",
    difficulty: "Hard",
    topics: ["System Design", "Scalability", "Database Design", "API Design"],
    popularity: 88,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
  },
  {
    id: 3,
    title: "Behavioral STAR Method",
    description: "Structured interview practice using the STAR method",
    duration: "20-40 min",
    difficulty: "Medium",
    topics: ["Leadership", "Problem Solving", "Teamwork", "Conflict Resolution"],
    popularity: 76,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=200&fit=crop",
  },
  {
    id: 4,
    title: "Frontend Coding Challenge",
    description: "Build UI components and solve frontend problems",
    duration: "30-45 min",
    difficulty: "Medium",
    topics: ["JavaScript", "React", "CSS", "Web Performance"],
    popularity: 84,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
  }
];

const MockInterviews = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Mock Interviews</h1>
          <p className="text-muted-foreground">Practice interviews and improve your skills</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Preferences
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Schedule Interview
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="upcoming">
        <TabsList className="mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past Interviews</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming">
          {scheduledInterviews.length > 0 ? (
            <div className="space-y-4">
              {scheduledInterviews.map((interview) => (
                <Card key={interview.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle>{interview.company} - {interview.role}</CardTitle>
                          <Badge variant={interview.status === "Confirmed" ? "default" : "outline"}>
                            {interview.status}
                          </Badge>
                        </div>
                        <CardDescription className="mt-1">{interview.type} Interview</CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date & Time</p>
                          <p className="font-medium">{interview.date}, {interview.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <Video className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Format</p>
                          <p className="font-medium">{interview.format}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-12 w-12 border">
                        <AvatarImage src={interview.interviewerImage} alt={interview.interviewer} />
                        <AvatarFallback>{interview.interviewer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{interview.interviewer}</p>
                        <p className="text-sm text-muted-foreground">{interview.interviewerRole}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Interview Topics</p>
                      <div className="flex flex-wrap gap-2">
                        {interview.topics.map((topic, index) => (
                          <Badge key={index} variant="outline">{topic}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline">Reschedule</Button>
                    <Button>Join Interview</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border rounded-lg">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Upcoming Interviews</h3>
              <p className="text-muted-foreground mb-4">Schedule a mock interview to practice your skills.</p>
              <Button>Schedule Now</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          <div className="space-y-6">
            {pastInterviews.map((interview) => (
              <Card key={interview.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle>{interview.company} - {interview.role}</CardTitle>
                        <Badge variant="outline" className="bg-muted/80">
                          {interview.date}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">{interview.type} Interview</CardDescription>
                    </div>
                    <div className="bg-primary/10 rounded-full px-3 py-1 flex items-center gap-1">
                      <span className="font-medium">{interview.score}</span>
                      <span className="text-xs text-muted-foreground">/10</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src={interview.interviewerImage} alt={interview.interviewer} />
                      <AvatarFallback>{interview.interviewer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{interview.interviewer}</p>
                      <p className="text-sm text-muted-foreground">{interview.interviewerRole}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Feedback Summary</p>
                      <p className="text-sm text-muted-foreground">{interview.feedback}</p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">Strengths</p>
                        <ul className="list-disc pl-4 text-sm text-muted-foreground">
                          {interview.strengths.map((strength, idx) => (
                            <li key={idx}>{strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Areas for Improvement</p>
                        <ul className="list-disc pl-4 text-sm text-muted-foreground">
                          {interview.improvements.map((improvement, idx) => (
                            <li key={idx}>{improvement}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium mb-2">Topics Covered</p>
                      <div className="flex flex-wrap gap-2">
                        {interview.topics.map((topic, index) => (
                          <Badge key={index} variant="outline">{topic}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline">View Detailed Feedback</Button>
                  <Button>Practice Similar Questions</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="practice">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practiceOptions.map(option => (
              <Card key={option.id} className="overflow-hidden">
                <div className="h-40 w-full relative">
                  <img 
                    src={option.image} 
                    alt={option.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-white font-medium">{option.title}</h3>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium">{option.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Difficulty</p>
                      <p className="text-sm font-medium">{option.difficulty}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span>Popularity</span>
                      <span>{option.popularity}%</span>
                    </div>
                    <Progress value={option.popularity} className="h-2" />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {option.topics.map((topic, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">{topic}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Start Practice
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed bg-muted/40 flex flex-col items-center justify-center p-8 text-center h-full">
              <MessageSquare className="h-10 w-10 mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Custom Interview</h3>
              <p className="text-sm text-muted-foreground mb-4">Create a custom interview with specific topics and difficulty level.</p>
              <Button variant="outline">Create Custom</Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MockInterviews;
