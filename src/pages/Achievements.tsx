<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Calendar, Code, ExternalLink, FileText, Plus, Search, Trophy } from "lucide-react";
import AddAchievementModal from '@/components/achievements/AddAchievementModal';
import ViewCertificateModal from '@/components/certifications/ViewCertificateModal';
import axios from 'axios';
import { toast } from "sonner";

const API_URL = 'http://localhost:5000/api';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'hackathon' | 'competition' | 'paper'>('hackathon');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/achievements`);
      setAchievements(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch achievements');
      toast.error('Failed to fetch achievements');
    } finally {
      setLoading(false);
=======

import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
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
  Award, 
  Calendar, 
  Download, 
  Eye, 
  FileText, 
  PlusCircle, 
  Trophy, 
  UserCheck 
} from "lucide-react";
import AddAchievementModal from "@/components/achievements/AddAchievementModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

const Achievements = () => {
  const [isAddHackathonOpen, setIsAddHackathonOpen] = useState(false);
  const [isAddCompetitionOpen, setIsAddCompetitionOpen] = useState(false);
  const [isAddPaperOpen, setIsAddPaperOpen] = useState(false);
  const [viewCertificate, setViewCertificate] = useState<any | null>(null);
  
  // Sample data - in a real app, this would come from your backend
  const [hackathons, setHackathons] = useState([
    {
      id: 1,
      name: "HackTech 2023",
      date: "March 15-17, 2023",
      position: "Winner",
      category: "Smart Education",
      project: "AI-Powered Learning Assistant",
      teamSize: 4,
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      fileURL: "",
      fileName: ""
    },
    {
      id: 2,
      name: "Code For Change",
      date: "January 5-7, 2023",
      position: "2nd Place",
      category: "Healthcare",
      project: "MediTrack: Patient Monitoring System",
      teamSize: 3,
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
      fileURL: "",
      fileName: ""
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
    }
  ]);
  
  const [competitions, setCompetitions] = useState([
    {
      id: 1,
      name: "LeetCode Weekly Contest 352",
      date: "September 10, 2023",
      position: "6th Rank",
      category: "Competitive Programming",
      team: "Individual",
      certificate: true,
      fileURL: "",
      fileName: ""
    },
    {
      id: 2,
      name: "Google Kickstart Round C",
      date: "May 21, 2023",
      position: "Top 15%",
      category: "Competitive Programming",
      team: "Individual",
      certificate: false,
      fileURL: "",
      fileName: ""
    },
    {
      id: 3,
      name: "ACM-ICPC Regionals",
      date: "November 25, 2022",
      position: "3rd Place",
      category: "Team Programming",
      team: "Team",
      certificate: true,
      fileURL: "",
      fileName: ""
    }
  ]);
  
  const [papers, setPapers] = useState([
    {
      id: 1,
      title: "Machine Learning Approaches for Educational Content Recommendation",
      authors: "Sharma R., Patel V., Gupta S.",
      publication: "IEEE International Conference on Educational Technology",
      date: "July 2023",
      doi: "10.1109/ICET.2023.123456",
      abstract: "This paper presents a novel approach to educational content recommendation using advanced machine learning techniques...",
      fileURL: "",
      fileName: ""
    }
  ]);
  
  const handleAddHackathon = (hackathon: any) => {
    setHackathons([...hackathons, hackathon]);
    toast.success("Hackathon added successfully!");
  };
<<<<<<< HEAD

  const handleAddAchievement = async (achievement) => {
    try {
      const response = await axios.post(`${API_URL}/achievements`, achievement);
      setAchievements([...achievements, response.data]);
      setIsAddModalOpen(false);
      toast.success('Achievement added successfully!');
    } catch (err) {
      toast.error('Failed to add achievement');
    }
  };

  const handleDeleteAchievement = async (id) => {
    try {
      await axios.delete(`${API_URL}/achievements/${id}`);
      setAchievements(achievements.filter(a => a._id !== id));
      toast.success('Achievement deleted successfully');
    } catch (err) {
      toast.error('Failed to delete achievement');
    }
  };

  const viewFile = (achievement) => {
    console.log("Viewing file:", achievement);
    const fileURL = achievement.fileURL 
      ? `http://localhost:5000${achievement.fileURL}` 
      : null;
    console.log("Constructed fileURL:", fileURL);
    setSelectedFile({
      name: achievement.name,
      fileURL: fileURL,
      fileName: achievement.fileName || "document.pdf"
    });
    setIsViewModalOpen(true);
=======
  
  const handleAddCompetition = (competition: any) => {
    setCompetitions([...competitions, competition]);
    toast.success("Competition added successfully!");
  };
  
  const handleAddPaper = (paper: any) => {
    setPapers([...papers, paper]);
    toast.success("Paper added successfully!");
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
  };

  const filteredAchievements = {
    hackathons: achievements.filter(a => a.type === 'hackathon'),
    competitions: achievements.filter(a => a.type === 'competition'),
    papers: achievements.filter(a => a.type === 'paper')
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Achievements</h1>
          <p className="text-muted-foreground">Showcase your hackathons, competitions, and publications</p>
        </div>
      </div>
<<<<<<< HEAD
      
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
              <p className="text-2xl font-bold">{filteredAchievements.hackathons.length}</p>
              <p className="text-sm text-muted-foreground">Hackathon Wins</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">{filteredAchievements.competitions.length}</p>
              <p className="text-sm text-muted-foreground">Coding Competitions</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">{filteredAchievements.papers.length}</p>
              <p className="text-sm text-muted-foreground">Research Papers</p>
            </div>
            <div className="text-center p-4 bg-muted rounded-lg">
              <p className="text-2xl font-bold">
                {achievements.filter(a => a.fileURL).length}
              </p>
              <p className="text-sm text-muted-foreground">Certificates</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="hackathons">
        <TabsList className="mb-4">
=======

      <Tabs defaultValue="hackathons" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
          <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
          <TabsTrigger value="competitions">Competitions</TabsTrigger>
          <TabsTrigger value="papers">Research Papers</TabsTrigger>
        </TabsList>
        
        {/* Hackathons Tab */}
        <TabsContent value="hackathons" className="space-y-4">
<<<<<<< HEAD
          <div className="flex justify-end mb-4">
            <Button onClick={() => {
              setModalType('hackathon');
              setIsAddModalOpen(true);
            }} size="sm">
              <Plus className="mr-2 h-4 w-4" />
=======
          <div className="flex justify-end">
            <Button 
              onClick={() => setIsAddHackathonOpen(true)}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
              Add Hackathon
            </Button>
          </div>
          
<<<<<<< HEAD
          {filteredAchievements.hackathons.map((hackathon) => (
            <Card key={hackathon._id}>
              <div className="md:flex">
                <div className="md:w-1/4">
                  <div className="h-48 md:h-full overflow-hidden">
=======
          {hackathons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hackathons.map((hackathon) => (
                <Card key={hackathon.id}>
                  <div className="aspect-video w-full overflow-hidden">
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
                    <img 
                      src={hackathon.fileURL ? `http://localhost:5000${hackathon.fileURL}` : 'https://via.placeholder.com/400x300'} 
                      alt={hackathon.name} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{hackathon.name}</CardTitle>
                      <Badge className="ml-2">{hackathon.position}</Badge>
                    </div>
                    <CardDescription className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {hackathon.date}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-2 gap-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                      </div>
                      <div>{hackathon.category}</div>
                      
                      <div>
                        <span className="text-muted-foreground">Project:</span>
                      </div>
                      <div>{hackathon.project}</div>
                      
                      <div>
                        <span className="text-muted-foreground">Team Size:</span>
                      </div>
                      <div>{hackathon.teamSize} members</div>
                    </div>
                  </CardContent>
<<<<<<< HEAD
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteAchievement(hackathon._id)}
                    >
                      Delete
                    </Button>
                    {hackathon.fileURL && (
                      <Button 
                        size="sm" 
                        onClick={() => viewFile(hackathon)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
=======
                  <CardFooter>
                    {hackathon.fileURL && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setViewCertificate(hackathon)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
                        View Certificate
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
                  <Trophy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Hackathons Yet</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Add your hackathon participations and achievements to showcase your experience.
                </p>
                <Button onClick={() => setIsAddHackathonOpen(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Your First Hackathon
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
<<<<<<< HEAD
        <TabsContent value="competitions" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button onClick={() => {
              setModalType('competition');
              setIsAddModalOpen(true);
            }} size="sm">
              <Plus className="mr-2 h-4 w-4" />
=======
        {/* Competitions Tab */}
        <TabsContent value="competitions" className="space-y-4">
          <div className="flex justify-end">
            <Button 
              onClick={() => setIsAddCompetitionOpen(true)}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
              Add Competition
            </Button>
          </div>
          
<<<<<<< HEAD
          {filteredAchievements.competitions.map((competition) => (
            <Card key={competition._id}>
              <div className="md:flex">
                <div className="md:w-1/4">
                  <div className="h-48 md:h-full overflow-hidden">
                    <img 
                      src={competition.fileURL ? `http://localhost:5000${competition.fileURL}` : 'https://via.placeholder.com/400x300'} 
                      alt={competition.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="md:w-3/4">
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
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Category</p>
                        <p className="font-medium">{competition.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Team</p>
                        <p className="font-medium">{competition.team}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteAchievement(competition._id)}
                    >
                      Delete
                    </Button>
                    {competition.fileURL && (
                      <Button 
                        size="sm" 
                        onClick={() => viewFile(competition)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Certificate
                      </Button>
                    )}
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="papers" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button onClick={() => {
              setModalType('paper');
              setIsAddModalOpen(true);
            }} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Paper
            </Button>
          </div>
          
          {filteredAchievements.papers.map((paper) => (
            <Card key={paper._id}>
              <CardHeader>
                <CardTitle>{paper.name}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 mr-1" /> {paper.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{paper.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Project</p>
                    <p className="font-medium">{paper.project}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleDeleteAchievement(paper._id)}
                >
                  Delete
                </Button>
                {paper.fileURL && (
                  <Button 
                    size="sm" 
                    onClick={() => viewFile(paper)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Paper
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

=======
          {competitions.length > 0 ? (
            <div className="grid gap-4">
              {competitions.map((competition) => (
                <Card key={competition.id}>
                  <CardHeader className="pb-2">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                      <div>
                        <CardTitle className="text-lg">{competition.name}</CardTitle>
                        <CardDescription className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {competition.date}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge>{competition.position}</Badge>
                        <Badge variant="outline">
                          {competition.team === "Individual" ? (
                            <span className="flex items-center">
                              <UserCheck className="h-3 w-3 mr-1" />
                              Individual
                            </span>
                          ) : (
                            "Team"
                          )}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Category:</span> {competition.category}
                      </div>
                      
                      {competition.certificate && (
                        <div className="flex justify-start md:justify-end">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setViewCertificate(competition)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            View Certificate
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Competitions Yet</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Add your competition participations to showcase your achievements.
                </p>
                <Button onClick={() => setIsAddCompetitionOpen(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Your First Competition
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        {/* Research Papers Tab */}
        <TabsContent value="papers" className="space-y-4">
          <div className="flex justify-end">
            <Button 
              onClick={() => setIsAddPaperOpen(true)}
              className="flex items-center gap-1"
            >
              <PlusCircle className="h-4 w-4" />
              Add Research Paper
            </Button>
          </div>
          
          {papers.length > 0 ? (
            <div className="grid gap-4">
              {papers.map((paper) => (
                <Card key={paper.id}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{paper.title}</CardTitle>
                    <CardDescription>
                      {paper.authors}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm mb-3">{paper.abstract}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Publication:</span> {paper.publication}
                      </div>
                      <div>
                        <span className="text-muted-foreground">Date:</span> {paper.date}
                      </div>
                      <div>
                        <span className="text-muted-foreground">DOI:</span> {paper.doi}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setViewCertificate(paper)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      View Paper
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="rounded-full bg-primary/10 p-3 mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Research Papers Yet</h3>
                <p className="text-center text-muted-foreground mb-4">
                  Add your research papers and publications to showcase your academic achievements.
                </p>
                <Button onClick={() => setIsAddPaperOpen(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Your First Paper
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      {/* View Certificate Modal */}
      <Dialog open={!!viewCertificate} onOpenChange={() => setViewCertificate(null)}>
        <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {viewCertificate?.name || viewCertificate?.title || "Document"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center justify-center py-4">
            {viewCertificate?.fileURL ? (
              viewCertificate.fileURL.endsWith('.pdf') ? (
                <iframe 
                  src={viewCertificate.fileURL} 
                  className="w-full h-[500px]" 
                  title={viewCertificate.name || viewCertificate.title}
                />
              ) : (
                <img 
                  src={viewCertificate.fileURL} 
                  alt={viewCertificate.name || viewCertificate.title} 
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
            {viewCertificate?.fileURL && (
              <Button 
                onClick={() => {
                  if (viewCertificate.fileURL) {
                    const link = document.createElement('a');
                    link.href = viewCertificate.fileURL;
                    link.download = viewCertificate.fileName || 'document';
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
      
      {/* Add Modals */}
>>>>>>> 3625b87e82182a0460b6a9a3759f6854e3dcd527
      <AddAchievementModal
        isOpen={isAddHackathonOpen}
        onClose={() => setIsAddHackathonOpen(false)}
        onAdd={handleAddHackathon}
        type="hackathon"
      />
      
      <AddAchievementModal
        isOpen={isAddCompetitionOpen}
        onClose={() => setIsAddCompetitionOpen(false)}
        onAdd={handleAddCompetition}
        type="competition"
      />
      
      <AddAchievementModal
        isOpen={isAddPaperOpen}
        onClose={() => setIsAddPaperOpen(false)}
        onAdd={handleAddPaper}
        type="paper"
      />
    </div>
  );
};

export default Achievements;
