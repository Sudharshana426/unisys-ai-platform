
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface EditAcademicModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  initialData: {
    cgpa: number;
    courses?: any[];
  };
  type: 'cgpa' | 'course';
}

const EditAcademicModal = ({ isOpen, onClose, onSave, initialData, type }: EditAcademicModalProps) => {
  const [cgpa, setCgpa] = useState(initialData.cgpa.toString());
  const [course, setCourse] = useState(initialData.courses ? initialData.courses[0] : null);
  
  const handleSave = () => {
    if (type === 'cgpa') {
      const newCgpa = parseFloat(cgpa);
      if (isNaN(newCgpa) || newCgpa < 0 || newCgpa > 10) {
        toast.error("Please enter a valid CGPA between 0 and 10");
        return;
      }
      onSave({ cgpa: newCgpa });
      toast.success("CGPA updated successfully");
    } else if (type === 'course' && course) {
      // Validate the internal marks
      if (course.internalMarks > course.maxInternal) {
        toast.error("Internal marks cannot exceed maximum marks");
        return;
      }
      onSave({ course });
      toast.success("Course updated successfully");
    }
    onClose();
  };
  
  const handleCourseChange = (key: string, value: any) => {
    if (course) {
      setCourse({ ...course, [key]: value });
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {type === 'cgpa' ? 'Edit CGPA' : 'Edit Course Details'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          {type === 'cgpa' ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cgpa" className="text-right">CGPA</Label>
              <Input 
                id="cgpa"
                value={cgpa}
                onChange={(e) => setCgpa(e.target.value)}
                className="col-span-3"
                type="number"
                step="0.01"
                min="0"
                max="10"
                required
              />
            </div>
          ) : course ? (
            <div className="space-y-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="attendance" className="text-right">Attendance</Label>
                <Input 
                  id="attendance"
                  value={course.attendance}
                  onChange={(e) => handleCourseChange('attendance', parseInt(e.target.value))}
                  className="col-span-3"
                  type="number"
                  min="0"
                  max="100"
                  required
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="internalMarks" className="text-right">Internal Marks</Label>
                <Input 
                  id="internalMarks"
                  value={course.internalMarks}
                  onChange={(e) => handleCourseChange('internalMarks', parseInt(e.target.value))}
                  className="col-span-3"
                  type="number"
                  min="0"
                  max={course.maxInternal}
                  required
                />
              </div>
              
              <div className="text-sm text-muted-foreground text-right">
                Maximum internal marks: {course.maxInternal}
              </div>
            </div>
          ) : null}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAcademicModal;
