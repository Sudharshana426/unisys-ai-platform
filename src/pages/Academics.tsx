
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, GraduationCap, LineChart, BarChart3, Activity, BookOpen } from "lucide-react";

const studentInfo = {
  name: "Rahul Sharma",
  regNo: "RA1811003010092",
  branch: "Computer Science & Engineering",
  batch: "2020-2024",
  currentSemester: 7,
  cgpa: 8.92,
  credits: {
    completed: 156,
    total: 180
  }
};

const semesters = [
  { id: 1, name: "Semester 1", sgpa: 8.3, completed: true },
  { id: 2, name: "Semester 2", sgpa: 8.6, completed: true },
  { id: 3, name: "Semester 3", sgpa: 9.1, completed: true },
  { id: 4, name: "Semester 4", sgpa: 9.0, completed: true },
  { id: 5, name: "Semester 5", sgpa: 8.7, completed: true },
  { id: 6, name: "Semester 6", sgpa: 9.2, completed: true },
  { id: 7, name: "Semester 7", sgpa: 0.0, completed: false },
  { id: 8, name: "Semester 8", sgpa: 0.0, completed: false }
];

const currentSemesterCourses = [
  { id: 1, code: "CS4001", name: "Machine Learning", credits: 4, attendance: 92, internalMarks: 45, maxInternal: 50 },
  { id: 2, code: "CS4002", name: "Cloud Computing", credits: 4, attendance: 88, internalMarks: 42, maxInternal: 50 },
  { id: 3, code: "CS4003", name: "Natural Language Processing", credits: 3, attendance: 85, internalMarks: 38, maxInternal: 50 },
  { id: 4, code: "CS4004", name: "Big Data Analytics", credits: 4, attendance: 90, internalMarks: 43, maxInternal: 50 },
  { id: 5, code: "CS4005", name: "Internet of Things", credits: 3, attendance: 94, internalMarks: 47, maxInternal: 50 },
  { id: 6, code: "CS4006", name: "Capstone Project", credits: 6, attendance: 100, internalMarks: 48, maxInternal: 50 }
];

const pastCourses = [
  { id: 1, code: "CS3001", name: "Data Structures", credits: 4, grade: "A+", semester: "Sem 3" },
  { id: 2, code: "CS3002", name: "Operating Systems", credits: 4, grade: "A", semester: "Sem 3" },
  { id: 3, code: "CS3003", name: "Database Management Systems", credits: 4, grade: "A+", semester: "Sem 3" },
  { id: 4, code: "CS3004", name: "Computer Networks", credits: 3, grade: "A", semester: "Sem 3" },
  { id: 5, code: "CS3005", name: "Theory of Computation", credits: 3, grade: "B+", semester: "Sem 3" },
  { id: 6, code: "CS3006", name: "Design & Analysis of Algorithms", credits: 4, grade: "A", semester: "Sem 4" },
  { id: 7, code: "CS3007", name: "Web Technologies", credits: 3, grade: "A+", semester: "Sem 4" },
  { id: 8, code: "CS3008", name: "Computer Architecture", credits: 4, grade: "A", semester: "Sem 4" }
];

const gradePointMapping: Record<string, number> = {
  "A+": 10,
  "A": 9,
  "B+": 8,
  "B": 7,
  "C+": 6,
  "C": 5,
  "D": 4,
  "F": 0
};

const getColorForAttendance = (attendance: number) => {
  if (attendance >= 90) return "text-green-600";
  if (attendance >= 80) return "text-amber-600";
  return "text-red-600";
};

const getColorForGrade = (grade: string) => {
  if (grade === "A+" || grade === "A") return "text-green-600";
  if (grade === "B+" || grade === "B") return "text-blue-600";
  if (grade === "C+" || grade === "C") return "text-amber-600";
  return "text-red-600";
};

const Academics = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Academic Records</h1>
          <p className="text-muted-foreground">View your academic performance, courses, and attendance</p>
        </div>
        
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Academic Report
        </Button>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              CGPA Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">{studentInfo.cgpa}</div>
              <p className="text-sm text-muted-foreground">Cumulative Grade Point Average</p>
              
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Credits Completed</span>
                  <span>{studentInfo.credits.completed}/{studentInfo.credits.total}</span>
                </div>
                <Progress value={(studentInfo.credits.completed / studentInfo.credits.total) * 100} className="h-2" />
                <p className="text-xs text-right text-muted-foreground mt-1">
                  {((studentInfo.credits.completed / studentInfo.credits.total) * 100).toFixed(1)}% completed
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="h-5 w-5 mr-2" />
              Student Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="grid grid-cols-2">
                <div className="text-sm text-muted-foreground">Name</div>
                <div>{studentInfo.name}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-sm text-muted-foreground">Registration No.</div>
                <div>{studentInfo.regNo}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-sm text-muted-foreground">Branch</div>
                <div>{studentInfo.branch}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-sm text-muted-foreground">Batch</div>
                <div>{studentInfo.batch}</div>
              </div>
              <div className="grid grid-cols-2">
                <div className="text-sm text-muted-foreground">Current Semester</div>
                <div>{studentInfo.currentSemester}</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Performance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[160px] flex items-end justify-between gap-2">
              {semesters.filter(sem => sem.completed).map((semester) => (
                <div key={semester.id} className="relative flex flex-col items-center">
                  <div 
                    className="w-8 bg-primary/80 rounded-t"
                    style={{ height: `${(semester.sgpa / 10) * 120}px` }}
                  ></div>
                  <p className="text-xs mt-2">{semester.id}</p>
                  <div className="absolute top-0 transform -translate-y-full opacity-0 bg-black text-white text-xs rounded p-1 group-hover:opacity-100">
                    {semester.sgpa}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-2">
              <p className="text-xs text-muted-foreground">SGPA trends across semesters</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="current">
        <TabsList className="mb-4">
          <TabsTrigger value="current">Current Semester</TabsTrigger>
          <TabsTrigger value="history">Course History</TabsTrigger>
          <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>Semester 7 Courses</CardTitle>
              <CardDescription>Current courses, attendance, and internal marks</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead className="text-center">Credits</TableHead>
                    <TableHead className="text-center">Attendance</TableHead>
                    <TableHead className="text-center">Internal Marks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentSemesterCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell className="text-center">{course.credits}</TableCell>
                      <TableCell className="text-center">
                        <span className={getColorForAttendance(course.attendance)}>
                          {course.attendance}%
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        {course.internalMarks}/{course.maxInternal}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Previous Courses</CardTitle>
              <CardDescription>Completed courses and grades</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Course Name</TableHead>
                    <TableHead className="text-center">Credits</TableHead>
                    <TableHead className="text-center">Semester</TableHead>
                    <TableHead className="text-center">Grade</TableHead>
                    <TableHead className="text-center">Grade Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.code}</TableCell>
                      <TableCell>{course.name}</TableCell>
                      <TableCell className="text-center">{course.credits}</TableCell>
                      <TableCell className="text-center">{course.semester}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={getColorForGrade(course.grade)}>
                          {course.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">{gradePointMapping[course.grade]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analysis">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 mr-2" />
                  Grade Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(gradePointMapping).slice(0, 6).map(([grade, _]) => {
                    const count = pastCourses.filter(course => course.grade === grade).length;
                    const percentage = (count / pastCourses.length) * 100;
                    
                    return (
                      <div key={grade} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Grade {grade}</span>
                          <span>{count} courses</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Credits Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="mb-2">
                      <div className="text-sm mb-1">Credits by Department</div>
                      <div className="w-full h-10 bg-secondary rounded-lg overflow-hidden flex">
                        <div className="h-full bg-blue-500" style={{ width: '70%' }}></div>
                        <div className="h-full bg-green-500" style={{ width: '15%' }}></div>
                        <div className="h-full bg-amber-500" style={{ width: '10%' }}></div>
                        <div className="h-full bg-purple-500" style={{ width: '5%' }}></div>
                      </div>
                      <div className="flex justify-between text-xs mt-2">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-blue-500 mr-1 rounded-sm"></div>
                          <span>Computer Science</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-green-500 mr-1 rounded-sm"></div>
                          <span>Mathematics</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-amber-500 mr-1 rounded-sm"></div>
                          <span>Humanities</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-500 mr-1 rounded-sm"></div>
                          <span>Others</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-xs text-muted-foreground">Total Courses</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold">156</p>
                      <p className="text-xs text-muted-foreground">Credits Earned</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold">85%</p>
                      <p className="text-xs text-muted-foreground">Core Courses</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-2xl font-bold">15%</p>
                      <p className="text-xs text-muted-foreground">Electives</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Academics;
