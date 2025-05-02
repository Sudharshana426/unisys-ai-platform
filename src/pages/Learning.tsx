import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PlusCircle, Clock, CalendarDays, Award, BookOpen, CheckCircle2, ExternalLink } from "lucide-react";
import AddCourseModal from "@/components/learning/AddCourseModal";
import CourseCard from "@/components/learning/CourseCard";
import { toast } from "sonner";

interface BaseCourse {
  id: number;
  title: string;
  description: string;
  platform: string;
  instructor: string;
  thumbnail: string;
  skills: string[];
}

interface CurrentCourse extends BaseCourse {
  startDate: string;
  endDate: string;
  progress: number;
  url: string;
}

interface CompletedCourse extends BaseCourse {
  completionDate: string;
  certificateUrl: string;
  duration: string;
}

const Learning = () => {
  const [isAddCourseModalOpen, setIsAddCourseModalOpen] = useState(false);
  
  const [currentCourses, setCurrentCourses] = useState<CurrentCourse[]>([
    {
      id: 1,
      title: "Machine Learning Fundamentals",
      description: "Learn the core concepts of machine learning and implement various algorithms.",
      platform: "Coursera",
      instructor: "Andrew Ng",
      startDate: "2023-09-15",
      endDate: "2023-12-15",
      progress: 65,
      thumbnail: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFjaGluZSUyMGxlYXJuaW5nfGVufDB8fDB8fHww",
      skills: ["Python", "TensorFlow", "Data Analysis"],
      url: "https://coursera.org/ml-course"
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      description: "Master the essential algorithms and data structures for technical interviews.",
      platform: "Udemy",
      instructor: "Dr. Ryan Ahmed",
      startDate: "2023-10-01",
      endDate: "2024-01-30",
      progress: 42,
      thumbnail: "https://images.unsplash.com/photo-1542903660-eedba2cda473?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNvZGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      skills: ["Algorithms", "Java", "Problem Solving"],
      url: "https://udemy.com/dsa-course"
    },
    {
      id: 3,
      title: "Full Stack Web Development",
      description: "Build complete web applications using modern JavaScript frameworks.",
      platform: "NPTEL",
      instructor: "Prof. Kiran M.",
      startDate: "2023-08-10",
      endDate: "2023-11-10",
      progress: 78,
      thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHdlYiUyMGRldmVsb3BtZW50fGVufDB8fDB8fHww",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      url: "https://nptel.ac.in/web-dev"
    }
  ]);

  const [completedCourses, setCompletedCourses] = useState<CompletedCourse[]>([
    {
      id: 4,
      title: "Introduction to Python Programming",
      description: "Learn the basics of Python programming language.",
      platform: "edX",
      instructor: "Eric Grimson",
      completionDate: "2023-07-20",
      certificateUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHl0aG9ufGVufDB8fDB8fHww",
      skills: ["Python", "Programming Basics", "Data Types"],
      duration: "8 weeks"
    },
    {
      id: 5,
      title: "Mobile App Development with Flutter",
      description: "Create cross-platform mobile applications using Flutter and Dart.",
      platform: "Udacity",
      instructor: "Angela Yu",
      completionDate: "2023-06-15",
      certificateUrl: "#",
      thumbnail: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bW9iaWxlJTIwYXBwfGVufDB8fDB8fHww",
      skills: ["Flutter", "Dart", "UI Design", "Firebase"],
      duration: "12 weeks"
    }
  ]);

  const recommendedCourses = [
    {
      id: 6,
      title: "Deep Learning Specialization",
      description: "Master deep learning techniques with neural networks.",
      platform: "Coursera",
      thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGVlcCUyMGxlYXJuaW5nfGVufDB8fDB8fHww",
      instructor: "Andrew Ng",
      skills: ["Neural Networks", "TensorFlow", "Deep Learning"],
      matchScore: 95
    },
    {
      id: 7,
      title: "AWS Certified Solutions Architect",
      description: "Prepare for the AWS certification exam and learn cloud architecture.",
      platform: "Pluralsight",
      thumbnail: "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fbf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2xvdWQlMjBjb21wdXRpbmd8ZW58MHx8MHx8fDA%3D",
      instructor: "Ryan Kroonenburg",
      skills: ["AWS", "Cloud Computing", "Network Architecture"],
      matchScore: 88
    }
  ];

  const acquiredSkills = [...new Set(
    completedCourses.flatMap(course => course.skills)
  )];

  const handleAddCourse = (newCourse: any) => {
    setCurrentCourses([...currentCourses, {
      id: currentCourses.length + completedCourses.length + 1,
      ...newCourse,
      progress: 0
    }]);
    toast.success("Course added successfully!");
  };

  const handleUpdateProgress = (courseId: number, newProgress: number) => {
    setCurrentCourses(
      currentCourses.map(course => 
        course.id === courseId 
          ? { ...course, progress: newProgress } 
          : course
      )
    );
    toast.success("Progress updated!");
  };

  const handleMarkAsCompleted = (courseId: number) => {
    const courseToComplete = currentCourses.find(course => course.id === courseId);
    
    if (courseToComplete) {
      setCurrentCourses(currentCourses.filter(course => course.id !== courseId));
      
      const completedCourse: CompletedCourse = {
        ...courseToComplete,
        completionDate: new Date().toISOString().split('T')[0],
        certificateUrl: "#",
        duration: calculateDuration(courseToComplete.startDate, courseToComplete.endDate)
      };
      
      setCompletedCourses([...completedCourses, completedCourse]);
      
      toast.success("Course marked as completed!");
    }
  };

  const calculateDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) {
      return `${diffDays} days`;
    } else if (diffDays <= 31) {
      return `${Math.ceil(diffDays / 7)} weeks`;
    } else {
      return `${Math.ceil(diffDays / 30)} months`;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Learning Dashboard</h1>
          <p className="text-muted-foreground">Track and manage your learning journey</p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={() => setIsAddCourseModalOpen(true)}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            Add New Course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">Current Courses</div>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{currentCourses.length}</div>
            <p className="text-xs text-muted-foreground">
              {currentCourses.reduce((avg, course) => avg + course.progress, 0) / currentCourses.length || 0}% average progress
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">Completed Courses</div>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{completedCourses.length}</div>
            <p className="text-xs text-muted-foreground">
              Since you started learning
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">Learning Time</div>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">120 hrs</div>
            <p className="text-xs text-muted-foreground">
              15 hrs last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="text-sm font-medium">Skills Acquired</div>
              <Award className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{acquiredSkills.length}</div>
            <p className="text-xs text-muted-foreground">
              From completed courses
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="current" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Courses</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current" className="space-y-4">
          {currentCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentCourses.map(course => (
                <CourseCard 
                  key={course.id}
                  course={course}
                  type="current"
                  onUpdateProgress={handleUpdateProgress}
                  onMarkAsCompleted={handleMarkAsCompleted}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Current Courses</h3>
                <p className="text-center text-muted-foreground mb-4">
                  You don't have any courses in progress at the moment.
                </p>
                <Button onClick={() => setIsAddCourseModalOpen(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Your First Course
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {completedCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedCourses.map(course => (
                <CourseCard 
                  key={course.id}
                  course={course}
                  type="completed"
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Completed Courses Yet</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Once you complete your ongoing courses, they will appear here.
                </p>
              </CardContent>
            </Card>
          )}
          
          {completedCourses.length > 0 && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Skills Acquired</CardTitle>
                <CardDescription>
                  Skills you've learned from your completed courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {acquiredSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="recommended" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">AI Recommended Courses</CardTitle>
              <CardDescription>
                Based on your profile, learning history, and career goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recommendedCourses.map(course => (
                  <Card key={course.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{course.title}</CardTitle>
                        <Badge variant="outline" className="ml-2">
                          {course.matchScore}% Match
                        </Badge>
                      </div>
                      <CardDescription>{course.platform} • {course.instructor}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm">{course.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {course.skills.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Course
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddCourseModal
        isOpen={isAddCourseModalOpen}
        onClose={() => setIsAddCourseModalOpen(false)}
        onAdd={handleAddCourse}
      />
    </div>
  );
};

export default Learning;
