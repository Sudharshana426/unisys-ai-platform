
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Calendar, Code, ExternalLink, FileText, Plus, Search, Trophy } from "lucide-react";
import AddAchievementModal from '@/components/achievements/AddAchievementModal';
import ViewCertificateModal from '@/components/certifications/ViewCertificateModal';

const initialHackathons = [
  {
    id: 1,
    name: "SIH Hackathon 2023",
    date: "March 15-17, 2023",
    position: "Winner",
    category: "Smart Education",
    project: "AI-Powered Learning Assistant",
    teamSize: 5,
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    fileURL: "",
    fileName: ""
  },
  {
    id: 2,
    name: "Google Solutions Challenge",
    date: "January 24-26, 2023",
    position: "2nd Place",
    category: "Sustainability",
    project: "EcoTrack - Campus Sustainability Monitor",
    teamSize: 4,
    image: "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    fileURL: "",
    fileName: ""
  },
  {
    id: 3,
    name: "Microsoft Imagine Cup 2023",
    date: "December 10-12, 2022",
    position: "Finalist",
    category: "Earth",
    project: "WaterSense - Smart Water Management",
    teamSize: 3,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    fileURL: "",
    fileName: ""
  }
];

const initialCompetitions = [
  {
    id: 1,
    name: "ACM ICPC Regionals",
    date: "November 18, 2023",
    position: "6th Rank",
    category: "Competitive Programming",
    team: "Code Crusaders",
    certificate: true,
    fileURL: "",
    fileName: ""
  },
  {
    id: 2,
    name: "Google Kickstart Round D",
    date: "July 23, 2023",
    position: "Top 15%",
    category: "Competitive Programming",
    team: "Individual",
    certificate: true,
    fileURL: "",
    fileName: ""
  },
  {
    id: 3,
    name: "Codeforces Global Round 25",
    date: "June 8, 2023",
    position: "Division 1 (2146 Rating)",
    category: "Competitive Programming",
    team: "Individual",
    certificate: false,
    fileURL: "",
    fileName: ""
  },
  {
    id: 4,
    name: "LeetCode Weekly Contest 312",
    date: "May 14, 2023",
    position: "Top 5% (3/4 problems)",
    category: "Competitive Programming",
    team: "Individual",
    certificate: false,
    fileURL: "",
    fileName: ""
  }
];

const initialPapers = [
  {
    id: 1,
    title: "Machine Learning Approaches for Educational Data Mining",
    authors: "Sharma R., Patel V., Gupta S.",
    publication: "IEEE International Conference on Educational Technology",
    date: "June 2023",
    doi: "10.1109/ICET.2023.123456",
    abstract: "This paper explores various machine learning techniques for analyzing educational data to improve student outcomes and personalize learning experiences.",
    fileURL: "",
    fileName: ""
  },
  {
    id: 2,
    title: "Blockchain-Based Certificate Verification System for Academic Credentials",
    authors: "Sharma R., Kumar A.",
    publication: "Journal of Educational Technology & Society",
    date: "March 2023",
    doi: "10.2307/JETS.2023.789012",
    abstract: "We propose a secure and tamper-proof blockchain framework for issuing and verifying academic credentials to prevent certificate fraud.",
    fileURL: "",
    fileName: ""
  }
];

const Achievements = () => {
  const [hackathons, setHackathons] = useState(initialHackathons);
  const [competitions, setCompetitions] = useState(initialCompetitions);
  const [papers, setPapers] = useState(initialPapers);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'hackathon' | 'competition' | 'paper'>('hackathon');
  
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  
  const handleAddAchievement = (achievement: any) => {
    if (modalType === 'hackathon') {
      setHackathons([...hackathons, achievement]);
    } else if (modalType === 'competition') {
      setCompetitions([...competitions, achievement]);
    } else if (modalType === 'paper') {
      setPapers([...papers, achievement]);
    }
  };
  
  const openAddModal = (type: 'hackathon' | 'competition' | 'paper') => {
    setModalType(type);
    setIsAddModalOpen(true);
  };
  
  const viewFile = (file: any) => {
    setSelectedFile(file);
    setIsViewModalOpen(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Achievements</h1>
          <p className="text-muted-foreground">Track your accomplishments, competitions, and publications</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Search className="mr-2 h-4 w-4" />
            Find Opportunities
          </Button>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Achievement
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-amber-500" />
            Achievement Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">{hackathons.length}</p>
              <p className="text-sm text-muted-foreground">Hackathon Wins</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">{competitions.length}</p>
              <p className="text-sm text-muted-foreground">Coding Competitions</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">{papers.length}</p>
              <p className="text-sm text-muted-foreground">Research Papers</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">
                {competitions.filter(c => c.certificate).length}
              </p>
              <p className="text-sm text-muted-foreground">Certificates</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="hackathons">
        <TabsList className="mb-4">
          <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
          <TabsTrigger value="competitions">Competitions</TabsTrigger>
          <TabsTrigger value="papers">Research Papers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hackathons" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button onClick={() => openAddModal('hackathon')} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Hackathon
            </Button>
          </div>
          
          {hackathons.map((hackathon) => (
            <Card key={hackathon.id}>
              <div className="md:flex">
                <div className="md:w-1/4">
                  <div className="h-48 md:h-full overflow-hidden">
                    <img 
                      src={hackathon.image} 
                      alt={hackathon.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-3/4">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{hackathon.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 mr-1" /> {hackathon.date}
                        </CardDescription>
                      </div>
                      <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500">
                        {hackathon.position}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium">{hackathon.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Project</p>
                        <p className="font-medium">{hackathon.project}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Team Size</p>
                        <p className="font-medium">{hackathon.teamSize} members</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <div className="flex gap-2 ml-auto">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => viewFile({
                          name: hackathon.name, 
                          fileURL: hackathon.fileURL,
                          fileName: hackathon.fileName
                        })}
                        disabled={!hackathon.fileURL}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        View Certificate
                      </Button>
                      <Button size="sm">
                        <Code className="mr-2 h-4 w-4" />
                        Project Details
                      </Button>
                    </div>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="competitions">
          <div className="flex justify-end mb-4">
            <Button onClick={() => openAddModal('competition')} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Competition
            </Button>
          </div>
          
          <div className="space-y-4">
            {competitions.map((competition) => (
              <Card key={competition.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{competition.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" /> {competition.date}
                      </CardDescription>
                    </div>
                    <Badge variant="outline">{competition.position}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium">{competition.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Participation</p>
                      <p className="font-medium">{competition.team}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Certificate</p>
                      <p className="font-medium">{competition.certificate ? "Yes" : "No"}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  {competition.certificate && (
                    <Button 
                      size="sm" 
                      className="ml-auto"
                      onClick={() => viewFile({
                        name: competition.name,
                        fileURL: competition.fileURL,
                        fileName: competition.fileName
                      })}
                      disabled={!competition.fileURL}
                    >
                      <Award className="mr-2 h-4 w-4" />
                      View Certificate
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="papers">
          <div className="flex justify-end mb-4">
            <Button onClick={() => openAddModal('paper')} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Paper
            </Button>
          </div>
          
          <div className="space-y-4">
            {papers.map((paper) => (
              <Card key={paper.id}>
                <CardHeader>
                  <CardTitle>{paper.title}</CardTitle>
                  <CardDescription>{paper.authors}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Publication</p>
                      <p className="font-medium">{paper.publication}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Date</p>
                      <p className="font-medium">{paper.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">DOI</p>
                      <p className="font-medium">{paper.doi}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-muted-foreground">Abstract</p>
                    <p className="text-sm mt-1">{paper.abstract}</p>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex gap-2 ml-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => viewFile({
                        name: paper.title,
                        fileURL: paper.fileURL,
                        fileName: paper.fileName
                      })}
                      disabled={!paper.fileURL}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Publication
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <AddAchievementModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAchievement}
        type={modalType}
      />
      
      <ViewCertificateModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        certificate={selectedFile}
      />
    </div>
  );
};

export default Achievements;
