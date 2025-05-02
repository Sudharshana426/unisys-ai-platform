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
    }
  };

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
          <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
          <TabsTrigger value="competitions">Competitions</TabsTrigger>
          <TabsTrigger value="papers">Research Papers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hackathons" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button onClick={() => {
              setModalType('hackathon');
              setIsAddModalOpen(true);
            }} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Hackathon
            </Button>
          </div>
          
          {filteredAchievements.hackathons.map((hackathon) => (
            <Card key={hackathon._id}>
              <div className="md:flex">
                <div className="md:w-1/4">
                  <div className="h-48 md:h-full overflow-hidden">
                    <img 
                      src={hackathon.fileURL ? `http://localhost:5000${hackathon.fileURL}` : 'https://via.placeholder.com/400x300'} 
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
                        View Certificate
                      </Button>
                    )}
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>
        
        <TabsContent value="competitions" className="space-y-4">
          <div className="flex justify-end mb-4">
            <Button onClick={() => {
              setModalType('competition');
              setIsAddModalOpen(true);
            }} size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Competition
            </Button>
          </div>
          
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
