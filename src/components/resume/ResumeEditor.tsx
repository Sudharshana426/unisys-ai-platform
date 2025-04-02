
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Download, Eye } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ResumeData {
  personal: {
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedin: string;
    github: string;
    summary: string;
  };
  education: Array<{
    id: number;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa: string;
  }>;
  experience: Array<{
    id: number;
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: Array<{
    id: number;
    category: string;
    skills: string;
  }>;
  projects: Array<{
    id: number;
    name: string;
    description: string;
    technologies: string;
    link: string;
  }>;
}

const ResumeEditor = () => {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {
      name: "Rahul Sharma",
      email: "rahul.sharma@example.com",
      phone: "+91 98765 43210",
      address: "New Delhi, India",
      linkedin: "linkedin.com/in/rahulsharma",
      github: "github.com/rahulsharma",
      summary: "Computer Science undergraduate with strong programming skills and experience in web development, machine learning, and data analysis. Looking for challenging opportunities in software engineering."
    },
    education: [
      {
        id: 1,
        institution: "Vellore Institute of Technology",
        degree: "B.Tech",
        field: "Computer Science & Engineering",
        startDate: "2020",
        endDate: "2024",
        gpa: "8.92/10"
      }
    ],
    experience: [
      {
        id: 1,
        company: "Microsoft",
        position: "Software Engineering Intern",
        location: "Bangalore, India",
        startDate: "May 2023",
        endDate: "July 2023",
        description: "Developed and deployed microservices using .NET Core, implemented CI/CD pipelines, and contributed to the improvement of API performance by 30%."
      },
      {
        id: 2,
        company: "TCS",
        position: "Project Trainee",
        location: "Remote",
        startDate: "Dec 2022",
        endDate: "Feb 2023",
        description: "Built a full-stack application using React and Node.js, collaborated with a team of 5 members to deliver project milestones on time."
      }
    ],
    skills: [
      {
        id: 1,
        category: "Programming Languages",
        skills: "JavaScript, Python, Java, C++"
      },
      {
        id: 2,
        category: "Technologies",
        skills: "React, Node.js, Express, MongoDB, SQL, Git"
      },
      {
        id: 3,
        category: "Other Skills",
        skills: "Data Structures, Algorithms, Machine Learning, AWS"
      }
    ],
    projects: [
      {
        id: 1,
        name: "E-Learning Platform",
        description: "Built a platform for online learning with features like course management, live sessions, and analytics.",
        technologies: "React, Node.js, MongoDB, Socket.io",
        link: "github.com/rahulsharma/e-learning"
      },
      {
        id: 2,
        name: "Smart Energy Monitoring System",
        description: "Developed an IoT-based system for monitoring and analyzing energy consumption in residential buildings.",
        technologies: "Python, Raspberry Pi, TensorFlow, AWS",
        link: "github.com/rahulsharma/smart-energy"
      }
    ]
  });
  
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Handler for updating personal information
  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personal: {
        ...resumeData.personal,
        [field]: value
      }
    });
  };
  
  // Generic handler for adding a new item to a section
  const addItem = (section: keyof Omit<ResumeData, 'personal'>) => {
    const newId = Math.max(0, ...resumeData[section].map(item => item.id)) + 1;
    
    let newItem;
    
    switch (section) {
      case 'education':
        newItem = {
          id: newId,
          institution: "",
          degree: "",
          field: "",
          startDate: "",
          endDate: "",
          gpa: ""
        };
        break;
      case 'experience':
        newItem = {
          id: newId,
          company: "",
          position: "",
          location: "",
          startDate: "",
          endDate: "",
          description: ""
        };
        break;
      case 'skills':
        newItem = {
          id: newId,
          category: "",
          skills: ""
        };
        break;
      case 'projects':
        newItem = {
          id: newId,
          name: "",
          description: "",
          technologies: "",
          link: ""
        };
        break;
      default:
        return;
    }
    
    setResumeData({
      ...resumeData,
      [section]: [...resumeData[section], newItem]
    });
  };
  
  // Generic handler for removing an item from a section
  const removeItem = (section: keyof Omit<ResumeData, 'personal'>, id: number) => {
    setResumeData({
      ...resumeData,
      [section]: resumeData[section].filter(item => item.id !== id)
    });
  };
  
  // Generic handler for updating an item in a section
  const updateItem = (section: keyof Omit<ResumeData, 'personal'>, id: number, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      [section]: resumeData[section].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };
  
  // Handle resume download
  const handleDownload = () => {
    // In a real app, this would generate a PDF using a library like jsPDF or call a backend
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(resumeData, null, 2)], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `${resumeData.personal.name.replace(/\s+/g, '_')}_Resume.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Resume Editor</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsPreviewOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Resume
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="personal">
        <TabsList className="mb-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
        </TabsList>
        
        <TabsContent value="personal">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={resumeData.personal.name} 
                      onChange={(e) => updatePersonalInfo("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={resumeData.personal.email} 
                      onChange={(e) => updatePersonalInfo("email", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input 
                      id="phone" 
                      value={resumeData.personal.phone} 
                      onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input 
                      id="address" 
                      value={resumeData.personal.address} 
                      onChange={(e) => updatePersonalInfo("address", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input 
                      id="linkedin" 
                      value={resumeData.personal.linkedin} 
                      onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input 
                      id="github" 
                      value={resumeData.personal.github} 
                      onChange={(e) => updatePersonalInfo("github", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea 
                    id="summary" 
                    rows={5} 
                    value={resumeData.personal.summary} 
                    onChange={(e) => updatePersonalInfo("summary", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="education">
          <Card>
            <CardContent className="p-6">
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="mb-6 pb-6 border-b last:border-b-0 last:pb-0 last:mb-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Education #{edu.id}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeItem("education", edu.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`edu-inst-${edu.id}`}>Institution</Label>
                      <Input 
                        id={`edu-inst-${edu.id}`} 
                        value={edu.institution} 
                        onChange={(e) => updateItem("education", edu.id, "institution", e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`edu-degree-${edu.id}`}>Degree</Label>
                        <Input 
                          id={`edu-degree-${edu.id}`} 
                          value={edu.degree} 
                          onChange={(e) => updateItem("education", edu.id, "degree", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-field-${edu.id}`}>Field of Study</Label>
                        <Input 
                          id={`edu-field-${edu.id}`} 
                          value={edu.field} 
                          onChange={(e) => updateItem("education", edu.id, "field", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`edu-start-${edu.id}`}>Start Date</Label>
                        <Input 
                          id={`edu-start-${edu.id}`} 
                          placeholder="e.g., 2020" 
                          value={edu.startDate} 
                          onChange={(e) => updateItem("education", edu.id, "startDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-end-${edu.id}`}>End Date</Label>
                        <Input 
                          id={`edu-end-${edu.id}`} 
                          placeholder="e.g., 2024 or Present" 
                          value={edu.endDate} 
                          onChange={(e) => updateItem("education", edu.id, "endDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-gpa-${edu.id}`}>GPA/Grade</Label>
                        <Input 
                          id={`edu-gpa-${edu.id}`} 
                          placeholder="e.g., 3.8/4.0" 
                          value={edu.gpa} 
                          onChange={(e) => updateItem("education", edu.id, "gpa", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                className="mt-4 w-full" 
                variant="outline"
                onClick={() => addItem("education")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Education
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="experience">
          <Card>
            <CardContent className="p-6">
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="mb-6 pb-6 border-b last:border-b-0 last:pb-0 last:mb-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Experience #{exp.id}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeItem("experience", exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`exp-company-${exp.id}`}>Company</Label>
                        <Input 
                          id={`exp-company-${exp.id}`} 
                          value={exp.company} 
                          onChange={(e) => updateItem("experience", exp.id, "company", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-position-${exp.id}`}>Position</Label>
                        <Input 
                          id={`exp-position-${exp.id}`} 
                          value={exp.position} 
                          onChange={(e) => updateItem("experience", exp.id, "position", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`exp-location-${exp.id}`}>Location</Label>
                        <Input 
                          id={`exp-location-${exp.id}`} 
                          value={exp.location} 
                          onChange={(e) => updateItem("experience", exp.id, "location", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-start-${exp.id}`}>Start Date</Label>
                        <Input 
                          id={`exp-start-${exp.id}`} 
                          placeholder="e.g., May 2023" 
                          value={exp.startDate} 
                          onChange={(e) => updateItem("experience", exp.id, "startDate", e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-end-${exp.id}`}>End Date</Label>
                        <Input 
                          id={`exp-end-${exp.id}`} 
                          placeholder="e.g., July 2023 or Present" 
                          value={exp.endDate} 
                          onChange={(e) => updateItem("experience", exp.id, "endDate", e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`exp-desc-${exp.id}`}>Description</Label>
                      <Textarea 
                        id={`exp-desc-${exp.id}`} 
                        rows={3} 
                        value={exp.description} 
                        onChange={(e) => updateItem("experience", exp.id, "description", e.target.value)}
                        placeholder="Describe your responsibilities and achievements"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                className="mt-4 w-full" 
                variant="outline"
                onClick={() => addItem("experience")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skills">
          <Card>
            <CardContent className="p-6">
              {resumeData.skills.map((skill) => (
                <div key={skill.id} className="mb-6 pb-6 border-b last:border-b-0 last:pb-0 last:mb-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Skill Set #{skill.id}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeItem("skills", skill.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`skill-cat-${skill.id}`}>Category</Label>
                      <Input 
                        id={`skill-cat-${skill.id}`} 
                        placeholder="e.g., Programming Languages" 
                        value={skill.category} 
                        onChange={(e) => updateItem("skills", skill.id, "category", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`skill-list-${skill.id}`}>Skills (comma separated)</Label>
                      <Textarea 
                        id={`skill-list-${skill.id}`} 
                        value={skill.skills} 
                        onChange={(e) => updateItem("skills", skill.id, "skills", e.target.value)}
                        placeholder="e.g., JavaScript, Python, Java, C++"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                className="mt-4 w-full" 
                variant="outline"
                onClick={() => addItem("skills")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Skill Set
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="projects">
          <Card>
            <CardContent className="p-6">
              {resumeData.projects.map((project) => (
                <div key={project.id} className="mb-6 pb-6 border-b last:border-b-0 last:pb-0 last:mb-0">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Project #{project.id}</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => removeItem("projects", project.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`proj-name-${project.id}`}>Project Name</Label>
                      <Input 
                        id={`proj-name-${project.id}`} 
                        value={project.name} 
                        onChange={(e) => updateItem("projects", project.id, "name", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`proj-desc-${project.id}`}>Description</Label>
                      <Textarea 
                        id={`proj-desc-${project.id}`} 
                        rows={3} 
                        value={project.description} 
                        onChange={(e) => updateItem("projects", project.id, "description", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`proj-tech-${project.id}`}>Technologies Used</Label>
                      <Input 
                        id={`proj-tech-${project.id}`} 
                        placeholder="e.g., React, Node.js, MongoDB" 
                        value={project.technologies} 
                        onChange={(e) => updateItem("projects", project.id, "technologies", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`proj-link-${project.id}`}>Project Link</Label>
                      <Input 
                        id={`proj-link-${project.id}`} 
                        placeholder="e.g., github.com/username/project" 
                        value={project.link} 
                        onChange={(e) => updateItem("projects", project.id, "link", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              <Button 
                className="mt-4 w-full" 
                variant="outline"
                onClick={() => addItem("projects")}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Resume Preview Modal */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Resume Preview</DialogTitle>
          </DialogHeader>
          
          <div className="bg-white p-8 shadow-sm border rounded-md">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold">{resumeData.personal.name}</h1>
              <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 mt-2 text-sm text-gray-600">
                <span>{resumeData.personal.email}</span>
                <span>|</span>
                <span>{resumeData.personal.phone}</span>
                <span>|</span>
                <span>{resumeData.personal.address}</span>
              </div>
              <div className="flex justify-center gap-x-3 mt-1 text-sm text-gray-600">
                <span>{resumeData.personal.linkedin}</span>
                <span>|</span>
                <span>{resumeData.personal.github}</span>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-bold border-b pb-1 mb-3">Professional Summary</h2>
              <p className="text-sm">{resumeData.personal.summary}</p>
            </div>
            
            {resumeData.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold border-b pb-1 mb-3">Education</h2>
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{edu.institution}</h3>
                      <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <div className="text-sm">
                      <p>{edu.degree} in {edu.field}</p>
                      {edu.gpa && <p>GPA: {edu.gpa}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {resumeData.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold border-b pb-1 mb-3">Experience</h2>
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{exp.company}</h3>
                      <span className="text-sm">{exp.startDate} - {exp.endDate}</span>
                    </div>
                    <p className="italic text-sm">{exp.position}{exp.location ? ` | ${exp.location}` : ""}</p>
                    <p className="text-sm mt-1">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}
            
            {resumeData.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold border-b pb-1 mb-3">Skills</h2>
                {resumeData.skills.map((skill) => (
                  <div key={skill.id} className="mb-2">
                    <p><span className="font-bold">{skill.category}:</span> {skill.skills}</p>
                  </div>
                ))}
              </div>
            )}
            
            {resumeData.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold border-b pb-1 mb-3">Projects</h2>
                {resumeData.projects.map((project) => (
                  <div key={project.id} className="mb-4">
                    <h3 className="font-bold">{project.name} {project.link && <span className="font-normal text-sm">({project.link})</span>}</h3>
                    <p className="text-sm italic">{project.technologies}</p>
                    <p className="text-sm mt-1">{project.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="flex justify-end mt-4">
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResumeEditor;
