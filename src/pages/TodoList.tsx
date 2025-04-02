
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2, Search, Plus, CheckCircle, Clock, CalendarRange, Filter } from "lucide-react";
import AddTaskModal from '@/components/todo/AddTaskModal';

// Initial sample tasks
const initialTasks = [
  {
    id: 1,
    title: "Complete Machine Learning Assignment",
    description: "Finish the neural network implementation for CS4001",
    priority: "high",
    category: "academic",
    dueDate: "Sep 30, 2023",
    completed: false,
    createdAt: "2023-09-25T10:00:00Z"
  },
  {
    id: 2,
    title: "Prepare for Technical Interview",
    description: "Review data structures and algorithms for Google interview",
    priority: "high",
    category: "professional",
    dueDate: "Oct 5, 2023",
    completed: false,
    createdAt: "2023-09-26T14:30:00Z"
  },
  {
    id: 3,
    title: "Submit Research Paper Draft",
    description: "Send the first draft to Professor Kumar for review",
    priority: "medium",
    category: "academic",
    dueDate: "Oct 10, 2023",
    completed: false,
    createdAt: "2023-09-27T09:15:00Z"
  },
  {
    id: 4,
    title: "Update Resume",
    description: "Add recent projects and certifications to resume",
    priority: "low",
    category: "professional",
    dueDate: "Oct 15, 2023",
    completed: true,
    createdAt: "2023-09-28T16:45:00Z"
  },
  {
    id: 5,
    title: "Complete MOOC Course",
    description: "Finish the remaining lectures for AWS certification course",
    priority: "medium",
    category: "personal",
    dueDate: "Oct 20, 2023",
    completed: true,
    createdAt: "2023-09-29T11:20:00Z"
  }
];

// Priority colors
const priorityColors: Record<string, string> = {
  high: "bg-red-100 text-red-800 border-red-200",
  medium: "bg-amber-100 text-amber-800 border-amber-200",
  low: "bg-green-100 text-green-800 border-green-200"
};

// Category icons
const categoryIcons: Record<string, React.ReactNode> = {
  academic: <CheckCircle className="h-4 w-4" />,
  professional: <Clock className="h-4 w-4" />,
  personal: <CalendarRange className="h-4 w-4" />
};

const TodoList = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);
  
  // Save tasks to localStorage when they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  
  const handleAddTask = (newTask: any) => {
    setTasks([newTask, ...tasks]);
  };
  
  const handleToggleComplete = (taskId: number) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };
  
  const handleDeleteTask = (taskId: number) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };
  
  const filteredTasks = tasks.filter(task => {
    // Text search
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Priority filter
    const matchesPriority = filterPriority === "all" || task.priority === filterPriority;
    
    // Category filter
    const matchesCategory = filterCategory === "all" || task.category === filterCategory;
    
    return matchesSearch && matchesPriority && matchesCategory;
  });
  
  const pendingTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);
  
  // Function to render a single task
  const renderTask = (task: any) => (
    <div key={task.id} className="flex items-start gap-3 py-4 border-b last:border-b-0">
      <Checkbox 
        checked={task.completed} 
        onCheckedChange={() => handleToggleComplete(task.id)} 
        className="mt-1"
      />
      
      <div className="flex-1">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className={`font-medium text-base ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
            {task.title}
          </h3>
          <div className="flex gap-2 mt-1 md:mt-0">
            <Badge className={`${priorityColors[task.priority]} border`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </Badge>
            
            <Badge variant="outline">
              {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
            </Badge>
          </div>
        </div>
        
        {task.description && (
          <p className={`text-sm mt-1 ${task.completed ? 'text-muted-foreground line-through' : 'text-muted-foreground'}`}>
            {task.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-2">
          <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={() => handleDeleteTask(task.id)}
          >
            <Trash2 className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">To-Do List</h1>
          <p className="text-muted-foreground">Manage and track your tasks</p>
        </div>
        
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </Button>
      </div>
      
      <Card className="border-none shadow-none bg-muted/40">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search tasks..." 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-4">
            <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center">
              <span className="font-medium mr-1">Total:</span> {tasks.length}
            </div>
            <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center">
              <span className="font-medium mr-1">Pending:</span> {tasks.filter(t => !t.completed).length}
            </div>
            <div className="bg-white px-3 py-1 rounded-full text-sm flex items-center">
              <span className="font-medium mr-1">Completed:</span> {tasks.filter(t => t.completed).length}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingTasks.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedTasks.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardContent className="p-6">
              {pendingTasks.length > 0 ? (
                <div className="divide-y">
                  {pendingTasks.map(renderTask)}
                </div>
              ) : (
                <div className="text-center py-10">
                  <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">All caught up!</h3>
                  <p className="text-muted-foreground mt-1">You don't have any pending tasks.</p>
                  <Button className="mt-4" onClick={() => setIsAddModalOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Task
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="completed">
          <Card>
            <CardContent className="p-6">
              {completedTasks.length > 0 ? (
                <div className="divide-y">
                  {completedTasks.map(renderTask)}
                </div>
              ) : (
                <div className="text-center py-10">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium">No completed tasks yet</h3>
                  <p className="text-muted-foreground mt-1">
                    Your completed tasks will appear here.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <AddTaskModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTask}
      />
    </div>
  );
};

export default TodoList;
