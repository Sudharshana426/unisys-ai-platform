
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Calendar as CalendarIcon, LineChart, Play, RefreshCw, Settings, Pause, Volume2, VolumeX } from "lucide-react";

const timerModes = [
  { id: 'focus', name: 'Focus', duration: 25 * 60, color: 'bg-primary' },
  { id: 'shortBreak', name: 'Short Break', duration: 5 * 60, color: 'bg-green-500' },
  { id: 'longBreak', name: 'Long Break', duration: 15 * 60, color: 'bg-blue-500' }
];

const taskCategories = [
  { id: 'study', name: 'Study', color: 'bg-primary' },
  { id: 'work', name: 'Work', color: 'bg-amber-500' },
  { id: 'personal', name: 'Personal', color: 'bg-green-500' }
];

const focusHistory = [
  { date: '2023-07-15', focusSessions: 8, totalMinutes: 200 },
  { date: '2023-07-14', focusSessions: 6, totalMinutes: 150 },
  { date: '2023-07-13', focusSessions: 5, totalMinutes: 125 },
  { date: '2023-07-12', focusSessions: 7, totalMinutes: 175 },
  { date: '2023-07-11', focusSessions: 4, totalMinutes: 100 }
];

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const Pomodoro = () => {
  const [activeMode, setActiveMode] = useState(timerModes[0]);
  const [timeRemaining, setTimeRemaining] = useState(timerModes[0].duration);
  const [isRunning, setIsRunning] = useState(false);
  const [currentTask, setCurrentTask] = useState('Working on Data Structures assignment');
  const [muted, setMuted] = useState(false);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (isRunning && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsRunning(false);
      if (activeMode.id === 'focus') {
        setCompletedPomodoros(prev => prev + 1);
      }
      // Play sound if not muted
      if (!muted) {
        // Play sound logic would go here
      }
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeRemaining, activeMode.id, muted]);
  
  const handleModeChange = (mode: typeof timerModes[number]) => {
    setActiveMode(mode);
    setTimeRemaining(mode.duration);
    setIsRunning(false);
  };
  
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };
  
  const resetTimer = () => {
    setTimeRemaining(activeMode.duration);
    setIsRunning(false);
  };
  
  // Calculate progress percentage
  const progressPercentage = ((activeMode.duration - timeRemaining) / activeMode.duration) * 100;
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Pomodoro Timer</h1>
          <p className="text-muted-foreground">Focus on your work using the Pomodoro technique</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setMuted(!muted)}>
            {muted ? <VolumeX className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
            {muted ? 'Unmute' : 'Mute'}
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="timer">
        <TabsList className="mb-4">
          <TabsTrigger value="timer">Timer</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="timer">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <Card className="relative overflow-hidden">
                <div 
                  className={`absolute bottom-0 left-0 h-1 transition-all ${activeMode.color}`} 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
                <CardHeader className="text-center">
                  <CardTitle>{activeMode.name} Session</CardTitle>
                  <CardDescription>{currentTask}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6">
                  <div className="text-6xl font-bold my-8">
                    {formatTime(timeRemaining)}
                  </div>
                  
                  <div className="flex gap-3">
                    {timerModes.map((mode) => (
                      <Button 
                        key={mode.id} 
                        variant={activeMode.id === mode.id ? "default" : "outline"} 
                        onClick={() => handleModeChange(mode)}
                      >
                        {mode.name}
                      </Button>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center space-x-4">
                  <Button onClick={toggleTimer} size="lg">
                    {isRunning ? (
                      <>
                        <Pause className="mr-2 h-5 w-5" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-5 w-5" />
                        Start
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={resetTimer} size="lg">
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Reset
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Today's Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">{completedPomodoros}</p>
                        <p className="text-sm text-muted-foreground">Pomodoros Completed</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">{completedPomodoros * 25}</p>
                        <p className="text-sm text-muted-foreground">Minutes Focused</p>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <p className="text-2xl font-bold">2/5</p>
                        <p className="text-sm text-muted-foreground">Tasks Completed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Current Task</CardTitle>
                  <CardDescription>What are you working on?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea 
                    value={currentTask}
                    onChange={(e) => setCurrentTask(e.target.value)}
                    placeholder="Describe your current task..." 
                    className="min-h-[100px]"
                  />
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Task Category:</p>
                    <div className="flex flex-wrap gap-2">
                      {taskCategories.map((category) => (
                        <Badge key={category.id} variant="outline" className="cursor-pointer">
                          <div className={`w-2 h-2 rounded-full ${category.color} mr-2`}></div>
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Estimated Pomodoros:</p>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">-</Button>
                      <span className="font-medium">4</span>
                      <Button variant="outline" size="sm">+</Button>
                      <span className="text-sm text-muted-foreground ml-2">(100 minutes)</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Save Task
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="h-5 w-5 mr-2" />
                    Timer Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="focusLength">Focus Length (minutes)</Label>
                    <Input id="focusLength" type="number" defaultValue="25" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="shortBreak">Short Break (minutes)</Label>
                    <Input id="shortBreak" type="number" defaultValue="5" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="longBreak">Long Break (minutes)</Label>
                    <Input id="longBreak" type="number" defaultValue="15" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="autoStart">Auto-start Breaks</Label>
                    <div className="flex h-6 w-11 items-center rounded-full bg-primary p-1">
                      <div className="h-4 w-4 ml-auto rounded-full bg-white"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="tasks">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Task List</CardTitle>
                    <CardDescription>Tasks for today and upcoming days</CardDescription>
                  </div>
                  <Button size="sm">
                    Add Task
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <div>
                            <h4 className="font-medium">Complete Data Structures Assignment</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                Study
                              </Badge>
                              <span>4 Pomodoros</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <div>
                            <h4 className="font-medium">Review Machine Learning Lecture Notes</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                Study
                              </Badge>
                              <span>3 Pomodoros</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" />
                          <div>
                            <h4 className="font-medium">Fix Bug in Team Project Frontend</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                                Work
                              </Badge>
                              <span>2 Pomodoros</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" checked />
                          <div>
                            <h4 className="font-medium line-through text-muted-foreground">Update Resume</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                Personal
                              </Badge>
                              <span>2 Pomodoros</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-3" checked />
                          <div>
                            <h4 className="font-medium line-through text-muted-foreground">Prepare for Team Meeting</h4>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                              <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                                Work
                              </Badge>
                              <span>1 Pomodoro</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border w-full pointer-events-auto"
                  />
                  
                  <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Task Distribution</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                            Study
                          </span>
                          <span>7 Pomodoros</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full mt-1">
                          <div className="h-full bg-primary rounded-full" style={{ width: '58%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                            Work
                          </span>
                          <span>3 Pomodoros</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full mt-1">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                            Personal
                          </span>
                          <span>2 Pomodoros</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full mt-1">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '17%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Add New Task</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="task-name">Task Name</Label>
                      <Input id="task-name" placeholder="Enter task name..." />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1">Study</Button>
                        <Button variant="outline" className="flex-1">Work</Button>
                        <Button variant="outline" className="flex-1">Personal</Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Estimated Pomodoros</Label>
                      <div className="flex items-center gap-2">
                        <Input type="number" defaultValue="1" min="1" className="w-16" />
                        <span className="text-sm text-muted-foreground">(25 minutes each)</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Due Date</Label>
                      <div className="flex items-center relative">
                        <CalendarIcon className="absolute left-2 h-4 w-4 text-muted-foreground" />
                        <Input className="pl-8" placeholder="Select date..." />
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full">Add Task</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="stats">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <LineChart className="h-5 w-5 mr-2" />
                    Focus Time History
                  </CardTitle>
                  <CardDescription>Your productivity trends over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80 flex items-end gap-3 pt-4">
                    {focusHistory.map((day, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-muted rounded-t flex flex-col">
                          <div
                            className="w-full bg-primary rounded-t"
                            style={{ height: `${(day.totalMinutes / 250) * 200}px` }}
                          ></div>
                        </div>
                        <div className="text-xs mt-2">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Focus Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded">
                            <CalendarIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Today</p>
                            <p className="text-2xl font-bold mt-1">{completedPomodoros} sessions</p>
                            <p className="text-sm text-muted-foreground mt-1">{completedPomodoros * 25} minutes</p>
                          </div>
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded">
                            <CalendarIcon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">This Week</p>
                            <p className="text-2xl font-bold mt-1">30 sessions</p>
                            <p className="text-sm text-muted-foreground mt-1">750 minutes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h3 className="font-medium mb-3">Most Productive Days</h3>
                      <div className="grid grid-cols-7 gap-2">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                          <div key={index} className="text-center">
                            <div className="text-xs text-muted-foreground">{day}</div>
                            <div className="h-16 bg-muted rounded-md mt-2 relative">
                              <div 
                                className="absolute bottom-0 left-0 w-full bg-primary rounded-b-md"
                                style={{ height: `${[60, 80, 40, 90, 75, 30, 20][index]}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Focus Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Focus Time</span>
                      <span className="font-medium">42.5 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Focus Sessions</span>
                      <span className="font-medium">102 sessions</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Daily Average</span>
                      <span className="font-medium">85 minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Most Productive Day</span>
                      <span className="font-medium">Thursday</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current Streak</span>
                      <span className="font-medium">5 days</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Longest Streak</span>
                      <span className="font-medium">12 days</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <h3 className="text-sm font-medium mb-2">Task Completion</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tasks Completed</span>
                        <span className="font-medium">48</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Completion Rate</span>
                        <span className="font-medium">82%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <h3 className="text-sm font-medium mb-2">Category Breakdown</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Study</span>
                          <span>48%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full mt-1">
                          <div className="h-full bg-primary rounded-full" style={{ width: '48%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Work</span>
                          <span>35%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full mt-1">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: '35%' }}></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Personal</span>
                          <span>17%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full mt-1">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: '17%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Focus Goals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Daily Focus Time</h4>
                        <Badge variant="outline">85/120 mins</Badge>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: '70%' }}></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">70% of daily goal achieved</p>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Weekly Focus Sessions</h4>
                        <Badge variant="outline">30/40 sessions</Badge>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">75% of weekly goal achieved</p>
                    </div>
                    
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Study Tasks</h4>
                        <Badge variant="outline">15/20 completed</Badge>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: '75%' }}></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">75% of study tasks completed</p>
                    </div>
                    
                    <Button className="w-full">Set New Goals</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pomodoro;
