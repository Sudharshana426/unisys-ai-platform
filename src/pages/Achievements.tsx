import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Calendar, Code, ExternalLink, FileText, Plus, Search, Trophy } from "lucide-react";
import AddAchievementModal from '@/components/achievements/AddAchievementModal';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from 'axios';
import { toast } from "sonner";
import { AchievementCard } from '../components/ui/card';

const API_URL = 'http://localhost:5000/api';

type AchievementType = 'hackathon' | 'competition' | 'paper';

// Helper to get description and extra fields for each achievement type
function getAchievementCardProps(a) {
  let description = '';
  let extra = [];
  if (a.type === 'hackathon') {
    description = `${a.project ? a.project + '. ' : ''}${a.category ? 'Category: ' + a.category + '. ' : ''}${a.position ? 'Position: ' + a.position + '. ' : ''}`;
    extra = [
      { label: 'TEAM SIZE', value: a.teamSize || '-' },
    ];
  } else if (a.type === 'competition') {
    description = `${a.category ? 'Category: ' + a.category + '. ' : ''}${a.position ? 'Position: ' + a.position + '. ' : ''}`;
    extra = [
      { label: 'PARTICIPATION', value: a.team || '-' },
    ];
  } else if (a.type === 'paper') {
    description = `${a.publication ? a.publication + '. ' : ''}${a.authors ? 'Authors: ' + a.authors + '. ' : ''}${a.doi ? 'DOI: ' + a.doi + '. ' : ''}${a.abstract ? a.abstract : ''}`;
    extra = [];
  }
  return { description, extra };
}

export const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<AchievementType>('hackathon');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingAchievement, setEditingAchievement] = useState<any | null>(null);

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
      console.error('Error adding achievement:', err);
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

  const handleEditAchievement = async (updated) => {
    try {
      const formData = new FormData();
      formData.append('type', updated.type);
      formData.append('name', updated.name);
      formData.append('date', updated.date);
      if (updated.type === 'hackathon') {
        formData.append('position', updated.position || '');
        formData.append('category', updated.category || '');
        formData.append('project', updated.project || '');
        formData.append('teamSize', updated.teamSize || '');
      } else if (updated.type === 'competition') {
        formData.append('position', updated.position || '');
        formData.append('category', updated.category || '');
        formData.append('team', updated.team || '');
      } else if (updated.type === 'paper') {
        formData.append('authors', updated.authors || '');
        formData.append('publication', updated.publication || '');
        formData.append('doi', updated.doi || '');
        formData.append('abstract', updated.abstract || '');
      }
      if (updated.file) {
        formData.append('file', updated.file);
      }
      const response = await axios.put(`${API_URL}/achievements/${updated._id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAchievements(achievements.map(a => a._id === updated._id ? response.data : a));
      toast.success('Achievement updated successfully!');
      setEditingAchievement(null);
    } catch (err) {
      toast.error('Failed to update achievement');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Achievements</h1>
          <p className="text-muted-foreground">Track and showcase your accomplishments</p>
        </div>
        <div className="flex gap-2">
          <Select 
            value={selectedType} 
            onValueChange={(value: AchievementType) => setSelectedType(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hackathon">Hackathon</SelectItem>
              <SelectItem value="competition">Competition</SelectItem>
              <SelectItem value="paper">Research Paper</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Achievement
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
          <TabsTrigger value="competitions">Competitions</TabsTrigger>
          <TabsTrigger value="papers">Research Papers</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : achievements.length === 0 ? (
            <div className="text-center text-muted-foreground">No achievements yet.</div>
          ) : (
            <div className="flex flex-row flex-wrap gap-4 justify-start items-stretch">
              {achievements.map((a) => (
                <AchievementCard
                  key={a._id}
                  image={a.fileURL ? `http://localhost:5000${a.fileURL}` : 'https://via.placeholder.com/300x160?text=Achievement'}
                  name={a.name}
                  date={a.date}
                  type={a.type}
                  position={a.position}
                  category={a.category}
                  project={a.project}
                  teamSize={a.teamSize}
                  team={a.team}
                  authors={a.authors}
                  publication={a.publication}
                  doi={a.doi}
                  abstract={a.abstract}
                  fileName={a.fileName}
                  onDelete={() => handleDeleteAchievement(a._id)}
                  onEdit={() => setEditingAchievement(a)}
                  className="min-w-[260px] max-w-xs"
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="hackathons" className="space-y-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : achievements.filter(a => a.type === 'hackathon').length === 0 ? (
            <div className="text-center text-muted-foreground">No hackathon achievements yet.</div>
          ) : (
            <div className="flex flex-row flex-wrap gap-4 justify-start items-stretch">
              {achievements.filter(a => a.type === 'hackathon').map((a) => (
                <AchievementCard
                  key={a._id}
                  image={a.fileURL ? `http://localhost:5000${a.fileURL}` : 'https://via.placeholder.com/300x160?text=Achievement'}
                  name={a.name}
                  date={a.date}
                  type={a.type}
                  position={a.position}
                  category={a.category}
                  project={a.project}
                  teamSize={a.teamSize}
                  team={a.team}
                  authors={a.authors}
                  publication={a.publication}
                  doi={a.doi}
                  abstract={a.abstract}
                  fileName={a.fileName}
                  onDelete={() => handleDeleteAchievement(a._id)}
                  onEdit={() => setEditingAchievement(a)}
                  className="min-w-[260px] max-w-xs"
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="competitions" className="space-y-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : achievements.filter(a => a.type === 'competition').length === 0 ? (
            <div className="text-center text-muted-foreground">No competition achievements yet.</div>
          ) : (
            <div className="flex flex-row flex-wrap gap-4 justify-start items-stretch">
              {achievements.filter(a => a.type === 'competition').map((a) => (
                <AchievementCard
                  key={a._id}
                  image={a.fileURL ? `http://localhost:5000${a.fileURL}` : 'https://via.placeholder.com/300x160?text=Achievement'}
                  name={a.name}
                  date={a.date}
                  type={a.type}
                  position={a.position}
                  category={a.category}
                  project={a.project}
                  teamSize={a.teamSize}
                  team={a.team}
                  authors={a.authors}
                  publication={a.publication}
                  doi={a.doi}
                  abstract={a.abstract}
                  fileName={a.fileName}
                  onDelete={() => handleDeleteAchievement(a._id)}
                  onEdit={() => setEditingAchievement(a)}
                  className="min-w-[260px] max-w-xs"
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="papers" className="space-y-4">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : achievements.filter(a => a.type === 'paper').length === 0 ? (
            <div className="text-center text-muted-foreground">No research papers yet.</div>
          ) : (
            <div className="flex flex-row flex-wrap gap-4 justify-start items-stretch">
              {achievements.filter(a => a.type === 'paper').map((a) => (
                <AchievementCard
                  key={a._id}
                  image={a.fileURL ? `http://localhost:5000${a.fileURL}` : 'https://via.placeholder.com/300x160?text=Achievement'}
                  name={a.name}
                  date={a.date}
                  type={a.type}
                  position={a.position}
                  category={a.category}
                  project={a.project}
                  teamSize={a.teamSize}
                  team={a.team}
                  authors={a.authors}
                  publication={a.publication}
                  doi={a.doi}
                  abstract={a.abstract}
                  fileName={a.fileName}
                  onDelete={() => handleDeleteAchievement(a._id)}
                  onEdit={() => setEditingAchievement(a)}
                  className="min-w-[260px] max-w-xs"
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <AddAchievementModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddAchievement}
        type={selectedType}
      />

      {editingAchievement && (
        <AddAchievementModal
          isOpen={!!editingAchievement}
          onClose={() => setEditingAchievement(null)}
          onSave={handleEditAchievement}
          type={editingAchievement.type}
          initialValues={editingAchievement}
          mode="edit"
        />
      )}
    </div>
  );
};
