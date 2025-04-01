
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen, Clock, ExternalLink, Filter, Play, Plus, Search, Star, Youtube } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Advanced Data Structures and Algorithms",
    platform: "Coursera",
    instructor: "Dr. Robert Thompson",
    level: "Advanced",
    duration: "8 weeks",
    progress: 45,
    lastAccessed: "2 days ago",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop",
    rating: 4.8,
    reviews: 1254,
    tags: ["DSA", "Problem Solving", "Algorithms"]
  },
  {
    id: 2,
    title: "Full-Stack React Development",
    platform: "Udemy",
    instructor: "Jessica Miller",
    level: "Intermediate",
    duration: "12 weeks",
    progress: 78,
    lastAccessed: "Yesterday",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
    rating: 4.6,
    reviews: 3789,
    tags: ["React", "JavaScript", "Web Development"]
  },
  {
    id: 3,
    title: "Machine Learning Foundations",
    platform: "edX",
    instructor: "Prof. Andrew Lee",
    level: "Intermediate",
    duration: "10 weeks",
    progress: 22,
    lastAccessed: "1 week ago",
    thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop",
    rating: 4.9,
    reviews: 2156,
    tags: ["ML", "Python", "Data Science"]
  }
];

const videos = [
  {
    id: 1,
    title: "System Design Interview Preparation",
    channel: "Tech Interview Pro",
    views: "245K",
    uploaded: "2 months ago",
    duration: "45:22",
    thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
    tags: ["System Design", "Interview"]
  },
  {
    id: 2,
    title: "Building Microservices with Docker and Kubernetes",
    channel: "Cloud Native",
    views: "189K",
    uploaded: "3 months ago",
    duration: "1:12:45",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=200&fit=crop",
    tags: ["Docker", "Kubernetes", "Microservices"]
  },
  {
    id: 3,
    title: "React Hooks Deep Dive",
    channel: "Web Dev Mastery",
    views: "312K",
    uploaded: "1 month ago",
    duration: "32:10",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
    tags: ["React", "Hooks", "JavaScript"]
  },
  {
    id: 4,
    title: "Mastering Advanced CSS Techniques",
    channel: "CSS Wizards",
    views: "178K",
    uploaded: "2 weeks ago",
    duration: "28:45",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
    tags: ["CSS", "Web Design", "UI"]
  }
];

const books = [
  {
    id: 1,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    pages: 464,
    readingStatus: "In Progress (Page 156)",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
    genre: "Software Engineering",
    rating: 4.9
  },
  {
    id: 2,
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    pages: 416,
    readingStatus: "Not Started",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
    genre: "Software Design",
    rating: 4.7
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    pages: 352,
    readingStatus: "Completed",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=300&h=200&fit=crop",
    genre: "Software Development",
    rating: 4.8
  }
];

const LearningResources = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filterResources = (resources: any[]) => {
    if (!searchQuery) return resources;
    return resources.filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (resource.tags && resource.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  };
  
  const filteredCourses = filterResources(courses);
  const filteredVideos = filterResources(videos);
  const filteredBooks = filterResources(books);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Learning Resources</h1>
          <p className="text-muted-foreground">Courses, videos, and books to enhance your skills</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Resource
          </Button>
        </div>
      </div>
      
      <div className="relative flex-1 mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search resources by title, topic, or tags..."
          className="pl-8" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="courses">
        <TabsList className="mb-4">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="books">Books</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        
        <TabsContent value="courses" className="space-y-4">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden flex flex-col">
                  <div className="relative h-40">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                      <Badge className="bg-primary text-white">{course.platform}</Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                        <CardDescription>{course.instructor}</CardDescription>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                        <span className="text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-grow">
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <p className="text-muted-foreground">Level</p>
                        <p className="font-medium">{course.level}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Duration</p>
                        <p className="font-medium">{course.duration}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="bg-muted h-2 rounded-full">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {course.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      Last accessed {course.lastAccessed}
                    </div>
                    <Button size="sm">Continue</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border rounded-lg">
              <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or browse our recommended courses.</p>
              <Button>Explore Courses</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="videos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="flex flex-col">
                <div className="relative h-48">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button variant="secondary" size="icon" className="rounded-full h-12 w-12">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black px-2 py-0.5 rounded text-white text-xs">
                    {video.duration}
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-1">{video.title}</CardTitle>
                  <CardDescription className="flex justify-between">
                    <span>{video.channel}</span>
                    <span>{video.views} views • {video.uploaded}</span>
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="outline" size="sm">Save</Button>
                  <Button size="sm">
                    <Youtube className="mr-2 h-4 w-4" />
                    Watch
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="books">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBooks.map((book) => (
              <Card key={book.id} className="flex flex-col">
                <div className="relative aspect-[2/3] bg-muted">
                  <img 
                    src={book.coverImage} 
                    alt={book.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className={
                      book.readingStatus === "Completed" ? "bg-green-500" :
                      book.readingStatus.includes("In Progress") ? "bg-amber-500" :
                      "bg-blue-500"
                    }>
                      {book.readingStatus === "Completed" ? "Completed" :
                       book.readingStatus.includes("In Progress") ? "In Progress" :
                       "Not Started"}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg line-clamp-1">{book.title}</CardTitle>
                      <CardDescription>{book.author}</CardDescription>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                      <span className="text-sm font-medium">{book.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Pages</p>
                      <p className="font-medium">{book.pages}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Genre</p>
                      <p className="font-medium">{book.genre}</p>
                    </div>
                  </div>
                  
                  {book.readingStatus.includes("In Progress") && (
                    <div className="mt-4 space-y-1">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Reading Progress</span>
                        <span>{book.readingStatus.match(/\d+/g)?.[0] || 0} / {book.pages}</span>
                      </div>
                      <div className="bg-muted h-2 rounded-full">
                        <div 
                          className="bg-amber-500 h-full rounded-full" 
                          style={{ width: `${parseInt(book.readingStatus.match(/\d+/g)?.[0] || "0") / book.pages * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="outline" size="sm">
                    {book.readingStatus === "Not Started" ? "Start Reading" : 
                     book.readingStatus === "Completed" ? "Read Again" : 
                     "Continue Reading"}
                  </Button>
                  <Button variant="secondary" size="sm">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed h-full flex flex-col items-center justify-center p-8 text-center">
              <BookOpen className="h-10 w-10 mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Add a new book</h3>
              <p className="text-sm text-muted-foreground mb-4">Track your reading progress and take notes</p>
              <Button>Add Book</Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="grid gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Based on your current skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Advanced React Patterns</CardTitle>
                      <Badge>Course</Badge>
                    </div>
                    <CardDescription>Frontend Masters</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Learn advanced React patterns like render props, compound components, and more.</p>
                    <div className="flex items-center gap-1">
                      <Avatar className="h-5 w-5">
                        <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop" />
                        <AvatarFallback>FM</AvatarFallback>
                      </Avatar>
                      <span className="text-xs">Kyle Simpson</span>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                      <span className="text-sm">4.9</span>
                    </div>
                    <Button size="sm">Enroll</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">Microservices Architecture</CardTitle>
                      <Badge variant="secondary">Book</Badge>
                    </div>
                    <CardDescription>Sam Newman</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Essential guide for designing fine-grained systems with microservices.</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Cloud</Badge>
                      <Badge variant="outline">Architecture</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                      <span className="text-sm">4.7</span>
                    </div>
                    <Button size="sm">Preview</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">ML System Design</CardTitle>
                      <Badge variant="destructive">Video Series</Badge>
                    </div>
                    <CardDescription>AI Research Channel</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Learn to design and deploy production ML systems.</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">ML</Badge>
                      <Badge variant="outline">Python</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="flex items-center">
                      <Youtube className="h-4 w-4 text-red-500 mr-1" />
                      <span className="text-sm">12 videos</span>
                    </div>
                    <Button size="sm">Watch</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Popular in your field</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">System Design Interview</CardTitle>
                      <Badge>Book</Badge>
                    </div>
                    <CardDescription>Alex Xu</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Insider's guide to answering system design questions.</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Interview</Badge>
                      <Badge variant="outline">System Design</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                      <span className="text-sm">4.8</span>
                    </div>
                    <Button size="sm">Preview</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">AWS Solutions Architect</CardTitle>
                      <Badge>Course</Badge>
                    </div>
                    <CardDescription>A Cloud Guru</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Complete preparation for the AWS Solutions Architect certification.</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">AWS</Badge>
                      <Badge variant="outline">Cloud</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                      <span className="text-sm">4.9</span>
                    </div>
                    <Button size="sm">Enroll</Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">The Pragmatic Programmer</CardTitle>
                      <Badge variant="secondary">Book</Badge>
                    </div>
                    <CardDescription>Hunt & Thomas</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Classic book on software craftsmanship and career development.</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Career</Badge>
                      <Badge variant="outline">Coding</Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
                      <span className="text-sm">4.9</span>
                    </div>
                    <Button size="sm">Preview</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearningResources;
