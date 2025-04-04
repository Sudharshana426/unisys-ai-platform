
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle, Award, BookOpen, Check, FileText, Plus, X } from "lucide-react";
import { toast } from "sonner";

// Import individual content components
import LearningResources from './LearningResources';
import Achievements from './Achievements';
import Certifications from './Certifications';

// Type for the add item modal
type AddItemType = 'learning' | 'achievement' | 'certification' | null;

const LearningHub = () => {
  // State for tracking which tab is active
  const [activeTab, setActiveTab] = useState<string>("learning");
  
  // State for tracking if the add item modal is open and what type of item to add
  const [addItemType, setAddItemType] = useState<AddItemType>(null);
  
  // Handle changing the active tab
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  // Open the add item modal for the appropriate type
  const handleAddItem = () => {
    switch (activeTab) {
      case 'learning':
        setAddItemType('learning');
        break;
      case 'achievements':
        setAddItemType('achievement');
        break;
      case 'certifications':
        setAddItemType('certification');
        break;
    }
  };
  
  // Close the add item modal
  const handleCloseAddItem = () => {
    setAddItemType(null);
  };
  
  // Handle forwarding to the appropriate component's add functionality
  const handleForwardToAdd = () => {
    // Close the selection modal first
    handleCloseAddItem();
    
    // Simulate the forwarding - in a real app this would trigger the appropriate modal in each component
    switch (addItemType) {
      case 'learning':
        // This would be replaced with actually opening the add course modal
        toast.info("Opening add learning resource form");
        break;
      case 'achievement':
        // This would be replaced with actually opening the add achievement modal
        toast.info("Opening add achievement form");
        break;
      case 'certification':
        // This would be replaced with actually opening the add certification modal
        toast.info("Opening add certification form");
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold gradient-heading">Learning Hub</h1>
          <p className="text-muted-foreground">Manage your learning journey, achievements, and certifications</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <Button onClick={handleAddItem} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            Add New
          </Button>
        </div>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={handleTabChange} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="learning">Learning Resources</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="learning" className="space-y-4">
          <LearningResources />
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <Achievements />
        </TabsContent>
        
        <TabsContent value="certifications" className="space-y-4">
          <Certifications />
        </TabsContent>
      </Tabs>
      
      {/* Add Item Selection Modal */}
      <Dialog open={!!addItemType} onOpenChange={() => setAddItemType(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>What would you like to add?</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 gap-4 py-4">
            <Button
              variant={addItemType === 'learning' ? 'default' : 'outline'} 
              className="flex justify-start items-center gap-2 h-14"
              onClick={() => setAddItemType('learning')}
            >
              <div className="rounded-full bg-primary/10 p-2">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium">Learning Resource</div>
                <div className="text-xs text-muted-foreground">Add a course, video, or book</div>
              </div>
              {addItemType === 'learning' && <Check className="ml-auto h-5 w-5" />}
            </Button>
            
            <Button
              variant={addItemType === 'achievement' ? 'default' : 'outline'} 
              className="flex justify-start items-center gap-2 h-14"
              onClick={() => setAddItemType('achievement')}
            >
              <div className="rounded-full bg-primary/10 p-2">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium">Achievement</div>
                <div className="text-xs text-muted-foreground">Add a hackathon, competition, or publication</div>
              </div>
              {addItemType === 'achievement' && <Check className="ml-auto h-5 w-5" />}
            </Button>
            
            <Button
              variant={addItemType === 'certification' ? 'default' : 'outline'} 
              className="flex justify-start items-center gap-2 h-14"
              onClick={() => setAddItemType('certification')}
            >
              <div className="rounded-full bg-primary/10 p-2">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-medium">Certification</div>
                <div className="text-xs text-muted-foreground">Add a professional certification</div>
              </div>
              {addItemType === 'certification' && <Check className="ml-auto h-5 w-5" />}
            </Button>
          </div>
          
          <div className="bg-muted/50 p-3 rounded-md flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              You'll be redirected to the specific form for the selected item type.
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button variant="outline" size="sm" onClick={handleCloseAddItem}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleForwardToAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningHub;
