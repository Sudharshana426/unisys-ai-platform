import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, FilePlus, Filter, Plus, RefreshCw, AlertCircle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format, formatDistanceToNow } from 'date-fns';
import { useLocation } from 'react-router-dom';

// Define the LocalCalendarEvent interface
interface LocalCalendarEvent {
  id: string;
  title: string;
  date: Date;
  time: string;
  category: string;
  course?: string;
  completed: boolean;
  description?: string;
}

// Sample data for calendar events
const initialEvents: LocalCalendarEvent[] = [
  {
    id: "1",
    title: "Data Structures Assignment",
    date: new Date(2023, 6, 15),
    time: "11:59 PM",
    category: "Assignment",
    course: "CS3001",
    completed: false,
    description: "Complete the implementation of binary search trees"
  },
  {
    id: "2",
    title: "Machine Learning Quiz",
    date: new Date(2023, 6, 18),
    time: "10:00 AM",
    category: "Quiz",
    course: "CS4001",
    completed: false,
    description: "Covering neural networks and backpropagation"
  },
  {
    id: "3",
    title: "Project Team Meeting",
    date: new Date(2023, 6, 12),
    time: "3:30 PM",
    category: "Meeting",
    course: "CS4006",
    completed: true,
    description: "Weekly sprint planning and code review"
  },
  {
    id: "4",
    title: "Cloud Computing Exam",
    date: new Date(2023, 6, 28),
    time: "2:00 PM",
    category: "Exam",
    course: "CS4002",
    completed: false,
    description: "Final exam covering cloud architecture and deployment"
  },
  {
    id: "5",
    title: "Resume Workshop",
    date: new Date(2023, 7, 5),
    time: "4:00 PM",
    category: "Workshop",
    completed: false,
    description: "Learn how to create a professional resume"
  }
];

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  completed: boolean;
}

const tasks: Task[] = [
  {
    id: "1",
    title: "Complete ML assignment on Neural Networks",
    priority: "high",
    deadline: "Today",
    completed: false
  },
  {
    id: "2",
    title: "Review lecture notes on Database Normalization",
    priority: "medium",
    deadline: "Tomorrow",
    completed: false
  },
  {
    id: "3",
    title: "Submit internship application to Google",
    priority: "high",
    deadline: "July 15",
    completed: true
  },
  {
    id: "4",
    title: "Prepare presentation for capstone project",
    priority: "medium",
    deadline: "July 20",
    completed: false
  },
  {
    id: "5",
    title: "Debug frontend issue in team project",
    priority: "low",
    deadline: "July 18",
    completed: false
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-amber-500";
    case "low":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

const getCategoryBadge = (category: string) => {
  switch (category) {
    case "Assignment":
      return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Assignment</Badge>;
    case "Quiz":
      return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Quiz</Badge>;
    case "Exam":
      return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Exam</Badge>;
    case "Meeting":
      return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Meeting</Badge>;
    case "Workshop":
      return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Workshop</Badge>;
    default:
      return <Badge variant="outline">{category}</Badge>;
  }
};

const CalendarPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [events, setEvents] = useState<LocalCalendarEvent[]>(initialEvents);
  const location = useLocation();

  // Check for OAuth callback in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    
    if (code && state) {
      // Verify state to prevent CSRF attacks
      const savedState = localStorage.getItem('oauth_state');
      if (state === savedState) {
        // Clear the state from localStorage
        localStorage.removeItem('oauth_state');
        
        // Handle the OAuth callback
        handleOAuthCallback(code);
        
        // Remove the code and state from the URL
        const newUrl = window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      }
    }
  }, [location]);

  // Handle OAuth callback
  const handleOAuthCallback = async (code: string) => {
    console.log('Handling OAuth callback with code:', code);
    try {
      // Handle OAuth callback logic here
    } catch (error) {
      console.error('Error during OAuth callback:', error);
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return format(date, 'MMMM d, yyyy');
  };

  // Format time distance
  const formatTimeDistance = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Calendar & Tasks</h1>
          <p className="text-muted-foreground">Manage your schedule, assignments, and to-do list</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="calendar">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="tasks">To-Do List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Calendar</CardTitle>
                  <CardDescription>{formatDate(date || new Date())}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="w-full"
                  />
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Add New Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="event-title">Event Title</Label>
                      <Textarea id="event-title" placeholder="Enter event details..." className="min-h-[80px]" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <input type="radio" id="assignment" name="category" className="mr-2" />
                          <label htmlFor="assignment" className="text-sm">Assignment</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="quiz" name="category" className="mr-2" />
                          <label htmlFor="quiz" className="text-sm">Quiz</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="exam" name="category" className="mr-2" />
                          <label htmlFor="exam" className="text-sm">Exam</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="meeting" name="category" className="mr-2" />
                          <label htmlFor="meeting" className="text-sm">Meeting</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="course">Course</Label>
                      <input 
                        type="text" 
                        id="course" 
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                        placeholder="Enter course code" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="due-date">Due Date</Label>
                      <div className="flex items-center relative">
                        <CalendarIcon className="absolute left-3 h-4 w-4 text-muted-foreground" />
                        <input 
                          type="text" 
                          id="due-date" 
                          className="w-full pl-8 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Select a date" 
                        />
                      </div>
                    </div>
                    
                    <Button className="w-full">Add Event</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>Events</CardTitle>
                  <CardDescription>Your upcoming events and deadlines</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {events.map((event) => (
                      <div key={event.id} className="flex items-center gap-4 p-3 border rounded-md">
                        <Checkbox id={`event-${event.id}`} checked={event.completed} />
                        <div className="flex-1">
                          <label 
                            htmlFor={`event-${event.id}`} 
                            className={`${event.completed ? 'line-through text-muted-foreground' : 'font-medium'}`}
                          >
                            {event.title}
                          </label>
                          <div className="flex items-center gap-2 mt-1">
                            <CalendarIcon className="h-3 w-3 text-muted-foreground" />
                            <p className="text-xs text-muted-foreground">
                              {formatDate(event.date)} at {event.time}
                            </p>
                            {event.course && (
                              <>
                                <span className="text-muted-foreground">•</span>
                                <p className="text-xs text-muted-foreground">{event.course}</p>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {getCategoryBadge(event.category)}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button size="sm" variant="ghost" className="text-red-500">Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {events.length} events
                  </div>
                  <Button variant="outline" size="sm">
                    View Completed Events
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Add New Task</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="task-title">Task Description</Label>
                      <Textarea id="task-title" placeholder="Enter task details..." className="min-h-[80px]" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <div className="flex gap-4">
                        <div className="flex items-center">
                          <input type="radio" id="high-priority" name="priority" className="mr-2" />
                          <label htmlFor="high-priority" className="text-sm">High</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="med-priority" name="priority" className="mr-2" />
                          <label htmlFor="med-priority" className="text-sm">Medium</label>
                        </div>
                        <div className="flex items-center">
                          <input type="radio" id="low-priority" name="priority" className="mr-2" />
                          <label htmlFor="low-priority" className="text-sm">Low</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="due-date">Due Date</Label>
                      <div className="flex items-center relative">
                        <CalendarIcon className="absolute left-3 h-4 w-4 text-muted-foreground" />
                        <input 
                          type="text" 
                          id="due-date" 
                          className="w-full pl-8 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Select a date" 
                        />
                      </div>
                    </div>
                    
                    <Button className="w-full">Add Task</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Task Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Tasks</span>
                      <span className="font-bold">{tasks.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Completed</span>
                      <span className="font-bold">{tasks.filter(t => t.completed).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Pending</span>
                      <span className="font-bold">{tasks.filter(t => !t.completed).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>High Priority</span>
                      <span className="font-bold">{tasks.filter(t => t.priority === 'high').length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>To-Do List</CardTitle>
                  <CardDescription>Manage your personal tasks and assignments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {tasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-4 p-3 border rounded-md">
                        <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                        <Checkbox id={`task-${task.id}`} checked={task.completed} />
                        <div className="flex-1">
                          <label 
                            htmlFor={`task-${task.id}`} 
                            className={`${task.completed ? 'line-through text-muted-foreground' : 'font-medium'}`}
                          >
                            {task.title}
                          </label>
                          <p className="text-xs text-muted-foreground mt-1">Due: {task.deadline}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button size="sm" variant="ghost" className="text-red-500">Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    Showing {tasks.length} tasks
                  </div>
                  <Button variant="outline" size="sm">
                    View Completed Tasks
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalendarPage;
