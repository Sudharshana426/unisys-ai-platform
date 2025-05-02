<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
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
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Check, 
  Eye, 
  FileCheck, 
  FilterX, 
  PlusCircle, 
  Search,
  X
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import AddCertificationModal from "@/components/certifications/AddCertificationModal";
import ViewCertificateModal from "@/components/certifications/ViewCertificateModal";
<<<<<<< HEAD
import axios from 'axios';
import { toast } from "sonner";

const API_URL = 'http://localhost:5000/api';

const Certifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [certifications, setCertifications] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/certifications`);
      if (response.data) {
        setCertifications(response.data);
        setError(null);
      } else {
        setError('No data received from server');
      }
    } catch (err) {
      console.error("Error fetching certifications:", err);
      setError(err.response?.data?.message || 'Failed to fetch certifications');
    } finally {
      setLoading(false);
    }
  };

  const handleAddCertification = async (newCertification) => {
    try {
      const formData = new FormData();
      Object.keys(newCertification).forEach(key => {
        if (key === 'skills') {
          formData.append(key, JSON.stringify(newCertification[key]));
        } else if (key === 'file' && newCertification[key]) {
          formData.append('certificate', newCertification[key]);
        } else {
          formData.append(key, newCertification[key]);
        }
      });

      const response = await axios.post(`${API_URL}/certifications`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });

      if (response.data) {
        setCertifications(prevCerts => [...prevCerts, response.data]);
        setIsAddModalOpen(false);
        toast.success("Certification added successfully!");
      } else {
        toast.error("Failed to add certification: No data received");
      }
    } catch (err) {
      console.error("Error adding certification:", err);
      toast.error(err.response?.data?.message || "Failed to add certification");
    }
  };

  const handleDeleteCertification = async (id) => {
    try {
      await axios.delete(`${API_URL}/certifications/${id}`);
      setCertifications(certifications.filter(cert => cert._id !== id));
    } catch (err) {
      setError('Failed to delete certification');
    }
  };

  const viewCertificate = (certificate) => {
    setSelectedCertificate(certificate);
    setIsViewModalOpen(true);
=======
import { toast } from "sonner";

const Certifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [skillFilter, setSkillFilter] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewCertificate, setViewCertificate] = useState<any | null>(null);
  
  // Sample data - in a real app, this would come from your backend
  const [certifications, setCertifications] = useState([
    {
      id: 1,
      name: "Machine Learning Specialization",
      provider: "Coursera",
      issueDate: "Jan 2023",
      expiryDate: "No Expiry",
      credentialID: "MLSPEC123456",
      skills: ["Python", "Machine Learning", "Data Science", "TensorFlow"],
      logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50&fit=crop",
      fileURL: "",
      fileName: ""
    },
    {
      id: 2,
      name: "AWS Certified Solutions Architect",
      provider: "Amazon Web Services",
      issueDate: "Mar 2023",
      expiryDate: "Mar 2026",
      credentialID: "AWS-CSA-98765432",
      skills: ["AWS", "Cloud Computing", "Infrastructure", "DevOps"],
      logo: "https://images.unsplash.com/photo-1535957998253-26ae1ef29506?w=50&h=50&fit=crop",
      fileURL: "",
      fileName: ""
    },
    {
      id: 3,
      name: "React Developer Certification",
      provider: "Meta",
      issueDate: "Nov 2022",
      expiryDate: "No Expiry",
      credentialID: "META-REACT-123987",
      skills: ["React", "JavaScript", "Frontend", "Web Development"],
      logo: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=50&h=50&fit=crop",
      fileURL: "",
      fileName: ""
    },
    {
      id: 4,
      name: "Python for Data Science",
      provider: "IBM",
      issueDate: "Sep 2022",
      expiryDate: "No Expiry",
      credentialID: "IBM-PDS-456789",
      skills: ["Python", "Data Science", "Data Analysis", "Pandas"],
      logo: "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?w=50&h=50&fit=crop",
      fileURL: "",
      fileName: ""
    }
  ]);
  
  const handleAddCertification = (certification: any) => {
    setCertifications([...certifications, certification]);
  };
  
  const handleDeleteCertification = (id: number) => {
    setCertifications(certifications.filter(cert => cert.id !== id));
    toast.success("Certification deleted successfully");
  };
  
  // Get all unique skills from certifications
  const allSkills = [...new Set(certifications.flatMap(cert => cert.skills))].sort();
  
  // Filter certifications based on search term and skill filter
  const filteredCertifications = certifications.filter(cert => {
    // Filter by search term
    const matchesSearch = 
      cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.credentialID.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by selected skills
    const matchesSkills = skillFilter.length === 0 || 
      skillFilter.some(skill => cert.skills.includes(skill));
    
    return matchesSearch && matchesSkills;
  });
  
  const toggleSkillFilter = (skill: string) => {
    if (skillFilter.includes(skill)) {
      setSkillFilter(skillFilter.filter(s => s !== skill));
    } else {
      setSkillFilter([...skillFilter, skill]);
    }
  };
  
  const clearFilters = () => {
    setSearchTerm("");
    setSkillFilter([]);
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
  };

  const filteredCertifications = certifications.filter(cert => 
    cert.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cert.issuingOrganization.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Certifications</h1>
          <p className="text-muted-foreground">Manage your professional certifications and credentials</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            Add Certification
          </Button>
        </div>
      </div>
<<<<<<< HEAD
      
      <div className="relative flex-1 mb-6">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Search certifications by name, provider, or skills..."
          className="pl-8" 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <Tabs defaultValue="active">
        <TabsList className="mb-4">
          <TabsTrigger value="active">Active Certifications</TabsTrigger>
          <TabsTrigger value="expired">Expired</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCertifications.filter(cert => !cert.expiryDate?.includes("Expired")).map((certification) => (
              <Card key={certification._id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {certification.name}
                      </CardTitle>
                      <CardDescription>
                        {certification.issuingOrganization}
                      </CardDescription>
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {certification.issuingOrganization.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Issue Date</p>
                      <p className="font-medium">{certification.dateIssued}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">{certification.expiryDate}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Credential ID</p>
                      <p className="font-medium">{certification.credentialId}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {certification.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteCertification(certification._id)}
                  >
                    Delete
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={() => viewCertificate(certification)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Certificate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="expired" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCertifications.filter(cert => cert.expiryDate?.includes("Expired")).map((certification) => (
              <Card key={certification._id} className="border-dashed bg-muted/40">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2 text-muted-foreground">
                        {certification.name}
                        <Badge variant="outline" className="text-red-500 border-red-500">Expired</Badge>
                      </CardTitle>
                      <CardDescription>
                        {certification.issuingOrganization}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Issue Date</p>
                      <p className="font-medium">{certification.dateIssued}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">{certification.expiryDate}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteCertification(certification._id)}
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {isAddModalOpen && (
        <AddCertificationModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddCertification}
        />
      )}

      {isViewModalOpen && selectedCertificate && (
        <ViewCertificateModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          certificate={selectedCertificate}
        />
      )}
=======

      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-3/4">
          {/* Search and filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search certifications..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {skillFilter.length > 0 && (
              <Button variant="outline" onClick={clearFilters} className="whitespace-nowrap">
                <FilterX className="h-4 w-4 mr-2" />
                Clear Filters ({skillFilter.length})
              </Button>
            )}
          </div>
          
          {/* Display active skill filters */}
          {skillFilter.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {skillFilter.map(skill => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => toggleSkillFilter(skill)}
                  />
                </Badge>
              ))}
            </div>
          )}
          
          {/* Certifications list */}
          {filteredCertifications.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredCertifications.map(certification => (
                <Card key={certification.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img 
                            src={certification.logo} 
                            alt={certification.provider} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <CardTitle className="text-base">{certification.name}</CardTitle>
                          <CardDescription>{certification.provider}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Issued:</span> {certification.issueDate}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Expires:</span> {certification.expiryDate}
                      </div>
                      <div className="col-span-2">
                        <span className="text-muted-foreground">Credential ID:</span> {certification.credentialID}
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <span className="text-sm text-muted-foreground">Skills:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {certification.skills.map((skill, index) => (
                          <Badge 
                            key={index} 
                            variant={skillFilter.includes(skill) ? "default" : "outline"}
                            className="cursor-pointer text-xs"
                            onClick={() => toggleSkillFilter(skill)}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setViewCertificate(certification)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      className="flex-1"
                      onClick={() => handleDeleteCertification(certification.id)}
                    >
                      <X className="h-4 w-4 mr-1" />
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                {searchTerm || skillFilter.length > 0 ? (
                  <>
                    <div className="rounded-full bg-muted p-3 mb-4">
                      <Search className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No matching certifications</h3>
                    <p className="text-center text-muted-foreground mb-4">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="rounded-full bg-primary/10 p-3 mb-4">
                      <FileCheck className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">No Certifications Yet</h3>
                    <p className="text-center text-muted-foreground mb-4">
                      Add your professional certifications to showcase your skills and expertise.
                    </p>
                    <Button onClick={() => setIsAddModalOpen(true)}>
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Your First Certification
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Sidebar with filter options */}
        <div className="md:w-1/4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Filter by Skill</CardTitle>
              <CardDescription>
                Select skills to filter certifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {allSkills.map(skill => (
                  <div 
                    key={skill} 
                    className={`
                      flex items-center rounded-md px-2 py-1 text-sm cursor-pointer
                      ${skillFilter.includes(skill) ? 'bg-primary/10' : 'hover:bg-muted'}
                    `}
                    onClick={() => toggleSkillFilter(skill)}
                  >
                    {skillFilter.includes(skill) ? (
                      <Check className="h-4 w-4 mr-2 text-primary" />
                    ) : (
                      <div className="w-4 h-4 mr-2" />
                    )}
                    {skill}
                    <span className="ml-auto text-muted-foreground">
                      {certifications.filter(cert => cert.skills.includes(skill)).length}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              {skillFilter.length > 0 && (
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              )}
            </CardFooter>
          </Card>
          
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Certifications:</span>
                  <span className="font-medium">{certifications.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Recently Added:</span>
                  <span className="font-medium">
                    {certifications.length > 0 ? 
                      certifications[certifications.length - 1].name.slice(0, 15) + '...' : 
                      'None'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Unique Skills:</span>
                  <span className="font-medium">{allSkills.length}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Add Certification Modal */}
      <AddCertificationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCertification}
      />
      
      {/* View Certificate Modal */}
      <ViewCertificateModal
        isOpen={!!viewCertificate}
        onClose={() => setViewCertificate(null)}
        certificate={viewCertificate}
      />
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
    </div>
  );
};

export default Certifications;
