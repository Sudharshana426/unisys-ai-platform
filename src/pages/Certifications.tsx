
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Award, Calendar, Download, ExternalLink, File, Filter, Plus, Search } from "lucide-react";

const certifications = [
  {
    id: 1,
    name: "AWS Certified Solutions Architect",
    provider: "Amazon Web Services",
    issueDate: "Jan 2023",
    expiryDate: "Jan 2026",
    credentialID: "AWS-12345-CSA",
    skills: ["Cloud Architecture", "AWS Services", "Infrastructure Design"],
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50&fit=crop"
  },
  {
    id: 2,
    name: "TensorFlow Developer Certificate",
    provider: "Google",
    issueDate: "Mar 2023",
    expiryDate: "Mar 2026",
    credentialID: "TF-78901-DEV",
    skills: ["Machine Learning", "Deep Learning", "TensorFlow", "Neural Networks"],
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50&fit=crop"
  },
  {
    id: 3,
    name: "Full Stack Web Development",
    provider: "Udacity",
    issueDate: "Jun 2022",
    expiryDate: "N/A (No Expiry)",
    credentialID: "UD-56789-FSWD",
    skills: ["React", "Node.js", "MongoDB", "REST APIs"],
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50&fit=crop"
  },
  {
    id: 4,
    name: "Microsoft Certified: Azure Developer Associate",
    provider: "Microsoft",
    issueDate: "Dec 2022",
    expiryDate: "Dec 2024",
    credentialID: "MS-24680-ADA",
    skills: ["Azure Services", "Cloud Development", "Azure Functions"],
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50&fit=crop"
  },
  {
    id: 5,
    name: "Oracle Certified Professional: Java SE Programmer",
    provider: "Oracle",
    issueDate: "Sep 2022",
    expiryDate: "No Expiry",
    credentialID: "OCP-13579-JSP",
    skills: ["Java", "OOP", "Data Structures", "Algorithms"],
    logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50&fit=crop"
  }
];

const recommendedCertifications = [
  {
    id: 1,
    name: "Google Cloud Professional Data Engineer",
    provider: "Google",
    difficulty: "Advanced",
    duration: "3 months",
    cost: "$200",
    relevance: 95,
    skills: ["GCP", "BigQuery", "Machine Learning", "Data Pipelines"]
  },
  {
    id: 2,
    name: "Kubernetes Application Developer (CKAD)",
    provider: "Cloud Native Computing Foundation",
    difficulty: "Intermediate",
    duration: "2 months",
    cost: "$300",
    relevance: 88,
    skills: ["Kubernetes", "Docker", "Containers", "Microservices"]
  },
  {
    id: 3,
    name: "CompTIA Security+",
    provider: "CompTIA",
    difficulty: "Intermediate",
    duration: "2-3 months",
    cost: "$370",
    relevance: 82,
    skills: ["Network Security", "Cryptography", "Identity Management"]
  }
];

const Certifications = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCertifications = certifications.filter(cert => 
    cert.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cert.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cert.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Certifications</h1>
          <p className="text-muted-foreground">Track and manage your professional certifications</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Certification
          </Button>
        </div>
      </div>
      
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
          <TabsTrigger value="active">
            Active Certifications
          </TabsTrigger>
          <TabsTrigger value="expired">
            Expired
          </TabsTrigger>
          <TabsTrigger value="recommended">
            Recommended
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCertifications.filter(cert => !cert.expiryDate.includes("Expired")).map((certification) => (
              <Card key={certification.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {certification.name}
                      </CardTitle>
                      <CardDescription>
                        {certification.provider}
                      </CardDescription>
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={certification.logo} alt={certification.provider} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {certification.provider.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                    <div>
                      <p className="text-muted-foreground">Issue Date</p>
                      <p className="font-medium">{certification.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Expiry Date</p>
                      <p className="font-medium">{certification.expiryDate}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Credential ID</p>
                      <p className="font-medium">{certification.credentialID}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {certification.skills.map((skill, index) => (
                      <Badge key={index} variant="outline">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Button size="sm">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Certificate
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="expired">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCertifications.filter(cert => cert.expiryDate.includes("Expired")).length > 0 ? (
              filteredCertifications
                .filter(cert => cert.expiryDate.includes("Expired"))
                .map((certification) => (
                  <Card key={certification.id} className="border-dashed bg-muted/40">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="flex items-center gap-2 text-muted-foreground">
                            {certification.name}
                            <Badge variant="outline" className="text-red-500 border-red-500">Expired</Badge>
                          </CardTitle>
                          <CardDescription>
                            {certification.provider}
                          </CardDescription>
                        </div>
                        <Avatar className="h-10 w-10 opacity-70">
                          <AvatarImage src={certification.logo} alt={certification.provider} />
                          <AvatarFallback className="bg-muted">
                            {certification.provider.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                        <div>
                          <p className="text-muted-foreground">Issue Date</p>
                          <p className="font-medium">{certification.issueDate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expiry Date</p>
                          <p className="font-medium text-red-500">{certification.expiryDate}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-muted-foreground">Credential ID</p>
                          <p className="font-medium">{certification.credentialID}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {certification.skills.map((skill, index) => (
                          <Badge key={index} variant="outline" className="opacity-70">{skill}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Renew
                      </Button>
                    </CardFooter>
                  </Card>
              ))
            ) : (
              <div className="col-span-2 text-center p-12 border rounded-lg">
                <Award className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No Expired Certifications!</h3>
                <p className="text-muted-foreground mb-4">You don't have any expired certifications at the moment.</p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="recommended">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendedCertifications.map((cert) => (
              <Card key={cert.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <div>
                      <CardTitle>{cert.name}</CardTitle>
                      <CardDescription>{cert.provider}</CardDescription>
                    </div>
                    <div className="border rounded-full px-2 py-1 text-xs flex items-center gap-1">
                      <span className="text-muted-foreground">Relevance:</span>
                      <span className="font-bold">{cert.relevance}%</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Difficulty</p>
                      <p className="text-sm font-medium">{cert.difficulty}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium">{cert.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Cost</p>
                      <p className="text-sm font-medium">{cert.cost}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Skills you'll gain</p>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <Button variant="outline" size="sm">Learn More</Button>
                  <Button size="sm">Add to Goals</Button>
                </CardFooter>
              </Card>
            ))}
            
            <Card className="border-dashed bg-muted/40 flex flex-col items-center justify-center p-8 text-center">
              <File className="h-10 w-10 mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Looking for more?</h3>
              <p className="text-sm text-muted-foreground mb-4">Take a skill assessment to get personalized certification recommendations.</p>
              <Button>Take Assessment</Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Certifications;
