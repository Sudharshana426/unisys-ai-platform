
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, Download, FileText, GraduationCap, Mail, MapPin, Phone, Plus, RefreshCw, Save, Smartphone, Star, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const resumeTemplates = [
  {
    id: 1,
    name: "Professional",
    description: "Clean and modern template suitable for corporate positions",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "Creative",
    description: "Visually appealing design for creative roles",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "Academic",
    description: "Format optimized for research and academic positions",
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    name: "Technical",
    description: "Highlighting technical skills for IT and engineering roles",
    image: "https://images.unsplash.com/photo-1516383607781-913a19294fd1?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];

const savedResumes = [
  {
    id: 1,
    name: "Software Engineer - Full Stack",
    lastUpdated: "2 days ago",
    template: "Technical"
  },
  {
    id: 2,
    name: "Research Internship Application",
    lastUpdated: "1 week ago",
    template: "Academic"
  },
  {
    id: 3,
    name: "Google Summer Internship 2023",
    lastUpdated: "3 weeks ago",
    template: "Professional"
  }
];

const Resume = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Resume Builder</h1>
          <p className="text-muted-foreground">Create, manage and export professional resumes</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export as PDF
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Resume
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="editor">
        <TabsList className="mb-4">
          <TabsTrigger value="editor">Resume Editor</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="saved">Saved Resumes</TabsTrigger>
          <TabsTrigger value="ai">AI Enhancement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-center mb-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" alt="Avatar" />
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Rahul Sharma" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input id="title" defaultValue="Computer Science Student" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center relative">
                      <Mail className="absolute left-2 h-4 w-4 text-muted-foreground" />
                      <Input id="email" className="pl-8" defaultValue="rahul.sharma@example.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex items-center relative">
                      <Phone className="absolute left-2 h-4 w-4 text-muted-foreground" />
                      <Input id="phone" className="pl-8" defaultValue="+91 9876543210" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <div className="flex items-center relative">
                      <MapPin className="absolute left-2 h-4 w-4 text-muted-foreground" />
                      <Input id="location" className="pl-8" defaultValue="Chennai, Tamil Nadu, India" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Write a professional summary"
                    className="min-h-[120px]"
                    defaultValue="Dedicated Computer Science student with strong programming skills and passion for solving complex problems. Experienced in web development, machine learning, and data analysis through multiple projects. Seeking opportunities to apply technical knowledge in a challenging internship role."
                  />
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-8 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Education</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-l-2 border-primary pl-4 py-1 relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2"></div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Bachelor of Technology, Computer Science & Engineering</h4>
                          <p className="text-sm text-muted-foreground">VIT University, Chennai</p>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-nowrap">2020 - 2024</p>
                      </div>
                      <div className="text-sm">
                        <p>CGPA: 8.92/10</p>
                        <p className="mt-2">Relevant Coursework: Data Structures, Algorithms, Database Management, Machine Learning, Web Technologies</p>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border-l-2 border-muted pl-4 py-1 relative">
                      <div className="absolute w-3 h-3 bg-muted rounded-full -left-[7px] top-2"></div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Higher Secondary School Certificate</h4>
                          <p className="text-sm text-muted-foreground">Delhi Public School, Chennai</p>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-nowrap">2018 - 2020</p>
                      </div>
                      <div className="text-sm">
                        <p>Percentage: 94.6%</p>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Experience</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-l-2 border-primary pl-4 py-1 relative">
                      <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-2"></div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Software Development Intern</h4>
                          <p className="text-sm text-muted-foreground">Microsoft, Hyderabad</p>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-nowrap">May 2023 - Jul 2023</p>
                      </div>
                      <div className="text-sm">
                        <ul className="list-disc ml-4 space-y-1">
                          <li>Developed and maintained web applications using React and ASP.NET</li>
                          <li>Collaborated with cross-functional teams to improve user experience</li>
                          <li>Implemented responsive design and improved performance by 30%</li>
                        </ul>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border-l-2 border-muted pl-4 py-1 relative">
                      <div className="absolute w-3 h-3 bg-muted rounded-full -left-[7px] top-2"></div>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">Research Assistant</h4>
                          <p className="text-sm text-muted-foreground">AI Lab, VIT University</p>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-nowrap">Jan 2023 - Apr 2023</p>
                      </div>
                      <div className="text-sm">
                        <ul className="list-disc ml-4 space-y-1">
                          <li>Assisted in research on natural language processing applications</li>
                          <li>Implemented machine learning models for text classification</li>
                          <li>Co-authored research paper published in college journal</li>
                        </ul>
                      </div>
                      <div className="flex gap-2 mt-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Skills</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Skill
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="px-3 py-1">Python</Badge>
                    <Badge className="px-3 py-1">JavaScript</Badge>
                    <Badge className="px-3 py-1">React</Badge>
                    <Badge className="px-3 py-1">Node.js</Badge>
                    <Badge className="px-3 py-1">Java</Badge>
                    <Badge className="px-3 py-1">C++</Badge>
                    <Badge className="px-3 py-1">SQL</Badge>
                    <Badge className="px-3 py-1">MongoDB</Badge>
                    <Badge className="px-3 py-1">Git</Badge>
                    <Badge className="px-3 py-1">Machine Learning</Badge>
                    <Badge className="px-3 py-1">TensorFlow</Badge>
                    <Badge className="px-3 py-1">Docker</Badge>
                    <Badge className="px-3 py-1">AWS</Badge>
                    <Badge className="px-3 py-1">Agile Methodologies</Badge>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Projects</CardTitle>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium">AI-Powered Learning Assistant</h4>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">Python, TensorFlow, Flask</p>
                      <p className="text-sm">Developed a natural language processing model that assists students with learning difficult concepts. Implemented using Python and TensorFlow with a Flask web interface.</p>
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium">College Event Management Portal</h4>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">React, Node.js, MongoDB</p>
                      <p className="text-sm">Created a web application for managing college events with features for registration, payment, and attendance tracking. Used React for frontend and Node.js with MongoDB for backend.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end gap-2">
            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button variant="default">
              <Save className="mr-2 h-4 w-4" />
              Save Resume
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="templates">
          <div className="grid md:grid-cols-4 gap-6">
            {resumeTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <div className="aspect-[3/4] overflow-hidden">
                  <img 
                    src={template.image} 
                    alt={template.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button className="w-full">
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          <div className="space-y-4">
            {savedResumes.map((resume) => (
              <Card key={resume.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle>{resume.name}</CardTitle>
                    <Badge variant="outline">{resume.template}</Badge>
                  </div>
                  <CardDescription>Last updated: {resume.lastUpdated}</CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm">
                      Edit Resume
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <svg className="h-6 w-6 mr-2 text-purple-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                  <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                AI Resume Enhancement
              </CardTitle>
              <CardDescription>Let AI help improve your resume content and format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ai-target">Target Role</Label>
                <Input id="ai-target" placeholder="e.g., Software Engineer, Data Scientist" />
                <p className="text-xs text-muted-foreground">Enter the role you're applying for to tailor your resume</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ai-company">Target Company (Optional)</Label>
                <Input id="ai-company" placeholder="e.g., Google, Microsoft, Amazon" />
                <p className="text-xs text-muted-foreground">If you're applying to a specific company, enter it here</p>
              </div>
              
              <div className="space-y-2">
                <Label>Enhancement Options</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start p-4 border rounded-md">
                    <div className="mr-4 mt-1">
                      <input type="checkbox" id="improve-bullet" className="h-4 w-4" />
                    </div>
                    <div>
                      <label htmlFor="improve-bullet" className="font-medium">Improve Bullet Points</label>
                      <p className="text-sm text-muted-foreground">Enhance the impact and clarity of your experience descriptions</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 border rounded-md">
                    <div className="mr-4 mt-1">
                      <input type="checkbox" id="keywords" className="h-4 w-4" />
                    </div>
                    <div>
                      <label htmlFor="keywords" className="font-medium">Add Industry Keywords</label>
                      <p className="text-sm text-muted-foreground">Optimize for ATS systems with relevant keywords</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 border rounded-md">
                    <div className="mr-4 mt-1">
                      <input type="checkbox" id="grammar" className="h-4 w-4" />
                    </div>
                    <div>
                      <label htmlFor="grammar" className="font-medium">Grammar & Style Check</label>
                      <p className="text-sm text-muted-foreground">Fix grammar issues and improve writing style</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start p-4 border rounded-md">
                    <div className="mr-4 mt-1">
                      <input type="checkbox" id="format" className="h-4 w-4" />
                    </div>
                    <div>
                      <label htmlFor="format" className="font-medium">Format Recommendations</label>
                      <p className="text-sm text-muted-foreground">Optimize layout and presentation</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="w-full">
                  <GraduationCap className="mr-2 h-4 w-4" />
                  Enhance My Resume with AI
                </Button>
                <p className="text-center text-xs text-muted-foreground mt-2">AI enhancements preserve your content while improving presentation and impact</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Enhancement History</CardTitle>
                <CardDescription>Previous AI improvements to your resumes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Software Engineer Resume Enhancement</h4>
                        <p className="text-sm text-muted-foreground">Processed on April 12, 2023</p>
                      </div>
                      <Badge>15 Improvements</Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      View Changes
                    </Button>
                  </div>
                  
                  <div className="p-4 border rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">Data Science Internship Application</h4>
                        <p className="text-sm text-muted-foreground">Processed on March 5, 2023</p>
                      </div>
                      <Badge>9 Improvements</Badge>
                    </div>
                    <Button size="sm" variant="outline">
                      <ArrowRight className="mr-2 h-4 w-4" />
                      View Changes
                    </Button>
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

export default Resume;
