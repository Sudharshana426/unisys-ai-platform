import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

interface AddAchievementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd?: (achievement: any) => void;
  onSave?: (achievement: any) => void;
  type: 'hackathon' | 'competition' | 'paper';
  initialValues?: any;
  mode?: 'add' | 'edit';
}

const AddAchievementModal = ({ isOpen, onClose, onAdd, onSave, type, initialValues, mode = 'add' }: AddAchievementModalProps) => {
  // Common fields
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  // Hackathon specific fields
  const [position, setPosition] = useState("");
  const [category, setCategory] = useState("");
  const [project, setProject] = useState("");
  const [teamSize, setTeamSize] = useState("");
  
  // Competition specific fields
  const [team, setTeam] = useState("Individual");
  
  // Paper specific fields
  const [authors, setAuthors] = useState("");
  const [publication, setPublication] = useState("");
  const [doi, setDoi] = useState("");
  const [abstract, setAbstract] = useState("");
  
  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name || "");
      setDate(initialValues.date || "");
      setPosition(initialValues.position || "");
      setCategory(initialValues.category || "");
      setProject(initialValues.project || "");
      setTeamSize(initialValues.teamSize || "");
      setTeam(initialValues.team || "Individual");
      setAuthors(initialValues.authors || "");
      setPublication(initialValues.publication || "");
      setDoi(initialValues.doi || "");
      setAbstract(initialValues.abstract || "");
      setFile(null);
    } else {
      resetForm();
    }
  }, [initialValues, isOpen, type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append("type", type);
      formData.append("name", name);
      formData.append("date", date);
      
      if (type === 'hackathon') {
        formData.append("position", position);
        formData.append("category", category);
        formData.append("project", project);
        formData.append("teamSize", teamSize);
      } else if (type === 'competition') {
        formData.append("position", position);
        formData.append("category", category);
        formData.append("team", team);
      } else if (type === 'paper') {
        formData.append("authors", authors);
        formData.append("publication", publication);
        formData.append("doi", doi);
        formData.append("abstract", abstract);
      }
      
      if (file) {
        formData.append("file", file);
      }

      // Log the actual FormData contents
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      if (mode === 'edit' && initialValues && initialValues._id) {
        // Edit mode: call onSave
        if (onSave) {
          await onSave({
            _id: initialValues._id,
            type, name, date, position, category, project, teamSize, team, authors, publication, doi, abstract, file
          });
        }
        onClose();
        resetForm();
        return;
      }
      // Add mode: call onAdd
      if (onAdd) {
        await onAdd({ type, name, date, position, category, project, teamSize, team, authors, publication, doi, abstract, file });
      }
      onClose();
      resetForm();
    } catch (error: any) {
      console.error("Error adding achievement:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      
      let errorMessage = "Failed to add achievement. Please try again.";
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (error.response?.status === 401) {
        errorMessage = "Unauthorized. Please check your credentials.";
      } else if (error.response?.status === 403) {
        errorMessage = "Forbidden. You don't have permission to perform this action.";
      }
      
      toast.error(errorMessage);
    }
  };
  
  const resetForm = () => {
    setName("");
    setDate("");
    setPosition("");
    setCategory("");
    setProject("");
    setTeamSize("");
    setTeam("Individual");
    setAuthors("");
    setPublication("");
    setDoi("");
    setAbstract("");
    setFile(null);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}` : `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`}</DialogTitle>
          <DialogDescription>
            {mode === 'edit' ? 'Update the details and save changes.' : 'Enter the details to add it to your achievements.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 py-4">
            {/* Common fields */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">{type === 'paper' ? 'Title' : 'Name'}</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">Date</Label>
              <Input
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g., March 15-17, 2023"
                className="col-span-3"
                required
              />
            </div>
            
            {/* Hackathon specific fields */}
            {type === 'hackathon' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right">Position</Label>
                  <Input
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g., Winner, 2nd Place"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Smart Education"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="project" className="text-right">Project</Label>
                  <Input
                    id="project"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    placeholder="e.g., AI-Powered Learning Assistant"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="teamSize" className="text-right">Team Size</Label>
                  <Input
                    id="teamSize"
                    type="number"
                    min="1"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="col-span-3"
                    required
                  />
                </div>
              </>
            )}
            
            {/* Competition specific fields */}
            {type === 'competition' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right">Position/Rank</Label>
                  <Input
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="e.g., 6th Rank, Top 15%"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="category" className="text-right">Category</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Competitive Programming"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="team" className="text-right">Participation</Label>
                  <Select 
                    value={team} 
                    onValueChange={setTeam}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select participation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Individual">Individual</SelectItem>
                      <SelectItem value="Team">Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}
            
            {/* Paper specific fields */}
            {type === 'paper' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="authors" className="text-right">Authors</Label>
                  <Input
                    id="authors"
                    value={authors}
                    onChange={(e) => setAuthors(e.target.value)}
                    placeholder="e.g., Sharma R., Patel V., Gupta S."
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="publication" className="text-right">Publication</Label>
                  <Input
                    id="publication"
                    value={publication}
                    onChange={(e) => setPublication(e.target.value)}
                    placeholder="e.g., IEEE International Conference"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="doi" className="text-right">DOI</Label>
                  <Input
                    id="doi"
                    value={doi}
                    onChange={(e) => setDoi(e.target.value)}
                    placeholder="e.g., 10.1109/ICET.2023.123456"
                    className="col-span-3"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="abstract" className="text-right">Abstract</Label>
                  <Input
                    id="abstract"
                    value={abstract}
                    onChange={(e) => setAbstract(e.target.value)}
                    placeholder="Brief description of the paper"
                    className="col-span-3"
                    required
                  />
                </div>
              </>
            )}
            
            {/* File upload field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="file" className="text-right">Certificate/File</Label>
              <Input
                id="file"
                type="file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="col-span-3"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
              {mode === 'edit' ? 'Save Changes' : `Add ${type.charAt(0).toUpperCase() + type.slice(1)}`}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAchievementModal;
