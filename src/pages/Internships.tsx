import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Clock, ExternalLink, Loader2, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';

<<<<<<< HEAD
interface Internship {
  id: string;
  title: string;
  company_name: string;
  company_logo?: string;
  location: string;
  url: string;
  posted_date: string;
  description?: string;
  remote?: boolean;
  employment_type?: string[];
}

const INTERNSHIPS_API_CONFIG = {
  url: 'https://internships-api.p.rapidapi.com/active-ats-7d',
  headers: {
    'x-rapidapi-host': 'internships-api.p.rapidapi.com',
    'x-rapidapi-key': 'cf1810e4a2msh1f40a6918f3774ep17bda9jsn819e92549d30'
  }
};

const InternshipsPage = () => {
  const [internships, setInternships] = useState<Internship[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<Internship[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(INTERNSHIPS_API_CONFIG.url, {
          headers: INTERNSHIPS_API_CONFIG.headers
        });
        setInternships(response.data);
        setFilteredInternships(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch internships. Please try again later.');
        setLoading(false);
      }
    };

    fetchInternships();
  }, []);

  useEffect(() => {
    const filtered = internships.filter(internship => {
      const matchesSearch = !searchQuery || 
        internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        internship.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesLocation = !locationFilter ||
        internship.location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesLocation;
    });

    setFilteredInternships(filtered);
  }, [searchQuery, locationFilter, internships]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Internships</h1>
          <p className="text-muted-foreground">Find the perfect internship opportunity</p>
        </div>
        </div>
        
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search internships..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter by location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="w-full">
            <Filter className="mr-2 h-4 w-4" />
            More Filters
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map((internship) => (
          <Card key={internship.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                        <div>
                  <CardTitle className="text-lg">{internship.title}</CardTitle>
                  <CardDescription className="mt-1">{internship.company_name}</CardDescription>
                          </div>
                {internship.company_logo && (
                  <img
                    src={internship.company_logo}
                    alt={`${internship.company_name} logo`}
                    className="w-12 h-12 object-contain"
                  />
                )}
                  </div>
                </CardHeader>
                <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {internship.location}
                    </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="mr-2 h-4 w-4" />
                  Posted {formatDistanceToNow(new Date(internship.posted_date))} ago
                    </div>
                {internship.remote && (
                  <Badge variant="secondary">Remote</Badge>
                )}
                  </div>
              {internship.description && (
                <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                  {internship.description}
                </p>
              )}
                </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <a href={internship.url} target="_blank" rel="noopener noreferrer">
                  Apply Now
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

      {filteredInternships.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-semibold">No internships found</h3>
          <p className="mt-1 text-muted-foreground">
            Try adjusting your search or filters to find more opportunities.
          </p>
                      </div>
      )}
=======
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  Building, 
  Calendar, 
  Check, 
  Clock, 
  Download, 
  Edit, 
  ExternalLink,
  FileText, 
  MapPin, 
  PlusCircle, 
  X 
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Internships = () => {
  const [isAddInternshipOpen, setIsAddInternshipOpen] = useState(false);
  const [isEditInternshipOpen, setIsEditInternshipOpen] = useState(false);
  const [viewDetails, setViewDetails] = useState<any | null>(null);
  const [internshipToEdit, setInternshipToEdit] = useState<any | null>(null);
  const [viewOffer, setViewOffer] = useState<any | null>(null);
  const [isAddOpportunityOpen, setIsAddOpportunityOpen] = useState(false);
  
  // Form states for adding new internship
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    locationType: "On-site",
    startDate: "",
    endDate: "",
    status: "Completed",
    skills: "",
    description: "",
    offerLetter: null as File | null,
    completionCertificate: null as File | null
  });
  
  // Sample data - in a real app, this would come from your backend
  const [internships, setInternships] = useState([
    {
      id: 1,
      company: "Microsoft",
      position: "Software Engineering Intern",
      location: "Bangalore, India",
      locationType: "On-site",
      startDate: "May 2023",
      endDate: "July 2023",
      status: "Completed",
      skills: ["C#", ".NET", "Azure", "SQL"],
      description: "Developed and deployed microservices using .NET Core, implemented CI/CD pipelines, and contributed to the improvement of API performance by 30%.",
      logo: "https://images.unsplash.com/photo-1583312708610-fe16a34b0826?w=50&h=50&fit=crop",
      offerLetterURL: "",
      certificateURL: "",
      mentors: [
        { name: "Rahul Kapoor", designation: "Senior Engineer", email: "rahul.k@microsoft.com" }
      ],
      projects: [
        { name: "API Gateway Optimization", technologies: ["ASP.NET Core", "Azure", "Kubernetes"] }
      ]
    },
    {
      id: 2,
      company: "TCS",
      position: "Project Trainee",
      location: "Remote",
      locationType: "Remote",
      startDate: "Dec 2022",
      endDate: "Feb 2023",
      status: "Completed",
      skills: ["React", "Node.js", "Express", "MongoDB"],
      description: "Built a full-stack application using React and Node.js, collaborated with a team of 5 members to deliver project milestones on time.",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=50&h=50&fit=crop",
      offerLetterURL: "",
      certificateURL: "",
      mentors: [
        { name: "Priya Sharma", designation: "Project Manager", email: "priya.s@tcs.com" }
      ],
      projects: [
        { name: "Customer Management Portal", technologies: ["React", "Redux", "Express", "MongoDB"] }
      ]
    }
  ]);
  
  const [opportunities, setOpportunities] = useState([
    {
      id: 1,
      company: "Google",
      position: "Software Engineering Intern",
      location: "Hyderabad, India",
      deadline: "November 15, 2023",
      applicationUrl: "https://careers.google.com",
      description: "3-month internship program for undergraduate students in their penultimate year of study.",
      skills: ["Java", "Python", "Data Structures", "Algorithms"],
      logo: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=50&h=50&fit=crop",
      status: "Not Applied"
    },
    {
      id: 2,
      company: "Amazon",
      position: "SDE Intern",
      location: "Bangalore, India",
      deadline: "October 30, 2023",
      applicationUrl: "https://amazon.jobs",
      description: "Summer internship opportunity to work with Amazon teams on real-world problems.",
      skills: ["Java", "C++", "AWS", "Database Systems"],
      logo: "https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2?w=50&h=50&fit=crop",
      status: "Applied"
    },
    {
      id: 3,
      company: "Goldman Sachs",
      position: "Technology Summer Analyst",
      location: "Bangalore, India",
      deadline: "November 25, 2023",
      applicationUrl: "https://goldmansachs.com/careers",
      description: "10-week summer internship in the technology division.",
      skills: ["Java", "Python", "SQL", "Financial Domain Knowledge"],
      logo: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=50&h=50&fit=crop",
      status: "Not Applied"
    }
  ]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        [fieldName]: e.target.files[0]
      });
    }
  };
  
  const resetForm = () => {
    setFormData({
      company: "",
      position: "",
      location: "",
      locationType: "On-site",
      startDate: "",
      endDate: "",
      status: "Completed",
      skills: "",
      description: "",
      offerLetter: null,
      completionCertificate: null
    });
  };
  
  const handleAddInternship = (e: React.FormEvent) => {
    e.preventDefault();
    
    const skillsArray = formData.skills.split(',').map(skill => skill.trim());
    
    const newInternship = {
      id: Date.now(),
      company: formData.company,
      position: formData.position,
      location: formData.location,
      locationType: formData.locationType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: formData.status,
      skills: skillsArray,
      description: formData.description,
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=50&h=50&fit=crop",
      offerLetterURL: formData.offerLetter ? URL.createObjectURL(formData.offerLetter) : "",
      certificateURL: formData.completionCertificate ? URL.createObjectURL(formData.completionCertificate) : "",
      mentors: [],
      projects: []
    };
    
    setInternships([...internships, newInternship]);
    resetForm();
    setIsAddInternshipOpen(false);
    toast.success("Internship added successfully!");
  };
  
  const handleEditInternship = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!internshipToEdit) return;
    
    const skillsArray = formData.skills.split(',').map(skill => skill.trim());
    
    const updatedInternship = {
      ...internshipToEdit,
      company: formData.company,
      position: formData.position,
      location: formData.location,
      locationType: formData.locationType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      status: formData.status,
      skills: skillsArray,
      description: formData.description,
      offerLetterURL: formData.offerLetter ? URL.createObjectURL(formData.offerLetter) : internshipToEdit.offerLetterURL,
      certificateURL: formData.completionCertificate ? URL.createObjectURL(formData.completionCertificate) : internshipToEdit.certificateURL,
    };
    
    setInternships(internships.map(internship => 
      internship.id === internshipToEdit.id ? updatedInternship : internship
    ));
    
    resetForm();
    setInternshipToEdit(null);
    setIsEditInternshipOpen(false);
    toast.success("Internship updated successfully!");
  };
  
  const handleDeleteInternship = (id: number) => {
    setInternships(internships.filter(internship => internship.id !== id));
    toast.success("Internship deleted successfully!");
  };
  
  const openEditDialog = (internship: any) => {
    setInternshipToEdit(internship);
    setFormData({
      company: internship.company,
      position: internship.position,
      location: internship.location,
      locationType: internship.locationType,
      startDate: internship.startDate,
      endDate: internship.endDate,
      status: internship.status,
      skills: internship.skills.join(", "),
      description: internship.description,
      offerLetter: null,
      completionCertificate: null
    });
    setIsEditInternshipOpen(true);
  };
  
  const handleApplyToOpportunity = (id: number) => {
    setOpportunities(opportunities.map(opportunity =>
      opportunity.id === id ? { ...opportunity, status: "Applied" } : opportunity
    ));
    toast.success("Application marked as submitted!");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Internships & Opportunities</h1>
          <p className="text-muted-foreground">Track your internships and find new opportunities</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={() => setIsAddInternshipOpen(true)}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            Add Internship
          </Button>
        </div>
      </div>

      <Tabs defaultValue="internships" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="internships">My Internships</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>
        
        {/* Internships Tab */}
        <TabsContent value="internships" className="space-y-4">
          {internships.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {internships.map((internship) => (
                <Card key={internship.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img 
                            src={internship.logo} 
                            alt={internship.company} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{internship.position}</CardTitle>
                          <CardDescription className="flex items-center">
                            <Building className="h-3 w-3 mr-1" /> {internship.company}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge>{internship.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-y-1 text-sm mb-2">
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Badge variant="outline" className="text-xs">
                          {internship.locationType}
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span>{internship.startDate} - {internship.endDate}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <p className="text-sm line-clamp-2">{internship.description}</p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1 mt-3">
                      {internship.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setViewDetails(internship)}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      Details
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1"
                      onClick={() => openEditDialog(internship)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="flex-grow-0"
                      onClick={() => handleDeleteInternship(internship.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Internships Yet</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Add your internship experiences to track and showcase your professional growth.
                </p>
                <Button onClick={() => setIsAddInternshipOpen(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Your First Internship
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-4">
          <div className="flex justify-end">
            <Button 
              variant="outline"
              onClick={() => setIsAddOpportunityOpen(true)}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              Add Opportunity
            </Button>
          </div>
          
          {opportunities.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id} className="flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img 
                            src={opportunity.logo} 
                            alt={opportunity.company} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{opportunity.position}</CardTitle>
                          <CardDescription>{opportunity.company}</CardDescription>
                        </div>
                      </div>
                      {opportunity.status === "Applied" ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <Check className="h-3 w-3 mr-1" />
                          Applied
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          Open
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex items-center gap-1 text-sm mb-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{opportunity.location}</span>
                    </div>
                    
                    <p className="text-sm mb-3 line-clamp-3">{opportunity.description}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-3">
                      {opportunity.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="text-xs text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Deadline: {opportunity.deadline}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => window.open(opportunity.applicationUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    
                    {opportunity.status !== "Applied" ? (
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleApplyToOpportunity(opportunity.id)}
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Mark Applied
                      </Button>
                    ) : (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="flex-1"
                        disabled
                      >
                        <Check className="h-3 w-3 mr-1" />
                        Applied
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Opportunities Found</h3>
                <p className="text-center text-muted-foreground mb-4">
                  We haven't found any matching internship opportunities yet.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* Add Internship Modal */}
      <Dialog open={isAddInternshipOpen} onOpenChange={setIsAddInternshipOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Internship</DialogTitle>
            <DialogDescription>
              Add details about your internship experience
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddInternship} className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g., Microsoft"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineering Intern"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g., Bangalore, India"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="locationType">Location Type</Label>
                  <Select 
                    value={formData.locationType} 
                    onValueChange={(value) => handleSelectChange("locationType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="On-site">On-site</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    placeholder="e.g., May 2023"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    placeholder="e.g., July 2023 or Present"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  placeholder="e.g., React, Node.js, AWS, TypeScript"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your responsibilities and achievements"
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="offerLetter">Offer Letter (Optional)</Label>
                <Input
                  id="offerLetter"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "offerLetter")}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="completionCertificate">Completion Certificate (Optional)</Label>
                <Input
                  id="completionCertificate"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "completionCertificate")}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsAddInternshipOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Add Internship
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Internship Modal */}
      <Dialog open={isEditInternshipOpen} onOpenChange={setIsEditInternshipOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Internship</DialogTitle>
            <DialogDescription>
              Update the details of your internship
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleEditInternship} className="space-y-4 py-4">
            {/* Same form fields as Add Internship, but with existing values */}
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-company">Company</Label>
                  <Input
                    id="edit-company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-position">Position</Label>
                  <Input
                    id="edit-position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Location</Label>
                  <Input
                    id="edit-location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-locationType">Location Type</Label>
                  <Select 
                    value={formData.locationType} 
                    onValueChange={(value) => handleSelectChange("locationType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="On-site">On-site</SelectItem>
                      <SelectItem value="Remote">Remote</SelectItem>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-startDate">Start Date</Label>
                  <Input
                    id="edit-startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-endDate">End Date</Label>
                  <Input
                    id="edit-endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleSelectChange("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-skills">Skills (comma separated)</Label>
                <Input
                  id="edit-skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-offerLetter">Update Offer Letter (Optional)</Label>
                <Input
                  id="edit-offerLetter"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "offerLetter")}
                />
                <p className="text-xs text-muted-foreground">Leave empty to keep existing document</p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-completionCertificate">Update Completion Certificate (Optional)</Label>
                <Input
                  id="edit-completionCertificate"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileChange(e, "completionCertificate")}
                />
                <p className="text-xs text-muted-foreground">Leave empty to keep existing document</p>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditInternshipOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Update Internship
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* View Internship Details Modal */}
      <Dialog open={!!viewDetails} onOpenChange={() => setViewDetails(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl">{viewDetails?.position}</DialogTitle>
            <DialogDescription className="flex items-center gap-1">
              <Building className="h-4 w-4" /> {viewDetails?.company}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-y-4">
              <div>
                <h3 className="font-medium text-sm">Location</h3>
                <p className="flex items-center text-sm">
                  <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
                  {viewDetails?.location} ({viewDetails?.locationType})
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sm">Duration</h3>
                <p className="flex items-center text-sm">
                  <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                  {viewDetails?.startDate} - {viewDetails?.endDate}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-sm">Status</h3>
                <Badge>{viewDetails?.status}</Badge>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-1">Description</h3>
              <p className="text-sm">{viewDetails?.description}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-1">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {viewDetails?.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {viewDetails?.mentors && viewDetails.mentors.length > 0 && (
              <div>
                <h3 className="font-medium text-sm mb-1">Mentors</h3>
                <div className="space-y-2">
                  {viewDetails.mentors.map((mentor: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-muted">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {mentor.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{mentor.name}</p>
                        <p className="text-xs text-muted-foreground">{mentor.designation} • {mentor.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {viewDetails?.projects && viewDetails.projects.length > 0 && (
              <div>
                <h3 className="font-medium text-sm mb-1">Projects</h3>
                <div className="space-y-2">
                  {viewDetails.projects.map((project: any, index: number) => (
                    <div key={index} className="p-2 rounded-md border">
                      <p className="text-sm font-medium">{project.name}</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {project.technologies.map((tech: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex gap-4">
              {viewDetails?.offerLetterURL && (
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setViewOffer({
                    title: "Offer Letter",
                    fileURL: viewDetails.offerLetterURL
                  })}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Offer Letter
                </Button>
              )}
              
              {viewDetails?.certificateURL && (
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setViewOffer({
                    title: "Completion Certificate",
                    fileURL: viewDetails.certificateURL
                  })}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  View Certificate
                </Button>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => openEditDialog(viewDetails)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Internship
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* View Document Modal */}
      <Dialog open={!!viewOffer} onOpenChange={() => setViewOffer(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{viewOffer?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-4">
            {viewOffer?.fileURL ? (
              viewOffer.fileURL.endsWith('.pdf') ? (
                <iframe 
                  src={viewOffer.fileURL} 
                  className="w-full h-[500px]" 
                  title={viewOffer.title}
                />
              ) : (
                <img 
                  src={viewOffer.fileURL} 
                  alt={viewOffer.title} 
                  className="max-w-full max-h-[500px] object-contain"
                />
              )
            ) : (
              <div className="text-center p-10 border rounded-lg">
                <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  No document has been uploaded yet
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            {viewOffer?.fileURL && (
              <Button 
                onClick={() => {
                  if (viewOffer.fileURL) {
                    const link = document.createElement('a');
                    link.href = viewOffer.fileURL;
                    link.download = viewOffer.title || 'document';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
    </div>
  );
};

export default InternshipsPage;
