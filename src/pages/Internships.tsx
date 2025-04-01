
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Briefcase, Calendar, Clock, ExternalLink, MapPin, Plus, Star } from "lucide-react";

const activeInternships = [
  {
    id: 1,
    company: "TechNova",
    position: "Machine Learning Intern",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop",
    location: "Remote",
    type: "Part-time",
    startDate: "May 15, 2023",
    endDate: "Aug 15, 2023",
    progress: 65,
    tasks: 14,
    completedTasks: 9,
    skills: ["Python", "TensorFlow", "Data Analysis"],
    manager: "Dr. Sarah Chen"
  }
];

const pastInternships = [
  {
    id: 2,
    company: "WebTech Solutions",
    position: "Frontend Developer Intern",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=50&h=50&fit=crop",
    location: "San Francisco, CA (Hybrid)",
    type: "Full-time",
    startDate: "Jan 10, 2023",
    endDate: "Apr 5, 2023",
    skills: ["React", "TypeScript", "UI/UX"],
    manager: "Michael Johnson",
    rating: 4.8,
    letterOfRecommendation: true,
    projects: [
      "Designed and implemented responsive dashboard UI",
      "Optimized application performance by 30%"
    ]
  },
  {
    id: 3,
    company: "DataViz Corp",
    position: "Data Science Intern",
    logo: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=50&h=50&fit=crop",
    location: "Boston, MA (On-site)",
    type: "Full-time",
    startDate: "May 20, 2022",
    endDate: "Aug 25, 2022",
    skills: ["Python", "SQL", "Data Visualization"],
    manager: "Emily Rodriguez",
    rating: 4.5,
    letterOfRecommendation: true,
    projects: [
      "Created predictive models for customer churn analysis",
      "Built interactive data visualization dashboard"
    ]
  }
];

const opportunities = [
  {
    id: 1,
    company: "Quantum Solutions",
    position: "Backend Development Intern",
    logo: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=50&h=50&fit=crop",
    location: "Remote",
    type: "Part-time",
    deadline: "Oct 30, 2023",
    stipend: "$25/hour",
    duration: "3 months",
    skills: ["Node.js", "MongoDB", "Express"],
    match: 95
  },
  {
    id: 2,
    company: "CloudScale Inc",
    position: "Cloud Engineering Intern",
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50&fit=crop",
    location: "Austin, TX (Hybrid)",
    type: "Full-time",
    deadline: "Nov 15, 2023",
    stipend: "$30/hour",
    duration: "6 months",
    skills: ["AWS", "Docker", "Kubernetes"],
    match: 88
  },
  {
    id: 3,
    company: "ByteWave Technologies",
    position: "Mobile App Development Intern",
    logo: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=50&h=50&fit=crop",
    location: "New York, NY (On-site)",
    type: "Full-time",
    deadline: "Nov 30, 2023",
    stipend: "$28/hour",
    duration: "4 months",
    skills: ["React Native", "iOS", "Android"],
    match: 82
  }
];

const Internships = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Internships</h1>
          <p className="text-muted-foreground">Manage your internships and discover new opportunities</p>
        </div>
        
        <div className="flex gap-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Internship
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="past">Past Internships</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          {activeInternships.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {activeInternships.map(internship => (
                <Card key={internship.id} className="overflow-hidden">
                  <div className="h-2 bg-primary" />
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-14 w-14 border">
                          <AvatarImage src={internship.logo} alt={internship.company} />
                          <AvatarFallback>{internship.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-xl">{internship.position}</CardTitle>
                          <CardDescription className="text-base">{internship.company}</CardDescription>
                          <div className="flex items-center gap-2 mt-1 text-sm">
                            <Badge variant="outline" className="font-normal">
                              <MapPin className="mr-1 h-3 w-3" />
                              {internship.location}
                            </Badge>
                            <Badge variant="outline" className="font-normal">
                              <Clock className="mr-1 h-3 w-3" />
                              {internship.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Portal
                      </Button>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Start Date</p>
                        <p className="font-medium">{internship.startDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">End Date</p>
                        <p className="font-medium">{internship.endDate}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Reporting Manager</p>
                        <p className="font-medium">{internship.manager}</p>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-muted-foreground">
                          <span>Tasks</span>
                          <span>{internship.completedTasks}/{internship.tasks}</span>
                        </div>
                        <Progress value={(internship.completedTasks / internship.tasks) * 100} className="h-2" />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Internship Progress</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Overall Completion</span>
                          <span>{internship.progress}%</span>
                        </div>
                        <Progress value={internship.progress} className="h-2" />
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Skills Development</p>
                      <div className="flex flex-wrap gap-2">
                        {internship.skills.map((skill, idx) => (
                          <Badge key={idx}>{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="border-t pt-4 flex justify-between">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Button>
                    <Button size="sm">Update Progress</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border rounded-lg">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Active Internships</h3>
              <p className="text-muted-foreground mb-4">You don't have any active internships at the moment.</p>
              <Button>Find Opportunities</Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastInternships.map(internship => (
              <Card key={internship.id}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src={internship.logo} alt={internship.company} />
                      <AvatarFallback>{internship.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle>{internship.position}</CardTitle>
                      <CardDescription>{internship.company}</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{internship.location}</Badge>
                        <Badge variant="outline">{internship.type}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-amber-500 font-medium">{internship.rating}</span>
                      <Star className="h-4 w-4 fill-amber-500 text-amber-500 ml-1" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{internship.startDate} - {internship.endDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Manager</p>
                      <p className="font-medium">{internship.manager}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">Key Projects</p>
                    <ul className="space-y-1 text-sm list-disc pl-4">
                      {internship.projects.map((project, idx) => (
                        <li key={idx}>{project}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Skills Gained</p>
                    <div className="flex flex-wrap gap-2">
                      {internship.skills.map((skill, idx) => (
                        <Badge key={idx} variant="outline">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between">
                  <Button variant="outline" size="sm">Add to Resume</Button>
                  {internship.letterOfRecommendation && (
                    <Button size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Recommendation
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="opportunities">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opportunities.map(opportunity => (
              <Card key={opportunity.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border">
                        <AvatarImage src={opportunity.logo} alt={opportunity.company} />
                        <AvatarFallback>{opportunity.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{opportunity.position}</CardTitle>
                        <CardDescription>{opportunity.company}</CardDescription>
                      </div>
                    </div>
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                      {opportunity.match}% Match
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium">{opportunity.location}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Type</p>
                      <p className="font-medium">{opportunity.type}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{opportunity.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Stipend</p>
                      <p className="font-medium">{opportunity.stipend}</p>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <p className="text-sm text-muted-foreground mb-2">Required Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {opportunity.skills.map((skill, idx) => (
                        <Badge key={idx}>{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    <Calendar className="inline h-4 w-4 mr-1" /> 
                    Apply by: {opportunity.deadline}
                  </div>
                  <Button size="sm">Apply Now</Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed bg-muted/40 flex flex-col items-center justify-center p-8 text-center h-full">
              <Briefcase className="h-10 w-10 mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Looking for more?</h3>
              <p className="text-sm text-muted-foreground mb-4">Update your preferences to get more targeted internship recommendations.</p>
              <Button>Update Preferences</Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Internships;
