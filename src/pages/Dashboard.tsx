
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  Calendar,
  Code, 
  FileText, 
  GraduationCap, 
  MessageSquare, 
  Award, 
  ArrowUp, 
  ArrowDown, 
  Clock, 
  ExternalLink,
  TrendingUp
} from 'lucide-react';

export default function Dashboard() {
  // Dummy data
  const upcomingEvents = [
    { id: 1, title: 'Data Structures Assignment Due', date: '2023-10-25', time: '11:59 PM', type: 'assignment' },
    { id: 2, title: 'Machine Learning Midterm', date: '2023-10-28', time: '10:00 AM', type: 'exam' },
    { id: 3, title: 'HackTech 2023 Registration', date: '2023-10-30', time: '5:00 PM', type: 'event' }
  ];

  const progressItems = [
    { id: 1, title: 'Data Structures', progress: 85, color: 'bg-blue-500' },
    { id: 2, title: 'Machine Learning', progress: 72, color: 'bg-purple-500' },
    { id: 3, title: 'Web Development', progress: 60, color: 'bg-green-500' },
    { id: 4, title: 'Database Systems', progress: 45, color: 'bg-orange-500' }
  ];

  const recentActivities = [
    { id: 1, title: 'Completed LeetCode Challenge', time: '2 hours ago', icon: Code },
    { id: 2, title: 'Submitted Machine Learning Assignment', time: '1 day ago', icon: FileText },
    { id: 3, title: 'Mock Interview Completed', time: '3 days ago', icon: MessageSquare },
    { id: 4, title: 'Received Certificate: Advanced Python', time: '1 week ago', icon: Award }
  ];

  const timelineItems = [
    { id: 1, title: 'Complete Database Assignment', time: 'Today', status: 'due', badge: 'High Priority' },
    { id: 2, title: 'Review Machine Learning Notes', time: 'Tomorrow', status: 'planned' },
    { id: 3, title: 'Practice LeetCode Problems', time: 'In 3 days', status: 'planned' },
  ];

  const stats = [
    { title: 'LeetCode Problems', value: '85', change: '+12%', trend: 'up' },
    { title: 'Project Commits', value: '143', change: '+8%', trend: 'up' },
    { title: 'Course Completion', value: '68%', change: '+5%', trend: 'up' },
    { title: 'Certifications', value: '7', change: '0', trend: 'neutral' }
  ];

  return (
    <div className="container mx-auto pt-4 pb-16 md:ml-64">
      <div className="mb-8">
        <h1 className="text-3xl font-bold gradient-heading">Welcome back, Rahul!</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your learning journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6 flex justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <h2 className="text-3xl font-bold mt-1">{stat.value}</h2>
                <p className={`text-xs font-medium flex items-center mt-1 ${stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {stat.trend === 'up' ? <ArrowUp className="mr-1 h-3 w-3" /> : stat.trend === 'down' ? <ArrowDown className="mr-1 h-3 w-3" /> : null}
                  {stat.change}
                </p>
              </div>
              <div className={`rounded-full h-12 w-12 flex items-center justify-center ${
                index === 0 ? 'bg-blue-100 text-blue-500' :
                index === 1 ? 'bg-purple-100 text-purple-500' :
                index === 2 ? 'bg-green-100 text-green-500' : 'bg-orange-100 text-orange-500'
              }`}>
                {index === 0 ? <Code className="h-6 w-6" /> :
                 index === 1 ? <FileText className="h-6 w-6" /> :
                 index === 2 ? <GraduationCap className="h-6 w-6" /> : <Award className="h-6 w-6" />}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Learning Progress</CardTitle>
            <CardDescription>Your course progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between">
              {[40, 55, 45, 70, 65, 80, 90].map((value, index) => (
                <div key={index} className="relative w-[12%]">
                  <div
                    className="bg-gradient-to-t from-primary to-brand-purple rounded-t-md"
                    style={{ height: `${value * 2}px` }}
                  ></div>
                  <span className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 text-xs">
                    {`W${index + 1}`}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              {progressItems.map((item) => (
                <div key={item.id} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-sm font-medium">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className={item.color} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Deadlines and important dates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3">
                  <div className={`rounded-full p-2 ${
                    event.type === 'assignment' ? 'bg-blue-100 text-blue-500' :
                    event.type === 'exam' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-500'
                  }`}>
                    {event.type === 'assignment' ? <FileText className="h-4 w-4" /> :
                     event.type === 'exam' ? <GraduationCap className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{event.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {event.time}
                    </p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2" size="sm">
                <Calendar className="mr-2 h-4 w-4" />
                View All Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest learning activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="rounded-full bg-muted p-2">
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>To-Do List</CardTitle>
            <CardDescription>Tasks that need your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {timelineItems.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'due' ? 'bg-red-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                    {item.badge && (
                      <span className="inline-block text-xs bg-red-100 text-red-800 rounded-full px-2 py-0.5 mt-1">{item.badge}</span>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2" size="sm">
                <Clock className="mr-2 h-4 w-4" />
                Manage Tasks
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personalized Recommendations</CardTitle>
            <CardDescription>Based on your profile and goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-3 bg-muted/30">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">Advanced Data Structures Course</p>
                    <p className="text-xs text-muted-foreground mt-1">Recommended based on your coding interests</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-3 bg-muted/30">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">Google Summer Internship</p>
                    <p className="text-xs text-muted-foreground mt-1">Application deadline in 5 days</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="border rounded-lg p-3 bg-muted/30">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">CodeJam Hackathon</p>
                    <p className="text-xs text-muted-foreground mt-1">Register by Oct 30th</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <Button variant="outline" className="w-full" size="sm">
                <TrendingUp className="mr-2 h-4 w-4" />
                More Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Learning Analytics</CardTitle>
          <CardDescription>Insights from your learning activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-medium">Strong Areas</h3>
              <ul className="mt-2 space-y-1">
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Data Structures & Algorithms
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Object-Oriented Programming
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Web Development
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Areas to Improve</h3>
              <ul className="mt-2 space-y-1">
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Database Management
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  System Design
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  Machine Learning Fundamentals
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium">Recommended Actions</h3>
              <ul className="mt-2 space-y-1">
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Complete SQL tutorial
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Join system design study group
                </li>
                <li className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  Watch recommended ML videos
                </li>
              </ul>
            </div>
          </div>
          
          <Button className="mt-6">
            <BarChart className="mr-2 h-4 w-4" />
            View Detailed Analytics
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
