import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, BookOpen, Award, FileText, Activity, Code, Github, Briefcase, BarChart2, Clock, ListTodo, GraduationCap, Layers } from "lucide-react";
import { Calendar } from '@/components/ui/calendar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold gradient-heading">Student Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to DeepSeek</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Your most recent tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-1.5 bg-red-500"></div>
              <div>
                <p className="font-medium">Complete ML Assignment</p>
                <p className="text-xs text-muted-foreground">Due: Tomorrow</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-1.5 bg-amber-500"></div>
              <div>
                <p className="font-medium">Research Paper Draft</p>
                <p className="text-xs text-muted-foreground">Due: Oct 10</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full mt-1.5 bg-green-500"></div>
              <div>
                <p className="font-medium">Prepare for Mock Interview</p>
                <p className="text-xs text-muted-foreground">Due: Oct 15</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/todo">
              <Button variant="outline" size="sm">
                <ListTodo className="mr-2 h-4 w-4" /> Manage Tasks
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Study Progress</CardTitle>
            <CardDescription>This week's learning activities</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Machine Learning</span>
                <span className="font-medium">60%</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: "60%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Data Structures</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="bg-green-600 h-full rounded-full" style={{ width: "85%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1 text-sm">
                <span>Web Development</span>
                <span className="font-medium">40%</span>
              </div>
              <div className="h-2 bg-muted rounded-full">
                <div className="bg-amber-600 h-full rounded-full" style={{ width: "40%" }}></div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/learning">
              <Button variant="outline" size="sm">
                <BookOpen className="mr-2 h-4 w-4" /> Continue Learning
              </Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>October 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar 
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-full"
            />
          </CardContent>
          <CardFooter>
            <Link to="/calendar">
              <Button variant="outline" size="sm">
                <CalendarIcon className="mr-2 h-4 w-4" /> View Schedule
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle>Latest Updates</CardTitle>
            <CardDescription>Recent activities and announcements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <p className="font-medium">New Internship Opportunities Available</p>
              <p className="text-sm text-muted-foreground mt-1">
                Check out the latest internships from Google, Microsoft, and Amazon.
              </p>
              <p className="text-xs text-muted-foreground mt-2">Today</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-4 py-1">
              <p className="font-medium">Certificate in AI & ML - 30% Off</p>
              <p className="text-sm text-muted-foreground mt-1">
                Special discount for students. Limited time offer!
              </p>
              <p className="text-xs text-muted-foreground mt-2">Yesterday</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-1">
              <p className="font-medium">Campus Hackathon - Registration Open</p>
              <p className="text-sm text-muted-foreground mt-1">
                Form your team and register by October 15th.
              </p>
              <p className="text-xs text-muted-foreground mt-2">2 days ago</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/resume">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" /> Update Resume
              </Button>
            </Link>
            <Link to="/achievements">
              <Button variant="outline" className="w-full justify-start">
                <Award className="mr-2 h-4 w-4" /> Log Achievement
              </Button>
            </Link>
            <Link to="/academics">
              <Button variant="outline" className="w-full justify-start">
                <GraduationCap className="mr-2 h-4 w-4" /> Check Grades
              </Button>
            </Link>
            <Link to="/swot">
              <Button variant="outline" className="w-full justify-start">
                <Activity className="mr-2 h-4 w-4" /> Update SWOT Analysis
              </Button>
            </Link>
            <Link to="/coding">
              <Button variant="outline" className="w-full justify-start">
                <Code className="mr-2 h-4 w-4" /> Practice Coding
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Github className="h-4 w-4 mr-2" /> GitHub Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">23</p>
            <p className="text-xs text-muted-foreground">contributions this week</p>
          </CardContent>
          <CardFooter>
            <Link to="/github">
              <Button variant="ghost" size="sm" className="text-xs h-8">View Projects</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <BookOpen className="h-4 w-4 mr-2" /> Learning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">4.5</p>
            <p className="text-xs text-muted-foreground">hours this week</p>
          </CardContent>
          <CardFooter>
            <Link to="/learning">
              <Button variant="ghost" size="sm" className="text-xs h-8">Study Materials</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Layers className="h-4 w-4 mr-2" /> Learning Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">14</p>
            <p className="text-xs text-muted-foreground">total resources</p>
          </CardContent>
          <CardFooter>
            <Link to="/learning-hub">
              <Button variant="ghost" size="sm" className="text-xs h-8">View All</Button>
            </Link>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center">
              <Clock className="h-4 w-4 mr-2" /> Pomodoro
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">25:00</p>
            <p className="text-xs text-muted-foreground">focus session</p>
          </CardContent>
          <CardFooter>
            <Link to="/pomodoro">
              <Button variant="ghost" size="sm" className="text-xs h-8">Start Timer</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
