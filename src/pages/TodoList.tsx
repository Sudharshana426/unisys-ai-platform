import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check, Clock, Download, Filter, Plus, Search, Trash2, CalendarIcon } from "lucide-react";

const initialTasks = [
  {
    id: 1,
    title: "Complete Machine Learning Assignment",
    description: "Implement neural network for image classification",
    priority: "high",
    category: "Academics",
    dueDate: "2023-07-18",
    completed: false,
    tags: ["ML", "Python", "Assignment"]
  },
  {
    id: 2,
    title: "Prepare for Technical Interview",
    description: "Review data structures and algorithms",
    priority: "high",
    category: "Career",
    dueDate: "2023-07-20",
    completed: false,
    tags: ["DSA", "Interview", "Prep"]
  },
  {
    id: 3,
    title: "Update Resume",
    description: "Add recent projects and internship experience",
    priority: "medium",
    category: "Personal",
    dueDate: "2023-07-25",
    completed: true,
    tags: ["Resume", "Career"]
  },
  {
    id: 4,
    title: "Attend Web Development Workshop",
    description: "Online workshop on React and Next.js",
    priority: "medium",
    category: "Academics",
    dueDate: "2023-07-19",
    completed: false,
    tags: ["React", "Workshop"]
  },
  {
    id: 5,
    title: "Read Research Paper",
    description: "Read 'Attention is All You Need' paper on transformers",
    priority: "low",
    category: "Research",
    dueDate: "2023-07-30",
    completed: false,
    tags: ["Research", "NLP"]
  },
  {
    id: 6,
    title: "Weekly Team Meeting",
    description: "Discuss progress on capstone project",
    priority: "high",
    category: "Team",
    dueDate: "2023-07-17",
    completed: true,
    tags: ["Meeting", "Project"]
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
    case "Academics":
      return <Badge className="bg-primary/80 hover:bg-primary/80">{category}</Badge>;
    case "Career":
      return <Badge className="bg-green-500 hover:bg-green-600">{category}</Badge>;
    case "Personal":
      return <Badge className="bg-purple-500 hover:bg-purple-600">{category}</Badge>;
    case "Research":
      return <Badge className="bg-blue-500 hover:bg-blue-600">{category}</Badge>;
    case "Team":
      return <Badge className="bg-amber-500 hover:bg-amber-600">{category}</Badge>;
    default:
      return <Badge variant="outline">{category}</Badge>;
  }
};

const TodoList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter tasks based on completion status and search query
  const filterTasks = (completed: boolean) => {
    return tasks.filter(task => {
      const matchesCompletion = task.completed === completed;
      const matchesSearch = searchQuery === "" || task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            task.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            task.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCompletion && matchesSearch;
    });
  };
  
  const pendingTasks = filterTasks(false);
  const completedTasks = filterTasks(true);
  
  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">To-Do List</h1>
          <p className="text-muted-foreground">Organize and manage your tasks effectively</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search tasks..."
            className="pl-8" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="academics">Academics</SelectItem>
            <SelectItem value="career">Career</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="research">Research</SelectItem>
            <SelectItem value="team">Team</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <Tabs defaultValue="pending">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">
            Pending ({pendingTasks.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedTasks.length})
          </TabsTrigger>
          <TabsTrigger value="all">All Tasks</TabsTrigger>
          <TabsTrigger value="add">Add New Task</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Tasks</CardTitle>
                  <CardDescription>Tasks waiting to be completed</CardDescription>
                </CardHeader>
                <CardContent>
                  {pendingTasks.length > 0 ? (
                    <div className="space-y-4">
                      {pendingTasks.map((task) => (
                        <div key={task.id} className="p-4 border rounded-lg">
                          <div className="flex items-start gap-3">
                            <Checkbox 
                              id={`task-${task.id}`} 
                              checked={task.completed}
                              onCheckedChange={() => toggleTaskStatus(task.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <label 
                                    htmlFor={`task-${task.id}`} 
                                    className="font-medium cursor-pointer"
                                  >
                                    {task.title}
                                  </label>
                                  <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
                                </div>
                                <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                              </div>
                              
                              <div className="flex flex-wrap items-center gap-2 mt-3">
                                {getCategoryBadge(task.category)}
                                <div className="flex items-center">
                                  <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mt-2">
                                {task.tags.map((tag, idx) => (
                                  <span key={idx} className="text-xs bg-muted px-2 py-1 rounded-md">{tag}</span>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">Edit</Button>
                              <Button size="sm" variant="ghost" className="text-red-500">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <Check className="h-12 w-12 text-green-500 mx-auto mb-4" />
                      <h3 className="text-xl font-medium mb-2">All caught up!</h3>
                      <p className="text-muted-foreground mb-4">You have no pending tasks.</p>
                      <Button>Add a new task</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Task Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">{tasks.length}</p>
                        <p className="text-sm text-muted-foreground">Total Tasks</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">{pendingTasks.length}</p>
                        <p className="text-sm text-muted-foreground">Pending</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">{completedTasks.length}</p>
                        <p className="text-sm text-muted-foreground">Completed</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">{tasks.filter(t => t.priority === 'high').length}</p>
                        <p className="text-sm text-muted-foreground">High Priority</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Category Distribution</h3>
                      <div className="space-y-2">
                        {['Academics', 'Career', 'Personal', 'Research', 'Team'].map((category) => {
                          const count = tasks.filter(t => t.category === category).length;
                          const percentage = count / tasks.length * 100;
                          return (
                            <div key={category}>
                              <div className="flex justify-between text-sm">
                                <span>{category}</span>
                                <span>{count} tasks</span>
                              </div>
                              <div className="w-full h-2 bg-secondary rounded-full mt-1">
                                <div 
                                  className="h-full bg-primary rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export Tasks
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Due Soon</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full pointer-events-auto"
                  />
                  
                  <div className="mt-4 space-y-2">
                    <h3 className="text-sm font-medium">Tasks Due Today</h3>
                    <div className="p-3 border rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                          <span className="text-sm font-medium">Team Meeting</span>
                        </div>
                        <Badge variant="outline">Team</Badge>
                      </div>
                    </div>
                    
                    <h3 className="text-sm font-medium mt-4">Tomorrow</h3>
                    <div className="p-3 border rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                          <span className="text-sm font-medium">Web Development Workshop</span>
                        </div>
                        <Badge variant="outline">Academics</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>Completed Tasks</CardTitle>
              <CardDescription>Tasks you have already finished</CardDescription>
            </CardHeader>
            <CardContent>
              {completedTasks.length > 0 ? (
                <div className="space-y-4">
                  {completedTasks.map((task) => (
                    <div key={task.id} className="p-4 border border-dashed rounded-lg bg-muted/50">
                      <div className="flex items-start gap-3">
                        <Checkbox 
                          id={`task-${task.id}`} 
                          checked={task.completed}
                          onCheckedChange={() => toggleTaskStatus(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <label 
                                htmlFor={`task-${task.id}`} 
                                className="font-medium line-through text-muted-foreground"
                              >
                                {task.title}
                              </label>
                              <p className="text-sm text-muted-foreground line-through mt-1">{task.description}</p>
                            </div>
                            <div className={`w-3 h-3 rounded-full bg-gray-400`}></div>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            <Badge variant="outline">{task.category}</Badge>
                            <div className="flex items-center">
                              <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
                              <span className="text-xs text-muted-foreground">Completed</span>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-1 mt-2">
                            {task.tags.map((tag, idx) => (
                              <span key={idx} className="text-xs bg-muted px-2 py-1 rounded-md">{tag}</span>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <Button size="sm" variant="ghost" className="text-red-500">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-8">
                  <h3 className="text-xl font-medium mb-2">No completed tasks yet</h3>
                  <p className="text-muted-foreground">Complete some tasks to see them here.</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="text-red-500">Clear Completed</Button>
              <Button variant="outline">Archive Tasks</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>View and manage all your tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`p-4 border rounded-lg ${task.completed ? 'border-dashed bg-muted/50' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id={`all-task-${task.id}`} 
                        checked={task.completed}
                        onCheckedChange={() => toggleTaskStatus(task.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <label 
                              htmlFor={`all-task-${task.id}`} 
                              className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                            >
                              {task.title}
                            </label>
                            <p className={`text-sm text-muted-foreground mt-1 ${task.completed ? 'line-through' : ''}`}>
                              {task.description}
                            </p>
                          </div>
                          <div className={`w-3 h-3 rounded-full ${task.completed ? 'bg-gray-400' : getPriorityColor(task.priority)}`}></div>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-2 mt-3">
                          {getCategoryBadge(task.category)}
                          <div className="flex items-center">
                            {task.completed ? (
                              <>
                                <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
                                <span className="text-xs text-muted-foreground">Completed</span>
                              </>
                            ) : (
                              <>
                                <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-2">
                          {task.tags.map((tag, idx) => (
                            <span key={idx} className="text-xs bg-muted px-2 py-1 rounded-md">{tag}</span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="ghost" className="text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Task</CardTitle>
              <CardDescription>Create a new task with details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input id="title" placeholder="Enter task title..." />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Enter task description..." className="min-h-[100px]" />
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="academics">Academics</SelectItem>
                        <SelectItem value="career">Career</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                        <SelectItem value="team">Team</SelectItem>
                      </SelectContent>
                    </Select>
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
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <div className="flex items-center relative">
                      <CalendarIcon className="absolute left-2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        id="due-date"
                        type="date"
                        className="pl-8"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" placeholder="e.g. Python, Assignment, ML" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reminder">Set Reminder</Label>
                  <div className="flex gap-2">
                    <div className="flex items-center">
                      <input type="checkbox" id="reminder" className="mr-2" />
                      <label htmlFor="reminder" className="text-sm">Enable reminder</label>
                    </div>
                    <Input 
                      type="time"
                      className="w-32 ml-auto"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Add Task</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TodoList;
