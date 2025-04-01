
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, BookOpen, Clock, Code, MessageCircle, Search, Share2, Star, ThumbsUp, Video } from "lucide-react";

const chatHistory = [
  {
    id: 1,
    sender: "user",
    message: "I'm struggling with understanding recursion in programming. Can you explain it in a simple way?",
    time: "2:30 PM"
  },
  {
    id: 2,
    sender: "ai",
    message: "Of course! Recursion is when a function calls itself to solve smaller instances of the same problem. Think of it like this: to understand recursion, you must first understand recursion 😉\n\nSeriously though, here's a simple example: calculating the factorial of a number.\n\n```python\ndef factorial(n):\n    if n == 0 or n == 1:  # base case\n        return 1\n    else:  # recursive case\n        return n * factorial(n-1)\n```\n\nThe key parts are:\n1. A base case that stops the recursion\n2. A recursive case where the function calls itself with a simpler version of the problem\n\nWould you like me to explain with more examples?",
    time: "2:32 PM"
  },
  {
    id: 3,
    sender: "user",
    message: "That's helpful. Can you give me a real-world example of how recursion is used?",
    time: "2:35 PM"
  },
  {
    id: 4,
    sender: "ai",
    message: "Absolutely! Here are some real-world examples of recursion:\n\n1. **File system traversal**: When you search for files in a directory structure with nested folders, recursion is often used to navigate through each subfolder.\n\n2. **Website crawling**: Search engines use recursion to follow links from one page to another.\n\n3. **Fractal generation**: Those beautiful mathematical patterns are generated using recursive functions.\n\n4. **JSON parsing**: When working with nested JSON objects, recursion helps process nested structures.\n\nHere's a simple example of recursion for listing all files in a directory and its subdirectories:\n\n```python\nimport os\n\ndef list_files(directory):\n    for item in os.listdir(directory):\n        item_path = os.path.join(directory, item)\n        if os.path.isfile(item_path):\n            print(f\"File found: {item_path}\")\n        elif os.path.isdir(item_path):\n            print(f\"Entering directory: {item_path}\")\n            list_files(item_path)  # Recursive call for subdirectory\n```\n\nThis function will recursively explore directories, printing out all the files it finds.",
    time: "2:38 PM"
  }
];

const recommendedResources = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    type: "course",
    source: "Coursera",
    duration: "8 weeks",
    rating: 4.8,
    relevance: "high"
  },
  {
    id: 2,
    title: "Data Structures and Algorithms",
    type: "book",
    source: "O'Reilly Media",
    author: "Michael T. Goodrich",
    rating: 4.7,
    relevance: "high"
  },
  {
    id: 3,
    title: "Understanding JavaScript Promises",
    type: "tutorial",
    source: "MDN Web Docs",
    duration: "45 minutes",
    rating: 4.5,
    relevance: "medium"
  },
  {
    id: 4,
    title: "Building RESTful APIs with Node.js",
    type: "video",
    source: "YouTube",
    duration: "1.5 hours",
    rating: 4.9,
    relevance: "medium"
  }
];

const AIGuidance = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">AI Guidance</h1>
          <p className="text-muted-foreground">Your personal AI learning assistant and guidance system</p>
        </div>
      </div>
      
      <Tabs defaultValue="conversation">
        <TabsList className="mb-4">
          <TabsTrigger value="conversation">Conversation</TabsTrigger>
          <TabsTrigger value="resources">Learning Resources</TabsTrigger>
          <TabsTrigger value="diagnostics">Diagnostic Test</TabsTrigger>
        </TabsList>
        
        <TabsContent value="conversation">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Topics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="bg-muted p-3 rounded-md cursor-pointer hover:bg-muted/80">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Understanding Recursion</p>
                      <Badge>Active</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Last message: 5 minutes ago</p>
                  </div>
                  
                  <div className="p-3 rounded-md cursor-pointer hover:bg-muted/50">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">Database Normalization</p>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">5 messages</p>
                  </div>
                  
                  <div className="p-3 rounded-md cursor-pointer hover:bg-muted/50">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">React Hooks</p>
                      <span className="text-xs text-muted-foreground">1 week ago</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">12 messages</p>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    New Conversation
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Learning Modes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="bg-muted p-3 rounded-md cursor-pointer hover:bg-muted/80">
                    <p className="font-medium flex items-center">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Conversation
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Chat about any topic</p>
                  </div>
                  
                  <div className="p-3 rounded-md cursor-pointer hover:bg-muted/50">
                    <p className="font-medium flex items-center">
                      <Code className="mr-2 h-4 w-4" />
                      Code Assistance
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Get help with coding problems</p>
                  </div>
                  
                  <div className="p-3 rounded-md cursor-pointer hover:bg-muted/50">
                    <p className="font-medium flex items-center">
                      <Search className="mr-2 h-4 w-4" />
                      Research Mode
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Explore topics in depth</p>
                  </div>
                  
                  <div className="p-3 rounded-md cursor-pointer hover:bg-muted/50">
                    <p className="font-medium flex items-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Study Guide
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">Create personalized study plans</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-9">
              <Card className="flex flex-col h-full">
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Understanding Recursion</CardTitle>
                      <CardDescription>Started April 12, 2023</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-6">
                    {chatHistory.map((message) => (
                      <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-lg p-4 ${message.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                          <p className="whitespace-pre-line">{message.message}</p>
                          <div className={`text-xs mt-2 ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {chatHistory.length > 0 && chatHistory[chatHistory.length - 1].sender === 'ai' && (
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          Helpful
                        </Button>
                        <Button size="sm" variant="outline">
                          Explain Simpler
                        </Button>
                        <Button size="sm" variant="outline">
                          More Detail
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="border-t p-4">
                  <div className="relative w-full">
                    <Textarea 
                      placeholder="Type a message..." 
                      className="min-h-[80px] pr-20"
                    />
                    <div className="absolute bottom-2 right-2">
                      <Button>Send</Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="resources">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-3">
              <Card>
                <CardHeader>
                  <CardTitle>Find Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Input placeholder="Search topics..." />
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Resource Type</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="cursor-pointer">All</Badge>
                        <Badge variant="outline" className="cursor-pointer">Videos</Badge>
                        <Badge variant="outline" className="cursor-pointer">Articles</Badge>
                        <Badge variant="outline" className="cursor-pointer">Courses</Badge>
                        <Badge variant="outline" className="cursor-pointer">Books</Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Subject Areas</p>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input id="programming" type="checkbox" className="mr-2" />
                          <label htmlFor="programming" className="text-sm">Programming</label>
                        </div>
                        <div className="flex items-center">
                          <input id="data-science" type="checkbox" className="mr-2" />
                          <label htmlFor="data-science" className="text-sm">Data Science</label>
                        </div>
                        <div className="flex items-center">
                          <input id="web-development" type="checkbox" className="mr-2" />
                          <label htmlFor="web-development" className="text-sm">Web Development</label>
                        </div>
                        <div className="flex items-center">
                          <input id="database" type="checkbox" className="mr-2" />
                          <label htmlFor="database" className="text-sm">Database Systems</label>
                        </div>
                        <div className="flex items-center">
                          <input id="ai-ml" type="checkbox" className="mr-2" />
                          <label htmlFor="ai-ml" className="text-sm">AI & Machine Learning</label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Learning Level</p>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input id="beginner" type="radio" name="level" className="mr-2" />
                          <label htmlFor="beginner" className="text-sm">Beginner</label>
                        </div>
                        <div className="flex items-center">
                          <input id="intermediate" type="radio" name="level" className="mr-2" />
                          <label htmlFor="intermediate" className="text-sm">Intermediate</label>
                        </div>
                        <div className="flex items-center">
                          <input id="advanced" type="radio" name="level" className="mr-2" />
                          <label htmlFor="advanced" className="text-sm">Advanced</label>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">Apply Filters</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-9">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Resources</CardTitle>
                  <CardDescription>Personalized learning materials based on your profile and interests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {recommendedResources.map((resource) => (
                      <div key={resource.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{resource.title}</h3>
                              {resource.relevance === "high" && (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200">
                                  Highly Relevant
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                              {resource.type === "course" && <BookOpen className="h-4 w-4" />}
                              {resource.type === "video" && <Video className="h-4 w-4" />}
                              {resource.type === "book" && <BookOpen className="h-4 w-4" />}
                              {resource.type === "tutorial" && <Code className="h-4 w-4" />}
                              <span className="capitalize">{resource.type}</span>
                              <span>•</span>
                              <span>{resource.source}</span>
                              {resource.duration && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {resource.duration}
                                  </span>
                                </>
                              )}
                              {resource.author && (
                                <>
                                  <span>•</span>
                                  <span>{resource.author}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="ml-1">{resource.rating}</span>
                          </div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <div className="flex items-center text-sm">
                            <span className="text-muted-foreground">
                              Covers: 
                            </span>
                            <div className="flex gap-1 ml-2">
                              <Badge variant="outline">Python</Badge>
                              <Badge variant="outline">Data Structures</Badge>
                              <Badge variant="outline">Algorithms</Badge>
                            </div>
                          </div>
                          <Button>
                            <ArrowRight className="mr-2 h-4 w-4" />
                            Access Resource
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="outline">Show More Resources</Button>
                  <Button>
                    Get Personalized Learning Path
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="diagnostics">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle>Diagnostic Tests</CardTitle>
                  <CardDescription>Assess your knowledge and identify learning gaps</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Data Structures & Algorithms</h3>
                    <p className="text-sm text-muted-foreground mt-1">20 questions • 30 minutes</p>
                    <div className="mt-3">
                      <Button size="sm" className="w-full">Start Test</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Web Development Fundamentals</h3>
                    <p className="text-sm text-muted-foreground mt-1">15 questions • 25 minutes</p>
                    <div className="mt-3">
                      <Button size="sm" className="w-full">Start Test</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Database Systems</h3>
                    <p className="text-sm text-muted-foreground mt-1">18 questions • 30 minutes</p>
                    <div className="mt-3">
                      <Button size="sm" className="w-full">Start Test</Button>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Machine Learning Basics</h3>
                    <p className="text-sm text-muted-foreground mt-1">15 questions • 25 minutes</p>
                    <div className="mt-3">
                      <Button size="sm" className="w-full">Start Test</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-8">
              <Card>
                <CardHeader>
                  <CardTitle>Your Learning Progress</CardTitle>
                  <CardDescription>Based on diagnostic tests and learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <h3 className="text-sm font-medium">Data Structures & Algorithms</h3>
                        <span className="text-sm">78%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "78%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Strengths: Arrays, Linked Lists, Searching</span>
                        <span>Gaps: Dynamic Programming, Graphs</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <h3 className="text-sm font-medium">Web Development</h3>
                        <span className="text-sm">85%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "85%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Strengths: HTML/CSS, React, JavaScript</span>
                        <span>Gaps: Performance Optimization, Security</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <h3 className="text-sm font-medium">Database Systems</h3>
                        <span className="text-sm">65%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "65%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Strengths: SQL Basics, CRUD Operations</span>
                        <span>Gaps: Normalization, Query Optimization</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <h3 className="text-sm font-medium">Machine Learning</h3>
                        <span className="text-sm">42%</span>
                      </div>
                      <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: "42%" }}></div>
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                        <span>Strengths: Basic Concepts, Linear Regression</span>
                        <span>Gaps: Neural Networks, Deep Learning</span>
                      </div>
                    </div>
                    
                    <Card className="mt-6">
                      <CardHeader>
                        <CardTitle className="text-lg">Personalized Recommendations</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                            <h4 className="font-medium">Focus on Dynamic Programming</h4>
                            <p className="text-sm mt-1">Based on your diagnostic results, we recommend strengthening your understanding of dynamic programming concepts.</p>
                            <div className="mt-2">
                              <Button variant="outline" size="sm">View Resources</Button>
                            </div>
                          </div>
                          
                          <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                            <h4 className="font-medium">Take the Machine Learning Course</h4>
                            <p className="text-sm mt-1">Your machine learning knowledge shows room for growth. We recommend starting with our fundamentals course.</p>
                            <div className="mt-2">
                              <Button variant="outline" size="sm">Explore Courses</Button>
                            </div>
                          </div>
                          
                          <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                            <h4 className="font-medium">Practice SQL Query Optimization</h4>
                            <p className="text-sm mt-1">Improve your database performance knowledge with targeted exercises on query optimization.</p>
                            <div className="mt-2">
                              <Button variant="outline" size="sm">Start Practice</Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline">
                    View Detailed Reports
                  </Button>
                  <Button>
                    Create Study Plan
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

export default AIGuidance;
