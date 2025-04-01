
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle, Clock, PlayCircle, Trophy } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Data Structures & Algorithms",
    description: "Learn fundamental algorithms and data structures",
    progress: 78,
    platform: "NPTEL",
    instructor: "Dr. Sarah Johnson",
    duration: "8 weeks",
    completed: 14,
    total: 18,
    image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 2,
    title: "Machine Learning Fundamentals",
    description: "Introduction to machine learning algorithms and applications",
    progress: 45,
    platform: "Coursera",
    instructor: "Dr. Andrew Ng",
    duration: "12 weeks",
    completed: 5,
    total: 12,
    image: "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 3,
    title: "Web Development with React",
    description: "Build modern web applications using React",
    progress: 92,
    platform: "Udemy",
    instructor: "Max Schwarzmüller",
    duration: "10 weeks",
    completed: 11,
    total: 12,
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 4,
    title: "Database Management Systems",
    description: "Design and manage relational databases",
    progress: 25,
    platform: "EdX",
    instructor: "Prof. Michael Brown",
    duration: "6 weeks",
    completed: 2,
    total: 8,
    image: "https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80"
  }
];

const recommendations = [
  {
    id: 1,
    title: "Cloud Computing with AWS",
    description: "Learn to build scalable applications on AWS",
    platform: "Coursera",
    instructor: "Prof. David Liu",
    duration: "6 weeks",
    image: "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80"
  },
  {
    id: 2,
    title: "Advanced Python Programming",
    description: "Dive deeper into Python with advanced concepts",
    platform: "Udacity",
    instructor: "Maria Rodriguez",
    duration: "4 weeks",
    image: "https://images.unsplash.com/photo-1526379879527-8559ecfcb970?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80"
  }
];

const Learning = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold gradient-heading">Learning Dashboard</h1>
        <Button>
          <PlayCircle className="mr-2 h-4 w-4" />
          Resume Learning
        </Button>
      </div>
      
      <Tabs defaultValue="current">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Current Courses</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription className="mt-1">{course.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{course.platform}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Instructor</p>
                      <p className="font-medium">{course.instructor}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{course.duration}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    <CheckCircle className="inline mr-1 h-4 w-4 text-green-500" />
                    {course.completed}/{course.total} units completed
                  </div>
                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="bg-muted rounded-lg p-8 text-center">
            <Trophy className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No completed courses yet</h3>
            <p className="text-muted-foreground mb-4">Keep learning to complete your current courses</p>
            <Button variant="outline">Browse Courses</Button>
          </div>
        </TabsContent>
        
        <TabsContent value="recommended" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
            {recommendations.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{course.title}</CardTitle>
                      <CardDescription className="mt-1">{course.description}</CardDescription>
                    </div>
                    <Badge variant="outline">{course.platform}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Instructor</p>
                      <p className="font-medium">{course.instructor}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{course.duration}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    AI Recommended
                  </div>
                  <Button size="sm">
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Learning Statistics</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Study Time</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">42.5 hours</div>
              <p className="text-muted-foreground text-sm">Last 30 days</p>
              <Progress value={75} className="h-2 mt-4" />
              <p className="text-sm text-green-600 mt-2">+12% from previous month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Courses Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">5</div>
              <p className="text-muted-foreground text-sm">Since joining</p>
              <div className="flex gap-2 mt-4">
                <Badge>NPTEL: 2</Badge>
                <Badge>Coursera: 2</Badge>
                <Badge>EdX: 1</Badge>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills Acquired</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">12</div>
              <p className="text-muted-foreground text-sm">Verified skills</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="outline">Python</Badge>
                <Badge variant="outline">React</Badge>
                <Badge variant="outline">Data Analysis</Badge>
                <Badge variant="outline">SQL</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Learning;
