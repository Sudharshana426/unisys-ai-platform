
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ExternalLink, Calendar, CheckCircle, Trophy, Clock } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { format } from "date-fns";

interface CourseCardProps {
  course: any;
  type: 'current' | 'completed';
  onUpdateProgress?: (courseId: number, progress: number) => void;
  onMarkAsCompleted?: (courseId: number) => void;
}

const CourseCard = ({ 
  course, 
  type, 
  onUpdateProgress, 
  onMarkAsCompleted 
}: CourseCardProps) => {
  const [isUpdateProgressOpen, setIsUpdateProgressOpen] = useState(false);
  const [newProgress, setNewProgress] = useState(course.progress || 0);
  const [isCompleteConfirmOpen, setIsCompleteConfirmOpen] = useState(false);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);

  const handleProgressUpdate = () => {
    if (onUpdateProgress) {
      onUpdateProgress(course.id, newProgress);
      setIsUpdateProgressOpen(false);
    }
  };

  const handleMarkAsCompleted = () => {
    if (onMarkAsCompleted) {
      onMarkAsCompleted(course.id);
      setIsCompleteConfirmOpen(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <Card className="overflow-hidden">
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="object-cover w-full h-full transition-transform hover:scale-105 duration-200"
          />
        </div>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-base line-clamp-1">{course.title}</CardTitle>
          </div>
          <CardDescription>{course.platform} • {course.instructor}</CardDescription>
        </CardHeader>
        <CardContent className="pb-2">
          {type === 'current' && (
            <>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm">{course.progress}% Complete</span>
                <span className="text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Due {formatDate(course.endDate)}
                </span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </>
          )}
          
          {type === 'completed' && (
            <div className="flex justify-between items-center mb-2">
              <span className="flex items-center text-sm text-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completed
              </span>
              <span className="text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 inline mr-1" />
                {formatDate(course.completionDate)}
              </span>
            </div>
          )}
          
          <div className="flex flex-wrap gap-1 mt-2">
            {course.skills && course.skills.slice(0, 3).map((skill: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {course.skills && course.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">+{course.skills.length - 3}</Badge>
            )}
          </div>
        </CardContent>
        <CardFooter className="pt-1 flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => setViewDetailsOpen(true)}
          >
            Details
          </Button>
          
          {type === 'current' && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => window.open(course.url, '_blank')}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              Open
            </Button>
          )}
          
          {type === 'completed' && course.certificateUrl && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => window.open(course.certificateUrl, '_blank')}
            >
              <Trophy className="h-3 w-3 mr-1" />
              Certificate
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Update Progress Dialog */}
      {type === 'current' && (
        <Dialog open={isUpdateProgressOpen} onOpenChange={setIsUpdateProgressOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Course Progress</DialogTitle>
              <DialogDescription>
                How much of "{course.title}" have you completed?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm">Current Progress: {course.progress}%</span>
                <span className="text-sm font-medium">New: {newProgress}%</span>
              </div>
              <Slider
                defaultValue={[course.progress]}
                max={100}
                step={5}
                onValueChange={(value) => setNewProgress(value[0])}
              />
              <p className="text-sm text-muted-foreground mt-4">
                Drag the slider to update your progress. If you've completed 100%, 
                consider marking the course as completed.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsUpdateProgressOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleProgressUpdate}>Update Progress</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirm Mark as Complete Dialog */}
      {type === 'current' && (
        <Dialog open={isCompleteConfirmOpen} onOpenChange={setIsCompleteConfirmOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Mark Course as Completed?</DialogTitle>
              <DialogDescription>
                This will move "{course.title}" to your completed courses list.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCompleteConfirmOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleMarkAsCompleted}>
                Mark as Completed
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* View Course Details Dialog */}
      <Dialog open={viewDetailsOpen} onOpenChange={setViewDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{course.title}</DialogTitle>
            <DialogDescription>
              {course.platform} • {course.instructor}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="aspect-video overflow-hidden rounded-md">
              <img 
                src={course.thumbnail} 
                alt={course.title} 
                className="object-cover w-full h-full"
              />
            </div>
            
            <p className="text-sm">{course.description}</p>
            
            <div className="grid grid-cols-2 gap-4">
              {type === 'current' && (
                <>
                  <div>
                    <h4 className="text-sm font-medium">Start Date</h4>
                    <p className="text-sm">{formatDate(course.startDate)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">End Date</h4>
                    <p className="text-sm">{formatDate(course.endDate)}</p>
                  </div>
                </>
              )}
              
              {type === 'completed' && (
                <>
                  <div>
                    <h4 className="text-sm font-medium">Completion Date</h4>
                    <p className="text-sm">{formatDate(course.completionDate)}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Course Duration</h4>
                    <p className="text-sm">{course.duration}</p>
                  </div>
                </>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-1">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {course.skills && course.skills.map((skill: string, index: number) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            {type === 'current' && (
              <div>
                <h4 className="text-sm font-medium mb-1">Progress</h4>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">{course.progress}% Complete</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            )}
          </div>
          <DialogFooter className="flex gap-2">
            {type === 'current' && (
              <>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setViewDetailsOpen(false);
                    setIsUpdateProgressOpen(true);
                  }}
                >
                  Update Progress
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setViewDetailsOpen(false);
                    setIsCompleteConfirmOpen(true);
                  }}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark Complete
                </Button>
                <Button 
                  onClick={() => window.open(course.url, '_blank')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Course
                </Button>
              </>
            )}
            
            {type === 'completed' && course.certificateUrl && (
              <Button 
                onClick={() => window.open(course.certificateUrl, '_blank')}
              >
                <Trophy className="h-4 w-4 mr-2" />
                View Certificate
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CourseCard;
