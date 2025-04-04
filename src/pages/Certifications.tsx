
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
  };
  
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
    </div>
  );
};

export default Certifications;
