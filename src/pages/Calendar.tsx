
import React, { useState } from 'react';
import { Calendar as CalendarIcon, FilePlus, Filter, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Sample data for calendar events
const events = [
  {
    id: 1,
    title: "Data Structures Assignment",
    date: new Date(2023, 6, 15),
    time: "11:59 PM",
    category: "Assignment",
    course: "CS3001",
    completed: false
  },
  {
    id: 2,
    title: "Machine Learning Quiz",
    date: new Date(2023, 6, 18),
    time: "10:00 AM",
    category: "Quiz",
    course: "CS4001",
    completed: false
  },
  {
    id: 3,
    title: "Project Team Meeting",
    date: new Date(2023, 6, 12),
    time: "3:30 PM",
    category: "Meeting",
    course: "CS4006",
    completed: true
  },
  {
    id: 4,
    title: "Cloud Computing Exam",
    date: new Date(2023, 6, 28),
    time: "1:00 PM",
    category: "Exam",
    course: "CS4002",
    completed: false
  },
  {
    id: 5,
    title: "Resume Workshop",
    date: new Date(2023, 6, 20),
    time: "5:00 PM",
    category: "Workshop",
    course: null,
    completed: false
  }
];

const tasks = [
  {
    id: 1,
    title: "Complete ML assignment on Neural Networks",
    priority: "high",
    deadline: "Today",
    completed: false
  },
  {
    id: 2,
    title: "Review lecture notes on Database Normalization",
    priority: "medium",
    deadline: "Tomorrow",
    completed: false
  },
  {
    id: 3,
    title: "Submit internship application to Google",
    priority: "high",
    deadline: "July 15",
    completed: true
  },
  {
    id: 4,
    title: "Prepare presentation for capstone project",
    priority: "medium",
    deadline: "July 20",
    completed: false
  },
  {
    id: 5,
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
          <TabsTrigger value="sync">Account Sync</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full pointer-events-auto"
                  />
                  
                  <div className="mt-4 space-y-1">
                    <h3 className="text-sm font-medium">Categories</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Assignments</Badge>
                      <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Quizzes</Badge>
                      <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Exams</Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Meetings</Badge>
                      <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Workshops</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-1">
                    <h3 className="text-sm font-medium">Courses</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="secondary">CS3001</Badge>
                      <Badge variant="secondary">CS4001</Badge>
                      <Badge variant="secondary">CS4002</Badge>
                      <Badge variant="secondary">CS4003</Badge>
                      <Badge variant="secondary">CS4006</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>July 2023</CardTitle>
                    <CardDescription>Upcoming events and deadlines</CardDescription>
                  </div>
                  <Button size="sm" variant="outline">
                    <FilePlus className="mr-2 h-4 w-4" />
                    Add Event
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {events.map((event) => (
                      <div key={event.id} className="flex gap-4 border-b pb-4 last:border-0">
                        <div className="w-16 h-16 flex flex-col items-center justify-center rounded-md border">
                          <span className="text-sm text-muted-foreground">{event.date.toLocaleString('default', { month: 'short' })}</span>
                          <span className="text-xl font-bold">{event.date.getDate()}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{event.title}</h3>
                            {getCategoryBadge(event.category)}
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            <span>Due {event.date.toLocaleDateString()} at {event.time}</span>
                            {event.course && (
                              <span className="ml-2">• Course: {event.course}</span>
                            )}
                          </div>
                          <div className="mt-2 flex items-center">
                            <Checkbox id={`event-${event.id}`} checked={event.completed} />
                            <label 
                              htmlFor={`event-${event.id}`} 
                              className={`ml-2 text-sm ${event.completed ? 'line-through text-muted-foreground' : ''}`}
                            >
                              Mark as completed
                            </label>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm" variant="ghost" className="text-red-500">Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
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
                        <CalendarIcon className="absolute left-2 h-4 w-4 text-muted-foreground" />
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
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Weekly Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                      <div key={day} className="text-center p-2">
                        <div className="font-medium text-sm">{day}</div>
                        <div className="h-24 border rounded-md mt-2 flex flex-col items-center justify-center">
                          {day === 'Mon' && (
                            <div className="text-xs bg-blue-50 text-blue-600 p-1 m-1 w-full text-center rounded">2 tasks</div>
                          )}
                          {day === 'Wed' && (
                            <div className="text-xs bg-purple-50 text-purple-600 p-1 m-1 w-full text-center rounded">1 quiz</div>
                          )}
                          {day === 'Thu' && (
                            <div className="text-xs bg-green-50 text-green-600 p-1 m-1 w-full text-center rounded">Meeting</div>
                          )}
                          {day === 'Fri' && (
                            <div className="text-xs bg-red-50 text-red-600 p-1 m-1 w-full text-center rounded">Deadline</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sync">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Sync your calendars and tasks with other platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-red-100 rounded">
                        <svg className="h-5 w-5 text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.5 12.5C21.5 16.92 18.13 20.5 12.5 20.5C6.87 20.5 3.5 16.92 3.5 12.5C3.5 8.08 6.87 4.5 12.5 4.5C18.13 4.5 21.5 8.08 21.5 12.5Z" fill="currentColor" fillOpacity="0.4"/>
                          <path d="M9 12.75H13.5C14.33 12.75 15 12.08 15 11.25C15 10.42 14.33 9.75 13.5 9.75H9V12.75Z" fill="currentColor"/>
                          <path d="M13.5 6H10.5V9.75H13.5C14.33 9.75 15 9.08 15 8.25V7.5C15 6.67 14.33 6 13.5 6Z" fill="currentColor"/>
                          <path d="M9 12.75V16.5H13.5C14.33 16.5 15 15.83 15 15V14.25C15 13.42 14.33 12.75 13.5 12.75H9Z" fill="currentColor"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Google Calendar</p>
                        <p className="text-sm text-muted-foreground">Synced 2 hours ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded">
                        <svg className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21 7V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V7C3 4 4.5 2 8 2H16C19.5 2 21 4 21 7Z" fill="currentColor" fillOpacity="0.4"/>
                          <path d="M14.5 4.5V6.5C14.5 7.6 15.4 8.5 16.5 8.5H18.5" fill="currentColor" fillOpacity="0.4"/>
                          <path d="M8 13H12" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 17H16" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Microsoft Outlook</p>
                        <p className="text-sm text-muted-foreground">Synced 1 day ago</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Manage</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border border-dashed rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center bg-muted rounded">
                        <svg className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3.5 9.09H20.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15.6947 13.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M15.6947 16.7H15.7037" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.9955 13.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M11.9955 16.7H12.0045" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.29431 13.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8.29431 16.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Apple Calendar</p>
                        <p className="text-sm text-muted-foreground">Not connected</p>
                      </div>
                    </div>
                    <Button size="sm">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sync Settings</CardTitle>
                <CardDescription>Configure how your calendar data is synchronized</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-sync calendar events</p>
                      <p className="text-sm text-muted-foreground">Automatically update events across all platforms</p>
                    </div>
                    <div className="flex h-6 w-11 items-center rounded-full bg-primary p-1">
                      <div className="h-4 w-4 rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Import academic calendar</p>
                      <p className="text-sm text-muted-foreground">Sync university events and course schedules</p>
                    </div>
                    <div className="flex h-6 w-11 items-center rounded-full bg-primary p-1">
                      <div className="h-4 w-4 ml-auto rounded-full bg-white"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Sync task deadlines</p>
                      <p className="text-sm text-muted-foreground">Show task deadlines in your calendar</p>
                    </div>
                    <div className="flex h-6 w-11 items-center rounded-full bg-muted p-1">
                      <div className="h-4 w-4 rounded-full bg-muted-foreground"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notification settings</p>
                      <p className="text-sm text-muted-foreground">Configure reminder notifications for events</p>
                    </div>
                    <Button variant="outline" size="sm">Configure</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Save Preferences</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CalendarPage;
