
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Bookmark, 
  Calendar, 
  Briefcase, 
  MapPin, 
  Search, 
  Filter, 
  ExternalLink, 
  Globe, 
  Clock, 
  ChevronRight, 
  Check, 
  Bell 
} from "lucide-react";

const jobListings = [
  {
    id: 1,
    title: "Software Engineer",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    experience: "3-5 years",
    salary: "$120K - $160K",
    skills: ["Python", "Java", "Machine Learning", "Cloud Infrastructure"],
    postedDate: "2 days ago",
    deadline: "Nov 30, 2023",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop",
    match: 92
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Meta",
    location: "Menlo Park, CA (Remote Option)",
    type: "Full-time",
    experience: "2-4 years",
    salary: "$110K - $140K",
    skills: ["React", "JavaScript", "TypeScript", "CSS"],
    postedDate: "1 week ago",
    deadline: "Dec 15, 2023",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop",
    match: 88
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Full-time",
    experience: "3-6 years",
    salary: "$130K - $170K",
    skills: ["Python", "SQL", "Machine Learning", "Statistics"],
    postedDate: "3 days ago",
    deadline: "Dec 5, 2023",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop",
    match: 84
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "Microsoft",
    location: "Redmond, WA (Hybrid)",
    type: "Full-time",
    experience: "2-5 years",
    salary: "$115K - $155K",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    postedDate: "5 days ago",
    deadline: "Dec 10, 2023",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop",
    match: 76
  }
];

const internshipListings = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "Apple",
    location: "Cupertino, CA",
    type: "Internship (Summer 2024)",
    duration: "12 weeks",
    stipend: "$8,000 per month",
    skills: ["C++", "Swift", "iOS Development"],
    postedDate: "1 day ago",
    deadline: "Dec 31, 2023",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop",
    match: 95
  },
  {
    id: 2,
    title: "Data Science Intern",
    company: "Netflix",
    location: "Los Gatos, CA (Remote)",
    type: "Internship (Summer 2024)",
    duration: "10 weeks",
    stipend: "$7,500 per month",
    skills: ["Python", "Data Analysis", "Machine Learning", "SQL"],
    postedDate: "3 days ago",
    deadline: "Jan 15, 2024",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop",
    match: 89
  },
  {
    id: 3,
    title: "Product Management Intern",
    company: "Airbnb",
    location: "San Francisco, CA",
    type: "Internship (Summer 2024)",
    duration: "12 weeks",
    stipend: "$7,200 per month",
    skills: ["Product Strategy", "Data Analysis", "User Experience"],
    postedDate: "1 week ago",
    deadline: "Jan 10, 2024",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop",
    match: 78
  }
];

const events = [
  {
    id: 1,
    title: "Tech Career Fair 2023",
    organizer: "TechJobs Network",
    date: "November 18, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Virtual",
    description: "Connect with top tech companies hiring for software engineering, data science, and product roles.",
    companies: ["Google", "Microsoft", "Amazon", "Oracle", "IBM"],
    registrationDeadline: "Nov 17, 2023"
  },
  {
    id: 2,
    title: "Women in Tech Summit",
    organizer: "Women Who Code",
    date: "December 5, 2023",
    time: "9:00 AM - 5:00 PM",
    location: "Hybrid (San Francisco & Virtual)",
    description: "Join industry leaders for discussions on career growth, technical leadership, and diversity in tech.",
    speakers: ["Sheryl Sandberg", "Reshma Saujani", "Kimberly Bryant"],
    registrationDeadline: "Dec 1, 2023"
  },
  {
    id: 3,
    title: "Cloud Computing Conference",
    organizer: "Cloud Innovation Foundation",
    date: "December 12-14, 2023",
    time: "9:00 AM - 6:00 PM",
    location: "Chicago, IL",
    description: "Learn about cutting-edge cloud technologies and network with industry professionals.",
    topics: ["AWS", "Azure", "Google Cloud", "DevOps", "Cloud Security"],
    registrationDeadline: "Dec 5, 2023"
  }
];

const applications = [
  {
    id: 1,
    jobTitle: "Machine Learning Engineer",
    company: "Spotify",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop",
    status: "Interview Scheduled",
    appliedDate: "Oct 25, 2023",
    nextSteps: "Technical Interview on Nov 15, 2023",
    progress: 60
  },
  {
    id: 2,
    jobTitle: "Backend Developer",
    company: "Stripe",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop",
    status: "Application Submitted",
    appliedDate: "Nov 2, 2023",
    nextSteps: "Waiting for recruiter review",
    progress: 20
  },
  {
    id: 3,
    jobTitle: "Frontend Engineer",
    company: "Shopify",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop",
    status: "Assessment Complete",
    appliedDate: "Oct 30, 2023",
    nextSteps: "Waiting for assessment review",
    progress: 40
  }
];

const savedJobs = [
  {
    id: 1,
    title: "Full Stack Developer",
    company: "Dropbox",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop",
    location: "San Francisco, CA",
    salary: "$130K - $160K",
    savedDate: "Oct 29, 2023",
    deadline: "Dec 15, 2023"
  },
  {
    id: 2,
    title: "iOS Developer",
    company: "Robinhood",
    logo: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=50&h=50&fit=crop",
    location: "Menlo Park, CA",
    salary: "$120K - $150K",
    savedDate: "Nov 1, 2023",
    deadline: "Dec 20, 2023"
  }
];

const Opportunities = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filterListings = (listings: any[]) => {
    if (!searchQuery) return listings;
    
    return listings.filter(listing => 
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.skills.some((skill: string) => skill.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };
  
  const filteredJobs = filterListings(jobListings);
  const filteredInternships = filterListings(internshipListings);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Opportunities</h1>
          <p className="text-muted-foreground">Discover jobs, internships, and career events</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Bell className="mr-2 h-4 w-4" />
            Set Alert
          </Button>
        </div>
      </div>
      
      <div className="relative flex-1 mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search jobs, internships, skills..."
          className="pl-8" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="jobs">
        <TabsList className="mb-4">
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="internships">Internships</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs">
          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={job.logo} alt={job.company} />
                      <AvatarFallback>{job.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle>{job.title}</CardTitle>
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                          {job.match}% Match
                        </div>
                      </div>
                      <CardDescription className="flex items-center mt-1">
                        <span className="font-medium">{job.company}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {job.type}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {job.experience}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Salary Range</p>
                      <p className="font-medium">{job.salary}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Required Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Posted </span>
                      <span>{job.postedDate}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Apply by </span>
                      <span>{job.deadline}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button size="sm">Apply Now</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="internships">
          <div className="space-y-4">
            {filteredInternships.map((internship) => (
              <Card key={internship.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={internship.logo} alt={internship.company} />
                      <AvatarFallback>{internship.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle>{internship.title}</CardTitle>
                        <div className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                          {internship.match}% Match
                        </div>
                      </div>
                      <CardDescription className="mt-1">
                        <span className="font-medium">{internship.company}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {internship.location}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {internship.type}
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {internship.duration}
                    </Badge>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Stipend</p>
                      <p className="font-medium">{internship.stipend}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Required Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {internship.skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center gap-4">
                    <div className="text-sm">
                      <span className="text-muted-foreground">Posted </span>
                      <span>{internship.postedDate}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-muted-foreground">Apply by </span>
                      <span>{internship.deadline}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Save
                    </Button>
                    <Button size="sm">Apply Now</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="events">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between">
                    <CardTitle>{event.title}</CardTitle>
                    <Badge variant="outline">
                      {event.location}
                    </Badge>
                  </div>
                  <CardDescription>Organized by {event.organizer}</CardDescription>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="font-medium">{event.date}</p>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                    
                    {event.companies && (
                      <div>
                        <p className="text-sm font-medium mb-2">Participating Companies</p>
                        <div className="flex flex-wrap gap-2">
                          {event.companies.map((company, idx) => (
                            <Badge key={idx} variant="secondary">{company}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {event.speakers && (
                      <div>
                        <p className="text-sm font-medium mb-2">Featured Speakers</p>
                        <div className="flex flex-wrap gap-2">
                          {event.speakers.map((speaker, idx) => (
                            <Badge key={idx} variant="secondary">{speaker}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {event.topics && (
                      <div>
                        <p className="text-sm font-medium mb-2">Topics</p>
                        <div className="flex flex-wrap gap-2">
                          {event.topics.map((topic, idx) => (
                            <Badge key={idx} variant="secondary">{topic}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    Registration Deadline: {event.registrationDeadline}
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="mr-2 h-4 w-4" />
                      Add to Calendar
                    </Button>
                    <Button size="sm">Register</Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed bg-muted/40 flex flex-col items-center justify-center p-8 text-center h-full">
              <Globe className="h-10 w-10 mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Discover More Events</h3>
              <p className="text-sm text-muted-foreground mb-4">Update your preferences to see more events tailored to your interests.</p>
              <Button variant="outline">Update Preferences</Button>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="applications">
          <div className="space-y-4">
            {applications.map((app) => (
              <Card key={app.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={app.logo} alt={app.company} />
                      <AvatarFallback>{app.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <CardTitle>{app.jobTitle}</CardTitle>
                        <Badge variant={
                          app.status === "Interview Scheduled" ? "default" :
                          app.status === "Application Submitted" ? "outline" :
                          "secondary"
                        }>
                          {app.status}
                        </Badge>
                      </div>
                      <CardDescription className="mt-1">{app.company}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <div>
                        <p className="text-muted-foreground">Applied on</p>
                        <p className="font-medium">{app.appliedDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Next Steps</p>
                        <p className="font-medium">{app.nextSteps}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Application Progress</span>
                        <span>{app.progress}%</span>
                      </div>
                      <Progress value={app.progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">View Application</Button>
                  <Button size="sm">
                    {app.status === "Interview Scheduled" ? "Prepare for Interview" : "Check Status"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border border-dashed">
              <CardHeader>
                <CardTitle>Application Tips</CardTitle>
                <CardDescription>Improve your chances of getting hired</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Customize your resume</p>
                      <p className="text-sm text-muted-foreground">Tailor your resume to match the job description</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Follow up after applying</p>
                      <p className="text-sm text-muted-foreground">Send a follow-up email 1-2 weeks after applying</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="bg-primary/10 rounded-full h-6 w-6 flex items-center justify-center">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Prepare for interviews</p>
                      <p className="text-sm text-muted-foreground">Research the company and practice common questions</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full">
                  View All Tips
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="saved">
          {savedJobs.length > 0 ? (
            <div className="space-y-4">
              {savedJobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={job.logo} alt={job.company} />
                        <AvatarFallback>{job.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle>{job.title}</CardTitle>
                        <CardDescription className="mt-1">{job.company}</CardDescription>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </Badge>
                          <Badge variant="outline">
                            {job.salary}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Saved on </span>
                        <span>{job.savedDate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Apply by </span>
                        <span>{job.deadline}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Job
                      </Button>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 border rounded-lg">
              <Bookmark className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Saved Jobs</h3>
              <p className="text-muted-foreground mb-4">When you save jobs, they'll appear here for easy access.</p>
              <Button>Browse Jobs</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Opportunities;
