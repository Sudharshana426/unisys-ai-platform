
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface AddCertificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (certification: any) => void;
}

const AddCertificationModal = ({ isOpen, onClose, onAdd }: AddCertificationModalProps) => {
  const [name, setName] = useState("");
  const [provider, setProvider] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [credentialID, setCredentialID] = useState("");
  const [skills, setSkills] = useState("");
  const [file, setFile] = useState<File | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create URL for the uploaded file
    const fileURL = file ? URL.createObjectURL(file) : "";
    
    // Create new certification object
    const newCertification = {
      id: Date.now(),
      name,
      provider,
      issueDate,
      expiryDate: expiryDate || "No Expiry",
      credentialID,
      skills: skills.split(",").map(skill => skill.trim()),
      fileURL,
      fileName: file?.name || "",
      logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=50&h=50&fit=crop"
    };
    
    onAdd(newCertification);
    toast.success("Certification added successfully!");
    resetForm();
    onClose();
  };
  
  const resetForm = () => {
    setName("");
    setProvider("");
    setIssueDate("");
    setExpiryDate("");
    setCredentialID("");
    setSkills("");
    setFile(null);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Certification</DialogTitle>
          <DialogDescription>
            Enter the details of your certification to add it to your profile.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="provider" className="text-right">Provider</Label>
              <Input
                id="provider"
                value={provider}
                onChange={(e) => setProvider(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="issueDate" className="text-right">Issue Date</Label>
              <Input
                id="issueDate"
                type="text"
                placeholder="e.g., Jan 2023"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiryDate" className="text-right">Expiry Date</Label>
              <Input
                id="expiryDate"
                type="text"
                placeholder="e.g., Jan 2026 (or leave blank if no expiry)"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="col-span-3"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credentialId" className="text-right">Credential ID</Label>
              <Input
                id="credentialId"
                value={credentialID}
                onChange={(e) => setCredentialID(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="skills" className="text-right">Skills</Label>
              <Input
                id="skills"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                placeholder="e.g., AWS, Cloud, DevOps (comma separated)"
                className="col-span-3"
                required
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="certificate" className="text-right">Certificate File</Label>
              <Input
                id="certificate"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Add Certification</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCertificationModal;
